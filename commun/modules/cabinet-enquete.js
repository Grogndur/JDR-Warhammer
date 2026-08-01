/* Le Cabinet d'Enquête — mécanique de Cade Mitchell
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis cade.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "cabinet-enquete",
    titre: "Le Cabinet d'Enquête",
    css: "/* Couleur d'accent propre au personnage, reprise de sa fiche d'origine. */\n[data-module=\"cabinet-enquete\"] { --VIO2:#8aaccc; }\n.ce-card { background:rgba(7,8,12,0.74); border:1px solid rgba(138,172,204,0.22); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.ce-cote-bar { display:flex; align-items:center; gap:0.75rem; margin-bottom:0.9rem; flex-wrap:wrap; }\n.ce-cote-pips { display:flex; gap:3px; }\n.ce-cote-pip { width:22px; height:10px; border-radius:1px; border:1px solid rgba(138,172,204,0.18); background:transparent; cursor:pointer; transition:all 0.15s; }\n.ce-cote-pip.on.tier1 { background:rgba(138,172,204,0.45); border-color:rgba(138,172,204,0.7); }\n.ce-cote-pip.on.tier2 { background:rgba(184,146,42,0.55); border-color:rgba(184,146,42,0.8); }\n.ce-cote-pip.on.tier3 { background:rgba(224,96,48,0.65); border-color:rgba(224,96,48,0.9); box-shadow:0 0 4px rgba(224,96,48,0.3); }\n.ce-cote-label { font-family:'Cinzel',serif; font-size:0.72rem; font-weight:600; }\n.ce-cote-label.tier1 { color:rgba(138,172,204,0.9); }\n.ce-cote-label.tier2 { color:var(--GLD); }\n.ce-cote-label.tier3 { color:#e06030; }\n.ce-cote-desc { font-size:0.75rem; font-style:italic; color:var(--SUB); flex:1; min-width:160px; }\n.ce-stats { display:flex; gap:0.65rem; flex-wrap:wrap; margin-left:auto; }\n.ce-stat-box { background:rgba(74,90,122,0.08); border:1px solid rgba(138,172,204,0.12); border-radius:2px; padding:0.35rem 0.6rem; text-align:center; }\n.ce-stat-val { font-family:'Cinzel',serif; font-size:1.1rem; color:var(--VIO2); display:block; }\n.ce-stat-label { font-size:0.55rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.ce-tabs { display:flex; gap:0.3rem; margin-bottom:0.85rem; flex-wrap:wrap; }\n.ce-tab { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.14em; text-transform:uppercase; padding:0.28rem 0.72rem; border-radius:1px; cursor:pointer; transition:all 0.15s; border:1px solid rgba(255,255,255,0.07); background:transparent; color:var(--SUB); }\n.ce-tab.active { border-color:rgba(138,172,204,0.45); color:var(--VIO2); background:rgba(74,90,122,0.1); }\n.ce-panel { display:none; }\n.ce-panel.active { display:block; }\n.ce-form { display:none; margin-top:0.5rem; background:rgba(74,90,122,0.06); border:1px solid rgba(138,172,204,0.16); border-radius:2px; padding:0.65rem; flex-direction:column; gap:0.38rem; }\n.ce-form.visible { display:flex; }\n.ce-form input, .ce-form textarea, .ce-form select { background:rgba(74,90,122,0.08); border:1px solid rgba(138,172,204,0.18); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.86rem; padding:0.26rem 0.42rem; border-radius:1px; width:100%; }\n.ce-form input:focus, .ce-form textarea:focus, .ce-form select:focus { outline:none; border-color:var(--VIO2); }\n.ce-form textarea { resize:vertical; min-height:50px; }\n.ce-form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.38rem; }\n.ce-form-label { font-size:0.57rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--VIO2); opacity:0.8; display:block; margin-bottom:0.1rem; }",
    html: "<div class=\"ce-card\">\n    <div class=\"card-title vio\" style=\"margin-bottom:0.45rem;\">Le Cabinet d'Enquete\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">mecanique exclusive : Cade Mitchell</span>\n    </div>\n    <div style=\"font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.85rem;line-height:1.55;\">\n      Cade ne chasse pas — elle instruit. Chaque <strong style=\"color:var(--parchment-dark);\">Dossier</strong> s'etoffe session apres session. Plus il est complet, plus la prise est propre et la prime elevee. Le <strong style=\"color:var(--GLD);\">Reseau d'Indics</strong> alimente chaque enquete. La <strong style=\"color:var(--VIO2);\">Cote</strong> reflete sa valeur sur le marche.\n    </div>\n    <div class=\"ce-cote-bar\">\n      <div>\n        <div style=\"font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--SUB);margin-bottom:0.3rem;\">Cote sur le marche</div>\n        <div class=\"ce-cote-pips\" id=\"ce-cote-pips\"></div>\n      </div>\n      <div>\n        <div class=\"ce-cote-label tier1\" id=\"ce-cote-label\">Inconnue</div>\n        <div class=\"ce-cote-desc\" id=\"ce-cote-desc\">Aucune prise. La reputation se construit.</div>\n      </div>\n      <div class=\"ce-stats\">\n        <div class=\"ce-stat-box\"><span class=\"ce-stat-val\" id=\"ce-nb-dossiers\">0</span><span class=\"ce-stat-label\">Dossiers</span></div>\n        <div class=\"ce-stat-box\"><span class=\"ce-stat-val\" id=\"ce-nb-indics\">0</span><span class=\"ce-stat-label\">Indics actifs</span></div>\n        <div class=\"ce-stat-box\"><span class=\"ce-stat-val\" id=\"ce-primes-total\">0</span><span class=\"ce-stat-label\">CO encaisses</span></div>\n      </div>\n    </div>\n    <div class=\"ce-tabs\">\n      <button class=\"ce-tab active\" onclick=\"ceTab('dossiers')\">Dossiers actifs</button>\n      <button class=\"ce-tab\" id=\"ce-tab-archives\" onclick=\"ceTab('archives')\">Archives</button>\n      <button class=\"ce-tab\" id=\"ce-tab-indics\" onclick=\"ceTab('indics')\">Reseau d'Indics</button>\n      <button class=\"ce-tab\" id=\"ce-tab-cmd\" onclick=\"ceTab('cmd')\">Commanditaires</button>\n      <button class=\"ce-tab\" id=\"ce-tab-cote\" onclick=\"ceTab('cote')\">Bonus de Cote</button>\n    </div>\n    <div class=\"ce-panel active\" id=\"ce-panel-dossiers\">\n      <div id=\"ce-dossiers-list\"></div>\n      <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.4rem;\" onclick=\"ceToggleForm('ce-form-dossier')\">+ Nouveau dossier</button>\n      <div class=\"ce-form\" id=\"ce-form-dossier\">\n        <div><span class=\"ce-form-label\">Nom de la cible</span><input id=\"ce-d-nom\" placeholder=\"Ex: Aldric Voss\" /></div>\n        <div class=\"ce-form-row\">\n          <div><span class=\"ce-form-label\">Prime de base (CO)</span><input id=\"ce-d-base\" type=\"number\" min=\"0\" placeholder=\"Ex: 15\" /></div>\n          <div><span class=\"ce-form-label\">Commanditaire</span><input id=\"ce-d-cmd\" placeholder=\"Ex: Marchands d'Averheim\" /></div>\n        </div>\n        <div><span class=\"ce-form-label\">Condition</span>\n          <select id=\"ce-d-cond\">\n            <option value=\"vivant\">Vivant de preference</option>\n            <option value=\"mort\">Mort accepte</option>\n            <option value=\"indifferent\">Indifferent</option>\n          </select>\n        </div>\n        <div><span class=\"ce-form-label\">Description initiale</span><textarea id=\"ce-d-desc\" placeholder=\"Crimes, description, derniere position connue...\"></textarea></div>\n        <div class=\"sort-form-actions\">\n          <button class=\"btn-add btn-add-vio\" onclick=\"ceAddDossier()\">Ouvrir le dossier</button>\n          <button class=\"btn-cancel\" onclick=\"ceToggleForm('ce-form-dossier')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"ce-panel\" id=\"ce-panel-archives\">\n      <div id=\"ce-archives-list\"></div>\n      <div style=\"font-size:0.78rem;color:var(--SUB);font-style:italic;margin-top:0.3rem;\">Dossiers clos et echecs. La memoire du cabinet.</div>\n    </div>\n    <div class=\"ce-panel\" id=\"ce-panel-indics\">\n      <div style=\"font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.65rem;line-height:1.5;\">Chaque indic alimente un dossier specifique. Fiabilite 1-5. Lier un indic a un dossier lui confere son bonus automatiquement.</div>\n      <div id=\"ce-indics-list\"></div>\n      <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.4rem;\" onclick=\"ceToggleForm('ce-form-indic')\">+ Nouvel indic</button>\n      <div class=\"ce-form\" id=\"ce-form-indic\">\n        <div><span class=\"ce-form-label\">Nom / Alias</span><input id=\"ce-i-nom\" placeholder=\"Brenn le passeur...\" /></div>\n        <div class=\"ce-form-row\">\n          <div><span class=\"ce-form-label\">Specialite</span><input id=\"ce-i-spec\" placeholder=\"Routes nord, tavernes...\" /></div>\n          <div><span class=\"ce-form-label\">Bonus</span><input id=\"ce-i-bonus\" placeholder=\"+10 Pistage...\" /></div>\n        </div>\n        <div><span class=\"ce-form-label\">Note initiale</span><textarea id=\"ce-i-note\" placeholder=\"Comment Cade l'a trouve...\"></textarea></div>\n        <div class=\"sort-form-actions\">\n          <button class=\"btn-add btn-add-vio\" onclick=\"ceAddIndic()\">Ajouter</button>\n          <button class=\"btn-cancel\" onclick=\"ceToggleForm('ce-form-indic')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { ceLoad(); }
  });
})();

