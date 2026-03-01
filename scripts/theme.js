window.Portfolio = window.Portfolio || {};

(function () {
  window.Portfolio.initTheme = function () {
    const btn  = document.getElementById('themeToggle');
    const html = document.documentElement;
    if (localStorage.getItem('theme') !== 'dark') html.classList.add('light');
    btn.addEventListener('click', () => {
      html.classList.toggle('light');
      localStorage.setItem('theme', html.classList.contains('light') ? 'light' : 'dark');
    });
  };
})();
