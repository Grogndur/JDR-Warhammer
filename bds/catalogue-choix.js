/* Choix depuis le catalogue officiel.
   Principe : ce fichier ne touche jamais aux données existantes. Il se contente
   de remplir les champs de saisie déjà présents, puis laisse le bouton
   « Ajouter » habituel faire son travail. Une ligne saisie à la main reste
   saisie à la main, et tout ce qui a été ajouté avant reste intact. */
(function () {
  if (!window.CATALOGUE) return;
  var C = window.CATALOGUE;

  var CSS = ''
    + '.cat-btn{cursor:pointer;font-size:.68rem;letter-spacing:.06em;padding:.3rem .55rem;border-radius:2px;'
    + 'background:rgba(184,146,42,.12);color:#e3c66e;border:1px solid rgba(184,146,42,.35);margin-left:.35rem}'
    + '.cat-btn:hover{background:rgba(184,146,42,.28)}'
    + '.cat-ov{position:fixed;inset:0;z-index:9000;background:rgba(9,8,12,.92);display:flex;'
    + 'align-items:flex-start;justify-content:center;padding:4vh 1rem}'
    + '.cat-box{width:100%;max-width:620px;max-height:88vh;display:flex;flex-direction:column;'
    + 'background:#14141a;border:1px solid rgba(184,146,42,.3);border-top:3px solid #B8922A;border-radius:3px}'
    + '.cat-hd{padding:.9rem 1rem .6rem;border-bottom:1px solid rgba(255,255,255,.07)}'
    + '.cat-ti{font-family:Cinzel,serif;color:#e3c66e;font-size:1rem;letter-spacing:.05em}'
    + '.cat-sub{font-size:.78rem;color:#8a7d6c;font-style:italic;margin-top:.15rem}'
    + '.cat-q{width:100%;margin-top:.6rem;background:rgba(184,112,42,.07);border:1px solid rgba(184,146,42,.3);'
    + 'color:#f0e8d8;font-family:inherit;font-size:.95rem;padding:.45rem .6rem;border-radius:2px}'
    + '.cat-q:focus{outline:none;border-color:#d4b45a}'
    + '.cat-li{overflow:auto;padding:.5rem}'
    + '.cat-it{display:block;width:100%;text-align:left;cursor:pointer;color:#f0e8d8;font-family:inherit;'
    + 'background:transparent;border:1px solid transparent;border-radius:2px;padding:.45rem .6rem}'
    + '.cat-it:hover,.cat-it.on{background:rgba(184,146,42,.16);border-color:rgba(184,146,42,.35)}'
    + '.cat-n{font-weight:bold}.cat-n .cat-of{font-size:.66rem;color:#8a7d6c;font-weight:normal;margin-left:.4rem}'
    + '.cat-d{font-size:.78rem;color:#a49a88;line-height:1.35;margin-top:.1rem}'
    + '.cat-m{font-size:.72rem;color:#8a7d6c;margin-top:.1rem}'
    + '.cat-ft{padding:.6rem 1rem;border-top:1px solid rgba(255,255,255,.07);display:flex;gap:.5rem}'
    + '.cat-ft button{flex:1;cursor:pointer;font-family:Cinzel,serif;font-size:.66rem;letter-spacing:.12em;'
    + 'text-transform:uppercase;padding:.5rem;border-radius:2px;background:rgba(184,146,42,.14);'
    + 'color:#e3c66e;border:1px solid rgba(184,146,42,.35)}'
    + '.cat-vide{color:#8a7d6c;font-style:italic;padding:1rem;font-size:.85rem}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  function norm(x) {
    return String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  function esc(x) {
    return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function poser(id, val) {
    var el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
  }

  /* Ouvre la liste, filtre au clavier, et rend l'entrée choisie. */
  function choisir(titre, sous, items, ligne, apres) {
    var ov = document.createElement('div');
    ov.className = 'cat-ov';
    ov.innerHTML = '<div class="cat-box">'
      + '<div class="cat-hd"><div class="cat-ti">' + esc(titre) + '</div>'
      + '<div class="cat-sub">' + esc(sous) + '</div>'
      + '<input class="cat-q" id="cat-q" placeholder="Filtrer…" autocomplete="off"></div>'
      + '<div class="cat-li" id="cat-li"></div>'
      + '<div class="cat-ft"><button data-x="1">Fermer</button></div></div>';
    document.body.appendChild(ov);

    var q = ov.querySelector('#cat-q'), li = ov.querySelector('#cat-li'), vus = [];

    function peindre() {
      var f = norm(q.value).split(/\s+/).filter(Boolean);
      vus = items.filter(function (it) {
        var t = norm(ligne(it).cle);
        return f.every(function (m) { return t.indexOf(m) >= 0; });
      }).slice(0, 300);
      if (!vus.length) { li.innerHTML = '<div class="cat-vide">Rien ne correspond.</div>'; return; }
      li.innerHTML = vus.map(function (it, i) {
        var l = ligne(it);
        return '<button class="cat-it" data-i="' + i + '">'
          + '<div class="cat-n">' + esc(l.nom)
          + (l.marque ? '<span class="cat-of">' + esc(l.marque) + '</span>' : '') + '</div>'
          + (l.meta ? '<div class="cat-m">' + esc(l.meta) + '</div>' : '')
          + (l.desc ? '<div class="cat-d">' + esc(l.desc) + '</div>' : '')
          + '</button>';
      }).join('');
    }
    peindre();

    function fermer() { ov.remove(); }
    q.addEventListener('input', peindre);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fermer();
      if (e.key === 'Enter' && vus.length === 1) { fermer(); apres(vus[0]); }
    });
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.getAttribute('data-x')) { fermer(); return; }
      var b = e.target.closest('.cat-it');
      if (!b) return;
      fermer();
      apres(vus[+b.getAttribute('data-i')]);
    });
    setTimeout(function () { q.focus(); }, 40);
  }

  /* Une compétence groupée demande sa spécialisation avant d'être posée. */
  function poserComp(c, champNom, champCar) {
    function fin(nom) { poser(champNom, nom); poser(champCar, c.c); }
    if (!c.sp || !c.sp.length) { fin(c.n); return; }
    var opts = c.sp.map(function (s) { return { n: s }; });
    opts.push({ n: '', libre: true });
    choisir(c.n, 'Cette compétence se décline : choisis la spécialisation.', opts,
      function (o) {
        return o.libre
          ? { nom: 'Autre spécialisation…', desc: 'Saisir librement', cle: 'autre libre' }
          : { nom: o.n, cle: o.n };
      },
      function (o) {
        if (!o.libre) { fin(c.n + ' (' + o.n + ')'); return; }
        var v = prompt('Spécialisation de ' + c.n + ' :', '');
        if (v && v.trim()) fin(c.n + ' (' + v.trim() + ')');
      });
  }

  var OFF = function (o) { return o.off ? '' : 'maison'; };

  window.CAT = {
    competences: function (avancee) {
      var l = C.competences.filter(function (c) { return !!c.av === !!avancee; });
      choisir(avancee ? 'Compétences avancées' : 'Compétences de base',
        'Livre de base, recoupé avec Up in Arms. Le choix remplit le formulaire, tu valides ensuite.',
        l,
        function (c) {
          return { nom: c.n, meta: c.c + (c.sp.length ? ' · à spécialiser' : ''),
                   desc: c.d.slice(0, 130), cle: c.n + ' ' + c.c + ' ' + c.sp.join(' ') };
        },
        function (c) { poserComp(c, avancee ? 'adv-name' : 'skill-name', avancee ? 'adv-car' : 'skill-car'); });
    },

    talents: function () {
      choisir('Talents', 'Les 167 talents du livre de base, avec les révisions d\'Up in Arms.',
        C.talents,
        function (t) {
          return { nom: t.n, meta: 'Maxi : ' + t.max, desc: t.d.slice(0, 150),
                   cle: t.n + ' ' + t.d };
        },
        function (t) { poser('talent-name-new', t.n); poser('talent-desc-new', t.d); });
    },

    armes: function () {
      choisir('Armes', 'Corps à corps, distance et boucliers. Les lignes maison sont signalées.',
        C.armes,
        function (a) {
          return { nom: a.n, marque: OFF(a),
                   meta: a.s + ' · ' + a.px + ' · Enc ' + a.enc + ' · ' + a.dis,
                   desc: 'Allonge ' + a.all + ' · Dégâts ' + a.deg + (a.at && a.at !== '–' ? ' · ' + a.at : ''),
                   cle: a.n + ' ' + a.s + ' ' + a.at };
        },
        function (a) {
          poser('wep-name', a.n); poser('wep-all', a.all); poser('wep-deg', a.deg);
          poser('wep-enc', parseInt(a.enc) || 0); poser('wep-attr', a.at === '–' ? '' : a.at);
        });
    },

    armures: function () {
      choisir('Armures et boucliers', 'Le choix remplit le formulaire, tu valides ensuite.',
        C.armures,
        function (a) {
          return { nom: a.n, marque: OFF(a),
                   meta: a.s + ' · PA ' + a.pa + ' · Enc ' + a.enc + ' · ' + a.px,
                   desc: (a.loc ? a.loc + '. ' : '') + (a.pen && a.pen !== '–' ? 'Pénalité ' + a.pen : ''),
                   cle: a.n + ' ' + a.s + ' ' + a.loc };
        },
        function (a) {
          poser('ap-name', a.n); poser('ap-pa', parseInt(a.pa) || 0);
          poser('ap-enc', parseInt(a.enc) || 0);
          poser('ap-pen', a.pen === '–' ? '' : a.pen);
          poser('ap-attr', a.at === '–' ? '' : a.at);
        });
    },

    /* Inventaire : munitions et équipement dans la même liste. Elle ne prétend
       pas être exhaustive, la table d'équipement du livre de base n'y est pas.
       La saisie manuelle reste le moyen normal d'ajouter le reste. */
    inventaire: function () {
      var l = [];
      (C.munitions || []).forEach(function (m) {
        l.push({ n: m.n, cat: 'Munition', px: m.px, dis: m.dis,
                 de: (m.deg && m.deg !== '–' ? 'Dégâts ' + m.deg + '. ' : '') + (m.at || ''),
                 sc: m.s, off: m.off });
      });
      (C.equipement || []).forEach(function (e) {
        l.push({ n: e.n, cat: 'Équipement', px: e.px, dis: e.dis, de: e.de, sc: e.src, off: true });
      });
      choisir('Munitions et équipement',
        'Liste partielle : l\'équipement courant du livre de base n\'y figure pas. Tu peux toujours saisir à la main.',
        l,
        function (o) {
          return { nom: o.n, marque: o.off ? '' : 'maison',
                   meta: o.cat + (o.px ? ' · ' + o.px : '') + (o.dis ? ' · ' + o.dis : ''),
                   desc: o.de, cle: o.n + ' ' + o.cat + ' ' + o.sc + ' ' + o.de };
        },
        function (o) {
          poser('inv-name-new', o.n);
          poser('inv-detail-new', o.px ? (o.cat + ' · ' + o.px) : o.cat);
        });
    }
  };

  /* Un bouton posé à côté de chaque formulaire, sans rien déplacer. */
  function bouton(idApres, texte, action) {
    var champ = document.getElementById(idApres);
    if (!champ) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'cat-btn'; b.textContent = texte;
    b.addEventListener('click', action);
    champ.parentNode.insertBefore(b, champ.nextSibling);
  }

  function installer() {
    bouton('talent-name-new', '\u2630 Catalogue', function () { CAT.talents(); });
    bouton('adv-name', '\u2630 Catalogue', function () { CAT.competences(true); });
    bouton('skill-name', '\u2630 Catalogue', function () { CAT.competences(false); });
    bouton('wep-name', '\u2630 Catalogue', function () { CAT.armes(); });
    bouton('ap-name', '\u2630 Catalogue', function () { CAT.armures(); });
    bouton('inv-name-new', '\u2630 Catalogue', function () { CAT.inventaire(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installer);
  else installer();
})();
