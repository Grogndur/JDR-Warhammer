/* Identification locale du portrait affiché : aucune écriture dans la fiche. */
(() => {
 'use strict';
 const rootURL=new URL('portraits-valides/',document.currentScript.src);
 const files=['elayla.png','voth.jpg','aquila.png','shippendel.png','sayanel.png','karl.png','wymond.png','gaston.png','eliane.png'];
 const references=new Map();
 function sample(img){
  const canvas=document.createElement('canvas');canvas.width=24;canvas.height=24;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  ctx.drawImage(img,0,0,24,24);return ctx.getImageData(0,0,24,24).data;
 }
 function difference(a,b){let sum=0;for(let i=0;i<a.length;i+=4)for(let c=0;c<3;c++)sum+=Math.abs(a[i+c]-b[i+c]);return sum/(a.length/4*3);}
 function reference(file){
  if(!references.has(file))references.set(file,new Promise(resolve=>{
   const ref=new Image();
   ref.onload=()=>{try{resolve({file,ratio:ref.naturalWidth/ref.naturalHeight,pixels:sample(ref)})}catch{resolve(null)}};
   ref.onerror=()=>resolve(null);ref.src=new URL(file,rootURL).href;
  }));
  return references.get(file);
 }
 function init(){
  const img=document.getElementById('portrait-img');if(!img)return;
  let generation=0,lastSource='';
  async function update(){
   const src=img.currentSrc||img.getAttribute('src')||'';
   if(!src||!img.complete||!img.naturalWidth){generation++;img.removeAttribute('data-portrait-protege');lastSource='';return;}
   if(lastSource===src)return;
   lastSource=src;const token=++generation;
   img.removeAttribute('data-portrait-protege');
   try{
    const pixels=sample(img),ratio=img.naturalWidth/img.naturalHeight;
    const refs=await Promise.all(files.map(reference));
    if(token!==generation)return;
    let best=null,score=12;
    for(const ref of refs){
     if(!ref||Math.abs(ref.ratio-ratio)>.025)continue;
     const d=difference(pixels,ref.pixels);if(d<score){score=d;best=ref;}
    }
    if(best){
     const slug=best.file.replace(/\.[^.]+$/,'');
     img.style.setProperty('--portrait-masque',`url("${new URL(slug+'-masque.svg',rootURL).href}")`);
     img.dataset.portraitProtege=slug;
    }
   }catch{lastSource='';/* Une image externe non lisible conserve son affichage normal. */}
  }
  img.addEventListener('load',update);
  new MutationObserver(()=>{lastSource='';update()}).observe(img,{attributes:true,attributeFilter:['src']});
  update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