var ceData = { cote:0, dossiers:[], indics:[], commanditaires:[], primesTotal:0 };

var COTE_TIERS = [
  { max:0,  tier:'tier1', label:'Inconnue',   desc:'Aucune prise. La reputation se construit.' },
  { max:2,  tier:'tier1', label:'Debutante',  desc:'Quelques prises. Les commanditaires commencent a noter le nom.' },
  { max:4,  tier:'tier1', label:'Connue',     desc:'Reputation locale etablie. Primes de qualite moyenne accessibles.' },
  { max:6,  tier:'tier2', label:'Respectee',  desc:'Guildes et marchands importants font appel en priorite. Primes negociables.' },
  { max:8,  tier:'tier2', label:'Redoutee',   desc:'Les cibles savent qui est sur leur piste. Primes elevees disponibles.' },
  { max:10, tier:'tier3', label:'Legendaire', desc:'Une seule de cette stature en Averland. Les primes arrivent avant la demande.' },
];

var COTE_BONUS = [
  { palier:0,  desc:'Aucun bonus. Cade est inconnue du milieu.' },
  { palier:2,  desc:'Acces aux primes de base. Les courtiers acceptent de la recevoir.' },
  { palier:4,  desc:'+5% automatique sur toute prime negociee. Les commanditaires locaux la contactent directement.' },
  { palier:6,  desc:'+10% automatique. Acces aux primes "reservees" (cibles dangereuses, affaires discretes). Jet de Charme facilite pour negocier.' },
  { palier:8,  desc:'+15% automatique. Commanditaires de la noblesse et des guildes majeures. Informations exclusives sur certaines cibles.' },
  { palier:10, desc:'+20% automatique. Primes uniques. Cade peut fixer ses propres conditions. Les commanditaires viennent a elle.' },
];

var TIMER_SEUILS = [3, 5];

var COMP_BONUS = [0, 0, 0, 0.1, 0.25, 0.4, 0.6];

