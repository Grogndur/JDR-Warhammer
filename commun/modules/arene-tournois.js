/* Arène et Tournois — mécanique de Den'l Endri
   Module autonome. Les données sont sauvegardées avec la fiche, donc en ligne.
   Généré depuis den.html, code d'origine conservé. */
(function () {
  MODULES.enregistrer({
    id: "arene-tournois",
    titre: "Arène et Tournois",
    css: ".arena-section { border-color: rgba(184,146,42,0.25); }\n.arena-tabs { display:flex; gap:0.3rem; margin-bottom:1rem; flex-wrap:wrap; }\n.arena-tab { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase;\n    padding:0.35rem 0.7rem; border-radius:2px; cursor:pointer; transition:all 0.15s;\n    background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); color:var(--SUB); }\n.arena-tab:hover { border-color:rgba(184,146,42,0.3); color:var(--GLD); }\n.arena-tab.active { background:rgba(184,146,42,0.12); border-color:rgba(184,146,42,0.4); color:var(--GLD); }\n.arena-panel { display:none; }\n.arena-panel.visible { display:block; }\n.renown-bar { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; padding:0.6rem 0.8rem;\n    background:rgba(184,146,42,0.06); border:1px solid rgba(184,146,42,0.15); border-radius:2px; flex-wrap:wrap; }\n.renown-score { font-family:'Cinzel',serif; font-size:1.8rem; color:var(--GLD); line-height:1; }\n.renown-label { font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--SUB); }\n.renown-stats { display:flex; gap:1rem; flex-wrap:wrap; }\n.renown-stat { text-align:center; }\n.renown-stat-val { font-family:'Cinzel',serif; font-size:1.1rem; color:var(--parchment); display:block; }\n.renown-stat-lbl { font-size:0.55rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--SUB); }\n.bracket-container { overflow-x:auto; padding:0.5rem 0; }\n.bracket { display:flex; align-items:center; gap:0; min-width:fit-content; }\n.bracket-round { display:flex; flex-direction:column; justify-content:center; gap:0; position:relative; }\n.bracket-match { display:flex; flex-direction:column; position:relative; margin:0.3rem 0; }\n.bracket-slot { display:flex; align-items:center; gap:0.3rem; padding:0.3rem 0.5rem;\n    background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);\n    min-width:120px; font-size:0.78rem; color:var(--parchment-dark); cursor:pointer; transition:all 0.12s; }\n.bracket-slot:first-child { border-radius:2px 2px 0 0; border-bottom:1px solid rgba(184,146,42,0.2); }\n.bracket-slot:last-child { border-radius:0 0 2px 2px; }\n.bracket-slot:hover { border-color:rgba(184,146,42,0.35); }\n.bracket-slot.winner { background:rgba(94,128,79,0.12); border-color:rgba(94,128,79,0.3); color:var(--acc2); }\n.bracket-slot.champion { background:rgba(184,146,42,0.1); border:2px solid var(--GLD); color:var(--GLD); box-shadow:0 0 8px rgba(184,146,42,0.25), inset 0 0 6px rgba(184,146,42,0.08); }\n.bracket-slot.loser { opacity:0.45; }\n.bracket-slot.den { font-weight:600; color:var(--acc2); }\n.bracket-slot.empty { color:var(--SUB); font-style:italic; opacity:0.5; }\n.bracket-name { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.bracket-win-btn { width:20px; height:20px; display:flex; align-items:center; justify-content:center;\n    font-size:0.7rem; color:var(--SUB); opacity:0.3; cursor:pointer; border-radius:2px;\n    border:1px solid transparent; transition:all 0.12s; flex-shrink:0; }\n.bracket-win-btn:hover { opacity:1; color:var(--GRN); border-color:rgba(94,128,79,0.3); background:rgba(94,128,79,0.1); }\n.bracket-win-btn.active { opacity:1; color:var(--GRN); background:rgba(94,128,79,0.15); border-color:rgba(94,128,79,0.4); }\n.bracket-connector { width:20px; position:relative; }\n.bracket-round-label { font-family:'Cinzel',serif; font-size:0.55rem; letter-spacing:0.12em;\n    text-transform:uppercase; color:var(--SUB); text-align:center; margin-bottom:0.4rem; }\n.podium { display:flex; flex-direction:column; gap:0.3rem; min-width:140px; }\n.podium-entry { display:flex; align-items:center; gap:0.4rem; font-size:0.82rem; padding:0.25rem 0.4rem;\n    border-radius:2px; background:rgba(255,255,255,0.02); }\n.podium-medal { font-family:'Cinzel',serif; font-size:0.85rem; font-weight:700; min-width:20px; text-align:center; }\n.podium-medal.gold { color:var(--GLD); }\n.podium-medal.silver { color:#a0a8b8; }\n.podium-medal.bronze { color:#c08050; }\n.podium-name { color:var(--parchment-dark); font-size:0.8rem; }\n.podium-name.den { color:var(--acc2); font-weight:600; }\n.glory-row { display:flex; gap:0.8rem; align-items:stretch; margin-bottom:0.8rem; flex-wrap:wrap; }\n.glory-rank-box { flex:1; min-width:180px; background:rgba(184,146,42,0.06); border:1px solid rgba(184,146,42,0.18);\n    border-radius:2px; padding:0.6rem 0.8rem; }\n.glory-rank-title { font-family:'Cinzel',serif; font-size:0.9rem; color:var(--GLD); }\n.glory-rank-sub { font-size:0.7rem; color:var(--SUB); font-style:italic; margin-top:0.15rem; }\n.glory-progress { height:4px; background:rgba(255,255,255,0.06); border-radius:2px; margin-top:0.4rem; overflow:hidden; }\n.glory-progress-fill { height:100%; background:var(--GLD); border-radius:2px; transition:width 0.4s; }\n.momentum-box { min-width:120px; background:rgba(94,128,79,0.06); border:1px solid rgba(94,128,79,0.18);\n    border-radius:2px; padding:0.6rem 0.8rem; text-align:center; }\n.momentum-box.hot { border-color:rgba(184,146,42,0.4); background:rgba(184,146,42,0.08); }\n.momentum-val { font-family:'Cinzel',serif; font-size:1.6rem; line-height:1; }\n.momentum-label { font-size:0.55rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--SUB); margin-top:0.2rem; }\n.momentum-flames { display:flex; gap:0.15rem; justify-content:center; margin-top:0.3rem; }\n.momentum-flame { font-size:0.7rem; opacity:0.15; }\n.momentum-flame.on { opacity:1; }\n.tourney-list-item { display:flex; align-items:center; gap:0.6rem; padding:0.55rem 0.4rem;\n    border-bottom:1px solid rgba(255,255,255,0.04); cursor:pointer; transition:background 0.12s; }\n.tourney-list-item:hover { background:rgba(184,146,42,0.05); }\n.tourney-list-item:last-child { border-bottom:none; }\n.tourney-placement { font-family:'Cinzel',serif; font-size:1rem; min-width:28px; text-align:center; }\n.tourney-placement.gold { color:var(--GLD); }\n.tourney-placement.silver { color:#a0a0b0; }\n.tourney-placement.bronze { color:#b0785a; }\n.tourney-placement.other { color:var(--SUB); }\n.tourney-info { flex:1; }\n.tourney-name { color:var(--parchment); font-size:0.88rem; font-weight:600; }\n.tourney-meta { font-size:0.72rem; color:var(--SUB); font-style:italic; }\n.tourney-renown-gain { font-family:'Cinzel',serif; font-size:0.8rem; color:var(--GLD); white-space:nowrap; }\n.tourney-form { background:rgba(184,146,42,0.04); border:1px solid rgba(184,146,42,0.15);\n    border-radius:2px; padding:0.8rem; margin-top:0.5rem; }\n.tourney-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; }\n.tourney-form-full { grid-column:1/-1; }",
    html: "<div class=\"card full arena-section\">\n    <div class=\"card-title gld\">⚔ Arène & Tournois</div>\n\n    <!-- Renommée globale -->\n    <div class=\"renown-bar\" id=\"renown-bar\">\n      <div>\n        <span class=\"renown-label\">Renommée</span>\n        <span class=\"renown-score\" id=\"renown-total\">0</span>\n      </div>\n      <div class=\"renown-stats\" id=\"renown-stats\"></div>\n    </div>\n    <div class=\"glory-row\">\n      <div class=\"glory-rank-box\" id=\"glory-rank-box\"></div>\n      <div class=\"momentum-box\" id=\"momentum-box\"></div>\n    </div>\n    <div class=\"bonus-list\" id=\"bonus-list\"></div>\n\n    <!-- Tabs -->\n    <div class=\"arena-tabs\">\n      <div class=\"arena-tab active\" onclick=\"arenaTab('tourneys')\">Historique</div>\n      <div class=\"arena-tab\" onclick=\"arenaTab('bracket')\">Tournoi actif</div>\n      <div class=\"arena-tab\" onclick=\"arenaTab('create')\">+ Nouveau</div>\n    </div>\n\n    <!-- Panel : Historique -->\n    <div class=\"arena-panel visible\" id=\"arena-panel-tourneys\">\n      <div id=\"tourney-history-list\">\n        <div style=\"font-size:0.82rem;color:var(--SUB);font-style:italic;\">Aucun tournoi enregistré.</div>\n      </div>\n    </div>\n\n    <!-- Panel : Tournoi actif (bracket) -->\n    <div class=\"arena-panel\" id=\"arena-panel-bracket\">\n      <div id=\"active-tourney-header\"></div>\n      <div class=\"bracket-container\" id=\"bracket-container\">\n        <div style=\"font-size:0.82rem;color:var(--SUB);font-style:italic;\">Aucun tournoi actif. Crée un nouveau tournoi.</div>\n      </div>\n      <div id=\"match-detail-panel\"></div>\n    </div>\n\n    <!-- Panel : Création -->\n    <div class=\"arena-panel\" id=\"arena-panel-create\">\n      <div class=\"tourney-form\">\n        <div class=\"tourney-form-grid\">\n          <div class=\"tourney-form-full\">\n            <span class=\"tf-label\">Nom du tournoi</span>\n            <input class=\"tf-input\" id=\"tf-name\" placeholder=\"Le Grand Tournoi de Nuln…\" />\n          </div>\n          <div>\n            <span class=\"tf-label\">Lieu</span>\n            <input class=\"tf-input\" id=\"tf-lieu\" placeholder=\"Nuln, Arène des Lames…\" />\n          </div>\n          <div>\n            <span class=\"tf-label\">Date (en jeu)</span>\n            <input class=\"tf-input\" id=\"tf-date\" placeholder=\"32 Jahrdrung 2512…\" />\n          </div>\n          <div>\n            <span class=\"tf-label\">Type</span>\n            <select class=\"tf-select\" id=\"tf-type\">\n              <option value=\"melee\">Mêlée</option>\n              <option value=\"duel\">Duel</option>\n              <option value=\"archery\">Tir à l'arc</option>\n              <option value=\"mixed\">Mixte</option>\n            </select>\n          </div>\n          <div>\n            <span class=\"tf-label\">Participants</span>\n            <select class=\"tf-select\" id=\"tf-size\">\n              <option value=\"4\">4</option>\n              <option value=\"8\" selected>8</option>\n              <option value=\"16\">16</option>\n            </select>\n          </div>\n          <div>\n            <span class=\"tf-label\">Prestige</span>\n            <div style=\"display:flex;gap:0.3rem;margin-top:0.25rem;\" id=\"tf-prestige-picker\"></div>\n          </div>\n          <div class=\"tourney-form-full\">\n            <span class=\"tf-label\">Récompenses</span>\n            <input class=\"tf-input\" id=\"tf-reward\" placeholder=\"50 Co, Épée de maître, Titre…\" />\n          </div>\n        </div>\n        <div style=\"display:flex;gap:0.5rem;margin-top:0.7rem;\">\n          <button class=\"btn-add btn-gld\" onclick=\"createTourney()\">Créer le tournoi</button>\n        </div>\n      </div>\n    </div>\n  </div>",
    demarrer: function () { if(typeof renderActiveBracket==="function") renderActiveBracket(); }
  });
})();

