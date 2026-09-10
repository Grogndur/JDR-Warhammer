
/* ═══════════ ACCÈS PARTAGÉ ENTRE LES ONGLETS ═══════════
   sessionStorage est propre à chaque onglet : un « ouvrir dans un nouvel
   onglet » repartait donc de zéro et redemandait le mot de passe. On mémorise
   l'autorisation dans localStorage, avec une péremption. */
window.ACCES = window.ACCES || (function () {
  var CLE_MJ = "mjAccesJusqua";
  var DUREE_MJ = 12 * 60 * 60 * 1000;           /* 12 heures */
  var DUREE_FICHE = 30 * 24 * 60 * 60 * 1000;   /* 30 jours */

  function lire(cle) {
    try {
      var v = parseInt(localStorage.getItem(cle) || "0", 10);
      if (v > Date.now()) return true;
      if (v) localStorage.removeItem(cle);
    } catch (e) {}
    return false;
  }
  function ecrire(cle, duree) {
    try { localStorage.setItem(cle, String(Date.now() + duree)); } catch (e) {}
  }

  function mj() {
    if (lire(CLE_MJ)) return true;
    /* Session déverrouillée avant cette mise à jour, ou par une page pas encore
       migrée : on reprend l'autorisation et on la recopie dans localStorage,
       sinon les autres onglets ne la verraient jamais. */
    var vieux = false;
    try { vieux = sessionStorage.getItem("mjAccess") === "1"
               || sessionStorage.getItem("carrieresMJ") === "1"; } catch (e) {}
    if (vieux) { ecrire(CLE_MJ, DUREE_MJ); return true; }
    return false;
  }
  function ouvrirMj() {
    ecrire(CLE_MJ, DUREE_MJ);
    try {
      sessionStorage.setItem("mjAccess", "1");
      sessionStorage.setItem("carrieresMJ", "1");
    } catch (e) {}
  }
  function fermerMj() {
    try { localStorage.removeItem(CLE_MJ); } catch (e) {}
    try {
      sessionStorage.removeItem("mjAccess");
      sessionStorage.removeItem("carrieresMJ");
    } catch (e) {}
  }
  function fiche(id) {
    if (lire("ficheAccesJusqua_" + id)) return true;
    var vieux = false;
    try { vieux = sessionStorage.getItem("pw_ok_" + id) === "1"; } catch (e) {}
    if (vieux) { ecrire("ficheAccesJusqua_" + id, DUREE_FICHE); return true; }
    return false;
  }
  function ouvrirFiche(id) {
    ecrire("ficheAccesJusqua_" + id, DUREE_FICHE);
    try { sessionStorage.setItem("pw_ok_" + id, "1"); } catch (e) {}
  }

  return { mj: mj, ouvrirMj: ouvrirMj, fermerMj: fermerMj,
           fiche: fiche, ouvrirFiche: ouvrirFiche };
})();


// Verrou d'accès à l'espace du Maître du Jeu.
(function () {
  document.querySelectorAll('[data-mj]').forEach(function (lien) {
  lien.addEventListener('click', function (e) {
    if (ACCES.mj()) return;          /* déjà déverrouillé : on laisse passer */
    e.preventDefault();
    var p = prompt("Espace Maître du Jeu. Mot de passe :");
    if (p === null) return;
    if (p === "Von Carstein") {
      ACCES.ouvrirMj();
      location.href = lien.getAttribute('href');
    } else {
      alert("Mot de passe incorrect.");
    }
  });
});
})();
