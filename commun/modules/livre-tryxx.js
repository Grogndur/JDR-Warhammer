/* Le Livre — mécanique de Tryxx Effendyl
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis tryxx.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "livre-tryxx",
    titre: "Le Livre",
    css: "/* Couleur d'accent propre au personnage, reprise de sa fiche d'origine. */\n[data-module=\"livre-tryxx\"] { --VIO2:#c8922a; }\n.livre-card { background:rgba(8,8,12,0.7); border:1px solid rgba(184,146,42,0.25); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.livre-tabs { display:flex; gap:0.35rem; margin-bottom:0.9rem; flex-wrap:wrap; }\n.livre-tab { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; padding:0.28rem 0.7rem; border-radius:1px; cursor:pointer; transition:all 0.15s; border:1px solid rgba(255,255,255,0.07); background:transparent; color:var(--SUB); }\n.livre-tab.active { border-color:rgba(184,146,42,0.5); color:rgba(184,146,42,1); background:rgba(184,146,42,0.08); }\n.livre-tab.leg { border-color:rgba(184,146,42,0.5) !important; color:var(--GLD) !important; background:rgba(184,146,42,0.07) !important; }\n.livre-tab.leg.active { background:rgba(184,146,42,0.15) !important; }\n.livre-panel { display:none; }\n.livre-panel.active { display:block; }\n.livre-entry { display:flex; align-items:flex-start; gap:0.55rem; padding:0.4rem 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.84rem; }\n.livre-entry:last-child { border-bottom:none; }\n.livre-entry-left { flex:1; }\n.livre-entry-name { color:var(--parchment); font-weight:600; font-family:'Cinzel',serif; font-size:0.82rem; }\n.livre-entry-avantage { color:var(--parchment-dark); font-size:0.78rem; font-style:italic; margin-top:0.1rem; line-height:1.4; }\n.livre-statut { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.12rem 0.4rem; border-radius:1px; border:1px solid; white-space:nowrap; flex-shrink:0; cursor:pointer; transition:all 0.15s; }\n.livre-statut.pressenti { border-color:rgba(102,85,85,0.5); color:#a08888; background:rgba(102,85,85,0.08); }\n.livre-statut.identifie { border-color:rgba(184,146,42,0.5); color:rgba(184,146,42,1); background:rgba(184,146,42,0.1); }\n.livre-statut.compris { border-color:rgba(184,146,42,0.6); color:var(--GLD); background:rgba(184,146,42,0.1); }\n.livre-del { color:rgba(139,26,26,0.4); cursor:pointer; font-size:0.72rem; flex-shrink:0; transition:color 0.15s; padding:0.1rem; }\n.livre-del:hover { color:#e08080; }\n.livre-add-form { display:none; margin-top:0.6rem; background:rgba(184,146,42,0.05); border:1px solid rgba(184,146,42,0.15); border-radius:2px; padding:0.65rem; flex-direction:column; gap:0.4rem; }\n.livre-add-form.visible { display:flex; }\n.livre-add-form input, .livre-add-form textarea { background:rgba(184,146,42,0.07); border:1px solid rgba(184,146,42,0.2); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.88rem; padding:0.3rem 0.5rem; border-radius:1px; width:100%; }\n.livre-add-form input:focus, .livre-add-form textarea:focus { outline:none; border-color:rgba(184,146,42,0.5); }\n.livre-add-form textarea { resize:vertical; min-height:50px; }\n.livre-count { font-size:0.65rem; color:var(--SUB); font-style:italic; margin-bottom:0.5rem; }\n.livre-empty { font-size:0.82rem; color:var(--SUB); font-style:italic; padding:0.4rem 0; }\n.livre-badge-leg { display:inline-block; font-size:0.55rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--GLD); border:1px solid rgba(184,146,42,0.4); padding:0.05rem 0.3rem; border-radius:1px; margin-left:0.35rem; vertical-align:middle; }\n/* Règles reprises de tryxx.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n.btn-add-gld { background:rgba(184,146,42,0.08); border:1px solid rgba(184,146,42,0.3); color:var(--GLD); }\n.btn-add-gld:hover { background:rgba(184,146,42,0.18); }\n.btn-add-vio { background:rgba(184,146,42,0.1); border:1px solid rgba(184,146,42,0.4); color:var(--VIO2); }\n.btn-add-vio:hover { background:rgba(184,146,42,0.22); }\n",
    html: "<div class=\"livre-card\">\n    <div class=\"card-title vio\" style=\"margin-bottom:0.5rem;\">Le Livre des Présences\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">— carnet partagé Kantagoran &amp; Tryxx</span>\n    </div>\n    <div style=\"font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.75rem;line-height:1.5;\">\n      Chaque entrée débloquée confère un <strong style=\"color:var(--parchment-dark);\">avantage contextuel réutilisable</strong> quand la situation s'y prête. Statut : <span style=\"color:#a08888;\">Pressenti</span> → <span style=\"color:var(--VIO2);\">Identifié</span> → <span style=\"color:var(--GLD);\">Compris</span>. Cliquer sur le statut pour le faire avancer.\n    </div>\n    <div class=\"livre-tabs\">\n      <button class=\"livre-tab leg active\" onclick=\"livreTab('legendaire')\">⬟ Légendaire <span style=\"font-size:0.55rem;opacity:0.7;\">(partagé)</span></button>\n      <button class=\"livre-tab\" id=\"tab-faune\" onclick=\"livreTab('faune')\">Faune Sauvage <span style=\"font-size:0.55rem;opacity:0.7;\">(Tryxx)</span></button>\n      <button class=\"livre-tab\" id=\"tab-lieux\" style=\"opacity:0.35;cursor:default;\" disabled>Lieux &amp; Civilisations <span style=\"font-size:0.55rem;\">(autre PJ)</span></button>\n    </div>\n\n    <!-- PANEL LÉGENDAIRE -->\n    <div class=\"livre-panel active\" id=\"panel-legendaire\">\n      <div class=\"livre-count\" id=\"count-legendaire\"></div>\n      <div id=\"list-legendaire\"></div>\n      <button class=\"btn-add btn-add-gld\" style=\"margin-top:0.5rem;\" onclick=\"livreToggleForm('legendaire')\">+ Ajouter une entrée</button>\n      <div class=\"livre-add-form\" id=\"form-legendaire\">\n        <input id=\"l-leg-name\" placeholder=\"Nom (créature, entité, lieu légendaire…)\" />\n        <textarea id=\"l-leg-avantage\" placeholder=\"Avantage contextuel — ex: +20 Calme face aux dragons, connaissance de leur faiblesse…\"></textarea>\n        <div style=\"display:flex;gap:0.4rem;align-items:center;\">\n          <select id=\"l-leg-statut\" style=\"background:rgba(184,146,42,0.07);border:1px solid rgba(184,146,42,0.2);color:var(--parchment);font-family:'Crimson Text',serif;font-size:0.85rem;padding:0.25rem 0.4rem;border-radius:1px;\">\n            <option value=\"pressenti\">Pressenti</option>\n            <option value=\"identifie\">Identifié</option>\n            <option value=\"compris\">Compris</option>\n          </select>\n          <button class=\"btn-add btn-add-gld\" onclick=\"livreAdd('legendaire')\">Ajouter</button>\n          <button class=\"btn-cancel\" onclick=\"livreToggleForm('legendaire')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n\n    <!-- PANEL PROPRE À CE PJ -->\n    <div class=\"livre-panel\" id=\"panel-faune\">\n      <div class=\"livre-count\" id=\"count-faune\"></div>\n      <div id=\"list-faune\"></div>\n      <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.5rem;\" onclick=\"livreToggleForm('faune')\">+ Ajouter une entrée</button>\n      <div class=\"livre-add-form\" id=\"form-faune\">\n        <input id=\"l-faune-name\" placeholder=\"Nom…\" />\n        <textarea id=\"l-faune-avantage\" placeholder=\"Avantage contextuel…\"></textarea>\n        <div style=\"display:flex;gap:0.4rem;align-items:center;\">\n          <select id=\"l-faune-statut\" style=\"background:rgba(184,146,42,0.07);border:1px solid rgba(184,146,42,0.2);color:var(--parchment);font-family:'Crimson Text',serif;font-size:0.85rem;padding:0.25rem 0.4rem;border-radius:1px;\">\n            <option value=\"pressenti\">Pressenti</option>\n            <option value=\"identifie\">Identifié</option>\n            <option value=\"compris\">Compris</option>\n          </select>\n          <button class=\"btn-add btn-add-vio\" onclick=\"livreAdd('faune')\">Ajouter</button>\n          <button class=\"btn-cancel\" onclick=\"livreToggleForm('faune')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { livreLoad(); }
  });
})();

