/* Les Sceaux — mécanique de Ephraim Kosakov
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis ephraim.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "sceaux",
    titre: "Les Sceaux",
    css: "/* Couleur d'accent propre au personnage, reprise de sa fiche d'origine. */\n[data-module=\"sceaux\"] { --VIO2:#e06030; --FIRE:#d96a2c; }\n.sceau-card { background:rgba(8,6,10,0.78); border:1px solid rgba(224,96,48,0.28); border-radius:2px; padding:1.1rem; grid-column:1/-1; position:relative; overflow:hidden; }\n.sceau-card::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 30% 0%, rgba(138,42,10,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(74,90,122,0.08) 0%, transparent 55%); pointer-events:none; }",
    html: "<div class=\"sceau-card\">\n    <div class=\"card-title vio\" style=\"position:relative;z-index:1;margin-bottom:0.4rem;\">Le Sceau de Glace\n      <span style=\"font-size:0.62rem;color:var(--SUB);font-style:italic;font-family:'Crimson Text',serif;text-transform:none;letter-spacing:0;margin-left:0.5rem;\">mécanique exclusive : Ephraïm Kosakov</span>\n    </div>\n    <div style=\"font-size:0.75rem;color:var(--SUB);font-style:italic;margin-bottom:0.9rem;line-height:1.55;position:relative;z-index:1;\">\n      La Glyphe scelle le Feu, mais Ephraïm apprend à la comprendre et à la contrer. L'<strong style=\"color:#8aaccc;\">axe bipolaire</strong> montre la position entre Glaciation (le Feu contraint, comprimé) et Embrasement (le Feu déborde). L'équilibre est au centre. Chaque côté apporte des effets spécifiques, parfois utiles, parfois dangereux.\n    </div>\n\n    <!-- AXE BIPOLAIRE -->\n    <div class=\"axe-wrap\">\n      <div class=\"axe-labels\">\n        <span class=\"axe-label-glace\">\n          <svg class=\"icon-svg icon-flocon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n            <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"/>\n            <line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/>\n            <line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"/>\n            <line x1=\"19.07\" y1=\"4.93\" x2=\"4.93\" y2=\"19.07\"/>\n            <polyline points=\"9,4 12,7 15,4\"/>\n            <polyline points=\"9,20 12,17 15,20\"/>\n            <polyline points=\"4,9 7,12 4,15\"/>\n            <polyline points=\"20,9 17,12 20,15\"/>\n          </svg>\n          Glaciation\n        </span>\n        <span class=\"axe-label-centre\">Équilibre</span>\n        <span class=\"axe-label-feu\">\n          Embrasement\n          <svg class=\"icon-svg icon-flamme\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\">\n            <path d=\"M12 2c-0.5 3-2.5 5-4 7c-1.5 2-2 4-2 6c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-0.4-2.8-1.1-4c-0.7 1-1.6 1.6-2.4 1.6c1-2.6 0.5-5.4-2.5-10.6z M12 17c-1.7 0-3-1.3-3-3c0-1 0.4-1.8 1-2.5c0.3 1 1.2 1.5 2 1.5c1.7 0 3 1.3 3 3s-1.3 1-3 1z\"/>\n          </svg>\n        </span>\n      </div>\n      <div class=\"axe-track\" id=\"axe-track\"></div>\n\n      <!-- État actuel -->\n      <div class=\"axe-state-box equil\" id=\"axe-state-box\">\n        <span class=\"axe-state-title equil\" id=\"axe-state-title\">Équilibre</span>\n        <div class=\"axe-state-meca\" id=\"axe-state-meca\">Magie stable. Aucun modificateur. La Glyphe ne tire pas.</div>\n        <div class=\"axe-state-risque\" id=\"axe-state-risque\"></div>\n      </div>\n\n      <div style=\"font-size:0.7rem;color:var(--SUB);font-style:italic;text-align:center;margin-bottom:0.8rem;line-height:1.45;\">\n        L'axe se déplace <strong style=\"color:var(--parchment);\">automatiquement</strong> selon le résultat du jet d'Affinité et certains effets de table.\n      </div>\n\n      <!-- ════ JET D'AFFINITÉ ════ -->\n      <div class=\"jet-mode-row\">\n        <button class=\"jet-mode-btn jet-mode-mald\" onclick=\"axeJetAffinite('mald')\">\n          <svg class=\"icon-svg icon-flocon\" width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"/><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"/><line x1=\"19.07\" y1=\"4.93\" x2=\"4.93\" y2=\"19.07\"/></svg>\n          Sur Maladresse\n        </button>\n        <button class=\"jet-mode-btn jet-mode-crit\" onclick=\"axeJetAffinite('crit')\">\n          <svg class=\"icon-svg icon-flamme\" width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2c-0.5 3-2.5 5-4 7c-1.5 2-2 4-2 6c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-0.4-2.8-1.1-4c-0.7 1-1.6 1.6-2.4 1.6c1-2.6 0.5-5.4-2.5-10.6z\"/></svg>\n          Sur Critique\n        </button>\n      </div>\n\n      <!-- Résultat du jet -->\n      <div class=\"affinite-result\" id=\"affinite-result\">\n        <div class=\"affinite-result-dice\" id=\"affinite-dice\"></div>\n        <div class=\"affinite-result-palier\" id=\"affinite-palier\"></div>\n        <div class=\"affinite-result-name\"  id=\"affinite-name\"></div>\n        <div class=\"affinite-result-desc\"  id=\"affinite-desc\"></div>\n      </div>\n\n      <!-- Sortir de la Glaciation -->\n      <div style=\"margin-top:0.8rem;padding:0.65rem 0.8rem;background:rgba(74,90,122,0.07);border:1px solid rgba(138,172,204,0.25);border-radius:2px;\">\n        <div style=\"font-family:'Cinzel',serif;font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;color:#8aaccc;margin-bottom:0.4rem;\">Sortir de la Glaciation (G1 à G4)</div>\n        <div style=\"font-size:0.78rem;color:var(--parchment-dark);line-height:1.55;\">\n          La Glaciation est subie via les Maladresses. Pour s'en extraire avant d'atteindre G5, deux portes :\n        </div>\n        <ul style=\"font-size:0.78rem;color:var(--parchment-dark);line-height:1.55;margin:0.35rem 0 0 1rem;padding:0;list-style:disc;\">\n          <li><strong style=\"color:var(--parchment);\">Recentrage (en combat)</strong> : Ephraïm consacre <strong>une action complète</strong> (pas d'autre action ce tour) à se recentrer sur Aqshy. Test de <strong>Force Mentale</strong>. <em>Succès</em> : l'axe se rapproche de l'Équilibre de 1 cran. <em>Critique</em> : 2 crans. <em>Échec</em> : aucun effet. <em>Maladresse</em> : l'axe glisse d'1 cran de plus vers la Glaciation (le recentrage rate, le Vent fuit).</li>\n          <li><strong style=\"color:var(--parchment);\">Décrue (hors combat)</strong> : pendant un repos court (15-30 minutes) ou tout temps calme équivalent, l'axe revient automatiquement de 1 cran vers l'Équilibre.</li>\n        </ul>\n      </div>\n\n      <!-- Boutons des tables d'effets cote a cote -->\n      <div style=\"display:flex;gap:0.4rem;margin-top:0.7rem;margin-bottom:0.4rem;\">\n        <button class=\"axe-btn axe-btn-glace\" style=\"flex:1;\" onclick=\"document.getElementById('table-glace').classList.toggle('visible')\">\n          <svg class=\"icon-svg icon-flocon\" width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"/><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"/><line x1=\"19.07\" y1=\"4.93\" x2=\"4.93\" y2=\"19.07\"/></svg>\n          Table des effets de Glaciation\n        </button>\n        <button class=\"axe-btn axe-btn-feu\" style=\"flex:1;\" onclick=\"document.getElementById('table-feu').classList.toggle('visible')\">\n          Table des effets d'Embrasement\n          <svg class=\"icon-svg icon-flamme\" width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2c-0.5 3-2.5 5-4 7c-1.5 2-2 4-2 6c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-0.4-2.8-1.1-4c-0.7 1-1.6 1.6-2.4 1.6c1-2.6 0.5-5.4-2.5-10.6z\"/></svg>\n        </button>\n      </div>\n\n      <!-- Table Glaciation -->\n      <div class=\"effet-panel glace\" id=\"table-glace\">\n        <div class=\"effet-panel-title\">Effets de Glaciation (1d10) — actifs uniquement au Degré 5</div>\n        <ol>\n          <li><strong>Compression maîtrisée.</strong> La Glyphe enserre les Vents avec précision. Le prochain sort, même raté, ne déclenchera pas d'Incantation Imparfaite (le double sur échec sera traité comme un simple échec).</li>\n          <li><strong>Glyphe résonante.</strong> La Glyphe agit comme un tampon contre l'Aethyr. Le prochain sort d'Ephraïm ignore les éventuelles pénalités externes (vent, distractions, blessures légères).</li>\n          <li><strong>Préservation.</strong> Le froid durcit la peau d'Ephraïm. La prochaine Blessure qu'il subirait est réduite de 1 point (minimum 0). Effet à usage unique, jusqu'à la fin de la scène.</li>\n          <li><strong>Souffle visible et audible.</strong> Sa respiration produit une buée blanche et un bruit grave perceptible à plusieurs mètres. -10 à Discrétion pendant 1 scène.</li>\n          <li><strong>Givre sur les mains.</strong> Les mains d'Ephraïm sont engourdies par le froid. Son prochain sort nécessitant un contact physique ou un geste précis subit -10 à l'Incantation.</li>\n          <li><strong>Onde de froid.</strong> Une vague de froid s'échappe d'Ephraïm. La cible la plus proche dans un rayon de 2 mètres subit 1 Blessure (dégâts de froid, ignore les armures légères de PA 1).</li>\n          <li><strong>Éclat de givre.</strong> Un fragment de glace jaillit involontairement de la Glyphe. Le prochain sort d'Ephraïm subit <strong>−1 DR de Focalisation</strong> (ou <strong>−1 DR d'Incantation</strong> si le sort est lancé sans Focalisation). Et l'éclat file vers une cible aléatoire dans un rayon de 5 mètres (alliés inclus) et inflige <strong>1 Blessure</strong>.</li>\n          <li><strong>Ralentissement.</strong> Le corps d'Ephraïm devient lourd, raide. Il perd 1 point de Mouvement (M) pendant 3 rounds.</li>\n          <li><strong>Onde de gel.</strong> Une vague de froid se propage autour d'Ephraïm sur un rayon de 3 mètres. Toutes les créatures dans la zone (alliés inclus) doivent réussir un test d'<strong>Endurance</strong> (DR standard). Échec : la créature laisse échapper ce qu'elle tient en main (arme, bâton, parchemin...) et perd 1 point de Mouvement (M) pendant 1d6 rounds. <em>Ephraïm est seul épargné</em> (il est l'œil du gel).</li>\n          <li><strong>Rupture inverse — Nova de glace.</strong> La compression de la Glyphe cède brutalement : pic de Glaciation visible (cheveux blancs un instant, halo de givre autour de lui) puis effondrement. <em>Effet mécanique :</em> l'axe est immédiatement remis à 0. Une nova de glace se propage dans un rayon de 3 mètres : toutes les créatures dans la zone (alliés inclus) subissent <strong>2 Blessures</strong> et perdent <strong>1 point de Mouvement (M) pendant 1d6 rounds</strong>. <em>Ephraïm est seul épargné.</em> <em>Effet narratif :</em> les témoins doivent réussir un test de Sang-Froid (DR standard) ou subir l'état <em>Effrayé</em> 1.</li>\n        </ol>\n        <button class=\"axe-btn axe-btn-glace\" style=\"margin-top:0.4rem;\" onclick=\"effetRoll('glace')\">Lancer 1d10</button>\n        <div class=\"effet-result glace\" id=\"result-glace\"></div>\n      </div>\n\n      <!-- Table Embrasement -->\n      <div class=\"effet-panel feu\" id=\"table-feu\">\n        <div class=\"effet-panel-title\">Effets d'Embrasement (1d10) — actifs uniquement au Degré 5</div>\n        <ol>\n          <li><strong>Embrasement d'objet.</strong> L'arme tenue par Ephraïm (bâton, épée, dague…) s'embrase pendant <strong>4 rounds</strong> sans le brûler — le feu danse sur la lame ou le bois mais ne le consume pas. Si l'arme est <em>magique</em>, elle provoque l'état <strong>Enflammé</strong> sur ses cibles touchées pendant la durée.</li>\n          <li><strong>Mirage de chaleur.</strong> L'air autour d'Ephraïm se trouble, déformé par la chaleur. Les attaquants ont du mal à le viser : -10 à la CC et CT contre lui pendant ce round.</li>\n          <li><strong>Regard brûlant.</strong> Les yeux d'Ephraïm rougeoient comme des braises. L'adversaire au contact ce round doit réussir un test de Sang-Froid (DR standard) ou subir l'état <em>Effrayé</em> 1.</li>\n          <li><strong>Explosion de pression.</strong> Une onde de souffle se propage autour d'Ephraïm (cône de 3 mètres dans la direction de son choix). Toutes les créatures dans le cône reculent de <strong>2 mètres</strong> et doivent réussir un test d'<strong>Agilité</strong> (DR standard). Échec : la créature subit l'état <em>À terre</em>.</li>\n          <li><strong>Éruption de chaleur.</strong> Le sol s'embrase autour d'Ephraïm. Une zone d'1 mètre de rayon devient brûlante : quiconque y reste ou y entre subit 1 Blessure par round (feu). L'effet dure 3 rounds.</li>\n          <li><strong>Chaîne de flamme.</strong> Le sort se propage en chaîne, frappant jusqu'à <strong>3 cibles au total</strong>. Après la cible principale, le feu saute vers la créature la plus proche (alliée ou ennemie, peu importe), puis encore vers la plus proche de celle-ci. Chaque cible touchée par la chaîne subit <strong>1d6 dégâts</strong>, sans aucun bonus ni multiplicateur (les bonus de dégâts du sort, les paliers d'Embrasement, le BFM, etc., ne s'appliquent pas à la propagation).</li>\n          <li><strong>Sort court mais net.</strong> Le sort se ramasse spatialement mais gagne en intensité. Sa <strong>portée est divisée par 2</strong>, mais il bénéficie de <strong>+3 DR de Focalisation gratuits</strong> (s'applique au test d'Incantation si le sort est lancé sans Focalisation).</li>\n          <li><strong>Voix d'Aqshy.</strong> Le Vent du Feu murmure à l'oreille d'Ephraïm et lance lui-même un sort qu'il connaît (au choix d'Ephraïm, parmi ceux de son grimoire). Aucun test d'Incantation ni de Focalisation requis, aucun coût de Focalisation, et le sort ne consomme pas l'action d'Ephraïm pour ce round. <strong>En contrepartie, les dégâts du sort sont divisés par 2</strong> (en Embrasement 5, le x2 passif et le /2 s'annulent, ramenant les dégâts au niveau d'un sort normal). Les autres effets du sort restent normaux : portée, durée, effets secondaires, états appliqués.</li>\n          <li><strong>Surge pur.</strong> Le sort en cours est lancé avec un effet maximal : tous les dégâts variables sont considérés au résultat maximum (un 1d10 devient 10, un 1d6 devient 6, etc.). Après résolution du sort, l'axe descend automatiquement de 2 vers la Glaciation.</li>\n          <li><strong>Bascule totale.</strong> Submergé par les Vents d'Aqshy. Le sort en cours est résolu normalement (avec le x2 passif d'Embrasement 5 qui s'applique déjà). <strong>Le prochain sort lancé par Ephraïm est une réussite automatique</strong> (pas de jet d'Incantation requis) et bénéficie de <strong>+BFM dégâts</strong> bonus. Après résolution du sort de Bascule, l'axe revient à l'équilibre (0).</li>\n        </ol>\n        <button class=\"axe-btn axe-btn-feu\" style=\"margin-top:0.4rem;\" onclick=\"effetRoll('feu')\">Lancer 1d10</button>\n        <div class=\"effet-result feu\" id=\"result-feu\"></div>\n      </div>\n\n    </div>\n\n  </div>",
    demarrer: function () { sceauLoad(); }
  });
})();

