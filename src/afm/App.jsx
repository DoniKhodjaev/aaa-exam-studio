import React, { useState, useEffect } from "react";
import { UNITS } from "./lessons.js";
import {
  ChevronLeft, CheckCircle2, XCircle, Loader2, Sparkles, RotateCcw,
  Flame, Trophy, BookOpen, ArrowRight, KeyRound, Lock
} from "lucide-react";

/* ---------- storage (общий origin с AAA — ключ уже введён) ---------- */
const AK = "aaa3:apikey", AM = "aaa3:model";
const PK = "afm:progress", SK = "afm:srs", STK = "afm:streak";
const getKey = () => (localStorage.getItem(AK) || "").trim();
const getModel = () => (localStorage.getItem(AM) || "").trim() || "claude-sonnet-4-5";
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const ALL = UNITS.flatMap(u => u.lessons.map(l => ({ ...l, unit: u.id, unitTitle: u.title })));
const todayStr = () => new Date().toISOString().slice(0, 10);

async function explain(lesson, q, given) {
  const key = getKey();
  if (!key) throw new Error("Не задан API-ключ. Откройте настройки на странице AAA и вставьте ключ.");
  const prompt =
    "Ты преподаватель ACCA Financial Management. Студентка проходит тему «" + lesson.title + "».\n\n" +
    "ВОПРОС: " + q.q + "\n" +
    "ПРАВИЛЬНЫЙ ОТВЕТ: " + (q.t === "num" ? q.a + (q.unit || "") : q.opts[q.a]) + "\n" +
    "ЕЁ ОТВЕТ: " + given + "\n\n" +
    "Объясни по-русски в 3–5 предложениях: где именно ошибка в рассуждении и как правильно рассуждать в следующий раз. " +
    "Если ответ верный — объясни, как этот приём применяется дальше в AFM. Без markdown, только текст.";
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json", "x-api-key": key,
      "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({ model: getModel(), max_tokens: 700, messages: [{ role: "user", content: prompt }] })
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message || "API error");
  return (d.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
}

