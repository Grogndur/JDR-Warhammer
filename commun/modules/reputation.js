/* La Réputation — mécanique de Reiner Hauer
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis reiner.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "reputation",
    titre: "La Réputation",
    css: "/* Couleur d'accent propre au personnage, reprise de sa fiche d'origine. */\n[data-module=\"reputation\"] { --VIO2:#a07830; }\n.fo-card { background:rgba(9,8,12,0.72); border:1px solid rgba(184,146,42,0.28); border-radius:2px; padding:1.1rem; grid-column:1/-1; }\n.fo-epigraph { font-size:0.78rem; color:var(--SUB); font-style:italic; font-family:\"Crimson Text\",serif; margin-bottom:0.85rem; line-height:1.55; border-left:2px solid rgba(184,146,42,0.35); padding-left:0.65rem; }\n.fo-stats { display:flex; gap:0.7rem; flex-wrap:wrap; margin-bottom:0.85rem; align-items:center; }\n.fo-stat-box { background:rgba(184,146,42,0.07); border:1px solid rgba(184,146,42,0.14); border-radius:2px; padding:0.4rem 0.7rem; text-align:center; }\n.fo-stat-val { font-family:\"Cinzel\",serif; font-size:1.15rem; color:var(--GLD); display:block; }\n.fo-stat-label { font-size:0.57rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.fo-tabs { display:flex; gap:0.35rem; margin-bottom:0.85rem; flex-wrap:wrap; }\n.fo-tab { font-family:\"Cinzel\",serif; font-size:0.6rem; letter-spacing:0.13em; text-transform:uppercase; padding:0.3rem 0.75rem; border-radius:1px; cursor:pointer; transition:all 0.15s; border:1px solid rgba(255,255,255,0.07); background:transparent; color:var(--SUB); }\n.fo-tab.active { border-color:rgba(184,146,42,0.5); color:var(--GLD); background:rgba(184,146,42,0.08); }\n.fo-panel { display:none; }\n.fo-panel.active { display:block; }\n.fo-intro { font-size:0.74rem; color:var(--SUB); font-style:italic; margin-bottom:0.7rem; line-height:1.55; }\n.fo-intro strong { color:var(--GLD); font-style:normal; }\n.fo-empty { font-size:0.82rem; color:var(--SUB); font-style:italic; padding:0.3rem 0; }\n.fo-ent { border:1px solid rgba(255,255,255,0.06); border-radius:2px; margin-bottom:0.5rem; overflow:hidden; transition:border-color 0.18s; border-left:3px solid rgba(184,146,42,0.4); }\n.fo-ent.prospere    { border-left-color:rgba(94,160,80,0.6); }\n.fo-ent.stable      { border-left-color:rgba(184,146,42,0.5); }\n.fo-ent.difficulte  { border-left-color:rgba(192,80,60,0.6); }\n.fo-ent-header { display:flex; align-items:center; gap:0.5rem; padding:0.5rem 0.7rem; cursor:pointer; flex-wrap:wrap; }\n.fo-ent-nom { font-family:\"Cinzel\",serif; font-size:0.84rem; font-weight:600; color:var(--parchment); flex:1; min-width:90px; }\n.fo-ent-lieu { font-size:0.68rem; color:var(--SUB); font-style:italic; }\n.fo-ent-palier-badge { font-family:\"Cinzel\",serif; font-size:0.58rem; letter-spacing:0.06em; text-transform:uppercase; padding:0.08rem 0.4rem; border-radius:1px; border:1px solid rgba(184,146,42,0.4); color:var(--GLD); background:rgba(184,146,42,0.08); white-space:nowrap; }\n.fo-ent-sante-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }\n.fo-ent-sante-dot.prospere   { background:#7ec070; box-shadow:0 0 5px rgba(126,192,112,0.6); }\n.fo-ent-sante-dot.stable     { background:#cda64a; }\n.fo-ent-sante-dot.difficulte { background:#c0503c; box-shadow:0 0 5px rgba(192,80,60,0.5); }\n.fo-ent-expand { font-size:0.6rem; color:var(--SUB); transition:transform 0.15s; }\n.fo-ent.open .fo-ent-expand { transform:rotate(180deg); }\n.fo-ent-body { display:none; padding:0.6rem 0.75rem; border-top:1px solid rgba(255,255,255,0.04); }\n.fo-ent.open .fo-ent-body { display:block; }\n.fo-ent-nature { font-size:0.8rem; color:var(--parchment-dark); font-style:italic; margin-bottom:0.55rem; line-height:1.45; }\n.fo-dev { margin-bottom:0.6rem; }\n.fo-dev-head { display:flex; align-items:baseline; justify-content:space-between; gap:0.5rem; margin-bottom:0.3rem; flex-wrap:wrap; }\n.fo-dev-label { font-family:\"Cinzel\",serif; font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--GLD); opacity:0.85; }\n.fo-dev-palier-nom { font-family:\"Cinzel\",serif; font-size:0.72rem; color:var(--parchment); }\n.fo-dev-track { display:flex; gap:2px; }\n.fo-dev-cran { flex:1; height:12px; border-radius:1px; border:1px solid rgba(255,255,255,0.08); background:rgba(8,8,12,0.6); cursor:pointer; transition:all 0.15s; }\n.fo-dev-cran:hover { border-color:rgba(184,146,42,0.5); }\n.fo-dev-cran.on { background:linear-gradient(180deg, rgba(205,166,74,0.75), rgba(160,120,48,0.6)); border-color:rgba(184,146,42,0.7); }\n.fo-dev-cran.on.empire { background:linear-gradient(180deg, #d8b84a, var(--GLD)); box-shadow:0 0 6px rgba(184,146,42,0.6); }\n.fo-dev-prereq { font-size:0.71rem; color:var(--SUB); font-style:italic; margin-top:0.3rem; line-height:1.45; }\n.fo-dev-prereq .lbl { font-family:\"Cinzel\",serif; font-size:0.56rem; letter-spacing:0.07em; text-transform:uppercase; color:rgba(184,146,42,0.7); font-style:normal; }\n.fo-ctrl-row { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem; }\n.fo-ctrl-label { font-family:\"Cinzel\",serif; font-size:0.58rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.fo-mini-btn { width:22px; height:22px; border-radius:2px; font-size:0.9rem; cursor:pointer; display:flex; align-items:center; justify-content:center; background:rgba(184,146,42,0.1); border:1px solid rgba(184,146,42,0.3); color:var(--GLD); transition:all 0.15s; }\n.fo-mini-btn:hover { background:rgba(184,146,42,0.24); }\n.fo-capital-val { font-family:\"Cinzel\",serif; font-size:0.9rem; color:var(--GLD); min-width:42px; text-align:center; }\n.fo-sante-select, .fo-form select, .fo-form input, .fo-form textarea { background:rgba(184,146,42,0.07); border:1px solid rgba(184,146,42,0.22); color:var(--parchment); font-family:\"Crimson Text\",serif; font-size:0.84rem; padding:0.24rem 0.42rem; border-radius:1px; }\n.fo-sante-select:focus, .fo-form select:focus, .fo-form input:focus, .fo-form textarea:focus { outline:none; border-color:var(--GLD); }\n.fo-section-title { font-family:\"Cinzel\",serif; font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--GLD); opacity:0.8; margin:0.5rem 0 0.3rem; display:block; }\n.fo-benef { display:flex; align-items:flex-start; gap:0.45rem; padding:0.3rem 0; border-bottom:1px solid rgba(255,255,255,0.04); }\n.fo-benef:last-of-type { border-bottom:none; }\n.fo-benef-cat { font-size:0.54rem; letter-spacing:0.06em; text-transform:uppercase; padding:0.08rem 0.34rem; border-radius:1px; border:1px solid; white-space:nowrap; flex-shrink:0; margin-top:0.1rem; }\n.fo-benef-cat.revenu     { border-color:rgba(94,160,80,0.45); color:#8ab870; background:rgba(94,160,80,0.07); }\n.fo-benef-cat.prix       { border-color:rgba(205,166,74,0.5); color:#cda64a; background:rgba(205,166,74,0.07); }\n.fo-benef-cat.commerce   { border-color:rgba(138,172,204,0.45); color:#8aaccc; background:rgba(74,90,122,0.08); }\n.fo-benef-cat.influence  { border-color:rgba(176,120,200,0.45); color:#b890c8; background:rgba(120,74,122,0.08); }\n.fo-benef-cat.mainoeuvre { border-color:rgba(192,120,80,0.45); color:#c89878; background:rgba(160,90,50,0.08); }\n.fo-benef-txt { flex:1; font-size:0.79rem; color:var(--parchment-dark); line-height:1.4; }\n.fo-benef-del { color:rgba(139,26,26,0.4); cursor:pointer; font-size:0.68rem; flex-shrink:0; transition:color 0.15s; }\n.fo-benef-del:hover { color:#e08080; }\n.fo-benef-addrow { display:flex; gap:0.35rem; margin-top:0.4rem; flex-wrap:wrap; }\n.fo-benef-addrow select { flex:0 0 auto; }\n.fo-benef-addrow input { flex:1; min-width:120px; }\n.fo-ent-actions { display:flex; gap:0.32rem; flex-wrap:wrap; margin-top:0.5rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.04); }\n.fo-btn { font-family:\"Cinzel\",serif; font-size:0.56rem; letter-spacing:0.07em; text-transform:uppercase; padding:0.22rem 0.5rem; border-radius:1px; cursor:pointer; transition:all 0.15s; }\n.fo-btn-gld { background:rgba(184,146,42,0.1); border:1px solid rgba(184,146,42,0.32); color:var(--GLD); }\n.fo-btn-gld:hover { background:rgba(184,146,42,0.22); }\n.fo-btn-del { background:transparent; border:1px solid rgba(139,26,26,0.15); color:rgba(192,112,112,0.55); }\n.fo-btn-del:hover { background:rgba(139,26,26,0.1); color:#e08080; }\n.fo-reg-solde { display:flex; align-items:baseline; gap:0.5rem; margin-bottom:0.6rem; padding:0.45rem 0.65rem; background:rgba(184,146,42,0.06); border:1px solid rgba(184,146,42,0.18); border-radius:2px; }\n.fo-reg-solde-label { font-family:\"Cinzel\",serif; font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--SUB); }\n.fo-reg-solde-val { font-family:\"Cinzel\",serif; font-size:1.2rem; }\n.fo-reg-solde-val.pos { color:#8ab870; }\n.fo-reg-solde-val.neg { color:#c0503c; }\n.fo-reg-line { display:flex; align-items:center; gap:0.5rem; padding:0.32rem 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:0.8rem; }\n.fo-reg-line:last-of-type { border-bottom:none; }\n.fo-reg-sess { font-family:\"Cinzel\",serif; font-size:0.6rem; color:rgba(184,146,42,0.6); white-space:nowrap; flex-shrink:0; min-width:46px; }\n.fo-reg-motif { flex:1; color:var(--parchment-dark); }\n.fo-reg-montant { font-family:\"Cinzel\",serif; font-size:0.84rem; white-space:nowrap; }\n.fo-reg-montant.pos { color:#8ab870; }\n.fo-reg-montant.neg { color:#c0503c; }\n.fo-reg-del { color:rgba(139,26,26,0.35); cursor:pointer; font-size:0.65rem; flex-shrink:0; transition:color 0.15s; }\n.fo-reg-del:hover { color:#e08080; }\n.fo-accord { border:1px solid rgba(255,255,255,0.06); border-radius:2px; margin-bottom:0.45rem; padding:0.5rem 0.7rem; border-left:3px solid rgba(138,172,204,0.4); }\n.fo-accord.verbal   { border-left-color:rgba(160,120,48,0.4); }\n.fo-accord.scelle   { border-left-color:rgba(138,172,204,0.5); }\n.fo-accord.officiel { border-left-color:rgba(94,160,80,0.6); }\n.fo-accord-head { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; }\n.fo-accord-nom { font-family:\"Cinzel\",serif; font-size:0.8rem; font-weight:600; color:var(--parchment); flex:1; min-width:90px; }\n.fo-accord-solidite { font-size:0.56rem; letter-spacing:0.07em; text-transform:uppercase; padding:0.07rem 0.36rem; border-radius:1px; border:1px solid; cursor:pointer; white-space:nowrap; transition:all 0.15s; }\n.fo-accord-solidite.verbal   { border-color:rgba(160,120,48,0.45); color:#cda64a; background:rgba(160,120,48,0.07); }\n.fo-accord-solidite.scelle   { border-color:rgba(138,172,204,0.5); color:#8aaccc; background:rgba(74,90,122,0.08); }\n.fo-accord-solidite.officiel { border-color:rgba(94,160,80,0.5); color:#8ab870; background:rgba(94,160,80,0.08); }\n.fo-accord-partenaire { font-size:0.68rem; color:var(--SUB); font-style:italic; }\n.fo-accord-nature { font-size:0.78rem; color:var(--parchment-dark); margin-top:0.3rem; line-height:1.45; }\n.fo-accord-del { color:rgba(139,26,26,0.35); cursor:pointer; font-size:0.66rem; flex-shrink:0; transition:color 0.15s; }\n.fo-accord-del:hover { color:#e08080; }\n.fo-form { display:none; margin-top:0.5rem; background:rgba(184,146,42,0.05); border:1px solid rgba(184,146,42,0.17); border-radius:2px; padding:0.65rem; flex-direction:column; gap:0.4rem; }\n.fo-form.visible { display:flex; }\n.fo-form input, .fo-form textarea, .fo-form select { width:100%; }\n.fo-form textarea { resize:vertical; min-height:48px; }\n.fo-form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; }\n.fo-form-label { font-size:0.57rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--GLD); opacity:0.85; display:block; margin-bottom:0.1rem; }\n.fo-form-actions { display:flex; gap:0.4rem; margin-top:0.1rem; }\n.fo-conds { margin-top:0.35rem; }\n.fo-conds-head { font-size:0.71rem; color:var(--SUB); font-style:italic; margin-bottom:0.35rem; line-height:1.4; }\n.fo-conds-head .lbl { font-family:\"Cinzel\",serif; font-size:0.56rem; letter-spacing:0.07em; text-transform:uppercase; color:rgba(184,146,42,0.7); font-style:normal; }\n.fo-cond { display:flex; align-items:flex-start; gap:0.45rem; padding:0.28rem 0; border-bottom:1px solid rgba(255,255,255,0.035); }\n.fo-cond:last-child { border-bottom:none; }\n.fo-cond-check { width:18px; height:18px; flex-shrink:0; border-radius:3px; border:1px solid rgba(184,146,42,0.4); background:rgba(8,8,12,0.6); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.72rem; color:transparent; transition:all 0.15s; margin-top:0.05rem; }\n.fo-cond-check:hover { border-color:rgba(184,146,42,0.8); }\n.fo-cond-check.done { background:rgba(94,160,80,0.25); border-color:rgba(94,160,80,0.7); color:#8ab870; }\n.fo-axe-tag { font-size:0.5rem; letter-spacing:0.04em; text-transform:uppercase; font-family:\"Cinzel\",serif; padding:0.1rem 0.3rem; border-radius:1px; border:1px solid; flex-shrink:0; margin-top:0.08rem; white-space:nowrap; }\n.fo-axe-tag.fin { border-color:rgba(94,160,80,0.45); color:#8ab870; background:rgba(94,160,80,0.07); }\n.fo-axe-tag.com { border-color:rgba(138,172,204,0.45); color:#8aaccc; background:rgba(74,90,122,0.08); }\n.fo-axe-tag.pol { border-color:rgba(192,90,80,0.45); color:#d68878; background:rgba(160,60,50,0.08); }\n.fo-axe-tag.inf { border-color:rgba(176,120,200,0.45); color:#b890c8; background:rgba(120,74,122,0.08); }\n.fo-axe-tag.inv { border-color:rgba(205,166,74,0.5); color:#cda64a; background:rgba(205,166,74,0.07); }\n.fo-axe-tag.mdo { border-color:rgba(192,120,80,0.45); color:#c89878; background:rgba(160,90,50,0.08); }\n.fo-cond-txt { flex:1; font-size:0.76rem; color:var(--parchment-dark); line-height:1.4; }\n.fo-cond-txt.done { color:var(--SUB); text-decoration:line-through; text-decoration-color:rgba(94,160,80,0.45); }\n.fo-conds-progress { font-size:0.68rem; color:var(--SUB); font-style:italic; margin-top:0.35rem; }\n.fo-conds-progress.full { color:#8ab870; }\n.fo-palier-max { font-size:0.74rem; color:#cda64a; font-style:italic; margin-top:0.35rem; }\n.fo-treso-val { font-family:\"Cinzel\",serif; font-size:0.9rem; min-width:42px; text-align:center; }\n.fo-treso-val.pos { color:#8ab870; }\n.fo-treso-val.neg { color:#c0503c; }\n.fo-essor-box { background:rgba(184,146,42,0.06); border:1px solid rgba(184,146,42,0.22); border-radius:2px; padding:0.65rem 0.8rem; margin-bottom:0.85rem; display:flex; align-items:center; gap:0.7rem; flex-wrap:wrap; }\n.fo-essor-info { flex:1; min-width:170px; }\n.fo-essor-title { font-family:\"Cinzel\",serif; font-size:0.62rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--GLD); margin-bottom:0.2rem; }\n.fo-essor-desc { font-size:0.72rem; color:var(--SUB); font-style:italic; line-height:1.45; }\n.fo-essor-btn { font-family:\"Cinzel\",serif; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; padding:0.45rem 0.85rem; border-radius:2px; cursor:pointer; transition:all 0.18s; background:rgba(184,146,42,0.14); border:1px solid rgba(184,146,42,0.45); color:var(--GLD); white-space:nowrap; }\n.fo-essor-btn:hover { background:rgba(184,146,42,0.28); }\n.fo-essor-btn.spent { background:rgba(80,80,90,0.12); border-color:rgba(255,255,255,0.1); color:var(--SUB); cursor:default; }\n.fo-essor-reset { font-family:\"Cinzel\",serif; font-size:0.55rem; letter-spacing:0.08em; text-transform:uppercase; padding:0.3rem 0.6rem; border-radius:2px; cursor:pointer; background:transparent; border:1px solid rgba(255,255,255,0.1); color:var(--SUB); transition:all 0.15s; }\n.fo-essor-reset:hover { background:rgba(255,255,255,0.06); color:var(--parchment); }",
    html: "<div class=\"fo-card\">\n    <div class=\"card-title gld\" style=\"margin-bottom:0.5rem;\">Les Fondations\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">&#x2014; ce que Reiner b&#xE2;tit</span>\n    </div>\n    <div class=\"fo-epigraph\">Reiner ne cherche pas l&#x2019;aventure. Il pose des pierres, et attend qu&#x2019;elles tiennent. Ce qu&#x2019;il construit ici ne se gagne pas en une sc&#xE8;ne &#x2014; cela se cultive, session apr&#xE8;s session, jusqu&#x2019;&#xE0; ce que son nom pèse de lui-m&#xEA;me.</div>\n\n    <!-- SYNTHÈSE -->\n    <div class=\"fo-stats\">\n      <div class=\"fo-stat-box\"><span class=\"fo-stat-val\" id=\"fo-nb-ent\">0</span><span class=\"fo-stat-label\">Entreprises</span></div>\n      <div class=\"fo-stat-box\"><span class=\"fo-stat-val\" id=\"fo-capital\">0</span><span class=\"fo-stat-label\">Capital d&#xE9;ploy&#xE9; (Co)</span></div>\n      <div class=\"fo-stat-box\"><span class=\"fo-stat-val\" id=\"fo-rente\">0</span><span class=\"fo-stat-label\">Rente / session (Co)</span></div>\n      <div class=\"fo-stat-box\"><span class=\"fo-stat-val\" id=\"fo-nb-accords\">0</span><span class=\"fo-stat-label\">Accords</span></div>\n    </div>\n\n    <!-- TABS -->\n    <div class=\"fo-tabs\">\n      <button class=\"fo-tab active\" onclick=\"foTab('ent')\">Entreprises</button>\n      <button class=\"fo-tab\" id=\"fo-tab-reg\" onclick=\"foTab('reg')\">Le Registre</button>\n      <button class=\"fo-tab\" id=\"fo-tab-acc\" onclick=\"foTab('acc')\">Les Accords</button>\n    </div>\n\n    <!-- PANEL ENTREPRISES -->\n    <div class=\"fo-panel active\" id=\"fo-panel-ent\">\n      <div class=\"fo-intro\">\n        Chaque entreprise est <strong>libre</strong> &#x2014; sa nature, son lieu, sa forme sont ce que Reiner en fait. Le <strong>Développement</strong> grimpe de Projet jusqu&#x2019;&#xE0; Empire en dix paliers&#x202F;; chacun demande de remplir des conditions sur six axes (financier, commercial, politique, influence, investisseurs, main-d&#x2019;&#x153;uvre) que le MJ valide. À chaque palier, l&#x2019;entreprise rend un <strong>Bénéfice</strong> concret que le joueur formule lui-m&#xEA;me.\n      </div>\n      <div class=\"fo-essor-box\">\n        <div class=\"fo-essor-info\">\n          <div class=\"fo-essor-title\">L&#x2019;Essor &#x2014; 1 fois par session</div>\n          <div class=\"fo-essor-desc\">Reiner consacre une action longue à faire avancer ses Fondations&#x202F;: négocier, investir, superviser un chantier. Le tour de jeu de l&#x2019;entrepreneur.</div>\n        </div>\n        <button class=\"fo-essor-btn\" id=\"fo-essor-btn\" onclick=\"foUseEssor()\">Mener l&#x2019;Essor</button>\n        <button class=\"fo-essor-reset\" onclick=\"foResetEssor()\">Nouvelle session</button>\n      </div>\n      <div id=\"fo-ent-list\"></div>\n      <button class=\"btn-add btn-add-gld\" style=\"margin-top:0.4rem;\" onclick=\"foToggleForm('fo-form-ent')\">+ Nouvelle entreprise</button>\n      <div class=\"fo-form\" id=\"fo-form-ent\">\n        <div><span class=\"fo-form-label\">Nom de l&#x2019;entreprise</span><input id=\"fo-e-nom\" placeholder=\"Ex : L&#x2019;Atelier du Sud, Le Relais des Trois Lieues...\" /></div>\n        <div class=\"fo-form-row\">\n          <div><span class=\"fo-form-label\">Lieu / zone</span><input id=\"fo-e-lieu\" placeholder=\"Averheim, route du sud...\" /></div>\n          <div><span class=\"fo-form-label\">Capital de départ (Co)</span><input id=\"fo-e-capital\" type=\"number\" min=\"0\" value=\"0\" /></div>\n        </div>\n        <div><span class=\"fo-form-label\">Nature de l&#x2019;activité</span><textarea id=\"fo-e-nature\" placeholder=\"Ce que fait l&#x2019;entreprise, ce que Reiner y vise...\"></textarea></div>\n        <div class=\"fo-form-actions\">\n          <button class=\"btn-add btn-add-gld\" onclick=\"foAddEnt()\">Fonder</button>\n          <button class=\"btn-cancel\" onclick=\"foToggleForm('fo-form-ent')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n\n    <!-- PANEL REGISTRE -->\n    <div class=\"fo-panel\" id=\"fo-panel-reg\">\n      <div class=\"fo-intro\">\n        Le livre de comptes des Fondations. Chaque <strong>entrée</strong> (rente, vente, gain) et chaque <strong>sortie</strong> (investissement, dépense, imprévu) s&#x2019;inscrit ici. Le solde dit, sans détour, si l&#x2019;édifice rapporte.\n      </div>\n      <div class=\"fo-reg-solde\">\n        <span class=\"fo-reg-solde-label\">Solde du Registre</span>\n        <span class=\"fo-reg-solde-val pos\" id=\"fo-reg-solde\">0 Co</span>\n      </div>\n      <div id=\"fo-reg-list\"></div>\n      <button class=\"btn-add btn-add-gld\" style=\"margin-top:0.4rem;\" onclick=\"foToggleForm('fo-form-reg')\">+ Inscrire une écriture</button>\n      <div class=\"fo-form\" id=\"fo-form-reg\">\n        <div class=\"fo-form-row\">\n          <div><span class=\"fo-form-label\">Sens</span>\n            <select id=\"fo-r-sens\">\n              <option value=\"pos\">Entrée (+)</option>\n              <option value=\"neg\">Sortie (&#x2212;)</option>\n            </select>\n          </div>\n          <div><span class=\"fo-form-label\">Montant (Co)</span><input id=\"fo-r-montant\" type=\"number\" min=\"0\" value=\"0\" /></div>\n        </div>\n        <div class=\"fo-form-row\">\n          <div><span class=\"fo-form-label\">Session</span><input id=\"fo-r-sess\" placeholder=\"S4...\" /></div>\n          <div><span class=\"fo-form-label\">Motif</span><input id=\"fo-r-motif\" placeholder=\"Rente de l&#x2019;atelier, achat de stock...\" /></div>\n        </div>\n        <div class=\"fo-form-actions\">\n          <button class=\"btn-add btn-add-gld\" onclick=\"foAddReg()\">Inscrire</button>\n          <button class=\"btn-cancel\" onclick=\"foToggleForm('fo-form-reg')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n\n    <!-- PANEL ACCORDS -->\n    <div class=\"fo-panel\" id=\"fo-panel-acc\">\n      <div class=\"fo-intro\">\n        Les leviers <strong>politiques et commerciaux</strong> &#x2014; pactes, ententes de guilde, monopoles locaux, protections, voies négociées. Un accord naît souvent d&#x2019;une faveur du Livre de Bord. Sa <strong>solidité</strong> va du verbal &#xE0; l&#x2019;officiel&#x202F;: cliquer sur le badge la fait évoluer.\n      </div>\n      <div id=\"fo-acc-list\"></div>\n      <button class=\"btn-add btn-add-gld\" style=\"margin-top:0.4rem;\" onclick=\"foToggleForm('fo-form-acc')\">+ Nouvel accord</button>\n      <div class=\"fo-form\" id=\"fo-form-acc\">\n        <div><span class=\"fo-form-label\">Intitulé de l&#x2019;accord</span><input id=\"fo-a-nom\" placeholder=\"Ex : Entente avec la Guilde des charrons...\" /></div>\n        <div class=\"fo-form-row\">\n          <div><span class=\"fo-form-label\">Partenaire</span><input id=\"fo-a-partenaire\" placeholder=\"Personne, guilde, faction...\" /></div>\n          <div><span class=\"fo-form-label\">Solidité</span>\n            <select id=\"fo-a-solidite\">\n              <option value=\"verbal\">Verbal</option>\n              <option value=\"scelle\">Scellé</option>\n              <option value=\"officiel\">Officiel</option>\n            </select>\n          </div>\n        </div>\n        <div><span class=\"fo-form-label\">Nature de l&#x2019;accord</span><textarea id=\"fo-a-nature\" placeholder=\"Ce qui est convenu, ce qu&#x2019;il ouvre, ses contreparties...\"></textarea></div>\n        <div class=\"fo-form-actions\">\n          <button class=\"btn-add btn-add-gld\" onclick=\"foAddAcc()\">Sceller</button>\n          <button class=\"btn-cancel\" onclick=\"foToggleForm('fo-form-acc')\">Annuler</button>\n        </div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { foLoad(); }
  });
})();