let livreData = { legendaire:[], lieux:[], faune:[] };

const SORTS_DEF = [
  {
    name:'Hymne de fracas',
    ni:0, type:'Bénédiction', portee:'6m', duree:'6 Rounds', cible:'Alliés', deg:'+5CC +5F',
    desc:'+5 CC et +5 F à toutes les cibles alliées dans le rayon pendant 6 Rounds.',
    imparf:''
  },
  {
    name:'Murmure fatal',
    ni:0, type:'Bénédiction', portee:'6m', duree:'Instantané', cible:'1 cible', deg:'—',
    desc:'Test FM +10 sur la cible ou -1M et -5 à toutes ses caractéristiques.',
    imparf:''
  },
  {
    name:'Traque immobile',
    ni:0, type:'Bénédiction', portee:'6m', duree:'—', cible:'1 allié', deg:'+5CT -1PA',
    desc:'+5 CT et -1 PA à la cible alliée. Bonus au tir à couvert. 2DR+.',
    imparf:''
  },
  {
    name:'Écho de la forêt',
    ni:0, type:'Bénédiction', portee:'6m', duree:'6 Rounds', cible:'1 allié', deg:'+1D2 dégâts',
    desc:'Ajoute 1D2 dégâts supplémentaires aux attaques de la cible alliée pendant 6 Rounds.',
    imparf:''
  },
  {
    name:'Pulsation d\'émeraude',
    ni:0, type:'Bénédiction', portee:'6m', duree:'2 Rounds', cible:'1 allié', deg:'+1 Blessure/Round',
    desc:'+1 Blessure par Round à la cible alliée pendant 2 Rounds. Soin progressif.',
    imparf:''
  },
  {
    name:'Corps de Dryade',
    ni:0, type:'Bénédiction', portee:'6m', duree:'6 Rounds', cible:'1 allié', deg:'+5E +5Ag',
    desc:'+5 E et +5 Ag à la cible alliée pendant 6 Rounds. Renforce endurance et vivacité.',
    imparf:''
  },
];

