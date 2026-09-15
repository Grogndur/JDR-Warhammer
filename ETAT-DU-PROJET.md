# État du projet — Warhammer, site et campagnes

> Document de reprise entre conversations. À lire avant toute intervention sur le site.
> Dernière mise à jour : 15 septembre 2026.

## Référence de travail

- Dernière livraison de contenu préparée : `BDS-Arc-I-consolidation-20260915.zip`, depuis GitHub au commit `7f01394eb5305cf2d4604b273d79748159aab5d8`. Seconde consolidation de 100 fiches sur 242, limitée à l’Arc I, à sa transition et aux profils/aides utilisés. Les 142 autres fiches restent identiques. Livraison non publiée, aucune écriture Firebase effectuée.
- La première correction du 14 septembre est bien dans cette base GitHub et dans les sections en ligne vérifiées le 15 septembre. Les mentions historiques « non publiée » décrivent l’état lors de leur livraison, pas leur état actuel.

- Dernière livraison préparée : `Fiches-bonus-attribut-60-pourcent-20260914.zip`. Elle fixe les libellés `B:3`, `B:4`, etc. à environ 60 % du score principal sur les fiches BDS groupes 2 et 3 et L'Éclipse, sans toucher au groupe 1 ni aux calculs. Non publiée.
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
- Livrer uniquement les fichiers à uploader, dans un ZIP prêt à déposer en conservant leur arborescence. Aucun fichier de notice, de rapport ou de consignes dans les livraisons : donner ces explications dans la conversation.
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

### Correctif ciblé accueil MJ et Grimoire

- Le cadre reste graphiquement inchangé. Une marge discrète lui est réservée : sur l'accueil MJ, elle le sépare du bloc central et des deux décors latéraux ; dans le Grimoire, elle le sépare de l'application complète.
- La correction est limitée à `mj/index-mj.html`, `mj/grimoire.html` et `assets/mj/harmonisation.css`. Aucun autre outil ni aucune donnée ne sont modifiés.
- Livraison : `Correctif-cadre-accueil-MJ-et-Grimoire-20260914.zip`, non publiée.

### Règle visuelle des grands décors latéraux

- Décision validée : lorsqu'une page emploie les grands décors de chaînes, drapés ou visuels latéraux issus de l'accueil principal et des scénarios, aucun cadre général de pourtour ne doit être affiché. Les visuels vont jusqu'aux bords de l'écran.
- Application à l'accueil MJ uniquement. La correction du Grimoire est conservée sans changement.
- Livraison : `Accueil-MJ-sans-cadre-exterieur-20260914.zip`, non publiée.

### Finition du fond et de la bannière de l'accueil MJ

- L'aplat noir qui créait une coupure nette derrière les décors latéraux est supprimé. L'accueil MJ reprend exactement la surface de fond de l'accueil principal : cuir sombre continu, opacité identique et halo fondu autour des chaînes.
- Le dessin du cadre de la bannière est conservé, mais son rendu est borné au rectangle de la bannière et son ombre externe supprimée afin d'éliminer les traits parasites visibles autour.
- Grimoire inchangé. Livraison : `Accueil-MJ-fond-et-cadre-nettoyes-20260914.zip`, non publiée.

## Livraison du 14 septembre 2026 — Bonus d'Attribut agrandis

- Les valeurs `B:3`, `B:4`, etc. sont ramenées à environ 60 % de la taille du score d'Attribut principal, avec une adaptation propre aux largeurs tablette et mobile.
- Portée limitée par la classe `fiche-wymond` : BDS groupes 2 et 3 et L'Éclipse. Le groupe 1 BDS conserve son affichage historique.
- Seuls le style et sa version de cache changent. Calcul automatique, HTML des Attributs, données Firebase et sauvegardes inchangés.
- Livraison corrective : `Fiches-bonus-attribut-60-pourcent-20260914.zip`, non publiée.


## Livraison du 14 septembre 2026 — Consolidation de BDS après audit

