// Dashboard View: Exam Countdown, Progress Snapshot, Streak, Quote, Paper Cards
import { store } from '../store.js';
import { PAPERS_METADATA } from '../data/seed_syllabus.js';
import { MOTIVATIONAL_QUOTES } from '../data/quotes.js';
import { sound } from '../audio.js';

let countdownTimerInterval = null;

export function renderDashboard() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const state = store.getState();
  const overallStats = store.getOverallStats();
  const quoteIndex = (state.currentQuoteIndex || 0) % MOTIVATIONAL_QUOTES.length;
  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex] || MOTIVATIONAL_QUOTES[0];

  container.innerHTML = `
    <div class="view-wrapper fade-in">
      <!-- Top Welcome Banner with Kawaii Accents -->
      <div class="dashboard-header">
        <div class="welcome-text">
          <div class="greeting-badge"><span class="pulse-dot"></span> Welcome Back, Future CA! 🌸</div>
          <h1 class="page-title">CA Inter Prep Tracker <span class="sparkle-emoji">✨</span></h1>
          <p class="page-subtitle">Your aesthetic, stress-free companion to conquer your CA Intermediate journey with flying colors!</p>
        </div>
        <div class="header-streak-badge" title="Daily study streak">
          <span class="streak-icon">🔥</span>
          <div class="streak-info">
            <span class="streak-count">${overallStats.streakCount} Day${overallStats.streakCount === 1 ? '' : 's'}</span>
            <span class="streak-label">Study Streak</span>
          </div>
        </div>
      </div>

      <!-- Main Countdown & Quick Goal Banner -->
      <div class="countdown-card kawaii-card">
        <div class="countdown-header">
          <div class="countdown-title-wrap">
            <span class="badge-icon">⏳</span>
            <div>
              <h2 class="card-title">CA Exam Countdown</h2>
              <span class="countdown-target-text" id="target-date-display">Target Date: ${formatDate(state.examDate)}</span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-edit-exam-date">
            <span>📅</span> Edit Date
          </button>
        </div>

        <div id="countdown-clock-container" class="countdown-clock-container">
          <!-- Populated by updateCountdownClock() -->
        </div>

        <div id="date-edit-picker-container" class="date-edit-container hidden">
          <label for="exam-date-input" class="form-label">Select Your Exam Start Date:</label>
          <div class="date-input-group">
            <input type="date" id="exam-date-input" class="form-input" value="${state.examDate || ''}" />
            <button class="btn btn-primary btn-sm" id="btn-save-exam-date">Save Date 🌸</button>
            <button class="btn btn-ghost btn-sm" id="btn-cancel-exam-date">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Motivational Quote Widget -->
      <div class="quote-card kawaii-card">
        <div class="quote-content">
          <div class="quote-badge">
            <span>✨ Daily Inspiration</span>
            <span class="quote-tag">${currentQuote.category}</span>
          </div>
          <blockquote class="quote-text">"${currentQuote.quote}"</blockquote>
          <cite class="quote-author">— ${currentQuote.author}</cite>
        </div>
        <button class="btn-icon-quote" id="btn-next-quote" title="Inspire me with another quote!">
          <span>🌸</span> Next Quote
        </button>
      </div>

      <!-- Stat Badges Grid -->
      <div class="stats-overview-grid">
        <div class="stat-card kawaii-card stat-progress">
          <div class="stat-icon-wrapper" style="background: rgba(255, 183, 178, 0.25); color: #e55353;">
            <span>📊</span>
          </div>
          <div class="stat-body">
            <span class="stat-value">${overallStats.percent}%</span>
            <span class="stat-label">Syllabus Completed</span>
            <div class="stat-subtext">${overallStats.doneChapters} of ${overallStats.totalChapters} chapters done</div>
          </div>
        </div>

        <div class="stat-card kawaii-card stat-revisions">
          <div class="stat-icon-wrapper" style="background: rgba(232, 223, 245, 0.3); color: #805ad5;">
            <span>⭐</span>
          </div>
          <div class="stat-body">
            <span class="stat-value">${overallStats.totalRevisions}</span>
            <span class="stat-label">Total Revisions</span>
            <div class="stat-subtext">Across all subjects</div>
          </div>
        </div>

        <div class="stat-card kawaii-card stat-mocks">
          <div class="stat-icon-wrapper" style="background: rgba(181, 234, 215, 0.3); color: #2f855a;">
            <span>📝</span>
          </div>
          <div class="stat-body">
            <span class="stat-value">${overallStats.avgMockScore}%</span>
            <span class="stat-label">Mock Test Avg</span>
            <div class="stat-subtext">${overallStats.mockTestsCount} tests attempted</div>
          </div>
        </div>

        <div class="stat-card kawaii-card stat-timer">
          <div class="stat-icon-wrapper" style="background: rgba(199, 206, 234, 0.3); color: #4c51bf;">
            <span>⏱️</span>
          </div>
          <div class="stat-body">
            <span class="stat-value">${overallStats.totalStudyHours} hrs</span>
            <span class="stat-label">Focus Time Logged</span>
            <div class="stat-subtext">${state.timerSessions.filter(s => s.type === 'focus').length} Pomodoro sessions</div>
          </div>
        </div>
      </div>

      <!-- Per-Paper Progress Cards Grid -->
      <div class="section-header">
        <div>
          <h2 class="section-title">Subject Breakdown & Progress 📚</h2>
          <p class="section-desc">Track completion rate across all 6 CA Intermediate papers</p>
        </div>
        <a href="#syllabus" class="btn btn-ghost btn-sm">View Full Syllabus →</a>
      </div>

      <div class="papers-grid">
        ${PAPERS_METADATA.map(paper => {
          const stats = store.getPaperStats(paper.id);
          return `
            <div class="paper-card kawaii-card" data-paper-id="${paper.id}">
              <div class="paper-card-top">
                <div class="paper-icon-tag" style="background: ${paper.color};">
                  <span>${paper.icon}</span>
                </div>
                <div class="paper-info">
                  <span class="paper-code">${paper.code}</span>
                  <h3 class="paper-name">${paper.name}</h3>
                </div>
              </div>
              <div class="paper-card-progress">
                <div class="progress-info-row">
                  <span class="progress-percent">${stats.percent}% Done</span>
                  <span class="progress-fraction">${stats.done}/${stats.total} Chapters</span>
                </div>
                <div class="cute-progress-bar">
                  <div class="cute-progress-fill" style="width: ${stats.percent}%; background: linear-gradient(90deg, ${paper.color}, ${paper.accent});"></div>
                </div>
              </div>
              <div class="paper-card-footer">
                <div class="paper-quick-stats">
                  <span class="badge badge-rev">⭐ ${stats.revisions} Revs</span>
                  <span class="badge badge-prog">🔄 ${stats.inProgress} Ongoing</span>
                </div>
                <button class="btn btn-sm btn-paper-jump" data-paper="${paper.id}">Open 🌸</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Quick Action Buttons -->
      <div class="quick-actions-bar">
        <div class="quick-actions-title">🌸 Quick Jump:</div>
        <div class="quick-actions-buttons">
          <a href="#syllabus" class="btn btn-outline btn-sm">📚 Syllabus Editor</a>
          <a href="#mock-tests" class="btn btn-outline btn-sm">📝 Log Mock Test</a>
          <a href="#timer" class="btn btn-outline btn-sm">⏱️ Study Timer</a>
          <a href="#settings" class="btn btn-outline btn-sm">⚙️ Backup & Settings</a>
        </div>
      </div>
    </div>
  `;

  // Start live ticking countdown
  startCountdownTicker();

  // Attach event listeners
  setupDashboardEvents();
}

function formatDate(dateStr) {
  if (!dateStr) return 'Not Set';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  } catch (e) {
    return dateStr;
  }
}

function startCountdownTicker() {
  if (countdownTimerInterval) {
    clearInterval(countdownTimerInterval);
  }

  updateCountdownClock();
  countdownTimerInterval = setInterval(updateCountdownClock, 1000);
}

function updateCountdownClock() {
  const container = document.getElementById('countdown-clock-container');
  if (!container) {
    if (countdownTimerInterval) clearInterval(countdownTimerInterval);
    return;
  }

  const state = store.getState();
  if (!state.examDate) {
    container.innerHTML = `
      <div class="countdown-empty-state">
        <p>No exam date selected yet! Set your target date to begin the countdown.</p>
      </div>
    `;
    return;
  }

  const target = new Date(state.examDate + 'T09:00:00').getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    // Past or today!
    const diffDays = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
    if (diffDays === 0) {
      container.innerHTML = `
        <div class="countdown-celebration-state">
          <span class="huge-emoji">🌸💪✨</span>
          <div class="exam-day-banner">It's Exam Day! You've got this! Breathe and believe in yourself! 🌟</div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="countdown-celebration-state">
          <span class="huge-emoji">🎉🏆📚</span>
          <div class="exam-day-banner">Exam cycle underway or completed! Outstanding effort! Time for the next milestone! 💖</div>
        </div>
      `;
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  container.innerHTML = `
    <div class="countdown-units-grid">
      <div class="countdown-unit-box unit-days">
        <span class="unit-number">${days}</span>
        <span class="unit-label">DAYS</span>
      </div>
      <div class="countdown-colon">:</div>
      <div class="countdown-unit-box unit-hours">
        <span class="unit-number">${String(hours).padStart(2, '0')}</span>
        <span class="unit-label">HOURS</span>
      </div>
      <div class="countdown-colon">:</div>
      <div class="countdown-unit-box unit-minutes">
        <span class="unit-number">${String(minutes).padStart(2, '0')}</span>
        <span class="unit-label">MINUTES</span>
      </div>
      <div class="countdown-colon">:</div>
      <div class="countdown-unit-box unit-seconds">
        <span class="unit-number">${String(seconds).padStart(2, '0')}</span>
        <span class="unit-label">SECONDS</span>
      </div>
    </div>
  `;
}

function setupDashboardEvents() {
  const btnEditDate = document.getElementById('btn-edit-exam-date');
  const datePickerContainer = document.getElementById('date-edit-picker-container');
  const btnSaveDate = document.getElementById('btn-save-exam-date');
  const btnCancelDate = document.getElementById('btn-cancel-exam-date');
  const dateInput = document.getElementById('exam-date-input');

  if (btnEditDate && datePickerContainer) {
    btnEditDate.addEventListener('click', () => {
      sound.playPop();
      datePickerContainer.classList.toggle('hidden');
      if (!datePickerContainer.classList.contains('hidden') && dateInput) {
        dateInput.focus();
      }
    });
  }

  if (btnCancelDate && datePickerContainer) {
    btnCancelDate.addEventListener('click', () => {
      sound.playPop();
      datePickerContainer.classList.add('hidden');
    });
  }

  if (btnSaveDate && dateInput) {
    btnSaveDate.addEventListener('click', () => {
      if (dateInput.value) {
        store.setExamDate(dateInput.value);
        sound.playCheck();
        datePickerContainer.classList.add('hidden');
        const targetDisplay = document.getElementById('target-date-display');
        if (targetDisplay) {
          targetDisplay.textContent = `Target Date: ${formatDate(dateInput.value)}`;
        }
        updateCountdownClock();
      }
    });
  }

  // Next Quote button
  const btnNextQuote = document.getElementById('btn-next-quote');
  if (btnNextQuote) {
    btnNextQuote.addEventListener('click', () => {
      sound.playPop();
      store.setNextQuote(MOTIVATIONAL_QUOTES.length);
      renderDashboard();
    });
  }

  // Paper cards jump
  document.querySelectorAll('.btn-paper-jump, .paper-card').forEach(el => {
    el.addEventListener('click', (e) => {
      const paperId = el.getAttribute('data-paper') || el.getAttribute('data-paper-id');
      if (paperId) {
        sound.playPop();
        window.selectedSyllabusPaper = paperId;
        window.location.hash = '#syllabus';
      }
    });
  });
}
