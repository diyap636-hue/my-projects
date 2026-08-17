// Settings View: Exam Target Date, Timer Preferences, Audio Toggles, JSON Backup/Import, Reset All Data Modal
import { store } from '../store.js';
import { sound } from '../audio.js';
import { triggerConfetti } from '../confetti.js';

export function renderSettings() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const state = store.getState();
  const focusMin = state.timerSettings.focusMinutes || 25;
  const breakMin = state.timerSettings.breakMinutes || 5;

  container.innerHTML = `
    <div class="view-wrapper fade-in">
      <!-- Header -->
      <div class="settings-header">
        <div>
          <div class="greeting-badge">⚙️ Preferences & Data Backup</div>
          <h1 class="page-title">Settings & Storage 🌸</h1>
          <p class="page-subtitle">Configure your study parameters, backup your progress, or restore previous data.</p>
        </div>
      </div>

      <div class="settings-grid">
        <!-- 1. Exam Target Date Settings Card -->
        <div class="settings-card kawaii-card">
          <div class="settings-card-header">
            <span class="settings-card-icon">📅</span>
            <div>
              <h2 class="card-title">Target Exam Date</h2>
              <span class="card-subtitle">Used for the live countdown on your dashboard</span>
            </div>
          </div>
          <div class="settings-card-body">
            <div class="form-field">
              <label class="form-label" for="settings-exam-date">Target Date (First Exam Paper):</label>
              <div class="inline-input-group">
                <input type="date" id="settings-exam-date" class="form-input" value="${state.examDate || ''}" />
                <button class="btn btn-primary btn-sm" id="btn-save-settings-date">Save Date 🌸</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Pomodoro Timer Preferences Card -->
        <div class="settings-card kawaii-card">
          <div class="settings-card-header">
            <span class="settings-card-icon">⏱️</span>
            <div>
              <h2 class="card-title">Study Timer Preferences</h2>
              <span class="card-subtitle">Set your custom focus & short break intervals</span>
            </div>
          </div>
          <div class="settings-card-body">
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="settings-focus-min">Focus Duration (Minutes):</label>
                <input type="number" id="settings-focus-min" class="form-input" min="5" max="180" value="${focusMin}" />
              </div>
              <div class="form-field">
                <label class="form-label" for="settings-break-min">Break Duration (Minutes):</label>
                <input type="number" id="settings-break-min" class="form-input" min="1" max="60" value="${breakMin}" />
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-save-timer-settings">Save Timer Settings ✨</button>
          </div>
        </div>

        <!-- 3. Audio & Kawaii Effects -->
        <div class="settings-card kawaii-card">
          <div class="settings-card-header">
            <span class="settings-card-icon">🌸</span>
            <div>
              <h2 class="card-title">Sounds & Aesthetics</h2>
              <span class="card-subtitle">Toggle cute celebratory audio bells and sparkles</span>
            </div>
          </div>
          <div class="settings-card-body">
            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-title">Web Audio Sound Effects</span>
                <span class="toggle-desc">Plays gentle marimba chimes and button pops</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="toggle-sound" checked />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-title">Pastel Sparkle Confetti</span>
                <span class="toggle-desc">Celebrates when chapters or timer sessions finish</span>
              </div>
              <label class="switch">
                <input type="checkbox" id="toggle-confetti" checked />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- 4. Data Backup: Export & Import Card -->
        <div class="settings-card kawaii-card">
          <div class="settings-card-header">
            <span class="settings-card-icon">💾</span>
            <div>
              <h2 class="card-title">Data Backup (Export / Import)</h2>
              <span class="card-subtitle">Keep your data safe or transfer between your computer and phone</span>
            </div>
          </div>
          <div class="settings-card-body">
            <p class="backup-note">
              All your syllabus notes, revision counts, mock tests, and study logs are stored purely in your browser's local storage. Export a backup anytime!
            </p>
            <div class="backup-buttons-row">
              <button class="btn btn-primary" id="btn-export-data">
                <span>⬇️</span> Export Data (Download JSON) 🌸
              </button>

              <label class="btn btn-secondary btn-file-upload" for="input-import-json">
                <span>⬆️</span> Import Data (Upload JSON)
                <input type="file" id="input-import-json" accept=".json" class="hidden-file-input" />
              </label>
            </div>
            <div id="import-status-msg" class="import-status-msg hidden"></div>
          </div>
        </div>

        <!-- 5. Danger Zone: Reset All Data Card -->
        <div class="settings-card kawaii-card settings-card-danger">
          <div class="settings-card-header">
            <span class="settings-card-icon">⚠️</span>
            <div>
              <h2 class="card-title text-danger">Reset All Data</h2>
              <span class="card-subtitle">Erase all progress and restore original syllabus seed</span>
            </div>
          </div>
          <div class="settings-card-body">
            <p class="danger-desc">
              Need a completely fresh start? This will reset all 6 papers to "Not Started", clear all revisions, delete all mock tests, and reset the countdown.
            </p>
            <button class="btn btn-danger" id="btn-open-reset-modal">
              <span>🗑️</span> Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Explicit Reset Confirmation Modal -->
    <div id="modal-confirm-reset" class="modal-overlay hidden">
      <div class="modal-card kawaii-card modal-card-danger">
        <div class="modal-header">
          <h3 class="modal-title">⚠️ Confirm Full Reset</h3>
          <button class="modal-close" id="btn-close-reset-modal">×</button>
        </div>
        <div class="modal-body">
          <div class="reset-warning-banner">
            <span class="warn-icon">🛑</span>
            <p><strong>Are you sure? This will erase your exam date, all chapter progress, revision counts, notes, priority tags, mock test records, and study timer logs.</strong></p>
          </div>
          <p class="reset-subtext">All 6 CA Intermediate papers will be restored to their original seed structure with 0% completion.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="btn-cancel-reset-modal">Cancel, Keep My Data 🌸</button>
          <button class="btn btn-danger" id="btn-confirm-reset-all">Yes, Erase & Reset Everything 🗑️</button>
        </div>
      </div>
    </div>
  `;

  setupSettingsEvents();
}