var foData = { entreprises:[], registre:[], accords:[], essorUsed:false };

var FO_PALIERS = [
  { nom:'Projet', conds:[
    { axe:'fin', txt:'Une id\u00e9e chiffr\u00e9e \u2014 co\u00fbt de lancement estim\u00e9.' },
    { axe:'com', txt:'Un besoin ou un march\u00e9 clairement identifi\u00e9.' }
  ]},
  { nom:'Lanc\u00e9e', conds:[
    { axe:'fin', txt:'Capital de d\u00e9part engag\u00e9, local ou outil acquis.' },
    { axe:'mdo', txt:'Reiner ou un proche aux commandes au quotidien.' },
    { axe:'com', txt:'Premi\u00e8re vente, premier service rendu.' }
  ]},
  { nom:'\u00c9tablie', conds:[
    { axe:'fin', txt:'Premier b\u00e9n\u00e9fice net d\u00e9gag\u00e9, l\u2019activit\u00e9 ne perd plus d\u2019argent.' },
    { axe:'com', txt:'Une client\u00e8le r\u00e9currente, pas seulement des passages.' },
    { axe:'mdo', txt:'Au moins un employ\u00e9 r\u00e9mun\u00e9r\u00e9.' }
  ]},
  { nom:'Reconnue', conds:[
    { axe:'com', txt:'Une voie de commerce fiable \u2014 fournisseur ou d\u00e9bouch\u00e9 stable.' },
    { axe:'pol', txt:'Une autorisation ou une charge en r\u00e8gle aupr\u00e8s des autorit\u00e9s locales.' },
    { axe:'inf', txt:'Le nom de l\u2019entreprise commence \u00e0 circuler dans la zone.' },
    { axe:'fin', txt:'Un Accord scell\u00e9 li\u00e9 \u00e0 l\u2019entreprise (voir Les Accords).' }
  ]},
  { nom:'Florissante', conds:[
    { axe:'fin', txt:'Capital cons\u00e9quent r\u00e9investi, tr\u00e9sorerie positive et stable.' },
    { axe:'inv', txt:'Un associ\u00e9 ou un pr\u00eateur a mis des fonds dans l\u2019affaire.' },
    { axe:'mdo', txt:'Un contrema\u00eetre ou g\u00e9rant de confiance \u2014 Reiner n\u2019est plus indispensable.' },
    { axe:'com', txt:'Plusieurs sources de revenu distinctes.' }
  ]},
  { nom:'Influente', conds:[
    { axe:'inf', txt:'R\u00e9putation notable dans la zone (Livre de Bord \u2014 zone \u00e0 6+).' },
    { axe:'pol', txt:'Un appui parmi les notables ou la guilde concern\u00e9e.' },
    { axe:'fin', txt:'B\u00e9n\u00e9fices assez r\u00e9guliers pour absorber un mauvais mois.' },
    { axe:'com', txt:'L\u2019entreprise fixe ou influence les prix de son secteur local.' }
  ]},
  { nom:'Maison', conds:[
    { axe:'mdo', txt:'Une seconde implantation ou succursale op\u00e9rationnelle.' },
    { axe:'com', txt:'Au moins deux voies de commerce actives.' },
    { axe:'inv', txt:'Capital ext\u00e9rieur lev\u00e9 \u2014 des tiers croient \u00e0 l\u2019affaire.' },
    { axe:'pol', txt:'Protection ou faveur d\u2019un notable de poids.' },
    { axe:'fin', txt:'Tr\u00e9sorerie permettant d\u2019investir sans s\u2019endetter.' }
  ]},
  { nom:'R\u00e9seau', conds:[
    { axe:'com', txt:'Un r\u00e9seau d\u2019\u00e9tablissements ou de partenaires sur plusieurs lieux.' },
    { axe:'pol', txt:'Une voix \u00e9cout\u00e9e dans une guilde ou un conseil.' },
    { axe:'inv', txt:'Plusieurs investisseurs ou cr\u00e9anciers, parts r\u00e9parties.' },
    { axe:'mdo', txt:'Une hi\u00e9rarchie d\u2019employ\u00e9s autonome.' },
    { axe:'inf', txt:'Le nom de Reiner ouvre des portes au-del\u00e0 de sa zone d\u2019origine.' }
  ]},
  { nom:'Puissance', conds:[
    { axe:'fin', txt:'Une tr\u00e9sorerie de guerre \u2014 de quoi encaisser une crise ou racheter un rival.' },
    { axe:'pol', txt:'Un si\u00e8ge, une charge officielle ou un poids reconnu \u00e0 l\u2019\u00e9chelle provinciale.' },
    { axe:'inf', txt:'Influence d\u00e9passant la cit\u00e9 \u2014 on conna\u00eet l\u2019entreprise dans toute la province.' },
    { axe:'inv', txt:'Un consortium ou un cercle d\u2019investisseurs structur\u00e9.' },
    { axe:'com', txt:'Position dominante, voire monopole, sur un march\u00e9.' }
  ]},
  { nom:'Empire', conds:[
    { axe:'fin', txt:'Fortune consid\u00e9rable, capitaux multiples et diversifi\u00e9s.' },
    { axe:'com', txt:'Monopole ou quasi-monopole r\u00e9gional sur le secteur.' },
    { axe:'pol', txt:'Reiner ou ses gens si\u00e8gent l\u00e0 o\u00f9 se d\u00e9cident les choses.' },
    { axe:'inf', txt:'Influence immense \u2014 l\u2019entreprise p\u00e8se sur la r\u00e9gion enti\u00e8re.' },
    { axe:'inv', txt:'Un r\u00e9seau d\u2019investisseurs et de cr\u00e9anciers \u00e0 l\u2019\u00e9chelle de l\u2019empire b\u00e2ti.' },
    { axe:'mdo', txt:'Une v\u00e9ritable dynastie d\u2019employ\u00e9s, g\u00e9rants et hommes de confiance.' }
  ]}
];

