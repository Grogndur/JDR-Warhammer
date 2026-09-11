/* Présentation locale. Les seules mutations passent par les commandes MJ existantes. */
(() => {
  'use strict';
  const weather = ['Clair','Voilé','Couvert','Vent','Pluie','Grêle','Orage','Tempête','Brume','Neige'];
  const phases = ['Aube','Jour','Jour','Jour','Jour','Crépuscule','Crépuscule','Nuit','Nuit','Nuit','Nuit','Nuit'];
  const isGM = () => document.body.classList.contains('est-mj');
  function node(tag, cls, text) {
    const e = document.createElement(tag); if(cls) e.className=cls;
    if(text) e.textContent=text; return e;
  }
  function motif(i, cls='') {
    const e=node('span','obs-medaille '+cls); e.setAttribute('aria-hidden','true');
    e.style.setProperty('--obs-x',`${i%6*20}%`);
    e.style.setProperty('--obs-y',`${Math.floor(i/6)*244/768*100}%`); return e;
  }
  function init() {
    const header=document.querySelector('#app > header') || document.querySelector('header');
    if(!header || document.getElementById('observatoire')) return;
    const nav=node('nav','obs-commandes'); nav.setAttribute('aria-label','Heure et météo');
    const panel=node('section','obs-panneau'); panel.id='observatoire'; panel.hidden=true;
    panel.setAttribute('aria-label','L’Observatoire');
    const heading=node('div','obs-entete'); heading.append(node('h2','','L’Observatoire'));
    const close=node('button','obs-fermer','×');close.type='button';close.setAttribute('aria-label','Fermer l’Observatoire');
    heading.append(close);panel.append(heading);
    const status=node('p','obs-statut');panel.append(status);
    const groups=[];
    const artboard=node('div','obs-artboard');
    const canvas=node('div','obs-canvas');artboard.append(canvas);
    function layout(){panel.dataset.view=groups.filter(g=>!g.content.hidden).map(g=>g.kind).join('-')||'cycle';}
    function section(kind,title,labels,start,method) {
      const trigger=node('button','obs-ouvrir');trigger.type='button';trigger.id='obs-ouvrir-'+kind;
      const picture=motif(kind==='cycle'?22:12);const label=node('span');
      const small=node('small','',title);const current=node('strong');label.append(small,current);
      trigger.append(picture,label,node('span','obs-chevron','⌄'));
      const content=node('section','obs-section obs-'+kind); content.id='obs-'+kind;content.hidden=true;
      trigger.setAttribute('aria-controls',content.id);trigger.setAttribute('aria-expanded','false');
      const name=node('h3','',title);content.append(name);
      const rail=node('div','obs-choix');rail.setAttribute('role','group');rail.setAttribute('aria-label',title);
      const buttons=labels.map((text,i)=>{
        const b=node('button','obs-option');b.type='button';b.dataset.value=String(i);
        b.append(motif(start+i),node('span','obs-legende',kind==='cycle'?`${i+1}`:text));
        b.setAttribute('aria-label',kind==='cycle'?`${text}, cran ${i+1} sur 12`:text);
        b.addEventListener('click',()=>{
          if(!isGM() || b.disabled || typeof window[method]!=='function') return;
          window[method](i);sync();
        });rail.append(b);return b;
      });
      if(kind==='cycle'){
        const arc=node('div','obs-arc');arc.append(motif(22,'obs-astre'),rail,motif(23,'obs-astre'));content.append(arc);
        const captions=node('div','obs-phases');
        for(const [text,span] of [['Aube',1],['Jour',4],['Crépuscule',2],['Nuit',5]]){const c=node('span','',text);c.style.gridColumn=`span ${span}`;captions.append(c)}
        content.append(captions);
      }else content.append(rail);
      const group={trigger,content,current,picture,buttons,kind};groups.push(group);
      trigger.addEventListener('click',()=>{
        content.hidden=!content.hidden;trigger.setAttribute('aria-expanded',String(!content.hidden));
        panel.hidden=groups.every(g=>g.content.hidden);layout();
      });nav.append(trigger);panel.append(content);return group;
    }
    section('cycle','Cycle jour / nuit',phases,0,'jaugeHeure');
    section('meteo','Météo',weather,12,'meteoTable');
    for(const g of groups)canvas.append(g.content);
    panel.append(artboard);layout();
    const tx=[460,562,665,768,871,974,1078,1182,1286,1389,1492,1595];
    const ty=[227,211,199,190,184,182,184,189,198,206,217,230];
    const wx=[270,433,598,762,927,1092,1257,1422,1587,1752];
    for(const g of groups)g.buttons.forEach((b,i)=>{
      const time=g.kind==='cycle',size=time?100:164;
      b.style.setProperty('--left',`${((time?tx[i]:wx[i])-size/2)/2048*100}%`);
      b.style.setProperty('--top',`${((time?ty[i]:503)-size/2)/683*100}%`);
      b.style.setProperty('--size',`${size/2048*100}%`);
    });
    function shut(restore=false){
      const active=groups.find(g=>!g.content.hidden);
      for(const g of groups){g.content.hidden=true;g.trigger.setAttribute('aria-expanded','false')}
      panel.hidden=true;if(restore && active)active.trigger.focus();
    }
    close.addEventListener('click',()=>shut(true));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)shut(true)});
    document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!nav.contains(e.target))shut()});
    function sync(){
      const gm=isGM();status.textContent=gm?'Réglez l’heure et le temps partagés avec la table.':'Heure et météo de la partie · réglées par le MJ';
      for(const g of groups){
        const read=g.kind==='cycle'?window.heureTable:window.tempsTable;
        const raw=typeof read==='function'?read():0;
        const v=Number.isInteger(raw)&&raw>=0&&raw<g.buttons.length?raw:0;
        const text=g.kind==='cycle'?phases[v]:weather[v];g.current.textContent=text;
        const art=g.kind==='cycle'?(v<=6?22:23):12+v;
        g.picture.style.setProperty('--obs-x',`${art%6*20}%`);g.picture.style.setProperty('--obs-y',`${Math.floor(art/6)*244/768*100}%`);
        g.trigger.setAttribute('aria-label',`${g.kind==='cycle'?'Cycle jour / nuit':'Météo'} : ${text}`);
        for(const [i,b] of g.buttons.entries()){
          b.disabled=!gm;b.setAttribute('aria-pressed',String(i===v));
          b.title=gm?b.getAttribute('aria-label'):`${b.getAttribute('aria-label')} · réglage réservé au MJ`;
        }
      }
    }
    header.insertBefore(nav,header.querySelector('.entete-droite'));
    (document.getElementById('app')||document.body).append(panel);
    document.body.classList.add('table-observatoire');
    const measure=()=>document.documentElement.style.setProperty('--obs-top',`${Math.ceil(header.getBoundingClientRect().bottom)+10}px`);
    if(typeof ResizeObserver!=='undefined')new ResizeObserver(measure).observe(header);
    window.addEventListener('resize',measure);measure();
    document.addEventListener('observatoire-change',sync);
    new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
    document.getElementById('mj')?.addEventListener('change',sync);sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

