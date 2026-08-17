// Mock Tests Tracker View: Log, Edit, Delete, Stats, Auto-Percentage, Notes
import { store } from '../store.js';
import { PAPERS_METADATA } from '../data/seed_syllabus.js';
import { sound } from '../audio.js';
import { triggerConfetti } from '../confetti.js';

let editingTestId = null;

export function renderMockTests() {
  const container = document.getElementById('main-content');
  if (!container) return;

  const state = store.getState();
  const mockTests = state.mockTests || [];
  const overallStats = store.getOverallStats();
  const todayStr = new Date().toISOString().split('T')[0];

  container.innerHTML = `
    <div class="view-wrapper fade-in">
      <!-- Header -->
      <div class="mock-header">
        <div>
          <div class="greeting-badge">📝 Performance Tracker</div>
          <h1 class="page-title">CA Inter Mock Test Log 🌸</h1>
          <p class="page-subtitle">Record your test scores, track your percentage progression, and target weak areas.</p>
        </div>
      </div>

      <!-- Top Summary Metrics Cards -->
      <div class="mock-stats-grid">
        <div class="mock-stat-card kawaii-card">
          <span class="mock-stat-icon">🎯</span>
          <div class="mock-stat-info">
            <span class="mock-stat-num">${overallStats.mockTestsCount}</span>
            <span class="mock-stat-lbl">Mock Tests Attempted</span>
          </div>
        </div>

        <div class="mock-stat-card kawaii-card">
          <span class="mock-stat-icon">📊</span>
          <div class="mock-stat-info">
            <span class="mock-stat-num">${overallStats.avgMockScore}%</span>
            <span class="mock-stat-lbl">Overall Average Score</span>
          </div>
        </div>

        <div class="mock-stat-card kawaii-card">
          <span class="mock-stat-icon">🌟</span>
          <div class="mock-stat-info">
            <span class="mock-stat-num">${getHighestScore(mockTests)}%</span>
            <span class="mock-stat-lbl">Personal Best Score</span>
          </div>
        </div>
      </div>

      <!-- Per Paper Mock Breakdown Chips -->
      <div class="mock-paper-breakdown kawaii-card">
        <h3 class="breakdown-title">📚 Average Score by Paper</h3>
        <div class="paper-scores-grid">
          ${PAPERS_METADATA.map(p => {
            const pMock = store.getPaperMockStats(p.id);
            return `
              <div class="paper-score-pill" style="border-left-color: ${p.accent}; background: rgba(255, 255, 255, 0.75);">
                <div class="pill-top">
                  <span class="pill-code">${p.code}</span>
                  <span class="pill-name">${p.shortName}</span>
                </div>
                <div class="pill-stats">
                  <span class="pill-avg">${pMock.count > 0 ? `${pMock.avg}%` : 'No tests'}</span>
                  <span class="pill-count">${pMock.count} test${pMock.count === 1 ? '' : 's'}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Log New Mock Test Form Card -->
      <div class="mock-form-card kawaii-card" id="mock-form-section">
        <div class="form-card-header">
          <h2 class="card-title" id="form-header-title">🌸 Log New Mock Test</h2>
          <span class="card-subtitle">Fill in your test results below to save into your local history</span>
        </div>

        <form id="form-mock-test" class="mock-test-form">
          <input type="hidden" id="mock-edit-id" value="" />
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label" for="mock-paper-select">Select Paper: *</label>
              <select id="mock-paper-select" class="form-select" required>
                ${PAPERS_METADATA.map(p => `
                  <option value="${p.id}">${p.code}: ${p.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-field">
              <label class="form-label" for="mock-date-input">Test Date: *</label>
              <input type="date" id="mock-date-input" class="form-input" value="${todayStr}" required />
            </div>

            <div class="form-field">
              <label class="form-label" for="mock-score-input">Marks Scored: *</label>
              <input type="number" id="mock-score-input" class="form-input" min="0" max="200" step="0.5" placeholder="e.g. 68" required />
            </div>

            <div class="form-field">
              <label class="form-label" for="mock-total-input">Total Marks: *</label>
              <input type="number" id="mock-total-input" class="form-input" min="1" max="200" step="1" value="100" required />
            </div>
          </div>

          <div class="score-preview-box" id="score-preview-box">
            <span class="preview-label">Calculated Score:</span>
            <span class="preview-value" id="score-calc-preview">0.0%</span>
          </div>

          <div class="form-field">
            <label class="form-label" for="mock-notes-input">Notes & Key Learnings (Optional):</label>
            <textarea id="mock-notes-input" class="form-textarea" rows="2" placeholder="e.g. Lost marks in AS 16 calculation. Need to revise Cash Flow formats and GST value of supply provisions..."></textarea>
          </div>

          <div class="form-actions-row">
            <button type="submit" class="btn btn-primary" id="btn-submit-mock">
              <span id="btn-submit-text">💾 Save Mock Test 🌸</span>
            </button>
            <button type="button" class="btn btn-ghost hidden" id="btn-cancel-mock-edit">
              Cancel Edit
            </button>
          </div>
        </form>
      </div>

      <!-- Mock Tests History Table / Cards List -->
      <div class="mock-history-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Logged Mock Tests (${mockTests.length})</h2>
            <p class="section-desc">Sorted newest test first</p>
          </div>
        </div>

        ${mockTests.length === 0 ? `
          <div class="empty-state kawaii-card">
            <span class="empty-emoji">📝</span>
            <h3>No mock tests logged yet!</h3>
            <p>Attempt your first mock paper and log your score above to visualize your progress.</p>
          </div>
        ` : `
          <div class="mock-cards-list">
            ${mockTests.map(test => {
              const paper = PAPERS_METADATA.find(p => p.id === test.paperId) || PAPERS_METADATA[0];
              const scoreBadgeClass = test.percentage >= 60 ? 'score-distinction' : test.percentage >= 40 ? 'score-pass' : 'score-fail';
              const scoreStatusText = test.percentage >= 60 ? 'Exemption / High Score 🌟' : test.percentage >= 40 ? 'Cleared / Passing 🌸' : 'Needs Practice 🌱';

              return `
                <div class="mock-test-item-card kawaii-card" data-id="${test.id}">
                  <div class="mock-item-main">
                    <div class="mock-item-paper-tag" style="background: ${paper.color};">
                      <span class="tag-icon">${paper.icon}</span>
                      <div>
                        <span class="tag-code">${paper.code}</span>
                        <h3 class="tag-title">${paper.name}</h3>
                      </div>
                    </div>

                    <div class="mock-item-score-block">
                      <div class="score-fraction">
                        <span class="score-obtained">${test.marksScored}</span>
                        <span class="score-slash">/</span>
                        <span class="score-max">${test.totalMarks}</span>
                      </div>
                      <div class="score-percent-badge ${scoreBadgeClass}">
                        ${test.percentage}%
                      </div>
                    </div>

                    <div class="mock-item-meta">
                      <div class="mock-date-pill">📅 ${formatMockDate(test.date)}</div>
                      <div class="mock-status-pill">${scoreStatusText}</div>
                    </div>

                    <div class="mock-item-actions">
                      <button class="btn-icon btn-edit-mock" data-id="${test.id}" title="Edit Test">✏️</button>
                      <button class="btn-icon btn-delete-mock" data-id="${test.id}" title="Delete Test">🗑️</button>
                    </div>
                  </div>

                  ${test.notes ? `
                    <div class="mock-item-notes">
                      <span class="notes-icon">📝</span>
                      <p class="notes-text">${escapeHtml(test.notes)}</p>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  setupMockTestEvents();
}

function getHighestScore(tests) {
  if (!tests || tests.length === 0) return 0;
  return Math.max(...tests.map(t => t.percentage || 0)).toFixed(1);
}

function formatMockDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setupMockTestEvents() {
  const form = document.getElementById('form-mock-test');
  const scoreInput = document.getElementById('mock-score-input');
  const totalInput = document.getElementById('mock-total-input');
  const calcPreview = document.getElementById('score-calc-preview');
  const editIdInput = document.getElementById('mock-edit-id');
  const paperSelect = document.getElementById('mock-paper-select');
  const dateInput = document.getElementById('mock-date-input');
  const notesInput = document.getElementById('mock-notes-input');
  const btnCancelEdit = document.getElementById('btn-cancel-mock-edit');
  const formHeaderTitle = document.getElementById('form-header-title');
  const btnSubmitText = document.getElementById('btn-submit-text');

  function updateCalcPreview() {
    const scored = parseFloat(scoreInput.value) || 0;
    const total = parseFloat(totalInput.value) || 100;
    if (total > 0) {
      const pct = ((scored / total) * 100).toFixed(1);
      if (calcPreview) {
        calcPreview.textContent = `${pct}% (${scored} / ${total})`;
      }
    }
  }

  if (scoreInput) scoreInput.addEventListener('input', updateCalcPreview);
  if (totalInput) totalInput.addEventListener('input', updateCalcPreview);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const scored = parseFloat(scoreInput.value);
      const total = parseFloat(totalInput.value);
      const paperId = paperSelect.value;
      const date = dateInput.value;
      const notes = notesInput.value;
      const editId = editIdInput.value;

      if (isNaN(scored) || isNaN(total) || total <= 0) return;

      if (editId) {
        // Update existing
        store.updateMockTest(editId, { paperId, date, marksScored: scored, totalMarks: total, notes });
        sound.playCheck();
      } else {
        // Create new
        store.addMockTest({ paperId, date, marksScored: scored, totalMarks: total, notes });
        const pct = (scored / total) * 100;
        if (pct >= 60) {
          triggerConfetti();
          sound.playCelebration();
        } else {
          sound.playCheck();
        }
      }

      editingTestId = null;
      renderMockTests();
    });
  }

  // Cancel edit button
  if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', () => {
      editingTestId = null;
      renderMockTests();
    });
  }

  // Edit action
  document.querySelectorAll('.btn-edit-mock').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const test = store.getState().mockTests.find(t => t.id === id);
      if (!test) return;

      sound.playPop();
      editingTestId = id;
      if (editIdInput) editIdInput.value = test.id;
      if (paperSelect) paperSelect.value = test.paperId;
      if (dateInput) dateInput.value = test.date;
      if (scoreInput) scoreInput.value = test.marksScored;
      if (totalInput) totalInput.value = test.totalMarks;
      if (notesInput) notesInput.value = test.notes || '';
      if (formHeaderTitle) formHeaderTitle.textContent = '✏️ Edit Mock Test Entry';
      if (btnSubmitText) btnSubmitText.textContent = '💾 Update Test 🌸';
      if (btnCancelEdit) btnCancelEdit.classList.remove('hidden');

      updateCalcPreview();

      const formSection = document.getElementById('mock-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Delete action
  document.querySelectorAll('.btn-delete-mock').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this mock test entry? 🌸')) {
        sound.playPop();
        store.deleteMockTest(id);
        renderMockTests();
      }
    });
  });
}
