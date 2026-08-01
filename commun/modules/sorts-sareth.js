/* Sorts, tradition Ulgu — mécanique de Sareth Liamah
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis sareth.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "sorts-sareth",
    titre: "Sorts, tradition Ulgu",
    css: "/* Couleur d accent propre au personnage, reprise de sa fiche d origine. */\n[data-module=\"sorts-sareth\"] { --VIO2:#9b7fd4; }\n.sort-item { border:1px solid rgba(103,78,167,0.18); border-radius:2px; margin-bottom:0.45rem; overflow:hidden; transition:border-color 0.2s; }\n.sort-item:hover { border-color:rgba(103,78,167,0.4); }\n.sort-header { display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0.7rem; background:rgba(103,78,167,0.07); cursor:pointer; }\n.sort-name-display { font-family:'Cinzel',serif; font-size:0.85rem; color:var(--parchment); font-weight:600; }\n.sort-badges { display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap; }\n.sort-badge { font-size:0.65rem; padding:0.1rem 0.35rem; border-radius:1px; border:1px solid; letter-spacing:0.05em; white-space:nowrap; }\n.sort-badge.ni { border-color:rgba(103,78,167,0.5); color:var(--VIO2); background:rgba(103,78,167,0.1); }\n.sort-badge.portee { border-color:rgba(255,255,255,0.08); color:var(--parchment-dark); background:rgba(255,255,255,0.03); }\n.sort-badge.duree { border-color:rgba(184,146,42,0.3); color:var(--GLD); background:rgba(184,146,42,0.05); }\n.sort-badge.cible { border-color:rgba(94,128,79,0.3); color:#7fa86e; background:rgba(94,128,79,0.06); }\n.sort-badge.type { border-color:rgba(85,85,102,0.35); color:var(--SUB); }\n.sort-expand-icon { font-size:0.7rem; color:var(--SUB); margin-left:0.5rem; flex-shrink:0; transition:transform 0.15s; }\n.sort-item.open .sort-expand-icon { transform:rotate(180deg); }\n.sort-body { display:none; padding:0.65rem 0.75rem; font-size:0.84rem; color:var(--parchment-dark); line-height:1.55; border-top:1px solid rgba(103,78,167,0.1); }\n.sort-item.open .sort-body { display:block; }\n.sort-body-section { margin-bottom:0.5rem; }\n.sort-body-label { font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--VIO); opacity:0.8; margin-bottom:0.15rem; display:block; }\n.sort-body-text { font-style:italic; }\n.sort-actions { display:flex; gap:0.4rem; margin-top:0.6rem; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.04); }\n.sort-btn { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.25rem 0.5rem; border-radius:1px; cursor:pointer; transition:all 0.15s; }\n.sort-btn-edit { background:rgba(103,78,167,0.1); border:1px solid rgba(103,78,167,0.3); color:var(--VIO2); }\n.sort-btn-edit:hover { background:rgba(103,78,167,0.22); }\n.sort-btn-del { background:rgba(139,26,26,0.08); border:1px solid rgba(139,26,26,0.25); color:#c07070; }\n.sort-btn-del:hover { background:rgba(139,26,26,0.2); }\n.sort-form { background:rgba(15,12,25,0.97); border:1px solid rgba(103,78,167,0.4); border-radius:2px; padding:0.9rem; margin-top:0.5rem; display:none; }\n.sort-form.visible { display:block; }\n.sort-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.65rem; margin-bottom:0.65rem; }\n.sort-form-field { display:flex; flex-direction:column; gap:0.2rem; }\n.sort-form-label { font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--VIO); opacity:0.85; }\n.sort-form-input { background:rgba(103,78,167,0.07); border:1px solid rgba(103,78,167,0.2); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.88rem; padding:0.3rem 0.5rem; border-radius:1px; width:100%; }\n.sort-form-input:focus { outline:none; border-color:var(--VIO2); }\n.sort-form-input.full-width { grid-column:1/-1; }\n.sort-form-textarea { background:rgba(103,78,167,0.07); border:1px solid rgba(103,78,167,0.2); color:var(--parchment); font-family:'Crimson Text',serif; font-size:0.88rem; padding:0.3rem 0.5rem; border-radius:1px; width:100%; resize:vertical; min-height:65px; line-height:1.45; }\n.sort-form-textarea:focus { outline:none; border-color:var(--VIO2); }\n.sort-form-actions { display:flex; gap:0.5rem; }\n/* Règles reprises de sareth.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n.btn-add-vio { background:rgba(103,78,167,0.12); border:1px solid rgba(103,78,167,0.4); color:var(--VIO2); }\n.btn-add-vio:hover { background:rgba(103,78,167,0.25); }\n",
    html: "<div class=\"card vio full\">\n    <div class=\"card-title vio\">Sorts — Tradition Ulgu (Ombre) · Langue : Magick</div>\n    <div id=\"sorts-list\"></div>\n    <div style=\"margin-top:0.6rem;\">\n      <button class=\"btn-add btn-add-vio\" onclick=\"toggleSortForm()\">+ Ajouter un sort</button>\n      <div class=\"sort-form\" id=\"sort-new-form\">\n        <div class=\"sort-form-grid\">\n          <div class=\"sort-form-field\" style=\"grid-column:1/-1;\"><span class=\"sort-form-label\">Nom du sort</span><input class=\"sort-form-input\" id=\"snew-name\" placeholder=\"Nom\" /></div>\n          <div class=\"sort-form-field\"><span class=\"sort-form-label\">NI (Niveau d'Incantation)</span><input class=\"sort-form-input\" id=\"snew-ni\" type=\"number\" placeholder=\"NI — ex: 4\" /></div>\n          <div class=\"sort-form-field\"><span class=\"sort-form-label\">Type</span><input class=\"sort-form-input\" id=\"snew-type\" placeholder=\"Arcane / Mineur\" /></div>\n          <div class=\"sort-form-field\"><span class=\"sort-form-label\">Portée</span><input class=\"sort-form-input\" id=\"snew-portee\" placeholder=\"Contact / BFM m…\" /></div>\n          <div class=\"sort-form-field\"><span class=\"sort-form-label\">Durée</span><input class=\"sort-form-input\" id=\"snew-duree\" placeholder=\"Instantané / BFM rounds…\" /></div>\n          <div class=\"sort-form-field\"><span class=\"sort-form-label\">Cible</span><input class=\"sort-form-input\" id=\"snew-cible\" placeholder=\"Une cible / AOE…\" /></div>\n          <div class=\"sort-form-field\"><span class=\"sort-form-label\">Dégâts</span><input class=\"sort-form-input\" id=\"snew-deg\" placeholder=\"BFM+3 / —\" /></div>\n          <div class=\"sort-form-field\" style=\"grid-column:1/-1;\"><span class=\"sort-form-label\">Description & Effets</span><textarea class=\"sort-form-textarea\" id=\"snew-desc\" placeholder=\"Description du sort, effets mécaniques, conditions…\"></textarea></div>\n          <div class=\"sort-form-field\" style=\"grid-column:1/-1;\"><span class=\"sort-form-label\">Effets d'Incantation Imparfaite</span><textarea class=\"sort-form-textarea\" id=\"snew-imparf\" placeholder=\"Conséquences en cas d'incantation ratée…\" style=\"min-height:45px;\"></textarea></div>\n        </div>\n        <div class=\"sort-form-actions\">\n          <button class=\"btn-add btn-add-vio\" onclick=\"addSort()\">Ajouter le sort</button>\n          <button class=\"btn-cancel\" onclick=\"toggleSortForm()\">Annuler</button>\n        </div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { renderSorts(); }
  });
})();