const GLORY_RANKS = [
  { min:0,   name:'Inconnue',           desc:'Aucune réputation dans les arènes', bonuses:[] },
  { min:10,  name:'Novice',             desc:'Un nom qui commence à circuler', bonuses:[
    { type:'rank', text:'+5 Charme / Intimidation (région du tournoi)' }
  ]},
  { min:30,  name:'Lame reconnue',      desc:'Les parieurs la connaissent', bonuses:[
    { type:'rank', text:'+10 Charme / Intimidation (régional)' },
    { type:'rank', text:'+10% gains de bourse en tournoi' }
  ]},
  { min:60,  name:'Championne',         desc:'Sa réputation traverse les provinces', bonuses:[
    { type:'rank', text:'+15 Charme / Intimidation (tout l\'Empire)' },
    { type:'rank', text:'+20% gains de bourse' },
    { type:'rank', text:'Statut social +1 (cités d\'arène)' }
  ]},
  { min:100, name:'Terreur des arènes', desc:'Son nom seul fait hésiter', bonuses:[
    { type:'rank', text:'+20 Charme / Intimidation' },
    { type:'rank', text:'+30% gains de bourse' },
    { type:'rank', text:'Statut social +1 partout' },
    { type:'rank', text:'Adversaires : -10 Calme face à Den' }
  ]},
  { min:150, name:'Légende vivante',    desc:'Les bardes chantent ses exploits', bonuses:[
    { type:'rank', text:'+25 Charme / Intimidation' },
    { type:'rank', text:'+50% gains de bourse' },
    { type:'rank', text:'Statut social +2' },
    { type:'rank', text:'Adversaires : -10 Calme face à Den' },
    { type:'rank', text:'Mécènes et sponsors potentiels' }
  ]}
];

