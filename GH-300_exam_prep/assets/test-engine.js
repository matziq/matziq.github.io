/* ============================================================
   GH-300 Exam Prep  |  practice exam engine
   Renders timed exams, tracks answers, scores against the
   1-1000 scale, and drives review mode.
   ============================================================ */
(function (global) {
    "use strict";

    var GH3 = global.GH3 = global.GH3 || {};

    function bank() { return global.GH3_DATA || {}; }
    function el(tag, cls, html) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html != null) e.innerHTML = html;
        return e;
    }
    function qsa(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }

    /* ============================================================
       Engine instance
       ============================================================ */
    function Engine(opts) {
        this.o = opts;
        this.root = opts.el;
        this.core = "gh300";
        this.key = "run:" + opts.testId;
        this.sections = [];

        for (var i = 0; i < opts.sections.length; i++) {
            var s = bank()[opts.sections[i]];
            if (s) this.sections.push(s);
        }
        if (!this.sections.length) {
            this.root.innerHTML = '<div class="card"><h3>Content not loaded</h3>' +
                "<p>The question data for this exam did not load. Check that the data scripts are present, " +
                "then refresh the page.</p></div>";
            return;
        }

        this.state = this.load();
        this.observer = null;
        this.timer = null;
        this.currentQ = null;
        this.reviewFilter = "all";
        this.render();
        this.bindKeys();
    }

    Engine.prototype.blank = function () {
        var st = {
            screen: "intro", sectionIdx: 0, unitIdx: 0,
            answers: {}, flags: {}, timeLeft: {}, spent: {}, done: {},
            timed: true, startedAt: null, finishedAt: null
        };
        for (var i = 0; i < this.sections.length; i++) {
            var s = this.sections[i];
            st.answers[s.id] = {};
            st.flags[s.id] = {};
            st.timeLeft[s.id] = s.timeMinutes * 60;
            st.spent[s.id] = 0;
        }
        return st;
    };

    Engine.prototype.load = function () {
        var saved = GH3.store.get(this.key, null);
        if (!saved || !saved.answers) return this.blank();
        var base = this.blank();
        for (var k in saved) { if (Object.prototype.hasOwnProperty.call(saved, k)) base[k] = saved[k]; }
        for (var i = 0; i < this.sections.length; i++) {
            var s = this.sections[i];
            if (!base.answers[s.id]) base.answers[s.id] = {};
            if (!base.flags[s.id]) base.flags[s.id] = {};
            if (typeof base.timeLeft[s.id] !== "number") base.timeLeft[s.id] = s.timeMinutes * 60;
            if (typeof base.spent[s.id] !== "number") base.spent[s.id] = 0;
        }
        return base;
    };

    Engine.prototype.save = function () { GH3.store.set(this.key, this.state); };

    Engine.prototype.reset = function () {
        this.stopTimer();
        GH3.store.remove(this.key);
        this.state = this.blank();
        this.render();
    };

    /* ---------- helpers ---------- */
    Engine.prototype.section = function (i) {
        return this.sections[typeof i === "number" ? i : this.state.sectionIdx];
    };

    Engine.prototype.allQuestions = function (sec) {
        var out = [];
        for (var u = 0; u < sec.units.length; u++) {
            for (var q = 0; q < sec.units[u].questions.length; q++) {
                out.push({ q: sec.units[u].questions[q], unit: u });
            }
        }
        return out;
    };

    Engine.prototype.hasPassages = function (sec) {
        for (var u = 0; u < sec.units.length; u++) {
            if (sec.units[u].html && sec.units[u].html.length > 10) return true;
        }
        return false;
    };

    Engine.prototype.isDrill = function () { return this.o.testId.indexOf("drill_") === 0; };

    Engine.prototype.answeredCount = function (sec) {
        var a = this.state.answers[sec.id] || {}, c = 0;
        for (var k in a) { if (Object.prototype.hasOwnProperty.call(a, k)) c++; }
        return c;
    };

    Engine.prototype.scoreSection = function (sec) {
        var list = this.allQuestions(sec), a = this.state.answers[sec.id] || {};
        var right = 0, wrong = 0, blank = 0, topics = {}, objectives = {};
        for (var i = 0; i < list.length; i++) {
            var q = list[i].q;
            var pick = a[q.n];
            var t = q.topic || q.tag || "Untagged";
            if (!topics[t]) topics[t] = { right: 0, total: 0 };
            topics[t].total++;
            if (q.objective) {
                if (!objectives[q.objective]) objectives[q.objective] = { right: 0, total: 0 };
                objectives[q.objective].total++;
            }
            if (pick === undefined || pick === null) { blank++; }
            else if (pick === q.answer) {
                right++; topics[t].right++;
                if (q.objective) objectives[q.objective].right++;
            } else { wrong++; }
        }
        var pct = list.length ? (right / list.length) * 100 : 0;
        return {
            right: right, wrong: wrong, blank: blank, total: list.length,
            pct: Math.round(pct),
            scaled: this.isDrill() ? null : GH3.rawToScaled(right, list.length),
            topics: topics, objectives: objectives
        };
    };

    /* ============================================================
       Render dispatcher
       ============================================================ */
    Engine.prototype.render = function () {
        this.stopTimer();
        if (this.observer) { this.observer.disconnect(); this.observer = null; }
        this.root.innerHTML = "";
        var s = this.state.screen;
        if (s === "intro") this.renderIntro();
        else if (s === "sectionIntro") this.renderSectionIntro();
        else if (s === "exam") this.renderExam();
        else if (s === "results") this.renderResults();
        else if (s === "review") this.renderReview();
        global.scrollTo(0, 0);
    };

    /* ---------- intro ---------- */
    Engine.prototype.renderIntro = function () {
        var self = this;
        var inProgress = !!this.state.startedAt && !this.state.finishedAt;
        var finished = !!this.state.finishedAt;

        /* Only real skill-area tags belong in this table. Drill questions carry
           a short teaching tag instead, and listing those as if they were exam
           skill areas produced a table of nonsense weights. */
        var mix = {}, totalQ = 0, totalMin = 0;
        for (var i = 0; i < this.sections.length; i++) {
            var s = this.sections[i];
            var list = this.allQuestions(s);
            totalQ += list.length; totalMin += s.timeMinutes;
            for (var j = 0; j < list.length; j++) {
                var t = list[j].q.topic;
                if (!t) continue;
                mix[t] = (mix[t] || 0) + 1;
            }
        }

        /* Group by skill area, not by sub-topic. A sub-topic share of 10%
           sitting next to a published skill-area weight of 15-20% reads as a
           blueprint error when it is really comparing two different things. */
        var rows = "";
        var counted = {};
        for (var d = 0; d < GH3.DOMAINS.length; d++) {
            var dom = GH3.DOMAINS[d];
            var domN = 0, parts = [];
            for (var ti = 0; ti < GH3.TOPICS.length; ti++) {
                var tp = GH3.TOPICS[ti];
                if (tp.domain !== dom.id) continue;
                var tn = mix[tp.name] || 0;
                if (!tn) continue;
                domN += tn;
                counted[tp.name] = true;
                parts.push(GH3.escapeHtml(tp.name) + " " + tn);
            }
            if (!domN) continue;
            rows += "<tr><td><strong>" + GH3.escapeHtml(dom.name) + "</strong>" +
                (parts.length ? '<br><span class="faint" style="font-size:.82em">' + parts.join(" &middot; ") + "</span>" : "") +
                "</td><td>" + domN + " questions</td><td>" +
                Math.round(domN / totalQ * 100) + "%</td><td>" + dom.weight + "</td></tr>";
        }
        // anything tagged outside the standard skill areas still gets a row
        for (var k in mix) {
            if (!Object.prototype.hasOwnProperty.call(mix, k)) continue;
            if (counted[k]) continue;
            rows += "<tr><td><strong>" + GH3.escapeHtml(k) + "</strong></td><td>" + mix[k] +
                " questions</td><td>" + Math.round(mix[k] / totalQ * 100) + "%</td><td>&mdash;</td></tr>";
        }

        var pass = GH3.passMark();
        var needed = GH3.correctNeeded(totalQ);
        var isDrill = !!this.o.isDrill;

        var wrap = el("div");
        wrap.innerHTML =
            '<div class="card" style="margin-bottom:1.25rem">' +
            /* a drill page prints its own title above this card */
            (isDrill ? "" : "<h2 style=\"margin-top:0\">" + this.o.title + "</h2>" +
                            '<p class="lede">' + (this.o.blurb || "") + "</p>") +
            (rows
                ? '<div class="table-scroll"><table class="data-table"><thead><tr>' +
                  "<th>Skill area</th><th>On this exam</th><th>Share here</th><th>Real exam weight</th>" +
                  "</tr></thead><tbody>" + rows +
                  '<tr><td><strong>Total</strong></td><td><strong>' + totalQ + " questions</strong></td><td><strong>" +
                  totalMin + " minutes</strong></td><td>&mdash;</td></tr>" +
                  "</tbody></table></div>"
                : "") +
            (isDrill
                ? '<div class="callout tip"><span class="callout-title">Before you start</span>' +
                  "<p style=\"margin-bottom:0\"><strong>" + totalQ + " questions in " + totalMin +
                  " minutes.</strong> Close your notes and do the whole set without looking anything up, " +
                  "then read every explanation, including the ones you got right. A drill is not scored " +
                  "on the exam scale; it is here to find the one idea you have not pinned down yet.</p></div>"
                : '<div class="callout warn"><span class="callout-title">Before you start</span>' +
                  "<p>Phone in another room, no notes, no tabs open. The clock runs down and submits itself when it " +
                  "hits zero, exactly like the real proctored exam. Microsoft does not penalize a wrong answer, so " +
                  "every question gets an answer even if it is a pure guess.</p>" +
                  "<p style=\"margin-bottom:0\">Passing is <strong>" + pass + " on a 1\u20131000 scale</strong>, which lands " +
                  "near <strong>" + needed + " of " + totalQ + " correct</strong> here.</p></div>") +
            '<div class="field" style="max-width:340px">' +
            '<label><input type="checkbox" id="timedBox"' + (this.state.timed ? " checked" : "") +
            ' style="width:auto;margin-right:.5rem"> Timed mode (strongly recommended)</label></div>' +
            '<div class="btn-row" id="introBtns"></div>' +
            "</div>";

        var btns = wrap.querySelector("#introBtns");

        if (finished) {
            var b1 = el("button", "btn lg", "See my results");
            b1.onclick = function () { self.state.screen = "results"; self.save(); self.render(); };
            btns.appendChild(b1);
        }
        if (inProgress) {
            var b2 = el("button", "btn lg", "Resume \u2014 " + this.section().name);
            b2.onclick = function () { self.state.screen = "exam"; self.save(); self.render(); };
            btns.appendChild(b2);
        }
        if (!finished && !inProgress) {
            var b3 = el("button", "btn lg", this.isDrill() ? "Start the drill" : "Start the exam");
            b3.onclick = function () {
                self.state.startedAt = Date.now();
                self.state.sectionIdx = 0; self.state.unitIdx = 0;
                self.state.screen = "sectionIntro";
                self.save(); self.render();
            };
            btns.appendChild(b3);
        }
        if (finished || inProgress) {
            var b4 = el("button", "btn secondary", "Start over");
            b4.onclick = function () {
                if (global.confirm("Erase every answer here and start fresh?")) self.reset();
            };
            btns.appendChild(b4);
        }

        wrap.querySelector("#timedBox").addEventListener("change", function () {
            self.state.timed = this.checked; self.save();
        });

        this.root.appendChild(wrap);
    };

    /* ---------- section intro ---------- */
    Engine.prototype.renderSectionIntro = function () {
        var self = this, sec = this.section();
        var n = this.allQuestions(sec).length;
        var mins = Math.round(this.state.timeLeft[sec.id] / 60);
        var pace = Math.round((sec.timeMinutes * 60 / n) * 10) / 10;

        var tip = this.isDrill()
            ? "One skill, on the clock. Do not look anything up until the whole set is submitted \u2014 the value is in finding out what you actually know."
            : "Read the last line of the question first: BEST, FIRST, and MOST change the answer. If a question passes 75 seconds, flag it, answer it anyway, and move on.";

        var wrap = el("div", "wrap-narrow");
        wrap.innerHTML =
            '<div class="card center" style="padding:2.5rem 2rem">' +
            '<div class="badge accent">' + (this.sections.length > 1
                ? "Section " + (this.state.sectionIdx + 1) + " of " + this.sections.length
                : "GH-300 \u00b7 GitHub Copilot") + "</div>" +
            '<h2 style="margin:.7rem 0 .3rem;font-size:2rem">' + sec.name + "</h2>" +
            '<p class="lede" style="margin:0 auto 1.5rem">' + n + " questions &middot; " + mins +
            " minutes &middot; about " + pace + " seconds per question</p>" +
            '<div class="callout tip" style="text-align:left"><span class="callout-title">Focus</span>' +
            "<p>" + tip + "</p></div>" +
            '<div class="btn-row" style="justify-content:center"><button class="btn lg" id="goBtn">Begin</button></div>' +
            '<p class="faint" style="margin:1rem 0 0;font-size:.82rem">' +
            (this.state.timed ? "The clock starts as soon as you click." : "Untimed practice mode is on.") + "</p>" +
            "</div>";

        wrap.querySelector("#goBtn").onclick = function () {
            self.state.screen = "exam"; self.save(); self.render();
        };
        this.root.appendChild(wrap);
    };

    /* ============================================================
       Exam screen
       ============================================================ */
    Engine.prototype.renderExam = function () {
        var self = this, sec = this.section();

        var shell = el("div", "test-shell");
        var main = el("div");
        var side = el("div");

        var bar = el("div", "exam-bar");
        bar.innerHTML =
            '<span class="section-name">' + sec.name + "</span>" +
            '<span class="sep">|</span>' +
            '<span class="muted" id="progressTxt" style="font-size:.86rem"></span>' +
            '<span class="spacer"></span>' +
            '<span class="timer" id="clock">' + GH3.fmtClock(this.state.timeLeft[sec.id]) + "</span>" +
            '<button class="btn sm secondary" id="submitSec">Submit</button>';
        main.appendChild(bar);

        var body = el("div");
        main.appendChild(body);
        this.examBody = body;
        this.drawUnit();

        var pal = el("div", "palette");
        pal.innerHTML = '<h4>Questions</h4><div class="palette-grid" id="palGrid"></div>' +
            '<div class="palette-legend">' +
            '<span><i class="swatch" style="background:var(--accent);border-color:var(--accent)"></i> Answered</span>' +
            '<span><i class="swatch" style="border-color:var(--amber);box-shadow:inset 0 0 0 2px var(--amber-soft)"></i> Flagged for review</span>' +
            '<span><i class="swatch"></i> Not yet answered</span></div>';
        side.appendChild(pal);
        shell.appendChild(main);
        shell.appendChild(side);
        this.root.appendChild(shell);

        this.palGrid = pal.querySelector("#palGrid");
        this.clockEl = bar.querySelector("#clock");
        this.progressEl = bar.querySelector("#progressTxt");
        this.drawPalette();
        this.updateProgress();

        bar.querySelector("#submitSec").onclick = function () { self.confirmSubmit(); };
        if (this.state.timed) this.startTimer();
    };

    Engine.prototype.drawUnit = function () {
        var self = this, sec = this.section();
        var body = this.examBody;
        body.innerHTML = "";
        this.passageEl = null;

        var col = el("div", "q-list");
        for (var ui = 0; ui < sec.units.length; ui++) {
            var qs = sec.units[ui].questions;
            for (var i = 0; i < qs.length; i++) col.appendChild(this.qCard(qs[i], sec, false));
        }
        var endRow = el("div", "btn-row");
        endRow.style.marginTop = "1.1rem";
        var fin = el("button", "btn", "Submit and score \u2192");
        fin.onclick = function () { self.confirmSubmit(); };
        endRow.appendChild(fin);
        col.appendChild(endRow);
        body.appendChild(col);

        this.watchCurrent();
    };

    Engine.prototype.qCard = function (q, sec, review) {
        var self = this;
        var picked = (this.state.answers[sec.id] || {})[q.n];
        var flagged = (this.state.flags[sec.id] || {})[q.n];
        var letters = GH3.letters();

        var card = el("div", "q-card");
        card.setAttribute("data-qn", q.n);
        card.id = "q-" + sec.id + "-" + q.n;

        var head = el("div", "q-head");
        head.innerHTML = '<span class="q-num">' + q.n + "</span>" +
            (q.topic ? '<span class="badge">' + GH3.escapeHtml(q.topic) + "</span>" : "") +
            (review && q.objective ? '<span class="badge accent">Obj ' + GH3.escapeHtml(q.objective) + "</span>" : "");
        if (!review) {
            var fb = el("button", "flag-btn" + (flagged ? " on" : ""), flagged ? "\u2691 Flagged" : "\u2690 Flag");
            fb.onclick = function () {
                var f = self.state.flags[sec.id];
                if (f[q.n]) { delete f[q.n]; fb.className = "flag-btn"; fb.innerHTML = "\u2690 Flag"; }
                else { f[q.n] = 1; fb.className = "flag-btn on"; fb.innerHTML = "\u2691 Flagged"; }
                self.save(); self.drawPalette();
            };
            head.appendChild(fb);
        } else {
            var ok = picked === q.answer;
            var tag = el("span", "badge " + (picked === undefined ? "" : (ok ? "good" : "bad")),
                picked === undefined ? "Left blank" : (ok ? "Correct" : "Missed"));
            tag.style.marginLeft = "auto";
            head.appendChild(tag);
        }
        card.appendChild(head);

        if (q.prompt) card.appendChild(el("div", "q-prompt", q.prompt));

        var box = el("div", "choices");
        for (var i = 0; i < q.choices.length; i++) {
            (function (i) {
                var lab = el("label", "choice");
                if (review) {
                    var cls = "";
                    if (i === q.answer) cls = " correct";
                    else if (i === picked) cls = " wrong";
                    lab.className = "choice" + cls;
                } else if (picked === i) {
                    lab.className = "choice selected";
                }
                lab.innerHTML = '<input type="radio" name="q-' + sec.id + "-" + q.n + '" value="' + i + '"' +
                    (picked === i ? " checked" : "") + (review ? " disabled" : "") + ">" +
                    '<span class="letter">' + letters[i] + "</span>" +
                    '<span class="ctext">' + q.choices[i] + "</span>";
                if (!review) {
                    lab.addEventListener("click", function () {
                        self.state.answers[sec.id][q.n] = i;
                        var sibs = qsa(box, ".choice");
                        for (var k = 0; k < sibs.length; k++) sibs[k].className = "choice";
                        lab.className = "choice selected";
                        self.save(); self.drawPalette(); self.updateProgress();
                    });
                }
                box.appendChild(lab);
            })(i);
        }
        card.appendChild(box);

        if (review && q.explanation) {
            card.appendChild(el("div", "explain",
                '<div class="explain-head">Why ' + letters[q.answer] + " is right</div>" + q.explanation));
        }
        return card;
    };

    /* ---------- track which question is on screen ---------- */
    Engine.prototype.watchCurrent = function () {
        var self = this;
        if (this.observer) this.observer.disconnect();
        if (!global.IntersectionObserver) return;
        this.observer = new global.IntersectionObserver(function (entries) {
            var best = null;
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var n = parseInt(entries[i].target.getAttribute("data-qn"), 10);
                    if (best === null || n < best) best = n;
                }
            }
            if (best !== null && best !== self.currentQ) {
                self.currentQ = best;
                self.highlightPalette();
            }
        }, { rootMargin: "-90px 0px -55% 0px", threshold: 0 });

        var cards = qsa(this.root, ".q-card");
        for (var i = 0; i < cards.length; i++) this.observer.observe(cards[i]);
    };

    /* ---------- palette ---------- */
    Engine.prototype.drawPalette = function () {
        if (!this.palGrid) return;
        var self = this, sec = this.section();
        var list = this.allQuestions(sec);
        var a = this.state.answers[sec.id] || {}, f = this.state.flags[sec.id] || {};
        this.palGrid.innerHTML = "";
        for (var i = 0; i < list.length; i++) {
            (function (item) {
                var n = item.q.n;
                var b = el("button", "pdot", String(n));
                b.type = "button";
                b.setAttribute("data-qn", n);
                if (a[n] !== undefined) b.classList.add("answered");
                if (f[n]) b.classList.add("flagged");
                b.onclick = function () { self.goToQuestion(n); };
                self.palGrid.appendChild(b);
            })(list[i]);
        }
        this.highlightPalette();
    };

    Engine.prototype.highlightPalette = function () {
        if (!this.palGrid) return;
        var dots = qsa(this.palGrid, ".pdot");
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.toggle("current",
                parseInt(dots[i].getAttribute("data-qn"), 10) === this.currentQ);
        }
    };

    Engine.prototype.goToQuestion = function (n) {
        var sec = this.section();
        var target = document.getElementById("q-" + sec.id + "-" + n);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    Engine.prototype.updateProgress = function () {
        if (!this.progressEl) return;
        var sec = this.section(), total = this.allQuestions(sec).length;
        var done = this.answeredCount(sec);
        this.progressEl.textContent = done + " of " + total + " answered";
    };

    /* ---------- timer ---------- */
    Engine.prototype.startTimer = function () {
        var self = this, sec = this.section();
        var last = Date.now(), saveTick = 0;
        this.stopTimer();
        this.timer = global.setInterval(function () {
            var now = Date.now();
            var delta = (now - last) / 1000;
            last = now;
            self.state.timeLeft[sec.id] = Math.max(0, self.state.timeLeft[sec.id] - delta);
            self.state.spent[sec.id] += delta;

            var left = self.state.timeLeft[sec.id];
            if (self.clockEl) {
                self.clockEl.textContent = GH3.fmtClock(left);
                self.clockEl.className = "timer" + (left <= 60 ? " danger" : (left <= 300 ? " warn" : ""));
            }
            if (++saveTick >= 5) { saveTick = 0; self.save(); }
            if (left <= 0) {
                self.stopTimer();
                GH3.toast("Time is up.", 3200);
                self.finishSection();
            }
        }, 1000);
    };

    Engine.prototype.stopTimer = function () {
        if (this.timer) { global.clearInterval(this.timer); this.timer = null; }
    };

    /* ---------- submission ---------- */
    Engine.prototype.confirmSubmit = function () {
        var sec = this.section();
        var total = this.allQuestions(sec).length;
        var blank = total - this.answeredCount(sec);
        var msg = blank > 0
            ? "You have " + blank + " unanswered question" + (blank === 1 ? "" : "s") +
              ". Microsoft does not penalize a wrong answer, so a guess is strictly better than a blank.\n\nSubmit anyway?"
            : "Submit and score?";
        if (global.confirm(msg)) this.finishSection();
    };

    Engine.prototype.finishSection = function () {
        this.stopTimer();
        this.state.done[this.section().id] = 1;
        if (this.state.sectionIdx >= this.sections.length - 1) {
            this.state.finishedAt = Date.now();
            this.state.screen = "results";
        } else {
            this.state.sectionIdx++;
            this.state.unitIdx = 0;
            this.currentQ = null;
            this.state.screen = "sectionIntro";
        }
        this.save();
        this.render();
    };

    /* ============================================================
       Results
       ============================================================ */
    Engine.prototype.renderResults = function () {
        var self = this;
        var results = [], right = 0, total = 0;
        for (var i = 0; i < this.sections.length; i++) {
            var sec = this.sections[i];
            var r = this.scoreSection(sec);
            results.push({ sec: sec, r: r });
            right += r.right; total += r.total;
        }
        var pct = total ? Math.round(right / total * 100) : 0;
        var isDrill = this.isDrill();
        var scaled = isDrill ? null : GH3.rawToScaled(right, total);
        var pass = GH3.passMark();

        var wrap = el("div");

        if (isDrill) {
            wrap.appendChild(el("div", "score-hero",
                '<div class="composite-label">Drill score</div>' +
                '<div class="composite">' + pct + "%</div>" +
                '<div class="delta">' + right + " of " + total + " correct. A drill is too short to scale \u2014 " +
                "read every explanation below, including the ones you got right.</div>"));
        } else {
            var v = GH3.verdict(scaled);
            var gap = scaled - pass;
            var shortBy = Math.max(1, GH3.correctNeeded(total) - right);
            var deltaTxt = gap > 0
                ? "That clears the " + pass + " passing mark by " + gap + " point" + (gap === 1 ? "" : "s") + "."
                : gap === 0
                ? "That lands exactly on the " + pass + " passing mark \u2014 a pass with no margin at all."
                : "That is " + Math.abs(gap) + " point" + (Math.abs(gap) === 1 ? "" : "s") +
                  " short of the " + pass + " passing mark \u2014 about " +
                  shortBy + " more correct answer" + (shortBy === 1 ? "" : "s") + " on this exam.";
            wrap.appendChild(el("div", "score-hero",
                '<div class="composite-label">Estimated scaled score \u00b7 GH-300</div>' +
                '<div class="composite">' + scaled + "</div>" +
                '<div class="delta"><span class="badge ' + v.cls + '">' + v.label + "</span> &nbsp;" + deltaTxt + "</div>" +
                '<div class="delta" style="font-size:.8rem;opacity:.85;margin-top:.5rem">' +
                right + " of " + total + " correct (" + pct + "%). Scale runs 1\u20131000; passing is " + pass + ".</div>"));
        }

        /* ---- domain tiles ---- */
        var agg = {};
        for (var t = 0; t < results.length; t++) {
            var tp = results[t].r.topics;
            for (var name in tp) {
                if (!Object.prototype.hasOwnProperty.call(tp, name)) continue;
                if (!agg[name]) agg[name] = { right: 0, total: 0 };
                agg[name].right += tp[name].right;
                agg[name].total += tp[name].total;
            }
        }

        var domains = GH3.TOPICS;
        var ordered = [], seen = {};
        for (var d = 0; d < domains.length; d++) {
            if (agg[domains[d].name]) {
                /* Label the tile with the skill area it belongs to. The weight
                   is published per skill area, never per sub-topic, and pinning
                   "25-30%" to a 5-question sub-topic reads as a contradiction. */
                var parent = null;
                for (var pd = 0; pd < GH3.DOMAINS.length; pd++) {
                    if (GH3.DOMAINS[pd].id === domains[d].domain) parent = GH3.DOMAINS[pd];
                }
                ordered.push({
                    name: domains[d].name,
                    weight: parent ? parent.short + " " + parent.weight : null,
                    s: agg[domains[d].name]
                });
                seen[domains[d].name] = 1;
            }
        }
        for (var kk in agg) {
            if (Object.prototype.hasOwnProperty.call(agg, kk) && !seen[kk]) {
                ordered.push({ name: kk, weight: null, s: agg[kk] });
            }
        }

        if (ordered.length > 1) {
            var tiles = el("div", "score-grid");
            tiles.style.marginBottom = "1.5rem";
            for (var o = 0; o < ordered.length; o++) {
                var it = ordered[o];
                var dp = Math.round(it.s.right / it.s.total * 100);
                var cls = dp >= 80 ? "up" : (dp >= 65 ? "flat" : "down");
                var note = dp >= 80 ? "\u25B2 Solid" : (dp >= 65 ? "\u2014 Borderline" : "\u25BC Needs work");
                tiles.appendChild(el("div", "score-tile",
                    '<div class="sname">' + GH3.escapeHtml(it.name) + "</div>" +
                    '<div class="sval">' + dp + "%</div>" +
                    '<div class="sraw">' + it.s.right + " / " + it.s.total + " correct" +
                    (it.weight ? " &middot; in " + it.weight : "") + "</div>" +
                    '<div class="schg ' + cls + '">' + note + "</div>" +
                    '<div class="meter" style="margin-top:.6rem"><i class="' +
                    (dp >= 80 ? "good" : (dp >= 65 ? "amber" : "bad")) + '" data-pct="' + dp + '"></i></div>'));
            }
            wrap.appendChild(tiles);
        }

        /* ---- pacing + weakest objectives ---- */
        var paceRows = "";
        for (var p = 0; p < results.length; p++) {
            var sp = Math.round(this.state.spent[results[p].sec.id] / 60);
            paceRows += "<tr><td>" + GH3.escapeHtml(results[p].sec.name) + "</td><td>" + sp + " of " +
                results[p].sec.timeMinutes + " min</td><td>" +
                (sp >= results[p].sec.timeMinutes ? '<span class="badge amber">Used the full clock</span>'
                    : '<span class="badge good">Finished with time to spare</span>') + "</td></tr>";
        }

        var objAgg = {};
        for (var t2 = 0; t2 < results.length; t2++) {
            var op = results[t2].r.objectives;
            for (var on in op) {
                if (!Object.prototype.hasOwnProperty.call(op, on)) continue;
                if (!objAgg[on]) objAgg[on] = { right: 0, total: 0 };
                objAgg[on].right += op[on].right;
                objAgg[on].total += op[on].total;
            }
        }
        var objRows = [];
        for (var oo in objAgg) {
            if (Object.prototype.hasOwnProperty.call(objAgg, oo)) {
                objRows.push({ name: oo, right: objAgg[oo].right, total: objAgg[oo].total,
                               pct: objAgg[oo].right / objAgg[oo].total });
            }
        }
        objRows.sort(function (a, b) { return a.pct - b.pct || b.total - a.total; });
        var weak = objRows.filter(function (x) { return x.pct < 1; }).slice(0, 12);

        var weakHtml = "";
        for (var w = 0; w < weak.length; w++) {
            var pv = Math.round(weak[w].pct * 100);
            var bc = pv >= 80 ? "good" : (pv >= 50 ? "amber" : "bad");
            weakHtml += '<div class="meter-row"><span class="mlabel">Objective ' + GH3.escapeHtml(weak[w].name) + "</span>" +
                '<span class="meter"><i class="' + bc + '" data-pct="' + pv + '"></i></span>' +
                '<span class="mval">' + weak[w].right + "/" + weak[w].total + "</span></div>";
        }
        if (!weakHtml) {
            // drills have no objective numbers, so fall back to the topic tags
            var topicRows = [];
            for (var tk in agg) {
                if (Object.prototype.hasOwnProperty.call(agg, tk)) {
                    topicRows.push({ name: tk, right: agg[tk].right, total: agg[tk].total,
                                     pct: agg[tk].right / agg[tk].total });
                }
            }
            topicRows.sort(function (a, b) { return a.pct - b.pct || b.total - a.total; });
            var tw = topicRows.filter(function (x) { return x.pct < 1; }).slice(0, 10);
            for (var y = 0; y < tw.length; y++) {
                var pv2 = Math.round(tw[y].pct * 100);
                var bc2 = pv2 >= 80 ? "good" : (pv2 >= 50 ? "amber" : "bad");
                weakHtml += '<div class="meter-row"><span class="mlabel">' + GH3.escapeHtml(tw[y].name) + "</span>" +
                    '<span class="meter"><i class="' + bc2 + '" data-pct="' + pv2 + '"></i></span>' +
                    '<span class="mval">' + tw[y].right + "/" + tw[y].total + "</span></div>";
            }
        }

        wrap.appendChild(el("div", "grid grid-2",
            '<div class="card"><h3 style="margin-top:0">Pacing</h3>' +
            '<div class="table-scroll"><table class="data-table"><thead><tr><th>Section</th><th>Time used</th><th></th></tr></thead><tbody>' +
            paceRows + "</tbody></table></div>" +
            '<p class="muted" style="margin-bottom:0;font-size:.88rem">The real exam gives you 100 minutes, and ' +
            "Microsoft does not publish the question count. If you are burning the whole clock here, pacing is a " +
            "separate problem from knowledge and needs its own practice.</p></div>" +
            '<div class="card"><h3 style="margin-top:0">What to fix first</h3>' +
            (weakHtml
                ? "<p class=\"muted\" style=\"font-size:.88rem\">Weakest first. Put the top three on today\u2019s study list " +
                  "and re-drill them before the next exam.</p>" + weakHtml
                : "<p>You did not miss anything. Move up to the next exam.</p>") +
            "</div>"));

        /* ---- review buttons ---- */
        var actions = el("div", "card");
        actions.style.marginTop = "1.25rem";
        actions.innerHTML = '<h3 style="margin-top:0">Review your answers</h3>' +
            "<p class=\"muted\">This is the part that actually raises the score. Read the explanation for every " +
            "question you missed, then write the rule \u2014 not the question \u2014 into your " +
            '<a href="tools.html#errorlog">error log</a> before you move on.</p>' +
            '<div class="btn-row" id="revBtns"></div>';
        var rb = actions.querySelector("#revBtns");
        for (var rr = 0; rr < this.sections.length; rr++) {
            (function (idx) {
                var b = el("button", "btn" + (idx === 0 ? "" : " secondary"),
                    self.sections.length > 1 ? "Review " + self.sections[idx].name : "Review missed questions");
                b.onclick = function () {
                    self.state.screen = "review";
                    self.state.reviewIdx = idx;
                    self.reviewFilter = "wrong";
                    self.save(); self.render();
                };
                rb.appendChild(b);
            })(rr);
        }
        var again = el("button", "btn ghost", "Retake this");
        again.onclick = function () {
            if (global.confirm("Erase every answer here and start fresh?")) self.reset();
        };
        rb.appendChild(again);
        wrap.appendChild(actions);

        this.root.appendChild(wrap);
        GH3.autoFillMeters(this.root);

        /* ---- remember the result ---- */
        if (!isDrill) {
            var hist = GH3.store.get("history", {});
            var domainSnapshot = {};
            for (var z = 0; z < ordered.length; z++) {
                domainSnapshot[ordered[z].name] = Math.round(ordered[z].s.right / ordered[z].s.total * 100);
            }
            hist[this.o.testId] = {
                title: this.o.title, at: this.state.finishedAt || Date.now(),
                core: this.core, right: right, total: total, pct: pct,
                scaled: scaled, pass: pass, passed: scaled >= pass,
                domains: domainSnapshot
            };
            GH3.store.set("history", hist);
        } else {
            var ds = GH3.store.get("drillScores", {});
            var did = this.o.testId.slice(6);
            if (!ds[did] || pct > ds[did].pct) {
                ds[did] = { right: right, total: total, pct: pct, at: Date.now() };
            }
            GH3.store.set("drillScores", ds);
        }
    };

    /* ============================================================
       Review
       ============================================================ */
    Engine.prototype.renderReview = function () {
        var self = this;
        var idx = this.state.reviewIdx || 0;
        var sec = this.sections[idx];
        var r = this.scoreSection(sec);

        var head = el("div", "card");
        head.style.marginBottom = "1.25rem";
        var tabs = "";
        if (this.sections.length > 1) {
            for (var i = 0; i < this.sections.length; i++) {
                tabs += '<button class="btn sm ' + (i === idx ? "" : "secondary") + '" data-sec="' + i + '">' +
                    GH3.escapeHtml(this.sections[i].name) + "</button>";
            }
        }
        head.innerHTML =
            '<h2 style="margin-top:0">Review</h2>' +
            "<p class=\"muted\">" + r.right + " right &middot; " + r.wrong + " wrong &middot; " + r.blank +
            " blank &middot; " + r.pct + "% correct" +
            (r.scaled == null ? "" : " &middot; estimated scaled score <strong>" + r.scaled + "</strong>") + "</p>" +
            (tabs ? '<div class="btn-row" style="margin-bottom:.8rem" id="secTabs">' + tabs + "</div>" : "") +
            '<div class="btn-row" id="filters">' +
            '<button class="btn sm ghost" data-f="wrong">Missed and blank only</button>' +
            '<button class="btn sm ghost" data-f="flagged">Flagged</button>' +
            '<button class="btn sm ghost" data-f="all">Everything</button>' +
            '<button class="btn sm secondary" id="backRes" style="margin-left:auto">Back to results</button>' +
            "</div>";
        this.root.appendChild(head);

        if (tabs) {
            qsa(head, "#secTabs button").forEach(function (b) {
                b.onclick = function () {
                    self.state.reviewIdx = parseInt(b.getAttribute("data-sec"), 10);
                    self.save(); self.render();
                };
            });
        }
        qsa(head, "#filters button[data-f]").forEach(function (b) {
            if (b.getAttribute("data-f") === self.reviewFilter) b.className = "btn sm";
            b.onclick = function () { self.reviewFilter = b.getAttribute("data-f"); self.render(); };
        });
        head.querySelector("#backRes").onclick = function () {
            self.state.screen = "results"; self.save(); self.render();
        };

        var a = this.state.answers[sec.id] || {}, f = this.state.flags[sec.id] || {};
        var shown = 0;

        for (var u = 0; u < sec.units.length; u++) {
            var unit = sec.units[u];
            var keep = [];
            for (var q = 0; q < unit.questions.length; q++) {
                var qq = unit.questions[q];
                var pick = a[qq.n];
                var isWrong = pick === undefined || pick !== qq.answer;
                if (this.reviewFilter === "wrong" && !isWrong) continue;
                if (this.reviewFilter === "flagged" && !f[qq.n]) continue;
                keep.push(qq);
            }
            if (!keep.length) continue;
            shown += keep.length;

            var block = el("div", "review-mode");
            block.style.marginBottom = "1.75rem";
            if (unit.title) block.appendChild(el("h3", null, unit.title));

            var list = el("div", "q-list");
            for (var kq = 0; kq < keep.length; kq++) list.appendChild(this.qCard(keep[kq], sec, true));
            block.appendChild(list);
            this.root.appendChild(block);
        }

        if (!shown) {
            this.root.appendChild(el("div", "card center",
                "<p style=\"margin:0\">Nothing to show with this filter. " +
                (this.reviewFilter === "wrong" ? "You did not miss a single question here."
                    : "You did not flag anything here.") + "</p>"));
        }
    };

    /* ---------- keyboard ---------- */
    Engine.prototype.bindKeys = function () {
        var self = this;
        document.addEventListener("keydown", function (e) {
            if (self.state.screen !== "exam") return;
            var tag = (e.target.tagName || "").toLowerCase();
            if (tag === "input" || tag === "textarea" || tag === "select") return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            var map = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
            var k = e.key.toLowerCase();
            if (self.currentQ !== null && Object.prototype.hasOwnProperty.call(map, k)) {
                var card = self.root.querySelector('.q-card[data-qn="' + self.currentQ + '"]');
                if (card) {
                    var choices = qsa(card, ".choice");
                    if (choices[map[k]]) { choices[map[k]].click(); e.preventDefault(); }
                }
            }
        });
    };

    /* ============================================================
       Public mounts
       ============================================================ */
    GH3.Test = {
        mount: function (opts) { return new Engine(opts); },

        mountDrill: function (opts) {
            var set = null, all = (bank().drills || []);
            for (var i = 0; i < all.length; i++) if (all[i].id === opts.drillId) set = all[i];
            if (!set) {
                opts.el.innerHTML = '<div class="card"><h3>Drill not found</h3><p>No drill set matches &quot;' +
                    GH3.escapeHtml(opts.drillId) + '&quot;.</p></div>';
                return null;
            }
            var sectionObj = {
                id: "drill_" + set.id,
                name: set.title,
                timeMinutes: set.timeMinutes || 10,
                units: [{ title: "", html: "", questions: set.questions }]
            };
            bank()[sectionObj.id] = sectionObj;
            return new Engine({
                el: opts.el,
                testId: "drill_" + set.id,
                title: set.title,
                blurb: set.blurb || "",
                isDrill: true,
                sections: [sectionObj.id]
            });
        }
    };

})(window);
