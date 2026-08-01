/* Collection secrète — mécanique de Azart
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis azart.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "collection-secrete",
    titre: "Collection secrète",
    css: "/* Couleur d'accent propre au personnage, reprise de sa fiche d'origine. */\n[data-module=\"collection-secrete\"] { --VIO2:#d4904a; }\n.coll-table { width:100%; border-collapse:collapse; font-size:0.83rem; }\n.coll-table th { text-align:left; font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--GLD); opacity:0.75; padding:0.3rem 0.5rem 0.5rem; border-bottom:1px solid rgba(184,146,42,0.15); font-weight:400; }\n.coll-table th.right { text-align:right; }\n.coll-row { border-bottom:1px solid rgba(255,255,255,0.03); cursor:pointer; transition:background 0.15s; }\n.coll-row:last-child { border-bottom:none; }\n.coll-row:hover { background:rgba(184,146,42,0.04); }\n.coll-row td { padding:0.4rem 0.5rem; vertical-align:top; }\n.coll-name { color:var(--parchment); font-weight:600; font-size:0.88rem; }\n.coll-name-sub { color:var(--SUB); font-size:0.72rem; font-style:italic; display:block; margin-top:0.1rem; }\n.coll-val-real { font-family:'Cinzel',serif; color:var(--SUB); font-size:0.82rem; text-align:right; white-space:nowrap; }\n.coll-val-azart { font-family:'Cinzel',serif; color:var(--GLD); font-size:0.88rem; font-weight:600; text-align:right; white-space:nowrap; }\n.coll-expand { color:var(--SUB); font-size:0.65rem; width:18px; text-align:center; transition:transform 0.15s; user-select:none; }\n.coll-row.open .coll-expand { transform:rotate(90deg); color:var(--acc2); }\n.coll-desc-row { display:none; }\n.coll-row.open + .coll-desc-row { display:table-row; }\n.coll-desc-cell { padding:0 0.5rem 0.65rem 1.5rem !important; }\n.coll-desc-text { font-size:0.82rem; color:var(--parchment-dark); line-height:1.6; font-style:italic; background:rgba(184,146,42,0.04); border-left:2px solid rgba(184,146,42,0.2); padding:0.4rem 0.6rem; border-radius:1px; }\n.coll-stars { display:flex; gap:3px; margin-top:0.25rem; align-items:center; }\n.coll-coin { width:14px; height:14px; border-radius:50%; background:rgba(184,146,42,0.1); border:1.5px solid rgba(184,146,42,0.25); cursor:pointer; transition:all 0.18s; position:relative; display:flex; align-items:center; justify-content:center; flex-shrink:0; }\n.coll-coin::after { content:''; width:6px; height:6px; border-radius:50%; background:rgba(184,146,42,0.2); transition:all 0.18s; }\n.coll-coin.on { background:radial-gradient(circle at 38% 35%, #f0d060, #B8922A 60%, #8a6010); border-color:#c8a030; box-shadow:0 1px 4px rgba(184,146,42,0.55), inset 0 1px 0 rgba(255,240,100,0.3); }\n.coll-coin.on::after { background:rgba(255,240,150,0.35); width:5px; height:5px; }\n.coll-val-label { font-family:'Cinzel',serif; font-size:0.72rem; color:var(--GLD); margin-left:5px; letter-spacing:0.04em; opacity:0.9; }\n.coll-select { background:#0f0f18 !important; color:var(--parchment) !important; border:1px solid rgba(184,112,42,0.3) !important; }\n.coll-select option { background:#0f0f18; color:var(--parchment); }\n.coll-form { display:none; background:rgba(184,146,42,0.05); border:1px solid rgba(184,146,42,0.2); border-radius:2px; padding:0.75rem; margin-top:0.65rem; flex-direction:column; gap:0.45rem; }\n.coll-form.visible { display:flex; }\n.coll-form-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.4rem; }\n.coll-form-label { font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--GLD); opacity:0.8; display:block; margin-bottom:0.15rem; }\n.coll-form-field { display:flex; flex-direction:column; }\n.coll-stats-bar { display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid rgba(184,146,42,0.1); font-size:0.75rem; color:var(--SUB); flex-wrap:wrap; gap:0.4rem; }\n.coll-stat-pill { background:rgba(184,146,42,0.08); border:1px solid rgba(184,146,42,0.18); border-radius:10px; padding:0.15rem 0.5rem; font-family:'Cinzel',serif; font-size:0.65rem; color:var(--GLD); }\n.collection-card { background:rgba(10,10,15,0.75); border:1px solid rgba(184,146,42,0.22); border-radius:2px; padding:1.1rem; position:relative; overflow:hidden; }\n.collection-card::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%, rgba(184,146,42,0.06) 0%, transparent 65%); pointer-events:none; }\n.collection-intro { font-size:0.82rem; color:var(--SUB); font-style:italic; line-height:1.5; margin-bottom:0.9rem; padding:0.5rem 0.75rem; border-left:2px solid rgba(184,146,42,0.3); }\n.collection-intro strong { color:var(--acc2); font-style:normal; }",
    html: "<div class=\"collection-card full\">\n    <div class=\"card-title gld\" style=\"position:relative;\">Collection secrète · Trésor</div>\n    <div class=\"collection-intro\">\n      Ces objets n'ont pas tous une grande valeur marchande. Mais ils ont <strong>été vus</strong>. Portés en public, nommés, remarqués — ou simplement trop beaux pour être abandonnés.<br>\n      <span style=\"font-size:0.78rem;opacity:0.7;\">Valeur réelle estimée · Valeur subjective d'Azart · Cliquer pour lire la description</span>\n    </div>\n\n    <table class=\"coll-table\">\n      <thead>\n        <tr>\n          <th style=\"width:18px;\"></th>\n          <th>Objet</th>\n          <th class=\"right\" style=\"width:90px;\">Valeur réelle</th>\n          <th style=\"width:22px;\"></th>\n        </tr>\n      </thead>\n      <tbody id=\"coll-body\"></tbody>\n    </table>\n\n    <div class=\"coll-stats-bar\" id=\"coll-stats-bar\"></div>\n\n    <div style=\"margin-top:0.65rem;\">\n      <button class=\"btn-add btn-gld\" onclick=\"toggleForm('coll-form')\" style=\"font-size:0.6rem;\">✦ Ajouter un objet</button>\n      <div class=\"coll-form\" id=\"coll-form\">\n        <div class=\"coll-form-grid\">\n          <div class=\"coll-form-field\" style=\"grid-column:1/-1;\">\n            <span class=\"coll-form-label\">Nom de l'objet</span>\n            <input class=\"form-input\" id=\"coll-name\" placeholder=\"Bague en argent ciselée…\" />\n          </div>\n          <div class=\"coll-form-field\">\n            <span class=\"coll-form-label\">Valeur réelle (ex: 3 PA)</span>\n            <input class=\"form-input\" id=\"coll-val-real\" placeholder=\"3 PA\" />\n          </div>\n          <div class=\"coll-form-field\" style=\"grid-column:1/-1;\">\n            <span class=\"coll-form-label\">Valeur pour Azart</span>\n            <div style=\"display:flex;gap:5px;align-items:center;margin-top:0.35rem;\" id=\"coll-new-stars\"></div>\n          </div>\n          <div class=\"coll-form-field\" style=\"grid-column:1/-1;\">\n            <span class=\"coll-form-label\">Description · Contexte · Pourquoi ça compte</span>\n            <textarea class=\"form-textarea\" id=\"coll-desc\" placeholder=\"Qui l'a vu, dans quel contexte, ce que ça représente pour lui…\"></textarea>\n          </div>\n          <div class=\"coll-form-field\" style=\"grid-column:1/-1;\">\n            <span class=\"coll-form-label\">Statut</span>\n            <select class=\"form-input coll-select\" id=\"coll-statut\" style=\"cursor:pointer;\" onchange=\"toggleCacheDescForm(this.value)\">\n              <option value=\"possédé\">Sur soi — caché sur le corps</option>\n              <option value=\"sac\">Dans le sac</option>\n              <option value=\"planque\">Cache secrète</option>\n              <option value=\"perdu\">Perdu / volé</option>\n              <option value=\"donné\">Donné (regretté)</option>\n            </select>\n          </div>\n          <div class=\"coll-form-field\" id=\"cache-desc-field\" style=\"grid-column:1/-1;display:none;\">\n            <span class=\"coll-form-label\">Description de la cache</span>\n            <input class=\"form-input\" id=\"coll-cache-desc\" placeholder=\"Loose sous la troisième lame du plancher, auberge du Tonneau Percé…\" />\n          </div>\n          <div class=\"coll-form-field\" id=\"perdu-note-field\" style=\"grid-column:1/-1;display:none;\">\n            <span class=\"coll-form-label\">Où / comment — pour le retrouver</span>\n            <input class=\"form-input\" id=\"coll-perdu-note\" placeholder=\"Volé par le crocheteur à l'auberge des Trois Couteaux, nuit du 12…\" />\n          </div>\n          <div class=\"coll-form-field\" id=\"donne-note-field\" style=\"grid-column:1/-1;display:none;\">\n            <span class=\"coll-form-label\">À qui — et pourquoi ça le ronge</span>\n            <input class=\"form-input\" id=\"coll-donne-note\" placeholder=\"Offert à Mira pour acheter son silence. Regretté immédiatement.\" />\n          </div>\n        </div>\n        <div style=\"display:flex;gap:0.4rem;margin-top:0.2rem;\">\n          <button class=\"btn-add btn-gld\" onclick=\"addCollItem()\">Ajouter à la collection</button>\n          <button class=\"btn-cancel\" onclick=\"toggleForm('coll-form')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { renderCollection(); }
  });
})();

