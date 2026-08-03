(() => {
  "use strict";

  const DATA = window.BOM_DATA;
  const state = {
    activeView: "threads",
    activeThread: DATA.threads[0],
    activeFilter: "All",
    activePair: DATA.chiasm[0],
    scripture: null,
    resizeTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function parseReference(reference) {
    const match = reference.match(/^(.+?)\s+(\d+):(\d+)$/);
    return match ? { book: match[1], chapter: Number(match[2]), verse: Number(match[3]) } : null;
  }

  function normalizeText(raw) {
    return raw
      .replace(/â€”/g, "—")
      .replace(/â€™/g, "’")
      .replace(/â€œ/g, "“")
      .replace(/â€/g, "”")
      .replace(/Ã¦/g, "æ");
  }

  function parseScripture(raw) {
    const singleChapterHeadings = new Map([
      ["THE BOOK OF ENOS", "Enos"],
      ["THE BOOK OF JAROM", "Jarom"],
      ["THE BOOK OF OMNI", "Omni"],
      ["THE WORDS OF MORMON", "Words of Mormon"],
      ["FOURTH NEPHI", "4 Nephi"]
    ]);
    const books = [];
    const chapters = new Map();
    const verses = new Map();
    const verseList = [];
    let currentBook = "";
    let currentChapter = 0;
    let currentVerse = null;
    let scriptureStarted = false;

    for (const sourceLine of normalizeText(raw).split(/\r?\n/)) {
      const line = sourceLine.trim();
      const heading = line.match(/^(.+?) Chapter (\d+)$/);
      if (heading && DATA.books.includes(heading[1])) {
        scriptureStarted = true;
        currentBook = heading[1];
        currentChapter = Number(heading[2]);
        currentVerse = null;
        if (!books.includes(currentBook)) books.push(currentBook);
        const chapterKey = `${currentBook} ${currentChapter}`;
        if (!chapters.has(chapterKey)) chapters.set(chapterKey, []);
        continue;
      }

      if (scriptureStarted && singleChapterHeadings.has(line)) {
        currentBook = singleChapterHeadings.get(line);
        currentChapter = 1;
        currentVerse = null;
        if (!books.includes(currentBook)) books.push(currentBook);
        if (!chapters.has(`${currentBook} 1`)) chapters.set(`${currentBook} 1`, []);
        continue;
      }

      const verseLine = currentBook && line.startsWith(`${currentBook} `)
        ? line.slice(currentBook.length + 1)
        : line;
      const verseStart = verseLine.match(/^(\d+):(\d+)\s+(.+)$/);
      if (currentBook && verseStart && Number(verseStart[1]) === currentChapter) {
        const reference = `${currentBook} ${currentChapter}:${Number(verseStart[2])}`;
        currentVerse = { reference, book: currentBook, chapter: currentChapter, verse: Number(verseStart[2]), text: verseStart[3] };
        chapters.get(`${currentBook} ${currentChapter}`).push(currentVerse);
        verses.set(reference, currentVerse);
        verseList.push(currentVerse);
      } else if (currentVerse && line) {
        currentVerse.text += ` ${line}`;
      }
    }

    return { books, chapters, verses, verseList };
  }

  async function loadScripture() {
    try {
      const response = await fetch("./book-of-mormon.txt");
      if (!response.ok) throw new Error(`Text request failed with ${response.status}`);
      state.scripture = parseScripture(await response.text());
      updateStats();
      populateReaderControls();
      renderReaderChapter("1 Nephi", 1);
      renderThread(state.activeThread);
      renderPair(state.activePair);
    } catch (error) {
      $("#scripture-reader").innerHTML = `<div class="reader-error"><strong>The text could not be loaded.</strong><p>${escapeHtml(error.message)}</p></div>`;
      $$("#origin-text, #return-text, #pair-verses").forEach((node) => {
        node.textContent = "Open this page through a web server to load the complete public-domain text.";
      });
    }
  }

  function getVerse(reference) {
    return state.scripture?.verses.get(reference);
  }

  function verseText(reference) {
    return getVerse(reference)?.text || "Loading the full verse…";
  }

  function switchView(view, shouldScroll = true) {
    state.activeView = view;
    $$(".nav-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
    $$("[data-view-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.viewPanel === view));
    if (shouldScroll) {
      const target = document.querySelector(`[data-view-panel="${view}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderFilters() {
    const categories = ["All", ...new Set(DATA.threads.map((thread) => thread.category))];
    $("#thread-filters").innerHTML = categories.map((category) => `
      <button type="button" class="filter-button${category === state.activeFilter ? " is-active" : ""}" data-filter="${escapeHtml(category)}">
        ${escapeHtml(category)}
      </button>`).join("");
  }

  function renderThreadList() {
    const visible = DATA.threads.filter((thread) => state.activeFilter === "All" || thread.category === state.activeFilter);
    $("#thread-list").innerHTML = visible.map((thread, index) => `
      <button type="button" class="thread-item${thread.id === state.activeThread.id ? " is-active" : ""}" data-thread="${thread.id}">
        <span class="thread-number">${String(index + 1).padStart(2, "0")}</span>
        <span><small>${escapeHtml(thread.category)}</small><strong>${escapeHtml(thread.title)}</strong><em>${escapeHtml(thread.start)} → ${escapeHtml(thread.end)}</em></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
      </button>`).join("");
  }

  function renderThread(thread) {
    state.activeThread = thread;
    renderThreadList();
    $("#thread-category").textContent = thread.category;
    $("#thread-distance").textContent = thread.distance;
    $("#thread-title").textContent = thread.title;
    $("#thread-summary").textContent = thread.summary;
    $("#origin-ref").textContent = thread.start;
    $("#origin-ref").dataset.reference = thread.start;
    $("#return-ref").textContent = thread.end;
    $("#return-ref").dataset.reference = thread.end;
    $("#origin-text").textContent = verseText(thread.start);
    $("#return-text").textContent = verseText(thread.end);
    $("#distance-count").textContent = thread.distance;
    $("#thread-note").textContent = thread.note;
    requestAnimationFrame(drawConnection);
  }

  function drawConnection() {
    const canvas = $("#connection-canvas");
    const svg = $("#connection-svg");
    const start = $("#origin-dot");
    const end = $("#return-dot");
    if (!canvas || !svg || !start || !end || state.activeView !== "threads") return;

    const bounds = canvas.getBoundingClientRect();
    const a = start.getBoundingClientRect();
    const b = end.getBoundingClientRect();
    const x1 = a.left + a.width / 2 - bounds.left;
    const y1 = a.top + a.height / 2 - bounds.top;
    const x2 = b.left + b.width / 2 - bounds.left;
    const y2 = b.top + b.height / 2 - bounds.top;
    const vertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    const bend = vertical ? Math.max(70, Math.abs(y2 - y1) * 0.4) : Math.max(90, Math.abs(x2 - x1) * 0.38);
    const path = vertical
      ? `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 + bend} ${y2}, ${x2} ${y2}`
      : `M ${x1} ${y1} C ${x1 + bend} ${y1 - 42}, ${x2 - bend} ${y2 - 42}, ${x2} ${y2}`;

    svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    svg.setAttribute("width", bounds.width);
    svg.setAttribute("height", bounds.height);
    ["#connection-shadow", "#connection-path"].forEach((selector) => $(selector).setAttribute("d", path));
    const animated = $("#connection-path");
    animated.classList.remove("is-drawing");
    void animated.getBoundingClientRect();
    animated.classList.add("is-drawing");
  }

  function renderChiasm() {
    const rows = [];
    for (const pair of DATA.chiasm.slice(0, -1)) {
      rows.push(`
        <button class="chiasm-row tone-${pair.tone}${pair.key === state.activePair.key ? " is-active" : ""}" type="button" data-pair="${pair.key}" style="--depth:${pair.key.charCodeAt(0) - 64}">
          <span class="chiasm-side left"><b>${pair.key}</b><span><small>${escapeHtml(pair.left)}</small>${escapeHtml(pair.theme)}</span></span>
          <i></i>
          <span class="chiasm-side right"><span><small>${escapeHtml(pair.right)}</small>${escapeHtml(pair.theme)}</span><b>${pair.key}′</b></span>
        </button>`);
    }
    const center = DATA.chiasm.at(-1);
    rows.push(`
      <button class="chiasm-center tone-${center.tone}${center.key === state.activePair.key ? " is-active" : ""}" type="button" data-pair="${center.key}">
        <b>${center.key}</b>
        <span><small>${escapeHtml(center.center)}</small>${escapeHtml(center.theme)}</span>
      </button>`);
    $("#chiasm-stack").innerHTML = rows.join("");
  }

  function renderPair(pair) {
    state.activePair = pair;
    renderChiasm();
    $("#pair-letter").textContent = pair.key;
    $("#pair-letter").className = `pair-letter tone-${pair.tone}`;
    $("#pair-theme").textContent = pair.theme;
    const references = pair.center ? [pair.center] : [pair.left, pair.right];
    $("#pair-verses").innerHTML = references.map((reference) => `
      <blockquote>
        <button class="reference-link" type="button" data-reference="${escapeHtml(reference)}">${escapeHtml(reference)}</button>
        <p>${escapeHtml(verseText(reference))}</p>
      </blockquote>`).join("");
  }

  function updateStats() {
    $("#stat-books").textContent = state.scripture.books.length.toLocaleString();
    $("#stat-chapters").textContent = state.scripture.chapters.size.toLocaleString();
    $("#stat-verses").textContent = state.scripture.verseList.length.toLocaleString();
  }

  function populateReaderControls(book = "1 Nephi", chapter = 1) {
    $("#book-select").innerHTML = state.scripture.books.map((name) =>
      `<option value="${escapeHtml(name)}"${name === book ? " selected" : ""}>${escapeHtml(name)}</option>`
    ).join("");
    populateChapterSelect(book, chapter);
  }

  function populateChapterSelect(book, selected = 1) {
    const chapterNumbers = [...state.scripture.chapters.keys()]
      .filter((key) => key.startsWith(`${book} `))
      .map((key) => Number(key.slice(book.length + 1)));
    $("#chapter-select").innerHTML = chapterNumbers.map((chapter) =>
      `<option value="${chapter}"${chapter === selected ? " selected" : ""}>${chapter}</option>`
    ).join("");
  }

  function highlightText(text, query) {
    if (!query) return escapeHtml(text);
    const terms = query.trim().split(/\s+/).filter((term) => term.length > 1).map((term) =>
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    if (!terms.length) return escapeHtml(text);
    const regex = new RegExp(`(${terms.join("|")})`, "gi");
    return escapeHtml(text).replace(regex, "<mark>$1</mark>");
  }

  function renderVerseList(title, verses, query = "") {
    $("#reader-status").textContent = query
      ? `${verses.length.toLocaleString()} matching verse${verses.length === 1 ? "" : "s"}`
      : `${verses.length} verses`;
    $("#scripture-reader").innerHTML = `
      <header><p>The Book of Mormon</p><h3>${escapeHtml(title)}</h3></header>
      <div class="verse-list">
        ${verses.length ? verses.map((verse) => `
          <p class="reader-verse" id="verse-${verse.reference.replaceAll(" ", "-").replace(":", "-")}">
            <button type="button" data-reference="${escapeHtml(verse.reference)}">${escapeHtml(verse.reference)}</button>
            <span>${highlightText(verse.text, query)}</span>
          </p>`).join("") : `<div class="no-results"><strong>No matching verses</strong><p>Try fewer or different words.</p></div>`}
      </div>`;
  }

  function renderReaderChapter(book, chapter, focusVerse = null) {
    const verses = state.scripture.chapters.get(`${book} ${chapter}`) || [];
    $("#reader-search").value = "";
    $("#book-select").value = book;
    populateChapterSelect(book, chapter);
    $("#chapter-select").value = String(chapter);
    renderVerseList(`${book} ${chapter}`, verses);
    if (focusVerse) {
      requestAnimationFrame(() => {
        const target = $(`#verse-${CSS.escape(`${book}-${chapter}-${focusVerse}`)}`);
        target?.classList.add("is-highlighted");
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  function searchReader(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      renderReaderChapter($("#book-select").value, Number($("#chapter-select").value));
      return;
    }
    const direct = parseReference(query.trim());
    if (direct && getVerse(query.trim())) {
      renderReaderChapter(direct.book, direct.chapter, direct.verse);
      return;
    }
    const terms = normalized.split(/\s+/).filter(Boolean);
    const matches = state.scripture.verseList
      .filter((verse) => terms.every((term) => `${verse.reference} ${verse.text}`.toLowerCase().includes(term)))
      .slice(0, 200);
    renderVerseList(`Search: “${query.trim()}”`, matches, query);
  }

  function openReference(reference) {
    const parsed = parseReference(reference);
    if (!parsed || !state.scripture) return;
    switchView("reader");
    renderReaderChapter(parsed.book, parsed.chapter, parsed.verse);
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const nav = event.target.closest("[data-view]");
      if (nav) switchView(nav.dataset.view);

      const switcher = event.target.closest("[data-switch]");
      if (switcher) switchView(switcher.dataset.switch);

      const jump = event.target.closest("[data-jump]");
      if (jump) $(`#${CSS.escape(jump.dataset.jump)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

      const filter = event.target.closest("[data-filter]");
      if (filter) {
        state.activeFilter = filter.dataset.filter;
        const currentVisible = DATA.threads.filter((thread) => state.activeFilter === "All" || thread.category === state.activeFilter);
        if (!currentVisible.includes(state.activeThread)) state.activeThread = currentVisible[0];
        renderFilters();
        renderThread(state.activeThread);
      }

      const threadButton = event.target.closest("[data-thread]");
      if (threadButton) renderThread(DATA.threads.find((thread) => thread.id === threadButton.dataset.thread));

      const pairButton = event.target.closest("[data-pair]");
      if (pairButton) renderPair(DATA.chiasm.find((pair) => pair.key === pairButton.dataset.pair));

      const referenceButton = event.target.closest("[data-reference]");
      if (referenceButton) openReference(referenceButton.dataset.reference);
    });

    $("#theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      drawConnection();
    });

    $("#book-select").addEventListener("change", (event) => {
      populateChapterSelect(event.target.value, 1);
      renderReaderChapter(event.target.value, 1);
    });
    $("#chapter-select").addEventListener("change", () => {
      renderReaderChapter($("#book-select").value, Number($("#chapter-select").value));
    });
    $("#reader-search").addEventListener("input", (event) => {
      clearTimeout(event.target.searchTimer);
      event.target.searchTimer = setTimeout(() => searchReader(event.target.value), 180);
    });

    window.addEventListener("resize", () => {
      clearTimeout(state.resizeTimer);
      state.resizeTimer = setTimeout(drawConnection, 100);
    });
  }

  renderFilters();
  renderThreadList();
  renderThread(state.activeThread);
  renderPair(state.activePair);
  bindEvents();
  loadScripture();
})();
