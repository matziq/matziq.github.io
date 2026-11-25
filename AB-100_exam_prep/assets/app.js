/* ============================================================
   AB-100 Exam Prep  |  shared app script
   Everything on the site is calculated from one number: the
   exam date the user picks. Change it and the countdown, the
   study plan length, every day's date, and the practice-exam
   schedule all recompute.
   ============================================================ */
(function (global) {
    "use strict";

    var AB1 = global.AB1 = global.AB1 || {};

    /* ---------- core facts about the exam ----------
       Verified against Microsoft Learn on November 25, 2026:
       exam page, study guide (skills measured as of November 16, 2026),
       exam duration page, scoring page, and retake policy. */
    AB1.EXAM_CODE = "AB-100";
    AB1.EXAM_NAME = "Agentic AI Business Solutions Architect";
    AB1.CERT_NAME = "Microsoft Certified: Agentic AI Business Solutions Architect Expert";
    AB1.VENDOR = "Microsoft";
    AB1.DELIVERED_BY = "Pearson VUE";
    AB1.PASS_SCORE = 700;
    AB1.SCALE_MIN = 1;
    AB1.SCALE_MAX = 1000;
    /* Microsoft lists 100 minutes of exam time (120 seat time) for role-based
       exams without labs, and 120 minutes (140 seat) when labs may appear. It does
       not say per exam which applies; your registration shows the real figure. */
    AB1.EXAM_MINUTES = 100;
    AB1.SEAT_MINUTES = 120;
    /* Microsoft does not publish a question count for AB-100, so the site never
       claims one. These two numbers describe this site's practice exams only. */
    AB1.PRACTICE_QUESTIONS = 60;
    AB1.PRACTICE_MINUTES = 100;
    AB1.SKILLS_DATE = "November 16, 2026";
    AB1.VERIFIED_DATE = "November 25, 2026";
    AB1.LINKS = {
        exam: "https://learn.microsoft.com/credentials/certifications/exams/ab-100/",
        guide: "https://learn.microsoft.com/credentials/certifications/resources/study-guides/ab-100",
        duration: "https://learn.microsoft.com/credentials/support/exam-duration-exam-experience",
        scoring: "https://learn.microsoft.com/credentials/certifications/exam-scoring-reports",
        retake: "https://learn.microsoft.com/credentials/support/retake-policy",
        renewal: "https://learn.microsoft.com/credentials/certifications/renew-your-microsoft-certification",
        assessment: "https://aka.ms/AB100-PA",
        sandbox: "https://aka.ms/examdemo"
    };

    /* The three skill areas, worded exactly as Microsoft words them, with the
       published weight ranges and the question counts this site uses on a
       60-question practice exam. The three ranges only reach 100% at their
       maximums (40 + 35 + 25), so 24 / 21 / 15 is the one 60-question split
       that sits inside every published range. */
    AB1.DOMAINS = [
        { id: "plan", num: "1", short: "Plan",
          name: "Plan AI-powered business solutions",
          full: "Plan AI-powered business solutions",
          weight: "35\u201340%", pct: 40, q: 24, page: "plan-solutions.html", cls: "teal" },
        { id: "design", num: "2", short: "Design",
          name: "Design AI-powered business solutions",
          full: "Design AI-powered business solutions",
          weight: "30\u201335%", pct: 35, q: 21, page: "design-solutions.html", cls: "amber" },
        { id: "deploy", num: "3", short: "Deploy",
          name: "Deploy AI-powered business solutions",
          full: "Deploy AI-powered business solutions",
          weight: "20\u201325%", pct: 25, q: 15, page: "deploy-solutions.html", cls: "good" }
    ];

    /* The sub-areas inside each skill area, one per study-guide objective group.
       Counts sum to 60 per practice exam. */
    AB1.TOPICS = [
        { id: "requirements", name: "Analyze Requirements", domain: "plan",
          obj: ["1.1"], q: 6, weight: "35\u201340%", page: "plan-solutions.html#requirements", cls: "teal" },
        { id: "strategy", name: "AI Strategy and Agent Design", domain: "plan",
          obj: ["1.2"], q: 12, weight: "35\u201340%", page: "plan-solutions.html#strategy", cls: "teal" },
        { id: "roi", name: "Costs, Benefits, and ROI", domain: "plan",
          obj: ["1.3"], q: 6, weight: "35\u201340%", page: "plan-solutions.html#roi", cls: "teal" },
        { id: "agents", name: "Design AI and Agents", domain: "design",
          obj: ["2.1"], q: 9, weight: "30\u201335%", page: "design-solutions.html#agents", cls: "amber" },
        { id: "extensibility", name: "Extensibility of AI Solutions", domain: "design",
          obj: ["2.2"], q: 6, weight: "30\u201335%", page: "design-solutions.html#extensibility", cls: "amber" },
        { id: "prebuilt", name: "Prebuilt Agents and Apps", domain: "design",
          obj: ["2.3"], q: 6, weight: "30\u201335%", page: "design-solutions.html#prebuilt", cls: "amber" },
        { id: "monitor", name: "Monitor and Tune", domain: "deploy",
          obj: ["3.1"], q: 4, weight: "20\u201325%", page: "deploy-solutions.html#monitor", cls: "good" },
        { id: "testing", name: "Testing AI Solutions", domain: "deploy",
          obj: ["3.2"], q: 3, weight: "20\u201325%", page: "deploy-solutions.html#testing", cls: "good" },
        { id: "alm", name: "ALM for AI Solutions", domain: "deploy",
          obj: ["3.3"], q: 4, weight: "20\u201325%", page: "deploy-solutions.html#alm", cls: "good" },
        { id: "governance", name: "Responsible AI, Security, and Governance", domain: "deploy",
          obj: ["3.4"], q: 4, weight: "20\u201325%", page: "deploy-solutions.html#governance", cls: "good" }
    ];

    AB1.topicByName = function (name) {
        for (var i = 0; i < AB1.TOPICS.length; i++) {
            if (AB1.TOPICS[i].name === name) return AB1.TOPICS[i];
        }
        return null;
    };

    AB1.domainById = function (id) {
        for (var i = 0; i < AB1.DOMAINS.length; i++) {
            if (AB1.DOMAINS[i].id === id) return AB1.DOMAINS[i];
        }
        return null;
    };

    /* The objective codes used to tag every question on the site. */
    AB1.OBJECTIVES = {
        "1.1": "Analyze requirements for AI-powered business solutions",
        "1.2": "Design the overall AI strategy for business solutions",
        "1.3": "Evaluate costs and benefits of an AI-powered business solution",
        "2.1": "Design AI and agents",
        "2.2": "Design extensibility of AI solutions",
        "2.3": "Orchestrate the configuration of prebuilt agents and apps",
        "3.1": "Analyze, monitor, and tune AI-powered business solutions",
        "3.2": "Manage the testing of AI-powered business solutions",
        "3.3": "Design ALM processes for AI-powered business solutions",
        "3.4": "Design responsible AI, security, governance, risk management, and compliance"
    };

    /* ---------- practice scoring ----------
       The real exam is reported on a scaled 1-1000 range with 700 to pass.
       Microsoft says plainly that 700 "may not equal 70%" of the points, does
       not publish the conversion, and includes unscored items. So this site
       never converts a practice result into a scaled score. It reports percent
       correct against its own readiness targets, which are study heuristics. */
    AB1.READY_PCT = 80;     // site heuristic: comfortable margin
    AB1.BORDER_PCT = 70;    // site heuristic: below this, keep studying
    AB1.PASS_PCT = AB1.READY_PCT;

    AB1.pctOf = function (right, total) {
        return total ? Math.round((right / total) * 100) : 0;
    };

    /* No scaled-score helpers: the site reports percent correct only. */

    AB1.passMark = function () { return AB1.READY_PCT; };
    AB1.passPct = function () { return AB1.READY_PCT; };
    AB1.correctNeeded = function (total) {
        return Math.ceil(total * AB1.READY_PCT / 100);
    };

    AB1.verdict = function (pct) {
        if (pct >= 90) return { label: "Strong", cls: "good" };
        if (pct >= AB1.READY_PCT) return { label: "Ready range", cls: "good" };
        if (pct >= AB1.BORDER_PCT) return { label: "Borderline", cls: "amber" };
        return { label: "Keep studying", cls: "bad" };
    };

    /* ---------- storage ---------- */
    var PREFIX = "ab100:";
    AB1.store = {
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

    AB1.DEFAULT_LEAD_DAYS = 21;   // used when nothing has been chosen yet
    AB1.MAX_PLAN_DAYS = 45;       // longest plan the generator will build
    AB1.today = function () { return startOfDay(new Date()); };

    AB1.parseISO = function (s) {
        if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return null;
        var p = String(s).split("-");
        var year = parseInt(p[0], 10);
        var month = parseInt(p[1], 10) - 1;
        var day = parseInt(p[2], 10);
        var d = new Date(year, month, day);
        return isNaN(d.getTime()) || d.getFullYear() !== year ||
            d.getMonth() !== month || d.getDate() !== day ? null : d;
    };

    AB1.toISO = function (d) {
        function pad(n) { return (n < 10 ? "0" : "") + n; }
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    };

    /* The stored value, or null if the user has not chosen one yet. */
    AB1.storedExamISO = function () {
        var v = AB1.store.get("examDate", null);
        return AB1.parseISO(v) ? v : null;
    };

    AB1.hasExamDate = function () { return !!AB1.storedExamISO(); };

    /* Always returns a usable date. Falls back to a default so that every
       page renders sensibly before the user has picked anything. */
    AB1.examDate = function () {
        var iso = AB1.storedExamISO();
        if (iso) return AB1.parseISO(iso);
        var d = AB1.today();
        d.setDate(d.getDate() + AB1.DEFAULT_LEAD_DAYS);
        return d;
    };

    AB1.examISO = function () { return AB1.toISO(AB1.examDate()); };

    AB1.setExamDate = function (iso) {
        var d = AB1.parseISO(iso);
        if (!d) return false;
        AB1.store.set("examDate", AB1.toISO(d));
        planCache = null;
        return true;
    };

    AB1.clearExamDate = function () {
        AB1.store.remove("examDate");
        planCache = null;
    };

    /* Whole days between today and exam day. 0 means the exam is today. */
    AB1.daysLeft = function () {
        return Math.max(0, Math.round((startOfDay(AB1.examDate()) - AB1.today()) / DAY_MS));
    };

    AB1.isPast = function () {
        return (startOfDay(AB1.examDate()) - AB1.today()) < 0;
    };

    /* Study days available: today through the day before the exam. */
    AB1.studyDaysAvailable = function () { return Math.max(1, AB1.daysLeft()); };

    /* Plan length, capped so a very distant exam does not produce a
       200-day wall of tasks. */
    AB1.planLength = function () {
        return Math.min(AB1.MAX_PLAN_DAYS, AB1.studyDaysAvailable());
    };

    /* The plan always ends the day before the exam. */
    AB1.planStart = function () {
        var d = startOfDay(AB1.examDate());
        d.setDate(d.getDate() - AB1.planLength());
        return d;
    };

    /* Days of runway before the plan begins, when the exam is far out. */
    AB1.runwayDays = function () {
        return Math.max(0, AB1.studyDaysAvailable() - AB1.planLength());
    };

    AB1.currentPlanDay = function () {
        return Math.round((AB1.today() - AB1.planStart()) / DAY_MS) + 1;
    };

    AB1.dateForDay = function (n) {
        var d = new Date(AB1.planStart().getTime());
        d.setDate(d.getDate() + (n - 1));
        return d;
    };

    AB1.fmtDate = function (d) { return DAYS[d.getDay()] + ", " + MONS[d.getMonth()] + " " + d.getDate(); };
    AB1.fmtShort = function (d) { return MONS[d.getMonth()] + " " + d.getDate(); };
    AB1.fmtLong = function (d) {
        return DAYS[d.getDay()] + ", " + MONS_LONG[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    };
    AB1.dayName = function (d) { return DAYS[d.getDay()]; };

    AB1.fmtClock = function (totalSeconds) {
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
            { tag: "study", pri: 1, text: "Read the home page: the three domains, how they are weighted, and the one fact that trips up more candidates than any other \u2014 <strong>700 is a scaled score, not 70% correct</strong>. Ten minutes here changes how you read every result after it.", href: "index.html" },
            { tag: "logistics", pri: 1, text: "Check your eligibility. Passing AB-100 alone does not award the Expert certification \u2014 you also need one of the qualifying Associate certifications Microsoft lists on the exam page.", href: "index.html#facts" },
            { tag: "logistics", pri: 2, text: "Confirm your booking. AB-100 is a <strong>Microsoft</strong> exam delivered by <strong>Pearson VUE</strong>. Note the exam time shown at registration, and if you test online, run the system check <em>today</em>, not the night before.", href: "" }
        ]},
        { id: "baseline", focus: "Practice Exam 1, cold", min: 100, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 1</strong> \u2014 60 questions, 100 minutes, timed, phone in another room. Take it <em>before</em> you read a single guide.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Write down your percent correct and all three domain percentages. That table is the map for the rest of the plan.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 2, text: "Do <em>not</em> review it today. Close the laptop. You will see twice as much tomorrow morning.", href: "" }
        ]},
        { id: "repair1", focus: "Review Exam 1 and start the error log", min: 75, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every missed question from Exam 1, and read the explanation on the ones you guessed right too. A lucky guess is not knowledge.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Log every miss and tag its cause: never knew the fact, knew it and read past it, or misread the scenario. Three causes, three different fixes.", href: "tools.html#errorlog" },
            { tag: "logistics", pri: 2, text: "Write your weakest domain and weakest two objectives at the top of the error log. The next few days are built around them.", href: "tools.html#errorlog" }
        ]}
    ];

    var MID = [
        { id: "m-requirements", focus: "Requirements \u2014 where agents fit and whether the data is ready", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the Plan guide through objective 1.1: when an agent fits task automation, analytics, or decision support, and the five grounding-data checks \u2014 <strong>accuracy, relevance, timeliness, cleanliness, availability</strong>.", href: "plan-solutions.html#requirements" },
            { tag: "drill", pri: 1, text: "Drill: Requirements and Grounding Data", href: "drills.html?set=d1-requirements" },
            { tag: "cards", pri: 2, text: "Flashcards: the Plan deck, first pass.", href: "tools.html#flashcards" }
        ]},
        { id: "m-adoption", focus: "AI adoption strategy and the AI Center of Excellence", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the strategy section: the Cloud Adoption Framework AI adoption journey, what an AI Center of Excellence owns, and how a solution spans multiple Dynamics 365 apps.", href: "plan-solutions.html#strategy" },
            { tag: "drill", pri: 1, text: "Drill: Adoption Strategy and the AI CoE", href: "drills.html?set=d1-adoption" },
            { tag: "lab", pri: 2, text: "Sketch an AI adoption one-pager for an organization you know: business outcomes, a first use case, a governance owner, and a success metric.", href: "" }
        ]},
        { id: "m-multiagent", focus: "Multi-agent design \u2014 extend Microsoft 365 Copilot or build custom", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the multi-agent section: when Microsoft 365 Copilot, Copilot Studio, and Microsoft Foundry each own a piece of the solution, and the <strong>extend vs build custom</strong> decision.", href: "plan-solutions.html#multiagent" },
            { tag: "drill", pri: 1, text: "Drill: Multi-Agent and Extend-or-Build", href: "drills.html?set=d1-multiagent" },
            { tag: "lab", pri: 2, text: "Draw one business process as a multi-agent diagram: an orchestrator, two specialist agents, the knowledge each one uses, and where a human approves.", href: "" }
        ]},
        { id: "m-knowledge", focus: "Knowledge sources, rules, and custom models", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the knowledge section: generative answers and knowledge sources in Copilot Studio, solution rules and constraints, and when a <strong>custom model</strong> is justified instead of grounding or prompting.", href: "plan-solutions.html#knowledge" },
            { tag: "drill", pri: 1, text: "Drill: Knowledge, Rules, and Custom Models", href: "drills.html?set=d1-knowledge" },
            { tag: "cards", pri: 2, text: "Flashcards: the Plan deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-prompts", focus: "Prompt libraries, prompt engineering, and small language models", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the prompting section: what a governed prompt library contains, the prompt-engineering guidelines an architect sets, and the use cases where a customized <strong>small language model</strong> wins.", href: "plan-solutions.html#prompts" },
            { tag: "drill", pri: 1, text: "Drill: Prompt Libraries and Small Models", href: "drills.html?set=d1-prompts" },
            { tag: "lab", pri: 2, text: "Write three reusable prompts for one business role, each with a goal, context, expected output format, and source to ground on.", href: "" }
        ]},
        { id: "m-roi", focus: "ROI and total cost of ownership", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the ROI section: benefits you can measure, every cost that belongs in <strong>total cost of ownership</strong>, and how to frame an ROI analysis for one business process.", href: "plan-solutions.html#roi" },
            { tag: "drill", pri: 1, text: "Drill: ROI and Total Cost of Ownership", href: "drills.html?set=d1-roi" },
            { tag: "review", pri: 2, text: "Reread your error log. Mark anything from the Plan domain you now know cold.", href: "tools.html#errorlog" }
        ]},
        { id: "m-buildbuy", focus: "Build, buy, or extend \u2014 and model routing", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the build/buy/extend section and the model router section: why routing each request to the most suitable model balances quality, latency, and cost.", href: "plan-solutions.html#buildbuy" },
            { tag: "drill", pri: 1, text: "Drill: Build, Buy, Extend, and Model Routing", href: "drills.html?set=d1-build-buy" },
            { tag: "cards", pri: 1, text: "Flashcards: finish the Plan deck. Domain 1 is the biggest slice of the exam.", href: "tools.html#flashcards" }
        ]},
        { id: "m-dynamics", focus: "Copilot in Dynamics 365 customer experience and service", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the Design guide through Dynamics 365: business terms, Copilot customizations, connectors for Copilot in Dynamics 365 Sales, and agents on Contact Center channels.", href: "design-solutions.html#agents" },
            { tag: "drill", pri: 1, text: "Drill: Copilot in Dynamics 365 CX and Service", href: "drills.html?set=d2-dynamics-cx" },
            { tag: "cards", pri: 2, text: "Flashcards: the Design deck, first pass.", href: "tools.html#flashcards" }
        ]},
        { id: "exam2", focus: "Practice Exam 2 \u2014 midpoint check", min: 100, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 2</strong> \u2014 60 new questions, 100 minutes, timed. Compare each domain percentage with Exam 1.", href: "practice-exam-2.html" },
            { tag: "logistics", pri: 1, text: "Record the percent correct and the three domain percentages next to your Exam 1 numbers.", href: "tools.html#errorlog" }
        ]},
        { id: "repair2", focus: "Review Exam 2 and retarget the plan", min: 75, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every miss on Exam 2. Look for the same objective showing up twice \u2014 that is a real gap, not bad luck.", href: "practice-exam-2.html" },
            { tag: "drill", pri: 1, text: "Re-drill the single weakest set so far.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Add every miss to the error log with its cause.", href: "tools.html#errorlog" }
        ]},
        { id: "m-agenttypes", focus: "Agent types, topics, and orchestration choices", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the agent design section: <strong>task, autonomous, and prompt-and-response</strong> agents, topics and the fallback topic, agent flows, prompt actions, and when to use standard NLP, CLU, or generative orchestration.", href: "design-solutions.html#orchestration" },
            { tag: "drill", pri: 1, text: "Drill: Agent Types, Topics, and Orchestration", href: "drills.html?set=d2-agent-types" },
            { tag: "lab", pri: 1, text: "In a Copilot Studio trial, build one agent with a topic, a fallback, a knowledge source, and one agent flow. Doing it once makes the vocabulary stick.", href: "" }
        ]},
        { id: "m-appsdata", focus: "Foundry Tools, apps, and grounding data", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the apps and data section: matching Foundry Tools to a requirement, generative pages and agent feed, AI in a Power Apps canvas app, the Power Platform Well-Architected pillars, and preparing data for grounding.", href: "design-solutions.html#appsdata" },
            { tag: "drill", pri: 1, text: "Drill: Foundry Tools, Apps, and Grounding Data", href: "drills.html?set=d2-apps-data" },
            { tag: "cards", pri: 2, text: "Flashcards: the Design deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-extend", focus: "Extensibility \u2014 MCP, Computer Use, and agent behaviors", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the extensibility section: Copilot Studio extensibility options, <strong>Model Context Protocol</strong> servers, Computer Use for apps and websites without APIs, and reasoning and voice behaviors.", href: "design-solutions.html#extensibility" },
            { tag: "drill", pri: 1, text: "Drill: MCP, Computer Use, and Agent Behaviors", href: "drills.html?set=d2-studio-ext" },
            { tag: "lab", pri: 2, text: "List three systems in your organization and decide for each: connector, MCP server, or Computer Use. Write one sentence of justification each.", href: "" }
        ]},
        { id: "m-m365", focus: "Microsoft 365 agents and custom models in Foundry", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the Microsoft 365 section: agents in Microsoft 365 Copilot, Teams and SharePoint agents, and when a custom or fine-tuned model in Microsoft Foundry belongs in the design.", href: "design-solutions.html#m365" },
            { tag: "drill", pri: 1, text: "Drill: Microsoft 365 Agents and Foundry Models", href: "drills.html?set=d2-m365-foundry" },
            { tag: "review", pri: 2, text: "Reread your error log from the top.", href: "tools.html#errorlog" }
        ]},
        { id: "m-prebuilt", focus: "Prebuilt agents and Dynamics 365 AI features", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the prebuilt section: AI in Dynamics 365 finance and supply chain apps, Microsoft 365 Copilot for Sales and for Service, Power Platform AI hub, and extra knowledge sources for finance and operations agent chat and in-app help.", href: "design-solutions.html#prebuilt" },
            { tag: "drill", pri: 1, text: "Drill: Prebuilt Agents and Dynamics 365 AI", href: "drills.html?set=d2-prebuilt" },
            { tag: "cards", pri: 1, text: "Flashcards: finish the Design deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-monitor", focus: "Monitoring, telemetry, and tuning", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the Deploy guide through objective 3.1: the monitoring process, analytics and telemetry, user feedback and backlog triage, and how metrics drive tuning.", href: "deploy-solutions.html#monitor" },
            { tag: "drill", pri: 1, text: "Drill: Monitoring, Telemetry, and Tuning", href: "drills.html?set=d3-monitor" },
            { tag: "cards", pri: 2, text: "Flashcards: the Deploy deck, first pass.", href: "tools.html#flashcards" }
        ]},
        { id: "m-testing", focus: "Testing and validation", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the testing section: agent test process and metrics, validation criteria for custom models, end-to-end tests across Dynamics 365 apps, and using Copilot to draft test cases.", href: "deploy-solutions.html#testing" },
            { tag: "drill", pri: 1, text: "Drill: Testing and Validation", href: "drills.html?set=d3-testing" },
            { tag: "lab", pri: 2, text: "Write ten test utterances for one agent: happy path, ambiguous, out of scope, and one adversarial prompt.", href: "" }
        ]},
        { id: "m-alm", focus: "ALM for agents, models, and data", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the ALM section: solutions and environments for Copilot Studio agents, connectors, and actions, plus ALM for Foundry Agent Service, custom models, grounding data, and Dynamics 365 AI features.", href: "deploy-solutions.html#alm" },
            { tag: "drill", pri: 1, text: "Drill: ALM for Agents, Models, and Data", href: "drills.html?set=d3-alm" },
            { tag: "cards", pri: 2, text: "Flashcards: the Deploy deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-security", focus: "Agent and model security", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the security section: agent identity and least privilege, model security, <strong>direct and indirect prompt injection</strong>, and access controls on grounding data and model tuning.", href: "deploy-solutions.html#governance" },
            { tag: "drill", pri: 1, text: "Drill: Agent and Model Security", href: "drills.html?set=d3-security" },
            { tag: "review", pri: 2, text: "Re-drill your weakest Design set.", href: "drills.html" }
        ]},
        { id: "m-governance", focus: "Governance, compliance, and responsible AI", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the governance section: agent governance, the six responsible AI principles, data residency and movement, and audit trails for changes to models and data.", href: "deploy-solutions.html#governance" },
            { tag: "drill", pri: 1, text: "Drill: Governance, Compliance, and Responsible AI", href: "drills.html?set=d3-governance" },
            { tag: "cards", pri: 1, text: "Flashcards: finish the Deploy deck.", href: "tools.html#flashcards" }
        ]}
    ];

    var TAIL = [
        { id: "exam3", focus: "Practice Exam 3 \u2014 dress rehearsal", min: 100, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 3</strong> \u2014 the hardest of the three. Start at the exact clock time your real exam starts. Same room, same chair, same breakfast.", href: "practice-exam-3.html" },
            { tag: "logistics", pri: 1, text: "Record the percent correct. On this site, 80% or more is the ready range, 70\u201379% means a focused repair day, and under 70% means the domain breakdown is tomorrow&rsquo;s whole plan. These are study targets, not Microsoft&rsquo;s scale.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 2, text: "No review today. Rest tonight.", href: "" }
        ]},
        { id: "repair3", focus: "Final repair \u2014 nothing new after today", min: 90, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every miss on Exam 3, and read the explanation on all of them, not just the ones that surprised you.", href: "practice-exam-3.html" },
            { tag: "logistics", pri: 1, text: "Reread the entire error log from the top. Cross off anything you now know cold. What is left is the real study list.", href: "tools.html#errorlog" },
            { tag: "drill", pri: 2, text: "Re-drill the two weakest sets from the whole plan.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Confirm the appointment one last time: time, location or online setup, ID, and the exam code AB-100. Do this today, not tomorrow night.", href: "" }
        ]},
        { id: "taper", focus: "Taper \u2014 do not cram", min: 45, isRest: true, tasks: [
            { tag: "cards", pri: 1, text: "One relaxed sweep through all three flashcard decks. Speed, not depth. You are keeping the machinery warm, not learning.", href: "tools.html#flashcards" },
            { tag: "study", pri: 1, text: "Read the cheat sheets once each. Once. Not twice.", href: "index.html#everything" },
            { tag: "logistics", pri: 2, text: "Read the top of your error log one final time. Then close it.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 1, text: "No practice questions today. None. Cramming the day before a certification exam reliably lowers scores.", href: "" },
            { tag: "logistics", pri: 2, text: "Lay out your ID. Set two alarms. Stop everything by 8:00 pm.", href: "" }
        ]}
    ];

    /* Extra days get reinforcement, not more new content. */
    var REINFORCE = [
        { id: "rf-drills", focus: "Reinforcement \u2014 re-drill your two weakest objectives", min: 45, isExtra: true, tasks: [
            { tag: "drill", pri: 1, text: "Pick the two drill sets you scored lowest on and run them again. Repeat drills beat new ones.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Add anything you miss to the error log, then reread yesterday&rsquo;s entries.", href: "tools.html#errorlog" }
        ]},
        { id: "rf-lab", focus: "Reinforcement \u2014 hands-on design practice", min: 50, isExtra: true, tasks: [
            { tag: "lab", pri: 1, text: "Pick one business process and write a one-page architecture: the agents, their knowledge and tools, the platform for each (Microsoft 365 Copilot, Copilot Studio, or Foundry), ALM path, and governance controls.", href: "design-solutions.html" },
            { tag: "cards", pri: 2, text: "Flashcards: whichever deck matches what you just designed.", href: "tools.html#flashcards" }
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
            { tag: "study", pri: 1, text: "Read the home page: the three domains and their weights, and the fact that 700 is scaled, not 70%. Ten minutes, no more.", href: "index.html" },
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 1</strong> \u2014 timed, 100 minutes. You need the domain breakdown more than you need the score.", href: "practice-exam-1.html" },
            { tag: "review", pri: 1, text: "Review it immediately. There is no time to sleep on it.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Write down your weakest domain. Everything left goes there.", href: "tools.html#errorlog" }
        ]},
        { id: "cram2", focus: "Attack Plan and Design first", min: 130, tasks: [
            { tag: "study", pri: 1, text: "Read the Plan guide no matter what your scores said. Domain 1 is up to 40% of the exam on its own.", href: "plan-solutions.html" },
            { tag: "study", pri: 1, text: "Read the Design guide. Agent types, orchestration, and extensibility choices are dense and hard to guess.", href: "design-solutions.html" },
            { tag: "drill", pri: 1, text: "Run one drill from each of your two weakest domains.", href: "drills.html" },
            { tag: "cards", pri: 2, text: "Flashcards: the Plan and Design decks.", href: "tools.html#flashcards" }
        ]},
        { id: "cram3", focus: "One rehearsal, one repair, then stop", min: 120, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 3</strong> \u2014 timed, under real conditions.", href: "practice-exam-3.html" },
            { tag: "review", pri: 1, text: "Review every miss and read every explanation.", href: "practice-exam-3.html" },
            { tag: "cards", pri: 2, text: "One fast sweep through all three flashcard decks.", href: "tools.html#flashcards" },
            { tag: "logistics", pri: 1, text: "Stop studying by 8:00 pm. Lay out your ID. Set two alarms.", href: "" }
        ]}
    ];

    AB1.BLOCK_COUNT = HEAD.length + MID.length + TAIL.length;

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
        var extra = n - AB1.BLOCK_COUNT;
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
    AB1.plan = function () {
        var n = AB1.planLength();
        var key = n + "|" + AB1.examISO();
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

    AB1.planTaskCount = function () {
        var p = AB1.plan(), n = 0;
        for (var i = 0; i < p.length; i++) n += p[i].tasks.length;
        return n;
    };

    /* Which plan day holds a given practice exam, so other pages can
       print the scheduled date next to each exam card. The first day that
       links to an exam is the day it is taken; later links are review days. */
    AB1.examSchedule = function () {
        var p = AB1.plan(), out = { exam1: null, exam2: null, exam3: null };
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
    AB1.initTheme = function () {
        var saved = AB1.store.get("theme", null);
        var prefersDark = global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
    };

    AB1.toggleTheme = function () {
        var cur = document.documentElement.getAttribute("data-theme");
        var next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        AB1.store.set("theme", next);
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
        { href: "plan-solutions.html", label: "1 &middot; Plan" },
        { href: "design-solutions.html", label: "2 &middot; Design" },
        { href: "deploy-solutions.html", label: "3 &middot; Deploy" },
        { href: "drills.html", label: "Drills" },
        { href: "exams.html", label: "Exams" },
        { href: "tools.html", label: "Tools" }
    ];

    function currentFile() {
        var p = global.location.pathname.split("/").pop();
        return (!p || p === "") ? "index.html" : p;
    }

    AB1.renderTopbar = function () {
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

        var set = AB1.hasExamDate();
        var left = AB1.daysLeft();
        var pill;
        if (!set) {
            pill = '<a class="countdown-pill" href="index.html#examdate" ' +
                'title="Pick your exam date and the whole site recalculates">Set your exam date</a>';
        } else if (AB1.isPast()) {
            pill = '<a class="countdown-pill" href="index.html#examdate" ' +
                'title="Change your exam date">Exam date passed</a>';
        } else {
            pill = '<a class="countdown-pill" href="index.html#examdate" title="Exam day: ' +
                AB1.fmtLong(AB1.examDate()) + '. Click to change."><b>' + left + "</b> day" +
                (left === 1 ? "" : "s") + " left</a>";
        }

        var sub = set ? AB1.fmtShort(AB1.examDate()) : "no date set";
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";

        host.className = "topbar";
        host.innerHTML =
            '<div class="topbar-inner">' +
            '<a class="brand" href="index.html"><span class="brand-mark">AB</span>' +
            '<span>AB-100 Exam Prep <span class="brand-sub">' + sub + "</span></span></a>" +
            '<nav class="nav" id="mainNav" aria-label="Main">' + links + "</nav>" +
            '<div style="margin-left:auto;display:flex;align-items:center;gap:.5rem">' + pill +
            '<button class="icon-btn" id="themeBtn" type="button" aria-label="' +
            (isDark ? "Switch to light mode" : "Switch to dark mode") + '">' + (isDark ? "\u2600" : "\u263D") + "</button>" +
            '<button class="icon-btn nav-toggle" id="navBtn" type="button" aria-label="Toggle menu" aria-expanded="false">\u2261</button>' +
            "</div></div>";

        document.getElementById("themeBtn").addEventListener("click", AB1.toggleTheme);
        var navBtn = document.getElementById("navBtn");
        navBtn.addEventListener("click", function () {
            var nav = document.getElementById("mainNav");
            var open = nav.classList.toggle("open");
            navBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    };

    AB1.renderFooter = function () {
        var host = document.getElementById("footer");
        if (!host) return;
        host.className = "footer";
        host.innerHTML = '<div class="wrap">' +
            "<p>An independent study site for Microsoft Exam AB-100, Agentic AI Business Solutions Architect, built to the " +
            AB1.SKILLS_DATE + " skills-measured objectives (facts checked " + AB1.VERIFIED_DATE + "). Every question, " +
            "explanation, and flashcard here is original practice material and is not affiliated with or endorsed by Microsoft.</p>" +
            '<p class="faint">The real exam is scored on a scaled 1\u20131000 range with 700 to pass. Microsoft states that 700 ' +
            "<strong>may not equal 70%</strong> of the points and does not publish the conversion, so this site never " +
            "estimates a scaled score. Practice results are shown as percent correct against this site&rsquo;s own study " +
            "targets. Always check the current " +
            '<a href="' + AB1.LINKS.guide + '" rel="noopener">official study guide</a> and ' +
            '<a href="' + AB1.LINKS.exam + '" rel="noopener">exam page</a> before your exam. Your exam date, progress, and notes are ' +
            "saved in this browser only.</p>" +
            "</div>";
    };

    /* ============================================================
       The exam-date picker, reused on every page that needs it
       ============================================================ */
    AB1.renderDatePicker = function (host, opts) {
        if (!host) return;
        opts = opts || {};
        var set = AB1.hasExamDate();
        var iso = AB1.examISO();
        var min = AB1.toISO(AB1.today());

        var head = set
            ? "<h3 style=\"margin-top:0\">Your exam date</h3>"
            : "<h3 style=\"margin-top:0\">Start here: when is your exam?</h3>";

        var body = set
            ? "<p>Everything on this site is calculated from this one date \u2014 the countdown, the length of " +
              "your study plan, the date on every task, and when each practice exam lands. Change it and " +
              "the whole plan rebuilds.</p>"
            : "<p>Pick the day you are sitting AB-100. The study plan, the countdown, and the practice-exam " +
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
            var qd = AB1.today();
            qd.setDate(qd.getDate() + quick[i].d);
            qh += '<button class="btn ghost sm" type="button" data-iso="' + AB1.toISO(qd) + '">' +
                quick[i].label + "</button>";
        }
        document.getElementById("quickDates").innerHTML = qh;

        function summary() {
            var box = document.getElementById("dateSummary");
            var val = document.getElementById("examDateInput").value;
            var d = AB1.parseISO(val);
            if (!d) { box.innerHTML = '<p class="muted" style="margin-bottom:0">Pick a valid date.</p>'; return; }
            var days = Math.round((startOfDay(d) - AB1.today()) / DAY_MS);
            if (days < 0) {
                box.innerHTML = '<div class="callout warn" style="margin-bottom:0">' +
                    '<span class="callout-title">That date is in the past</span>' +
                    '<p style="margin-bottom:0">Pick today or later so the plan has somewhere to go.</p></div>';
                return;
            }
            var planN = Math.min(AB1.MAX_PLAN_DAYS, Math.max(1, days));
            var runway = Math.max(0, days - planN);
            var shape = planN <= 3
                ? "a compressed triage plan"
                : (planN < AB1.BLOCK_COUNT
                    ? "a condensed plan with combined study days"
                    : "the full plan with reinforcement days built in");
            var msg = "<p><strong>" + AB1.fmtLong(d) + "</strong> is <strong>" + days +
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
            if (!AB1.setExamDate(val)) { AB1.toast("Pick a valid date first."); return; }
            AB1.toast("Exam date saved. Rebuilding your plan\u2026");
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
                    AB1.clearExamDate();
                    global.location.reload();
                }
            });
        }
        summary();
    };

    /* A compact banner for pages other than the home page. */
    AB1.renderDateBanner = function (host) {
        if (!host) return;
        if (AB1.hasExamDate() && !AB1.isPast()) { host.innerHTML = ""; return; }
        var msg = AB1.hasExamDate()
            ? "<span class=\"callout-title\">Your exam date has passed</span>" +
              "<p style=\"margin-bottom:0\">The plan below is still showing the old schedule. " +
              "<a href=\"index.html#examdate\">Set a new exam date</a> to rebuild it.</p>"
            : "<span class=\"callout-title\">No exam date set yet</span>" +
              "<p style=\"margin-bottom:0\">Everything here is currently using a default " +
              AB1.DEFAULT_LEAD_DAYS + "-day window. " +
              "<a href=\"index.html#examdate\">Pick your real exam date</a> and the countdown, the plan " +
              "length, and every date on the site recalculate around it.</p>";
        host.innerHTML = '<div class="callout warn">' + msg + "</div>";
    };

    /* ---------- toast ---------- */
    var toastEl = null, toastTimer = null;
    AB1.toast = function (msg, ms) {
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
    AB1.fillMeter = function (el, pct) {
        if (!el) return;
        var bar = el.tagName === "I" ? el : el.querySelector("i");
        if (!bar) return;
        var v = Math.max(0, Math.min(100, pct)) / 100;
        global.requestAnimationFrame(function () { bar.style.transform = "scaleX(" + v + ")"; });
    };

    AB1.autoFillMeters = function (root) {
        var nodes = (root || document).querySelectorAll("[data-pct]");
        for (var i = 0; i < nodes.length; i++) {
            AB1.fillMeter(nodes[i], parseFloat(nodes[i].getAttribute("data-pct")) || 0);
        }
    };

    /* ---------- persistent checkboxes ---------- */
    AB1.bindPersistentChecks = function (storeKey, root) {
        var state = AB1.store.get(storeKey, {});
        var boxes = (root || document).querySelectorAll('input[type="checkbox"][data-key]');
        for (var i = 0; i < boxes.length; i++) {
            (function (box) {
                var k = box.getAttribute("data-key");
                if (state[k]) box.checked = true;
                box.addEventListener("change", function () {
                    var s = AB1.store.get(storeKey, {});
                    if (box.checked) { s[k] = 1; } else { delete s[k]; }
                    AB1.store.set(storeKey, s);
                    if (typeof AB1.onCheckChange === "function") AB1.onCheckChange(s);
                });
            })(boxes[i]);
        }
        return state;
    };

    /* ---------- misc helpers ---------- */
    AB1.escapeHtml = function (s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };

    var LETTERS = ["A", "B", "C", "D", "E", "F"];
    AB1.letters = function () { return LETTERS; };

    AB1.pluralize = function (n, word) { return n + " " + word + (n === 1 ? "" : "s"); };

    /* ---------- boot ---------- */
    AB1.initTheme();
    document.addEventListener("DOMContentLoaded", function () {
        AB1.renderTopbar();
        AB1.renderFooter();
        AB1.autoFillMeters(document);
    });

})(window);