const MOMENTUM_TIERS = [
  { min:0, bonuses:[] },
  { min:1, bonuses:[{ type:'momentum', text:'+5 Intimidation (momentum)' }] },
  { min:3, bonuses:[{ type:'momentum', text:'+10 Intimidation (momentum)' }, { type:'momentum', text:'+5 Charme (momentum)' }] },
  { min:5, bonuses:[{ type:'momentum', text:'+15 Intimidation (momentum)' }, { type:'momentum', text:'+10 Charme (momentum)' }, { type:'momentum', text:'Adversaires : -5 Calme (momentum)' }] },
  { min:7, bonuses:[{ type:'momentum', text:'+20 Intimidation (momentum)' }, { type:'momentum', text:'+15 Charme (momentum)' }, { type:'momentum', text:'Adversaires : -10 Calme (momentum)' }] }
];

function initPrestigePicker() {
  const c = document.getElementById('tf-prestige-picker');
  if (!c) return;
  c.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const sw = document.createElement('span');
    sw.className = 'prestige-sword' + (i <= tfPrestige ? ' on' : '');
    sw.textContent = '⚔';
    sw.style.cursor = 'pointer';
    sw.style.fontSize = '1.1rem';
    sw.onclick = () => { tfPrestige = i; initPrestigePicker(); };
    c.appendChild(sw);
  }
}

