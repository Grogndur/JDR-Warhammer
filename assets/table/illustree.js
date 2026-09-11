/* Présentation uniquement : aucun accès Firebase, aucune copie de commande.
   Les contrôles déplacés gardent leurs identifiants et leurs écouteurs. */
(() => {
  'use strict';
  const icon = n => {
    const el = document.createElement('span');
    el.className = 'table-icone';
    el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--ix', `${(n % 4) * 100 / 3}%`);
    el.style.setProperty('--iy', `${Math.floor(n / 4) * 100 / 3}%`);
    return el;
  };
  function init() {
    const dock = document.getElementById('dock');
    if (!dock || document.body.classList.contains('table-illustree')) return;
    document.body.classList.add('table-illustree');
    const drawers = [];
    function drawer(parent, title, motif, nodes, gm = false) {
      const details = document.createElement('details');
      details.className = 'table-tiroir' + (gm ? ' gm-only' : '');
      const summary = document.createElement('summary');
      summary.append(icon(motif), document.createTextNode(title));
      const content = document.createElement('div');
      content.className = 'table-tiroir-contenu';
      const head = document.createElement('div');
      head.className = 'table-tiroir-tete';
      const name = document.createElement('strong'); name.textContent = title;
      const close = document.createElement('button');
      close.type = 'button'; close.textContent = '×';
      close.setAttribute('aria-label', `Fermer ${title}`);
      close.addEventListener('click', () => { details.open = false; summary.focus(); });
      head.append(name, close); content.append(head, ...nodes);
      details.append(summary, content); parent.append(details); drawers.push(details);
      details.addEventListener('toggle', () => {
        if (details.open) for (const other of drawers) if (other !== details) other.open = false;
        window.dispatchEvent(new Event('resize'));
      });
      return details;
    }
    const dice = dock.querySelector('.grp-des');
    if (dice) {
      const rows = [...dice.children];
      const label = dice.querySelector('label[for="cible"]');
      if (label) label.prepend(icon(7));
      drawer(dice, 'Autres jets', 7, rows.slice(1));
    }
    const combat = dock.querySelector('.grp-combat');
    if (combat) {
      const initButton = document.getElementById('ouvrir-init');
      if(initButton) combat.prepend(initButton);
      drawer(combat, 'Combat', 5, [...combat.children]);
    }
    const scene = dock.querySelector('.grp-scene');
    if (scene) {
      const rows = [...scene.children];
      const session = scene.querySelector('.ligne-session');
      const tools = scene.querySelector('.ligne-outils');
      if (session) scene.prepend(drawer(scene, 'Session', 4, [session]));
      const ambience = rows.filter(n => n.querySelector?.('#amb-choix') || n.id === 'amb-err');
      const scenes = rows.filter(n => n !== session && n !== tools && !ambience.includes(n));
      drawer(scene, 'Scènes', 8, scenes, true);
      drawer(scene, 'Ambiances', 9, ambience, true);
    }
    const labels = {
      'ouvrir-cams':[10,'Caméras'], 'ouvrir-journal':[6,'Journal'],
      'ouvrir-chat':[11,'Chat'], 'ouvrir-init':[5,'Initiative'],
      'ouvrir-dessin':[1,'Dessin'], 'ouvrir-grimoire':[14,'Grimoire'],
      'ouvrir-jetons':[4,'Gérer les jetons'], 'secret-test':[12,'Secret'],
      'secret-custom':[12,'Secret']
    };
    for (const [id, [n, label]] of Object.entries(labels)) {
      const button = document.getElementById(id); if (!button) continue;
      // Retirer seulement les anciens textes/emojis ; garder le badge du chat.
      for (const child of [...button.childNodes]) if (child.nodeType === 3) child.remove();
      button.prepend(icon(n), document.createTextNode(label));
      button.classList.add('table-bouton-icone');
    }
    for (const [selector, n] of [['#chat .pt',11],['#palette .pt',1],['#initiative .pt',5],['#cams .pt',10],['#journal-panel .pt',6],['#jetons .pt',4]]) {
      document.querySelector(selector)?.prepend(icon(n));
    }
    for (const [tool, n] of [['nav',0],['dessin',1],['gomme',2],['reveler',12],['voiler',3]]) {
      const button = document.querySelector(`button[data-outil="${tool}"]`);
      if (!button) continue;
      button.setAttribute('aria-label', button.title || tool);
      button.replaceChildren(icon(n));
    }
    const home = document.querySelector('header .retour');
    if (home) { home.textContent = 'La Table'; home.prepend(icon(13)); }
    const rail = document.createElement('nav');
    rail.className = 'table-rail'; rail.setAttribute('aria-label','Outils de carte');
    for (const [label, n, selector, role] of [
      ['Déplacer',0,'[data-outil="nav"]',''],
      ['Dessin',1,'[data-outil="dessin"]','pj-dessin'],
      ['Gomme',2,'[data-outil="gomme"]','pj-dessin'],
      ['Brouillard',3,'[data-outil="reveler"]','gm-only-in'],
      
    ]) {
      const target = document.querySelector(selector); if (!target) continue;
      const button = document.createElement('button'); button.type = 'button';
      button.className = role; button.title = target.title || label;
      button.append(icon(n), document.createTextNode(label));
      button.addEventListener('click', () => {
        if (target.disabled) return;
        target.click();
        if (n !== 4 && n !== 0) document.getElementById('palette').classList.remove('replie');
      });
      const sync = () => {
        button.disabled = target.disabled;
        button.classList.toggle('actif', target.classList.contains('actif'));
        if (n !== 4) button.setAttribute('aria-pressed', String(target.classList.contains('actif')));
      };
      new MutationObserver(sync).observe(target,{attributes:true,attributeFilter:['class','disabled']}); sync();
      rail.append(button);
    }
    dock.append(rail);
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      for (const d of drawers) if (d.open) { d.open = false; d.querySelector('summary').focus(); }
    });
    document.addEventListener('pointerdown', e => {
      if (e.target.closest('.table-tiroir,.crea-menu,.etats-menu,.fen')) return;
      // Les menus originaux peuvent être extérieurs au volet : ne pas les fermer.
      if (document.querySelector('.crea-menu.on,.etats-menu.on,.fen.on')) return;
      for (const d of drawers) d.open = false;
    });
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--table-dock-height', `${dock.getBoundingClientRect().height}px`);
        window.dispatchEvent(new Event('resize'));
      });
    };
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(dock);
    measure();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

