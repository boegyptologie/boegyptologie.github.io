# Maintenir les métadonnées de BOE

`metadata.json` regroupe les identités de la revue et de son éditeur, les membres des comités et leurs sources, les descriptions par langue et les données bibliographiques. `generate.py` reporte ces données dans le code HTML statique. Il fonctionne avec Python 3.10 ou supérieur et sa bibliothèque standard. Les moteurs reçoivent les données dans le HTML initial.

1. Pour une nouvelle publication, préparer la notice et le lecteur HTML selon la structure existante. Donner une URL canonique propre à chaque page et conserver la langue du texte. Les deux pages représentent le même travail identifié par un seul DOI et un seul `@id` d’article.
2. Ajouter une entrée dans `articles` à partir des informations validées dans le fascicule et le dépôt Zenodo. Reprendre le titre intégral, les auteurs dans leur ordre, la date réelle, le volume, le numéro, les pages, le DOI, la licence et le genre. Utiliser les mots-clés de la publication. Copier le résumé de l’auteur dans la langue d’origine.
3. Vérifier que le PDF correspond à la bonne version. Pour le pilote U 23, conserver le PDF local allégé et le DOI Zenodo. Pour les autres textes, indiquer le PDF d’archive. Un PDF sur un autre domaine ou au-delà de 5 Mo ne remplit pas les conditions de découverte du PDF décrites par Scholar. Si une copie locale adaptée est publiée, documenter son rapport au PDF d’archive avant de changer le lien dans la citation.
4. Actualiser les listes du site et les plans de site selon le flux éditorial habituel. Ajouter les deux URL canoniques au plan général et au plan des articles, puis ajouter une entrée à `feed.xml`. Mettre à jour `lastmod` pour les pages réellement modifiées.
5. Exécuter `python .github/seo/generate.py`, puis `python .github/seo/generate.py --check`. Examiner les différences, vérifier les PDF et les liens de lecture. Contrôler l’accessibilité des URL après le déploiement. Le workflow IndexNow existant transmet le plan public après un déploiement réussi.

Pour les comités, vérifier que les personnes figurent bien dans les pages publiques. Toujours documenter la source d’un ORCID ou d’un profil et placer l’affiliation sur la personne. Utiliser `alumniOf` pour un diplôme documenté et réserver `sameAs` aux identités univoques. Pour les changements de politique, réviser les descriptions de `policySections` à partir des sections FR et EN publiées.

Le balisage HTML est généré à partir des données communes. Les dates de publication, les DOI et les noms ne doivent pas être corrigés dans une seule copie du graphe.
