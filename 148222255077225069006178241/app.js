"use strict";

const timelineEvents = [
  {
    year: "Ancient–1800s",
    title: "Two deep attachments",
    text: "Jewish kingdoms, temples, exile, return, and continuous communities root Jewish identity in the land. Arabic-speaking Muslim and Christian communities developed long local ties of their own under successive empires. Neither people’s connection depends on erasing the other’s.",
    types: ["shared"],
    tags: ["Jewish history", "Palestinian identity"],
    source: "https://www.britannica.com/place/Palestine",
    sourceLabel: "Palestine historical overview"
  },
  {
    year: "Late 1800s",
    title: "Modern national movements",
    text: "Political Zionism grew amid European nationalism, antisemitism, and pogroms, seeking Jewish self-determination and safety. Palestinian Arab identity also developed within wider Arab and local movements as Ottoman rule weakened and immigration increased.",
    types: ["shared"],
    tags: ["Zionism", "Nationalism"],
    source: "https://encyclopedia.ushmm.org/content/en/article/postwar-refugee-crisis-and-the-establishment-of-the-state-of-israel",
    sourceLabel: "USHMM on refugees and Israel"
  },
  {
    year: "1917–1947",
    title: "British Mandate and competing promises",
    text: "Britain endorsed a “national home for the Jewish people” in the Balfour Declaration while saying the rights of existing non-Jewish communities should not be prejudiced. Migration, land purchase, revolt, repression, and intercommunal violence intensified under British rule.",
    types: ["shared", "violence"],
    tags: ["British Mandate", "Balfour Declaration"],
    source: "https://avalon.law.yale.edu/20th_century/balfour.asp",
    sourceLabel: "Balfour Declaration text"
  },
  {
    year: "1947",
    title: "UN partition proposal",
    text: "UN Resolution 181 recommended Jewish and Arab states with an international regime for Jerusalem. The Jewish Agency accepted partition as a basis for statehood. Palestinian Arab leaders and Arab states rejected it as unjust; civil war followed.",
    types: ["shared", "diplomacy"],
    tags: ["UN 181", "Partition"],
    source: "https://www.un.org/unispal/document/auto-insert-185393/",
    sourceLabel: "UN Resolution 181"
  },
  {
    year: "1948–1949",
    title: "Israel, war, and the Nakba",
    text: "Israel declared independence and survived war with neighboring Arab states, expanding beyond the proposed UN borders. About 700,000 Palestinians fled or were expelled; most were not allowed to return. Israel’s founding and the Palestinian Nakba are inseparable histories.",
    types: ["shared", "violence"],
    tags: ["Independence", "Nakba", "Refugees"],
    source: "https://history.state.gov/historicaldocuments/frus1948v05p2",
    sourceLabel: "U.S. diplomatic records"
  },
  {
    year: "1940s–1970s",
    title: "Jewish exodus from Arab and Muslim lands",
    text: "Roughly 800,000–900,000 Jews left or were expelled from Arab and Muslim-majority countries under different combinations of persecution, insecurity, legal pressure, expulsion, and Zionist migration. Most resettled in Israel.",
    types: ["shared"],
    tags: ["Jewish refugees", "Mizrahi Jews"],
    source: "https://www.un.org/unispal/document/auto-insert-207596/",
    sourceLabel: "UN refugee-era record"
  },
  {
    year: "1967",
    title: "War and occupation",
    text: "After regional escalation, Israel launched a preemptive strike and captured the West Bank, East Jerusalem, Gaza, Sinai, and the Golan Heights. Sinai was later returned to Egypt. Military occupation of Palestinian territory and settlement building became central to the conflict.",
    types: ["shared", "violence"],
    tags: ["Six-Day War", "Occupation", "Settlements"],
    source: "https://www.un.org/unispal/document/auto-insert-184858/",
    sourceLabel: "UN Resolution 242"
  },
  {
    year: "1973–1979",
    title: "War opens a path to peace",
    text: "Egypt and Syria attacked to recover territory lost in 1967. The 1973 war eventually led to U.S.-brokered diplomacy, the Camp David Accords, and an Israeli-Egyptian peace treaty based on Israeli withdrawal from Sinai.",
    types: ["violence", "diplomacy"],
    tags: ["Yom Kippur War", "Camp David", "Egypt"],
    source: "https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973",
    sourceLabel: "1973 war history"
  },
  {
    year: "1987–1993",
    title: "First Intifada and Hamas",
    text: "A mass Palestinian uprising challenged occupation. Hamas emerged with an Islamist and eliminationist 1988 charter. The uprising, Israeli repression, and diplomatic shifts helped move Israel and the PLO toward mutual recognition.",
    types: ["violence", "diplomacy"],
    tags: ["First Intifada", "Hamas charter"],
    source: "https://www.britannica.com/topic/intifada",
    sourceLabel: "Intifada overview"
  },
  {
    year: "1993–1995",
    title: "Oslo’s unfinished bargain",
    text: "Israel and the PLO recognized each other and created limited Palestinian self-rule. Oslo deferred borders, Jerusalem, refugees, settlements, and security. It was an interim process, not a completed Palestinian state.",
    types: ["shared", "diplomacy"],
    tags: ["Oslo Accords", "Two states"],
    source: "https://history.state.gov/milestones/1993-2000/oslo",
    sourceLabel: "Oslo records"
  },
  {
    year: "2000–2005",
    title: "Negotiations collapse; violence surges",
    text: "Camp David, the Clinton Parameters, and Taba narrowed some gaps but produced no agreement. The Second Intifada brought suicide bombings and other attacks on Israelis, harsh Israeli military operations, and deep collapse of trust.",
    types: ["violence", "diplomacy"],
    tags: ["Second Intifada", "Peace talks"],
    source: "https://history.state.gov/milestones/1993-2000/oslo",
    sourceLabel: "Oslo process history"
  },
  {
    year: "2005–2007",
    title: "Disengagement, election, blockade",
    text: "Israel withdrew settlements and permanent troops from inside Gaza in 2005 while retaining major external controls. Hamas won Palestinian legislative elections, later seized Gaza from Fatah, and Israel and Egypt imposed severe movement restrictions. Rockets and repeated wars followed.",
    types: ["shared", "violence"],
    tags: ["Gaza", "Blockade", "Hamas"],
    source: "https://www.icrc.org/en/where-we-work/middle-east/israel-and-occupied-territories",
    sourceLabel: "ICRC regional overview"
  },
  {
    year: "2009–2022",
    title: "The conflict hardens",
    text: "Repeated Gaza wars, rocket fire, Israeli strikes, settlement growth, settler violence, Palestinian attacks, political division, and failed diplomacy made a negotiated partition less credible to both publics.",
    types: ["shared", "violence"],
    tags: ["Settlements", "Rockets", "Gaza wars"],
    source: "https://www.ochaopt.org/data/casualties",
    sourceLabel: "OCHA casualty record"
  },
  {
    year: "Oct. 7, 2023",
    title: "Hamas-led attack on Israel",
    text: "Hamas and other armed groups attacked southern Israel, killing about 1,200 people—most civilians—and taking roughly 250 hostages. Rights groups and UN investigators documented murder, hostage-taking, and other crimes; evidence supports findings of sexual violence.",
    types: ["shared", "violence"],
    tags: ["October 7", "Hostages", "War crimes"],
    source: "https://www.hrw.org/report/2024/07/17/i-cant-erase-all-the-blood-from-my-mind/palestinian-armed-groups-october-7",
    sourceLabel: "HRW investigation"
  },
  {
    year: "2023–present",
    title: "Gaza war and humanitarian catastrophe",
    text: "Israel launched a campaign to dismantle Hamas and recover hostages. The war produced mass Palestinian death, injury, displacement, destruction, and deprivation. Hamas’s conduct and embedding in civilian terrain do not remove Israel’s duties under humanitarian law; Israel’s security claims do not make Hamas’s attacks lawful.",
    types: ["shared", "violence"],
    tags: ["Gaza war", "Civilian harm", "International law"],
    source: "https://www.ochaopt.org/publications/snapshots",
    sourceLabel: "OCHA impact snapshots"
  }
];

