/* =============================================
   EDITOR K — Main JavaScript
   ============================================= */

// -----------------------------------------------
// 스티비 구독 페이지 URL
// 스티비 > 주소록 > 구독 페이지 > URL 복사 후 아래에 붙여넣으세요
// -----------------------------------------------
const STIBEE_URL = 'https://page.stibee.com/subscriptions/YOUR_LIST_TOKEN';

// --- Mobile Navigation ---
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
    hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

// --- Active nav link ---
function initActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = new URL(href, window.location.origin).pathname;
    if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });
}

// --- Blog category filter ---
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;

      articleCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Registration Form ---
function initRegForm() {
  const form = document.querySelector('#reg-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.textContent = '처리 중...';

    // Simulate async submission
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Save to localStorage for demo
      const data = new FormData(form);
      const entries = {};
      data.forEach((v, k) => { entries[k] = v; });
      const existing = JSON.parse(localStorage.getItem('registrations') || '[]');
      existing.push({ ...entries, timestamp: new Date().toISOString() });
      localStorage.setItem('registrations', JSON.stringify(existing));
    }, 1200);
  });
}

// --- Newsletter Links (Stibee) ---
function initNewsletterForm() {
  // 스티비 구독 링크로 연결
  document.querySelectorAll('.stibee-subscribe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(STIBEE_URL, '_blank', 'noopener,noreferrer');
    });
  });
}

// --- Scroll animations ---
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.article-card, .event-card, .app-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${i * 0.07}s`;
    observer.observe(el);
  });
}

// --- Spots counter visual ---
function initSpotsCounter() {
  document.querySelectorAll('.spots-badge').forEach(badge => {
    const text = badge.textContent;
    const match = text.match(/(\d+)\s*\/\s*(\d+)/);
    if (match) {
      const used = parseInt(match[1]);
      const total = parseInt(match[2]);
      if (used >= total) badge.classList.add('full');
    }
  });
}

// --- Smooth anchor scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// --- Init all ---
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNav();
  initCategoryFilter();
  initRegForm();
  initNewsletterForm();
  initScrollAnimations();
  initSpotsCounter();
  initSmoothScroll();
});
