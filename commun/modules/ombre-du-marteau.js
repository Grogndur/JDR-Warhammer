/* L'Ombre du Marteau — mécanique de Cade Mitchell
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis cade.html, code d'origine conservé. */
/* ── portée propre au module ── */
(function () {


var traumaData = {
  triggerActif: false,
  jalons: [false, false, false, false],
  surmonte: false,
  journal: '',
  lastRoll: 0
};

var TRAUMA_JALONS = [
  { titre:'Tenir', desc:'Rester au combat face \u00e0 un nain combattant ou un porteur de marteau lourd, malgr\u00e9 un test de Calme rat\u00e9 \u2014 sans fuir, sans c\u00e9der \u00e0 la pulsion.' },
  { titre:'Avouer', desc:'Mettre des mots sur la peur \u2014 admettre la s\u00e9quelle \u00e0 un autre PJ plut\u00f4t que de la cacher derri\u00e8re le sang-froid habituel.' },
  { titre:'Agir', desc:'Accomplir une action d\u00e9cisive et lucide en pr\u00e9sence du d\u00e9clencheur actif \u2014 une r\u00e9ussite obtenue malgr\u00e9 l\u2019Ombre, pas \u00e0 c\u00f4t\u00e9 d\u2019elle.' },
  { titre:'Confronter', desc:'Revenir volontairement vers ce genre de menace, ou vivre un moment de bascule d\u00e9fini avec le MJ \u2014 regarder le marteau en face.' }
];

var TRAUMA_ROLL_TABLE = [
  'La main de tir tremble : \u221210 \u00e0 la prochaine action de pr\u00e9cision.',
  'Recul involontaire d\u2019un pas : d\u00e9savantage de position mineur d\u00e9crit par le MJ.',
  'La m\u00e2choire se serre : impossible de parler pos\u00e9ment ce tour-ci.',
  'Fixation : Cade ne peut viser que la source du d\u00e9clencheur ce tour.',
  'La haine d\u00e9borde : prochaine attaque plus brutale que n\u00e9cessaire \u2014 cons\u00e9quence au MJ.',
  'Souvenir net : l\u2019instant du marteau resurgit. Pas de malus \u2014 pur jeu de r\u00f4le.'
];

function traumaLoad() {
  var raw = MODULES.lire("ombre-du-marteau");
  if(raw) { try {
    var d = JSON.parse(raw);
    if(typeof d.triggerActif === 'boolean') traumaData.triggerActif = d.triggerActif;
    if(Array.isArray(d.jalons) && d.jalons.length === 4) traumaData.jalons = d.jalons;
    if(typeof d.surmonte === 'boolean') traumaData.surmonte = d.surmonte;
    if(typeof d.journal === 'string') traumaData.journal = d.journal;
  } catch(e){} }
  traumaRender();
}

function traumaSave() { MODULES.ecrire("ombre-du-marteau", JSON.stringify(traumaData)); }

function traumaRender() {
  traumaRenderTrigger();
  traumaRenderJalons();
  var jrn = document.getElementById('trauma-journal');
  if(jrn) jrn.value = traumaData.journal || '';
  var card = document.getElementById('trauma-card');
  if(card) card.classList.toggle('surmonte', traumaData.surmonte);
}

function traumaRenderTrigger() {
  var track = document.getElementById('trauma-switch-track');
  var label = document.getElementById('trauma-switch-label');
  var rollBtn = document.getElementById('trauma-roll-btn');
  if(track) track.classList.toggle('on', traumaData.triggerActif);
  if(label) {
    label.classList.toggle('on', traumaData.triggerActif);
    label.textContent = traumaData.triggerActif ? 'D\u00e9clencheur actif' : 'D\u00e9clencheur dormant';
  }
  if(rollBtn) rollBtn.disabled = !traumaData.triggerActif;
}

function traumaToggleTrigger() {
  traumaData.triggerActif = !traumaData.triggerActif;
  traumaSave();
  traumaRenderTrigger();
}

function traumaRoll() {
  if(!traumaData.triggerActif) return;
  var r = Math.floor(Math.random() * 6) + 1;
  traumaData.lastRoll = r;
  var box = document.getElementById('trauma-roll-result');
  if(box) {
    box.innerHTML = '<span class="trauma-roll-die">' + r + '</span>' + TRAUMA_ROLL_TABLE[r-1];
    box.classList.add('show');
    box.classList.remove('flash');
    void box.offsetWidth;
    box.classList.add('flash');
  }
}

function traumaRenderJalons() {
  var list = document.getElementById('trauma-jalons-list');
  if(!list) return;
  list.innerHTML = '';
  var done = 0;
  TRAUMA_JALONS.forEach(function(j, i) {
    var checked = !!traumaData.jalons[i];
    if(checked) done++;
    var row = document.createElement('div');
    row.className = 'jalon-row';
    row.innerHTML =
      '<div class="jalon-check' + (checked ? ' done' : '') + '" onclick="traumaToggleJalon(' + i + ')">' + (checked ? '\u2713' : '') + '</div>' +
      '<div class="jalon-text' + (checked ? ' done' : '') + '"><b>' + j.titre + '</b>' + j.desc + '</div>';
    list.appendChild(row);
  });
  var fill = document.getElementById('trauma-progress-fill');
  var lbl = document.getElementById('trauma-progress-label');
  if(fill) fill.style.width = (done / 4 * 100) + '%';
  if(lbl) lbl.textContent = done + ' / 4 jalon' + (done > 1 ? 's' : '') + ' franchi' + (done > 1 ? 's' : '');
  var btn = document.getElementById('trauma-surmonter-btn');
  var banner = document.getElementById('trauma-surmonte-banner');
  if(traumaData.surmonte) {
    if(btn) {
      var b = document.createElement('div');
      b.className = 'trauma-surmonte-banner';
      b.id = 'trauma-surmonte-banner';
      b.innerHTML = '\u25c6 L\u2019Ombre est surmont\u00e9e. Cade a regard\u00e9 le marteau en face \u2014 et le Destin br\u00fbl\u00e9 lui est revenu.';
      btn.parentNode.replaceChild(b, btn);
    }
  } else {
    if(banner) {
      var nb = document.createElement('button');
      nb.className = 'trauma-surmonter-btn';
      nb.id = 'trauma-surmonter-btn';
      nb.setAttribute('onclick', 'traumaSurmonter()');
      nb.textContent = 'Surmonter \u2014 regagner 1 point de Destin';
      banner.parentNode.replaceChild(nb, banner);
      banner = null;
      btn = nb;
    }
    if(btn) btn.disabled = (done < 4);
  }
}

function traumaToggleJalon(i) {
  if(traumaData.surmonte) return;
  traumaData.jalons[i] = !traumaData.jalons[i];
  traumaSave();
  traumaRenderJalons();
}

function traumaSurmonter() {
  if(traumaData.surmonte) return;
  var done = traumaData.jalons.filter(function(x){ return x; }).length;
  if(done < 4) return;
  if(!confirm('Valider la r\u00e9silience de Cade ? Elle regagne 1 point de Destin et l\u2019Ombre du Marteau s\u2019\u00e9teint.')) return;
  traumaData.surmonte = true;
  traumaData.triggerActif = false;
  traumaSave();
  if(state.destin === undefined) state.destin = 1;
  if(state.chance === undefined) state.chance = 0;
  state.destin = state.destin + 1;
  state.chance = (parseInt(state.chance)||0) + 1;
  save();
  renderFortune();
  traumaRender();
}

function traumaJournalSave() {
  var jrn = document.getElementById('trauma-journal');
  if(jrn) { traumaData.journal = jrn.value; traumaSave(); }
}


/* Rendues accessibles aux boutons de la page. */
  window.traumaLoad = traumaLoad;
  window.traumaSave = traumaSave;
  window.traumaRender = traumaRender;
  window.traumaRenderTrigger = traumaRenderTrigger;
  window.traumaToggleTrigger = traumaToggleTrigger;
  window.traumaRoll = traumaRoll;
  window.traumaRenderJalons = traumaRenderJalons;
  window.traumaToggleJalon = traumaToggleJalon;
  window.traumaSurmonter = traumaSurmonter;
  window.traumaJournalSave = traumaJournalSave;

/* Enregistrement en dernier : le module doit être entièrement défini
   avant que la fiche ne l'affiche et ne le démarre. */
  MODULES.enregistrer({
    id: "ombre-du-marteau",
    titre: "L'Ombre du Marteau",
    css: "[data-module=\"ombre-du-marteau\"] { --VIO2:#8aaccc; }\n.trauma-card { background:rgba(8,8,12,0.72); border:1px solid rgba(139,26,26,0.3); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.trauma-card.surmonte { border-color:rgba(94,160,80,0.4); }\n.trauma-epigraph { font-size:0.8rem; color:var(--SUB); font-style:italic; font-family:\"Crimson Text\",serif; margin-bottom:0.9rem; line-height:1.5; border-left:2px solid rgba(139,26,26,0.4); padding-left:0.65rem; }\n.trauma-card.surmonte .trauma-epigraph { border-left-color:rgba(94,160,80,0.5); }\n.trauma-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }\n.trauma-block { background:rgba(139,26,26,0.04); border:1px solid rgba(139,26,26,0.14); border-radius:2px; padding:0.8rem; }\n.trauma-block-title { font-family:\"Cinzel\",serif; font-size:0.66rem; letter-spacing:0.13em; text-transform:uppercase; color:#c0392b; margin-bottom:0.2rem; }\n.trauma-block-sub { font-size:0.72rem; color:var(--SUB); font-style:italic; line-height:1.45; margin-bottom:0.6rem; }\n.trauma-trigger-row { display:flex; align-items:center; gap:0.6rem; margin-bottom:0.55rem; flex-wrap:wrap; }\n.trauma-switch { display:inline-flex; align-items:center; gap:0.45rem; cursor:pointer; user-select:none; }\n.trauma-switch-track { width:42px; height:21px; border-radius:11px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.13); position:relative; transition:all 0.2s; flex-shrink:0; }\n.trauma-switch-track.on { background:rgba(139,26,26,0.4); border-color:rgba(139,26,26,0.7); }\n.trauma-switch-knob { width:15px; height:15px; border-radius:50%; background:var(--SUB); position:absolute; top:2px; left:2px; transition:all 0.2s; }\n.trauma-switch-track.on .trauma-switch-knob { left:23px; background:#e05050; }\n.trauma-switch-label { font-family:\"Cinzel\",serif; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.trauma-switch-label.on { color:#e05050; }\n.trauma-test-line { font-size:0.74rem; color:var(--parchment-dark); line-height:1.55; }\n.trauma-test-line b { color:#c0392b; font-weight:600; }\n.trauma-roll-btn { font-family:\"Cinzel\",serif; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.35rem 0.7rem; border-radius:2px; cursor:pointer; transition:all 0.15s; background:rgba(139,26,26,0.14); border:1px solid rgba(139,26,26,0.4); color:#e07070; margin-top:0.55rem; }\n.trauma-roll-btn:hover { background:rgba(139,26,26,0.28); }\n.trauma-roll-btn:disabled { opacity:0.35; cursor:not-allowed; }\n.trauma-roll-result { margin-top:0.55rem; padding:0.5rem 0.6rem; background:rgba(139,26,26,0.07); border:1px solid rgba(139,26,26,0.2); border-radius:2px; font-size:0.8rem; color:var(--parchment-dark); line-height:1.45; display:none; }\n.trauma-roll-result.show { display:block; }\n.trauma-roll-result.flash { animation:traumaFlash 0.5s ease; }\n.trauma-roll-die { font-family:\"Cinzel\",serif; font-size:1rem; font-weight:700; color:#e05050; margin-right:0.4rem; }\n.trauma-table { width:100%; border-collapse:collapse; font-size:0.74rem; margin-top:0.5rem; }\n.trauma-table td { padding:0.22rem 0.4rem; border-bottom:1px solid rgba(255,255,255,0.04); color:var(--parchment-dark); vertical-align:top; line-height:1.4; }\n.trauma-table td:first-child { font-family:\"Cinzel\",serif; color:#c0392b; width:24px; text-align:center; font-weight:700; }\n.trauma-table tr:last-child td { border-bottom:none; }\n.trauma-progress { margin-top:0.7rem; }\n.trauma-progress-bar { height:7px; background:rgba(8,8,12,0.7); border:1px solid rgba(255,255,255,0.08); border-radius:4px; overflow:hidden; }\n.trauma-progress-fill { height:100%; background:linear-gradient(90deg, rgba(139,26,26,0.6), rgba(94,160,80,0.7)); transition:width 0.4s ease; }\n.trauma-progress-label { font-size:0.68rem; color:var(--SUB); font-style:italic; margin-top:0.3rem; text-align:center; }\n.trauma-surmonter-btn { width:100%; margin-top:0.7rem; font-family:\"Cinzel\",serif; font-size:0.68rem; letter-spacing:0.13em; text-transform:uppercase; padding:0.6rem; border-radius:2px; cursor:pointer; transition:all 0.2s; background:rgba(94,160,80,0.18); border:1px solid rgba(94,160,80,0.5); color:#8ab870; }\n.trauma-surmonter-btn:hover { background:rgba(94,160,80,0.32); }\n.trauma-surmonter-btn:disabled { opacity:0.3; cursor:not-allowed; }\n.trauma-surmonte-banner { margin-top:0.7rem; padding:0.65rem; background:rgba(94,160,80,0.1); border:1px solid rgba(94,160,80,0.35); border-radius:2px; font-size:0.8rem; color:#8ab870; font-style:italic; text-align:center; line-height:1.5; }\n.trauma-journal { width:100%; background:rgba(139,26,26,0.05); border:1px solid rgba(139,26,26,0.16); color:var(--parchment); font-family:\"Crimson Text\",serif; font-size:0.85rem; padding:0.4rem 0.55rem; border-radius:1px; resize:vertical; min-height:60px; line-height:1.5; }\n.trauma-journal:focus { outline:none; border-color:rgba(139,26,26,0.45); }\n/* Règles reprises de cade.html : classes employées par le bloc\n   mais absentes de la fiche commune. */\n.dossier-section-title { font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--VIO2); opacity:0.75; margin-bottom:0.28rem; display:block; }\n",
    html: "<div class=\"trauma-card\" id=\"trauma-card\">\n    <div class=\"card-title red\" style=\"margin-bottom:0.45rem;\" id=\"trauma-title\">L&#x2019;Ombre du Marteau\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">&#x2014; s&#xE9;quelle d&#x2019;un Destin br&#xFB;l&#xE9;</span>\n    </div>\n    <div class=\"trauma-epigraph\" id=\"trauma-epigraph\">Le marteau est tomb&#xE9;. Vorrn l&#x2019;a frapp&#xE9;e en pleine t&#xEA;te &#x2014; sec, net, d&#xE9;finitif. Cade aurait d&#xFB; mourir l&#xE0;. Le Destin en a d&#xE9;cid&#xE9; autrement&#x202F;: elle est debout, indemne. Mais quelque chose en elle a pli&#xE9; ce jour-l&#xE0;, et ne s&#x2019;est pas tout &#xE0; fait redress&#xE9;.</div>\n\n    <div class=\"trauma-grid\">\n\n      <!-- LE STIGMATE -->\n      <div class=\"trauma-block\">\n        <div class=\"trauma-block-title\">Le Stigmate</div>\n        <div class=\"trauma-block-sub\">Face &#xE0; un nain combattant lourd, un marteau de guerre, le fracas d&#x2019;une arme &#xE0; deux mains &#x2014; ce n&#x2019;est pas que de la peur. C&#x2019;est une r&#xE9;action &#xE9;pidermique m&#xEA;l&#xE9;e d&#x2019;une haine froide qu&#x2019;il faut contenir.</div>\n        <div class=\"trauma-trigger-row\">\n          <div class=\"trauma-switch\" onclick=\"traumaToggleTrigger()\">\n            <div class=\"trauma-switch-track\" id=\"trauma-switch-track\"><div class=\"trauma-switch-knob\"></div></div>\n            <span class=\"trauma-switch-label\" id=\"trauma-switch-label\">D&#xE9;clencheur dormant</span>\n          </div>\n        </div>\n        <div class=\"trauma-test-line\">Quand le MJ active le d&#xE9;clencheur, Cade teste <b>Calme</b>. &#xC9;chec&#x202F;: le stigmate se manifeste &#x2014; recul, main qui tremble, ou pulsion agressive &#xE0; ma&#xEE;triser. Un seul test par sc&#xE8;ne concern&#xE9;e.</div>\n        <button class=\"trauma-roll-btn\" id=\"trauma-roll-btn\" onclick=\"traumaRoll()\">Lancer 1d6 &#x2014; manifestation</button>\n        <div class=\"trauma-roll-result\" id=\"trauma-roll-result\"></div>\n        <table class=\"trauma-table\">\n          <tr><td>1</td><td>La main de tir tremble&#x202F;: &#x2212;10 &#xE0; la prochaine action de pr&#xE9;cision (tir, crochetage).</td></tr>\n          <tr><td>2</td><td>Recul involontaire d&#x2019;un pas&#x202F;: Cade c&#xE8;de l&#x2019;initiative de position, le MJ d&#xE9;crit un d&#xE9;savantage mineur.</td></tr>\n          <tr><td>3</td><td>La m&#xE2;choire se serre&#x202F;: impossible de parler posément ce tour-ci (n&#xE9;gociation, commandement compromis).</td></tr>\n          <tr><td>4</td><td>Fixation&#x202F;: Cade ne peut viser que la source du d&#xE9;clencheur ce tour, au m&#xE9;pris des cibles plus urgentes.</td></tr>\n          <tr><td>5</td><td>La haine d&#xE9;borde&#x202F;: sa prochaine attaque contre la menace est plus brutale que n&#xE9;cessaire &#x2014; cons&#xE9;quence narrative au MJ.</td></tr>\n          <tr><td>6</td><td>Souvenir net&#x202F;: l&#x2019;instant du marteau resurgit. Aucun malus chiffr&#xE9; &#x2014; mais Cade perd un instant le fil, pur moment de jeu de r&#xF4;le.</td></tr>\n        </table>\n      </div>\n\n      <!-- LE CHEMIN DE LA RÉSILIENCE -->\n      <div class=\"trauma-block\">\n        <div class=\"trauma-block-title\">Le Chemin de la R&#xE9;silience</div>\n        <div class=\"trauma-block-sub\">On ne surmonte pas un trauma en l&#x2019;&#xE9;vitant. Chaque jalon se valide en <i>affrontant</i> le stigmate en jeu &#x2014; c&#x2019;est le MJ qui le coche. Les quatre faits&#x202F;: Cade regagne le point de Destin br&#xFB;l&#xE9;.</div>\n        <div id=\"trauma-jalons-list\"></div>\n        <div class=\"trauma-progress\">\n          <div class=\"trauma-progress-bar\"><div class=\"trauma-progress-fill\" id=\"trauma-progress-fill\" style=\"width:0%;\"></div></div>\n          <div class=\"trauma-progress-label\" id=\"trauma-progress-label\">0 / 4 jalon franchi</div>\n        </div>\n        <button class=\"trauma-surmonter-btn\" id=\"trauma-surmonter-btn\" onclick=\"traumaSurmonter()\" disabled>Surmonter &#x2014; regagner 1 point de Destin</button>\n      </div>\n\n    </div>\n\n    <div style=\"margin-top:0.9rem;\">\n      <span class=\"dossier-section-title\" style=\"color:#c0392b;opacity:0.85;\">Journal du trauma</span>\n      <textarea class=\"trauma-journal\" id=\"trauma-journal\" placeholder=\"Comment l&#x2019;Ombre se manifeste en jeu, les moments-cl&#xE9;s, les jalons franchis&#x2026;\" oninput=\"traumaJournalSave()\"></textarea>\n    </div>\n  </div>",
    demarrer: function () { traumaLoad(); }
  });
})();