const searchIndex = [
  {
    terms: "ancient roots Jewish history temples kingdoms indigeneity colonizers",
    type: "History",
    title: "Ancient roots and modern claims",
    summary: "Both peoples have real attachments; ancient connection and present-day rights are not mutually exclusive.",
    href: "#history"
  },
  {
    terms: "zionism antisemitism pogroms holocaust Jewish state self determination",
    type: "Concept",
    title: "Zionism",
    summary: "A diverse Jewish national movement shaped by attachment to the land and the failure of minority safety in Europe.",
    href: "#history"
  },
  {
    terms: "palestinian identity people nation invented nationalism",
    type: "Concept",
    title: "Palestinian peoplehood",
    summary: "A national identity rooted in local communities and sharpened through Mandate rule, displacement, occupation, and exile.",
    href: "#claims"
  },
  {
    terms: "british mandate balfour declaration immigration revolt",
    type: "Timeline",
    title: "The British Mandate",
    summary: "Competing promises, migration, imperial rule, revolt, and mounting intercommunal violence.",
    href: "#history"
  },
  {
    terms: "1947 un partition resolution 181 arab rejection Jewish acceptance",
    type: "Primary source",
    title: "UN partition plan",
    summary: "Resolution 181 recommended Jewish and Arab states and an international Jerusalem.",
    href: "https://www.un.org/unispal/document/auto-insert-185393/",
    external: true
  },
  {
    terms: "1948 nakba refugees expelled fled right return villages",
    type: "History",
    title: "The Nakba and Palestinian refugees",
    summary: "Mass displacement through flight and expulsion, followed by the prevention of most returns.",
    href: "#questions"
  },
  {
    terms: "jewish refugees arab countries mizrahi exodus expelled 800000 900000",
    type: "History",
    title: "Jews from Arab and Muslim-majority countries",
    summary: "Different combinations of persecution, expulsion, fear, legal pressure, and Zionist migration transformed regional Jewish life.",
    href: "#questions"
  },
  {
    terms: "1967 six day war occupation west bank east jerusalem gaza",
    type: "Timeline",
    title: "1967 and the occupation",
    summary: "Territorial conquest put millions of Palestinians under Israeli military control and opened the settlement era.",
    href: "#history"
  },
  {
    terms: "settlements settlers west bank land violence international law 2334",
    type: "Issue",
    title: "Settlements",
    summary: "Settlement growth changes facts on the ground, fragments territory, and is widely regarded internationally as unlawful.",
    href: "https://press.un.org/en/2016/sc12657.doc.htm",
    external: true
  },
  {
    terms: "oslo accords peace process plo rabin arafat mutual recognition",
    type: "Diplomacy",
    title: "Oslo Accords",
    summary: "Mutual recognition and limited self-rule without resolution of the conflict’s hardest final-status questions.",
    href: "https://history.state.gov/milestones/1993-2000/oslo",
    external: true
  },
  {
    terms: "camp david taba clinton parameters peace offer rejected",
    type: "Diplomacy",
    title: "Peace offers and rejections",
    summary: "Real negotiations narrowed gaps, but no single rejected offer explains the conflict’s persistence.",
    href: "#claims"
  },
  {
    terms: "second intifada suicide bombing terrorism checkpoints wall barrier",
    type: "Timeline",
    title: "Second Intifada",
    summary: "Attacks on Israelis and Israeli military responses devastated lives and destroyed faith in the peace process.",
    href: "#history"
  },
  {
    terms: "gaza occupied blockade disengagement 2005 borders airspace maritime",
    type: "FAQ",
    title: "Gaza after disengagement",
    summary: "Israel withdrew permanent ground forces and settlements while retaining forms of control central to the continuing legal dispute.",
    href: "#questions"
  },
  {
    terms: "hamas charter 1988 2017 Israel destroy elimination jihad antisemitism",
    type: "Document",
    title: "Hamas’s stated project",
    summary: "The 2017 document changed some language but did not recognize Israel or commit to permanent two-state coexistence.",
    href: "https://www.wilsoncenter.org/article/doctrine-hamas",
    external: true
  },
  {
    terms: "october 7 massacre civilians 1200 hostages 250 rape sexual violence",
    type: "Investigation",
    title: "October 7 crimes",
    summary: "Independent investigations document deliberate attacks on civilians, hostage-taking, and other grave crimes.",
    href: "#source-oct7"
  },
  {
    terms: "hostages kidnapping captivity exchange release",
    type: "Issue",
    title: "Hostage-taking",
    summary: "Taking hostages is prohibited under international humanitarian law regardless of political cause.",
    href: "#source-oct7"
  },
  {
    terms: "sexual violence rape october 7 evidence un investigation",
    type: "Investigation",
    title: "Sexual and gender-based violence",
    summary: "UN and rights investigators found reasonable grounds or evidence that sexual violence occurred; attribution and individual cases require careful investigation.",
    href: "#source-oct7"
  },
  {
    terms: "gaza death toll casualties health ministry hamas civilians combatants undercount",
    type: "Evidence",
    title: "Reading casualty figures",
    summary: "Use dated, attributed figures and state what the dataset can—and cannot—separate.",
    href: "#source-casualties"
  },
  {
    terms: "human shields tunnels schools hospitals civilian areas hamas",
    type: "Law",
    title: "Human shields and civilian sites",
    summary: "Unlawful military use by one party does not erase the attacking party’s duties to civilians.",
    href: "#claims"
  },
  {
    terms: "distinction proportionality precautions international humanitarian law IHL war crimes",
    type: "Law",
    title: "Rules governing attacks",
    summary: "Military purpose, expected civilian harm, feasible precautions, and target verification all matter.",
    href: "#law"
  },
  {
    terms: "genocide icj south africa israel case ruling",
    type: "Legal proceeding",
    title: "Genocide Convention case",
    summary: "Follow the ICJ docket for orders, filings, and the eventual merits process rather than reducing the case to a slogan.",
    href: "https://www.icj-cij.org/case/192",
    external: true
  },
  {
    terms: "apartheid claim human rights west bank occupation law",
    type: "Legal debate",
    title: "Apartheid allegations",
    summary: "Major rights groups have applied the term; Israel and other scholars dispute the legal and factual analysis.",
    href: "https://www.ohchr.org/en/special-procedures/sr-palestine",
    external: true
  },
  {
    terms: "right return refugees palestinians 194 resolution",
    type: "Final-status issue",
    title: "Palestinian refugees and return",
    summary: "Competing claims about return, compensation, demographic security, and recognition remain unresolved.",
    href: "#questions"
  },
  {
    terms: "two state solution borders Jerusalem security guarantees one state self determination",
    type: "Diplomacy",
    title: "What a settlement would require",
    summary: "Security, sovereignty, borders, Jerusalem, refugees, resources, legitimacy, and credible enforcement.",
    href: "#questions"
  }
];

