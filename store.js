// Reactive State Management & LocalStorage Persistence for CA Inter Prep Tracker
import { INITIAL_SYLLABUS, PAPERS_METADATA } from './data/seed_syllabus.js';

const STORAGE_KEY = 'cainter_prep_tracker_v1';

class Store {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
    this.checkAndUpdateStreak();
  }

  getDefaultState() {
    // Deep clone initial syllabus so instances are isolated
    const syllabus = JSON.parse(JSON.stringify(INITIAL_SYLLABUS));
    
    // Set a default exam date (e.g., in the next November/May exam cycle)
    const today = new Date();
    const defaultExam = new Date(today.getFullYear(), 10, 2); // Nov 2nd
    if (defaultExam < today) {
      defaultExam.setFullYear(today.getFullYear() + 1);
    }
    const defaultDateStr = defaultExam.toISOString().split('T')[0];

    return {
      examDate: defaultDateStr,
      syllabus: syllabus,
      mockTests: [],
      timerSessions: [],
      timerSettings: {
        focusMinutes: 25,
        breakMinutes: 5,
        soundEnabled: true,
        confettiEnabled: true
      },
      streak: {
        count: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        longestStreak: 1
      },
      currentQuoteIndex: Math.floor(Math.random() * 30)
    };
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.getDefaultState();
      
      const parsed = JSON.parse(raw);
      const defaultState = this.getDefaultState();
      
      // Ensure all papers exist even if loaded from older structure
      const syllabus = { ...defaultState.syllabus, ...(parsed.syllabus || {}) };
      
      return {
        ...defaultState,
        ...parsed,
        syllabus: syllabus,
        timerSettings: { ...defaultState.timerSettings, ...(parsed.timerSettings || {}) },
        streak: { ...defaultState.streak, ...(parsed.streak || {}) }
      };
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
      return this.getDefaultState();
    }
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Store listener error:', err);
      }
    }
  }

  getState() {
    return this.state;
  }

  // --- Streak Tracking ---
  checkAndUpdateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.state.streak.lastActiveDate;

    if (!lastActive) {
      this.state.streak.lastActiveDate = today;
      this.state.streak.count = 1;
      this.state.streak.longestStreak = Math.max(1, this.state.streak.longestStreak || 1);
      this.saveState();
      return;
    }

    if (lastActive === today) {
      // Already active today
      return;
    }

    const lastDate = new Date(lastActive);
    const currentDate = new Date(today);
    const diffTime = currentDate - lastDate;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      this.state.streak.count = (this.state.streak.count || 0) + 1;
      this.state.streak.longestStreak = Math.max(this.state.streak.count, this.state.streak.longestStreak || 1);
      this.state.streak.lastActiveDate = today;
      this.saveState();
    } else if (diffDays > 1) {
      // Streak broken
      this.state.streak.count = 1;
      this.state.streak.lastActiveDate = today;
      this.saveState();
    }
  }

  recordActivity() {
    this.checkAndUpdateStreak();
  }

  // --- Exam Date Actions ---
  setExamDate(dateStr) {
    this.state.examDate = dateStr;
    this.recordActivity();
    this.saveState();
  }

  // --- Syllabus Actions ---
  updateChapterStatus(paperId, chapterId, status) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const chapter = paper.find(c => c.id === chapterId);
    if (chapter) {
      chapter.status = status;
      this.recordActivity();
      this.saveState();
    }
  }

  updateChapterRevision(paperId, chapterId, delta) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const chapter = paper.find(c => c.id === chapterId);
    if (chapter) {
      chapter.revisions = Math.max(0, (chapter.revisions || 0) + delta);
      this.recordActivity();
      this.saveState();
    }
  }

  resetChapterRevision(paperId, chapterId) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const chapter = paper.find(c => c.id === chapterId);
    if (chapter) {
      chapter.revisions = 0;
      this.recordActivity();
      this.saveState();
    }
  }

  updateChapterNotes(paperId, chapterId, notes) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const chapter = paper.find(c => c.id === chapterId);
    if (chapter) {
      chapter.notes = notes;
      this.recordActivity();
      this.saveState();
    }
  }

  updateChapterPriority(paperId, chapterId, priority) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const chapter = paper.find(c => c.id === chapterId);
    if (chapter) {
      chapter.priority = priority;
      this.recordActivity();
      this.saveState();
    }
  }

  updateChapterTitle(paperId, chapterId, newTitle) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const chapter = paper.find(c => c.id === chapterId);
    if (chapter) {
      chapter.title = newTitle.trim();
      this.recordActivity();
      this.saveState();
    }
  }

  addChapter(paperId, title, priority = "Medium") {
    if (!this.state.syllabus[paperId]) {
      this.state.syllabus[paperId] = [];
    }
    const newChapter = {
      id: `${paperId}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      status: "Not Started",
      revisions: 0,
      notes: "",
      priority: priority
    };
    this.state.syllabus[paperId].push(newChapter);
    this.recordActivity();
    this.saveState();
    return newChapter;
  }

  deleteChapter(paperId, chapterId) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    this.state.syllabus[paperId] = paper.filter(c => c.id !== chapterId);
    this.recordActivity();
    this.saveState();
  }

  moveChapter(paperId, chapterId, direction) {
    const paper = this.state.syllabus[paperId];
    if (!paper) return;
    const index = paper.findIndex(c => c.id === chapterId);
    if (index === -1) return;
    
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= paper.length) return;

    const temp = paper[index];
    paper[index] = paper[targetIndex];
    paper[targetIndex] = temp;
    
    this.recordActivity();
    this.saveState();
  }

  // --- Mock Test Actions ---
  addMockTest({ paperId, date, marksScored, totalMarks, notes }) {
    const scored = parseFloat(marksScored) || 0;
    const total = parseFloat(totalMarks) || 100;
    const percentage = total > 0 ? ((scored / total) * 100).toFixed(1) : 0;

    const newTest = {
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      paperId,
      date: date || new Date().toISOString().split('T')[0],
      marksScored: scored,
      totalMarks: total,
      percentage: parseFloat(percentage),
      notes: (notes || '').trim(),
      createdAt: new Date().toISOString()
    };

    this.state.mockTests.unshift(newTest);
    this.recordActivity();
    this.saveState();
    return newTest;
  }

  updateMockTest(testId, { paperId, date, marksScored, totalMarks, notes }) {
    const test = this.state.mockTests.find(t => t.id === testId);
    if (!test) return;

    const scored = parseFloat(marksScored) || 0;
    const total = parseFloat(totalMarks) || 100;
    const percentage = total > 0 ? ((scored / total) * 100).toFixed(1) : 0;

    test.paperId = paperId;
    test.date = date;
    test.marksScored = scored;
    test.totalMarks = total;
    test.percentage = parseFloat(percentage);
    test.notes = (notes || '').trim();

    this.recordActivity();
    this.saveState();
  }

  deleteMockTest(testId) {
    this.state.mockTests = this.state.mockTests.filter(t => t.id !== testId);
    this.recordActivity();
    this.saveState();
  }

  // --- Timer Actions ---
  logTimerSession({ durationMinutes, paperId, chapterTitle, type = "focus" }) {
    const session = {
      id: `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Math.round(durationMinutes),
      paperId: paperId || "general",
      chapterTitle: chapterTitle || "General Study",
      type
    };
    this.state.timerSessions.unshift(session);
    this.recordActivity();
    this.saveState();
    return session;
  }

  deleteTimerSession(sessionId) {
    this.state.timerSessions = this.state.timerSessions.filter(s => s.id !== sessionId);
    this.saveState();
  }

  updateTimerSettings(settings) {
    this.state.timerSettings = { ...this.state.timerSettings, ...settings };
    this.saveState();
  }

  // --- Quotes ---
  setNextQuote(totalQuotes) {
    this.state.currentQuoteIndex = ((this.state.currentQuoteIndex || 0) + 1) % totalQuotes;
    this.saveState();
  }

  // --- Computed Metrics ---
  getPaperStats(paperId) {
    const chapters = this.state.syllabus[paperId] || [];
    const total = chapters.length;
    if (total === 0) return { total: 0, done: 0, inProgress: 0, notStarted: 0, percent: 0, revisions: 0 };

    const done = chapters.filter(c => c.status === 'Done').length;
    const inProgress = chapters.filter(c => c.status === 'In Progress').length;
    const notStarted = chapters.filter(c => c.status === 'Not Started').length;
    const revisions = chapters.reduce((sum, c) => sum + (c.revisions || 0), 0);
    const percent = Math.round((done / total) * 100);

    return { total, done, inProgress, notStarted, percent, revisions };
  }

  getOverallStats() {
    let totalChapters = 0;
    let doneChapters = 0;
    let inProgressChapters = 0;
    let notStartedChapters = 0;
    let totalRevisions = 0;

    PAPERS_METADATA.forEach(p => {
      const stats = this.getPaperStats(p.id);
      totalChapters += stats.total;
      doneChapters += stats.done;
      inProgressChapters += stats.inProgress;
      notStartedChapters += stats.notStarted;
      totalRevisions += stats.revisions;
    });

    const percent = totalChapters > 0 ? Math.round((doneChapters / totalChapters) * 100) : 0;

    // Mock test stats
    const mockTestsCount = this.state.mockTests.length;
    const avgMockScore = mockTestsCount > 0
      ? (this.state.mockTests.reduce((acc, t) => acc + t.percentage, 0) / mockTestsCount).toFixed(1)
      : 0;

    // Study minutes stats
    const totalStudyMinutes = this.state.timerSessions
      .filter(s => s.type === 'focus')
      .reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

    return {
      totalChapters,
      doneChapters,
      inProgressChapters,
      notStartedChapters,
      percent,
      totalRevisions,
      mockTestsCount,
      avgMockScore,
      totalStudyMinutes,
      totalStudyHours,
      streakCount: this.state.streak.count || 1,
      longestStreak: this.state.streak.longestStreak || 1
    };
  }

  getPaperMockStats(paperId) {
    const tests = this.state.mockTests.filter(t => t.paperId === paperId);
    if (tests.length === 0) return { count: 0, avg: 0, highest: 0 };
    const avg = (tests.reduce((acc, t) => acc + t.percentage, 0) / tests.length).toFixed(1);
    const highest = Math.max(...tests.map(t => t.percentage)).toFixed(1);
    return { count: tests.length, avg, highest };
  }

  // --- Backup / Restore / Reset ---
  exportDataJSON() {
    const dataStr = JSON.stringify(this.state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `ca_inter_prep_tracker_backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  importDataJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON structure');
      }

      // Basic validation
      if (!parsed.syllabus && !parsed.mockTests) {
        throw new Error('Backup file does not contain CA Inter Tracker data');
      }

      const defaultState = this.getDefaultState();
      this.state = {
        ...defaultState,
        ...parsed,
        syllabus: { ...defaultState.syllabus, ...(parsed.syllabus || {}) },
        timerSettings: { ...defaultState.timerSettings, ...(parsed.timerSettings || {}) },
        streak: { ...defaultState.streak, ...(parsed.streak || {}) }
      };

      this.saveState();
      return { success: true, message: 'Data imported successfully! ✨' };
    } catch (e) {
      console.error('Import error:', e);
      return { success: false, message: e.message || 'Failed to parse backup JSON file.' };
    }
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.getDefaultState();
    this.saveState();
  }
}

export const store = new Store();
