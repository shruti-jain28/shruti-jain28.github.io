window.Portfolio = window.Portfolio || {};

(function () {
  const HOVER_TARGETS = [
    'a', 'button', '.tile', '.work-item', '.sk',
    '.name-wrap', '.patent-card', '.rotating-word',
    '.quote-item', '.social-link-item',
  ].join(',');

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  window.Portfolio.initCursor = function () {
    const dot  = document.getElementById('curDot');
    const ring = document.getElementById('curRing');

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top  = `${my}px`;
    });

    (function raf() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      requestAnimationFrame(raf);
    })();

    document.querySelectorAll(HOVER_TARGETS).forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('expand'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
    });
  };

  window.Portfolio.initFloatPhoto = function () {
    const photo    = document.getElementById('floatPhoto');
    const nameWrap = document.getElementById('nameWrap');

    nameWrap.addEventListener('mouseenter', () => photo.classList.add('show'));
    nameWrap.addEventListener('mouseleave', () => photo.classList.remove('show'));

    document.addEventListener('mousemove', (e) => {
      photo.style.left = `${e.clientX}px`;
      photo.style.top  = `${e.clientY - 110}px`;
    });
  };
})();
