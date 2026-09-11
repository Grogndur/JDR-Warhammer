/* Aucune modification du texte, des profils, des médias ou des sauvegardes.
   Les accès contextuels restent hors de .main, le contenu éditable du scénario. */
(() => {
 'use strict';
 const assetRoot = new URL('.', document.currentScript.src);
 function init(){
  const main = document.querySelector('.main'); if(!main) return;
  document.querySelectorAll('.livre-ui').forEach(el=>el.remove());
  document.body.classList.add('livre-mj');
  const mode=document.createElement('span'); mode.className='livre-ui livre-mode';
  mode.setAttribute('aria-live','polite');
  document.getElementById('btn-edit')?.before(mode);
  const aside=document.createElement('aside');aside.className='livre-ui livre-context';
  aside.setAttribute('aria-label','Repères de la scène');document.body.append(aside);
  const style=document.createElement('style');style.className='livre-ui';document.head.append(style);
  const sceneHero = new Map([['P5_sc5','rat-noye.png'],['P5_sc6','rat-noye.png']]);
  // Affectation purement graphique, séparée des illustrations de jeu associées.
  if(location.pathname.includes('/bds/')) for(const [id,file] of sceneHero){
   style.sheet.insertRule(`.livre-mj #${id} .scene-title-bar {background-image:linear-gradient(0deg,#0d110cf5,#0d110c45 75%),url("${new URL(file,assetRoot).href}")}`);
  }
  function icon(n){const el=document.createElement('span');el.className='livre-icon';el.setAttribute('aria-hidden','true');el.style.setProperty('--ix',`${n%4*100/3}%`);el.style.setProperty('--iy',`${Math.floor(n/4)*100/3}%`);return el;}
  function heading(text,n){const h=document.createElement('h3');h.append(icon(n),text);aside.append(h);}
  function jump(node,label){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>node.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));aside.append(b);return b;}
  let frame=0;
  function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(render);}
  function render(){
   const welcome=document.querySelector('.welcome');
   if(welcome&&!welcome.querySelector('.welcome-accroche')){
    const phrase=document.createElement('div');phrase.className='welcome-accroche';
    phrase.textContent=location.pathname.includes('/bds/')?"Les vastes étendues d’Averland ne sont peut-être pas si paisibles finalement…":"En Sylvanie, la lune vous éclairera davantage que le soleil.";
    const divider=welcome.querySelector('.welcome-divider');
    if(divider)divider.before(phrase);
   }
   const editing=document.body.classList.contains('editing');
   mode.textContent=editing?'Édition':'En séance';
   if(editing){aside.replaceChildren();return;}
   const panel=[...main.querySelectorAll('.scene-panel')].find(p=>p.getClientRects().length);
   document.body.classList.toggle('livre-accueil',!panel);
   aside.replaceChildren();if(!panel)return;
   const title=document.createElement('h2');title.textContent='Dans cette scène';aside.append(title);
   const profiles=[...panel.querySelectorAll('.stat-name,.sr-nom')];
   if(profiles.length){heading('Personnages & profils',4);for(const node of profiles){jump(node,node.textContent.trim());}}
   const notes=[...panel.querySelectorAll('.mj-box')];
   if(notes.length){heading('Repères du meneur',12);for(const [i,node] of notes.entries()){
     const clean=text=>text.replace(/\s+/g,' ').trim();
     const name=clean(node.querySelector('.mj-label')?.textContent||'MJ');
     const detail=clean(node.querySelector('.mj-text strong')?.textContent || node.querySelector('.mj-text')?.textContent || '');
     // Extrait du contenu réel : aucun titre de scène ni renseignement inventé.
     const short=detail.length>95?detail.slice(0,92).replace(/\s+\S*$/,'')+'…':detail;
     const b=jump(node,'');
     const type=document.createElement('span');type.className='livre-repere-type';type.textContent=name;
     const text=document.createElement('span');text.className='livre-repere-detail';text.textContent=short||`Rappel ${i+1}`;
     b.append(type,text);b.title=detail;
   }}
   const mediaButton=panel.querySelector('.btn-illu');
   if(mediaButton){
    heading('Illustrations',8);
    const b=document.createElement('button');b.type='button';b.className='livre-media';
    if(location.pathname.includes('/bds/') && sceneHero.has(panel.id)){
     const img=document.createElement('img');img.src=new URL('rat-noye.png',assetRoot).href;img.alt='';b.append(img);
    }
    const label=document.createElement('span');label.textContent='Voir les illustrations associées';b.append(label);
    b.addEventListener('click',()=>{mediaButton.click();panel.querySelector('.illu-zone')?.scrollIntoView({block:'nearest'});});aside.append(b);
   }
   const sections=[...panel.querySelectorAll('.section-head')];
   if(sections.length){heading('Dans cette page',6);for(const node of sections)jump(node,node.textContent.trim());}
   if(!profiles.length&&!notes.length&&!sections.length&&!mediaButton){const p=document.createElement('p');p.className='livre-note';p.textContent='Les détails de cette scène sont dans le texte.';aside.append(p);}
  }
  new MutationObserver(schedule).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class']});
  let previousEditing=document.body.classList.contains('editing');
  new MutationObserver(()=>{const editing=document.body.classList.contains('editing');if(editing!==previousEditing){previousEditing=editing;schedule();}}).observe(document.body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',schedule);schedule();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