const SORTS_DEF = [
  { name:'Sommeil',           ni:0, type:'Arcane', portee:'Contact',  duree:'Instantané', cible:'1 cible', deg:'—', desc:'Cible s\'endort immédiatement (se réveille si elle tombe ou est secouée). État : Inconscient.', imparf:'La cible résiste ou le sort retombe sur Sareth.' },
  { name:'Drain',             ni:0, type:'Arcane', portee:'Contact',  duree:'Instantané', cible:'1 cible', deg:'Proj.Mag+0 (No PA)', desc:'Projection Magique +0 Dégâts ignorant toutes les Armures. Sareth regagne 1 Blessure.', imparf:'Sareth perd 1 Blessure au lieu d\'en regagner.' },
  { name:'Pas léger',         ni:0, type:'Arcane', portee:'Soi',      duree:'FM minutes', cible:'Soi', deg:'—', desc:'Sareth n\'impacte plus rien par son rapport au sol. −30 Pistage contre elle. Marche sur des surfaces fragiles sans les briser.', imparf:'Durée réduite à 1 round, effet inversé (empêtre les pieds).' },
  { name:'Explosion',         ni:4, type:'Arcane', portee:'FM m',     duree:'Instantané', cible:'AOE BFM m', deg:'Proj.Mag+3', desc:'Explosion d\'ombre dans un rayon de BFM mètres. Dégâts à toutes les cibles dans la zone. Proj. Magique +3 Dégâts.', imparf:'La zone d\'explosion est centrée sur Sareth.' },
  { name:'Ombres étrangleuses',ni:6,type:'Arcane', portee:'BFM m',   duree:'BFM Rounds', cible:'1 cible', deg:'—', desc:'Tentacules d\'ombre agrippent la cible. Applique +1 Exténué, Suffocation et Muet pour la durée.', imparf:'Les ombres se retournent contre Sareth ou un allié proche.' },
];