function setupSettingsEvents() {
  // Save exam date
  const btnSaveDate = document.getElementById('btn-save-settings-date');
  const dateInput = document.getElementById('settings-exam-date');
  if (btnSaveDate && dateInput) {
    btnSaveDate.addEventListener('click', () => {
      if (dateInput.value) {
        store.setExamDate(dateInput.value);
        sound.playCheck();
        alert('Exam target date saved! 🌸');
      }
    });
  }

  // Save timer settings
  const btnSaveTimer = document.getElementById('btn-save-timer-settings');
  const focusInput = document.getElementById('settings-focus-min');
  const breakInput = document.getElementById('settings-break-min');
  if (btnSaveTimer && focusInput && breakInput) {
    btnSaveTimer.addEventListener('click', () => {
      const focusMinutes = parseInt(focusInput.value, 10) || 25;
      const breakMinutes = parseInt(breakInput.value, 10) || 5;
      store.updateTimerSettings({ focusMinutes, breakMinutes });
      sound.playCheck();
      alert('Timer durations updated! ✨');
    });
  }

  // Export JSON
  const btnExport = document.getElementById('btn-export-data');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      sound.playCheck();
      store.exportDataJSON();
    });
  }

  // Import JSON
  const inputImport = document.getElementById('input-import-json');
  const importMsg = document.getElementById('import-status-msg');
  if (inputImport) {
    inputImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target.result;
        const res = store.importDataJSON(content);
        if (importMsg) {
          importMsg.classList.remove('hidden');
          if (res.success) {
            importMsg.className = 'import-status-msg status-success';
            importMsg.textContent = res.message;
            sound.playCelebration();
            triggerConfetti();
            setTimeout(() => renderSettings(), 1200);
          } else {
            importMsg.className = 'import-status-msg status-error';
            importMsg.textContent = `❌ ${res.message}`;
          }
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset modal
  const modalReset = document.getElementById('modal-confirm-reset');
  const btnOpenReset = document.getElementById('btn-open-reset-modal');
  const btnCloseReset = document.getElementById('btn-close-reset-modal');
  const btnCancelReset = document.getElementById('btn-cancel-reset-modal');
  const btnConfirmReset = document.getElementById('btn-confirm-reset-all');

  if (btnOpenReset && modalReset) {
    btnOpenReset.addEventListener('click', () => {
      sound.playPop();
      modalReset.classList.remove('hidden');
    });
  }

  if (btnCloseReset && modalReset) {
    btnCloseReset.addEventListener('click', () => modalReset.classList.add('hidden'));
  }
  if (btnCancelReset && modalReset) {
    btnCancelReset.addEventListener('click', () => modalReset.classList.add('hidden'));
  }

  if (btnConfirmReset && modalReset) {
    btnConfirmReset.addEventListener('click', () => {
      store.resetAllData();
      sound.playPop();
      modalReset.classList.add('hidden');
      alert('All tracker data has been reset to default state! 🌸');
      window.location.hash = '#dashboard';
    });
  }
}