let sceauData = { axe: 0 };

const FEU_STATES = [
  null,
  { title:"Embrasement 1", mecaCls:"feu",
    meca:"+1 dégât aux sorts de feu. Yeux qui rougeoient. Chaleur rayonnante perceptible.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Embrasement 2", mecaCls:"feu",
    meca:"+1 DR de Focalisation gratuit (s'applique au test d'Incantation si le sort est lancé sans Focalisation). Sorts de zone gagnent +1m de rayon. Risque de brûler des objets proches.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Embrasement 3", mecaCls:"feu",
    meca:"Durée des effets de feu +1 round. AoE et portée +1m. +1 DR de Focalisation gratuit (s'applique au test d'Incantation si le sort est lancé sans Focalisation).",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Embrasement 4", mecaCls:"feu",
    meca:"+1 dégât. +1 DR de Focalisation gratuit (s'applique au test d'Incantation si le sort est lancé sans Focalisation). Petite explosion à l'impact : un tiers des dégâts infligés à la cible principale (ou au point d'impact) est répercuté sur tout ce qui se trouve dans un rayon de 3m.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Embrasement 5", mecaCls:"feu",
    meca:"Puissance absolue. Les sorts d'Aqshy sont des réussites automatiques (pas de jet d'Incantation requis), mais le d100 est tout de même lancé. Les effets de tous les sorts sont doublés (dégâts, durées, portées : x2).",
    risque:"Jet d'effet d'Embrasement obligatoire après chaque sort lancé. Si Bascule totale tombe (10), l'apothéose : sort en cours x2 + prochain sort en réussite automatique avec +BFM dégâts, puis retour à l'équilibre." },
];