function coinsHTML(count, itemIdx) {
  const label = COLL_LABELS[count] || '';
  let h = '';
  for(let i=1;i<=5;i++){
    h+=`<div class="coll-coin${i<=count?' on':''}" onclick="updateCollStars(${itemIdx},${i});event.stopPropagation();" title="${COLL_LABELS[i]}"></div>`;
  }
  h += `<span class="coll-val-label">${label}</span>`;
  return h;
}

function toggleCacheDescForm(val) {
  const fields = { 'planque': 'cache-desc-field', 'perdu': 'perdu-note-field', 'donné': 'donne-note-field' };
  ['cache-desc-field','perdu-note-field','donne-note-field'].forEach(id => {
    const f = document.getElementById(id);
    if (f) f.style.display = 'none';
  });
  if (fields[val]) {
    const f = document.getElementById(fields[val]);
    if (f) f.style.display = 'flex';
  }
}

function addCollItem() {
  const name=document.getElementById('coll-name').value.trim(); if(!name) return;
  if(!state.collection) state.collection=[];
  const statut = document.getElementById('coll-statut').value;
  const cacheDesc  = statut === 'planque' ? (document.getElementById('coll-cache-desc').value.trim()) : '';
  const perduNote  = statut === 'perdu'   ? (document.getElementById('coll-perdu-note').value.trim()) : '';
  const donneNote  = statut === 'donné'   ? (document.getElementById('coll-donne-note').value.trim()) : '';
  state.collection.push({
    name,
    valReal:    document.getElementById('coll-val-real').value.trim()||'—',
    valAzart:   COLL_LABELS[collNewStars] || '',
    stars:      collNewStars,
    statut,
    cacheDesc,
    perduNote,
    donneNote,
    desc:       document.getElementById('coll-desc').value.trim(),
  });
  ['coll-name','coll-val-real','coll-desc','coll-cache-desc','coll-perdu-note','coll-donne-note'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  ['cache-desc-field','perdu-note-field','donne-note-field'].forEach(id=>{ const f=document.getElementById(id); if(f) f.style.display='none'; });
  collNewStars=3; renderCollNewStars();
  renderCollection(); save(); toggleForm('coll-form');
}

function deleteCollItem(idx) {
  if(confirm('Retirer cet objet de la collection ?')){ state.collection.splice(idx,1); renderCollection(); save(); }
}

function renderCollection() {
  const tbody = document.getElementById('coll-body'); if(!tbody) return;
  tbody.innerHTML='';
  if(!state.collection) state.collection=[];

  state.collection.forEach((item,i)=>{
    const st = COLL_STATUT_STYLE[item.statut] || COLL_STATUT_STYLE['possédé'];
    const tr = document.createElement('tr');
    tr.className='coll-row';
    tr.innerHTML=`
      <td class="coll-expand">▶</td>
      <td>
        <div class="coll-name" data-coll-field="name" data-coll-idx="${i}" style="cursor:text;" title="Cliquer pour modifier le nom">${item.name}
          <span style="font-size:0.6rem;margin-left:0.4rem;padding:0.1rem 0.4rem;border-radius:8px;background:rgba(255,255,255,0.04);color:${st.color};border:1px solid ${st.color}44;">${st.label}</span>
        </div>
        <div class="coll-stars">${coinsHTML(item.stars||0,i)}</div>
      </td>
      <td class="coll-val-real" data-coll-field="valReal" data-coll-idx="${i}" title="Cliquer pour modifier" style="cursor:text;">${item.valReal||'—'}</td>
      <td style="text-align:center;"><span class="del-btn" onclick="deleteCollItem(${i});event.stopPropagation();" title="Supprimer">✕</span></td>
    `;
    tr.onclick=(e)=>{ if(!e.target.closest('[data-coll-field]') && !e.target.closest('.coll-coin') && !e.target.closest('.del-btn')) tr.classList.toggle('open'); };
    tbody.appendChild(tr);

    const descTr = document.createElement('tr');
    descTr.className='coll-desc-row';
    const sel = Object.entries(COLL_STATUT_STYLE).map(([k,v])=>`<option value="${k}" ${item.statut===k?'selected':''}>${v.label}</option>`).join('');
    const cacheDescHtml = (item.statut === 'planque' && item.cacheDesc)
      ? `<div style="margin-top:0.3rem;font-size:0.78rem;color:#8ba8c4;font-style:italic;">📍 ${item.cacheDesc}</div>` : '';
    const perduNoteHtml = (item.statut === 'perdu' && item.perduNote)
      ? `<div style="margin-top:0.3rem;font-size:0.78rem;color:#c07070;font-style:italic;">🔍 ${item.perduNote}</div>` : '';
    const donneNoteHtml = (item.statut === 'donné' && item.donneNote)
      ? `<div style="margin-top:0.3rem;font-size:0.78rem;color:var(--SUB);font-style:italic;">↪ ${item.donneNote}</div>` : '';
    const descContent = item.desc || '';
    descTr.innerHTML=`
      <td></td>
      <td colspan="3" class="coll-desc-cell">
        <div class="coll-desc-text" data-coll-field="desc" data-coll-idx="${i}" contenteditable="true" spellcheck="false" title="Cliquer pour modifier la description" style="outline:none;cursor:text;min-height:1.6em;transition:background 0.15s;">${descContent || '<em style="opacity:0.4">Cliquer pour ajouter une description…</em>'}</div>
        ${cacheDescHtml}${perduNoteHtml}${donneNoteHtml}
        <div style="display:flex;gap:0.5rem;margin-top:0.45rem;flex-wrap:wrap;align-items:center;">
          <select class="coll-select" onchange="updateCollStatut(${i},this.value)" style="font-family:'Crimson Text',serif;font-size:0.8rem;padding:0.2rem 0.4rem;border-radius:1px;cursor:pointer;">${sel}</select>
        </div>
      </td>
    `;
    tbody.appendChild(descTr);

    // Édition inline desc (contenteditable)
    const descEl = descTr.querySelector('[data-coll-field="desc"]');
    descEl.addEventListener('focus', ()=>{ if(!item.desc) descEl.innerHTML=''; descEl.style.background='rgba(184,146,42,0.08)'; });
    descEl.addEventListener('blur', ()=>{
      descEl.style.background='';
      const val = descEl.innerText.trim();
      state.collection[i].desc = val;
      if(!val) descEl.innerHTML='<em style="opacity:0.4">Cliquer pour ajouter une description…</em>';
      save();
    });
  });

  // Édition inline name et valReal
  tbody.querySelectorAll('[data-coll-field]:not([contenteditable])').forEach(el => {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      const field = el.dataset.collField;
      const idx = parseInt(el.dataset.collIdx);
      const current = state.collection[idx][field] || '';
      const inp = document.createElement('input');
      inp.value = current === '—' ? '' : current;
      inp.style.cssText = `background:rgba(184,146,42,0.1);border:1px solid rgba(184,146,42,0.4);color:var(--parchment);font-family:'Crimson Text',serif;font-size:0.85rem;padding:0.15rem 0.3rem;border-radius:1px;width:${field==='valReal'?'80px':'160px'};outline:none;`;
      el.replaceWith(inp);
      inp.focus(); inp.select();
      function commit() {
        const val = inp.value.trim() || '—';
        state.collection[idx][field] = val;
        el.textContent = val;
        inp.replaceWith(el);
        save(); renderCollStats();
      }
      inp.addEventListener('blur', commit);
      inp.addEventListener('keydown', e=>{ if(e.key==='Enter'){e.preventDefault();commit();} if(e.key==='Escape'){inp.value=current;commit();} });
    });
  });

  renderCollStats();
}

