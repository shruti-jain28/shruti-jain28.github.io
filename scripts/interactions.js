window.Portfolio = window.Portfolio || {};

(function () {
  const BLOOM_SKIP = 'a,button,input,textarea,.tile,.work-item,.sk,.rotating-word,.quote-item,.patent-card,.social-link-item';
  const BLOOM_TAGS = new Set(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']);

  window.Portfolio.initClickBloom = function () {
    document.addEventListener('click', (e) => {
      if (BLOOM_TAGS.has(e.target.tagName) || e.target.closest(BLOOM_SKIP)) return;
      const x = e.clientX, y = e.clientY, xy = `left:${x}px;top:${y}px`;

      const dot = document.createElement('div');
      dot.className = 'bloom-dot';
      dot.style.cssText = xy;
      document.body.appendChild(dot);
      dot.addEventListener('animationend', () => dot.remove());

      ['', 'r2', 'r3'].forEach((cls) => {
        const ring = document.createElement('div');
        ring.className = 'bloom-ring' + (cls ? ` ${cls}` : '');
        ring.style.cssText = xy;
        document.body.appendChild(ring);
        ring.addEventListener('animationend', () => ring.remove());
      });

      const wrap = document.createElement('div');
      wrap.className = 'petal-wrap';
      wrap.style.cssText = xy;
      for (let i = 0; i < 6; i++) {
        const petal = document.createElement('span');
        petal.style.cssText = `--r:${i * 60 + Math.random() * 20 - 10}deg;animation-delay:${i * 0.04}s`;
        wrap.appendChild(petal);
      }
      document.body.appendChild(wrap);
      wrap.addEventListener('animationend', () => wrap.remove());
    });
  };

  window.Portfolio.initMagneticNav = function () {
    document.querySelectorAll('.nav-link, .nav-home').forEach((link) => {
      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) * 0.35;
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) * 0.35;
        link.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      link.addEventListener('mouseleave', () => { link.style.transform = 'translate(0,0)'; });
    });
  };

  window.Portfolio.initStickyNav = function () {
    const navEl = document.querySelector('nav');
    if (!navEl) return;
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  };

  window.Portfolio.initScrollReveal = function () {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('show'); }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.rv').forEach((el) => obs.observe(el));
  };

  window.Portfolio.initStatCounters = function () {
    const strip = document.querySelector('.stats-strip');
    if (!strip) return;
    const sObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.stat-n[data-n]').forEach((el) => {
            const target  = parseInt(el.dataset.n, 10);
            const hasPlus = el.textContent.includes('+');
            let v = 0;
            const t = setInterval(() => {
              v = Math.min(v + target / 40, target);
              el.textContent = Math.floor(v) + (hasPlus ? '+' : '');
              if (v >= target) clearInterval(t);
            }, 28);
          });
          sObs.unobserve(e.target);
        }
      }),
      { threshold: 0.5 }
    );
    sObs.observe(strip);
  };
})();
