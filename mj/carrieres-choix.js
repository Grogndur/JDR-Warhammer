/* « Partir d'une carrière officielle ».
   Recopie une carrière du catalogue dans une fiche neuve, que tu modifies
   ensuite librement. Le catalogue n'est jamais modifié, et les carrières que
   tu as déjà créées ne sont pas touchées. */
(function () {
  if (!window.CARRIERES) return;

  var CSS = ''
    + '.cc-ov{position:fixed;inset:0;z-index:9000;background:rgba(9,8,12,.93);display:flex;'
    + 'align-items:flex-start;justify-content:center;padding:4vh 1rem;font-family:"Crimson Text",serif}'
    + '.cc-box{width:100%;max-width:640px;max-height:88vh;display:flex;flex-direction:column;'
    + 'background:#14141a;border:1px solid rgba(184,146,42,.3);border-top:3px solid #B8922A;border-radius:3px}'
    + '.cc-hd{padding:.9rem 1rem .6rem;border-bottom:1px solid rgba(255,255,255,.07)}'
    + '.cc-ti{font-family:Cinzel,serif;color:#e3c66e;font-size:1.05rem;letter-spacing:.05em}'
    + '.cc-sub{font-size:.8rem;color:#8a7d6c;font-style:italic;margin-top:.2rem;line-height:1.45}'
    + '.cc-q{width:100%;margin-top:.6rem;background:rgba(184,112,42,.07);border:1px solid rgba(184,146,42,.3);'
    + 'color:#f0e8d8;font-family:inherit;font-size:.95rem;padding:.45rem .6rem;border-radius:2px}'
    + '.cc-q:focus{outline:none;border-color:#d4b45a}'
    + '.cc-li{overflow:auto;padding:.5rem}'
    + '.cc-gr{font-family:Cinzel,serif;font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;'
    + 'color:rgba(200,165,90,.75);padding:.7rem .6rem .25rem;border-bottom:1px solid rgba(184,146,42,.16);margin-bottom:.3rem}'
    + '.cc-it{display:block;width:100%;text-align:left;cursor:pointer;color:#f0e8d8;font-family:inherit;'
    + 'background:transparent;border:1px solid transparent;border-radius:2px;padding:.45rem .6rem}'
    + '.cc-it:hover{background:rgba(184,146,42,.16);border-color:rgba(184,146,42,.35)}'
    + '.cc-n{font-weight:bold}.cc-n .cc-en{font-size:.68rem;color:#8a7d6c;font-weight:normal;margin-left:.4rem;font-style:italic}'
    + '.cc-m{font-size:.73rem;color:#8a7d6c;margin-top:.1rem}'
    + '.cc-d{font-size:.79rem;color:#a49a88;line-height:1.35;margin-top:.1rem}'
    + '.cc-ft{padding:.6rem 1rem;border-top:1px solid rgba(255,255,255,.07)}'
    + '.cc-ft button{width:100%;cursor:pointer;font-family:Cinzel,serif;font-size:.66rem;letter-spacing:.12em;'
    + 'text-transform:uppercase;padding:.5rem;border-radius:2px;background:rgba(184,146,42,.14);'
    + 'color:#e3c66e;border:1px solid rgba(184,146,42,.35)}'
    + '.cc-vide{color:#8a7d6c;font-style:italic;padding:1rem;font-size:.85rem}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  function norm(x) {
    return String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  function esc(x) {
    return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Traduit une carrière du catalogue vers le format attendu par le créateur. */
  function versFiche(c) {
    var CARACS = ['CC', 'CT', 'F', 'E', 'I', 'Ag', 'Dex', 'Int', 'FM', 'Soc'];
    var d = {
      titre: c.nom,
      soustitre: c.classe + (c.especes ? ' · ' + c.especes : ''),
      description: (c.desc || '') + (c.uia ? '\n\nCarrière du supplément Up in Arms (' + c.en + '), traduction maison.' : ''),
      image: '', schema: {}, echelons: [],
      cree: Date.now()
    };
    CARACS.forEach(function (k) { d.schema[k] = [false, false, false, false]; });
    for (var i = 0; i < 4; i++) {
      var e = c.ech[i] || {};
      d.echelons.push({
        stTier: e.tier || '', stRang: e.rang || '',
        description: e.nom || '',
        competences: (e.competences || []).map(function (x) { return { nom: x.nom, desc: '' }; }),
        talents: (e.talents || []).map(function (x) { return { nom: x.nom, desc: '' }; }),
        possessions: (e.possessions || []).map(function (x) { return { nom: x.nom, desc: '' }; })
      });
    }
    return d;
  }

  window.ouvrirCatalogueCarrieres = function (creer) {
    var C = window.CARRIERES;
    var ov = document.createElement('div');
    ov.className = 'cc-ov';
    ov.innerHTML = '<div class="cc-box">'
      + '<div class="cc-hd"><div class="cc-ti">Partir d\'une carrière officielle</div>'
      + '<div class="cc-sub">La carrière choisie est recopiée dans une fiche neuve, que tu modifies ensuite '
      + 'librement. L\'originale n\'est jamais touchée.</div>'
      + '<input class="cc-q" id="cc-q" placeholder="Filtrer par nom, classe ou espèce…" autocomplete="off"></div>'
      + '<div class="cc-li" id="cc-li"></div>'
      + '<div class="cc-ft"><button data-x="1">Fermer</button></div></div>';
    document.body.appendChild(ov);

    var q = ov.querySelector('#cc-q'), li = ov.querySelector('#cc-li'), vus = [];

    function peindre() {
      var f = norm(q.value).split(/\s+/).filter(Boolean);
      vus = C.filter(function (c) {
        var t = norm(c.nom + ' ' + c.classe + ' ' + c.especes + ' ' + (c.en || '') + ' ' + (c.desc || ''));
        return f.every(function (m) { return t.indexOf(m) >= 0; });
      });
      if (!vus.length) { li.innerHTML = '<div class="cc-vide">Aucune carrière ne correspond.</div>'; return; }
      var h = '', cls = null;
      vus.forEach(function (c, i) {
        if (c.classe !== cls) { cls = c.classe; h += '<div class="cc-gr">' + esc(cls) + '</div>'; }
        var e0 = c.ech[0] || {};
        h += '<button class="cc-it" data-i="' + i + '">'
          + '<div class="cc-n">' + esc(c.nom)
          + (c.uia ? '<span class="cc-en">Up in Arms · ' + esc(c.en) + '</span>' : '') + '</div>'
          + '<div class="cc-m">' + esc(c.especes) + ' · départ ' + esc(e0.nom || '')
          + ' (' + esc(e0.tier || '') + ' ' + esc(e0.rang || '') + ')</div>'
          + (c.desc ? '<div class="cc-d">' + esc(c.desc) + '</div>' : '')
          + '</button>';
      });
      li.innerHTML = h;
    }
    peindre();

    q.addEventListener('input', peindre);
    q.addEventListener('keydown', function (e) { if (e.key === 'Escape') ov.remove(); });
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.getAttribute('data-x')) { ov.remove(); return; }
      var b = e.target.closest('.cc-it');
      if (!b) return;
      var c = vus[+b.getAttribute('data-i')];
      ov.remove();
      creer(versFiche(c), c.nom);
    });
    setTimeout(function () { q.focus(); }, 40);
  };
})();
