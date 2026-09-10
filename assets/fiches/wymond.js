/* Présentation des groupes BdS 2 et 3. Aucun accès aux données de jeu,
   aucune copie des champs, aucun remplacement des fonctions de sauvegarde. */
(() => {
  const root = document.documentElement;
  const icon = (index) => {
    const span = document.createElement('span');
    span.className = 'fiche-icone';
    span.dataset.motif = String(index);
    span.setAttribute('aria-hidden','true');
    span.style.setProperty('--ix', (index % 4) * 100 / 3 + '%');
    span.style.setProperty('--iy', Math.floor(index / 4) * 100 / 3 + '%');
    return span;
  };
  let installed = false;
  function install() {
    if (installed || !root.classList.contains('fiche-wymond')) return;
    const header = document.querySelector('.perso-header');
    if (!header) return;
    installed = true;
    const info = header.querySelector('.perso-info');
    const title = document.createElement('h1');
    title.className = 'fiche-nom-affiche';
    const kicker = document.createElement('p');
    kicker.className = 'fiche-surtitre';
    kicker.textContent = 'De Boue et de Sang';
    info.prepend(kicker, title);
    const nameEditor = document.createElement('details');
    nameEditor.className = 'fiche-edition-nom';
    const nameSummary = document.createElement('summary');
    nameSummary.textContent = 'Modifier le nom';
    nameEditor.append(nameSummary, document.getElementById('ident-nom'));
    title.after(nameEditor);
    const source = document.getElementById('nav-current');
    const update = () => {
      const name = document.getElementById('ident-nom').value || source.textContent;
      if(/^Wymond\s+/i.test(name)) {
        const main=document.createElement('span'), sub=document.createElement('span');
        main.textContent=name.split(/\s+/)[0];
        sub.textContent=name.replace(/^Wymond\s+/i,'');
        sub.className='fiche-surnom';
        title.replaceChildren(main,sub);
      } else title.textContent=name;
    };
    new MutationObserver(update).observe(source, {childList:true,subtree:true,characterData:true});
    document.getElementById('ident-nom').addEventListener('input', update);
    update();
    // Déplacer les nœuds existants garde leurs valeurs et leurs écouteurs.
    const stats = document.getElementById('stats-grid').closest('.card');
    const navigation = document.createElement('nav');
    navigation.className = 'fiche-raccourcis';
    navigation.setAttribute('aria-label', 'Sections de la fiche');
    header.after(navigation, stats);
    const sections = [
      ['stats-grid','Caractéristiques'],['w-cur','Ressources'],
      ['skills-base-list','Compétences'],['armor-pieces-list','Combat'],
      ['inv-list','Équipement'],['session-notes','Notes']
    ];
    sections.forEach(([id,label],i) => {
      const element = document.getElementById(id);
      if (!element) return;
      const card = element.closest('.card');
      if (!card) return;
      card.id = 'fiche-section-'+i;
      const link = document.createElement('a');
      link.href = '#'+card.id;
      link.textContent = label;
      link.prepend(icon([7,10,7,13,14,7][i]));
      navigation.append(link);
    });
    // Les illustrations restent séparées des valeurs et des zones de lancer.
    const statInfo = [
      ['Corps à corps',0],['Tir',1],['Force',2],['Endurance',3],['Initiative',4],
      ['Agilité',5],['Dextérité',6],['Intelligence',7],['Force mentale',8],['Sociabilité',9]
    ];
    const editionOuverte = new Set();
    const enrichirStats = () => {
      document.querySelectorAll('#stats-grid > .stat-box').forEach((box,i) => {
        if(box.classList.contains('stat-illustree')) return;
        box.classList.add('stat-illustree');
        const [label,asset] = statInfo[i] || ['',7];
        box.prepend(icon(asset));
        const longLabel = document.createElement('span');
        longLabel.className = 'stat-nom-long';
        longLabel.textContent = label;
        box.querySelector('.stat-label').after(longLabel);
        const editor = document.createElement('details');
        editor.className = 'stat-edition';
        editor.open = editionOuverte.has(i);
        const summary = document.createElement('summary');
        summary.textContent = 'Ajuster';
        summary.setAttribute('aria-label','Ajuster '+label);
        editor.append(summary);
        const fields = box.querySelector('.stat-nba');
        if(fields) {
          const cost = fields.nextElementSibling;
          editor.append(fields);
          if(cost) editor.append(cost);
        }
        editor.addEventListener('toggle',()=>{if(editor.open) editionOuverte.add(i);else editionOuverte.delete(i);});
        box.append(editor);
      });
    };
    new MutationObserver(enrichirStats).observe(document.getElementById('stats-grid'),{childList:true});
    enrichirStats();
    const resources = document.getElementById('w-cur').closest('.card');
    resources.classList.add('fiche-ressources','full');
    const woundBox = document.getElementById('w-cur').closest('.res-box');
    const moveBox = document.getElementById('marche-input').closest('.res-box');
    const destiny = document.getElementById('destin-input').closest('.fortune-row').parentElement;
    const resolve = document.getElementById('resil-input').closest('.fortune-row').parentElement;
    const money = document.getElementById('m-or').closest('.money-row').parentElement;
    const emptyGrid = resources.querySelector('.res-grid');
    [woundBox,destiny,resolve,moveBox,money].forEach((box,i)=>{
      box.classList.add('ressource-illustree');
      box.querySelector('.res-label,.card-title')?.prepend(icon([10,11,12,4,14][i]));
    });
    moveBox.classList.add('ressource-mouvement');
    money.classList.add('ressource-monnaie');
    resources.append(woundBox,destiny,resolve,moveBox,money,document.getElementById('m-convert-msg'));
    if(emptyGrid) emptyGrid.remove();
    stats.after(resources);
    const meter = document.createElement('meter');
    meter.className='fiche-vitalite';
    meter.min=0;
    meter.setAttribute('aria-label','Blessures restantes');
    woundBox.querySelector('.res-label').after(meter);
    const actualiserVitalite=()=>{
      meter.max=Number(document.getElementById('w-max-input').value)||1;
      meter.value=Number(document.getElementById('w-cur').textContent)||0;
      meter.low=meter.max*.3;meter.high=meter.max*.65;meter.optimum=meter.max;
    };
    new MutationObserver(actualiserVitalite).observe(document.getElementById('w-cur'),{childList:true,characterData:true,subtree:true});
    document.getElementById('w-max-input').addEventListener('change',actualiserVitalite);
    actualiserVitalite();
    // Réserver la paire de colonnes aux compétences, sans étirer les états.
    const baseSkills = document.getElementById('skills-base-list').closest('.card');
    const advancedSkills = document.getElementById('skills-adv-list').closest('.card');
    const conditions = document.querySelector('.cet-card');
    baseSkills.after(advancedSkills);
    advancedSkills.after(conditions);
    conditions.classList.add('full','fiche-etats-compacts');
    baseSkills.classList.add('fiche-competences');
    advancedSkills.classList.add('fiche-competences');
    // Matières et emblèmes de section : uniquement décoratifs.
    document.querySelectorAll('.layout > .card:not(.fiche-ressources) > .card-title').forEach(head=>{
      const text=head.textContent.toLowerCase();
      const n=text.includes('arm')?13:text.includes('invent')?14:text.includes('talent')?15:text.includes('corruption')?12:text.includes('expérience')?15:7;
      head.prepend(icon(n));
    });
    // Les vues graphiques restent disponibles sous les caractéristiques.
    for (const id of ['radar-head','gauge-head']) {
      const head = document.getElementById(id);
      if (head) head.closest('.card').classList.add('fiche-graphe');
    }
  }
  new MutationObserver(install).observe(root,{attributes:true,attributeFilter:['class']});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();