function livreLoad() {
  const raw = MODULES.lire("livre-tryxx");
  if(raw) try { const d=JSON.parse(raw); LIVRE_CATS.forEach(c=>{ if(d[c]) livreData[c]=d[c]; }); } catch(e){}
  LIVRE_CATS.forEach(c=>livreRender(c));
}

function livreSave() { MODULES.ecrire("livre-tryxx", JSON.stringify(livreData)); }

function livreTab(cat) {
  document.querySelectorAll('.livre-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.livre-panel').forEach(p=>p.classList.remove('active'));
  const btn = document.getElementById('tab-'+cat) || document.querySelector('.livre-tab.leg');
  if(cat==='legendaire') document.querySelector('.livre-tab.leg').classList.add('active');
  else if(btn) btn.classList.add('active');
  const panel = document.getElementById('panel-'+cat);
  if(panel) panel.classList.add('active');
}

function livreRender(cat) {
  const list = document.getElementById('list-'+cat);
  const count = document.getElementById('count-'+cat);
  if(!list) return;
  list.innerHTML='';
  const entries = livreData[cat]||[];
  if(count) count.textContent = entries.length ? entries.length+' entrée'+(entries.length>1?'s':'') : '';
  if(!entries.length) {
    list.innerHTML='<div class="livre-empty">Aucune entrée — tout reste à découvrir.</div>';
    return;
  }
  entries.forEach((e,i)=>{
    const div=document.createElement('div'); div.className='livre-entry';
    const isLeg = cat==='legendaire';
    div.innerHTML=`
      <div class="livre-entry-left">
        <div class="livre-entry-name">${e.name}${isLeg?'<span class="livre-badge-leg">légendaire</span>':''}</div>
        ${e.avantage?`<div class="livre-entry-avantage">${e.avantage}</div>`:''}
      </div>
      <span class="livre-statut ${e.statut||'pressenti'}" onclick="livreNextStatut('${cat}',${i})">${e.statut==='identifie'?'Identifié':e.statut==='compris'?'Compris':'Pressenti'}</span>
      <span class="livre-del" onclick="livreDelete('${cat}',${i})" title="Supprimer">✕</span>
    `;
    list.appendChild(div);
  });
}

function livreNextStatut(cat,idx) {
  const cycle = ['pressenti','identifie','compris'];
  const e = livreData[cat][idx];
  const cur = cycle.indexOf(e.statut||'pressenti');
  e.statut = cycle[(cur+1)%cycle.length];
  livreSave(); livreRender(cat);
}

function livreDelete(cat,idx) {
  if(confirm('Supprimer cette entrée ?')) { livreData[cat].splice(idx,1); livreSave(); livreRender(cat); }
}

function livreToggleForm(cat) {
  const form=document.getElementById('form-'+cat);
  if(form) form.classList.toggle('visible');
}

function livreAdd(cat) {
  const nameEl = document.getElementById('l-'+cat+'-name');
  const avEl   = document.getElementById('l-'+cat+'-avantage');
  const stEl   = document.getElementById('l-'+cat+'-statut');
  if(!nameEl||!nameEl.value.trim()) return;
  livreData[cat].push({ name:nameEl.value.trim(), avantage:avEl?avEl.value.trim():'', statut:stEl?stEl.value:'pressenti' });
  if(nameEl) nameEl.value='';
  if(avEl) avEl.value='';
  livreSave(); livreRender(cat); livreToggleForm(cat);
}