function foLoad() {
  var raw = MODULES.lire("reputation");
  if(raw) { try {
    var d = JSON.parse(raw);
    if(Array.isArray(d.entreprises)) foData.entreprises = d.entreprises;
    if(Array.isArray(d.registre))    foData.registre    = d.registre;
    if(Array.isArray(d.accords))     foData.accords     = d.accords;
    if(typeof d.essorUsed==='boolean') foData.essorUsed = d.essorUsed;
  } catch(e){} }
  foRender();
}

function foSave() { MODULES.ecrire("reputation", JSON.stringify(foData)); }

function foRender() { foRenderEnt(); foRenderReg(); foRenderAcc(); foRenderStats(); foRenderEssor(); }

function foToggleForm(id) { var el=document.getElementById(id); if(el) el.classList.toggle('visible'); }

function foEsc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function foTab(name) {
  var tabs=document.querySelectorAll('.fo-tab');
  for(var i=0;i<tabs.length;i++) tabs[i].classList.remove('active');
  var panels=document.querySelectorAll('.fo-panel');
  for(var j=0;j<panels.length;j++) panels[j].classList.remove('active');
  if(name==='ent') document.querySelector('.fo-tab').classList.add('active');
  else { var t=document.getElementById('fo-tab-'+name); if(t) t.classList.add('active'); }
  var panel=document.getElementById('fo-panel-'+name);
  if(panel) panel.classList.add('active');
}

