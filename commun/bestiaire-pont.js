/* ============================================================
   Pont bestiaire ↔ scénario
   Deux gestes :
   1. « Du bestiaire » insère un bloc de statistiques rempli depuis une entrée.
   2. « → Bestiaire » enregistre un bloc de statistiques comme entrée.
   Le module vit seul : il se branche sur la barre d'édition du scénario
   s'il la trouve, et ne touche à rien d'autre.
   ============================================================ */
(function(){
  'use strict';

  var CARACS = ['M','CC','CT','F','E','I','Ag','Dex','Int','FM','Soc','B'];
  var RACINE_BESTIAIRE = 'outils/bestiaire/donnees';

  /* ---------- campagne, déduite de la branche du scénario ---------- */
  function campagne(){
    var r = String(window.RACINE || '');
    var m = r.match(/scenarios\/([a-z0-9_-]+)/i);
    if(m) return m[1].toLowerCase();
    // Les scénarios enferment RACINE dans une IIFE : on se rabat sur le chemin.
    var p = String(location.pathname || '').toLowerCase();
    if(p.indexOf('/eclipse/') >= 0 || p.indexOf('scenario-eclipse') >= 0) return 'eclipse';
    if(p.indexOf('/bds/') >= 0 || p.indexOf('scenario-bds') >= 0) return 'bds';
    return '';
  }

  /* ---------- base ---------- */
  function base(){
    try{
      if(typeof firebase === 'undefined') return null;
      if(!firebase.apps.length) return null;
      return firebase.database();
    }catch(e){ return null; }
  }

  var cacheBestiaire = null;

  function lireBestiaire(force){
    var db = base();
    if(!db) return Promise.reject(new Error('base hors ligne'));
    if(cacheBestiaire && !force) return Promise.resolve(cacheBestiaire);
    return db.ref(RACINE_BESTIAIRE).once('value').then(function(sn){
      var v = sn.val();
      var liste = (v && v.payload && v.payload.entrees) || [];
      if(liste && !Array.isArray(liste)) liste = Object.values(liste);
      cacheBestiaire = liste || [];
      return cacheBestiaire;
    });
  }

  function ecrireBestiaire(entree){
    var db = base();
    if(!db) return Promise.reject(new Error('base hors ligne'));
    var ref = db.ref(RACINE_BESTIAIRE);
    return ref.once('value').then(function(sn){
      var v = sn.val() || {};
      var payload = v.payload || { intro:'', entrees:[] };
      var liste = payload.entrees || [];
      if(liste && !Array.isArray(liste)) liste = Object.values(liste);
      var i = -1;
      for(var k = 0; k < liste.length; k++){ if(liste[k] && liste[k].id === entree.id){ i = k; break; } }
      if(i >= 0) liste[i] = entree; else liste.push(entree);
      payload.entrees = liste;
      cacheBestiaire = liste;
      return ref.set({ payload: payload, at: Date.now(), par: 'scenario-' + campagne() })
        .then(function(){
          document.querySelectorAll('.sr-hote').forEach(function(h){ h.__bid = null; });
          peindreRefs();
          return i >= 0;
        });
    });
  }

  /* ---------- petits outils ---------- */
  function ech(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function texte(el){
    return String(el ? el.textContent : '').replace(/\s+/g, ' ').trim();
  }
  function identifiant(nom, pris){
    var s = String(nom || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    s = s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'entree';
    var socle = s, n = 2;
    while(pris.indexOf(s) >= 0){ s = socle + '-' + n; n++; }
    return s;
  }
  var signalTimer = null;
  function signal(msg, erreur){
    styles();
    var t = document.getElementById('bp-toast');
    if(!t){
      t = document.createElement('div');
      t.id = 'bp-toast';
      t.className = 'bp-toast';
      t.__bp = true;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = 'bp-toast on' + (erreur ? ' err' : '');
    clearTimeout(signalTimer);
    signalTimer = setTimeout(function(){ t.className = 'bp-toast'; }, 2600);
  }
  // Les scénarios enferment marquerSale dans une IIFE. Ils écoutent en
  // revanche l'événement input sur le document, en remontant au plus proche
  // [contenteditable='true'] : on passe par là.
  function marquer(el){
    var sec = el && el.closest ? el.closest('.section-panel') : null;
    if(!sec) return;
    if(typeof window.marquerSale === 'function'){ window.marquerSale(sec); return; }

    var zone = sec.matches && sec.matches('[contenteditable="true"]')
      ? sec
      : sec.querySelector('[contenteditable="true"]');
    var jetable = null;
    if(!zone){
      var haut = sec.closest('[contenteditable="true"]');
      if(haut){ zone = haut; }
      else {
        jetable = document.createElement('span');
        jetable.setAttribute('contenteditable', 'true');
        jetable.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0';
        sec.appendChild(jetable);
        zone = jetable;
      }
    }
    try{
      zone.dispatchEvent(new Event('input', { bubbles:true }));
    }catch(e){
      var ev = document.createEvent('Event');
      ev.initEvent('input', true, false);
      zone.dispatchEvent(ev);
    }
    if(jetable && jetable.parentNode) jetable.parentNode.removeChild(jetable);
  }

  /* ---------- lecture d'un bloc de statistiques ---------- */
  function lireCarte(carte){
    var nom = texte(carte.querySelector('.stat-name')) || 'Sans nom';
    var role = texte(carte.querySelector('.stat-kind'));
    var pfEl = carte.querySelector('.pf[data-pf]');

    var lignes = [], entete = null;
    var trs = carte.querySelectorAll('table.statblock tr');
    for(var i = 0; i < trs.length; i++){
      var ths = trs[i].querySelectorAll('th');
      var tds = trs[i].querySelectorAll('td');
      if(ths.length && !tds.length){
        entete = [];
        for(var j = 1; j < ths.length; j++) entete.push(texte(ths[j]));
        continue;
      }
      if(tds.length){
        var cles = (entete && entete.length) ? entete : CARACS;
        var p = {};
        for(var k = 1; k < tds.length; k++){
          var cle = cles[k - 1];
          if(cle) p[cle] = texte(tds[k]);
        }
        lignes.push({ nom: texte(tds[0]), carac: p });
      }
    }

    var armes = '', comp = '', notes = '', traits = [];
    var noeuds = carte.querySelectorAll('.stat-body > *');
    var titre = null;
    for(var n = 0; n < noeuds.length; n++){
      var el = noeuds[n];
      if(el.classList && el.classList.contains('stat-line')){ titre = texte(el).toLowerCase(); continue; }
      if(!titre) continue;
      if(titre.indexOf('arme') === 0 || titre.indexOf('armure') === 0){
        armes += (armes ? ' ' : '') + texte(el);
      } else if(titre.indexOf('comp') === 0){
        comp += (comp ? ' ' : '') + texte(el);
      } else if(titre.indexOf('trait') === 0 || titre.indexOf('talent') === 0){
        var spans = el.querySelectorAll('.trait');
        for(var s = 0; s < spans.length; s++){
          var prec = '', suiv = spans[s].nextSibling;
          while(suiv && !(suiv.nodeType === 1 && suiv.classList && suiv.classList.contains('trait'))){
            prec += suiv.textContent || '';
            suiv = suiv.nextSibling;
          }
          traits.push({ nom: texte(spans[s]), precision: prec.replace(/\s+/g, ' ').trim() });
        }
        if(!spans.length){
          var brut = texte(el);
          if(brut) notes += (notes ? '\n\n' : '') + 'Traits. ' + brut;
        }
      } else {
        var bout = texte(el);
        if(bout) notes += (notes ? '\n\n' : '') + titre.charAt(0).toUpperCase() + titre.slice(1) + '. ' + bout;
      }
    }

    var pa = '';
    var mpa = armes.match(/PA\s*(\d+)/g);
    if(!mpa) mpa = armes.match(/(\d+)\s*PA/g);
    if(mpa && mpa.length) pa = mpa[mpa.length - 1].replace(/\D/g, '');

    return {
      nom: nom, role: role, campagne: campagne(),
      portrait: pfEl ? (pfEl.getAttribute('data-pf') || '') : '',
      profils: lignes, pa: pa, armes: armes, competences: comp,
      traits: traits, notes: notes, source: 'scenario'
    };
  }

  /* ---------- écriture d'un bloc de statistiques ---------- */
  function carteDepuisEntree(e){
    var p = e.profil || {};
    var h = '<div class="stat-card" data-fiche="' + ech(e.id) + '">';
    h += '<div class="stat-head">';
    if(e.portrait) h += '<button class="pf" type="button" data-pf="' + ech(e.portrait) + '"></button>';
    h += '<span class="stat-name">' + ech(e.nom) + '</span>';
    h += '<span class="stat-kind">' + ech(e.role || '') + '</span></div>';
    h += '<div class="stat-body"><div class="statblock-wrap"><table class="statblock"><tbody><tr><th>Profil</th>';
    for(var i = 0; i < CARACS.length; i++) h += '<th>' + CARACS[i] + '</th>';
    h += '</tr><tr><td>' + ech(e.nom) + '</td>';
    for(var j = 0; j < CARACS.length; j++) h += '<td>' + ech(p[CARACS[j]] || '—') + '</td>';
    h += '</tr></tbody></table></div>';
    if(e.armes) h += '<span class="stat-line">Armes &amp; armure</span><p>' + ech(e.armes) + '</p>';
    if(e.competences) h += '<span class="stat-line">Compétences</span><p>' + ech(e.competences) + '</p>';
    var tr = e.traits;
    if(tr && !Array.isArray(tr)) tr = Object.values(tr);
    if(tr && tr.length){
      h += '<span class="stat-line">Traits</span><p>';
      for(var t = 0; t < tr.length; t++){
        var x = tr[t] || {};
        var nom = x.nom || String(x);
        h += '<span class="trait">' + ech(nom) + '</span>';
        if(x.precision) h += ' ' + ech(x.precision);
        h += ' ';
      }
      h += '</p>';
    }
    if(e.notes) h += '<span class="stat-line">En jeu</span><p>' + ech(e.notes).replace(/\n\n/g, '<br>') + '</p>';
    h += '</div></div>';
    return h;
  }

  /* ---------- bloc de référence : le scénario ne stocke qu'un identifiant ----------
     Le profil est rendu dans un Shadow DOM. Les scénarios sauvegardent leurs
     sections en clonant le HTML affiché : le shadow leur est invisible, donc
     seule la référence part en base. Le nom et le rôle restent en clair pour
     que la recherche interne du scénario retrouve la scène. */

  function refDepuisEntree(e){
    var h = '<div class="stat-ref" data-bid="' + ech(e.id) + '">';
    h += '<div class="stat-head">';
    h += '<span class="stat-name">' + ech(e.nom) + '</span>';
    h += '<span class="stat-kind">' + ech(e.role || '') + '</span>';
    h += '</div><div class="sr-hote"></div></div>';
    return h;
  }

  var CSS_SHADOW = [
    ':host{display:block}',
    '.b{padding:0.5rem 0.9rem 0.7rem;font-family:inherit;font-size:0.86rem;line-height:1.5;',
    '  color:var(--parchment-dark,#d4c8a8)}',
    '.w{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 0 0.5rem}',
    'table{border-collapse:collapse;width:100%;font-size:0.78rem}',
    'th{background:rgba(169,113,59,0.2);color:var(--CUI-light,#d19a5e);font-weight:400;',
    '  text-align:center;padding:0.2rem 0.35rem;border:1px solid rgba(169,113,59,0.3);',
    '  font-size:0.68rem;letter-spacing:0.05em;white-space:nowrap}',
    'th:first-child{text-align:left}',
    'td{border:1px solid rgba(169,113,59,0.22);padding:0.24rem 0.35rem;text-align:center;',
    '  font-variant-numeric:tabular-nums}',
    'td:first-child{text-align:left;color:var(--CUI-light,#d19a5e);white-space:nowrap}',
    '.l{display:block;font-size:0.62rem;letter-spacing:0.15em;text-transform:uppercase;',
    '  color:var(--CUI,#A9713B);margin:0.5rem 0 0.1rem}',
    'p{margin:0 0 0.2rem}',
    '.t{display:inline-block;padding:0 0.3rem;margin:0 0.25rem 0.2rem 0;border-radius:2px;',
    '  font-size:0.76rem;border:1px solid rgba(169,113,59,0.35);background:rgba(169,113,59,0.14);',
    '  color:var(--CUI-light,#d19a5e)}',
    '.n{opacity:0.78;white-space:pre-wrap}',
    '.err{padding:0.5rem 0.9rem 0.7rem;font-size:0.8rem;color:#c05050;font-style:italic}',
    '@media print{.w{overflow:visible}}'
  ].join('\n');

  function corpsShadow(e, sansNotes){
    var p = e.profil || {};
    var h = '<style>' + CSS_SHADOW + '</style><div class="b">';
    h += '<div class="w"><table><tbody><tr><th>Profil</th>';
    for(var i = 0; i < CARACS.length; i++) h += '<th>' + CARACS[i] + '</th>';
    h += '</tr><tr><td>' + ech(e.nom) + '</td>';
    for(var j = 0; j < CARACS.length; j++) h += '<td>' + ech(p[CARACS[j]] || '—') + '</td>';
    h += '</tr></tbody></table></div>';
    if(e.armes) h += '<span class="l">Armes et armure</span><p>' + ech(e.armes) + '</p>';
    if(e.competences) h += '<span class="l">Compétences</span><p>' + ech(e.competences) + '</p>';
    var tr = e.traits;
    if(tr && !Array.isArray(tr)) tr = tr ? Object.values(tr) : [];
    if(tr && tr.length){
      h += '<span class="l">Traits</span><p>';
      for(var t = 0; t < tr.length; t++){
        var x = tr[t] || {};
        h += '<span class="t">' + ech(x.nom || String(x)) + '</span>';
        if(x.precision) h += ' ' + ech(x.precision) + ' ';
      }
      h += '</p>';
    }
    if(e.notes && !sansNotes) h += '<span class="l">En jeu</span><p class="n">' + ech(e.notes) + '</p>';
    h += '</div>';
    return h;
  }

  function peindreRef(bloc){
    var hote = bloc.querySelector('.sr-hote');
    if(!hote) return;
    var bid = bloc.getAttribute('data-bid') || '';
    var racine = hote.shadowRoot;
    if(!racine){
      try{ racine = hote.attachShadow({ mode:'open' }); }
      catch(err){ return; }
    }
    if(hote.__bid === bid && racine.innerHTML) return;

    var e = (cacheBestiaire || []).filter(function(x){ return x.id === bid; })[0];
    if(e){
      racine.innerHTML = corpsShadow(e, notesDejaVues(bloc, e));
      hote.__bid = bid;
      // Le nom et le rôle en clair suivent l'entrée du bestiaire.
      var n = bloc.querySelector('.stat-name'), r = bloc.querySelector('.stat-kind');
      if(n && n.textContent !== e.nom) n.textContent = e.nom;
      if(r && r.textContent !== (e.role || '')) r.textContent = e.role || '';
      return;
    }
    if(cacheBestiaire){
      racine.innerHTML = '<style>' + CSS_SHADOW + '</style>' +
        '<div class="err">Entrée absente du bestiaire (' + ech(bid) + ').</div>';
      hote.__bid = bid;
    } else {
      racine.innerHTML = '<style>' + CSS_SHADOW + '</style>' +
        '<div class="err">Lecture du bestiaire…</div>';
    }
  }

  // Vrai si un appel précédent du même groupe porte déjà ces notes.
  function notesDejaVues(bloc, e){
    if(!e.notes) return false;
    var lot = bloc.closest ? bloc.closest('.stat-lot') : null;
    if(!lot) return false;
    var freres = lot.querySelectorAll('.stat-ref');
    for(var i = 0; i < freres.length; i++){
      if(freres[i] === bloc) return false;
      var autre = (cacheBestiaire || []).filter(function(x){
        return x.id === freres[i].getAttribute('data-bid');
      })[0];
      if(autre && autre.notes === e.notes) return true;
    }
    return false;
  }

  function peindreRefs(){
    var blocs = document.querySelectorAll('.stat-ref');
    if(!blocs.length) return;
    if(!cacheBestiaire){
      for(var i = 0; i < blocs.length; i++) peindreRef(blocs[i]);
      lireBestiaire().then(peindreRefs).catch(function(){});
      return;
    }
    for(var j = 0; j < blocs.length; j++) peindreRef(blocs[j]);
  }

  /* ---------- habillage ---------- */
  function styles(){
    if(document.getElementById('bp-style')) return;
    var css = document.createElement('style');
    css.id = 'bp-style';
    css.__bp = true;
    css.textContent = [
      '.bp-voile{position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:6000;display:none;',
      '  align-items:flex-start;justify-content:center;padding:4vh 1rem;overflow:auto}',
      '.bp-voile.on{display:flex}',
      '.bp-boite{width:100%;max-width:600px;background:#14131a;color:#d4c8a8;',
      '  border:1px solid rgba(169,113,59,0.5);border-radius:3px;padding:0.9rem 1rem 1rem;',
      '  font-family:inherit;box-shadow:0 20px 60px rgba(0,0,0,0.7)}',
      '.bp-boite h3{font-family:"Cinzel",serif;font-size:0.85rem;letter-spacing:0.12em;',
      '  text-transform:uppercase;color:#d19f6a;margin:0 0 0.5rem}',
      '.bp-boite p{font-size:0.82rem;opacity:0.75;margin:0 0 0.7rem;line-height:1.45}',
      '.bp-champ{display:block;width:100%;background:#0d0c11;border:1px solid rgba(169,113,59,0.35);',
      '  color:#d4c8a8;padding:0.4rem 0.55rem;border-radius:2px;font-family:inherit;',
      '  font-size:0.85rem;margin:0 0 0.55rem}',
      '.bp-champ:focus{outline:none;border-color:#a9713b}',
      '.bp-lab{display:block;font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;',
      '  color:#a9713b;margin:0 0 0.2rem}',
      '.bp-liste{max-height:44vh;overflow:auto;border:1px solid rgba(169,113,59,0.28);',
      '  border-radius:2px;background:#0d0c11;padding:0.25rem;margin:0 0 0.7rem}',
      '.bp-l{display:flex;gap:0.5rem;align-items:baseline;width:100%;text-align:left;',
      '  padding:0.28rem 0.4rem;background:transparent;border:1px solid transparent;',
      '  border-radius:2px;color:#d4c8a8;cursor:pointer;font-family:inherit;font-size:0.83rem}',
      '.bp-l:hover,.bp-l.sel{border-color:rgba(169,113,59,0.55);background:rgba(169,113,59,0.12)}',
      '.bp-l .n{color:#d19f6a;white-space:nowrap}',
      '.bp-l .r{flex:1;min-width:0;opacity:0.65;font-size:0.76rem;overflow:hidden;',
      '  text-overflow:ellipsis;white-space:nowrap}',
      '.bp-l .b{opacity:0.55;font-size:0.72rem;white-space:nowrap}',
      '.impl{display:flex;align-items:baseline;gap:0.45rem;width:100%;padding:0.3rem 0.4rem;',
      '  border-bottom:1px solid rgba(169,113,59,0.14);font-size:0.83rem;cursor:pointer;',
      '  color:#d4c8a8}',
      '.impl:last-child{border-bottom:none}',
      '.impl:hover{background:rgba(169,113,59,0.1)}',
      '.impl input{margin:0;flex:0 0 auto}',
      '.impl .n{color:#d19f6a;white-space:nowrap;flex:0 0 auto;max-width:48%;',
      '  overflow:hidden;text-overflow:ellipsis}',
      '.impl .r{flex:1;min-width:0;opacity:0.6;font-size:0.76rem;overflow:hidden;',
      '  text-overflow:ellipsis;white-space:nowrap}',
      '.impl .e{flex:0 0 auto;color:#8d8375;font-size:0.7rem;font-style:italic;white-space:nowrap}',
      '.impl.bp-alerte .e{color:#d19f6a;font-style:normal}',
      '.impl.bp-gris{opacity:0.45;cursor:default}',
      '.bp-conflit{border:1px solid rgba(169,113,59,0.4);border-left:3px solid #a9713b;',
      '  border-radius:2px;background:rgba(169,113,59,0.08);padding:0.55rem 0.7rem;',
      '  margin:0.2rem 0 0.6rem}',
      '.bp-conflit > b{display:block;color:#d19f6a;font-size:0.84rem;margin:0 0 0.15rem}',
      '.bp-conflit .bp-p{font-size:0.79rem;opacity:0.72;margin:0.15rem 0 0.4rem}',
      '.bp-diff{display:flex;flex-wrap:wrap;gap:0.25rem;margin:0 0 0.55rem}',
      '.bp-d{font-size:0.74rem;padding:0.12rem 0.4rem;border-radius:2px;',
      '  border:1px solid rgba(169,113,59,0.3);background:rgba(13,12,17,0.75);color:#d4c8a8;',
      '  white-space:nowrap;line-height:1.5}',
      '.bp-d i{font-style:normal;color:#a9713b;letter-spacing:0.05em;margin-right:0.3rem}',
      '.bp-d em{font-style:normal;opacity:0.45;margin:0 0.2rem}',
      '.bp-choix{display:flex;gap:0.5rem;align-items:flex-start;padding:0.32rem 0;',
      '  font-size:0.79rem;cursor:pointer;line-height:1.45;color:#d4c8a8}',
      '.bp-choix + .bp-choix{border-top:1px solid rgba(169,113,59,0.18)}',
      '.bp-choix input{margin:0.28rem 0 0;flex:0 0 auto}',
      '.bp-choix span{flex:1;min-width:0}',
      '.bp-choix b{color:#d19f6a;font-weight:600}',
      '.bp-act{display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap}',
      '.bp-act .sp{flex:1}',
      '.bp-btn{background:#241f1a;border:1px solid rgba(169,113,59,0.4);color:#d4c8a8;',
      '  padding:0.35rem 0.7rem;border-radius:2px;cursor:pointer;font-family:inherit;font-size:0.8rem}',
      '.bp-btn:hover{border-color:#a9713b;color:#fff}',
      '.bp-btn.pri{background:#3a1512;border-color:#5d201a}',
      '.bp-btn[disabled]{opacity:0.45;cursor:default}',
      '#bp-vers{position:fixed;z-index:5900;background:#14131a;',
      '  border:1px solid rgba(169,113,59,0.55);color:#d19f6a;padding:0.12rem 0.45rem;border-radius:2px;',
      '  cursor:pointer;font-family:"Cinzel",serif;font-size:0.62rem;letter-spacing:0.08em;',
      '  text-transform:uppercase;display:none;box-shadow:0 2px 10px rgba(0,0,0,0.6)}',
      '.stat-lot{border-left:2px solid rgba(169,113,59,0.35);padding-left:0.6rem;margin:1rem 0}',
      '.stat-lot .stat-ref{margin:0 0 0.5rem}',
      '.stat-lot .stat-ref:last-child{margin-bottom:0}',
      '.sl-titre{font-family:"Cinzel",serif;font-size:0.8rem;letter-spacing:0.05em;',
      '  color:var(--CUI-light,#d19a5e);margin:0 0 0.4rem;opacity:0.85}',
      '.stat-ref{border:1px solid rgba(169,113,59,0.42);border-left:3px solid var(--CUI,#A9713B);',
      '  border-radius:2px;background:rgba(169,113,59,0.05);margin:1rem 0;overflow:hidden}',
      '.stat-ref > .stat-head{background:rgba(169,113,59,0.2);padding:0.45rem 0.9rem;display:flex;',
      '  justify-content:space-between;align-items:baseline;gap:0.7rem;flex-wrap:wrap;',
      '  border-bottom:1px solid rgba(169,113,59,0.28)}',
      '.stat-ref .stat-name{font-family:"Cinzel",serif;font-size:0.9rem;letter-spacing:0.05em;',
      '  color:var(--CUI-light,#d19a5e)}',
      '.stat-ref .stat-kind{font-size:0.72rem;font-style:italic;color:#9a7550}',
      '#bp-vers.on{display:block}',
      '#bp-vers:hover{border-color:#a9713b;color:#fff;background:#241f1a}',
      '.bp-toast{position:fixed;left:50%;bottom:4.5rem;transform:translateX(-50%) translateY(1rem);',
      '  z-index:6100;background:#14131a;border:1px solid rgba(169,113,59,0.5);color:#d4c8a8;',
      '  padding:0.4rem 0.9rem;border-radius:2px;font-size:0.82rem;opacity:0;pointer-events:none;',
      '  transition:opacity 0.18s,transform 0.18s}',
      '.bp-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}',
      '.bp-toast.err{border-color:rgba(139,26,26,0.7);color:#e5a08e}',
      '@media print{#bp-vers,.bp-voile,.bp-toast{display:none !important}}'
    ].join('\n');
    document.head.appendChild(css);
  }

  function voile(){
    var v = document.getElementById('bp-voile');
    if(v) return v;
    v = document.createElement('div');
    v.className = 'bp-voile';
    v.id = 'bp-voile';
    v.__bp = true;
    v.innerHTML = '<div class="bp-boite" id="bp-boite"></div>';
    document.body.appendChild(v);
    v.addEventListener('click', function(e){ if(e.target === v) fermer(); });
    return v;
  }
  function ouvrir(html){
    styles();
    var v = voile();
    document.getElementById('bp-boite').innerHTML = html;
    v.classList.add('on');
    return document.getElementById('bp-boite');
  }
  function fermer(){
    var v = document.getElementById('bp-voile');
    if(v) v.classList.remove('on');
  }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') fermer(); });

  /* ---------- 1. insérer un profil venu du bestiaire ---------- */
  function choisirEntree(){
    var boite = ouvrir('<h3>Insérer un profil du bestiaire</h3>' +
      '<p>Lecture du bestiaire…</p>');
    lireBestiaire().then(function(liste){
      if(!liste.length){
        boite.innerHTML = '<h3>Insérer un profil du bestiaire</h3>' +
          '<p>Le bestiaire est vide, ou la base est hors ligne.</p>' +
          '<div class="bp-act"><span class="sp"></span>' +
          '<button class="bp-btn" data-bp="fermer">Fermer</button></div>';
        return;
      }
      var tri = liste.slice().sort(function(a,b){
        return String(a.nom||'').localeCompare(String(b.nom||''), 'fr');
      });
      var h = '<h3>Insérer un profil du bestiaire</h3>';
      h += '<p>Le bloc est inséré dans la scène ouverte. Il reste modifiable sur place ' +
           'sans toucher à l\'entrée du bestiaire.</p>';
      h += '<input type="search" class="bp-champ" id="bp-q" placeholder="Filtrer…" autocomplete="off">';
      h += '<div class="bp-liste" id="bp-liste"></div>';
      h += '<div class="bp-act"><span class="sp"></span>' +
           '<button class="bp-btn" data-bp="fermer">Annuler</button></div>';
      boite.innerHTML = h;

      function peindre(f){
        var q = (f || '').toLowerCase();
        var out = '';
        for(var i = 0; i < tri.length; i++){
          var e = tri[i];
          if(q && (String(e.nom||'') + ' ' + String(e.role||'')).toLowerCase().indexOf(q) < 0) continue;
          var b = (e.profil && e.profil.B) ? ('B ' + e.profil.B) : '';
          out += '<button class="bp-l" type="button" data-bp="prendre" data-id="' + ech(e.id) + '">' +
                 '<span class="n">' + ech(e.nom) + '</span>' +
                 '<span class="r">' + ech(e.role || '') + '</span>' +
                 '<span class="b">' + ech(b) + '</span></button>';
        }
        document.getElementById('bp-liste').innerHTML = out ||
          '<div style="padding:0.5rem;opacity:0.6;font-size:0.8rem">Aucune entrée.</div>';
      }
      peindre('');
      document.getElementById('bp-q').addEventListener('input', function(){ peindre(this.value); });
      document.getElementById('bp-q').focus();
    }).catch(function(err){
      boite.innerHTML = '<h3>Insérer un profil du bestiaire</h3>' +
        '<p>Lecture impossible : ' + ech(err.message) + '</p>' +
        '<div class="bp-act"><span class="sp"></span>' +
        '<button class="bp-btn" data-bp="fermer">Fermer</button></div>';
    });
  }

  function insererEntree(id){
    var e = (cacheBestiaire || []).filter(function(x){ return x.id === id; })[0];
    if(!e){ signal('Entrée introuvable.', true); return; }
    // Le menu a été ouvert depuis une référence : on la fait pointer ailleurs.
    if(refACibler){
      var bloc = refACibler;
      refACibler = null;
      bloc.setAttribute('data-bid', e.id);
      var hote = bloc.querySelector('.sr-hote');
      if(hote) hote.__bid = null;
      peindreRef(bloc);
      marquer(bloc);
      fermer();
      signal('Le bloc appelle : ' + e.nom);
      return;
    }
    // Éclipse laisse plusieurs scènes sans display:none. Seule celle qui est
    // réellement rendue a un offsetParent : c'est celle que le MJ regarde.
    var scenes = document.querySelectorAll('.scene-panel');
    var visible = null;
    for(var i = 0; i < scenes.length; i++){
      if(scenes[i].offsetParent !== null){ visible = scenes[i]; break; }
    }
    if(!visible){
      for(var j = 0; j < scenes.length; j++){
        if(scenes[j].style.display !== 'none'){ visible = scenes[j]; break; }
      }
    }
    if(!visible){ signal('Ouvre une scène d\'abord.', true); fermer(); return; }
    visible.insertAdjacentHTML('beforeend', refDepuisEntree(e));
    var carte = visible.lastElementChild;
    peindreRef(carte);
    marquer(visible);
    fermer();
    signal('Profil appelé : ' + e.nom);
    if(carte && carte.scrollIntoView) carte.scrollIntoView({ block:'center', behavior:'smooth' });
  }

  /* ---------- écarts entre deux profils ---------- */
  function ecarts(lu, e){
    var src = lu.profils.length ? lu.profils[0].carac : {};
    var out = [];
    for(var i = 0; i < CARACS.length; i++){
      var k = CARACS[i];
      var a = String(src[k] || '').trim();
      var b = String((e.profil || {})[k] || '').trim();
      if(a === '—') a = '';
      if(a !== b) out.push({ cle: k, bloc: a || '—', best: b || '—' });
    }
    return out;
  }
  function memeTexte(a, b){
    return String(a || '').replace(/\s+/g, ' ').trim() === String(b || '').replace(/\s+/g, ' ').trim();
  }

  /* ---------- 2. verser un bloc vers le bestiaire ---------- */
  function verserCarte(carte){
    var lu = lireCarte(carte);
    var multi = lu.profils.length > 1;
    lireBestiaire().then(function(liste){
      var pris = liste.map(function(x){ return x.id; });
      var attendu = identifiant(lu.nom, []);
      var jumeau = liste.filter(function(x){ return x.id === attendu; })[0] || null;

      var h = '<h3>Envoyer au bestiaire</h3>';
      if(multi){
        h += '<p>Ce bloc porte ' + lu.profils.length + ' lignes de profil. Chacune devient une ' +
             'entrée distincte, avec les armes, compétences et traits du bloc. Converti, le bloc ' +
             'se découpe en ' + lu.profils.length + ' appels groupés sous son titre actuel.</p>';
      } else {
        h += '<p>Le profil part au bestiaire. Le bloc du scénario peut ensuite devenir un simple ' +
             'appel : tu corriges la créature au bestiaire, la scène suit.</p>';
      }
      h += '<span class="bp-lab">Nom</span>';
      h += '<input type="text" class="bp-champ" id="bp-nom" value="' + ech(lu.nom) + '">';
      h += '<span class="bp-lab">Ligne de rôle</span>';
      h += '<input type="text" class="bp-champ" id="bp-role" value="' + ech(lu.role) + '">';
      h += '<span class="bp-lab">Campagne</span>';
      h += '<select class="bp-champ" id="bp-camp">' +
           '<option value="">Aucune</option>' +
           '<option value="bds"' + (lu.campagne === 'bds' ? ' selected' : '') + '>De Boue et de Sang</option>' +
           '<option value="eclipse"' + (lu.campagne === 'eclipse' ? ' selected' : '') + '>L\u2019Éclipse</option>' +
           '</select>';

      if(jumeau && !multi){
        var diff = ecarts(lu, jumeau);
        var memeArmes = memeTexte(lu.armes, jumeau.armes);
        var memeComp = memeTexte(lu.competences, jumeau.competences);
        h += '<div class="bp-conflit">';
        h += '<b>« ' + ech(jumeau.nom) +' » existe déjà au bestiaire.</b>';
        if(!diff.length && memeArmes && memeComp){
          h += '<p class="bp-p">Les deux versions sont identiques. Rattacher suffit.</p>';
        } else {
          h += '<p class="bp-p">Les deux versions diffèrent :</p><div class="bp-diff">';
          for(var d = 0; d < diff.length; d++){
            h += '<span class="bp-d"><i>' + ech(diff[d].cle) + '</i> ' +
                 ech(diff[d].best) + ' <em>→</em> ' + ech(diff[d].bloc) + '</span>';
          }
          if(!memeArmes) h += '<span class="bp-d"><i>armes</i> texte différent</span>';
          if(!memeComp) h += '<span class="bp-d"><i>compétences</i> texte différent</span>';
          h += '</div>';
        }
        h += '<label class="bp-choix"><input type="radio" name="bp-mode" value="garder" checked>' +
             '<span><b>Garder l\'entrée du bestiaire.</b> Le bloc affichera la version du bestiaire.</span></label>';
        h += '<label class="bp-choix"><input type="radio" name="bp-mode" value="ecraser">' +
             '<span><b>Écraser avec ce bloc.</b> Le scénario fait autorité, l\'entrée est remplacée.</span></label>';
        h += '</div>';
      }

      h += '<div class="bp-act"><span class="sp"></span>' +
           '<button class="bp-btn" data-bp="fermer">Annuler</button>' +
           '<button class="bp-btn" data-bp="verser-ok">Enregistrer seulement</button>' +
           '<button class="bp-btn pri" data-bp="verser-ref">Enregistrer et convertir</button>' +
           '</div>';

      var boite = ouvrir(h);
      boite.setAttribute('data-multi', multi ? '1' : '0');
      cible = { lu: lu, pris: pris, carte: carte, jumeau: jumeau };
      var champ = document.getElementById('bp-nom');
      if(champ) champ.focus();
    }).catch(function(err){
      ouvrir('<h3>Envoyer au bestiaire</h3><p>Lecture impossible : ' + ech(err.message) + '</p>' +
             '<div class="bp-act"><span class="sp"></span>' +
             '<button class="bp-btn" data-bp="fermer">Fermer</button></div>');
    });
  }

  var cible = null;

  // Construit les entrées à écrire. Renvoie null si on garde le jumeau tel quel.
  function entreesDepuisCible(){
    var lu = cible.lu, pris = cible.pris.slice();
    var nom = (document.getElementById('bp-nom').value || '').trim() || lu.nom;
    var role = (document.getElementById('bp-role').value || '').trim();
    var camp = document.getElementById('bp-camp').value;
    var mode = document.querySelector('input[name="bp-mode"]:checked');
    mode = mode ? mode.value : 'neuf';

    if(cible.jumeau && mode === 'garder') return { garde: cible.jumeau, lot: [] };

    var socle = {
      role: role, campagne: camp, pa: lu.pa, armes: lu.armes,
      competences: lu.competences, traits: lu.traits, notes: lu.notes, source: 'scenario'
    };
    var lot = [];
    if(lu.profils.length > 1){
      for(var i = 0; i < lu.profils.length; i++){
        var e = JSON.parse(JSON.stringify(socle));
        e.nom = lu.profils[i].nom || nom;
        e.id = identifiant(e.nom, pris);
        pris.push(e.id);
        e.portrait = (nom.toLowerCase().indexOf(e.nom.toLowerCase()) >= 0) ? lu.portrait : '';
        e.profil = {};
        for(var c = 0; c < CARACS.length; c++) e.profil[CARACS[c]] = lu.profils[i].carac[CARACS[c]] || '';
        e.notes = ('Bloc d\'origine : ' + nom + '.' + (e.notes ? '\n\n' + e.notes : ''));
        lot.push(e);
      }
    } else {
      var u = JSON.parse(JSON.stringify(socle));
      u.nom = nom;
      u.id = identifiant(nom, []);
      u.portrait = lu.portrait;
      u.profil = {};
      var src = lu.profils.length ? lu.profils[0].carac : {};
      for(var d = 0; d < CARACS.length; d++){
        var v = src[CARACS[d]] || '';
        u.profil[CARACS[d]] = (v === '—') ? '' : v;
      }
      lot.push(u);
    }
    return { garde: null, lot: lot };
  }

  function ecrireLot(lot){
    var chaine = Promise.resolve();
    var remplaces = 0;
    lot.forEach(function(e){
      chaine = chaine.then(function(){
        return ecrireBestiaire(e).then(function(remplace){ if(remplace) remplaces++; });
      });
    });
    return chaine.then(function(){ return remplaces; });
  }

  function verserValider(convertir){
    if(!cible) return;
    var res;
    try{ res = entreesDepuisCible(); }
    catch(err){ signal('Lecture du bloc impossible.', true); return; }
    var decoupe = cible.lu.profils.length > 1;
    var titreOrigine = cible.lu.nom;

    var boutons = document.querySelectorAll('[data-bp="verser-ok"],[data-bp="verser-ref"]');
    for(var b = 0; b < boutons.length; b++) boutons[b].setAttribute('disabled', 'disabled');

    var carte = cible.carte;
    var vise = res.garde || res.lot[0];

    ecrireLot(res.lot).then(function(remplaces){
      fermer();
      var n = res.lot.length;
      if(convertir && carte && decoupe && n > 1){
        convertirEnRefs(carte, res.lot, titreOrigine);
        signal('Bloc découpé en ' + n + ' appels vers le bestiaire.');
      } else if(convertir && carte && vise){
        convertirEnRef(carte, vise);
        signal('« ' + vise.nom + ' » : le bloc appelle désormais le bestiaire.');
      } else if(!n){
        signal('Entrée conservée : ' + vise.nom + '.');
      } else {
        signal(n > 1
          ? (n + ' entrées enregistrées au bestiaire.')
          : (remplaces ? 'Entrée mise à jour au bestiaire.' : 'Entrée ajoutée au bestiaire.'));
      }
      cible = null;
    }).catch(function(err){
      for(var k = 0; k < boutons.length; k++) boutons[k].removeAttribute('disabled');
      signal('Écriture impossible : ' + err.message, true);
    });
  }

  /* ---------- conversion d'un bloc figé en référence ---------- */
  function convertirEnRef(carte, e){
    convertirEnRefs(carte, [e], '');
  }

  // Un bloc peut décrire plusieurs créatures dans une seule table : il devient
  // alors autant d'appels, groupés sous le titre du bloc d'origine pour que la
  // scène garde son intitulé et que la recherche du scénario le retrouve.
  function convertirEnRefs(carte, entrees, nomOrigine){
    if(!carte || !carte.parentNode || !entrees || !entrees.length) return;
    var section = carte.closest('.section-panel');
    var html = '';
    if(entrees.length > 1){
      html += '<div class="stat-lot">';
      if(nomOrigine) html += '<div class="sl-titre">' + ech(nomOrigine) + '</div>';
    }
    for(var i = 0; i < entrees.length; i++) html += refDepuisEntree(entrees[i]);
    if(entrees.length > 1) html += '</div>';

    var boite = document.createElement('div');
    boite.innerHTML = html;
    var neuf = boite.firstChild;
    carte.parentNode.replaceChild(neuf, carte);
    var refs = neuf.classList.contains('stat-ref') ? [neuf] : neuf.querySelectorAll('.stat-ref');
    for(var j = 0; j < refs.length; j++) peindreRef(refs[j]);
    if(section) marquer(section);
    else marquer(neuf);
    carteSurvolee = null;
    placerBouton();
  }

  /* ---------- changer la créature appelée par une référence ---------- */
  var refACibler = null;
  function changerRef(bloc){
    refACibler = bloc;
    choisirEntree();
  }

  /* ============================================================
     Conversion en lot : toute la partie ouverte d'un coup
     ============================================================ */
  var lotBlocs = [];

  function partieOuverte(){
    var sections = document.querySelectorAll('.section-panel');
    for(var i = 0; i < sections.length; i++){
      if(sections[i].offsetParent !== null) return sections[i];
    }
    for(var j = 0; j < sections.length; j++){
      if(sections[j].style.display !== 'none') return sections[j];
    }
    return null;
  }

  function titrePartie(sec){
    var t = sec.querySelector('.section-title, .section-header h1, h1');
    return t ? texte(t).replace(/\s*✎\s*$/, '') : (sec.id || 'la partie ouverte');
  }

  function ouvrirLot(){
    var sec = partieOuverte();
    if(!sec){ signal('Ouvre une partie d\'abord.', true); return; }
    var cartes = sec.querySelectorAll('.stat-card');
    if(!cartes.length){
      ouvrir('<h3>Convertir en appels</h3>' +
             '<p>Aucun bloc de statistiques figé dans cette partie.</p>' +
             '<div class="bp-act"><span class="sp"></span>' +
             '<button class="bp-btn" data-bp="fermer">Fermer</button></div>');
      return;
    }

    var boite = ouvrir('<h3>Convertir en appels</h3><p>Lecture des blocs…</p>');
    lireBestiaire().then(function(liste){
      lotBlocs = [];
      for(var i = 0; i < cartes.length; i++){
        var lu = lireCarte(cartes[i]);
        var attendu = identifiant(lu.nom, []);
        var jumeau = liste.filter(function(x){ return x.id === attendu; })[0] || null;
        var diff = jumeau ? ecarts(lu, jumeau) : [];
        var identique = jumeau && !diff.length &&
          memeTexte(lu.armes, jumeau.armes) && memeTexte(lu.competences, jumeau.competences);
        lotBlocs.push({
          carte: cartes[i], lu: lu, jumeau: jumeau,
          multi: lu.profils.length > 1,
          etat: !jumeau ? 'neuf' : (identique ? 'identique' : 'ecart'),
          nbDiff: diff.length
        });
      }

      var neufs = lotBlocs.filter(function(x){ return x.etat === 'neuf' && !x.multi; }).length;
      var idem = lotBlocs.filter(function(x){ return x.etat === 'identique'; }).length;
      var ecart = lotBlocs.filter(function(x){ return x.etat === 'ecart' && !x.multi; }).length;
      var multi = lotBlocs.filter(function(x){ return x.multi; }).length;
      var profilsMulti = lotBlocs.reduce(function(n, x){
        return n + (x.multi ? x.lu.profils.length : 0);
      }, 0);

      var h = '<h3>Convertir en appels</h3>';
      h += '<p>' + lotBlocs.length + ' blocs figés dans « ' + ech(titrePartie(sec)) + ' ». ' +
           'Chaque bloc coché devient un appel vers le bestiaire. Les blocs identiques ' +
           'et les nouveaux sont cochés, ceux qui divergent ne le sont pas.</p>';

      h += '<div class="bp-conflit"><b>Ce que dit la lecture</b><div class="bp-diff">';
      if(idem) h += '<span class="bp-d"><i>' + idem + '</i> déjà identiques</span>';
      if(neufs) h += '<span class="bp-d"><i>' + neufs + '</i> absents du bestiaire</span>';
      if(ecart) h += '<span class="bp-d"><i>' + ecart + '</i> divergents</span>';
      if(multi) h += '<span class="bp-d"><i>' + multi + '</i> à découper en ' +
                     profilsMulti + ' appels</span>';
      h += '</div>';
      if(ecart){
        h += '<label class="bp-choix"><input type="radio" name="bp-lot-mode" value="garder" checked>' +
             '<span><b>Sur divergence, garder le bestiaire.</b> Le bloc affichera la version enregistrée.</span></label>';
        h += '<label class="bp-choix"><input type="radio" name="bp-lot-mode" value="ecraser">' +
             '<span><b>Sur divergence, écraser avec le scénario.</b> L\'entrée du bestiaire est remplacée.</span></label>';
      }
      h += '</div>';

      h += '<div class="bp-liste" id="bp-lot-liste">' + lignesLot() + '</div>';
      h += '<div class="bp-act">' +
           '<button class="bp-btn" data-bp="lot-tout">Tout cocher</button>' +
           '<button class="bp-btn" data-bp="lot-rien">Tout décocher</button>' +
           '<span class="sp"></span>' +
           '<button class="bp-btn" data-bp="fermer">Annuler</button>' +
           '<button class="bp-btn pri" data-bp="lot-ok">Convertir</button></div>';
      boite.innerHTML = h;
    }).catch(function(err){
      boite.innerHTML = '<h3>Convertir en appels</h3><p>Lecture impossible : ' + ech(err.message) + '</p>' +
        '<div class="bp-act"><span class="sp"></span>' +
        '<button class="bp-btn" data-bp="fermer">Fermer</button></div>';
    });
  }

  function lignesLot(){
    var h = '';
    for(var i = 0; i < lotBlocs.length; i++){
      var x = lotBlocs[i];
      var coche = (x.etat !== 'ecart');
      var mot, cls;
      if(x.multi){ mot = x.lu.profils.length + ' profils'; cls = ''; }
      else if(x.etat === 'identique'){ mot = 'identique'; cls = ''; }
      else if(x.etat === 'neuf'){ mot = 'à créer'; cls = ''; }
      else {
        mot = x.nbDiff ? (x.nbDiff + ' écart' + (x.nbDiff > 1 ? 's' : '')) : 'texte différent';
        cls = ' bp-alerte';
      }
      h += '<label class="impl' + cls + '">' +
           '<input type="checkbox" data-i="' + i + '"' + (coche ? ' checked' : '') + '>' +
           '<span class="n">' + ech(x.lu.nom) + '</span>' +
           '<span class="r">' + ech(x.lu.role || '') + '</span>' +
           '<span class="e">' + mot + '</span></label>';
    }
    return h;
  }

  function lancerLot(){
    var boites = document.querySelectorAll('#bp-lot-liste input[type=checkbox]');
    var mode = document.querySelector('input[name="bp-lot-mode"]:checked');
    mode = mode ? mode.value : 'garder';

    var choisis = [];
    for(var b = 0; b < boites.length; b++){
      if(boites[b].checked && !boites[b].disabled) choisis.push(lotBlocs[+boites[b].getAttribute('data-i')]);
    }
    if(!choisis.length){ signal('Rien de coché.', true); return; }

    var bouton = document.querySelector('[data-bp="lot-ok"]');
    if(bouton){ bouton.setAttribute('disabled', 'disabled'); bouton.textContent = 'Conversion…'; }

    var faits = 0, crees = 0, ecrases = 0;
    var chaine = Promise.resolve();

    choisis.forEach(function(x){
      chaine = chaine.then(function(){
        // Un bloc à plusieurs profils devient une entrée par ligne, puis autant
        // d'appels groupés sous son titre.
        if(x.multi){
          var lot = entreesMultiples(x.lu);
          var sous = Promise.resolve();
          lot.forEach(function(e){
            sous = sous.then(function(){
              return ecrireBestiaire(e).then(function(r){ if(r) ecrases++; else crees++; });
            });
          });
          return sous.then(function(){
            convertirEnRefs(x.carte, lot, x.lu.nom);
            faits++;
          });
        }
        // Rien à écrire : l'entrée existe et on la garde telle quelle.
        if(x.jumeau && (x.etat === 'identique' || mode === 'garder')){
          convertirEnRef(x.carte, x.jumeau);
          faits++;
          return null;
        }
        var e = entreeSimple(x.lu, x.jumeau);
        return ecrireBestiaire(e).then(function(remplace){
          if(remplace) ecrases++; else crees++;
          convertirEnRef(x.carte, e);
          faits++;
        });
      });
    });

    chaine.then(function(){
      fermer();
      lotBlocs = [];
      var bout = faits + ' bloc' + (faits > 1 ? 's' : '') + ' converti' + (faits > 1 ? 's' : '');
      if(crees) bout += ', ' + crees + ' entrée' + (crees > 1 ? 's créées' : ' créée');
      if(ecrases) bout += ', ' + ecrases + ' remplacée' + (ecrases > 1 ? 's' : '');
      signal(bout + '.');
    }).catch(function(err){
      if(bouton){ bouton.removeAttribute('disabled'); bouton.textContent = 'Convertir'; }
      signal('Conversion interrompue : ' + err.message, true);
    });
  }

  // Les entrées d'un bloc qui porte plusieurs lignes de profil. Chacune reprend
  // les armes, compétences et traits du bloc, et garde la trace de son origine.
  function entreesMultiples(lu){
    var pris = (cacheBestiaire || []).map(function(x){ return x.id; });
    var lot = [];
    for(var i = 0; i < lu.profils.length; i++){
      var nom = (lu.profils[i].nom || '').trim() || (lu.nom + ' ' + (i + 1));
      var e = {
        id: identifiant(nom, pris),
        nom: nom,
        role: lu.role,
        campagne: lu.campagne,
        portrait: (lu.nom.toLowerCase().indexOf(nom.toLowerCase()) >= 0) ? lu.portrait : '',
        pa: lu.pa, armes: lu.armes, competences: lu.competences,
        traits: lu.traits,
        notes: ("Bloc d'origine : " + lu.nom + '.' + (lu.notes ? '\n\n' + lu.notes : '')),
        source: 'scenario',
        profil: {}
      };
      pris.push(e.id);
      for(var c = 0; c < CARACS.length; c++){
        var v = lu.profils[i].carac[CARACS[c]] || '';
        e.profil[CARACS[c]] = (v === '—') ? '' : v;
      }
      lot.push(e);
    }
    return lot;
  }

  // Une entrée de bestiaire depuis un bloc à profil unique.
  function entreeSimple(lu, jumeau){
    var e = {
      id: jumeau ? jumeau.id : identifiant(lu.nom, []),
      nom: lu.nom,
      role: lu.role,
      campagne: lu.campagne,
      portrait: lu.portrait || (jumeau ? jumeau.portrait : ''),
      pa: lu.pa, armes: lu.armes, competences: lu.competences,
      traits: lu.traits, notes: lu.notes, source: 'scenario',
      profil: {}
    };
    var src = lu.profils.length ? lu.profils[0].carac : {};
    for(var i = 0; i < CARACS.length; i++){
      var v = src[CARACS[i]] || '';
      e.profil[CARACS[i]] = (v === '—') ? '' : v;
    }
    return e;
  }

  /* ---------- bouton de versement, flottant ----------
     Il vit hors des sections : rien ne part dans les sauvegardes du scénario,
     et rien ne se retrouve dans le fichier exporté. */
  var carteSurvolee = null;

  function boutonVerser(){
    var b = document.getElementById('bp-vers');
    if(b) return b;
    styles();
    b = document.createElement('button');
    b.type = 'button';
    b.id = 'bp-vers';
    b.__bp = true;
    b.setAttribute('contenteditable', 'false');
    b.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      if(!carteSurvolee) return;
      if(carteSurvolee.classList.contains('stat-ref')) changerRef(carteSurvolee);
      else verserCarte(carteSurvolee);
    });
    document.body.appendChild(b);
    return b;
  }

  function placerBouton(){
    var b = boutonVerser();
    if(!carteSurvolee || !document.body.classList.contains('editing')){
      b.classList.remove('on');
      return;
    }
    var r = carteSurvolee.getBoundingClientRect();
    if(r.bottom < 0 || r.top > window.innerHeight){ b.classList.remove('on'); return; }
    if(carteSurvolee.classList.contains('stat-ref')){
      b.textContent = '⇄ Changer';
      b.title = 'Appeler une autre créature du bestiaire';
    } else {
      b.textContent = '→ Bestiaire';
      b.title = 'Envoyer ce profil au bestiaire, et le convertir en appel';
    }
    b.classList.add('on');
    var l = Math.min(window.innerWidth - b.offsetWidth - 8, r.right - b.offsetWidth - 6);
    b.style.left = Math.max(8, l) + 'px';
    b.style.top = Math.max(58, r.top + 6) + 'px';
  }

  function suivreSurvol(){
    document.addEventListener('mouseover', function(ev){
      var carte = ev.target.closest ? ev.target.closest('.stat-card, .stat-ref') : null;
      if(carte === carteSurvolee) return;
      if(ev.target.closest && ev.target.closest('#bp-vers')) return;
      carteSurvolee = carte;
      placerBouton();
    });
    window.addEventListener('scroll', placerBouton, true);
    window.addEventListener('resize', placerBouton);
  }

  /* ---------- branchements ---------- */
  // La barre utile est celle qui porte les boutons d'insertion. Les deux
  // scénarios ne la nomment pas pareil, et Éclipse la construit en JS.
  function laBarre(){
    var hote = document.querySelector('[data-ins="profil"]');
    if(hote){
      return hote.closest('.eb2, #editbar, .editbar, #edit-bar, .edit-bar') || hote.parentNode;
    }
    return document.getElementById('eb2')
        || document.getElementById('editbar')
        || document.querySelector('.eb2, .editbar')
        || document.getElementById('edit-bar')
        || document.querySelector('.edit-bar');
  }

  function brancherBarre(){
    var barre = laBarre();
    if(!barre) return;
    var deja = document.getElementById('bp-inserer');
    var dejaLot = document.getElementById('bp-lot');
    // Un bouton venu d'un fichier exporté n'a pas d'écouteur : on le remplace.
    if(deja && deja.__bp && dejaLot && dejaLot.__bp) return;
    if(deja && deja.parentNode) deja.parentNode.removeChild(deja);
    if(dejaLot && dejaLot.parentNode) dejaLot.parentNode.removeChild(dejaLot);

    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'eb-btn eb2-b edit-btn';
    b.id = 'bp-inserer';
    b.setAttribute('contenteditable', 'false');
    b.textContent = '+ Du bestiaire';
    b.title = 'Insérer un profil enregistré dans le bestiaire';
    b.addEventListener('click', function(ev){ ev.preventDefault(); choisirEntree(); });
    b.__bp = true;

    var c = document.createElement('button');
    c.type = 'button';
    c.className = 'eb-btn eb2-b edit-btn';
    c.id = 'bp-lot';
    c.setAttribute('contenteditable', 'false');
    c.textContent = '⇉ Convertir';
    c.title = 'Convertir en appels tous les blocs de la partie ouverte';
    c.addEventListener('click', function(ev){ ev.preventDefault(); ouvrirLot(); });
    c.__bp = true;

    var hote = barre.querySelector('[data-ins="profil"]');
    if(hote && hote.parentNode){
      hote.parentNode.insertBefore(b, hote.nextSibling);
      b.parentNode.insertBefore(c, b.nextSibling);
      return;
    }
    var premier = barre.querySelector('button');
    if(premier){ barre.insertBefore(b, premier); barre.insertBefore(c, b.nextSibling); return; }
    barre.appendChild(b); barre.appendChild(c);
  }

  document.addEventListener('click', function(ev){
    var b = ev.target.closest ? ev.target.closest('[data-bp]') : null;
    if(!b) return;
    var a = b.getAttribute('data-bp');
    if(a === 'fermer'){ fermer(); cible = null; refACibler = null; lotBlocs = []; return; }
    if(a === 'prendre'){ insererEntree(b.getAttribute('data-id')); return; }
    if(a === 'verser-ok'){ verserValider(false); return; }
    if(a === 'verser-ref'){ verserValider(true); return; }
    if(a === 'lot-ok'){ lancerLot(); return; }
    if(a === 'lot-tout' || a === 'lot-rien'){
      var cases = document.querySelectorAll('#bp-lot-liste input[type=checkbox]');
      for(var c = 0; c < cases.length; c++){
        if(!cases[c].disabled) cases[c].checked = (a === 'lot-tout');
      }
      return;
    }
    if(a === 'verser'){
      var carte = b.closest('.stat-card');
      if(carte) verserCarte(carte);
      return;
    }
  });

  // Un fichier exporté depuis le scénario embarque les éléments posés par ce
  // module, privés de leurs écouteurs. On les jette avant de les recréer.
  function nettoyerVestiges(){
    ['bp-vers', 'bp-style', 'bp-voile', 'bp-toast', 'bp-lot'].forEach(function(id){
      var el = document.getElementById(id);
      if(el && !el.__bp && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  function demarrer(){
    nettoyerVestiges();
    styles();
    boutonVerser();
    suivreSurvol();
    brancherBarre();
    peindreRefs();
    // Les scénarios remplacent des sections entières en direct, et la barre
    // d'édition peut être reconstruite : on se rebranche sur ce qui apparaît.
    var attente = null;
    var obs = new MutationObserver(function(){
      clearTimeout(attente);
      attente = setTimeout(function(){ brancherBarre(); peindreRefs(); placerBouton(); }, 250);
    });
    var racine = document.getElementById('main') || document.querySelector('.main') || document.body;
    obs.observe(racine, { childList:true, subtree:true });
    var barre = laBarre();
    if(barre && barre.parentNode) obs.observe(barre.parentNode, { childList:true });
  }

  setTimeout(demarrer, 0);
})();
