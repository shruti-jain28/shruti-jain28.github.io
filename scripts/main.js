// main.js — initialises all features after the DOM is ready.
// Script load order in index.html guarantees all Portfolio.init* exist by now.

(function () {
  // Theme applied immediately so there's no flash of wrong colour
  window.Portfolio.initTheme();

  document.addEventListener('DOMContentLoaded', function () {
    Portfolio.initSidebars();
    Portfolio.initCursor();
    Portfolio.initFloatPhoto();
    Portfolio.initTypewriter();
    Portfolio.initQuotes();
    Portfolio.initClickBloom();
    Portfolio.initMagneticNav();
    Portfolio.initStickyNav();
    Portfolio.initScrollReveal();
    Portfolio.initStatCounters();
  });
})();
