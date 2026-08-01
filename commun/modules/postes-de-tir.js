/* Postes de tir, Souffle et Carquois — mécanique de Kantagoran Effendyl
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis kantagoran.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "postes-de-tir",
    titre: "Postes de tir, Souffle et Carquois",
    css: "/* Couleur d'accent propre au personnage, reprise de sa fiche d'origine. */\n[data-module=\"postes-de-tir\"] { --VIO2:#7ab868; }\n.visee-card { background:rgba(8,8,12,0.7); border:1px solid rgba(74,122,58,0.25); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.visee-epigraph { font-size:0.78rem; color:var(--SUB); font-style:italic; font-family:\"Crimson Text\",serif; margin-bottom:0.9rem; line-height:1.5; border-left:2px solid rgba(74,122,58,0.3); padding-left:0.6rem; }\n.visee-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }\n.visee-block { background:rgba(74,122,58,0.04); border:1px solid rgba(74,122,58,0.13); border-radius:2px; padding:0.8rem; }\n.visee-block-title { font-family:\"Cinzel\",serif; font-size:0.66rem; letter-spacing:0.13em; text-transform:uppercase; color:var(--VIO2); margin-bottom:0.2rem; }\n.visee-block-sub { font-size:0.7rem; color:var(--SUB); font-style:italic; line-height:1.45; margin-bottom:0.65rem; }\n.visee-list-empty { font-size:0.78rem; color:var(--SUB); font-style:italic; padding:0.35rem 0; }\n.visee-del { color:rgba(139,26,26,0.4); cursor:pointer; font-size:0.72rem; flex-shrink:0; transition:color 0.15s; padding:0.1rem; }\n.visee-del:hover { color:#e08080; }\n.visee-add-form { display:none; margin-top:0.55rem; background:rgba(74,122,58,0.05); border:1px solid rgba(74,122,58,0.15); border-radius:2px; padding:0.6rem; flex-direction:column; gap:0.38rem; }\n.visee-add-form.visible { display:flex; }\n.visee-add-form input, .visee-add-form textarea { background:rgba(74,122,58,0.07); border:1px solid rgba(74,122,58,0.2); color:var(--parchment); font-family:\"Crimson Text\",serif; font-size:0.85rem; padding:0.28rem 0.46rem; border-radius:1px; width:100%; }\n.visee-add-form input:focus, .visee-add-form textarea:focus { outline:none; border-color:rgba(74,122,58,0.5); }\n.visee-add-form textarea { resize:vertical; min-height:42px; }\n.visee-add-form .form-row { display:flex; gap:0.4rem; align-items:center; }\n.visee-add-form .form-row input { flex:1; }\n.visee-add-form input.qty-input { width:60px; flex:0 0 60px; text-align:center; }\n/* Règles reprises de kantagoran.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n/* Souffle — jauge */\n  .souffle-row { display:flex; align-items:center; gap:0.7rem; margin-bottom:0.55rem; }\n.souffle-pips { display:flex; gap:0.4rem; }\n.souffle-ctrl { display:flex; gap:0.35rem; }\n.souffle-btn { width:28px; height:28px; border-radius:2px; font-size:1.05rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.15s; background:rgba(94,128,79,0.15); border:1px solid rgba(94,128,79,0.35); color:var(--VIO2); }\n.souffle-btn:hover { background:rgba(94,128,79,0.32); }\n.souffle-uses { font-size:0.72rem; color:var(--parchment-dark); line-height:1.6; }\n.souffle-uses b { color:var(--VIO2); font-weight:600; }\n.btn-add-vio { background:rgba(74,122,58,0.12); border:1px solid rgba(74,122,58,0.4); color:var(--VIO2); }\n.btn-add-vio:hover { background:rgba(74,122,58,0.25); }\n",
    html: "<div class=\"visee-card\">\n    <div class=\"card-title vio\" style=\"margin-bottom:0.5rem;\">L&#x2019;&#x152;il et le Souffle\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">&#x2014; discipline du tir d&#x2019;&#xE9;lite</span>\n    </div>\n    <div class=\"visee-epigraph\">&#xAB;&#xA0;On ne tire pas une fl&#xE8;che. On la laisse partir.&#xA0;&#xBB; &#x2014; La pr&#xE9;cision n&#x2019;est pas un don&#x202F;: c&#x2019;est de la pr&#xE9;paration, du positionnement et de la patience.</div>\n\n    <div class=\"visee-grid\">\n\n      <!-- SOUFFLE -->\n      <div class=\"visee-block\">\n        <div class=\"visee-block-title\">Le Souffle</div>\n        <div class=\"visee-block-sub\">Gagne 1 Souffle en sacrifiant ton D&#xE9;placement du tour pour te stabiliser et viser (action sur place). Maximum 3. D&#xE9;pense-les pour fiabiliser un tir.</div>\n        <div class=\"souffle-row\">\n          <div class=\"souffle-pips\" id=\"souffle-pips\"></div>\n          <div class=\"souffle-ctrl\">\n            <button class=\"souffle-btn\" onclick=\"souffleChange(-1)\" title=\"D&#xE9;penser un Souffle\">&#x2212;</button>\n            <button class=\"souffle-btn\" onclick=\"souffleChange(1)\" title=\"Gagner un Souffle\">+</button>\n          </div>\n        </div>\n        <div class=\"souffle-uses\">\n          Dépense 1 Souffle pour&#x202F;:<br>\n          &#x2022; <b>Annuler</b> un cran de malus de portée ou de visibilité<br>\n          &#x2022; <b>Ignorer</b> la pénalité de cible en mouvement<br>\n          &#x2022; <b>Relancer</b> le dé de localisation d&#x2019;un tir réussi<br>\n          Dépense 2 Souffles&#x202F;: transformer un succès simple en <b>Critique</b> sur un tir préparé.\n        </div>\n      </div>\n\n      <!-- MARQUES DE CHASSE -->\n      <div class=\"visee-block\">\n        <div class=\"visee-block-title\">Marques de chasse</div>\n        <div class=\"visee-block-sub\">Passe une action à observer une cible pour la marquer (max 2). Contre une cible marquée&#x202F;: +10 au tir tant qu&#x2019;elle reste en vue. Le MJ révèle une faille concrète.</div>\n        <div id=\"marques-list\"></div>\n      </div>\n\n      <!-- POSTES DE TIR -->\n      <div class=\"visee-block\">\n        <div class=\"visee-block-title\">Postes de tir &#x2014; lecture du terrain</div>\n        <div class=\"visee-block-sub\">Carnet des points de tir avantageux repérés. En les déclarant, Kantagoran obtient un bénéfice de positionnement&#x202F;: couvert, surplomb, ligne de retraite.</div>\n        <div id=\"postes-list\"></div>\n        <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.5rem;\" onclick=\"viseeToggleForm('poste')\">+ Noter un poste</button>\n        <div class=\"visee-add-form\" id=\"form-poste\">\n          <input id=\"poste-name\" placeholder=\"Lieu / repère &#x2014; ex&#x202F;: Crête au-dessus du gué\" />\n          <textarea id=\"poste-desc\" placeholder=\"Bénéfice &#x2014; ex&#x202F;: surplomb (+10 tir), couvert total, deux lignes de retraite\"></textarea>\n          <div class=\"form-row\">\n            <button class=\"btn-add btn-add-vio\" onclick=\"posteAdd()\">Ajouter</button>\n            <button class=\"btn-cancel\" onclick=\"viseeToggleForm('poste')\">Annuler</button>\n          </div>\n        </div>\n      </div>\n\n      <!-- CARQUOIS -->\n      <div class=\"visee-block\">\n        <div class=\"visee-block-title\">Le Carquois &#x2014; flèches spéciales</div>\n        <div class=\"visee-block-sub\">Munitions préparées, en quantité limitée. À usage unique&#x202F;: ajuste le compteur après chaque tir.</div>\n        <div id=\"carquois-list\"></div>\n        <button class=\"btn-add btn-add-vio\" style=\"margin-top:0.5rem;\" onclick=\"viseeToggleForm('carquois')\">+ Ajouter un type de fl&#xE8;che</button>\n        <div class=\"visee-add-form\" id=\"form-carquois\">\n          <input id=\"carquois-name\" placeholder=\"Type &#x2014; ex&#x202F;: Fl&#xE8;che perce-armure\" />\n          <textarea id=\"carquois-effet\" placeholder=\"Effet &#x2014; ex&#x202F;: ignore 2 points de PA / siffle pour signaler / fumée\"></textarea>\n          <div class=\"form-row\">\n            <input class=\"qty-input\" id=\"carquois-qty\" type=\"number\" min=\"0\" value=\"3\" placeholder=\"Qté\" />\n            <button class=\"btn-add btn-add-vio\" onclick=\"carquoisAdd()\">Ajouter</button>\n            <button class=\"btn-cancel\" onclick=\"viseeToggleForm('carquois')\">Annuler</button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>",
    demarrer: function () { viseeLoad(); }
  });
})();

