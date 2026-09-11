/* Décor de marge uniquement : aucune donnée de jeu écrite. */
(() => {
 'use strict';
 const root=document.documentElement;
 const assetRoot=new URL('.',document.currentScript.src);
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function themeFor(career){
  const s=normalize(career);
  if(/sorcier|sorciere|mage|magicien|pretre|pretresse|clerc|scribe|erudit|apothicaire|medecin|avocat|etudiant|ingenieur|savant|alchimiste/.test(s))return 'scribe';
  if(/emissaire|heraut|enquet|investig|espion|voleur|voleuse|eclaireur|eclaireuse|rodeur|rodeuse|chasseur|chasseuse|agent|diplomat|messager|repurgateur/.test(s))return 'enqueteur';
  return 'campagne';
 }
 let decor;
 function update(){
  if(!root.classList.contains('fiche-wymond')){decor?.remove();decor=null;return;}
  if(!document.body)return;
  if(!decor){
   decor=document.createElement('div');decor.className='bureau-marges';decor.setAttribute('aria-hidden','true');
   for(const side of ['gauche','droite']){const el=document.createElement('div');el.className='bureau-'+side;decor.append(el);}
   document.body.append(decor);
  }
  const career=['career-carriere','career-echelon'].map(id=>document.getElementById(id)?.value||'').join(' ');
  const theme=themeFor(career);
  if(decor.dataset.theme!==theme){decor.dataset.theme=theme;decor.style.setProperty('--bureau-image',`url("${new URL('bureau-'+theme+'.jpg',assetRoot).href}")`);}
 }
 document.addEventListener('fiche-carriere-affichee',update);
 document.addEventListener('change',event=>{if(['career-carriere','career-echelon'].includes(event.target.id))update();});
 new MutationObserver(update).observe(root,{attributes:true,attributeFilter:['class']});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',update,{once:true});else update();
})();
