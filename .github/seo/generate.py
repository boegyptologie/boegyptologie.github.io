"""Generate only head metadata for the existing static BOE pages (stdlib only)."""
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import argparse
import copy
import json
import re

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads(Path(__file__).with_name('metadata.json').read_text(encoding='utf-8'))
ORIGIN = DATA['origin']
JSON_LD = re.compile(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>', re.S | re.I)
HEAD = re.compile(r'(<head\b[^>]*>)(.*?)(</head>)', re.S | re.I)
META = re.compile(r'<meta\b[^>]*>', re.I)
LINK = re.compile(r'<link\b[^>]*>', re.I)
SCHOLAR_PDF_LIMIT = 5_000_000

class Tags(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

def meta_value(head, name):
    return next((a.get('content') for t, a in Tags(head).tags if t == 'meta' and a.get('name') == name), None)

def canonical(head):
    return next((a['href'] for t, a in Tags(head).tags if t == 'link' and a.get('rel') == 'canonical'), None)

def graph_nodes(head):
    nodes = []
    for match in JSON_LD.finditer(head):
        obj = json.loads(re.search(r'>(.*)</script>', match.group(), re.S | re.I)[1])
        nodes.extend(obj.get('@graph', [obj]))
    return nodes

def replace_meta(head, name, values, attribute='name'):
    values = values if isinstance(values, list) else [values]
    replacement = '\n'.join('  <meta '+attribute+'="'+name+'" content="'+escape(str(v), quote=True)+'">' for v in values)
    matches=[]
    for match in META.finditer(head):
        attrs=Tags(match.group()).tags[0][1]
        if attrs.get(attribute) == name:
            matches.append(match)
    if matches:
        first=matches[0]
        for match in reversed(matches[1:]):
            start, end = match.span()
            line_start = head.rfind('\n', 0, start) + 1
            line_end = head.find('\n', end) + 1
            if line_end and not head[line_start:start].strip() and not head[end:line_end].strip():
                start, end = line_start, line_end
            head = head[:start] + head[end:]
        return head[:first.start()]+replacement.lstrip()+head[first.end():]
    return head.rstrip()+'\n'+replacement+'\n'

def update_description(head, description):
    for name in ('description','DC.description','twitter:description'):
        head=replace_meta(head,name,description)
    return replace_meta(head,'og:description',description,'property')

def ref(identifier):
    return {'@id':identifier}

def common_nodes():
    return copy.deepcopy([DATA['publisher'],DATA['journal'],DATA['website']])

def article_pdf(head, pdf):
    for match in LINK.finditer(head):
        attrs = Tags(match.group()).tags[0][1]
        if attrs.get('rel') == 'alternate' and attrs.get('type') == 'application/pdf':
            found = re.sub(r'\bhref=(["\'])(.*?)\1', lambda m: 'href="'+escape(pdf, quote=True)+'"', match.group())
            return head[:match.start()] + found + head[match.end():]
    return head.rstrip()+'\n  <link rel="alternate" type="application/pdf" href="'+escape(pdf, quote=True)+'">\n'

def build_page(path, source):
    match=HEAD.search(source)
    if not match:
        return source
    newline = '\r\n' if '\r\n' in match[2] else '\n'
    head=match[2].replace('\r\n', '\n')
    rel=path.relative_to(ROOT).as_posix()
    article_row=next((a for a in DATA['articles'] if rel in (a['notice'],a['reader'])),None)
    nodes=graph_nodes(head)
    if not nodes and not article_row: # Private forms and existing redirect aliases stay untouched.
        return source
    description=DATA['descriptions'].get(rel,meta_value(head,'description'))
    if rel in DATA['descriptions']:
        head=update_description(head,description)
    generated_ids = {node['@id'] for node in common_nodes()}
    generated_ids.update(person['node']['@id'] for person in DATA['people'])
    nodes = [node for node in nodes if node.get('@id') not in generated_ids]
    url=canonical(head)
    page=next((n for n in nodes if n.get('@type') in ('WebPage','CollectionPage')),None)
    if article_row:
        directory = path.parent.relative_to(ROOT).as_posix()
        assert url == ORIGIN + directory + '/', f'{rel}: canonical URL differs from its publication path'
        if page is None:
            article = article_row['article']
            page = {'@type':'WebPage','url':url,'name':article['headline'],'inLanguage':article['inLanguage']}
            nodes.append(page)
    if page:
        page.setdefault('@id',url+'#webpage')
        page['isPartOf']=ref(ORIGIN+'#website')
        page['about']=ref(ORIGIN+'#boe')
        if description:page['description']=description
        # Old generic pages incorrectly pointed to non-existent applications.
        if page.get('mainEntity',{}).get('@id','').endswith('#application') and not any(n.get('@type')=='WebApplication' for n in nodes):
            page['mainEntity']=ref(ORIGIN+'#boe')
    if article_row:
        for name in ('PublicationVolume','PublicationIssue','ScholarlyArticle'):
            nodes=[n for n in nodes if n.get('@type')!=name]
        nodes.extend(copy.deepcopy([article_row['volume'],article_row['issue'],article_row['article']]))
        article=article_row['article']
        citations=dict(article_row['citations'])
        authors=[v for k,v in article_row['citations'] if k=='citation_author']
        for name, value in citations.items():
            head=replace_meta(head,name,authors if name=='citation_author' else value)
        head=replace_meta(head,'DC.title',article['headline'])
        head=replace_meta(head,'DC.creator',authors)
        head=replace_meta(head,'DC.identifier','doi:'+article['identifier']['value'])
        head=replace_meta(head,'DC.date',article['datePublished'])
        head=replace_meta(head,'DC.subject','; '.join(article.get('keywords',[])))
        # Keep the U23 pilot PDF and the existing Zenodo PDFs; no file is changed.
        pdf=citations['citation_pdf_url']
        head=article_pdf(head,pdf)
        for node in nodes:
            if node.get('@type')=='WebPage':node['mainEntity']=ref(article['@id'])
    elif rel.endswith('/numeros.html'):
        nodes=[n for n in nodes if n.get('@type') not in ('PublicationVolume','PublicationIssue','ScholarlyArticle')]
        volumes={a['volume']['@id']:a['volume'] for a in DATA['articles']}
        nodes.extend(copy.deepcopy(list(volumes.values())))
        for row in DATA['articles']:
            nodes.extend(copy.deepcopy([row['issue'],row['article']]))
        if page:
            page['mainEntity']={'@type':'ItemList','numberOfItems':len(DATA['articles']),'itemListElement':[{'@type':'ListItem','position':i+1,'item':ref(a['article']['@id'])} for i,a in enumerate(DATA['articles'])]}
    if rel in DATA['rosterPages']:
        if page:page['mentions']=[ref(p['node']['@id']) for p in DATA['people']]
        nodes.extend(copy.deepcopy([p['node'] for p in DATA['people']]))
    if rel in DATA['policyPages'] and page:
        page['publisher']=ref(ORIGIN+'#boma')
        page['about']=ref(ORIGIN+'#boe')
        if re.fullmatch(r'\d{4}-\d{2}', page.get('dateModified', '')):
            del page['dateModified']
        page['hasPart'] = []
        ids = {attrs.get('id') for _, attrs in Tags(source[match.end():]).tags}
        for anchor, title, detail in DATA['policySections'][rel]:
            if anchor not in ids:
                raise ValueError(f'{rel}: policy section #{anchor} is missing')
            page['hasPart'].append({
                '@type':'WebPageElement', '@id':url+'#'+anchor, 'url':url+'#'+anchor,
                'name':title, 'description':detail, 'inLanguage':page['inLanguage'],
            })
    for node in nodes:
        if node.get('@type')=='WebApplication':
            node['publisher']=ref(ORIGIN+'#boma')
            node['about']=ref(ORIGIN+'#boe')
            node['isPartOf']=ref(ORIGIN+'#website')
            node['isAccessibleForFree']=True
            node['inLanguage']='fr' if rel.startswith('fr/') else 'en'
            node['browserRequirements']='Requires JavaScript'
            node['featureList']=(['Recherche dans les publications BOE','Variantes orthographiques et certains équivalents multilingues','Claviers de translittération égyptologique et de copte','Filtres par périodes, lieux, musées et sources','Extraits sourcés et liens vers les passages HTML'] if rel.startswith('fr/') else ['Search across BOE publications','Spelling variants and selected multilingual equivalents','Egyptological transliteration and Coptic keyboards','Filters by periods, places, museums and sources','Source excerpts linked to passages in full-text HTML'])
        if node.get('@type')=='WebPage' and isinstance(node.get('mainEntity'),dict) and node['mainEntity'].get('@type')=='Book':
            book=node['mainEntity']
            node['publisher']=ref(ORIGIN+'#boma')
            book['isPartOf']=ref(ORIGIN+'#boe')
            volume=copy.deepcopy(DATA['articles'][0]['volume'])
            book['isBasedOn']=ref(volume['@id'])
            if not any(n.get('@id')==volume['@id'] for n in nodes):nodes.append(volume)
    nodes=common_nodes()+nodes
    script='<script type="application/ld+json">\n'+json.dumps({'@context':'https://schema.org','@graph':nodes},ensure_ascii=False,indent=2).replace('<','\\u003c')+'\n  </script>'
    first=JSON_LD.search(head)
    if first:
        head=JSON_LD.sub(lambda m:script if m.start()==first.start() else '',head)
    else:
        head=head.rstrip()+'\n  '+script+'\n'
    result=source[:match.start(2)]+head.replace('\n',newline)+source[match.end(2):]
    assert result.split('</head>',1)[1]==source.split('</head>',1)[1], rel+' body changed'
    assert re.findall(r'<title>.*?</title>',result,re.S)==re.findall(r'<title>.*?</title>',source,re.S),rel+' title changed'
    def active(text):
        return re.findall(r'<(?:script\b[^>]*>.*?</script>|style\b[^>]*>.*?</style>|link\b[^>]*rel="stylesheet"[^>]*>)',JSON_LD.sub('',text),re.S|re.I)
    assert active(result)==active(source),rel+' scripts/styles changed'
    return result

def validate_publication_pdf(publication):
    pdf_url = dict(publication['citations']).get('citation_pdf_url')
    if not pdf_url or not pdf_url.startswith(ORIGIN):
        return  # The archive URL remains valid when a local copy is unavailable.
    relative = Path(unquote(urlsplit(pdf_url).path.lstrip('/')))
    if relative.parent != Path(publication['notice']).parent or relative.suffix.lower() != '.pdf':
        raise ValueError(f'{pdf_url}: place the local PDF alongside its notice')
    pdf = ROOT / relative
    if not pdf.is_file() or not 0 < pdf.stat().st_size <= SCHOLAR_PDF_LIMIT:
        raise ValueError(f'{pdf_url}: local PDF missing or larger than 5 MB')
    encodings = [
        value for value in publication['article']['encoding']
        if value.get('contentUrl') == pdf_url and value.get('encodingFormat') == 'application/pdf'
    ]
    if len(encodings) != 1 or encodings[0].get('contentSize') != str(pdf.stat().st_size):
        raise ValueError(f'{pdf_url}: structured PDF size differs from the file')

def generate(check=False):
    planned={}
    for article in DATA['articles']:
        for key in ('notice', 'reader'):
            if not (ROOT / article[key]).is_file():
                raise ValueError(f'Missing publication page: {article[key]}')
        validate_publication_pdf(article)
    for path in sorted(ROOT.rglob('*.html')):
        if '.git' in path.parts:continue
        source=path.read_bytes().decode('utf-8')
        result=build_page(path,source)
        if result!=source:
            planned[path]=result
    if not check:
        for path, result in planned.items():
            path.write_bytes(result.encode('utf-8'))
    return [path.relative_to(ROOT).as_posix() for path in planned]

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args()
    changed=generate(args.check)
    print(json.dumps({'mode':'check' if args.check else 'write','changed':changed},ensure_ascii=False))
    raise SystemExit(1 if args.check and changed else 0)
