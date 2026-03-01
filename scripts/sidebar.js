window.Portfolio = window.Portfolio || {};

(function () {
  const leftIcons  = window.Portfolio.ICONS.filter((_, i) => i % 2 === 0);
  const rightIcons = window.Portfolio.ICONS.filter((_, i) => i % 2 !== 0);

  function buildSidebar(el, icons) {
    const count = Math.ceil(window.innerHeight / 69) + 2;
    el.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const ic   = icons[i % icons.length];
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.title     = ic.label;
      tile.innerHTML = ic.svg + `<span class="tile-label">${ic.label}</span>`;
      el.appendChild(tile);
    }
  }

  window.Portfolio.initSidebars = function () {
    const sideL = document.getElementById('sideL');
    const sideR = document.getElementById('sideR');
    buildSidebar(sideL, leftIcons);
    buildSidebar(sideR, rightIcons);
    window.addEventListener('resize', () => {
      buildSidebar(sideL, leftIcons);
      buildSidebar(sideR, rightIcons);
    });
  };
})();
