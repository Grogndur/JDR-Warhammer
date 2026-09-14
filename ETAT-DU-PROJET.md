# État du projet — Warhammer, site et campagnes

> Document de reprise entre conversations. À lire avant toute intervention sur le site.
> Dernière mise à jour : 14 septembre 2026.

## Référence de travail

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

## Travail actif — refonte des icônes des fiches

Demande en cours, non encore implémentée dans la base de référence : remplacer les icônes des fiches de personnages des groupes 2 et 3, en conservant la direction artistique riche, texturée et illustrée déjà validée.

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

## À mettre à jour après la prochaine étape

- Résultat de la refonte des icônes.
- Fichiers réellement modifiés.
- Vérifications effectuées et éventuelles limites restantes.
- Validation ou refus de publication par Guillaume.
- Nom du ZIP livré et nouvelle source de référence.