function foRenderStats() {
  var capital=0, rente=0;
  for(var i=0;i<foData.entreprises.length;i++) {
    var e=foData.entreprises[i];
    capital += parseInt(e.capital)||0;
    if(Array.isArray(e.benefices)) {
      for(var b=0;b<e.benefices.length;b++) {
        if(e.benefices[b].cat==='revenu') {
          var m=parseInt(e.benefices[b].montant);
          if(!isNaN(m)) rente+=m;
        }
      }
    }
  }
  var set=function(id,v){ var el=document.getElementById(id); if(el) el.textContent=v; };
  set('fo-nb-ent', foData.entreprises.length);
  set('fo-capital', capital);
  set('fo-rente', rente);
  set('fo-nb-accords', foData.accords.length);
}

function foRenderEnt() {
  var c=document.getElementById('fo-ent-list'); if(!c) return;
  c.innerHTML='';
  if(!foData.entreprises.length) {
    c.innerHTML='<div class="fo-empty">Aucune entreprise. Tout commence par une premi\u00e8re pierre.</div>';
    return;
  }
  foData.entreprises.forEach(function(e,i){
    var sante=e.sante||'stable';
    var dev=Math.max(1,Math.min(10,e.dev||1));
    var palier=FO_PALIERS[dev-1];
    var div=document.createElement('div');
    div.className='fo-ent '+sante;

    // Crans de développement
    var cransHtml='';
    for(var k=0;k<10;k++) {
      var on = k<dev;
      var cls='fo-dev-cran'+(on?' on':'')+(on&&k===9?' empire':'');
      cransHtml+='<div class="'+cls+'" onclick="foSetDev('+i+','+(k+1)+')" title="'+FO_PALIERS[k].nom+'"></div>';
    }

    // Conditions du palier SUIVANT (celui à atteindre)
    var condsHtml='';
    if(dev>=10) {
      condsHtml='<div class="fo-palier-max">&#x2666; Apog\u00e9e atteinte \u2014 l\u2019entreprise est un v\u00e9ritable empire.</div>';
    } else {
      var next=FO_PALIERS[dev]; // palier dev+1 (index dev)
      if(!e.condsCheck) e.condsCheck={};
      var checks=e.condsCheck[dev]||[];
      var doneCount=0;
      var rows='';
      next.conds.forEach(function(cond,ci){
        var done=!!checks[ci];
        if(done) doneCount++;
        var axe=FO_AXES[cond.axe]||{lbl:'?',court:'?'};
        rows+='<div class="fo-cond">'
          +'<div class="fo-cond-check'+(done?' done':'')+'" onclick="foToggleCond('+i+','+dev+','+ci+')">'+(done?'\u2713':'')+'</div>'
          +'<span class="fo-axe-tag '+cond.axe+'" title="'+axe.lbl+'">'+axe.court+'</span>'
          +'<span class="fo-cond-txt'+(done?' done':'')+'">'+foEsc(cond.txt)+'</span>'
          +'</div>';
      });
      var total=next.conds.length;
      var full=(doneCount>=total);
      condsHtml='<div class="fo-conds">'
        +'<div class="fo-conds-head"><span class="lbl">Palier '+(dev+1)+' &#x2014; '+next.nom+'</span> &#x2014; conditions \u00e0 r\u00e9unir&#x202F;:</div>'
        +rows
        +'<div class="fo-conds-progress'+(full?' full':'')+'">'+doneCount+' / '+total+' '
          +(full?'\u2014 conditions r\u00e9unies, le MJ peut valider la mont\u00e9e de palier.':'\u2014 conditions remplies.')
        +'</div>'
        +'</div>';
    }

    // Bénéfices
    var benefHtml='';
    var benefs=Array.isArray(e.benefices)?e.benefices:[];
    if(benefs.length) {
      benefs.forEach(function(b,bi){
        var catLbl=FO_BENEF_CATS[b.cat]||'?';
        var montantTxt = (b.cat==='revenu'&&b.montant)?(' <span style="color:#8ab870;">(+'+foEsc(b.montant)+' Co/sess.)</span>'):'';
        benefHtml+='<div class="fo-benef">'
          +'<span class="fo-benef-cat '+(b.cat||'revenu')+'">'+catLbl+'</span>'
          +'<span class="fo-benef-txt">'+foEsc(b.txt)+montantTxt+'</span>'
          +'<span class="fo-benef-del" onclick="foDelBenef('+i+','+bi+')" title="Retirer">&#x2715;</span>'
          +'</div>';
      });
    } else {
      benefHtml='<div class="fo-empty" style="font-size:0.75rem;">Aucun b\u00e9n\u00e9fice formul\u00e9 pour l\u2019instant.</div>';
    }

    var treso=parseInt(e.treso)||0;

    div.innerHTML=
      '<div class="fo-ent-header" onclick="this.parentElement.classList.toggle(\'open\')">'
        +'<span class="fo-ent-sante-dot '+sante+'"></span>'
        +'<span class="fo-ent-nom">'+foEsc(e.nom||'?')+(e.lieu?' <span class="fo-ent-lieu">&#x2014; '+foEsc(e.lieu)+'</span>':'')+'</span>'
        +'<span class="fo-ent-palier-badge">'+dev+'/10 &middot; '+palier.nom+'</span>'
        +'<span class="fo-ent-expand">&#9662;</span>'
      +'</div>'
      +'<div class="fo-ent-body">'
        +(e.nature?'<div class="fo-ent-nature">'+foEsc(e.nature)+'</div>':'')
        +'<div class="fo-dev">'
          +'<div class="fo-dev-head"><span class="fo-dev-label">D\u00e9veloppement</span><span class="fo-dev-palier-nom">'+palier.nom+'</span></div>'
          +'<div class="fo-dev-track">'+cransHtml+'</div>'
          +condsHtml
        +'</div>'
        +'<div class="fo-ctrl-row">'
          +'<span class="fo-ctrl-label">Capital investi</span>'
          +'<button class="fo-mini-btn" onclick="foCapital('+i+',-10)" title="\u221210">&#x2212;</button>'
          +'<span class="fo-capital-val">'+(parseInt(e.capital)||0)+'</span>'
          +'<button class="fo-mini-btn" onclick="foCapital('+i+',10)" title="+10">+</button>'
          +'<span class="fo-ctrl-label">Co</span>'
          +'<span class="fo-ctrl-label" style="margin-left:0.6rem;">Tr\u00e9sorerie</span>'
          +'<button class="fo-mini-btn" onclick="foTreso('+i+',-10)" title="\u221210">&#x2212;</button>'
          +'<span class="fo-treso-val '+(treso<0?'neg':'pos')+'">'+treso+'</span>'
          +'<button class="fo-mini-btn" onclick="foTreso('+i+',10)" title="+10">+</button>'
          +'<span class="fo-ctrl-label">Co</span>'
        +'</div>'
        +'<div class="fo-ctrl-row">'
          +'<span class="fo-ctrl-label">Prosp\u00e9rit\u00e9</span>'
          +'<select class="fo-sante-select" onchange="foSetSante('+i+',this.value)">'
            +'<option value="prospere"'+(sante==='prospere'?' selected':'')+'>Prosp\u00e8re</option>'
            +'<option value="stable"'+(sante==='stable'?' selected':'')+'>Stable</option>'
            +'<option value="difficulte"'+(sante==='difficulte'?' selected':'')+'>En difficult\u00e9</option>'
          +'</select>'
        +'</div>'
        +'<span class="fo-section-title">B\u00e9n\u00e9fices produits</span>'
        +benefHtml
        +'<div class="fo-benef-addrow">'
          +'<select id="fo-benef-cat-'+i+'">'
            +'<option value="revenu">Revenu</option>'
            +'<option value="prix">Prix avantageux</option>'
            +'<option value="commerce">Voie de commerce</option>'
            +'<option value="influence">Influence</option>'
            +'<option value="mainoeuvre">Main-d\u2019\u0153uvre</option>'
          +'</select>'
          +'<input id="fo-benef-mt-'+i+'" type="number" min="0" placeholder="Co/sess." style="flex:0 0 80px;" title="Montant si Revenu" />'
          +'<input id="fo-benef-txt-'+i+'" placeholder="B\u00e9n\u00e9fice concret..." />'
          +'<button class="fo-btn fo-btn-gld" onclick="foAddBenef('+i+')">Ajouter</button>'
        +'</div>'
        +'<div class="fo-ent-actions">'
          +'<button class="fo-btn fo-btn-del" onclick="foDelEnt('+i+')">Dissoudre l\u2019entreprise</button>'
        +'</div>'
      +'</div>';
    c.appendChild(div);
  });
}