var COMP_EFFETS = [
  '',
  'Traque de base. Prime de base uniquement.',
  'Quelques informations. Prime de base.',
  'Dossier correct. Negociation mineure possible (+10%).',
  'Dossier solide. Avantage Pistage. Negociation facilitee (+25%).',
  'Dossier complet. Prise propre quasi garantie. Prime majoree (+40%).',
  'Dossier exhaustif. Cade arrive preparee. Prime maximale (+60%). Bonus Cote a la cloture.',
];

function coteTier(val) {
  for(var i=COTE_TIERS.length-1; i>=0; i--) if(val>COTE_TIERS[i].max) return COTE_TIERS[i];
  return COTE_TIERS[0];
}

function calcPrime(d) {
  var base = parseInt(d.base)||0;
  var total = base;
  var notes = [];
  var comp = d.completude||0;
  var cb = Math.round(base*(COMP_BONUS[Math.min(comp,COMP_BONUS.length-1)]));
  if(cb>0){ total+=cb; notes.push({label:'Dossier (completude '+comp+'/6)',val:'+'+cb+' CO',cls:'plus'}); }
  // Bonus Cote automatique
  var cpct = coteBonusPct(ceData.cote);
  if(cpct>0){ var cb2=Math.round(base*cpct/100); total+=cb2; notes.push({label:'Bonus Cote ('+cpct+'%)',val:'+'+cb2+' CO',cls:'plus'}); }
  var modifs=d.modifs||[];
  for(var m=0;m<modifs.length;m++){ total+=modifs[m].val; notes.push({label:modifs[m].label,val:(modifs[m].val>=0?'+':'')+modifs[m].val+' CO',cls:modifs[m].val>=0?'plus':'minus'}); }
  if(d.cond==='vivant'&&d.priseMort){ var dec=Math.round(base*0.35); total-=dec; notes.push({label:'Decote (mort au lieu de vivant)',val:'-'+dec+' CO',cls:'minus'}); }
  // Pénalite de delai
  var sess = d.sessions||0; var maxSess = d.maxSessions||5;
  if(sess>maxSess){ var pen=Math.round(base*0.1*(sess-maxSess)); total-=pen; notes.push({label:'Penalite delai ('+sess+' sessions)',val:'-'+pen+' CO',cls:'minus'}); }
  return { total:Math.max(0,total), notes:notes };
}

function timerCls(sess,max){ if(sess<=max) return 'ok'; if(sess<=max+2) return 'warn'; return 'late'; }

function timerNote(sess,max){
  if(sess<=max) return 'Dans les delais ('+(max-sess)+' session(s) restante(s)).';
  if(sess===max+1) return "Delai depasse d'1 session. Penalite -10% de prime.";
  return "Delai depasse de "+(sess-max)+" sessions. Penalite -"+(10*(sess-max))+"% de prime.";
}

function coteBonusPct(val) { var p=[0,0,0,5,10,15,20]; return p[Math.min(val,p.length-1)]; }

function ceLoad() {
  var raw=MODULES.lire("cabinet-enquete");
  if(raw){ try{
    var d=JSON.parse(raw);
    if(d.cote!==undefined) ceData.cote=d.cote;
    if(d.dossiers) ceData.dossiers=d.dossiers;
    if(d.indics) ceData.indics=d.indics;
    if(d.commanditaires) ceData.commanditaires=d.commanditaires;
    if(d.primesTotal) ceData.primesTotal=d.primesTotal;
  }catch(e){} }
  ceRender();
}

function ceSave(){ MODULES.ecrire("cabinet-enquete", JSON.stringify(ceData)); }

function ceRender(){ ceRenderCote(); ceRenderDossiers(); ceRenderIndics(); ceRenderCmd(); ceRenderCoteBonus(); ceRenderStats(); }

function ceRenderCote() {
  var pips=document.getElementById('ce-cote-pips'); if(!pips) return;
  pips.innerHTML='';
  for(var i=0;i<10;i++){
    var pip=document.createElement('div');
    var cls='ce-cote-pip';
    if(i<ceData.cote){ cls+=' on'; if(i<4) cls+=' tier1'; else if(i<7) cls+=' tier2'; else cls+=' tier3'; }
    pip.className=cls; pip.title='Cote '+(i+1);
    (function(idx){ pip.onclick=function(){ ceData.cote=(idx<ceData.cote)?idx:(idx+1); ceSave(); ceRenderCote(); ceRenderDossiers(); ceRenderCoteBonus(); }; })(i);
    pips.appendChild(pip);
  }
  var t=coteTier(ceData.cote);
  var lbl=document.getElementById('ce-cote-label');
  var desc=document.getElementById('ce-cote-desc');
  if(lbl){ lbl.textContent=t.label; lbl.className='ce-cote-label '+t.tier; }
  if(desc) desc.textContent=t.desc;
}

function ceRenderCoteBonus() {
  var c=document.getElementById('ce-cote-bonus-list'); if(!c) return;
  c.innerHTML='';
  for(var i=0;i<COTE_BONUS.length;i++){
    var b=COTE_BONUS[i];
    var active=ceData.cote>=b.palier;
    var div=document.createElement('div');
    div.className='cote-bonus-row '+(active?'':'cote-bonus-inactive');
    div.innerHTML='<span class="cote-bonus-palier '+(active?'cote-bonus-active':'')+'">Cote '+(b.palier===0?'0':''+b.palier+'+')+'</span>'
      +'<span class="cote-bonus-desc">'+b.desc+'</span>';
    c.appendChild(div);
  }
}

function ceRenderStats() {
  var actifs=0;
  for(var i=0;i<ceData.dossiers.length;i++){ var s=ceData.dossiers[i].statut; if(s!=='clos'&&s!=='echoue') actifs++; }
  var indics=0;
  for(var i=0;i<ceData.indics.length;i++){ if(ceData.indics[i].statut==='actif') indics++; }
  document.getElementById('ce-nb-dossiers').textContent=actifs;
  document.getElementById('ce-nb-indics').textContent=indics;
  document.getElementById('ce-primes-total').textContent=ceData.primesTotal||0;
}