export default function AfmApp() {
  const [view, setView] = useState("home");
  const [progress, setProgress] = useState({});
  const [srs, setSrs] = useState({});
  const [streak, setStreak] = useState({ n: 0, last: null });
  const [lesson, setLesson] = useState(null);
  const [qi, setQi] = useState(0);
  const [val, setVal] = useState("");
  const [checked, setChecked] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [aiTip, setAiTip] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  useEffect(() => {
    setProgress(load(PK, {})); setSrs(load(SK, {})); setStreak(load(STK, { n: 0, last: null }));
  }, []);

  const bumpStreak = () => {
    const t = todayStr();
    if (streak.last === t) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    const n = streak.last === y ? streak.n + 1 : 1;
    const s = { n, last: t }; setStreak(s); save(STK, s);
  };

  const startLesson = (l) => {
    setLesson(l); setQi(0); setVal(""); setChecked(null); setWrong([]); setAiTip(""); setView("lesson");
  };

  const isCorrect = (q, v) => {
    if (q.t === "num") {
      const n = parseFloat(String(v).replace(/\s|,/g, "").replace(/[^0-9.\-]/g, ""));
      return isFinite(n) && Math.abs(n - q.a) <= (q.tol || 0.01);
    }
    return Number(v) === q.a;
  };

  const check = () => {
    const q = lesson.qs[qi];
    if (q.t === "num" && String(val).trim() === "") return;
    if (q.t === "mcq" && val === "") return;
    const ok = isCorrect(q, val);
    setChecked(ok);
    if (!ok) setWrong(w => w.concat([qi]));
  };

  const next = () => {
    setAiTip("");
    if (qi + 1 < lesson.qs.length) { setQi(qi + 1); setVal(""); setChecked(null); return; }
    const score = lesson.qs.length - wrong.length;
    const pct = Math.round((score / lesson.qs.length) * 100);
    const prev = progress[lesson.id] || {};
    const p = { ...progress, [lesson.id]: { done: true, best: Math.max(prev.best || 0, pct), last: pct, at: Date.now() } };
    setProgress(p); save(PK, p);
    const due = wrong.length ? 1 : Math.min(21, ((srs[lesson.id] && srs[lesson.id].step) || 1) * 3);
    const s = { ...srs, [lesson.id]: { step: due, dueAt: Date.now() + due * 864e5 } };
    setSrs(s); save(SK, s);
    bumpStreak();
    setView("done");
  };

  const askAi = async () => {
    setAiBusy(true);
    try {
      const q = lesson.qs[qi];
      const given = q.t === "num" ? String(val) : (q.opts[Number(val)] || "—");
      setAiTip(await explain(lesson, q, given));
    } catch (e) { setAiTip("Не удалось получить объяснение: " + ((e && e.message) || e)); }
    setAiBusy(false);
  };

  const doneCount = Object.values(progress).filter(p => p.done).length;
  const avg = doneCount ? Math.round(Object.values(progress).filter(p => p.done).reduce((s, p) => s + p.best, 0) / doneCount) : 0;
  const dueNow = ALL.filter(l => srs[l.id] && srs[l.id].dueAt <= Date.now());

  /* ---------------- HOME ---------------- */
  if (view === "home") {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
          <p className="text-xs uppercase tracking-widest text-indigo-700 font-semibold">ACCA · Advanced Financial Management</p>
          <h1 className="font-serif text-4xl mt-1">AFM Trainer</h1>
          <p className="text-stone-600 mt-2 text-sm leading-relaxed">
            Блок первый — восстановление базы FM. Короткие уроки с расчётами: теория, задания, мгновенная проверка
            и объяснение от ИИ, если ответ не сошёлся. Дальше добавим темы AFM и полноформатные экзамены.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="bg-white border border-stone-200 rounded-lg p-3">
              <p className="text-xs text-stone-500 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Пройдено</p>
              <p className="font-mono text-xl font-semibold">{doneCount}/{ALL.length}</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-3">
              <p className="text-xs text-stone-500 flex items-center gap-1"><Trophy className="w-3 h-3" /> Средний</p>
              <p className="font-mono text-xl font-semibold">{avg}%</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-3">
              <p className="text-xs text-stone-500 flex items-center gap-1"><Flame className="w-3 h-3" /> Серия</p>
              <p className="font-mono text-xl font-semibold">{streak.n}</p>
            </div>
          </div>

          {!getKey() && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-sm">Подсказки ИИ включатся после ввода API-ключа в настройках на странице AAA. Уроки работают и без него.</span>
            </div>
          )}

          {dueNow.length > 0 && (
            <div className="mt-4 bg-white border border-indigo-200 rounded-xl p-4">
              <p className="text-sm font-medium flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-indigo-700" /> Пора повторить: {dueNow.length}</p>
              <button onClick={() => startLesson(dueNow[0])}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 text-white px-3.5 py-2 text-sm font-medium hover:bg-indigo-800">
                {dueNow[0].title} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {UNITS.map((u, ui) => {
              const done = u.lessons.filter(l => progress[l.id] && progress[l.id].done).length;
              return (
                <div key={u.id} className="bg-white border border-stone-200 rounded-xl p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl">{ui + 1}. {u.title}</h3>
                    <span className="font-mono text-xs text-stone-500">{done}/{u.lessons.length}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{u.subtitle}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-stone-200">
                    <div className="h-1.5 rounded-full bg-indigo-600" style={{ width: (done / u.lessons.length * 100) + "%" }} />
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {u.lessons.map((l, li) => {
                      const p = progress[l.id];
                      const prevDone = li === 0 || (progress[u.lessons[li - 1].id] || {}).done;
                      const locked = !prevDone && !p;
                      return (
                        <button key={l.id} disabled={locked} onClick={() => startLesson(l)}
                          className={"w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left border " +
                            (locked ? "border-stone-100 text-stone-300 cursor-not-allowed"
                              : p && p.done ? "border-emerald-200 bg-emerald-50 hover:border-emerald-400"
                              : "border-stone-200 hover:border-stone-400")}>
                          {locked ? <Lock className="w-4 h-4 shrink-0" />
                            : p && p.done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            : <span className="w-4 h-4 rounded-full border-2 border-stone-300 shrink-0" />}
                          <span className="text-sm flex-1 min-w-0 truncate">{l.title}</span>
                          {p && p.done && <span className="font-mono text-xs text-emerald-700">{p.best}%</span>}
                          <span className="font-mono text-xs text-stone-400">{l.qs.length}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <a href="./" className="text-sm text-stone-500 hover:text-stone-900">← К платформе AAA</a>
            <span className="text-xs text-stone-400">Дальше: темы AFM и полные экзамены</span>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- LESSON ---------------- */
  if (view === "lesson" && lesson) {
    const q = lesson.qs[qi];
    const pct = Math.round((qi / lesson.qs.length) * 100);
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="sticky top-0 bg-stone-100 border-b border-stone-200 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={() => setView("home")} className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-stone-200">
                <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: pct + "%" }} />
              </div>
            </div>
            <span className="font-mono text-xs text-stone-500">{qi + 1}/{lesson.qs.length}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-5 pb-16">
          {qi === 0 && checked === null && (
            <div className="bg-white border border-indigo-200 rounded-xl p-4 mb-4">
              <p className="text-xs uppercase tracking-widest text-indigo-700 font-semibold">Теория</p>
              <h2 className="font-serif text-xl mt-0.5">{lesson.title}</h2>
              <p className="text-sm leading-relaxed mt-2 text-stone-800">{lesson.theory}</p>
            </div>
          )}

          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <p className="text-sm leading-relaxed">{q.q}</p>

            {q.t === "mcq" ? (
              <div className="mt-4 space-y-2">
                {q.opts.map((o, i) => {
                  const sel = String(val) === String(i);
                  const showRight = checked !== null && i === q.a;
                  const showWrong = checked === false && sel && i !== q.a;
                  return (
                    <button key={i} disabled={checked !== null} onClick={() => setVal(String(i))}
                      className={"w-full text-left rounded-lg border px-3 py-2.5 text-sm " +
                        (showRight ? "border-emerald-500 bg-emerald-50"
                          : showWrong ? "border-red-500 bg-red-50"
                          : sel ? "border-indigo-600 bg-indigo-50" : "border-stone-300 hover:border-stone-400")}>
                      {o}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2">
                <input value={val} onChange={e => setVal(e.target.value)} disabled={checked !== null}
                  onKeyDown={e => { if (e.key === "Enter") checked === null ? check() : next(); }}
                  placeholder="Ответ числом" inputMode="decimal"
                  className={"flex-1 rounded-lg border p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600 " +
                    (checked === true ? "border-emerald-500 bg-emerald-50" : checked === false ? "border-red-500 bg-red-50" : "border-stone-300")} />
                {q.unit && <span className="font-mono text-sm text-stone-500">{q.unit}</span>}
              </div>
            )}

            {checked !== null && (
              <div className={"mt-4 rounded-lg p-3 " + (checked ? "bg-emerald-50" : "bg-red-50")}>
                <p className={"text-sm font-semibold flex items-center gap-1.5 " + (checked ? "text-emerald-800" : "text-red-800")}>
                  {checked ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {checked ? "Верно" : "Неверно — правильный ответ: " + (q.t === "num" ? q.a + (q.unit || "") : q.opts[q.a])}
                </p>
                <p className="text-sm mt-1.5 leading-relaxed text-stone-800">{q.e}</p>
                {!aiTip && (
                  <button onClick={askAi} disabled={aiBusy}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs hover:bg-stone-50 disabled:opacity-60">
                    {aiBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    Разобрать подробнее
                  </button>
                )}
                {aiTip && <p className="mt-2 text-sm leading-relaxed bg-white rounded-lg p-3 border border-stone-200">{aiTip}</p>}
              </div>
            )}

            <button onClick={checked === null ? check : next}
              className="mt-4 w-full rounded-xl bg-indigo-700 text-white px-4 py-3 font-medium hover:bg-indigo-800">
              {checked === null ? "Проверить" : (qi + 1 < lesson.qs.length ? "Дальше" : "Завершить урок")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- DONE ---------------- */
  if (view === "done" && lesson) {
    const score = lesson.qs.length - wrong.length;
    const pct = Math.round((score / lesson.qs.length) * 100);
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-sm w-full text-center">
          <Trophy className={"w-10 h-10 mx-auto " + (pct >= 80 ? "text-amber-500" : "text-stone-300")} />
          <h2 className="font-serif text-2xl mt-3">{lesson.title}</h2>
          <p className="font-mono text-3xl font-semibold mt-2">{score}<span className="text-stone-400">/{lesson.qs.length}</span></p>
          <p className={"mt-1 text-sm font-semibold " + (pct >= 80 ? "text-emerald-700" : "text-stone-600")}>{pct}%</p>
          <p className="text-xs text-stone-500 mt-3">
            {wrong.length ? "Урок вернётся на повторение завтра." : "Следующее повторение через несколько дней."}
          </p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => startLesson(lesson)} className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50">Ещё раз</button>
            <button onClick={() => setView("home")} className="flex-1 rounded-lg bg-indigo-700 text-white px-3 py-2 text-sm font-medium hover:bg-indigo-800">К списку</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
