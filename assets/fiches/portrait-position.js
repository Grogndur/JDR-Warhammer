/* Présentation du portrait ; utilise le mode MJ et la sauvegarde de la fiche. */
(() => {
 'use strict';
 const img=document.getElementById('portrait-img'), frame=document.getElementById('portrait-frame');
 if(!img||!frame)return;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const norm=p=>({x:clamp(Number.isFinite(p?.x)?p.x:50,0,100),y:clamp(Number.isFinite(p?.y)?p.y:20,0,100),zoom:clamp(Number.isFinite(p?.zoom)?p.zoom:1,1,2)});
 const mj=()=>typeof ACCES!=='undefined'&&ACCES.mj();
 const themed=()=>!!frame.closest('.fiche-wymond');
 let draft=null,drag=null,source='',metrics=null;
 const layer=document.createElement('div');layer.className='portrait-pan';layer.setAttribute('aria-hidden','true');frame.append(layer);
 const button=document.createElement('button');button.type='button';button.id='portrait-modifier';button.textContent='Modifier';button.hidden=true;
 document.getElementById('portrait-remove').before(button);
 const panel=document.createElement('div');panel.id='portrait-position-outils';panel.hidden=true;
 panel.innerHTML='<div>Glisse le portrait pour placer le visage.</div><label>Horizontal <input type="range" data-axis="x" min="0" max="100" step="1"></label><label>Vertical <input type="range" data-axis="y" min="0" max="100" step="1"></label><label>Zoom <input type="range" data-axis="zoom" min="1" max="2" step="0.01"></label><div class="position-actions"><button type="button" data-action="save">Valider</button><button type="button" data-action="cancel">Annuler</button></div>';
 frame.parentElement.append(panel);
 function close(){draft=null;drag=null;panel.hidden=true;frame.classList.remove('portrait-en-edition');button.setAttribute('aria-expanded','false');paint();}
 function paint(){
  button.hidden=!mj()||!themed();button.disabled=!state.portrait;
  if(draft&&(!mj()||source!==state.portrait)){draft=null;drag=null;panel.hidden=true;frame.classList.remove('portrait-en-edition');}
  source=state.portrait||'';
  const enabled=themed()&&!!source&&img.complete&&img.naturalWidth>0;
  frame.classList.toggle('portrait-position-actif',enabled);layer.hidden=!enabled;
  if(!enabled)return;
  const p=draft||norm(state.portraitPosition),cs=getComputedStyle(img);
  const left=parseFloat(cs.paddingLeft)||0,top=parseFloat(cs.paddingTop)||0;
  const cw=img.clientWidth-left-(parseFloat(cs.paddingRight)||0),ch=img.clientHeight-top-(parseFloat(cs.paddingBottom)||0);
  if(cw<=0||ch<=0)return;
  const scale=Math.max(cw/img.naturalWidth,ch/img.naturalHeight)*p.zoom;
  const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
  metrics={dx:cw-w,dy:ch-h};
  layer.style.backgroundImage='url('+JSON.stringify(img.currentSrc||img.src)+')';
  layer.style.backgroundSize=w+'px '+h+'px';
  layer.style.backgroundPosition=(left+metrics.dx*p.x/100)+'px '+(top+metrics.dy*p.y/100)+'px';
  panel.querySelectorAll('[data-axis]').forEach(el=>{el.value=p[el.dataset.axis];});
 }
 button.addEventListener('click',()=>{
  if(!mj()||!state.portrait||!themed())return;
  if(draft){close();return;}
  draft=norm(state.portraitPosition);source=state.portrait;panel.hidden=false;
  frame.classList.add('portrait-en-edition');button.setAttribute('aria-expanded','true');paint();
 });
 panel.addEventListener('input',e=>{if(!draft||!mj()||!e.target.dataset.axis)return;draft[e.target.dataset.axis]=Number(e.target.value);paint();});
 panel.addEventListener('click',e=>{
  const action=e.target.dataset.action;if(!action)return;
  if(action==='save'&&draft&&mj()&&source===state.portrait){state.portraitPosition=norm(draft);save();}
  close();
 });
 frame.addEventListener('pointerdown',e=>{
  if(!draft||!mj()||!metrics||e.button!==0)return;
  e.preventDefault();frame.setPointerCapture(e.pointerId);
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:{...draft},...metrics};
 });
 frame.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id||!draft)return;
  if(!mj()){close();return;}
  if(Math.abs(drag.dx)>.5)draft.x=clamp(drag.start.x+(e.clientX-drag.x)*100/drag.dx,0,100);
  if(Math.abs(drag.dy)>.5)draft.y=clamp(drag.start.y+(e.clientY-drag.y)*100/drag.dy,0,100);
  paint();
 });
 for(const event of ['pointerup','pointercancel','lostpointercapture'])frame.addEventListener(event,()=>{drag=null;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&draft){close();button.focus();}});
 document.addEventListener('portrait-render',()=>{if(draft)close();else paint();});
 img.addEventListener('load',paint);
 document.getElementById('btn-mj')?.addEventListener('click',()=>{if(!mj())close();paint();});
 window.addEventListener('storage',paint);window.addEventListener('focus',paint);
 new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 new MutationObserver(paint).observe(document.body,{attributes:true,attributeFilter:['class']});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(paint).observe(frame);
 else window.addEventListener('resize',paint);
 button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded','false');paint();
})();
