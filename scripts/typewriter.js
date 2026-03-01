window.Portfolio = window.Portfolio || {};

(function () {
  const WORDS        = ['thoughtful', 'natural', 'easy', 'empowering', 'fun', 'honest', 'reliable'];
  const TYPE_SPEED   = 95;
  const DELETE_SPEED = 55;
  const PAUSE_FULL   = 2200;
  const PAUSE_EMPTY  = 380;

  window.Portfolio.initTypewriter = function () {
    const wordEl  = document.getElementById('wordInner');
    const rotWrap = document.getElementById('rotatingWord');
    if (!wordEl || !rotWrap) return;

    let wIdx    = 0;
    let charIdx = WORDS[0].length;
    let typing  = false;
    let timer   = null;

    wordEl.textContent = WORDS[0];

    function tick() {
      const target = WORDS[wIdx];
      if (typing) {
        charIdx++;
        wordEl.textContent = target.slice(0, charIdx);
        timer = setTimeout(tick, charIdx === target.length ? PAUSE_FULL : TYPE_SPEED);
        if (charIdx === target.length) typing = false;
      } else {
        charIdx--;
        wordEl.textContent = target.slice(0, charIdx);
        if (charIdx === 0) {
          typing = true;
          wIdx   = (wIdx + 1) % WORDS.length;
          timer  = setTimeout(tick, PAUSE_EMPTY);
        } else {
          timer = setTimeout(tick, DELETE_SPEED);
        }
      }
    }

    timer = setTimeout(tick, PAUSE_FULL);

    rotWrap.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(timer);
      charIdx = 0;
      typing  = true;
      wIdx    = (wIdx + 1) % WORDS.length;
      timer   = setTimeout(tick, PAUSE_EMPTY);
    });
  };
})();