function makeEditable(el, onSave, opts) {
  opts = opts || {};
  const isArea = opts.multiline || false;
  el.title = 'Double-cliquer pour modifier';
  el.style.cursor = 'pointer';

  el.addEventListener('dblclick', function(e) {
    e.stopPropagation();
    const current = el.textContent;
    const tag = isArea ? 'textarea' : 'input';
    const inp = document.createElement(tag);
    inp.value = current;
    inp.className = isArea ? 'editable-field-area' : 'editable-field';
    if (isArea) { inp.rows = 2; inp.style.width = '100%'; }
    inp.style.fontSize = window.getComputedStyle(el).fontSize;
    inp.style.color = window.getComputedStyle(el).color;
    inp.style.fontFamily = window.getComputedStyle(el).fontFamily;
    inp.style.fontWeight = window.getComputedStyle(el).fontWeight;
    el.replaceWith(inp);
    inp.focus();
    inp.select();

    function commit() {
      const val = inp.value.trim() || current;
      el.textContent = val;
      inp.replaceWith(el);
      onSave(val);
    }
    inp.addEventListener('blur', commit);
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !isArea) { e.preventDefault(); commit(); }
      if (e.key === 'Escape') { inp.value = current; commit(); }
    });
  });
}

function addSort() {
  const name=document.getElementById('snew-name').value.trim();
  if(!name) return;
  state.sorts.push({
    name,
    ni:parseInt(document.getElementById('snew-ni').value)||0,
    type:document.getElementById('snew-type').value.trim()||'Arcane',
    portee:document.getElementById('snew-portee').value.trim(),
    duree:document.getElementById('snew-duree').value.trim(),
    cible:document.getElementById('snew-cible').value.trim(),
    deg:document.getElementById('snew-deg').value.trim()||'—',
    desc:document.getElementById('snew-desc').value.trim(),
    imparf:document.getElementById('snew-imparf').value.trim(),
  });
  ['snew-name','snew-ni','snew-type','snew-portee','snew-duree','snew-cible','snew-deg','snew-desc','snew-imparf'].forEach(id=>document.getElementById(id).value='');
  renderSorts(); save(); toggleSortForm();
}

function deleteSort(idx) {
  if(confirm('Supprimer ce sort ?')) { state.sorts.splice(idx,1); renderSorts(); save(); }
}

