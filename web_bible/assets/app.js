// World English Bible reader — client-side app.
// Public-domain WEB text (Rainbow Missions, Inc.), sourced and reformatted
// from https://github.com/TehShrike/world-english-bible

(() => {
  const DATA_DIR = "data/";
  const bookCache = new Map(); // slug -> { name, testament, chapters: [[verse, ...], ...] }
  let manifest = []; // [{slug, name, testament, chapterCount, verseCounts}]
  let manifestBySlug = new Map();

  const els = {
    bookSelect: document.getElementById("book-select"),
    chapterGrid: document.getElementById("chapter-grid"),
    toolbarTitle: document.getElementById("toolbar-title"),
    prevBtn: document.getElementById("prev-chapter"),
    nextBtn: document.getElementById("next-chapter"),
    readerBody: document.getElementById("reader-body"),
    searchForm: document.getElementById("search-form"),
    searchInput: document.getElementById("search-input"),
  };

  let current = { slug: "genesis", chapter: 1, highlightVerse: null };

  function slugTitle(slug) {
    const m = manifestBySlug.get(slug);
    return m ? m.name : slug;
  }

  async function loadManifest() {
    const res = await fetch(DATA_DIR + "books.json");
    manifest = await res.json();
    manifestBySlug = new Map(manifest.map((b) => [b.slug, b]));
  }

  async function loadBook(slug) {
    if (bookCache.has(slug)) return bookCache.get(slug);
    const res = await fetch(`${DATA_DIR}${slug}.json`);
    const data = await res.json();
    bookCache.set(slug, data);
    return data;
  }

  async function loadAllBooks(onProgress) {
    let done = 0;
    const results = await Promise.all(
      manifest.map(async (b) => {
        const data = await loadBook(b.slug);
        done += 1;
        if (onProgress) onProgress(done, manifest.length);
        return [b.slug, data];
      })
    );
    return new Map(results);
  }

  function populateBookSelect() {
    const oldGroup = { Old: document.createElement("optgroup"), New: document.createElement("optgroup") };
    oldGroup.Old.label = "Old Testament";
    oldGroup.New.label = "New Testament";
    for (const b of manifest) {
      const opt = document.createElement("option");
      opt.value = b.slug;
      opt.textContent = b.name;
      oldGroup[b.testament].appendChild(opt);
    }
    els.bookSelect.innerHTML = "";
    els.bookSelect.appendChild(oldGroup.Old);
    els.bookSelect.appendChild(oldGroup.New);
  }

  function populateChapterGrid(slug, activeChapter) {
    const m = manifestBySlug.get(slug);
    els.chapterGrid.innerHTML = "";
    for (let i = 1; i <= m.chapterCount; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = String(i);
      if (i === activeChapter) btn.classList.add("active");
      btn.addEventListener("click", () => navigate(slug, i));
      els.chapterGrid.appendChild(btn);
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  async function renderChapter(slug, chapterNum, highlightVerse) {
    const data = await loadBook(slug);
    const verses = data.chapters[chapterNum - 1] || [];
    const m = manifestBySlug.get(slug);

    els.toolbarTitle.textContent = `${m.name} ${chapterNum}`;
    els.bookSelect.value = slug;
    populateChapterGrid(slug, chapterNum);

    els.prevBtn.disabled = slug === manifest[0].slug && chapterNum === 1 && slug === "genesis" ? true : false;
    const bookIndex = manifest.findIndex((b) => b.slug === slug);
    els.prevBtn.disabled = bookIndex === 0 && chapterNum === 1;
    els.nextBtn.disabled = bookIndex === manifest.length - 1 && chapterNum === m.chapterCount;

    const html = verses
      .map((text, idx) => {
        const vn = idx + 1;
        const isHighlight = highlightVerse && vn === highlightVerse;
        return `<span class="verse${isHighlight ? " highlight" : ""}" id="v${vn}"><sup class="v">${vn}</sup>${escapeHtml(text)} </span>`;
      })
      .join("");

    els.readerBody.innerHTML = `<div class="verse-text">${html}</div>
      <p class="attribution">Text: World English Bible (WEB), a public-domain modern-English translation. Source formatting via
      <a href="https://github.com/TehShrike/world-english-bible" target="_blank" rel="noopener">TehShrike/world-english-bible</a>,
      original text from <a href="https://ebible.org/web/" target="_blank" rel="noopener">ebible.org</a>.</p>`;

    if (highlightVerse) {
      const target = document.getElementById(`v${highlightVerse}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      els.readerBody.scrollIntoView({ behavior: "instant", block: "start" });
    }

    current = { slug, chapter: chapterNum, highlightVerse };
    localStorage.setItem("web-bible-last", JSON.stringify({ slug, chapter: chapterNum }));
    const params = new URLSearchParams();
    params.set("book", slug);
    params.set("chapter", String(chapterNum));
    history.replaceState(null, "", `?${params.toString()}`);
  }

  function navigate(slug, chapterNum, highlightVerse) {
    renderChapter(slug, chapterNum, highlightVerse);
  }

  function goRelative(delta) {
    const bookIndex = manifest.findIndex((b) => b.slug === current.slug);
    const m = manifest[bookIndex];
    let targetChapter = current.chapter + delta;
    let targetBookIndex = bookIndex;
    if (targetChapter < 1) {
      targetBookIndex = bookIndex - 1;
      if (targetBookIndex < 0) return;
      targetChapter = manifest[targetBookIndex].chapterCount;
    } else if (targetChapter > m.chapterCount) {
      targetBookIndex = bookIndex + 1;
      if (targetBookIndex >= manifest.length) return;
      targetChapter = 1;
    }
    navigate(manifest[targetBookIndex].slug, targetChapter);
  }

  function highlightMatch(text, query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${escaped})`, "ig");
    return escapeHtml(text).replace(re, "<mark>$1</mark>");
  }

  async function runSearch(query) {
    query = query.trim();
    if (!query) return;
    els.readerBody.innerHTML = `<p class="loading-note">Searching the full text&hellip;</p>`;

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const allBooks = await loadAllBooks((done, total) => {
      els.readerBody.innerHTML = `<p class="loading-note">Loading text for search&hellip; (${done}/${total})</p>`;
    });

    const results = [];
    for (const b of manifest) {
      const data = allBooks.get(b.slug);
      data.chapters.forEach((verses, cIdx) => {
        verses.forEach((text, vIdx) => {
          const lower = text.toLowerCase();
          if (terms.every((t) => lower.includes(t))) {
            results.push({ slug: b.slug, name: b.name, chapter: cIdx + 1, verse: vIdx + 1, text });
          }
        });
      });
    }

    const MAX = 200;
    const shown = results.slice(0, MAX);
    els.toolbarTitle.textContent = `Search: "${query}"`;

    if (results.length === 0) {
      els.readerBody.innerHTML = `<p class="empty-note">No verses found for "${escapeHtml(query)}".</p>`;
      return;
    }

    const list = shown
      .map(
        (r) => `<a class="result-card" href="?book=${r.slug}&chapter=${r.chapter}&verse=${r.verse}" data-slug="${r.slug}" data-chapter="${r.chapter}" data-verse="${r.verse}">
          <span class="ref">${r.name} ${r.chapter}:${r.verse}</span>
          ${highlightMatch(r.text, terms[0])}
        </a>`
      )
      .join("");

    els.readerBody.innerHTML = `<div class="search-results">
      <p class="result-count">${results.length} verse${results.length === 1 ? "" : "s"} found${results.length > MAX ? ` (showing first ${MAX})` : ""}.</p>
      ${list}
    </div>`;

    els.readerBody.querySelectorAll(".result-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        navigate(el.dataset.slug, Number(el.dataset.chapter), Number(el.dataset.verse));
      });
    });

    const params = new URLSearchParams();
    params.set("q", query);
    history.replaceState(null, "", `?${params.toString()}`);
  }

  function init() {
    els.bookSelect.addEventListener("change", () => navigate(els.bookSelect.value, 1));
    els.prevBtn.addEventListener("click", () => goRelative(-1));
    els.nextBtn.addEventListener("click", () => goRelative(1));
    els.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      runSearch(els.searchInput.value);
    });

    populateBookSelect();

    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      els.searchInput.value = q;
      runSearch(q);
      return;
    }

    const bookParam = params.get("book");
    const chapterParam = Number(params.get("chapter"));
    const verseParam = Number(params.get("verse")) || null;
    if (bookParam && manifestBySlug.has(bookParam)) {
      navigate(bookParam, chapterParam || 1, verseParam);
      return;
    }

    const saved = localStorage.getItem("web-bible-last");
    if (saved) {
      try {
        const { slug, chapter } = JSON.parse(saved);
        if (manifestBySlug.has(slug)) {
          navigate(slug, chapter || 1);
          return;
        }
      } catch (e) { /* ignore */ }
    }

    navigate("genesis", 1);
  }

  loadManifest().then(init);
})();
