// Hash-based Client-Side Router for CA Inter Prep Tracker

export class Router {
  constructor(routes, defaultRoute = 'dashboard') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  init() {
    this.handleRoute();
  }

  getCurrentRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    return hash || this.defaultRoute;
  }

  navigate(route) {
    window.location.hash = `#${route}`;
  }

  handleRoute() {
    let route = this.getCurrentRoute();
    if (!this.routes[route]) {
      route = this.defaultRoute;
    }

    this.currentRoute = route;

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('data-route');
      if (target === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render corresponding view
    const viewHandler = this.routes[route];
    if (typeof viewHandler === 'function') {
      viewHandler();
    }

    // Scroll main viewport to top
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }
}
