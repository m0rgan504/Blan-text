// ══════════════════════════════════════════════
//  BLINDTEST — script.js
// ══════════════════════════════════════════════

// ─── CONSTANTES ───────────────────────────────
const KEY_LABELS = ['1','2','3','4','5','6','7','8','9','A','B','C'];
const AVATARS = ['🎤','🎸','🥁','🎹','🎷','🎺','🎻','🎧','🎵','🎶','🎬','📺','🏆','🦁','🐯','🦊','🐺','🐧','🦋','🌟'];

// ─── ÉTAT ─────────────────────────────────────
let players  = [];   // { id, name, avatar, score }
let questions = [];  // { text, answers:[{text,correct}] }
let editingQIdx = null;

// État jeu
let game = {
  qIndex: 0,
  eliminated: {},   // { playerId: Set<qIndex> }  joueurs éliminés par question
  pendingAnswerIdx: null,
};

// ─── DOM ──────────────────────────────────────
const screens = {
  home:  document.getElementById('screenHome'),
  setup: document.getElementById('screenSetup'),
  game:  document.getElementById('screenGame'),
  end:   document.getElementById('screenEnd'),
};

const $ = id => document.getElementById(id);

// ══════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════════
//  ÉCRAN 1 — ACCUEIL / JOUEURS
// ══════════════════════════════════════════════
function renderPlayers() {
  const grid = $('playersGrid');
  grid.innerHTML = '';
  players.forEach(p => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <div class="player-avatar">${p.avatar}</div>
      <div class="player-name">${p.name}</div>
      <button class="player-del" data-id="${p.id}" title="Supprimer">✕</button>
    `;
    card.querySelector('.player-del').addEventListener('click', e => {
      e.stopPropagation();
      players = players.filter(x => x.id !== p.id);
      renderPlayers();
    });
    grid.appendChild(card);
  });
  $('btnGoSetup').disabled = players.length < 1;
}

// Modal joueur
let selectedAvatar = AVATARS[0];

$('btnAddPlayer').addEventListener('click', () => {
  selectedAvatar = AVATARS[0];
  $('playerNameInput').value = '';
  buildAvatarPicker();
  openModal('modalPlayer');
  setTimeout(() => $('playerNameInput').focus(), 120);
});

function buildAvatarPicker() {
  const picker = $('avatarPicker');
  picker.innerHTML = '';
  AVATARS.forEach((av, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'avatar-opt' + (i === 0 ? ' selected' : '');
    btn.textContent = av;
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.avatar-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAvatar = av;
    });
    picker.appendChild(btn);
  });
}

$('btnConfirmPlayer').addEventListener('click', addPlayer);
$('playerNameInput').addEventListener('keydown', e => { if (e.key === 'Enter') addPlayer(); });

function addPlayer() {
  const name = $('playerNameInput').value.trim();
  if (!name) { $('playerNameInput').focus(); return; }
  players.push({ id: Date.now(), name, avatar: selectedAvatar, score: 0 });
  closeModal('modalPlayer');
  renderPlayers();
}

$('btnCancelPlayer').addEventListener('click', () => closeModal('modalPlayer'));

// Aller setup
$('btnGoSetup').addEventListener('click', () => {
  renderSetup();
  showScreen('setup');
});

// ══════════════════════════════════════════════
//  ÉCRAN 2 — SETUP QUESTIONS
// ══════════════════════════════════════════════
function renderSetup() {
  const list = $('questionsList');
  list.innerHTML = '';
  questions.forEach((q, i) => {
    const correct = q.answers.find(a => a.correct);
    const item = document.createElement('div');
    item.className = 'q-item';
    item.innerHTML = `
      <span class="q-item-num">Q${i+1}</span>
      <span class="q-item-text">${q.text || '(sans titre)'}</span>
      <span class="q-item-answer">✅ ${correct ? correct.text : '?'}</span>
      <div class="q-item-actions">
        <button class="btn-icon" data-edit="${i}" title="Modifier">✏️</button>
        <button class="btn-icon danger" data-del="${i}" title="Supprimer">🗑️</button>
      </div>
    `;
    item.querySelector('[data-edit]').addEventListener('click', () => openQuestionModal(i));
    item.querySelector('[data-del]').addEventListener('click', () => {
      questions.splice(i, 1);
      renderSetup();
    });
    list.appendChild(item);
  });
  $('qCount').textContent = `${questions.length} question(s)`;
  $('btnStartGame').disabled = questions.length < 1;
}

// Ouvrir modal question
$('btnAddQuestion').addEventListener('click', () => openQuestionModal(null));
$('btnBackHome').addEventListener('click', () => showScreen('home'));

function openQuestionModal(idx) {
  editingQIdx = idx;
  $('modalQTitle').textContent = idx === null ? 'Nouvelle question' : 'Modifier la question';

  const q = idx !== null ? questions[idx] : null;
  $('qTextInput').value = q ? q.text : '';

  buildAnswersSetup(q);
  openModal('modalQuestion');
  setTimeout(() => $('qTextInput').focus(), 120);
}

function buildAnswersSetup(q) {
  const container = $('answersSetup');
  container.innerHTML = '';
  let correctIdx = q ? q.answers.findIndex(a => a.correct) : 0;
  if (correctIdx < 0) correctIdx = 0;

  for (let i = 0; i < 12; i++) {
    const val = q ? (q.answers[i] ? q.answers[i].text : '') : '';
    const row = document.createElement('div');
    row.className = 'ans-input-row' + (i === correctIdx ? ' correct-row' : '');
    row.dataset.idx = i;
    row.innerHTML = `
      <span class="ans-key">${KEY_LABELS[i]}</span>
      <input class="ans-input-field" type="text" placeholder="Réponse ${i+1}..." maxlength="40" value="${escHtml(val)}" />
      <button class="ans-star ${i === correctIdx ? 'is-correct' : ''}" data-staridx="${i}" title="Bonne réponse">⭐</button>
    `;
    row.querySelector('.ans-star').addEventListener('click', () => setCorrect(i));
    container.appendChild(row);
  }
}

function setCorrect(idx) {
  document.querySelectorAll('.ans-input-row').forEach((row, i) => {
    row.classList.toggle('correct-row', i === idx);
    row.querySelector('.ans-star').classList.toggle('is-correct', i === idx);
  });
}

$('btnConfirmQ').addEventListener('click', saveQuestion);
$('btnCancelQ').addEventListener('click', () => closeModal('modalQuestion'));

function saveQuestion() {
  const text = $('qTextInput').value.trim();
  if (!text) { $('qTextInput').focus(); return; }

  const rows = document.querySelectorAll('.ans-input-row');
  const answers = [];
  let correctIdx = -1;

  rows.forEach((row, i) => {
    const val = row.querySelector('.ans-input-field').value.trim();
    const isCor = row.classList.contains('correct-row');
    if (isCor) correctIdx = i;
    answers.push({ text: val, correct: isCor });
  });

  // Vérifications
  const filled = answers.filter(a => a.text.length > 0);
  if (filled.length < 2) { alert('Remplis au moins 2 réponses.'); return; }
  if (correctIdx < 0 || !answers[correctIdx].text) { alert('Marque une bonne réponse (⭐) parmi les réponses remplies.'); return; }

  const qObj = { text, answers };
  if (editingQIdx !== null) {
    questions[editingQIdx] = qObj;
  } else {
    questions.push(qObj);
  }

  closeModal('modalQuestion');
  renderSetup();
}

$('btnStartGame').addEventListener('click', startGame);

// ══════════════════════════════════════════════
//  ÉCRAN 3 — JEU
// ══════════════════════════════════════════════
function startGame() {
  // Réinitialiser scores et état
  players.forEach(p => p.score = 0);
  game.qIndex = 0;
  game.eliminated = {};
  game.pendingAnswerIdx = null;
  players.forEach(p => { game.eliminated[p.id] = new Set(); });

  showScreen('game');
  loadQuestion(0);
}

function loadQuestion(idx) {
  game.qIndex = idx;
  game.pendingAnswerIdx = null;

  const q = questions[idx];
  $('qNum').textContent   = `Q${idx + 1}`;
  $('qTotal').textContent = `/ ${questions.length}`;
  $('qText').textContent  = q.text;

  renderScoreboard();
  renderAnswers(q);
}

function renderScoreboard() {
  const sb = $('scoreboard');
  sb.innerHTML = '';
  players.forEach(p => {
    const chip = document.createElement('div');
    const isElim = game.eliminated[p.id]?.has(game.qIndex);
    chip.className = 'score-chip' + (isElim ? ' eliminated' : '');
    chip.innerHTML = `
      <span class="chip-avatar">${p.avatar}</span>
      <span class="chip-name">${p.name}</span>
      <span class="chip-score">${p.score}</span>
    `;
    sb.appendChild(chip);
  });
}

function renderAnswers(q) {
  const grid = $('answersGrid');
  grid.innerHTML = '';

  q.answers.forEach((ans, i) => {
    if (!ans.text) return; // ne pas afficher les cases vides

    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.dataset.idx = i;
    btn.innerHTML = `
      <span class="key-badge">${KEY_LABELS[i]}</span>
      <span class="ans-text">${escHtml(ans.text)}</span>
    `;
    btn.addEventListener('click', () => onAnswerClick(i));
    grid.appendChild(btn);
  });
}

// Clic sur une réponse
function onAnswerClick(idx) {
  if (game.pendingAnswerIdx !== null) return; // déjà en attente
  game.pendingAnswerIdx = idx;
  const q = questions[game.qIndex];
  const chosen = q.answers[idx];

  // Ouvrir modal "qui a répondu ?"
  $('whoTitle').textContent = 'Qui a répondu ?';
  $('whoAnswer').textContent = chosen.text;

  const whoPlayers = $('whoPlayers');
  whoPlayers.innerHTML = '';
  players.forEach(p => {
    const isElim = game.eliminated[p.id]?.has(game.qIndex);
    const btn = document.createElement('button');
    btn.className = 'who-player-btn';
    btn.disabled = isElim;
    btn.innerHTML = `<div class="wp-avatar">${p.avatar}</div><div class="wp-name">${p.name}</div>`;
    btn.addEventListener('click', () => onPlayerChosen(p.id, idx));
    whoPlayers.appendChild(btn);
  });

  openModal('modalWhoAnswered');
}

function onPlayerChosen(playerId, answerIdx) {
  closeModal('modalWhoAnswered');
  const q = questions[game.qIndex];
  const correct = q.answers[answerIdx].correct;

  // Trouver le bouton correspondant
  const btn = document.querySelector(`.answer-btn[data-idx="${answerIdx}"]`);

  if (correct) {
    // ✅ Bonne réponse
    if (btn) {
      btn.classList.add('revealed-correct', 'flash-green');
      disableAllAnswers();
    }
    const p = players.find(x => x.id === playerId);
    p.score += 1;
    renderScoreboard();

    // Petite pause puis question suivante
    setTimeout(() => nextQuestion(), 1800);
  } else {
    // ❌ Mauvaise réponse — éliminer ce joueur de la question
    if (btn) {
      btn.classList.add('revealed-wrong', 'flash-red');
      btn.disabled = true;
    }
    game.eliminated[playerId].add(game.qIndex);
    renderScoreboard();
    game.pendingAnswerIdx = null;

    // Vérifier si tous les joueurs sont éliminés
    const allElim = players.every(p => game.eliminated[p.id]?.has(game.qIndex));
    if (allElim) {
      // Révéler la bonne réponse et passer
      revealCorrect(q);
      setTimeout(() => nextQuestion(), 2000);
    }
  }
}

function revealCorrect(q) {
  q.answers.forEach((ans, i) => {
    if (ans.correct) {
      const btn = document.querySelector(`.answer-btn[data-idx="${i}"]`);
      if (btn) btn.classList.add('revealed-correct');
    }
  });
  disableAllAnswers();
}

function disableAllAnswers() {
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
}

function nextQuestion() {
  const next = game.qIndex + 1;
  if (next >= questions.length) {
    endGame();
  } else {
    loadQuestion(next);
  }
}

// Passer la question
$('btnSkip').addEventListener('click', () => {
  const q = questions[game.qIndex];
  revealCorrect(q);
  setTimeout(() => nextQuestion(), 1200);
});

// Raccourcis clavier
document.addEventListener('keydown', e => {
  if (!screens.game.classList.contains('active')) return;
  if (document.querySelector('.modal-overlay.open')) return;

  const key = e.key.toUpperCase();
  const idx = KEY_LABELS.indexOf(key);
  if (idx >= 0) {
    const btn = document.querySelector(`.answer-btn[data-idx="${idx}"]`);
    if (btn && !btn.disabled) btn.click();
  }
});

$('btnCancelWho').addEventListener('click', () => {
  game.pendingAnswerIdx = null;
  closeModal('modalWhoAnswered');
});

// ══════════════════════════════════════════════
//  ÉCRAN 4 — FIN
// ══════════════════════════════════════════════
function endGame() {
  showScreen('end');

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const finalDiv = $('finalScores');
  finalDiv.innerHTML = '';

  sorted.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = `final-row rank-${i+1}`;
    row.style.animationDelay = `${i * 0.08}s`;
    const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
    row.innerHTML = `
      <span class="final-rank">${rankEmoji}</span>
      <span class="final-avatar">${p.avatar}</span>
      <span class="final-name">${p.name}</span>
      <span class="final-pts">${p.score} pt${p.score > 1 ? 's' : ''}</span>
    `;
    finalDiv.appendChild(row);
  });
}

$('btnReplay').addEventListener('click', () => {
  renderSetup();
  showScreen('setup');
});

$('btnHomeEnd').addEventListener('click', () => {
  renderPlayers();
  showScreen('home');
});

// ══════════════════════════════════════════════
//  UTILITAIRES MODAL
// ══════════════════════════════════════════════
function openModal(id) {
  $(id).classList.add('open');
}
function closeModal(id) {
  $(id).classList.remove('open');
}

// Fermer en cliquant l'overlay
['modalPlayer','modalQuestion','modalWhoAnswered'].forEach(id => {
  $(id).addEventListener('click', e => {
    if (e.target === $(id)) closeModal(id);
  });
});

// Fermer avec Escape (sauf modalWhoAnswered en attente)
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  ['modalPlayer','modalQuestion'].forEach(id => closeModal(id));
});

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
renderPlayers();