function propagateWinner(t, r, m) {
  const match = t.bracket[r][m];
  if (match.winner === null) return;
  const winnerName = match.slots[match.winner];
  const loserName = match.slots[1 - match.winner];
  const nextRound = r + 1;
  if (nextRound >= t.bracket.length) return;
  const nextMatch = Math.floor(m / 2);
  const nextSlot = m % 2;
  if (t.bracket[nextRound] && t.bracket[nextRound][nextMatch]) {
    t.bracket[nextRound][nextMatch].slots[nextSlot] = winnerName;
  }
  // If this is a semi-final (round before last), propagate loser to petite finale
  if (nextRound === t.bracket.length - 1 && t.petiteFinale) {
    t.petiteFinale.slots[m % 2] = loserName || '';
  }
}

function calcPlacement(t) {
  // Find Den's furthest round
  const denName = "Den'l Endri";
  let lastRoundWon = -1;
  for (let r = 0; r < t.bracket.length; r++) {
    for (let m = 0; m < t.bracket[r].length; m++) {
      const match = t.bracket[r][m];
      if (match.winner !== null) {
        const winner = match.slots[match.winner];
        const loser = match.slots[1 - match.winner];
        if (winner && winner.toLowerCase().includes("den")) lastRoundWon = r;
        if (loser && loser.toLowerCase().includes("den")) {
          // Den lost at round r → placement depends on round
          const remaining = t.bracket.length - r;
          if (remaining === 1) return 2; // lost finale
          if (remaining === 2) return 3; // lost demi
          return t.size / Math.pow(2, r) + 1; // approximate
        }
      }
    }
  }
  // Check if Den won the final
  const finalRound = t.bracket[t.bracket.length - 1];
  if (finalRound && finalRound[0] && finalRound[0].winner !== null) {
    const winner = finalRound[0].slots[finalRound[0].winner];
    if (winner && winner.toLowerCase().includes("den")) return 1;
  }
  // Still in tournament or no matches
  return null;
}

function renderRenown() {
  const r = calcRenown();
  document.getElementById('renown-total').textContent = r.total;
  const statsEl = document.getElementById('renown-stats');
  statsEl.innerHTML = `
    <div class="renown-stat"><span class="renown-stat-val">${r.tourneys}</span><span class="renown-stat-lbl">Tournois</span></div>
    <div class="renown-stat"><span class="renown-stat-val" style="color:var(--GRN);">${r.wins}</span><span class="renown-stat-lbl">Victoires</span></div>
    <div class="renown-stat"><span class="renown-stat-val" style="color:#c07060;">${r.losses}</span><span class="renown-stat-lbl">Défaites</span></div>
    <div class="renown-stat"><span class="renown-stat-val">${r.wins + r.losses > 0 ? Math.round(r.wins / (r.wins + r.losses) * 100) : 0}%</span><span class="renown-stat-lbl">Ratio</span></div>
    <div class="renown-stat"><span class="renown-stat-val">${r.bestStreak}</span><span class="renown-stat-lbl">Série max</span></div>
  `;

  // Glory rank
  const g = getGloryRank(r.total);
  const rankBox = document.getElementById('glory-rank-box');
  let progressHTML = '';
  if (g.next) {
    const pct = Math.min(100, Math.round((r.total - g.rank.min) / (g.next.min - g.rank.min) * 100));
    progressHTML = `<div class="glory-progress"><div class="glory-progress-fill" style="width:${pct}%"></div></div>
      <div style="font-size:0.6rem;color:var(--SUB);margin-top:0.2rem;">${r.total} / ${g.next.min} → ${g.next.name}</div>`;
  } else {
    progressHTML = '<div style="font-size:0.6rem;color:var(--GLD);margin-top:0.2rem;">Rang maximum atteint</div>';
  }
  rankBox.innerHTML = `
    <div style="font-size:0.55rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--SUB);margin-bottom:0.15rem;">Rang de Gloire</div>
    <div class="glory-rank-title">${g.rank.name}</div>
    <div class="glory-rank-sub">${g.rank.desc}</div>
    ${progressHTML}
  `;

  // Momentum
  const momBox = document.getElementById('momentum-box');
  const momColor = r.momentum >= 7 ? 'var(--GLD)' : r.momentum >= 3 ? 'var(--acc2)' : 'var(--parchment)';
  const isHot = r.momentum >= 5;
  momBox.className = 'momentum-box' + (isHot ? ' hot' : '');
  let flamesHTML = '<div class="momentum-flames">';
  for (let i = 0; i < 7; i++) {
    flamesHTML += '<span class="momentum-flame' + (i < r.momentum ? ' on' : '') + '">🔥</span>';
  }
  flamesHTML += '</div>';
  momBox.innerHTML = `
    <div class="momentum-label">Momentum</div>
    <div class="momentum-val" style="color:${momColor};">${r.momentum}</div>
    ${flamesHTML}
    <div style="font-size:0.58rem;color:var(--SUB);margin-top:0.2rem;font-style:italic;">${r.momentum === 0 ? 'Inactif' : r.momentum < 3 ? 'En montée' : r.momentum < 5 ? 'Lancée' : r.momentum < 7 ? 'En feu' : 'Imparable'}</div>
  `;

  // Bonus list
  const bonusList = document.getElementById('bonus-list');
  const momTier = getMomentumTier(r.momentum);
  const allBonuses = [...g.rank.bonuses, ...momTier.bonuses];
  if (allBonuses.length === 0) {
    bonusList.innerHTML = '<div style="font-size:0.78rem;color:var(--SUB);font-style:italic;">Aucun bonus actif.</div>';
  } else {
    bonusList.innerHTML = '<div style="font-size:0.55rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--SUB);margin-bottom:0.35rem;font-family:\'Cinzel\',serif;">Bonus actifs</div>' +
      allBonuses.map(b => `<div class="bonus-item"><span class="bonus-tag ${b.type}">${b.type === 'rank' ? 'Rang' : 'Mom.'}</span> ${b.text}</div>`).join('');
  }
}