const GLACE_STATES = [
  null, // index 0 non utilisé
  { title:"Glaciation 1", mecaCls:"glace",
    meca:"Feu contraint. -1 dégât aux sorts de feu. Souffle visible, léger.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Glaciation 2", mecaCls:"glace",
    meca:"-2 dégâts. Difficulté de concentration : Focalisation à -5. Traînées de givre sur les sorts.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Glaciation 3", mecaCls:"glace",
    meca:"-3 dégâts. Focalisation à -10. Sort raté = gel partiel d'une main (1 round). La Glyphe pulse.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Glaciation 4", mecaCls:"glace",
    meca:"-4 dégâts. Douleur sourde : 1 Blessure. La Glyphe est visible sur la peau.",
    risque:"Effets passifs seulement. Pas de jet de table." },
  { title:"Glaciation 5", mecaCls:"glace",
    meca:"Sorts d'Aqshy impossibles. Feu totalement comprimé. Ephraïm peut tenter de forcer un sort de feu malgré tout, mais l'action prend 1 round complet (la Glyphe doit être déchirée par la force du Vent) : l'axe avance alors de +3 crans vers l'Embrasement (Glaciation 5 → Glaciation 2 ; Glaciation 4 → Glaciation 1 ; etc.).",
    risque:"Jet d'effet de Glaciation obligatoire après chaque sort lancé. Peur 1 pour témoins proches." },
];