function ceTab(name) {
  var tabs=document.querySelectorAll('.ce-tab');
  var panels=document.querySelectorAll('.ce-panel');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('active');
  for(var i=0;i<panels.length;i++) panels[i].classList.remove('active');
  if(name==='dossiers') tabs[0].classList.add('active');
  else{ var b=document.getElementById('ce-tab-'+name); if(b) b.classList.add('active'); }
  var p=document.getElementById('ce-panel-'+name); if(p) p.classList.add('active');
}

function ceToggleForm(id){ document.getElementById(id).classList.toggle('visible'); }

function ceToggleModifForm(idx){ var el=document.getElementById('ce-modif-form-'+idx); if(el) el.style.display=(el.style.display==='flex')?'none':'flex'; }

function ceRenderDossiers() {
  var actifs=[],archives=[];
  for(var i=0;i<ceData.dossiers.length;i++){
    var s=ceData.dossiers[i].statut;
    if(s==='clos'||s==='echoue') archives.push(i); else actifs.push(i);
  }
  ceRenderDossierList('ce-dossiers-list',actifs,false);
  ceRenderDossierList('ce-archives-list',archives,true);
}

function ceRenderDossierList(containerId,indices,isArchive) {
  var c=document.getElementById(containerId); if(!c) return;
  c.innerHTML='';
  if(!indices.length){
    c.innerHTML='<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;padding:0.3rem 0;">'+(isArchive?'Aucune archive.':'Aucun dossier ouvert.')+'</div>';
    return;
  }
  for(var ii=0;ii<indices.length;ii++){
    var realIdx=indices[ii];
    var d=ceData.dossiers[realIdx];
    var prime=calcPrime(d);
    var comp=d.completude||0;
    var statut=d.statut||'ouvert';
    var statutLbl=statut==='traque'?'En traque':statut==='clos'?'Clos':statut==='echoue'?'Echoue':'Ouvert';
    var sess=d.sessions||0;
    var maxSess=d.maxSessions||5;
    var tcls=timerCls(sess,maxSess);

    // Pips completude
    var compHtml='';
    for(var p=0;p<6;p++) compHtml+='<div class="dossier-comp-pip'+(p<comp?' on':'')+'" onclick="ceSetComp('+realIdx+','+(p+1)+');event.stopPropagation();" title="Completude '+(p+1)+'/6"></div>';

    // Indics lies
    var indicsLies=[];
    for(var k=0;k<ceData.indics.length;k++){
      var linked=ceData.indics[k].dossiers||[];
      for(var l=0;l<linked.length;l++) if(linked[l]===realIdx) indicsLies.push(ceData.indics[k].nom||'?');
    }

    // Modificateurs
    var modifsHtml='';
    if(prime.notes.length){
      modifsHtml='<div class="prime-modifs">';
      for(var n=0;n<prime.notes.length;n++) modifsHtml+='<div class="prime-modif-row"><span class="prime-modif-label">'+prime.notes[n].label+'</span><span class="prime-modif-val '+prime.notes[n].cls+'">'+prime.notes[n].val+'</span></div>';
      modifsHtml+='</div>';
    }

    // Journal
    var journal=d.journal||[];
    var journalHtml='';
    if(journal.length){
      for(var j=0;j<journal.length;j++) journalHtml+='<div class="journal-entry"><span class="journal-entry-date">'+(journal[j].date||'?')+'</span><span class="journal-entry-text">'+journal[j].text+'</span><span class="journal-entry-del" onclick="ceDelJournalEntry('+realIdx+','+j+');event.stopPropagation();">x</span></div>';
    }

    var div=document.createElement('div');
    div.className='dossier-item '+statut;

    var html='<div class="dossier-header" onclick="this.parentElement.classList.toggle(\"open\")">';
    html+='<span class="dossier-nom">'+d.nom+'</span>';
    html+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.1rem;">';
    html+='<span class="dossier-prime-val">'+prime.total+' CO</span>';
    html+='<span class="dossier-prime-base">base : '+(d.base||0)+' CO</span></div>';
    html+='<span class="dossier-statut-badge '+statut+'" onclick="ceCycleStatut('+realIdx+');event.stopPropagation();">'+statutLbl+'</span>';
    html+='<span class="dossier-expand">&#9662;</span></div>';
    html+='<div class="dossier-body">';

    // Minuterie
    html+='<div class="dossier-timer">';
    html+='<span class="dossier-timer-label">Traque</span>';
    html+='<span class="dossier-timer-val '+tcls+'">'+sess+' / '+maxSess+' sess.</span>';
    html+='<span class="dossier-timer-note'+(tcls==='late'?' late':'')+'">'+timerNote(sess,maxSess)+'</span>';
    html+='<div class="timer-btns">';
    html+='<button class="d-btn d-btn-blue" onclick="ceTimerTick('+realIdx+',1);event.stopPropagation();">+1</button>';
    html+='<button class="d-btn d-btn-gold" onclick="ceTimerTick('+realIdx+',-1);event.stopPropagation();">-1</button>';
    html+='<button class="d-btn d-btn-blue" onclick="ceTimerSetMax('+realIdx+');event.stopPropagation();">Delai...</button>';
    html+='</div></div>';

    // Completude
    html+='<div class="dossier-completude"><span class="dossier-comp-label">Completude</span>';
    html+='<div class="dossier-comp-pips">'+compHtml+'</div>';
    html+='<span class="dossier-comp-effet'+(comp>=3?' bon':'')+'">'+COMP_EFFETS[Math.min(comp,6)]+'</span></div>';

    if(d.cmd) html+='<div style="font-size:0.75rem;color:var(--SUB);margin-bottom:0.5rem;">Commanditaire : <strong style="color:var(--parchment-dark);">'+d.cmd+'</strong> &nbsp;&#183;&nbsp; Condition : '+(d.cond||'?')+'</div>';

    // Indics lies
    if(indicsLies.length){
      html+='<div style="font-size:0.72rem;color:#8aaccc;margin-bottom:0.5rem;">Indics lies : ';
      for(var k=0;k<indicsLies.length;k++) html+='<span style="background:rgba(74,90,122,0.12);border:1px solid rgba(138,172,204,0.25);border-radius:1px;padding:0.05rem 0.3rem;margin-right:0.3rem;">'+indicsLies[k]+'</span>';
      html+='</div>';
    }

    // Champs libres
    html+='<div class="dossier-section"><span class="dossier-section-title">Informations sur la cible</span>';
    html+='<textarea class="dossier-field" placeholder="Physique, habitudes, complices..." onchange="ceSaveField('+realIdx+',\"desc\",this.value)" onblur="ceSaveField('+realIdx+',\"desc\",this.value)">'+(d.desc||'')+'</textarea></div>';
    html+='<div class="dossier-section"><span class="dossier-section-title">Derniere position connue</span>';
    html+='<textarea class="dossier-field" style="min-height:36px;" placeholder="Lieu, date, source..." onchange="ceSaveField('+realIdx+',\"position\",this.value)" onblur="ceSaveField('+realIdx+',\"position\",this.value)">'+(d.position||'')+'</textarea></div>';
    html+='<div class="dossier-section"><span class="dossier-section-title">Vulnerabilites identifiees</span>';
    html+='<textarea class="dossier-field" style="min-height:36px;" placeholder="Alcool, dettes, famille..." onchange="ceSaveField('+realIdx+',\"vulns\",this.value)" onblur="ceSaveField('+realIdx+',\"vulns\",this.value)">'+(d.vulns||'')+'</textarea></div>';

    // Journal de session
    html+='<div class="dossier-journal"><span class="dossier-journal-title">Journal de session</span>';
    html+=journalHtml;
    html+='<div class="journal-input" id="ce-journal-'+realIdx+'">';
    html+='<input id="ce-j-date-'+realIdx+'" placeholder="Session / Lieu" style="background:rgba(74,90,122,0.08);border:1px solid rgba(138,172,204,0.16);color:var(--parchment);font-family:Crimson Text,serif;font-size:0.83rem;padding:0.22rem 0.38rem;border-radius:1px;width:100%;" />';
    html+='<textarea id="ce-j-text-'+realIdx+'" placeholder="Ce que Cade a appris ou fait ce jour..." style="background:rgba(74,90,122,0.08);border:1px solid rgba(138,172,204,0.16);color:var(--parchment);font-family:Crimson Text,serif;font-size:0.83rem;padding:0.22rem 0.38rem;border-radius:1px;width:100%;resize:vertical;min-height:44px;"></textarea>';
    html+='<div style="display:flex;gap:0.3rem;">';
    html+='<button class="d-btn d-btn-blue" onclick="ceAddJournalEntry('+realIdx+')">Enregistrer</button>';
    html+='<button class="btn-cancel" onclick="ceHideJournal('+realIdx+')">Annuler</button>';
    html+='</div></div>';
    html+='<button class="d-btn d-btn-blue" style="margin-top:0.3rem;" onclick="ceShowJournal('+realIdx+')">+ Entree journal</button>';
    html+='</div>';

    // Modificateurs
    html+='<div style="margin-bottom:0.6rem;"><span class="dossier-section-title">Modificateurs de prime</span>';
    html+=modifsHtml;
    html+='<div style="display:none;gap:0.3rem;flex-wrap:wrap;" id="ce-modif-form-'+realIdx+'">';
    html+='<input id="ce-m-label-'+realIdx+'" class="sort-form-input" style="flex:2;" placeholder="Motif..." />';
    html+='<input id="ce-m-val-'+realIdx+'" class="sort-form-input" style="width:70px;" type="number" placeholder="+5" />';
    html+='<button class="d-btn d-btn-gold" onclick="ceAddModif('+realIdx+')">+</button></div>';
    html+='<button class="d-btn d-btn-blue" style="margin-top:0.3rem;" onclick="ceToggleModifForm('+realIdx+')">+ Modificateur</button>';
    if(d.cond==='vivant') html+=' <label style="font-size:0.72rem;color:var(--SUB);cursor:pointer;"><input type="checkbox" '+(d.priseMort?'checked':'')+' onchange="ceSaveField('+realIdx+',\"priseMort\",this.checked)" style="margin-right:0.25rem;width:auto;" />Prise morte (-35%)</label>';
    html+='</div>';

    html+='<div class="prime-total-row"><span class="prime-total-label">Prime estimee</span>';
    html+='<span class="prime-total-val">'+prime.total+' CO</span></div>';

    html+='<div class="dossier-actions">';
    html+='<button class="d-btn d-btn-blue" onclick="ceCycleStatut('+realIdx+')">Avancer statut</button>';
    if(statut!=='clos'&&statut!=='echoue'){
      html+='<button class="d-btn d-btn-green" onclick="ceCloseDossier('+realIdx+',true)">Clore (succes)</button>';
      html+='<button class="d-btn d-btn-red" onclick="ceCloseDossier('+realIdx+',false)">Echec</button>';
    }
    html+='<button class="d-btn d-btn-red" onclick="ceDelDossier('+realIdx+')">Suppr.</button></div>';
    html+='</div>';
    div.innerHTML=html;
    c.appendChild(div);
  }
}