function buildPodiumHTML(t) {
  const rounds = t.bracket.length;
  const finale = t.bracket[rounds - 1] ? t.bracket[rounds - 1][0] : null;
  let first = '', second = '', third = '';

  // 1er et 2e : vainqueur et perdant de la finale
  if (finale && finale.winner !== null) {
    first = finale.slots[finale.winner] || '';
    second = finale.slots[1 - finale.winner] || '';
  }
  // 3e : vainqueur de la petite finale
  if (t.petiteFinale && t.petiteFinale.winner !== null) {
    third = t.petiteFinale.slots[t.petiteFinale.winner] || '';
  }

  if (!first && !second && !third) return '';

  function nameClass(n) { return (n.toLowerCase().includes("den'l") || n.toLowerCase().includes("den\u2019l")) ? 'podium-name den' : 'podium-name'; }

  let html = '<div class="podium">';
  if (first) html += '<div class="podium-entry"><span class="podium-medal gold">1</span><span class="' + nameClass(first) + '">' + first + '</span></div>';
  if (second) html += '<div class="podium-entry"><span class="podium-medal silver">2</span><span class="' + nameClass(second) + '">' + second + '</span></div>';
  if (third) html += '<div class="podium-entry"><span class="podium-medal bronze">3</span><span class="' + nameClass(third) + '">' + third + '</span></div>';
  html += '</div>';
  return html;
}

function prestigeHTML(level) {
  let h = '<span class="prestige-swords">';
  for (let i = 1; i <= 5; i++) h += '<span class="prestige-sword' + (i <= level ? ' on' : '') + '">⚔</span>';
  return h + '</span>';
}

function toggleWinner(r, m, s) {
  const t = getActiveTourney();
  if (!t || t.status === 'finished') return;
  const match = t.bracket[r][m];
  if (match.winner === s) {
    match.winner = null;
    clearPropagation(t, r, m);
  } else {
    match.winner = s;
    propagateWinner(t, r, m);
  }
  arenaSave();
  renderActiveBracket();
}

function calcRenown() {
  if (!state.arena || !state.arena.tourneys) return { total:0, wins:0, losses:0, tourneys:0, bestStreak:0, momentum:0 };
  let total = 0, wins = 0, losses = 0;
  let streak = 0, bestStreak = 0, momentum = 0;
  const finished = state.arena.tourneys.filter(t => t.status === 'finished');
  finished.forEach(t => {
    const p = t.placement || (t.bracket.length + 1);
    // Gains
    if (p === 1)      total += t.prestige * 10;
    else if (p === 2) total += t.prestige * 4;  // +6 -2 = net 4
    else if (p <= 4)  total += 0;               // +3 -3 = net 0
    else              total -= t.prestige * 3;  // +1 -4 = net -3

    if (p === 1) wins++;
    else losses++;

    // Walk bracket for individual match streak & momentum
    for (let r = 0; r < t.bracket.length; r++) {
      for (let m = 0; m < t.bracket[r].length; m++) {
        const match = t.bracket[r][m];
        if (match.winner === null) continue;
        const winner = (match.slots[match.winner] || '').toLowerCase();
        const loser = (match.slots[1 - match.winner] || '').toLowerCase();
        const denInMatch = winner.includes("den") || loser.includes("den");
        if (!denInMatch) continue;
        if (winner.includes("den")) {
          streak++;
          momentum++;
          bestStreak = Math.max(bestStreak, streak);
        } else {
          streak = 0;
          momentum = 0;
        }
      }
    }
  });
  total = Math.max(0, total);
  return { total, wins, losses, tourneys: finished.length, bestStreak, momentum };
}

function getGloryRank(total) {
  let rank = GLORY_RANKS[0];
  for (let i = GLORY_RANKS.length - 1; i >= 0; i--) {
    if (total >= GLORY_RANKS[i].min) { rank = GLORY_RANKS[i]; break; }
  }
  const idx = GLORY_RANKS.indexOf(rank);
  const next = idx < GLORY_RANKS.length - 1 ? GLORY_RANKS[idx + 1] : null;
  return { rank, next, idx };
}

function getMomentumTier(momentum) {
  let tier = MOMENTUM_TIERS[0];
  for (let i = MOMENTUM_TIERS.length - 1; i >= 0; i--) {
    if (momentum >= MOMENTUM_TIERS[i].min) { tier = MOMENTUM_TIERS[i]; break; }
  }
  return tier;
}

function clearPropagation(t, r, m) {
  const nextRound = r + 1;
  if (nextRound >= t.bracket.length) return;
  const nextMatch = Math.floor(m / 2);
  const nextSlot = m % 2;
  if (t.bracket[nextRound] && t.bracket[nextRound][nextMatch]) {
    t.bracket[nextRound][nextMatch].slots[nextSlot] = '';
    t.bracket[nextRound][nextMatch].winner = null;
    // Recursively clear
    clearPropagation(t, nextRound, nextMatch);
  }
  // If clearing a semi-final result, also clear petite finale slot
  if (nextRound === t.bracket.length - 1 && t.petiteFinale) {
    t.petiteFinale.slots[m % 2] = '';
    t.petiteFinale.winner = null;
  }
}

