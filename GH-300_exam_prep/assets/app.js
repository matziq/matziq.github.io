/* ============================================================
   GH-300 Exam Prep  |  shared app script
   Everything on the site is calculated from one number: the
   exam date the user picks. Change it and the countdown, the
   study plan length, every day's date, and the practice-exam
   schedule all recompute.
   ============================================================ */
(function (global) {
    "use strict";

    var GH3 = global.GH3 = global.GH3 || {};

    /* ---------- core facts about the exam ---------- */
    GH3.EXAM_CODE = "GH-300";
    GH3.EXAM_NAME = "GitHub Copilot";
    GH3.VENDOR = "Microsoft";
    GH3.DELIVERED_BY = "Pearson VUE";
    GH3.PASS_SCORE = 700;
    GH3.SCALE_MIN = 1;
    GH3.SCALE_MAX = 1000;
    GH3.EXAM_MINUTES = 100;
    GH3.SEAT_MINUTES = 120;
    /* Microsoft does not publish a question count for GH-300, so the site never
       claims one. These two numbers describe this site's practice exams only. */
    GH3.PRACTICE_QUESTIONS = 60;
    GH3.PRACTICE_MINUTES = 100;
    GH3.SKILLS_DATE = "August 7, 2026";

    /* The six skill areas, worded exactly as Microsoft words them, with the
       published weight ranges and the question counts this site uses on a
       60-question practice exam. Every count lands inside its published range.

       Note: Microsoft's own "skills at a glance" list shows seven bullets
       because "Use GitHub Copilot features" is printed twice. There are six
       domains; the duplicate is a documentation error on their side. */
    GH3.DOMAINS = [
        { id: "responsibly", num: "1", short: "Responsible Use",
          name: "Use GitHub Copilot responsibly",
          full: "Use GitHub Copilot responsibly",
          weight: "15\u201320%", pct: 18, q: 11, page: "responsible.html", cls: "teal" },
        { id: "features", num: "2", short: "Copilot Features",
          name: "Use GitHub Copilot features",
          full: "Use GitHub Copilot features",
          weight: "25\u201330%", pct: 28, q: 17, page: "features-ide.html", cls: "bad" },
        { id: "architecture", num: "3", short: "Data & Architecture",
          name: "Understand GitHub Copilot data and architecture",
          full: "Understand GitHub Copilot data and architecture",
          weight: "10\u201315%", pct: 13, q: 8, page: "data-architecture.html", cls: "amber" },
        { id: "prompting", num: "4", short: "Prompt Engineering",
          name: "Apply prompt engineering and context crafting",
          full: "Apply prompt engineering and context crafting",
          weight: "10\u201315%", pct: 13, q: 8, page: "prompting.html", cls: "good" },
        { id: "productivity", num: "5", short: "Productivity",
          name: "Improve developer productivity with GitHub Copilot",
          full: "Improve developer productivity with GitHub Copilot",
          weight: "10\u201315%", pct: 13, q: 8, page: "productivity.html", cls: "teal" },
        { id: "privacy", num: "6", short: "Privacy & Safeguards",
          name: "Configure privacy, content exclusions, and safeguards",
          full: "Configure privacy, content exclusions, and safeguards",
          weight: "10\u201315%", pct: 13, q: 8, page: "privacy.html", cls: "" }
    ];

    /* The sub-areas inside each skill area. These are what the site tags
       questions with, because "28% of the exam" is too coarse to study from.
       Counts sum to 60 per practice exam. */
    GH3.TOPICS = [
        { id: "principles", name: "Responsible AI Principles", domain: "responsibly",
          obj: ["1.1"], q: 6, weight: "15\u201320%", page: "responsible.html", cls: "teal" },
        { id: "validate", name: "Validating AI Output", domain: "responsibly",
          obj: ["1.2"], q: 5, weight: "15\u201320%", page: "responsible.html", cls: "teal" },
        { id: "ide", name: "Copilot in the IDE", domain: "features",
          obj: ["2.1"], q: 5, weight: "25\u201330%", page: "features-ide.html", cls: "bad" },
        { id: "cli", name: "Copilot CLI", domain: "features",
          obj: ["2.2"], q: 4, weight: "25\u201330%", page: "features-ide.html", cls: "bad" },
        { id: "capabilities", name: "Copilot Features and Capabilities", domain: "features",
          obj: ["2.3"], q: 5, weight: "25\u201330%", page: "features-platform.html", cls: "bad" },
        { id: "orgpolicy", name: "Organization Settings and Policies", domain: "features",
          obj: ["2.4"], q: 3, weight: "25\u201330%", page: "features-platform.html", cls: "bad" },
        { id: "dataflow", name: "Data Handling and Flow", domain: "architecture",
          obj: ["3.1"], q: 5, weight: "10\u201315%", page: "data-architecture.html", cls: "amber" },
        { id: "lifecycle", name: "Lifecycle and Limitations", domain: "architecture",
          obj: ["3.2"], q: 3, weight: "10\u201315%", page: "data-architecture.html", cls: "amber" },
        { id: "crafting", name: "Crafting Effective Prompts", domain: "prompting",
          obj: ["4.1"], q: 4, weight: "10\u201315%", page: "prompting.html", cls: "good" },
        { id: "performance", name: "Prompt Engineering for Performance", domain: "prompting",
          obj: ["4.2"], q: 4, weight: "10\u201315%", page: "prompting.html", cls: "good" },
        { id: "quality", name: "Productivity and Code Quality", domain: "productivity",
          obj: ["5.1"], q: 4, weight: "10\u201315%", page: "productivity.html", cls: "teal" },
        { id: "testing", name: "Testing and Security", domain: "productivity",
          obj: ["5.2"], q: 4, weight: "10\u201315%", page: "productivity.html", cls: "teal" },
        { id: "exclusions", name: "Privacy Settings and Exclusions", domain: "privacy",
          obj: ["6.1"], q: 4, weight: "10\u201315%", page: "privacy.html", cls: "" },
        { id: "safeguards", name: "Safeguards and Troubleshooting", domain: "privacy",
          obj: ["6.2"], q: 4, weight: "10\u201315%", page: "privacy.html", cls: "" }
    ];

    GH3.topicByName = function (name) {
        for (var i = 0; i < GH3.TOPICS.length; i++) {
            if (GH3.TOPICS[i].name === name) return GH3.TOPICS[i];
        }
        return null;
    };

    GH3.domainById = function (id) {
        for (var i = 0; i < GH3.DOMAINS.length; i++) {
            if (GH3.DOMAINS[i].id === id) return GH3.DOMAINS[i];
        }
        return null;
    };

    /* The objective codes used to tag every question on the site. */
    GH3.OBJECTIVES = {
        "1.1": "Understand responsible AI principles",
        "1.2": "Validate and operate AI tools",
        "2.1": "Use GitHub Copilot in the IDE",
        "2.2": "Use GitHub Copilot CLI",
        "2.3": "Use GitHub Copilot features and capabilities",
        "2.4": "Manage organization-wide settings and policies",
        "3.1": "Describe data handling and flow",
        "3.2": "Understand lifecycle and limitations",
        "4.1": "Craft effective prompts",
        "4.2": "Engineer prompts for performance",
        "5.1": "Enhance productivity and code quality",
        "5.2": "Support testing and security",
        "6.1": "Manage privacy settings and exclusions",
        "6.2": "Apply safeguards and troubleshoot"
    };

    /* ---------- raw percent -> scaled score ----------
       Microsoft reports GH-300 on a 1-1000 scale and passes at 700, but has
       never published the raw-to-scaled conversion, and the live exam weights
       questions by difficulty. This curve is anchored on the two public facts:
       the range and the 700 pass mark, with 70% correct landing exactly on 700.
       Treat the output as a readiness signal, not an official score.        */
    var CURVE = [
        [0, 100], [10, 180], [20, 260], [30, 340], [40, 420], [50, 500],
        [60, 600], [65, 650], [70, 700], [75, 750], [80, 800],
        [85, 850], [90, 900], [95, 950], [100, 1000]
    ];

    GH3.PASS_PCT = 70;

    GH3.pctToScaled = function (pct) {
        var p = Math.max(0, Math.min(100, pct));
        for (var i = 1; i < CURVE.length; i++) {
            if (p <= CURVE[i][0]) {
                var lo = CURVE[i - 1], hi = CURVE[i];
                var span = hi[0] - lo[0];
                var t = span === 0 ? 0 : (p - lo[0]) / span;
                return Math.round(lo[1] + t * (hi[1] - lo[1]));
            }
        }
        return GH3.SCALE_MAX;
    };

    GH3.rawToScaled = function (right, total) {
        if (!total) return GH3.SCALE_MIN;
        return GH3.pctToScaled((right / total) * 100);
    };

    GH3.passMark = function () { return GH3.PASS_SCORE; };
    GH3.passPct = function () { return GH3.PASS_PCT; };
    GH3.correctNeeded = function (total) {
        return Math.ceil(total * GH3.PASS_PCT / 100);
    };

    GH3.verdict = function (scaled) {
        if (scaled >= 800) return { label: "Comfortably passing", cls: "good" };
        if (scaled >= GH3.PASS_SCORE) return { label: "Passing", cls: "good" };
        if (scaled >= 620) return { label: "Just short", cls: "amber" };
        return { label: "Not there yet", cls: "bad" };
    };

    /* ---------- storage ---------- */
    var PREFIX = "gh300:";
    GH3.store = {
        get: function (key, fallback) {
            try {
                var v = global.localStorage.getItem(PREFIX + key);
                return v === null ? fallback : JSON.parse(v);
            } catch (e) { return fallback; }
        },
        set: function (key, value) {
            try { global.localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
            catch (e) { return false; }
        },
        remove: function (key) {
            try { global.localStorage.removeItem(PREFIX + key); } catch (e) { /* ignore */ }
        },
        keys: function () {
            var out = [];
            try {
                for (var i = 0; i < global.localStorage.length; i++) {
                    var k = global.localStorage.key(i);
                    if (k && k.indexOf(PREFIX) === 0) out.push(k.slice(PREFIX.length));
                }
            } catch (e) { /* ignore */ }
            return out;
        }
    };

    /* ============================================================
       DATES  --  the single source of truth for the whole site
       ============================================================ */
    var DAY_MS = 86400000;
    var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var MONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var MONS_LONG = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

    GH3.DEFAULT_LEAD_DAYS = 21;   // used when nothing has been chosen yet
    GH3.MAX_PLAN_DAYS = 45;       // longest plan the generator will build
    GH3.today = function () { return startOfDay(new Date()); };

    GH3.parseISO = function (s) {
        if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return null;
        var p = String(s).split("-");
        var d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
        return isNaN(d.getTime()) ? null : d;
    };

    GH3.toISO = function (d) {
        function pad(n) { return (n < 10 ? "0" : "") + n; }
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    };

    /* The stored value, or null if the user has not chosen one yet. */
    GH3.storedExamISO = function () {
        var v = GH3.store.get("examDate", null);
        return GH3.parseISO(v) ? v : null;
    };

    GH3.hasExamDate = function () { return !!GH3.storedExamISO(); };

    /* Always returns a usable date. Falls back to a default so that every
       page renders sensibly before the user has picked anything. */
    GH3.examDate = function () {
        var iso = GH3.storedExamISO();
        if (iso) return GH3.parseISO(iso);
        var d = GH3.today();
        d.setDate(d.getDate() + GH3.DEFAULT_LEAD_DAYS);
        return d;
    };

    GH3.examISO = function () { return GH3.toISO(GH3.examDate()); };

    GH3.setExamDate = function (iso) {
        var d = GH3.parseISO(iso);
        if (!d) return false;
        GH3.store.set("examDate", GH3.toISO(d));
        planCache = null;
        return true;
    };

    GH3.clearExamDate = function () {
        GH3.store.remove("examDate");
        planCache = null;
    };

    /* Whole days between today and exam day. 0 means the exam is today. */
    GH3.daysLeft = function () {
        return Math.max(0, Math.round((startOfDay(GH3.examDate()) - GH3.today()) / DAY_MS));
    };

    GH3.isPast = function () {
        return (startOfDay(GH3.examDate()) - GH3.today()) < 0;
    };

    /* Study days available: today through the day before the exam. */
    GH3.studyDaysAvailable = function () { return Math.max(1, GH3.daysLeft()); };

    /* Plan length, capped so a very distant exam does not produce a
       200-day wall of tasks. */
    GH3.planLength = function () {
        return Math.min(GH3.MAX_PLAN_DAYS, GH3.studyDaysAvailable());
    };

    /* The plan always ends the day before the exam. */
    GH3.planStart = function () {
        var d = startOfDay(GH3.examDate());
        d.setDate(d.getDate() - GH3.planLength());
        return d;
    };

    /* Days of runway before the plan begins, when the exam is far out. */
    GH3.runwayDays = function () {
        return Math.max(0, GH3.studyDaysAvailable() - GH3.planLength());
    };

    GH3.currentPlanDay = function () {
        return Math.round((GH3.today() - GH3.planStart()) / DAY_MS) + 1;
    };

    GH3.dateForDay = function (n) {
        var d = new Date(GH3.planStart().getTime());
        d.setDate(d.getDate() + (n - 1));
        return d;
    };

    GH3.fmtDate = function (d) { return DAYS[d.getDay()] + ", " + MONS[d.getMonth()] + " " + d.getDate(); };
    GH3.fmtShort = function (d) { return MONS[d.getMonth()] + " " + d.getDate(); };
    GH3.fmtLong = function (d) {
        return DAYS[d.getDay()] + ", " + MONS_LONG[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    };
    GH3.dayName = function (d) { return DAYS[d.getDay()]; };

    GH3.fmtClock = function (totalSeconds) {
        var s = Math.max(0, Math.round(totalSeconds));
        var m = Math.floor(s / 60);
        var r = s % 60;
        return m + ":" + (r < 10 ? "0" : "") + r;
    };

    /* ============================================================
       THE STUDY PLAN GENERATOR
       A fixed library of study blocks is stretched or compressed to
       fit however many days the chosen exam date leaves.
       ============================================================ */

    /* tag: exam | review | study | drill | cards | lab | logistics */
    var HEAD = [
        { id: "orient", focus: "Learn the exam before you learn the content", min: 45, tasks: [
            { tag: "study", pri: 1, text: "Read the home page: the six domains, how they are weighted, and the one fact that trips up more candidates than any other \u2014 <strong>700 is a scaled score, not 70% correct</strong>. Ten minutes here changes how you read every question after it.", href: "index.html" },
            { tag: "logistics", pri: 2, text: "Confirm your booking. GH-300 is a <strong>Microsoft</strong> certification delivered by <strong>Pearson VUE</strong> \u2014 not a GitHub or PSI exam anymore. If you are testing online, run the system check <em>today</em>, not the night before.", href: "" },
            { tag: "lab", pri: 1, text: "Open VS Code with GitHub Copilot enabled and confirm you can reach Ask, Edit, and Agent mode. Domain 2 is the largest on the exam and it is about features you should be touching, not reading about.", href: "features-ide.html#modes" }
        ]},
        { id: "baseline", focus: "Practice Exam 1, cold", min: 100, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 1</strong> \u2014 60 questions, 100 minutes, timed, phone in another room. Take it <em>before</em> you read a single guide.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Write down your scaled score and all six domain percentages. That table is the map for the rest of the plan.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 2, text: "Do <em>not</em> review it today. Close the laptop. You will see twice as much tomorrow morning.", href: "" }
        ]},
        { id: "repair1", focus: "Review Exam 1 and start the error log", min: 75, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every missed question from Exam 1, and read the explanation on the ones you guessed right too. A lucky guess is not knowledge.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Log every miss and tag its cause: never knew the fact, knew it and read past it, or misread the question. Three causes, three different fixes.", href: "tools.html#errorlog" },
            { tag: "logistics", pri: 2, text: "Write your two weakest domains at the top of the error log. The next few days are built around them.", href: "tools.html#errorlog" }
        ]}
    ];

    var MID = [
        { id: "m-principles", focus: "Responsible AI \u2014 the principles behind the questions", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the Responsible Use guide through the principles section. Microsoft names six \u2014 fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability \u2014 and the exam gives you a scenario and asks which one applies.", href: "responsible.html" },
            { tag: "drill", pri: 1, text: "Drill: Responsible AI Principles", href: "drills.html?set=d1-principles" },
            { tag: "cards", pri: 2, text: "Flashcards: the Responsible Use deck. These are free points and people still lose them.", href: "tools.html#flashcards" }
        ]},
        { id: "m-limitations", focus: "What Copilot cannot do \u2014 the four limitation categories", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the limitations section. Four named categories: code quality and correctness, language and framework specificity, dependency on training data, and complex problem solving. Learn the category names, not just the idea.", href: "responsible.html#limitations" },
            { tag: "drill", pri: 1, text: "Drill: Limitations and Risks", href: "drills.html?set=d1-limitations" },
            { tag: "lab", pri: 2, text: "Ask Copilot for something in a niche framework you know well. Note exactly where it goes wrong. That is the &ldquo;language and framework specificity&rdquo; limitation in one experiment.", href: "" }
        ]},
        { id: "m-bias", focus: "Bias, fairness, and mitigation", min: 60, tasks: [
            { tag: "study", pri: 1, text: "Read the bias and fairness section: where bias enters through training data, what it looks like in generated code, and the mitigations you are expected to name.", href: "responsible.html#bias" },
            { tag: "drill", pri: 1, text: "Drill: Bias, Fairness, and Mitigation", href: "drills.html?set=d1-bias" },
            { tag: "cards", pri: 2, text: "Flashcards: the rest of the Responsible Use deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-verification", focus: "Human oversight \u2014 validating what Copilot gives you", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the verification section. The exam rewards the answer that keeps a human accountable: review, test, scan. Never the answer that trusts output because it compiled.", href: "responsible.html#verification" },
            { tag: "drill", pri: 1, text: "Drill: Verification and Human Oversight", href: "drills.html?set=d1-verification" },
            { tag: "lab", pri: 2, text: "Take a Copilot suggestion of twenty lines or more and review it as if it came from a stranger in a pull request. Write down what you would have missed on a fast read.", href: "" }
        ]},
        { id: "m-completions", focus: "Code completions and next edit suggestions", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the IDE guide through completions: inline suggestions, next edit suggestions, and the <strong>Fill-in-the-Middle</strong> technique that lets Copilot use code on <em>both</em> sides of your cursor.", href: "features-ide.html" },
            { tag: "drill", pri: 1, text: "Drill: Completions and Next Edit Suggestions", href: "drills.html?set=d2-completions" },
            { tag: "cards", pri: 2, text: "Flashcards: the Copilot in the IDE deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-modes", focus: "Ask, Edit, and Agent mode \u2014 the distinction the exam loves", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the modes section carefully. Ask answers, Edit changes files you scope, Agent decides the scope itself and can run tools. Note that <strong>Copilot Edits was renamed Edit mode</strong> \u2014 the study guide still uses the old name, so learn both.", href: "features-ide.html#modes" },
            { tag: "drill", pri: 1, text: "Drill: Ask, Edit, and Agent Mode", href: "drills.html?set=d2-modes" },
            { tag: "lab", pri: 1, text: "Run the same small refactor three times \u2014 once in each mode. Nothing on this page teaches the difference as fast as doing it once.", href: "features-ide.html#modes" }
        ]},
        { id: "m-chat", focus: "Chat everywhere \u2014 IDE, GitHub.com, mobile, and the CLI", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the chat section: slash commands, chat participants, and chat variables in the IDE, plus what changes when you use Copilot on GitHub.com, on mobile, or in the <strong>GitHub Copilot CLI</strong> \u2014 which is now standalone, not a <code>gh</code> extension.", href: "features-ide.html#chat" },
            { tag: "drill", pri: 1, text: "Drill: Chat Interfaces and Commands", href: "drills.html?set=d2-chat" },
            { tag: "lab", pri: 2, text: "Install the GitHub Copilot CLI and ask it to explain a command you half know. Note that this surface retains prompts for 28 days, unlike editor completions.", href: "data-architecture.html#retention" }
        ]},
        { id: "m-cloud-agent", focus: "The Copilot cloud agent and code review", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the platform guide through the agent section. <strong>Copilot coding agent was renamed Copilot cloud agent</strong> in April 2026. Know what it does end to end: assigned an issue, works in its own environment, opens a pull request.", href: "features-platform.html" },
            { tag: "drill", pri: 1, text: "Drill: Cloud Agent and Code Review", href: "drills.html?set=d2-cloud-agent" },
            { tag: "cards", pri: 2, text: "Flashcards: the Copilot on the Platform deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-platform", focus: "Platform features \u2014 summaries, Spaces, and custom agents", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the rest of the platform guide: pull request summaries, <strong>Copilot Spaces</strong> (which replaced knowledge bases), and custom agents. Note which features are retired \u2014 the study guide still lists some that are gone.", href: "features-platform.html#spaces" },
            { tag: "drill", pri: 1, text: "Drill: Platform Features and What Replaced What", href: "drills.html?set=d2-platform" },
            { tag: "lab", pri: 2, text: "Open a pull request in a repo you own and generate a Copilot summary. Then read what it missed.", href: "features-platform.html#pr" }
        ]},
        { id: "m-mcp", focus: "MCP servers and extensibility", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the extensibility section. <strong>Copilot Extensions were retired in November 2025 and replaced by MCP servers.</strong> Critically: client-side VS Code extensions are a different thing and are unaffected. The exam can test that distinction.", href: "features-platform.html#mcp" },
            { tag: "drill", pri: 1, text: "Drill: MCP and Extensibility", href: "drills.html?set=d2-mcp" },
            { tag: "lab", pri: 2, text: "Configure one MCP server in VS Code and call a tool from Agent mode. Seeing the tool call once makes the whole architecture concrete.", href: "features-platform.html#mcp" }
        ]},
        { id: "m-dataflow", focus: "The seven-step request lifecycle", min: 80, tasks: [
            { tag: "study", pri: 1, text: "Read the Data &amp; Architecture guide end to end. This is the densest testable material on the exam: context gathering, the <strong>proxy in a GitHub-owned Azure tenant</strong>, toxicity filtering, generation, and post-processing. Learn which steps are inbound and which are outbound.", href: "data-architecture.html" },
            { tag: "drill", pri: 1, text: "Drill: The Seven-Step Request Lifecycle", href: "drills.html?set=d3-dataflow" },
            { tag: "cards", pri: 1, text: "Flashcards: the Data &amp; Architecture deck. Order-of-operations facts are exactly what flashcards are for.", href: "tools.html#flashcards" }
        ]},
        { id: "m-retention", focus: "Retention, training data, and plan differences", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the retention section. Editor completions discard prompts once a suggestion returns; chat <em>outside</em> the editor is typically retained <strong>28 days</strong>. Business and Enterprise are excluded from training by default; Free and Pro are not.", href: "data-architecture.html#retention" },
            { tag: "drill", pri: 1, text: "Drill: Retention and Training Data", href: "drills.html?set=d3-retention" },
            { tag: "review", pri: 2, text: "Reread your error log. By now the repeat offenders should be obvious.", href: "tools.html#errorlog" }
        ]},
        { id: "m-prompt-fundamentals", focus: "Prompt engineering \u2014 the 4 Ss and shot patterns", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the Prompt Engineering guide through the fundamentals. The <strong>4 Ss</strong> \u2014 Single, Specific, Short, Surround \u2014 are a named framework and are very likely on the exam. So are zero-shot, one-shot, and few-shot prompting.", href: "prompting.html" },
            { tag: "drill", pri: 1, text: "Drill: Prompt Fundamentals and the 4 Ss", href: "drills.html?set=d4-fundamentals" },
            { tag: "cards", pri: 2, text: "Flashcards: the Prompt Engineering deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-context", focus: "Context crafting and custom instructions", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the context section, and pay attention to <strong>precedence</strong>: personal instructions win, then repository, then organization. Organization ranks lowest for <em>instructions</em> even though it wins for <em>policies</em>. Candidates get this backwards constantly.", href: "prompting.html#instructions" },
            { tag: "drill", pri: 1, text: "Drill: Context Crafting and Custom Instructions", href: "drills.html?set=d4-context" },
            { tag: "lab", pri: 1, text: "Add a <code>.github/copilot-instructions.md</code> to a repo and watch a suggestion change. Then add a path-specific instructions file and see which one wins.", href: "prompting.html#instructions" }
        ]},
        { id: "m-workflow", focus: "Copilot across the development lifecycle", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the Productivity guide: where Copilot fits in the SDLC, from writing tests and documentation to debugging and modernization. Expect scenario questions that ask for the <em>best</em> fit, not the only fit.", href: "productivity.html" },
            { tag: "drill", pri: 1, text: "Drill: Copilot Across the SDLC", href: "drills.html?set=d5-workflow" },
            { tag: "cards", pri: 2, text: "Flashcards: the Productivity deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-metrics", focus: "Measuring impact and adoption", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the metrics section. Named metrics: <strong>average daily active users, total acceptance rate, lines of code accepted</strong>. Named stages: evaluation, adoption, optimization, sustained efficiency. Data comes from the usage metrics REST API and the developer survey.", href: "productivity.html#metrics" },
            { tag: "drill", pri: 1, text: "Drill: Metrics and Measuring Impact", href: "drills.html?set=d5-metrics" },
            { tag: "review", pri: 2, text: "Re-drill your single weakest set so far.", href: "drills.html" }
        ]},
        { id: "m-exclusions", focus: "Content exclusions and public code matching", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the Privacy &amp; Safeguards guide through content exclusions. Know the limits cold: <strong>Business and Enterprise only</strong>, they do not apply in Edit or Agent mode, and they do not stop semantic leakage through IDE type information.", href: "privacy.html" },
            { tag: "drill", pri: 1, text: "Drill: Content Exclusions and Public Code Matching", href: "drills.html?set=d6-exclusions" },
            { tag: "lab", pri: 2, text: "Open your organization&rsquo;s Copilot policy page and find &ldquo;Suggestions matching public code.&rdquo; Note whether it is Allow or Block, and whether it is locked.", href: "privacy.html#matching" }
        ]},
        { id: "m-policies", focus: "Plans, policies, indemnity, and audit logs", min: 80, tasks: [
            { tag: "study", pri: 1, text: "Read the policy section. Two rules people reverse: within one enterprise the <strong>least restrictive</strong> policy wins; across enterprises the <strong>most restrictive</strong> wins. And IP indemnity requires Business or Enterprise <em>and</em> public code matching set to <strong>Block</strong>.", href: "privacy.html#policies" },
            { tag: "drill", pri: 1, text: "Drill: Plans, Policies, and Indemnity", href: "drills.html?set=d6-policies" },
            { tag: "cards", pri: 1, text: "Flashcards: the Privacy &amp; Safeguards deck. Plan-by-feature tables are pure recall.", href: "tools.html#flashcards" }
        ]}
    ];

    var TAIL = [
        { id: "exam3", focus: "Practice Exam 3 \u2014 dress rehearsal", min: 100, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 3</strong> \u2014 the hardest of the three. Start at the exact clock time your real exam starts. Same room, same chair, same breakfast.", href: "practice-exam-3.html" },
            { tag: "logistics", pri: 1, text: "Record the scaled score. Above 780 and you are in range. 700 to 779 and a focused repair day closes it. Below 660 and the domain breakdown is the whole plan for tomorrow.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 2, text: "No review today. Rest tonight.", href: "" }
        ]},
        { id: "repair3", focus: "Final repair \u2014 nothing new after today", min: 90, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every miss on Exam 3, and read the explanation on all of them, not just the ones that surprised you.", href: "practice-exam-3.html" },
            { tag: "logistics", pri: 1, text: "Reread the entire error log from the top. Cross off anything you now know cold. What is left is the real study list.", href: "tools.html#errorlog" },
            { tag: "drill", pri: 2, text: "Re-drill the two weakest sets from the whole plan.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Confirm the appointment one last time: time, location or online setup, ID, and the exam code GH-300. Do this today, not tomorrow night.", href: "" }
        ]},
        { id: "taper", focus: "Taper \u2014 do not cram", min: 45, isRest: true, tasks: [
            { tag: "cards", pri: 1, text: "One relaxed sweep through all seven flashcard decks. Speed, not depth. You are keeping the machinery warm, not learning.", href: "tools.html#flashcards" },
            { tag: "study", pri: 1, text: "Read the night-before cheat sheets once each. Once. Not twice.", href: "index.html#everything" },
            { tag: "logistics", pri: 2, text: "Read the top of your error log one final time. Then close it.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 1, text: "No practice questions today. None. Cramming the day before a certification exam reliably lowers scores.", href: "" },
            { tag: "logistics", pri: 2, text: "Lay out your ID. Set two alarms. Stop everything by 8:00 pm.", href: "" }
        ]}
    ];

    /* Extra days get reinforcement, not more new content. */
    var REINFORCE = [
        { id: "rf-drills", focus: "Reinforcement \u2014 re-drill your two weakest domains", min: 45, isExtra: true, tasks: [
            { tag: "drill", pri: 1, text: "Pick the two drill sets you scored lowest on and run them again. Repeat drills beat new ones.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Add anything you miss to the error log, then reread yesterday&rsquo;s entries.", href: "tools.html#errorlog" }
        ]},
        { id: "rf-lab", focus: "Reinforcement \u2014 hands-on with Copilot", min: 50, isExtra: true, tasks: [
            { tag: "lab", pri: 1, text: "Go back into VS Code and rebuild something from memory: a custom instructions file, an MCP server config, or the same task run through all three modes. Domain 2 is the largest on the exam, so hands-on time is study time.", href: "features-ide.html" },
            { tag: "cards", pri: 2, text: "Flashcards: whichever deck matches what you just built.", href: "tools.html#flashcards" }
        ]},
        { id: "rf-cards", focus: "Reinforcement \u2014 flashcard sweep", min: 35, isExtra: true, tasks: [
            { tag: "cards", pri: 1, text: "Run the &ldquo;only cards I have missed&rdquo; filter across every deck until the missed list is empty.", href: "tools.html#flashcards" },
            { tag: "study", pri: 2, text: "Reread the cheat sheet at the bottom of whichever guide you feel least sure about.", href: "index.html#everything" }
        ]},
        { id: "rf-mixed", focus: "Reinforcement \u2014 mixed recall", min: 40, isExtra: true, tasks: [
            { tag: "drill", pri: 1, text: "Run two drills from two different domains back to back. Switching domains is harder and closer to the real exam.", href: "drills.html" },
            { tag: "cards", pri: 2, text: "Shuffle the All Decks flashcard view and do twenty cards.", href: "tools.html#flashcards" }
        ]}
    ];

    /* A dedicated sequence for when there is almost no time left. */
    var CRAM = [
        { id: "cram1", focus: "Triage \u2014 exam shape, then a cold Practice Exam 1", min: 110, isExam: true, tasks: [
            { tag: "study", pri: 1, text: "Read the home page: the six domains and their weights, and the fact that 700 is scaled, not 70%. Ten minutes, no more.", href: "index.html" },
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 1</strong> \u2014 timed, 100 minutes. You need the domain breakdown more than you need the score.", href: "practice-exam-1.html" },
            { tag: "review", pri: 1, text: "Review it immediately. There is no time to sleep on it.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Write down your two weakest domains. Everything left goes there.", href: "tools.html#errorlog" }
        ]},
        { id: "cram2", focus: "Attack features and architecture first", min: 130, tasks: [
            { tag: "study", pri: 1, text: "Read both Features guides no matter what your scores said. Domain 2 is up to 30% of the exam on its own and it is where unprepared candidates lose.", href: "features-ide.html" },
            { tag: "study", pri: 1, text: "Read the Data &amp; Architecture guide. The seven-step lifecycle is dense, testable, and almost impossible to guess.", href: "data-architecture.html" },
            { tag: "drill", pri: 1, text: "Run one drill from each of your two weakest domains.", href: "drills.html" },
            { tag: "cards", pri: 2, text: "Flashcards: the Copilot in the IDE and Data &amp; Architecture decks.", href: "tools.html#flashcards" }
        ]},
        { id: "cram3", focus: "One rehearsal, one repair, then stop", min: 120, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 3</strong> \u2014 timed, under real conditions.", href: "practice-exam-3.html" },
            { tag: "review", pri: 1, text: "Review every miss and read every explanation.", href: "practice-exam-3.html" },
            { tag: "cards", pri: 2, text: "One fast sweep through all seven flashcard decks.", href: "tools.html#flashcards" },
            { tag: "logistics", pri: 1, text: "Stop studying by 8:00 pm. Lay out your ID. Set two alarms.", href: "" }
        ]}
    ];

    GH3.BLOCK_COUNT = HEAD.length + MID.length + TAIL.length;

    function cloneBlock(b) {
        var t = [];
        for (var i = 0; i < b.tasks.length; i++) {
            var s = b.tasks[i];
            t.push({ tag: s.tag, pri: s.pri, text: s.text, href: s.href });
        }
        return { id: b.id, focus: b.focus, min: b.min, tasks: t,
            isExam: !!b.isExam, isReview: !!b.isReview, isRest: !!b.isRest, isExtra: !!b.isExtra };
    }

    /* Build the ordered block sequence for a plan of n days. */
    function sequenceFor(n) {
        var seq = [], i;

        if (n <= 3) {
            for (i = 0; i < CRAM.length; i++) seq.push(cloneBlock(CRAM[i]));
            return seq;
        }

        for (i = 0; i < HEAD.length; i++) seq.push(cloneBlock(HEAD[i]));
        var mid = [];
        for (i = 0; i < MID.length; i++) mid.push(cloneBlock(MID[i]));

        // Stretch: sprinkle reinforcement days through the middle of the plan.
        var extra = n - GH3.BLOCK_COUNT;
        if (extra > 0) {
            var step = mid.length / (extra + 1);
            for (i = extra; i >= 1; i--) {
                var at = Math.min(mid.length, Math.max(1, Math.round(step * i)));
                mid.splice(at, 0, cloneBlock(REINFORCE[(i - 1) % REINFORCE.length]));
            }
        }

        for (i = 0; i < mid.length; i++) seq.push(mid[i]);
        for (i = 0; i < TAIL.length; i++) seq.push(cloneBlock(TAIL[i]));
        return seq;
    }

    /* Merge a list of blocks into a single day. */
    function mergeBlocks(list, dayNum) {
        if (list.length === 1) {
            var only = list[0];
            only.d = dayNum;
            only.merged = false;
            return only;
        }
        var focus = [], tasks = [], min = 0, flags = { isExam: false, isReview: false, isRest: false };
        for (var i = 0; i < list.length; i++) {
            var b = list[i];
            focus.push(b.focus);
            min += b.min;
            for (var t = 0; t < b.tasks.length; t++) tasks.push(b.tasks[t]);
            if (b.isExam) flags.isExam = true;
            if (b.isReview) flags.isReview = true;
            if (b.isRest) flags.isRest = true;
        }
        // A merged day is genuinely overloaded, so shed the optional work.
        if (tasks.length > 7) {
            var trimmed = [];
            for (var k = 0; k < tasks.length; k++) if (tasks[k].pri < 3) trimmed.push(tasks[k]);
            if (trimmed.length >= 4) tasks = trimmed;
        }
        if (tasks.length > 9) {
            var core = [];
            for (var m = 0; m < tasks.length; m++) if (tasks[m].pri < 2) core.push(tasks[m]);
            if (core.length >= 4) tasks = core;
        }
        return {
            d: dayNum, id: list[0].id + "+", merged: true,
            focus: focus.join(" \u00b7 "), min: Math.min(min, 210), tasks: tasks,
            isExam: flags.isExam, isReview: flags.isReview, isRest: flags.isRest, isExtra: false
        };
    }

    var planCache = null, planCacheKey = null;

    /* The generated plan: an array of day objects, day 1 first. */
    GH3.plan = function () {
        var n = GH3.planLength();
        var key = n + "|" + GH3.examISO();
        if (planCache && planCacheKey === key) return planCache;

        var seq = sequenceFor(n);
        var days = [], i;

        if (seq.length <= n) {
            // One block per day; if the cram path left us short, pad by
            // repeating reinforcement so every day still has a job.
            for (i = 0; i < n; i++) {
                var b = i < seq.length ? seq[i] : cloneBlock(REINFORCE[(i - seq.length) % REINFORCE.length]);
                b.d = i + 1;
                b.merged = false;
                days.push(b);
            }
        } else {
            // Compress: distribute blocks across the available days in order,
            // but always reserve the final day for the taper so a short plan
            // never puts a full practice exam the night before.
            var reserveTaper = (n >= 4 && seq.length > 1 && seq[seq.length - 1].id === "taper");
            var body = reserveTaper ? seq.slice(0, seq.length - 1) : seq;
            var bodyDays = reserveTaper ? n - 1 : n;
            for (i = 0; i < bodyDays; i++) {
                var from = Math.floor(i * body.length / bodyDays);
                var to = Math.floor((i + 1) * body.length / bodyDays);
                if (to <= from) to = from + 1;
                days.push(mergeBlocks(body.slice(from, to), i + 1));
            }
            if (reserveTaper) {
                var tap = seq[seq.length - 1];
                tap.d = n;
                tap.merged = false;
                days.push(tap);
            }
        }

        planCache = days;
        planCacheKey = key;
        return days;
    };

    GH3.planTaskCount = function () {
        var p = GH3.plan(), n = 0;
        for (var i = 0; i < p.length; i++) n += p[i].tasks.length;
        return n;
    };

    /* Which plan day holds a given practice exam, so other pages can
       print the scheduled date next to each exam card. The first day that
       links to an exam is the day it is taken; later links are review days. */
    GH3.examSchedule = function () {
        var p = GH3.plan(), out = { exam1: null, exam2: null, exam3: null };
        var order = ["exam1", "exam2", "exam3"];
        for (var i = 0; i < p.length; i++) {
            for (var t = 0; t < p[i].tasks.length; t++) {
                var h = p[i].tasks[t].href;
                if (out.exam1 === null && h.indexOf("practice-exam-1") === 0) out.exam1 = p[i].d;
                if (out.exam2 === null && h.indexOf("practice-exam-2") === 0) out.exam2 = p[i].d;
                if (out.exam3 === null && h.indexOf("practice-exam-3") === 0) out.exam3 = p[i].d;
            }
        }
        if (out.exam1 === null) out.exam1 = 1;
        if (out.exam3 === null) out.exam3 = Math.max(out.exam1, p.length > 1 ? p.length - 1 : p.length);
        if (out.exam2 === null) out.exam2 = Math.max(out.exam1, Math.round((out.exam1 + out.exam3) / 2));
        for (var j = 1; j < order.length; j++) {
            if (out[order[j]] < out[order[j - 1]]) out[order[j]] = out[order[j - 1]];
        }
        return out;
    };

    /* ---------- theme ---------- */
    GH3.initTheme = function () {
        var saved = GH3.store.get("theme", null);
        var prefersDark = global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
    };

    GH3.toggleTheme = function () {
        var cur = document.documentElement.getAttribute("data-theme");
        var next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        GH3.store.set("theme", next);
        var btn = document.getElementById("themeBtn");
        if (btn) {
            btn.textContent = next === "dark" ? "\u2600" : "\u263D";
            btn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
        }
    };

    /* ---------- navigation ---------- */
    var NAV = [
        { href: "index.html", label: "Home" },
        { href: "plan.html", label: "Plan" },
        { href: "responsible.html", label: "Responsible AI" },
        { href: "features-ide.html", label: "IDE &amp; CLI" },
        { href: "features-platform.html", label: "Features" },
        { href: "data-architecture.html", label: "Data" },
        { href: "prompting.html", label: "Prompting" },
        { href: "productivity.html", label: "Productivity" },
        { href: "privacy.html", label: "Privacy" },
        { href: "drills.html", label: "Drills" },
        { href: "exams.html", label: "Exams" },
        { href: "tools.html", label: "Tools" }
    ];

    function currentFile() {
        var p = global.location.pathname.split("/").pop();
        return (!p || p === "") ? "index.html" : p;
    }

    GH3.renderTopbar = function () {
        var host = document.getElementById("topbar");
        if (!host) return;
        var here = currentFile();
        var links = "";
        for (var i = 0; i < NAV.length; i++) {
            var isActive = NAV[i].href === here ||
                (here.indexOf("practice-exam") === 0 && NAV[i].href === "exams.html");
            links += '<a href="' + NAV[i].href + '"' + (isActive ? ' class="active" aria-current="page"' : "") + ">" +
                NAV[i].label + "</a>";
        }

        var set = GH3.hasExamDate();
        var left = GH3.daysLeft();
        var pill;
        if (!set) {
            pill = '<a class="countdown-pill" href="index.html#examdate" ' +
                'title="Pick your exam date and the whole site recalculates">Set your exam date</a>';
        } else if (GH3.isPast()) {
            pill = '<a class="countdown-pill" href="index.html#examdate" ' +
                'title="Change your exam date">Exam date passed</a>';
        } else {
            pill = '<a class="countdown-pill" href="index.html#examdate" title="Exam day: ' +
                GH3.fmtLong(GH3.examDate()) + '. Click to change."><b>' + left + "</b> day" +
                (left === 1 ? "" : "s") + " left</a>";
        }

        var sub = set ? GH3.fmtShort(GH3.examDate()) : "no date set";
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";

        host.className = "topbar";
        host.innerHTML =
            '<div class="topbar-inner">' +
            '<a class="brand" href="index.html"><span class="brand-mark">GH</span>' +
            '<span>GH-300 Exam Prep <span class="brand-sub">' + sub + "</span></span></a>" +
            '<nav class="nav" id="mainNav" aria-label="Main">' + links + "</nav>" +
            '<div style="margin-left:auto;display:flex;align-items:center;gap:.5rem">' + pill +
            '<button class="icon-btn" id="themeBtn" type="button" aria-label="' +
            (isDark ? "Switch to light mode" : "Switch to dark mode") + '">' + (isDark ? "\u2600" : "\u263D") + "</button>" +
            '<button class="icon-btn nav-toggle" id="navBtn" type="button" aria-label="Toggle menu" aria-expanded="false">\u2261</button>' +
            "</div></div>";

        document.getElementById("themeBtn").addEventListener("click", GH3.toggleTheme);
        var navBtn = document.getElementById("navBtn");
        navBtn.addEventListener("click", function () {
            var nav = document.getElementById("mainNav");
            var open = nav.classList.toggle("open");
            navBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    };

    GH3.renderFooter = function () {
        var host = document.getElementById("footer");
        if (!host) return;
        host.className = "footer";
        host.innerHTML = '<div class="wrap">' +
            "<p>An independent study site for Microsoft Exam GH-300, GitHub Copilot, built to the " +
            GH3.SKILLS_DATE + " skills-measured objectives. Every question, explanation, and flashcard here " +
            "is original practice material and is not affiliated with or endorsed by Microsoft or GitHub.</p>" +
            '<p class="faint">The real exam is scored on a scaled 1\u20131000 range with 700 to pass. That is ' +
            "<strong>not</strong> the same as answering 70% of questions correctly \u2014 Microsoft weights questions " +
            "by difficulty and has never published the conversion, so scores shown here are readiness estimates " +
            "only. GitHub Copilot changes quickly \u2014 always check the current " +
            "<a href=\"https://learn.microsoft.com/credentials/certifications/resources/study-guides/gh-300\" " +
            "rel=\"noopener\">official study guide</a> before your exam. Your exam date, progress, and notes are " +
            "saved in this browser only.</p>" +
            "</div>";
    };

    /* ============================================================
       The exam-date picker, reused on every page that needs it
       ============================================================ */
    GH3.renderDatePicker = function (host, opts) {
        if (!host) return;
        opts = opts || {};
        var set = GH3.hasExamDate();
        var iso = GH3.examISO();
        var min = GH3.toISO(GH3.today());

        var head = set
            ? "<h3 style=\"margin-top:0\">Your exam date</h3>"
            : "<h3 style=\"margin-top:0\">Start here: when is your exam?</h3>";

        var body = set
            ? "<p>Everything on this site is calculated from this one date \u2014 the countdown, the length of " +
              "your study plan, the date on every task, and when each practice exam lands. Change it and " +
              "the whole plan rebuilds.</p>"
            : "<p>Pick the day you are sitting GH-300. The study plan, the countdown, and the practice-exam " +
              "schedule are all generated from it. If you have not booked yet, pick a target date \u2014 you " +
              "can change it whenever you like.</p>";

        host.innerHTML =
            '<div class="card" id="dateCard">' + head + body +
            '<div class="grid grid-2">' +
            '<div class="field"><label for="examDateInput">Exam date</label>' +
            '<input type="date" id="examDateInput" min="' + min + '" value="' + iso + '"></div>' +
            '<div class="field"><label for="examDateSave">&nbsp;</label>' +
            '<button class="btn" id="examDateSave" style="width:100%">' +
            (set ? "Update my plan" : "Build my plan") + "</button></div></div>" +
            '<div class="btn-row" id="quickDates" style="margin-top:-.4rem"></div>' +
            '<div id="dateSummary" style="margin-top:1.1rem"></div>' +
            (set ? '<div class="btn-row" style="margin-top:.9rem">' +
                '<button class="btn ghost sm" id="examDateClear">Clear my exam date</button></div>' : "") +
            "</div>";

        var quick = [
            { label: "In 1 week", d: 7 },
            { label: "In 2 weeks", d: 14 },
            { label: "In 3 weeks", d: 21 },
            { label: "In 1 month", d: 30 },
            { label: "In 6 weeks", d: 42 }
        ];
        var qh = "";
        for (var i = 0; i < quick.length; i++) {
            var qd = GH3.today();
            qd.setDate(qd.getDate() + quick[i].d);
            qh += '<button class="btn ghost sm" type="button" data-iso="' + GH3.toISO(qd) + '">' +
                quick[i].label + "</button>";
        }
        document.getElementById("quickDates").innerHTML = qh;

        function summary() {
            var box = document.getElementById("dateSummary");
            var val = document.getElementById("examDateInput").value;
            var d = GH3.parseISO(val);
            if (!d) { box.innerHTML = '<p class="muted" style="margin-bottom:0">Pick a valid date.</p>'; return; }
            var days = Math.round((startOfDay(d) - GH3.today()) / DAY_MS);
            if (days < 0) {
                box.innerHTML = '<div class="callout warn" style="margin-bottom:0">' +
                    '<span class="callout-title">That date is in the past</span>' +
                    '<p style="margin-bottom:0">Pick today or later so the plan has somewhere to go.</p></div>';
                return;
            }
            var planN = Math.min(GH3.MAX_PLAN_DAYS, Math.max(1, days));
            var runway = Math.max(0, days - planN);
            var shape = planN <= 3
                ? "a compressed triage plan"
                : (planN < GH3.BLOCK_COUNT
                    ? "a condensed plan with combined study days"
                    : "the full plan with reinforcement days built in");
            var msg = "<p><strong>" + GH3.fmtLong(d) + "</strong> is <strong>" + days +
                "</strong> day" + (days === 1 ? "" : "s") + " away. That gives you <strong>" + planN +
                "</strong> study day" + (planN === 1 ? "" : "s") + " and " + shape + ".</p>";
            if (runway > 0) {
                msg += '<p class="muted" style="margin-bottom:0"><small>The plan itself starts in ' + runway +
                    " day" + (runway === 1 ? "" : "s") + ". Until then, work through the guides at your own pace " +
                    "and take Practice Exam 1 whenever you want an early baseline.</small></p>";
            } else {
                msg += '<p class="muted" style="margin-bottom:0"><small>Day 1 is today. Three practice exams are ' +
                    "spaced across the plan, each followed by a repair day.</small></p>";
            }
            box.innerHTML = '<div class="callout key" style="margin-bottom:0">' +
                '<span class="callout-title">What this date gives you</span>' + msg + "</div>";
        }

        function save(val) {
            if (!GH3.setExamDate(val)) { GH3.toast("Pick a valid date first."); return; }
            GH3.toast("Exam date saved. Rebuilding your plan\u2026");
            global.setTimeout(function () {
                if (opts.go) global.location.href = opts.go;
                else global.location.reload();
            }, 500);
        }

        document.getElementById("examDateInput").addEventListener("input", summary);
        document.getElementById("examDateInput").addEventListener("change", summary);
        document.getElementById("examDateSave").addEventListener("click", function () {
            save(document.getElementById("examDateInput").value);
        });
        var qbtns = document.getElementById("quickDates").getElementsByTagName("button");
        for (var b = 0; b < qbtns.length; b++) {
            qbtns[b].addEventListener("click", function () {
                document.getElementById("examDateInput").value = this.getAttribute("data-iso");
                summary();
            });
        }
        var clr = document.getElementById("examDateClear");
        if (clr) {
            clr.addEventListener("click", function () {
                if (global.confirm("Clear your exam date? The plan will fall back to a default 21-day window.")) {
                    GH3.clearExamDate();
                    global.location.reload();
                }
            });
        }
        summary();
    };

    /* A compact banner for pages other than the home page. */
    GH3.renderDateBanner = function (host) {
        if (!host) return;
        if (GH3.hasExamDate() && !GH3.isPast()) { host.innerHTML = ""; return; }
        var msg = GH3.hasExamDate()
            ? "<span class=\"callout-title\">Your exam date has passed</span>" +
              "<p style=\"margin-bottom:0\">The plan below is still showing the old schedule. " +
              "<a href=\"index.html#examdate\">Set a new exam date</a> to rebuild it.</p>"
            : "<span class=\"callout-title\">No exam date set yet</span>" +
              "<p style=\"margin-bottom:0\">Everything here is currently using a default " +
              GH3.DEFAULT_LEAD_DAYS + "-day window. " +
              "<a href=\"index.html#examdate\">Pick your real exam date</a> and the countdown, the plan " +
              "length, and every date on the site recalculate around it.</p>";
        host.innerHTML = '<div class="callout warn">' + msg + "</div>";
    };

    /* ---------- toast ---------- */
    var toastEl = null, toastTimer = null;
    GH3.toast = function (msg, ms) {
        if (!toastEl) {
            toastEl = document.createElement("div");
            toastEl.className = "toast";
            toastEl.setAttribute("role", "status");
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = msg;
        void toastEl.offsetWidth;
        toastEl.classList.add("show");
        global.clearTimeout(toastTimer);
        toastTimer = global.setTimeout(function () { toastEl.classList.remove("show"); }, ms || 2200);
    };

    /* ---------- meters ---------- */
    GH3.fillMeter = function (el, pct) {
        if (!el) return;
        var bar = el.tagName === "I" ? el : el.querySelector("i");
        if (!bar) return;
        var v = Math.max(0, Math.min(100, pct)) / 100;
        global.requestAnimationFrame(function () { bar.style.transform = "scaleX(" + v + ")"; });
    };

    GH3.autoFillMeters = function (root) {
        var nodes = (root || document).querySelectorAll("[data-pct]");
        for (var i = 0; i < nodes.length; i++) {
            GH3.fillMeter(nodes[i], parseFloat(nodes[i].getAttribute("data-pct")) || 0);
        }
    };

    /* ---------- persistent checkboxes ---------- */
    GH3.bindPersistentChecks = function (storeKey, root) {
        var state = GH3.store.get(storeKey, {});
        var boxes = (root || document).querySelectorAll('input[type="checkbox"][data-key]');
        for (var i = 0; i < boxes.length; i++) {
            (function (box) {
                var k = box.getAttribute("data-key");
                if (state[k]) box.checked = true;
                box.addEventListener("change", function () {
                    var s = GH3.store.get(storeKey, {});
                    if (box.checked) { s[k] = 1; } else { delete s[k]; }
                    GH3.store.set(storeKey, s);
                    if (typeof GH3.onCheckChange === "function") GH3.onCheckChange(s);
                });
            })(boxes[i]);
        }
        return state;
    };

    /* ---------- misc helpers ---------- */
    GH3.escapeHtml = function (s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };

    var LETTERS = ["A", "B", "C", "D", "E", "F"];
    GH3.letters = function () { return LETTERS; };

    GH3.pluralize = function (n, word) { return n + " " + word + (n === 1 ? "" : "s"); };

    /* ---------- boot ---------- */
    GH3.initTheme();
    document.addEventListener("DOMContentLoaded", function () {
        GH3.renderTopbar();
        GH3.renderFooter();
        GH3.autoFillMeters(document);
    });

})(window);
