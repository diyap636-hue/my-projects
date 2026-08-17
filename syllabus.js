// Syllabus Editor View: Line-wise chapters, dual tracking (Status & Revision), Notes, Priority, Add/Edit/Delete
import { store } from '../store.js';
import { PAPERS_METADATA } from '../data/seed_syllabus.js';
import { sound } from '../audio.js';
import { triggerConfetti } from '../confetti.js';

let currentPaperTab = 'paper1';
let currentStatusFilter = 'all';
let currentPriorityFilter = 'all';
let searchQuery = '';
let expandedNotes = new Set(); // set of chapterIds

export function renderSyllabus() {
  const container = document.getElementById('main-content');
  if (!container) return;

  // If a jump occurred from Dashboard
  if (window.selectedSyllabusPaper) {
    currentPaperTab = window.selectedSyllabusPaper;
    window.selectedSyllabusPaper = null;
  }

  const state = store.getState();
  const overallStats = store.getOverallStats();
  const currentPaper = PAPERS_METADATA.find(p => p.id === currentPaperTab) || PAPERS_METADATA[0];
  const paperStats = store.getPaperStats(currentPaper.id);
  const rawChapters = state.syllabus[currentPaper.id] || [];

  // Filter and search
  const filteredChapters = rawChapters.filter(ch => {
    if (currentStatusFilter !== 'all' && ch.status !== currentStatusFilter) return false;
    if (currentPriorityFilter !== 'all' && (ch.priority || 'Medium') !== currentPriorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = (ch.title || '').toLowerCase().includes(q);
      const notesMatch = (ch.notes || '').toLowerCase().includes(q);
      if (!titleMatch && !notesMatch) return false;
    }
    return true;
  });

  container.innerHTML = `
    <div class="view-wrapper fade-in">
      <!-- Syllabus Header & Overall Progress -->
      <div class="syllabus-top-header">
        <div class="header-titles">
          <div class="greeting-badge">📚 Interactive Tracker</div>
          <h1 class="page-title">CA Inter Syllabus Editor 🌸</h1>
          <p class="page-subtitle">Track your status, revisions, formulas & priorities line-by-line for every paper.</p>
        </div>
        <div class="syllabus-header-actions">
          <button class="btn btn-primary btn-sm" id="btn-open-add-chapter-modal">
            <span>➕</span> Add New Chapter
          </button>
        </div>
      </div>

      <!-- Overall Global Progress Bar -->
      <div class="overall-progress-card kawaii-card">
        <div class="overall-prog-top">
          <div class="overall-prog-title">
            <span class="badge-icon">🎯</span>
            <div>
              <h3 class="card-title">Overall CA Inter Progress</h3>
              <span class="card-subtitle">${overallStats.doneChapters} of ${overallStats.totalChapters} total chapters marked Done (${overallStats.percent}%)</span>
            </div>
          </div>
          <div class="overall-prog-badges">
            <span class="badge badge-rev">⭐ ${overallStats.totalRevisions} Revisions Logged</span>
            <span class="badge badge-prog">🔄 ${overallStats.inProgressChapters} In Progress</span>
          </div>
        </div>
        <div class="cute-progress-bar cute-progress-bar-lg">
          <div class="cute-progress-fill" style="width: ${overallStats.percent}%; background: linear-gradient(90deg, #ffb7b2, #b5ead7, #c7ceea);"></div>
        </div>
      </div>

      <!-- Paper Selector Tabs -->
      <div class="paper-tabs-scroller">
        <div class="paper-tabs-list">
          ${PAPERS_METADATA.map(p => {
            const pStats = store.getPaperStats(p.id);
            const isActive = p.id === currentPaperTab;
            return `
              <button class="paper-tab-btn ${isActive ? 'active' : ''}" data-paper-id="${p.id}" style="${isActive ? `border-bottom-color: ${p.accent}; background: rgba(255, 255, 255, 0.9);` : ''}">
                <span class="tab-icon">${p.icon}</span>
                <div class="tab-text">
                  <span class="tab-code">${p.code}</span>
                  <span class="tab-title">${p.shortName}</span>
                </div>
                <span class="tab-badge" style="background: ${p.color};">${pStats.percent}%</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Active Paper Info & Per-Paper Progress -->
      <div class="active-paper-card kawaii-card" style="border-top: 4px solid ${currentPaper.accent};">
        <div class="active-paper-info-row">
          <div class="active-paper-title-wrap">
            <span class="huge-paper-icon" style="background: ${currentPaper.color};">${currentPaper.icon}</span>
            <div>
              <span class="active-paper-code">${currentPaper.code}</span>
              <h2 class="active-paper-name">${currentPaper.name}</h2>
            </div>
          </div>
          <div class="active-paper-stats-chips">
            <div class="stat-chip"><span class="chip-label">Done</span><span class="chip-val chip-done">${paperStats.done}/${paperStats.total}</span></div>
            <div class="stat-chip"><span class="chip-label">Ongoing</span><span class="chip-val chip-prog">${paperStats.inProgress}</span></div>
            <div class="stat-chip"><span class="chip-label">Revisions</span><span class="chip-val chip-rev">⭐ ${paperStats.revisions}</span></div>
          </div>
        </div>
        <div class="paper-progress-bar-wrap">
          <div class="cute-progress-bar">
            <div class="cute-progress-fill" style="width: ${paperStats.percent}%; background: linear-gradient(90deg, ${currentPaper.color}, ${currentPaper.accent});"></div>
          </div>
        </div>
      </div>

      <!-- Filters, Search & Bulk Actions Bar -->
      <div class="syllabus-controls-bar kawaii-card">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="syllabus-search-input" class="form-input search-input" placeholder="Search chapters, standards, or notes..." value="${searchQuery}" />
          ${searchQuery ? `<button class="btn-clear-search" id="btn-clear-search">×</button>` : ''}
        </div>

        <div class="filter-group">
          <label class="filter-label">Status:</label>
          <select id="syllabus-status-filter" class="form-select">
            <option value="all" ${currentStatusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
            <option value="Not Started" ${currentStatusFilter === 'Not Started' ? 'selected' : ''}>⚪ Not Started</option>
            <option value="In Progress" ${currentStatusFilter === 'In Progress' ? 'selected' : ''}>🟡 In Progress</option>
            <option value="Done" ${currentStatusFilter === 'Done' ? 'selected' : ''}>🟢 Done</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Priority:</label>
          <select id="syllabus-priority-filter" class="form-select">
            <option value="all" ${currentPriorityFilter === 'all' ? 'selected' : ''}>All Priorities</option>
            <option value="High" ${currentPriorityFilter === 'High' ? 'selected' : ''}>🔥 High Priority</option>
            <option value="Medium" ${currentPriorityFilter === 'Medium' ? 'selected' : ''}>✨ Medium</option>
            <option value="Low" ${currentPriorityFilter === 'Low' ? 'selected' : ''}>🌱 Low</option>
          </select>
        </div>

        <div class="bulk-helpers">
          <button class="btn btn-ghost btn-sm" id="btn-mark-all-done" title="Mark all chapters in this paper as Done">✨ Mark All Done</button>
        </div>
      </div>

      <!-- Flat Line-wise Chapters List -->
      <div class="chapters-container">
        ${filteredChapters.length === 0 ? `
          <div class="empty-state kawaii-card">
            <span class="empty-emoji">🌸</span>
            <h3>No chapters match your filter</h3>
            <p>Try resetting the search or filter criteria to see all chapters in this paper.</p>
            <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset Filters</button>
          </div>
        ` : `
          <div class="chapter-rows-list">
            ${filteredChapters.map((ch, idx) => {
              const isNotesExpanded = expandedNotes.has(ch.id);
              const priorityClass = `priority-${(ch.priority || 'Medium').toLowerCase()}`;
              const statusClass = `status-${(ch.status || 'Not Started').replace(/\s+/g, '-').toLowerCase()}`;

              return `
                <div class="chapter-row kawaii-card ${statusClass}" data-chapter-id="${ch.id}" data-paper-id="${currentPaper.id}">
                  <div class="chapter-row-main">
                    <!-- Order indicator & Move Reorder handles -->
                    <div class="chapter-reorder-handles">
                      <button class="btn-reorder btn-move-up" data-chapter-id="${ch.id}" title="Move up">▲</button>
                      <span class="chapter-line-num">${idx + 1}</span>
                      <button class="btn-reorder btn-move-down" data-chapter-id="${ch.id}" title="Move down">▼</button>
                    </div>

                    <!-- Chapter Title & Badges -->
                    <div class="chapter-title-col">
                      <div class="chapter-title-wrap">
                        <span class="chapter-title-text" data-chapter-id="${ch.id}">${escapeHtml(ch.title)}</span>
                        <button class="btn-icon-inline btn-edit-title" data-chapter-id="${ch.id}" title="Edit Chapter Title">✏️</button>
                      </div>
                      <div class="chapter-sub-meta">
                        <!-- Priority Badge -->
                        <div class="priority-dropdown-wrap">
                          <span class="priority-badge ${priorityClass}">
                            ${ch.priority === 'High' ? '🔥 High' : ch.priority === 'Low' ? '🌱 Low' : '✨ Medium'}
                          </span>
                          <select class="select-priority-inline" data-chapter-id="${ch.id}">
                            <option value="High" ${ch.priority === 'High' ? 'selected' : ''}>🔥 High</option>
                            <option value="Medium" ${ch.priority === 'Medium' || !ch.priority ? 'selected' : ''}>✨ Medium</option>
                            <option value="Low" ${ch.priority === 'Low' ? 'selected' : ''}>🌱 Low</option>
                          </select>
                        </div>

                        <!-- Notes Toggle button -->
                        <button class="btn-toggle-notes ${ch.notes ? 'has-notes' : ''}" data-chapter-id="${ch.id}">
                          <span>📝</span> ${ch.notes ? 'Notes Added' : 'Add Note'} ${isNotesExpanded ? '▲' : '▼'}
                        </button>
                      </div>
                    </div>

                    <!-- DUAL TRACKING CONTROLS SIDE BY SIDE -->
                    <div class="chapter-tracking-controls">
                      <!-- 1. Status Dropdown Selector with 3 Stages -->
                      <div class="status-selector-wrap">
                        <label class="tracking-label">Status</label>
                        <select class="form-select status-select-control ${statusClass}" data-chapter-id="${ch.id}">
                          <option value="Not Started" ${ch.status === 'Not Started' ? 'selected' : ''}>⚪ Not Started</option>
                          <option value="In Progress" ${ch.status === 'In Progress' ? 'selected' : ''}>🟡 In Progress</option>
                          <option value="Done" ${ch.status === 'Done' ? 'selected' : ''}>🟢 Done</option>
                        </select>
                      </div>

                      <!-- 2. Revision Counter with +1, -1 & Reset -->
                      <div class="revision-control-wrap">
                        <label class="tracking-label">Revisions</label>
                        <div class="revision-btn-group">
                          <button class="btn-rev-action btn-rev-minus" data-chapter-id="${ch.id}" title="Decrease revision count" ${ch.revisions <= 0 ? 'disabled' : ''}>-</button>
                          <span class="revision-count-pill" title="Current revision count">⭐ ${ch.revisions || 0}</span>
                          <button class="btn-rev-action btn-rev-plus" data-chapter-id="${ch.id}" title="+1 Revision">+1</button>
                          ${ch.revisions > 0 ? `<button class="btn-rev-action btn-rev-reset" data-chapter-id="${ch.id}" title="Reset revisions">↺</button>` : ''}
                        </div>
                      </div>

                      <!-- Delete line button -->
                      <div class="chapter-actions-col">
                        <button class="btn-delete-chapter" data-chapter-id="${ch.id}" title="Delete this chapter line">🗑️</button>
                      </div>
                    </div>
                  </div>

                  <!-- Expandable Notes Section -->
                  <div class="chapter-notes-panel ${isNotesExpanded ? 'expanded' : 'collapsed'}" id="notes-panel-${ch.id}">
                    <div class="notes-panel-inner">
                      <label class="notes-label">🌸 Study Notes / Formulas / Doubts for this chapter:</label>
                      <textarea class="form-textarea chapter-notes-input" data-chapter-id="${ch.id}" placeholder="Type key sections, formulas, doubts, or memory mnemonics here...">${escapeHtml(ch.notes || '')}</textarea>
                      <div class="notes-panel-footer">
                        <span class="notes-status-msg" id="notes-msg-${ch.id}">Auto-saves as you type</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Bottom Add Chapter Helper Bar -->
      <div class="add-chapter-bar kawaii-card">
        <h4 class="add-bar-title">Add custom chapter or topic to ${currentPaper.name}:</h4>
        <div class="add-chapter-inline-form">
          <input type="text" id="inline-new-chapter-title" class="form-input" placeholder="e.g. Chapter X: Practice Case Studies & RTPs" />
          <select id="inline-new-chapter-priority" class="form-select">
            <option value="High">🔥 High Priority</option>
            <option value="Medium" selected>✨ Medium Priority</option>
            <option value="Low">🌱 Low Priority</option>
          </select>
          <button class="btn btn-primary" id="btn-add-inline-chapter">➕ Add Chapter</button>
        </div>
      </div>
    </div>

    <!-- Edit Chapter Title Modal -->
    <div id="modal-edit-chapter" class="modal-overlay hidden">
      <div class="modal-card kawaii-card">
        <div class="modal-header">
          <h3 class="modal-title">✏️ Edit Chapter Title</h3>
          <button class="modal-close" id="btn-close-edit-modal">×</button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="edit-modal-chapter-id" />
          <label class="form-label">Chapter / Unit Name:</label>
          <input type="text" id="edit-modal-title-input" class="form-input" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="btn-cancel-edit-modal">Cancel</button>
          <button class="btn btn-primary" id="btn-save-edit-modal">Save Changes 🌸</button>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Chapter Modal -->
    <div id="modal-delete-chapter" class="modal-overlay hidden">
      <div class="modal-card kawaii-card">
        <div class="modal-header">
          <h3 class="modal-title">🗑️ Delete Chapter?</h3>
          <button class="modal-close" id="btn-close-delete-modal">×</button>
        </div>
        <div class="modal-body">
          <p id="delete-modal-msg">Are you sure you want to delete this chapter from your syllabus?</p>
          <input type="hidden" id="delete-modal-chapter-id" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="btn-cancel-delete-modal">Keep Chapter</button>
          <button class="btn btn-danger" id="btn-confirm-delete-modal">Yes, Delete 🗑️</button>
        </div>
      </div>
    </div>
  `;

  setupSyllabusEvents(currentPaper.id);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setupSyllabusEvents(paperId) {
  // Paper Tab buttons
  document.querySelectorAll('.paper-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-paper-id');
      if (pid && pid !== currentPaperTab) {
        sound.playPop();
        currentPaperTab = pid;
        renderSyllabus();
      }
    });
  });

  // Search input
  const searchInput = document.getElementById('syllabus-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSyllabus();
    });
  }

  const btnClearSearch = document.getElementById('btn-clear-search');
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      searchQuery = '';
      renderSyllabus();
    });
  }

  // Filters
  const statusFilter = document.getElementById('syllabus-status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      currentStatusFilter = e.target.value;
      renderSyllabus();
    });
  }

  const priorityFilter = document.getElementById('syllabus-priority-filter');
  if (priorityFilter) {
    priorityFilter.addEventListener('change', (e) => {
      currentPriorityFilter = e.target.value;
      renderSyllabus();
    });
  }

  const btnResetFilters = document.getElementById('btn-reset-filters');
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      currentStatusFilter = 'all';
      currentPriorityFilter = 'all';
      searchQuery = '';
      renderSyllabus();
    });
  }

  // Status changes
  document.querySelectorAll('.status-select-control').forEach(select => {
    select.addEventListener('change', (e) => {
      const cid = select.getAttribute('data-chapter-id');
      const newStatus = select.value;
      store.updateChapterStatus(paperId, cid, newStatus);
      if (newStatus === 'Done') {
        sound.playCheck();
        const pStats = store.getPaperStats(paperId);
        if (pStats.percent === 100) {
          triggerConfetti();
          sound.playCelebration();
        }
      } else {
        sound.playPop();
      }
      renderSyllabus();
    });
  });

  // Revision +1 / -1 / reset
  document.querySelectorAll('.btn-rev-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      sound.playCheck();
      store.updateChapterRevision(paperId, cid, 1);
      renderSyllabus();
    });
  });

  document.querySelectorAll('.btn-rev-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      sound.playPop();
      store.updateChapterRevision(paperId, cid, -1);
      renderSyllabus();
    });
  });

  document.querySelectorAll('.btn-rev-reset').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      sound.playPop();
      store.resetChapterRevision(paperId, cid);
      renderSyllabus();
    });
  });

  // Inline Priority changes
  document.querySelectorAll('.select-priority-inline').forEach(select => {
    select.addEventListener('change', (e) => {
      const cid = select.getAttribute('data-chapter-id');
      sound.playPop();
      store.updateChapterPriority(paperId, cid, e.target.value);
      renderSyllabus();
    });
  });

  // Toggle Notes panel
  document.querySelectorAll('.btn-toggle-notes').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      sound.playPop();
      if (expandedNotes.has(cid)) {
        expandedNotes.delete(cid);
      } else {
        expandedNotes.add(cid);
      }
      const panel = document.getElementById(`notes-panel-${cid}`);
      if (panel) {
        panel.classList.toggle('expanded', expandedNotes.has(cid));
        panel.classList.toggle('collapsed', !expandedNotes.has(cid));
      }
    });
  });

  // Chapter notes live debounced auto-save
  document.querySelectorAll('.chapter-notes-input').forEach(textarea => {
    textarea.addEventListener('input', (e) => {
      const cid = textarea.getAttribute('data-chapter-id');
      const msg = document.getElementById(`notes-msg-${cid}`);
      if (msg) msg.textContent = 'Saving...';
      
      clearTimeout(textarea._saveTimeout);
      textarea._saveTimeout = setTimeout(() => {
        store.updateChapterNotes(paperId, cid, e.target.value);
        if (msg) msg.textContent = 'Saved ✨';
      }, 400);
    });
  });

  // Reorder buttons
  document.querySelectorAll('.btn-move-up').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      sound.playPop();
      store.moveChapter(paperId, cid, 'up');
      renderSyllabus();
    });
  });

  document.querySelectorAll('.btn-move-down').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      sound.playPop();
      store.moveChapter(paperId, cid, 'down');
      renderSyllabus();
    });
  });

  // Edit title modal
  const modalEdit = document.getElementById('modal-edit-chapter');
  const editTitleInput = document.getElementById('edit-modal-title-input');
  const editIdInput = document.getElementById('edit-modal-chapter-id');
  const btnSaveEdit = document.getElementById('btn-save-edit-modal');
  const btnCancelEdit = document.getElementById('btn-cancel-edit-modal');
  const btnCloseEdit = document.getElementById('btn-close-edit-modal');

  document.querySelectorAll('.btn-edit-title').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      const paper = store.getState().syllabus[paperId] || [];
      const ch = paper.find(c => c.id === cid);
      if (ch && modalEdit && editTitleInput && editIdInput) {
        sound.playPop();
        editIdInput.value = cid;
        editTitleInput.value = ch.title;
        modalEdit.classList.remove('hidden');
        editTitleInput.focus();
      }
    });
  });

  if (btnCancelEdit && modalEdit) {
    btnCancelEdit.addEventListener('click', () => modalEdit.classList.add('hidden'));
  }
  if (btnCloseEdit && modalEdit) {
    btnCloseEdit.addEventListener('click', () => modalEdit.classList.add('hidden'));
  }
  if (btnSaveEdit && editTitleInput && editIdInput && modalEdit) {
    btnSaveEdit.addEventListener('click', () => {
      const cid = editIdInput.value;
      const val = editTitleInput.value.trim();
      if (val && cid) {
        store.updateChapterTitle(paperId, cid, val);
        sound.playCheck();
        modalEdit.classList.add('hidden');
        renderSyllabus();
      }
    });
  }

  // Delete chapter modal
  const modalDelete = document.getElementById('modal-delete-chapter');
  const deleteIdInput = document.getElementById('delete-modal-chapter-id');
  const deleteMsg = document.getElementById('delete-modal-msg');
  const btnConfirmDelete = document.getElementById('btn-confirm-delete-modal');
  const btnCancelDelete = document.getElementById('btn-cancel-delete-modal');
  const btnCloseDelete = document.getElementById('btn-close-delete-modal');

  document.querySelectorAll('.btn-delete-chapter').forEach(btn => {
    btn.addEventListener('click', () => {
      const cid = btn.getAttribute('data-chapter-id');
      const paper = store.getState().syllabus[paperId] || [];
      const ch = paper.find(c => c.id === cid);
      if (ch && modalDelete && deleteIdInput) {
        sound.playPop();
        deleteIdInput.value = cid;
        if (deleteMsg) {
          deleteMsg.textContent = `Are you sure you want to remove "${ch.title}" from this syllabus?`;
        }
        modalDelete.classList.remove('hidden');
      }
    });
  });

  if (btnCancelDelete && modalDelete) {
    btnCancelDelete.addEventListener('click', () => modalDelete.classList.add('hidden'));
  }
  if (btnCloseDelete && modalDelete) {
    btnCloseDelete.addEventListener('click', () => modalDelete.classList.add('hidden'));
  }
  if (btnConfirmDelete && deleteIdInput && modalDelete) {
    btnConfirmDelete.addEventListener('click', () => {
      const cid = deleteIdInput.value;
      if (cid) {
        store.deleteChapter(paperId, cid);
        sound.playPop();
        modalDelete.classList.add('hidden');
        renderSyllabus();
      }
    });
  }

  // Add chapter inline & top button
  const btnAddInline = document.getElementById('btn-add-inline-chapter');
  const inlineTitleInput = document.getElementById('inline-new-chapter-title');
  const inlinePrioritySelect = document.getElementById('inline-new-chapter-priority');
  const btnOpenAddModal = document.getElementById('btn-open-add-chapter-modal');

  if (btnAddInline && inlineTitleInput) {
    btnAddInline.addEventListener('click', () => {
      const val = inlineTitleInput.value.trim();
      if (val) {
        const priority = inlinePrioritySelect ? inlinePrioritySelect.value : 'Medium';
        store.addChapter(paperId, val, priority);
        sound.playCheck();
        inlineTitleInput.value = '';
        renderSyllabus();
      }
    });
  }

  if (btnOpenAddModal && inlineTitleInput) {
    btnOpenAddModal.addEventListener('click', () => {
      inlineTitleInput.focus();
      inlineTitleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Mark all done
  const btnMarkAllDone = document.getElementById('btn-mark-all-done');
  if (btnMarkAllDone) {
    btnMarkAllDone.addEventListener('click', () => {
      const paper = store.getState().syllabus[paperId] || [];
      if (paper.length === 0) return;
      paper.forEach(ch => {
        ch.status = 'Done';
      });
      store.recordActivity();
      store.saveState();
      sound.playCelebration();
      triggerConfetti();
      renderSyllabus();
    });
  }
}
