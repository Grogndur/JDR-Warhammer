# Suivi du site

## 10 septembre 2026 — Accueil

- Intégration de l’accueil fourni dans « Index Essai 1.zip », selon la maquette validée : bannière impériale, deux campagnes illustrées et accès Table virtuelle / MJ.
- Illustrations, polices et styles locaux regroupés dans `assets/accueil/`, sans remplacer de ressources partagées.
- Conservation des quatre destinations et du mécanisme MJ existant (validation, durée de 12 heures et partage entre onglets), appliqué aux deux liens MJ de l’accueil.
- Suppression des redirections propres à la démonstration : navigation relative au site.
- Aucune modification des autres pages, de Firebase ou des données de campagne.
- Vérifications : quatre destinations présentes, ressources locales et polices référencées présentes, illustrations/styles identiques au ZIP, syntaxe JavaScript valide ; douze simulations MJ couvrant les deux liens (annulation, erreur, succès, accès actif, expiration, ancienne session).
- Mise en page adaptée aux nouvelles accroches longues. Aperçu privé validé par Guillaume ; vérifications automatisées visuelles ordinateur/mobile non réalisées.
- Accueil et textes validés par Guillaume ; publication autorisée le 10 septembre 2026.

## 14 septembre 2026 — Icônes BDS groupes 2 et 3

- Base GitHub : `8cf0de43ea2f63ac1514fab4a875bf4ab9bd9f72`.
- Seize nouveaux motifs dans une planche illustrée en bronze patiné : bandage/croix séparés, comète à deux queues, flamme, bourse/pièces, Chaos à huit flèches, rayon diagonal, progression XP, parchemins multiples, parchemin roulé, lauriers gauche/droit, fléau, éclair, saut, cerveau, yeux fermés. Planche créée avec la génération d’images intégrée, à partir du style de `icons-v2.png`.
- CC réutilise les épées originales et Dex le rouage original. Affectations corrigées dans `wymond.js`, nouvelle planche ciblée par une seule règle de `wymond.css`. Deux paramètres de version actualisés dans `commun/fiche.html`.
- Huit ouvertures Chromium locales : groupes 2/3/1/L’Éclipse × 1440/390 px, aucune erreur JavaScript. Navigation depuis chaque portail concerné, seize motifs présents, dix caractéristiques correctement affectées, un seul motif par caractéristique après recalcul. Notes et caractéristique modifiables ; blessures et monnaie conservées dans les sauvegardes simulées. Captures ordinateur et mobile examinées.
- Aucun changement des données, accès, règles, Table ou sauvegardes. Firebase entièrement simulé pour ces essais ; aucune écriture réelle.
- Livraison : `BDS-groupes-2-3-icones-20260914.zip`, six fichiers uniquement. Non publiée, validation de Guillaume attendue.

### Ajustement du centrage — 14 septembre 2026

- À partir du ZIP précédent : recentrage des dix illustrations dans leur colonne, suppression des décalages négatifs effectifs et dimensions proportionnelles aux cases. Dessins et valeurs inchangés ; version CSS actualisée dans la fiche.
- Contrôle local des groupes 2 et 3 à 1440/1000/390/320 px : marges mesurées, captures examinées, huit essais réussis sans erreur JavaScript. Firebase simulé uniquement.
- Correctif `BDS-groupes-2-3-centrage-icones-20260914.zip` : quatre fichiers, dont les deux documents de suivi. À appliquer après le ZIP des icônes. Aucune publication.

## 14 septembre 2026 — Harmonisation de l'espace MJ

- Base GitHub : `441b8ed774fe08e4954859ed5d89a6eb53cb448b`.
- Audit de l'ensemble des 32 pages HTML de `mj/` et de `commun/mecaniques.html` : portail, Grimoire, carrières, Bestiaire, domaines magiques, règles, métiers et tables.
- Ajout d'une feuille commune `assets/mj/harmonisation.css`, chargée après les styles historiques de chaque outil. Palette, matières, cadres, typographies locales, barres d'outils, panneaux, tableaux, formulaires et affichage mobile rapprochés de la direction artistique validée du site.
- Les structures HTML, scripts, clés d'accès, chemins Firebase, contenus et mécanismes de sauvegarde n'ont pas été modifiés. Chaque page ne reçoit qu'un lien vers la nouvelle feuille visuelle.
- Vérifications : 66 ouvertures locales dans Chromium (33 pages × 1440/390 px), feuille commune chargée sur chaque page et styles calculés présents. Les principaux gabarits ont été comparés visuellement avant/après. Les erreurs observées sur trois outils proviennent uniquement du blocage simulé des modules Firebase externes durant le test local.
- Livraison : `Espace-MJ-harmonise-20260914.zip`. Aucune publication ; validation de Guillaume attendue.