function ceSaveField(idx,field,val){ if(ceData.dossiers[idx]){ ceData.dossiers[idx][field]=val; ceSave(); } }

function ceSetComp(idx,val){ if(ceData.dossiers[idx]){ ceData.dossiers[idx].completude=(ceData.dossiers[idx].completude||0)===val?val-1:val; ceSave(); ceRenderDossiers(); } }

function ceCycleStatut(idx){ var cycle=['ouvert','traque']; var s=ceData.dossiers[idx].statut||'ouvert'; ceData.dossiers[idx].statut=cycle[(cycle.indexOf(s)+1)%cycle.length]; ceSave(); ceRenderDossiers(); ceRenderStats(); }

function ceTimerTick(idx,d){ ceData.dossiers[idx].sessions=Math.max(0,(ceData.dossiers[idx].sessions||0)+d); ceSave(); ceRenderDossiers(); }

function ceTimerSetMax(idx){ var v=prompt('Delai maximum en sessions (actuel: '+(ceData.dossiers[idx].maxSessions||5)+'):'); if(v!==null&&!isNaN(parseInt(v))){ ceData.dossiers[idx].maxSessions=Math.max(1,parseInt(v)); ceSave(); ceRenderDossiers(); } }

function ceAddModif(idx){ var label=document.getElementById('ce-m-label-'+idx).value.trim(); var val=parseInt(document.getElementById('ce-m-val-'+idx).value)||0; if(!label) return; if(!ceData.dossiers[idx].modifs) ceData.dossiers[idx].modifs=[]; ceData.dossiers[idx].modifs.push({label:label,val:val}); document.getElementById('ce-m-label-'+idx).value=''; document.getElementById('ce-m-val-'+idx).value=''; ceSave(); ceRenderDossiers(); }

