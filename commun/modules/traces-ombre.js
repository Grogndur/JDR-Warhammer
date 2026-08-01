/* Traces d'Ombre — mécanique de Sareth Liamah
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis sareth.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "traces-ombre",
    titre: "Traces d'Ombre",
    css: "/* Couleur d accent propre au personnage, reprise de sa fiche d origine. */\n[data-module=\"traces-ombre\"] { --VIO2:#9b7fd4; }\n.traces-card { background:rgba(10,10,15,0.75); border:1px solid rgba(103,78,167,0.3); border-radius:2px; padding:1.1rem; position:relative; overflow:hidden; }\n.traces-card::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%, rgba(103,78,167,0.1) 0%, transparent 70%); pointer-events:none; }\n.traces-pips { display:flex; gap:0.35rem; flex-wrap:wrap; margin-bottom:0.75rem; }\n\n.jet-btn { width:100%; font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; padding:0.6rem; border-radius:2px; cursor:pointer; transition:all 0.2s; background:rgba(103,78,167,0.15); border:1px solid rgba(103,78,167,0.4); color:var(--VIO2); margin-bottom:0.75rem; }\n.jet-btn:hover { background:rgba(103,78,167,0.28); border-color:rgba(103,78,167,0.65); }\n.jet-btn-med { background:rgba(28,58,90,0.25); border-color:rgba(28,58,90,0.6); color:#8ba8c4; }\n.jet-btn-med:hover { background:rgba(28,58,90,0.42); border-color:rgba(28,58,90,0.85); }\n.jet-result.reussi { border-color:rgba(94,128,79,0.4); background:rgba(94,128,79,0.08); }\n.jet-result.echec { border-color:rgba(139,26,26,0.35); background:rgba(139,26,26,0.07); }\n.jet-trace-gain { margin-top:0.5rem; font-family:'Cinzel',serif; font-size:0.75rem; color:#8fbf7a; letter-spacing:0.08em; padding:0.3rem 0.5rem; background:rgba(94,128,79,0.15); border:1px solid rgba(94,128,79,0.3); border-radius:2px; }\n.jet-result { display:none; border:1px solid rgba(103,78,167,0.3); border-radius:2px; padding:0.75rem; background:rgba(103,78,167,0.08); }\n.jet-result.visible { display:block; }\n.jet-palier { font-size:0.65rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--SUB); margin-bottom:0.25rem; }\n.jet-number { font-family:'Cinzel',serif; font-size:2rem; color:var(--VIO2); line-height:1; margin-bottom:0.25rem; }\n.jet-effet-name { font-family:'Cinzel',serif; font-size:0.95rem; color:var(--parchment); font-weight:600; margin-bottom:0.35rem; }\n.jet-effet-desc { font-size:0.85rem; color:var(--parchment-dark); line-height:1.5; font-style:italic; }\n.jet-trace-warning { margin-top:0.5rem; font-family:'Cinzel',serif; font-size:0.75rem; color:#c07070; letter-spacing:0.08em; padding:0.3rem 0.5rem; background:rgba(139,26,26,0.15); border:1px solid rgba(139,26,26,0.3); border-radius:2px; }\n/* Règles reprises de sareth.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n.palier-box { background:rgba(103,78,167,0.08); border:1px solid rgba(103,78,167,0.2); border-radius:2px; padding:0.65rem 0.75rem; margin-bottom:0.75rem; }\n.palier-name { font-family:'Cinzel',serif; font-size:0.78rem; color:var(--VIO2); font-weight:600; margin-bottom:0.25rem; letter-spacing:0.05em; }\n.palier-desc { font-size:0.82rem; color:var(--parchment-dark); line-height:1.5; font-style:italic; }\n.meditation-box { background:rgba(28,58,90,0.15); border:1px solid rgba(28,58,90,0.3); border-radius:2px; padding:0.5rem 0.75rem; margin-bottom:0.75rem; font-size:0.82rem; color:var(--parchment-dark); }\n.meditation-box strong { color:var(--VIO2); }\n",
    html: "<div class=\"traces-card full\">\n    <div class=\"card-title vio\" style=\"position:relative;\">Traces d'Ombre · Ulgu</div>\n    <div class=\"traces-pips\" id=\"traces-pips\"></div>\n    <div class=\"palier-box\">\n      <div class=\"palier-name\" id=\"palier-name\">—</div>\n      <div class=\"palier-desc\" id=\"palier-desc\">—</div>\n    </div>\n    <div class=\"meditation-box\">Méditation — seuil actuel : <span id=\"meditation-text\">—</span></div>\n    <button class=\"jet-btn jet-btn-med\" onclick=\"jetMeditation()\">☾ Jet de Méditation (1d100) · réussite : −1D6+2 Traces</button>\n    <div class=\"jet-result\" id=\"med-result\" style=\"margin-bottom:0.75rem;\"></div>\n    <button class=\"jet-btn\" onclick=\"jetAffinite()\">⬡ Jet d'Affinité d'Ombre (1d20)</button>\n    <div class=\"jet-result\" id=\"jet-result\"></div>\n  </div>",
    demarrer: function () {  }
  });
})();

