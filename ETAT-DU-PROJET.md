# État du projet — Warhammer, site et campagnes

> Document de reprise entre conversations. À lire avant toute intervention sur le site.
> Dernière mise à jour : 14 septembre 2026.

## Référence de travail

- Dernière livraison préparée : `Espace-MJ-seconde-passe-visuelle-20260914.zip`, depuis le dépôt au commit `0834eed`. Elle reprend l'accueil MJ avec les matières, la bannière impériale et les deux décors latéraux de l'accueil principal, puis remplace les cadres internes sobres par les ferrures patinées déjà validées dans l'accueil et les scénarios. Non publiée.
- Dernière livraison préparée : `Espace-MJ-harmonise-20260914.zip`, depuis le dépôt au commit `441b8ed774fe08e4954859ed5d89a6eb53cb448b`. Elle harmonise visuellement les 32 pages de `mj/` et `commun/mecaniques.html` avec la direction artistique validée du site, sans modifier leurs fonctions ni leurs données.
- Dernière livraison consolidée : `BDS-groupes-2-3-icones-consolidees-20260914.zip`, préparée depuis le dépôt au commit `6baf83595fa3c8339649fd32ce0f9f8351fd0efb`. Elle remplace les précédentes archives d’icônes et contient directement leur état le plus récent.
- Dépôt public : `https://github.com/grogndur/JDR-Warhammer`
- Site publié : `https://grogndur.github.io/JDR-Warhammer/index.html`
- Base intégrale examinée : `JDR-Warhammer-main.zip`, archive GitHub du commit `efca73f3ebcb39d22d3e3d222ee5c0bc89ee23e4`, reçue le 14 septembre 2026.
- L’archive a été testée intégralement : aucune erreur de compression.
- Elle contient 364 fichiers et constitue la référence générale actuelle, sauf lorsqu’un ZIP ultérieur est explicitement désigné comme plus récent.
- `Index Essai 1.zip` n’est plus une source séparée à appliquer : son accueil est déjà intégré à cette base.
- `Index Maquette 1.png` reste la référence visuelle validée de l’accueil.

## Méthode impérative

- Toujours partir de cette base intégrale, du dépôt s’il est plus récent, ou du dernier ZIP explicitement désigné comme plus récent.
- Ne jamais repartir d’un ancien fichier isolé sans vérifier sa position dans cet état.
- Préserver toutes les fonctionnalités et données existantes, sauf demande contraire explicite.
- Guillaume dirige les choix artistiques, le contenu et l’expérience de jeu ; ChatGPT prend en charge les décisions techniques, l’implémentation et les vérifications.
- Livrer uniquement les fichiers nécessaires, dans un ZIP prêt à déposer en conservant leur arborescence.
- Guillaume effectue lui-même l’upload, le commit et le push.
- Aucune publication ou modification du site accessible aux joueurs sans validation explicite de Guillaume.
- Ne jamais modifier Firebase, les droits, les chemins de données ou les sauvegardes des fiches sans signaler préalablement le risque.
- Mettre ce document à jour après chaque étape importante. Utiliser `SUIVI.md` pour le compte rendu technique concis des travaux effectivement terminés.

## Architecture constatée

| Partie | Fichiers principaux | État connu |
| --- | --- | --- |
| Accueil | `index.html`, `assets/accueil/` | Intégré, validé et publication autorisée le 10 septembre 2026 |
| Portail L’Éclipse | `eclipse/index-eclipse.html` | Présent ; donne accès à Azart, Denl’Endri et Sareth |
| Portail De Boue et de Sang | `bds/index-bds.html` | Présent ; donne accès aux groupes 1, 2 et 3 |
| Pages des groupes | `bds/groupe-1.html`, `groupe-2.html`, `groupe-3.html` | Présentes ; annuaire des personnages chargé depuis Firebase |
| Fiche commune | `commun/fiche.html`, `commun/modules/`, `assets/fiches/` | Présente ; une même fiche dynamique sert les personnages selon `?p=<identifiant>` |
| Table virtuelle | `table.html`, `assets/table/` | Présente ; liée aux fiches et à Firebase |
| Espace MJ | `mj/`, `commun/mecaniques.html` | Présent |
| Scénarios | `eclipse/scenario-eclipse.html`, `bds/scenario-bds.html`, `assets/scenarios/` | Présents |
| Galerie et médias | `gallerie/` | Présente ; cartes, portraits, illustrations et sons |

## Travail terminé et validé

### Accueil

