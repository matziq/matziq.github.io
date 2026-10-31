/* ============================================================
   AB-620 + AB-100 Exam Prep  |  shared app core (namespace ABX)
   Store, theme, date math, plan generator, calendar, ICS export,
   collapsible sections, navigation, did-you-know rotator.
   No external dependencies. Progress is saved in this browser.
   ============================================================ */
(function (global) {
    "use strict";

    var ABX = global.ABX = global.ABX || {};
    var PREFIX = "abx:";

    /* ---------- storage ---------- */
    ABX.store = {
        get: function (k, fallback) {
            try {
                var v = global.localStorage.getItem(PREFIX + k);
                return v === null ? fallback : JSON.parse(v);
            } catch (e) { return fallback; }
        },
        set: function (k, v) {
            try {
                global.localStorage.setItem(PREFIX + k, JSON.stringify(v));
                return true;
            } catch (e) {
                ABX.storageFailed = true;
                ABX.storageWarn();
                return false;
            }
        },
        remove: function (k) { try { global.localStorage.removeItem(PREFIX + k); } catch (e) { } },
        keys: function () {
            var out = [];
            try {
                for (var i = 0; i < global.localStorage.length; i++) {
                    var k = global.localStorage.key(i);
                    if (k && k.indexOf(PREFIX) === 0) out.push(k.slice(PREFIX.length));
                }
            } catch (e) { }
            return out;
        }
    };

    // Persistence check: detects blocked/full storage at load and after any failed write.
    ABX.storageOk = function () {
        try {
            var t = PREFIX + "__probe";
            global.localStorage.setItem(t, "1");
            global.localStorage.removeItem(t);
            return !ABX.storageFailed;
        } catch (e) { return false; }
    };
    ABX.storageWarn = function () {
        if (typeof document === "undefined" || !document.body) return;
        if (document.getElementById("abxStorageWarn")) return;
        var d = document.createElement("div");
        d.id = "abxStorageWarn";
        d.className = "callout trap";
        d.setAttribute("role", "alert");
        d.style.cssText = "margin:0;border-radius:0;position:sticky;top:0;z-index:60";
        d.innerHTML = '<span class="callout-title">Progress is not being saved</span><p>This browser blocked or ran out of local storage, so ' +
            "date changes, checkmarks, and practice history will be lost when you close the page. Turn off private/incognito mode, " +
            "allow site data for this site, or free up storage (Tools &rarr; Reset can clear old practice runs), then reload.</p>";
        document.body.insertBefore(d, document.body.firstChild);
    };

    /* ---------- theme ---------- */
    ABX.initTheme = function () {
        var t = ABX.store.get("theme", null);
        if (t !== "dark" && t !== "light") {
            t = (global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
        }
        document.documentElement.setAttribute("data-theme", t);
    };
    ABX.toggleTheme = function () {
        var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", cur);
        ABX.store.set("theme", cur);
        var b = document.getElementById("themeBtn");
        if (b) {
            b.textContent = cur === "dark" ? "\u2600" : "\u263D";
            b.setAttribute("aria-label", cur === "dark" ? "Switch to light mode" : "Switch to dark mode");
        }
    };

    /* ============================================================
       Exam facts (verified on Microsoft Learn, October 2026)
       ============================================================ */
    ABX.HARD_DEADLINE = "2027-03-30";   // exams must be passed BEFORE this date
    ABX.LAST_OK = "2027-03-29";         // so the last allowable exam day is March 29
    ABX.READY_PCT = 80;                 // site heuristic only, never a pass prediction

    ABX.EXAMS = {
        ab620: {
            code: "AB-620", short: "AB-620",
            name: "Designing and Building Integrated AI Solutions in Copilot Studio",
            cert: "Microsoft Certified: AI Agent Builder Associate",
            minutes: "120 minutes (certification page)",
            guide: "ab620.html", defaultDate: "2027-01-19",
            domains: [
                { name: "Plan and configure agent solutions", weight: "30\u201335", mid: 32.5 },
                { name: "Integrate and extend agents in Copilot Studio", weight: "40\u201345", mid: 42.5 },
                { name: "Test and manage agents", weight: "20\u201325", mid: 22.5 }
            ],
            groups: [
                { id: "1-1", d: 0, name: "Plan an agent solution" },
                { id: "1-2", d: 0, name: "Create and monitor agent flows" },
                { id: "1-3", d: 0, name: "Configure topics" },
                { id: "2-1", d: 1, name: "Connect to enterprise knowledge sources" },
                { id: "2-2", d: 1, name: "Add tools to agents" },
                { id: "2-3", d: 1, name: "Configure multi-agent collaboration" },
                { id: "2-4", d: 1, name: "Integrate agents with Azure" },
                { id: "3-1", d: 2, name: "Evaluate agent performance" },
                { id: "3-2", d: 2, name: "Implement ALM for agents" }
            ],
            exams: ["exam1", "exam2", "exam3"]
        },
        ab100: {
            code: "AB-100", short: "AB-100",
            name: "Agentic AI Business Solutions Architect",
            cert: "Microsoft Certified: Agentic AI Business Solutions Architect Expert",
            minutes: "Not published on the AB-100 page \u2014 confirm at registration",
            guide: "ab100.html", defaultDate: "2027-03-09",
            domains: [
                { name: "Plan AI-powered business solutions", weight: "35\u201340", mid: 37.5 },
                { name: "Design AI-powered business solutions", weight: "30\u201335", mid: 32.5 },
                { name: "Deploy AI-powered business solutions", weight: "20\u201325", mid: 22.5 }
            ],
            groups: [
                { id: "1-1", d: 0, name: "Analyze requirements" },
                { id: "1-2", d: 0, name: "Design overall AI strategy" },
                { id: "1-3", d: 0, name: "Evaluate costs and benefits" },
                { id: "2-1", d: 1, name: "Design AI and agents" },
                { id: "2-2", d: 1, name: "Design extensibility" },
                { id: "2-3", d: 1, name: "Orchestrate prebuilt agents and apps" },
                { id: "3-1", d: 2, name: "Analyze, monitor, and tune solutions" },
                { id: "3-2", d: 2, name: "Manage testing" },
                { id: "3-3", d: 2, name: "Design ALM" },
                { id: "3-4", d: 2, name: "Responsible AI, security, governance, and compliance" }
            ],
            exams: ["exam4", "exam5", "exam6"]
        }
    };
    ABX.PRACTICE = {
        exam1: { file: "practice-exam-1.html", exam: "ab620", label: "AB-620 Practice Exam 1" },
        exam2: { file: "practice-exam-2.html", exam: "ab620", label: "AB-620 Practice Exam 2" },
        exam3: { file: "practice-exam-3.html", exam: "ab620", label: "AB-620 Practice Exam 3" },
        exam4: { file: "practice-exam-4.html", exam: "ab100", label: "AB-100 Practice Exam 1" },
        exam5: { file: "practice-exam-5.html", exam: "ab100", label: "AB-100 Practice Exam 2" },
        exam6: { file: "practice-exam-6.html", exam: "ab100", label: "AB-100 Practice Exam 3" }
    };

    ABX.domainsFor = function (t) {
        var d = (ABX.EXAMS[t] || ABX.EXAMS.ab620).domains, out = [];
        for (var i = 0; i < d.length; i++) out.push({ name: d[i].name, weight: d[i].weight });
        return out;
    };
    ABX.examLabel = function (t) { return t === "ab100" ? "AB-100" : "AB-620"; };
    ABX.paceNote = function (t) {
        return t === "ab100"
            ? "The AB-100 exam page does not publish a time limit. Microsoft\u2019s exam-duration page lists 100 minutes for role-based exams without labs and 120 minutes when labs may appear; you see the exact time when you register. Practice here at about 2 minutes per question."
            : "Microsoft lists AB-620 at 120 minutes and does not publish a question count (most Microsoft exams have 40\u201360). Practice here at about 2 minutes per question so the real clock feels roomy.";
    };

    /* ============================================================
       Date-only math (local calendar dates, never UTC parsing)
       ============================================================ */
    ABX.parseYmd = function (s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || "").trim());
        if (!m) return null;
        var y = +m[1], mo = +m[2], d = +m[3];
        var dt = new Date(y, mo - 1, d);
        if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
        return dt;
    };
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    ABX.toYmd = function (dt) { return dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate()); };
    ABX.addDays = function (dt, n) { return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n); };
    ABX.addYmd = function (ymd, n) { return ABX.toYmd(ABX.addDays(ABX.parseYmd(ymd), n)); };
    ABX.daysBetween = function (a, b) {   // whole calendar days from a to b, DST-safe
        var A = typeof a === "string" ? ABX.parseYmd(a) : a, B = typeof b === "string" ? ABX.parseYmd(b) : b;
        return Math.round((Date.UTC(B.getFullYear(), B.getMonth(), B.getDate()) -
            Date.UTC(A.getFullYear(), A.getMonth(), A.getDate())) / 86400000);
    };
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var DOW_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    ABX.MONTHS = MONTHS; ABX.DOW = DOW;
    ABX.fmtLong = function (ymd) {
        var d = typeof ymd === "string" ? ABX.parseYmd(ymd) : ymd;
        if (!d) return "\u2014";
        return DOW_LONG[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    };
    ABX.fmtShort = function (ymd) {
        var d = typeof ymd === "string" ? ABX.parseYmd(ymd) : ymd;
        if (!d) return "\u2014";
        return DOW[d.getDay()] + " " + MONTHS[d.getMonth()].slice(0, 3) + " " + d.getDate();
    };
    ABX.todayYmd = function () {
        // ?today=YYYY-MM-DD lets you preview the plan as of another day (testing aid).
        var m = /[?&]today=(\d{4}-\d{2}-\d{2})/.exec(global.location.search || "");
        if (m && ABX.parseYmd(m[1])) return m[1];
        return ABX.toYmd(new Date());
    };
    ABX.fmtClock = function (sec) {
        sec = Math.max(0, Math.round(sec));
        var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
        return (h ? h + ":" + pad(m) : m) + ":" + pad(s);
    };

    /* ============================================================
       Settings
       ============================================================ */
    var DEFAULTS = { ab620: "2027-01-19", ab100: "2027-03-09", start: "2026-11-02", hours: 5, days: [1, 3, 6] };
    ABX.DEFAULTS = DEFAULTS;
    ABX.settings = function () {
        var s = ABX.store.get("settings", {}) || {};
        var out = {};
        for (var k in DEFAULTS) out[k] = DEFAULTS[k];
        if (ABX.parseYmd(s.ab620)) out.ab620 = s.ab620;
        if (ABX.parseYmd(s.ab100)) out.ab100 = s.ab100;
        if (ABX.parseYmd(s.start)) out.start = s.start;
        if (typeof s.hours === "number" && s.hours >= 1 && s.hours <= 40) out.hours = s.hours;
        if (s.days && s.days.length) {
            var d = [];
            for (var i = 0; i < s.days.length; i++) if (s.days[i] >= 0 && s.days[i] <= 6 && d.indexOf(s.days[i]) < 0) d.push(s.days[i]);
            if (d.length) out.days = d.sort();
        }
        return out;
    };
    ABX.saveSettings = function (s) { return ABX.store.set("settings", s); };

    ABX.validate = function (s) {
        s = s || ABX.settings();
        var w = [], today = ABX.todayYmd();
        var a = s.ab620, b = s.ab100;
        if (ABX.daysBetween(a, b) <= 0) w.push({ lvl: "bad", t: "AB-620 should come before AB-100. Your AB-100 date is on or before your AB-620 date, so the plan cannot sequence them." });
        if (ABX.daysBetween(b, ABX.LAST_OK) < 0) w.push({ lvl: "bad", t: "AB-100 is after March 29, 2027. Your goal is to pass both exams before March 30, 2027, so move it earlier." });
        if (ABX.daysBetween(a, ABX.LAST_OK) < 0) w.push({ lvl: "bad", t: "AB-620 is after March 29, 2027 \u2014 past your deadline." });
        if (ABX.daysBetween(today, a) < 0) w.push({ lvl: "warn", t: "Your AB-620 date is in the past. If you already took it, record the result and move on; otherwise pick a new date." });
        if (ABX.daysBetween(s.start, a) <= 7) w.push({ lvl: "warn", t: "The plan start date leaves a week or less before AB-620. Start earlier or move the exam." });
        var gap = ABX.daysBetween(a, b);
        if (gap > 0 && gap < 21) w.push({ lvl: "warn", t: "Only " + gap + " days separate the exams. If AB-620 needs a retake, it will squeeze AB-100 study time." });
        var buf = ABX.daysBetween(b, ABX.LAST_OK);
        if (buf >= 0 && buf < 1) w.push({ lvl: "bad", t: "No retake buffer: AB-100 is on the last allowable day. A failed attempt could not be retaken before the deadline." });
        else if (buf >= 1 && buf < 15) w.push({ lvl: "warn", t: "Retake buffer is " + buf + " days. That fits one AB-100 retake (24-hour wait) but not a second (14-day wait). Aim for at least 15 days." });
        else if (buf >= 15) w.push({ lvl: "ok", t: "Retake buffer: " + buf + " days after AB-100. That fits a retake after 24 hours and a second retake 14 days later, all before March 30, 2027." });
        var plan = ABX.buildPlan(s);
        if (plan.countA < 12) w.push({ lvl: "warn", t: "Only " + plan.countA + " study sessions before AB-620. Add study days, start earlier, or move the exam later." });
        if (plan.countB < 12) w.push({ lvl: "warn", t: "Only " + plan.countB + " study sessions between the exams. AB-100 is an expert-level exam \u2014 consider more time." });
        return w;
    };

    /* ============================================================
       Plan generator
       ============================================================ */
    function studyDates(fromYmd, toYmd, days) {
        var out = [], d = ABX.parseYmd(fromYmd), end = ABX.parseYmd(toYmd);
        if (!d || !end) return out;
        var guard = 0;
        while (ABX.daysBetween(d, end) >= 0 && guard++ < 800) {
            if (days.indexOf(d.getDay()) >= 0) out.push(ABX.toYmd(d));
            d = ABX.addDays(d, 1);
        }
        return out;
    }

    // Largest-remainder allocation of n slots by weights, each item at least `min`.
    function allocate(n, weights, min) {
        var k = weights.length, out = [], i;
        if (n < k * min) {
            for (i = 0; i < k; i++) out.push(i < n ? 1 : 0);
            return out;
        }
        var rest = n - k * min, tot = 0;
        for (i = 0; i < k; i++) tot += weights[i];
        var rem = [], used = 0;
        for (i = 0; i < k; i++) {
            var exact = rest * weights[i] / tot, fl = Math.floor(exact);
            out.push(min + fl); used += fl; rem.push({ i: i, r: exact - fl });
        }
        rem.sort(function (x, y) { return y.r - x.r || x.i - y.i; });
        for (i = 0; i < rest - used; i++) out[rem[i % k].i]++;
        return out;
    }

    function windowPlan(exam, dates) {
        var info = ABX.EXAMS[exam], n = dates.length, items = [];
        if (!n) return items;
        var pes = info.exams;
        var tail;
        if (n >= 16) tail = ["pe1", "rev1", "pe2", "rev2", "pe3", "taper"];
        else if (n >= 11) tail = ["pe1", "rev1", "pe3", "taper"];
        else if (n >= 6) tail = ["pe1", "taper"];
        else tail = n >= 2 ? ["taper"] : [];
        var content = n - tail.length;
        var groups = info.groups;
        var useDomainReview = content >= groups.length + 6;
        var gSlots = content - (useDomainReview ? 3 : 0);
        var seq = [];
        if (gSlots >= groups.length) {
            var weights = [];
            var perDomain = [0, 0, 0];
            for (var i = 0; i < groups.length; i++) perDomain[groups[i].d]++;
            for (i = 0; i < groups.length; i++) weights.push(info.domains[groups[i].d].mid / perDomain[groups[i].d]);
            var alloc = allocate(gSlots, weights, 1);
            for (i = 0; i < groups.length; i++) {
                var g = groups[i], c = alloc[i];
                for (var j = 0; j < c; j++) {
                    var mode = c === 1 ? "all" : (j === 0 ? "learn" : (j === c - 1 ? "drill" : (j % 2 ? "lab" : "learn2")));
                    seq.push({ kind: "group", g: g, mode: mode, part: j + 1, of: c });
                }
                var last = i === groups.length - 1 || groups[i + 1].d !== g.d;
                if (last && useDomainReview) seq.push({ kind: "domrev", d: g.d });
            }
        } else if (gSlots > 0) {
            // squeeze: spread every objective group across all available content slots
            var k = groups.length;
            for (i = 0; i < gSlots; i++) {
                var a0 = Math.floor(i * k / gSlots), a1 = Math.floor((i + 1) * k / gSlots);
                if (a1 > a0) seq.push({ kind: "multi", gs: groups.slice(a0, a1) });
            }
        }
        for (i = 0; i < tail.length; i++) seq.push({ kind: tail[i] });
        seq = seq.slice(0, n);
        for (i = 0; i < seq.length; i++) items.push(describe(exam, seq[i], dates[i], pes));
        return items;
    }

    var PE_IDX = { pe1: 0, pe2: 1, pe3: 2 };
    function describe(exam, it, ymd, pes) {
        var info = ABX.EXAMS[exam], code = info.code, ex = exam === "ab620" ? "620" : "100";
        var o = { date: ymd, exam: exam, key: ymd + "|" + exam, kind: it.kind, tasks: [] };
        function t(txt, href) { o.tasks.push({ t: txt, href: href || null }); }
        if (it.kind === "group" || it.kind === "multi") {
            var gs = it.kind === "group" ? [it.g] : it.gs;
            var g0 = gs[0];
            o.domain = info.domains[g0.d].name;
            o.title = gs.map(function (g) { return g.id.replace("-", ".") + " " + g.name; }).join(" + ");
            if (it.kind === "group" && it.of > 1) o.title += " (" + it.part + "/" + it.of + ")";
            for (var i = 0; i < gs.length; i++) {
                var g = gs[i], anchor = info.guide + "#g" + ex + "-" + g.id, drill = "drills.html?set=" + exam + "-" + g.id;
                var mode = it.kind === "multi" ? "all" : it.mode;
                if (mode === "learn" || mode === "all") t("Read " + code + " " + g.id.replace("-", ".") + " study notes and its Microsoft Learn links", anchor);
                if (mode === "learn2") t("Second pass on " + g.id.replace("-", ".") + ": decision tables, traps, and Learn deep-dive", anchor);
                if (mode === "lab" || mode === "all" || mode === "learn2") t("Do the hands-on lab for " + g.id.replace("-", "."), anchor);
                if (mode === "drill" || mode === "all") t("Take the " + g.id.replace("-", ".") + " drill and log every miss", drill);
                if (mode === "learn") t("Make 5 flashcards in your own words", "tools.html#flashcards");
            }
        } else if (it.kind === "domrev") {
            o.title = "Domain review: " + info.domains[it.d].name;
            o.domain = info.domains[it.d].name;
            t("Flashcards for this domain until you clear every card", "tools.html#flashcards");
            t("Redo drill questions you missed in this domain", "drills.html");
            t("Rewrite your error-log rules for this domain", "tools.html#errorlog");
        } else if (PE_IDX.hasOwnProperty(it.kind)) {
            var pid = pes[PE_IDX[it.kind]], p = ABX.PRACTICE[pid];
            o.title = p.label + " (timed)";
            t("Take " + p.label + " in timed mode, no notes", p.file);
            t("Record weakest objectives in the error log", "tools.html#errorlog");
        } else if (it.kind === "rev1" || it.kind === "rev2") {
            o.title = "Practice exam review + weak spots";
            t("Review every missed and flagged question with explanations", "exams.html");
            t("Re-read study notes for your two weakest objective groups", info.guide);
            t("Re-run the matching drills", "drills.html");
        } else if (it.kind === "taper") {
            o.title = "Final review and taper";
            t("Skim your error log and the Common traps section", "tools.html#errorlog");
            t("Confirm booking, ID, room/test-center checklist", "index.html#checklists");
            t("Run the Pearson VUE system test if testing online", "index.html#checklists");
        }
        return o;
    }

    ABX.buildPlan = function (s) {
        s = s || ABX.settings();
        var aEnd = ABX.addYmd(s.ab620, -1);
        var bStart = ABX.addYmd(s.ab620, 1), bEnd = ABX.addYmd(s.ab100, -1);
        var datesA = ABX.daysBetween(s.start, s.ab620) > 0 ? studyDates(s.start, aEnd, s.days) : [];
        var datesB = ABX.daysBetween(s.ab620, s.ab100) > 1 ? studyDates(bStart, bEnd, s.days) : [];
        var A = windowPlan("ab620", datesA), B = windowPlan("ab100", datesB);
        var perSession = s.days.length ? s.hours / s.days.length : s.hours;
        return { sessions: A.concat(B), countA: A.length, countB: B.length, perSessionHours: perSession };
    };

    ABX.milestones = function (s) {
        s = s || ABX.settings();
        var m = [
            { date: s.start, type: "start", title: "Study plan starts" },
            { date: s.ab620, type: "exam620", title: "AB-620 exam day" },
            { date: ABX.addYmd(s.ab620, 1), type: "retake", title: "Earliest AB-620 retake (24-hour rule)" },
            { date: s.ab100, type: "exam100", title: "AB-100 exam day" },
            { date: ABX.addYmd(s.ab100, 1), type: "retake", title: "Earliest AB-100 retake (24-hour rule)" },
            { date: ABX.addYmd(s.ab100, 15), type: "retake", title: "Earliest 2nd AB-100 retake (14 days after the first retake)" },
            { date: ABX.LAST_OK, type: "deadline", title: "Last day to pass (deadline is before March 30, 2027)" }
        ];
        return m.sort(function (x, y) { return ABX.daysBetween(y.date, x.date); });
    };

    ABX.doneMap = function () { return ABX.store.get("done", {}); };
    // Completion keys carry a signature of the task content, so a rebuilt plan that puts a
    // different task on the same date/slot never inherits an old checkmark.
    ABX.taskSig = function (task, sess) {
        var s = (sess ? sess.kind + "|" + sess.title + "|" : "") + (task.t || "") + "|" + (task.href || ""), h = 5381;
        for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
        return h.toString(36);
    };
    ABX.taskKey = function (sess, i) { return sess.key + "#" + i + "~" + ABX.taskSig(sess.tasks[i], sess); };
    ABX.setDone = function (tk, on) {
        var d = ABX.doneMap();
        if (on) d[tk] = 1; else delete d[tk];
        return ABX.store.set("done", d);
    };
    ABX.sessionDone = function (sess, map) {
        map = map || ABX.doneMap();
        for (var i = 0; i < sess.tasks.length; i++) if (!map[ABX.taskKey(sess, i)]) return false;
        return true;
    };
    ABX.progress = function (exam) {
        var p = ABX.buildPlan(), map = ABX.doneMap(), tot = 0, done = 0;
        for (var i = 0; i < p.sessions.length; i++) {
            var s = p.sessions[i];
            if (exam && s.exam !== exam) continue;
            for (var j = 0; j < s.tasks.length; j++) { tot++; if (map[ABX.taskKey(s, j)]) done++; }
        }
        return { total: tot, done: done, pct: tot ? Math.round(done / tot * 100) : 0 };
    };
    ABX.nextSession = function () {
        var p = ABX.buildPlan(), today = ABX.todayYmd(), map = ABX.doneMap();
        for (var i = 0; i < p.sessions.length; i++) {
            if (ABX.daysBetween(today, p.sessions[i].date) >= 0 && !ABX.sessionDone(p.sessions[i], map)) return p.sessions[i];
        }
        return null;
    };
    ABX.overdueCount = function () {
        var p = ABX.buildPlan(), today = ABX.todayYmd(), map = ABX.doneMap(), n = 0;
        for (var i = 0; i < p.sessions.length; i++) {
            if (ABX.daysBetween(p.sessions[i].date, today) > 0 && !ABX.sessionDone(p.sessions[i], map)) n++;
        }
        return n;
    };

    /* ============================================================
       Settings editor (used on index and plan pages)
       ============================================================ */
    ABX.renderSettings = function (host, onChange) {
        if (!host) return;
        var s = ABX.settings();
        var dayBoxes = "";
        for (var i = 0; i < 7; i++) {
            dayBoxes += '<label><input type="checkbox" name="sd" value="' + i + '"' + (s.days.indexOf(i) >= 0 ? " checked" : "") + "> " + DOW[i] + "</label>";
        }
        host.innerHTML =
            '<form class="date-editor" id="abxSettings" novalidate>' +
            '<div class="date-grid">' +
            '<div class="field"><label for="dA">AB-620 exam date</label><input type="date" id="dA" required value="' + s.ab620 + '" max="' + ABX.LAST_OK + '"></div>' +
            '<div class="field"><label for="dB">AB-100 exam date</label><input type="date" id="dB" required value="' + s.ab100 + '" max="' + ABX.LAST_OK + '"></div>' +
            '<div class="field"><label for="dS">Plan start date</label><input type="date" id="dS" required value="' + s.start + '"></div>' +
            '<div class="field"><label for="hW">Study hours per week</label><input type="number" id="hW" min="1" max="40" step="0.5" value="' + s.hours + '"></div>' +
            "</div>" +
            '<fieldset class="field" style="border:0;padding:0;margin:.8rem 0 0"><legend style="font-weight:600;font-size:.88rem;margin-bottom:.35rem">Study days</legend>' +
            '<div class="daypick">' + dayBoxes + "</div></fieldset>" +
            '<div class="btn-row" style="margin-top:1rem"><button class="btn" type="submit">Save and rebuild plan</button>' +
            '<button class="btn secondary" type="button" id="abxReset">Restore defaults</button></div>' +
            '<p class="faint" style="font-size:.82rem;margin:.6rem 0 0">Defaults: AB-620 on ' + ABX.fmtShort(DEFAULTS.ab620) +
            ", AB-100 on " + ABX.fmtShort(DEFAULTS.ab100) + ", 5 hours/week on Mon/Wed/Sat. Checked tasks stay attached to their date, so changing dates can move work around.</p>" +
            "</form><ul class=\"warnlist\" id=\"abxWarn\" aria-live=\"polite\"></ul>";
        function showWarn() {
            var w = ABX.validate(), h = "";
            for (var i = 0; i < w.length; i++) h += '<li class="' + (w[i].lvl === "ok" ? "ok" : w[i].lvl === "bad" ? "bad" : "") + '">' + w[i].t + "</li>";
            host.querySelector("#abxWarn").innerHTML = h;
        }
        showWarn();
        host.querySelector("#abxSettings").addEventListener("submit", function (e) {
            e.preventDefault();
            var A = host.querySelector("#dA").value, B = host.querySelector("#dB").value, S = host.querySelector("#dS").value;
            var H = parseFloat(host.querySelector("#hW").value);
            if (!ABX.parseYmd(A) || !ABX.parseYmd(B) || !ABX.parseYmd(S)) { ABX.toast("Please enter valid dates."); return; }
            if (!(H >= 1 && H <= 40)) { ABX.toast("Hours per week must be between 1 and 40."); return; }
            var days = [], boxes = host.querySelectorAll('input[name="sd"]');
            for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) days.push(+boxes[i].value);
            if (!days.length) { ABX.toast("Pick at least one study day."); return; }
            var ok = ABX.saveSettings({ ab620: A, ab100: B, start: S, hours: H, days: days });
            if (!ok) { ABX.toast("Could not save: this browser is blocking local storage. Your dates were not changed.", 5000); return; }
            showWarn();
            ABX.renderTopbar();
            ABX.toast("Saved. Plan rebuilt.");
            if (onChange) onChange();
        });
        host.querySelector("#abxReset").addEventListener("click", function () {
            if (!global.confirm("Restore the default dates, hours, and study days? Checked tasks are kept.")) return;
            ABX.store.remove("settings");
            ABX.renderSettings(host, onChange);
            ABX.renderTopbar();
            ABX.toast("Defaults restored.");
            if (onChange) onChange();
        });
    };

    /* ============================================================
       Month calendar
       ============================================================ */
    ABX.calendarEvents = function () {
        var s = ABX.settings(), p = ABX.buildPlan(s), map = ABX.doneMap(), ev = {};
        function add(d, e) { (ev[d] = ev[d] || []).push(e); }
        for (var i = 0; i < p.sessions.length; i++) {
            var x = p.sessions[i];
            var cls = x.kind.indexOf("pe") === 0 ? "tag-pe" : (x.kind === "rev1" || x.kind === "rev2" || x.kind === "domrev" || x.kind === "taper") ? "tag-review" : (x.exam === "ab620" ? "tag-ab620" : "tag-ab100");
            add(x.date, { cls: cls, label: ABX.examLabel(x.exam) + ": " + x.title, href: "plan.html#s-" + x.date, done: ABX.sessionDone(x, map) });
        }
        var m = ABX.milestones(s);
        for (var j = 0; j < m.length; j++) {
            var c = m[j].type === "deadline" ? "tag-exam" : m[j].type.indexOf("exam") === 0 ? "tag-exam" : m[j].type === "retake" ? "tag-test" : "tag-test";
            add(m[j].date, { cls: c, label: m[j].title, href: null, done: false, milestone: true });
        }
        return ev;
    };

    ABX.renderCalendar = function (host) {
        if (!host) return;
        var s = ABX.settings();
        var start = ABX.store.get("calMonth", null);
        var base = start && ABX.parseYmd(start + "-01") ? ABX.parseYmd(start + "-01") : null;
        if (!base) {
            var t = ABX.parseYmd(ABX.todayYmd()), st = ABX.parseYmd(s.start);
            var b0 = ABX.daysBetween(t, st) > 0 ? st : t;
            base = new Date(b0.getFullYear(), b0.getMonth(), 1);
        }
        var ev = ABX.calendarEvents(), today = ABX.todayYmd();
        var y = base.getFullYear(), mo = base.getMonth();
        var first = new Date(y, mo, 1), lead = first.getDay();
        var gridStart = new Date(y, mo, 1 - lead);
        var cells = "";
        for (var i = 0; i < 7; i++) cells += '<div class="dow" aria-hidden="true">' + DOW[i] + "</div>";
        for (var k = 0; k < 42; k++) {
            var d = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + k);
            if (k >= 35 && d.getMonth() !== mo) break;
            var ymd = ABX.toYmd(d), list = ev[ymd] || [], evh = "";
            for (var e = 0; e < list.length; e++) {
                var it = list[e];
                var inner = ABX.escapeHtml(it.label);
                evh += it.href
                    ? '<a class="ev badge ' + it.cls + (it.done ? " done" : "") + '" href="' + it.href + '" title="' + inner + '">' + inner + "</a>"
                    : '<span class="ev badge ' + it.cls + '" title="' + inner + '">' + inner + "</span>";
            }
            cells += '<div class="cell' + (d.getMonth() !== mo ? " out" : "") + (ymd === today ? " today" : "") + '" role="gridcell" aria-label="' +
                ABX.fmtLong(ymd) + (list.length ? ": " + ABX.escapeHtml(list.map(function (x) { return x.label; }).join("; ")) : "") + '">' +
                '<span class="dn">' + d.getDate() + "</span>" + evh + "</div>";
        }
        host.innerHTML =
            '<div class="cal-head"><button class="btn sm secondary" type="button" data-cal="-1" aria-label="Previous month">\u2190</button>' +
            '<h3 aria-live="polite">' + MONTHS[mo] + " " + y + "</h3>" +
            '<button class="btn sm secondary" type="button" data-cal="1" aria-label="Next month">\u2192</button>' +
            '<button class="btn sm ghost" type="button" data-cal="0">Today</button>' +
            '<span style="flex:1"></span><button class="btn sm" type="button" data-ics="1">Download calendar (.ics)</button></div>' +
            '<div class="cal" role="grid" aria-label="Study calendar for ' + MONTHS[mo] + " " + y + '">' + cells + "</div>" +
            '<div class="cal-legend"><span class="badge tag-ab620">AB-620 study</span><span class="badge tag-ab100">AB-100 study</span>' +
            '<span class="badge tag-pe">Practice exam</span><span class="badge tag-review">Review / taper</span>' +
            '<span class="badge tag-exam">Exam day / deadline</span><span class="badge tag-test">Retake window / milestone</span></div>';
        var btns = host.querySelectorAll("[data-cal]");
        for (var bi = 0; bi < btns.length; bi++) {
            btns[bi].addEventListener("click", function () {
                var delta = +this.getAttribute("data-cal");
                if (delta === 0) ABX.store.remove("calMonth");
                else {
                    var nd = new Date(y, mo + delta, 1);
                    ABX.store.set("calMonth", nd.getFullYear() + "-" + pad(nd.getMonth() + 1));
                }
                ABX.renderCalendar(host);
            });
        }
        host.querySelector("[data-ics]").addEventListener("click", ABX.downloadIcs);
    };

    /* ============================================================
       ICS export (all-day events: no timezone drift)
       ============================================================ */
    function icsEsc(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
    function icsFold(line) {
        var out = [], cur = line;
        while (cur.length > 60) { out.push(cur.slice(0, 60)); cur = " " + cur.slice(60); }
        out.push(cur);
        return out.join("\r\n");
    }
    ABX.buildIcs = function () {
        var s = ABX.settings(), p = ABX.buildPlan(s), now = new Date();
        var stamp = now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) + "T" + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + "Z";
        var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//matziq.github.io//AB Exam Prep//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:AB-620 + AB-100 Study Plan"];
        function ev(ymd, uid, summary, desc) {
            var d = ymd.replace(/-/g, ""), n = ABX.addYmd(ymd, 1).replace(/-/g, "");
            L.push("BEGIN:VEVENT", "UID:" + uid + "@matziq.github.io", "DTSTAMP:" + stamp, "DTSTART;VALUE=DATE:" + d, "DTEND;VALUE=DATE:" + n,
                icsFold("SUMMARY:" + icsEsc(summary)), icsFold("DESCRIPTION:" + icsEsc(desc)), "TRANSP:TRANSPARENT", "END:VEVENT");
        }
        var hrs = Math.round(p.perSessionHours * 10) / 10;
        for (var i = 0; i < p.sessions.length; i++) {
            var x = p.sessions[i];
            ev(x.date, "abx-" + x.date + "-" + x.exam, ABX.examLabel(x.exam) + " study: " + x.title,
                "About " + hrs + " h. Tasks: " + x.tasks.map(function (t) { return t.t; }).join("; ") + ". Open https://matziq.github.io/AB_Exam_Prep/plan.html");
        }
        var m = ABX.milestones(s);
        for (var j = 0; j < m.length; j++) ev(m[j].date, "abx-ms-" + m[j].type + "-" + m[j].date, m[j].title, "AB-620 + AB-100 plan milestone. https://matziq.github.io/AB_Exam_Prep/");
        L.push("END:VCALENDAR");
        return L.join("\r\n") + "\r\n";
    };
    ABX.downloadIcs = function () {
        var blob = new Blob([ABX.buildIcs()], { type: "text/calendar;charset=utf-8" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "AB-620-AB-100-study-plan.ics";
        document.body.appendChild(a); a.click();
        global.setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        ABX.toast("Calendar file downloaded. Import it into Outlook, Google, or Apple Calendar.", 3500);
    };

    /* ============================================================
       Collapsible sections
       ============================================================ */
    ABX.initFolds = function () {
        var hosts = document.querySelectorAll("[data-fold-tools]");
        for (var i = 0; i < hosts.length; i++) {
            var h = hosts[i];
            h.className = "fold-tools";
            h.innerHTML = '<button class="btn sm secondary" type="button" data-fold="open">Expand all</button>' +
                '<button class="btn sm secondary" type="button" data-fold="close">Collapse all</button>' +
                '<span class="faint">Every section below can be opened or closed.</span>';
            h.addEventListener("click", function (e) {
                var b = e.target.closest ? e.target.closest("[data-fold]") : null;
                if (!b) return;
                var open = b.getAttribute("data-fold") === "open";
                var all = document.querySelectorAll("main details.acc");
                for (var j = 0; j < all.length; j++) all[j].open = open;
            });
        }
        function openHash() {
            var id = (global.location.hash || "").slice(1);
            if (!id) return;
            var t = document.getElementById(decodeURIComponent(id));
            if (!t) return;
            var n = t;
            while (n) { if (n.tagName === "DETAILS") n.open = true; n = n.parentElement; }
            if (t.scrollIntoView) global.setTimeout(function () { t.scrollIntoView({ block: "start" }); }, 30);
        }
        openHash();
        global.addEventListener("hashchange", openHash);
    };

    /* ============================================================
       Did you know? (verified facts; rotated on the home page)
       ============================================================ */
    ABX.DYK = [
        "A 700 on a Microsoft exam is a scaled score on a 1\u20131,000 scale \u2014 Microsoft says it may not equal 70% of the points.",
        "Microsoft does not penalize guessing, so leaving a question blank can only cost you.",
        "Some exam questions are unscored items that Microsoft is evaluating; you will not know which ones.",
        "During role-based exams you can open Microsoft Learn in a restricted window \u2014 but the exam clock keeps running.",
        "After a first failed attempt you wait 24 hours to retake; after that, each retake requires a 14-day wait, and you get at most five attempts in 12 months.",
        "Role-based certifications renew free each year with an online, unproctored, open-book assessment during a six-month window.",
        "AB-620 is one of several associate certifications that satisfy the prerequisite for the Agentic AI Business Solutions Architect Expert.",
        "This site follows the AB-100 skills outline version effective November 16, 2026 \u2014 check the official study guide for the version that applies to your exam date.",
        "You can try the exam interface ahead of time in Microsoft\u2019s exam sandbox at aka.ms/examdemo.",
        "If an exam is not offered in your preferred language, you can request 30 extra minutes as an accommodation.",
        "Multi-part questions can earn partial credit, so answer every part you are confident about.",
        "Breaks are built into some exams, but the clock keeps running and you cannot return to earlier questions after a break.",
        "Microsoft recommends registering with a personal Microsoft account (MSA) so your certifications follow you between employers.",
        "The AB-620 study guide notes that commonly used Preview features may appear on the exam, not only GA features."
    ];
    ABX.renderDyk = function (host) {
        if (!host) return;
        var i = Math.floor(Math.random() * ABX.DYK.length);
        function show() {
            host.innerHTML = '<div class="callout dyk dyk-rotator" aria-live="polite"><span class="callout-title">Did you know?</span><p>' +
                ABX.DYK[i] + '</p><div class="btn-row" style="margin:0"><button class="btn sm ghost" type="button">Another fact \u2192</button></div></div>';
            host.querySelector("button").onclick = function () { i = (i + 1) % ABX.DYK.length; show(); };
        }
        show();
    };

    /* ============================================================
       Chrome: topbar, footer, toast, meters, misc
       ============================================================ */
    function currentFile() {
        var p = (global.location.pathname || "").split("/").pop();
        return p || "index.html";
    }
    var NAV = [
        { href: "index.html", label: "Overview" },
        { href: "plan.html", label: "Plan & Calendar" },
        { href: "ab620.html", label: "AB-620 Guide" },
        { href: "ab100.html", label: "AB-100 Guide" },
        { href: "drills.html", label: "Drills" },
        { href: "exams.html", label: "Practice Exams" },
        { href: "tools.html", label: "Flashcards & Tools" },
        { href: "tips.html", label: "Tips" }
    ];
    ABX.nextExam = function () {
        var s = ABX.settings(), today = ABX.todayYmd();
        if (ABX.daysBetween(today, s.ab620) >= 0) return { exam: "ab620", date: s.ab620 };
        if (ABX.daysBetween(today, s.ab100) >= 0) return { exam: "ab100", date: s.ab100 };
        return { exam: null, date: ABX.LAST_OK };
    };
    ABX.renderTopbar = function () {
        var host = document.getElementById("topbar");
        if (!host) return;
        var here = currentFile(), links = "";
        for (var i = 0; i < NAV.length; i++) {
            var active = NAV[i].href === here || (here.indexOf("practice-exam") === 0 && NAV[i].href === "exams.html");
            links += '<a href="' + NAV[i].href + '"' + (active ? ' class="active" aria-current="page"' : "") + ">" + NAV[i].label + "</a>";
        }
        var nx = ABX.nextExam(), left = Math.max(0, ABX.daysBetween(ABX.todayYmd(), nx.date));
        var pill = '<a class="countdown-pill" href="plan.html" title="' + (nx.exam ? ABX.examLabel(nx.exam) + " on " + ABX.fmtLong(nx.date) : "Deadline") + '"><b>' + left +
            "</b> day" + (left === 1 ? "" : "s") + " to " + (nx.exam ? ABX.examLabel(nx.exam) : "deadline") + "</a>";
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";
        host.className = "topbar";
        host.innerHTML = '<div class="topbar-inner">' +
            '<a class="brand" href="index.html"><span class="brand-mark">AB</span><span>AB-620 + AB-100 <span class="brand-sub">Exam prep plan</span></span></a>' +
            '<nav class="nav" id="mainNav" aria-label="Main">' + links + "</nav>" +
            '<div class="topbar-right">' + pill +
            '<button class="icon-btn" id="themeBtn" type="button" aria-label="' + (isDark ? "Switch to light mode" : "Switch to dark mode") + '">' + (isDark ? "\u2600" : "\u263D") + "</button>" +
            '<button class="icon-btn nav-toggle" id="navBtn" type="button" aria-label="Toggle menu" aria-controls="mainNav" aria-expanded="false">\u2261</button>' +
            "</div></div>";
        document.getElementById("themeBtn").addEventListener("click", ABX.toggleTheme);
        document.getElementById("navBtn").addEventListener("click", function () {
            var nav = document.getElementById("mainNav"), open = nav.classList.toggle("open");
            this.setAttribute("aria-expanded", open ? "true" : "false");
        });
    };
    ABX.renderFooter = function () {
        var host = document.getElementById("footer");
        if (!host) return;
        host.className = "footer";
        host.innerHTML = '<div class="wrap">' +
            "<p>AB-620 + AB-100 exam prep plan. Exam facts were checked against Microsoft Learn on October 31, 2026 \u2014 always confirm on the " +
            '<a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-620" rel="noopener">AB-620</a> and ' +
            '<a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-100" rel="noopener">AB-100</a> study guides before you test.</p>' +
            '<p class="faint">Every practice question, drill, flashcard, and lab on this site is original, unofficial study material. It is not affiliated with or endorsed by Microsoft, ' +
            "does not reproduce real exam content, and cannot guarantee a passing result. Scores shown here are percent correct only, not Microsoft scaled scores. Progress is saved in this browser only.</p></div>";
    };

    var toastEl = null, toastTimer = null;
    ABX.toast = function (msg, ms) {
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
        toastTimer = global.setTimeout(function () { toastEl.classList.remove("show"); }, ms || 2400);
    };
    ABX.fillMeter = function (el, pct) {
        if (!el) return;
        var bar = el.tagName === "I" ? el : el.querySelector("i");
        if (!bar) return;
        var v = Math.max(0, Math.min(100, pct)) / 100;
        global.requestAnimationFrame(function () { bar.style.transform = "scaleX(" + v + ")"; });
    };
    ABX.autoFillMeters = function (root) {
        var nodes = (root || document).querySelectorAll("[data-pct]");
        for (var i = 0; i < nodes.length; i++) ABX.fillMeter(nodes[i], parseFloat(nodes[i].getAttribute("data-pct")) || 0);
    };
    ABX.bindPersistentChecks = function (storeKey, root) {
        var state = ABX.store.get(storeKey, {});
        var boxes = (root || document).querySelectorAll('input[type="checkbox"][data-key]');
        for (var i = 0; i < boxes.length; i++) {
            (function (box) {
                var k = box.getAttribute("data-key");
                if (state[k]) box.checked = true;
                box.addEventListener("change", function () {
                    var s = ABX.store.get(storeKey, {});
                    if (box.checked) s[k] = 1; else delete s[k];
                    ABX.store.set(storeKey, s);
                    if (typeof ABX.onCheckChange === "function") ABX.onCheckChange(storeKey, s);
                });
            })(boxes[i]);
        }
        return state;
    };
    ABX.escapeHtml = function (s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };
    var LETTERS = ["A", "B", "C", "D", "E", "F"];
    ABX.letters = function () { return LETTERS; };

    /* ---------- boot ---------- */
    ABX.initTheme();
    document.addEventListener("DOMContentLoaded", function () {
        ABX.renderTopbar();
        ABX.renderFooter();
        if (!ABX.storageOk()) ABX.storageWarn();
        ABX.initFolds();
        ABX.autoFillMeters(document);
    });

})(window);