const MED_TABLE = [
  { range:[1,2],  base:80 },
  { range:[3,4],  base:60 },
  { range:[5,6],  base:40 },
  { range:[7,8],  base:20 },
  { range:[9,10], base:5  },
];

const AFFINITE = [
  null,
  { palier:"I · Échos",          name:"Écart de monde",        desc:"L'ombre reproduit les gestes avec un demi-seconde de retard. Test de Calme pour témoins sensibles.", trace:false },
  { palier:"I · Échos",          name:"Regard fourbe",          desc:"Son ombre regarde ailleurs, comme distraite. +5 à un test de Perception de Sareth.", trace:false },
  { palier:"I · Échos",          name:"Zone du Néant",          desc:"Lumière vacillante dans un rayon de 10m pendant 2–3 secondes. Flammes repoussées, bougies éteintes.", trace:false },
  { palier:"I · Échos",          name:"Reflet absent",          desc:"Aucune ombre dans les surfaces réfléchissantes pendant 1d6 minutes. PNJ superstitieux troublés.", trace:false },
  { palier:"I · Échos",          name:"Faune en doute",         desc:"Chevaux, chiens, rats refusent de l'approcher jusqu'à la prochaine scène. –10 aux tests impliquant des animaux.", trace:false },
  { palier:"II · Interférences", name:"Murmure du Néant",      desc:"Ses lèvres bougent alors qu'elle se tait. Témoins : Test de Peur 1. Sareth : test FM ou –10 au prochain jet social.", trace:false },
  { palier:"II · Interférences", name:"Voix double",           desc:"Un timbre grave double sa voix pendant une réplique. +10 Intimidation, –10 Charme pour la scène entière.", trace:false },
  { palier:"II · Interférences", name:"Protection instinctive",desc:"Un voile d'encre absorbe un impact. Ignore 1 Blessure ou +1 Armure contre une attaque. Réactionnel, automatique.", trace:false },
  { palier:"II · Interférences", name:"Assistance grise",      desc:"L'ombre esquive avant que Sareth réagisse. Relance un test d'Esquive raté. Une seule fois par scène.", trace:false },
  { palier:"II · Interférences", name:"Main sombre",           desc:"Forme noire agrippe brièvement un ennemi au contact. –10 à tous ses jets pendant 1 round.", trace:false },
  { palier:"III · Présence",     name:"Silence forcé",         desc:"Sons étouffés dans un rayon de 5m pendant 1d3 rounds. +20 Discrétion et Incantation dans ce périmètre.", trace:false },
  { palier:"III · Présence",     name:"Saignement d'Ombre",    desc:"Toute blessure de Sareth suinte une substance noire, froide. Test de Peur 1 pour tout témoin blessé.", trace:false },
  { palier:"III · Présence",     name:"Souvenir volé",         desc:"L'ombre projette un souvenir — qui n'est pas celui de Sareth. Indice narratif MJ. Test de Calme pour Sareth.", trace:false },
  { palier:"III · Présence",     name:"Empreinte persistante", desc:"L'ombre de Sareth reste après son départ, imitant ses derniers gestes pendant 1d6 heures.", trace:false },
  { palier:"III · Présence",     name:"Reflet erroné",         desc:"Dans toutes les surfaces réfléchissantes, Sareth apparaît autrement — posture différente, parfois un autre visage. Test de Calme / Peur 1.", trace:false },
  { palier:"IV · Rupture",       name:"Substitution partielle",desc:"Pendant 1 round, c'est l'ombre qui agit à la place de Sareth. Réussite automatique à un jet. Contrepartie : 1 Trace d'Ombre.", trace:true },
  { palier:"IV · Rupture",       name:"Transcendance grise",   desc:"+10 à tous ses jets pendant 1d6 rounds — état second, précis et froid. Contrepartie : 1 Trace d'Ombre.", trace:true },
  { palier:"IV · Rupture",       name:"L'Ombre souveraine",    desc:"L'ombre agit seule pendant 1d3 rounds. Sareth ne contrôle pas ce qu'elle fait. 1 Trace d'Ombre. Peur 1.", trace:true },
  { palier:"IV · Rupture",       name:"L'Ombre projetée",      desc:"L'ombre se détache et se projette là où Ulgu le juge nécessaire. Sareth voit et entend à travers elle. 1 Trace d'Ombre.", trace:true },
  { palier:"IV · Rupture",       name:"Doppelgänger",          desc:"L'ombre prend forme et volume dans la réalité. Elle peut se déplacer, interagir. Terreur 1 pour tous les témoins. 1–2 Traces d'Ombre.", trace:true },
];