### Seconde passe visuelle — 14 septembre 2026

- Reprise depuis GitHub au commit `0834eed`, qui contient la première harmonisation.
- Portail MJ rapproché directement de l'accueil validé : même cuir, bannière impériale, comète, ferrures et décors latéraux (chaînes à gauche, drapé au crâne à droite).
- Cartes du portail et cadres intérieurs remplacés par les matières et cadres patinés déjà utilisés par l'accueil et les scénarios. Déclinaison mobile incluse.
- Version de `harmonisation.css` actualisée sur les 33 pages concernées. Analyse HTML réussie, CSS structurellement valide et ressources appelées présentes.
- Aucun changement de script, Firebase, données ou sauvegarde. Livraison `Espace-MJ-seconde-passe-visuelle-20260914.zip`, non publiée.

#### Correctif du cadre de pourtour

- Le cadre fixe est inchangé graphiquement. Son niveau de superposition est abaissé afin que les barres et commandes situées au bord de l'écran passent proprement devant lui.
- Cache CSS actualisé sur les 33 pages de l'espace MJ. Aucun script, contenu ou donnée modifié.
- Livraison : `Correctif-cadre-espace-MJ-20260914.zip`, non publiée.

#### Correctif ciblé accueil MJ et Grimoire

- Accueil MJ : une marge réservée au cadre le sépare du décor de chaînes, du drapé latéral et du contenu central, sans retouche du cadre.
- Grimoire : la même marge sépare le cadre de l'application, sans changement de fonctions.
- Cache actualisé uniquement sur les deux pages concernées. Livraison `Correctif-cadre-accueil-MJ-et-Grimoire-20260914.zip`, non publiée.

#### Accueil MJ sans cadre extérieur

- Règle de DA fixée : les pages utilisant les grands décors latéraux de l'accueil ou des scénarios n'emploient pas le cadre général ; leurs visuels atteignent directement les bords de l'écran.
- Cadre extérieur retiré uniquement de l'accueil MJ et marge supprimée. Le Grimoire reste dans son état corrigé et validé.
- Livraison : `Accueil-MJ-sans-cadre-exterieur-20260914.zip`, non publiée.

#### Finition du fond et de la bannière de l'accueil MJ

- Remplacement de l'aplat noir propre à l'accueil MJ par la surface exacte de l'accueil principal : fond `#10120f`, cuir `cuir.png` à 19 % et halo latéral fondu identique.
- Cadre de la bannière inchangé graphiquement, mais rendu borné à son panneau ; ombre externe retirée pour supprimer les lignes parasites.
- Aucun changement au Grimoire, aux scripts ou aux données. Livraison `Accueil-MJ-fond-et-cadre-nettoyes-20260914.zip`, non publiée.

## 14 septembre 2026 — Bonus d'Attribut des fiches

- Ajustement des valeurs `B:3`, `B:4`, etc. à environ 60 % du score principal, avec tailles adaptées sur ordinateur, tablette et mobile.
- Règle limitée à `fiche-wymond` : BDS groupes 2 et 3 et L'Éclipse uniquement. Groupe 1 BDS inchangé.
- Aucun changement de calcul, de données ou de sauvegarde. Version CSS actualisée dans la fiche commune.
- Livraison corrective `Fiches-bonus-attribut-60-pourcent-20260914.zip`, non publiée.


## 14 septembre 2026 — BDS, correction de l’Arc I et de sa transition