function arenaSave() { save(); }

function arenaTab(tab) {
  document.querySelectorAll('.arena-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.arena-panel').forEach(p => p.classList.remove('visible'));
  const tabs = { tourneys:0, bracket:1, create:2 };
  document.querySelectorAll('.arena-tab')[tabs[tab]].classList.add('active');
  document.getElementById('arena-panel-' + tab).classList.add('visible');
  if (tab === 'tourneys') renderTourneyHistory();
  if (tab === 'bracket') renderActiveBracket();
  if (tab === 'create') initPrestigePicker();
}

function buildBracket(size) {
  // bracket[roundIndex][matchIndex] = { slots: [name, name], winner: null (0 or 1) }
  const rounds = Math.log2(size);
  const bracket = [];
  for (let r = 0; r < rounds; r++) {
    const matchCount = size / Math.pow(2, r + 1);
    const round = [];
    for (let m = 0; m < matchCount; m++) {
      if (r === 0) {
        round.push({ slots: [m === 0 ? "Den'l Endri" : '', ''], winner: null });
      } else {
        round.push({ slots: ['', ''], winner: null });
      }
    }
    bracket.push(round);
  }
  return bracket;
}

function createTourney() {
  const name = document.getElementById('tf-name').value.trim();
  if (!name) return;
  const size = parseInt(document.getElementById('tf-size').value);
  const tourney = {
    id: Date.now().toString(36),
    name: name,
    lieu: document.getElementById('tf-lieu').value.trim() || '—',
    date: document.getElementById('tf-date').value.trim() || '—',
    type: document.getElementById('tf-type').value,
    size: size,
    prestige: tfPrestige,
    reward: document.getElementById('tf-reward').value.trim() || '—',
    status: 'active', // active | finished
    placement: null,
    bracket: buildBracket(size),
    petiteFinale: { slots: ['', ''], winner: null },
    matchNotes: {}
  };
  if (!state.arena) state.arena = { tourneys: [], activeTourneyId: null };
  state.arena.tourneys.push(tourney);
  state.arena.activeTourneyId = tourney.id;
  arenaSave();
  // Reset form
  ['tf-name','tf-lieu','tf-date','tf-reward'].forEach(id => document.getElementById(id).value = '');
  tfPrestige = 1;
  arenaTab('bracket');
}

function deleteTourney() {
  const t = getActiveTourney();
  if (!t) return;
  if (!confirm('Supprimer "' + t.name + '" ? Cette action est irréversible.')) return;
  state.arena.tourneys = state.arena.tourneys.filter(x => x.id !== t.id);
  if (state.arena.activeTourneyId === t.id) state.arena.activeTourneyId = null;
  arenaSave();
  arenaTab('tourneys');
}

function editBracketSlot(r, m, s, el) {
  const t = getActiveTourney();
  if (!t) return;
  // Allow editing even on finished tourneys? No, block it.
  if (t.status === 'finished') return;
  const match = t.bracket[r][m];
  const current = match.slots[s] || '';

  // Prevent re-entry if already editing
  if (el.querySelector('input')) return;

  const inp = document.createElement('input');
  inp.type = 'text';
  inp.value = current;
  inp.className = 'tf-input';
  inp.style.cssText = 'font-size:0.78rem;padding:0.15rem 0.35rem;min-width:90px;width:100%;';
  
  // Store original text, replace content
  const origText = el.textContent;
  el.textContent = '';
  el.appendChild(inp);
  inp.focus();
  inp.select();

  let committed = false;
  function commit() {
    if (committed) return;
    committed = true;
    const val = inp.value.trim();
    match.slots[s] = val;
    // If winner was set and name changed, re-propagate
    if (match.winner !== null) {
      propagateWinner(t, r, m);
    }
    arenaSave();
    renderActiveBracket();
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
    if (e.key === 'Escape') { committed = true; renderActiveBracket(); }
  });
}

function editPFSlot(s, el) {
  const t = getActiveTourney();
  if (!t || t.status === 'finished' || !t.petiteFinale) return;
  if (el.querySelector('input')) return;
  const current = t.petiteFinale.slots[s] || '';
  const inp = document.createElement('input');
  inp.type = 'text'; inp.value = current;
  inp.className = 'tf-input';
  inp.style.cssText = 'font-size:0.78rem;padding:0.15rem 0.35rem;min-width:90px;width:100%;';
  el.textContent = ''; el.appendChild(inp);
  inp.focus(); inp.select();
  let committed = false;
  function commit() {
    if (committed) return; committed = true;
    t.petiteFinale.slots[s] = inp.value.trim();
    arenaSave(); renderActiveBracket();
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
    if (e.key === 'Escape') { committed = true; renderActiveBracket(); }
  });
}

