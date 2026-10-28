/* Recherche multilingue BOMA fondée sur les passages publiés. */
const $ = id => document.getElementById(id);
// Interface bilingue ; les termes du moteur et les citations restent dans leur langue source.
const LANGUAGE=(document.documentElement?.lang||'fr').toLowerCase().startsWith('en')?'en':'fr';
const ASSET_BASE=new URL('.',import.meta.url);
const ENGLISH_UI={
  "Cliquez sur un mot-clé pour ne garder que les extraits qui le contiennent. Cliquez à nouveau pour retirer ce filtre.": "Click a keyword to keep only excerpts that contain it. Click it again to remove this filter.",
  "Filtres actifs : {terms}.": "Active filters: {terms}.",
  "Affiner avec « {term} »": "Narrow results with “{term}”",
  "Retirer le filtre « {term} »": "Remove the “{term}” filter",
  "La recherche n’a pas abouti. Veuillez réessayer.": "The search could not be completed. Please try again.",
  "Chargement du corpus…": "Loading the corpus…",
  "Corpus indisponible": "Corpus unavailable",
  "Le chargement des articles a échoué. Vérifiez votre connexion puis réessayez.": "The articles could not be loaded. Check your connection and try again.",
  "Recherche en cours…": "Searching…",
  "Rechercher": "Search",
  "Aucun extrait dans cette catégorie.": "No excerpts in this category.",
  "Aucun extrait correspondant.": "No matching excerpts.",
  "Vérifier sur le PDF ↗": "Check the PDF ↗",
  "PDF à renseigner": "PDF unavailable",
  "Copier l’extrait et la référence": "Copy excerpt and reference",
  "Référence copiée ✓": "Reference copied ✓",
  "Copie indisponible": "Copying unavailable",
  "Terme attesté dans le corpus": "Term attested in the corpus",
  "Note à contrôler": "Note to verify",
  "Bibliographie": "Bibliography",
  "Texte de l’article": "Article text",
  "Note {number}": "Note {number}",
  "n.": "note",
  "« {text} »": "“{text}”",
  "{author}, « {title} », {journal}, p. {page}{note}{doi}.": "{author}, “{title}”, {journal}, p. {page}{note}{doi}.",
  "Afficher {count} autres extraits": "Show {count} more excerpts",
  "Indices présents dans cet extrait : {terms}{more}": "Evidence in this excerpt: {terms}{more}",
  "Graphies et termes rapprochés : {terms}.": "Related spellings and terms: {terms}.",
  "{count} articles": "{count} articles",
  "{notes} notes · {passages} passages": "{notes} notes · {passages} passages",
  "catégorie grammaticale": "grammatical category",
  "langue / écriture": "language / script",
  "corpus textuel": "textual corpus",
  "translittération égyptologique": "Egyptological transliteration",
  "équivalent lexical": "lexical equivalent",
  "Vérité": "Truth",
  "Négation et grammaire": "Negation and grammar",
  "Graphies et pratiques d’écriture": "Spellings and writing practices",
  "Phonétique et linguistique": "Phonetics and linguistics",
  "Lexique et sémantique": "Lexicon and semantics",
  "Documents et attestations": "Documents and attestations",
  "Bibliographie et notes": "Bibliography and notes",
  "Langues et évolutions": "Languages and language change",
  "Langues afroasiatiques": "Afroasiatic languages",
  "Signe du pied": "Foot sign",
  "Textes des Pyramides": "Pyramid Texts",
  "Textes des Sarcophages": "Coffin Texts",
  "Livre des Morts": "Book of the Dead",
  "Livre des Deux Chemins": "Book of Two Ways",
  "Amdouat": "Amduat",
  "Livre des Portes": "Book of Gates",
  "Livre des Cavernes": "Book of Caverns",
  "Livre de la Terre": "Book of the Earth",
  "Litanies de Rê": "Litany of Re",
  "Livre de la Nuit": "Book of Night",
  "Livre du Jour": "Book of Day",
  "Livre de la Vache du Ciel": "Book of the Heavenly Cow",
  "Sinouhé": "Sinuhe",
  "Paysan éloquent": "Eloquent Peasant",
  "Papyrus Westcar": "Westcar Papyrus",
  "Enseignement de Ptahhotep": "Teaching of Ptahhotep",
  "Lamentations d’Ipou-Our": "Admonitions of Ipuwer",
  "Voyage d’Ounamon": "Story of Wenamun",
  "Nom / substantif (NOUN)": "Noun (NOUN)",
  "Nom propre (PROPN)": "Proper noun (PROPN)",
  "Adjectif (ADJ)": "Adjective (ADJ)",
  "Verbe (VERB)": "Verb (VERB)",
  "Auxiliaire (AUX)": "Auxiliary (AUX)",
  "Adverbe (ADV)": "Adverb (ADV)",
  "Préposition / adposition (ADP)": "Preposition / adposition (ADP)",
  "Pronom (PRON)": "Pronoun (PRON)",
  "Déterminant grammatical (DET)": "Determiner (DET)",
  "Particule (PART)": "Particle (PART)",
  "Conjonction (catégorie générale)": "Conjunction (general category)",
  "Conjonction de coordination (CCONJ)": "Coordinating conjunction (CCONJ)",
  "Conjonction de subordination (SCONJ)": "Subordinating conjunction (SCONJ)",
  "Numéral (NUM)": "Numeral (NUM)",
  "Interjection (INTJ)": "Interjection (INTJ)",
  "Ponctuation (PUNCT)": "Punctuation (PUNCT)",
  "Symbole comme catégorie (SYM)": "Symbol as a category (SYM)",
  "Catégorie non déterminée (X)": "Unclassified category (X)",
  "Pronom suffixe": "Suffix pronoun",
  "Pronom dépendant": "Dependent pronoun",
  "Pronom enclitique": "Enclitic pronoun",
  "Pronom indépendant": "Independent pronoun",
  "Pronom proclitique": "Proclitic pronoun",
  "Participe": "Participle",
  "Infinitif": "Infinitive",
  "Statif / pseudoparticipe": "Stative / pseudoparticiple",
  "Forme verbale relative": "Relative verb form",
  "Adjectif nisbe": "Nisba adjective",
  "Déterminatif / classificateur graphique": "Determinative / graphic classifier",
  "Anthroponyme / nom de personne": "Anthroponym / personal name",
  "Toponyme / nom de lieu": "Toponym / place name",
  "Théonyme / nom de divinité": "Theonym / divine name",
  "Nom royal / nom de souverain": "Royal name / ruler’s name",
  "Épithète": "Epithet",
  "Titre / titulature dans les textes anciens": "Title / titulary in ancient texts",
  "Arabe": "Arabic",
  "Grec": "Greek",
  "Verbe et formes verbales (groupe de recherche)": "Verbs and verbal forms (search group)",
  "Nom et dénominations (groupe de recherche)": "Nouns and names (search group)",
  "Noms propres (groupe de recherche)": "Proper names (search group)",
  "Noms de personnes (groupe de recherche)": "Personal names (search group)",
  "Pronoms (groupe de recherche)": "Pronouns (search group)",
  "Forme finie (Fin)": "Finite form (Fin)",
  "Formes non finies (groupe de recherche)": "Non-finite forms (search group)",
  "Converbe": "Converb",
  "Nom verbal (terminologie des articles)": "Verbal noun (terminology used in articles)",
  "Nom verbal distinct de l’infinitif (Vnoun)": "Verbal noun other than the infinitive (Vnoun)",
  "Emploi nominal d’une forme verbale": "Nominal use of a verbal form",
  "Impératif": "Imperative",
  "groupe de recherche bibliographique": "bibliographic search group",
  "forme ou fonction grammaticale": "grammatical form or function",
  "Plus général : {label}": "Broader: {label}",
  "Plus précis : {label}": "Narrower: {label}",
  "Associé selon le contexte : {label}": "Related depending on context: {label}",
  "Les groupes de recherche incluent les mentions de leurs catégories plus précises. Une recherche précise exige sa propre attestation. Les liens associés proposent une autre recherche, sans équivalence grammaticale automatique.": "Search groups include mentions of their narrower categories. A specific search requires its own evidence. Related links suggest another search without assuming grammatical equivalence.",
  "Partie du discours et forme verbale restent distinctes.": "Part of speech and verbal form remain distinct.",
  "Le profil Egyptian-PC traite le statif et certaines formes relatives comme finis ; cette correspondance dépend de l’analyse.": "The Egyptian-PC profile treats the stative and certain relative forms as finite; this correspondence depends on the analysis.",
  "Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.": "Nominal use does not automatically turn a form into NOUN or Vnoun.",
  "période historique": "historical period",
  "dynastie": "dynasty",
  "lieu / site": "place / site",
  "Les ensembles incluent les mentions de leurs éléments. Un lien associé propose une autre recherche, sans équivalence automatique.": "Groups include mentions of their members. A related link proposes another search without assuming equivalence.",
  "Ces filtres portent sur les périodes et les lieux mentionnés dans les extraits. Ils se cumulent. Cliquez à nouveau pour retirer un filtre.": "These filters use periods and places mentioned in the excerpts. Filters are combined. Click again to remove a filter.",
  "Filtrer par « {term} »": "Filter by “{term}”",
  "Réduire la liste": "Show fewer",
  "Afficher toute la liste": "Show all",
  "Copte": "Coptic"
};
function t(message,values={}){const template=LANGUAGE==='en'?(ENGLISH_UI[message]??message):message;return template.replace(/\{(\w+)\}/g,(match,key)=>Object.hasOwn(values,key)?String(values[key]):match);}
const state = { corpus:null, docs:new Map(), result:[], baseResult:[], keywordRefinements:[], contextRefinements:[], contextExpanded:{period:false,place:false}, contextEvidence:new Map(), search:'', filter:'all', visibleCount:18, lexicon:new Map(), egyptianIndex:new Map(), citedNames:new Set(), activeTerms:[], plan:null, running:false };
const STOP = new Set('a à au aux avec car ce ces cet cette comme dans de des du elle elles en est et être il ils je la le les leur leurs mais me mon ne non nos notre nous on ont ou où par pas plus pour qu que quel quelle quels quelles qui quoi sa se ses son sont sous sur ta te tes ton tous tout un une vos votre vous y about after all also an and are as at be been between by can for from had has have in into is it its more not of on or other our over that the their there these this those to was were what when where which who why with would your der die das den dem ein eine einer eins nicht und über von im mit zur des aux sous sont في من عن على الى إلى مع كما الذي التي هذا هذه ذلك هناك بين عند هو هي هم ثم او أو'.split(' '));
const THEMES = [
  {label:'Vérité', triggers:['truth','true','truthfulness','vérité','vérités','verite','verdade','verdad','verità','Wahrheit','الحقيقة','حقيقة','الصدق'], keywords:['truth','true','truly','vérité']},
  {label:'Négation et grammaire', triggers:['negation','negative','negator','négation','négateur','negação','negación','negazione','Verneinung','grammaire','grammaticalisation','bn','النفي','نفي','النحو'], keywords:['negation','negator','negative','bn','grammaticalization','non-etymological','particle']},
  {label:'Graphies et pratiques d’écriture', triggers:['graphie','écriture','escrita','escritura','scrittura','Schrift','orthographe','orthographic','spelling','writing','scribal','signe','sign','hiéroglyphe','hieroglyph','الكتابة','العلامة','العلامات','الهيروغليفية'], keywords:['writing','writings','spelling','orthography','scribal','sign','signs','glyph','hieroglyph']},
  {label:'Phonétique et linguistique', triggers:['phonétique','phonetic','fonética','fonetica','Phonetik','phonology','phonologique','prononciation','valeur','reading','lecture','signifiant','الصوتية','الصوتي','النطق'], keywords:['phonetic','value','reading','phonology','transliteration','sound']},
  {label:'Lexique et sémantique', triggers:['lexique','lexème','sens','semantique','sémantique','lexeme','meaning','semantic','étymologie','etymology'], keywords:['lexeme','semantics','meaning','etymology','word','lexical']},
  {label:'Documents et attestations', triggers:['attestation','corpus','stèle','stele','textes','texte','documents','evidence','pyramid'], keywords:['attestation','evidence','stela','texts','corpus','Pyramid Texts','Old Kingdom','Middle Kingdom']},
  {label:'Bibliographie et notes', triggers:['bibliographie','bibliography','bibliographic','bibliografia','bibliografía','Bibliografie','référence','reference','citations','cité','citent','notes','source','sources','lemma','lemme','thesaurus','tla','المراجع','الهوامش','الحواشي','الببليوغرافيا'], keywords:['reference','bibliography','note','cf','Thesaurus Linguae Aegyptiae','lemma']},
  {label:'Langues et évolutions', triggers:['copte','coptic','copta','copto','koptisch','قبطية','القبطية','language','langue','évolution','evolution','diachronie','diachronic','historical'], keywords:['Coptic','Late Egyptian','language','historical','diachronic','Middle Egyptian']},
  {label:'Langues afroasiatiques', triggers:['afroasiatique','afroasiatiques','afroasiatic','afro asiatic','afroasiático','afroasiatico','afroasiatisch','الأفروآسيوية','afro-asiático','hamito-sémitique','hamito-semitic'], keywords:['Afroasiatic','Cushitic','Semitic','Chadic','Omotic','Berber','Hamito-Semitic']},
  {label:'Signe du pied', triggers:['foot','pied','piede','Fuß','القدم','foot-sign','Fußzeichen'], keywords:['foot','feet','D58']},
];

// Équivalents multilingues éditoriaux : les correspondances explicites
// relient des graphies et des termes attestés dans les articles.
const CURATED_EQUIVALENTS = new Map([
  ['verite',['truth']], ['verites',['truth']],
  ['verdade',['truth']], ['verdad',['truth']], ['verita',['truth']],
  ['wahrheit',['truth']], ['الحقيقة',['truth']], ['حقيقة',['truth']], ['الصدق',['truth']],
  ['copte',['coptic']], ['copta',['coptic']], ['copto',['coptic']],
  // Noms historiques dont les graphies diffèrent sensiblement selon les langues.
  // Ne rapprocher que les formes reconnues d'un nom littéralement attesté.
  ['plutarch',['plutarque']],
  ['toutankhamon',['tutankhamun']], ['toutankhamoun',['tutankhamun']],
  ['tutankhamon',['tutankhamun']], ['tutankhamen',['tutankhamun']],
  ['tutanchamun',['tutankhamun']], ['tutanchamon',['tutankhamun']],
  ['tutancamon',['tutankhamun']],
  ['توتانخامون',['tutankhamun']], ['توتنخامون',['tutankhamun']],
  ['توت عنخ امون',['tutankhamun']], ['توت عنخ امين',['tutankhamun']],
  // Équivalences lexicales générales ; les noms de langues et leurs expressions
  // sont reconnus comme concepts contrôlés dans LANGUAGE_CONCEPTS.
  ['grec',['greek','grecque','grecs','grecques','grece']],
  ['grecque',['greek','grec','grecs','grecques','grece']],
  ['grecs',['greek','grec','grecque','grecques','grece']],
  ['grece',['greek','grec','grecque','grecs','grecques']],
  ['ancien',['ancient','ancienne']], ['ancienne',['ancient','ancien']],
  // Vocabulaires arabes contrôlés : formes avec ou sans article défini.
  ['يونانية',['greek','grec','grecque','grece']], ['يوناني',['greek','grec','grece']],
  ['اغريقية',['greek','grec','grecque','grece']], ['اغريقي',['greek','grec','grece']],
  ['قديم',['ancient','ancien','ancienne']], ['قديمة',['ancient','ancien','ancienne']],
  ['لغة',['language']], ['لغات',['language','languages']],
  ['قيمة',['value']], ['صوتية',['phonetic']], ['صوتي',['phonetic']],
  ['علامة',['sign']], ['علامات',['signs']],
  ['نفي',['negation','negator']], ['سلب',['negation']],
  ['قبطية',['coptic']], ['قبطي',['coptic']],
  ['افرواسيوية',['afroasiatic']], ['افرواسيوي',['afroasiatic']],
  ['افراسيوية',['afroasiatic']], ['فرواسيوية',['afroasiatic']],
  ['كتابة',['writing']], ['مراجع',['bibliography']],
  ['هوامش',['notes']], ['حواشي',['notes']],
  ['قدم',['foot','feet']],
  // Lexique scientifique arabe : chaque entrée pointe vers une forme anglaise
  // vérifiable dans les articles, sans créer de contenu scientifique nouveau.
  ['مصر',['egypt']], ['مصري',['egyptian']], ['مصرية',['egyptian']],
  ['هيروغليفية',['hieroglyphic','hieroglyph']],
  ['هيروغليفي',['hieroglyphic','hieroglyph']],
  ['نقش',['inscription']], ['نقوش',['inscriptions']],
  ['مخطوطة',['manuscript']], ['مخطوطات',['manuscripts']],
  ['استعارة',['metaphor']], ['استعارات',['metaphors']],
  ['دلالة',['semantics']], ['دلالات',['semantics']],
  ['معنى',['meaning']], ['معاني',['meaning']],
  ['اشتقاق',['etymology']], ['تأثيل',['etymology']],
  ['جذر',['root']], ['جذور',['roots']],
  ['قاموس',['dictionary']], ['معجم',['dictionary']],
  ['دراسة',['study']], ['دراسات',['studies']],
  ['نص',['text']], ['نصوص',['texts']],
  ['فعل',['verb']], ['افعال',['verbs']],
  ['اسم',['noun']], ['اسماء',['nouns']],
  ['جمع',['plural']], ['مفرد',['singular']],
  ['مسند',['predicate']], ['فاعل',['subject']],
]);
// Familles éditoriales dérivées des cinq articles (registre :
// work/controlled-paraphrases/alias-register.json). Chaque famille remplace
// une composante précise, jamais l'ensemble du besoin par un thème voisin.
// Les catégories grammaticales restent gérées par CONTROLLED_CONCEPTS.
const CORPUS_LEXICAL_FAMILIES=[
  ['roubi','rubi','rooby'],['hamzaoui','hamzawi'],['saqqara','saqqarah','sakkarah'],
  ['ouvrier','ouvriers','travailleur','travailleurs','worker','workers','workman','workmen','عامل','عمال'],
  ['contremaître','contremaîtres','foreman','foremen','reïs','réïs','rais','رئيس الحفائر'],
  ['fouille','fouilles','excavation','excavations','حفريات'],
  ['fouilleur','fouilleurs','excavator','excavators'],
  ['tombeau','tombeaux','tombe','tombes','tomb','tombs'],
  ['découverte','découvertes','discovery','discoveries'],
  ['mémoire','memory'],['souvenir','souvenirs','recollection','recollections'],
  ['égyptien','égyptienne','égyptiens','égyptiennes','egyptian'],
  ['Égypte','Egypt'],['Ancien Empire','Old Kingdom'],['Moyen Empire','Middle Kingdom'],
  ['signe','signes','sign','signs'],['phonétique','phonétiques','phonetic'],
  ['valeur','valeurs','value','values'],['lecture','lectures','reading','readings'],
  ['hiéroglyphe','hiéroglyphes','hieroglyph','hieroglyphs'],
  ['onomastique','onomastics'],['radical','radicaux','radicals'],
  ['bilitère','bilitères','deux radicaux','two radicals'],
  ['préfixé','préfixée','préfixés','préfixées','prefixed'],
  ['graphie','graphies','spelling','spellings'],['écriture','écritures','writing','writings'],
  ['nominalisateur','nominalisateurs','nominaliseur','nominaliseurs','nominalizer','nominalizers'],
  ['locution adverbiale','locutions adverbiales','expression adverbiale','expressions adverbiales','adverbial phrase','adverbial phrases'],
  ['article indéfini','articles indéfinis','indefinite article','indefinite articles'],
  ['réduction phonétique','érosion phonétique','phonetic reduction'],
  ['réemploi orthographique','réutilisation orthographique','orthographic reuse'],
  ['morphème','morphèmes','morpheme','morphemes'],
  ['étymologie','etymology'],['grammaticalisation','grammaticalization'],
  ['animal','animaux','animals','faune','fauna','حيوانات'],
  ['plante','plantes','plant','plants','végétal','végétaux','flore','flora','نباتات'],
  ['minéral','minéraux','mineral','minerals'],
  ['nuisible','nuisibles','nocif','nocifs','nocive','nocives','harmful','damaging','dommageable','dommageables'],
  ['dangereux','dangereuse','dangereuses','dangerous'],
  ['venimeux','venimeuse','venimeuses','venomous'],
  ['vénéneux','vénéneuse','vénéneuses','poisonous'],
  ['toxique','toxiques','toxic'],
  ['typhon','typhonien','typhonienne','typhoniens','typhoniennes'],
  ['seth','séthien','séthienne','séthiens','séthiennes'],
  ['âne','ânes','baudet','baudets','donkey','donkeys'],
  ['hippopotame','hippopotames','hippopotamus','hippopotamuses'],
  ['crocodile','crocodiles'],['passion','passions'],['vice','vices'],
  ['égyptomanie','egyptomania'],['mode','mode vestimentaire','fashion'],
  ['vêtement','vêtements','habillement','vestimentaire','clothing','clothes','garment','garments'],
  ['robe','robes','dress','dresses','gown','gowns'],
  ['tissu','tissus','fabric','fabrics'],
  ['bijou','bijoux','bijouterie','jewellery','jewelry'],
  ['broderie','broderies','embroidery','embroideries'],
  ['motif','motifs','pattern','patterns'],
  ['scarabée','scarabées','scarab','scarabs'],['sphinx','sphinxes'],
  ['ceinture','ceintures','belt','belts'],['coiffure','coiffures','hairstyle','hairstyles'],
  ['accessoire','accessoires','accessory','accessories'],
  ['influence','influences'],['inspiration','inspirations'],
];
// fold est une déclaration de fonction, donc disponible avant son emplacement.
for(const family of CORPUS_LEXICAL_FAMILIES){
  const variants=[...new Set(family.map(fold))];
  for(const alias of variants)CURATED_EQUIVALENTS.set(alias,[...new Set([...(CURATED_EQUIVALENTS.get(alias)||[]),...variants.filter(term=>term!==alias)])]);
}
const CURATED_PHRASES=[...CURATED_EQUIVALENTS.keys()]
  .filter(key=>key.includes(' ')).sort((a,b)=>b.split(' ').length-a.split(' ').length);

function fold(value){return String(value||'').toLowerCase().normalize('NFKC').normalize('NFD')
  // Grec polytonique : ignorer accents et esprits, rapprocher σ/ς/ϲ.
  // L'iota souscrit est une lettre historique et ne doit PAS disparaître :
  // ᾳ et α restent distincts, tandis que ᾳ et αι sont interrogeables ensemble.
  .replace(/\u0345/gu,'ι').replace(/[ςϲ]/gu,'σ')
  .replace(/\p{M}/gu,'').replace(/ـ/gu,'').replace(/[ىی]/gu,'ي').replace(/ک/gu,'ك')
  // Les PDF accolent parfois un mot copte et le commentaire latin sans espace
  // (« Ⲙ︦ⲠⲈand »). Ces alphabets sont des séquences distinctes à la recherche.
  .replace(/([\p{Script=Coptic}])(?=[a-z])/gu,'$1 ')
  .replace(/([a-z])(?=[\p{Script=Coptic}])/gu,'$1 ')
  .replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
function words(value){return fold(value).split(/\s+/).filter(w=>
  (w.length>1||/^[\p{Script=Coptic}\p{Script=Greek}]$/u.test(w))&&!STOP.has(w));}

// Les siècles sont des expressions datées, jamais des nombres isolés :
// XIXe siècle, 19th century et nineteenth-century désignent la même période.
// L'ère n'est pas déduite d'un numéro : une mention sans ère reste non précisée.
const CENTURY_ORDINALS=new Map([
  ['first',1],['second',2],['third',3],['fourth',4],['fifth',5],['sixth',6],['seventh',7],['eighth',8],['ninth',9],['tenth',10],
  ['eleventh',11],['twelfth',12],['thirteenth',13],['fourteenth',14],['fifteenth',15],['sixteenth',16],['seventeenth',17],['eighteenth',18],['nineteenth',19],
  ['twentieth',20],['thirtieth',30],['fortieth',40],['fiftieth',50],['sixtieth',60],['seventieth',70],['eightieth',80],['ninetieth',90],['hundredth',100],
  ['premier',1],['premiere',1],['second',2],['deuxieme',2],['troisieme',3],['quatrieme',4],['cinquieme',5],['sixieme',6],['septieme',7],['huitieme',8],['neuvieme',9],['dixieme',10],
  ['onzieme',11],['douzieme',12],['treizieme',13],['quatorzieme',14],['quinzieme',15],['seizieme',16],['dix septieme',17],['dix huitieme',18],['dix neuvieme',19],['vingtieme',20],['vingt et unieme',21],['trentieme',30],
]);
for(const [tens,value] of [['twenty',20],['thirty',30],['forty',40],['fifty',50],['sixty',60],['seventy',70],['eighty',80],['ninety',90]]){
  for(const [unit,number] of [...CENTURY_ORDINALS].filter(([word,n])=>n<10&&/^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth)$/u.test(word)))CENTURY_ORDINALS.set(`${tens} ${unit}`,value+number);
}
const CENTURY_NUMBER_SOURCE=`(?:${[...CENTURY_ORDINALS.keys()].sort((a,b)=>b.length-a.length).map(word=>word.replaceAll(' ','[\\s-]+')).join('|')}|[0-9]{1,3}(?:er|re|eme|e|st|nd|rd|th)?|[ivxlcdm]+(?:er|re|eme|e|st|nd|rd|th)?)`;
const CENTURY_JOIN_SOURCE='(?:\\s*(?:[-–—/]|et|and|a|au|to|through)\\s*(?:(?:the|early|late)\\s+)*)';
const CENTURY_EXPRESSION_PATTERN=new RegExp(`(?<![\\p{L}\\p{N}])${CENTURY_NUMBER_SOURCE}(?:${CENTURY_JOIN_SOURCE}${CENTURY_NUMBER_SOURCE}){0,3}\\s*[-]?\\s*(?:siecles?|centur(?:y|ies))(?![\\p{L}])`,'gu');
const CENTURY_NUMBER_PATTERN=new RegExp(`(?<![\\p{L}\\p{N}])${CENTURY_NUMBER_SOURCE}(?![\\p{L}\\p{N}])`,'gu');
function normalizedCenturyText(value){return String(value||'').normalize('NFKC').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase()
  .replace(/[٠-٩۰-۹]/gu,char=>String(char.charCodeAt(0)-(char<='٩'?0x660:0x6f0))).replace(/[’‘]/gu,"'");}