function ceCloseDossier(idx,succes){
  var d=ceData.dossiers[idx]; d.statut=succes?'clos':'echoue';
  if(succes){
    var prime=calcPrime(d); ceData.primesTotal=(ceData.primesTotal||0)+prime.total;
    if((d.completude||0)>=6&&ceData.cote<10) ceData.cote=Math.min(10,ceData.cote+1);
    else if(prime.total>10&&ceData.cote<10) ceData.cote=Math.min(10,ceData.cote+1);
    // Maj satisfaction commanditaire
    if(d.cmdIdx!==undefined&&ceData.commanditaires[d.cmdIdx]){
      ceData.commanditaires[d.cmdIdx].satis=Math.min(5,(ceData.commanditaires[d.cmdIdx].satis||3)+1);
      ceData.commanditaires[d.cmdIdx].primesTotal=(ceData.commanditaires[d.cmdIdx].primesTotal||0)+prime.total;
    }
  } else {
    if(d.cmdIdx!==undefined&&ceData.commanditaires[d.cmdIdx])
      ceData.commanditaires[d.cmdIdx].satis=Math.max(1,(ceData.commanditaires[d.cmdIdx].satis||3)-1);
  }
  ceSave(); ceRender();
}

function ceDelDossier(idx){ if(confirm('Supprimer ce dossier ?')){ ceData.dossiers.splice(idx,1); ceSave(); ceRender(); } }

function ceAddDossier(){
  var nom=document.getElementById('ce-d-nom').value.trim(); if(!nom) return;
  var cmdNom=document.getElementById('ce-d-cmd').value.trim();
  var cmdIdx=-1;
  for(var i=0;i<ceData.commanditaires.length;i++) if(ceData.commanditaires[i].nom===cmdNom){ cmdIdx=i; break; }
  ceData.dossiers.push({
    nom:nom, base:parseInt(document.getElementById('ce-d-base').value)||0,
    cmd:cmdNom, cmdIdx:cmdIdx>=0?cmdIdx:undefined,
    cond:document.getElementById('ce-d-cond').value,
    desc:document.getElementById('ce-d-desc').value.trim(),
    statut:'ouvert', completude:0, modifs:[], position:'', vulns:'', priseMort:false,
    sessions:0, maxSessions:5, journal:[],
  });
  var ids=['ce-d-nom','ce-d-base','ce-d-cmd','ce-d-desc'];
  for(var i=0;i<ids.length;i++) document.getElementById(ids[i]).value='';
  ceSave(); ceRenderDossiers(); ceRenderStats(); ceToggleForm('ce-form-dossier');
}

function ceShowJournal(idx){ var el=document.getElementById('ce-journal-'+idx); if(el) el.classList.add('visible'); }

function ceHideJournal(idx){ var el=document.getElementById('ce-journal-'+idx); if(el) el.classList.remove('visible'); }

function ceAddJournalEntry(idx){
  var date=document.getElementById('ce-j-date-'+idx).value.trim();
  var text=document.getElementById('ce-j-text-'+idx).value.trim();
  if(!text) return;
  if(!ceData.dossiers[idx].journal) ceData.dossiers[idx].journal=[];
  ceData.dossiers[idx].journal.push({date:date||'Session',text:text});
  // Chaque entree journal monte la completude de 0.5 (arrondie, max 6)
  var cur=ceData.dossiers[idx].completude||0;
  if(cur<6) ceData.dossiers[idx].completude=Math.min(6,cur+1);
  document.getElementById('ce-j-date-'+idx).value='';
  document.getElementById('ce-j-text-'+idx).value='';
  ceSave(); ceRenderDossiers();
}

function ceDelJournalEntry(dIdx,jIdx){ ceData.dossiers[dIdx].journal.splice(jIdx,1); ceSave(); ceRenderDossiers(); }

