window.Portfolio = window.Portfolio || {};

(function () {

  /* ── Fuzzy Search Engine ───────────────────────────────────────── */
  function fuzzyScore(str, query) {
    if (!query) return 100;
    str   = str.toLowerCase();
    query = query.toLowerCase();

    // Exact match
    if (str === query) return 100;
    // Starts with query
    if (str.startsWith(query)) return 90;
    // Contains query as substring
    if (str.includes(query)) return 75;

    // Subsequence match: all query chars appear in str in order
    let si = 0, qi = 0, consecutive = 0, lastMatch = -1;
    while (si < str.length && qi < query.length) {
      if (str[si] === query[qi]) {
        consecutive += (lastMatch === si - 1) ? 1 : 0;
        lastMatch = si;
        qi++;
      }
      si++;
    }
    if (qi === query.length) {
      // Score based on how compact the match is
      const compactness = consecutive / query.length;
      return Math.round(30 + compactness * 35);
    }
    return 0;
  }

  function searchBlogs(blogs, query) {
    if (!query.trim()) return blogs.map(b => ({ blog: b, score: 100 }));
    return blogs
      .map(b => {
        const titleScore   = fuzzyScore(b.title,   query) * 1.4;
        const excerptScore = fuzzyScore(b.excerpt,  query) * 0.8;
        const tagScore     = Math.max(...b.tags.map(t => fuzzyScore(t, query))) * 1.1;
        const score        = Math.max(titleScore, excerptScore, tagScore);
        return { blog: b, score };
      })
      .filter(r => r.score >= 28)
      .sort((a, b) => b.score - a.score);
  }

  /* ── Card Builder ──────────────────────────────────────────────── */
  function buildCard(blog) {
    const a = document.createElement('a');
    a.className    = `blog-card size-${blog.size} rv`;
    a.href         = `blog-post.html?id=${blog.id}`;
    a.dataset.id   = blog.id;
    a.dataset.tags = blog.tags.join(',');

    const tagsHTML = blog.tags
      .map(t => `<span class="card-tag">${t}</span>`)
      .join('');

    a.innerHTML = `
      <div class="card-tags">${tagsHTML}</div>
      <h2 class="card-title">${blog.title}</h2>
      <p class="card-excerpt">${blog.excerpt}</p>
      <div class="card-meta">
        <span class="card-date">${blog.date}</span>
        <span class="card-read">${blog.readTime}</span>
        <span class="card-arr">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
          </svg>
        </span>
      </div>
    `;
    return a;
  }

  /* ── Tag Filter Builder ────────────────────────────────────────── */
  function getAllTags(blogs) {
    const set = new Set();
    blogs.forEach(b => b.tags.forEach(t => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }

  /* ── Main Init ─────────────────────────────────────────────────── */
  window.Portfolio.initBlogListing = function () {
    const BLOGS      = window.Portfolio.BLOGS;
    const grid       = document.getElementById('blogGrid');
    const searchEl   = document.getElementById('blogSearch');
    const statusEl   = document.getElementById('searchStatus');
    const tagBar     = document.getElementById('tagBar');
    const noResults  = document.getElementById('noResults');

    if (!grid || !BLOGS) return;

    let activeTag    = 'All';
    let searchQuery  = '';

    /* Render tag buttons */
    getAllTags(BLOGS).forEach(tag => {
      const btn = document.createElement('button');
      btn.className   = 'tag-btn' + (tag === 'All' ? ' active' : '');
      btn.textContent = tag;
      btn.addEventListener('click', () => {
        activeTag = tag;
        tagBar.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
      tagBar.appendChild(btn);
    });

    /* Render all cards initially */
    BLOGS.forEach(blog => grid.appendChild(buildCard(blog)));

    /* Attach scroll reveal to new cards */
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); }),
      { threshold: 0.06 }
    );
    grid.querySelectorAll('.rv').forEach(el => obs.observe(el));

    /* Cursor expand for new cards */
    grid.querySelectorAll('.blog-card').forEach(el => {
      const ring = document.getElementById('curRing');
      if (!ring) return;
      el.addEventListener('mouseenter', () => ring.classList.add('expand'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
    });

    /* Filter + search logic */
    function applyFilters() {
      const results = searchBlogs(BLOGS, searchQuery);
      const matchIds = new Set(results.map(r => r.blog.id));

      let visibleCount = 0;
      grid.querySelectorAll('.blog-card').forEach(card => {
        const id      = card.dataset.id;
        const tags    = card.dataset.tags.split(',');
        const inSearch = matchIds.has(id);
        const inTag    = activeTag === 'All' || tags.includes(activeTag);

        if (inSearch && inTag) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      /* Status text */
      if (searchQuery.trim()) {
        statusEl.innerHTML = `<span class="match-count">${visibleCount}</span> result${visibleCount !== 1 ? 's' : ''} for "${searchQuery}"`;
      } else {
        statusEl.textContent = '';
      }

      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    /* Search input with debounce */
    let debounceTimer;
    searchEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = searchEl.value;
        applyFilters();
      }, 180);
    });

    /* Clear on Escape */
    searchEl.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchEl.value = '';
        searchQuery    = '';
        applyFilters();
      }
    });
  };

})();
