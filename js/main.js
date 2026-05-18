/* ===================== LOADER ===================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

/* ===================== AOS ===================== */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 820, once: true, easing: 'ease-out-cubic', offset: 55 });
});

/* ===================== NAVBAR SCROLL ===================== */
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  const isInnerPage = document.body.classList.contains('inner-page');
  // Inner pages always have dark navbar; home page transparent until scroll
  if (isInnerPage) {
    mainNav.classList.add('scrolled');
  }
  window.addEventListener('scroll', () => {
    if (!isInnerPage) {
      mainNav.classList.toggle('scrolled', window.scrollY > 50);
    }
  }, { passive: true });
  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) link.classList.add('active-page');
  });
}

/* ===================== SCROLL PROGRESS ===================== */
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = ((window.scrollY / docH) * 100) + '%';
}, { passive: true });

/* ===================== COUNTER ANIMATION ===================== */
const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseFloat(entry.target.dataset.target);
      const suffix = entry.target.dataset.suffix || '';
      const isDecimal = target % 1 !== 0;
      let current = 0;
      const step = target / 70;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        entry.target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      }, 22);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ===================== PROGRESS BARS ===================== */
const bars = document.querySelectorAll('.insight-bar-fill[data-width]');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      entry.target.style.width = entry.target.dataset.width + '%';
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => barObserver.observe(b));

/* ===================== PORTFOLIO FILTER ===================== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.masonry-item').forEach(item => {
      const show = filter === 'all' || item.dataset.filter === filter;
      item.style.opacity = show ? '1' : '0.15';
      item.style.transform = show ? '' : 'scale(0.95)';
      item.style.pointerEvents = show ? 'all' : 'none';
    });
  });
});

/* ===================== FORM SUBMIT ===================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#25D366,#1aab53)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
}

/* ===================== REEL MODAL ===================== */
function openReelModal(emoji, title, stats) {
  document.getElementById('reelModalEmoji').textContent = emoji;
  document.getElementById('reelModalTitle').textContent = title;
  document.getElementById('reelModalStats').innerHTML = '<i class="fas fa-play me-1"></i>' + stats;
  document.getElementById('reelModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeReelModal() {
  document.getElementById('reelModal').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('reelModal');
  if (modal) {
    modal.addEventListener('click', function(e) { if (e.target === this) closeReelModal(); });
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReelModal(); });

/* ===================== SWIPER ===================== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined' && document.querySelector('.reels-swiper')) {
    new Swiper('.reels-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 22,
      centeredSlides: false,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 16 },
        576: { slidesPerView: 'auto', centeredSlides: false },
      }
    });
  }

  /* GLIGHTBOX */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }

  /* PARALLAX HERO */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.22}px)`;
        heroContent.style.opacity = Math.max(0, 1 - (scrolled / 580));
      }
    }, { passive: true });
  }

  /* PARTICLES CANVAS */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.4 + 0.4; this.alpha = Math.random() * 0.45 + 0.08;
        this.dx = (Math.random() - 0.5) * 0.35; this.dy = (Math.random() - 0.5) * 0.35;
      }
      update() {
        this.x += this.dx; this.y += this.dy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(176,177,104,${this.alpha})`; ctx.fill();
      }
    }
    for (let i = 0; i < 90; i++) particles.push(new Particle());
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }
});