function renderCollStats() {
  const bar = document.getElementById('coll-stats-bar'); if(!bar||!state.collection) return;
  const total=state.collection.length;
  if(!total){ bar.innerHTML='<span style="font-style:italic;opacity:0.4;font-size:0.78rem;">Aucun objet pour l\'instant.</span>'; return; }
  const posses = state.collection.filter(i=>i.statut==='possédé').length;
  const sac    = state.collection.filter(i=>i.statut==='sac').length;
  const planque= state.collection.filter(i=>i.statut==='planque').length;
  const perdu  = state.collection.filter(i=>i.statut==='perdu').length;
  const avgStars=(state.collection.reduce((a,i)=>a+(i.stars||0),0)/total).toFixed(1);

  // Valeur totale réelle
  let totalPA = 0;
  state.collection.forEach(item => {
    if (!item.valReal || item.valReal === '—') return;
    const m = item.valReal.match(/(\d+(?:[.,]\d+)?)\s*(PA|PO|PC)?/i);
    if (m) {
      let val = parseFloat(m[1].replace(',','.'));
      const unit = (m[2]||'PA').toUpperCase();
      if (unit === 'PO') val *= 20;
      else if (unit === 'PC') val /= 12;
      totalPA += val;
    }
  });
  const totalStr = totalPA > 0 ? (totalPA % 1 === 0 ? totalPA + ' PA' : totalPA.toFixed(1) + ' PA') : '—';
  const avgLabel = COLL_LABELS[Math.round(parseFloat(avgStars))] || '';
  const allInestimable = total > 0 && state.collection.every(i => (i.stars||0) === 5);
  const fmBonusHtml = allInestimable ? `
    <div style="margin-top:0.6rem;padding:0.35rem 0.65rem;border:1px solid rgba(103,78,167,0.35);border-radius:2px;background:rgba(103,78,167,0.07);display:inline-flex;align-items:center;gap:0.45rem;">
      <span style="color:#674EA7;font-size:0.72rem;">✦</span>
      <span style="font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.1em;color:#8a7abf;">FM +5 permanent</span>
      <span style="font-size:0.7rem;color:var(--SUB);font-style:italic;">— chaque objet est Inestimable</span>
    </div>` : '';

  bar.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:0.3rem;">
      <span style="font-style:italic;opacity:0.55;font-size:0.78rem;">${total} objet${total>1?'s':''} dans la collection</span>
      <div style="display:flex;gap:0.4rem;flex-wrap:wrap;align-items:center;">
        ${posses?`<span class="coll-stat-pill" style="color:var(--GRN);">${posses} sur soi</span>`:''}
        ${sac?`<span class="coll-stat-pill" style="color:var(--acc2);">${sac} dans le sac</span>`:''}
        ${planque?`<span class="coll-stat-pill" style="color:#8ba8c4;">${planque} en cache</span>`:''}
        ${perdu?`<span class="coll-stat-pill" style="color:#c07070;">${perdu} perdu${perdu>1?'s':''}</span>`:''}
        ${avgLabel?`<span class="coll-stat-pill">${avgLabel} en moyenne</span>`:''}
      </div>
      ${fmBonusHtml}
    </div>
    <div style="text-align:right;min-width:90px;">
      <div style="font-size:0.58rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--GLD);opacity:0.6;margin-bottom:0.15rem;font-family:'Cinzel',serif;">Total</div>
      <div style="font-family:'Cinzel',serif;font-size:1rem;color:var(--GLD);font-weight:600;">${totalStr}</div>
    </div>
  `;
}

function renderCollNewStars() {
  const c = document.getElementById('coll-new-stars'); if(!c) return;
  c.innerHTML='';
  for(let i=1;i<=5;i++){
    const s=document.createElement('div');
    s.className='coll-star'+(i<=collNewStars?' on':'');
    s.onclick=()=>{ collNewStars=i; renderCollNewStars(); };
    c.appendChild(s);
  }
}

function updateCollStars(idx,val) { state.collection[idx].stars=val; renderCollection(); save(); }

function updateCollStatut(idx, val) {
  state.collection[idx].statut = val;
  if (val === 'planque') {
    const cd = prompt('Description de la cache :', state.collection[idx].cacheDesc || '');
    if (cd !== null) state.collection[idx].cacheDesc = cd.trim();
  } else if (val === 'perdu') {
    const pn = prompt('Où / comment — pour le retrouver :', state.collection[idx].perduNote || '');
    if (pn !== null) state.collection[idx].perduNote = pn.trim();
  } else if (val === 'donné') {
    const dn = prompt('À qui — et pourquoi ça le ronge :', state.collection[idx].donneNote || '');
    if (dn !== null) state.collection[idx].donneNote = dn.trim();
  }
  renderCollection(); save();
}