- Accueil de la maquette intégré au site existant.
- Quatre destinations conservées : L’Éclipse, De Boue et de Sang, Table virtuelle et Espace MJ.
- Mécanisme d’accès MJ préservé.
- Ressources regroupées dans `assets/accueil/` sans remplacer les ressources partagées.
- Textes et aperçu privé validés par Guillaume.
- Publication autorisée le 10 septembre 2026.
- Le détail technique des vérifications se trouve dans `SUIVI.md`.

## Refonte des icônes des fiches — préparée, non publiée

Modification réalisée le 14 septembre 2026 pour les fiches BDS des groupes 2 et 3. Style illustré en bronze patiné conservé. Validation artistique et publication en attente de Guillaume.

Correspondances demandées :

- Blessures : rouleau de bandage et croix mieux détachés pour une lecture immédiate.
- Destin et Chance : comète à deux queues de Warhammer.
- Résilience et Détermination : flamme.
- Monnaie : bourse et pièces.
- Corruption, états et éléments associés : étoile du Chaos à huit branches.
- Magie et Prêtre : rayon venant d’en haut et descendant en biais, comme une décharge d’énergie.
- XP : courbe ascendante terminée par une flèche.
- Historique : plusieurs parchemins.
- Notes : un seul parchemin roulé.
- Compétences : moitié gauche d’une couronne de lauriers.
- Talents : moitié droite de la couronne de lauriers.
- Armes : fléau d’armes à pointes.
- CC : épées croisées.
- Initiative : éclair.
- Agilité : personnage sautant dans une pose dynamique.
- Dextérité : rouage précédemment employé pour l’Agilité.
- Intelligence : cerveau.
- Force Mentale : deux yeux fermés, légèrement froncés.

Contraintes :

- Appliquer la modification à toutes les fiches concernées des groupes 2 et 3.
- Ne pas perdre les données enregistrées des personnages.
- Préserver le fonctionnement des fiches, de la Table virtuelle et des portails de groupes.
- La fiche étant un composant commun, vérifier techniquement la portée des styles et des icônes afin de ne pas modifier involontairement le groupe 1 ou L’Éclipse.
- Tester au minimum l’affichage ordinateur et mobile ainsi que le chargement d’une fiche depuis chaque groupe concerné.
- Préparer les fichiers et les tests, mais ne rien publier sans une nouvelle validation explicite.

## État de publication et données

- L’accueil a reçu une autorisation explicite de publication le 10 septembre 2026.
- Aucune autorisation de publication n’est enregistrée ici pour la refonte actuelle des fiches.
- Les personnages et leurs fiches utilisent Firebase, notamment les chemins `personnages/<id>` et `fiches/<id>`.
- Les pages des groupes chargent leur annuaire depuis Firebase ; le ZIP du site ne contient donc pas à lui seul les valeurs actuelles de tous les personnages.
- Toute intervention graphique doit rester indépendante des données enregistrées.

## Reprise dans une nouvelle conversation

Phrase suffisante :

> Consulte les règles du projet et `ETAT-DU-PROJET.md`, puis pars de la dernière source de référence qui y est indiquée. Ne publie rien sans ma validation.

Si un ZIP plus récent que le dépôt est fourni, ajouter simplement :

> Le ZIP joint est plus récent que le dépôt et devient la source de travail pour cette étape.

## Livraison du 14 septembre 2026 — icônes BDS groupes 2 et 3

- Base effective : dépôt GitHub au commit `8cf0de43ea2f63ac1514fab4a875bf4ab9bd9f72`.
- ZIP livré : `BDS-groupes-2-3-icones-20260914.zip`. Il contient les versions plus récentes des six fichiers ci-dessous ; pour reprendre avant leur dépôt sur GitHub, appliquer ce ZIP à cette base.
- Fichiers : `assets/fiches/wymond.js`, `assets/fiches/wymond.css`, `assets/fiches/icons-bds-g23-20260914.png`, `commun/fiche.html`, `ETAT-DU-PROJET.md`, `SUIVI.md`.
- Nouvelle planche de seize motifs illustrés. CC reprend les épées croisées originales ; Dextérité reprend exactement le rouage original. Les raccourcis Compétences, Combat, Ressources et Notes utilisent les motifs correspondants.
- Portée conservée via la classe existante `fiche-wymond`, attribuée aux groupes 2 et 3. Dans `commun/fiche.html`, seuls les numéros de version des deux ressources graphiques changent pour éviter les anciennes versions en cache.
- Vérifications : huit ouvertures locales dans Chromium (groupes 2, 3, 1 et L’Éclipse, largeurs 1440 et 390 px), sans erreur JavaScript ; navigation depuis les portails 2 et 3 ; correspondances et absence de doublons après recalcul ; champs et sauvegardes simulées conservés ; captures ordinateur/mobile examinées.
- Limite : personnages fictifs et Firebase simulé, aucun essai ni aucune écriture dans la base réelle. Table et mécanismes de sauvegarde inchangés.
- Aucun commit, push ou déploiement effectué. Publication non autorisée à ce stade.

