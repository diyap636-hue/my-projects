// Main Application Entry & Controller for CA Inter Prep Tracker
import { Router } from './router.js';
import { store } from './store.js';
import { renderDashboard } from './views/dashboard.js';
import { renderSyllabus } from './views/syllabus.js';
import { renderMockTests } from './views/mock_tests.js';
import { renderTimer } from './views/timer.js';
import { renderSettings } from './views/settings.js';
import { sound } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // Define application routes
  const routes = {
    'dashboard': renderDashboard,
    'syllabus': renderSyllabus,
    'mock-tests': renderMockTests,
    'timer': renderTimer,
    'settings': renderSettings
  };

  // Initialize router
  const router = new Router(routes, 'dashboard');
  window.appRouter = router;

  // Setup navigation click handlers
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (route) {
        sound.playPop();
        router.navigate(route);
      }
    });
  });

  // Mobile sidebar toggle if needed
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('app-sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Global sound context init on first user interaction
  document.addEventListener('click', () => {
    sound.initContext();
  }, { once: true });

  // Start router
  router.init();
});
