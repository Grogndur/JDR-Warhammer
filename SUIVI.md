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