- Guillaume valide la correction de l’Arc I jusqu’à la transition vers l’Arc II incluse, ainsi que la neutralité du groupe. Aucun développement ultérieur n’est à compléter dans cette passe.
- Gariz est un chef gobelin de la nuit, sournois, intelligent et patient. Schattenfels est un ancien poste nain conquis par les peaux-vertes. Le Peseur reste risqué. Guérand survit, éventuellement grièvement blessé ; les autres morts et fuites ne sont pas imposées. Deu’Brez capturé communique par dessins, sa langue ayant été coupée.
- Contrats et conséquences sont explicités ; primes, butin, XP, calendrier, effectifs, portage, soins et témoignages sont raccordés. Le conseil relève toujours le désaccord de l’article 9. Les indices peuvent être compris tôt. Les scènes ne prescrivent ni composition de groupe ni émotions des PJ.
- La charnière propose un rythme court ou développé ; la conclusion montre les résultats obtenus. Le dénouement ultérieur de Vundri et les ébauches de l’Arc II restent ouverts.
- Seul fichier applicatif remplacé : `bds/scenario-bds.html`. 90 fiches révisées, 152 conservées octet pour octet. Références des portraits et illustrations conservées ; Bestiaire partagé et autres pages inchangés.
- Le lecteur indexe les textes complets, affiche tous les résultats, donne des adresses de scènes, conserve la position de lecture et permet la navigation au clavier. Le jeu reste connecté : aucun nouveau mode hors connexion.
- Après installation par Guillaume, le bouton « Corrections Arc I » peut appliquer uniquement les fiches ciblées. Il sauvegarde les sections avant remplacement et refuse les conflits concurrents, les fiches absentes/déplacées et les références de médias différentes. Le remplacement des modifications de texte faites dans ces fiches depuis le navigateur est annoncé avant confirmation. Ne pas utiliser le bouton global de publication pour ce lot.
- Vérifications : structure et identifiants, médias, deux scripts JavaScript ; huit essais d’import sur instantanés locaux et huit essais de logique du lecteur réussis. Aucun accès en écriture à la base réelle. Rendu mobile, zoom, impression et équilibrage en partie non validés par ces essais.
- Livraison : `BDS-Arc-I-corrections-20260914.zip`. Archive finale limitée au scénario et aux deux documents de suivi ; les explications d’installation sont données dans la conversation. Aucun commit, push ou déploiement effectué.


## Livraison du 15 septembre 2026 — Seconde consolidation de BDS

- Base : GitHub `7f01394eb5305cf2d4604b273d79748159aab5d8`, revérifiée avant livraison ; sections et profils en ligne lus sans modification. Cette livraison prend la suite de la première correction, déjà appliquée par Guillaume.
- Périmètre maintenu : Arc I et transition vers l’Arc II incluse. Aucun développement des chapitres ébauchés. Les décisions de canon ci-dessus restent applicables.
- Raccords repris : missive sauvée/volée/détruite, Dietr et autres captifs, protections, déplacements et avertissements datés, versement unique des rémunérations, stocks et effectifs persistants. Les instructions contredisant les issues jouées sont retirées des scènes et des profils.
- Conseil : trois négociations concrètes sur la passe, les archives et les témoins ; responsables, moyens et échéances à consigner. L’article 9 reste réservé. Enquête Haas : quatre accès, poids des pièces et protection des témoins, sans verrou de révélation.
- Hollenstein : le fils du charretier est vivant à l’arrivée, retenu dans la remise derrière le temple par l’un des huit ungors. Les indices et les actions possibles rendent son sauvetage jouable ; aucune exécution automatique. Son sort suit les événements réellement résolus.
- Profils locaux BDS harmonisés avec leurs appels. Variantes mécaniques signalées ; fuite, capture, soins et moral explicités. Les archives traitent Gariz comme un chef gobelin ennemi, jamais comme un nain banni. Bestiaire partagé et appels hors périmètre inchangés.
- DA conservée : feuilles de style, cadres, images et classes des encadrés existants. Modificateurs colorés, tableau d’équipement réparé et tableaux de synthèse accessibles au clavier. Cinq identifiants de portraits déjà présents en ligne sont repris dans leurs emplacements GitHub encore vides.
- Export : suppression des huit anciennes copies de commandes de structure ; une seule barre active est reconstruite au chargement et retirée du fichier exporté.
- Fichiers à remplacer : `bds/scenario-bds.html`, `ETAT-DU-PROJET.md`, `SUIVI.md`. Après l’upload/commit/push effectué par Guillaume, ouvrir le scénario actualisé et utiliser « Corrections Arc I » pour appliquer cette révision au contenu enregistré. Cette action annonce les 100 fiches visées et impose une sauvegarde préalable ; aucune utilisation du bouton global « Push » n’est nécessaire pour ce lot.
- Contrôles : 242 fiches présentes ; 142 non visées identiques ; portraits/illustrations actuels préservés ; analyse HTML5 sans erreur ; deux scripts internes valides ; huit tests d’import sur les sections en ligne copiées localement ; quatre cycles chargement/export dans un DOM simulé, sans duplication ni perte des fiches.
- Limites : aucune nouvelle vérification visuelle dans un navigateur, aucun essai d’impression ni partie test. Le calibrage en jeu reste à observer ; les contrôles de structure ne remplacent pas cette validation.
- Livraison `BDS-Arc-I-consolidation-20260915.zip` : trois fichiers seulement. Aucun commit, push, déploiement ou changement de données distantes effectué par ChatGPT.