## À mettre à jour après la prochaine étape

- Espace MJ harmonisé par une feuille de style commune : cuir sombre, bronze patiné, cadres, typographies locales, contrastes et lisibilité rapprochés des portails et fiches. Les 33 pages concernées conservent leurs structures et scripts. Vérification locale de 66 vues (33 pages × ordinateur/mobile) et examen visuel des principaux gabarits. Correctif préparé, non publié.
- Inventaire : compteur de quantité placé après le nom et ses éventuelles pastilles. Notes de session : onglets persistants avec ajout, renommage et suppression ; l'ancien texte est automatiquement conservé dans « Partie 1 ». États actifs : tiret indicatif rétabli. Correctif préparé, non publié.
- Habillage actuel des fiches BDS groupes 2 et 3 étendu à L'Éclipse : même composition, icônes, lisibilité, bouton de retour en haut et comportements visuels. Le surtitre affiche « L'Éclipse ». Les chemins Firebase et les fonctions de sauvegarde restent inchangés. Correctif préparé, non publié.
- Lisibilité des fiches BDS groupes 2 et 3 harmonisée avec les Compétences : Talents, armes, armures, Inventaire et données de Mouvement agrandis. Le texte indicatif « Sonné, Exténué… » a été retiré sans modifier les états enregistrés. Correctif préparé, non publié.
- Bouton discret de retour en haut ajouté à gauche du cadre des fiches BDS groupes 2 et 3. Il apparaît après 420 px de défilement, remonte doucement en tête de fiche et se place en bas à gauche sur mobile. Il respecte la préférence de mouvements réduits et n’apparaît pas à l’impression. Modification préparée, non publiée.
- Libellé « Marche » remplacé par « Mouvement ». La planche des icônes a été nettoyée : les fragments de la rangée inférieure qui débordaient sous le parchemin et les deux lauriers ont été supprimés, sans retoucher les trois motifs. Version d’image actualisée pour éviter l’ancien cache. Livraison consolidée préparée, non publiée.
- Centrage des dix icônes de caractéristiques corrigé : marges latérales régulières, dimensions adaptées à la largeur des cases, ancrage vertical stable lorsque « Ajuster » est ouvert. Illustrations, valeurs et autres rubriques conservées. Vérification locale des groupes 2/3 à 1440, 1000, 390 et 320 px, sans erreur JavaScript ; captures examinées. Correctif préparé, non publié.
- Résultat de la refonte des icônes.
- Fichiers réellement modifiés.
- Vérifications effectuées et éventuelles limites restantes.
- Validation ou refus de publication par Guillaume.
- Nom du ZIP livré et nouvelle source de référence.

## Livraison du 14 septembre 2026 — seconde passe visuelle de l'espace MJ

- Base effective : dépôt GitHub au commit `0834eed`.
- L'accueil MJ reprend la composition visuelle de l'accueil principal : fond en cuir, bannière impériale, comète et marque Warhammer, ferrures patinées, décor de chaînes à gauche et drapé au crâne à droite sur grand écran.
- Les cartes du portail et les cadres internes des 33 pages concernées utilisent les matières et ferrures déjà présentes dans l'accueil et les scénarios ; adaptation mobile incluse.
- La version de la feuille commune est actualisée dans les 32 pages de `mj/` et dans `commun/mecaniques.html` afin d'éviter l'ancien cache.
- Contrôles : les 33 documents HTML sont analysables, la feuille CSS est structurellement valide, les sept ressources graphiques appelées sont présentes et les liens de version sont uniformes. Aucun chemin Firebase, script, contenu de campagne ni mécanisme de sauvegarde modifié.
- ZIP : `Espace-MJ-seconde-passe-visuelle-20260914.zip`. Aucun commit, push ou déploiement effectué ; publication non autorisée à ce stade.

### Correctif de superposition du cadre

- Le grand cadre fixe du pourtour est conservé à l'identique, mais replacé derrière les barres, commandes et panneaux ayant leur propre niveau d'affichage. Il ne traverse donc plus ponctuellement les titres, filtres ou boutons placés au bord de l'écran.
- Aucun changement des dimensions, de la texture ou du dessin du cadre. Version de la feuille commune actualisée sur les 33 pages concernées.
- Livraison corrective : `Correctif-cadre-espace-MJ-20260914.zip`, non publiée.