function centuryOriginalOffset(value,offset){let at=0,index=0;for(const char of String(value)){if(at>=offset)return index;at+=normalizedCenturyText(char).length;index+=char.length;}return index;}
function romanCentury(number){let rest=number,out='';for(const [value,sign] of [[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(rest>=value){out+=sign;rest-=value;}return out;}
function centuryNumber(value){
  const token=normalizedCenturyText(value).replace(/[-\s]+/gu,' ').trim();
  if(CENTURY_ORDINALS.has(token))return CENTURY_ORDINALS.get(token);
  const numeral=token.replace(/(?:er|re|eme|e|st|nd|rd|th)$/u,'');
  if(/^\d{1,3}$/u.test(numeral)){const number=Number(numeral);return number>0&&number<=100?number:null;}
  if(!/^[ivxlcdm]+$/u.test(numeral))return null;
  const values={i:1,v:5,x:10,l:50,c:100,d:500,m:1000};let number=0;
  for(let i=0;i<numeral.length;i++)number+=values[numeral[i]]<(values[numeral[i+1]]||0)?-values[numeral[i]]:values[numeral[i]];
  return number>0&&number<=100&&romanCentury(number).toLowerCase()===numeral?number:null;
}
const CENTURY_CE_ABBREVIATION_SOURCE='(?:A\\s*D|C\\s*E|[Aa]\\.\\s*[Dd]\\.?|[Cc]\\.\\s*[Ee]\\.?)';
function centuryEra(value){
  const text=normalizedCenturyText(value);
  const bc=text.match(/^\s*(?:\(\s*)?(?:av(?:ant)?\.?\s*(?:j\.?\s*[-–]?\s*c\.?|n(?:otre)?\.?\s*e(?:re)?\.?)|avant\s+notre\s+ere|before\s+(?:christ|(?:the\s+)?common\s+era)|b\.?\s*c\.?(?:\s*e\.?)?)(?![\p{L}])/u);
  if(bc)return {era:'bce',length:bc[0].length};
  const ce=text.match(/^\s*(?:\(\s*)?(?:ap(?:r(?:es)?)?\.?\s*(?:j\.?\s*[-–]?\s*c\.?|n(?:otre)?\.?\s*e(?:re)?\.?)|de\s+notre\s+ere|common\s+era)(?![\p{L}])/u);
  if(ce)return {era:'ce',length:ce[0].length};
  // « ce siècle » contient le démonstratif français, pas l'abréviation CE.
  // Les abréviations nues gardent leur casse ; les formes ponctuées sont explicites.
  const abbreviation=String(value||'').normalize('NFKC').match(new RegExp(`^\\s*(?:\\(\\s*)?${CENTURY_CE_ABBREVIATION_SOURCE}(?![\\p{L}])`,'u'));
  return abbreviation?{era:'ce',length:normalizedCenturyText(abbreviation[0]).length}:{era:null,length:0};
}
function centuryExpressions(value){
  const original=String(value||''),text=normalizedCenturyText(original),found=[];
  for(const match of text.matchAll(CENTURY_EXPRESSION_PATTERN)){
    const ending=match[0].match(/(?:siecles?|centur(?:y|ies))$/u)[0];
    const numbers=[...new Set([...match[0].slice(0,-ending.length).matchAll(CENTURY_NUMBER_PATTERN)].map(part=>centuryNumber(part[0])).filter(Boolean))];
    if(!numbers.length)continue;
    const matchEnd=match.index+match[0].length;
    const suffix=centuryEra(original.slice(centuryOriginalOffset(original,matchEnd)));
    let originalStart=centuryOriginalOffset(original,match.index),era=suffix.era;
    const prefix=original.slice(Math.max(0,originalStart-20),originalStart).match(new RegExp(`(?:^|\\s)${CENTURY_CE_ABBREVIATION_SOURCE}\\s*$`,'u'));
    if(prefix&&!era){originalStart-=prefix[0].length;while(/\s/u.test(original[originalStart]))originalStart++;era='ce';}
    const originalEnd=centuryOriginalOffset(original,matchEnd+suffix.length);
    found.push({numbers,era,start:originalStart,end:originalEnd,source:original.slice(originalStart,originalEnd)});
  }
  return found;
}
function centuryLabel(numbers,era){
  const labels=numbers.map(number=>LANGUAGE==='en'?`${number}${number%100>=11&&number%100<=13?'th':({1:'st',2:'nd',3:'rd'}[number%10]||'th')}`:`${romanCentury(number)}${number===1?'er':'e'}`);
  return `${labels.join(' / ')} ${LANGUAGE==='en'?(numbers.length>1?'centuries':'century'):(numbers.length>1?'siècles':'siècle')}${era?(LANGUAGE==='en'?(era==='bce'?' BCE':' CE'):(era==='bce'?' av. J.-C.':' apr. J.-C.')):''}`;
}
function centuryConcept(expression){
  const numbers=[...expression.numbers].sort((a,b)=>a-b),id=`century:${numbers.join(',')}:${expression.era||'any'}`;
  if(!CONTROLLED_CONCEPTS.has(id))CONTROLLED_CONCEPTS.set(id,{id,kind:'century',label:centuryLabel(numbers,expression.era),numbers,era:expression.era,queries:[],evidence:[]});
  return id;
}
function centuryMentions(text,concept){return centuryExpressions(text).filter(hit=>hit.numbers.some(number=>concept.numbers.includes(number))&&(!concept.era||hit.era===concept.era))
  .map(hit=>({pos:fold(String(text).slice(0,hit.start)).length,surface:hit.source,section:null,kind:'century'}));}

// Les titres des grands corpus anciens ne sont pas des listes de mots-clés :
// « Textes des Pyramides » est une unité documentaire, pas la conjonction
// aléatoire des mots « textes » et « pyramides ». Une abréviation ne vaut
// indice que comme référence explicite (PT 302, CT 472, BD 125, etc.).
// Sources de nomenclature : IFAO, UCL Digital Egypt, TLA, EEF (abréviations).
const EGYPTIAN_CORPORA=[
  {id:'pt',label:'Textes des Pyramides',aliases:['Textes des Pyramides','Pyramid Texts','Pyramidentexte','Textos de las Pirámides','Textos das Pirâmides','Testi delle Piramidi','نصوص الأهرام'],codes:['PT','TP','Pyr']},
  {id:'ct',label:'Textes des Sarcophages',aliases:['Textes des Sarcophages','Coffin Texts','Sargtexte','Sargtext','Textos de los Sarcófagos','Textos dos Sarcófagos','Testi dei Sarcofagi','نصوص التوابيت'],codes:['CT']},
  {id:'bd',label:'Livre des Morts',aliases:['Livre des Morts','Book of the Dead','Totenbuch','Libro de los Muertos','Livro dos Mortos','Libro dei Morti','كتاب الموتى'],codes:['BD','LdM','Tb']},
  {id:'two-ways',label:'Livre des Deux Chemins',aliases:['Livre des Deux Chemins','Book of Two Ways','Zweiwegebuch','Libro de los Dos Caminos','Livro dos Dois Caminhos','كتاب الطريقين']},
  {id:'amduat',label:'Amdouat',aliases:['Amdouat','Amduat','Livre de l’Amdouat','Book of the Amduat','Buch vom Amduat']},
  {id:'gates',label:'Livre des Portes',aliases:['Livre des Portes','Book of Gates','Pfortenbuch','Libro de las Puertas','Livro das Portas','Libro delle Porte','كتاب البوابات']},
  {id:'caverns',label:'Livre des Cavernes',aliases:['Livre des Cavernes','Book of Caverns','Höhlenbuch','Libro de las Cavernas','Livro das Cavernas']},
  {id:'earth',label:'Livre de la Terre',aliases:['Livre de la Terre','Book of the Earth','Erdbuch']},
  {id:'litany-re',label:'Litanies de Rê',aliases:['Litanies de Rê','Litanies de Râ','Litany of Re','Litany of Ra','Sonnenlitanei','Litanie du Soleil']},
  {id:'night',label:'Livre de la Nuit',aliases:['Livre de la Nuit','Book of Night','Buch von der Nacht']},
  {id:'day',label:'Livre du Jour',aliases:['Livre du Jour','Book of Day']},
  {id:'cow',label:'Livre de la Vache du Ciel',aliases:['Livre de la Vache du Ciel','Book of the Heavenly Cow','Buch von der Himmelskuh']},
  // Œuvres littéraires souvent interrogées comme corpus de témoins manuscrits.
  {id:'sinuhe',label:'Sinouhé',aliases:['Sinouhé','Sinuhe','Sanehat','Sanehet','Story of Sinuhe','Tale of Sinuhe','Histoire de Sinouhé','Historia de Sinuhé']},
  {id:'peasant',label:'Paysan éloquent',aliases:['Paysan éloquent','Le Paysan éloquent','Eloquent Peasant','Eloquenter Bauer','Campesino elocuente','Camponês eloquente','Tale of Khuninpu']},
  {id:'westcar',label:'Papyrus Westcar',aliases:['Papyrus Westcar','Westcar Papyrus','Contes du papyrus Westcar','Tales of the Court of King Khufu']},
  {id:'ptahhotep',label:'Enseignement de Ptahhotep',aliases:['Enseignement de Ptahhotep','Instruction de Ptahhotep','Maximes de Ptahhotep','Teaching of Ptahhotep','Instructions of Ptahhotep','Lehre des Ptahhotep']},
  {id:'ipuwer',label:'Lamentations d’Ipou-Our',aliases:['Lamentations d’Ipou-Our','Admonitions of Ipuwer','Lament of Ipuwer','Ipuwer Papyrus','Papyrus d’Ipou-Our']},
  {id:'wenamun',label:'Voyage d’Ounamon',aliases:['Voyage d’Ounamon','Histoire d’Ounamon','Wenamun','Wen-Amun','Story of Wenamun','Report of Wenamun']},
];

// Une catégorie de l'annotation morphosyntaxique (UD Egyptian, TLA) est
// rapprochée de ses dénominations usuelles. « Déterminatif » est graphique,
// tandis que DET / « déterminant » est une partie du discours : distinction
// impérative. Les abréviations isolées n., v., adj. ne sont pas des preuves.
const EGYPTIAN_POS=[
  {id:'noun',label:'Nom / substantif (NOUN)',queries:['nom commun','noms communs','nom substantif','substantif','substantifs','noun','nouns','common noun','common nouns','substantive','Substantiv','sustantivo','substantivo','اسم','الاسم','الأسماء','NOUN'],evidence:['nom commun','noms communs','substantif','substantifs','noun','nouns','common noun','common nouns','substantive','Substantiv','sustantivo','substantivo','NOUN']},
  {id:'proper-noun',label:'Nom propre (PROPN)',queries:['nom propre','noms propres','proper noun','proper nouns','proper name','proper names','Eigenname','nombre propio','nome próprio','nome proprio','اسم علم','PROPN'],evidence:['nom propre','noms propres','proper noun','proper nouns','proper name','proper names','Eigenname','nombre propio','nome próprio','nome proprio','PROPN']},
  {id:'adjective',label:'Adjectif (ADJ)',queries:['adjectif','adjectifs','adjective','adjectives','Adjektiv','adjetivo','aggettivo','صفة','الصفة','الصفات','ADJ'],evidence:['adjectif','adjectifs','adjective','adjectives','Adjektiv','adjetivo','aggettivo','ADJ']},
  {id:'verb',label:'Verbe (VERB)',queries:['verbe','verbes','verb','verbs','Verb','verbo','فعل','الفعل','أفعال','VERB'],evidence:['verbe','verbes','verb','verbs','Verb','verbo','VERB']},
  {id:'auxiliary',label:'Auxiliaire (AUX)',queries:['auxiliaire','auxiliary verb','auxiliary','Hilfsverb','verbo auxiliar','الفعل المساعد','AUX'],evidence:['auxiliaire','auxiliary verb','auxiliary','Hilfsverb','verbo auxiliar','AUX']},
  {id:'adverb',label:'Adverbe (ADV)',queries:['adverbe','adverbes','adverb','adverbs','Adverb','adverbio','advérbio','ظرف','ADV'],evidence:['adverbe','adverbes','adverb','adverbs','Adverb','adverbio','advérbio','ADV']},
  {id:'adposition',label:'Préposition / adposition (ADP)',queries:['préposition','prépositions','preposition','prepositions','adposition','adpositions','Präposition','preposición','preposição','preposizione','حرف جر','ADP'],evidence:['préposition','prépositions','preposition','prepositions','adposition','adpositions','Präposition','preposición','preposição','preposizione','ADP']},
  {id:'pronoun',label:'Pronom (PRON)',queries:['pronom','pronoms','pronoun','pronouns','Pronomen','pronombre','pronome','ضمير','الضمير','ضمائر','PRON'],evidence:['pronom','pronoms','pronoun','pronouns','Pronomen','pronombre','pronome','PRON']},
  {id:'determiner',label:'Déterminant grammatical (DET)',queries:['déterminant grammatical','déterminants grammaticaux','déterminant','déterminants','determiner','determiners','determiner word','article défini','definite article','Determinator','determinante','أداة تعريف','DET'],evidence:['déterminant grammatical','déterminants grammaticaux','déterminant','déterminants','determiner','determiners','article défini','definite article','Determinator','determinante','DET']},
  {id:'particle',label:'Particule (PART)',queries:['particule','particules','particle','particles','Partikel','partícula','particella','حرف معنى','PART'],evidence:['particule','particules','particle','particles','Partikel','partícula','particella','PART']},
  {id:'conjunction',label:'Conjonction (catégorie générale)',queries:['conjonction','conjonctions','conjunction','conjunctions','Konjunktion','conjunción','conjunção','congiunzione'],evidence:['conjonction','conjonctions','conjunction','conjunctions','Konjunktion','conjunción','conjunção','congiunzione']},
  {id:'coordinating-conj',label:'Conjonction de coordination (CCONJ)',queries:['conjonction de coordination','coordinating conjunction','coordination conjunction','nebenordnende Konjunktion','conjunción coordinante','conjunção coordenativa','CCONJ'],evidence:['conjonction de coordination','coordinating conjunction','nebenordnende Konjunktion','conjunción coordinante','conjunção coordenativa','CCONJ']},
  {id:'subordinating-conj',label:'Conjonction de subordination (SCONJ)',queries:['conjonction de subordination','subordinating conjunction','subordination conjunction','unterordnende Konjunktion','conjunción subordinante','conjunção subordinativa','SCONJ'],evidence:['conjonction de subordination','subordinating conjunction','unterordnende Konjunktion','conjunción subordinante','conjunção subordinativa','SCONJ']},
  {id:'numeral',label:'Numéral (NUM)',queries:['numéral','numéral cardinal','numeral','number word','Numerale','Zahlwort','numeral cardinal','nombre numeral','عدد','NUM'],evidence:['numéral','numeral','number word','Numerale','Zahlwort','numeral cardinal','NUM']},
  {id:'interjection',label:'Interjection (INTJ)',queries:['interjection','Interjektion','interjección','interjeição','تعجب','INTJ'],evidence:['interjection','Interjektion','interjección','interjeição','INTJ']},
  {id:'punctuation',label:'Ponctuation (PUNCT)',queries:['ponctuation','punctuation','Interpunktion','puntuación','pontuação','علامة ترقيم','PUNCT'],evidence:['ponctuation','punctuation','Interpunktion','puntuación','pontuação','PUNCT']},
  {id:'symbol',label:'Symbole comme catégorie (SYM)',queries:['symbole catégorie grammaticale','symbol part of speech','symbole UPOS','SYM'],evidence:['symbol part of speech','symbole UPOS','SYM']},
  {id:'unclassified',label:'Catégorie non déterminée (X)',queries:['catégorie indéterminée','unknown part of speech','unclassified POS','unclassified lexical category'],evidence:['catégorie indéterminée','unknown part of speech','unclassified POS','unclassified lexical category']},
  // Spécialités égyptologiques : marques linguistiques différentes des UPOS.
  {id:'suffix-pronoun',label:'Pronom suffixe',queries:['pronom suffixe','pronom suffixé','suffix pronoun','suffixpronomen','pronombre sufijo'],evidence:['pronom suffixe','pronom suffixé','suffix pronoun','suffixpronomen','pronombre sufijo']},
  {id:'dependent-pronoun',label:'Pronom dépendant',queries:['pronom dépendant','dependent pronoun','abhängiges Pronomen'],evidence:['pronom dépendant','dependent pronoun','abhängiges Pronomen']},
  {id:'enclitic-pronoun',label:'Pronom enclitique',queries:['pronom enclitique','enclitic pronoun','enklitisches Pronomen'],evidence:['pronom enclitique','enclitic pronoun','enklitisches Pronomen']},
  {id:'independent-pronoun',label:'Pronom indépendant',queries:['pronom indépendant','independent pronoun','selbständiges Pronomen'],evidence:['pronom indépendant','independent pronoun','selbständiges Pronomen']},
  {id:'proclitic-pronoun',label:'Pronom proclitique',queries:['pronom proclitique','proclitic pronoun','proklitisches Pronomen'],evidence:['pronom proclitique','proclitic pronoun','proklitisches Pronomen']},
  {id:'participle',label:'Participe',queries:['participe','participes','participle','participles','Partizip','Partizipien','participio','participios','particípio','particípios'],evidence:['participe','participes','participle','participles','Partizip','Partizipien','participio','participios','particípio','particípios'],featureValue:'Part'},
  {id:'infinitive',label:'Infinitif',queries:['infinitif','infinitifs','infinitive','infinitives','Infinitiv','Infinitive','infinitivo','infinitivos'],evidence:['infinitif','infinitifs','infinitive','infinitives','Infinitiv','Infinitive','infinitivo','infinitivos'],featureValue:'Inf'},
  {id:'stative',label:'Statif / pseudoparticipe',queries:['statif','statifs','stative','statives','pseudoparticipe','pseudoparticipes','pseudo-participe','pseudo-participes','pseudoparticiple','pseudoparticiples','pseudo-participle','pseudo-participles','Pseudopartizip','Pseudopartizips','Pseudopartizipien'],evidence:['statif','statifs','stative','statives','pseudoparticipe','pseudoparticipes','pseudo-participe','pseudo-participes','pseudoparticiple','pseudoparticiples','pseudo-participle','pseudo-participles','Pseudopartizip','Pseudopartizips','Pseudopartizipien']},
  {id:'relative-verb',label:'Forme verbale relative',queries:['forme verbale relative','forme relative du verbe','relative verb form','relative forms','Relativform'],evidence:['forme verbale relative','forme relative du verbe','relative verb form','relative forms','Relativform']},
  {id:'nisba',label:'Adjectif nisbe',queries:['adjectif nisbe','adjectif nisbé','nisbe adjective','nisba adjective','Nisbe-Adjektiv'],evidence:['adjectif nisbe','adjectif nisbé','nisbe adjective','nisba adjective','Nisbe-Adjektiv']},
  {id:'classifier',label:'Déterminatif / classificateur graphique',queries:['déterminatif','déterminatifs','classificateur graphique','classificateurs graphiques','classificateur égyptien','determinative','determinatives','Egyptian classifier','Egyptian classifiers','classifier sign','classifier signs','Deutzeichen'],evidence:['déterminatif','déterminatifs','classificateur graphique','classificateurs graphiques','classificateur égyptien','determinative','determinatives','Egyptian classifier','Egyptian classifiers','classifier sign','classifier signs','Deutzeichen']},
  // Catégories de lemmes du TLA : précises, mais pas des « parties du discours » UD.
  {id:'personal-name',label:'Anthroponyme / nom de personne',queries:['anthroponyme','anthroponymes','nom de personne','personal name','personal names','Personenname','nombre personal'],evidence:['anthroponyme','anthroponymes','nom de personne','personal name','personal names','Personenname','nombre personal']},
  {id:'place-name',label:'Toponyme / nom de lieu',queries:['toponyme','toponymes','nom de lieu','place name','place names','toponym','toponyms','Ortsname'],evidence:['toponyme','toponymes','nom de lieu','place name','place names','toponym','toponyms','Ortsname']},
  {id:'divine-name',label:'Théonyme / nom de divinité',queries:['théonyme','theonym','nom de divinité','divine name','deity name','Göttername'],evidence:['théonyme','theonym','nom de divinité','divine name','deity name','Göttername']},
  {id:'royal-name',label:'Nom royal / nom de souverain',queries:['nom royal','nom de souverain','royal name','royal names','Königsname'],evidence:['nom royal','nom de souverain','royal name','royal names','Königsname']},
  {id:'epithet',label:'Épithète',queries:['épithète','épithètes','epithet','epithets','Beiname','epíteto','epiteto'],evidence:['épithète','épithètes','epithet','epithets','Beiname','epíteto','epiteto']},
  {id:'title',label:'Titre / titulature dans les textes anciens',queries:['titulature','titre de fonction','titre égyptien','royal titulary','Egyptian title','Egyptian titles','Amtstitel'],evidence:['titulature','titre de fonction','titre égyptien','royal titulary','Egyptian title','Egyptian titles','Amtstitel']},
];
// Une recherche sur une langue retrouve aussi les graphies réellement
// présentes dans son écriture, sans exiger que « Coptic » ou « arabe »
// figure dans le même passage. La présence d'une écriture est un indice,
// non une preuve linguistique absolue (l'écriture arabe sert à plusieurs
// langues ; le grec et le copte partagent certains caractères).
const LANGUAGE_CONCEPTS=[
  {id:'arabic',label:'Arabe',kind:'language',
    queries:['arabe','arabes','langue arabe','en arabe','écriture arabe','Arabic','Arabic language','Arabic script','Arabisch','arabische Sprache','árabe','lengua árabe','língua árabe','lingua araba','عربي','عربية','العربية','اللغة العربية','باللغة العربية','الكتابة العربية'],
    evidence:['arabe','arabes','arabic','arabisch','arabische','árabe','araba','عربي','عربية','العربية'],
    script:'arabic'},
  {id:'coptic',label:'Copte',kind:'language',
    queries:['copte','coptes','langue copte','écriture copte','Coptic','Coptic language','Coptic script','Koptisch','koptische Sprache','copto','copta','lengua copta','língua copta','lingua copta','قبطي','قبطية','القبطية','اللغة القبطية','الكتابة القبطية'],
    evidence:['copte','coptes','coptic','koptisch','koptische','copto','copta','قبطي','قبطية','القبطية'],
    script:'coptic'},
  {id:'greek',label:'Grec',kind:'language',
    queries:['grec','grecque','grecs','grecques','grec ancien','grec classique','langue grecque','langue grecque ancienne','en grec','écriture grecque','Greek','Greek language','Greek script','Ancient Greek','Ancient Greek language','Classical Greek','in Greek','Griechisch','Altgriechisch','griego','griega','griego antiguo','grego','grega','grego antigo','greco','greca','greco antico','ελληνικά','αρχαία ελληνικά','يوناني','يونانية','اليونانية','اللغة اليونانية','اليونانية القديمة','إغريقي','إغريقية','الإغريقية'],
    evidence:['grec','grecque','grecs','grecques','greek','griechisch','altgriechisch','griego','griega','grego','grega','greco','greca','ελληνικά','يوناني','يونانية','اليونانية','إغريقي','إغريقية','الإغريقية'],
    script:'greek'},
];
const LANGUAGE_SCRIPT_PATTERNS={
  arabic:/[\p{Script=Arabic}][\p{Script=Arabic}\p{M}]*/gu,
  coptic:/[\p{Script=Coptic}][\p{Script=Coptic}\p{M}]*/gu,
  greek:/(?<![\p{L}\p{M}])[\p{Script=Greek}][\p{Script=Greek}\p{M}]*(?![\p{L}\p{M}])/gu,
};
// Groupes d'exploration bibliographique, distincts des annotations UPOS.
// Non-finite est ici un groupe, jamais une valeur UD ajoutée.
// https://universaldependencies.org/u/feat/VerbForm.html
// https://universaldependencies.org/egy/feat/SubForm.html
// https://wikis.hu-berlin.de/interlinear_glossing/Ancient_Egyptian:Glossing_of_common_Earlier_Egyptian_forms
const GRAMMAR_SEARCH_CONCEPTS=[
  {id:'verbal-family',label:'Verbe et formes verbales (groupe de recherche)',aggregate:true,
    queries:['verbe','verbes','verb','verbs','forme verbale','formes verbales','verbal form','verbal forms'],
    evidence:['verbe','verbes','verb','verbs','forme verbale','formes verbales','verbal form','verbal forms']},
  {id:'nominal-family',label:'Nom et dénominations (groupe de recherche)',aggregate:true,
    queries:['nom','noms','noun','nouns','groupe nominal traditionnel','nouns and names'],
    evidence:['nom','noms','noun','nouns','substantif','substantifs']},
  {id:'proper-name-family',label:'Noms propres (groupe de recherche)',aggregate:true,
    queries:['noms propres groupe','proper names group'],evidence:[]},
  {id:'personal-name-family',label:'Noms de personnes (groupe de recherche)',aggregate:true,
    queries:['noms de personnes groupe','personal names group'],evidence:[]},
  {id:'pronoun-family',label:'Pronoms (groupe de recherche)',aggregate:true,
    queries:['pronom','pronoms','pronoun','pronouns'],evidence:['pronom','pronoms','pronoun','pronouns']},
  {id:'finite',label:'Forme finie (Fin)',
    queries:['finite','finite form','finite forms','finite verb','finite verbs','finite verb form','finite verb forms','forme finie','formes finies','forme verbale finie','formes verbales finies'],
    evidence:['finite','finite form','finite forms','finite verb','finite verbs','forme finie','formes finies','forme verbale finie','formes verbales finies'],featureValue:'Fin'},
  {id:'nonfinite',label:'Formes non finies (groupe de recherche)',aggregate:true,
    queries:['nonfinite','non-finite','non finite','nonfinite form','nonfinite forms','non-finite form','non-finite forms','non-finite verbs','forme non finie','formes non finies','forme verbale non finie','formes verbales non finies'],
    evidence:['nonfinite','non-finite','non finite','forme non finie','formes non finies','forme verbale non finie','formes verbales non finies']},
  {id:'converb',label:'Converbe',queries:['converbe','converbes','converb','converbs'],evidence:['converbe','converbes','converb','converbs'],featureValue:'Conv'},
  {id:'verbal-noun',label:'Nom verbal (terminologie des articles)',queries:['nom verbal','noms verbaux','verbal noun','verbal nouns'],evidence:['nom verbal','noms verbaux','verbal noun','verbal nouns']},
  {id:'vnoun',label:'Nom verbal distinct de l’infinitif (Vnoun)',queries:['nom verbal UD','verbal noun UD','nom verbal autre que l infinitif','verbal noun other than the infinitive'],evidence:['verbal noun other than an infinitive','verbal noun other than the infinitive','nom verbal autre que l infinitif'],featureValue:'Vnoun',literalCodes:['Vnoun']},
  {id:'nominal-use',label:'Emploi nominal d’une forme verbale',queries:['emploi nominal','usage nominal','nominal use','nominal function','used nominally'],evidence:['emploi nominal','usage nominal','nominal use','nominal function','used nominally','substantival use']},
  {id:'imperative',label:'Impératif',queries:['impératif','impératifs','imperative','imperatives'],evidence:['impératif','impératifs','imperative','imperatives']},
];
const GRAMMAR_HIERARCHY=[
  ['grammar:verbal-family','pos:verb'],['grammar:verbal-family','grammar:finite'],['grammar:verbal-family','grammar:nonfinite'],
  ['grammar:verbal-family','pos:stative'],['grammar:verbal-family','pos:relative-verb'],['grammar:verbal-family','grammar:imperative'],['grammar:verbal-family','grammar:verbal-noun'],
  ['grammar:nonfinite','pos:participle'],['grammar:nonfinite','pos:infinitive'],['grammar:nonfinite','grammar:converb'],['grammar:nonfinite','grammar:vnoun'],
  ['grammar:nominal-family','pos:noun'],['grammar:nominal-family','grammar:proper-name-family'],
  ['grammar:proper-name-family','pos:proper-noun'],['grammar:proper-name-family','grammar:personal-name-family'],['grammar:proper-name-family','pos:divine-name'],['grammar:proper-name-family','pos:place-name'],
  ['grammar:personal-name-family','pos:personal-name'],['grammar:personal-name-family','pos:royal-name'],
  ['grammar:pronoun-family','pos:pronoun'],['grammar:pronoun-family','pos:suffix-pronoun'],['grammar:pronoun-family','pos:dependent-pronoun'],['grammar:pronoun-family','pos:enclitic-pronoun'],['grammar:pronoun-family','pos:independent-pronoun'],['grammar:pronoun-family','pos:proclitic-pronoun'],
  ['pos:conjunction','pos:coordinating-conj'],['pos:conjunction','pos:subordinating-conj'],
];
// Ces rapprochements proposent une autre recherche ; ils n'élargissent aucune preuve.
const GRAMMAR_ASSOCIATIONS=[
  ['grammar:verbal-family','grammar:nominal-family','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['pos:participle','pos:verb','Partie du discours et forme verbale restent distinctes.'],
  ['pos:participle','pos:adjective','Partie du discours et forme verbale restent distinctes.'],
  ['pos:infinitive','grammar:nominal-use','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['grammar:verbal-noun','grammar:nominal-use','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['grammar:verbal-noun','grammar:vnoun','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['grammar:verbal-noun','pos:infinitive','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['grammar:vnoun','grammar:nominal-family','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['grammar:nominal-use','grammar:nominal-family','Un emploi nominal ne transforme pas automatiquement une forme en NOUN ou en Vnoun.'],
  ['pos:stative','grammar:finite','Le profil Egyptian-PC traite le statif et certaines formes relatives comme finis ; cette correspondance dépend de l’analyse.'],
  ['pos:relative-verb','grammar:finite','Le profil Egyptian-PC traite le statif et certaines formes relatives comme finis ; cette correspondance dépend de l’analyse.'],
  ['grammar:imperative','grammar:finite','Partie du discours et forme verbale restent distinctes.'],
  ['pos:auxiliary','pos:verb','Partie du discours et forme verbale restent distinctes.'],
];
// Nomenclatures : BnF/RAMEAU (Licence ouverte), PACTOLS (CNRS-Frantiq, ODbL),
// et sources archéologiques citées. Notices, alignements et attributions :
// data/referentiels.json ; aucune requête réseau vers ces autorités.
const CONTEXT_VOCABULARY={"periods":[{"id":"pharaonic","label_fr":"Époque pharaonique","label_en":"Pharaonic period","aliases":["Époque pharaonique","Pharaonic period","période pharaonique","Égypte pharaonique","Pharaonic Egypt","العصر الفرعوني","الفترة الفرعونية"],"evidence":["Époque pharaonique","Pharaonic period","période pharaonique","Égypte pharaonique","Pharaonic Egypt","العصر الفرعوني","الفترة الفرعونية"],"parents":[],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://sis.gov.eg/ar/مصر/التاريخ/تاريخ-مصر/الحقبة-الفرعونية/"]},{"id":"predynastic","label_fr":"Prédynastique","label_en":"Predynastic period","aliases":["Prédynastique","Predynastic period","époque prédynastique","période prédynastique","Égypte prédynastique","Predynastic Egypt","Predynastic","Predynastique","عصر ما قبل الأسرات","عصر ما قبل الاسرات","ما قبل الأسرات","عصر ماقبل الأسرات"],"evidence":["Prédynastique","Predynastic period","époque prédynastique","période prédynastique","Égypte prédynastique","Predynastic Egypt","Predynastic","Predynastique","عصر ما قبل الأسرات","عصر ما قبل الاسرات","ما قبل الأسرات","عصر ماقبل الأسرات"],"parents":[],"related":["proto-dynastic"],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html"]},{"id":"badarian","label_fr":"Badarien","label_en":"Badarian period","aliases":["Badarien","Badarian period","culture badarienne","période badarienne","période de Badari","Badarian culture","Badarian","حضارة البداري","حضارة البدارى","الثقافة البدارية"],"evidence":["Badarien","Badarian period","culture badarienne","période badarienne","période de Badari","Badarian culture","Badarian","حضارة البداري","حضارة البدارى","الثقافة البدارية"],"parents":["predynastic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html"]},{"id":"naqada","label_fr":"Période de Nagada","label_en":"Naqada period","aliases":["Période de Nagada","Naqada period","période de Naqada","culture de Nagada","culture de Naqada","Naqadan period","Naqada culture","عصر نقادة","حضارة نقادة"],"evidence":["Période de Nagada","Naqada period","période de Naqada","culture de Nagada","culture de Naqada","Naqadan period","Naqada culture","عصر نقادة","حضارة نقادة"],"parents":[],"related":["predynastic"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://www.ucl.ac.uk/museums-static/digitalegypt/naqadan/chronology.html"]},{"id":"naqada-1","label_fr":"Nagada I","label_en":"Naqada I","aliases":["Nagada I","Naqada I","Nagada 1","Naqada 1","نقادة الأولى","نقادة 1","نقادة ١","Amratien","Amratian","amratienne"],"evidence":["Nagada I","Naqada I","Nagada 1","Naqada 1","نقادة الأولى","نقادة 1","نقادة ١","Amratien","Amratian","amratienne"],"parents":["naqada","predynastic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://www.ucl.ac.uk/museums-static/digitalegypt/naqadan/chronology.html","https://www.globalegyptianmuseum.org/glossary.aspx?id=256"],"notes":"Le nom de lieu Nagada/Naqada isolé ne constitue pas une attestation de cette phase."},{"id":"naqada-2","label_fr":"Nagada II","label_en":"Naqada II","aliases":["Nagada II","Naqada II","Nagada 2","Naqada 2","نقادة الثانية","نقادة 2","نقادة ٢","Gerzéen","Gerzean","gerzéenne"],"evidence":["Nagada II","Naqada II","Nagada 2","Naqada 2","نقادة الثانية","نقادة 2","نقادة ٢","Gerzéen","Gerzean","gerzéenne"],"parents":["naqada","predynastic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://www.ucl.ac.uk/museums-static/digitalegypt/naqadan/chronology.html","https://www.globalegyptianmuseum.org/glossary.aspx?id=256"],"notes":"Le nom de lieu Nagada/Naqada isolé ne constitue pas une attestation de cette phase."},{"id":"naqada-3","label_fr":"Nagada III","label_en":"Naqada III","aliases":["Nagada III","Naqada III","Nagada 3","Naqada 3","نقادة الثالثة","نقادة 3","نقادة ٣"],"evidence":["Nagada III","Naqada III","Nagada 3","Naqada 3","نقادة الثالثة","نقادة 3","نقادة ٣"],"parents":["naqada"],"related":["proto-dynastic","predynastic","early-dynastic"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://www.ucl.ac.uk/museums-static/digitalegypt/naqadan/chronology.html"],"notes":"Le nom de lieu Nagada/Naqada isolé ne constitue pas une attestation de cette phase."},{"id":"proto-dynastic","label_fr":"Protodynastique","label_en":"Protodynastic period","aliases":["Protodynastique","Protodynastic period","époque protodynastique","période protodynastique","Protodynastic","Proto-dynastic period","الفترة البروتوديناستية","عصر قبيل الأسرات"],"evidence":["Protodynastique","Protodynastic period","époque protodynastique","période protodynastique","Protodynastic","Proto-dynastic period","الفترة البروتوديناستية","عصر قبيل الأسرات"],"parents":[],"related":["predynastic","naqada-3","early-dynastic"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html"],"notes":"Protodynastique a des emplois terminologiques variables ; pas de parent automatique avant/après les premières dynasties."},{"id":"early-dynastic","label_fr":"Époque thinite","label_en":"Early Dynastic Period","aliases":["Époque thinite","Early Dynastic Period","période thinite","époque archaïque égyptienne","période archaïque égyptienne","Égypte archaïque","Archaic Egypt","Early Dynastic Egypt","Archaic Period of Egypt","العصر العتيق","عصر بداية الأسرات","عصر الأسرات المبكرة"],"evidence":["Époque thinite","Early Dynastic Period","période thinite","époque archaïque égyptienne","période archaïque égyptienne","Égypte archaïque","Archaic Egypt","Early Dynastic Egypt","Archaic Period of Egypt","العصر العتيق","عصر بداية الأسرات","عصر الأسرات المبكرة"],"parents":["pharaonic"],"related":["proto-dynastic"],"sources":["https://egymonuments.gov.eg/ar/historical-periods/early-dynastic-period","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html"]},{"id":"old-kingdom","label_fr":"Ancien Empire","label_en":"Old Kingdom","aliases":["Ancien Empire","Old Kingdom","Ancien-Empire","Ancien Empire égyptien","Ancien Empire (Égypte)","Altes Reich","Alten Reich","Alten Reiches","الدولة القديمة","عصر الدولة القديمة","المملكة القديمة"],"evidence":["Ancien Empire","Old Kingdom","Ancien-Empire","Ancien Empire égyptien","Ancien Empire (Égypte)","Altes Reich","Alten Reich","Alten Reiches","الدولة القديمة","عصر الدولة القديمة","المملكة القديمة","Old and Middle Kingdom","Old and Middle Kingdoms","Ancien et Moyen Empire","Ancien et du Moyen Empire","Anciens et Moyens Empires","Ancien et le Moyen Empire","Ancien et Moyen Empires"],"parents":["pharaonic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/oldkingdomkings.html","https://egymonuments.gov.eg/ar/historical-periods/old-kingdom","https://catalogue.bnf.fr/ark:/12148/cb119636443"],"alignment":[{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb119636443","label":"Égypte -- ca. 2686-ca. 2181 av. J.-C. (Ancien Empire)","match":"exact","observed_alt_labels":["Ancien Empire (Égypte)"]}]},{"id":"first-intermediate","label_fr":"Première Période intermédiaire","label_en":"First Intermediate Period","aliases":["Première Période intermédiaire","First Intermediate Period","première période intermédiaire égyptienne","1re période intermédiaire","1ère période intermédiaire","1st Intermediate Period","Ire période intermédiaire","عصر الانتقال الأول","عصر الإنتقال الأول","الفترة الانتقالية الأولى","عصر الاضمحلال الأول"],"evidence":["Première Période intermédiaire","First Intermediate Period","première période intermédiaire égyptienne","1re période intermédiaire","1ère période intermédiaire","1st Intermediate Period","Ire période intermédiaire","عصر الانتقال الأول","عصر الإنتقال الأول","الفترة الانتقالية الأولى","عصر الاضمحلال الأول"],"parents":["pharaonic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/1stintermediateperkings.html","https://nmec.gov.eg/ar/historical-timeline/"]},{"id":"middle-kingdom","label_fr":"Moyen Empire","label_en":"Middle Kingdom","aliases":["Moyen Empire","Middle Kingdom","Moyen-Empire","Moyen Empire égyptien","Moyen Empire (Égypte)","Mittleres Reich","Mittleren Reich","Mittleren Reiches","الدولة الوسطى","عصر الدولة الوسطى","المملكة الوسطى"],"evidence":["Moyen Empire","Middle Kingdom","Moyen-Empire","Moyen Empire égyptien","Moyen Empire (Égypte)","Mittleres Reich","Mittleren Reich","Mittleren Reiches","الدولة الوسطى","عصر الدولة الوسطى","المملكة الوسطى","Old and Middle Kingdom","Old and Middle Kingdoms","Ancien et Moyen Empire","Ancien et du Moyen Empire","Anciens et Moyens Empires","Ancien et le Moyen Empire","Ancien et Moyen Empires"],"parents":["pharaonic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/mk/index.html","https://egymonuments.gov.eg/ar/historical-periods/middle-kingdom","https://pactols.frantiq.fr/opentheso/?idc=3136&idt=TH_1"],"alignment":[{"scheme":"PACTOLS","uri":"https://ark.frantiq.fr/ark:/26678/pcrtQfmmy4haAf","label":"Moyen Empire égyptien","match":"exact","observed_alt_labels":["Moyen Empire","Moyen-Empire"],"observed_related":["XIe dynastie égyptienne"],"observed_narrower":["XIIe dynastie égyptienne"]}]},{"id":"second-intermediate","label_fr":"Deuxième Période intermédiaire","label_en":"Second Intermediate Period","aliases":["Deuxième Période intermédiaire","Second Intermediate Period","seconde période intermédiaire","deuxième période intermédiaire égyptienne","2e période intermédiaire","2nd Intermediate Period","IIe période intermédiaire","عصر الانتقال الثاني","عصر الإنتقال الثاني","الفترة الانتقالية الثانية","عصر الاضمحلال الثاني"],"evidence":["Deuxième Période intermédiaire","Second Intermediate Period","seconde période intermédiaire","deuxième période intermédiaire égyptienne","2e période intermédiaire","2nd Intermediate Period","IIe période intermédiaire","عصر الانتقال الثاني","عصر الإنتقال الثاني","الفترة الانتقالية الثانية","عصر الاضمحلال الثاني"],"parents":["pharaonic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://nmec.gov.eg/ar/historical-timeline/"]},{"id":"new-kingdom","label_fr":"Nouvel Empire","label_en":"New Kingdom","aliases":["Nouvel Empire","New Kingdom","Nouvel-Empire","Nouvel Empire égyptien","Nouvel Empire (Égypte)","Neues Reich","Neuen Reich","Neuen Reiches","الدولة الحديثة","عصر الدولة الحديثة","المملكة الحديثة","عصر الإمبراطورية المصرية"],"evidence":["Nouvel Empire","New Kingdom","Nouvel-Empire","Nouvel Empire égyptien","Nouvel Empire (Égypte)","Neues Reich","Neuen Reich","Neuen Reiches","الدولة الحديثة","عصر الدولة الحديثة","المملكة الحديثة","عصر الإمبراطورية المصرية"],"parents":["pharaonic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/nk/index.html","https://nmec.gov.eg/ar/historical-timeline/","https://catalogue.bnf.fr/ark:/12148/cb11986449d"],"alignment":[{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb11986449d","label":"Égypte -- ca. 1550-ca. 1069 av. J.-C. (Nouvel Empire)","match":"exact","observed_alt_labels":["Nouvel Empire (Égypte)"],"observed_narrower":["XVIIIe dynastie","XIXe dynastie","XXe dynastie"]}]},{"id":"ramesside","label_fr":"Époque ramesside","label_en":"Ramesside period","aliases":["Époque ramesside","Ramesside period","période ramesside","Ramesside","ramessides","Ramessid period","العصر الرعامسي","عصر الرعامسة","الفترة الرعامسية"],"evidence":["Époque ramesside","Ramesside period","période ramesside","Ramesside","ramessides","Ramessid period","العصر الرعامسي","عصر الرعامسة","الفترة الرعامسية"],"parents":["new-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/burialcustoms/latenk.html","https://www.getty.edu/vow/AATFullDisplay?find=nanny&logic=OR&note=&subjectid=300134147"],"notes":"Groupe chronologique XIXe–XXe dynasties, pas équivalent à XIXe seule. Les deux notices BnF emploient la même forme rejetée époque ramesside.","alignment":[{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb11986451z","label":"Égypte -- ca. 1295-ca. 1186 av. J.-C. (XIXe dynastie)","match":"related"},{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb16721562s","label":"Égypte -- ca. 1186-ca. 1069 av. J.-C. (XXe dynastie)","match":"related"},{"scheme":"Getty AAT","uri":"http://vocab.getty.edu/aat/300134147","label":"Ramesside period","match":"exact"}]},{"id":"third-intermediate","label_fr":"Troisième Période intermédiaire","label_en":"Third Intermediate Period","aliases":["Troisième Période intermédiaire","Third Intermediate Period","3e période intermédiaire","IIIe période intermédiaire","3rd Intermediate Period","عصر الانتقال الثالث","عصر الإنتقال الثالث","الفترة الانتقالية الثالثة","عصر الاضمحلال الثالث"],"evidence":["Troisième Période intermédiaire","Third Intermediate Period","3e période intermédiaire","IIIe période intermédiaire","3rd Intermediate Period","عصر الانتقال الثالث","عصر الإنتقال الثالث","الفترة الانتقالية الثالثة","عصر الاضمحلال الثالث"],"parents":["pharaonic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/3rdintermediateperkings.html","https://nmec.gov.eg/ar/historical-timeline/"]},{"id":"late-period","label_fr":"Basse Époque","label_en":"Late Period","aliases":["Basse Époque","Late Period","Basse époque égyptienne","époque tardive égyptienne","période tardive égyptienne","Late Period Egypt","Spätzeit","العصر المتأخر","العصر المصري المتأخر","الدولة المتأخرة","الفترة المتأخرة في مصر"],"evidence":["Basse Époque","Late Period","Basse époque égyptienne","époque tardive égyptienne","période tardive égyptienne","Late Period Egypt","Spätzeit","العصر المتأخر","العصر المصري المتأخر","الدولة المتأخرة","الفترة المتأخرة في مصر"],"parents":["pharaonic"],"related":[],"sources":["https://www.globalegyptianmuseum.org/glossary.aspx?id=217","https://oi.uchicago.edu/sites/default/files/uploads/shared/docs/oimp23.pdf","https://nmec.gov.eg/ar/historical-timeline/"],"notes":"Groupe bibliographique conventionnel XXVIe–XXXIe ; la XXVe est seulement associée, car certaines chronologies commencent la Basse Époque plus tôt."},{"id":"saite","label_fr":"Époque saïte","label_en":"Saite period","aliases":["Époque saïte","Saite period","période saïte","Saite Dynasty","dynastie saïte","العصر الصاوي","العصر الصاوى","الفترة الصاوية","عصر النهضة الصاوية"],"evidence":["Époque saïte","Saite period","période saïte","Saite Dynasty","dynastie saïte","العصر الصاوي","العصر الصاوى","الفترة الصاوية","عصر النهضة الصاوية"],"parents":["late-period"],"related":[],"sources":["https://www.metmuseum.org/pt/essays/egypt-in-the-late-period-ca-712-332-b-c","https://pactols.frantiq.fr/opentheso/?idc=3033&idt=TH_1"],"equivalent_dynasties":[26],"alignment":[{"scheme":"PACTOLS","uri":"https://pactols.frantiq.fr/?idc=3033&idt=TH_1","label":"XXVIe dynastie égyptienne","match":"exact","uri_type":"concept-page","observed_alt_labels":["26e dynastie","période saïte"]}]},{"id":"persian","label_fr":"Périodes perses en Égypte","label_en":"Persian periods in Egypt","aliases":["Périodes perses en Égypte","Persian periods in Egypt","période perse","périodes perses","domination perse en Égypte","domination achéménide en Égypte","Achaemenid Egypt","Persian Period","Persian domination of Egypt","العصر الفارسي في مصر","الحكم الفارسي في مصر","الاحتلال الفارسي لمصر"],"evidence":["Périodes perses en Égypte","Persian periods in Egypt","période perse","périodes perses","domination perse en Égypte","domination achéménide en Égypte","Achaemenid Egypt","Persian Period","Persian domination of Egypt","العصر الفارسي في مصر","الحكم الفارسي في مصر","الاحتلال الفارسي لمصر"],"parents":["late-period"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/dynasty27.html","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/secondpersianperiodkings.html"]},{"id":"first-persian","label_fr":"Première domination perse","label_en":"First Persian Period","aliases":["Première domination perse","First Persian Period","première période perse","première domination achéménide","First Persian domination","First Achaemenid Period in Egypt","الاحتلال الفارسي الأول","الحكم الفارسي الأول","العصر الفارسي الأول"],"evidence":["Première domination perse","First Persian Period","première période perse","première domination achéménide","First Persian domination","First Achaemenid Period in Egypt","الاحتلال الفارسي الأول","الحكم الفارسي الأول","العصر الفارسي الأول"],"parents":["persian"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/dynasty27.html"],"equivalent_dynasties":[27]},{"id":"second-persian","label_fr":"Seconde domination perse","label_en":"Second Persian Period","aliases":["Seconde domination perse","Second Persian Period","deuxième domination perse","seconde période perse","deuxième période perse","Second Persian domination","Second Achaemenid Period in Egypt","الاحتلال الفارسي الثاني","الحكم الفارسي الثاني","العصر الفارسي الثاني"],"evidence":["Seconde domination perse","Second Persian Period","deuxième domination perse","seconde période perse","deuxième période perse","Second Persian domination","Second Achaemenid Period in Egypt","الاحتلال الفارسي الثاني","الحكم الفارسي الثاني","العصر الفارسي الثاني"],"parents":["persian"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/secondpersianperiodkings.html","https://oi.uchicago.edu/sites/default/files/uploads/shared/docs/oimp23.pdf"],"equivalent_dynasties":[31]},{"id":"greco-roman","label_fr":"Époque gréco-romaine","label_en":"Greco-Roman period","aliases":["Époque gréco-romaine","Greco-Roman period","période gréco-romaine","Égypte gréco-romaine","Antiquité gréco-romaine","Graeco-Roman period","Greco-Roman Egypt","Graeco-Roman Egypt","العصر اليوناني الروماني","العصر اليونانى الرومانى","الفترة اليونانية الرومانية"],"evidence":["Époque gréco-romaine","Greco-Roman period","période gréco-romaine","Égypte gréco-romaine","Antiquité gréco-romaine","Graeco-Roman period","Greco-Roman Egypt","Graeco-Roman Egypt","العصر اليوناني الروماني","العصر اليونانى الرومانى","الفترة اليونانية الرومانية"],"parents":[],"related":["byzantine"],"sources":["https://www.uee.ucla.edu/chronology","https://egymonuments.gov.eg/ar/historical-periods/ptolemaic-period"]},{"id":"macedonian","label_fr":"Époque macédonienne","label_en":"Macedonian period","aliases":["Époque macédonienne","Macedonian period","période macédonienne","domination macédonienne en Égypte","Macedonian Egypt","Macedonian Dynasty","الأسرة المقدونية","العصر المقدوني","الحكم المقدوني في مصر"],"evidence":["Époque macédonienne","Macedonian period","période macédonienne","domination macédonienne en Égypte","Macedonian Egypt","Macedonian Dynasty","الأسرة المقدونية","العصر المقدوني","الحكم المقدوني في مصر"],"parents":["greco-roman"],"related":["ptolemaic"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/macedonianperiodkings.html"]},{"id":"ptolemaic","label_fr":"Époque ptolémaïque","label_en":"Ptolemaic period","aliases":["Époque ptolémaïque","Ptolemaic period","période ptolémaïque","époque lagide","période lagide","Égypte ptolémaïque","royaume lagide","Ptolemaic Egypt","Ptolemaic Kingdom","العصر البطلمي","العصر البطلمى","دولة البطالمة","الأسرة البطلمية","حكم البطالمة"],"evidence":["Époque ptolémaïque","Ptolemaic period","période ptolémaïque","époque lagide","période lagide","Égypte ptolémaïque","royaume lagide","Ptolemaic Egypt","Ptolemaic Kingdom","العصر البطلمي","العصر البطلمى","دولة البطالمة","الأسرة البطلمية","حكم البطالمة","ptolémaïque","ptolémaïques","ptolemaic","époque ptolémaïque et romaine","Ptolemaic and Roman periods","Ptolemaic and Roman period"],"parents":["greco-roman"],"related":["macedonian"],"sources":["https://egymonuments.gov.eg/ar/historical-periods/ptolemaic-period","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html"]},{"id":"roman","label_fr":"Époque romaine","label_en":"Roman period","aliases":["Époque romaine","Roman period","période romaine","Égypte romaine","Roman Egypt","Roman-period Egypt","العصر الروماني","العصر الرومانى","مصر الرومانية"],"evidence":["Époque romaine","Roman period","période romaine","Égypte romaine","Roman Egypt","Roman-period Egypt","العصر الروماني","العصر الرومانى","مصر الرومانية","époque ptolémaïque et romaine","Ptolemaic and Roman periods","Ptolemaic and Roman period"],"parents":["greco-roman"],"related":["byzantine","coptic-period"],"sources":["https://nmec.gov.eg/ar/historical-timeline/","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/roman2.html"]},{"id":"byzantine","label_fr":"Époque byzantine","label_en":"Byzantine period","aliases":["Époque byzantine","Byzantine period","période byzantine","Égypte byzantine","Byzantine Egypt","العصر البيزنطي","العصر البيزنطى","الفترة البيزنطية","مصر البيزنطية"],"evidence":["Époque byzantine","Byzantine period","période byzantine","Égypte byzantine","Byzantine Egypt","العصر البيزنطي","العصر البيزنطى","الفترة البيزنطية","مصر البيزنطية"],"parents":[],"related":["roman","coptic-period","greco-roman"],"sources":["https://egymonuments.gov.eg/ar/historical-periods/byzantine-era"],"notes":"Pas byzantin/byzantine seul : un auteur byzantin médiéval n’atteste pas la période byzantine égyptienne."},{"id":"coptic-period","label_fr":"Époque copte","label_en":"Coptic period","aliases":["Époque copte","Coptic period","période copte","العصر القبطي","العصر القبطى","الفترة القبطية"],"evidence":["Époque copte","Coptic period","période copte","العصر القبطي","العصر القبطى","الفترة القبطية"],"parents":[],"related":["byzantine","roman"],"sources":["https://egymonuments.gov.eg/ar/historical-periods/byzantine-era","https://nmec.gov.eg/ar/historical-timeline/"],"notes":"Pas copte/Coptic seuls : langue et période sont deux concepts distincts ; période copte et byzantine sont associées mais pas fusionnées."}],"dynasties":[{"number":1,"label_fr":"Ire dynastie","label_en":"1st Dynasty","arabic_ordinal":"الأولى","arabic_ordinal_variants":["الأولى"],"arabic_aliases":["الأسرة 1","الأسرة الأولى","الأسرة ١","الاسرة الأولى"],"english_ordinal":"first","french_ordinal":"première","parents":["early-dynastic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":2,"label_fr":"IIe dynastie","label_en":"2nd Dynasty","arabic_ordinal":"الثانية","arabic_ordinal_variants":["الثانية"],"arabic_aliases":["الأسرة 2","الأسرة الثانية","الأسرة ٢","الاسرة الثانية"],"english_ordinal":"second","french_ordinal":"deuxième","parents":["early-dynastic"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":3,"label_fr":"IIIe dynastie","label_en":"3rd Dynasty","arabic_ordinal":"الثالثة","arabic_ordinal_variants":["الثالثة"],"arabic_aliases":["الأسرة 3","الأسرة الثالثة","الأسرة ٣","الاسرة الثالثة"],"english_ordinal":"third","french_ordinal":"troisième","parents":["old-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":4,"label_fr":"IVe dynastie","label_en":"4th Dynasty","arabic_ordinal":"الرابعة","arabic_ordinal_variants":["الرابعة"],"arabic_aliases":["الأسرة 4","الأسرة الرابعة","الأسرة ٤","الاسرة الرابعة"],"english_ordinal":"fourth","french_ordinal":"quatrième","parents":["old-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":5,"label_fr":"Ve dynastie","label_en":"5th Dynasty","arabic_ordinal":"الخامسة","arabic_ordinal_variants":["الخامسة"],"arabic_aliases":["الأسرة 5","الأسرة الخامسة","الأسرة ٥","الاسرة الخامسة"],"english_ordinal":"fifth","french_ordinal":"cinquième","parents":["old-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"],"alignment":[{"scheme":"PACTOLS","uri":"https://ark.frantiq.fr/ark:/26678/pcrtBjT0Oramgy","label":"Ve dynastie égyptienne","match":"exact"},{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb17038120k","label":"Égypte -- ca. 2494-ca. 2345 av. J.-C. (Ve dynastie)","match":"exact"}]},{"number":6,"label_fr":"VIe dynastie","label_en":"6th Dynasty","arabic_ordinal":"السادسة","arabic_ordinal_variants":["السادسة"],"arabic_aliases":["الأسرة 6","الأسرة السادسة","الأسرة ٦","الاسرة السادسة"],"english_ordinal":"sixth","french_ordinal":"sixième","parents":["old-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":7,"label_fr":"VIIe dynastie","label_en":"7th Dynasty","arabic_ordinal":"السابعة","arabic_ordinal_variants":["السابعة"],"arabic_aliases":["الأسرة 7","الأسرة السابعة","الأسرة ٧","الاسرة السابعة"],"english_ordinal":"seventh","french_ordinal":"septième","parents":["pharaonic"],"related":["old-kingdom","first-intermediate"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://resources.metmuseum.org/resources/metpublications/pdf/Egyptian_Art_The_Metropolitan_Museum_of_Art_Bulletin_v_41_no_3_Winter_1983_1984.pdf","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/1stintermediateperkings.html"],"notes":"Numérotation traditionnelle de Manéthon, dont l’historicité est discutée ; le moteur ne doit pas créer une chronologie ou des rois à partir de cette entrée."},{"number":8,"label_fr":"VIIIe dynastie","label_en":"8th Dynasty","arabic_ordinal":"الثامنة","arabic_ordinal_variants":["الثامنة"],"arabic_aliases":["الأسرة 8","الأسرة الثامنة","الأسرة ٨","الاسرة الثامنة"],"english_ordinal":"eighth","french_ordinal":"huitième","parents":["pharaonic"],"related":["old-kingdom","first-intermediate"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://resources.metmuseum.org/resources/metpublications/pdf/Egyptian_Art_The_Metropolitan_Museum_of_Art_Bulletin_v_41_no_3_Winter_1983_1984.pdf","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/1stintermediateperkings.html"],"notes":"Frontière de périodisation variable : liens associés seulement, sans expansion automatique vers une période."},{"number":9,"label_fr":"IXe dynastie","label_en":"9th Dynasty","arabic_ordinal":"التاسعة","arabic_ordinal_variants":["التاسعة"],"arabic_aliases":["الأسرة 9","الأسرة التاسعة","الأسرة ٩","الاسرة التاسعة"],"english_ordinal":"ninth","french_ordinal":"neuvième","parents":["first-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":10,"label_fr":"Xe dynastie","label_en":"10th Dynasty","arabic_ordinal":"العاشرة","arabic_ordinal_variants":["العاشرة"],"arabic_aliases":["الأسرة 10","الأسرة العاشرة","الأسرة ١٠","الاسرة العاشرة"],"english_ordinal":"tenth","french_ordinal":"dixième","parents":["first-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":11,"label_fr":"XIe dynastie","label_en":"11th Dynasty","arabic_ordinal":"الحادية عشرة","arabic_ordinal_variants":["الحادية عشر","الحادية عشرة"],"arabic_aliases":["الأسرة 11","الأسرة الحادية عشر","الأسرة الحادية عشرة","الأسرة ١١","الاسرة الحادية عشر","الاسرة الحادية عشرة"],"english_ordinal":"eleventh","french_ordinal":"onzième","parents":["pharaonic"],"related":["first-intermediate","middle-kingdom"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"],"notes":"Frontière de périodisation variable : liens associés seulement, sans expansion automatique vers une période."},{"number":12,"label_fr":"XIIe dynastie","label_en":"12th Dynasty","arabic_ordinal":"الثانية عشرة","arabic_ordinal_variants":["الثانية عشر","الثانية عشرة"],"arabic_aliases":["الأسرة 12","الأسرة الثانية عشر","الأسرة الثانية عشرة","الأسرة ١٢","الاسرة الثانية عشر","الاسرة الثانية عشرة"],"english_ordinal":"twelfth","french_ordinal":"douzième","parents":["middle-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":13,"label_fr":"XIIIe dynastie","label_en":"13th Dynasty","arabic_ordinal":"الثالثة عشرة","arabic_ordinal_variants":["الثالثة عشر","الثالثة عشرة"],"arabic_aliases":["الأسرة 13","الأسرة الثالثة عشر","الأسرة الثالثة عشرة","الأسرة ١٣","الاسرة الثالثة عشر","الاسرة الثالثة عشرة"],"english_ordinal":"thirteenth","french_ordinal":"treizième","parents":["pharaonic"],"related":["middle-kingdom","second-intermediate"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"],"notes":"Frontière de périodisation variable : liens associés seulement, sans expansion automatique vers une période."},{"number":14,"label_fr":"XIVe dynastie","label_en":"14th Dynasty","arabic_ordinal":"الرابعة عشرة","arabic_ordinal_variants":["الرابعة عشر","الرابعة عشرة"],"arabic_aliases":["الأسرة 14","الأسرة الرابعة عشر","الأسرة الرابعة عشرة","الأسرة ١٤","الاسرة الرابعة عشر","الاسرة الرابعة عشرة"],"english_ordinal":"fourteenth","french_ordinal":"quatorzième","parents":["pharaonic"],"related":["middle-kingdom","second-intermediate"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"],"notes":"Frontière de périodisation variable : liens associés seulement, sans expansion automatique vers une période."},{"number":15,"label_fr":"XVe dynastie","label_en":"15th Dynasty","arabic_ordinal":"الخامسة عشرة","arabic_ordinal_variants":["الخامسة عشر","الخامسة عشرة"],"arabic_aliases":["الأسرة 15","الأسرة الخامسة عشر","الأسرة الخامسة عشرة","الأسرة ١٥","الاسرة الخامسة عشر","الاسرة الخامسة عشرة"],"english_ordinal":"fifteenth","french_ordinal":"quinzième","parents":["second-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":16,"label_fr":"XVIe dynastie","label_en":"16th Dynasty","arabic_ordinal":"السادسة عشرة","arabic_ordinal_variants":["السادسة عشر","السادسة عشرة"],"arabic_aliases":["الأسرة 16","الأسرة السادسة عشر","الأسرة السادسة عشرة","الأسرة ١٦","الاسرة السادسة عشر","الاسرة السادسة عشرة"],"english_ordinal":"sixteenth","french_ordinal":"seizième","parents":["second-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":17,"label_fr":"XVIIe dynastie","label_en":"17th Dynasty","arabic_ordinal":"السابعة عشرة","arabic_ordinal_variants":["السابعة عشر","السابعة عشرة"],"arabic_aliases":["الأسرة 17","الأسرة السابعة عشر","الأسرة السابعة عشرة","الأسرة ١٧","الاسرة السابعة عشر","الاسرة السابعة عشرة"],"english_ordinal":"seventeenth","french_ordinal":"dix-septième","parents":["second-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":18,"label_fr":"XVIIIe dynastie","label_en":"18th Dynasty","arabic_ordinal":"الثامنة عشرة","arabic_ordinal_variants":["الثامنة عشر","الثامنة عشرة"],"arabic_aliases":["الأسرة 18","الأسرة الثامنة عشر","الأسرة الثامنة عشرة","الأسرة ١٨","الاسرة الثامنة عشر","الاسرة الثامنة عشرة"],"english_ordinal":"eighteenth","french_ordinal":"dix-huitième","parents":["new-kingdom"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"],"alignment":[{"scheme":"PACTOLS","uri":"https://ark.frantiq.fr/ark:/26678/pcrt8SDBbOnShS","label":"XVIIIe dynastie égyptienne","match":"exact"}]},{"number":19,"label_fr":"XIXe dynastie","label_en":"19th Dynasty","arabic_ordinal":"التاسعة عشرة","arabic_ordinal_variants":["التاسعة عشر","التاسعة عشرة"],"arabic_aliases":["الأسرة 19","الأسرة التاسعة عشر","الأسرة التاسعة عشرة","الأسرة ١٩","الاسرة التاسعة عشر","الاسرة التاسعة عشرة"],"english_ordinal":"nineteenth","french_ordinal":"dix-neuvième","parents":["ramesside"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://www.ucl.ac.uk/museums-static/digitalegypt/burialcustoms/latenk.html"],"alignment":[{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb11986451z","label":"Égypte -- ca. 1295-ca. 1186 av. J.-C. (XIXe dynastie)","match":"exact"}]},{"number":20,"label_fr":"XXe dynastie","label_en":"20th Dynasty","arabic_ordinal":"العشرون","arabic_ordinal_variants":["العشرون","العشرين"],"arabic_aliases":["الأسرة 20","الأسرة العشرون","الأسرة العشرين","الأسرة ٢٠","الاسرة العشرون","الاسرة العشرين"],"english_ordinal":"twentieth","french_ordinal":"vingtième","parents":["ramesside"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://www.ucl.ac.uk/museums-static/digitalegypt/burialcustoms/latenk.html"],"alignment":[{"scheme":"BnF RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb16721562s","label":"Égypte -- ca. 1186-ca. 1069 av. J.-C. (XXe dynastie)","match":"exact"}]},{"number":21,"label_fr":"XXIe dynastie","label_en":"21st Dynasty","arabic_ordinal":"الحادية والعشرون","arabic_ordinal_variants":["الحادية والعشرون","الحادية والعشرين"],"arabic_aliases":["الأسرة 21","الأسرة الحادية والعشرون","الأسرة الحادية والعشرين","الأسرة ٢١","الاسرة الحادية والعشرون","الاسرة الحادية والعشرين"],"english_ordinal":"twenty-first","french_ordinal":"vingt et unième","parents":["third-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":22,"label_fr":"XXIIe dynastie","label_en":"22nd Dynasty","arabic_ordinal":"الثانية والعشرون","arabic_ordinal_variants":["الثانية والعشرون","الثانية والعشرين"],"arabic_aliases":["الأسرة 22","الأسرة الثانية والعشرون","الأسرة الثانية والعشرين","الأسرة ٢٢","الاسرة الثانية والعشرون","الاسرة الثانية والعشرين"],"english_ordinal":"twenty-second","french_ordinal":"vingt-deuxième","parents":["third-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":23,"label_fr":"XXIIIe dynastie","label_en":"23rd Dynasty","arabic_ordinal":"الثالثة والعشرون","arabic_ordinal_variants":["الثالثة والعشرون","الثالثة والعشرين"],"arabic_aliases":["الأسرة 23","الأسرة الثالثة والعشرون","الأسرة الثالثة والعشرين","الأسرة ٢٣","الاسرة الثالثة والعشرون","الاسرة الثالثة والعشرين"],"english_ordinal":"twenty-third","french_ordinal":"vingt-troisième","parents":["third-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":24,"label_fr":"XXIVe dynastie","label_en":"24th Dynasty","arabic_ordinal":"الرابعة والعشرون","arabic_ordinal_variants":["الرابعة والعشرون","الرابعة والعشرين"],"arabic_aliases":["الأسرة 24","الأسرة الرابعة والعشرون","الأسرة الرابعة والعشرين","الأسرة ٢٤","الاسرة الرابعة والعشرون","الاسرة الرابعة والعشرين"],"english_ordinal":"twenty-fourth","french_ordinal":"vingt-quatrième","parents":["third-intermediate"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":25,"label_fr":"XXVe dynastie","label_en":"25th Dynasty","arabic_ordinal":"الخامسة والعشرون","arabic_ordinal_variants":["الخامسة والعشرون","الخامسة والعشرين"],"arabic_aliases":["الأسرة 25","الأسرة الخامسة والعشرون","الأسرة الخامسة والعشرين","الأسرة ٢٥","الاسرة الخامسة والعشرون","الاسرة الخامسة والعشرين"],"english_ordinal":"twenty-fifth","french_ordinal":"vingt-cinquième","parents":["third-intermediate"],"related":["late-period"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":26,"label_fr":"XXVIe dynastie","label_en":"26th Dynasty","arabic_ordinal":"السادسة والعشرون","arabic_ordinal_variants":["السادسة والعشرون","السادسة والعشرين"],"arabic_aliases":["الأسرة 26","الأسرة السادسة والعشرون","الأسرة السادسة والعشرين","الأسرة ٢٦","الاسرة السادسة والعشرون","الاسرة السادسة والعشرين"],"english_ordinal":"twenty-sixth","french_ordinal":"vingt-sixième","parents":["saite"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://www.metmuseum.org/pt/essays/egypt-in-the-late-period-ca-712-332-b-c"]},{"number":27,"label_fr":"XXVIIe dynastie","label_en":"27th Dynasty","arabic_ordinal":"السابعة والعشرون","arabic_ordinal_variants":["السابعة والعشرون","السابعة والعشرين"],"arabic_aliases":["الأسرة 27","الأسرة السابعة والعشرون","الأسرة السابعة والعشرين","الأسرة ٢٧","الاسرة السابعة والعشرون","الاسرة السابعة والعشرين"],"english_ordinal":"twenty-seventh","french_ordinal":"vingt-septième","parents":["first-persian"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/dynasty27.html"]},{"number":28,"label_fr":"XXVIIIe dynastie","label_en":"28th Dynasty","arabic_ordinal":"الثامنة والعشرون","arabic_ordinal_variants":["الثامنة والعشرون","الثامنة والعشرين"],"arabic_aliases":["الأسرة 28","الأسرة الثامنة والعشرون","الأسرة الثامنة والعشرين","الأسرة ٢٨","الاسرة الثامنة والعشرون","الاسرة الثامنة والعشرين"],"english_ordinal":"twenty-eighth","french_ordinal":"vingt-huitième","parents":["late-period"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":29,"label_fr":"XXIXe dynastie","label_en":"29th Dynasty","arabic_ordinal":"التاسعة والعشرون","arabic_ordinal_variants":["التاسعة والعشرون","التاسعة والعشرين"],"arabic_aliases":["الأسرة 29","الأسرة التاسعة والعشرون","الأسرة التاسعة والعشرين","الأسرة ٢٩","الاسرة التاسعة والعشرون","الاسرة التاسعة والعشرين"],"english_ordinal":"twenty-ninth","french_ordinal":"vingt-neuvième","parents":["late-period"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"]},{"number":30,"label_fr":"XXXe dynastie","label_en":"30th Dynasty","arabic_ordinal":"الثلاثون","arabic_ordinal_variants":["الثلاثون","الثلاثين"],"arabic_aliases":["الأسرة 30","الأسرة الثلاثون","الأسرة الثلاثين","الأسرة ٣٠","الاسرة الثلاثون","الاسرة الثلاثين"],"english_ordinal":"thirtieth","french_ordinal":"trentième","parents":["late-period"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar"],"alignment":[{"scheme":"PACTOLS","uri":"https://ark.frantiq.fr/ark:/26678/pcrtvf8wWlbh1a","label":"XXXe dynastie égyptienne","match":"exact"}]},{"number":31,"label_fr":"XXXIe dynastie","label_en":"31st Dynasty","arabic_ordinal":"الحادية والثلاثون","arabic_ordinal_variants":["الحادية والثلاثون","الحادية والثلاثين"],"arabic_aliases":["الأسرة 31","الأسرة الحادية والثلاثون","الأسرة الحادية والثلاثين","الأسرة ٣١","الاسرة الحادية والثلاثون","الاسرة الحادية والثلاثين"],"english_ordinal":"thirty-first","french_ordinal":"trente et unième","parents":["second-persian"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/index.html","https://inscriptionslibrary.bibalex.org/Presentation/FilterPage.aspx?INS_ID=13&lang=ar","https://oi.uchicago.edu/sites/default/files/uploads/shared/docs/oimp23.pdf"]}],"places":[{"id":"upper-egypt","label_fr":"Haute Égypte","label_en":"Upper Egypt","aliases":["Haute Égypte","Haute-Égypte","Upper Egypt","Oberägypten","مصر العليا","صعيد مصر","الصعيد"],"evidence":["Haute Égypte","Haute-Égypte","Upper Egypt","Oberägypten","مصر العليا","صعيد مصر"],"parents":[],"related":[],"sources":["https://egymonuments.gov.eg/ar/collections/narmer-palette-1/","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-3-p5-petit-corps-3","page":5,"kind":"body","forms":["Haute Égypte","Haute-Égypte"]},{"id":"boe-2026-3-note-6","page":7,"kind":"note","forms":["Haute Égypte","Haute-Égypte"]},{"id":"boe-2026-4-p23-body-1","page":23,"kind":"body","forms":["Haute Égypte","Haute-Égypte"]},{"id":"boe-2026-5-p6-body-1","page":6,"kind":"body","forms":["Haute Égypte","Haute-Égypte"]}],"raw_literal_anchor_count":4},{"id":"lower-egypt","label_fr":"Basse Égypte","label_en":"Lower Egypt","aliases":["Basse Égypte","Basse-Égypte","Lower Egypt","Unterägypten","مصر السفلى","الوجه البحري"],"evidence":["Basse Égypte","Basse-Égypte","Lower Egypt","Unterägypten","مصر السفلى","الوجه البحري"],"parents":[],"related":[],"sources":["https://egymonuments.gov.eg/ar/collections/narmer-palette-1/","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-p23-body-1","page":23,"kind":"body","forms":["Basse Égypte","Basse-Égypte"]},{"id":"boe-2026-4-note-98","page":25,"kind":"note","forms":["Basse Égypte","Basse-Égypte"]},{"id":"boe-2026-4-note-178","page":45,"kind":"note","forms":["Basse Égypte","Basse-Égypte"]}],"raw_literal_anchor_count":3},{"id":"nubia","label_fr":"Nubie","label_en":"Nubia","aliases":["Nubie","Nubia","Nubien","النوبة"],"evidence":["Nubie","Nubia","Nubien","النوبة"],"parents":[],"related":[],"sources":["https://egymonuments.gov.eg/ar/world-heritage/nubian-monuments-from-abu-simbel-to-philae/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-note-65","page":17,"kind":"note","forms":["Nubia"]},{"id":"boe-2026-5-p7-body-1","page":7,"kind":"body","forms":["Nubia"]}],"raw_literal_anchor_count":2},{"id":"memphite-necropolis","label_fr":"Nécropole memphite","label_en":"Memphite necropolis","aliases":["nécropole memphite","nécropole de Memphis","Memphite necropolis","necropolis of Memphis","جبانة منف","جبانة ممفيس"],"evidence":["nécropole memphite","nécropole de Memphis","Memphite necropolis","necropolis of Memphis","جبانة منف","جبانة ممفيس"],"parents":[],"related":["memphis"],"sources":["https://egymonuments.gov.eg/ar/world-heritage/memphis-and-its-necropolis/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-3-p8-body-1","page":8,"kind":"body","forms":["nécropole memphite"]},{"id":"boe-2026-3-note-8","page":8,"kind":"note","forms":["nécropole memphite"]}],"raw_literal_anchor_count":2},{"id":"memphis","label_fr":"Memphis","label_en":"Memphis","aliases":["Memphis","Men-nefer","Mennefer","منف","مدينة منف"],"evidence":["Memphis","Men-nefer","Mennefer","منف","مدينة منف"],"parents":["lower-egypt"],"related":["memphite-necropolis","saqqara","abusir","dahshur","giza"],"sources":["https://egymonuments.gov.eg/ar/world-heritage/memphis-and-its-necropolis/","https://discovery.ucl.ac.uk/id/eprint/10072642/1/BibAlex%20Writing%20of%20the%20Birds%20Quirke%20Accepted.pdf"],"alignments":[],"exclude_evidence":["Memphis Tennessee","Memphis (Tennessee)","Memphis, Tennessee","Memphis-Misraïm","Memphis Misraim"],"corpus_anchors":[{"id":"boe-2026-3-p4-body-1","page":4,"kind":"body","forms":["Memphis"]},{"id":"boe-2026-3-note-5","page":6,"kind":"note","forms":["Memphis"]},{"id":"boe-2026-4-note-20","page":8,"kind":"note","forms":["Memphis"]}],"raw_literal_anchor_count":3},{"id":"saqqara","label_fr":"Saqqara","label_en":"Saqqara","aliases":["Saqqara","Saqqarah","Sakkara","Sakkarah","Saqqâra","سقارة"],"evidence":["Saqqara","Saqqarah","Sakkara","Sakkarah","Saqqâra","سقارة"],"parents":["memphite-necropolis"],"related":["memphis"],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/saqqara/","https://egymonuments.gov.eg/ar/world-heritage/memphis-and-its-necropolis/","https://catalogue.bnf.fr/ark:/12148/cb119478206"],"alignments":[{"scheme":"BnF-RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb119478206","label":"Saqqarah (Égypte ; site archéologique)","match":"exact"}],"corpus_anchors":[{"id":"boe-2026-3-p2-body-1","page":2,"kind":"body","forms":["Saqqara","Saqqarah","Saqqâra"]},{"id":"boe-2026-3-p3-body-1","page":3,"kind":"body","forms":["Saqqara","Saqqâra"]},{"id":"boe-2026-3-note-1","page":3,"kind":"note","forms":["Saqqarah"]},{"id":"boe-2026-3-p4-body-1","page":4,"kind":"body","forms":["Saqqara","Saqqâra"]},{"id":"boe-2026-3-p5-body-1","page":5,"kind":"body","forms":["Saqqara","Saqqâra"]},{"id":"boe-2026-3-p5-body-2","page":5,"kind":"body","forms":["Saqqara","Saqqâra"]}],"raw_literal_anchor_count":15},{"id":"serapeum-saqqara","label_fr":"Sérapéum de Saqqara","label_en":"Serapeum of Saqqara","aliases":["Sérapéum de Saqqara","Sérapéum de Saqqarah","Serapeum of Saqqara","Serapeum of Sakkara","Serapeum of Saqqarah","Serapeum de Memphis","Sérapéum de Memphis","Serapieion de Memphis","Serapieion de Saqqarah","Sarapeum de Saqqarah","Sarapion de Saqqarah","سرابيوم سقارة","سيرابيوم سقارة","السيرابيوم بسقارة","السرابيوم بسقارة"],"evidence":["Sérapéum de Saqqara","Sérapéum de Saqqarah","Serapeum of Saqqara","Serapeum of Sakkara","Serapeum of Saqqarah","Serapeum de Memphis","Sérapéum de Memphis","Serapieion de Memphis","Serapieion de Saqqarah","Sarapeum de Saqqarah","Sarapion de Saqqarah","سرابيوم سقارة","سيرابيوم سقارة","السيرابيوم بسقارة","السرابيوم بسقارة"],"parents":["saqqara"],"related":[],"sources":["https://egymonuments.gov.eg/ar/monuments/serapeum/","https://egymonuments.gov.eg/ar/archaeological-sites/saqqara/","https://catalogue.bnf.fr/ark:/12148/cb11969684s"],"alignments":[{"scheme":"BnF-RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb11969684s","label":"Saqqarah (Égypte ; site archéologique) -- Serapeum","match":"exact"}],"contextual_evidence":[{"form":"Sérapéum","requires":["Saqqara","Saqqarah","Sakkara","Sakkarah","سقارة"],"within":400},{"form":"Serapeum","requires":["Saqqara","Saqqarah","Sakkara","Sakkarah","سقارة"],"within":400},{"form":"السيرابيوم","requires":["Saqqara","Saqqarah","Sakkara","Sakkarah","سقارة"],"within":400},{"form":"السرابيوم","requires":["Saqqara","Saqqarah","Sakkara","Sakkarah","سقارة"],"within":400}],"exclude_evidence":["Serapeum of Alexandria","Sérapéum d’Alexandrie","Sérapéum d'Alexandrie","سرابيوم الإسكندرية","سيرابيوم الإسكندرية"],"corpus_anchors":[{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Serapeum of Sakkara"]}],"raw_literal_anchor_count":1},{"id":"giza","label_fr":"Giza / Gizeh","label_en":"Giza","aliases":["Giza","Gizeh","Gîza","Gizah","Guizèh","Guizeh","الجيزة","جيزة"],"evidence":["Giza","Gizeh","Gîza","Gizah","Guizèh","Guizeh","الجيزة","جيزة"],"parents":["lower-egypt"],"related":["memphis","memphite-necropolis"],"sources":["https://egymonuments.gov.eg/ar/world-heritage/memphis-and-its-necropolis/","https://www.ucl.ac.uk/museums-static/digitalegypt/archaeology/sitesindex.html"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-1-note-6","page":4,"kind":"note","forms":["Giza","Gîza"]},{"id":"boe-2026-1-p8-bibliography-1","page":8,"kind":"bibliography","forms":["Giza","Gîza"]},{"id":"boe-2026-1-p8-bibliography-2","page":8,"kind":"bibliography","forms":["Giza","Gîza"]},{"id":"boe-2026-3-p3-body-1","page":3,"kind":"body","forms":["Giza","Gîza"]}],"raw_literal_anchor_count":4},{"id":"abusir","label_fr":"Abousir (nécropole memphite)","label_en":"Abusir (Memphite necropolis)","aliases":["Abousir","Abusir","Abū Sīr","Abūsīr","Abūṣīr","Abu Sir","أبو صير","ابو صير","أبوصير","ابوصير"],"evidence":["Abousir","Abusir","Abū Sīr","Abūsīr","Abūṣīr","Abu Sir","أبو صير","ابو صير","أبوصير","ابوصير"],"parents":["memphite-necropolis"],"related":["memphis"],"sources":["https://egymonuments.gov.eg/ar/world-heritage/memphis-and-its-necropolis/","https://catalogue.bnf.fr/ark:/12148/cb144053086"],"alignments":[{"scheme":"BnF-RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb144053086","label":"Abousir (Guizèh, Égypte ; site archéologique)","match":"exact"}],"exclude_evidence":["Abusir el-Meleq","Abousir el-Meleq","Abusir el Meleq","Abousir el Meleq","أبو صير الملق","أبوصير الملق","ابو صير الملق","أبو صير بنا","ابو صير بنا","أبوصير بنا","Abu Sir Bana","Taposiris Magna","Abousir (Taposiris Magna)","Abusir (Taposiris Magna)","Abousir Mariout","Abusir Mariut"],"corpus_anchors":[{"id":"boe-2026-3-p3-body-1","page":3,"kind":"body","forms":["Abousir"]}],"raw_literal_anchor_count":1},{"id":"dahshur","label_fr":"Dahchour","label_en":"Dahshur","aliases":["Dahchour","Dahshur","Dashur","Dahschur","دهشور"],"evidence":["Dahchour","Dahshur","Dashur","Dahschur","دهشور"],"parents":["memphite-necropolis"],"related":["memphis"],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/dahshur/","https://egymonuments.gov.eg/ar/world-heritage/memphis-and-its-necropolis/","https://www.ucl.ac.uk/museums-static/digitalegypt/archaeology/sitesindex.html"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-3-p3-body-1","page":3,"kind":"body","forms":["Dahchour"]},{"id":"boe-2026-3-note-14","page":10,"kind":"note","forms":["Dahchour"]}],"raw_literal_anchor_count":2},{"id":"meidum","label_fr":"Meydoum","label_en":"Meidum","aliases":["Meydoum","Meidum","Maidum","Medum","ميدوم"],"evidence":["Meydoum","Meidum","Maidum","Medum","ميدوم"],"parents":[],"related":["dahshur"],"sources":["https://egymonuments.gov.eg/ar/monuments/the-pyramid-of-meidum"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-3-p3-body-1","page":3,"kind":"body","forms":["Meydoum"]}],"raw_literal_anchor_count":1},{"id":"lisht","label_fr":"Licht","label_en":"Lisht","aliases":["Licht","Lisht","el-Lisht","El Lisht","اللشت","لشت"],"evidence":["Lisht","el-Lisht","El Lisht","اللشت","لشت"],"parents":[],"related":["memphis","fayum"],"sources":["https://egymonuments.gov.eg/ar/collections/thebes"],"alignments":[],"corpus_anchors":[],"contextual_evidence":[{"form":"Licht","requires":["Saqqara","Saqqarah","Meydoum","Meidum","fouilles","fouilla","pyramide","pyramid","excavations","site"],"within":400}],"raw_literal_anchor_count":0},{"id":"thebes","label_fr":"Thèbes (Égypte)","label_en":"Thebes (Egypt)","aliases":["Thèbes","Thebes","Waset","Wȝs.t","Wꜣs.t","مدينة طيبة","طيبة المصرية","واست","طيبة"],"evidence":["Thèbes","Thebes","Waset","Wȝs.t","Wꜣs.t","مدينة طيبة","طيبة المصرية","مدينة واست"],"parents":["upper-egypt"],"related":["luxor"],"sources":["https://egymonuments.gov.eg/ar/collections/thebes","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html","https://egymonuments.gov.eg/ar/world-heritage/ancient-thebes-and-its-necropolis"],"alignments":[],"exclude_evidence":["Thèbes de Béotie","Thebes in Boeotia","Thebes (Greece)","Thèbes (Grèce)","طيبة اليونانية","Thebes (Boeotia)","Thèbes (Béotie)","Thebes Boeotia","Thèbes Béotie","Thebes of Boeotia"],"corpus_anchors":[{"id":"boe-2026-4-p4-body-2","page":4,"kind":"body","forms":["Thèbes","Thebes","Wȝs.t"]},{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Thèbes","Thebes"]}],"raw_literal_anchor_count":2},{"id":"luxor","label_fr":"Louxor (ville)","label_en":"Luxor (city)","aliases":["Louxor","Luxor","Louqsor","Louksor","الأقصر","الاقصر"],"evidence":["Louxor","Luxor","Louqsor","Louksor","الأقصر","الاقصر"],"parents":["upper-egypt"],"related":["thebes"],"sources":["https://egymonuments.gov.eg/ar/collections/thebes"],"alignments":[],"exclude_evidence":["Temple de Louxor","Temple of Luxor","Luxor Temple","معبد الأقصر","معبد الاقصر","Obélisque de Louxor","Obelisk of Luxor","Luxor obelisk","Louxor temple","Louqsor temple","Louxor (temple)"],"corpus_anchors":[{"id":"boe-2026-5-p7-body-1","page":7,"kind":"body","forms":["Luxor"]},{"id":"boe-2026-5-p7-body-2","page":7,"kind":"body","forms":["Luxor"]},{"id":"boe-2026-5-p37-body-1","page":37,"kind":"body","forms":["Louqsor"]}],"raw_literal_anchor_count":3},{"id":"karnak","label_fr":"Karnak","label_en":"Karnak","aliases":["Karnak","Ipet-sout","Ipet-sut","Ipetsut","Ipet sout","إبت سوت","ايبت سوت","الكرنك","معبد الكرنك","معابد الكرنك"],"evidence":["Karnak","Ipet-sout","Ipet-sut","Ipetsut","Ipet sout","إبت سوت","ايبت سوت","الكرنك","معبد الكرنك","معابد الكرنك"],"parents":["thebes"],"related":["luxor-temple"],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/karnak/","https://catalogue.bnf.fr/ark:/12148/cb15188748j","https://egymonuments.gov.eg/ar/world-heritage/ancient-thebes-and-its-necropolis"],"alignments":[{"scheme":"BnF-geographic","uri":"https://catalogue.bnf.fr/ark:/12148/cb15188748j","label":"Karnak (Qena, Égypte ; site archéologique)","match":"exact"}],"exclude_evidence":["Carnac (France)","Carnac en Bretagne"],"corpus_anchors":[{"id":"boe-2026-4-note-12","page":4,"kind":"note","forms":["Karnak"]},{"id":"boe-2026-4-p9-body-1","page":9,"kind":"body","forms":["Karnak"]},{"id":"boe-2026-4-note-26","page":9,"kind":"note","forms":["Karnak"]},{"id":"boe-2026-5-p37-body-1","page":37,"kind":"body","forms":["Karnak"]},{"id":"boe-2026-5-p38-body-1","page":38,"kind":"body","forms":["Karnak"]}],"raw_literal_anchor_count":5},{"id":"luxor-temple","label_fr":"Temple de Louxor","label_en":"Luxor Temple","aliases":["Temple de Louxor","Temple of Luxor","Luxor Temple","Temple de Louqsor","Temple de Louksor","Opet du sud","Ipet-resyt","Ipet resyt","معبد الأقصر","معبد الاقصر","ايبت رسيت"],"evidence":["Temple de Louxor","Temple of Luxor","Luxor Temple","Temple de Louqsor","Temple de Louksor","Opet du sud","Ipet-resyt","Ipet resyt","معبد الأقصر","معبد الاقصر","ايبت رسيت"],"parents":["thebes"],"related":["luxor","karnak"],"sources":["https://egymonuments.gov.eg/ar/monuments/luxor-temple/","https://catalogue.bnf.fr/ark:/12148/cb121771977","https://egymonuments.gov.eg/ar/world-heritage/ancient-thebes-and-its-necropolis"],"alignments":[{"scheme":"BnF-RAMEAU","uri":"https://catalogue.bnf.fr/ark:/12148/cb121771977","label":"Louxor (Égypte) -- Temple","match":"exact"}],"corpus_anchors":[],"raw_literal_anchor_count":0},{"id":"valley-kings","label_fr":"Vallée des Rois","label_en":"Valley of the Kings","aliases":["Vallée des Rois","Valley of the Kings","Valley of Kings","Tal der Könige","وادي الملوك","وادى الملوك"],"evidence":["Vallée des Rois","Valley of the Kings","Valley of Kings","Tal der Könige","وادي الملوك","وادى الملوك"],"parents":["thebes"],"related":[],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/valley-of-the-kings/","https://egymonuments.gov.eg/ar/world-heritage/ancient-thebes-and-its-necropolis"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-5-p3-body-3","page":3,"kind":"body","forms":["Valley of the Kings"]},{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Valley of Kings"]}],"raw_literal_anchor_count":2},{"id":"deir-bahari","label_fr":"Deir el-Bahari","label_en":"Deir el-Bahari","aliases":["Deir el-Bahari","Deir el Bahari","Deir el-Bahri","Deir el Bahri","الدير البحري","الدير البحرى"],"evidence":["Deir el-Bahari","Deir el Bahari","Deir el-Bahri","Deir el Bahri","الدير البحري","الدير البحرى"],"parents":["thebes"],"related":[],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/deir-al-bahari","https://egymonuments.gov.eg/ar/world-heritage/ancient-thebes-and-its-necropolis"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Deir el-Bahari","Deir el Bahari"]}],"raw_literal_anchor_count":1},{"id":"abydos","label_fr":"Abydos","label_en":"Abydos","aliases":["Abydos","Abdjou","Abedjou","Abedju","أبيدوس","ابيدوس","مدينة أبيدوس"],"evidence":["Abydos","Abdjou","Abedjou","Abedju","أبيدوس","ابيدوس","مدينة أبيدوس"],"parents":["upper-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/news/new-discovery-of-foundation-deposits-and-the-storerooms-of-ramesses-ii-s-temple-in-abydos","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html"],"alignments":[],"exclude_evidence":["Abydos en Troade","Abydos in the Troad","Abydos (Turkey)","أبيدوس التركية"],"corpus_anchors":[{"id":"boe-2026-1-p4-body-2","page":4,"kind":"body","forms":["Abydos"]},{"id":"boe-2026-4-p31-petit-corps-14","page":31,"kind":"body","forms":["Abydos"]},{"id":"boe-2026-5-p38-body-3","page":38,"kind":"body","forms":["Abydos"]}],"raw_literal_anchor_count":3},{"id":"dendera","label_fr":"Dendérah","label_en":"Dendera","aliases":["Dendérah","Dendera","Dendara","Denderah","دندرة","دندره"],"evidence":["Dendérah","Dendera","Dendara","Denderah","دندرة","دندره"],"parents":["upper-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/monuments/temple-of-dendera","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-note-14","page":5,"kind":"note","forms":["Dendara"]},{"id":"boe-2026-4-note-25","page":9,"kind":"note","forms":["Dendara"]},{"id":"boe-2026-4-p18-body-1","page":18,"kind":"body","forms":["Dendara"]},{"id":"boe-2026-4-note-97","page":25,"kind":"note","forms":["Dendara"]},{"id":"boe-2026-4-note-98","page":25,"kind":"note","forms":["Dendera"]}],"raw_literal_anchor_count":5},{"id":"edfu","label_fr":"Edfou","label_en":"Edfu","aliases":["Edfou","Edfu","Idfu","إدفو","ادفو"],"evidence":["Edfou","Edfu","Idfu","إدفو","ادفو"],"parents":["upper-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/monuments/temple-of-edfu/","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-p4-body-2","page":4,"kind":"body","forms":["Edfou"]},{"id":"boe-2026-4-note-12","page":4,"kind":"note","forms":["Edfou","Edfu"]},{"id":"boe-2026-4-p18-body-1","page":18,"kind":"body","forms":["Edfou"]},{"id":"boe-2026-4-note-72","page":19,"kind":"note","forms":["Edfou"]},{"id":"boe-2026-4-note-84","page":21,"kind":"note","forms":["Edfou"]},{"id":"boe-2026-4-note-85","page":21,"kind":"note","forms":["Edfou"]}],"raw_literal_anchor_count":14},{"id":"philae","label_fr":"Philae","label_en":"Philae","aliases":["Philae","Philæ","Philaé","فيلة","جزيرة فيلة","معابد فيلة","معبد فيلة"],"evidence":["Philae","Philæ","Philaé","جزيرة فيلة","معابد فيلة","معبد فيلة"],"parents":[],"related":["aswan","nubia"],"sources":["https://egymonuments.gov.eg/ar/news/the-minister-of-antiquities-visits-the-temples-of-phila-in-asswan/","https://egymonuments.gov.eg/ar/world-heritage/nubian-monuments-from-abu-simbel-to-philae/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-p2-body-1","page":2,"kind":"body","forms":["Philae","Philaé"]},{"id":"boe-2026-4-p2-body-2","page":2,"kind":"body","forms":["Philae","Philaé"]},{"id":"boe-2026-4-p37-body-1","page":37,"kind":"body","forms":["Philae","Philaé"]},{"id":"boe-2026-4-note-137","page":37,"kind":"note","forms":["Philae","Philaé"]},{"id":"boe-2026-4-p47-body-1","page":47,"kind":"body","forms":["Philae","Philaé"]},{"id":"boe-2026-5-p8-body-1","page":8,"kind":"body","forms":["Philae","Philaé"]}],"raw_literal_anchor_count":6},{"id":"hermopolis","label_fr":"Hermopolis Magna","label_en":"Hermopolis Magna","aliases":["Hermopolis Magna","Hermopolis la Grande","Hermopolis","Khemenu","Khmun","Ashmunein","el-Ashmunein","El Ashmunein","الأشمونين","الاشمونين"],"evidence":["Hermopolis Magna","Hermopolis la Grande","Hermopolis","Khemenu","Khmun","Ashmunein","el-Ashmunein","El Ashmunein","الأشمونين","الاشمونين"],"parents":["upper-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/news/uncovering-the-upper-part-of-a-colossal-statue-of-king-ramses-ii","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiescreation.html"],"alignments":[],"exclude_evidence":["Hermopolis Parva","Hermopolis Minor","Hermopolis la Petite","هرموبوليس الصغرى"],"corpus_anchors":[],"raw_literal_anchor_count":0},{"id":"heliopolis","label_fr":"Héliopolis antique","label_en":"Ancient Heliopolis","aliases":["Héliopolis antique","Ancient Heliopolis","Héliopolis","Heliopolis","Iounou","Iunu","عين شمس القديمة","مدينة أون","أون القديمة","عين شمس","أون"],"evidence":["Héliopolis antique","Ancient Heliopolis","Héliopolis","Heliopolis","Iounou","Iunu","عين شمس القديمة","مدينة أون","أون القديمة"],"parents":["lower-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/archaeological-sites/ayn-shams-city/","https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiescreation.html","https://www.ucl.ac.uk/museums-static/digitalegypt/archaeology/sitesindex.html"],"alignments":[],"exclude_evidence":["Heliopolis modern","modern Heliopolis","Héliopolis moderne","Masr al-Gadida","Masr el-Gedida","Heliopolis (Cairo suburb)","quartier d’Héliopolis","quartier d'Héliopolis","quarter of Heliopolis","Heliopolis suburb","district of Heliopolis","حي هليوبوليس","Heliopolis (مصر الجديدة)","Héliopolis (مصر الجديدة)"],"corpus_anchors":[{"id":"boe-2026-4-note-60","page":17,"kind":"note","forms":["Héliopolis","Heliopolis"]}],"raw_literal_anchor_count":1},{"id":"alexandria","label_fr":"Alexandrie","label_en":"Alexandria","aliases":["Alexandrie","Alexandria","Alexandrië","الإسكندرية","الاسكندرية"],"evidence":["Alexandrie","Alexandria","Alexandrië","الإسكندرية","الاسكندرية"],"parents":["lower-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/museums/graeco-roman-museum/"],"alignments":[],"exclude_evidence":["Alexandria Virginia","Alexandria (Virginia)","Alexandria, Virginia","Alexandria Troas"],"corpus_anchors":[{"id":"boe-2026-4-note-5","page":3,"kind":"note","forms":["Alexandrie","Alexandrië"]}],"raw_literal_anchor_count":1},{"id":"aswan","label_fr":"Assouan","label_en":"Aswan","aliases":["Assouan","Aswan","Assuan","أسوان","اسوان"],"evidence":["Assouan","Aswan","Assuan","أسوان","اسوان"],"parents":["upper-egypt"],"related":["philae","nubia"],"sources":["https://egymonuments.gov.eg/ar/world-heritage/nubian-monuments-from-abu-simbel-to-philae/","https://egymonuments.gov.eg/ar/news/the-minister-of-antiquities-visits-the-temples-of-phila-in-asswan/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-note-116","page":29,"kind":"note","forms":["Assouan"]}],"raw_literal_anchor_count":1},{"id":"fayum","label_fr":"Fayoum","label_en":"Fayum","aliases":["Fayoum","Fayum","Faiyum","Fayûm","الفيوم","فيوم"],"evidence":["Fayoum","Fayum","Faiyum","Fayûm","الفيوم","فيوم"],"parents":[],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html","https://egymonuments.gov.eg/ar/collections/thebes"],"alignments":[],"exclude_evidence":["Medinet el-Fayum","Médinet el-Fayoum"],"corpus_anchors":[{"id":"boe-2026-4-note-74","page":19,"kind":"note","forms":["Fayoum"]},{"id":"boe-2026-4-note-128","page":34,"kind":"note","forms":["Fayoum"]},{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Fayum","Fayûm"]}],"raw_literal_anchor_count":3},{"id":"amarna","label_fr":"Tell el-Amarna","label_en":"Tell el-Amarna","aliases":["Tell el-Amarna","Tell el Amarna","el-Amarna","Amarna","Akhetaten","Akhetaton","Akhétaton","آخت أتون","أخت آتون","تل العمارنة","العمارنة"],"evidence":["Tell el-Amarna","Tell el Amarna","el-Amarna","Amarna","Akhetaten","Akhetaton","Akhétaton","آخت أتون","أخت آتون","تل العمارنة","العمارنة"],"parents":[],"related":[],"sources":["https://egymonuments.gov.eg/ar/collections/amarna/"],"alignments":[],"exclude_evidence":["Amarna Period","Amarna period","époque amarnienne","période amarnienne","العصر العمارني","الفترة العمارنية"],"corpus_anchors":[{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Tell el-Amarna","Tell el Amarna","el-Amarna","Amarna"]}],"raw_literal_anchor_count":1},{"id":"bubastis","label_fr":"Bubastis / Tell Basta","label_en":"Bubastis / Tell Basta","aliases":["Bubastis","Boubastis","Tell Basta","Tell el-Basta","Tal Basta","Per-Bastet","Per Bastet","تل بسطة","تل بسطا","بر باستت"],"evidence":["Bubastis","Boubastis","Tell Basta","Tell el-Basta","Tal Basta","Per-Bastet","Per Bastet","تل بسطة","تل بسطا","بر باستت"],"parents":["lower-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/tal-basta/","https://egymonuments.gov.eg/ar/historical-periods/third-intermediate-period/"],"alignments":[],"exclude_evidence":[],"corpus_anchors":[{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Bubastis"]}],"raw_literal_anchor_count":1},{"id":"abu-simbel","label_fr":"Abou Simbel","label_en":"Abu Simbel","aliases":["Abou Simbel","Abu Simbel","Abu-Simbel","أبو سمبل","ابو سمبل","أبوسمبل","ابوسمبل"],"evidence":["Abou Simbel","Abu Simbel","Abu-Simbel","أبو سمبل","ابو سمبل","أبوسمبل","ابوسمبل"],"parents":["nubia"],"related":[],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/abu-simbel/","https://egymonuments.gov.eg/ar/world-heritage/nubian-monuments-from-abu-simbel-to-philae/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-5-note-10","page":9,"kind":"note","forms":["Abu Simbel","Abu-Simbel"]}],"raw_literal_anchor_count":1},{"id":"hierakonpolis","label_fr":"Hiéraconpolis","label_en":"Hierakonpolis","aliases":["Hiéraconpolis","Hierakonpolis","Hieraconpolis","Nekhen","Nékhen","Kom el-Ahmar","Kom al-Ahmar","الكوم الأحمر","الكوم الاحمر","نخن"],"evidence":["Hiéraconpolis","Hierakonpolis","Hieraconpolis","Nekhen","Nékhen","Kom el-Ahmar","Kom al-Ahmar","الكوم الأحمر","الكوم الاحمر","نخن"],"parents":["upper-egypt"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/hierakonpolis/index.html","https://egymonuments.gov.eg/ar/collections/narmer-palette-1/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-note-116","page":29,"kind":"note","forms":["Hiéraconpolis","Hieraconpolis"]}],"raw_literal_anchor_count":1},{"id":"oxyrhynchus","label_fr":"Oxyrhynque","label_en":"Oxyrhynchus","aliases":["Oxyrhynque","Oxyrhynchus","Oxyrhynchos","al-Bahnasa","el-Bahnasa","Bahnasa","البهنسا"],"evidence":["Oxyrhynchus","Oxyrhynchos","al-Bahnasa","el-Bahnasa","Bahnasa","البهنسا","terre d’Oxyrhynque","terre d'Oxyrhynque","ville d’Oxyrhynque","ville d'Oxyrhynque"],"parents":["upper-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/al-bahnasa-tombs/","https://www.ucl.ac.uk/museums-static/digitalegypt/oxyrhynchus/index.html","https://www.ucl.ac.uk/museums-static/digitalegypt/oxyrhynchus/arabic.html"],"alignments":[],"exclude_evidence":["Oxyrhynchus fish","oxyrhynchus fish","poisson oxyrhynque","poissons oxyrhynques"],"corpus_anchors":[{"id":"boe-2026-4-p44-body-2","page":44,"kind":"body","forms":["terre d’Oxyrhynque","terre d'Oxyrhynque"]}],"raw_literal_anchor_count":1},{"id":"bahariya","label_fr":"Oasis de Bahariya","label_en":"Bahariya Oasis","aliases":["Baharia","Bahariya","Bahariyya","Bahariya Oasis","Oasis de Bahariya","الواحات البحرية","واحة البحرية"],"evidence":["Baharia","Bahariya","Bahariyya","Bahariya Oasis","Oasis de Bahariya","الواحات البحرية","واحة البحرية"],"parents":[],"related":["kharga"],"sources":["https://egymonuments.gov.eg/ar/archaeological-sites/al-bahnasa-tombs/","https://egymonuments.gov.eg/ar/news/the-guardian-published-a-photo-report-showcasing-the-beautiful-landscapes-of-the-white-desert/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-p44-body-2","page":44,"kind":"body","forms":["Baharia"]},{"id":"boe-2026-4-p44-body-3","page":44,"kind":"body","forms":["Baharia"]}],"raw_literal_anchor_count":2},{"id":"kharga","label_fr":"Oasis de Kharga","label_en":"Kharga Oasis","aliases":["Kharga","el-Kharga","El Kharga","Kharga Oasis","Oasis de Kharga","واحة الخارجة","الواحات الخارجة","الخارجة"],"evidence":["Kharga","el-Kharga","El Kharga","Kharga Oasis","Oasis de Kharga","واحة الخارجة","الواحات الخارجة"],"parents":[],"related":["bahariya"],"sources":["https://egymonuments.gov.eg/ar/news/announcement-of-kharga-city-in-the-new-valley-governorate-as-the-first-environmentally-friendly-city-in-egypt/"],"alignments":[],"corpus_anchors":[{"id":"boe-2026-4-p44-body-2","page":44,"kind":"body","forms":["Kharga"]},{"id":"boe-2026-4-p44-body-3","page":44,"kind":"body","forms":["Kharga"]}],"raw_literal_anchor_count":2},{"id":"busiris","label_fr":"Busiris (Delta)","label_en":"Busiris (Delta)","aliases":["Busiris","Bousiris","Djedu","Djedou","Abu Sir Bana","Abou Sir Bana","أبو صير بنا","ابو صير بنا","أبوصير بنا","بوصير"],"evidence":["Busiris","Bousiris","Djedu","Djedou","Abu Sir Bana","Abou Sir Bana","أبو صير بنا","ابو صير بنا","أبوصير بنا"],"parents":["lower-egypt"],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/geo/nomel9.html"],"alignments":[],"exclude_evidence":["Busiris (mythologie)","Busiris (mythology)"],"corpus_anchors":[{"id":"boe-2026-4-p13-body-2","page":13,"kind":"body","forms":["Busiris"]},{"id":"boe-2026-4-p14-body-1","page":14,"kind":"body","forms":["Busiris"]}],"raw_literal_anchor_count":2},{"id":"tanis","label_fr":"Tanis / San el-Hagar","label_en":"Tanis / San el-Hagar","aliases":["Tanis","San el-Hagar","San el Hagar","San al-Hagar","صان الحجر","صان الحجر القبلية","تانيس"],"evidence":["Tanis","San el-Hagar","San el Hagar","San al-Hagar","صان الحجر","صان الحجر القبلية","تانيس"],"parents":["lower-egypt"],"related":[],"sources":["https://egymonuments.gov.eg/ar/historical-periods/third-intermediate-period/","https://pactols.frantiq.fr/?idc=24157&idt=th17","https://ark.frantiq.fr/ark:/26678/pcrt4sAd0fyyew"],"alignments":[{"scheme":"PACTOLS-Lieux","uri":"https://ark.frantiq.fr/ark:/26678/pcrt4sAd0fyyew","label":"Tanis","match":"exact"}],"corpus_anchors":[],"raw_literal_anchor_count":0}]};
// Les notices et leurs alignements documentent les correspondances. Ils ne
// datent pas un texte et n'attribuent pas une provenance à un objet.
const CONTEXT_KINDS=new Set(['period','dynasty','place']);
const CONTEXT_DEFINITIONS=[
  ...CONTEXT_VOCABULARY.periods.map(item=>({...item,id:'period:'+item.id,kind:'period',label:item.label_fr,queries:[...new Set([...(item.aliases||[]),item.label_fr,item.label_en].filter(Boolean))],evidence:item.evidence||item.aliases||[]})),
  ...CONTEXT_VOCABULARY.dynasties.map(item=>({...item,id:'dynasty:'+item.number,kind:'dynasty',label:item.label_fr||`${romanCentury(item.number)}${item.number===1?'re':'e'} dynastie`,queries:item.arabic_aliases||[],evidence:item.arabic_aliases||[]})),
  ...CONTEXT_VOCABULARY.places.map(item=>({...item,id:'place:'+item.id,kind:'place',label:item.label_fr,queries:[...new Set([...(item.aliases||[]),item.label_fr,item.label_en].filter(Boolean))],evidence:item.evidence||item.aliases||[]})),
];
function contextReference(id,kind){
  if(id.includes(':'))return id;
  if(CONTEXT_VOCABULARY.periods.some(item=>item.id===id))return 'period:'+id;
  if(CONTEXT_VOCABULARY.places.some(item=>item.id===id))return 'place:'+id;
  return kind+':'+id;
}
const CONTEXT_HIERARCHY=CONTEXT_DEFINITIONS.flatMap(item=>(item.parents||[]).map(parent=>[contextReference(parent,item.kind),item.id]));
const CONTEXT_ASSOCIATIONS=CONTEXT_DEFINITIONS.flatMap(item=>(item.related||[]).map(other=>[item.id,contextReference(other,item.kind)]));
const CONTEXT_EQUIVALENCES=CONTEXT_VOCABULARY.periods.flatMap(item=>(item.equivalent_dynasties||[]).map(number=>['period:'+item.id,'dynasty:'+number]));
const CONTEXT_BY_ID=new Map(CONTEXT_DEFINITIONS.map(item=>[item.id,item]));
const contextLiteral=form=>({surface:form,alias:fold(form)});
const CONTEXT_MATCHERS=CONTEXT_DEFINITIONS.map(item=>({id:item.id,evidence:item.evidence.map(contextLiteral),exclude:(item.exclude_evidence||[]).map(contextLiteral),rules:(item.contextual_evidence||[]).map(rule=>({...rule,form:contextLiteral(rule.form),requires:(rule.requires||[]).map(contextLiteral)}))}));
const CONTEXT_DESCENDANTS=new Map(CONTEXT_DEFINITIONS.map(item=>{
  const seen=new Set(),queue=[item.id];
  while(queue.length){const parent=queue.shift();for(const [from,to] of CONTEXT_HIERARCHY)if(from===parent&&!seen.has(to)){seen.add(to);queue.push(to);}}
  return [item.id,[...seen].filter(id=>id!==item.id)];
}));
for(const item of CONTEXT_DEFINITIONS)if(item.label_en)ENGLISH_UI[item.label]=item.label_en;
const DYNASTY_ORDINALS=new Map([...CENTURY_ORDINALS].filter(([,number])=>number<=31));
for(const [word,number] of [['vingt deuxieme',22],['vingt troisieme',23],['vingt quatrieme',24],['vingt cinquieme',25],['vingt sixieme',26],['vingt septieme',27],['vingt huitieme',28],['vingt neuvieme',29],['trente et unieme',31]])DYNASTY_ORDINALS.set(word,number);
for(const item of CONTEXT_VOCABULARY.dynasties)for(const word of [item.arabic_ordinal,...(item.arabic_ordinals||[]),...(item.arabic_ordinal_variants||[])].filter(Boolean))DYNASTY_ORDINALS.set(normalizedCenturyText(word).replace(/[-\s]+/gu,' ').trim(),item.number);
const DYNASTY_WORD_SOURCE=[...DYNASTY_ORDINALS.keys()].sort((a,b)=>b.length-a.length).map(word=>word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replaceAll(' ','[\\s-]+')).join('|');
const DYNASTY_NUMBER_SOURCE=`(?:${DYNASTY_WORD_SOURCE}|[0-9]{1,2}(?:ere|re|er|eme|e|st|nd|rd|th)?|[ivxlcdm]+(?:ere|re|er|eme|e|st|nd|rd|th)?)`;
const DYNASTY_NOUN_SOURCE='(?:dynast(?:ies?|y)|dynastie[n]?|dyn\\.|(?:ال)?اسر[ةه]|(?:ال)?اسرات)';
const DYNASTY_JOIN_SOURCE='(?:\\s*(?:[-–—/]|et|and|a|au|to|و)\\s*(?:(?:the|early|late)\\s+)*)';
const DYNASTY_EXPRESSION_PATTERN=new RegExp(`(?<![\\p{L}\\p{N}])(?:${DYNASTY_NUMBER_SOURCE}(?:${DYNASTY_JOIN_SOURCE}${DYNASTY_NUMBER_SOURCE}){0,3}\\s*[.]?\\s*${DYNASTY_NOUN_SOURCE}|${DYNASTY_NOUN_SOURCE}\\s+(?:(?:egyptienne|egyptian|المصرية)\\s+)?${DYNASTY_NUMBER_SOURCE}(?:${DYNASTY_JOIN_SOURCE}${DYNASTY_NUMBER_SOURCE}){0,3})(?![\\p{L}\\p{N}])`,'gu');
const DYNASTY_NUMBER_PATTERN=new RegExp(`(?<![\\p{L}\\p{N}])${DYNASTY_NUMBER_SOURCE}(?![\\p{L}\\p{N}])`,'gu');
function dynastyNumber(value){
  const token=normalizedCenturyText(value).replace(/[-\s]+/gu,' ').trim();
  if(DYNASTY_ORDINALS.has(token))return DYNASTY_ORDINALS.get(token);
  const number=centuryNumber(token.replace(/ere$/u,'re'));
  return number&&number<=31?number:null;
}
function dynastyExpressions(value){
  const original=String(value||''),text=normalizedCenturyText(original),found=[];
  for(const match of text.matchAll(DYNASTY_EXPRESSION_PATTERN)){
    const numbers=[...new Set([...match[0].matchAll(DYNASTY_NUMBER_PATTERN)].map(part=>dynastyNumber(part[0])).filter(Boolean))];
    if(!numbers.length)continue;
    const start=centuryOriginalOffset(original,match.index),end=centuryOriginalOffset(original,match.index+match[0].length);
    found.push({numbers,start,end,source:original.slice(start,end)});
  }
  return found;
}
function contextLiteralHits(text,variant,exclude=[],normalized=fold(text)){
  const alias=typeof variant==='string'?fold(variant):variant.alias,surface=typeof variant==='string'?variant:variant.surface,hits=[];
  if(!alias)return hits;
  const excluded=[];
  for(const form of exclude){const needle=typeof form==='string'?fold(form):form.alias;let at=-1;while((at=normalized.indexOf(needle,at+1))>=0)excluded.push([at,at+needle.length]);}
  let at=-1;
  while((at=normalized.indexOf(alias,at+1))>=0){
    if((at&&normalized[at-1]!==' ')||(at+alias.length<normalized.length&&normalized[at+alias.length]!==' '))continue;
    if(excluded.some(([start,end])=>at>=start&&at+alias.length<=end))continue;
    hits.push({pos:at,surface,section:null,kind:'context'});
  }
  return hits;
}
function contextEvidenceFor(text){
  if(state.contextEvidence.has(text))return state.contextEvidence.get(text);
  const normalized=fold(text);
  const direct=new Map(CONTEXT_DEFINITIONS.map(item=>[item.id,[]]));
  for(const item of CONTEXT_MATCHERS){
    const hits=direct.get(item.id);
    for(const variant of item.evidence)hits.push(...contextLiteralHits(text,variant,item.exclude,normalized));
    for(const rule of item.rules){
      const anchors=(rule.requires||[]).flatMap(term=>contextLiteralHits(text,term,[],normalized));
      for(const hit of contextLiteralHits(text,rule.form,item.exclude,normalized))if(anchors.some(anchor=>Math.abs(anchor.pos-hit.pos)<=(rule.within||400)))hits.push(hit);
    }
  }
  for(const hit of dynastyExpressions(text))for(const number of hit.numbers){
    const id='dynasty:'+number;
    if(direct.has(id))direct.get(id).push({pos:fold(text.slice(0,hit.start)).length,surface:hit.source,section:null,kind:'dynasty'});
  }
  for(const [period,dynasty] of CONTEXT_EQUIVALENCES){
    const left=direct.get(period)||[],right=direct.get(dynasty)||[];
    direct.set(period,[...left,...right]);direct.set(dynasty,[...right,...left]);
  }
  const all=new Map();
  for(const item of CONTEXT_DEFINITIONS){
    const found=new Map();
    for(const id of [item.id,...(CONTEXT_DESCENDANTS.get(item.id)||[])])for(const hit of direct.get(id)||[]){
      const key=hit.pos+':'+fold(hit.surface);
      if(!found.has(key))found.set(key,{...hit,evidenceConcept:id});
    }
    all.set(item.id,[...found.values()].sort((a,b)=>a.pos-b.pos));
  }
  if(state.contextEvidence.size>=1600)state.contextEvidence.delete(state.contextEvidence.keys().next().value);
  state.contextEvidence.set(text,all);return all;
}
function contextQuery(id){
  const item=CONTEXT_BY_ID.get(id);if(!item)return '';
  if(item.kind==='dynasty')return LANGUAGE==='en'?`${item.number}${item.number%100>=11&&item.number%100<=13?'th':({1:'st',2:'nd',3:'rd'}[item.number%10]||'th')} dynasty`:`${romanCentury(item.number)}${item.number===1?'re':'e'} dynastie`;
  return LANGUAGE==='en'?(item.label_en||item.label):item.label;
}
function updateContextRelations(plan){
  const section=$('context-relations'),wrap=$('context-related-chips'),note=$('context-relation-note');
  if(!section||!wrap||!note)return;
  const selected=new Set((plan?.groups||[]).map(group=>group.concept).filter(id=>CONTEXT_BY_ID.has(id))),links=new Map();
  const add=(id,relation)=>{if(!selected.has(id)&&CONTEXT_BY_ID.has(id)&&!links.has(id))links.set(id,{id,relation});};
  for(const [parent,child] of CONTEXT_HIERARCHY){if(selected.has(parent))add(child,'narrower');if(selected.has(child))add(parent,'broader');}
  for(const [left,right] of [...CONTEXT_ASSOCIATIONS,...CONTEXT_EQUIVALENCES]){if(selected.has(left))add(right,'related');if(selected.has(right))add(left,'related');}
  wrap.replaceChildren();section.hidden=!links.size;
  note.textContent=t('Les ensembles incluent les mentions de leurs éléments. Un lien associé propose une autre recherche, sans équivalence automatique.');
  const labels={broader:'Plus général : {label}',narrower:'Plus précis : {label}',related:'Associé selon le contexte : {label}'};
  for(const {id,relation} of links.values()){
    const item=CONTEXT_BY_ID.get(id),button=document.createElement('button');button.type='button';button.className='chip';
    button.textContent=t(labels[relation],{label:t(item.label)});button.dataset.context=id;button.dataset.relation=relation;
    button.addEventListener('click',()=>{state.keywordRefinements=[];state.contextRefinements=[];$('theme-input').value=contextQuery(id);runSearch();});
    wrap.append(button);
  }
}
function toggleContextRefinement(id){
  if(!state.corpus||!state.search||!CONTEXT_BY_ID.has(id))return;
  const index=state.contextRefinements.indexOf(id);
  if(index>=0)state.contextRefinements.splice(index,1);else state.contextRefinements.push(id);
  state.visibleCount=18;applyKeywordRefinements();render();
}
function drawContextFilters(){
  const section=$('context-filters'),note=$('context-filter-note');if(!section||!note)return;
  const focused=document.activeElement?.dataset?.facet?document.activeElement.dataset.context:null;
  let restored=false;
  const selected=new Set(state.contextRefinements),counts=new Map(),candidates=new Set();
  for(const passage of state.baseResult)for(const [id,hits] of contextEvidenceFor(passage.text))if(hits.length)candidates.add(id);
  for(const passage of state.result.filter(p=>state.filter==='all'||p.kind===state.filter))for(const [id,hits] of contextEvidenceFor(passage.text))if(hits.length)counts.set(id,(counts.get(id)||0)+1);
  const labels=state.contextRefinements.map(id=>t(CONTEXT_BY_ID.get(id).label));
  note.textContent=(labels.length?t('Filtres actifs : {terms}.',{terms:labels.join(' · ')})+' ':'')+t('Ces filtres portent sur les périodes et les lieux mentionnés dans les extraits. Ils se cumulent. Cliquez à nouveau pour retirer un filtre.');
  let any=false;
  for(const [kind,containerId,groupId,moreId] of [['period','period-filters','period-filter-group','period-more'],['place','place-filters','place-filter-group','place-more']]){
    const wrap=$(containerId),group=$(groupId),more=$(moreId);if(!wrap)continue;
    const values=CONTEXT_DEFINITIONS.filter(item=>(kind==='period'?item.kind!=='place':item.kind==='place')&&(selected.has(item.id)||candidates.has(item.id))&&item.facet!==false)
      .sort((a,b)=>Number(selected.has(b.id))-Number(selected.has(a.id))||(kind==='period'?CONTEXT_DEFINITIONS.indexOf(a)-CONTEXT_DEFINITIONS.indexOf(b):t(a.label).localeCompare(t(b.label),LANGUAGE)));
    if(group)group.hidden=!values.length;any=any||!!values.length;wrap.replaceChildren();
    const active=values.filter(item=>selected.has(item.id)),limit=state.contextExpanded[kind]?values.length:Math.max(12,active.length),shown=values.slice(0,limit);
    for(const item of shown){
      const button=document.createElement('button'),active=selected.has(item.id),label=t(item.label);button.type='button';button.className='chip';button.textContent=`${label} (${counts.get(item.id)||0})`;button.dataset.context=item.id;button.dataset.facet=kind;
      button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',t(active?'Retirer le filtre « {term} »':'Filtrer par « {term} »',{term:label}));
      button.addEventListener('click',()=>toggleContextRefinement(item.id));wrap.append(button);
      if(focused===item.id){button.focus?.();restored=true;}
    }
    if(more){more.hidden=values.length<=12;more.textContent=t(state.contextExpanded[kind]?'Réduire la liste':'Afficher toute la liste');more.onclick=()=>{state.contextExpanded[kind]=!state.contextExpanded[kind];drawContextFilters();};}
  }
  section.hidden=!any;if(selected.size)section.open=true;
  if(focused&&!restored)$('theme-input').focus?.();
}

const GRAMMAR_QUERY_CODES=new Map([['Fin','grammar:finite'],['Part','pos:participle'],['Inf','pos:infinitive'],['Conv','grammar:converb'],['Vnoun','grammar:vnoun']]);
const CONTROLLED_CONCEPTS=new Map([
  ...CONTEXT_DEFINITIONS.map(item=>[item.id,item]),
  ...EGYPTIAN_CORPORA.map(item=>[item.id,{...item,kind:'corpus',queries:item.aliases,evidence:item.aliases}]),
  ...EGYPTIAN_POS.map(item=>['pos:'+item.id,{...item,id:'pos:'+item.id,kind:'grammar'}]),
  ...LANGUAGE_CONCEPTS.map(item=>['lang:'+item.id,{...item,id:'lang:'+item.id}]),
  ...GRAMMAR_SEARCH_CONCEPTS.map(item=>['grammar:'+item.id,{...item,id:'grammar:'+item.id,kind:'grammar',searchGroup:true}]),
]);
const CONCEPT_ALIASES=[...CONTROLLED_CONCEPTS.values()].flatMap(concept=>concept.queries.map(alias=>({alias:fold(alias),literal:alias,strictCase:concept.kind==='grammar'&&/^[A-Z]{2,6}$/u.test(alias),concept:concept.id,searchGroup:!!concept.searchGroup})))
  .sort((a,b)=>b.alias.split(' ').length-a.alias.split(' ').length||b.alias.length-a.alias.length||Number(b.strictCase)-Number(a.strictCase)||Number(b.searchGroup)-Number(a.searchGroup));
const CORPUS_CODES=EGYPTIAN_CORPORA.flatMap(item=>(item.codes||[]).map(code=>({code,concept:item.id})));
function directConceptMentions(text,group){
  const concept=CONTROLLED_CONCEPTS.get(group.concept);if(!concept)return [];
  if(concept.kind==='century')return centuryMentions(text,concept);
  const normalized=fold(text),results=[],seen=new Set();
  for(const variant of concept.evidence){
    // Les codes POS sont sensibles à la casse. « AUX » (auxiliaire) ne peut
    // pas faire ressortir toutes les prépositions françaises « aux » ; de
    // même « PART » (particule) n'est pas l'anglais ordinaire « part ».
    if(concept.kind==='grammar'&&/^[A-Z]{2,6}$/u.test(variant))continue;
    const alias=fold(variant),needle=` ${alias} `,haystack=` ${normalized} `;
    let at=0;
    while((at=haystack.indexOf(needle,at))>=0){
      const pos=at;
      const before=normalized.slice(0,pos).trimEnd();
      const after=normalized.slice(pos+alias.length).trimStart();
      const hasNounDeterminer=/(?:^| )(?:le|les|un|des|ce|ces|du|notre|votre|son|leur)$/u.test(before);
      const participationVerb=concept.id==='pos:participle'&&/^participes?$/u.test(alias)&&!hasNounDeterminer&&(
        /(?:^| )(?:je|tu|il|elle|on|nous|vous|ils|elles)(?: [\p{L}]+){0,3}$/u.test(before)||
        /^(?:(?:[\p{L}]+ment|ainsi|aussi|donc) )*(?:a|au|aux|de|du|des)\b/u.test(after));
      const blocked=concept.id==='grammar:finite'&&/(?:^| )non$/u.test(before)||
        concept.id==='pos:participle'&&/(?:^| )pseudo$/u.test(before)||
        participationVerb||
        concept.id==='pos:noun'&&alias==='substantive'&&/^(?:use|uses|function|functions)\b/u.test(after)||
        concept.id==='pos:noun'&&/^nouns?$/u.test(alias)&&/(?:^| )(?:proper|verbal)$/u.test(before);
      if(blocked){at+=needle.length-1;continue;}
      if(!seen.has(pos)){results.push({pos,surface:variant,section:null,kind:concept.kind==='language'?'mention':'title'});seen.add(pos);}
      at+=needle.length-1;
    }
  }
  if(concept.kind==='language'){
    // Ne pas prendre des chiffres arabes ou une lettre grecque isolée pour
    // des mots. Script=Greek couvre le polytonique, sans absorber le copte.
    // L'original est conservé pour que l'utilisateur puisse le vérifier.
    for(const match of String(text).matchAll(LANGUAGE_SCRIPT_PATTERNS[concept.script])){
      if([...match[0]].filter(char=>/\p{L}/u.test(char)).length<2)continue;
      const pos=fold(text.slice(0,match.index)).length;
      if(!seen.has(pos)){results.push({pos,surface:match[0],section:null,kind:'script'});seen.add(pos);}
    }
  }
  if(concept.kind==='grammar')for(const code of concept.evidence.filter(x=>/^[A-Z]{2,6}$/u.test(x))){
    const pattern=new RegExp(`(?<![\\p{L}\\p{N}])${code}(?![\\p{L}\\p{N}])`,'gu');
    for(const match of String(text).matchAll(pattern)){
      const pos=fold(text.slice(0,match.index)).length;
      if(!seen.has(pos)){results.push({pos,surface:code,section:null,kind:'tag'});seen.add(pos);}
    }
  }
  if(concept.kind==='grammar'&&concept.featureValue){
    const pattern=new RegExp(`(?<![\\p{L}\\p{N}])VerbForm\\s*=\\s*${concept.featureValue}(?![\\p{L}\\p{N}])`,'gu');
    for(const match of String(text).matchAll(pattern)){
      const pos=fold(text.slice(0,match.index)).length;
      if(!seen.has(pos)){results.push({pos,surface:match[0],section:null,kind:'feature'});seen.add(pos);}
    }
  }
  for(const code of concept.literalCodes||[]){
    const pattern=new RegExp(`(?<![\\p{L}\\p{N}])${code}(?![\\p{L}\\p{N}])`,'gu');
    for(const match of String(text).matchAll(pattern)){
      const pos=fold(text.slice(0,match.index)).length;
      if(!seen.has(pos)){results.push({pos,surface:match[0],section:null,kind:'feature'});seen.add(pos);}
    }
  }
  if(concept.kind==='corpus')for(const code of concept.codes||[]){
    const pattern=new RegExp(`(?<![\\p{L}\\p{N}])${code}\\.?[\\s§.,:]*([0-9]{1,4})(?![0-9])`,'gu');
    for(const match of String(text).matchAll(pattern)){
      const pos=fold(text.slice(0,match.index)).length;
      if(!seen.has(pos)){results.push({pos,surface:match[0],section:match[1],kind:'code'});seen.add(pos);}
    }
  }
  if(group.section){
    const number=String(Number(group.section));
    return results.filter(hit=>hit.section===number||
      (!hit.section&&new RegExp(`(?:^|[^0-9])(?:chapitre|chapter|spell|formule|spruch|utterance|§)?\\s*${number}(?![0-9])`,'iu')
        .test(normalized.slice(hit.pos+fold(hit.surface).length,hit.pos+fold(hit.surface).length+55))));
  }
  return results;
}
function grammarDescendants(id){
  const found=new Set(),queue=[id];
  while(queue.length){const parent=queue.shift();for(const [from,to] of GRAMMAR_HIERARCHY)if(from===parent&&!found.has(to)){found.add(to);queue.push(to);}}
  return [...found];
}
function conceptMentions(text,group){
  const concept=CONTROLLED_CONCEPTS.get(group.concept);if(!concept)return [];
  if(CONTEXT_KINDS.has(concept.kind))return contextEvidenceFor(text).get(concept.id)||[];
  const aggregate=concept.aggregate||concept.id==='pos:conjunction';
  if(!aggregate)return directConceptMentions(text,group);
  const found=new Map();
  for(const id of [concept.id,...grammarDescendants(concept.id)])for(const hit of directConceptMentions(text,{...group,concept:id})){
    const key=`${hit.pos}:${fold(hit.surface)}`;
    if(!found.has(key))found.set(key,{...hit,evidenceConcept:id});
  }
  return [...found.values()].sort((a,b)=>a.pos-b.pos);
}
function arabicVariants(token){
  const options=new Set([token]);
  if(!/^[\u0621-\u064a]/u.test(token))return [...options];
  // Parcourir au plus deux proclitiques : « وباللغة » → « اللغة » → « لغة ».
  // L'article, lui, n'est pas considéré comme un proclitique supplémentaire.
  const queue=[{value:token,depth:0}];
  while(queue.length){
    const {value,depth}=queue.shift();
    if(value.startsWith('ال')&&value.length>=5)options.add(value.slice(2));
    if(depth>=2||value.length<5)continue;
    const variants=[];
    if(value.startsWith('لل')&&value.length>=5)variants.push('ال'+value.slice(2));
    if(/^[وف]/u.test(value)&&value.length>=6)variants.push(value.slice(1));
    // بــ / لــ / كــ : enlever le préfixe uniquement devant « ال ».
    if(/^[بلك]/u.test(value)&&value.slice(1).startsWith('ال'))variants.push(value.slice(1));
    for(const next of variants)if(!options.has(next)){
      options.add(next);queue.push({value:next,depth:depth+1});
    }
  }
  return [...options];
}
// Clé philologique indépendante de l'encodage : Unicode égyptologique,
// variantes traditionnelles (ȝ, ʿ, ꞽ), Unicode décomposé et Manuel de Codage.
// Les capitales de MdC sont significatives : H ≠ h, x ≠ X, S ≠ s.
const EGYPT_MARKED=/[ꜣꜢꜥꜤȝȜʿʕˁʾʔʼʻꞽꞼỉḥḤḫḪẖẖśŚšŠṯṮṱṰṭṬčČḏḎḳḲïÏ\u032F]/u;
const EGYPT_SINGLE=/(?:[iI]\u032F|[uU]\u032F|[Hh][\u0331\u032d]|[čČ]\u0323|[ꜣꜢꜥꜤȝȜʿʕˁʾʔʼʻꞽꞼỉḥḤḫḪẖẖśŚšŠṯṮṱṰṭṬčČḏḎḳḲïÏ])/gu;
const EGYPT_UNIT=/[\p{L}\p{M}\p{N}]+(?:[.·\-()\[\]{}⟨⟩〈〉⸢⸣⸗=:]*[\p{L}\p{M}\p{N}]+)*/gu;
const EGYPT_SEPARATORS=/[.·\-()\[\]{}⟨⟩〈〉⸢⸣⸗=:]/u;
function egyptianKey(value){
  const converted=String(value||'').normalize('NFC')
    // Variantes Unicode normalisées par Werning/EpiDoc et l'IFAO :
    // H̱ (ou h̭) = ẖ ; ś = s ; ṱ/č = ṯ ; ṭ = d ; č̣ = ḏ.
    // Les signes ï et i̯/u̯ restent distincts des autres semi-voyelles.
    .replace(/[iI]\u032F/gu,'I').replace(/[uU]\u032F/gu,'U')
    .replace(/[Hh][\u0331\u032d]/gu,'ẖ')
    .replace(/[čČ][\u0323]/gu,'ḏ')
    .replace(/[ꜣꜢȝȜ]/gu,'A').replace(/[ʾʔʼ]/gu,'E')
    .replace(/[ꜥꜤʿʕˁʻ]/gu,'a')
    .replace(/[ꞽꞼỉ]/gu,'j')
    .replace(/[ḥḤ]/gu,'H').replace(/[ḫḪ]/gu,'x').replace(/ẖ/gu,'X')
    .replace(/[śŚ]/gu,'s').replace(/[šŠ]/gu,'S')
    .replace(/[ṯṮṱṰčČ]/gu,'T').replace(/[ṭṬ]/gu,'d').replace(/[ḏḎ]/gu,'D')
    .replace(/[ïÏ]/gu,'V')
    .replace(/[ḳḲ]/gu,'q').replace(/3/gu,'A')
    .replace(/[.·\-()\[\]{}⟨⟩〈〉⸢⸣⸗=:]/gu,'');
  // Jamais effacer un signe inconnu et créer artificiellement l'identité
  // de deux lexèmes (ancien problème : « ṭp » était réduit à « p »).
  if(/[^A-Za-z0-9]/u.test(converted))return null;
  const key=[...converted].map(x=>'AHXSTDIUVE'.includes(x)?x:x.toLowerCase()).join('');
  return key.length>=1&&key.length<=48?key:null;
}
function mdcSurface(value){
  if(!/^[A-Za-z]{2,18}$/u.test(value))return false;
  // En plus des capitales internes (`nTr`), reconnaître des formes comme
  // `Axt`, tout en excluant les noms latins ordinaires (`Aten`, `Asia`).
  return /[a-z][AHXSTD][a-z]/u.test(value)||
    (/^[AHXSTD][a-z]{2,8}$/u.test(value)&&/[xXHSTD]/u.test(value.slice(1))&&!/[eou]/iu.test(value));
}
function egyptianQueryMatches(query){
  const found=[],seen=new Set();
  if(!state.egyptianIndex.size)return found;
  for(const match of String(query||'').matchAll(EGYPT_UNIT)){
    const raw=match[0],key=egyptianKey(raw);
    if(!key)continue;
    let chosen=state.egyptianIndex.has(key)?key:null;
    // Une graphie entièrement ASCII, éventuellement en minuscules, ne peut
    // être rapprochée que d'une SEULE entrée de l'index philologique.
    if(!chosen&&/^[A-Za-z]+$/u.test(raw)&&raw.length>=3){
      const alternatives=[...state.egyptianIndex.keys()].filter(x=>x.toLowerCase()===key.toLowerCase());
      if(alternatives.length===1)chosen=alternatives[0];
    }
    if(!chosen&&/^[a-z]{3,}$/u.test(raw)&&/kh|sh|dj/.test(raw)){
      const digraph=raw.replace(/kh/g,'x').replace(/sh/g,'S').replace(/dj/g,'D');
      if(state.egyptianIndex.has(digraph))chosen=digraph;
    }
    if(!chosen)continue;
    const source=/[.·\-()⟨⟩⸢⸣⸗]/u.test(raw)?fold(raw).replace(/\s/g,''):(words(raw)[0]||fold(raw).replace(/\s/g,''));
    if(!source||seen.has(`${source}:${chosen}`))continue;
    seen.add(`${source}:${chosen}`);
    found.push({source,raw,key:chosen,start:match.index});
  }
  return found;
}
function topicsFor(input){const query=fold(input);const matched=THEMES.map(t=>({...t,weight:t.triggers.reduce((score,w)=>score+(query.includes(fold(w))?1:0),0)})).filter(t=>t.weight).sort((a,b)=>b.weight-a.weight);return matched.slice(0,3);}
function expand(input,found){const basis=new Set(words(input));for(const t of found)for(const term of t.keywords)for(const token of words(term))basis.add(token);return [...basis].slice(0,38);}

function initializeLexicon(){
  state.lexicon.clear();state.egyptianIndex.clear();state.citedNames.clear();state.contextEvidence.clear();
  const recordEgyptian=(surface,key,p,at)=>{
    if(!state.egyptianIndex.has(key))state.egyptianIndex.set(key,{forms:new Set(),byId:new Map()});
    const entry=state.egyptianIndex.get(key);entry.forms.add(surface);
    if(!entry.byId.has(p.id))entry.byId.set(p.id,[]);
    entry.byId.get(p.id).push({pos:fold(p.text.slice(0,at)).length,raw:surface});
  };
  for(const p of state.corpus.passages){
    for(const w of words(p.text)){const x=state.lexicon.get(w)||{term:w,count:0};x.count++;state.lexicon.set(w,x);}
    for(const match of p.text.matchAll(EGYPT_UNIT)){
      const raw=match[0];
      // Conserver le composé ET ses segments attestés (« ꜥḥꜥ⸗f » contient
      // explicitement « ꜥḥꜥ »), mais jamais de sous-chaînes arbitraires.
      const surfaces=new Set([raw,...raw.split(EGYPT_SEPARATORS)]);
      for(const surface of surfaces){
        // Un mot latin ordinaire ou un nom moderne ne doit jamais être traité
        // comme translittération par une simple ressemblance graphique.
        if(!EGYPT_MARKED.test(surface)&&!mdcSurface(surface))continue;
        const key=egyptianKey(surface);if(!key)continue;
        const relative=raw.indexOf(surface);
        recordEgyptian(surface,key,p,match.index+Math.max(0,relative));
      }
      // Les signes individuels restent interrogeables même s'ils sont
      // uniquement attestés à l'intérieur d'un mot (ꜣ dans mꜣꜥ).
      for(const single of raw.matchAll(EGYPT_SINGLE)){
        const key=egyptianKey(single[0]);
        if(key)recordEgyptian(single[0],key,p,match.index+single.index);
      }
    }
    for(const match of p.text.matchAll(/([\p{Lu}][\p{L}\p{M}’'-]{2,})\s+(?:18|19|20)\d{2}/gu))state.citedNames.add(fold(match[1]));
  }
  for(const d of state.corpus.documents){for(const name of words(d.author))state.citedNames.add(name);}
  for(const p of state.corpus.passages)contextEvidenceFor(p.text);
}
function spellingDistance(a,b,max){
  if(Math.abs(a.length-b.length)>max)return max+1;
  let prev=Array.from({length:b.length+1},(_,i)=>i),beforePrev=null;
  for(let i=1;i<=a.length;i++){
    const next=[i];let rowMin=i;
    for(let j=1;j<=b.length;j++){
      const cost=a[i-1]===b[j-1]?0:1;
      next[j]=Math.min(prev[j]+1,next[j-1]+1,prev[j-1]+cost);
      if(beforePrev&&i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])next[j]=Math.min(next[j],beforePrev[j-2]+1);
      rowMin=Math.min(rowMin,next[j]);
    }
    if(rowMin>max)return max+1;
    beforePrev=prev;prev=next;
  }
  return prev[b.length];
}
function typoCorrection(token){
  if(/^[\u0621-\u064a]/u.test(token)){
    const variants=arabicVariants(token);
    // Ne jamais corriger un mot arabe déjà reconnu en un autre mot voisin :
    // « القدم » (le pied) ne doit pas devenir « قديم » (ancien).
    if(variants.some(x=>CURATED_EQUIVALENTS.has(x)||themesForWord(x).length))return null;
    const entries=[...CURATED_EQUIVALENTS.keys()].filter(x=>/^[\u0621-\u064a]/u.test(x));
    const possibles=[];
    for(const candidate of entries){
      const distance=Math.min(...variants.map(x=>spellingDistance(x,candidate,x.length>=10?2:1)));
      if(distance<=1)possibles.push({candidate,distance});
    }
    possibles.sort((a,b)=>a.distance-b.distance);
    if(possibles.length){
      const tied=possibles.filter(x=>x.distance===possibles[0].distance);
      const meanings=new Set(tied.map(x=>(CURATED_EQUIVALENTS.get(x.candidate)||[]).join('|')));
      if(meanings.size===1)return possibles[0].candidate;
    }
    return null;
  }
  // Les mots courts constituent souvent des formes légitimes d'autres langues
  // (italien « piede »), pas une faute de frappe du vocabulaire anglais
  // (« piece »). On préfère alors n'afficher aucun résultat.
  if(token.length<6||state.lexicon.has(token))return null;
  const limit=token.length>=10?2:1;
  let best=null;
  for(const term of state.lexicon.values()){
    if(term.count<2||term.term[0]!==token[0]||Math.abs(term.term.length-token.length)>limit)continue;
    const distance=spellingDistance(token,term.term,limit);
    if(distance>limit)continue;
    if(!best||distance<best.distance||(distance===best.distance&&term.count>best.count))best={term:term.term,distance,count:term.count};
  }
  return best?.term||null;
}
function themesForWord(token){return THEMES.filter(t=>t.triggers.some(x=>words(x).includes(token)));}
function controlledQueryMatch(parts,start){
  for(const alias of CONCEPT_ALIASES){
    if(alias.strictCase&&parts[start][0]!==alias.literal)continue;
    const expected=alias.alias.split(' ');let offset=0,length=0,matched=true;
    while(offset<expected.length){
      const part=parts[start+length];if(!part){matched=false;break;}
      const actual=fold(part[0]).split(' ');
      if(actual.length>expected.length-offset){matched=false;break;}
      if(!actual.every((word,index)=>word===expected[offset+index]||(/^[\u0621-\u064a]/u.test(word)&&arabicVariants(word).includes(expected[offset+index])))){matched=false;break;}
      offset+=actual.length;length++;
    }
    if(matched)return {...alias,length};
  }
  return null;
}
function normalizedQueryParts(query){
  const parts=[...String(query||'').matchAll(EGYPT_UNIT)];
  const centuries=new Map(centuryExpressions(query).map(expression=>[expression.start,expression]));
  const dynasties=new Map(dynastyExpressions(query).map(expression=>[expression.start,expression]));
  const out=[];
  for(let i=0;i<parts.length;){
    const dynasty=dynasties.get(parts[i].index);
    if(dynasty){
      for(const number of dynasty.numbers)out.push({source:dynasty.source,start:dynasty.start,phrase:true,concept:'dynasty:'+number});
      do{i++;}while(i<parts.length&&parts[i].index<dynasty.end);
      continue;
    }
    const century=centuries.get(parts[i].index);
    if(century){
      out.push({source:century.source,start:century.start,phrase:true,concept:centuryConcept(century)});
      do{i++;}while(i<parts.length&&parts[i].index<century.end);
      continue;
    }
    // Respecter la casse des valeurs UD : Part ≠ PART (particule) ≠ « part ».
    const feature=String(query).slice(parts[i].index).match(/^VerbForm\s*=\s*(Fin|Part|Inf|Conv|Vnoun)(?![\p{L}\p{N}])/u);
    const formConcept=GRAMMAR_QUERY_CODES.get(feature?feature[1]:parts[i][0]);
    if(formConcept){
      const start=parts[i].index,end=start+(feature?feature[0].length:parts[i][0].length);
      out.push({source:feature?feature[0]:parts[i][0],start,phrase:true,concept:formConcept});
      do{i++;}while(i<parts.length&&parts[i].index<end);
      continue;
    }
    const corpusCode=CORPUS_CODES.find(code=>code.code===parts[i][0]);
    const matchedConcept=corpusCode?{alias:fold(corpusCode.code),concept:corpusCode.concept,length:1}:controlledQueryMatch(parts,i);
    if(matchedConcept){
      const length=matchedConcept.length;
      let after=i+length,section=null;
      const concept=CONTROLLED_CONCEPTS.get(matchedConcept.concept);
      if(concept.kind==='corpus'){
        if(after<parts.length&&/^(chapitre|chapter|spell|formule|spruch|utterance)$/u.test(fold(parts[after][0])))after++;
        if(after<parts.length&&/^\d{1,4}$/u.test(parts[after][0])&&Number(parts[after][0])>0&&Number(parts[after][0])<1500){
          section=String(Number(parts[after][0]));after++;
        }
      }
      out.push({source:matchedConcept.alias,start:parts[i].index,phrase:true,concept:matchedConcept.concept,section});
      i=section?after:i+length;
      continue;
    }
    const phrase=CURATED_PHRASES.find(key=>{
      const expected=key.split(' ');
      if(i+expected.length>parts.length)return false;
      return expected.every((word,j)=>{
        const actual=fold(parts[i+j][0]);
        return actual===word||(j===0&&actual==='و'+word);
      });
    });
    if(phrase){out.push({source:phrase,start:parts[i].index,phrase:true});i+=phrase.split(' ').length;continue;}
    out.push({source:parts[i][0],start:parts[i].index,phrase:false});i++;
  }
  return out;
}
// Seuls des cadres de demande sont retirés. Tout objet, nom, date, forme
// grammaticale ou verbe qui porte une information reste une contrainte.
function corpusQuestion(query){
  let text=String(query||'').trim();
  const frames=[
    [/^(?:je (?:cherche|recherche)|trouve(?:z)?|montre(?:z)?(?:[ -]moi)?|recherche(?:r)?|find|show(?: me)?|i am looking for)\s+(?:(?:des?|les?|some|the)\s+)?(?:(?:passages?|extraits?|articles?|texts?)\s+)?(?:sur|concernant|à propos de|au sujet de|about|on)\s+/iu,''],
    [/^(?:quels?|quelles?)\s+(?:sont|étaient|furent)\s+(?:les?|des?)\s+/iu,''],
    [/^(?:quelle est|quel est)\s+(?:(?:la|le)\s+|l['’])?/iu,''],
    [/^(?:what|which)\s+(?:(?:is|are|was|were)\s+)?(?:the\s+)?/iu,''],
    [/^(?:comment (?:se lit|lire|prononcer)|how to read)\s+/iu,'lecture '],
    [/^(?:quel rôle (?:joue|jouait)|what role (?:does|did))\s+/iu,''],
  ];
  for(const [pattern,replacement] of frames)text=text.replace(pattern,replacement);
  text=text.replace(/\s+(?:dans (?:ces|les) articles|dans le corpus|in (?:these|the) articles|in the corpus)\s*[?!.]*$/iu,'');
  // Un code Gardiner forme une unité précise, y compris « U 23 ».
  return text.replace(/\b([A-IK-Z])\s+(\d{1,3})\b/gu,'$1$2');
}
const QUERY_RELATION_WORDS=new Set(['sans','without','ohne','sin','sem','pas','jamais','not','never','neither','nicht','non','no']);
function queryRelations(query,groups){
  const relations=[];
  for(const match of String(query).matchAll(/\b(?:sans|without|ohne|sin|sem|pas|jamais|not|never|neither|nicht|non|no|avec|with)\b/giu)){
    // Une expression terminologique comme « non-finite » n'est pas une
    // négation de la relation entre deux objets de la recherche.
    if(query[match.index-1]==='-'||query[match.index+match[0].length]==='-')continue;
    if(groups.some(group=>group.concept&&match.index>=group.start&&match.index<group.end))continue;
    const before=groups.filter(group=>group.end<=match.index).at(-1);
    const after=groups.find(group=>group.start>=match.index+match[0].length);
    if(!before||!after){relations.push({unsupported:true});continue;}
    const key=fold(match[0]);
    relations.push({left:groups.indexOf(before),right:groups.indexOf(after),negative:QUERY_RELATION_WORDS.has(key),absence:['sans','without','ohne','sin','sem'].includes(key)});
  }
  return relations;
}
function buildPlan(query){
  query=corpusQuestion(query);
  const egyptian=egyptianQueryMatches(query);
  const egyptByStart=new Map(egyptian.map(m=>[m.start,m]));
  const meaningful=[];
  for(const part of normalizedQueryParts(query)){
    if(part.concept){meaningful.push(part);continue;}
    if(QUERY_RELATION_WORDS.has(fold(part.source)))continue;
    const special=egyptByStart.get(part.start);
    for(const source of (part.phrase?[part.source]:special?[special.source]:words(part.source)))meaningful.push({source,start:part.start});
  }
  const tokens=[...new Map(meaningful.map(part=>[`${part.concept||''}:${part.source}:${part.section||''}`,part])).values()];
  const groups=[],corrections=[],foundThemes=new Map();
  for(const part of tokens){
    const source=part.source;
    if(part.concept){
      const concept=CONTROLLED_CONCEPTS.get(part.concept);
      const group={source:concept.label,start:part.start,end:part.start+source.length,terms:[],coreTerms:[],egyptKeys:[],concept:part.concept,
        section:part.section,entity:true,topic:true};
      groups.push(group);
      foundThemes.set(concept.label,{label:concept.label});
      if(concept.kind==='century'){if(fold(source)!==fold(concept.label))corrections.push(`${source} → ${concept.label}`);}
      else if(concept.kind==='grammar')corrections.push(`${source} → ${t(concept.label)} (${t(concept.aggregate?'groupe de recherche bibliographique':concept.searchGroup?'forme ou fonction grammaticale':'catégorie grammaticale')})`);
      else if(CONTEXT_KINDS.has(concept.kind))corrections.push(`${source} → ${t(concept.label)} (${t(concept.kind==='period'?'période historique':concept.kind==='dynasty'?'dynastie':'lieu / site')})`);
      else if(source!==fold(concept.label))corrections.push(`${source} → ${t(concept.label)} (${concept.kind==='language'?t('langue / écriture'):t('corpus textuel')})`);
      continue;
    }
    // Une entrée éditoriale est déjà comprise ; une correction approximative
    // ne doit pas transformer « workers » ou un objet ajouté en autre chose.
    const fixed=(CURATED_EQUIVALENTS.has(source)?null:typoCorrection(source))||source;
    if(fixed!==source)corrections.push(`${source} → ${fixed}`);
    const variants=[...new Set([...arabicVariants(source),fixed])];
    const egyptMatches=egyptian.filter(m=>m.source===source);
    const egyptKeys=[...new Set(egyptMatches.map(m=>m.key))];
    const egyptAliases=[...new Set(egyptKeys.flatMap(key=>[...state.egyptianIndex.get(key).forms].flatMap(words)))];
    const curated=[...new Set(variants.flatMap(v=>CURATED_EQUIVALENTS.get(v)||[]))];
    const suggestions=[...new Set([...egyptAliases,...curated])];
    for(const match of egyptMatches){
      const representative=[...state.egyptianIndex.get(match.key).forms].find(form=>EGYPT_MARKED.test(form));
      if(representative&&fold(representative)!==source)corrections.push(`${match.raw} → ${representative} (${t('translittération égyptologique')})`);
    }
    for(const choice of suggestions)if(choice!==fixed)corrections.push(`${source} → ${choice} (${curated.includes(choice)?t('équivalent lexical'):t('translittération égyptologique')})`);
    const themes=[...new Set([...variants,...suggestions].flatMap(themesForWord))];
    for(const theme of themes)foundThemes.set(theme.label,theme);
    const coreTerms=[...new Set([...variants,...suggestions])];
    const terms=new Set(coreTerms);
    for(const theme of themes)for(const keyword of theme.keywords)for(const word of words(keyword))terms.add(word);
    groups.push({source,start:part.start,end:part.start+source.length,terms:[...terms],coreTerms,egyptKeys,
      entity:state.citedNames.has(fixed)||CURATED_PHRASES.includes(source),topic:themes.length>0});
  }
  const topics=[...foundThemes.values()];
  const terms=[...new Set(groups.flatMap(g=>g.terms))].slice(0,55);
  return {groups,terms,topics,corrections,relations:queryRelations(query,groups)};
}
function excerptType(p){return p.kind==='note'?(p.number?t('Note {number}',{number:p.number}):t('Note à contrôler')):p.kind==='bibliography'?t('Bibliographie'):t('Texte de l’article');}
function pdfURL(p){const d=state.docs.get(p.doc_id);return d.url?`${d.url}#page=${p.page}`:d.doi?`https://doi.org/${encodeURIComponent(d.doi)}`:null;}
function reference(p){const d=state.docs.get(p.doc_id);return t('{author}, « {title} », {journal}, p. {page}{note}{doi}.',{author:d.author,title:d.title,journal:d.journal,page:p.page,note:p.number?`, ${t('n.')} ${p.number}`:'',doi:d.doi?`, DOI ${d.doi}`:''});}

function lexicalScores(query,terms,plan=null){
  const keys=[...new Set(terms)];const collection=state.corpus.passages;const phrases=keys.filter(term=>term.includes(' '));
  const df=new Map(keys.map(w=>[w,collection.reduce((n,p)=>n+((w.includes(' ')?includesTerm(p.text,w):fold(p.text).split(' ').includes(w))?1:0),0)]));
  const scores=new Map();const focusNotes=/notes?|citations?|bibliograph|bibliograf|références?|sources?|cité|cite|cf\.|المراجع/i.test(query);
  for(const p of collection){const t=words(p.text.replace(/\b([A-Za-z])\s+(\d{2,3})\b/g,'$1$2')),frequency=new Map();for(const token of t)if(keys.includes(token))frequency.set(token,(frequency.get(token)||0)+1);
    // Une famille peut ne contenir que des locutions. Compter leur suite
    // entière, sans créer de candidature à partir d'un mot isolé de la locution.
    if(phrases.length){
      const text=` ${fold(p.text).replace(/\b([a-z])\s+(\d{2,3})\b/g,'$1$2')} `;
      for(const phrase of phrases){
        const needle=` ${fold(phrase)} `;let count=0,at=-1;
        while((at=text.indexOf(needle,at+1))>=0)count++;
        if(count)frequency.set(phrase,count);
      }
    }
    let score=0;for(const term of keys){const n=frequency.get(term)||0;if(n)score+=(1+Math.log(n))*Math.log(1+(collection.length+1)/(df.get(term)+1));}
    if(plan){
      for(const key of new Set(plan.groups.flatMap(g=>g.egyptKeys||[]))){const found=state.egyptianIndex.get(key);if(found?.byId.has(p.id))score+=Math.log(1+(collection.length+1)/(found.byId.size+1));}
      for(const group of plan.groups)if(group.concept){
        const hits=conceptMentions(p.text,group);
        if(hits.length){
          const concept=CONTROLLED_CONCEPTS.get(group.concept);
          const primary=concept.kind==='corpus'&&hits.some(hit=>hit.kind==='title')||
            concept.kind==='language'&&hits.some(hit=>hit.kind==='mention');
          score+=(primary?10:6)+Math.log(1+Math.min(hits.length,12));
        }
      }
    }
    if(score){if(p.kind==='note')score*=focusNotes?1.45:1.12;score*=.75+.25*frequency.size/Math.max(1,keys.length);scores.set(p.id,score);}
  }
  return [...scores.entries()].sort((a,b)=>b[1]-a[1]);
}

function includesTerm(text,term){
  const folded=` ${fold(text).replace(/\b([a-z])\s+(\d{2,3})\b/g,'$1$2')} `;
  return folded.includes(` ${fold(term)} `);
}
function closestPosition(text,terms){
  const folded=fold(text);let best=Infinity;
  for(const term of terms){const pos=folded.indexOf(fold(term));if(pos>=0)best=Math.min(best,pos);}
  return best;
}
function groupEvidence(p,group){
  if(group.concept)return conceptMentions(p.text,group).map(hit=>({pos:hit.pos,end:hit.pos+fold(hit.surface).length,term:`ref:${group.concept}`}));
  if(group.egyptKeys?.length)return group.egyptKeys.flatMap(key=>(state.egyptianIndex.get(key)?.byId.get(p.id)||[]).map(hit=>({pos:hit.pos,end:hit.pos+fold(hit.raw).length,term:`egy:${key}`})));
  const text=fold(p.text).replace(/\b([a-z])\s+(\d{2,3})\b/g,'$1$2'),found=[];
  for(const term of new Set(group.coreTerms||group.terms)){
    const needle=fold(term);if(!needle)continue;
    let at=-1;
    while((at=text.indexOf(needle,at+1))>=0){
      if((at===0||text[at-1]===' ')&&(at+needle.length===text.length||text[at+needle.length]===' '))found.push({pos:at,end:at+needle.length,term:needle});
    }
  }
  return found;
}
function relationEvidence(p,groups,relations=[]){
  if(!relations.length)return true;
  const text=fold(p.text).replace(/\b([a-z])\s+(\d{2,3})\b/g,'$1$2');
  const breaks=[...p.text.matchAll(/[.!?;]\s+/gu)].map(match=>fold(p.text.slice(0,match.index)).replace(/\b([a-z])\s+(\d{2,3})\b/g,'$1$2').length);
  return relations.every(relation=>{
    if(relation.unsupported)return false;
    const left=groupEvidence(p,groups[relation.left]),right=groupEvidence(p,groups[relation.right]);
    return left.some(a=>right.some(b=>{
      if(a.end>b.pos||b.pos-a.pos>220||breaks.some(at=>at>=a.end&&at<b.pos))return false;
      const link=text.slice(a.end,b.pos);
      const negative=/\b(?:sans|without|ohne|sin|sem|pas|jamais|not(?! only)|never|neither|nicht|non|no)\b/u.test(link);
      if(relation.absence)return /\b(?:sans|without|ohne|sin|sem)\b/u.test(link);
      const preceding=text.slice(Math.max(0,a.pos-35),a.pos);
      return relation.negative?negative:!negative&&!/\b(?:sans|without|pas|not|no)\s+(?:\w+\s+){0,2}$/u.test(preceding)&&/\b(?:avec|with)\b/u.test(link);
    }));
  });
}
function expressionEvidence(p,groups,explicitAnd=false,bibliography=false){
  if(!groups.length)return false;
  if(groups.length===1)return groupEvidence(p,groups[0]).length>0;
  // Une expression ne peut pas être justifiée par l'occurrence d'un seul mot.
  // Les mots considérés comme équivalents sont propres à chaque composante.
  const needed=groups.length;
  // Les composantes discriminantes sont obligatoires : dans « langue grecque
  // ancienne », « langue » + « ancienne » sans « grecque » serait trompeur.
  const discriminants=groups.map((g,i)=>({i,count:g.concept?1:[...new Set(g.coreTerms||g.terms)].reduce((sum,term)=>sum+(state.lexicon.get(term)?.count||0),0)}))
    .sort((a,b)=>a.count-b.count).slice(0,needed).map(x=>x.i);
  const obligatory=[...new Set([...discriminants,...groups.flatMap((g,i)=>g.entity?[i]:[])])];
  const byTerm=new Map();
  groups.forEach((group,i)=>{
    if(group.concept)return;
    // Quand la requête est une translittération identifiable, ne pas la
    // justifier par une suite de lettres ordinaires (« ntr » dans un nom).
    // L'index atteste précisément le groupe de signes égyptologiques.
    if(group.egyptKeys?.length)return;
    // Dans une expression, les mots génériques du thème (« writing »,
    // « sign »…) ne remplacent pas l'indice propre à chaque composante.
    for(const term of group.coreTerms||group.terms){
      const key=fold(term);
      if(!key||key.includes(' '))continue;
      if(!byTerm.has(key))byTerm.set(key,new Set());
      byTerm.get(key).add(i);
    }
  });
  const occurrences=[];
  const normalized=fold(p.text).replace(/\b([a-z])\s+(\d{2,3})\b/g,'$1$2');
  let pos=0;
  for(const word of normalized.split(' ')){
    if(byTerm.has(word))occurrences.push({pos,term:word,groups:byTerm.get(word)});
    pos+=word.length+1;
  }
  for(const [i,group] of groups.entries())for(const key of group.egyptKeys||[]){
    const entry=state.egyptianIndex.get(key);
    for(const spot of entry?.byId.get(p.id)||[])occurrences.push({pos:spot.pos,term:`egy:${key}`,groups:new Set([i])});
  }
  for(const [i,group] of groups.entries())if(group.concept){
    for(const hit of conceptMentions(p.text,group))occurrences.push({pos:hit.pos,term:`ref:${group.concept}`,groups:new Set([i])});
  }
  // Une locution attestée est un indice complet (« adverbial phrases »,
  // « Old Kingdom »), pas un sac de mots pouvant être dispersés dans la page.
  for(const [i,group] of groups.entries())if(!group.concept&&!group.egyptKeys?.length){
    for(const hit of groupEvidence(p,group))if(hit.term.includes(' '))occurrences.push({...hit,groups:new Set([i])});
  }
  occurrences.sort((a,b)=>a.pos-b.pos);
  // Même dans une très longue note ou une bibliographie, les notions doivent
  // se trouver dans un voisinage textuel restreint.
  const maximumGap=bibliography?170:400;
  const groupCounts=new Map(),termCounts=new Map();
  const increment=(map,key)=>map.set(key,(map.get(key)||0)+1);
  const decrement=(map,key)=>{const rest=map.get(key)-1;if(rest)map.set(key,rest);else map.delete(key);};
  let left=0;
  for(let right=0;right<occurrences.length;right++){
    const cur=occurrences[right];increment(termCounts,cur.term);
    for(const i of cur.groups)increment(groupCounts,i);
    while(cur.pos-occurrences[left].pos>maximumGap){
      const old=occurrences[left++];decrement(termCounts,old.term);
      for(const i of old.groups)decrement(groupCounts,i);
    }
    if(groupCounts.size>=needed&&termCounts.size>=2&&obligatory.every(i=>groupCounts.has(i)))return true;
  }
  return false;
}
function rankedResults(lexical,question,plan=null){
  // Chaque résultat conserve les attestations lexicales, grammaticales
  // et philologiques exigées par la recherche.
  if(!lexical.length)return [];
  const groups=plan?.groups||[];
  if(groups.length===1&&groups[0].egyptKeys?.length){
    const keys=groups[0].egyptKeys;
    lexical=lexical.filter(([id])=>keys.some(key=>state.egyptianIndex.get(key)?.byId.has(id)));
    if(!lexical.length)return [];
  }
  if(groups.length===1&&groups[0].concept){
    const items=new Map(state.corpus.passages.map(p=>[p.id,p]));
    lexical=lexical.filter(([id])=>conceptMentions(items.get(id).text,groups[0]).length);
    if(!lexical.length)return [];
  }
  const explicitAnd=/\b(et|and|avec|with|und|y)\b/iu.test(question)||
    /(?:^|[\s،؛])(?:و|مع)(?=$|[\s،؛])/u.test(question);
  if(groups.length>=2||plan?.relations?.length){
    const entries=new Map(state.corpus.passages.map(p=>[p.id,p]));
    lexical=lexical.filter(([id])=>{
      const p=entries.get(id);
      return expressionEvidence(p,groups,explicitAnd,p.kind==='bibliography')&&relationEvidence(p,groups,plan?.relations);
    });
    if(!lexical.length)return [];
  }
  const ranked=lexical.map(([id],index)=>[id,1/(35+index)]);
  const items=new Map(state.corpus.passages.map(p=>[p.id,p]));
  const bibliographyRequested=/bibliograph|bibliograf|référence|reference|auteur|citation|notes?|source|tla|thesaurus|المراجع/i.test(question);
  const anchors=words(question).filter(w=>['bn','bw','tla'].includes(w));
  const signCodes=[...question.matchAll(/\b([A-Za-z])\s*(\d{2,3})\b/g)].map(m=>(m[1]+m[2]).toLowerCase());
  return ranked.map(([id,raw])=>{const p=items.get(id);let score=raw;
    if(p.page===1)score*=.50;else if(p.page===2)score*=.76;
    if(p.kind==='bibliography'&&!bibliographyRequested)score*=.58;
    if(p.kind==='note'&&bibliographyRequested)score*=1.18;
    if(anchors.length){const inText=fold(p.text);const inTitle=fold(state.docs.get(p.doc_id).title);score*=anchors.some(a=>inText.split(' ').includes(a)||inTitle.split(' ').includes(a))?1.11:.78;}
    if(signCodes.length){const content=fold(p.text).replace(/\s/g,'');const title=fold(state.docs.get(p.doc_id).title).replace(/\s/g,'');score*=signCodes.some(code=>content.includes(code)||title.includes(code))?1.25:.71;}
    return {id,score};
  }).sort((a,b)=>b.score-a.score);
}

function drawChips(container,list){const node=$(container);node.replaceChildren();for(const value of list){const badge=document.createElement('span');badge.className='chip';badge.textContent=value;node.append(badge);}}
function keywordRefinementHelp(){
  return t('Cliquez sur un mot-clé pour ne garder que les extraits qui le contiennent. Cliquez à nouveau pour retirer ce filtre.');
}
function drawKeywordChips(){
  const wrap=$('keyword-chips'),note=$('keyword-refinement-note');
  const focused=document.activeElement?.dataset?.keyword;
  const selected=new Set(state.keywordRefinements.map(fold));
  const plan=state.plan||{terms:[]};
  const extracted=sourceTerms(state.result,plan.terms);
  const values=[...new Map([...state.keywordRefinements,...plan.terms.filter(word=>!words(state.search).includes(word)).slice(0,15),...extracted]
    .map(value=>[fold(value),value])).values()].slice(0,18);
  wrap.replaceChildren();
  for(const value of values){
    const button=document.createElement('button'),active=selected.has(fold(value));
    button.type='button';button.className='chip';button.textContent=value;button.dataset.keyword=value;
    button.setAttribute('aria-pressed',String(active));
    button.setAttribute('aria-label',t(active?'Retirer le filtre « {term} »':'Affiner avec « {term} »',{term:value}));
    button.addEventListener('click',()=>toggleKeywordRefinement(value));
    wrap.append(button);
    if(focused===value)button.focus?.();
  }
  if(focused&&!values.includes(focused))$('theme-input').focus?.();
  if(note){
    note.setAttribute('aria-live','polite');note.setAttribute('aria-atomic','true');
    note.textContent=(state.keywordRefinements.length?t('Filtres actifs : {terms}.',{terms:state.keywordRefinements.join(' · ')})+' ':'')+keywordRefinementHelp();
  }
}
function applyKeywordRefinements(){
  state.result=state.baseResult.filter(passage=>state.keywordRefinements.every(term=>includesTerm(passage.text,term))&&state.contextRefinements.every(id=>(contextEvidenceFor(passage.text).get(id)||[]).length));
  state.activeTerms=[...new Set([...(state.plan?.terms||[]),...state.keywordRefinements])];
  $('topic-analysis').hidden=!state.baseResult.length&&!state.keywordRefinements.length;
  drawKeywordChips();
}
function toggleKeywordRefinement(value){
  if(!state.corpus||!state.search)return;
  const key=fold(value);if(!key)return;
  const found=state.keywordRefinements.findIndex(term=>fold(term)===key);
  if(found>=0)state.keywordRefinements.splice(found,1);
  else state.keywordRefinements.push(value);
  // Les filtres ajoutent des contraintes littérales à la recherche affichée.
  state.visibleCount=18;
  applyKeywordRefinements();render();
}
function sourceTerms(foundResults, queryTerms){const frequency=new Map(),avoid=new Set(queryTerms);for(const p of foundResults.slice(0,10)){for(const word of words(p.text)){if(word.length<4||avoid.has(word))continue;frequency.set(word,(frequency.get(word)||0)+1);}}return [...frequency].sort((a,b)=>b[1]-a[1]).slice(0,8).map(([word])=>word);}
function highlight(node,text,terms){const keys=[...new Set(terms)].filter(x=>x.length>2).sort((a,b)=>b.length-a.length).slice(0,14);if(!keys.length){node.textContent=text;return;}const pattern=new RegExp(`(${keys.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')})`,'giu');let at=0;for(const m of text.matchAll(pattern)){node.append(document.createTextNode(text.slice(at,m.index)));const mark=document.createElement('mark');mark.textContent=m[0];node.append(mark);at=m.index+m[0].length;}node.append(document.createTextNode(text.slice(at)));}
function render(){
  const wrap=$('result-list');wrap.replaceChildren();
  const matching=state.result.filter(x=>state.filter==='all'||x.kind===state.filter);
  drawContextFilters();
  const selected=matching.slice(0,state.visibleCount);
  $('result-count').textContent=String(matching.length);
  const more=$('more-results');more.hidden=selected.length>=matching.length;
  if(!more.hidden)more.textContent=t('Afficher {count} autres extraits',{count:Math.min(18,matching.length-selected.length)});
  if(!selected.length){if(!state.search)return;const none=document.createElement('div');none.className='empty';none.textContent=state.result.length?t('Aucun extrait dans cette catégorie.'):t('Aucun extrait correspondant.');wrap.append(none);return;}
  for(const item of selected){const d=state.docs.get(item.doc_id);const card=document.createElement('article');card.className='source-card';
    const head=document.createElement('div');head.className='source-top';const tag=document.createElement('span');tag.className=`source-kind ${item.kind}`;tag.textContent=excerptType(item);const page=document.createElement('span');page.className='source-page';page.textContent=`p. ${item.page} · ${d.author}`;head.append(tag,page);card.append(head);
    const title=document.createElement('h4');title.textContent=d.title;card.append(title);const meta=document.createElement('div');meta.className='source-meta';meta.textContent=`${d.journal}${d.doi?' · '+d.doi:''}`;card.append(meta);
    const egyptEvidence=(state.plan?.groups||[]).flatMap(g=>(g.egyptKeys||[]).flatMap(key=>state.egyptianIndex.get(key)?.byId.get(item.id)?.map(hit=>hit.raw)||[]));
    const corpusEvidence=[...(state.plan?.groups||[]),...state.contextRefinements.map(concept=>({concept}))].flatMap(g=>g.concept?conceptMentions(item.text,g).map(hit=>hit.surface):[]);
    const keys=[...new Set([...words(state.search),...state.activeTerms,...egyptEvidence,...corpusEvidence.slice(0,10)])];
    const evidence=[...new Set([...state.keywordRefinements,...corpusEvidence,...egyptEvidence,...(state.plan?.groups||[]).map(g=>g.terms.find(term=>includesTerm(item.text,term))).filter(Boolean)])];
    if(evidence.length){const why=document.createElement('div');why.className='source-meta';why.textContent=t('Indices présents dans cet extrait : {terms}{more}',{terms:evidence.slice(0,6).join(' · '),more:evidence.length>6?'…':''});card.append(why);}
    const excerpt=document.createElement('blockquote');excerpt.dir='auto';highlight(excerpt,item.text,keys);card.append(excerpt);const bar=document.createElement('div');bar.className='source-links';const link=document.createElement('a');link.textContent=t('Vérifier sur le PDF ↗');const url=pdfURL(item);if(url){link.href=url;link.target='_blank';link.rel='noopener noreferrer';}else{link.textContent=t('PDF à renseigner');}
    const copy=document.createElement('button');copy.type='button';copy.textContent=t('Copier l’extrait et la référence');copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`${reference(item)}\n${t('« {text} »',{text:item.text})}`);copy.textContent=t('Référence copiée ✓');setTimeout(()=>copy.textContent=t('Copier l’extrait et la référence'),2000);}catch{copy.textContent=t('Copie indisponible');}});bar.append(link,copy);card.append(bar);wrap.append(card);
  }
}

function updateSearchControls(){
  const unavailable=!state.corpus;
  $('search-button').disabled=unavailable||state.running;
  $('search-button').textContent=state.running?t('Recherche en cours…'):t('Rechercher');
  for(const button of document.querySelectorAll('[data-example]'))button.disabled=unavailable||state.running;
  $('result-list').setAttribute('aria-busy',String(state.running));
}
function grammarRelations(plan){
  const selected=new Set((plan?.groups||[]).map(group=>group.concept).filter(id=>CONTROLLED_CONCEPTS.get(id)?.kind==='grammar'));
  const links=new Map();
  const add=(id,relation,note='')=>{if(!selected.has(id)&&!links.has(id)&&CONTROLLED_CONCEPTS.has(id))links.set(id,{id,relation,note});};
  for(const [parent,child] of GRAMMAR_HIERARCHY){
    if(selected.has(parent))add(child,'narrower');
    if(selected.has(child))add(parent,'broader');
  }
  // Raccourcis vers ces descendants du groupe verbal, sans changer les preuves.
  for(const form of ['pos:participle','pos:infinitive','grammar:converb','grammar:vnoun']){
    if(selected.has('grammar:verbal-family'))add(form,'narrower');
    if(selected.has(form))add('grammar:verbal-family','broader');
  }
  for(const [left,right,note] of GRAMMAR_ASSOCIATIONS){
    if(selected.has(left))add(right,'related',note);
    if(selected.has(right))add(left,'related',note);
  }
  return [...links.values()];
}
function grammarQuery(id){
  const upos={'pos:noun':'NOUN','pos:proper-noun':'PROPN','pos:verb':'VERB','pos:pronoun':'PRON','pos:adjective':'ADJ','pos:auxiliary':'AUX'};
  if(upos[id])return upos[id];
  const queries={
    'grammar:verbal-family':['verbe','verb'],'grammar:nominal-family':['nom','noun'],
    'grammar:proper-name-family':['noms propres groupe','proper names group'],'grammar:personal-name-family':['noms de personnes groupe','personal names group'],
    'grammar:pronoun-family':['pronom','pronoun'],'grammar:finite':['Fin','Fin'],'grammar:nonfinite':['formes non finies','non-finite'],
    'grammar:converb':['converbe','converb'],'grammar:verbal-noun':['nom verbal','verbal noun'],'grammar:vnoun':['VerbForm=Vnoun','VerbForm=Vnoun'],
    'grammar:nominal-use':['emploi nominal','nominal use'],'grammar:imperative':['impératif','imperative'],
    'pos:participle':['participe','participle'],'pos:infinitive':['infinitif','infinitive'],'pos:stative':['statif','stative'],
    'pos:relative-verb':['forme verbale relative','relative verb form'],
    'pos:personal-name':['nom de personne','personal name'],'pos:royal-name':['nom royal','royal name'],
    'pos:divine-name':['nom de divinité','divine name'],'pos:place-name':['nom de lieu','place name'],
  };
  if(queries[id])return queries[id][LANGUAGE==='en'?1:0];
  const concept=CONTROLLED_CONCEPTS.get(id);
  return concept?t(concept.label).replace(/\s*\([^)]*\)/gu,''):'';
}
function updateGrammarRelations(plan){
  const section=$('grammar-relations'),wrap=$('grammar-related-chips'),note=$('grammar-relation-note');
  if(!section||!wrap||!note)return;
  const links=grammarRelations(plan);wrap.replaceChildren();section.hidden=!links.length;
  note.textContent=t('Les groupes de recherche incluent les mentions de leurs catégories plus précises. Une recherche précise exige sa propre attestation. Les liens associés proposent une autre recherche, sans équivalence grammaticale automatique.');
  const labels={broader:'Plus général : {label}',narrower:'Plus précis : {label}',related:'Associé selon le contexte : {label}'};
  for(const link of links){
    const query=grammarQuery(link.id),button=document.createElement('button');button.type='button';button.className='chip';
    button.textContent=t(labels[link.relation],{label:t(CONTROLLED_CONCEPTS.get(link.id).label)});
    button.dataset.query=query;button.dataset.relation=link.relation;button.dataset.concept=link.id;
    if(link.note)button.title=t(link.note);
    button.addEventListener('click',()=>{state.keywordRefinements=[];state.contextRefinements=[];$('theme-input').value=query;runSearch();});
    wrap.append(button);
  }
}
function showSearchResults(query,plan,lex){
  const scored=rankedResults(lex,query,plan);
  const map=new Map(state.corpus.passages.map(p=>[p.id,p]));state.baseResult=scored.map(({id})=>map.get(id)).filter(Boolean);
  state.activeTerms=plan.terms;state.plan=plan;
  updateGrammarRelations(plan);updateContextRelations(plan);
  applyKeywordRefinements();
  drawChips('topic-chips',plan.topics.length?plan.topics.map(topic=>t(topic.label)):[t('Terme attesté dans le corpus')]);

  const corrections=$('query-corrections');if(corrections){corrections.hidden=!plan.corrections.length;corrections.textContent=plan.corrections.length?t('Graphies et termes rapprochés : {terms}.',{terms:plan.corrections.join(' ; ')}):'';}
  state.filter='all';state.visibleCount=18;
  for(const btn of document.querySelectorAll('[data-filter]')){
    const selected=btn.dataset.filter===state.filter;
    btn.classList.toggle('selected',selected);btn.setAttribute('aria-pressed',String(selected));
  }
  render();
  $('result-list').setAttribute('aria-busy','false');
}
function runSearch(){
  if(state.running||!state.corpus)return;
  const query=$('theme-input').value.trim();if(!query)return;
  if(query!==state.search){state.keywordRefinements=[];state.contextRefinements=[];state.contextExpanded={period:false,place:false};}
  state.running=true;state.search=query;updateSearchControls();
  $('method-status').hidden=true;
  try{
    const plan=buildPlan(query),lex=lexicalScores(query,plan.terms,plan);
    showSearchResults(query,plan,lex);
  }catch(error){
    $('method-status').hidden=false;
    $('method-status').textContent=t('La recherche n’a pas abouti. Veuillez réessayer.');
  }finally{
    state.running=false;updateSearchControls();
  }
}
async function init(){
  state.corpus=null;state.docs.clear();state.contextRefinements=[];state.contextEvidence.clear();updateSearchControls();
  const retry=$('retry-corpus');retry.hidden=true;retry.disabled=true;
  $('corpus-total').textContent=t('Chargement du corpus…');
  $('method-status').hidden=false;
  $('method-status').textContent=t('Chargement du corpus…');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{
    const r=await fetch(new URL('data/corpus.json',ASSET_BASE),{cache:'no-cache',signal:controller.signal});
    if(!r.ok)throw Error(`HTTP ${r.status}`);
    const corpus=await r.json();
    if(!Array.isArray(corpus.documents)||!Array.isArray(corpus.passages))throw Error('Corpus invalide');
    state.corpus=corpus;
    for(const doc of corpus.documents)state.docs.set(doc.id,doc);
    initializeLexicon();
    $('corpus-total').textContent=t('{count} articles',{count:corpus.documents.length});
    $('corpus-subtitle').textContent=t('{notes} notes · {passages} passages',{notes:corpus.passages.filter(p=>p.kind==='note'&&p.number).length,passages:corpus.passages.length});
    $('method-status').hidden=true;
    $('method-status').textContent='';
  }catch(error){
    state.corpus=null;
    $('corpus-total').textContent=t('Corpus indisponible');
    $('method-status').hidden=false;
    $('method-status').textContent=t('Le chargement des articles a échoué. Vérifiez votre connexion puis réessayez.');
    retry.hidden=false;retry.disabled=false;
  }finally{clearTimeout(timeout);updateSearchControls();}
}

$('search-form').addEventListener('submit',event=>{event.preventDefault();runSearch();});
$('retry-corpus').addEventListener('click',init);
for(const button of document.querySelectorAll('[data-example]'))button.addEventListener('click',()=>{if(state.running||!state.corpus)return;$('theme-input').value=button.dataset.example;runSearch();});
for(const button of document.querySelectorAll('[data-filter]'))button.addEventListener('click',()=>{state.filter=button.dataset.filter;state.visibleCount=18;for(const b of document.querySelectorAll('[data-filter]')){const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));}render();});
$('more-results').addEventListener('click',()=>{state.visibleCount+=18;render();});
init();