- Source figée : GitHub `2d9b87864152424c2f3872ec23f0c87aad199510`. Révision ciblée de `bds/scenario-bds.html`, avec 90 fiches modifiées sur 242 ; les 152 autres sont conservées octet pour octet. Les aides et profils utilisés dans le périmètre sont compris, les développements ultérieurs exclus.
- Consolidation du canon Gariz/Schattenfels/Guérand, des captures et dessins de Deu’Brez, du calendrier, des primes et stocks, des XP, du portage et des soins. Conseil de onze articles avec article 9 réservé, procédure du Troll unique et combats conditionnés par positions, alertes et moyens. Neutralité des PJ, indices accessibles et rythme court/développé pour la transition.
- Profils révisés intégrés à leurs appels dans BDS pour éviter une divergence avec les anciens textes distants. Identifiants de portraits et d’illustrations conservés ; aucune modification du Bestiaire partagé.
- Recherche sur texte intégral, accents normalisés, résultats complets, liens et focus clavier ; adresses de scènes, historique et positions persistantes. Tableaux défilables et barre supérieure adaptée à sa hauteur réelle. Ces styles restent propres au lecteur BDS.
- Action manuelle « Corrections Arc I » : comparaison des fiches, sauvegarde des sections obligatoire, transaction conditionnelle, conservation des autres fiches. Refus des médias aux identifiants changés ou des fiches absentes/déplacées. Le raccourci d’édition est suspendu pendant l’opération. Une sauvegarde en échec interrompt aussi désormais l’ancien bouton global.
- Contrôles : HTML analysable, aucun identifiant perdu/dupliqué, références des médias conservées, deux scripts internes syntaxiquement valides. Huit essais d’import couvrent périmètre, répétition, fiches déplacées, médias changés, découpage HTML, refus de sauvegarde, conflit concurrent et conservation des autres données. Huit essais de lecteur couvrent index réel de 242 fiches, texte après 4 000 caractères, accents, plus de dix résultats, clavier, liens/historique, reprise et menu.
- Tests exécutés dans Node avec instantanés locaux et DOM minimal. Aucun essai de rendu dans un navigateur, aucune partie test, aucune écriture Firebase réelle. La validation mobile/zoom/impression et le calibrage des rencontres restent à faire.
- SHA-256 du HTML livré : `02e2627d5609de6bed715abe64aed68a8c13c8cc9b8d3e62135ecc46ad79a401`.
- Livraison : `BDS-Arc-I-corrections-20260914.zip`, trois fichiers à uploader dans l’archive finale, explications données dans la conversation. Aucun commit, push ou déploiement ; application en ligne laissée à Guillaume après examen.


## 15 septembre 2026 — BDS, seconde consolidation après ré-audit

- Base GitHub : `7f01394eb5305cf2d4604b273d79748159aab5d8`, confirmée inchangée avant livraison. Première révision du 14 septembre retrouvée dans le fichier GitHub et les sections en ligne. Lecture seule des sections et du Bestiaire pour cette passe.
- Révision `20260915-arc1-v2` : 100 fiches ciblées, 142 conservées octet pour octet. Arc I, transition et aides/profils utilisés uniquement. Fiches des personnages joueurs et ébauches ultérieures intactes.
- Raccords narratifs consolidés : états de la missive et de Dietr, captifs protégés, poursuites et messages, commandes de Karkiss/Darrik, issue du conseil, négociation et preuve contre Haas, expédition concurrente d’Ilka, camp de Rens, soins et moral. Allègement des répétitions et suppression des consignes qui annulaient une réussite ou imposaient les réactions des PJ.
- Hollenstein : enfant vivant, position, garde, indices et modalités d’intervention explicités. Le gardien est compris dans l’effectif de huit ungors. Guérand conserve la protection de survie validée, avec blessures et indisponibilité possibles.
- Profils appelés synchronisés dans BDS. Conservation des valeurs de référence et explicitation des variantes ; suppression des fuites invincibles, soins plafonnés arbitrairement, ralliements gratuits et immunités collectives contradictoires. Fonds d’archives, prix du Peseur et pertes du berger alignés. Aucun changement du Bestiaire partagé.
- Mise en forme : feuilles CSS et ressources graphiques inchangées ; réutilisation des encadrés lecture/MJ/indices/jets/dialogues ; modificateurs positifs/négatifs colorés ; cellule d’un tableau réparée ; synthèses défilables au clavier. Cinq identifiants de portraits issus des sections en ligne ajoutés aux emplacements vides du HTML GitHub, sans remplacer les images.
- Édition : retrait des huit groupes de commandes « Partie/Fiche » figés dans les anciens exports. Initialisation idempotente, commandes recâblées une fois, nettoyage du groupe et du séparateur lors de l’export. L’import ciblé vise uniquement les 100 fiches du nouveau manifeste et conserve sauvegarde obligatoire, contrôle des médias et transaction contre les conflits.
- Vérifications locales : HTML5 sans erreur de parsing ; deux scripts internes validés par Node ; aucun identifiant de fiche perdu ou dupliqué ; 242 fiches, médias et périmètre vérifiés. Huit tests d’import réussis sur la copie actuelle des sections en ligne : application, répétition, fiche déplacée, portrait modifié, découpage, sauvegarde refusée, conflit concurrent et autres données préservées.
- Quatre cycles chargement/export dans jsdom avec les fonctions réellement livrées : huit initialisations, un groupe de commandes actif, seize actions correctement câblées, aucune commande figée dans l’export et 242 fiches/médias conservés à chaque cycle. Aucun script de production ni accès réseau exécuté par cet essai.
- Pas de nouveau rendu visuel Chromium, de contrôle d’impression ou de partie test. Les vérifications de structure et de comportement simulé ne valident pas à elles seules l’équilibrage ni le rendu mobile.
- SHA-256 du HTML livré : `1d0fd9064cff0ed54f6e45fae8332e414e64437db72534370d83277b9e2f7d27`.
- Livraison : `BDS-Arc-I-consolidation-20260915.zip`, uniquement `bds/scenario-bds.html`, `ETAT-DU-PROJET.md`, `SUIVI.md`. Aucun fichier de notice. Aucun commit, push, déploiement ou écriture Firebase réelle effectué.