let viseeData = {
  souffle: 0,
  marques: [ { name:"", faille:"" }, { name:"", faille:"" } ],
  postes: [],
  carquois: []
};

function carquoisAdd() {
  const nameEl = document.getElementById("carquois-name");
  const effetEl = document.getElementById("carquois-effet");
  const qtyEl = document.getElementById("carquois-qty");
  if(!nameEl || !nameEl.value.trim()) return;
  viseeData.carquois.push({
    name: nameEl.value.trim(),
    effet: effetEl ? effetEl.value.trim() : "",
    qty: qtyEl ? (parseInt(qtyEl.value) || 0) : 0
  });
  nameEl.value = "";
  if(effetEl) effetEl.value = "";
  if(qtyEl) qtyEl.value = "3";
  viseeSave();
  viseeRenderCarquois();
  viseeToggleForm("carquois");
}

function carquoisQty(i, delta) {
  if(!viseeData.carquois[i]) return;
  viseeData.carquois[i].qty = Math.max(0, (viseeData.carquois[i].qty || 0) + delta);
  viseeSave();
  viseeRenderCarquois();
}

function carquoisDelete(i) {
  if(confirm("Retirer ce type de flèche ?")) { viseeData.carquois.splice(i,1); viseeSave(); viseeRenderCarquois(); }
}