const timeline = document.querySelector("#timeline");
const filters = document.querySelectorAll(".filter");
const viewButtons = document.querySelectorAll(".view-button");
const perspectiveGrid = document.querySelector(".perspective-grid");
const searchForm = document.querySelector("#topic-search");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const resultsList = document.querySelector("#results-list");
const resultsCount = document.querySelector("#results-count");
const toast = document.querySelector("#toast");

function renderTimeline(filter = "all") {
  const matching = timelineEvents.filter((event) => filter === "all" || event.types.includes(filter));
  timeline.innerHTML = matching.length
    ? matching.map((event) => `
      <article class="timeline-item" data-type="${event.types.join(" ")}">
        <div class="timeline-year">${event.year}</div>
        <div class="timeline-marker" aria-hidden="true"></div>
        <div class="timeline-content">
          <div>
            <h3>${event.title}</h3>
            <div class="timeline-tags">${event.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
          </div>
          <div><p>${event.text}</p>${event.source ? `<a class="timeline-source" href="${event.source}" target="_blank" rel="noopener">Source: ${event.sourceLabel} ↗</a>` : ""}</div>
        </div>
      </article>`).join("")
    : '<p class="timeline-empty">No events match this filter.</p>';
}

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function runSearch(query) {
  const cleanQuery = normalize(query.trim());
  if (!cleanQuery) {
    searchResults.hidden = true;
    resultsList.innerHTML = "";
    return;
  }

  const tokens = cleanQuery.split(/\s+/).filter(Boolean);
  const matches = searchIndex
    .map((item) => {
      const haystack = normalize(`${item.title} ${item.terms} ${item.summary}`);
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, 8);

  resultsCount.textContent = `${matches.length} ${matches.length === 1 ? "result" : "results"} for “${query.trim()}”`;
  resultsList.innerHTML = matches.length
    ? matches.map(({ item }) => `
      <a class="result-item" href="${item.href}"${item.external ? ' target="_blank" rel="noopener"' : ""}>
        <span class="result-type">${item.type}</span>
        <span><strong>${item.title}</strong><p>${item.summary}</p></span>
        <span class="result-arrow" aria-hidden="true">${item.external ? "↗" : "→"}</span>
      </a>`).join("")
    : '<p class="empty-results">No direct match. Try a broader term such as “1948,” “Gaza,” “settlements,” “Hamas,” or “international law.”</p>';
  searchResults.hidden = false;
  searchResults.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderTimeline(button.dataset.filter);
  });
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    viewButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    perspectiveGrid.dataset.view = button.dataset.view;
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(searchInput.value);
});

searchForm.addEventListener("reset", () => {
  window.setTimeout(() => runSearch(""), 0);
});

document.querySelectorAll(".suggestions button").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.textContent;
    runSearch(button.textContent);
  });
});

document.querySelector("#close-results").addEventListener("click", () => {
  searchResults.hidden = true;
  searchInput.focus();
});

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("open", !expanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#copy-link").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.textContent = "Private link copied.";
  } catch {
    toast.textContent = "Copy the URL from your browser’s address bar.";
  }
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
});

renderTimeline();