## 15 septembre 2026 — BDS, finition éditoriale et nettoyage des blocs hors fiches

- Base : GitHub `4cef914452832ad6f4a18db693e72099c4865ef4`, confirmé inchangé pendant la préparation. HTML du dépôt identique à la livraison v2. Nouvelle lecture des sections en ligne : elles conservaient la première révision ; le lot v3 inclut donc les cent fiches du précédent correctif.
- Révision `20260915-arc1-v3` : 134 fiches ciblées sur 242 ; les 108 autres restent identiques octet pour octet. Arc I, transition, aides et profils employés seulement. Aucun personnage joueur nommé introduit ; ébauches ultérieures et données des PJ conservées.
- Relecture et réécriture du cadrage, des introductions, scènes, enquêtes, contrats, lettres, aides, inventaires et notices de profils. Formulations directes ; distinction entre faits, témoignages et interprétations ; connaissances limitées aux observations et contacts réels ; réactions liées aux positions, délais et moyens disponibles. Suppression des rappels négatifs et injonctions qui répétaient ces principes.
- Raccords : Söll à Hochsleben, sept familles à Klein-Hohenfels, trajet du Troll, chronologie de la lettre de Brokk, paiements de Krull/Hallberg/Vetter, conditions du Peseur, rôle de Ruhl et diversion de Sébastian, témoignages et contrôle du bornage. Regroupement du barème d’XP et renvois locaux. Conservation de la survie de Guérand, des captures possibles et de la communication dessinée de Deu’Brez.
- Dix blocs directs placés hors fiches retirés : trois dans `P3`, deux dans `P6D`, cinq dans `P7`. Ils polluaient toutes les vues de leur section et contredisaient les scènes corrigées. Le répertoire, les modalités du gîte et les questions de Karkiss sont couverts par les fiches révisées.
- Styles et médias : ressources et feuilles partagées inchangées. Trois règles ciblées dans le lecteur BDS contiennent les tableaux de butin et permettent le retour à la ligne des intitulés/modificateurs longs. Classes des encadrés conservées ; modificateurs positifs/négatifs et tableaux accessibles au clavier vérifiés. Caractéristiques numériques des profils inchangées ; références des portraits/illustrations identiques dans chaque fiche.
- Import ciblé : manifeste cumulatif, nettoyage exact des anciens blocs avant remplacement des fiches, détection d’un bloc modifié ou déplacé, prise en charge d’un nettoyage seul et répétition sans nouvel effet. Confirmation et résultat annoncent aussi le nombre de blocs retirés. Sauvegarde obligatoire et transaction conditionnelle conservées. Aucun changement des chemins de données.
- Contrôles finaux : HTML5 sans erreur de parsing, deux scripts internes syntaxiquement valides, 242 fiches sans perte ni duplication d’identifiant. Onze tests d’import réussis sur une copie des sections en ligne : lot réel, répétition, fiche déplacée, média changé, découpage HTML, bloc modifié, bloc déplacé, nettoyage seul, sauvegarde refusée, conflit concurrent et conservation des autres données.
- Chromium 153 : 150 vues contrôlées (134 fiches à 320 px, huit vues représentatives à 390 px et huit à 1440 px), aucun débordement horizontal de page ni erreur JavaScript. Index de 242 fiches, lien vers le barème, historique, recherche intégrale, navigation au clavier et menu mobile vérifiés. Captures des encadrés, du conseil, de Hollenstein et du Peseur examinées avec les ressources graphiques et polices réelles. Essai du lecteur isolé, réseau limité au serveur local ; références des médias dynamiques vérifiées séparément.
- Quatre cycles chargement/export avec les fonctions livrées : un groupe de commandes, huit initialisations, seize actions, 242 fiches et médias conservés. Aucun accès réseau de production pendant ces essais.
- Limites de validation : aucune partie test et aucune validation de pagination PDF. Les contrôles de texte, de structure et d’affichage ne constituent pas une mesure d’équilibrage en partie.
- SHA-256 du HTML livré : `7f38c4c0bd3e21c2f87dca304b5735b7263428b197356deb7358cf037ee84ad5`.
- Livraison : `BDS-Arc-I-finition-editoriale-20260915.zip`, uniquement les trois fichiers à uploader. Aucun commit, push, déploiement ou écriture Firebase réelle effectué.