function souffleChange(delta) {
  const before = viseeData.souffle;
  viseeData.souffle = Math.max(0, Math.min(3, viseeData.souffle + delta));
  viseeSave();
  viseeRenderSouffle();
  if(delta > 0 && viseeData.souffle > before) {
    const pips = document.querySelectorAll("#souffle-pips .souffle-pip");
    const last = pips[viseeData.souffle - 1];
    if(last) { last.classList.add("flash"); setTimeout(function(){ last.classList.remove("flash"); }, 500); }
  }
}

function posteAdd() {
  const nameEl = document.getElementById("poste-name");
  const descEl = document.getElementById("poste-desc");
  if(!nameEl || !nameEl.value.trim()) return;
  viseeData.postes.push({ name:nameEl.value.trim(), desc:descEl ? descEl.value.trim() : "" });
  nameEl.value = "";
  if(descEl) descEl.value = "";
  viseeSave();
  viseeRenderPostes();
  viseeToggleForm("poste");
}

function posteDelete(i) {
  if(confirm("Supprimer ce poste de tir ?")) { viseeData.postes.splice(i,1); viseeSave(); viseeRenderPostes(); }
}

function viseeLoad() {
  const raw = MODULES.lire("postes-de-tir");
  if(raw) try {
    const d = JSON.parse(raw);
    if(typeof d.souffle === "number") viseeData.souffle = Math.max(0, Math.min(3, d.souffle));
    if(Array.isArray(d.marques) && d.marques.length === 2) viseeData.marques = d.marques;
    if(Array.isArray(d.postes)) viseeData.postes = d.postes;
    if(Array.isArray(d.carquois)) viseeData.carquois = d.carquois;
  } catch(e){}
  viseeRenderSouffle();
  viseeRenderMarques();
  viseeRenderPostes();
  viseeRenderCarquois();
}

