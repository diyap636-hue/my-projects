// Pomodoro Focus Timer View: Custom Focus/Break timers, Paper Tagging, Audio Bell, LocalStorage Session Logs
import { store } from '../store.js';
import { PAPERS_METADATA } from '../data/seed_syllabus.js';
import { sound } from '../audio.js';
import { triggerConfetti } from '../confetti.js';

let timerInterval = null;
let timerState = {
  mode: 'focus', // 'focus' | 'break'
  isRunning: false,
  timeLeft: 25 * 60,
  totalDuration: 25 * 60,
  selectedPaper: 'paper1',
  selectedChapter: ''
};

export function renderTimer() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const state = store.getState();
  const focusMinutes = state.timerSettings.focusMinutes || 25;
  const breakMinutes = state.timerSettings.breakMinutes || 5;

  if (!timerState.isRunning && timerState.timeLeft === 25 * 60 && timerState.mode === 'focus') {
    timerState.timeLeft = focusMinutes * 60;
    timerState.totalDuration = focusMinutes * 60;
  }

  const paperChapters = state.syllabus[timerState.selectedPaper] || [];
  const sessions = state.timerSessions || [];
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMinutes = sessions
    .filter(s => s.date === todayStr && s.type === 'focus')
    .reduce((sum, s) => sum + (s.durationMinutes || 0), 0);

  container.innerHTML = `
    <div class="view-wrapper fade-in">
      <!-- Header -->
      <div class="timer-header">
        <div>
          <div class="greeting-badge">⏱️ Focus Sanctuary</div>
          <h1 class="page-title">CA Inter Study Timer 🌸</h1>
          <p class="page-subtitle">Stay immersed in deep study with cute Pomodoro intervals and tagged chapter logging.</p>
        </div>
      </div>

      <!-- Main Timer Card -->
      <div class="timer-main-card kawaii-card">
        <!-- Mode Switcher Tabs -->
        <div class="timer-mode-tabs">
          <button class="timer-mode-btn ${timerState.mode === 'focus' ? 'active focus-active' : ''}" id="btn-mode-focus">
            <span>🌸</span> Focus (${focusMinutes}m)
          </button>
          <button class="timer-mode-btn ${timerState.mode === 'break' ? 'active break-active' : ''}" id="btn-mode-break">
            <span>☕</span> Short Break (${breakMinutes}m)
          </button>
        </div>

        <!-- Tag Subject & Chapter Selector -->
        <div class="timer-tagging-section">
          <label class="tagging-title">📚 Tag What You're Studying:</label>
          <div class="tagging-inputs-grid">
            <div class="tag-input-wrap">
              <label class="tag-sublabel">Paper:</label>
              <select id="timer-paper-select" class="form-select">
                <option value="general">🌸 General / Mixed Revision</option>
                ${PAPERS_METADATA.map(p => `
                  <option value="${p.id}" ${timerState.selectedPaper === p.id ? 'selected' : ''}>${p.code}: ${p.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="tag-input-wrap">
              <label class="tag-sublabel">Chapter / Topic:</label>
              <select id="timer-chapter-select" class="form-select" ${timerState.selectedPaper === 'general' ? 'disabled' : ''}>
                <option value="">(Select specific chapter)</option>
                ${paperChapters.map(ch => `
                  <option value="${escapeHtml(ch.title)}" ${timerState.selectedChapter === ch.title ? 'selected' : ''}>${escapeHtml(ch.title)}</option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Animated Circular Countdown Display -->
        <div class="timer-display-wrap">
          <div class="timer-circle-container">
            <svg class="timer-svg" viewBox="0 0 240 240">
              <circle class="timer-circle-bg" cx="120" cy="120" r="105"></circle>
              <circle class="timer-circle-progress" id="timer-svg-progress" cx="120" cy="120" r="105" style="stroke-dashoffset: ${getStrokeOffset()};"></circle>
            </svg>
            <div class="timer-center-content">
              <span class="timer-mode-label" id="timer-status-text">${timerState.mode === 'focus' ? 'FOCUS TIME 🌸' : 'RELAX BREAK ☕'}</span>
              <div class="timer-digits" id="timer-digits-display">${formatTime(timerState.timeLeft)}</div>
              <span class="timer-tag-display" id="timer-active-tag">${getActiveTagText()}</span>
            </div>
          </div>
        </div>

        <!-- Timer Controls (Start / Pause / Reset) -->
        <div class="timer-controls-row">
          <button class="btn btn-primary btn-lg ${timerState.isRunning ? 'btn-pause' : 'btn-start'}" id="btn-timer-toggle">
            <span>${timerState.isRunning ? '⏸️ Pause' : '▶️ Start Study Session 🌸'}</span>
          </button>
          <button class="btn btn-secondary" id="btn-timer-reset" title="Reset current interval">
            <span>↺</span> Reset
          </button>
        </div>

        <!-- Quick Duration Tweaks -->
        <div class="timer-quick-durations">
          <span class="quick-dur-label">⚙️ Quick Timers:</span>
          <button class="btn-dur-chip" data-min="15">15m</button>
          <button class="btn-dur-chip" data-min="25">25m</button>
          <button class="btn-dur-chip" data-min="45">45m</button>
          <button class="btn-dur-chip" data-min="60">60m</button>
        </div>
      </div>

      <!-- Study Session History & Summary -->
      <div class="timer-history-container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Today's Focus Log (${(todayMinutes / 60).toFixed(1)} hrs total) 📚</h2>
            <p class="section-desc">Completed Pomodoro focus sessions are automatically recorded</p>
          </div>
        </div>

        ${sessions.length === 0 ? `
          <div class="empty-state kawaii-card">
            <span class="empty-emoji">⏱️</span>
            <h3>No study sessions logged yet!</h3>
            <p>Start your first focus timer to record your productive hours.</p>
          </div>
        ` : `
          <div class="sessions-list">
            ${sessions.slice(0, 15).map(session => {
              const isToday = session.date === todayStr;
              const paper = PAPERS_METADATA.find(p => p.id === session.paperId);
              const paperBadge = paper ? `<span class="session-paper-badge" style="background: ${paper.color};">${paper.code}</span>` : `<span class="session-paper-badge">General</span>`;

              return `
                <div class="session-log-card kawaii-card">
                  <div class="session-log-left">
                    <span class="session-icon">${session.type === 'focus' ? '🌸' : '☕'}</span>
                    <div>
                      <div class="session-title-row">
                        ${paperBadge}
                        <span class="session-topic">${escapeHtml(session.chapterTitle || 'Study Session')}</span>
                      </div>
                      <span class="session-time">${formatSessionTime(session.timestamp)} • ${isToday ? 'Today' : session.date}</span>
                    </div>
                  </div>
                  <div class="session-log-right">
                    <span class="session-duration-badge">+${session.durationMinutes} mins</span>
                    <button class="btn-delete-session" data-id="${session.id}" title="Delete session log">×</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  setupTimerEvents();
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatSessionTime(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
}

function getActiveTagText() {
  if (timerState.selectedPaper === 'general') return 'General Study';
  const paper = PAPERS_METADATA.find(p => p.id === timerState.selectedPaper);
  if (!paper) return 'Study Focus';
  if (timerState.selectedChapter) {
    return `${paper.code} - ${timerState.selectedChapter.substring(0, 24)}...`;
  }
  return paper.code;
}

function getStrokeOffset() {
  const radius = 105;
  const circumference = 2 * Math.PI * radius;
  if (!timerState.totalDuration || timerState.totalDuration <= 0) return 0;
  const progress = (timerState.totalDuration - timerState.timeLeft) / timerState.totalDuration;
  return circumference * (1 - progress);
}

function updateTimerVisuals() {
  const digitsEl = document.getElementById('timer-digits-display');
  const progressCircle = document.getElementById('timer-svg-progress');
  const toggleBtn = document.getElementById('btn-timer-toggle');

  if (digitsEl) {
    digitsEl.textContent = formatTime(timerState.timeLeft);
  }
  if (progressCircle) {
    progressCircle.style.strokeDashoffset = `${getStrokeOffset()}`;
  }
  if (toggleBtn) {
    toggleBtn.innerHTML = `<span>${timerState.isRunning ? '⏸️ Pause' : '▶️ Start Study Session 🌸'}</span>`;
  }
}

function tickTimer() {
  if (timerState.timeLeft > 0) {
    timerState.timeLeft--;
    updateTimerVisuals();
  } else {
    // Timer finished!
    clearInterval(timerInterval);
    timerInterval = null;
    timerState.isRunning = false;

    if (timerState.mode === 'focus') {
      sound.playChime();
      triggerConfetti();

      // Log session
      const durationMins = Math.round(timerState.totalDuration / 60);
      store.logTimerSession({
        durationMinutes: durationMins,
        paperId: timerState.selectedPaper,
        chapterTitle: timerState.selectedChapter || 'Focus Session',
        type: 'focus'
      });

      alert('🌸 Fabulous job! Your focus session is complete. Time for a well-deserved break! 🍵✨');

      // Switch to break
      const state = store.getState();
      const breakMinutes = state.timerSettings.breakMinutes || 5;
      timerState.mode = 'break';
      timerState.timeLeft = breakMinutes * 60;
      timerState.totalDuration = breakMinutes * 60;
    } else {
      sound.playPop();
      alert('☕ Break is over! Ready to jump back into another focused study session? 🌸');
      const state = store.getState();
      const focusMinutes = state.timerSettings.focusMinutes || 25;
      timerState.mode = 'focus';
      timerState.timeLeft = focusMinutes * 60;
      timerState.totalDuration = focusMinutes * 60;
    }

    renderTimer();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setupTimerEvents() {
  const toggleBtn = document.getElementById('btn-timer-toggle');
  const resetBtn = document.getElementById('btn-timer-reset');
  const focusTab = document.getElementById('btn-mode-focus');
  const breakTab = document.getElementById('btn-mode-break');
  const paperSelect = document.getElementById('timer-paper-select');
  const chapterSelect = document.getElementById('timer-chapter-select');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sound.playPop();
      if (timerState.isRunning) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerState.isRunning = false;
      } else {
        timerState.isRunning = true;
        if (!timerInterval) {
          timerInterval = setInterval(tickTimer, 1000);
        }
      }
      updateTimerVisuals();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sound.playPop();
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      timerState.isRunning = false;
      const state = store.getState();
      const mins = timerState.mode === 'focus' ? (state.timerSettings.focusMinutes || 25) : (state.timerSettings.breakMinutes || 5);
      timerState.timeLeft = mins * 60;
      timerState.totalDuration = mins * 60;
      updateTimerVisuals();
    });
  }

  if (focusTab) {
    focusTab.addEventListener('click', () => {
      sound.playPop();
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      timerState.isRunning = false;
      timerState.mode = 'focus';
      const mins = store.getState().timerSettings.focusMinutes || 25;
      timerState.timeLeft = mins * 60;
      timerState.totalDuration = mins * 60;
      renderTimer();
    });
  }

  if (breakTab) {
    breakTab.addEventListener('click', () => {
      sound.playPop();
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      timerState.isRunning = false;
      timerState.mode = 'break';
      const mins = store.getState().timerSettings.breakMinutes || 5;
      timerState.timeLeft = mins * 60;
      timerState.totalDuration = mins * 60;
      renderTimer();
    });
  }

  if (paperSelect) {
    paperSelect.addEventListener('change', (e) => {
      timerState.selectedPaper = e.target.value;
      timerState.selectedChapter = '';
      renderTimer();
    });
  }

  if (chapterSelect) {
    chapterSelect.addEventListener('change', (e) => {
      timerState.selectedChapter = e.target.value;
      const activeTag = document.getElementById('timer-active-tag');
      if (activeTag) activeTag.textContent = getActiveTagText();
    });
  }

  // Quick duration chips
  document.querySelectorAll('.btn-dur-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playPop();
      const mins = parseInt(btn.getAttribute('data-min'), 10) || 25;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      timerState.isRunning = false;
      timerState.timeLeft = mins * 60;
      timerState.totalDuration = mins * 60;
      store.updateTimerSettings({ focusMinutes: mins });
      renderTimer();
    });
  });

  // Delete session button
  document.querySelectorAll('.btn-delete-session').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      sound.playPop();
      store.deleteTimerSession(id);
      renderTimer();
    });
  });
}
