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
  "musée": "museum",
  "catalogue": "catalogue",
  "œuvre littéraire": "literary work",
  "témoin": "manuscript witness",
  "référence d’inventaire": "inventory reference",
  "Ces filtres portent sur les périodes, lieux, musées et sources mentionnés dans les extraits. Ils se cumulent. Cliquez à nouveau pour retirer un filtre.": "These filters use periods, places, museums and sources mentioned in the excerpts. Filters are combined. Click again to remove a filter.",
  "Recherche exacte : « {query} ». Aucun élargissement aux équivalences.": "Exact search: “{query}”. No expansion to equivalents.",
  "Recherche avec variantes proches : « {query} ». Sans associations thématiques.": "Close-variant search: “{query}”. No thematic associations.",
  "Formes attestées : {forms}.": "Attested forms: {forms}.",
  "Sans équivalences. Majuscules ignorées, accents conservés.": "No equivalents. Case is ignored; accents are preserved.",
  "Variantes graphiques et formes proches répertoriées, sans associations thématiques.": "Listed spelling variants and close forms, without thematic associations.",
  "Inclut les variantes et certaines équivalences.": "Includes spelling variants and some equivalents.",
  "Copte": "Coptic"
};
function t(message,values={}){const template=LANGUAGE==='en'?(ENGLISH_UI[message]??message):message;return template.replace(/\{(\w+)\}/g,(match,key)=>Object.hasOwn(values,key)?String(values[key]):match);}
const state = { corpus:null, docs:new Map(), result:[], baseResult:[], keywordRefinements:[], contextRefinements:[], contextExpanded:{period:false,place:false,source:false}, contextEvidence:new Map(), search:'', filter:'all', visibleCount:18, lexicon:new Map(), egyptianIndex:new Map(), citedNames:new Set(), activeTerms:[], plan:null, running:false, exact:false, matchMode:'expanded' };
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
// Références muséales et témoins : catalogues institutionnels et éditions cités.
// Données, limites et attributions détaillées : data/referentiels.json.
const SOURCE_VOCABULARY={"museums":{"schema":1,"scope":"Bounded museum and inventory vocabulary for bibliographic references; not a catalogue of objects or a claim of current custody.","number_semantics":"Exact collection namespace plus preserved inventory string. No automatic cross-register equality or arbitrary identifier construction.","entries":[{"id":"cairo","label_fr":"Musée égyptien du Caire","label_en":"Egyptian Museum, Cairo","aliases":["Musée égyptien du Caire","musée du Caire","Egyptian Museum Cairo","Egyptian Museum, Cairo","Egyptian Museum in Cairo","Egyptian Museum at Cairo","Museum of Egyptian Antiquities, Cairo","Musée égyptien de Tahrir","Egyptian Museum in Tahrir","المتحف المصري بالقاهرة","المتحف المصري بالتحرير"],"parents":[],"collections":[{"id":"cairo-cg","label_fr":"Catalogue général du Caire (CG)","label_en":"Cairo Catalogue général (CG)","parents":[],"code_rules":[{"codes":["CG","C.G."],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["CG"],"sources":["https://egyptianmuseumcairo.eg/artefact-category/ground-floor/","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf","https://archive.arce.org/collections/egyptian-museum-registrars-training"],"list_policy":{"inherit_prefix":true,"joiners":["et","and","und","&"],"require_explicit_joiner":true,"max_gap":16,"expand_ranges":false}},{"id":"cairo-je","label_fr":"Journal d’entrée du Caire (JE)","label_en":"Cairo Journal d’entrée (JE)","parents":[],"code_rules":[{"codes":["JE","J.E.","JdE","J.d.E."],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["JE","JdE","Journal d’entrée","Journal d'entrée"],"sources":["https://egyptianmuseumcairo.eg/artefact-category/ground-floor/","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf","https://archive.arce.org/collections/egyptian-museum-registrars-training"],"list_policy":{"inherit_prefix":true,"joiners":["et","and","und","&"],"require_explicit_joiner":true,"max_gap":16,"expand_ranges":false}},{"id":"cairo-sr","label_fr":"Registre spécial du Caire (SR)","label_en":"Cairo Special Register (SR)","parents":[],"code_rules":[{"codes":["SR","S.R."],"number_pattern":"(?:[0-9]{1,2}\\s*/\\s*[0-9]{1,7}(?:[A-Za-z])?|[0-9]{1,7})(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Musée égyptien du Caire","musée du Caire","Egyptian Museum Cairo","Egyptian Museum, Cairo","Egyptian Museum in Cairo","Egyptian Museum at Cairo","Museum of Egyptian Antiquities, Cairo","EMC","Cairo","Caire","Kairo"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Cairo SR","Caire SR"],"sources":["https://egyptianmuseumcairo.eg/artefact-category/ground-floor/","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf","https://archive.arce.org/collections/egyptian-museum-registrars-training"]},{"id":"cairo-tr","label_fr":"Registre temporaire du Caire (TR/RT)","label_en":"Cairo Temporary Register (TR/RT)","parents":[],"code_rules":[{"codes":["TR","T.R.","RT","R.T."],"number_pattern":"(?:[0-9]{1,2}\\s*/\\s*[0-9]{1,2}\\s*/\\s*[0-9]{1,4}\\s*/\\s*[0-9]{1,5})(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Musée égyptien du Caire","musée du Caire","Egyptian Museum Cairo","Egyptian Museum, Cairo","Egyptian Museum in Cairo","Egyptian Museum at Cairo","Museum of Egyptian Antiquities, Cairo","EMC","Cairo","Caire","Kairo"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Cairo TR","Caire RT"],"sources":["https://archive.arce.org/collections/egyptian-museum-registrars-training"]}],"sources":["https://egyptianmuseumcairo.eg/artefact-category/ground-floor/","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf","https://archive.arce.org/collections/egyptian-museum-registrars-training","https://egymonuments.gov.eg/ar/museums/egyptian-museum"],"scope_note":"References to Cairo numbering systems, not an assertion of current custody. CG and JE with the same digits remain distinct."},{"id":"british-museum","label_fr":"British Museum","label_en":"British Museum","aliases":["British Museum","Musée britannique","British Museum, London"],"parents":[],"collections":[{"id":"bm-ea","label_fr":"British Museum, antiquités égyptiennes (EA)","label_en":"British Museum, Egyptian Antiquities (EA)","parents":[],"code_rules":[{"codes":["BM EA","BM. EA","British Museum EA","pBM EA","P. BM EA","P.BM EA"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["EA"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["British Museum","Musée britannique","British Museum, London","BM"],"context_window":100,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["BM EA","EA"],"sources":["https://www.britishmuseum.org/collection/object/Y_EA57341","https://www.britishmuseum.org/collection","https://www.britishmuseum.org/sites/default/files/2020-06/British-Museum_Egypt_Sudan_Newsletter1_2014.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf"]},{"id":"bm-legacy","label_fr":"British Museum, référence numérique abrégée","label_en":"British Museum, abbreviated numeric reference","parents":[],"code_rules":[{"codes":["BM","BM.","P. BM","P.BM","pBM"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["BM","P. BM"],"sources":["https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf"],"scope_note":"No automatic equivalence with EA inventory numbers. Papyrus type markers are not a new collection namespace."}],"sources":["https://www.britishmuseum.org/collection/object/Y_EA57341","https://www.britishmuseum.org/collection","https://www.britishmuseum.org/sites/default/files/2020-06/British-Museum_Egypt_Sudan_Newsletter1_2014.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Studies_in_Early_Egyptian_Glass.pdf"]},{"id":"metropolitan","label_fr":"Metropolitan Museum of Art","label_en":"Metropolitan Museum of Art","aliases":["The Metropolitan Museum of Art","Metropolitan Museum of Art","Metropolitan Museum","The Met","musée du Metropolitan"],"parents":[],"collections":[{"id":"met-accession","label_fr":"Numéros d’inventaire du Metropolitan","label_en":"Metropolitan Museum accession numbers","parents":[],"code_rules":[{"codes":["MMA","MET"],"number_pattern":"(?:[0-9]{2,4}(?:\\s*\\.\\s*[0-9]{1,6}){1,4}(?:[A-Za-z](?:\\s*,\\s*[A-Za-z])*)?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["inv.","inv","accession number","Accession Number","acc. no.","acc. nos."],"number_pattern":"(?:[0-9]{2,4}(?:\\s*\\.\\s*[0-9]{1,6}){1,4}(?:[A-Za-z](?:\\s*,\\s*[A-Za-z])*)?)(?![0-9A-Za-z])","evidence_case":"insensitive","requires_context":["The Metropolitan Museum of Art","Metropolitan Museum of Art","Metropolitan Museum","The Met"],"context_window":120,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["MMA","MET","Metropolitan"],"sources":["https://metmuseum.github.io/","https://www.metmuseum.org/departments/egyptian-art","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf"],"scope_note":"Keep every dot and letter suffix. Printed 59.1011 is not silently corrected to 59.101.1. Object IDs in the web API are a different identifier system."}],"sources":["https://metmuseum.github.io/","https://www.metmuseum.org/departments/egyptian-art","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf"]},{"id":"louvre","label_fr":"Musée du Louvre","label_en":"Louvre Museum","aliases":["Louvre","musée du Louvre","Musée du Louvre","Louvre Museum"],"parents":[],"collections":[{"id":"louvre-e","label_fr":"Louvre, inventaire E","label_en":"Louvre inventory E","parents":[],"code_rules":[{"codes":["Louvre E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*[-–]\\s*[0-9]{1,7})?(?:\\s*(?:BIS|TER|bis|ter|[A-Za-z]))?(?:\\s+fragment\\s+[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*[-–]\\s*[0-9]{1,7})?(?:\\s*(?:BIS|TER|bis|ter|[A-Za-z]))?(?:\\s+fragment\\s+[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Louvre","musée du Louvre","Musée du Louvre","Louvre Museum"],"context_window":120,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Louvre E"],"sources":["https://collections.louvre.fr/ark:/53355/cl010077681","https://collections.louvre.fr/ark:/53355/cl010010149","https://collections.louvre.fr/recherche?q=pr%C3%A9paration+des+aliments","https://collections.louvre.fr/ark:/53355/cl010079170"]},{"id":"louvre-c","label_fr":"Louvre, inventaire C","label_en":"Louvre inventory C","parents":[],"code_rules":[{"codes":["Louvre C"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*[-–]\\s*[0-9]{1,7})?(?:\\s*(?:BIS|TER|bis|ter|[A-Za-z]))?(?:\\s+fragment\\s+[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["C"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*[-–]\\s*[0-9]{1,7})?(?:\\s*(?:BIS|TER|bis|ter|[A-Za-z]))?(?:\\s+fragment\\s+[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Louvre","musée du Louvre","Musée du Louvre","Louvre Museum"],"context_window":120,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Louvre C"],"sources":["https://collections.louvre.fr/ark:/53355/cl010077681","https://collections.louvre.fr/ark:/53355/cl010010149","https://collections.louvre.fr/recherche?q=pr%C3%A9paration+des+aliments","https://collections.louvre.fr/ark:/53355/cl010079170"]},{"id":"louvre-n","label_fr":"Louvre, inventaire N","label_en":"Louvre inventory N","parents":[],"code_rules":[{"codes":["Louvre N"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*[-–]\\s*[0-9]{1,7})?(?:\\s*(?:BIS|TER|bis|ter|[A-Za-z]))?(?:\\s+fragment\\s+[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["N"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*[-–]\\s*[0-9]{1,7})?(?:\\s*(?:BIS|TER|bis|ter|[A-Za-z]))?(?:\\s+fragment\\s+[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Louvre","musée du Louvre","Musée du Louvre","Louvre Museum"],"context_window":120,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Louvre N"],"sources":["https://collections.louvre.fr/ark:/53355/cl010077681","https://collections.louvre.fr/ark:/53355/cl010010149","https://collections.louvre.fr/recherche?q=pr%C3%A9paration+des+aliments","https://collections.louvre.fr/ark:/53355/cl010079170"]},{"id":"louvre-legacy","label_fr":"Louvre, référence numérique sans série explicitée","label_en":"Louvre, numeric reference without explicit inventory series","parents":[],"code_rules":[{"codes":["P. Louvre","P.Louvre","Papyrus Louvre"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["P. Louvre"],"sources":["https://collections.louvre.fr/ark:/53355/cl010077681","https://collections.louvre.fr/ark:/53355/cl010010149","https://collections.louvre.fr/recherche?q=pr%C3%A9paration+des+aliments","https://collections.louvre.fr/ark:/53355/cl010079170"],"scope_note":"Published BOE citation P. Louvre 3120 is preserved literally. No E, C or N prefix is inferred."}],"sources":["https://collections.louvre.fr/ark:/53355/cl010077681","https://collections.louvre.fr/ark:/53355/cl010010149","https://collections.louvre.fr/recherche?q=pr%C3%A9paration+des+aliments","https://collections.louvre.fr/ark:/53355/cl010079170"]},{"id":"turin","label_fr":"Museo Egizio de Turin","label_en":"Museo Egizio, Turin","aliases":["Museo Egizio","Museo Egizio di Torino","musée égyptien de Turin","Musée égyptien de Turin","Egyptian Museum of Turin","Egyptian Museum, Turin"],"parents":[],"collections":[{"id":"turin-cat","label_fr":"Turin, Catalogo (Cat./C.)","label_en":"Turin, Catalogo (Cat./C.)","parents":[],"code_rules":[{"codes":["Cat.","Cat","C.","C"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*/\\s*[0-9]{1,5})?(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Museo Egizio","Museo Egizio di Torino","musée égyptien de Turin","Musée égyptien de Turin","Egyptian Museum of Turin","Egyptian Museum, Turin","Turin","Torino","Turiner"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Turin Cat.","Torino Cat.","Museo Egizio Cat."],"sources":["https://rivista.museoegizio.it/wp-content/themes/annotum-base/assets/pdf/Linee_guida_per_gli_autori.pdf","https://collezionepapiri.museoegizio.it/it-IT/document/43","https://collezionepapiri.museoegizio.it/en-GB/document/17/","https://api.museoegizio.it/wp-content/uploads/2018/05/Risposte-quesiti-gara-trasporti-mostra-2017.pdf"]},{"id":"turin-cgt","label_fr":"Turin, Catalogo Generale Torino (CGT)","label_en":"Turin, Catalogo Generale Torino (CGT)","parents":[],"code_rules":[{"codes":["CGT"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*/\\s*[0-9]{1,5})?(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["CGT"],"sources":["https://rivista.museoegizio.it/wp-content/themes/annotum-base/assets/pdf/Linee_guida_per_gli_autori.pdf","https://collezionepapiri.museoegizio.it/it-IT/document/43","https://collezionepapiri.museoegizio.it/en-GB/document/17/","https://api.museoegizio.it/wp-content/uploads/2018/05/Risposte-quesiti-gara-trasporti-mostra-2017.pdf"]},{"id":"turin-suppl","label_fr":"Turin, Supplemento (Suppl./S.)","label_en":"Turin, Supplemento (Suppl./S.)","parents":[],"code_rules":[{"codes":["Suppl.","Suppl","S.","S"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*/\\s*[0-9]{1,5})?(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Museo Egizio","Museo Egizio di Torino","musée égyptien de Turin","Musée égyptien de Turin","Egyptian Museum of Turin","Egyptian Museum, Turin","Turin","Torino","Turiner"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Turin S.","Turin Suppl."],"sources":["https://rivista.museoegizio.it/wp-content/themes/annotum-base/assets/pdf/Linee_guida_per_gli_autori.pdf","https://collezionepapiri.museoegizio.it/it-IT/document/43","https://collezionepapiri.museoegizio.it/en-GB/document/17/","https://api.museoegizio.it/wp-content/uploads/2018/05/Risposte-quesiti-gara-trasporti-mostra-2017.pdf"]},{"id":"turin-provv","label_fr":"Turin, Provvisorio (Provv./P.)","label_en":"Turin, Provvisorio (Provv./P.)","parents":[],"code_rules":[{"codes":["Provv.","Provv","P.","P"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*/\\s*[0-9]{1,5})?(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Museo Egizio","Museo Egizio di Torino","musée égyptien de Turin","Musée égyptien de Turin","Egyptian Museum of Turin","Egyptian Museum, Turin","Turin","Torino","Turiner"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Turin Provv."],"sources":["https://rivista.museoegizio.it/wp-content/themes/annotum-base/assets/pdf/Linee_guida_per_gli_autori.pdf"]}],"sources":["https://rivista.museoegizio.it/wp-content/themes/annotum-base/assets/pdf/Linee_guida_per_gli_autori.pdf","https://collezionepapiri.museoegizio.it/it-IT/document/43","https://collezionepapiri.museoegizio.it/en-GB/document/17/","https://api.museoegizio.it/wp-content/uploads/2018/05/Risposte-quesiti-gara-trasporti-mostra-2017.pdf"],"scope_note":"The official author guide defines Cat.=C., Suppl.=S., Provv.=P.; these three series and CGT remain distinct. RT was not verified and is not imported."},{"id":"luxor-museum","label_fr":"Musée de Louxor","label_en":"Luxor Museum","aliases":["Luxor Museum","Luxor Museum of Ancient Egyptian Art","Luxor Museum of Egyptian Art","musée de Louxor","Musée de Louxor","musée de Louqsor","musée de Louksor","Musée égyptien de Louxor","متحف الأقصر"],"parents":[],"collections":[{"id":"luxor-j","label_fr":"Louxor, inventaire J","label_en":"Luxor inventory J","parents":[],"code_rules":[{"codes":["J.","J"],"number_pattern":"(?:[0-9]{1,6}(?:\\.[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Luxor Museum","Luxor Museum of Ancient Egyptian Art","Luxor Museum of Egyptian Art","musée de Louxor","Musée de Louxor","musée de Louqsor","musée de Louksor","Musée égyptien de Louxor","متحف الأقصر","Luxor","Louxor","Louqsor","Louksor"],"context_window":80,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Luxor J","Louxor J","Louqsor J"],"sources":["https://egymonuments.gov.eg/en/news/luxor-museum-is-a-spectacular-museum-that-includes-a-variety-of-rare-artifacts-discovered-in-luxor/","https://resources.metmuseum.org/resources/metpublications/pdf/A_Fragmentary_Egyptian_Head_from_Heliopolis_The_Metropolitan_Museum_Journal_v_30_1995.pdf"]}],"sources":["https://egymonuments.gov.eg/en/news/luxor-museum-is-a-spectacular-museum-that-includes-a-variety-of-rare-artifacts-discovered-in-luxor/","https://resources.metmuseum.org/resources/metpublications/pdf/A_Fragmentary_Egyptian_Head_from_Heliopolis_The_Metropolitan_Museum_Journal_v_30_1995.pdf"]},{"id":"berlin","label_fr":"Ägyptisches Museum und Papyrussammlung, Berlin","label_en":"Ägyptisches Museum und Papyrussammlung, Berlin","aliases":["Ägyptisches Museum und Papyrussammlung","Ägyptisches Museum, Berlin","Ägyptisches Museum Berlin","Musée égyptien de Berlin","musée égyptien de Berlin","Egyptian Museum Berlin","Neues Museum"],"parents":[],"collections":[{"id":"berlin-am","label_fr":"Berlin, antiquités égyptiennes (ÄM)","label_en":"Berlin, Egyptian antiquities (ÄM)","parents":[],"code_rules":[{"codes":["ÄM"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["AM"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Ägyptisches Museum und Papyrussammlung","Ägyptisches Museum, Berlin","Ägyptisches Museum Berlin","Musée égyptien de Berlin","musée égyptien de Berlin","Egyptian Museum Berlin","Neues Museum","Berlin"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["inv.","inv. no","inv. no.","Inv.-Nr."],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"insensitive","requires_context":["Ägyptisches Museum und Papyrussammlung","Ägyptisches Museum, Berlin","Ägyptisches Museum Berlin","Musée égyptien de Berlin","musée égyptien de Berlin","Egyptian Museum Berlin","Neues Museum"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["Berlin"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["stela","stele","stèle","statue","papyrus","coffin","cercueil","ostracon","relief","naos"],"context_window":110,"require_number":true,"excluded_contexts":["Verlag","publisher","De Gruyter","Reichdruckerei"],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Berlin ÄM","ÄM"],"sources":["https://search.smb.museum/object/obj-606402","https://www.smb.museum/fileadmin/website/Presse/Pressematerial/2019/04/05_AEMP_190417_CinderellaSindbad_Werkliste.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Montuhotep_Nebtawyre_and_Amenemhat_I_The_Metropolitan_Museum_Journal_v_45_2010.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf"],"scope_note":"Bare Berlin plus number is accepted only with nearby object wording and no publishing-context signal. Berlin 1935 alone is not an inventory number."},{"id":"berlin-papyrus","label_fr":"Papyrus de Berlin","label_en":"Berlin papyrus collection","parents":[],"code_rules":[{"codes":["P. Berlin","P.Berlin","Papyrus Berlin","Berlin P","Berlin, P"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:recto|verso|[rv]))?(?:/Kol\\.\\s*[IVX]+(?:[-–][IVX]+)?)?)(?![0-9A-Za-z])","evidence_case":"insensitive","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["P","P."],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Ägyptisches Museum und Papyrussammlung","Ägyptisches Museum, Berlin","Ägyptisches Museum Berlin","Musée égyptien de Berlin","musée égyptien de Berlin","Egyptian Museum Berlin","Neues Museum","Berlin"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["P. Berlin","Berlin P"],"sources":["https://search.smb.museum/object/obj-606402","https://www.smb.museum/fileadmin/website/Presse/Pressematerial/2019/04/05_AEMP_190417_CinderellaSindbad_Werkliste.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Montuhotep_Nebtawyre_and_Amenemhat_I_The_Metropolitan_Museum_Journal_v_45_2010.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf"],"scope_note":"P 3033 is Westcar. Number 3033 is not a generic alias for every Berlin papyrus. Recto/verso and section suffixes must be retained when present."}],"sources":["https://search.smb.museum/object/obj-606402","https://www.smb.museum/fileadmin/website/Presse/Pressematerial/2019/04/05_AEMP_190417_CinderellaSindbad_Werkliste.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Montuhotep_Nebtawyre_and_Amenemhat_I_The_Metropolitan_Museum_Journal_v_45_2010.pdf","https://resources.metmuseum.org/resources/metpublications/pdf/Treasures_from_Tell_Basta_The_Metropolitan_Museum_Journal_v_47_2012.pdf"]},{"id":"leiden","label_fr":"Rijksmuseum van Oudheden, Leyde","label_en":"Rijksmuseum van Oudheden, Leiden","aliases":["Rijksmuseum van Oudheden","RMO","musée national des antiquités de Leyde","Musée national des antiquités de Leyde","National Museum of Antiquities, Leiden"],"parents":[],"collections":[{"id":"leiden-papyrus","label_fr":"Leyde, papyrus de la série I","label_en":"Leiden papyri, I series","parents":[],"code_rules":[{"codes":["P. Leiden","P.Leiden","P. Leyden","P.Leyden","Papyrus Leiden","Papyrus Leyde","Leiden","Leyden","Leyde","Leide","RMO"],"number_pattern":"(?:I\\s*[0-9]{1,5}(?:\\s*(?:recto|verso|[rv]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["papyrus","Papyrus","Rijksmuseum van Oudheden","RMO","inventarisnummer","inventory","inv."],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false,"normalize_space_after_series_prefix":true,"canonical_series_prefix":"I "}}],"query_codes":["Leiden I","Leyden I","Leyde I"],"sources":["https://archieven.rmo.nl/categorie/museumcollectie-documentatie-objecten/museumcollectie-documentatie-objecten/documentatie-objecten/?pagina=3","https://www.rmo.nl/collectie/topstukken/cartonnage-van-nehemsoe/","https://www.rmo.nl/tentoonstellingen/web-exposities/spreek-jij-egyptisch/"],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false,"preserve_series_prefix":"I","normalize_space_after_series_prefix":true,"canonical_series_prefix":"I "}},{"id":"leiden-ams","label_fr":"Leyde, AMS","label_en":"Leiden AMS","parents":[],"code_rules":[{"codes":["AMS"],"number_pattern":"(?:[0-9]{1,7}(?:\\s+vel\\s*[0-9]{1,3})?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Rijksmuseum van Oudheden","RMO","musée national des antiquités de Leyde","Musée national des antiquités de Leyde","National Museum of Antiquities, Leiden","Leiden","Leyde","Leyden"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Leiden AMS","Leyde AMS"],"sources":["https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909","https://hdl.handle.net/21.12126/170909"],"scope_note":"The museum page identifies AMS27 vel1, a leaf/section; vel1 is preserved and not assigned to every reference to the manuscript."},{"id":"leiden-amm","label_fr":"Leyde, AMM","label_en":"Leiden AMM","parents":[],"code_rules":[{"codes":["AMM"],"number_pattern":"(?:[0-9]{1,5}(?:-[A-Za-z])?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Rijksmuseum van Oudheden","RMO","musée national des antiquités de Leyde","Musée national des antiquités de Leyde","National Museum of Antiquities, Leiden","Leiden","Leyde","Leyden"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Leiden AMM"],"sources":["https://archieven.rmo.nl/categorie/museumcollectie-documentatie-objecten/museumcollectie-documentatie-objecten/documentatie-objecten/?pagina=3","https://www.rmo.nl/collectie/topstukken/cartonnage-van-nehemsoe/","https://www.rmo.nl/tentoonstellingen/web-exposities/spreek-jij-egyptisch/"]}],"sources":["https://archieven.rmo.nl/categorie/museumcollectie-documentatie-objecten/museumcollectie-documentatie-objecten/documentatie-objecten/?pagina=3","https://www.rmo.nl/collectie/topstukken/cartonnage-van-nehemsoe/","https://www.rmo.nl/tentoonstellingen/web-exposities/spreek-jij-egyptisch/","https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909"]},{"id":"vienna","label_fr":"Kunsthistorisches Museum, Vienne","label_en":"Kunsthistorisches Museum, Vienna","aliases":["Kunsthistorisches Museum","Kunsthistorisches Museum Wien","Kunsthistorisches Museum Vienna","KHM","musée d’Histoire de l’art de Vienne","Musée d’Histoire de l’art de Vienne"],"parents":[],"collections":[{"id":"vienna-as","label_fr":"Vienne, collection égyptienne (ÄS)","label_en":"Vienna, Egyptian collection (ÄS)","parents":[],"code_rules":[{"codes":["ÄS"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["AS"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Kunsthistorisches Museum","Kunsthistorisches Museum Wien","Kunsthistorisches Museum Vienna","KHM","musée d’Histoire de l’art de Vienne","Musée d’Histoire de l’art de Vienne","Vienna","Vienne","Wien"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["ÄS","Vienna ÄS","Vienne ÄS","Wien ÄS"],"sources":["https://www.khm.at/fileadmin/content/technologische-studien-14/KHM_Technologische-Studien_14.pdf"]}],"sources":["https://www.khm.at/fileadmin/content/technologische-studien-14/KHM_Technologische-Studien_14.pdf"]},{"id":"boston","label_fr":"Museum of Fine Arts, Boston","label_en":"Museum of Fine Arts, Boston","aliases":["Museum of Fine Arts, Boston","Museum of Fine Arts Boston","Boston Museum of Fine Arts","musée des Beaux-Arts de Boston","Musée des Beaux-Arts de Boston"],"parents":[],"collections":[{"id":"boston-accession","label_fr":"Numéros d’inventaire du MFA Boston","label_en":"MFA Boston accession numbers","parents":[],"code_rules":[{"codes":["MFA","BMFA","Boston MFA"],"number_pattern":"(?:[0-9]{2,4}(?:\\s*\\.\\s*[0-9]{1,6}){1,4}(?:[A-Za-z](?:\\s*,\\s*[A-Za-z])*)?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["Accession Number","accession number","inv."],"number_pattern":"(?:[0-9]{2,4}(?:\\s*\\.\\s*[0-9]{1,6}){1,4}(?:[A-Za-z](?:\\s*,\\s*[A-Za-z])*)?)(?![0-9A-Za-z])","evidence_case":"insensitive","requires_context":["Museum of Fine Arts, Boston","Museum of Fine Arts Boston","Boston Museum of Fine Arts","musée des Beaux-Arts de Boston","Musée des Beaux-Arts de Boston"],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["MFA","Boston MFA","BMFA"],"sources":["https://collections.mfa.org/objects/139689/necklace"]}],"sources":["https://collections.mfa.org/objects/139689/necklace"]},{"id":"penn","label_fr":"Penn Museum, Philadelphie","label_en":"Penn Museum, Philadelphia","aliases":["Penn Museum","University of Pennsylvania Museum","University Museum, Philadelphia","musée de l’université de Pennsylvanie","Musée de l’université de Pennsylvanie"],"parents":[],"collections":[{"id":"penn-e","label_fr":"Penn Museum, série E","label_en":"Penn Museum E series","parents":[],"code_rules":[{"codes":["Penn E","Penn Museum E","Philadelphia E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Penn Museum","University of Pennsylvania Museum","University Museum, Philadelphia","musée de l’université de Pennsylvanie","Musée de l’université de Pennsylvanie"],"context_window":100,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Penn E","Philadelphia E","Penn Museum E"],"sources":["https://collections.penn.museum/collections/object/330077","https://collections.penn.museum/collections/object/326249","https://www.penn.museum/sites/journal/1377/"]}],"sources":["https://collections.penn.museum/collections/object/330077","https://collections.penn.museum/collections/object/326249","https://www.penn.museum/sites/journal/1377/"]},{"id":"chicago","label_fr":"ISAC Museum, Chicago","label_en":"ISAC Museum, Chicago","aliases":["Institute for the Study of Ancient Cultures","Institute for the Study of Ancient Cultures Museum","Oriental Institute Museum","ISAC Museum","musée de l’Oriental Institute","Musée de l’Oriental Institute"],"parents":[],"collections":[{"id":"chicago-e","label_fr":"Chicago, collection égyptienne et nubienne (E)","label_en":"Chicago, Egyptian and Nubian collection (E)","parents":[],"code_rules":[{"codes":["OIM E","ISAC E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}},{"codes":["E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Institute for the Study of Ancient Cultures","Institute for the Study of Ancient Cultures Museum","Oriental Institute Museum","ISAC Museum","musée de l’Oriental Institute","Musée de l’Oriental Institute","OIM","ISAC"],"context_window":100,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["OIM E","ISAC E"],"sources":["https://isac.uchicago.edu/collections/isac-conservation-laboratory","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Publications/Misc/miscdiscoveringnewpasts.pdf","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Scalf%26Jay_OLA_231.pdf","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/saoc58.pdf"]},{"id":"chicago-legacy","label_fr":"Chicago, référence OIM numérique abrégée","label_en":"Chicago, abbreviated OIM numeric reference","parents":[],"code_rules":[{"codes":["OIM"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["OIM"],"sources":["https://isac.uchicago.edu/collections/isac-conservation-laboratory","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Publications/Misc/miscdiscoveringnewpasts.pdf","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Scalf%26Jay_OLA_231.pdf","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/saoc58.pdf"],"scope_note":"The museum documents later addition of E to Egyptian/Nubian numbers. Bare OIM numbers are not globally converted to E, since OIM also has other collections."}],"sources":["https://isac.uchicago.edu/collections/isac-conservation-laboratory","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Publications/Misc/miscdiscoveringnewpasts.pdf","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/Scalf%26Jay_OLA_231.pdf","https://isac.uchicago.edu/sites/default/files/uploads/shared/docs/saoc58.pdf"]},{"id":"copenhagen","label_fr":"Ny Carlsberg Glyptotek, Copenhague","label_en":"Ny Carlsberg Glyptotek, Copenhagen","aliases":["Ny Carlsberg Glyptotek","Ny Carlsberg Glyptoteket","Glyptothèque Ny Carlsberg","Glyptothèque de Copenhague"],"parents":[],"collections":[{"id":"copenhagen-aein","label_fr":"Copenhague, inventaire ÆIN","label_en":"Copenhagen ÆIN inventory","parents":[],"code_rules":[{"codes":["ÆIN","AEIN"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":[],"context_window":140,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["ÆIN","AEIN"],"sources":["https://media.glyptoteket.dk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajAzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e245a97138a115cab0dbc836de6cfe2bebcf6748/Bes_ENG.pdf?disposition=attachment"]}],"sources":["https://media.glyptoteket.dk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajAzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e245a97138a115cab0dbc836de6cfe2bebcf6748/Bes_ENG.pdf?disposition=attachment"]},{"id":"brussels","label_fr":"Musées royaux d’Art et d’Histoire, Bruxelles","label_en":"Royal Museums of Art and History, Brussels","aliases":["Musées royaux d’art et d’histoire","Musées royaux d’Art et d’Histoire","Musées royaux d'Art et d'Histoire","Royal Museums of Art and History","Koninklijke Musea voor Kunst en Geschiedenis","Musée Art & Histoire"],"parents":[],"collections":[{"id":"brussels-e","label_fr":"Bruxelles, inventaire E","label_en":"Brussels E inventory","parents":[],"code_rules":[{"codes":["E.","E"],"number_pattern":"(?:[0-9]{1,7}(?:\\s*(?:bis|ter|BIS|TER|[A-Za-z]))?)(?![0-9A-Za-z])","evidence_case":"exact","requires_context":["Musées royaux d’art et d’histoire","Musées royaux d’Art et d’Histoire","Musées royaux d'Art et d'Histoire","Royal Museums of Art and History","Koninklijke Musea voor Kunst en Geschiedenis","Musée Art & Histoire","MRAH","RMAH","MKG","Bruxelles","Brussels"],"context_window":100,"require_number":true,"excluded_contexts":[],"number_policy":{"keep_leading_zeros":true,"keep_suffix":true,"keep_separators":true,"normalize_space_around_separators":true,"normalize_whitespace":true,"expand_ranges":false,"remove_all_punctuation":false}}],"query_codes":["Bruxelles E","Brussels E","MRAH E"],"sources":["https://www.carmentis.be/eMP/eMuseumPlus?module=collection&objectId=75658&service=ExternalInterface&viewType=detailView","https://carmentis.be/eMP/eMuseumPlus?lang=en&module=collection&objectId=78204&service=ExternalInterface&siteId=1&viewType=detailView","https://www.artandhistory.museum/sites/default/files/2025-07/BE-380469-1%20-%20Acquisitions%20-%20Inventaire%20final.pdf"]}],"sources":["https://www.carmentis.be/eMP/eMuseumPlus?module=collection&objectId=75658&service=ExternalInterface&viewType=detailView","https://carmentis.be/eMP/eMuseumPlus?lang=en&module=collection&objectId=78204&service=ExternalInterface&siteId=1&viewType=detailView","https://www.artandhistory.museum/sites/default/files/2025-07/BE-380469-1%20-%20Acquisitions%20-%20Inventaire%20final.pdf"]}],"anchors":[{"passage_id":"boe-2026-1-p4-body-2","reference":"CG 20554","expected":[{"collection":"cairo-cg","number":"20554"}]},{"passage_id":"boe-2026-1-note-12","reference":"Vienna ÄS 186","expected":[{"collection":"vienna-as","number":"186"}]},{"passage_id":"boe-2026-2-p10-body-1","reference":"Cairo CG 42155","expected":[{"collection":"cairo-cg","number":"42155"}]},{"passage_id":"boe-2026-2-note-21","reference":"Berlin 7313 - the stele of Mentuhotep","expected":[{"collection":"berlin-am","number":"7313"}]},{"passage_id":"boe-2026-3-p3-body-1","reference":"Caire CG 34 et 36","expected":[{"collection":"cairo-cg","number":"34"},{"collection":"cairo-cg","number":"36"}]},{"passage_id":"boe-2026-3-p4-body-1","reference":"musée du Louvre (E 10958 A)","expected":[{"collection":"louvre-e","number":"10958 A"}]},{"passage_id":"boe-2026-4-note-119","reference":"Ägyptisches Museum, Berlin, inv. ÄM 14964","expected":[{"collection":"berlin-am","number":"14964"}]},{"passage_id":"boe-2026-4-note-119","reference":"Metropolitan Museum (New York), inv. 59.1011","expected":[{"collection":"met-accession","number":"59.1011"}]},{"passage_id":"boe-2026-4-p33-body-1","reference":"P. Louvre 3120 – P. BM 10252","expected":[{"collection":"louvre-legacy","number":"3120"},{"collection":"bm-legacy","number":"10252"}]},{"passage_id":"boe-2026-4-p39-body-1","reference":"Musée égyptien de Berlin (inv. no 12650)","expected":[{"collection":"berlin-am","number":"12650"}]}],"negative_cases":[{"text":"je travaille sur les siècles","must_not_match":["cairo-je"],"reason":"Lowercase French pronoun, no inventory number."},{"text":"je 20554","must_not_match":["cairo-je"],"reason":"Exact source case required for JE; a lowercase pronoun with a number remains lexical."},{"text":"the curator met 26.3.45 visitors","must_not_match":["met-accession"],"reason":"Lowercase English verb is not the uppercase institution code."},{"text":"Lettre d’Amarna EA 26","must_not_match":["bm-ea"],"reason":"EA alone does not establish British Museum context."},{"text":"CGT 54050","must_match":[{"collection":"turin-cgt","number":"54050"}],"must_not_match":["cairo-cg"],"reason":"CGT is a distinct complete code, never a substring CG."},{"text":"Berlin, De Gruyter, 1935","must_not_match":["berlin-am","berlin-papyrus"],"reason":"Publishing city and year do not establish an object reference."},{"text":"Chicago, University of Chicago Press, 1969","must_not_match":["chicago-e","chicago-legacy"],"reason":"Publishing city and date do not establish a museum reference."},{"text":"Bruxelles, 1962, p. 41","must_not_match":["brussels-e"],"reason":"Generic city and page/year, no inventory E."},{"text":"E 10958 A","must_not_match":["louvre-e","penn-e","brussels-e","chicago-e"],"reason":"Generic E requires qualified institutional context."},{"text":"J. 155","must_not_match":["cairo-je","luxor-j"],"reason":"Generic J needs qualified institutional context."},{"text":"P. Berlin 3033","must_match":[{"collection":"berlin-papyrus","number":"3033"}],"must_not_equal":["berlin-am:3033"],"reason":"The collection P is preserved."},{"text":"MMA 26.2.4","must_match":[{"collection":"met-accession","number":"26.2.4"}],"must_not_equal":["met-accession:2624"],"reason":"Dots remain significant."},{"text":"Louvre E 10958 B","must_match":[{"collection":"louvre-e","number":"10958 B"}],"must_not_equal":["louvre-e:10958 A"],"reason":"Suffix letters remain significant."},{"text":"MRAH E.00752","must_match":[{"collection":"brussels-e","number":"00752"}],"must_not_equal":["brussels-e:752"],"reason":"Leading zeros are retained; no unverified equivalence."},{"text":"CG 20554 et JE 20554","must_match":[{"collection":"cairo-cg","number":"20554"},{"collection":"cairo-je","number":"20554"}],"must_not_equal":["cairo-cg:20554=cairo-je:20554"],"reason":"Equal digits in different registers do not identify the same object."}],"unimported":["Turin RT: no official museum source verified; distinct from Cairo TR/RT.","Hildesheim PM: no official museum catalogue page verified during this bounded pass."],"implementation_notes":["Match complete code boundaries, longest code first; never detect CG inside CGT or E inside JE/EA.","Code strings are literal; normalize typographic spacing around dots only as explicitly permitted.","Query aliases may be folded for user convenience; source evidence case remains exact for JE/MET/MMA/CG and similar short codes.","Generic E/C/N/J/P/S and EA require the rule-specific local context, not a museum mentioned elsewhere on the page.","Locators such as recto/verso may narrow a reference; do not silently discard or turn a literary work into the whole manuscript.","Explicit conjunction lists can inherit a code; never inherit from a naked year, page number or a different explicit code.","Cairo J is intentionally not inferred as JE: J is shared with Luxor and other institutions. Use explicit JE/JdE for the Cairo Journal d’entrée.","No generic conversion BM number -> EA number, CG -> JE, Cat. -> CGT, or an accession number -> web/API object ID."],"catalogue_examples":[{"collection":"cairo-cg","number":"36","source":"https://egyptianmuseumcairo.eg/artefact-category/ground-floor/"},{"collection":"cairo-je","number":"38928","source":"https://egyptianmuseumcairo.eg/artefact-category/ground-floor/"},{"collection":"bm-ea","number":"57341","source":"https://www.britishmuseum.org/collection/object/Y_EA57341"},{"collection":"met-accession","number":"13.180.34a","source":"https://www.metmuseum.org/perspectives/egyptian-ptolemaic-art-installation?rss=1"},{"collection":"louvre-e","number":"10958 A","source":"https://collections.louvre.fr/ark:/53355/cl010077681"},{"collection":"louvre-e","number":"10958 B","source":"https://collections.louvre.fr/ark:/53355/cl010010149"},{"collection":"turin-cgt","number":"54050","source":"https://collezionepapiri.museoegizio.it/it-IT/document/43"},{"collection":"turin-cat","number":"2114/502","source":"https://collezionepapiri.museoegizio.it/it-IT/document/43"},{"collection":"turin-suppl","number":"01875","source":"https://api.museoegizio.it/wp-content/uploads/2018/05/Risposte-quesiti-gara-trasporti-mostra-2017.pdf"},{"collection":"luxor-j","number":"34","source":"https://resources.metmuseum.org/resources/metpublications/pdf/A_Fragmentary_Egyptian_Head_from_Heliopolis_The_Metropolitan_Museum_Journal_v_30_1995.pdf"},{"collection":"berlin-papyrus","number":"3033","source":"https://search.smb.museum/object/obj-606402"},{"collection":"leiden-ams","number":"27 vel1","source":"https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909"},{"collection":"leiden-amm","number":"2-c","source":"https://www.rmo.nl/collectie/topstukken/cartonnage-van-nehemsoe/"},{"collection":"vienna-as","number":"3940 b","source":"https://www.khm.at/fileadmin/content/technologische-studien-14/KHM_Technologische-Studien_14.pdf"},{"collection":"boston-accession","number":"11.2579","source":"https://collections.mfa.org/objects/139689/necklace"},{"collection":"penn-e","number":"14344B","source":"https://collections.penn.museum/collections/object/326249"},{"collection":"chicago-e","number":"22940","source":"https://isac.uchicago.edu/collections/isac-conservation-laboratory"},{"collection":"copenhagen-aein","number":"674","source":"https://media.glyptoteket.dk/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajAzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e245a97138a115cab0dbc836de6cfe2bebcf6748/Bes_ENG.pdf?disposition=attachment"},{"collection":"brussels-e","number":"00752","source":"https://www.carmentis.be/eMP/eMuseumPlus?module=collection&objectId=75658&service=ExternalInterface&viewType=detailView"}]},"literary":{"schema":1,"scope":"Curated primary-source Egyptian named papyri, distinct literary works and verified witnesses. Reviewed2026-10-28.","policy":["Named papyrus is material artefact; work may survive in several witnesses. Work queries may include verified witnesses, while specific witness query never expands to all manuscripts of that work.","No identification from bare integer, p. page notation, unqualified collector/person, findspot or museum city.","Preserve inventory namespace, meaningful sub-number, frame and side qualifiers. Normalization is typographical, never semantic erasure.","Parent groups composite roll/faces/fragments. Explicit face or fragment query must not climb to parent then expand to opposite face/sibling.","Only individually documented equivalences bridge collection namespaces; unknown identifiers remain literal.","Arabic names marked editorial_translations are search translations, not claimed authority preferred labels. Existing PT/CT/BD corpora remain unchanged.","No absolute date, object identity or historical period inferred only from inventory number."],"entries":[{"id":"westcar","label_fr":"Papyrus Westcar","label_en":"Westcar Papyrus","aliases":["Papyrus Westcar","Westcar Papyrus","P. Westcar","Papyrus Berlin 3033","P. Berlin 3033","pBerlin P 3033","بردية وستكار"],"evidence":["Papyrus Westcar","Westcar Papyrus","P. Westcar","Papyrus Berlin 3033","P. Berlin 3033","pBerlin P 3033","بردية وستكار"],"inventory_refs":[{"collection":"berlin-papyrus","number":"3033","qualifier":"papyrus"}],"work_ids":["westcar"],"parents":[],"related":[],"sources":["https://id.smb.museum/object/606402","https://www.ucl.ac.uk/museums-static/digitalegypt/literature/midegsummaries.html"],"editorial_translations":[{"lang":"ar","text":"بردية وستكار","status":"editorial translation; not an imported authority preferred label"}],"notes":"Exact named papyrus/inventory identity, verified by SMB. Not an alias for other Berlin papyri."},{"id":"berlin3022","label_fr":"Papyrus Berlin 3022","label_en":"Berlin Papyrus 3022","aliases":["Papyrus Berlin 3022","Berlin Papyrus 3022","P. Berlin 3022","pBerlin P 3022"],"evidence":["Papyrus Berlin 3022","Berlin Papyrus 3022","P. Berlin 3022","pBerlin P 3022"],"inventory_refs":[{"collection":"berlin-papyrus","number":"3022","qualifier":"papyrus"}],"work_ids":["sinuhe"],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/QWGEY5IW6FGM7EFNPLJBXMWHNA","https://www.ucl.ac.uk/museums-static/digitalegypt/writing/library/athanasi.html"],"notes":"Sinuhe witness B. Joined Amherst fragments belong to this witness; no general Amherst/Berlin equivalence."},{"id":"berlin3023","label_fr":"Papyrus Berlin 3023","label_en":"Berlin Papyrus 3023","aliases":["Papyrus Berlin 3023","Berlin Papyrus 3023","P. Berlin 3023","pBerlin P 3023"],"evidence":["Papyrus Berlin 3023","Berlin Papyrus 3023","P. Berlin 3023","pBerlin P 3023"],"inventory_refs":[{"collection":"berlin-papyrus","number":"3023","qualifier":"papyrus"}],"work_ids":["peasant"],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/text/PVLMEE7Y45FPXBSMF47T6PNPEE","https://www.ucl.ac.uk/museums-static/digitalegypt/writing/library/athanasi.html"],"notes":"Eloquent Peasant witness B1, separate from B2 and R."},{"id":"berlin3025","label_fr":"Papyrus Berlin 3025","label_en":"Berlin Papyrus 3025","aliases":["Papyrus Berlin 3025","Berlin Papyrus 3025","P. Berlin 3025","pBerlin P 3025"],"evidence":["Papyrus Berlin 3025","Berlin Papyrus 3025","P. Berlin 3025","pBerlin P 3025"],"inventory_refs":[{"collection":"berlin-papyrus","number":"3025","qualifier":"papyrus"}],"work_ids":["peasant"],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/text/TTH5MM5DPRBI5MM2U5M5YT3RME","https://www.ucl.ac.uk/museums-static/digitalegypt/writing/library/athanasi.html"],"notes":"Eloquent Peasant witness B2; joined AmherstII does not imply all Amherst papyri are this object."},{"id":"berlin3024","label_fr":"Papyrus Berlin 3024","label_en":"Berlin Papyrus 3024","aliases":["Papyrus Berlin 3024","Berlin Papyrus 3024","P. Berlin 3024","pBerlin P 3024"],"evidence":["Papyrus Berlin 3024","Berlin Papyrus 3024","P. Berlin 3024","pBerlin P 3024"],"inventory_refs":[{"collection":"berlin-papyrus","number":"3024","qualifier":"papyrus"}],"work_ids":["dialogue-ba","herdsman"],"parents":[],"related":[],"sources":["https://id.smb.museum/object/606199","https://livrepository.liverpool.ac.uk/3029891/","https://www.ucl.ac.uk/museums-static/digitalegypt/writing/library/athanasi.html"],"notes":"Contains the Debate of a Man and His Ba and material of the distinct Tale of the Herdsman. No unsupported recto/verso placement is inferred for these sections."},{"id":"berlin10499","label_fr":"Papyrus Ramesseum A","label_en":"Ramesseum Papyrus A","aliases":["Papyrus Ramesseum A","Ramesseum Papyrus A","P. Ramesseum A","Papyrus Berlin 10499","P. Berlin 10499","pBerlin P 10499"],"evidence":["Papyrus Ramesseum A","Ramesseum Papyrus A","P. Ramesseum A","Papyrus Berlin 10499","P. Berlin 10499","pBerlin P 10499"],"inventory_refs":[{"collection":"berlin-papyrus","number":"10499","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/USY3HSQPHFGKNOGGB76LSFY3VQ"],"notes":"Composite artefact: Eloquent Peasant recto, Sinuhe verso. Work relations attach to the face-specific entries only."},{"id":"berlin10499-recto","label_fr":"Papyrus Ramesseum A, recto","label_en":"Ramesseum Papyrus A, recto","aliases":["Papyrus Ramesseum A, recto","Ramesseum Papyrus A, recto","P. Ramesseum A recto","P. Berlin 10499 recto","Papyrus Berlin 10499 recto","pBerlin P 10499 recto"],"evidence":["Papyrus Ramesseum A, recto","Ramesseum Papyrus A, recto","P. Ramesseum A recto","P. Berlin 10499 recto","Papyrus Berlin 10499 recto","pBerlin P 10499 recto"],"inventory_refs":[{"collection":"berlin-papyrus","number":"10499","qualifier":"papyrus","side":"recto"}],"work_ids":["peasant"],"parents":["berlin10499"],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/USY3HSQPHFGKNOGGB76LSFY3VQ"],"side":"recto","notes":"Explicit side-qualified queries must not broaden through the parent to the opposite face."},{"id":"berlin10499-verso","label_fr":"Papyrus Ramesseum A, verso","label_en":"Ramesseum Papyrus A, verso","aliases":["Papyrus Ramesseum A, verso","Ramesseum Papyrus A, verso","P. Ramesseum A verso","P. Berlin 10499 verso","Papyrus Berlin 10499 verso","pBerlin P 10499 verso"],"evidence":["Papyrus Ramesseum A, verso","Ramesseum Papyrus A, verso","P. Ramesseum A verso","P. Berlin 10499 verso","Papyrus Berlin 10499 verso","pBerlin P 10499 verso"],"inventory_refs":[{"collection":"berlin-papyrus","number":"10499","qualifier":"papyrus","side":"verso"}],"work_ids":["sinuhe"],"parents":["berlin10499"],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/USY3HSQPHFGKNOGGB76LSFY3VQ"],"side":"verso","notes":"Explicit side-qualified queries must not broaden through the parent to the opposite face."},{"id":"prisse","label_fr":"Papyrus Prisse","label_en":"Prisse Papyrus","aliases":["Papyrus Prisse","Prisse Papyrus","P. Prisse","Papyrus de Prisse","BnF Égyptien 183-194","BnF Egyptien 183-194","بردية بريسه"],"evidence":["Papyrus Prisse","Prisse Papyrus","P. Prisse","Papyrus de Prisse","BnF Égyptien 183-194","BnF Egyptien 183-194","بردية بريسه"],"inventory_refs":[{"collection":"bnf-egyptien","number":"183-194","qualifier":"papyrus","scope":"complete conservation range"}],"work_ids":["ptahhotep","kagemni"],"parents":[],"related":[],"sources":["https://catalogue.bnf.fr/ark:/12148/cb455705883","https://expositions.bnf.fr/egypte/fiche_Prisse.pdf","https://editions.bnf.fr/visions-d%C3%A9gypte-%C3%A9mile-prisse-davennes-1807-1879?page=1"],"editorial_translations":[{"lang":"ar","text":"بردية بريسه","status":"editorial translation; not an imported authority preferred label"}],"notes":"Composite roll with two teachings. Retain complete range183-194 as a unit; never make individual183..194 equivalent. BnF explicitly places Ptahhotep at Égyptien186-194. Kagemni is a different work."},{"id":"ani","label_fr":"Papyrus d’Ani","label_en":"Papyrus of Ani","aliases":["Papyrus d’Ani","Papyrus of Ani","Papyrus d'Ani","Papyrus Ani","P. Ani","Book of the Dead of Ani","Livre des Morts d’Ani","بردية آني"],"evidence":["Papyrus d’Ani","Papyrus of Ani","Papyrus d'Ani","Papyrus Ani","P. Ani","Book of the Dead of Ani","Livre des Morts d’Ani","بردية آني"],"inventory_refs":[{"collection":"bm-ea","number":"10470","qualifier":"papyrus"}],"work_ids":["bd"],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10470-1"],"editorial_translations":[{"lang":"ar","text":"بردية آني","status":"editorial translation; not an imported authority preferred label"}],"notes":"A Book of the Dead witness. Ani alone or the Teaching of Ani does not identify this papyrus. EA10470,1 is one frame, not the entire roll."},{"id":"harris1","label_fr":"Papyrus Harris I","label_en":"Great Harris Papyrus","aliases":["Papyrus Harris I","Great Harris Papyrus","Papyrus Harris 1","P. Harris I","P. Harris 1","Grand Papyrus Harris","The Great Harris Papyrus","بردية هاريس الأولى"],"evidence":["Papyrus Harris I","Great Harris Papyrus","Papyrus Harris 1","P. Harris I","P. Harris 1","Grand Papyrus Harris","The Great Harris Papyrus","بردية هاريس الأولى"],"inventory_refs":[{"collection":"bm-ea","number":"9999","qualifier":"papyrus"},{"collection":"bm-legacy","number":"9999","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA9999-2"],"editorial_translations":[{"lang":"ar","text":"بردية هاريس الأولى","status":"editorial translation; not an imported authority preferred label"}],"notes":"BM bibliography explicitly identifies Le Papyrus HarrisI: BM9999. Distinct from Harris500 and Magical Harris."},{"id":"harris500","label_fr":"Papyrus Harris 500","label_en":"Harris 500 Papyrus","aliases":["Papyrus Harris 500","Harris 500 Papyrus","P. Harris 500","pHarris 500","بردية هاريس ٥٠٠"],"evidence":["Papyrus Harris 500","Harris 500 Papyrus","P. Harris 500","pHarris 500","بردية هاريس ٥٠٠"],"inventory_refs":[{"collection":"bm-ea","number":"10060","qualifier":"papyrus"}],"work_ids":["joppa","doomed-prince","love-poetry-harris500"],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/D7SBSJDQURCB7AB7LO5IBUYOOQ"],"editorial_translations":[{"lang":"ar","text":"بردية هاريس ٥٠٠","status":"editorial translation; not an imported authority preferred label"}],"notes":"Composite roll: love poems recto; Joppa verso1-3; Doomed Prince verso4-8. Generic manuscript reference does not specify a particular work or section."},{"id":"bremner-rhind","label_fr":"Papyrus Bremner-Rhind","label_en":"Bremner-Rhind Papyrus","aliases":["Papyrus Bremner-Rhind","Bremner-Rhind Papyrus","P. Bremner-Rhind","Papyrus Bremner Rhind","The Bremner-Rhind Papyrus","بردية بريمنر ريند"],"evidence":["Papyrus Bremner-Rhind","Bremner-Rhind Papyrus","P. Bremner-Rhind","Papyrus Bremner Rhind","The Bremner-Rhind Papyrus","بردية بريمنر ريند"],"inventory_refs":[{"collection":"bm-ea","number":"10188","qualifier":"papyrus"},{"collection":"bm-legacy","number":"10188","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10188-3"],"editorial_translations":[{"lang":"ar","text":"بردية بريمنر ريند","status":"editorial translation; not an imported authority preferred label"}],"notes":"One roll containing multiple ritual compositions. Not the mathematical Rhind Papyrus; Nesmin alone is not an identifier."},{"id":"salt825","label_fr":"Papyrus Salt 825","label_en":"Salt 825 Papyrus","aliases":["Papyrus Salt 825","Salt 825 Papyrus","P. Salt 825","Papyrus Salt n°825","Papyrus Salt no.825","بردية سولت ٨٢٥"],"evidence":["Papyrus Salt 825","Salt 825 Papyrus","P. Salt 825","Papyrus Salt n°825","Papyrus Salt no.825","بردية سولت ٨٢٥"],"inventory_refs":[{"collection":"bm-ea","number":"10051","qualifier":"papyrus"},{"collection":"bm-legacy","number":"10051","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10051-4"],"editorial_translations":[{"lang":"ar","text":"بردية سولت ٨٢٥","status":"editorial translation; not an imported authority preferred label"}],"notes":"Collector number825; BM10051. EA10090 is described as connected, not identical, so is not an equivalent identifier."},{"id":"abbott","label_fr":"Papyrus Abbott","label_en":"Abbott Papyrus","aliases":["Papyrus Abbott","Abbott Papyrus","P. Abbott","The Abbott Papyrus","بردية أبوت"],"evidence":["Papyrus Abbott","Abbott Papyrus","P. Abbott","The Abbott Papyrus","بردية أبوت"],"inventory_refs":[{"collection":"bm-ea","number":"10221","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10221-2"],"editorial_translations":[{"lang":"ar","text":"بردية أبوت","status":"editorial translation; not an imported authority preferred label"}],"notes":"Legal tomb-robbery manuscript. BM warns that a publication plate was wrongly labelled EA10021; that erroneous number is not imported."},{"id":"chester-beatty1","label_fr":"Papyrus Chester Beatty I","label_en":"Chester Beatty I Papyrus","aliases":["Papyrus Chester Beatty I","Chester Beatty I Papyrus","P. Chester Beatty I","P. Chester Beatty 1","Papyrus Chester Beatty 1","Pap. Chester Beatty no. I","بردية تشستر بيتي الأولى"],"evidence":["Papyrus Chester Beatty I","Chester Beatty I Papyrus","P. Chester Beatty I","P. Chester Beatty 1","Papyrus Chester Beatty 1","Pap. Chester Beatty no. I","بردية تشستر بيتي الأولى"],"inventory_refs":[],"work_ids":["horus-seth"],"parents":[],"related":[],"sources":["https://chesterbeatty.ie/assets/uploads/2018/11/The-Library-of-A.-Chestera-Beatty-Description-of-a-Hieratic-Papyrus-with-a-Mythological-Story-Love-Songs-and-Other-Miscellaneous-Texts.pdf","https://thesaurus-linguae-aegyptiae.de/object/3QZLHEVESFE5BJFUYLDSSYTVL4"],"editorial_translations":[{"lang":"ar","text":"بردية تشستر بيتي الأولى","status":"editorial translation; not an imported authority preferred label"}],"excluded_contexts":["Biblical Papyrus","Biblical Papyri","P45","P 45","Gospels","Acts of the Apostles"],"notes":"Named hieratic manuscript in Dublin: Horus/Seth recto1,1-16,8, plus love poems and other texts. Ramsès Online uses P.BM10681; possible historical identifier left inactive, with no automatic EA10681 mapping. Biblical PapyrusI is a distinct sequence."},{"id":"chester-beatty5","label_fr":"Papyrus Chester Beatty V","label_en":"Chester Beatty V Papyrus","aliases":["Papyrus Chester Beatty V","Chester Beatty V Papyrus","P. Chester Beatty V","P. Chester Beatty 5","Papyrus Chester Beatty 5","بردية تشستر بيتي الخامسة"],"evidence":["Papyrus Chester Beatty V","Chester Beatty V Papyrus","P. Chester Beatty V","P. Chester Beatty 5","Papyrus Chester Beatty 5","بردية تشستر بيتي الخامسة"],"inventory_refs":[{"collection":"bm-ea","number":"10685","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10685-1","https://thesaurus-linguae-aegyptiae.de/object/CCKX2Z6XNVA4RKH6LPICCSZZOY"],"editorial_translations":[{"lang":"ar","text":"بردية تشستر بيتي الخامسة","status":"editorial translation; not an imported authority preferred label"}],"notes":"Separate from Chester BeattyI and Biblical series. BOE cites V[3], verso5,4-6,3; bracket3 is not this papyrus serial."},{"id":"ebers","label_fr":"Papyrus Ebers","label_en":"Ebers Papyrus","aliases":["Papyrus Ebers","Ebers Papyrus","P. Ebers","Papyros Ebers","بردية إيبرس"],"evidence":["Papyrus Ebers","Ebers Papyrus","P. Ebers","Papyros Ebers","بردية إيبرس"],"inventory_refs":[],"work_ids":[],"parents":[],"related":[],"sources":["https://www.ub.uni-leipzig.de/en/about-us/exhibitions/permanent-exhibition/ebers-papyrus"],"editorial_translations":[{"lang":"ar","text":"بردية إيبرس","status":"editorial translation; not an imported authority preferred label"}],"notes":"No numeric inventory invented. Ebers alone may designate the scholar, so is not evidence. Roll includes medical and magical contents."},{"id":"edwin-smith","label_fr":"Papyrus Edwin Smith","label_en":"Edwin Smith Surgical Papyrus","aliases":["Papyrus Edwin Smith","Edwin Smith Surgical Papyrus","P. Edwin Smith","Edwin Smith Papyrus","Papyrus chirurgical Edwin Smith","بردية إدوين سميث"],"evidence":["Papyrus Edwin Smith","Edwin Smith Surgical Papyrus","P. Edwin Smith","Edwin Smith Papyrus","Papyrus chirurgical Edwin Smith","بردية إدوين سميث"],"inventory_refs":[],"work_ids":[],"parents":[],"related":[],"sources":["https://nyam.org/library-resources/library-collections/edwin-smith-surgical-papyrus/"],"editorial_translations":[{"lang":"ar","text":"بردية إدوين سميث","status":"editorial translation; not an imported authority preferred label"}],"notes":"No numeric identifier invented. Surgical cases recto, different spells/recipes verso. NYAM is the current collection, not former custodians."},{"id":"leiden-i344","label_fr":"Papyrus Leiden I 344","label_en":"Leiden Papyrus I 344","aliases":["Papyrus Leiden I 344","Leiden Papyrus I 344","P. Leiden I 344","Papyrus Leide I 344","P. Leide I 344","P. Leyde I 344","pLeiden I 344","Papyrus AMS 27","P. AMS 27"],"evidence":["Papyrus Leiden I 344","Leiden Papyrus I 344","P. Leiden I 344","Papyrus Leide I 344","P. Leide I 344","P. Leyde I 344","pLeiden I 344","Papyrus AMS 27","P. AMS 27"],"inventory_refs":[{"collection":"leiden-papyrus","number":"I 344","qualifier":"papyrus"},{"collection":"leiden-ams","number":"27","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/text/GJA5VMSJDFAOPG6TP6ZYY3KCRI","https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909","https://thesaurus-linguae-aegyptiae.de/object/E46EU3F62ZEW3LDCKUIAMBCUHQ"],"notes":"Composite manuscript: Ipuwer recto; solar hymns to Amun-Re verso. AMS27 vel1 identifies one modern frame, not every frame."},{"id":"leiden-i344-recto","label_fr":"Papyrus Leiden I 344, recto","label_en":"Leiden Papyrus I 344, recto","aliases":["Papyrus Leiden I 344, recto","Leiden Papyrus I 344, recto","P. Leiden I 344 recto","P. Leide I 344 recto","Ipuwer Papyrus","Papyrus d’Ipou-Our","Papyrus d'Ipuwer"],"evidence":["Papyrus Leiden I 344, recto","Leiden Papyrus I 344, recto","P. Leiden I 344 recto","P. Leide I 344 recto","Ipuwer Papyrus","Papyrus d’Ipou-Our","Papyrus d'Ipuwer"],"inventory_refs":[{"collection":"leiden-papyrus","number":"I 344","qualifier":"papyrus","side":"recto"},{"collection":"leiden-ams","number":"27","qualifier":"papyrus","side":"recto"}],"work_ids":["ipuwer"],"parents":["leiden-i344"],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/text/GJA5VMSJDFAOPG6TP6ZYY3KCRI","https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909"],"side":"recto","notes":"Ipuwer named papyrus scoped to recto, excluding the distinct solar hymns on verso."},{"id":"leiden-i344-verso","label_fr":"Papyrus Leiden I 344, verso","label_en":"Leiden Papyrus I 344, verso","aliases":["Papyrus Leiden I 344, verso","Leiden Papyrus I 344, verso","P. Leiden I 344 verso","P. Leide I 344 verso"],"evidence":["Papyrus Leiden I 344, verso","Leiden Papyrus I 344, verso","P. Leiden I 344 verso","P. Leide I 344 verso"],"inventory_refs":[{"collection":"leiden-papyrus","number":"I 344","qualifier":"papyrus","side":"verso"},{"collection":"leiden-ams","number":"27","qualifier":"papyrus","side":"verso"}],"work_ids":[],"parents":["leiden-i344"],"related":[],"sources":["https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909"],"side":"verso","notes":"Solar hymns to Amun-Re. Explicit verso is not evidence for the Ipuwer work."},{"id":"turin-royal","label_fr":"Canon royal de Turin","label_en":"Turin Royal Canon","aliases":["Canon royal de Turin","Turin Royal Canon","Papyrus royal de Turin","Papyrus des Rois de Turin","Liste royale de Turin","Turin King List","Royal Canon of Turin","P. Turin 1874","Papyrus Turin 1874","بردية تورين للملوك"],"evidence":["Canon royal de Turin","Turin Royal Canon","Papyrus royal de Turin","Papyrus des Rois de Turin","Liste royale de Turin","Turin King List","Royal Canon of Turin","P. Turin 1874","Papyrus Turin 1874","بردية تورين للملوك"],"inventory_refs":[{"collection":"turin-cat","number":"1874","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://collezionepapiri.museoegizio.it/en-GB/document/97/"],"editorial_translations":[{"lang":"ar","text":"بردية تورين للملوك","status":"editorial translation; not an imported authority preferred label"}],"notes":"Royal list verso; administrative recto. TPOP lists Cat1874/002 as a joined part, not an arbitrary punctuation variant. Judicial Papyrus1875 is distinct."},{"id":"hermitage1115","label_fr":"Papyrus du Naufragé","label_en":"Shipwrecked Sailor Papyrus","aliases":["Papyrus du Naufragé","Shipwrecked Sailor Papyrus","Papyrus Leningrad 1115","P. Leningrad 1115","Papyrus Hermitage 1115","P. Hermitage 1115","P. Ermitage 1115","Papyrus Ermitage 1115","P. Petersburg 1115","بردية الملاح الغريق"],"evidence":["Papyrus du Naufragé","Shipwrecked Sailor Papyrus","Papyrus Leningrad 1115","P. Leningrad 1115","Papyrus Hermitage 1115","P. Hermitage 1115","P. Ermitage 1115","Papyrus Ermitage 1115","P. Petersburg 1115","بردية الملاح الغريق"],"inventory_refs":[{"collection":"hermitage-papyrus","number":"1115","qualifier":"papyrus"}],"work_ids":["shipwrecked-sailor"],"parents":[],"related":[],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/literature/midegsummaries.html"],"editorial_translations":[{"lang":"ar","text":"بردية الملاح الغريق","status":"editorial translation; not an imported authority preferred label"}],"notes":"UCL explicitly identifies Hermitage1115. Other Hermitage inventory classes sharing1115 are unrelated."},{"id":"dorbiney","label_fr":"Papyrus d’Orbiney","label_en":"D’Orbiney Papyrus","aliases":["Papyrus d’Orbiney","D’Orbiney Papyrus","Papyrus d'Orbiney","P. d'Orbiney","P. d’Orbiney","D'Orbiney Papyrus","بردية دوربيني"],"evidence":["Papyrus d’Orbiney","D’Orbiney Papyrus","Papyrus d'Orbiney","P. d'Orbiney","P. d’Orbiney","D'Orbiney Papyrus","بردية دوربيني"],"inventory_refs":[{"collection":"bm-ea","number":"10183","qualifier":"papyrus"}],"work_ids":["two-brothers"],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10183-1"],"editorial_translations":[{"lang":"ar","text":"بردية دوربيني","status":"editorial translation; not an imported authority preferred label"}],"notes":"Witness of the Tale of the Two Brothers. Collector names alone are not papyrus identifiers."},{"id":"sallier1","label_fr":"Papyrus Sallier I","label_en":"Sallier I Papyrus","aliases":["Papyrus Sallier I","Sallier I Papyrus","P. Sallier I","Papyrus Sallier 1","P. Sallier 1","بردية سالييه الأولى"],"evidence":["Papyrus Sallier I","Sallier I Papyrus","P. Sallier I","Papyrus Sallier 1","P. Sallier 1","بردية سالييه الأولى"],"inventory_refs":[{"collection":"bm-ea","number":"10185","qualifier":"papyrus"}],"work_ids":["apophis-seqenenre"],"parents":[],"related":[],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10185-1"],"editorial_translations":[{"lang":"ar","text":"بردية سالييه الأولى","status":"editorial translation; not an imported authority preferred label"}],"notes":"Official BM record identifies SallierI=EA10185. EA10181 is SallierIII; never infer inventory by ordinal arithmetic."},{"id":"jumilhac","label_fr":"Papyrus Jumilhac","label_en":"Jumilhac Papyrus","aliases":["Papyrus Jumilhac","Jumilhac Papyrus","P. Jumilhac","بردية جوميلاك"],"evidence":["Papyrus Jumilhac","Jumilhac Papyrus","P. Jumilhac","بردية جوميلاك"],"inventory_refs":[{"collection":"louvre-e","number":"17110","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://collections.louvre.fr/ark:/53355/cl010003518"],"editorial_translations":[{"lang":"ar","text":"بردية جوميلاك","status":"editorial translation; not an imported authority preferred label"}],"notes":"Louvre E17110, religious/geographical/mythological manuscript. Not an object in another collection sharing17110."},{"id":"london-leiden","label_fr":"Papyrus magique de Londres et Leyde","label_en":"London-Leiden Magical Papyrus","aliases":["Papyrus magique de Londres et Leyde","London-Leiden Magical Papyrus","Papyrus magique Londres-Leyde","Papyrus magique de Londres-Leide","London Leiden Magical Papyrus","Demotic Papyrus London and Leiden"],"evidence":["Papyrus magique de Londres et Leyde","London-Leiden Magical Papyrus","Papyrus magique Londres-Leyde","Papyrus magique de Londres-Leide","London Leiden Magical Papyrus","Demotic Papyrus London and Leiden"],"inventory_refs":[],"work_ids":[],"parents":[],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/77UZKWZAR5A45IP5CAYFO7VOKY","https://www.britishmuseum.org/collection/object/Y_EA10070-1"],"notes":"Reconstructed ancient roll now in two distinct museum fragments. Named parent groups those parts without making the two present-day objects identical."},{"id":"london-leiden-london","label_fr":"Papyrus magique de Londres","label_en":"London Magical Papyrus","aliases":["Papyrus magique de Londres","London Magical Papyrus","The London Magical Papyrus","P. BM 10070"],"evidence":["Papyrus magique de Londres","London Magical Papyrus","The London Magical Papyrus","P. BM 10070"],"inventory_refs":[{"collection":"bm-ea","number":"10070","qualifier":"papyrus"},{"collection":"bm-legacy","number":"10070","qualifier":"papyrus"}],"work_ids":[],"parents":["london-leiden"],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/77UZKWZAR5A45IP5CAYFO7VOKY","https://www.britishmuseum.org/collection/object/Y_EA10070-1"],"notes":"London physical part only. Exact BM10070 query must not become an exact query for the Leiden physical part."},{"id":"london-leiden-leiden","label_fr":"Papyrus Leiden I 383","label_en":"Leiden Papyrus I 383","aliases":["Papyrus Leiden I 383","Leiden Papyrus I 383","P. Leiden I 383","P. Leide I 383","P. Leyde I 383"],"evidence":["Papyrus Leiden I 383","Leiden Papyrus I 383","P. Leiden I 383","P. Leide I 383","P. Leyde I 383"],"inventory_refs":[{"collection":"leiden-papyrus","number":"I 383","qualifier":"papyrus"}],"work_ids":[],"parents":["london-leiden"],"related":[],"sources":["https://thesaurus-linguae-aegyptiae.de/object/77UZKWZAR5A45IP5CAYFO7VOKY"],"notes":"Leiden physical part only; shares reconstructed ancient roll with the London fragment."},{"id":"paris-magical","label_fr":"Papyrus magique de Paris","label_en":"Paris Magical Papyrus","aliases":["Papyrus magique de Paris","Paris Magical Papyrus","Papyrus magique de la Bibliothèque nationale","PGM IV","PGM 4","BnF Supplément grec 574","BnF Suppl. grec 574","P. Bibliothèque Nationale Supplément Grec 574","بردية باريس السحرية"],"evidence":["Papyrus magique de Paris","Paris Magical Papyrus","Papyrus magique de la Bibliothèque nationale","PGM IV","PGM 4","BnF Supplément grec 574","BnF Suppl. grec 574","P. Bibliothèque Nationale Supplément Grec 574","بردية باريس السحرية"],"inventory_refs":[{"collection":"bnf-supplement-grec","number":"574","qualifier":"papyrus"}],"work_ids":[],"parents":[],"related":[],"sources":["https://data.bnf.fr/fr/ark:/12148/cb12398181v","https://catalogue.bnf.fr/rechercher.do?index=SujConstr&numNotice=12398181_"],"editorial_translations":[{"lang":"ar","text":"بردية باريس السحرية","status":"editorial translation; not an imported authority preferred label"}],"alignment":[{"scheme":"BnF RAMEAU","uri":"https://data.bnf.fr/fr/ark:/12148/cb12398181v","label":"Bibliothèque nationale de France. Département des manuscrits -- Manuscrit. Supplément grec 574","match":"exact"}],"notes":"BnF linked primary bibliography explicitly identifies PGMIV with Supplément grec574. PGM alone denotes the broader corpus, not this manuscript."}],"works":[{"id":"sinuhe","label_fr":"Sinouhé","label_en":"Tale of Sinuhe","aliases":["Sinouhé","Tale of Sinuhe","Sinuhe","Sanehat","Sanehet","Story of Sinuhe","Histoire de Sinouhé","Historia de Sinuhé"],"evidence":["Sinouhé","Tale of Sinuhe","Sinuhe","Sanehat","Sanehet","Story of Sinuhe","Histoire de Sinouhé","Historia de Sinuhé"],"witnesses":["berlin3022","berlin10499-verso"],"sources":["https://thesaurus-linguae-aegyptiae.de/object/QWGEY5IW6FGM7EFNPLJBXMWHNA","https://thesaurus-linguae-aegyptiae.de/object/USY3HSQPHFGKNOGGB76LSFY3VQ"],"existing_corpus_id":"sinuhe"},{"id":"peasant","label_fr":"Paysan éloquent","label_en":"Tale of the Eloquent Peasant","aliases":["Paysan éloquent","Tale of the Eloquent Peasant","Le Paysan éloquent","Eloquent Peasant","Eloquenter Bauer","Campesino elocuente","Camponês eloquente","Tale of Khuninpu"],"evidence":["Paysan éloquent","Tale of the Eloquent Peasant","Le Paysan éloquent","Eloquent Peasant","Eloquenter Bauer","Campesino elocuente","Camponês eloquente","Tale of Khuninpu"],"witnesses":["berlin3023","berlin3025","berlin10499-recto"],"sources":["https://thesaurus-linguae-aegyptiae.de/text/PVLMEE7Y45FPXBSMF47T6PNPEE","https://thesaurus-linguae-aegyptiae.de/text/TTH5MM5DPRBI5MM2U5M5YT3RME","https://thesaurus-linguae-aegyptiae.de/object/USY3HSQPHFGKNOGGB76LSFY3VQ"],"existing_corpus_id":"peasant"},{"id":"westcar","label_fr":"Contes du papyrus Westcar","label_en":"Tales of the Court of King Khufu","aliases":["Contes du papyrus Westcar","Tales of the Court of King Khufu","Contes de la cour de Chéops"],"evidence":["Contes du papyrus Westcar","Tales of the Court of King Khufu","Contes de la cour de Chéops"],"witnesses":["westcar"],"sources":["https://id.smb.museum/object/606402","https://www.ucl.ac.uk/museums-static/digitalegypt/literature/midegsummaries.html"],"existing_corpus_id":"westcar"},{"id":"ptahhotep","label_fr":"Enseignement de Ptahhotep","label_en":"Teaching of Ptahhotep","aliases":["Enseignement de Ptahhotep","Teaching of Ptahhotep","Instruction de Ptahhotep","Maximes de Ptahhotep","Instructions of Ptahhotep","Lehre des Ptahhotep"],"evidence":["Enseignement de Ptahhotep","Teaching of Ptahhotep","Instruction de Ptahhotep","Maximes de Ptahhotep","Instructions of Ptahhotep","Lehre des Ptahhotep"],"witnesses":["prisse"],"sources":["https://expositions.bnf.fr/egypte/fiche_Prisse.pdf","https://editions.bnf.fr/visions-d%C3%A9gypte-%C3%A9mile-prisse-davennes-1807-1879?page=1"],"existing_corpus_id":"ptahhotep","notes":"One registered witness only; not a claim that there are no other witnesses. Kagemni is a separate work on the same roll."},{"id":"kagemni","label_fr":"Enseignement pour Kagemni","label_en":"Teaching for Kagemni","aliases":["Enseignement pour Kagemni","Teaching for Kagemni","Enseignement de Kagemni","Instruction of Kagemni"],"evidence":["Enseignement pour Kagemni","Teaching for Kagemni","Enseignement de Kagemni","Instruction of Kagemni"],"witnesses":["prisse"],"sources":["https://expositions.bnf.fr/egypte/fiche_Prisse.pdf","https://www.ucl.ac.uk/museums-static/digitalegypt/literature/midegsummaries.html"]},{"id":"ipuwer","label_fr":"Lamentations d’Ipou-Our","label_en":"Admonitions of Ipuwer","aliases":["Lamentations d’Ipou-Our","Admonitions of Ipuwer","Lamentations d’Ipuwer","Lament of Ipuwer","Dialogue of Ipuwer and the Lord of All","Admonitions of an Egyptian Sage"],"evidence":["Lamentations d’Ipou-Our","Admonitions of Ipuwer","Lamentations d’Ipuwer","Lament of Ipuwer","Dialogue of Ipuwer and the Lord of All","Admonitions of an Egyptian Sage"],"witnesses":["leiden-i344-recto"],"sources":["https://thesaurus-linguae-aegyptiae.de/text/GJA5VMSJDFAOPG6TP6ZYY3KCRI","https://www.rmo.nl/en/collection/search-collection/collection-piece/?object=170909"],"existing_corpus_id":"ipuwer"},{"id":"dialogue-ba","label_fr":"Dialogue d’un homme avec son ba","label_en":"Debate of a Man and His Ba","aliases":["Dialogue d’un homme avec son ba","Debate of a Man and His Ba","Dialogue du Désespéré avec son ba","Dialogue of a Man with His Soul","Dispute between a Man and His Ba","Gespräch eines Lebensmüden mit seiner Seele","Der Lebensmüde"],"evidence":["Dialogue d’un homme avec son ba","Debate of a Man and His Ba","Dialogue du Désespéré avec son ba","Dialogue of a Man with His Soul","Dispute between a Man and His Ba","Gespräch eines Lebensmüden mit seiner Seele","Der Lebensmüde"],"witnesses":["berlin3024"],"sources":["https://id.smb.museum/object/606199","https://livrepository.liverpool.ac.uk/3029891/"]},{"id":"herdsman","label_fr":"Conte du Berger","label_en":"Tale of the Herdsman","aliases":["Conte du Berger","Tale of the Herdsman","Herdsman’s Tale","Hirtengeschichte"],"evidence":["Conte du Berger","Tale of the Herdsman","Herdsman’s Tale","Hirtengeschichte"],"witnesses":["berlin3024"],"sources":["https://livrepository.liverpool.ac.uk/3029891/","https://www.ucl.ac.uk/museums-static/digitalegypt/literature/midegsummaries.html"],"notes":"Distinct composition from the Dialogue although preserved on shared material."},{"id":"shipwrecked-sailor","label_fr":"Conte du Naufragé","label_en":"Tale of the Shipwrecked Sailor","aliases":["Conte du Naufragé","Tale of the Shipwrecked Sailor","Le Naufragé","Shipwrecked Sailor"],"evidence":["Conte du Naufragé","Tale of the Shipwrecked Sailor","Le Naufragé","Shipwrecked Sailor"],"witnesses":["hermitage1115"],"sources":["https://www.ucl.ac.uk/museums-static/digitalegypt/literature/midegsummaries.html"]},{"id":"two-brothers","label_fr":"Conte des Deux Frères","label_en":"Tale of the Two Brothers","aliases":["Conte des Deux Frères","Tale of the Two Brothers","Les Deux Frères","Story of the Two Brothers"],"evidence":["Conte des Deux Frères","Tale of the Two Brothers","Les Deux Frères","Story of the Two Brothers"],"witnesses":["dorbiney"],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10183-1"]},{"id":"horus-seth","label_fr":"Aventures d’Horus et de Seth","label_en":"Contendings of Horus and Seth","aliases":["Aventures d’Horus et de Seth","Contendings of Horus and Seth","Les Aventures d’Horus et de Seth","The Contendings of Horus and Seth","Streit zwischen Horus und Seth"],"evidence":["Aventures d’Horus et de Seth","Contendings of Horus and Seth","Les Aventures d’Horus et de Seth","The Contendings of Horus and Seth","Streit zwischen Horus und Seth"],"witnesses":["chester-beatty1"],"sources":["https://chesterbeatty.ie/assets/uploads/2018/11/The-Library-of-A.-Chestera-Beatty-Description-of-a-Hieratic-Papyrus-with-a-Mythological-Story-Love-Songs-and-Other-Miscellaneous-Texts.pdf","https://thesaurus-linguae-aegyptiae.de/object/3QZLHEVESFE5BJFUYLDSSYTVL4"],"notes":"A bare juxtaposition of the two gods is not this literary title."},{"id":"joppa","label_fr":"Prise de Joppé","label_en":"Taking of Joppa","aliases":["Prise de Joppé","Taking of Joppa","Prise de Joppa","Capture of Joppa","The Taking of Joppa"],"evidence":["Prise de Joppé","Taking of Joppa","Prise de Joppa","Capture of Joppa","The Taking of Joppa"],"witnesses":["harris500"],"sources":["https://thesaurus-linguae-aegyptiae.de/object/D7SBSJDQURCB7AB7LO5IBUYOOQ"],"notes":"Harris500 verso1-3 only. Witness and work are not exact synonyms for every text on the roll."},{"id":"doomed-prince","label_fr":"Conte du Prince prédestiné","label_en":"Tale of the Doomed Prince","aliases":["Conte du Prince prédestiné","Tale of the Doomed Prince","Prince prédestiné","Foredoomed Prince","Story of the Doomed Prince"],"evidence":["Conte du Prince prédestiné","Tale of the Doomed Prince","Prince prédestiné","Foredoomed Prince","Story of the Doomed Prince"],"witnesses":["harris500"],"sources":["https://thesaurus-linguae-aegyptiae.de/object/D7SBSJDQURCB7AB7LO5IBUYOOQ"],"notes":"Harris500 verso4-8; not the Taking of Joppa."},{"id":"love-poetry-harris500","label_fr":"Chants d’amour du papyrus Harris 500","label_en":"Love poems of Papyrus Harris 500","aliases":["Chants d’amour du papyrus Harris 500","Love poems of Papyrus Harris 500","Poèmes d’amour du papyrus Harris 500","Love songs of Papyrus Harris 500"],"evidence":["Chants d’amour du papyrus Harris 500","Love poems of Papyrus Harris 500","Poèmes d’amour du papyrus Harris 500","Love songs of Papyrus Harris 500"],"witnesses":["harris500"],"sources":["https://thesaurus-linguae-aegyptiae.de/object/D7SBSJDQURCB7AB7LO5IBUYOOQ"],"notes":"No generic love-poetry alias; this record is only the Harris500 collection."},{"id":"apophis-seqenenre","label_fr":"Querelle d’Apophis et de Séqénenrê","label_en":"Tale of Apophis and Seqenenra","aliases":["Querelle d’Apophis et de Séqénenrê","Tale of Apophis and Seqenenra","Querelle d’Apopis et Séqénenrê","Quarrel of Apophis and Seqenenre","Quarrel of Apepi and Seqenenre"],"evidence":["Querelle d’Apophis et de Séqénenrê","Tale of Apophis and Seqenenra","Querelle d’Apopis et Séqénenrê","Quarrel of Apophis and Seqenenre","Quarrel of Apepi and Seqenenre"],"witnesses":["sallier1"],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10185-1"]},{"id":"bd","label_fr":"Livre des Morts","label_en":"Book of the Dead","aliases":["Livre des Morts","Book of the Dead","Totenbuch","Libro de los Muertos","Livro dos Mortos","Libro dei Morti","كتاب الموتى"],"evidence":["Livre des Morts","Book of the Dead","Totenbuch","Libro de los Muertos","Livro dos Mortos","Libro dei Morti","كتاب الموتى"],"witnesses":["ani"],"sources":["https://www.britishmuseum.org/collection/object/Y_EA10470-1"],"existing_corpus_id":"bd","notes":"Existing corpus remains broader; Ani is one witness, not an equivalence to every Book of the Dead manuscript."}],"inventory_namespaces":[{"id":"berlin-papyrus","label_fr":"Papyrus de Berlin","label_en":"Berlin papyri","museum":"berlin","codes":["P. Berlin","Papyrus Berlin","pBerlin P","Berlin P"],"number_pattern":"\\d+[A-Za-z]?(?:/[A-Za-z0-9-]+)?","requires_qualifier":"papyrus","notes":"Berlin P and ÄM are distinct. P. alone is insufficient."},{"id":"bm-ea","label_fr":"British Museum, EA","label_en":"British Museum, EA","museum":"british-museum","codes":["P. BM EA","Papyrus BM EA","pBM EA","BM EA"],"number_pattern":"\\d+(?:[,/][A-Za-z0-9-]+)?","requires_qualifier":"papyrus","notes":"A suffix may identify a frame; preserve it, never treat comma as decimal or erase it."},{"id":"bm-legacy","label_fr":"British Museum, référence ancienne","label_en":"British Museum, legacy reference","museum":"british-museum","codes":["P. BM","Papyrus BM","P. British Museum"],"number_pattern":"\\d+(?:[,/][A-Za-z0-9-]+)?","requires_qualifier":"papyrus","notes":"No global conversion to EA; curated named-object bridges only."},{"id":"leiden-papyrus","label_fr":"Papyrus de Leyde","label_en":"Leiden papyri","museum":"rmo","codes":["P. Leiden","P. Leide","P. Leyde","Papyrus Leiden","Papyrus Leide","Papyrus Leyde","pLeiden"],"number_pattern":"I\\s*\\d+[A-Za-z]?(?:[,/][A-Za-z0-9-]+)?","requires_qualifier":"papyrus","notes":"Retain Roman inventory class I in the number."},{"id":"leiden-ams","label_fr":"Leyde, AMS","label_en":"Leiden, AMS","museum":"rmo","codes":["P. AMS","Papyrus AMS"],"number_pattern":"\\d+[A-Za-z]?(?:\\s+vel\\s+\\d+)?","requires_qualifier":"papyrus","notes":"AMS27 is roll; AMS27 vel1 a frame. No generic conversion to Leiden I."},{"id":"turin-cat","label_fr":"Turin, catalogue","label_en":"Turin catalogue","museum":"turin","codes":["P. Turin","Papyrus Turin","P. Torino","Papyrus Torino","Turin Cat."],"number_pattern":"\\d+(?:/\\d+)?","requires_qualifier":"papyrus","notes":"Cat, CGT, Suppl and Provv are distinct."},{"id":"bnf-egyptien","label_fr":"BnF, Égyptien","label_en":"BnF, Égyptien","museum":"bnf","codes":["BnF Égyptien","BnF Egyptien","P. BnF Égyptien"],"number_pattern":"\\d+(?:[-–]\\d+)?","requires_qualifier":"papyrus","notes":"Do not expand shelfmark ranges into equivalent individual parts."},{"id":"bnf-supplement-grec","label_fr":"BnF, Supplément grec","label_en":"BnF, Supplément grec","museum":"bnf","codes":["BnF Supplément grec","BnF Suppl. grec","P. Bibliothèque Nationale Supplément Grec"],"number_pattern":"\\d+","requires_qualifier":"papyrus","notes":""},{"id":"hermitage-papyrus","label_fr":"Papyrus de l’Ermitage","label_en":"Hermitage papyri","museum":"hermitage","codes":["P. Hermitage","P. Ermitage","P. Leningrad","P. Petersburg","Papyrus Hermitage","Papyrus Ermitage","Papyrus Leningrad"],"number_pattern":"\\d+[A-Za-z]?","requires_qualifier":"papyrus","notes":"Bibliographic papyrus namespace, distinct from paintings/textiles with same integer."}],"anchors":[{"concept":"chester-beatty1","passage_id":"boe-2026-4-note-49","doc_id":"boe-2026-4","page":15,"kind":"note","surface":"P. Chester Beatty I ro"},{"concept":"chester-beatty1","passage_id":"boe-2026-4-note-185","doc_id":"boe-2026-4","page":47,"kind":"note","surface":"P. Chester Beatty I ro"},{"concept":"chester-beatty5","passage_id":"boe-2026-4-p22-body-2","doc_id":"boe-2026-4","page":22,"kind":"body","surface":"P. Chester Beatty V [3], vo"},{"concept":"chester-beatty5","passage_id":"boe-2026-4-note-164","doc_id":"boe-2026-4","page":42,"kind":"note","surface":"P. Chester Beatty V [3], vo"},{"concept":"salt825","passage_id":"boe-2026-4-p35-body-1","doc_id":"boe-2026-4","page":35,"kind":"body","surface":"Papyrus Salt 825"},{"concept":"salt825","passage_id":"boe-2026-4-p35-body-2","doc_id":"boe-2026-4","page":35,"kind":"body","surface":"P. Salt 825"},{"concept":"salt825","passage_id":"boe-2026-4-p44-body-1","doc_id":"boe-2026-4","page":44,"kind":"body","surface":"Papyrus Salt 825"},{"concept":"salt825","passage_id":"boe-2026-4-p44-body-2","doc_id":"boe-2026-4","page":44,"kind":"body","surface":"P. Salt 825"},{"concept":"jumilhac","passage_id":"boe-2026-4-p47-body-2","doc_id":"boe-2026-4","page":47,"kind":"body","surface":"Papyrus Jumilhac"},{"concept":"london-leiden","passage_id":"boe-2026-2-p24-bibliography-2","doc_id":"boe-2026-2","page":24,"kind":"bibliography","surface":"London-Leiden Magical Papyrus"},{"concept":"work:peasant","passage_id":"boe-2026-2-p24-bibliography-2","doc_id":"boe-2026-2","page":24,"kind":"bibliography","surface":"Tale of the Eloquent Peasant"},{"concept":"work:horus-seth","passage_id":"boe-2026-4-note-49","doc_id":"boe-2026-4","page":15,"kind":"note","surface":"Aventures d’Horus et de Seth"}],"negative_cases":[{"query":"p.12","expected_absent":["papyrus"],"reason":"Page abbreviation is not papyrus."},{"query":"P.","expected_absent":["papyrus"],"reason":"No collection, inventory or manuscript name."},{"query":"Berlin3024","expected_absent":["berlin3024"],"reason":"Bare city plus integer is not enough."},{"query":"ÄM3024","expected_absent":["berlin3024"],"reason":"Different Berlin inventory namespace."},{"query":"P. Berlin3022","expected_absent":["berlin3023","berlin3025","berlin10499-recto"],"reason":"Specific witness does not expand to other manuscripts."},{"query":"P. Berlin10499 verso","expected_absent":["berlin10499-recto","work:peasant"],"reason":"Verso is Sinuhe, not Eloquent Peasant."},{"query":"P. Leiden I344 verso","expected_absent":["leiden-i344-recto","work:ipuwer"],"reason":"Verso solar hymns are a separate composition."},{"query":"Papyrus Salt825","expected_absent":["bm-ea:10090"],"reason":"Connected is not equivalent."},{"query":"Papyrus Harris500","expected_absent":["harris1"],"reason":"Different named manuscripts."},{"query":"Papyrus Bremner-Rhind","expected_absent":["rhind-mathematical"],"reason":"Distinct from mathematical Rhind."},{"query":"P. Chester Beatty I","expected_absent":["chester-beatty5","bm-ea:10681"],"reason":"I and V are distinct; no verified EA10681 bridge."},{"query":"Chester Beatty Biblical Papyrus I","expected_absent":["chester-beatty1"],"reason":"Biblical and hieratic series are distinct."},{"query":"Enseignement d’Ani","expected_absent":["ani"],"reason":"Different work from Ani Book of the Dead."},{"query":"Georg Ebers1889","expected_absent":["ebers"],"reason":"Scholar name and year are not manuscript evidence."},{"query":"Prisse d’Avennes","expected_absent":["prisse"],"reason":"Collector/person mention is not manuscript evidence."},{"query":"Horus et Seth","expected_absent":["work:horus-seth"],"reason":"Bare gods are not a literary title."},{"query":"BnF Égyptien183","expected_absent":["bnf-egyptien:194"],"reason":"Part183 is not equivalent to194."},{"query":"P. BM EA10070","expected_absent":["london-leiden-leiden"],"reason":"London part is not exact Leiden physical part."},{"query":"PGM","expected_absent":["paris-magical"],"reason":"Broader corpus abbreviation is not specific PGMIV."},{"query":"Anthony Charles Harris1855","expected_absent":["harris1","harris500"],"reason":"Collector/year mention in BOE."},{"query":"Zool. Med. Leiden81","expected_absent":["leiden-i344"],"reason":"Journal name and volume, not papyrus."}]}};
// Les inventaires sont des espaces d'identifiants distincts. Un numéro
// partagé par deux catalogues ne prouve jamais l'identité de deux objets.
const SOURCE_MUSEUMS=SOURCE_VOCABULARY.museums.entries;
const SOURCE_LIBRARY_MUSEUMS=[
 {id:'bnf',label_fr:'Bibliothèque nationale de France',label_en:'Bibliothèque nationale de France',aliases:['Bibliothèque nationale de France','Bibliotheque nationale de France','BnF'],collections:[]},
 {id:'hermitage',label_fr:'Musée de l’Ermitage',label_en:'State Hermitage Museum',aliases:['Musée de l’Ermitage','Musée de l\'Ermitage','State Hermitage Museum','Hermitage Museum'],collections:[]},
];
const SOURCE_COLLECTIONS=new Map();
for(const museum of [...SOURCE_MUSEUMS,...SOURCE_LIBRARY_MUSEUMS])for(const collection of museum.collections||[])SOURCE_COLLECTIONS.set(collection.id,{...collection,museum:museum.id});
for(const namespace of SOURCE_VOCABULARY.literary.inventory_namespaces){
 const previous=SOURCE_COLLECTIONS.get(namespace.id),museum=namespace.museum==='rmo'?'leiden':namespace.museum;
 const rule={codes:namespace.codes,number_pattern:namespace.number_pattern,evidence_case:'exact',requires_context:[],context_window:120,number_policy:{keep_leading_zeros:true,normalize_whitespace:true,normalize_space_around_separators:true,...(previous?.number_policy||{})}};
 SOURCE_COLLECTIONS.set(namespace.id,{...namespace,...previous,museum:previous?.museum||museum,code_rules:[...(previous?.code_rules||[]),rule]});
}
const SOURCE_WORKS=SOURCE_VOCABULARY.literary.works.map(item=>({...item,id:item.existing_corpus_id||'work:'+item.id,sourceWorkId:item.id,kind:'work',proxyCorpus:!!item.existing_corpus_id,label:item.label_fr,queries:item.existing_corpus_id?[]:[...new Set([...item.aliases,item.label_fr,item.label_en])],evidence:item.evidence||item.aliases}));
const sourceTypographicForms=forms=>[...new Set(forms.flatMap(form=>[form,form.replace(/([\p{L}])\s+(?=[\p{N}])/gu,'$1')]))];
const SOURCE_WITNESSES=SOURCE_VOCABULARY.literary.entries.map(item=>({...item,id:'witness:'+item.id,sourceWitnessId:item.id,kind:'witness',label:item.label_fr,queries:sourceTypographicForms([...item.aliases,item.label_fr,item.label_en]),evidence:sourceTypographicForms(item.evidence||item.aliases)}));
const SOURCE_DEFINITIONS=[
 ...[...SOURCE_MUSEUMS,...SOURCE_LIBRARY_MUSEUMS].map(item=>({...item,id:'museum:'+item.id,kind:'museum',label:item.label_fr,queries:[...new Set([...item.aliases,item.label_fr,item.label_en])],evidence:item.aliases})),
 ...[...SOURCE_COLLECTIONS.values()].map(item=>({...item,id:'collection:'+item.id,kind:'collection',label:item.label_fr,queries:[...new Set([...(item.query_codes||[]),item.label_fr,item.label_en])],evidence:[item.label_fr,item.label_en],strictQueryCodes:item.query_codes||[]})),
 ...SOURCE_WORKS,...SOURCE_WITNESSES,
];
const SOURCE_WORK_BY_ID=new Map(SOURCE_WORKS.map(item=>[item.sourceWorkId,item]));
const SOURCE_HIERARCHY=[
 ...[...SOURCE_COLLECTIONS.values()].map(item=>['museum:'+item.museum,'collection:'+item.id]),
 ...SOURCE_WITNESSES.flatMap(item=>[...(item.parents||[]).map(parent=>['witness:'+parent,item.id]),...(item.work_ids||[]).map(work=>[SOURCE_WORK_BY_ID.get(work)?.id,item.id]),...(item.inventory_refs||[]).map(ref=>['collection:'+ref.collection,item.id])]),
].filter(([left])=>left);
const SOURCE_WORK_SCOPES={harris500:{joppa:'verso','doomed-prince':'verso','love-poetry-harris500':'recto'},'chester-beatty1':{'horus-seth':'recto'}};
function inventoryText(value){return String(value||'').normalize('NFKC').replace(/[٠-٩۰-۹]/gu,char=>String(char.charCodeAt(0)-(char<='٩'?0x660:0x6f0))).replace(/[\u00a0\u202f]/gu,' ');}
function inventoryOriginalOffset(value,offset){let left=0,right=value.length;while(left<right){const middle=(left+right)>>1;if(inventoryText(value.slice(0,middle)).length>=offset)right=middle;else left=middle+1;}return left;}
function canonicalInventoryNumber(value,collection){
 const policy=SOURCE_COLLECTIONS.get(collection)?.number_policy||{};let text=inventoryText(value).trim();
 text=text.replace(/\s+/gu,' ').replace(/(\d)\s+(?=[A-Za-z](?:$|[,/]))/gu,'$1');
 if(policy.normalize_space_around_separators!==false)text=text.replace(/\s*([.,/\-–])\s*/gu,'$1');
 if(policy.normalize_space_after_series_prefix||collection==='leiden-papyrus')text=text.replace(/^I\s*(?=\d)/u,'I ');
 return text;
}
function inventoryId(collection,number,side=''){return 'inventory:'+collection+':'+encodeURIComponent(canonicalInventoryNumber(number,collection))+(side?':'+side:'');}
const SOURCE_REFERENCE_RULES=[...SOURCE_COLLECTIONS.values()].flatMap(collection=>(collection.code_rules||[]).flatMap(rule=>[...new Set([...(rule.codes||[]),...(collection.query_codes||[]).filter(code=>(rule.codes||[]).some(base=>code.length>base.length&&code.endsWith(base)))])].map(code=>{
 const escaped=inventoryText(code).replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/gu,'\\s*');
 const pattern=`(?<![\\p{L}\\p{N}])${escaped}\\s*(?:no\\.?\\s*)?(?<number>${rule.number_pattern})(?![\\p{L}\\p{N}])`;
 return {collection:collection.id,museum:collection.museum,rule,code,regex:new RegExp(pattern,rule.evidence_case==='insensitive'?'giu':'gu'),queryRegex:new RegExp(pattern,'giu'),anchors:(rule.requires_context||[]).map(fold),excluded:(rule.excluded_contexts||[]).map(fold)};
}))).sort((a,b)=>b.code.length-a.code.length);
function explicitReferenceSide(value){
 // Les abréviations n'ont ce sens que directement après une référence qualifiée.
 const match=String(value).match(/^\s*[,;:]?\s*\(?\s*(recto|verso|r[.°º]|v[.°º]|ro|vo|r|v)(?![\p{L}\p{N}])\s*\)?/iu);
 return match?{side:/^r/iu.test(match[1])?'recto':'verso',length:match[0].length}:null;
}
function sourceRawOffset(text,position){
 let left=0,right=text.length;while(left<right){const middle=(left+right)>>1;if(fold(text.slice(0,middle)).length>position)right=middle;else left=middle+1;}return Math.max(0,left-1);
}
function sourceLocalContext(text,start,end,window=180){
 const before=text.slice(Math.max(0,start-window),start).split(/[;!?\n]|[.]\s+(?=[A-ZÀ-Ý])/u).at(-1);
 const after=text.slice(end,end+window).split(/[;!?\n]|[.]\s+(?=[A-ZÀ-Ý])/u)[0];return before+' '+text.slice(start,end)+' '+after;
}
function sourcePartialNumber(tail){return /^(?:[./\-–]\s*\d|[./\-–][\p{L}]|,\s*\d|,[\p{L}])/u.test(tail);}

const SOURCE_MUSEUM_ANCHORS=[...SOURCE_MUSEUMS,...SOURCE_LIBRARY_MUSEUMS].flatMap(museum=>museum.aliases.map(alias=>({museum:museum.id,alias:fold(alias)})));
function sourceAnchorDistance(local,position,anchors){let distance=Infinity;for(const alias of anchors){let at=-1;while((at=local.indexOf(alias,at+1))>=0){if((at&&local[at-1]!==' ')||(at+alias.length<local.length&&local[at+alias.length]!==' '))continue;distance=Math.min(distance,position<at?at-position:Math.max(0,position-at-alias.length));}}return distance;}
function sourceReferenceExpressions(value,query=false){
 const original=String(value||''),text=inventoryText(original),candidates=[];
 for(const item of SOURCE_REFERENCE_RULES)for(const match of text.matchAll(query?item.queryRegex:item.regex)){
  let number=match.groups.number,side='';let end=match.index+match[0].length;
  const after=text.slice(end);
  // Ne pas transformer un sous-identifiant non pris en charge en l'identifiant parent.
  if(sourcePartialNumber(after))continue;
  if(/\s[a-z]$/u.test(number)&&/^\s+[\p{L}]/u.test(after))continue;
  const embedded=number.match(/\s+(recto|verso|ro|vo|r[.°º]?|v[.°º]?)$/iu);
  if(embedded){side=/^r/iu.test(embedded[1])?'recto':'verso';number=number.slice(0,-embedded[0].length);}
  const explicit=explicitReferenceSide(after);if(explicit){side=explicit.side;end+=explicit.length;}
  const before=text.slice(Math.max(0,match.index-(item.rule.context_window||140)),match.index),tail=text.slice(end,end+(item.rule.context_window||140));
  // Un contexte d'une autre clause ne qualifie pas le code fragile qui suit.
  const localBefore=before.split(/[;!?\n]/u).at(-1),local=fold(localBefore+' '+match[0]+' '+tail.split(/[;!?\n]/u)[0]),position=fold(localBefore).length;
  const contextDistance=sourceAnchorDistance(local,position,item.anchors);
  if(item.anchors.length&&SOURCE_MUSEUM_ANCHORS.some(anchor=>anchor.museum!==item.museum&&sourceAnchorDistance(local,position,[anchor.alias])<contextDistance))continue;
  const anchored=!item.anchors.length||item.anchors.some(anchor=>(` ${local} `).includes(` ${anchor} `));
  if(item.collection==='berlin-papyrus'&&/^P[.]?$/u.test(item.code)&&!SOURCE_MUSEUM_ANCHORS.some(anchor=>anchor.museum==='berlin'&&sourceAnchorDistance(local,position,[anchor.alias])<Infinity)&&!/(?:^|\b)Berlin\s*[,:(]?\s*(?:inv[.]?\s*)?$/iu.test(before))continue;
  if(!anchored||item.excluded.some(term=>(` ${local} `).includes(` ${term} `)))continue;
  if(/^Berlin$/u.test(item.code)&&/^(?:18|19|20)\d{2}$/u.test(number)&&!/(?:\binv\b|museum|musée|ägyptisches)/iu.test(local))continue;
  const rawStart=inventoryOriginalOffset(original,match.index),rawEnd=inventoryOriginalOffset(original,end);
  candidates.push({collection:item.collection,museum:item.museum,number:canonicalInventoryNumber(number,item.collection),side,start:rawStart,end:rawEnd,normalizedEnd:end,source:original.slice(rawStart,rawEnd),contextDistance,rule:item.rule,code:item.code});
 }
 candidates.sort((a,b)=>a.start-b.start||(b.end-b.start)-(a.end-a.start)||a.contextDistance-b.contextDistance||b.code.length-a.code.length);
 const found=[];
 for(const hit of candidates){if(found.some(old=>hit.start<old.end&&hit.end>old.start))continue;found.push(hit);
  const policy=SOURCE_COLLECTIONS.get(hit.collection)?.list_policy;
  if(policy?.inherit_prefix){let at=hit.normalizedEnd;for(let count=0;count<8;count++){
   const join=text.slice(at).match(/^\s*(et|and|und|&)\s+/iu);if(!join||join[0].length>(policy.max_gap||16))break;
   const number=text.slice(at+join[0].length).match(new RegExp(`^(?:${hit.rule.number_pattern})(?![\\p{L}\\p{N}])`,'u'));if(!number)break;
   const start=at+join[0].length,end=start+number[0].length;if(sourcePartialNumber(text.slice(end)))break;
   const rawStart=inventoryOriginalOffset(original,start),rawEnd=inventoryOriginalOffset(original,end);
   found.push({...hit,number:canonicalInventoryNumber(number[0],hit.collection),side:'',start:rawStart,end:rawEnd,normalizedEnd:end,source:original.slice(rawStart,rawEnd),inherited:true});at=end;
  }}
 }
 return found.sort((a,b)=>a.start-b.start);
}
function ensureInventoryConcept(ref){
 const id=inventoryId(ref.collection,ref.number,ref.side);if(CONTEXT_BY_ID.has(id))return id;
 if(ref.side)ensureInventoryConcept({...ref,side:''});
 const collection=SOURCE_COLLECTIONS.get(ref.collection),display=(collection?.query_codes?.[0]||collection?.codes?.[0]||collection?.label_fr||ref.collection)+' '+ref.number+(ref.side?' '+ref.side:'');
 const item={id,kind:'inventory',label:display,label_en:display,queries:[],evidence:[],collection:ref.collection,number:ref.number,side:ref.side||'',parents:[ref.side?inventoryId(ref.collection,ref.number):'collection:'+ref.collection]};
 CONTEXT_BY_ID.set(id,item);CONTROLLED_CONCEPTS.set(id,item);return id;
}
function ensureQualifiedWitness(entry,side){
 if(!side||entry.side===side)return entry.id;
 const id=entry.id+':'+side;if(!CONTEXT_BY_ID.has(id)){
 const item={...entry,id,label:entry.label+' '+side,label_en:(entry.label_en||entry.label)+' '+side,queries:[],evidence:[],qualifiedWitness:entry.id,side,parents:[entry.id]};CONTEXT_BY_ID.set(id,item);CONTROLLED_CONCEPTS.set(id,item);
 }return id;
}
function sourceQuery(id){
 const item=CONTEXT_BY_ID.get(id);if(!item)return '';
 if(item.kind==='inventory'){
  const collection=SOURCE_COLLECTIONS.get(item.collection),code=collection?.code_rules?.find(rule=>!rule.requires_context?.length)?.codes?.[0]||collection?.query_codes?.[0]||collection?.codes?.[0];
  return `${code||item.collection} ${item.number}${item.side?' '+item.side:''}`;
 }
 return LANGUAGE==='en'?(item.label_en||item.label):item.label;
}
function sourceEvidenceInto(text,direct){
 const add=(id,hit)=>{if(!direct.has(id))direct.set(id,[]);direct.get(id).push(hit);};
 const refs=sourceReferenceExpressions(text);
 for(const ref of refs){const id=ensureInventoryConcept(ref),hit={pos:fold(text.slice(0,ref.start)).length,surface:ref.source,section:null,kind:'inventory',reference:ref};add(id,hit);if(ref.side)add(ensureInventoryConcept({...ref,side:''}),hit);add('collection:'+ref.collection,hit);add('museum:'+ref.museum,hit);}
 // Les aliases nommés peuvent porter une face ; celle-ci reste une contrainte.
 for(const entry of SOURCE_WITNESSES){
  let hits=direct.get(entry.id)||[];
  const qualifying=hits.map(hit=>{
   const start=sourceRawOffset(text,hit.pos),end=sourceRawOffset(text,hit.pos+fold(hit.surface).length-1)+1;
   if(/\p{N}$/u.test(hit.surface)&&sourcePartialNumber(text.slice(end)))return null;
   if(entry.excluded_contexts?.some(term=>includesTerm(sourceLocalContext(text,start,end),term)))return null;
   const explicit=explicitReferenceSide(text.slice(end)),side=explicit?.side||entry.side||'';
   return {...hit,side};
  }).filter(hit=>hit&&(!entry.side||hit.side===entry.side));
  for(const ref of entry.inventory_refs||[])for(const actual of refs)if(actual.collection===ref.collection&&canonicalInventoryNumber(actual.number,ref.collection)===canonicalInventoryNumber(ref.number,ref.collection)&&(!ref.side||actual.side===ref.side))qualifying.push({pos:fold(text.slice(0,actual.start)).length,surface:actual.source,section:null,kind:'witness',side:actual.side||'',reference:actual});
  direct.set(entry.id,qualifying);
  for(const hit of qualifying){
   if(hit.side){const qualified=ensureQualifiedWitness(entry,hit.side);if(qualified!==entry.id)add(qualified,hit);}
   for(const ref of entry.inventory_refs||[]){if(ref.side&&hit.side!==ref.side)continue;add(ensureInventoryConcept({...ref,side:ref.side||hit.side||''}),hit);if(!ref.side)add(ensureInventoryConcept({...ref,side:''}),hit);add('collection:'+ref.collection,hit);const collection=SOURCE_COLLECTIONS.get(ref.collection);if(collection)add('museum:'+collection.museum,hit);}
   for(const workId of entry.work_ids||[]){const work=SOURCE_WORK_BY_ID.get(workId),scope=SOURCE_WORK_SCOPES[entry.sourceWitnessId]?.[workId];if(!work)continue;if(hit.side&&(scope?hit.side!==scope:!entry.side))continue;add(work.id,hit);}
  }
 }
 for(const work of SOURCE_WORKS)if(work.proxyCorpus){const original=CONTROLLED_CONCEPTS.get(work.id);if(original?.kind==='corpus')for(const hit of directConceptMentions(text,{concept:work.id}))add(work.id,hit);}
}

const CONTEXT_KINDS=new Set(['period','dynasty','place','museum','collection','witness','work','inventory']);
const CONTEXT_DEFINITIONS=[
  ...SOURCE_DEFINITIONS,
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
const CONTEXT_HIERARCHY=[...CONTEXT_DEFINITIONS.filter(item=>['period','dynasty','place'].includes(item.kind)).flatMap(item=>(item.parents||[]).map(parent=>[contextReference(parent,item.kind),item.id])),...SOURCE_HIERARCHY];
// Les liens œuvre/témoin servent à naviguer. Les preuves d'œuvre sont injectées
// séparément, en tenant compte de la face et du fragment attestés.
const CONTEXT_EVIDENCE_HIERARCHY=CONTEXT_HIERARCHY.filter(([parent])=>!SOURCE_WORKS.some(work=>work.id===parent));
const CONTEXT_ASSOCIATIONS=CONTEXT_DEFINITIONS.flatMap(item=>(item.related||[]).map(other=>[item.id,contextReference(other,item.kind)]));
const CONTEXT_EQUIVALENCES=CONTEXT_VOCABULARY.periods.flatMap(item=>(item.equivalent_dynasties||[]).map(number=>['period:'+item.id,'dynasty:'+number]));
const CONTEXT_BY_ID=new Map(CONTEXT_DEFINITIONS.map(item=>[item.id,item]));
const contextLiteral=form=>({surface:form,alias:fold(form)});
const CONTEXT_MATCHERS=CONTEXT_DEFINITIONS.map(item=>({id:item.id,evidence:item.evidence.map(contextLiteral),exclude:(item.exclude_evidence||[]).map(contextLiteral),rules:(item.contextual_evidence||[]).map(rule=>({...rule,form:contextLiteral(rule.form),requires:(rule.requires||[]).map(contextLiteral)}))}));
const CONTEXT_DESCENDANTS=new Map(CONTEXT_DEFINITIONS.map(item=>{
  const seen=new Set(),queue=[item.id];
  while(queue.length){const parent=queue.shift();for(const [from,to] of CONTEXT_EVIDENCE_HIERARCHY)if(from===parent&&!seen.has(to)){seen.add(to);queue.push(to);}}
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
  sourceEvidenceInto(text,direct);
  const all=new Map();
  for(const item of CONTEXT_DEFINITIONS){
    const found=new Map();
    for(const id of [item.id,...(CONTEXT_DESCENDANTS.get(item.id)||[])])for(const hit of direct.get(id)||[]){
      const key=hit.pos+':'+fold(hit.surface);
      if(!found.has(key))found.set(key,{...hit,evidenceConcept:id});
    }
    all.set(item.id,[...found.values()].sort((a,b)=>a.pos-b.pos));
  }
  for(const [id,hits] of direct)if(!all.has(id))all.set(id,hits);
  if(state.contextEvidence.size>=1600)state.contextEvidence.delete(state.contextEvidence.keys().next().value);
  state.contextEvidence.set(text,all);return all;
}
function contextQuery(id){
  const item=CONTEXT_BY_ID.get(id);if(!item)return '';
  if(['museum','collection','witness','work','inventory'].includes(item.kind))return sourceQuery(id);
  if(item.kind==='dynasty')return LANGUAGE==='en'?`${item.number}${item.number%100>=11&&item.number%100<=13?'th':({1:'st',2:'nd',3:'rd'}[item.number%10]||'th')} dynasty`:`${romanCentury(item.number)}${item.number===1?'re':'e'} dynastie`;
  return LANGUAGE==='en'?(item.label_en||item.label):item.label;
}
function updateContextRelations(plan){
  const section=$('context-relations'),wrap=$('context-related-chips'),note=$('context-relation-note');
  if(!section||!wrap||!note)return;
  const selected=new Set((plan?.groups||[]).map(group=>group.concept).filter(id=>CONTEXT_BY_ID.has(id))),links=new Map();
  const add=(id,relation)=>{if(!selected.has(id)&&CONTEXT_BY_ID.has(id)&&!links.has(id))links.set(id,{id,relation});};
  for(const [parent,child] of CONTEXT_HIERARCHY){if(selected.has(parent))add(child,'narrower');if(selected.has(child))add(parent,'broader');}
  for(const id of selected)for(const parent of CONTEXT_BY_ID.get(id)?.parents||[])if(parent.includes(':'))add(parent,'broader');
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
  note.textContent=(labels.length?t('Filtres actifs : {terms}.',{terms:labels.join(' · ')})+' ':'')+t('Ces filtres portent sur les périodes, lieux, musées et sources mentionnés dans les extraits. Ils se cumulent. Cliquez à nouveau pour retirer un filtre.');
  let any=false;
  for(const [kind,containerId,groupId,moreId] of [['period','period-filters','period-filter-group','period-more'],['place','place-filters','place-filter-group','place-more'],['source','source-filters','source-filter-group','source-more']]){
    const wrap=$(containerId),group=$(groupId),more=$(moreId);if(!wrap)continue;
    const pool=[...CONTEXT_DEFINITIONS,...[...selected].filter(id=>!CONTEXT_DEFINITIONS.some(item=>item.id===id)).map(id=>CONTEXT_BY_ID.get(id)).filter(Boolean)];
    const values=pool.filter(item=>(kind==='period'?['period','dynasty'].includes(item.kind):kind==='place'?item.kind==='place':['museum','collection','witness','work','inventory'].includes(item.kind))&&(selected.has(item.id)||candidates.has(item.id))&&item.facet!==false)
      .sort((a,b)=>Number(selected.has(b.id))-Number(selected.has(a.id))||(kind==='period'?CONTEXT_DEFINITIONS.indexOf(a)-CONTEXT_DEFINITIONS.indexOf(b):kind==='source'?(({'museum':0,'collection':1,'work':2,'witness':3,'inventory':4}[a.kind])-({'museum':0,'collection':1,'work':2,'witness':3,'inventory':4}[b.kind])||t(a.label).localeCompare(t(b.label),LANGUAGE)):t(a.label).localeCompare(t(b.label),LANGUAGE)));
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
  ...CONTEXT_DEFINITIONS.filter(item=>!item.proxyCorpus).map(item=>[item.id,item]),
  ...EGYPTIAN_CORPORA.map(item=>[item.id,{...item,kind:'corpus',queries:item.aliases,evidence:item.aliases}]),
  ...EGYPTIAN_POS.map(item=>['pos:'+item.id,{...item,id:'pos:'+item.id,kind:'grammar'}]),
  ...LANGUAGE_CONCEPTS.map(item=>['lang:'+item.id,{...item,id:'lang:'+item.id}]),
  ...GRAMMAR_SEARCH_CONCEPTS.map(item=>['grammar:'+item.id,{...item,id:'grammar:'+item.id,kind:'grammar',searchGroup:true}]),
]);
const CONCEPT_ALIASES=[...[...CONTROLLED_CONCEPTS.values()].flatMap(concept=>concept.queries.map(alias=>({alias:fold(alias),literal:alias,strictCase:(concept.kind==='grammar'&&/^[A-Z]{2,6}$/u.test(alias))||(concept.kind==='collection'&&concept.strictQueryCodes?.includes(alias)&&/^[A-Z]{1,6}$/u.test(alias)),concept:concept.id,searchGroup:!!concept.searchGroup}))),...SOURCE_WORKS.filter(work=>work.proxyCorpus).flatMap(work=>work.aliases.map(alias=>({alias:fold(alias),literal:alias,strictCase:false,concept:work.id,searchGroup:false})))]
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
  if(!group.section&&SOURCE_WORKS.some(work=>work.id===concept.id))return contextEvidenceFor(text).get(concept.id)||[];
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
  const references=new Map(sourceReferenceExpressions(query,true).map(ref=>[ref.start,ref]));
  const out=[];
  for(let i=0;i<parts.length;){
    const reference=references.get(parts[i].index);
    if(reference){out.push({source:reference.source,start:reference.start,phrase:true,concept:ensureInventoryConcept(reference)});do{i++;}while(i<parts.length&&parts[i].index<reference.end);continue;}
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
      if(concept.kind==='witness'){const end=parts[after-1].index+parts[after-1][0].length,side=explicitReferenceSide(String(query).slice(end));if(side){out.push({source:String(query).slice(parts[i].index,end+side.length),start:parts[i].index,phrase:true,concept:ensureQualifiedWitness(concept,side.side)});do{after++;}while(after<parts.length&&parts[after].index<end+side.length);i=after;continue;}}
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
// Recherche littérale : aucune équivalence, correction ou relation de concepts.
// La composition Unicode, la casse et les blancs sont les seules tolérances.
// Variantes proches : familles lexicales explicites et graphies, jamais thèmes,
// synonymes opaques, traduction entre écritures ou descendants d'un concept.
// Les flexions ne sont pas produites par une règle générale de troncature.
const CLOSE_VARIANT_FAMILIES=[
 ['etymology','etymologies','etymological','etymologically','étymologie','étymologies','étymologique','étymologiques','étymologiquement'],
 ['morphology','morphologies','morphological','morphologically','morphologie','morphologies','morphologique','morphologiques','morphologiquement'],
 ['phonetic','phonetics','phonetically','phonétique','phonétiques','phonétiquement'],
 ['phonology','phonologies','phonological','phonologically','phonologie','phonologies','phonologique','phonologiques'],
 ['orthography','orthographies','orthographic','orthographical','orthographically','orthographe','orthographes','orthographique','orthographiques','orthographiquement'],
 ['graphie','graphies','graphique','graphiques','graphiquement','graphic','graphically'],
 ['linguistic','linguistics','linguistically','linguistique','linguistiques','linguistiquement'],
 ['hieroglyph','hieroglyphs','hieroglyphic','hieroglyphics','hiéroglyphe','hiéroglyphes','hiéroglyphique','hiéroglyphiques'],
 ['grammaticalisation','grammaticalisations','grammaticaliser','grammaticalization','grammaticalizations','grammaticalize','grammaticalizes','grammaticalized','grammaticalizing','grammaticalise','grammaticalised','grammaticalising'],
 ['nominaliseur','nominaliseurs','nominalizer','nominalizers','nominaliser','nominalisers'],
 ['nominalisation','nominalisations','nominalization','nominalizations'],
 ['participe','participes','participle','participles','participial','participiale','participiales','participiaux'],
 ['infinitif','infinitifs','infinitive','infinitives','infinitival'],
 ['pronom','pronoms','pronoun','pronouns','pronominal','pronominale','pronominales','pronominaux'],
 ['verbe','verbes','verb','verbs','verbal','verbale','verbales','verbaux','verbally'],
 ['nom','noms'],['noun','nouns'],
 ['copte','coptes','coptic','copta','copto'],
 ['grec','grecs','grecque','grecques','greek'],
 ['égyptien','égyptiens','égyptienne','égyptiennes','egyptian','egyptians'],
 ['égyptologie','égyptologique','égyptologiques','egyptology','egyptological'],
 ['égyptologue','égyptologues','egyptologist','egyptologists'],
 ['bibliographie','bibliographies','bibliographique','bibliographiques','bibliography','bibliographic','bibliographical','bibliographically'],
 ['translittération','translittérations','transliteration','transliterations','translittérer','transliterate','transliterates','transliterated','transliterating'],
 ['papyrus','papyri'],['manuscrit','manuscrits','manuscript','manuscripts'],
 ['stèle','stèles','stele','steles','stela','stelae'],['statue','statues'],
 ['ouvrier','ouvriers','ouvrière','ouvrières'],['worker','workers'],
 // Noms propres : graphies du même nom, pas lieux ou personnages associés.
 ['Saqqara','Saqqarah','Sakkara','Sakkarah'],['Giza','Gizeh','Gizah'],
 ['Abousir','Abusir'],['Dahchour','Dahshur'],['Dendara','Dendera','Dendérah'],
 ['Louqsor','Louksor','Luxor'],['Thèbes','Thebes'],['Abydos','Abidos'],
 ['Caire','Cairo'],['Plutarque','Plutarch'],
];
function variantPlainWord(value){
 return String(value||'').normalize('NFD').replace(/\u0345/gu,'ι').replace(/\p{M}/gu,'').replace(/ـ/gu,'').replace(/[ىی]/gu,'ي').replace(/ک/gu,'ك').toLowerCase().replace(/[ςϲ]/gu,'σ');
}
const CLOSE_VARIANT_BY_WORD=new Map();
for(let index=0;index<CLOSE_VARIANT_FAMILIES.length;index++)for(const form of CLOSE_VARIANT_FAMILIES[index]){
 const key=variantPlainWord(form),previous=CLOSE_VARIANT_BY_WORD.get(key);
 if(previous!==undefined&&previous!==index)throw Error('Familles de variantes ambiguës : '+form);
 CLOSE_VARIANT_BY_WORD.set(key,index);
}
function variantEgyptianKey(value,markedOnly=false){
 const nfc=String(value||'').normalize('NFC');
 const marked=/[ꜣꜢꜥꜤȝȜʿʕˁʾʔʼʻꞽꞼỉḥḤḫḪẖśŚšŠṯṮṱṰṭṬčČḏḎḳḲïÏ\u032F]/u.test(nfc);
 // Les capitales de MdC ne sont pas la casse d'un mot ordinaire.
 const mdc=!markedOnly&&/^[A-Za-z]{2,8}$/u.test(nfc)&&(/[a-z][AHXSTD][a-z]/u.test(nfc)||(/^[AHXSTD][a-z]{2,7}$/u.test(nfc)&&!/[aeiou]/iu.test(nfc)));
 if(!marked&&!mdc)return null;
 let key=nfc.replace(/[iI]\u032F/gu,'I').replace(/[uU]\u032F/gu,'U').replace(/[Hh][\u0331\u032d]/gu,'ẖ').replace(/[čČ]\u0323/gu,'ḏ')
  .replace(/[ꜣꜢȝȜ]/gu,'A').replace(/[ʾʔʼ]/gu,'E').replace(/[ꜥꜤʿʕˁʻ]/gu,'a').replace(/[ꞽꞼỉ]/gu,'j')
  .replace(/[ḥḤ]/gu,'H').replace(/[ḫḪ]/gu,'x').replace(/ẖ/gu,'X').replace(/[śŚ]/gu,'s').replace(/[šŠ]/gu,'S')
  .replace(/[ṯṮṱṰčČ]/gu,'T').replace(/[ṭṬ]/gu,'d').replace(/[ḏḎ]/gu,'D').replace(/[ïÏ]/gu,'V').replace(/[ḳḲ]/gu,'q').replace(/3/gu,'A');
 if(/[^A-Za-z0-9]/u.test(key))return 'marked:'+nfc;
 return 'egypt:'+Array.from(key,char=>'AHXSTDIUVE'.includes(char)?char:char.toLowerCase()).join('');
}
function variantWordKey(value){
 const marked=variantEgyptianKey(value,true);if(marked)return marked;
 const plain=variantPlainWord(value),family=CLOSE_VARIANT_BY_WORD.get(plain);
 if(family!==undefined)return 'family:'+family;
 return variantEgyptianKey(value)||'literal:'+plain;
}
const CLOSE_VARIANT_TEXT_CACHE=new Map();
let closeVariantCorpus;
function variantTokens(value){
 const corpus=typeof state!=='undefined'?state.corpus:null;
 if(corpus!==closeVariantCorpus){CLOSE_VARIANT_TEXT_CACHE.clear();closeVariantCorpus=corpus;}
 const text=String(value||'');if(CLOSE_VARIANT_TEXT_CACHE.has(text))return CLOSE_VARIANT_TEXT_CACHE.get(text);
 const tokens=[];
 for(const match of text.matchAll(/[\p{L}\p{M}\p{N}]+|\s+|[^\p{L}\p{M}\p{N}\s]/gu)){
  const raw=match[0],kind=/^[\p{L}\p{M}\p{N}]/u.test(raw)?'word':/^\s/u.test(raw)?'space':'punct';
  const key=kind==='word'?variantWordKey(raw):kind==='space'?' ':raw.replace(/[’‘]/gu,"'").replace(/[‐‑]/gu,'-');
  tokens.push({kind,key,start:match.index,end:match.index+raw.length});
 }
 if(CLOSE_VARIANT_TEXT_CACHE.size>=900)CLOSE_VARIANT_TEXT_CACHE.delete(CLOSE_VARIANT_TEXT_CACHE.keys().next().value);
 CLOSE_VARIANT_TEXT_CACHE.set(text,tokens);return tokens;
}
function variantMatches(text,query){
 text=String(text||'');const wanted=variantTokens(String(query||'').trim());if(!wanted.length)return [];
 const tokens=variantTokens(text),hits=[];
 for(let at=0;at<=tokens.length-wanted.length;at++){
  if(tokens[at].kind!==wanted[0].kind||tokens[at].key!==wanted[0].key)continue;
  let matches=true;for(let offset=1;offset<wanted.length;offset++)if(tokens[at+offset].kind!==wanted[offset].kind||tokens[at+offset].key!==wanted[offset].key){matches=false;break;}
  if(matches){const first=tokens[at],last=tokens[at+wanted.length-1],before=tokens[at-1],after=tokens[at+wanted.length];
   // Un numéro à l'intérieur d'un numéro composé n'est pas son identifiant.
   const numberStart=/\d/u.test(text.slice(first.start,first.end)),numberEnd=/\d/u.test(text.slice(last.start,last.end));
   if(numberStart&&before?.kind==='punct'&&/[.,/\-–]/u.test(before.key)&&before.end===first.start&&/\d/u.test(text.slice(tokens[at-2]?.start,before.start)))continue;
   if(numberEnd&&after?.kind==='punct'&&/[.,/\-–]/u.test(after.key)&&after.start===last.end&&tokens[at+wanted.length+1]?.kind==='word'&&tokens[at+wanted.length+1].start===after.end)continue;
   const start=first.start,end=last.end;hits.push({start,end,surface:text.slice(start,end)});at+=wanted.length-1;}
 }
 return hits;
}
function variantScores(query){
 return state.corpus.passages.map(passage=>[passage.id,variantMatches(passage.text,query).length]).filter(([,count])=>count).sort((a,b)=>b[1]-a[1]);
}
function variantForms(query,passages){
 const forms=new Map();for(const passage of passages||state.corpus.passages)for(const hit of variantMatches(passage.text,query)){
  const key=hit.surface.normalize('NFC').toLowerCase();if(!forms.has(key))forms.set(key,{surface:hit.surface,count:0});forms.get(key).count++;
 }
 return [...forms.values()].sort((a,b)=>b.count-a.count).map(item=>item.surface);
}
function variantLexicalForms(query){
 const value=String(query||'').trim();if(!/^[\p{L}\p{M}\p{N}]+$/u.test(value)||variantEgyptianKey(value,true))return [];
 const family=CLOSE_VARIANT_BY_WORD.get(variantPlainWord(value));return family===undefined?[]:[...new Set(CLOSE_VARIANT_FAMILIES[family])];
}

function exactPattern(query){
  const value=String(query||'').normalize('NFD').trim();if(!value)return null;
  const word=/[\p{L}\p{N}\p{M}]/u,characters=Array.from(value);
  const escaped=value.split(/(\s+)/u).map(part=>/^\s+$/u.test(part)?'\\s+':part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('');
  return new RegExp((word.test(characters[0])?'(?<![\\p{L}\\p{N}\\p{M}])':'')+escaped+(word.test(characters.at(-1))?'(?![\\p{L}\\p{N}\\p{M}])':''),'giu');
}
let exactSegmenter;
function exactOffsets(text){
  if(exactSegmenter===undefined)exactSegmenter=typeof Intl!=='undefined'&&typeof Intl.Segmenter==='function'?new Intl.Segmenter(undefined,{granularity:'grapheme'}):null;
  const starts=[],ends=[],parts=exactSegmenter?exactSegmenter.segment(text):Array.from(text.matchAll(/\P{M}\p{M}*|\p{M}+/gu),match=>({segment:match[0],index:match.index}));
  for(const part of parts){const normalized=part.segment.normalize('NFD');for(let index=0;index<normalized.length;index++){starts.push(part.index);ends.push(part.index+part.segment.length);}}
  return {starts,ends};
}
function exactMatches(text,query){
  const pattern=exactPattern(query);if(!pattern)return [];
  text=String(text||'');const normalized=text.normalize('NFD'),hits=[];let offsets=null;
  for(const match of normalized.matchAll(pattern)){
    if(normalized!==text&&!offsets)offsets=exactOffsets(text);
    const start=offsets?offsets.starts[match.index]:match.index,end=offsets?offsets.ends[match.index+match[0].length-1]:match.index+match[0].length;
    hits.push({start,end,surface:text.slice(start,end)});
  }
  return hits;
}
function exactScores(query){
  return state.corpus.passages.map(passage=>[passage.id,exactMatches(passage.text,query).length]).filter(([,count])=>count).sort((a,b)=>b[1]-a[1]);
}
function getSearchMatchMode(){
  return $('match-exact')?.checked?'exact':$('match-variants')?.checked?'variants':'expanded';
}
function updateSearchMatchHelp(){
  const mode=getSearchMatchMode(),note=$('search-match-help');if(!note)return;
  note.textContent=t(mode==='exact'?'Sans équivalences. Majuscules ignorées, accents conservés.':mode==='variants'?'Variantes graphiques et formes proches répertoriées, sans associations thématiques.':'Inclut les variantes et certaines équivalences.');
}
function highlightSearchMatch(node,text,query,mode){
  const primary=mode==='variants'?variantMatches(text,query):exactMatches(text,query);
  const spans=[...primary,...state.keywordRefinements.flatMap(term=>exactMatches(text,term))].sort((a,b)=>a.start-b.start||b.end-a.end),merged=[];
  for(const span of spans){const previous=merged.at(-1);if(previous&&span.start<previous.end)previous.end=Math.max(previous.end,span.end);else merged.push({...span});}
  let at=0;for(const span of merged){node.append(document.createTextNode(text.slice(at,span.start)));const mark=document.createElement('mark');mark.textContent=text.slice(span.start,span.end);node.append(mark);at=span.end;}node.append(document.createTextNode(text.slice(at)));
}
function changeSearchMatchMode(){
  updateSearchMatchHelp();if(state.running||!state.corpus)return;
  if($('theme-input').value.trim()){runSearch();return;}
  state.matchMode=getSearchMatchMode();state.exact=state.matchMode==='exact';state.search='';state.plan=null;state.result=[];state.baseResult=[];state.activeTerms=[];state.keywordRefinements=[];state.contextRefinements=[];state.contextExpanded={period:false,place:false,source:false};state.filter='all';state.visibleCount=18;
  updateGrammarRelations(null);updateContextRelations(null);drawKeywordChips();drawChips('topic-chips',[]);$('topic-analysis').hidden=true;$('query-corrections').hidden=true;
  for(const button of document.querySelectorAll('[data-filter]')){const active=button.dataset.filter==='all';button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));}
  render();
}

function buildPlan(query,mode='expanded'){
  if(mode==='exact'||mode==='variants')return {exact:mode==='exact',variants:mode==='variants',matchMode:mode,query,groups:[{source:query,terms:[query],coreTerms:[query],egyptKeys:[]}],terms:[query],topics:[{label:query}],corrections:[],relations:[]};
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
      else if(CONTEXT_KINDS.has(concept.kind))corrections.push(`${source} → ${t(concept.label)} (${t(concept.kind==='period'?'période historique':concept.kind==='dynasty'?'dynastie':concept.kind==='place'?'lieu / site':concept.kind==='museum'?'musée':concept.kind==='collection'?'catalogue':concept.kind==='work'?'œuvre littéraire':concept.kind==='witness'?'témoin':'référence d’inventaire')})`);
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
    const suggestions=[...new Set([...egyptAliases,...curated,...variantLexicalForms(source).flatMap(words)])];
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
  return {groups,terms,topics,corrections,relations:queryRelations(query,groups),matchMode:'expanded'};
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
  if(plan?.exact||plan?.variants)return lexical.map(([id,score])=>({id,score}));
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
    const egyptEvidence=state.plan?.exact||state.plan?.variants?[]:(state.plan?.groups||[]).flatMap(g=>(g.egyptKeys||[]).flatMap(key=>state.egyptianIndex.get(key)?.byId.get(item.id)?.map(hit=>hit.raw)||[]));
    const corpusEvidence=state.plan?.exact||state.plan?.variants?[]:[...(state.plan?.groups||[]),...state.contextRefinements.map(concept=>({concept}))].flatMap(g=>g.concept?conceptMentions(item.text,g).map(hit=>hit.surface):[]);
    const keys=[...new Set([...words(state.search),...state.activeTerms,...egyptEvidence,...corpusEvidence.slice(0,10)])];
    const evidence=state.plan?.exact||state.plan?.variants?[...new Set((state.plan.variants?variantMatches(item.text,state.search):exactMatches(item.text,state.search)).map(hit=>hit.surface))]:[...new Set([...state.keywordRefinements,...corpusEvidence,...egyptEvidence,...(state.plan?.groups||[]).map(g=>g.terms.find(term=>includesTerm(item.text,term))).filter(Boolean)])];
    if(evidence.length){const why=document.createElement('div');why.className='source-meta';why.textContent=t('Indices présents dans cet extrait : {terms}{more}',{terms:evidence.slice(0,6).join(' · '),more:evidence.length>6?'…':''});card.append(why);}
    const excerpt=document.createElement('blockquote');excerpt.dir='auto';if(state.plan?.exact||state.plan?.variants)highlightSearchMatch(excerpt,item.text,state.search,state.plan.matchMode);else highlight(excerpt,item.text,keys);card.append(excerpt);const bar=document.createElement('div');bar.className='source-links';const link=document.createElement('a');link.textContent=t('Vérifier sur le PDF ↗');const url=pdfURL(item);if(url){link.href=url;link.target='_blank';link.rel='noopener noreferrer';}else{link.textContent=t('PDF à renseigner');}
    const copy=document.createElement('button');copy.type='button';copy.textContent=t('Copier l’extrait et la référence');copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`${reference(item)}\n${t('« {text} »',{text:item.text})}`);copy.textContent=t('Référence copiée ✓');setTimeout(()=>copy.textContent=t('Copier l’extrait et la référence'),2000);}catch{copy.textContent=t('Copie indisponible');}});bar.append(link,copy);card.append(bar);wrap.append(card);
  }
}

function updateSearchControls(){
  const unavailable=!state.corpus;
  $('search-button').disabled=unavailable||state.running;
  for(const id of ['match-expanded','match-variants','match-exact'])if($(id))$(id).disabled=unavailable||state.running;
  updateSearchMatchHelp();
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
  if(plan.variants)plan.terms=variantForms(query,state.baseResult);
  state.activeTerms=plan.terms;state.plan=plan;
  updateGrammarRelations(plan);updateContextRelations(plan);
  applyKeywordRefinements();
  drawChips('topic-chips',plan.topics.length?plan.topics.map(topic=>t(topic.label)):[t('Terme attesté dans le corpus')]);

  const corrections=$('query-corrections');if(corrections){corrections.hidden=!plan.exact&&!plan.variants&&!plan.corrections.length;corrections.textContent=plan.exact?t('Recherche exacte : « {query} ». Aucun élargissement aux équivalences.',{query}):plan.variants?t('Recherche avec variantes proches : « {query} ». Sans associations thématiques.',{query})+(plan.terms.length?' '+t('Formes attestées : {forms}.',{forms:plan.terms.slice(0,12).join(' · ')}):''):plan.corrections.length?t('Graphies et termes rapprochés : {terms}.',{terms:plan.corrections.join(' ; ')}):'';}
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
  const mode=getSearchMatchMode();
  if(query!==state.search||mode!==state.matchMode){state.keywordRefinements=[];state.contextRefinements=[];state.contextExpanded={period:false,place:false,source:false};}
  state.running=true;state.search=query;state.matchMode=mode;state.exact=mode==='exact';updateSearchControls();
  $('method-status').hidden=true;
  try{
    const plan=buildPlan(query,mode),lex=mode==='exact'?exactScores(query):mode==='variants'?variantScores(query):lexicalScores(query,plan.terms,plan);
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
for(const id of ['match-expanded','match-variants','match-exact'])$(id)?.addEventListener('change',changeSearchMatchMode);
for(const button of document.querySelectorAll('[data-example]'))button.addEventListener('click',()=>{if(state.running||!state.corpus)return;$('theme-input').value=button.dataset.example;runSearch();});
for(const button of document.querySelectorAll('[data-filter]'))button.addEventListener('click',()=>{state.filter=button.dataset.filter;state.visibleCount=18;for(const b of document.querySelectorAll('[data-filter]')){const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));}render();});
$('more-results').addEventListener('click',()=>{state.visibleCount+=18;render();});
init();
