/* Déploiement de l'Ordre — mécanique de Kevan Dolseicht
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis kevan.html, code d'origine conservé. */
/* ── portée propre au module ── */
(function () {


let dfData = {
  jugements: [],
  assignment: { fer:'', flanc:'', soutien:'', reserve:'' },
  deploy: [],
  deployUsed: false,
  poids: 0
};

const OM_ROLES_DEF = [
  { key:'fer',     label:'Fer de Lance',
    effect:'Engage en premier, donne l\'impulsion. S\'il ouvre l\'engagement, son élan se traduit par un avantage offensif sur sa première action (MJ : ajuste selon la nature de l\'action et la situation).' },
  { key:'flanc',   label:'Flanc',
    effect:'Contourne, se positionne de côté, exploite les angles morts. Si la position est effectivement obtenue (ennemi engagé par un allié, dos exposé, etc.), son action en profite (MJ : ajuste selon l\'angle réel et la nature de l\'action).' },
  { key:'soutien', label:'Soutien',
    effect:'Reste en seconde ligne, couvre, intercepte. Une fois dans le combat, peut offrir un appui décisif à un allié (parade détournée, esquive facilitée, distraction d\'un ennemi, ouverture créée...). MJ : forme et ampleur à ajuster selon le contexte.' },
  { key:'reserve', label:'Réserve',
    effect:'Reste en retrait, observe, lit le combat. Au tour où il intervient enfin, sa lecture du terrain se convertit en avantage sur ce qu\'il choisit de faire : frappe ciblée, sort préparé, manœuvre rusée, ordre donné. MJ : la nature et l\'ampleur du bonus dépendent de ce qu\'il a observé et de comment il en tire parti.' },
];

const INTERRO_POIDS_TABLE = [
  [0,0,0],   // Plaidoyer
  [0,0,1],   // Pression
  [1,2,3],   // Contrainte
  [2,3,4]    // Question ardente
];

function interroPreview() {
  const mEl = document.getElementById('jug-methode');
  const lEl = document.getElementById('jug-legit');
  const tEl = document.getElementById('jug-type');
  if(!mEl || !lEl) return;
  const m = parseInt(mEl.value)||0;
  const l = parseInt(lEl.value)||0;
  const box = document.getElementById('interro-incidence');
  const inc = INTERRO_INCIDENCE[m];
  if(box) {
    box.className = 'interro-incidence m' + m;
    box.innerHTML = '<b>Fiabilité de l&#x2019;aveu&#x202F;: ' + inc.fiab + '.</b> ' + inc.detail;
  }
  const poids = INTERRO_POIDS_TABLE[m][l];
  const prev = document.getElementById('interro-poids-preview');
  if(prev) {
    let txt = '';
    if(poids > 0) {
      txt = 'Poids de l&#x2019;Âme&#x202F;: <span class="v" style="color:#e05050;">+' + poids + '</span> '
          + '&#x2014; la dureté de la méthode dépasse ce que le soupçon justifie.';
    } else {
      txt = 'Poids de l&#x2019;Âme&#x202F;: <span class="v" style="color:#8ab870;">+0</span> '
          + '&#x2014; la méthode reste proportionnée au soupçon.';
    }
    // Rachat possible : Épargne sur soupçon non avéré
    const t = tEl ? tEl.value : '';
    if(t==='epargne' && l>=1 && m<=1) {
      txt += '<br>Clémence légitime&#x202F;: épargner sur un soupçon incertain par une méthode mesurée allègera le Poids de <span class="v" style="color:#8ab870;">&#x2212;1</span>.';
    }
    prev.innerHTML = txt;
  }
}

function poidsSeuil(v) {
  for(let i=0;i<POIDS_SEUILS.length;i++) if(v<=POIDS_SEUILS[i].max) return POIDS_SEUILS[i];
  return POIDS_SEUILS[POIDS_SEUILS.length-1];
}

function poidsAdjust(d) {
  dfData.poids = Math.max(0, Math.min(10, (dfData.poids||0) + d));
  dfSave(); dfRenderPoids();
}

function dfLoad() {
  const raw = MODULES.lire("deploiement-ordre");
  if(raw) try {
    const d = JSON.parse(raw);
    if(d.jugements)  dfData.jugements  = d.jugements;
    if(d.assignment) dfData.assignment = d.assignment;
    if(d.deploy)     dfData.deploy     = d.deploy;
    if(d.deployUsed !== undefined) dfData.deployUsed = d.deployUsed;
    if(typeof d.poids === 'number') dfData.poids = Math.max(0, Math.min(10, d.poids));
  } catch(e){}
  dfRender();
}

function dfSave() { MODULES.ecrire("deploiement-ordre", JSON.stringify(dfData)); }

function dfRender() { dfRenderJug(); dfRenderOM(); dfRenderDeploy(); dfRenderStats(); dfRenderPoids(); }

function dfToggleForm(id) { document.getElementById(id).classList.toggle('visible'); }

function dfTab(name) {
  document.querySelectorAll('.df-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.df-panel').forEach(p=>p.classList.remove('active'));
  if(name==='jug')      document.querySelector('.df-tab').classList.add('active');
  else if(name==='om')  document.getElementById('df-tab-om').classList.add('active');
  const panel = document.getElementById('df-panel-'+name);
  if(panel) panel.classList.add('active');
}

function dfRenderStats() {
  document.getElementById('df-nb-jug').textContent    = dfData.jugements.length;
  document.getElementById('df-nb-act').textContent    = dfData.jugements.filter(j=>!j.epuise).length;
  document.getElementById('df-nb-deploy').textContent = dfData.deploy.length;
}

function dfRenderJug() {
  const c = document.getElementById('jug-list'); if(!c) return;
  c.innerHTML='';
  if(!dfData.jugements.length) {
    c.innerHTML='<div class="jug-empty">Aucun jugement consigné. La jurisprudence est vierge.</div>';
    return;
  }
  dfData.jugements.forEach((j,i)=>{
    const typeLbl = j.type==='epargne'?'Épargne'
                   :j.type==='purge'?'Purge'
                   :j.type==='ignore'?'Ignoré'
                   :j.type==='delegue'?'Délégué':'?';
    const div = document.createElement('div');
    div.className = 'jug-item ' + (j.type||'epargne') + (j.epuise?' epuise':'');
    div.innerHTML = '<div class="jug-header" onclick="this.parentElement.classList.toggle(\'open\')">'
      + '<span class="jug-titre">' + (j.titre||'?')
      + (j.epuise?' <span style="font-size:0.6rem;color:var(--SUB);border:1px solid rgba(160,120,48,0.3);padding:0.02rem 0.28rem;border-radius:1px;margin-left:0.25rem;">INVOQUÉ</span>':'')
      + '</span>'
      + '<span class="jug-type-badge ' + (j.type||'epargne') + '">' + typeLbl + '</span>'
      + (j.session?'<span class="jug-session">' + j.session + '</span>':'')
      + '<span class="jug-expand">&#9662;</span>'
      + '</div>'
      + '<div class="jug-body">'
      + (j.desc?'<div class="jug-desc">' + j.desc + '</div>':'')
      + dfInterroLineHtml(j)
      + (j.precedent?'<div class="jug-precedent">' + j.precedent + '</div>':'')
      + (j.fiab==='entache'?'<div class="jug-entache-warn">Précédent entaché&#x202F;: l&#x2019;aveu a été obtenu sous contrainte. Invocable une fois, mais le MJ peut le retourner &#x2014; un aveu arraché n&#x2019;est pas une vérité.</div>':'')
      + '<div class="jug-actions">'
      + (j.epuise
          ? '<button class="jug-btn jug-btn-restore" onclick="dfRestoreJug(' + i + ')">Restaurer</button>'
          : '<button class="jug-btn jug-btn-invoke" onclick="dfInvokeJug(' + i + ')">Invoquer le précédent</button>')
      + '<button class="jug-btn jug-btn-del" onclick="dfDelJug(' + i + ')">Suppr.</button>'
      + '</div>'
      + '</div>';
    if(j.fiab==='entache') div.classList.add('entache');
    c.appendChild(div);
  });
}

function dfInterroLineHtml(j) {
  if(j.methode === undefined || j.methode === null) return '';
  const m = Math.max(0, Math.min(3, j.methode));
  const l = Math.max(0, Math.min(2, j.legit !== undefined ? j.legit : 1));
  const fiabBadge = j.fiab==='entache'
    ? '<span class="jug-fiab-badge entache">Aveu entaché</span>'
    : '<span class="jug-fiab-badge net">Aveu net</span>';
  return '<div class="jug-interro-line">'
    + '<span class="lbl">Interrogatoire</span> &nbsp;'
    + INTERRO_METHODES[m] + ' &middot; soupçon ' + INTERRO_LEGIT[l].toLowerCase()
    + ' &nbsp; ' + fiabBadge
    + '</div>';
}

function dfAddJug() {
  const titre = document.getElementById('jug-titre').value.trim();
  if(!titre) return;
  const methode = parseInt(document.getElementById('jug-methode').value)||0;
  const legit   = parseInt(document.getElementById('jug-legit').value)||0;
  const type    = document.getElementById('jug-type').value;
  const fiab    = (methode >= 2) ? 'entache' : 'net';
  dfData.jugements.push({
    titre:titre,
    type:type,
    session:document.getElementById('jug-session').value.trim(),
    desc:document.getElementById('jug-desc').value.trim(),
    precedent:document.getElementById('jug-precedent').value.trim(),
    methode:methode,
    legit:legit,
    fiab:fiab,
    epuise:false
  });
  // Incidence sur le Poids de l'Âme
  let delta = INTERRO_POIDS_TABLE[methode][legit];
  if(type==='epargne' && legit>=1 && methode<=1) delta -= 1;
  if(delta !== 0) {
    dfData.poids = Math.max(0, Math.min(10, dfData.poids + delta));
  }
  ['jug-titre','jug-session','jug-desc','jug-precedent'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('jug-methode').value='0';
  document.getElementById('jug-legit').value='0';
  document.getElementById('jug-type').value='epargne';
  interroPreview();
  dfSave(); dfRenderJug(); dfRenderStats(); dfRenderPoids(); dfToggleForm('df-form-jug');
}

function dfInvokeJug(idx) { if(confirm('Invoquer ce précédent ? (utilisable une fois)')){ dfData.jugements[idx].epuise=true; dfSave(); dfRenderJug(); dfRenderStats(); } }

function dfRestoreJug(idx) { if(confirm('Restaurer ce précédent ?')){ dfData.jugements[idx].epuise=false; dfSave(); dfRenderJug(); dfRenderStats(); } }

function dfDelJug(idx) { if(confirm('Supprimer ce jugement ?')){ dfData.jugements.splice(idx,1); dfSave(); dfRenderJug(); dfRenderStats(); } }

function dfRenderPoids() {
  const track = document.getElementById('poids-track');
  if(!track) return;
  const v = dfData.poids||0;
  const s = poidsSeuil(v);
  track.innerHTML='';
  for(let i=0;i<10;i++) {
    const cran = document.createElement('div');
    let cls = 'poids-cran';
    if(i < v) {
      cls += ' on ';
      cls += (i<3?'t0':i<6?'t1':'t2');
    }
    cran.className = cls;
    cran.title = 'Poids '+(i+1);
    (function(idx){ cran.onclick=function(){ dfData.poids=(idx<dfData.poids)?idx:(idx+1); dfSave(); dfRenderPoids(); }; })(i);
    track.appendChild(cran);
  }
  const seuilEl = document.getElementById('poids-seuil');
  if(seuilEl) { seuilEl.className='poids-seuil '+s.cls; seuilEl.textContent = v + ' / 10 — ' + s.nom; }
  const descEl = document.getElementById('poids-desc');
  if(descEl) descEl.innerHTML = s.desc;
}

function dfRenderOM() {
  const g = document.getElementById('om-roles-grid'); if(!g) return;
  g.innerHTML='';
  OM_ROLES_DEF.forEach(r=>{
    const assigned = dfData.assignment[r.key] || '';
    const div = document.createElement('div');
    div.className = 'om-role' + (assigned?' assigned':'');
    var opts = '<option value="">- Aucun -</option>';
    OM_ALLIES.forEach(a=>{ opts += '<option value="'+a+'"'+(a===assigned?' selected':'')+'>'+a+'</option>'; });
    div.innerHTML = '<div class="om-role-title">'+r.label+'</div>'
      + '<div class="om-role-effect">'+r.effect+'</div>'
      + '<div class="om-role-assignee">'
      + '<select onchange="dfSetRole(\''+r.key+'\',this.value)">'+opts+'</select>'
      + '</div>';
    g.appendChild(div);
  });
}

function dfSetRole(key,val) { dfData.assignment[key]=val; dfSave(); dfRenderOM(); }

function dfRenderDeploy() {
  const el = document.getElementById('om-deploy-content'); if(!el) return;
  if(dfData.deployUsed) {
    const last = dfData.deploy.length ? dfData.deploy[dfData.deploy.length-1] : null;
    var html = '<div class="om-deploy-used">Déjà déployé cette session.' + (last?' Dernier déploiement : <em>'+(last.session||'?')+'</em>':'') + '</div>'
      + '<button class="jug-btn jug-btn-invoke" style="margin-top:0.3rem;" onclick="dfResetDeploy()">Nouvelle session (réinitialiser)</button>';
    if(dfData.deploy.length) {
      html += '<ul class="om-deploy-log">';
      dfData.deploy.slice().reverse().forEach((d,i)=>{
        const realIdx = dfData.deploy.length-1-i;
        var rolesTxt = '';
        ['fer','flanc','soutien','reserve'].forEach(k=>{
          if(d.assignment && d.assignment[k]) {
            const lbl = OM_ROLES_DEF.find(r=>r.key===k).label;
            rolesTxt += (rolesTxt?' &middot; ':'') + '<strong>'+lbl+'</strong>: '+d.assignment[k];
          }
        });
        html += '<li><span class="om-deploy-log-sess">'+(d.session||'?')+'</span>'
          + '<span>'+(d.contexte?d.contexte+'<br>':'')+rolesTxt+'</span>'
          + '<span class="om-deploy-log-del" onclick="dfDelDeploy('+realIdx+')">x</span></li>';
      });
      html += '</ul>';
    }
    el.innerHTML = html;
  } else {
    var html2 = '<div style="font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.5rem;">Assigne les rôles ci-dessus, puis valide le déploiement pour cette session.</div>'
      + '<div class="df-form" style="display:flex;">'
      + '<div><span class="df-form-label">Session / Moment</span><input id="om-d-session" placeholder="Ex : S4, embuscade du gué" /></div>'
      + '<div><span class="df-form-label">Contexte (optionnel)</span><textarea id="om-d-contexte" placeholder="L\'affrontement préparé, le terrain, l\'objectif..."></textarea></div>'
      + '<div style="display:flex;gap:0.4rem;margin-top:0.1rem;">'
      + '<button class="btn-add btn-add-fire" onclick="dfUseDeploy()">Valider le déploiement</button>'
      + '</div>'
      + '</div>';
    el.innerHTML = html2;
  }
}

function dfUseDeploy() {
  const session = document.getElementById('om-d-session').value.trim();
  const contexte = document.getElementById('om-d-contexte').value.trim();
  if(!session) { alert('Indique au moins une session ou un moment.'); return; }
  dfData.deploy.push({
    session:session,
    contexte:contexte,
    assignment: Object.assign({}, dfData.assignment)
  });
  dfData.deployUsed = true;
  dfSave(); dfRenderDeploy(); dfRenderStats();
}

function dfResetDeploy() { dfData.deployUsed = false; dfSave(); dfRenderDeploy(); }

function dfDelDeploy(idx) { dfData.deploy.splice(idx,1); dfSave(); dfRenderDeploy(); dfRenderStats(); }


const INTERRO_INCIDENCE = [
  { fiab:'Élevée', detail:'L&#x2019;aveu est solide, librement consenti. Précédent net, invocable sans réserve.' },
  { fiab:'Correcte', detail:'L&#x2019;aveu tient, la peur a pu colorer les mots. Précédent net.' },
  { fiab:'Douteuse', detail:'L&#x2019;accusé dit ce qu&#x2019;on veut entendre. Précédent entaché &#x2014; à double tranchant.' },
  { fiab:'Non fiable', detail:'Un aveu arraché n&#x2019;est pas une vérité. Précédent entaché &#x2014; le MJ peut le retourner.' }
];

const POIDS_SEUILS = [
  { max:3,  cls:'s0', tier:'t0', nom:'Intègre',           desc:'Kevan juge encore avec mesure. La main qui tient le marteau hésite avant de frapper &#x2014; et cette hésitation est sa droiture.' },
  { max:6,  cls:'s1', tier:'t1', nom:'Endurci',           desc:'La facilité s&#x2019;installe. Kevan justifie la dureté plus vite qu&#x2019;avant. Le doute se fait rare ; le MJ peut en jouer.' },
  { max:10, cls:'s2', tier:'t2', nom:'Inquisiteur de fer', desc:'La torture est devenue méthode, le soupçon vaut preuve. Kevan glisse vers ce qu&#x2019;il jurait de combattre. Chaque excès appelle le suivant.' }
];

const INTERRO_METHODES = ['Plaidoyer','Pression','Contrainte','Question ardente'];

const INTERRO_LEGIT = ['Avérée','Plausible','Ténue'];

const OM_ALLIES = ['Reiner','Kantagoran','Tryxx','Ephraim','Cade'];


/* Rendues accessibles aux boutons de la page. */
  window.interroPreview = interroPreview;
  window.poidsSeuil = poidsSeuil;
  window.poidsAdjust = poidsAdjust;
  window.dfLoad = dfLoad;
  window.dfSave = dfSave;
  window.dfRender = dfRender;
  window.dfToggleForm = dfToggleForm;
  window.dfTab = dfTab;
  window.dfRenderStats = dfRenderStats;
  window.dfRenderJug = dfRenderJug;
  window.dfInterroLineHtml = dfInterroLineHtml;
  window.dfAddJug = dfAddJug;
  window.dfInvokeJug = dfInvokeJug;
  window.dfRestoreJug = dfRestoreJug;
  window.dfDelJug = dfDelJug;
  window.dfRenderPoids = dfRenderPoids;
  window.dfRenderOM = dfRenderOM;
  window.dfSetRole = dfSetRole;
  window.dfRenderDeploy = dfRenderDeploy;
  window.dfUseDeploy = dfUseDeploy;
  window.dfResetDeploy = dfResetDeploy;
  window.dfDelDeploy = dfDelDeploy;

/* Enregistrement en dernier : le module doit être entièrement défini
   avant que la fiche ne l'affiche et ne le démarre. */
  MODULES.enregistrer({
    id: "deploiement-ordre",
    titre: "Déploiement de l'Ordre",
    css: "[data-module=\"deploiement-ordre\"] { --VIO2:#a07830; --FIRE:#d96a2c; }\n.df-card { background:rgba(9,8,12,0.78); border:1px solid rgba(217,106,44,0.28); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.df-tabs { display:flex; gap:0.3rem; margin-bottom:0.9rem; flex-wrap:wrap; }\n.df-tab { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; padding:0.28rem 0.75rem; border-radius:1px; cursor:pointer; transition:all 0.15s; border:1px solid rgba(255,255,255,0.07); background:transparent; color:var(--SUB); }\n.df-tab.active { border-color:rgba(217,106,44,0.5); color:var(--FIRE); background:rgba(217,106,44,0.08); }\n.df-panel { display:none; }\n.df-panel.active { display:block; }\n.df-stats { display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:0.85rem; }\n.df-stat-box { background:rgba(217,106,44,0.07); border:1px solid rgba(217,106,44,0.15); border-radius:2px; padding:0.4rem 0.7rem; text-align:center; }\n.df-stat-val { font-family:'Cinzel',serif; font-size:1.2rem; color:var(--FIRE); display:block; }\n.df-stat-label { font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.df-form { display:none; margin-top:0.5rem; background:rgba(217,106,44,0.06); border:1px solid rgba(217,106,44,0.2); border-radius:2px; padding:0.65rem; flex-direction:column; gap:0.38rem; }\n.df-form.visible { display:flex; }\n.df-form input, .df-form textarea, .df-form select { background:rgba(217,106,44,0.06); border:1px solid rgba(217,106,44,0.2); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.86rem; padding:0.26rem 0.42rem; border-radius:1px; width:100%; }\n.df-form input:focus, .df-form textarea:focus, .df-form select:focus { outline:none; border-color:var(--FIRE); }\n.df-form textarea { resize:vertical; min-height:52px; }\n.df-form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.38rem; }\n.df-form-label { font-size:0.57rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--FIRE); opacity:0.85; display:block; margin-bottom:0.1rem; }\n.df-form-actions { display:flex; gap:0.4rem; margin-top:0.1rem; }\n/* Règles reprises de kevan.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n.card-title.fire { color:var(--FIRE); }\n/* ── GRIMOIRE DE JUGEMENTS ── */\n  .jug-intro { font-size:0.75rem; color:var(--SUB); font-style:italic; margin-bottom:0.7rem; line-height:1.55; }\n.jug-intro strong { color:var(--FIRE); font-style:normal; }\n/* Le Poids de l'Âme — jauge */\n  .poids-card { background:rgba(8,8,12,0.55); border:1px solid rgba(139,26,26,0.22); border-radius:2px; padding:0.7rem 0.8rem; margin-bottom:0.85rem; }\n.poids-head { display:flex; align-items:baseline; justify-content:space-between; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.45rem; }\n.poids-title { font-family:\"Cinzel\",serif; font-size:0.64rem; letter-spacing:0.16em; text-transform:uppercase; color:#c0392b; }\n.poids-seuil { font-family:\"Cinzel\",serif; font-size:0.66rem; letter-spacing:0.08em; }\n.poids-seuil.s0 { color:#8ab870; }\n.poids-seuil.s1 { color:#cda64a; }\n.poids-seuil.s2 { color:#e05050; }\n.poids-track { display:flex; gap:3px; margin-bottom:0.4rem; }\n.poids-desc { font-size:0.71rem; color:var(--SUB); font-style:italic; line-height:1.5; }\n.poids-ctrl { display:flex; gap:0.3rem; align-items:center; margin-top:0.4rem; }\n.poids-btn { font-family:\"Cinzel\",serif; font-size:0.56rem; letter-spacing:0.07em; text-transform:uppercase; padding:0.2rem 0.5rem; border-radius:1px; cursor:pointer; transition:all 0.15s; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:var(--SUB); }\n.poids-btn:hover { background:rgba(255,255,255,0.09); color:var(--parchment); }\n.btn-add-fire { background:rgba(217,106,44,0.08); border:1px solid rgba(217,106,44,0.35); color:var(--FIRE); }\n.btn-add-fire:hover { background:rgba(217,106,44,0.18); }\n/* ══ INTERROGATOIRE & POIDS DE L'ÂME ══ */\n  /* Encart explicatif sous le choix de méthode */\n  .interro-incidence { font-size:0.74rem; line-height:1.5; padding:0.42rem 0.55rem; border-radius:2px; border:1px solid; margin-top:0.15rem; transition:all 0.2s; }\n.interro-incidence b { font-family:\"Cinzel\",serif; font-size:0.64rem; letter-spacing:0.06em; text-transform:uppercase; }\n.interro-incidence.m0 { background:rgba(94,160,80,0.07); border-color:rgba(94,160,80,0.3); color:#9ac088; }\n.interro-incidence.m0 b { color:#8ab870; }\n.interro-incidence.m1 { background:rgba(160,120,48,0.08); border-color:rgba(160,120,48,0.35); color:#c8b070; }\n.interro-incidence.m1 b { color:#cda64a; }\n.interro-incidence.m2 { background:rgba(192,90,50,0.09); border-color:rgba(192,90,50,0.4); color:#d29878; }\n.interro-incidence.m2 b { color:#d96a2c; }\n.interro-incidence.m3 { background:rgba(139,26,26,0.12); border-color:rgba(139,26,26,0.5); color:#d98080; }\n.interro-incidence.m3 b { color:#e05050; }\n.interro-poids-preview { font-size:0.7rem; font-style:italic; margin-top:0.3rem; color:var(--SUB); }\n.interro-poids-preview .v { font-family:\"Cinzel\",serif; font-style:normal; font-weight:700; }\n/* ── ORDRE DE MARCHE ── */\n  .om-intro { font-size:0.75rem; color:var(--SUB); font-style:italic; margin-bottom:0.7rem; line-height:1.55; }\n.om-intro strong { color:var(--FIRE); font-style:normal; }\n.om-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:0.7rem; }\n.om-deploy-box { background:rgba(217,106,44,0.06); border:1px solid rgba(217,106,44,0.22); border-radius:2px; padding:0.7rem 0.85rem; margin-top:0.4rem; }\n.om-deploy-title { font-family:'Cinzel',serif; font-size:0.65rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--FIRE); margin-bottom:0.45rem; }\n",
    html: "<div class=\"df-card\">\n    <div class=\"card-title fire\" style=\"margin-bottom:0.5rem;\">La Doctrine du Feu Juste\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">mécanique exclusive : Kevan Dolseicht</span>\n    </div>\n    <div style=\"font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.8rem;line-height:1.55;\">\n      Deux disciplines entrelacées : la <strong style=\"color:var(--FIRE);\">jurisprudence personnelle</strong> qui se construit jugement après jugement, et l'<strong style=\"color:var(--FIRE);\">art tactique</strong> du commandement avant un affrontement préparé.\n    </div>\n\n    <!-- STATS GLOBALES -->\n    <div class=\"df-stats\">\n      <div class=\"df-stat-box\"><span class=\"df-stat-val\" id=\"df-nb-jug\">0</span><span class=\"df-stat-label\">Jugements</span></div>\n      <div class=\"df-stat-box\"><span class=\"df-stat-val\" id=\"df-nb-act\">0</span><span class=\"df-stat-label\">Disponibles</span></div>\n      <div class=\"df-stat-box\"><span class=\"df-stat-val\" id=\"df-nb-deploy\">0</span><span class=\"df-stat-label\">Déploiements</span></div>\n    </div>\n\n    <!-- TABS -->\n    <div class=\"df-tabs\">\n      <button class=\"df-tab active\" onclick=\"dfTab('jug')\">Grimoire de Jugements</button>\n      <button class=\"df-tab\" id=\"df-tab-om\" onclick=\"dfTab('om')\">Ordre de Marche</button>\n    </div>\n\n    <!-- PANEL GRIMOIRE DE JUGEMENTS -->\n    <div class=\"df-panel active\" id=\"df-panel-jug\">\n      <div class=\"jug-intro\">\n        Chaque décision morale tranchée — <strong>épargner</strong>, <strong>purger</strong>, <strong>ignorer</strong>, <strong>déléguer</strong> — pose un précédent. Une fois consigné, ce précédent peut être <strong>invoqué une fois</strong> pour gagner un bonus contextuel sur un jet similaire (Sigmar reconnaît sa propre logique). Mais si Kevan agit en contradiction directe avec un de ses précédents, le MJ peut le retourner contre lui : malus, perte de Réputation, friction intérieure. La jurisprudence est vivante. Elle te juge autant que tu juges.\n      </div>\n\n      <!-- LE POIDS DE L'ÂME -->\n      <div class=\"poids-card\">\n        <div class=\"poids-head\">\n          <span class=\"poids-title\">Le Poids de l&#x2019;&#xC2;me</span>\n          <span class=\"poids-seuil\" id=\"poids-seuil\"></span>\n        </div>\n        <div class=\"poids-track\" id=\"poids-track\"></div>\n        <div class=\"poids-desc\" id=\"poids-desc\"></div>\n        <div class=\"poids-ctrl\">\n          <span style=\"font-size:0.6rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--SUB);\">Ajustement manuel (MJ)&#x202F;:</span>\n          <button class=\"poids-btn\" onclick=\"poidsAdjust(-1)\">&#x2212; All&#xE9;ger</button>\n          <button class=\"poids-btn\" onclick=\"poidsAdjust(1)\">+ Alourdir</button>\n        </div>\n      </div>\n      <div id=\"jug-list\"></div>\n      <button class=\"btn-add btn-add-fire\" style=\"margin-top:0.4rem;\" onclick=\"dfToggleForm('df-form-jug')\">+ Nouveau jugement</button>\n      <div class=\"df-form\" id=\"df-form-jug\">\n        <div>\n          <span class=\"df-form-label\">Titre / Affaire</span>\n          <input id=\"jug-titre\" placeholder=\"Ex : Le colporteur de Hochsleben, La sorcière des bois...\" />\n        </div>\n        <div class=\"df-form-row\">\n          <div>\n            <span class=\"df-form-label\">Type de jugement</span>\n            <select id=\"jug-type\">\n              <option value=\"epargne\">Épargner</option>\n              <option value=\"purge\">Purger</option>\n              <option value=\"ignore\">Ignorer</option>\n              <option value=\"delegue\">Déléguer</option>\n            </select>\n          </div>\n          <div>\n            <span class=\"df-form-label\">Session / Date</span>\n            <input id=\"jug-session\" placeholder=\"Ex : S3, Hochsleben\" />\n          </div>\n        </div>\n        <div>\n          <span class=\"df-form-label\">Contexte de la décision</span>\n          <textarea id=\"jug-desc\" placeholder=\"Les faits, l'accusé, les circonstances...\"></textarea>\n        </div>\n        <div class=\"df-form-row\">\n          <div>\n            <span class=\"df-form-label\">Méthode d&#x2019;interrogatoire</span>\n            <select id=\"jug-methode\" onchange=\"interroPreview()\">\n              <option value=\"0\">Plaidoyer &#x2014; écoute, persuasion, foi</option>\n              <option value=\"1\">Pression &#x2014; intimidation, autorité</option>\n              <option value=\"2\">Contrainte &#x2014; coercition, privation</option>\n              <option value=\"3\">Question ardente &#x2014; torture</option>\n            </select>\n          </div>\n          <div>\n            <span class=\"df-form-label\">Légitimité du soupçon</span>\n            <select id=\"jug-legit\" onchange=\"interroPreview()\">\n              <option value=\"0\">Avérée &#x2014; preuve, flagrant délit</option>\n              <option value=\"1\">Plausible &#x2014; indices sérieux</option>\n              <option value=\"2\">Ténue &#x2014; rumeur, intuition</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"interro-incidence m0\" id=\"interro-incidence\"></div>\n        <div class=\"interro-poids-preview\" id=\"interro-poids-preview\"></div>\n        <div>\n          <span class=\"df-form-label\">Précédent établi (règle ou principe)</span>\n          <textarea id=\"jug-precedent\" placeholder=\"Ce que Kevan retient pour la suite. Ex : « On n'exécute pas un homme pour une rumeur. »\"></textarea>\n        </div>\n        <div class=\"df-form-actions\">\n          <button class=\"btn-add btn-add-fire\" onclick=\"dfAddJug()\">Consigner</button>\n          <button class=\"btn-cancel\" onclick=\"dfToggleForm('df-form-jug')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n\n    <!-- PANEL ORDRE DE MARCHE -->\n    <div class=\"df-panel\" id=\"df-panel-om\">\n      <div class=\"om-intro\">\n        Avant un affrontement préparé, Kevan peut désigner un <strong>rôle tactique</strong> à chaque allié. Chaque rôle donne un petit avantage ciblé <em>si le joueur joue effectivement ce rôle</em>. Pas de bonus automatique : la coordination doit être réelle. <strong>Une fois par session</strong>, Kevan peut déployer son Ordre de Marche en assignant les rôles ci-dessous.\n      </div>\n      <div class=\"om-grid\" id=\"om-roles-grid\"></div>\n      <div class=\"om-deploy-box\">\n        <div class=\"om-deploy-title\">Déploiement de l'Ordre &mdash; 1 fois par session</div>\n        <div id=\"om-deploy-content\"></div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { dfLoad(); }
  });
})();
