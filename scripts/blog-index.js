window.Portfolio = window.Portfolio || {};

(function () {

  /* ═══════════════════════════════════════════════════
     TORN PAPER EDGE  — generates an irregular clip-path
     using overlapping sine waves at different frequencies
  ═══════════════════════════════════════════════════ */
  function buildTornEdgePath() {
    var pts = ['0 0'];
    var steps = 72;   // points along the right edge

    for (var i = 0; i <= steps; i++) {
      var y = (i / steps * 100).toFixed(2);
      // Compound irregular waveform — no two peaks/troughs align
      var x = 91
        + Math.sin(i * 0.72)  * 3.8
        + Math.sin(i * 1.93)  * 2.6
        + Math.cos(i * 3.41)  * 2.0
        + Math.sin(i * 5.17)  * 1.3
        + Math.cos(i * 7.83)  * 0.8;

      // Clamp: never go below 83% (too torn) or above 99% (not torn enough)
      x = Math.max(83, Math.min(99, x));
      pts.push(x.toFixed(2) + '% ' + y + '%');
    }

    pts.push('0 100%');
    return 'polygon(' + pts.join(', ') + ')';
  }

  /* ═══════════════════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════════════════ */

  /** Returns blogs that belong to a category (tag intersection) */
  function getBlogsForCategory(cat, blogs) {
    return blogs.filter(function (b) {
      return b.tags.some(function (t) { return cat.tags.indexOf(t) !== -1; });
    });
  }

  /** Zero-pad number: 1 → "01", 12 → "12" */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ═══════════════════════════════════════════════════
     BUILD INDEX PANEL
  ═══════════════════════════════════════════════════ */
  function buildPanel(categories, blogs) {
    var panel = document.getElementById('indexPanel');
    if (!panel) return;

    // Apply torn edge clip-path
    panel.style.clipPath = buildTornEdgePath();

    var scroll = document.getElementById('indexPanelScroll');
    if (!scroll) return;

    // Header
    var totalPosts = blogs.length;
    scroll.innerHTML =
      '<div class="index-panel-header">' +
        '<div class="index-panel-title">Index</div>' +
        '<div class="index-panel-sub">' + totalPosts + ' post' + (totalPosts !== 1 ? 's' : '') + ' across ' + categories.length + ' categories</div>' +
      '</div>';

    // Category sections
    categories.forEach(function (cat) {
      var catBlogs = getBlogsForCategory(cat, blogs);
      if (catBlogs.length === 0) return;

      var section = document.createElement('div');
      section.className    = 'index-cat-section';
      section.dataset.catId = cat.id;

      // Category header (clicking selects that category in ribbon)
      var header = document.createElement('div');
      header.className = 'index-cat-header';
      header.innerHTML =
        '<span class="index-cat-dot" style="background:' + cat.color + '"></span>' +
        '<span class="index-cat-name">' + cat.label + '</span>' +
        '<span class="index-cat-count">' + catBlogs.length + '</span>';
      header.addEventListener('click', function () {
        selectCategory(cat.id);
      });
      section.appendChild(header);

      // Post list
      var ul = document.createElement('ul');
      ul.className = 'index-post-list';
      catBlogs.forEach(function (blog, idx) {
        var li = document.createElement('li');
        var a  = document.createElement('a');
        a.className = 'index-post-row';
        a.href      = 'blog-post.html?id=' + blog.id;
        a.innerHTML =
          '<span class="index-post-num">' + pad(idx + 1) + '.</span>' +
          '<span class="index-post-title">' + blog.title + '</span>' +
          '<span class="index-post-time">' + blog.readTime.replace(' read', '') + '</span>';
        // Cursor ring expand
        wireHover(a);
        li.appendChild(a);
        ul.appendChild(li);
      });
      section.appendChild(ul);
      scroll.appendChild(section);
    });
  }

  /* ═══════════════════════════════════════════════════
     SELECT CATEGORY  — the central state-change function
     Called by: ribbon chip, panel header, view-all btn,
                "all" chip, pressing Escape
  ═══════════════════════════════════════════════════ */
  var currentCatId = 'all';

  function selectCategory(catId) {
    var CATEGORIES = window.Portfolio.CATEGORIES;
    var BLOGS      = window.Portfolio.BLOGS;
    currentCatId   = catId;

    // ── Update panel sections ──
    document.querySelectorAll('.index-cat-section').forEach(function (sec) {
      sec.classList.toggle('cat-active', sec.dataset.catId === catId);
    });

    // ── Update grid highlight ──
    var grid = document.getElementById('blogGrid');
    if (grid) {
      if (catId === 'all') {
        grid.classList.remove('cat-filtering');
        grid.querySelectorAll('.blog-card').forEach(function (card) {
          card.classList.remove('cat-match');
        });
      } else {
        var cat      = CATEGORIES.find(function (c) { return c.id === catId; });
        var catTags  = cat ? cat.tags : [];
        grid.classList.add('cat-filtering');
        grid.querySelectorAll('.blog-card').forEach(function (card) {
          var blogTags = (card.dataset.tags || '').split(',');
          var matches  = blogTags.some(function (t) { return catTags.indexOf(t) !== -1; });
          card.classList.toggle('cat-match', matches);
        });

        // Smooth-scroll to grid
        var gridSection = document.getElementById('blog-grid-section');
        if (gridSection) {
          gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

  }

  /* ═══════════════════════════════════════════════════
     PANEL OPEN / CLOSE
  ═══════════════════════════════════════════════════ */
  var panelOpen = false;

  function openPanel() {
    panelOpen = true;
    var wrap     = document.getElementById('indexPanelWrap');
    var backdrop = document.getElementById('indexBackdrop');
    var tab      = document.getElementById('indexTab');
    if (wrap)     wrap.classList.add('open');
    if (backdrop) backdrop.classList.add('visible');
    if (tab)      tab.classList.add('panel-open');
  }

  function closePanel() {
    panelOpen = false;
    var wrap     = document.getElementById('indexPanelWrap');
    var backdrop = document.getElementById('indexBackdrop');
    var tab      = document.getElementById('indexTab');
    if (wrap)     wrap.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
    if (tab)      tab.classList.remove('panel-open');
  }

  /* ═══════════════════════════════════════════════════
     CURSOR RING EXPAND helper
  ═══════════════════════════════════════════════════ */
  function wireHover(el) {
    var ring = document.getElementById('curRing');
    if (!ring) return;
    el.addEventListener('mouseenter', function () { ring.classList.add('expand'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('expand'); });
  }

  /* ═══════════════════════════════════════════════════
     MAIN INIT
  ═══════════════════════════════════════════════════ */
  window.Portfolio.initBlogIndex = function () {
    var CATEGORIES = window.Portfolio.CATEGORIES;
    var BLOGS      = window.Portfolio.BLOGS;
    if (!CATEGORIES || !BLOGS) return;

    // Build panel + ribbon
    buildPanel(CATEGORIES, BLOGS);

    // Panel tab toggle
    var tab      = document.getElementById('indexTab');
    var backdrop = document.getElementById('indexBackdrop');

    if (tab) {
      tab.addEventListener('click', function () {
        panelOpen ? closePanel() : openPanel();
      });
      wireHover(tab);
    }

    // Backdrop closes panel
    if (backdrop) {
      backdrop.addEventListener('click', closePanel);
    }

    // Escape key: close panel or flyout
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (panelOpen) { closePanel(); return; }
      if (currentCatId !== 'all') { selectCategory('all'); }
    });

  };

})();