function ceRenderIndics(){
  var c=document.getElementById('ce-indics-list'); if(!c) return;
  c.innerHTML='';
  if(!ceData.indics.length){ c.innerHTML='<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;padding:0.3rem 0;">Aucun indic. Le reseau reste a construire.</div>'; return; }
  for(var ii=0;ii<ceData.indics.length;ii++){
    var ind=ceData.indics[ii];
    var fiab=ind.fiab||1;
    var statut=ind.statut||'actif';
    var statutLbl=statut==='grille'?'Grille':statut==='douteux'?'Douteux':'Actif';
    var pipHtml='';
    for(var p=0;p<5;p++){ var on=p<fiab; var hi=on&&p>=3; pipHtml+='<div class="indic-fiab-pip'+(on?' on':'')+(hi?' hi':'')+'" onclick="ceSetIndicFiab('+ii+','+(p+1)+');event.stopPropagation();" title="Fiabilite '+(p+1)+'"></div>'; }
    var log=ind.log||[];
    var logHtml='';
    if(log.length){ logHtml='<ul class="indic-log">'; for(var li=0;li<log.length;li++) logHtml+='<li><span class="indic-log-date">'+(log[li].date||'?')+'</span><span>'+log[li].note+'</span><span class="indic-log-del" onclick="ceDelIndicLog('+ii+','+li+');event.stopPropagation();">x</span></li>'; logHtml+='</ul>'; }
    // Dossiers lies
    var linked=ind.dossiers||[];
    var linkedHtml='';
    if(linked.length){
      linkedHtml='<div class="indic-dossiers-linked">';
      for(var l=0;l<linked.length;l++){
        var d2=ceData.dossiers[linked[l]];
        if(d2) linkedHtml+='<span class="indic-dossier-tag">'+d2.nom+'</span>';
      }
      linkedHtml+='</div>';
    }
    // Options dossiers pour le select
    var dossiersOptions='<option value="">-- Choisir --</option>';
    for(var di=0;di<ceData.dossiers.length;di++){
      var ds=ceData.dossiers[di];
      if(ds.statut!=='clos'&&ds.statut!=='echoue') dossiersOptions+='<option value="'+di+'">'+ds.nom+'</option>';
    }

    var div=document.createElement('div'); div.className='indic-item '+statut;
    var html='<div class="indic-header" onclick="this.parentElement.classList.toggle(\"open\")">';
    html+='<span class="indic-nom">'+(ind.nom||'?')+'</span>';
    if(ind.spec) html+='<span class="indic-spec">'+ind.spec+'</span>';
    html+='<div class="indic-fiab">'+pipHtml+'</div>';
    html+='<span class="indic-statut-badge '+statut+'" onclick="ceIndicCycleStatut('+ii+');event.stopPropagation();">'+statutLbl+'</span>';
    html+='<span class="indic-expand">&#9662;</span></div>';
    html+='<div class="indic-body">';
    if(ind.bonus) html+='<div class="indic-bonus">'+ind.bonus+'</div>';
    if(ind.note) html+='<div style="margin-bottom:0.4rem;font-style:italic;">'+ind.note+'</div>';
    html+=linkedHtml;
    html+='<div class="indic-link-form" id="ce-ind-link-'+ii+'">';
    html+='<select id="ce-ind-link-sel-'+ii+'">'+dossiersOptions+'</select>';
    html+='<button class="d-btn d-btn-blue" onclick="ceLinkIndicDossier('+ii+')">Lier</button>';
    html+='<button class="btn-cancel" onclick="ceHideIndicLink('+ii+')">x</button></div>';
    html+=logHtml;
    html+='<div style="display:none;flex-direction:column;gap:0.28rem;margin-bottom:0.35rem;" id="ce-ind-log-'+ii+'">';
    html+='<input id="ce-ind-log-date-'+ii+'" placeholder="Quand" style="background:rgba(74,90,122,0.08);border:1px solid rgba(138,172,204,0.16);color:var(--parchment);font-family:Crimson Text,serif;font-size:0.83rem;padding:0.22rem 0.38rem;border-radius:1px;width:100%;" />';
    html+='<input id="ce-ind-log-note-'+ii+'" placeholder="Information fournie..." style="background:rgba(74,90,122,0.08);border:1px solid rgba(138,172,204,0.16);color:var(--parchment);font-family:Crimson Text,serif;font-size:0.83rem;padding:0.22rem 0.38rem;border-radius:1px;width:100%;" />';
    html+='<div style="display:flex;gap:0.3rem;">';
    html+='<button class="d-btn d-btn-blue" onclick="ceAddIndicLog('+ii+')">Enregistrer</button>';
    html+='<button class="btn-cancel" onclick="ceHideIndicLog('+ii+')">Annuler</button>';
    html+='</div></div>';
    html+='<div class="indic-actions">';
    html+='<button class="d-btn d-btn-blue" onclick="ceToggleIndicLog('+ii+');event.stopPropagation();">+ Log</button>';
    html+='<button class="d-btn d-btn-blue" onclick="ceShowIndicLink('+ii+')">+ Lier dossier</button>';
    html+='<button class="d-btn d-btn-gold" onclick="ceSetIndicFiab('+ii+',Math.min(5,(ceData.indics['+ii+'].fiab||1)+1));event.stopPropagation();">Fiab. +</button>';
    html+='<button class="d-btn d-btn-blue" onclick="ceSetIndicFiab('+ii+',Math.max(1,(ceData.indics['+ii+'].fiab||1)-1));event.stopPropagation();">Fiab. -</button>';
    html+='<button class="d-btn d-btn-blue" onclick="ceIndicCycleStatut('+ii+')">Statut</button>';
    html+='<button class="d-btn d-btn-red" onclick="ceDelIndic('+ii+')">Suppr.</button></div></div>';
    div.innerHTML=html; c.appendChild(div);
  }
}

function ceSetIndicFiab(idx,val){ ceData.indics[idx].fiab=Math.max(1,Math.min(5,val)); ceSave(); ceRenderIndics(); }

function ceIndicCycleStatut(idx){ var c=['actif','douteux','grille']; var s=ceData.indics[idx].statut||'actif'; ceData.indics[idx].statut=c[(c.indexOf(s)+1)%3]; ceSave(); ceRenderIndics(); ceRenderStats(); }

function ceAddIndicLog(idx){ var date=document.getElementById('ce-ind-log-date-'+idx).value.trim(); var note=document.getElementById('ce-ind-log-note-'+idx).value.trim(); if(!note) return; if(!ceData.indics[idx].log) ceData.indics[idx].log=[]; ceData.indics[idx].log.push({date:date||'Session',note:note}); document.getElementById('ce-ind-log-date-'+idx).value=''; document.getElementById('ce-ind-log-note-'+idx).value=''; ceSave(); ceRenderIndics(); }

function ceDelIndicLog(ctIdx,logIdx){ ceData.indics[ctIdx].log.splice(logIdx,1); ceSave(); ceRenderIndics(); }

function ceDelIndic(idx){ if(confirm('Supprimer ?')){ ceData.indics.splice(idx,1); ceSave(); ceRender(); } }

function ceToggleIndicLog(idx){ var el=document.getElementById('ce-ind-log-'+idx); if(el) el.style.display=(el.style.display==='flex')?'none':'flex'; }