const PALIERS = [
  { range:[1,2],  name:"1–2 · Échos",          desc:"L'ombre commence à se souvenir. Parfois légèrement en avance sur ses gestes. Rêves fréquents et chargés. Les PNJ sensibles à la magie ressentent un léger malaise en sa présence. Aucun effet mécanique — pure atmosphère." },
  { range:[3,4],  name:"3–4 · Porosité",        desc:"La frontière s'amincit. +10 Intimidation (situationnel, non contrôlé). –10 Empathie et Charme dans les interactions longues ou intimes. Les animaux réagissent. Les morts-vivants à faible intelligence hésitent une seconde avant d'agir contre elle." },
  { range:[5,6],  name:"5–6 · Partage",         desc:"L'Ombre a des opinions. Elle commence à agir de sa propre initiative — jamais contre Sareth, mais pas nécessairement selon ses souhaits. +5 aux jets de Magie Ulgu. Le MJ peut déclencher une micro-action de l'ombre une fois par session (narratif pur)." },
  { range:[7,8],  name:"7–8 · Substitution",    desc:"L'Ombre peut prendre la main. Une fois par session, lors d'un moment crucial, Ulgu peut agir à travers Sareth (réussite automatique). Sareth peut refuser via test FM (0) — échec : l'ombre agit quand même. –10 aux tests de Calme liés à l'ombre." },
  { range:[9,10], name:"9–10 · Dette cosmique",  desc:"Ulgu réclame. Le MJ propose un choix narratif majeur. Trois voies : Sceller l'Ombre, Accepter le lien, ou Ne rien décider (effets 7–8 hors contrôle)." },
];

function pad2(n) { return n<10 ? '0'+n : ''+n; }

