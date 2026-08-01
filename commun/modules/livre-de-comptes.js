/* Le Livre de comptes — mécanique de Reiner Hauer
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis reiner.html, code d'origine conservé. */
/* ── portée propre au module ── */
(function () {


let lbData = { contacts:[], dettes:[], faveurs:[], zones:[], appels:[], appelUsed:false };

function lbLoad() {
  const raw = MODULES.lire("livre-de-comptes");
  if(raw) try {
    const d = JSON.parse(raw);
    if(d.contacts)  lbData.contacts  = d.contacts;
    if(d.dettes)    lbData.dettes    = d.dettes;
    if(d.faveurs)   lbData.faveurs   = d.faveurs;
    if(d.zones)     lbData.zones     = d.zones;
    if(d.appels)    lbData.appels    = d.appels;
    if(d.appelUsed !== undefined) lbData.appelUsed = d.appelUsed;
  } catch(e){}
  lbRender();
}

function lbSave() { MODULES.ecrire("livre-de-comptes", JSON.stringify(lbData)); }

function lbRender() { lbRenderContacts(); lbRenderDF(); lbRenderRep(); lbRenderStats(); lbRenderAppel(); }

function lbNiveau() {
  const score = lbData.contacts.filter(c=>c.statut!=='grille').length * 2
    + lbData.faveurs.filter(f=>!f.encaisse).length
    + lbData.zones.reduce((a,z)=>a+(z.score||0),0);
  if(score >= 40) return 'Redoute';
  if(score >= 22) return 'Influent';
  if(score >= 10) return 'Etabli';
  return 'Debutant';
}

function lbRenderStats() {
  document.getElementById('lb-nb-contacts').textContent = lbData.contacts.filter(c=>c.statut!=='grille').length;
  document.getElementById('lb-nb-faveurs').textContent  = lbData.faveurs.filter(f=>!f.encaisse).length;
  document.getElementById('lb-nb-dettes').textContent   = lbData.dettes.filter(d=>!d.acquitte).length;
  document.getElementById('lb-nb-zones').textContent    = lbData.zones.length;
  document.getElementById('lb-niveau').textContent      = lbNiveau();
}

function lbTab(name) {
  document.querySelectorAll('.lb-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.lb-panel').forEach(p=>p.classList.remove('active'));
  const btn = name==='noms'?document.querySelector('.lb-tab'):document.getElementById('lb-tab-'+name);
  if(name==='noms') document.querySelector('.lb-tab').classList.add('active');
  else if(btn) btn.classList.add('active');
  const panel = document.getElementById('lb-panel-'+name);
  if(panel) panel.classList.add('active');
}

function lbToggleForm(id) { document.getElementById(id).classList.toggle('visible'); }

function lbToggleLog(i){ var el=document.getElementById('lb-ct-log-'+i); if(el) el.classList.toggle('visible'); }

function lbHideLog(i){ var el=document.getElementById('lb-ct-log-'+i); if(el) el.classList.remove('visible'); }

function lbRenderContacts() {
  const c = document.getElementById('lb-contacts-list'); if(!c) return;
  c.innerHTML='';
  if(!lbData.contacts.length){
    c.innerHTML='<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;padding:0.3rem 0;">Aucun contact enregistre. Le livre est vierge.</div>';
    return;
  }
  lbData.contacts.forEach((ct,i)=>{
    const fiab = ct.fiab||1;
    const statut = ct.statut||'actif';
    const statutLbl = statut==='grille'?'Grille':statut==='distant'?'Distant':'Actif';
    let pipHtml='';
    for(let p=0;p<5;p++){
      const on=p<fiab; const hi=on&&p>=3;
      pipHtml+=`<div class="lb-fiab-pip${on?' on':''}${hi?' high':''}" onclick="lbSetFiab(${i},${p+1});event.stopPropagation();" title="Fiabilite ${p+1}"></div>`;
    }
    const log = ct.log||[];
    let logHtml='';
    if(log.length) logHtml='<ul class="lb-log">'+log.map((l,li)=>`<li><span class="lb-log-date">${l.date||'?'}</span><span>${l.note}</span><span class="lb-log-del" onclick="lbDelContactLog(${i},${li});event.stopPropagation();">x</span></li>`).join('')+'</ul>';

    const div=document.createElement('div');
    div.className='lb-contact '+statut;
    div.innerHTML=
      '<div class="lb-contact-header" onclick="this.parentElement.classList.toggle(\'open\')">'
      +'<span class="lb-contact-name">'+(ct.name||'?')+'</span>'
      +(ct.role?'<span class="lb-contact-role">'+ct.role+'</span>':'')
      +'<div class="lb-fiab">'+pipHtml+'</div>'
      +'<span class="lb-statut-badge '+statut+'" onclick="lbCycleStatut('+i+');event.stopPropagation();">'+statutLbl+'</span>'
      +'<span class="lb-expand">&#9662;</span>'
      +'</div>'
      +'<div class="lb-contact-body">'
      +(ct.note?'<div class="lb-contact-note">'+ct.note+'</div>':'')
      +logHtml
      +'<div class="lb-log-input" id="lb-ct-log-'+i+'">'
        +'<input id="lb-ct-log-date-'+i+'" placeholder="Quand (session, lieu...)" />'
        +'<input id="lb-ct-log-note-'+i+'" placeholder="Ce qui s\'est passe..." />'
        +'<div style="display:flex;gap:0.32rem;">'
          +'<button class="btn-add btn-add-vio" style="font-size:0.57rem;" onclick="lbAddContactLog('+i+')">Enregistrer</button>'
          +'<button class="btn-cancel" style="font-size:0.57rem;" onclick="lbHideLog('+i+')">Annuler</button>'
        +'</div>'
      +'</div>'
      +'<div class="lb-contact-actions">'
        +'<button class="lb-btn lb-btn-log" onclick="lbToggleLog('+i+');event.stopPropagation();">+ Log</button>'
        +'<button class="lb-btn lb-btn-up" onclick="lbSetFiab('+i+',Math.min(5,(lbData.contacts['+i+'].fiab||1)+1));event.stopPropagation();">Fiab. +</button>'
        +'<button class="lb-btn lb-btn-down" onclick="lbSetFiab('+i+',Math.max(1,(lbData.contacts['+i+'].fiab||1)-1));event.stopPropagation();">Fiab. -</button>'
        +'<button class="lb-btn lb-btn-cycle" onclick="lbCycleStatut('+i+')">Statut</button>'
        +'<button class="lb-btn lb-btn-del" onclick="lbDelContact('+i+')">Suppr.</button>'
      +'</div>'
      +'</div>';
    c.appendChild(div);
  });
}

function lbSetFiab(idx,val) { lbData.contacts[idx].fiab=Math.max(1,Math.min(5,val)); lbSave(); lbRenderContacts(); lbRenderStats(); }

function lbCycleStatut(idx) { const cycle=['actif','distant','grille']; const s=lbData.contacts[idx].statut||'actif'; lbData.contacts[idx].statut=cycle[(cycle.indexOf(s)+1)%3]; lbSave(); lbRenderContacts(); lbRenderStats(); }

function lbAddContactLog(idx) { const date=document.getElementById('lb-ct-log-date-'+idx).value.trim(); const note=document.getElementById('lb-ct-log-note-'+idx).value.trim(); if(!note) return; if(!lbData.contacts[idx].log) lbData.contacts[idx].log=[]; lbData.contacts[idx].log.push({date:date||'Session',note}); document.getElementById('lb-ct-log-date-'+idx).value=''; document.getElementById('lb-ct-log-note-'+idx).value=''; lbSave(); lbRenderContacts(); }

function lbDelContactLog(ctIdx,logIdx) { lbData.contacts[ctIdx].log.splice(logIdx,1); lbSave(); lbRenderContacts(); }

function lbDelContact(idx) { if(confirm('Supprimer ce contact ?')){ lbData.contacts.splice(idx,1); lbSave(); lbRenderContacts(); lbRenderStats(); } }

function lbAddContact() {
  const name=document.getElementById('lb-c-name').value.trim(); if(!name) return;
  lbData.contacts.push({ name, role:document.getElementById('lb-c-role').value.trim(), statut:document.getElementById('lb-c-statut').value, note:document.getElementById('lb-c-note').value.trim(), fiab:1, log:[] });
  ['lb-c-name','lb-c-role','lb-c-note'].forEach(id=>document.getElementById(id).value='');
  lbSave(); lbRenderContacts(); lbRenderStats(); lbToggleForm('lb-form-contact');
}

function lbRenderDF() { lbRenderDettes(); lbRenderFaveurs(); }

function lbRenderDFItem(item, idx, type) {
  const valLbl = item.val==='grande'?'Grande':item.val==='moyenne'?'Moyenne':'Petite';
  const div=document.createElement('div');
  div.className=`lb-df-item ${type}-item${item.encaisse||item.acquitte?' encaisse':''}`;
  const actionLabel = type==='dette'?'Acquitter':'Encaisser';
const actionFn    = type==='dette'?'lbAcquitteDette('+idx+')':'lbEncaisseFaveur('+idx+')';
  const done = item.encaisse||item.acquitte;
  div.innerHTML=`
    <div class="lb-df-header" onclick="this.parentElement.classList.toggle('open')">
      <span class="lb-df-titulaire">${item.tit||'?'}${done?` <span style="font-size:0.6rem;color:var(--GRN);border:1px solid rgba(94,160,80,0.3);padding:0.02rem 0.28rem;border-radius:1px;margin-left:0.25rem;">${type==='dette'?'ACQUITTEE':'ENCAISSEE'}</span>`:''}</span>
      <span class="lb-df-val-badge ${item.val||'petite'}">${valLbl}</span>
      <span class="lb-df-expand">&#9662;</span>
    </div>
    <div class="lb-df-body">
` + (item.desc?'<div style="margin-bottom:0.35rem;">'+item.desc+'</div>':'')
+(done?'<div class="lb-df-encaisse-msg">'+(type==='dette'?'Dette honoree.':'Faveur encaissee.')+'</div>':'<div class="lb-df-actions"><button class="lb-btn lb-btn-log" onclick="'+actionFn+'">'+actionLabel+'</button><button class="lb-btn lb-btn-del" onclick="lbDel'+type.charAt(0).toUpperCase()+type.slice(1)+'('+idx+')">Suppr.</button></div>')+




'</div>';
  return div;
}

function lbRenderDettes() { const c=document.getElementById('lb-dettes-list'); if(!c) return; c.innerHTML=''; if(!lbData.dettes.length){ c.innerHTML='<div style="font-size:0.8rem;color:var(--SUB);font-style:italic;padding:0.25rem 0;">Ardoise vierge.</div>'; return; } lbData.dettes.forEach((d,i)=>c.appendChild(lbRenderDFItem(d,i,'dette'))); }

function lbRenderFaveurs() { const c=document.getElementById('lb-faveurs-list'); if(!c) return; c.innerHTML=''; if(!lbData.faveurs.length){ c.innerHTML='<div style="font-size:0.8rem;color:var(--SUB);font-style:italic;padding:0.25rem 0;">Rien en reserve.</div>'; return; } lbData.faveurs.forEach((f,i)=>c.appendChild(lbRenderDFItem(f,i,'faveur'))); }

function lbAcquitteDette(idx) { if(confirm('Marquer cette dette comme acquittee ?')){ lbData.dettes[idx].acquitte=true; lbSave(); lbRenderDF(); lbRenderStats(); } }

function lbEncaisseFaveur(idx) { if(confirm('Encaisser cette faveur ?')){ lbData.faveurs[idx].encaisse=true; lbSave(); lbRenderDF(); lbRenderStats(); } }

function lbDelDette(idx) { if(confirm('Supprimer ?')){ lbData.dettes.splice(idx,1); lbSave(); lbRenderDF(); lbRenderStats(); } }

function lbDelFaveur(idx) { if(confirm('Supprimer ?')){ lbData.faveurs.splice(idx,1); lbSave(); lbRenderDF(); lbRenderStats(); } }

function lbAddDette() { const tit=document.getElementById('lb-d-tit').value.trim(); if(!tit) return; lbData.dettes.push({tit,val:document.getElementById('lb-d-val').value,desc:document.getElementById('lb-d-desc').value.trim(),acquitte:false}); ['lb-d-tit','lb-d-desc'].forEach(id=>document.getElementById(id).value=''); lbSave(); lbRenderDF(); lbRenderStats(); lbToggleForm('lb-form-dette'); }

function lbAddFaveur() { const tit=document.getElementById('lb-f-tit').value.trim(); if(!tit) return; lbData.faveurs.push({tit,val:document.getElementById('lb-f-val').value,desc:document.getElementById('lb-f-desc').value.trim(),encaisse:false}); ['lb-f-tit','lb-f-desc'].forEach(id=>document.getElementById(id).value=''); lbSave(); lbRenderDF(); lbRenderStats(); lbToggleForm('lb-form-faveur'); }

function lbRepEffet(score) {
  if(score >= 8) return { cls:'high', txt:'Capital fort : bonus contextuel disponible. Portes ouvertes, information facilitee, soutien possible.' };
  if(score >= 4) return { cls:'mid',  txt:'Reputation etablie : neutralite bienveillante. Pas de friction spontanee.' };
  if(score >= 1) return { cls:'mid',  txt:"Connu mais sans poids. La reputation n'a pas encore de masse." };
  return { cls:'low', txt:'Inconnu ou mal vu. Friction par defaut dans cette zone.' };
}

function lbRenderRep() {
  const c=document.getElementById('lb-rep-list'); if(!c) return;
  c.innerHTML='';
  if(!lbData.zones.length){ c.innerHTML='<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;padding:0.3rem 0;">Aucune zone enregistree. La route ne sait pas encore qui est Reiner.</div>'; return; }
  lbData.zones.forEach((z,i)=>{
    const score=z.score||0;
    const ef=lbRepEffet(score);
    const typeLbl=z.type==='crainte'?'Crainte':z.type==='sympathie'?'Sympathie':z.type==='mefiance'?'Mefiance':'Respect';
    const div=document.createElement('div'); div.className='lb-rep-item';
    div.innerHTML=`
      <div class="lb-rep-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="lb-rep-zone">${z.zone||'?'}</span>
        <span class="lb-rep-type-badge ${z.type||'respect'}">${typeLbl}</span>
        <div class="lb-rep-bar-wrap"><div class="lb-rep-bar"><div class="lb-rep-bar-fill ${ef.cls}" style="width:${score*10}%"></div></div></div>
        <span class="lb-rep-score ${ef.cls}">${score}</span>
        <span class="lb-rep-expand">&#9662;</span>
      </div>
      <div class="lb-rep-body">
        <div class="lb-rep-effet">${ef.txt}</div>
        ${z.note?`<div style="font-size:0.78rem;font-style:italic;color:var(--SUB);margin-bottom:0.4rem;">${z.note}</div>`:''}
        <div class="lb-rep-actions">
          <button class="lb-rep-btn lb-rep-btn-up"   onclick="lbRepChange(${i},1)">Rep. +1</button>
          <button class="lb-rep-btn lb-rep-btn-down" onclick="lbRepChange(${i},-1)">Rep. -1</button>
          <button class="lb-rep-btn lb-rep-btn-del"  onclick="lbRepDel(${i})">Suppr.</button>
        </div>
      </div>`;
    c.appendChild(div);
  });
}

function lbRepChange(idx,d) { lbData.zones[idx].score=Math.max(0,Math.min(10,(lbData.zones[idx].score||0)+d)); lbSave(); lbRenderRep(); lbRenderStats(); }

function lbRepDel(idx) { if(confirm('Supprimer cette zone ?')){ lbData.zones.splice(idx,1); lbSave(); lbRenderRep(); lbRenderStats(); } }

function lbAddRep() { const zone=document.getElementById('lb-r-zone').value.trim(); if(!zone) return; lbData.zones.push({zone,type:document.getElementById('lb-r-type').value,score:parseInt(document.getElementById('lb-r-score').value)||1,note:document.getElementById('lb-r-note').value.trim()}); ['lb-r-zone','lb-r-note'].forEach(id=>document.getElementById(id).value=''); document.getElementById('lb-r-score').value='1'; lbSave(); lbRenderRep(); lbRenderStats(); lbToggleForm('lb-form-rep'); }

function lbRenderAppel() {
  const el=document.getElementById('lb-appel-content'); if(!el) return;
  if(lbData.appelUsed) {
    const last = lbData.appels.length ? lbData.appels[lbData.appels.length-1] : null;
    el.innerHTML='<div class="lb-appel-used">Deja utilise cette session.'+(last?' Dernier appel : <em>'+(last.zone||'?')+'</em>':'')+'</div>'
      +'<button class="lb-btn lb-btn-log" style="margin-top:0.3rem;" onclick="lbResetAppel()">Nouvelle session (reinitialiser)</button>'
      +(lbData.appels.length?'<ul class="lb-appel-log">'+lbData.appels.slice().reverse().map((a,i)=>'<li><span class="lb-appel-log-sess">'+(a.session||'?')+'</span><span><strong>'+(a.zone||'?')+'</strong>'+(a.contact?' via '+a.contact:'')+' : '+(a.resultat||'?')+'</span><span class="lb-appel-log-del" onclick="lbDelAppel('+(lbData.appels.length-1-i)+')">x</span></li>').join('')+'</ul>':'')
  } else {
    const zones = lbData.zones.map(z=>z.zone).filter(Boolean);
    const contacts = lbData.contacts.filter(c=>c.statut==='actif').map(c=>c.name).filter(Boolean);
    el.innerHTML=`<div style="font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.5rem;">Convertir un capital de reputation en avantage concret : information, passe-droit, soutien, ressource...</div>
      <div class="lb-appel-form">
        <div><span class="lb-form-label">Zone activee</span>
          <select id="lb-a-zone"><option value="">-- Choisir une zone --</option>${zones.map(z=>`<option>${z}</option>`).join('')}<option value="autre">Autre / libre</option></select>
        </div>
        <div><span class="lb-form-label">Contact mobilise (optionnel)</span>
          <select id="lb-a-contact"><option value="">-- Aucun contact specifique --</option>${contacts.map(n=>`<option>${n}</option>`).join('')}</select>
        </div>
        <div><span class="lb-form-label">Session / Moment</span><input id="lb-a-session" placeholder="Ex: Session 3, Hochsleben" /></div>
        <div><span class="lb-form-label">Resultat obtenu</span><textarea id="lb-a-resultat" placeholder="Ce que Reiner a obtenu concretement..."></textarea></div>
        <div style="display:flex;gap:0.4rem;margin-top:0.1rem;">
          <button class="btn-add btn-add-gld" onclick="lbUseAppel()">Valider l'appel</button>
        </div>
      </div>`;
  }
}

function lbUseAppel() {
  const zone=document.getElementById('lb-a-zone').value.trim();
  const contact=document.getElementById('lb-a-contact').value.trim();
  const session=document.getElementById('lb-a-session').value.trim();
  const resultat=document.getElementById('lb-a-resultat').value.trim();
  if(!zone||!resultat) { alert('Zone et resultat requis.'); return; }
  lbData.appels.push({zone,contact,session:session||'Session ?',resultat});
  lbData.appelUsed=true;
  lbSave(); lbRenderAppel();
}

function lbResetAppel() { lbData.appelUsed=false; lbSave(); lbRenderAppel(); }

function lbDelAppel(idx) { lbData.appels.splice(idx,1); lbSave(); lbRenderAppel(); }


/* Rendues accessibles aux boutons de la page. */
  window.lbLoad = lbLoad;
  window.lbSave = lbSave;
  window.lbRender = lbRender;
  window.lbNiveau = lbNiveau;
  window.lbRenderStats = lbRenderStats;
  window.lbTab = lbTab;
  window.lbToggleForm = lbToggleForm;
  window.lbToggleLog = lbToggleLog;
  window.lbHideLog = lbHideLog;
  window.lbRenderContacts = lbRenderContacts;
  window.lbSetFiab = lbSetFiab;
  window.lbCycleStatut = lbCycleStatut;
  window.lbAddContactLog = lbAddContactLog;
  window.lbDelContactLog = lbDelContactLog;
  window.lbDelContact = lbDelContact;
  window.lbAddContact = lbAddContact;
  window.lbRenderDF = lbRenderDF;
  window.lbRenderDFItem = lbRenderDFItem;
  window.lbRenderDettes = lbRenderDettes;
  window.lbRenderFaveurs = lbRenderFaveurs;
  window.lbAcquitteDette = lbAcquitteDette;
  window.lbEncaisseFaveur = lbEncaisseFaveur;
  window.lbDelDette = lbDelDette;
  window.lbDelFaveur = lbDelFaveur;
  window.lbAddDette = lbAddDette;
  window.lbAddFaveur = lbAddFaveur;
  window.lbRepEffet = lbRepEffet;
  window.lbRenderRep = lbRenderRep;
  window.lbRepChange = lbRepChange;
  window.lbRepDel = lbRepDel;
  window.lbAddRep = lbAddRep;
  window.lbRenderAppel = lbRenderAppel;
  window.lbUseAppel = lbUseAppel;
  window.lbResetAppel = lbResetAppel;
  window.lbDelAppel = lbDelAppel;

/* Enregistrement en dernier : le module doit être entièrement défini
   avant que la fiche ne l'affiche et ne le démarre. */
  MODULES.enregistrer({
    id: "livre-de-comptes",
    titre: "Le Livre de comptes",
    css: "[data-module=\"livre-de-comptes\"] { --VIO2:#a07830; }\n.lb-card { background:rgba(9,8,12,0.72); border:1px solid rgba(160,120,48,0.25); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.lb-tabs { display:flex; gap:0.3rem; margin-bottom:0.9rem; flex-wrap:wrap; }\n.lb-tab { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; padding:0.28rem 0.75rem; border-radius:1px; cursor:pointer; transition:all 0.15s; border:1px solid rgba(255,255,255,0.07); background:transparent; color:var(--SUB); }\n.lb-tab.active { border-color:rgba(160,120,48,0.5); color:var(--VIO2); background:rgba(160,120,48,0.08); }\n.lb-panel { display:none; }\n.lb-panel.active { display:block; }\n.lb-stats { display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:0.85rem; }\n.lb-stat-box { background:rgba(160,120,48,0.07); border:1px solid rgba(160,120,48,0.13); border-radius:2px; padding:0.4rem 0.7rem; text-align:center; }\n.lb-stat-val { font-family:'Cinzel',serif; font-size:1.2rem; color:var(--VIO2); display:block; }\n.lb-stat-label { font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.lb-niveau { font-family:'Cinzel',serif; font-size:0.75rem; color:var(--GLD); padding:0.3rem 0.65rem; border:1px solid rgba(184,146,42,0.3); border-radius:1px; background:rgba(184,146,42,0.06); white-space:nowrap; }\n.lb-contact { border:1px solid rgba(160,120,48,0.13); border-radius:2px; margin-bottom:0.5rem; overflow:hidden; transition:border-color 0.2s; }\n.lb-contact:hover { border-color:rgba(160,120,48,0.3); }\n.lb-contact.actif { border-left:3px solid rgba(160,120,48,0.6); }\n.lb-contact.distant { border-left:3px solid rgba(74,90,122,0.5); }\n.lb-contact.grille { border-left:3px solid rgba(139,26,26,0.5); opacity:0.6; }\n.lb-contact-header { display:flex; align-items:center; gap:0.55rem; padding:0.5rem 0.7rem; cursor:pointer; background:rgba(160,120,48,0.04); flex-wrap:wrap; }\n.lb-contact-name { font-family:'Cinzel',serif; font-size:0.82rem; font-weight:600; color:var(--parchment); flex:1; min-width:80px; }\n.lb-contact-role { font-size:0.75rem; color:var(--SUB); font-style:italic; }\n.lb-fiab { display:flex; gap:3px; flex-shrink:0; }\n.lb-fiab-pip { width:11px; height:11px; border-radius:50%; border:1.5px solid rgba(160,120,48,0.3); background:transparent; cursor:pointer; transition:all 0.15s; }\n.lb-fiab-pip.on { background:rgba(160,120,48,0.65); border-color:var(--VIO2); }\n.lb-fiab-pip.on.high { background:rgba(184,146,42,0.85); border-color:var(--GLD); }\n.lb-statut-badge { font-size:0.57rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.08rem 0.32rem; border-radius:1px; border:1px solid; white-space:nowrap; cursor:pointer; transition:all 0.15s; }\n.lb-statut-badge.actif { border-color:rgba(160,120,48,0.45); color:var(--VIO2); background:rgba(160,120,48,0.07); }\n.lb-statut-badge.distant { border-color:rgba(74,90,122,0.4); color:#8aaccc; background:rgba(74,90,122,0.07); }\n.lb-statut-badge.grille { border-color:rgba(139,26,26,0.4); color:#c07070; background:rgba(139,26,26,0.06); }\n.lb-expand { font-size:0.62rem; color:var(--SUB); transition:transform 0.15s; flex-shrink:0; }\n.lb-contact.open .lb-expand { transform:rotate(180deg); }\n.lb-contact-body { display:none; padding:0.55rem 0.75rem; border-top:1px solid rgba(160,120,48,0.07); }\n.lb-contact.open .lb-contact-body { display:block; }\n.lb-contact-note { font-size:0.82rem; color:var(--parchment-dark); font-style:italic; margin-bottom:0.5rem; line-height:1.45; }\n.lb-log { list-style:none; margin-bottom:0.4rem; }\n.lb-log li { font-size:0.75rem; color:var(--SUB); padding:0.16rem 0; border-bottom:1px solid rgba(255,255,255,0.03); display:flex; gap:0.4rem; align-items:baseline; }\n.lb-log li:last-child { border-bottom:none; }\n.lb-log-date { color:rgba(160,120,48,0.55); font-family:'Cinzel',serif; font-size:0.6rem; white-space:nowrap; flex-shrink:0; }\n.lb-log-del { color:rgba(139,26,26,0.35); cursor:pointer; font-size:0.65rem; flex-shrink:0; transition:color 0.15s; margin-left:auto; }\n.lb-log-del:hover { color:#e08080; }\n.lb-log-input { display:none; flex-direction:column; gap:0.28rem; margin-bottom:0.4rem; }\n.lb-log-input.visible { display:flex; }\n.lb-log-input input { background:rgba(160,120,48,0.07); border:1px solid rgba(160,120,48,0.18); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.84rem; padding:0.22rem 0.4rem; border-radius:1px; width:100%; }\n.lb-log-input input:focus { outline:none; border-color:var(--VIO2); }\n.lb-contact-actions { display:flex; gap:0.32rem; flex-wrap:wrap; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.04); }\n.lb-btn { font-family:'Cinzel',serif; font-size:0.57rem; letter-spacing:0.08em; text-transform:uppercase; padding:0.2rem 0.42rem; border-radius:1px; cursor:pointer; transition:all 0.15s; }\n.lb-btn-log  { background:rgba(160,120,48,0.07); border:1px solid rgba(160,120,48,0.25); color:var(--VIO2); }\n.lb-btn-log:hover  { background:rgba(160,120,48,0.17); }\n.lb-btn-up   { background:rgba(184,146,42,0.07); border:1px solid rgba(184,146,42,0.22); color:var(--GLD); }\n.lb-btn-up:hover   { background:rgba(184,146,42,0.16); }\n.lb-btn-down { background:rgba(90,80,60,0.08); border:1px solid rgba(90,80,60,0.22); color:var(--SUB); }\n.lb-btn-down:hover { background:rgba(90,80,60,0.18); }\n.lb-btn-cycle { background:rgba(74,90,122,0.07); border:1px solid rgba(74,90,122,0.22); color:#8aaccc; }\n.lb-btn-cycle:hover { background:rgba(74,90,122,0.16); }\n.lb-btn-del  { background:transparent; border:1px solid rgba(139,26,26,0.14); color:rgba(192,112,112,0.5); }\n.lb-btn-del:hover  { background:rgba(139,26,26,0.1); color:#e08080; }\n.lb-df-cols { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }\n.lb-df-col-title { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.55rem; padding-bottom:0.35rem; border-bottom:1px solid rgba(255,255,255,0.06); }\n.lb-df-col-title.dette { color:#c07060; }\n.lb-df-col-title.faveur { color:#8ab870; }\n.lb-df-item { border:1px solid rgba(255,255,255,0.06); border-radius:2px; margin-bottom:0.4rem; overflow:hidden; transition:border-color 0.18s; }\n.lb-df-item.dette-item  { border-left:3px solid rgba(192,80,60,0.5); }\n.lb-df-item.faveur-item { border-left:3px solid rgba(94,160,80,0.5); }\n.lb-df-item.encaisse { opacity:0.45; }\n.lb-df-header { display:flex; align-items:center; gap:0.5rem; padding:0.45rem 0.65rem; cursor:pointer; flex-wrap:wrap; }\n.lb-df-titulaire { font-size:0.82rem; font-weight:600; color:var(--parchment); flex:1; }\n.lb-df-val-badge { font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.08rem 0.32rem; border-radius:1px; border:1px solid; white-space:nowrap; }\n.lb-df-val-badge.petite  { border-color:rgba(160,120,48,0.3); color:var(--VIO2); }\n.lb-df-val-badge.moyenne { border-color:rgba(184,146,42,0.4); color:var(--GLD); }\n.lb-df-val-badge.grande  { border-color:rgba(224,96,48,0.4); color:#e06030; }\n.lb-df-expand { font-size:0.6rem; color:var(--SUB); transition:transform 0.15s; }\n.lb-df-item.open .lb-df-expand { transform:rotate(180deg); }\n.lb-df-body { display:none; padding:0.45rem 0.65rem; border-top:1px solid rgba(255,255,255,0.04); font-size:0.8rem; color:var(--parchment-dark); font-style:italic; line-height:1.45; }\n.lb-df-item.open .lb-df-body { display:block; }\n.lb-df-encaisse-msg { font-size:0.7rem; color:#8ab870; margin-top:0.3rem; font-style:normal; }\n.lb-df-actions { display:flex; gap:0.32rem; margin-top:0.4rem; padding-top:0.35rem; border-top:1px solid rgba(255,255,255,0.04); flex-wrap:wrap; }\n.lb-rep-item { border:1px solid rgba(160,120,48,0.12); border-radius:2px; margin-bottom:0.5rem; overflow:hidden; transition:border-color 0.2s; }\n.lb-rep-item:hover { border-color:rgba(160,120,48,0.28); }\n.lb-rep-header { display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0.7rem; cursor:pointer; flex-wrap:wrap; }\n.lb-rep-zone { font-family:'Cinzel',serif; font-size:0.82rem; font-weight:600; color:var(--parchment); flex:1; min-width:80px; }\n.lb-rep-type-badge { font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.08rem 0.32rem; border-radius:1px; border:1px solid; white-space:nowrap; }\n.lb-rep-type-badge.crainte     { border-color:rgba(192,80,60,0.45);  color:#c07060; background:rgba(192,80,60,0.07); }\n.lb-rep-type-badge.respect     { border-color:rgba(160,120,48,0.45); color:var(--VIO2); background:rgba(160,120,48,0.07); }\n.lb-rep-type-badge.sympathie   { border-color:rgba(94,160,80,0.4);   color:#8ab870; background:rgba(94,160,80,0.06); }\n.lb-rep-type-badge.mefiance    { border-color:rgba(74,90,122,0.4);   color:#8aaccc; background:rgba(74,90,122,0.06); }\n.lb-rep-score { font-family:'Cinzel',serif; font-size:1.1rem; font-weight:700; flex-shrink:0; }\n.lb-rep-score.low  { color:#c07060; }\n.lb-rep-score.mid  { color:var(--VIO2); }\n.lb-rep-score.high { color:var(--GLD); }\n.lb-rep-bar-wrap { flex:2; min-width:80px; }\n.lb-rep-bar { height:6px; border-radius:3px; background:rgba(255,255,255,0.05); overflow:hidden; }\n.lb-rep-bar-fill { height:100%; border-radius:3px; transition:width 0.3s; }\n.lb-rep-bar-fill.low  { background:rgba(192,80,60,0.6); }\n.lb-rep-bar-fill.mid  { background:rgba(160,120,48,0.7); }\n.lb-rep-bar-fill.high { background:rgba(184,146,42,0.85); }\n.lb-rep-expand { font-size:0.62rem; color:var(--SUB); transition:transform 0.15s; flex-shrink:0; }\n.lb-rep-item.open .lb-rep-expand { transform:rotate(180deg); }\n.lb-rep-body { display:none; padding:0.55rem 0.75rem; border-top:1px solid rgba(160,120,48,0.07); }\n.lb-rep-item.open .lb-rep-body { display:block; }\n.lb-rep-effet { font-size:0.78rem; font-style:italic; color:var(--parchment-dark); margin-bottom:0.45rem; line-height:1.45; }\n.lb-rep-actions { display:flex; gap:0.35rem; flex-wrap:wrap; margin-top:0.35rem; padding-top:0.35rem; border-top:1px solid rgba(255,255,255,0.04); }\n.lb-rep-btn { font-family:'Cinzel',serif; font-size:0.57rem; letter-spacing:0.08em; text-transform:uppercase; padding:0.2rem 0.42rem; border-radius:1px; cursor:pointer; transition:all 0.15s; }\n.lb-rep-btn-up   { background:rgba(184,146,42,0.07); border:1px solid rgba(184,146,42,0.25); color:var(--GLD); }\n.lb-rep-btn-up:hover { background:rgba(184,146,42,0.17); }\n.lb-rep-btn-down { background:rgba(90,80,60,0.08); border:1px solid rgba(90,80,60,0.2); color:var(--SUB); }\n.lb-rep-btn-down:hover { background:rgba(90,80,60,0.18); }\n.lb-rep-btn-del  { background:transparent; border:1px solid rgba(139,26,26,0.14); color:rgba(192,112,112,0.5); }\n.lb-rep-btn-del:hover { background:rgba(139,26,26,0.1); color:#e08080; }\n.lb-appel-box { background:rgba(184,146,42,0.06); border:1px solid rgba(184,146,42,0.2); border-radius:2px; padding:0.75rem 0.85rem; margin-top:0.85rem; }\n.lb-appel-title { font-family:'Cinzel',serif; font-size:0.65rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--GLD); margin-bottom:0.45rem; }\n.lb-appel-used { font-size:0.75rem; color:#c07070; font-style:italic; padding:0.3rem 0; }\n.lb-appel-form input, .lb-appel-form textarea, .lb-appel-form select { background:rgba(184,146,42,0.07); border:1px solid rgba(184,146,42,0.18); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.85rem; padding:0.25rem 0.42rem; border-radius:1px; width:100%; margin-bottom:0.35rem; }\n.lb-appel-form input:focus, .lb-appel-form textarea:focus, .lb-appel-form select:focus { outline:none; border-color:var(--VIO2); }\n.lb-appel-form textarea { resize:vertical; min-height:50px; }\n.lb-appel-log { list-style:none; margin-top:0.5rem; }\n.lb-appel-log li { font-size:0.78rem; color:var(--parchment-dark); padding:0.3rem 0; border-bottom:1px solid rgba(255,255,255,0.04); display:flex; gap:0.5rem; align-items:baseline; }\n.lb-appel-log li:last-child { border-bottom:none; }\n.lb-appel-log-sess { font-family:'Cinzel',serif; font-size:0.6rem; color:rgba(184,146,42,0.6); white-space:nowrap; flex-shrink:0; }\n.lb-appel-log-del { color:rgba(139,26,26,0.35); cursor:pointer; font-size:0.65rem; flex-shrink:0; transition:color 0.15s; margin-left:auto; }\n.lb-appel-log-del:hover { color:#e08080; }\n.lb-form { display:none; margin-top:0.5rem; background:rgba(160,120,48,0.05); border:1px solid rgba(160,120,48,0.17); border-radius:2px; padding:0.65rem; flex-direction:column; gap:0.38rem; }\n.lb-form.visible { display:flex; }\n.lb-form input, .lb-form textarea, .lb-form select { background:rgba(160,120,48,0.07); border:1px solid rgba(160,120,48,0.2); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.86rem; padding:0.26rem 0.42rem; border-radius:1px; width:100%; }\n.lb-form input:focus, .lb-form textarea:focus, .lb-form select:focus { outline:none; border-color:var(--VIO2); }\n.lb-form textarea { resize:vertical; min-height:52px; }\n.lb-form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.38rem; }\n.lb-form-label { font-size:0.57rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--VIO2); opacity:0.8; display:block; margin-bottom:0.1rem; }\n.lb-form-actions { display:flex; gap:0.4rem; margin-top:0.1rem; }\n/* Règles reprises de reiner.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n.btn-add-vio { background:rgba(160,120,48,0.1); border:1px solid rgba(160,120,48,0.4); color:var(--VIO2); }\n.btn-add-vio:hover { background:rgba(160,120,48,0.22); }\n",
    html: "<div class=\"lb-card\">\n    <div class=\"card-title vio\" style=\"margin-bottom:0.5rem;\">Le Livre de Bord\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">mecanique exclusive : Reiner Hauer</span>\n    </div>\n    <div style=\"font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.8rem;line-height:1.55;\">\n      Ce reseau se construit contact par contact, session apres session. Il grandit, il se tasse, il se fissure. Une fois par session, Reiner peut lancer un <strong style=\"color:var(--GLD);\">Appel a la Reputation</strong> pour convertir ce capital en quelque chose de concret.\n    </div>\n\n    <!-- STATS GLOBALES -->\n    <div class=\"lb-stats\">\n      <div class=\"lb-stat-box\"><span class=\"lb-stat-val\" id=\"lb-nb-contacts\">0</span><span class=\"lb-stat-label\">Contacts</span></div>\n      <div class=\"lb-stat-box\"><span class=\"lb-stat-val\" id=\"lb-nb-faveurs\">0</span><span class=\"lb-stat-label\">Faveurs</span></div>\n      <div class=\"lb-stat-box\"><span class=\"lb-stat-val\" id=\"lb-nb-dettes\">0</span><span class=\"lb-stat-label\">Dettes</span></div>\n      <div class=\"lb-stat-box\"><span class=\"lb-stat-val\" id=\"lb-nb-zones\">0</span><span class=\"lb-stat-label\">Zones</span></div>\n      <div style=\"display:flex;align-items:center;margin-left:auto;\"><span class=\"lb-niveau\" id=\"lb-niveau\">Debutant</span></div>\n    </div>\n\n    <!-- TABS -->\n    <div class=\"lb-tabs\">\n      <button class=\"lb-tab active\" onclick=\"lbTab('noms')\">Noms &amp; Roles</button>\n      <button class=\"lb-tab\" id=\"lb-tab-df\" onclick=\"lbTab('df')\">Dettes &amp; Faveurs</button>\n      <button class=\"lb-tab\" id=\"lb-tab-rep\" onclick=\"lbTab('rep')\">Reputation par zone</button>\n    </div>\n\n    <!-- PANEL NOMS -->\n    <div class=\"lb-panel active\" id=\"lb-panel-noms\">\n      <div id=\"lb-contacts-list\"></div>\n      <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.4rem;\" onclick=\"lbToggleForm('lb-form-contact')\">+ Nouveau contact</button>\n      <div class=\"lb-form\" id=\"lb-form-contact\">\n        <div>\n          <span class=\"lb-form-label\">Nom</span>\n          <input id=\"lb-c-name\" placeholder=\"Nom ou alias\" />\n        </div>\n        <div class=\"lb-form-row\">\n          <div>\n            <span class=\"lb-form-label\">Role</span>\n            <input id=\"lb-c-role\" placeholder=\"Passeur, informateur, garde...\" />\n          </div>\n          <div>\n            <span class=\"lb-form-label\">Statut initial</span>\n            <select id=\"lb-c-statut\">\n              <option value=\"actif\">Actif</option>\n              <option value=\"distant\">Distant</option>\n            </select>\n          </div>\n        </div>\n        <div>\n          <span class=\"lb-form-label\">Note initiale</span>\n          <textarea id=\"lb-c-note\" placeholder=\"Ce que Reiner sait de lui, comment ils se sont rencontres...\"></textarea>\n        </div>\n        <div class=\"lb-form-actions\">\n          <button class=\"btn-add btn-add-vio\" onclick=\"lbAddContact()\">Ajouter</button>\n          <button class=\"btn-cancel\" onclick=\"lbToggleForm('lb-form-contact')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n\n    <!-- PANEL DETTES & FAVEURS -->\n    <div class=\"lb-panel\" id=\"lb-panel-df\">\n      <div class=\"lb-df-cols\">\n        <div>\n          <div class=\"lb-df-col-title dette\">Ce que Reiner doit</div>\n          <div id=\"lb-dettes-list\"></div>\n          <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.4rem;font-size:0.58rem;\" onclick=\"lbToggleForm('lb-form-dette')\">+ Ajouter une dette</button>\n          <div class=\"lb-form\" id=\"lb-form-dette\">\n            <div><span class=\"lb-form-label\">Titulaire (a qui Reiner doit)</span><input id=\"lb-d-tit\" placeholder=\"Nom\" /></div>\n            <div class=\"lb-form-row\">\n              <div><span class=\"lb-form-label\">Valeur</span>\n                <select id=\"lb-d-val\">\n                  <option value=\"petite\">Petite</option>\n                  <option value=\"moyenne\">Moyenne</option>\n                  <option value=\"grande\">Grande</option>\n                </select>\n              </div>\n            </div>\n            <div><span class=\"lb-form-label\">Description</span><textarea id=\"lb-d-desc\" placeholder=\"Ce qui est du, les circonstances...\"></textarea></div>\n            <div class=\"lb-form-actions\">\n              <button class=\"btn-add btn-add-vio\" onclick=\"lbAddDette()\">Ajouter</button>\n              <button class=\"btn-cancel\" onclick=\"lbToggleForm('lb-form-dette')\">Annuler</button>\n            </div>\n          </div>\n        </div>\n        <div>\n          <div class=\"lb-df-col-title faveur\">Ce qu'on doit a Reiner</div>\n          <div id=\"lb-faveurs-list\"></div>\n          <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.4rem;font-size:0.58rem;\" onclick=\"lbToggleForm('lb-form-faveur')\">+ Ajouter une faveur</button>\n          <div class=\"lb-form\" id=\"lb-form-faveur\">\n            <div><span class=\"lb-form-label\">Debiteur (qui doit a Reiner)</span><input id=\"lb-f-tit\" placeholder=\"Nom\" /></div>\n            <div class=\"lb-form-row\">\n              <div><span class=\"lb-form-label\">Valeur</span>\n                <select id=\"lb-f-val\">\n                  <option value=\"petite\">Petite</option>\n                  <option value=\"moyenne\">Moyenne</option>\n                  <option value=\"grande\">Grande</option>\n                </select>\n              </div>\n            </div>\n            <div><span class=\"lb-form-label\">Description</span><textarea id=\"lb-f-desc\" placeholder=\"Ce qui est du, les circonstances...\"></textarea></div>\n            <div class=\"lb-form-actions\">\n              <button class=\"btn-add btn-add-vio\" onclick=\"lbAddFaveur()\">Ajouter</button>\n              <button class=\"btn-cancel\" onclick=\"lbToggleForm('lb-form-faveur')\">Annuler</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- PANEL REPUTATION -->\n    <div class=\"lb-panel\" id=\"lb-panel-rep\">\n      <div id=\"lb-rep-list\"></div>\n      <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.4rem;\" onclick=\"lbToggleForm('lb-form-rep')\">+ Nouvelle zone</button>\n      <div class=\"lb-form\" id=\"lb-form-rep\">\n        <div><span class=\"lb-form-label\">Zone (lieu, groupe, communaute)</span><input id=\"lb-r-zone\" placeholder=\"Ex: Hochsleben, Marchands d'Averheim...\" /></div>\n        <div class=\"lb-form-row\">\n          <div><span class=\"lb-form-label\">Type de reputation</span>\n            <select id=\"lb-r-type\">\n              <option value=\"respect\">Respect</option>\n              <option value=\"sympathie\">Sympathie</option>\n              <option value=\"crainte\">Crainte</option>\n              <option value=\"mefiance\">Mefiance</option>\n            </select>\n          </div>\n          <div><span class=\"lb-form-label\">Score initial (0-10)</span><input id=\"lb-r-score\" type=\"number\" min=\"0\" max=\"10\" value=\"1\" /></div>\n        </div>\n        <div><span class=\"lb-form-label\">Note contextuelle</span><textarea id=\"lb-r-note\" placeholder=\"Pourquoi cette reputation, comment elle s'est construite...\"></textarea></div>\n        <div class=\"lb-form-actions\">\n          <button class=\"btn-add btn-add-vio\" onclick=\"lbAddRep()\">Ajouter</button>\n          <button class=\"btn-cancel\" onclick=\"lbToggleForm('lb-form-rep')\">Annuler</button>\n        </div>\n      </div>\n\n      <!-- APPEL A LA REPUTATION -->\n      <div class=\"lb-appel-box\">\n        <div class=\"lb-appel-title\">Appel a la Reputation — 1 fois par session</div>\n        <div id=\"lb-appel-content\"></div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { lbLoad(); }
  });
})();
