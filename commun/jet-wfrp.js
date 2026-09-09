/* ============================================================
   Jet de test WFRP 4e — moteur commun
   ------------------------------------------------------------
   Un seul endroit où vivent le d100, les Degrés de Réussite, la
   localisation, le critique, la maladresse et l'échelle de
   difficulté. La Table et la fiche de personnage s'en servent
   toutes les deux, pour qu'un clic sur une fiche donne
   exactement le même résultat qu'un lancer fait sur la Table.

   Le fichier se charge en script ordinaire, avant les autres,
   et se pose sur window.JET_WFRP. Il ne touche à rien d'autre
   et ne dépend de rien.
   ============================================================ */
(function (racine) {
  'use strict';

  /* Échelle officielle de la quatrième édition. L'ordre du tableau
     est celui de la jauge, du plus facile au plus dur. */
  var DIFFICULTES = [
    { cle: 'tf', nom: 'Très facile',    mod:  60, couleur: '#5c8f3a' },
    { cle: 'f',  nom: 'Facile',         mod:  40, couleur: '#7d9b36' },
    { cle: 'a',  nom: 'Accessible',     mod:  20, couleur: '#a89a33' },
    { cle: 'i',  nom: 'Intermédiaire',  mod:   0, couleur: '#c9a25a' },
    { cle: 'c',  nom: 'Complexe',       mod: -10, couleur: '#c07f2f' },
    { cle: 'd',  nom: 'Difficile',      mod: -20, couleur: '#b0522c' },
    { cle: 'td', nom: 'Très difficile', mod: -30, couleur: '#9b2226' }
  ];

  var DEFAUT = DIFFICULTES[3];            /* Intermédiaire, +0 */

  /* Retrouve le cran qui porte ce modificateur. Une valeur qui ne
     correspond à aucun cran reste utilisable et s'affiche telle quelle. */
  function parMod(mod) {
    var m = parseInt(mod, 10);
    if (isNaN(m)) m = 0;
    for (var i = 0; i < DIFFICULTES.length; i++) {
      if (DIFFICULTES[i].mod === m) return DIFFICULTES[i];
    }
    return { cle: 'libre', nom: (m > 0 ? '+' : '') + m, mod: m, couleur: DEFAUT.couleur };
  }

  /* rev va de 0 à 99, où 0 vaut « 00 ». On lui passe les dés inversés. */
  function localisation(rev) {
    if (rev === 0)  return 'Jambe droite';   /* 90-00 */
    if (rev <= 9)   return 'Tête';           /* 01-09 */
    if (rev <= 24)  return 'Bras gauche';    /* 10-24 */
    if (rev <= 44)  return 'Bras droit';     /* 25-44 */
    if (rev <= 79)  return 'Corps';          /* 45-79 */
    if (rev <= 89)  return 'Jambe gauche';   /* 80-89 */
    return 'Jambe droite';                   /* 90-99 */
  }

  /* La cible finale d'un test : la valeur de la fiche, plus le
     modificateur de difficulté, jamais en dessous de zéro. */
  function cibleFinale(base, mod) {
    var b = parseInt(base, 10) || 0;
    var m = parseInt(mod, 10) || 0;
    return Math.max(0, b + m);
  }

  /* Ce qui s'écrit entre parenthèses dans le journal. Sans
     modificateur, on garde la forme courte « cible 55 ». */
  function libelleCible(base, mod) {
    var b = parseInt(base, 10) || 0;
    var m = parseInt(mod, 10) || 0;
    if (!m) return 'cible ' + b;
    var d = parMod(m);
    return 'cible ' + cibleFinale(b, m) + ' · ' + d.nom + ' ' + (m > 0 ? '+' : '') + m + ' sur ' + b;
  }

  /* Le test lui-même. cible est la valeur finale, déjà modifiée.
     impose sert au banc d'essai du MJ : il rejoue un test avec un
     résultat exact au lieu de tirer les dés. */
  function resoudre(cible, impose) {
    var r = impose ? Math.max(1, Math.min(100, impose))
                   : Math.floor(Math.random() * 100) + 1;      /* 1..100 */
    var dizR = (r === 100) ? 0 : Math.floor(r / 10);
    var uniR = (r === 100) ? 0 : r % 10;
    var dizC = Math.floor(cible / 10);
    var sl = dizC - ((r === 100) ? 10 : dizR);                 /* Degrés de Réussite */
    var succes = r <= cible;
    var dbl = (dizR === uniR);                                 /* doublé = critique ou maladresse */
    var loc = localisation(uniR * 10 + dizR);                  /* localisation, dés inversés */

    var classe = succes ? 'succes' : 'echec';
    var marque = 'DR ' + (sl >= 0 ? '+' : '') + sl;
    if (dbl && succes)  { classe += ' crit';   marque = 'Critique ! ' + marque; }
    if (dbl && !succes) { classe += ' fumble'; marque = 'Maladresse ! ' + marque; }

    /* Le 01 naturel : réussite parfaite, effet renforcé. */
    var parfait = (r === 1);
    if (parfait) {
      classe += ' crit crit01';
      marque = '01 ! ' + marque.replace(/^Critique ! /, '');
    }

    return {
      r: r,
      aff: (r === 100) ? '00' : String(r).padStart(2, '0'),
      dizR: dizR, uniR: uniR,
      sl: sl, succes: succes, dbl: dbl, parfait: parfait,
      loc: loc, classe: classe, marque: marque,
      detail: (succes ? 'Réussite' : 'Échec') + ' · ' + loc,
      des: { faces: 10, vals: [dizR, uniR], pct: true }
    };
  }

  racine.JET_WFRP = {
    DIFFICULTES: DIFFICULTES,
    DEFAUT: DEFAUT,
    parMod: parMod,
    localisation: localisation,
    cibleFinale: cibleFinale,
    libelleCible: libelleCible,
    resoudre: resoudre
  };

})(window);
