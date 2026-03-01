window.Portfolio = window.Portfolio || {};

(function () {
  window.Portfolio.initQuotes = function () {
    const QUOTES     = window.Portfolio.QUOTES;
    const quoteList  = document.getElementById('quoteList');
    const authorCard = document.getElementById('authorCard');
    const authorName = document.getElementById('authorName');
    const authorDate = document.getElementById('authorDate');
    if (!quoteList || !authorCard) return;

    QUOTES.forEach((q, i) => {
      const li = document.createElement('li');
      li.className     = 'quote-item';
      li.style.cssText = `opacity:0;animation:fadeUp .7s ${0.55 + i * 0.06}s forwards`;
      li.innerHTML     = `
        <span class="q-num">${String(i + 1).padStart(3, '0')}.</span>
        <span class="q-text">${q.text}</span>
      `;
      li.addEventListener('mouseenter', () => {
        authorName.textContent = q.author;
        authorDate.textContent = q.role + (q.year ? ` // ${q.year}` : '');
        authorCard.classList.add('show');
      });
      li.addEventListener('mouseleave', () => authorCard.classList.remove('show'));
      quoteList.appendChild(li);
    });

    document.addEventListener('mousemove', (e) => {
      const cardW = 200, cardH = 70, pad = 18;
      let lx = e.clientX + pad;
      let ly = e.clientY - cardH / 2;
      if (lx + cardW > window.innerWidth - 80)  lx = e.clientX - cardW - pad;
      if (ly < 10)                               ly = 10;
      if (ly + cardH > window.innerHeight - 10)  ly = window.innerHeight - cardH - 10;
      authorCard.style.left = `${lx}px`;
      authorCard.style.top  = `${ly}px`;
    });
  };
})();