function editSort(idx) {
  const s=state.sorts[idx];
  const name=prompt('Nom du sort',s.name); if(name===null) return;
  const ni=prompt('NI (Niveau d\'Incantation)',s.ni); if(ni===null) return;
  const type=prompt('Type (Arcane/Mineur)',s.type||'');
  const portee=prompt('Portée',s.portee||'');
  const duree=prompt('Durée',s.duree||'');
  const cible=prompt('Cible',s.cible||'');
  const deg=prompt('Dégâts',s.deg||'—');
  const desc=prompt('Description & Effets',s.desc||'');
  const imparf=prompt('Incantation Imparfaite',s.imparf||'');
  Object.assign(state.sorts[idx],{name,ni:parseInt(ni)||0,type,portee,duree,cible,deg,desc,imparf});
  renderSorts(); save();
}

function applySortEditable() {
  document.querySelectorAll('#sorts-list .sort-item').forEach((item, i) => {
    const nameEl = item.querySelector('.sort-name-display');
    if (nameEl && !nameEl.dataset.editable) {
      nameEl.dataset.editable = '1';
      makeEditable(nameEl, val => { if(state.sorts[i]) { state.sorts[i].name = val; save(); } });
    }
    const badges = item.querySelectorAll('.sort-badge');
    badges.forEach(badge => {
      if (badge.dataset.editable) return;
      badge.dataset.editable = '1';
      makeEditable(badge, val => {
        if (!state.sorts[i]) return;
        const cls = badge.className;
        const raw = val.replace(/^[^0-9a-zA-ZÀ-ÿ]+/, '').trim();
        if (cls.includes('ni')) state.sorts[i].ni = parseInt(raw)||0;
        else if (cls.includes('portee')) state.sorts[i].portee = raw;
        else if (cls.includes('duree')) state.sorts[i].duree = raw;
        else if (cls.includes('cible')) state.sorts[i].cible = raw;
        else if (cls.includes('type')) state.sorts[i].type = raw;
        save();
      });
    });
    // Description et incantation imparfaite dans le body
    const descDiv = item.querySelector('.sort-body-text');
    if (descDiv && !descDiv.dataset.editable) {
      descDiv.dataset.editable = '1';
      makeEditable(descDiv, val => { if(state.sorts[i]) { state.sorts[i].desc = val; save(); } }, { multiline: true });
    }
  });
}

function renderSorts() {
  const c=document.getElementById('sorts-list'); c.innerHTML='';
  state.sorts.forEach((s,i)=>{
    const div=document.createElement('div');
    div.className='sort-item';
    div.innerHTML=`
      <div class="sort-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="sort-name-display">${s.name}</span>
        <div class="sort-badges">
          <span class="sort-badge ni">NI ${s.ni}</span>
          ${s.type?`<span class="sort-badge type">${s.type}</span>`:''}
          ${s.portee?`<span class="sort-badge portee">📍 ${s.portee}</span>`:''}
          ${s.duree?`<span class="sort-badge duree">⏱ ${s.duree}</span>`:''}
          ${s.cible?`<span class="sort-badge cible">◎ ${s.cible}</span>`:''}
          ${s.deg&&s.deg!=='—'?`<span class="sort-badge ni">⚔ ${s.deg}</span>`:''}
          <span class="sort-expand-icon">▾</span>
        </div>
      </div>
      <div class="sort-body">
        ${s.desc?`<div class="sort-body-section"><span class="sort-body-label">Description & Effets</span><div class="sort-body-text">${s.desc}</div></div>`:''}
        ${s.imparf?`<div class="sort-body-section" style="margin-top:0.4rem;"><span class="sort-body-label" style="color:#c0392b;">Incantation Imparfaite</span><div class="sort-body-text" style="color:#c07060;">${s.imparf}</div></div>`:''}
        <div class="sort-actions">
          <button class="sort-btn sort-btn-edit" onclick="editSort(${i});event.stopPropagation();">✎ Modifier</button>
          <button class="sort-btn sort-btn-del" onclick="deleteSort(${i});event.stopPropagation();">✕ Supprimer</button>
        </div>
      </div>
    `;
    c.appendChild(div);
  });
}

function toggleSortForm() { document.getElementById('sort-new-form').classList.toggle('visible'); }
