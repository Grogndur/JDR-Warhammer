/* Effets visuels et pictogrammes : aucune modification des valeurs de jeu. */
(() => {
 'use strict';
 const ouverts=new Set();
 function ajuster(parent,key,nodes){
  const detail=document.createElement('details');detail.className='pj-ajuster';detail.dataset.cle=key;
  detail.open=ouverts.has(key);
  const summary=document.createElement('summary');summary.textContent='Ajuster';
  const body=document.createElement('div');body.className='pj-ajuster-champs';
  body.append(...nodes);detail.append(summary,body);parent.append(detail);
  detail.addEventListener('toggle',()=>{if(detail.open)ouverts.add(key);else ouverts.delete(key)});
  return detail;
 }
 function arrangerEditions(){
  if(!document.documentElement.classList.contains('fiche-wymond'))return;
  document.querySelectorAll('#skills-base-list .skill-total,#skills-adv-list .skill-total').forEach(total=>{
   const row=total.parentElement;if(row.querySelector(':scope > .pj-ajuster'))return;
   const nodes=[...row.children].filter(n=>n.matches('.skill-field,.del-btn')||(n.tagName==='DIV'&&n.querySelector('.xp-badge')));
   if(row.classList.contains('skill-row')){
    const next=row.nextElementSibling;
    if(next&&!next.classList.contains('skill-sub')&&next.querySelector('.xp-badge'))nodes.push(next);
   }
   if(total.id.startsWith('sk-adv-')){
    const name=row.querySelector(':scope > .skill-name');
    if(name){const label=document.createElement('span');label.className='skill-name-lecture';label.innerHTML=name.innerHTML;name.before(label);nodes.unshift(name);}
   }
   if(nodes.length)ajuster(row,total.id,nodes);
  });
  document.querySelectorAll('.talent-list li').forEach((li,index)=>{
   if(!li.querySelector(':scope > .pj-ajuster')){
    const content=li.querySelector('.talent-content'),del=li.querySelector('.del-btn');
    if(!content)return;
    const reading=document.createElement('div');reading.className='talent-lecture';
    const name=document.createElement('span');name.className='talent-name-lecture';
    const desc=document.createElement('span');desc.className='talent-desc-lecture';reading.append(name,desc);li.prepend(reading);
    ajuster(li,'talent-'+index,[content,...(del?[del]:[])]);
   }
   for(const part of ['name','desc']){
    const source=li.querySelector('.talent-'+part),target=li.querySelector('.talent-'+part+'-lecture');
    if(source&&target&&source.textContent!==target.textContent)target.textContent=source.textContent;
   }
  });
 }
 let editionsObservees=false;
 function install(){
  if(!document.documentElement.classList.contains('fiche-wymond'))return;
  const armor=document.getElementById('armor-pieces-list')?.closest('.card');
  if(armor)for(const title of armor.querySelectorAll('.card-title')){
   const text=title.textContent.toLowerCase();
   const type=text.includes('localisation')?'pantin':text.includes('armure')?'plastron':null;
   if(!type||title.querySelector('.icone-protection'))continue;
   title.querySelector('.fiche-icone')?.remove();
   const icon=document.createElement('span');icon.className='fiche-icone icone-protection '+type;
   icon.setAttribute('aria-hidden','true');title.prepend(icon);
  }
  const suite=document.getElementById('fiche-talents-suite');
  if(suite&&!suite.dataset.pret){
   suite.dataset.pret='true';
   if(typeof window.renderTalents==='function')window.renderTalents();
  }
  if(!editionsObservees){
   editionsObservees=true;
   const observer=new MutationObserver(arrangerEditions);
   for(const id of ['skills-base-list','skills-adv-list','talent-list','talent-list-suite']){
    const list=document.getElementById(id);if(list)observer.observe(list,{childList:true,subtree:true,characterData:true});
   }
  }
  arrangerEditions();
 }
 document.addEventListener('click',e=>{
  const number=e.target.closest?.('.stat-total,.skill-total');
  if(!number||!number.closest('.jet-actif')||!document.documentElement.classList.contains('fiche-wymond'))return;
  number.classList.remove('jet-eclat');void number.offsetWidth;number.classList.add('jet-eclat');
 },true);
 document.addEventListener('animationend',e=>{if(e.animationName==='pj-jet-eclair')e.target.classList.remove('jet-eclat');});
 new MutationObserver(install).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