function ceHideIndicLog(idx){ var el=document.getElementById('ce-ind-log-'+idx); if(el) el.style.display='none'; }

function ceShowIndicLink(idx){ var el=document.getElementById('ce-ind-link-'+idx); if(el) el.classList.add('visible'); }

function ceHideIndicLink(idx){ var el=document.getElementById('ce-ind-link-'+idx); if(el) el.classList.remove('visible'); }

function ceLinkIndicDossier(idx){
  var sel=document.getElementById('ce-ind-link-sel-'+idx); if(!sel||sel.value==='') return;
  var dIdx=parseInt(sel.value);
  if(!ceData.indics[idx].dossiers) ceData.indics[idx].dossiers=[];
  if(ceData.indics[idx].dossiers.indexOf(dIdx)===-1) ceData.indics[idx].dossiers.push(dIdx);
  ceHideIndicLink(idx); ceSave(); ceRenderIndics(); ceRenderDossiers();
}

function ceAddIndic(){
  var nom=document.getElementById('ce-i-nom').value.trim(); if(!nom) return;
  ceData.indics.push({nom:nom,spec:document.getElementById('ce-i-spec').value.trim(),bonus:document.getElementById('ce-i-bonus').value.trim(),note:document.getElementById('ce-i-note').value.trim(),fiab:1,statut:'actif',log:[],dossiers:[]});
  var ids=['ce-i-nom','ce-i-spec','ce-i-bonus','ce-i-note'];
  for(var i=0;i<ids.length;i++) document.getElementById(ids[i]).value='';
  ceSave(); ceRenderIndics(); ceRenderStats(); ceToggleForm('ce-form-indic');
}

function ceRenderCmd(){
  var c=document.getElementById('ce-cmd-list'); if(!c) return;
  c.innerHTML='';
  if(!ceData.commanditaires||!ceData.commanditaires.length){ c.innerHTML='<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;padding:0.3rem 0;">Aucun commanditaire enregistre.</div>'; return; }
  for(var i=0;i<ceData.commanditaires.length;i++){
    var cmd=ceData.commanditaires[i];
    var satis=cmd.satis||3;
    var pipHtml='';
    for(var p=0;p<5;p++){ var on=p<satis; var cls=on?(p<2?'low':p<4?'mid':'high'):''; pipHtml+='<div class="cmd-satis-pip'+(on?' on '+cls:'')+'" onclick="ceCmdSetSatis('+i+','+(p+1)+');event.stopPropagation();" title="Satisfaction '+(p+1)+'"></div>'; }
    var typeLbl=cmd.type==='guilde'?'Guilde':cmd.type==='noblesse'?'Noblesse':cmd.type==='milice'?'Milice':cmd.type==='autre'?'Autre':'Marchand';
    // Bonus selon satisfaction
    var bonusDesc='';
    if(satis>=5) bonusDesc='+15% sur les primes de ce commanditaire. Acces prioritaire a ses missives.';
    else if(satis>=4) bonusDesc='+10% sur les primes. Informations complementaires fournies.';
    else if(satis>=3) bonusDesc='Relation neutre. Primes au tarif normal.';
    else if(satis>=2) bonusDesc='Relation tendue. -5% sur les primes. Verification des resultats exigee.';
    else bonusDesc='Relation rompue. Refus probable de nouvelles primes.';

    var div=document.createElement('div'); div.className='cmd-item';
    var html='<div class="cmd-header" onclick="this.parentElement.classList.toggle(\"open\")">';
    html+='<span class="cmd-nom">'+(cmd.nom||'?')+'</span>';
    html+='<span style="font-size:0.65rem;color:var(--SUB);font-style:italic;">'+typeLbl+'</span>';
    html+='<div class="cmd-satis-pips">'+pipHtml+'</div>';
    if(cmd.primesTotal) html+='<span class="cmd-primes-val">'+cmd.primesTotal+' CO</span>';
    html+='<span class="cmd-expand">&#9662;</span></div>';
    html+='<div class="cmd-body">';
    html+='<div class="cmd-bonus-box"><span class="cmd-bonus-label">Effet de la relation</span><span class="cmd-bonus-text">'+bonusDesc+'</span></div>';
    if(cmd.note) html+='<div style="font-style:italic;margin-bottom:0.45rem;font-size:0.82rem;">'+cmd.note+'</div>';
    html+='<div class="cmd-actions">';
    html+='<button class="d-btn d-btn-blue" onclick="ceCmdSetSatis('+i+',Math.min(5,(ceData.commanditaires['+i+'].satis||3)+1))">Satis. +</button>';
    html+='<button class="d-btn d-btn-gold" onclick="ceCmdSetSatis('+i+',Math.max(1,(ceData.commanditaires['+i+'].satis||3)-1))">Satis. -</button>';
    html+='<button class="d-btn d-btn-red" onclick="ceDelCmd('+i+')">Suppr.</button>';
    html+='</div></div>';
    div.innerHTML=html; c.appendChild(div);
  }
}

function ceCmdSetSatis(idx,val){ if(!ceData.commanditaires[idx]) return; ceData.commanditaires[idx].satis=Math.max(1,Math.min(5,val)); ceSave(); ceRenderCmd(); }

function ceDelCmd(idx){ if(confirm('Supprimer ?')){ ceData.commanditaires.splice(idx,1); ceSave(); ceRenderCmd(); } }

function ceAddCmd(){
  var nom=document.getElementById('ce-cmd-nom').value.trim(); if(!nom) return;
  ceData.commanditaires.push({nom:nom,type:document.getElementById('ce-cmd-type').value,satis:parseInt(document.getElementById('ce-cmd-satis').value)||3,note:document.getElementById('ce-cmd-note').value.trim(),primesTotal:0});
  var ids=['ce-cmd-nom','ce-cmd-note']; for(var i=0;i<ids.length;i++) document.getElementById(ids[i]).value='';
  ceSave(); ceRenderCmd(); ceToggleForm('ce-form-cmd');
}