function viseeSave() { MODULES.ecrire("postes-de-tir", JSON.stringify(viseeData)); }

function viseeRenderSouffle() {
  const pips = document.getElementById("souffle-pips");
  if(!pips) return;
  pips.innerHTML = "";
  for(let i=0;i<3;i++) {
    const p = document.createElement("div");
    p.className = "souffle-pip" + (i < viseeData.souffle ? " lit" : "");
    pips.appendChild(p);
  }
}

function viseeRenderMarques() {
  const list = document.getElementById("marques-list");
  if(!list) return;
  list.innerHTML = "";
  viseeData.marques.forEach(function(m, i) {
    const active = (m.name || "").trim() !== "";
    const slot = document.createElement("div");
    slot.className = "marque-slot";
    slot.innerHTML =
      "<div class=\"marque-dot" + (active ? " active" : "") + "\"></div>" +
      "<div class=\"marque-fields\">" +
        "<input class=\"marque-name\" placeholder=\"Cible marquée…\" value=\"" + viseeEsc(m.name) + "\" oninput=\"marqueEdit(" + i + ",'name',this.value)\" />" +
        "<input class=\"marque-faille\" placeholder=\"Faille révélée par le MJ…\" value=\"" + viseeEsc(m.faille) + "\" oninput=\"marqueEdit(" + i + ",'faille',this.value)\" />" +
      "</div>" +
      "<span class=\"marque-clear\" onclick=\"marqueClear(" + i + ")\" title=\"Libérer la marque\">✕</span>";
    list.appendChild(slot);
  });
}

function viseeRenderPostes() {
  const list = document.getElementById("postes-list");
  if(!list) return;
  list.innerHTML = "";
  if(!viseeData.postes.length) {
    list.innerHTML = "<div class=\"visee-list-empty\">Aucun poste repéré.</div>";
    return;
  }
  viseeData.postes.forEach(function(p, i) {
    const div = document.createElement("div");
    div.className = "poste-entry";
    div.innerHTML =
      "<div class=\"poste-entry-body\">" +
        "<div class=\"poste-entry-name\">" + viseeEsc(p.name) + "</div>" +
        (p.desc ? "<div class=\"poste-entry-desc\">" + viseeEsc(p.desc) + "</div>" : "") +
      "</div>" +
      "<span class=\"visee-del\" onclick=\"posteDelete(" + i + ")\" title=\"Supprimer\">✕</span>";
    list.appendChild(div);
  });
}

function viseeRenderCarquois() {
  const list = document.getElementById("carquois-list");
  if(!list) return;
  list.innerHTML = "";
  if(!viseeData.carquois.length) {
    list.innerHTML = "<div class=\"visee-list-empty\">Carquois standard uniquement.</div>";
    return;
  }
  viseeData.carquois.forEach(function(c, i) {
    const row = document.createElement("div");
    row.className = "carquois-row";
    const qty = c.qty || 0;
    row.innerHTML =
      "<div class=\"carquois-info\">" +
        "<div class=\"carquois-name\">" + viseeEsc(c.name) + "</div>" +
        (c.effet ? "<div class=\"carquois-effet\">" + viseeEsc(c.effet) + "</div>" : "") +
      "</div>" +
      "<div class=\"carquois-qty\">" +
        "<button class=\"carquois-qbtn\" onclick=\"carquoisQty(" + i + ",-1)\">&#x2212;</button>" +
        "<span class=\"carquois-qval" + (qty === 0 ? " zero" : "") + "\">" + qty + "</span>" +
        "<button class=\"carquois-qbtn\" onclick=\"carquoisQty(" + i + ",1)\">+</button>" +
      "</div>" +
      "<span class=\"visee-del\" onclick=\"carquoisDelete(" + i + ")\" title=\"Supprimer\">✕</span>";
    list.appendChild(row);
  });
}

function viseeToggleForm(kind) {
  const form = document.getElementById("form-" + kind);
  if(form) form.classList.toggle("visible");
}

function viseeEsc(s) {
  return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