function renderAxe() {
  const axe = sceauData.axe;
  const track = document.getElementById('axe-track'); if(!track) return;
  track.innerHTML='';

  // 5 pips Glaciation (gauche, axe -5 a -1) — affichage seul, non cliquable
  for(let i=5;i>=1;i--){
    const pip=document.createElement('div');
    const on = axe <= -i;
    pip.className='axe-pip glace-'+i+(on?' on':'');
    pip.title='Glaciation '+i;
    pip.style.cursor='default';
    track.appendChild(pip);
  }

  // Centre — affichage seul, non cliquable
  const centre=document.createElement('div');
  centre.className='axe-pip centre'+(axe===0?' on':'');
  centre.title='Équilibre';
  centre.style.cursor='default';
  track.appendChild(centre);

  // 5 pips Embrasement (droite, axe +1 a +5) — affichage seul, non cliquable
  for(let i=1;i<=5;i++){
    const pip=document.createElement('div');
    const on = axe >= i;
    pip.className='axe-pip feu-'+i+(on?' on':'');
    pip.title='Embrasement '+i;
    pip.style.cursor='default';
    track.appendChild(pip);
  }

  // Etat
  let stateData;
  if(axe===0)     stateData = EQUIL_STATE;
  else if(axe<0)  stateData = GLACE_STATES[Math.abs(axe)];
  else             stateData = FEU_STATES[axe];

  const box   = document.getElementById('axe-state-box');
  const title = document.getElementById('axe-state-title');
  const meca  = document.getElementById('axe-state-meca');
  const risq  = document.getElementById('axe-state-risque');
  if(box && stateData){
    box.className   = 'axe-state-box '+stateData.mecaCls;
    title.className = 'axe-state-title '+stateData.mecaCls;
    title.textContent = stateData.title;
    meca.textContent  = stateData.meca;
    risq.textContent  = stateData.risque||'';
  }
}

function renderSeuilTable() {
  // L'élément d'info affiché ici a été retiré de la fiche : cette fonction
  // est conservée vide pour ne pas casser les appels existants (sceauRender,
  // axeJetAffinite, effetRoll).
}

function sceauLoad() {
  const raw = MODULES.lire("sceaux");
  if(raw) try {
    const d=JSON.parse(raw);
    if(d.axe!==undefined) sceauData.axe=Math.max(-5,Math.min(5,d.axe));
  } catch(e){}
  sceauRender();
}

function sceauSave() { MODULES.ecrire("sceaux", JSON.stringify(sceauData)); }

function sceauRender() { renderAxe(); renderSeuilTable(); }
