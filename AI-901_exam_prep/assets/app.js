/* ============================================================
   AI-901 Exam Prep  |  shared app script
   Everything on the site is calculated from one number: the
   exam date the user picks. Change it and the countdown, the
   study plan length, every day's date, and the practice-exam
   schedule all recompute.
   ============================================================ */
(function (global) {
    "use strict";

    var AI9 = global.AI9 = global.AI9 || {};

    /* ---------- core facts about the exam ---------- */
    AI9.EXAM_CODE = "AI-901";
    AI9.EXAM_NAME = "Microsoft Azure AI Fundamentals";
    AI9.PASS_SCORE = 700;
    AI9.SCALE_MIN = 1;
    AI9.SCALE_MAX = 1000;
    AI9.EXAM_MINUTES = 45;
    AI9.SEAT_MINUTES = 60;
    AI9.QUESTION_RANGE = "40\u201360";
    AI9.PRACTICE_QUESTIONS = 50;
    AI9.PRACTICE_MINUTES = 45;
    AI9.SKILLS_DATE = "April 15, 2026";

    /* The two skill areas, with the published weight ranges and the
       question counts this site uses on a 50-question practice exam.
       AI-901 is only two areas, and the second is more than half the exam. */
    AI9.DOMAINS = [
        { id: "concepts", num: "1", short: "AI Concepts",
          name: "AI Concepts and Capabilities",
          full: "Identify AI concepts and capabilities",
          weight: "40\u201345%", pct: 42, q: 21, page: "workloads.html", cls: "teal" },
        { id: "foundry", num: "2", short: "Building on Foundry",
          name: "Building AI Solutions with Foundry",
          full: "Implement AI solutions by using Microsoft Foundry",
          weight: "55\u201360%", pct: 58, q: 29, page: "foundry.html", cls: "bad" }
    ];

    /* The sub-areas inside each skill area. These are what the site tags
       questions with, because "58% of the exam" is too coarse to study from. */
    AI9.TOPICS = [
        { id: "responsible", name: "Responsible AI", domain: "concepts",
          obj: ["1.1"], q: 7, weight: "40\u201345%", page: "responsible-ai.html", cls: "teal" },
        { id: "models", name: "Models and Deployment", domain: "concepts",
          obj: ["1.2"], q: 7, weight: "40\u201345%", page: "models.html", cls: "teal" },
        { id: "workloads", name: "AI Workloads", domain: "concepts",
          obj: ["1.3"], q: 7, weight: "40\u201345%", page: "workloads.html", cls: "teal" },
        { id: "apps", name: "Generative AI Apps and Agents", domain: "foundry",
          obj: ["2.1"], q: 10, weight: "55\u201360%", page: "agents.html", cls: "bad" },
        { id: "textspeech", name: "Text and Speech", domain: "foundry",
          obj: ["2.2"], q: 7, weight: "55\u201360%", page: "text-speech.html", cls: "amber" },
        { id: "vision", name: "Vision and Image Generation", domain: "foundry",
          obj: ["2.3"], q: 6, weight: "55\u201360%", page: "vision.html", cls: "good" },
        { id: "extraction", name: "Information Extraction", domain: "foundry",
          obj: ["2.4"], q: 6, weight: "55\u201360%", page: "content-understanding.html", cls: "" }
    ];

    AI9.topicByName = function (name) {
        for (var i = 0; i < AI9.TOPICS.length; i++) {
            if (AI9.TOPICS[i].name === name) return AI9.TOPICS[i];
        }
        return null;
    };

    AI9.domainById = function (id) {
        for (var i = 0; i < AI9.DOMAINS.length; i++) {
            if (AI9.DOMAINS[i].id === id) return AI9.DOMAINS[i];
        }
        return null;
    };

    /* The objective codes used to tag every question on the site. */
    AI9.OBJECTIVES = {
        "1.1": "Describe principles of responsible AI",
        "1.2": "Identify AI model components and configurations",
        "1.3": "Identify AI workloads",
        "2.1": "Implement generative AI apps and agents by using Foundry",
        "2.2": "Implement AI solutions for text and speech by using Foundry",
        "2.3": "Implement AI solutions with computer vision and image-generation capabilities",
        "2.4": "Implement AI solutions for information extraction by using Foundry"
    };

    /* ---------- raw percent -> scaled score ----------
       Microsoft reports AI-901 on a 1-1000 scale and passes at 700, but has
       never published the raw-to-scaled conversion, and the live exam weights
       questions by difficulty. This curve is anchored on the two public facts:
       the range and the 700 pass mark, with 70% correct landing exactly on 700.
       Treat the output as a readiness signal, not an official score.        */
    var CURVE = [
        [0, 100], [10, 180], [20, 260], [30, 340], [40, 420], [50, 500],
        [60, 600], [65, 650], [70, 700], [75, 750], [80, 800],
        [85, 850], [90, 900], [95, 950], [100, 1000]
    ];

    AI9.PASS_PCT = 70;

    AI9.pctToScaled = function (pct) {
        var p = Math.max(0, Math.min(100, pct));
        for (var i = 1; i < CURVE.length; i++) {
            if (p <= CURVE[i][0]) {
                var lo = CURVE[i - 1], hi = CURVE[i];
                var span = hi[0] - lo[0];
                var t = span === 0 ? 0 : (p - lo[0]) / span;
                return Math.round(lo[1] + t * (hi[1] - lo[1]));
            }
        }
        return AI9.SCALE_MAX;
    };

    AI9.rawToScaled = function (right, total) {
        if (!total) return AI9.SCALE_MIN;
        return AI9.pctToScaled((right / total) * 100);
    };

    AI9.passMark = function () { return AI9.PASS_SCORE; };
    AI9.passPct = function () { return AI9.PASS_PCT; };
    AI9.correctNeeded = function (total) {
        return Math.ceil(total * AI9.PASS_PCT / 100);
    };

    AI9.verdict = function (scaled) {
        if (scaled >= 800) return { label: "Comfortably passing", cls: "good" };
        if (scaled >= AI9.PASS_SCORE) return { label: "Passing", cls: "good" };
        if (scaled >= 620) return { label: "Just short", cls: "amber" };
        return { label: "Not there yet", cls: "bad" };
    };

    /* ---------- storage ---------- */
    var PREFIX = "ai901:";
    AI9.store = {
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

    AI9.DEFAULT_LEAD_DAYS = 21;   // used when nothing has been chosen yet
    AI9.MAX_PLAN_DAYS = 45;       // longest plan the generator will build
    AI9.today = function () { return startOfDay(new Date()); };

    AI9.parseISO = function (s) {
        if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return null;
        var p = String(s).split("-");
        var d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
        return isNaN(d.getTime()) ? null : d;
    };

    AI9.toISO = function (d) {
        function pad(n) { return (n < 10 ? "0" : "") + n; }
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    };

    /* The stored value, or null if the user has not chosen one yet. */
    AI9.storedExamISO = function () {
        var v = AI9.store.get("examDate", null);
        return AI9.parseISO(v) ? v : null;
    };

    AI9.hasExamDate = function () { return !!AI9.storedExamISO(); };

    /* Always returns a usable date. Falls back to a default so that every
       page renders sensibly before the user has picked anything. */
    AI9.examDate = function () {
        var iso = AI9.storedExamISO();
        if (iso) return AI9.parseISO(iso);
        var d = AI9.today();
        d.setDate(d.getDate() + AI9.DEFAULT_LEAD_DAYS);
        return d;
    };

    AI9.examISO = function () { return AI9.toISO(AI9.examDate()); };

    AI9.setExamDate = function (iso) {
        var d = AI9.parseISO(iso);
        if (!d) return false;
        AI9.store.set("examDate", AI9.toISO(d));
        planCache = null;
        return true;
    };

    AI9.clearExamDate = function () {
        AI9.store.remove("examDate");
        planCache = null;
    };

    /* Whole days between today and exam day. 0 means the exam is today. */
    AI9.daysLeft = function () {
        return Math.max(0, Math.round((startOfDay(AI9.examDate()) - AI9.today()) / DAY_MS));
    };

    AI9.isPast = function () {
        return (startOfDay(AI9.examDate()) - AI9.today()) < 0;
    };

    /* Study days available: today through the day before the exam. */
    AI9.studyDaysAvailable = function () { return Math.max(1, AI9.daysLeft()); };

    /* Plan length, capped so a very distant exam does not produce a
       200-day wall of tasks. */
    AI9.planLength = function () {
        return Math.min(AI9.MAX_PLAN_DAYS, AI9.studyDaysAvailable());
    };

    /* The plan always ends the day before the exam. */
    AI9.planStart = function () {
        var d = startOfDay(AI9.examDate());
        d.setDate(d.getDate() - AI9.planLength());
        return d;
    };

    /* Days of runway before the plan begins, when the exam is far out. */
    AI9.runwayDays = function () {
        return Math.max(0, AI9.studyDaysAvailable() - AI9.planLength());
    };

    AI9.currentPlanDay = function () {
        return Math.round((AI9.today() - AI9.planStart()) / DAY_MS) + 1;
    };

    AI9.dateForDay = function (n) {
        var d = new Date(AI9.planStart().getTime());
        d.setDate(d.getDate() + (n - 1));
        return d;
    };

    AI9.fmtDate = function (d) { return DAYS[d.getDay()] + ", " + MONS[d.getMonth()] + " " + d.getDate(); };
    AI9.fmtShort = function (d) { return MONS[d.getMonth()] + " " + d.getDate(); };
    AI9.fmtLong = function (d) {
        return DAYS[d.getDay()] + ", " + MONS_LONG[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    };
    AI9.dayName = function (d) { return DAYS[d.getDay()]; };

    AI9.fmtClock = function (totalSeconds) {
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
            { tag: "study", pri: 1, text: "Read the home page: the two skill areas, how they are weighted, and why more than half the exam is hands-on Foundry work. Ten minutes here changes how you read every question after it.", href: "index.html" },
            { tag: "logistics", pri: 2, text: "Confirm your exam booking: date, time, and whether you are testing at a center or online with a proctor. If you are testing online, run the system check <em>today</em>, not the night before.", href: "" },
            { tag: "lab", pri: 1, text: "Create a free Azure account and open the Foundry portal. You cannot pass an exam that is 58% implementation by only reading about it. Get the portal open today.", href: "foundry.html#portal" }
        ]},
        { id: "baseline", focus: "Practice Exam 1, cold", min: 90, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 1</strong> \u2014 50 questions, 45 minutes, timed, phone in another room. Take it <em>before</em> you read a single guide.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Write down your scaled score and all seven topic percentages. That table is the map for the rest of the plan.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 2, text: "Do <em>not</em> review it today. Close the laptop. You will see twice as much tomorrow morning.", href: "" }
        ]},
        { id: "repair1", focus: "Review Exam 1 and start the error log", min: 75, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every missed question from Exam 1, and read the explanation on the ones you guessed right too. A lucky guess is not knowledge.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Log every miss and tag its cause: never knew the fact, knew it and read past it, or misread the question. Three causes, three different fixes.", href: "tools.html#errorlog" },
            { tag: "logistics", pri: 2, text: "Write your two weakest topics at the top of the error log. The next few days are built around them.", href: "tools.html#errorlog" }
        ]}
    ];

    var MID = [
        { id: "m-responsible", focus: "Responsible AI \u2014 the six principles", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the Responsible AI guide. Six principles, and the exam gives you a scenario and asks which one applies. Learn the giveaway word for each.", href: "responsible-ai.html" },
            { tag: "drill", pri: 1, text: "Drill: The Six Responsible AI Principles", href: "drills.html?set=d1-responsible" },
            { tag: "cards", pri: 2, text: "Flashcards: the Responsible AI deck. These are free points and people still lose them.", href: "tools.html#flashcards" }
        ]},
        { id: "m-models", focus: "How generative models actually work", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the Models guide through the end of the tokens and inference section: what a token is, how a completion is produced, and what the context window limits.", href: "models.html" },
            { tag: "drill", pri: 1, text: "Drill: How Generative Models Work", href: "drills.html?set=d1-models" },
            { tag: "cards", pri: 2, text: "Flashcards: the Model Fundamentals deck, first pass.", href: "tools.html#flashcards" }
        ]},
        { id: "m-modelchoice", focus: "Choosing a model, and deploying it", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the model selection and deployment sections. The exam repeatedly gives you a scenario and four models, or four deployment types, and asks which fits.", href: "models.html#choosing" },
            { tag: "drill", pri: 1, text: "Drill: Choosing the Right Model", href: "drills.html?set=d1-modelchoice" },
            { tag: "drill", pri: 2, text: "Drill: Deployment Options &amp; Configuration", href: "drills.html?set=d1-deployment" },
            { tag: "lab", pri: 2, text: "In the Foundry portal, deploy a chat model and open it in the playground. Change the temperature and watch the output change. Five minutes, and it makes the settings permanent.", href: "foundry.html#deploy" }
        ]},
        { id: "m-workloads", focus: "Naming the workload from a business problem", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the AI Workloads guide. Learn to hear a business problem and name the workload in one move \u2014 generative, agentic, text analysis, speech, vision, or information extraction.", href: "workloads.html" },
            { tag: "drill", pri: 1, text: "Drill: Matching a Business Problem to an AI Workload", href: "drills.html?set=d1-workloads" },
            { tag: "drill", pri: 2, text: "Drill: Text Analysis Techniques", href: "drills.html?set=d1-textanalysis" },
            { tag: "cards", pri: 3, text: "Flashcards: the AI Workloads deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-prompts", focus: "Prompt engineering \u2014 system and user prompts", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the prompting section of the Foundry guide. System message versus user prompt, being specific about format, and few-shot examples.", href: "foundry.html#prompts" },
            { tag: "drill", pri: 1, text: "Drill: System Prompts &amp; Prompt Engineering", href: "drills.html?set=d2-prompts" },
            { tag: "lab", pri: 2, text: "In the playground, give a model a deliberately vague prompt, then rewrite it with a system message and a format instruction. Keep both outputs side by side.", href: "foundry.html#prompts" }
        ]},
        { id: "m-portal", focus: "The Foundry portal \u2014 projects, deployments, playgrounds", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the Foundry platform guide: what a project is, what lives inside it, and how you get from the model catalog to a working deployment.", href: "foundry.html" },
            { tag: "drill", pri: 1, text: "Drill: The Foundry Portal &amp; Projects", href: "drills.html?set=d2-portal" },
            { tag: "cards", pri: 2, text: "Flashcards: the Foundry Platform deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-sdk", focus: "The Foundry SDK \u2014 a chat client in a dozen lines", min: 80, tasks: [
            { tag: "study", pri: 1, text: "Read the SDK section. You do not need to write Python from scratch on the exam, but you do need to read a snippet and say what it does and what is missing.", href: "foundry.html#sdk" },
            { tag: "drill", pri: 1, text: "Drill: The Foundry SDK &amp; Chat Clients", href: "drills.html?set=d2-sdk" },
            { tag: "lab", pri: 2, text: "Run the minimal chat client end to end against your own deployment. Getting the endpoint, credential, and deployment name right once is worth more than reading it five times.", href: "foundry.html#sdk" }
        ]},
        { id: "m-agents1", focus: "Agents \u2014 what they are and what they are made of", min: 80, tasks: [
            { tag: "study", pri: 1, text: "Read the Agents guide through the anatomy section: model, instructions, tools, and knowledge, plus threads, messages, and runs.", href: "agents.html" },
            { tag: "drill", pri: 1, text: "Drill: Agent Anatomy \u2014 Instructions, Tools &amp; Conversations", href: "drills.html?set=d2-agents" },
            { tag: "cards", pri: 2, text: "Flashcards: the Agents deck, first half.", href: "tools.html#flashcards" }
        ]},
        { id: "m-agents2", focus: "Agent tools, and building one", min: 80, tasks: [
            { tag: "study", pri: 1, text: "Read the agent tools section. Knowing which tool answers which need is the single most testable thing in this part of the exam.", href: "agents.html#tools" },
            { tag: "drill", pri: 1, text: "Drill: Agent Tools &amp; Grounding", href: "drills.html?set=d2-agenttools" },
            { tag: "lab", pri: 1, text: "Build a single agent in the portal: give it instructions, attach one tool, and test it. This is literally an exam objective \u2014 do it once and it stops being abstract.", href: "agents.html#building" },
            { tag: "cards", pri: 3, text: "Flashcards: the rest of the Agents deck.", href: "tools.html#flashcards" }
        ]},
        { id: "exam2", focus: "Practice Exam 2 \u2014 midpoint checkpoint", min: 105, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 2</strong> \u2014 50 questions, 45 minutes, timed. Start in the morning while you are fresh.", href: "practice-exam-2.html" },
            { tag: "exam", pri: 1, text: "Take a real break afterward. An hour minimum, out of the house if you can.", href: "" },
            { tag: "logistics", pri: 2, text: "Record the scaled score next to your Exam 1 number. You are looking for movement in the two topics you targeted, not a higher total.", href: "tools.html#errorlog" }
        ]},
        { id: "repair2", focus: "Review Exam 2 and re-aim", min: 80, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every miss from Exam 2, including the lucky guesses.", href: "practice-exam-2.html" },
            { tag: "logistics", pri: 1, text: "Compare the Exam 1 and Exam 2 topic percentages. Anything weak on <em>both</em> is a real gap. Anything that fixed itself was a fluke.", href: "tools.html#errorlog" },
            { tag: "logistics", pri: 2, text: "Count how many misses were &ldquo;knew it but read past it.&rdquo; If that number is high, your problem is pacing and care, and more studying will not touch it.", href: "tools.html#errorlog" },
            { tag: "drill", pri: 3, text: "Re-run the drill for your weakest topic. A repeated drill is worth more than a new one.", href: "drills.html" }
        ]},
        { id: "m-text", focus: "Text analysis and language capabilities", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the Text and Speech guide through the text analysis section: keyword extraction, entity detection, sentiment analysis, and summarization.", href: "text-speech.html" },
            { tag: "drill", pri: 1, text: "Drill: Text Analysis in Practice", href: "drills.html?set=d2-text" },
            { tag: "cards", pri: 2, text: "Flashcards: the Text, Speech &amp; Vision deck, first half.", href: "tools.html#flashcards" }
        ]},
        { id: "m-speech", focus: "Speech \u2014 recognition, synthesis, and spoken prompts", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the speech section: speech to text, text to speech, and what it means to answer a spoken prompt with a multimodal model.", href: "text-speech.html#speech" },
            { tag: "drill", pri: 1, text: "Drill: Speech Recognition &amp; Synthesis", href: "drills.html?set=d2-speech" },
            { tag: "cards", pri: 2, text: "Flashcards: the rest of the Text, Speech &amp; Vision deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-vision", focus: "Vision \u2014 images into prompts", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the Vision guide. A multimodal model takes an image as part of the prompt \u2014 understand what that replaces and what it does not.", href: "vision.html" },
            { tag: "drill", pri: 1, text: "Drill: Multimodal Vision Input", href: "drills.html?set=d2-vision" },
            { tag: "lab", pri: 2, text: "Drop an image into the playground with a question about it. Then ask the same question about a chart. The difference in quality is the lesson.", href: "vision.html#multimodal" }
        ]},
        { id: "m-imagegen", focus: "Generating images", min: 65, tasks: [
            { tag: "study", pri: 1, text: "Read the image generation section: which models generate images, what you control, and the responsible AI rules that apply to generated visuals.", href: "vision.html#generation" },
            { tag: "drill", pri: 1, text: "Drill: Image Generation", href: "drills.html?set=d2-imagegen" }
        ]},
        { id: "m-extraction1", focus: "Information extraction \u2014 documents and forms", min: 75, tasks: [
            { tag: "study", pri: 1, text: "Read the Content Understanding guide through the documents section: analyzers, field schemas, and what structured extraction actually returns.", href: "content-understanding.html" },
            { tag: "drill", pri: 1, text: "Drill: Content Understanding \u2014 Documents &amp; Fields", href: "drills.html?set=d2-extraction" },
            { tag: "cards", pri: 2, text: "Flashcards: the Content Understanding deck.", href: "tools.html#flashcards" }
        ]},
        { id: "m-extraction2", focus: "Extraction across images, audio, and video", min: 70, tasks: [
            { tag: "study", pri: 1, text: "Read the multimodal extraction section. One service, four content types \u2014 know what each one is good for and what it returns.", href: "content-understanding.html#modalities" },
            { tag: "drill", pri: 1, text: "Drill: Extraction from Images, Audio &amp; Video", href: "drills.html?set=d2-multimodal" },
            { tag: "lab", pri: 2, text: "Run one document through an analyzer in the portal and look at the JSON it returns. Seeing the shape of the output once is worth a page of description.", href: "content-understanding.html#building" }
        ]}
    ];

    var TAIL = [
        { id: "exam3", focus: "Practice Exam 3 \u2014 dress rehearsal", min: 90, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 3</strong> \u2014 the hardest of the three. Start at the exact clock time your real exam starts. Same room, same chair, same breakfast.", href: "practice-exam-3.html" },
            { tag: "logistics", pri: 1, text: "Record the scaled score. Above 750 and you are in range. 650 to 749 and a focused repair day closes it. Below 620 and the topic breakdown is the whole plan for tomorrow.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 2, text: "No review today. Rest tonight.", href: "" }
        ]},
        { id: "repair3", focus: "Final repair \u2014 nothing new after today", min: 90, isReview: true, tasks: [
            { tag: "review", pri: 1, text: "Review every miss on Exam 3, and read the explanation on all of them, not just the ones that surprised you.", href: "practice-exam-3.html" },
            { tag: "logistics", pri: 1, text: "Reread the entire error log from the top. Cross off anything you now know cold. What is left is the real study list.", href: "tools.html#errorlog" },
            { tag: "drill", pri: 2, text: "Re-drill the two weakest sets from the whole plan.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Confirm the appointment one last time: time, location or online setup, ID, and the exam code AI-901. Do this today, not tomorrow night.", href: "" }
        ]},
        { id: "taper", focus: "Taper \u2014 do not cram", min: 45, isRest: true, tasks: [
            { tag: "cards", pri: 1, text: "One relaxed sweep through all eight flashcard decks. Speed, not depth. You are keeping the machinery warm, not learning.", href: "tools.html#flashcards" },
            { tag: "study", pri: 1, text: "Read the night-before cheat sheets once each. Once. Not twice.", href: "index.html#everything" },
            { tag: "logistics", pri: 2, text: "Read the top of your error log one final time. Then close it.", href: "tools.html#errorlog" },
            { tag: "exam", pri: 1, text: "No practice questions today. None. Cramming the day before a certification exam reliably lowers scores.", href: "" },
            { tag: "logistics", pri: 2, text: "Lay out your ID. Set two alarms. Stop everything by 8:00 pm.", href: "" }
        ]}
    ];

    /* Extra days get reinforcement, not more new content. */
    var REINFORCE = [
        { id: "rf-drills", focus: "Reinforcement \u2014 re-drill your two weakest topics", min: 45, isExtra: true, tasks: [
            { tag: "drill", pri: 1, text: "Pick the two drill sets you scored lowest on and run them again. Repeat drills beat new ones.", href: "drills.html" },
            { tag: "logistics", pri: 2, text: "Add anything you miss to the error log, then reread yesterday's entries.", href: "tools.html#errorlog" }
        ]},
        { id: "rf-lab", focus: "Reinforcement \u2014 hands-on in the portal", min: 50, isExtra: true, tasks: [
            { tag: "lab", pri: 1, text: "Go back into the Foundry portal and rebuild something from memory: a deployment, an agent with a tool, or an analyzer. More than half the exam is implementation, so portal time is study time.", href: "foundry.html" },
            { tag: "cards", pri: 2, text: "Flashcards: whichever deck matches what you just built.", href: "tools.html#flashcards" }
        ]},
        { id: "rf-cards", focus: "Reinforcement \u2014 flashcard sweep", min: 35, isExtra: true, tasks: [
            { tag: "cards", pri: 1, text: "Run the &ldquo;only cards I have missed&rdquo; filter across every deck until the missed list is empty.", href: "tools.html#flashcards" },
            { tag: "study", pri: 2, text: "Reread the cheat sheet at the bottom of whichever guide you feel least sure about.", href: "index.html#everything" }
        ]},
        { id: "rf-mixed", focus: "Reinforcement \u2014 mixed recall", min: 40, isExtra: true, tasks: [
            { tag: "drill", pri: 1, text: "Run two drills from two different skill areas back to back. Switching areas is harder and closer to the real exam.", href: "drills.html" },
            { tag: "cards", pri: 2, text: "Shuffle the All Decks flashcard view and do twenty cards.", href: "tools.html#flashcards" }
        ]}
    ];

    /* A dedicated sequence for when there is almost no time left. */
    var CRAM = [
        { id: "cram1", focus: "Triage \u2014 exam shape, then a cold Practice Exam 1", min: 100, isExam: true, tasks: [
            { tag: "study", pri: 1, text: "Read the home page: the two skill areas and their weights. Ten minutes, no more.", href: "index.html" },
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 1</strong> \u2014 timed, 45 minutes. You need the topic breakdown more than you need the score.", href: "practice-exam-1.html" },
            { tag: "review", pri: 1, text: "Review it immediately. There is no time to sleep on it.", href: "practice-exam-1.html" },
            { tag: "logistics", pri: 1, text: "Write down your two weakest topics. Everything left goes there.", href: "tools.html#errorlog" }
        ]},
        { id: "cram2", focus: "Attack Foundry first \u2014 it is most of the exam", min: 120, tasks: [
            { tag: "study", pri: 1, text: "Read the Foundry and Agents guides no matter what your scores said. Skill area 2 is up to 60% of the exam and it is where unprepared candidates lose.", href: "foundry.html" },
            { tag: "study", pri: 1, text: "Read the guides for your two weakest topics. Read the tables and the cheat sheet; skip the prose if you must.", href: "index.html#everything" },
            { tag: "drill", pri: 1, text: "Run one drill from each of your two weakest topics.", href: "drills.html" },
            { tag: "cards", pri: 2, text: "Flashcards: the Foundry Platform and Agents decks.", href: "tools.html#flashcards" }
        ]},
        { id: "cram3", focus: "One rehearsal, one repair, then stop", min: 110, isExam: true, tasks: [
            { tag: "exam", pri: 1, text: "<strong>Practice Exam 3</strong> \u2014 timed, under real conditions.", href: "practice-exam-3.html" },
            { tag: "review", pri: 1, text: "Review every miss and read every explanation.", href: "practice-exam-3.html" },
            { tag: "cards", pri: 2, text: "One fast sweep through all eight flashcard decks.", href: "tools.html#flashcards" },
            { tag: "logistics", pri: 1, text: "Stop studying by 8:00 pm. Lay out your ID. Set two alarms.", href: "" }
        ]}
    ];

    AI9.BLOCK_COUNT = HEAD.length + MID.length + TAIL.length;

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
        var extra = n - AI9.BLOCK_COUNT;
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
    AI9.plan = function () {
        var n = AI9.planLength();
        var key = n + "|" + AI9.examISO();
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

    AI9.planTaskCount = function () {
        var p = AI9.plan(), n = 0;
        for (var i = 0; i < p.length; i++) n += p[i].tasks.length;
        return n;
    };

    /* Which plan day holds a given practice exam, so other pages can
       print the scheduled date next to each exam card. The first day that
       links to an exam is the day it is taken; later links are review days. */
    AI9.examSchedule = function () {
        var p = AI9.plan(), out = { exam1: null, exam2: null, exam3: null };
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
    AI9.initTheme = function () {
        var saved = AI9.store.get("theme", null);
        var prefersDark = global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
    };

    AI9.toggleTheme = function () {
        var cur = document.documentElement.getAttribute("data-theme");
        var next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        AI9.store.set("theme", next);
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
        { href: "responsible-ai.html", label: "Responsible AI" },
        { href: "models.html", label: "Models" },
        { href: "workloads.html", label: "Workloads" },
        { href: "foundry.html", label: "Foundry" },
        { href: "agents.html", label: "Agents" },
        { href: "text-speech.html", label: "Text &amp; Speech" },
        { href: "vision.html", label: "Vision" },
        { href: "content-understanding.html", label: "Extraction" },
        { href: "drills.html", label: "Drills" },
        { href: "exams.html", label: "Exams" },
        { href: "tools.html", label: "Tools" }
    ];

    function currentFile() {
        var p = global.location.pathname.split("/").pop();
        return (!p || p === "") ? "index.html" : p;
    }

    AI9.renderTopbar = function () {
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

        var set = AI9.hasExamDate();
        var left = AI9.daysLeft();
        var pill;
        if (!set) {
            pill = '<a class="countdown-pill" href="index.html#examdate" ' +
                'title="Pick your exam date and the whole site recalculates">Set your exam date</a>';
        } else if (AI9.isPast()) {
            pill = '<a class="countdown-pill" href="index.html#examdate" ' +
                'title="Change your exam date">Exam date passed</a>';
        } else {
            pill = '<a class="countdown-pill" href="index.html#examdate" title="Exam day: ' +
                AI9.fmtLong(AI9.examDate()) + '. Click to change."><b>' + left + "</b> day" +
                (left === 1 ? "" : "s") + " left</a>";
        }

        var sub = set ? AI9.fmtShort(AI9.examDate()) : "no date set";
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";

        host.className = "topbar";
        host.innerHTML =
            '<div class="topbar-inner">' +
            '<a class="brand" href="index.html"><span class="brand-mark">AI</span>' +
            '<span>AI-901 Exam Prep <span class="brand-sub">' + sub + "</span></span></a>" +
            '<nav class="nav" id="mainNav" aria-label="Main">' + links + "</nav>" +
            '<div style="margin-left:auto;display:flex;align-items:center;gap:.5rem">' + pill +
            '<button class="icon-btn" id="themeBtn" type="button" aria-label="' +
            (isDark ? "Switch to light mode" : "Switch to dark mode") + '">' + (isDark ? "\u2600" : "\u263D") + "</button>" +
            '<button class="icon-btn nav-toggle" id="navBtn" type="button" aria-label="Toggle menu" aria-expanded="false">\u2261</button>' +
            "</div></div>";

        document.getElementById("themeBtn").addEventListener("click", AI9.toggleTheme);
        var navBtn = document.getElementById("navBtn");
        navBtn.addEventListener("click", function () {
            var nav = document.getElementById("mainNav");
            var open = nav.classList.toggle("open");
            navBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    };

    AI9.renderFooter = function () {
        var host = document.getElementById("footer");
        if (!host) return;
        host.className = "footer";
        host.innerHTML = '<div class="wrap">' +
            "<p>An independent study site for Microsoft Exam AI-901, Azure AI Fundamentals, built to the " +
            AI9.SKILLS_DATE + " skills-measured objectives. Every question, explanation, and flashcard here " +
            "is original practice material and is not affiliated with or endorsed by Microsoft.</p>" +
            '<p class="faint">Scaled scores are readiness estimates anchored on the published 1\u20131000 range and the ' +
            "700 passing mark. They are not official Microsoft scores. Cloud products change quickly \u2014 always " +
            "check the current <a href=\"https://learn.microsoft.com/credentials/certifications/resources/study-guides/ai-901\" " +
            "rel=\"noopener\">official study guide</a> before your exam. Your exam date, progress, and notes are " +
            "saved in this browser only.</p>" +
            "</div>";
    };

    /* ============================================================
       The exam-date picker, reused on every page that needs it
       ============================================================ */
    AI9.renderDatePicker = function (host, opts) {
        if (!host) return;
        opts = opts || {};
        var set = AI9.hasExamDate();
        var iso = AI9.examISO();
        var min = AI9.toISO(AI9.today());

        var head = set
            ? "<h3 style=\"margin-top:0\">Your exam date</h3>"
            : "<h3 style=\"margin-top:0\">Start here: when is your exam?</h3>";

        var body = set
            ? "<p>Everything on this site is calculated from this one date \u2014 the countdown, the length of " +
              "your study plan, the date on every task, and when each practice exam lands. Change it and " +
              "the whole plan rebuilds.</p>"
            : "<p>Pick the day you are sitting AI-901. The study plan, the countdown, and the practice-exam " +
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
            var qd = AI9.today();
            qd.setDate(qd.getDate() + quick[i].d);
            qh += '<button class="btn ghost sm" type="button" data-iso="' + AI9.toISO(qd) + '">' +
                quick[i].label + "</button>";
        }
        document.getElementById("quickDates").innerHTML = qh;

        function summary() {
            var box = document.getElementById("dateSummary");
            var val = document.getElementById("examDateInput").value;
            var d = AI9.parseISO(val);
            if (!d) { box.innerHTML = '<p class="muted" style="margin-bottom:0">Pick a valid date.</p>'; return; }
            var days = Math.round((startOfDay(d) - AI9.today()) / DAY_MS);
            if (days < 0) {
                box.innerHTML = '<div class="callout warn" style="margin-bottom:0">' +
                    '<span class="callout-title">That date is in the past</span>' +
                    '<p style="margin-bottom:0">Pick today or later so the plan has somewhere to go.</p></div>';
                return;
            }
            var planN = Math.min(AI9.MAX_PLAN_DAYS, Math.max(1, days));
            var runway = Math.max(0, days - planN);
            var shape = planN <= 3
                ? "a compressed triage plan"
                : (planN < AI9.BLOCK_COUNT
                    ? "a condensed plan with combined study days"
                    : "the full plan with reinforcement days built in");
            var msg = "<p><strong>" + AI9.fmtLong(d) + "</strong> is <strong>" + days +
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
            if (!AI9.setExamDate(val)) { AI9.toast("Pick a valid date first."); return; }
            AI9.toast("Exam date saved. Rebuilding your plan\u2026");
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
                    AI9.clearExamDate();
                    global.location.reload();
                }
            });
        }
        summary();
    };

    /* A compact banner for pages other than the home page. */
    AI9.renderDateBanner = function (host) {
        if (!host) return;
        if (AI9.hasExamDate() && !AI9.isPast()) { host.innerHTML = ""; return; }
        var msg = AI9.hasExamDate()
            ? "<span class=\"callout-title\">Your exam date has passed</span>" +
              "<p style=\"margin-bottom:0\">The plan below is still showing the old schedule. " +
              "<a href=\"index.html#examdate\">Set a new exam date</a> to rebuild it.</p>"
            : "<span class=\"callout-title\">No exam date set yet</span>" +
              "<p style=\"margin-bottom:0\">Everything here is currently using a default " +
              AI9.DEFAULT_LEAD_DAYS + "-day window. " +
              "<a href=\"index.html#examdate\">Pick your real exam date</a> and the countdown, the plan " +
              "length, and every date on the site recalculate around it.</p>";
        host.innerHTML = '<div class="callout warn">' + msg + "</div>";
    };

    /* ---------- toast ---------- */
    var toastEl = null, toastTimer = null;
    AI9.toast = function (msg, ms) {
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
    AI9.fillMeter = function (el, pct) {
        if (!el) return;
        var bar = el.tagName === "I" ? el : el.querySelector("i");
        if (!bar) return;
        var v = Math.max(0, Math.min(100, pct)) / 100;
        global.requestAnimationFrame(function () { bar.style.transform = "scaleX(" + v + ")"; });
    };

    AI9.autoFillMeters = function (root) {
        var nodes = (root || document).querySelectorAll("[data-pct]");
        for (var i = 0; i < nodes.length; i++) {
            AI9.fillMeter(nodes[i], parseFloat(nodes[i].getAttribute("data-pct")) || 0);
        }
    };

    /* ---------- persistent checkboxes ---------- */
    AI9.bindPersistentChecks = function (storeKey, root) {
        var state = AI9.store.get(storeKey, {});
        var boxes = (root || document).querySelectorAll('input[type="checkbox"][data-key]');
        for (var i = 0; i < boxes.length; i++) {
            (function (box) {
                var k = box.getAttribute("data-key");
                if (state[k]) box.checked = true;
                box.addEventListener("change", function () {
                    var s = AI9.store.get(storeKey, {});
                    if (box.checked) { s[k] = 1; } else { delete s[k]; }
                    AI9.store.set(storeKey, s);
                    if (typeof AI9.onCheckChange === "function") AI9.onCheckChange(s);
                });
            })(boxes[i]);
        }
        return state;
    };

    /* ---------- misc helpers ---------- */
    AI9.escapeHtml = function (s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };

    var LETTERS = ["A", "B", "C", "D", "E", "F"];
    AI9.letters = function () { return LETTERS; };

    AI9.pluralize = function (n, word) { return n + " " + word + (n === 1 ? "" : "s"); };

    /* ---------- boot ---------- */
    AI9.initTheme();
    document.addEventListener("DOMContentLoaded", function () {
        AI9.renderTopbar();
        AI9.renderFooter();
        AI9.autoFillMeters(document);
    });

})(window);