function finishTourney() {
  const tid = state.arena.activeTourneyId;
  if (!tid) return;
  const t = state.arena.tourneys.find(x => x.id === tid);
  if (!t) return;
  const placement = calcPlacement(t);
  if (placement === null) {
    if (!confirm("Le bracket n'est pas complètement rempli. Terminer quand même ? Den sera classée selon sa dernière victoire.")) return;
  }
  t.status = 'finished';
  t.placement = placement || (t.size);
  // Clear active tourney BEFORE switching tab
  state.arena.activeTourneyId = null;
  save();
  // Clear bracket display immediately
  document.getElementById('active-tourney-header').innerHTML = '';
  document.getElementById('bracket-container').innerHTML = '<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;">Tournoi terminé. Consulte l\'historique.</div>';
  document.getElementById('match-detail-panel').innerHTML = '';
  // Switch to historique
  setTimeout(function() { arenaTab('tourneys'); }, 50);
}

function getActiveTourney() {
  if (!state.arena || !state.arena.activeTourneyId) return null;
  return state.arena.tourneys.find(t => t.id === state.arena.activeTourneyId) || null;
}

function renderActiveBracket() {
  renderRenown();
  const t = getActiveTourney();
  const headerEl = document.getElementById('active-tourney-header');
  const bracketEl = document.getElementById('bracket-container');
  const detailEl = document.getElementById('match-detail-panel');
  detailEl.innerHTML = '';

  if (!t) {
    headerEl.innerHTML = '';
    bracketEl.innerHTML = '<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;">Aucun tournoi actif. Crée un nouveau tournoi.</div>';
    return;
  }

  // Ensure petiteFinale exists (for tourneys created before this feature)
  if (!t.petiteFinale) { t.petiteFinale = { slots: ['', ''], winner: null }; }

  // Header + Podium
  const podiumHTML = buildPodiumHTML(t);
  headerEl.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:0.7rem;margin-bottom:0.8rem;flex-wrap:wrap;">
      <div style="flex:1;">
        <div style="font-family:'Cinzel',serif;font-size:1.05rem;color:var(--parchment);">${t.name}</div>
        <div style="font-size:0.75rem;color:var(--SUB);font-style:italic;">${t.lieu} · ${t.date} · ${TYPE_LABELS[t.type] || t.type} · ${prestigeHTML(t.prestige)}</div>
        <div style="font-size:0.75rem;color:var(--GLD);margin-top:0.15rem;">Récompenses : ${t.reward}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem;">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          ${t.status === 'active' ? '<button class="btn-add btn-gld" onclick="finishTourney()" style="white-space:nowrap;">Terminer le tournoi</button>' : '<span style="font-family:\'Cinzel\',serif;font-size:0.65rem;letter-spacing:0.1em;color:var(--SUB);text-transform:uppercase;">Terminé</span>'}
          <span class="del-btn" onclick="deleteTourney()" title="Supprimer ce tournoi" style="font-size:0.9rem;">✕</span>
        </div>
        ${podiumHTML}
      </div>
    </div>
  `;

  // Build bracket visual
  const rounds = t.bracket.length;
  const roundLabels = [];
  if (rounds >= 4) roundLabels.push('1/' + Math.pow(2, rounds - 1));
  if (rounds >= 3) roundLabels.push('Quarts');
  if (rounds >= 2) roundLabels.push('Demis');
  roundLabels.push('Finale');
  while (roundLabels.length < rounds) roundLabels.unshift('Tour ' + (roundLabels.length + 1));

  const isActive = t.status === 'active';

  let html = '<div class="bracket">';
  for (let r = 0; r < rounds; r++) {
    const round = t.bracket[r];
    html += '<div class="bracket-round">';
    html += '<div class="bracket-round-label">' + roundLabels[r] + '</div>';
    for (let m = 0; m < round.length; m++) {
      const match = round[m];
      const topMargin = r === 0 ? 0 : (Math.pow(2, r) - 1) * 18;
      html += '<div class="bracket-match" style="margin:' + topMargin + 'px 0;">';
      for (let s = 0; s < 2; s++) {
        const name = match.slots[s] || '';
        const isDen = name.toLowerCase().includes("den'l") || name.toLowerCase().includes("den\u2019l");
        const isWinner = match.winner === s;
        const isLoser = match.winner !== null && match.winner !== s;
        const isEmpty = !name;
        let cls = 'bracket-slot';
        if (isDen) cls += ' den';
        if (isWinner) cls += ' winner';
        if (isWinner && r === rounds - 1) cls += ' champion';
        if (isLoser) cls += ' loser';
        if (isEmpty) cls += ' empty';
        const dataAttr = 'data-r="'+r+'" data-m="'+m+'" data-s="'+s+'"';

        html += '<div class="' + cls + '" ' + dataAttr + '>';
        // Nom (cliquable pour éditer)
        html += '<span class="bracket-name" ' + dataAttr + ' style="flex:1;cursor:pointer;" title="Cliquer pour éditer">' + (name || '· · ·') + '</span>';
        // Bouton victoire (seulement si le slot a un nom et tournoi actif)
        if (name && isActive) {
          const winCls = isWinner ? 'bracket-win-btn active' : 'bracket-win-btn';
          html += '<span class="' + winCls + '" ' + dataAttr + ' title="Marquer vainqueur">✓</span>';
        }
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    if (r < rounds - 1) {
      html += '<div class="bracket-connector"></div>';
    }
  }

  // Petite finale — inject into a new column aligned with finale
  if (t.petiteFinale && rounds >= 2) {
    const pf = t.petiteFinale;
    // Add a spacer + petite finale column
    html += '<div class="bracket-round" style="margin-left:20px;">';
    html += '<div class="bracket-round-label" style="visibility:hidden;">.</div>';
    // Push down to align below finale
    const finaleOffset = rounds >= 2 ? (Math.pow(2, rounds - 1) - 1) * 18 : 0;
    html += '<div style="margin-top:' + (finaleOffset + 70) + 'px;">';
    html += '<div class="petite-finale-label">Petite finale · 3e place</div>';
    html += '<div class="bracket-match">';
    for (let s = 0; s < 2; s++) {
      const name = pf.slots[s] || '';
      const isDen = name.toLowerCase().includes("den'l") || name.toLowerCase().includes("den\u2019l");
      const isWinner = pf.winner === s;
      const isLoser = pf.winner !== null && pf.winner !== s;
      const isEmpty = !name;
      let cls = 'bracket-slot';
      if (isDen) cls += ' den';
      if (isWinner) cls += ' winner';
      if (isLoser) cls += ' loser';
      if (isEmpty) cls += ' empty';
      const dataAttr = 'data-r="pf" data-m="0" data-s="' + s + '"';
      html += '<div class="' + cls + '" ' + dataAttr + '>';
      html += '<span class="bracket-name" ' + dataAttr + ' style="flex:1;cursor:pointer;" title="Cliquer pour éditer">' + (name || '· · ·') + '</span>';
      if (name && isActive) {
        const winCls = isWinner ? 'bracket-win-btn active' : 'bracket-win-btn';
        html += '<span class="' + winCls + '" ' + dataAttr + ' title="Marquer vainqueur">✓</span>';
      }
      html += '</div>';
    }
    html += '</div></div></div>';
  }

  html += '</div>';

  bracketEl.innerHTML = html;

  // Attach event handlers via delegation
  bracketEl.addEventListener('click', function(e) {
    const winBtn = e.target.closest('.bracket-win-btn');
    const nameEl = e.target.closest('.bracket-name');
    if (winBtn) {
      e.stopPropagation();
      if (winBtn.dataset.r === 'pf') { togglePFWinner(parseInt(winBtn.dataset.s)); }
      else { toggleWinner(parseInt(winBtn.dataset.r), parseInt(winBtn.dataset.m), parseInt(winBtn.dataset.s)); }
      return;
    }
    if (nameEl) {
      e.stopPropagation();
      if (nameEl.dataset.r === 'pf') { editPFSlot(parseInt(nameEl.dataset.s), nameEl); }
      else { editBracketSlot(parseInt(nameEl.dataset.r), parseInt(nameEl.dataset.m), parseInt(nameEl.dataset.s), nameEl); }
      return;
    }
  }, { once: true });
  // Re-attach on each render by using a persistent delegated handler
  bracketEl._handler = true;
}

function renderTourneyHistory() {
  renderRenown();
  const c = document.getElementById('tourney-history-list');
  if (!state.arena || !state.arena.tourneys || state.arena.tourneys.length === 0) {
    c.innerHTML = '<div style="font-size:0.82rem;color:var(--SUB);font-style:italic;">Aucun tournoi enregistré.</div>';
    return;
  }
  c.innerHTML = '';
  // Show most recent first
  const sorted = [...state.arena.tourneys].reverse();
  sorted.forEach(t => {
    const div = document.createElement('div');
    div.className = 'tourney-list-item';
    const plc = t.placement;
    const plcClass = plc === 1 ? 'gold' : plc === 2 ? 'silver' : plc === 3 ? 'bronze' : 'other';
    const plcText = t.status === 'active' ? '▶' : plc === 1 ? '🏆' : '#' + plc;
    let renPts = '—';
    if (t.status === 'finished') {
      if (plc === 1) renPts = '+' + (t.prestige * 10);
      else if (plc === 2) renPts = '+' + (t.prestige * 4);
      else if (plc <= 4) renPts = '±0';
      else renPts = '-' + (t.prestige * 3);
    }
    div.innerHTML = `
      <span class="tourney-placement ${plcClass}">${plcText}</span>
      <div class="tourney-info">
        <div class="tourney-name">${t.name}</div>
        <div class="tourney-meta">${t.lieu} · ${t.date} · ${TYPE_LABELS[t.type] || t.type} · ${t.size} participants · ${prestigeHTML(t.prestige)}</div>
      </div>
      <span class="tourney-renown-gain" style="color:${t.status === 'finished' && renPts.startsWith('-') ? '#c07060' : 'var(--GLD)'};">${t.status === 'finished' ? renPts : 'En cours'}</span>
    `;
    div.onclick = () => {
      state.arena.activeTourneyId = t.id;
      arenaSave();
      arenaTab('bracket');
    };
    c.appendChild(div);
  });
}

function togglePFWinner(s) {
  const t = getActiveTourney();
  if (!t || t.status === 'finished' || !t.petiteFinale) return;
  if (t.petiteFinale.winner === s) { t.petiteFinale.winner = null; }
  else { t.petiteFinale.winner = s; }
  arenaSave();
  renderActiveBracket();
}