function foToggleCond(i,palierIdx,condIdx) {
  var e=foData.entreprises[i];
  if(!e) return;
  if(!e.condsCheck) e.condsCheck={};
  if(!Array.isArray(e.condsCheck[palierIdx])) e.condsCheck[palierIdx]=[];
  e.condsCheck[palierIdx][condIdx]=!e.condsCheck[palierIdx][condIdx];
  foSave(); foRenderEnt();
}

function foTreso(i,d) {
  if(!foData.entreprises[i]) return;
  foData.entreprises[i].treso=(parseInt(foData.entreprises[i].treso)||0)+d;
  foSave(); foRenderEnt();
}

function foAddEnt() {
  var nom=document.getElementById('fo-e-nom').value.trim();
  if(!nom) return;
  foData.entreprises.push({
    nom:nom,
    lieu:document.getElementById('fo-e-lieu').value.trim(),
    nature:document.getElementById('fo-e-nature').value.trim(),
    capital:parseInt(document.getElementById('fo-e-capital').value)||0,
    treso:0,
    dev:1,
    sante:'stable',
    benefices:[],
    condsCheck:{}
  });
  ['fo-e-nom','fo-e-lieu','fo-e-nature'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('fo-e-capital').value='0';
  foSave(); foRenderEnt(); foRenderStats(); foToggleForm('fo-form-ent');
}

function foSetDev(i,val) {
  if(!foData.entreprises[i]) return;
  var cur=foData.entreprises[i].dev||1;
  // recliquer le palier courant le fait redescendre d'un cran (minimum 1)
  foData.entreprises[i].dev = (val===cur) ? Math.max(1,val-1) : val;
  foSave(); foRenderEnt();
}

function foCapital(i,d) {
  if(!foData.entreprises[i]) return;
  foData.entreprises[i].capital=Math.max(0,(parseInt(foData.entreprises[i].capital)||0)+d);
  foSave(); foRenderEnt(); foRenderStats();
}

function foSetSante(i,val) {
  if(!foData.entreprises[i]) return;
  foData.entreprises[i].sante=val;
  foSave(); foRenderEnt();
}

function foAddBenef(i) {
  if(!foData.entreprises[i]) return;
  var catEl=document.getElementById('fo-benef-cat-'+i);
  var txtEl=document.getElementById('fo-benef-txt-'+i);
  var mtEl=document.getElementById('fo-benef-mt-'+i);
  if(!txtEl||!txtEl.value.trim()) return;
  if(!Array.isArray(foData.entreprises[i].benefices)) foData.entreprises[i].benefices=[];
  var b={ cat:catEl?catEl.value:'revenu', txt:txtEl.value.trim() };
  if(b.cat==='revenu' && mtEl && mtEl.value!=='') b.montant=parseInt(mtEl.value)||0;
  foData.entreprises[i].benefices.push(b);
  foSave(); foRenderEnt(); foRenderStats();
}

function foDelBenef(i,bi) {
  if(!foData.entreprises[i]||!foData.entreprises[i].benefices) return;
  foData.entreprises[i].benefices.splice(bi,1);
  foSave(); foRenderEnt(); foRenderStats();
}

function foDelEnt(i) {
  if(confirm('Dissoudre cette entreprise ? Ses b\u00e9n\u00e9fices seront perdus.')) {
    foData.entreprises.splice(i,1);
    foSave(); foRenderEnt(); foRenderStats();
  }
}

function foRenderReg() {
  var c=document.getElementById('fo-reg-list'); if(!c) return;
  c.innerHTML='';
  var solde=0;
  for(var i=0;i<foData.registre.length;i++) {
    var r=foData.registre[i];
    solde += (r.sens==='neg'?-1:1)*(parseInt(r.montant)||0);
  }
  var soldeEl=document.getElementById('fo-reg-solde');
  if(soldeEl) {
    soldeEl.textContent=solde+' Co';
    soldeEl.className='fo-reg-solde-val '+(solde<0?'neg':'pos');
  }
  if(!foData.registre.length) {
    c.innerHTML='<div class="fo-empty">Registre vierge.</div>';
    return;
  }
  foData.registre.forEach(function(r,i){
    var neg=r.sens==='neg';
    var div=document.createElement('div');
    div.className='fo-reg-line';
    div.innerHTML=
      '<span class="fo-reg-sess">'+foEsc(r.sess||'—')+'</span>'
      +'<span class="fo-reg-motif">'+foEsc(r.motif||'?')+'</span>'
      +'<span class="fo-reg-montant '+(neg?'neg':'pos')+'">'+(neg?'\u2212':'+')+(parseInt(r.montant)||0)+' Co</span>'
      +'<span class="fo-reg-del" onclick="foDelReg('+i+')" title="Supprimer">&#x2715;</span>';
    c.appendChild(div);
  });
}

function foAddReg() {
  var montant=parseInt(document.getElementById('fo-r-montant').value)||0;
  var motif=document.getElementById('fo-r-motif').value.trim();
  if(!motif && montant===0) return;
  foData.registre.push({
    sens:document.getElementById('fo-r-sens').value,
    montant:montant,
    sess:document.getElementById('fo-r-sess').value.trim(),
    motif:motif
  });
  ['fo-r-sess','fo-r-motif'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('fo-r-montant').value='0';
  foSave(); foRenderReg(); foToggleForm('fo-form-reg');
}

function foDelReg(i) {
  foData.registre.splice(i,1);
  foSave(); foRenderReg();
}

function foRenderAcc() {
  var c=document.getElementById('fo-acc-list'); if(!c) return;
  c.innerHTML='';
  if(!foData.accords.length) {
    c.innerHTML='<div class="fo-empty">Aucun accord. Le commerce se b\u00e2tit sur la parole donn\u00e9e.</div>';
    return;
  }
  foData.accords.forEach(function(a,i){
    var sol=a.solidite||'verbal';
    var div=document.createElement('div');
    div.className='fo-accord '+sol;
    div.innerHTML=
      '<div class="fo-accord-head">'
        +'<span class="fo-accord-nom">'+foEsc(a.nom||'?')+'</span>'
        +(a.partenaire?'<span class="fo-accord-partenaire">'+foEsc(a.partenaire)+'</span>':'')
        +'<span class="fo-accord-solidite '+sol+'" onclick="foCycleSolidite('+i+')" title="Cliquer pour faire \u00e9voluer">'+FO_SOLIDITE_LBL[sol]+'</span>'
        +'<span class="fo-accord-del" onclick="foDelAcc('+i+')" title="Supprimer">&#x2715;</span>'
      +'</div>'
      +(a.nature?'<div class="fo-accord-nature">'+foEsc(a.nature)+'</div>':'');
    c.appendChild(div);
  });
}

function foAddAcc() {
  var nom=document.getElementById('fo-a-nom').value.trim();
  if(!nom) return;
  foData.accords.push({
    nom:nom,
    partenaire:document.getElementById('fo-a-partenaire').value.trim(),
    solidite:document.getElementById('fo-a-solidite').value,
    nature:document.getElementById('fo-a-nature').value.trim()
  });
  ['fo-a-nom','fo-a-partenaire','fo-a-nature'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('fo-a-solidite').value='verbal';
  foSave(); foRenderAcc(); foRenderStats(); foToggleForm('fo-form-acc');
}

function foCycleSolidite(i) {
  if(!foData.accords[i]) return;
  var cur=FO_SOLIDITE_CYCLE.indexOf(foData.accords[i].solidite||'verbal');
  foData.accords[i].solidite=FO_SOLIDITE_CYCLE[(cur+1)%3];
  foSave(); foRenderAcc();
}

function foDelAcc(i) {
  if(confirm('Supprimer cet accord ?')) {
    foData.accords.splice(i,1);
    foSave(); foRenderAcc(); foRenderStats();
  }
}

function foRenderEssor() {
  var btn=document.getElementById('fo-essor-btn');
  if(!btn) return;
  if(foData.essorUsed) {
    btn.classList.add('spent');
    btn.textContent='Essor men\u00e9 cette session';
  } else {
    btn.classList.remove('spent');
    btn.textContent='Mener l\u2019Essor';
  }
}

function foUseEssor() {
  if(foData.essorUsed) return;
  foData.essorUsed=true;
  foSave(); foRenderEssor();
}

function foResetEssor() {
  foData.essorUsed=false;
  foSave(); foRenderEssor();
}