function renderTraces() {
  const c=document.getElementById('traces-pips'); c.innerHTML='';
  for(let i=1;i<=10;i++){
    const pip=document.createElement('div');
    let cls='trace-pip';
    if(i<=state.traces) cls+=' active';
    if(i===1) cls+=' permanent';
    if(i>=9) cls+=' danger';
    pip.className=cls; pip.textContent=i;
    if(i>1){ pip.onclick=()=>{ state.traces=(i<=state.traces)?i-1:i; save(); renderTraces(); }; }
    c.appendChild(pip);
  }
  const palier=PALIERS.find(p=>state.traces>=p.range[0]&&state.traces<=p.range[1]);
  if(palier){ document.getElementById('palier-name').textContent=palier.name; document.getElementById('palier-desc').textContent=palier.desc; }
  const med=MED_TABLE.find(p=>state.traces>=p.range[0]&&state.traces<=p.range[1]);
  if(med) {
    const b=medBFM();
    document.getElementById('meditation-text').innerHTML=
      `<strong>${pad2(med.base)} ou moins</strong> — avec BFM (+${b}) : <strong>${pad2(med.base+b)} ou moins</strong>`;
  }
}

function jetMeditation() {
  const base=medSeuilBase(), bfm=medBFM(), seuil=base+bfm;
  const roll=Math.floor(Math.random()*100)+1;
  const reussi=roll<=seuil;
  const de=Math.floor(Math.random()*6)+1;
  const retire=de+2;
  const avant=state.traces;
  const apres=reussi ? Math.max(1, avant-retire) : avant;
  const retireReel=avant-apres;
  const c=document.getElementById('med-result');
  c.className='jet-result visible '+(reussi?'reussi':'echec');
  c.innerHTML=`
    <div class="jet-palier">Méditation · seuil ${pad2(base)} + ${bfm} BFM = ${pad2(seuil)}</div>
    <div class="jet-number" style="color:${reussi?'#8fbf7a':'#c07070'};">${roll}</div>
    <div class="jet-effet-name">${reussi?'Réussite':'Échec'}</div>
    <div class="jet-effet-desc">${reussi
      ? `1D6+2 = ${de}+2 = <strong>${retire}</strong> Trace${retire>1?'s':''} dissipée${retire>1?'s':''}. Traces : ${avant} → ${apres}.${(avant-retire)<1?' La première Trace est permanente, elle ne peut pas être retirée.':''}`
      : `${roll} > ${pad2(seuil)} : l'Ombre ne reflue pas. Les Traces restent à ${avant}.`}</div>
    ${reussi&&retireReel>0?`<div class="jet-trace-gain">⬡ −${retireReel} Trace${retireReel>1?'s':''} d'Ombre</div>`:''}
    ${reussi&&retireReel===0?`<div class="jet-trace-warning">Déjà au minimum : rien à dissiper.</div>`:''}
  `;
  if(reussi && retireReel>0) {
    setTimeout(()=>{
      if(confirm(`Méditation réussie — ${roll} pour ${pad2(seuil)}\n\n1D6+2 = ${retire}\n\nRetirer les Traces ? (${avant} → ${apres})`)) {
        state.traces=apres; save(); renderTraces();
      }
    },300);
  }
}

function jetAffinite() {
  const roll=Math.floor(Math.random()*20)+1;
  const effet=AFFINITE[roll];
  const c=document.getElementById('jet-result');
  c.className='jet-result visible';
  c.innerHTML=`
    <div class="jet-palier">${effet.palier}</div>
    <div class="jet-number">${roll}</div>
    <div class="jet-effet-name">${effet.name}</div>
    <div class="jet-effet-desc">${effet.desc}</div>
    ${effet.trace?`<div class="jet-trace-warning">⬡ +1 Trace d'Ombre</div>`:''}
  `;
  if(effet.trace&&state.traces<10){
    setTimeout(()=>{
      if(confirm(`Résultat ${roll} — ${effet.name}\n\nAjouter 1 Trace d'Ombre ? (${state.traces} → ${state.traces+1})`)){
        state.traces=Math.min(10,state.traces+1);
        save(); renderTraces();
      }
    },300);
  }
}

function medBFM() { return Math.floor(getStatTotal('fm')/10); }

function medSeuilBase() {
  const med = MED_TABLE.find(p=>state.traces>=p.range[0]&&state.traces<=p.range[1]);
  return med ? med.base : 0;
}
