window.Portfolio = window.Portfolio || {};

(function () {

  /* ══════════════════════════════════════════════
     RECOMMENDATION ENGINE  (tag-overlap scoring)
  ══════════════════════════════════════════════ */
  function recommendFor(current, all, count) {
    return all
      .filter(function(b) { return b.id !== current.id; })
      .map(function(b) {
        var shared = b.tags.filter(function(t) { return current.tags.includes(t); }).length;
        return { blog: b, score: shared };
      })
      .sort(function(a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.blog.dateISO) - new Date(a.blog.dateISO);
      })
      .slice(0, count)
      .map(function(r) { return r.blog; });
  }

  /* ══════════════════════════════════════════════
     RENDER HELPERS
  ══════════════════════════════════════════════ */
  function renderMeta(blog) {
    document.getElementById('postTags').innerHTML =
      blog.tags.map(function(t) { return '<span class="post-tag">' + t + '</span>'; }).join('');
    document.getElementById('postTitle').textContent = blog.title;
    document.getElementById('postDate').textContent  = blog.date;
    document.getElementById('postRead').textContent  = blog.readTime;
    document.title = blog.title + ' — Shruti Jain';
  }

  function renderBody(content) {
    document.getElementById('postBody').innerHTML = content;
  }

  function renderRecommendations(recs) {
    var grid = document.getElementById('recGrid');
    if (!grid) return;
    grid.innerHTML = '';
    recs.forEach(function(rec) {
      var a = document.createElement('a');
      a.className = 'rec-card rv';
      a.href      = 'blog-post.html?id=' + rec.id;
      a.innerHTML =
        '<span class="rec-tag">' + rec.tags[0] + '</span>' +
        '<h3 class="rec-card-title">' + rec.title + '</h3>' +
        '<span class="rec-read">' + rec.readTime + '</span>';
      grid.appendChild(a);
    });
    var obs = new IntersectionObserver(
      function(es) { es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('show'); }); },
      { threshold: 0.1 }
    );
    grid.querySelectorAll('.rv').forEach(function(el) { obs.observe(el); });
    grid.querySelectorAll('.rec-card').forEach(function(el) {
      var ring = document.getElementById('curRing');
      if (!ring) return;
      el.addEventListener('mouseenter', function() { ring.classList.add('expand'); });
      el.addEventListener('mouseleave', function() { ring.classList.remove('expand'); });
    });
  }

  /* ══════════════════════════════════════════════
     TTS ENGINE
  ══════════════════════════════════════════════ */
  var tts = {
    synth     : window.speechSynthesis,
    utterance : null,
    playing   : false,
    paused    : false,
    rate      : 1,
    words     : [],
    totalChars: 0,
    lastActive: null,
  };

  function prepareWords() {
    var body = document.getElementById('postBody');
    if (!body) return;
    tts.words      = [];
    tts.lastActive = null;
    var speechOffset = 0;

    body.querySelectorAll('p, h2').forEach(function(el) {
      if (el.tagName === 'P' && el.querySelector('code') &&
          el.textContent.trim() === el.querySelector('code').textContent.trim()) {
        speechOffset += el.textContent.length + 1;
        return;
      }

      var rawText = el.textContent;
      var tokens  = rawText.split(/(\s+)/);
      el.innerHTML = '';

      tokens.forEach(function(token) {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          el.appendChild(document.createTextNode(token));
          speechOffset += token.length;
        } else {
          var span           = document.createElement('span');
          span.className     = 'tts-w';
          span.dataset.start = speechOffset;
          span.dataset.end   = speechOffset + token.length;
          span.textContent   = token;
          el.appendChild(span);
          tts.words.push({ el: span, start: speechOffset, end: speechOffset + token.length });
          speechOffset += token.length;
        }
      });

      speechOffset += 1;
    });

    tts.totalChars = speechOffset;
  }

  function buildSpeechText() {
    var body = document.getElementById('postBody');
    if (!body) return '';
    var text = '';
    body.querySelectorAll('p, h2').forEach(function(el) { text += el.textContent + ' '; });
    return text.trim();
  }

  function highlightWord(charIndex, charLen) {
    if (tts.lastActive) {
      tts.lastActive.classList.remove('tts-active');
      tts.lastActive = null;
    }

    var target = null;

    if (charLen) {
      var wordEnd = charIndex + charLen;
      for (var i = 0; i < tts.words.length; i++) {
        var w = tts.words[i];
        if (w.start === charIndex || (w.start >= charIndex && w.start < wordEnd)) {
          target = w.el; break;
        }
      }
    }

    if (!target) {
      for (var j = 0; j < tts.words.length; j++) {
        if (charIndex >= tts.words[j].start && charIndex < tts.words[j].end) {
          target = tts.words[j].el; break;
        }
      }
    }

    if (target) {
      target.classList.add('tts-active');
      tts.lastActive = target;
      var rect = target.getBoundingClientRect();
      if (rect.top < 80 || rect.bottom > window.innerHeight - 100) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function clearHighlights() {
    if (tts.lastActive) {
      tts.lastActive.classList.remove('tts-active');
      tts.lastActive = null;
    }
    document.querySelectorAll('.tts-w.tts-active').forEach(function(el) {
      el.classList.remove('tts-active');
    });
  }

  function p(id) { return document.getElementById(id); }

  function updatePlayBtn(playing) {
    var icon  = p('ttsPlayIcon');
    var pause = p('ttsPauseIcon');
    if (icon)  icon.style.display  = playing ? 'none'  : 'block';
    if (pause) pause.style.display = playing ? 'block' : 'none';
  }

  function updateProgress(charIndex) {
    var bar = p('ttsProgressBar');
    if (!bar || !tts.totalChars) return;
    bar.style.width = Math.min(100, (charIndex / tts.totalChars) * 100) + '%';
  }

  function setWave(active) {
    var w = p('ttsWave');
    if (w) w.classList.toggle('tts-wave--playing', active);
  }

  /* ── Female voice picker ──────────────────────────────────────
     Priority order:
       1. Name contains "Samantha" (macOS/iOS — warm, natural)
       2. Name contains "Google UK English Female"
       3. Name contains "Google US English" female variant
       4. Any voice whose name contains "female" or "woman"
       5. Any en-* voice — better than the OS default
       6. Whatever the browser picks (absolute fallback)
  ────────────────────────────────────────────────────────── */
  function pickFemaleVoice() {
    var voices = tts.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // Preferred specific voices (ordered by quality/naturalness)
    var preferred = [
      'Samantha', 'Karen', 'Tessa', 'Moira',       // macOS/iOS
      'Google UK English Female',
      'Google US English',
      'Microsoft Zira', 'Microsoft Susan',           // Windows
      'Fiona', 'Serena', 'Victoria',                 // macOS extras
    ];

    for (var i = 0; i < preferred.length; i++) {
      var match = voices.find(function(v) {
        return v.name.indexOf(preferred[i]) !== -1;
      });
      if (match) return match;
    }

    // Any voice whose name includes a female indicator
    var femaleKeywords = ['female', 'woman', 'girl', 'femme'];
    var femaleMatch = voices.find(function(v) {
      var lower = v.name.toLowerCase();
      return femaleKeywords.some(function(k) { return lower.indexOf(k) !== -1; });
    });
    if (femaleMatch) return femaleMatch;

    // Fall back to any English voice — still better than OS default on some systems
    var englishMatch = voices.find(function(v) {
      return v.lang && v.lang.indexOf('en') === 0;
    });
    return englishMatch || null;
  }

  function ttsPlay() {
    if (!tts.synth) return;
    // Apply any voice that loaded asynchronously after the first play
    if (tts._pendingVoice) {
      tts._selectedVoice = tts._pendingVoice;
      tts._pendingVoice  = null;
    }

    if (tts.paused) {
      tts.synth.resume();
      tts.paused = false; tts.playing = true;
      updatePlayBtn(true); setWave(true);
      return;
    }
    tts.synth.cancel();
    var text = buildSpeechText();
    var u    = new SpeechSynthesisUtterance(text);
    u.rate = tts.rate;

    // Voices load asynchronously on some browsers — assign after a tick if needed
    var selectedVoice = pickFemaleVoice();
    if (selectedVoice) {
      u.voice = selectedVoice;
      u.lang  = selectedVoice.lang;
    } else {
      // Voices not yet loaded — wait for them then assign
      tts.synth.onvoiceschanged = function() {
        var v = pickFemaleVoice();
        if (v && tts.utterance) {
          // Can't change voice mid-utterance; store for next play
          tts._pendingVoice = v;
        }
        tts.synth.onvoiceschanged = null;
      };
    }

    tts.utterance = u;

    u.onboundary = function(e) {
      if (e.name === 'word') {
        highlightWord(e.charIndex, e.charLength || 0);
        updateProgress(e.charIndex);
      }
    };
    u.onend = function() {
      tts.playing = false; tts.paused = false;
      clearHighlights(); updatePlayBtn(false);
      updateProgress(tts.totalChars); setWave(false);
    };
    u.onerror = function() { tts.playing = false; updatePlayBtn(false); setWave(false); };

    tts.synth.speak(u);
    tts.playing = true; tts.paused = false;
    updatePlayBtn(true); setWave(true);
  }

  function ttsPause() {
    if (!tts.synth || !tts.playing) return;
    tts.synth.pause();
    tts.playing = false; tts.paused = true;
    updatePlayBtn(false); setWave(false);
  }

  function ttsStop() {
    if (!tts.synth) return;
    tts.synth.cancel();
    tts.playing = false; tts.paused = false;
    clearHighlights(); updatePlayBtn(false); updateProgress(0); setWave(false);
  }

  function ttsSetRate(rate) {
    tts.rate = rate;
    document.querySelectorAll('.tts-speed-btn').forEach(function(b) {
      b.classList.toggle('active', parseFloat(b.dataset.rate) === rate);
    });
    if (tts.playing || tts.paused) { tts.synth.cancel(); tts.paused = false; ttsPlay(); }
  }

  function showPlayer(title) {
    var pl = p('ttsPlayer');
    if (!pl) return;
    p('ttsBlogTitle').textContent = title;
    pl.classList.add('tts-visible');
  }

  function hidePlayer() {
    ttsStop();
    var pl = p('ttsPlayer');
    if (pl) pl.classList.remove('tts-visible');
  }

  function wirePlayerControls() {
    var playBtn  = p('ttsPlay');
    var stopBtn  = p('ttsStop');
    var closeBtn = p('ttsClose');

    if (playBtn)  playBtn.addEventListener('click',  function() { tts.playing ? ttsPause() : ttsPlay(); });
    if (stopBtn)  stopBtn.addEventListener('click',  ttsStop);
    if (closeBtn) closeBtn.addEventListener('click', hidePlayer);

    document.querySelectorAll('.tts-speed-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { ttsSetRate(parseFloat(btn.dataset.rate)); });
    });
  }

  /* ══════════════════════════════════════════════
     DYNAMIC CONTENT LOADER
  ══════════════════════════════════════════════ */
  function loadContentScript(id, cb) {
    window.Portfolio.POST_CONTENT = null;
    var script = document.createElement('script');
    script.src    = 'blog-posts/' + id + '.js';
    script.onload  = function() { cb(window.Portfolio.POST_CONTENT || null); };
    script.onerror = function() { cb(null); };
    document.head.appendChild(script);
  }

  /* ══════════════════════════════════════════════
     PRE-WARM VOICES
     Browsers load the voice list asynchronously.
     Triggering getVoices() early maximises the
     chance it's ready before the user hits Listen.
  ══════════════════════════════════════════════ */
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', function() {});
  }

  /* ══════════════════════════════════════════════
     MAIN INIT
  ══════════════════════════════════════════════ */
  window.Portfolio.initBlogPost = function () {
    var BLOGS = window.Portfolio.BLOGS;
    if (!BLOGS) return;

    var params = new URLSearchParams(window.location.search);
    var id     = params.get('id');
    var blog   = BLOGS.find(function(b) { return b.id === id; });

    if (!blog) {
      document.getElementById('postTitle').textContent = 'Post not found';
      document.getElementById('postBody').innerHTML =
        '<p>This post doesn\'t exist. <a href="blog.html" style="color:var(--coral)">← All posts</a></p>';
      return;
    }

    renderMeta(blog);
    window.scrollTo(0, 0);
    wirePlayerControls();

    var listenBtn = p('listenBtn');
    if (listenBtn) {
      listenBtn.addEventListener('click', function() {
        prepareWords();
        showPlayer(blog.title);
        ttsPlay();
      });
    }

    renderRecommendations(recommendFor(blog, BLOGS, 3));

    loadContentScript(id, function(postContent) {
      if (postContent && postContent.content) {
        renderBody(postContent.content);
      } else {
        document.getElementById('postBody').innerHTML =
          '<p>Content couldn\'t be loaded. <a href="blog.html" style="color:var(--coral)">← All posts</a></p>';
      }
    });
  };

})();
