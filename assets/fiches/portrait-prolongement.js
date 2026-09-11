/* Prolongement du fond latéral uniquement, sans modification de la photo sauvegardée. */
(() => {
 'use strict';
 function init(){
  const img=document.getElementById('portrait-img');
  const header=img?.closest('.perso-header');
  if(!img||!header)return;
  const extension=document.createElement('div');
  extension.className='portrait-prolongement';extension.setAttribute('aria-hidden','true');
  header.prepend(extension);
  let frame;
  function update(){
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const shown=document.documentElement.classList.contains('fiche-wymond')&&img.complete&&img.naturalWidth>0&&img.getAttribute('src')&&img.getBoundingClientRect().width>0;
    extension.hidden=!shown;
    if(!shown)return;
    const b=img.getBoundingClientRect(),h=header.getBoundingClientRect();
    const width=Math.min(320,Math.max(150,h.width*.28));
    extension.style.left=`${b.left-h.left-header.clientLeft-width}px`;
    extension.style.top=`${b.top-h.top-header.clientTop}px`;
    extension.style.width=`${width+10}px`;
    extension.style.height=`${b.height}px`;
    extension.style.backgroundImage=`url(${JSON.stringify(img.currentSrc||img.src)})`;
   });
  }
  img.addEventListener('load',update);img.addEventListener('error',()=>{extension.hidden=true});
  new MutationObserver(update).observe(img,{attributes:true,attributeFilter:['src','style']});
  new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  if(typeof ResizeObserver!=='undefined'){const ro=new ResizeObserver(update);ro.observe(img);ro.observe(header);}
  window.addEventListener('resize',update);update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
