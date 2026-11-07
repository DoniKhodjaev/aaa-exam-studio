import React, { useState, useEffect, useRef, useMemo } from "react";
import { UNITS, TRACKS } from "./lessons/index.js";
import { EXCEL_FUNCS, DAX_FUNCS } from "./funcs.js";
import { FxList, FxTaskView, FX_TASKS } from "./FxPractice.jsx";
import { CASES } from "./cases.js";
import { GLOSSARY } from "./glossary.js";
import { AK, AM, DEFAULT_MODEL, getKey, getModel, load, save, callClaude, parseNum, fmt, extractJson, TUTOR_SYSTEM, GEN_PROMPT } from "./ai.js";
import {
  ChevronLeft, Code2, CheckCircle2, XCircle, Loader2, Sparkles, RotateCcw, Flame, Trophy, ArrowRight, KeyRound,
  Lightbulb, Eye, Search, Send, Trash2, Wand2, BookOpen, Briefcase, Library, MessageCircle, Settings, GraduationCap, X
} from "lucide-react";

/* ---------- ключи прогресса ---------- */
const PK = "cons:progress", SK = "cons:srs", CK = "cons:cases", STK = "cons:streak", CHK = "cons:chat", GK = "cons:gencases";
const ALL = TRACKS.flatMap(t => t.units.flatMap((u, ui) => u.lessons.map(l => ({ ...l, unit: u.id, unitTitle: u.title, unitNo: ui + 1, track: t.id, trackTitle: t.title }))));
const today = () => new Date().toISOString().slice(0, 10);
const LEVELS = { 1: "Базовый", 2: "Средний", 3: "Продвинутый" };
const nb = x => typeof x === "string" ? x.replace(/(\d) (?=\d{3}(?!\d))/g, "$1\u00a0") : x;
const shuffle = n => { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const caseTol = s => (s.tol !== undefined ? s.tol : Math.max(0.6, Math.abs(s.a) * 0.0005));

/* ---------- мелкие компоненты ---------- */
const Card = ({ className = "", children }) => <div className={"bg-white border border-stone-200 rounded-xl " + className}>{children}</div>;
const Btn = ({ kind = "primary", className = "", ...p }) => (
  <button {...p} className={(kind === "primary"
    ? "bg-teal-800 text-white hover:bg-teal-900 disabled:opacity-50"
    : kind === "ghost" ? "border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-50"
    : "text-stone-600 hover:text-stone-900") + " inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium " + className} />
);

const isNumCell = c => /^[(−\-+]?\s*[\d][\d\s\u00a0,.%]*\)?(\s*(млн|₸|%))?$/.test(String(c).trim()) || /^\(?[\d\s,.]+\)?$/.test(String(c).trim()) || String(c).trim() === "—";

function DataTable({ t }) {
  const numCol = t.cols.map((_, ci) => ci > 0 && t.rows.every(r => r[ci] === undefined || r[ci] === "" || isNumCell(r[ci])));
  const wide = t.cols.length >= 4 && numCol.filter(Boolean).length < t.cols.length - 1;
  return (
    <div className="mt-3">
      {t.title && <p className="text-xs font-semibold text-stone-500 mb-1.5">{t.title}</p>}
      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className={"w-full text-sm " + (wide ? "min-w-[640px]" : "")}>
          <thead className="bg-stone-50">
            <tr>{t.cols.map((c, i) => <th key={i} className={"px-3 py-2 font-semibold text-stone-700 align-bottom " + (numCol[i] ? "text-right whitespace-nowrap" : "text-left")}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {t.rows.map((r, ri) => {
              const total = /^Итого/.test(String(r[0]));
              return (
                <tr key={ri} className={"border-t border-stone-100 " + (total ? "font-semibold bg-stone-50/60" : "")}>
                  {r.map((c, ci) => <td key={ci} className={"px-3 py-1.5 align-top " + (numCol[ci] ? "text-right font-mono whitespace-nowrap" : "text-left leading-snug " + (ci === 0 ? "font-medium text-stone-800" : "text-stone-700"))}>{nb(c)}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Theory({ blocks }) {
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        if (b.h) return <h3 key={i} className="font-serif text-lg pt-2">{b.h}</h3>;
        if (b.p) return <p key={i} className="text-[15px] leading-relaxed text-stone-800">{nb(b.p)}</p>;
        if (b.list) return (
          <ul key={i} className="space-y-1.5">
            {b.list.map((x, j) => <li key={j} className="text-[15px] leading-relaxed text-stone-800 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-teal-600">{nb(x)}</li>)}
          </ul>
        );
        if (b.table) return <DataTable key={i} t={b.table} />;
        if (b.ex) return (
          <div key={i} className="rounded-lg bg-stone-50 border border-stone-200 p-3.5">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">{b.ex.title}</p>
            <div className="mt-1.5 space-y-1">{b.ex.lines.map((x, j) => <p key={j} className="text-sm font-mono leading-relaxed whitespace-pre-wrap text-stone-800">{nb(x)}</p>)}</div>
          </div>
        );
        if (b.code) return <pre key={i} className="rounded-lg bg-stone-900 text-stone-100 p-3.5 text-[13px] leading-relaxed overflow-x-auto font-mono whitespace-pre">{b.code}</pre>;
        if (b.tip) return <div key={i} className="rounded-lg bg-teal-50 border border-teal-200 p-3.5 text-sm leading-relaxed"><span className="font-semibold text-teal-900">На практике. </span>{nb(b.tip)}</div>;
        if (b.warn) return <div key={i} className="rounded-lg bg-amber-50 border border-amber-200 p-3.5 text-sm leading-relaxed"><span className="font-semibold text-amber-900">Ловушка. </span>{nb(b.warn)}</div>;
        return null;
      })}
    </div>
  );
}

function AiBox({ text }) {
  return <p className="mt-2 text-sm leading-relaxed bg-white rounded-lg p-3 border border-stone-200 whitespace-pre-wrap">{text}</p>;
}

/* ---------- настройки ---------- */
function SettingsModal({ onClose }) {
  const [key, setKey] = useState(getKey());
  const [model, setModel] = useState(getModel());
  const saveAll = () => {
    try { localStorage.setItem(AK, key.trim()); localStorage.setItem(AM, (model || "").trim() || DEFAULT_MODEL); } catch {}
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-5 max-w-md w-full">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl">Настройки ИИ</h3>
          <button onClick={onClose} className="p-1 text-stone-500 hover:text-stone-900"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">Ключ общий с AAA Exam Studio: если он уже введён там, здесь ничего делать не нужно. Хранится только в этом браузере и отправляется только на api.anthropic.com.</p>
        <label className="block text-xs font-semibold text-stone-500 mt-4">Anthropic API-ключ</label>
        <input value={key} onChange={e => setKey(e.target.value)} type="password" placeholder="sk-ant-..."
          className="mt-1 w-full rounded-lg border border-stone-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-700" />
        <label className="block text-xs font-semibold text-stone-500 mt-3">Модель</label>
        <input value={model} onChange={e => setModel(e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-700" />
        <div className="mt-5 flex gap-2 justify-end">
          <Btn kind="ghost" onClick={onClose}>Отмена</Btn>
          <Btn onClick={saveAll}>Сохранить</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
export default function ConsApp() {
  const [tab, setTab] = useState("course");
  const [track, setTrack] = useState(() => load("cons:track", "cons"));
  const pickTrack = t => { setTrack(t); save("cons:track", t); };
  const [view, setView] = useState("home");
  const [progress, setProgress] = useState(() => load(PK, {}));
  const [srs, setSrs] = useState(() => load(SK, {}));
  const [caseProg, setCaseProg] = useState(() => load(CK, {}));
  const [streak, setStreak] = useState(() => load(STK, { n: 0, last: null }));
  const [genCases, setGenCases] = useState(() => load(GK, []));
  const [lesson, setLesson] = useState(null);
  const [cs, setCs] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [tutorSeed, setTutorSeed] = useState("");
  const [fx, setFx] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [view, tab, lesson, cs]);

  const bumpStreak = () => {
    const t = today();
    if (streak.last === t) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    const s = { n: streak.last === y ? streak.n + 1 : 1, last: t };
    setStreak(s); save(STK, s);
  };

  const finishLesson = (l, wrongCount) => {
    const pct = Math.round(((l.qs.length - wrongCount) / l.qs.length) * 100);
    const prev = progress[l.id] || {};
    const p = { ...progress, [l.id]: { done: true, best: Math.max(prev.best || 0, pct), last: pct, at: Date.now() } };
    setProgress(p); save(PK, p);
    const step = wrongCount ? 1 : Math.min(30, ((srs[l.id] && srs[l.id].step) || 1) * 3);
    const s = { ...srs, [l.id]: { step, dueAt: Date.now() + step * 864e5 } };
    setSrs(s); save(SK, s);
    bumpStreak();
  };

  const finishCase = (c, correct, total) => {
    const prev = caseProg[c.id] || {};
    const pct = Math.round(correct / total * 100);
    const p = { ...caseProg, [c.id]: { done: true, best: Math.max(prev.best || 0, pct), last: pct, at: Date.now() } };
    setCaseProg(p); save(CK, p);
    bumpStreak();
  };

  const openTutor = (seed) => { setTutorSeed(seed || ""); setTab("tutor"); setView("home"); };

  if (view === "lesson" && lesson)
    return <LessonView lesson={lesson} onBack={() => setView("home")} onFinish={finishLesson} onAsk={openTutor}
      onNext={() => { const i = ALL.findIndex(x => x.id === lesson.id); if (ALL[i + 1] && ALL[i + 1].track === lesson.track) setLesson(ALL[i + 1]); else setView("home"); }} />;
  if (view === "fx" && fx)
    return <FxTaskView task={fx} onBack={() => setView("home")}
      onNext={() => { const i = FX_TASKS.findIndex(t => t.id === fx.id); if (FX_TASKS[i + 1]) setFx(FX_TASKS[i + 1]); else setView("home"); }} />;
  if (view === "case" && cs)
    return <CaseView c={cs} onBack={() => setView("home")} onFinish={finishCase} />;

  const doneL = ALL.filter(l => progress[l.id] && progress[l.id].done);
  const avg = doneL.length ? Math.round(doneL.reduce((s, l) => s + progress[l.id].best, 0) / doneL.length) : 0;
  const doneC = CASES.filter(c => caseProg[c.id] && caseProg[c.id].done).length;
  const due = ALL.filter(l => srs[l.id] && srs[l.id].dueAt <= Date.now());
  const curTrack = TRACKS.find(t => t.id === track) || TRACKS[0];
  const trackAll = ALL.filter(l => l.track === curTrack.id);
  const nextL = trackAll.find(l => !(progress[l.id] && progress[l.id].done));

  const tabs = [
    { id: "course", label: "Курс", icon: BookOpen },
    { id: "cases", label: "Кейсы", icon: Briefcase },
    { id: "funcs", label: "Формулы", icon: Code2 },
    { id: "glossary", label: "Глоссарий", icon: Library },
    { id: "tutor", label: "Наставник", icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-24">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-800 font-semibold">МСФО · НСБУ → МСФО · Excel · Power BI</p>
            <h1 className="font-serif text-4xl mt-1">Consolidation Studio</h1>
          </div>
          <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg hover:bg-stone-200 text-stone-600" title="Настройки"><Settings className="w-5 h-5" /></button>
        </div>
        <p className="text-stone-600 mt-2 text-sm leading-relaxed max-w-2xl">
          Практика для работы в холдинге: три курса — консолидация по МСФО, Excel для финансиста и Power BI с нуля ({ALL.length} уроков, {ALL.reduce((s, l) => s + l.qs.length, 0)} заданий),
          {" "}{CASES.length} пошаговых кейсов с проверкой каждого шага, справочник функций Excel и DAX и ИИ-наставник.
        </p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            ["Уроки", doneL.length + "/" + ALL.length, BookOpen],
            ["Средний балл", avg + "%", Trophy],
            ["Кейсы", doneC + "/" + CASES.length, Briefcase],
            ["Серия дней", streak.n, Flame]
          ].map(([t, v, I]) => (
            <Card key={t} className="p-3">
              <p className="text-xs text-stone-500 flex items-center gap-1"><I className="w-3 h-3" /> {t}</p>
              <p className="font-mono text-xl font-semibold mt-0.5">{v}</p>
            </Card>
          ))}
        </div>

        {!getKey() && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5">
            <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-sm flex-1">Уроки и кейсы работают без ключа. Наставник, разборы ошибок и генератор кейсов включатся после ввода API-ключа.</span>
            <Btn kind="ghost" onClick={() => setShowSettings(true)} className="shrink-0">Ввести</Btn>
          </div>
        )}

        <div className="mt-6 flex gap-1 bg-stone-200/70 rounded-xl p-1 sticky top-2 z-20">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={"flex-1 min-w-0 inline-flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 rounded-lg py-1.5 sm:py-2 text-sm font-medium " + (tab === t.id ? "bg-white shadow-sm text-stone-900" : "text-stone-600 hover:text-stone-900")}>
              <t.icon className="w-4 h-4 shrink-0" /><span className="hidden sm:inline">{t.label}</span><span className="sm:hidden text-[10px] leading-tight truncate max-w-full">{t.label}</span>
            </button>
          ))}
        </div>

        {tab === "course" && (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {TRACKS.map(t => {
                const ls = ALL.filter(l => l.track === t.id), d = ls.filter(l => progress[l.id] && progress[l.id].done).length;
                return (
                  <button key={t.id} onClick={() => pickTrack(t.id)}
                    className={"rounded-xl border p-3 text-left " + (curTrack.id === t.id ? "border-teal-700 bg-teal-50 ring-1 ring-teal-700" : "border-stone-200 bg-white hover:border-stone-400")}>
                    <p className="text-sm font-semibold leading-tight">{t.short}</p>
                    <p className="font-mono text-xs text-stone-500 mt-1">{d}/{ls.length}</p>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-stone-600">{curTrack.subtitle}</p>
            {(nextL || due.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-2">
                {nextL && (
                  <Card className="p-4 border-teal-200">
                    <p className="text-xs uppercase tracking-widest text-teal-800 font-semibold">Продолжить</p>
                    <p className="text-sm mt-1 font-medium">{nextL.unitNo}. {nextL.title}</p>
                    <Btn className="mt-3" onClick={() => { setLesson(nextL); setView("lesson"); }}>Открыть урок <ArrowRight className="w-4 h-4" /></Btn>
                  </Card>
                )}
                {due.length > 0 && (
                  <Card className="p-4">
                    <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Повторить: {due.length}</p>
                    <p className="text-sm mt-1 font-medium">{due[0].title}</p>
                    <Btn kind="ghost" className="mt-3" onClick={() => { setLesson(due[0]); setView("lesson"); }}>Повторить <ArrowRight className="w-4 h-4" /></Btn>
                  </Card>
                )}
              </div>
            )}
            {curTrack.units.map((u, ui) => {
              const done = u.lessons.filter(l => progress[l.id] && progress[l.id].done).length;
              return (
                <Card key={u.id} className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl">{ui + 1}. {u.title}</h3>
                    <span className="font-mono text-xs text-stone-500">{done}/{u.lessons.length}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{u.subtitle}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-stone-200"><div className="h-1.5 rounded-full bg-teal-700" style={{ width: (done / u.lessons.length * 100) + "%" }} /></div>
                  <div className="mt-3 space-y-1.5">
                    {u.lessons.map(l => {
                      const p = progress[l.id];
                      const full = ALL.find(x => x.id === l.id);
                      return (
                        <button key={l.id} onClick={() => { setLesson(full); setView("lesson"); }}
                          className={"w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left border " + (p && p.done ? "border-emerald-200 bg-emerald-50 hover:border-emerald-400" : "border-stone-200 hover:border-stone-400")}>
                          {p && p.done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <span className="w-4 h-4 rounded-full border-2 border-stone-300 shrink-0" />}
                          <span className="text-sm flex-1 min-w-0">{l.title}</span>
                          {p && p.done && <span className="font-mono text-xs text-emerald-700">{p.best}%</span>}
                          <span className="font-mono text-xs text-stone-400">{l.qs.length}</span>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {tab === "cases" && <CasesTab caseProg={caseProg} genCases={genCases} setGenCases={setGenCases}
          open={c => { setCs(c); setView("case"); }} needKey={() => setShowSettings(true)} />}

        {tab === "funcs" && <FormulasTab openFx={t => { setFx(t); setView("fx"); }} />}

        {tab === "glossary" && <GlossaryTab />}

        {tab === "tutor" && <TutorTab seed={tutorSeed} clearSeed={() => setTutorSeed("")} needKey={() => setShowSettings(true)} />}

        <div className="mt-10 flex items-center justify-between text-sm">
          <a href="./" className="text-stone-500 hover:text-stone-900">← К платформе AAA</a>
          <span className="text-xs text-stone-400">Прогресс хранится в этом браузере</span>
        </div>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

/* ============================================================ */
function LessonView({ lesson, onBack, onFinish, onNext, onAsk }) {
  const [phase, setPhase] = useState("theory");
  const [qi, setQi] = useState(0);
  const [val, setVal] = useState("");
  const [checked, setChecked] = useState(null);
  const [wrong, setWrong] = useState(0);
  const [tip, setTip] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { setPhase("theory"); setQi(0); setVal(""); setChecked(null); setWrong(0); setTip(""); }, [lesson.id]);
  useEffect(() => { window.scrollTo(0, 0); }, [phase]);

  const q = lesson.qs[qi];
  const order = useMemo(() => q.t === "mcq" ? shuffle(q.opts.length) : [], [lesson.id, qi, phase === "quiz"]);
  const isRight = () => q.t === "num" ? Math.abs(parseNum(val) - q.a) <= (q.tol !== undefined ? q.tol : 0.5) : Number(val) === q.a;
  const rightText = () => q.t === "num" ? fmt(q.a) + (q.unit ? " " + q.unit : "") : q.opts[q.a];

  const check = () => {
    if (String(val).trim() === "") return;
    const ok = isRight(); setChecked(ok); if (!ok) setWrong(w => w + 1);
  };
  const next = () => {
    setTip("");
    if (qi + 1 < lesson.qs.length) { setQi(qi + 1); setVal(""); setChecked(null); return; }
    onFinish(lesson, wrong); setPhase("done");
  };
  const explain = async () => {
    setBusy(true);
    try {
      const given = q.t === "num" ? val : q.opts[Number(val)];
      setTip(await callClaude({ system: TUTOR_SYSTEM, maxTokens: 700, messages: [{ role: "user", content:
        "Урок «" + lesson.title + "».\nВопрос: " + q.q + "\nПравильный ответ: " + rightText() + "\nОтвет ученицы: " + given + "\nКраткое объяснение из курса: " + q.e +
        "\n\n" + (checked ? "Ответ верный. Объясни в 3–4 предложениях, где этот приём встречается в реальной консолидации холдинга." : "Объясни в 4–6 предложениях, какая, скорее всего, ошибка в рассуждении привела к её ответу и как рассуждать правильно.") }] }));
    } catch (e) { setTip("Не удалось получить разбор: " + e.message); }
    setBusy(false);
  };

  const Header = ({ pct }) => (
    <div className="sticky top-0 bg-stone-100/95 backdrop-blur border-b border-stone-200 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600"><ChevronLeft className="w-5 h-5" /></button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-stone-500 truncate">{lesson.trackTitle} · Модуль {lesson.unitNo}. {lesson.unitTitle}</p>
          {pct !== undefined && <div className="mt-1 h-1.5 rounded-full bg-stone-200"><div className="h-1.5 rounded-full bg-teal-700 transition-all" style={{ width: pct + "%" }} /></div>}
        </div>
        {phase === "quiz" && <span className="font-mono text-xs text-stone-500">{qi + 1}/{lesson.qs.length}</span>}
      </div>
    </div>
  );

  if (phase === "theory") return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-6 pb-20">
        <p className="text-xs uppercase tracking-widest text-teal-800 font-semibold">Теория</p>
        <h1 className="font-serif text-3xl mt-1">{lesson.title}</h1>
        <Card className="p-5 mt-4"><Theory blocks={lesson.theory} /></Card>
        <div className="mt-5 flex flex-wrap gap-2">
          <Btn onClick={() => setPhase("quiz")}>К заданиям ({lesson.qs.length}) <ArrowRight className="w-4 h-4" /></Btn>
          <Btn kind="ghost" onClick={() => onAsk("Объясни тему «" + lesson.title + "» другими словами и дай свой числовой пример.")}><MessageCircle className="w-4 h-4" /> Спросить наставника</Btn>
        </div>
      </div>
    </div>
  );

  if (phase === "done") {
    const score = lesson.qs.length - wrong, pct = Math.round(score / lesson.qs.length * 100);
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <Card className="p-6 max-w-sm w-full text-center">
          <Trophy className={"w-10 h-10 mx-auto " + (pct >= 80 ? "text-amber-500" : "text-stone-300")} />
          <h2 className="font-serif text-2xl mt-3">{lesson.title}</h2>
          <p className="font-mono text-3xl font-semibold mt-2">{score}<span className="text-stone-400">/{lesson.qs.length}</span></p>
          <p className={"mt-1 text-sm font-semibold " + (pct >= 80 ? "text-emerald-700" : "text-stone-600")}>{pct}%</p>
          <p className="text-xs text-stone-500 mt-3">{wrong ? "Урок вернётся на повторение завтра." : "Следующее повторение — через несколько дней."}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Btn kind="ghost" onClick={() => { setPhase("theory"); setQi(0); setVal(""); setChecked(null); setWrong(0); }}>Ещё раз</Btn>
            <Btn onClick={onNext}>Следующий урок</Btn>
          </div>
          <Btn kind="link" className="mt-2" onClick={onBack}>К списку уроков</Btn>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <Header pct={Math.round(qi / lesson.qs.length * 100)} />
      <div className="max-w-3xl mx-auto px-4 py-5 pb-20">
        <Card className="p-5">
          <p className="text-[15px] leading-relaxed">{nb(q.q)}</p>
          {q.t === "mcq" ? (
            <div className="mt-4 space-y-2">
              {order.map(i => { const o = q.opts[i];
                const sel = String(val) === String(i), right = checked !== null && i === q.a, bad = checked === false && sel && i !== q.a;
                return (
                  <button key={i} disabled={checked !== null} onClick={() => setVal(String(i))}
                    className={"w-full text-left rounded-lg border px-3 py-2.5 text-sm " + (right ? "border-emerald-500 bg-emerald-50" : bad ? "border-red-500 bg-red-50" : sel ? "border-teal-700 bg-teal-50" : "border-stone-300 hover:border-stone-400")}>
                    {nb(o)}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              <input autoFocus value={val} onChange={e => setVal(e.target.value)} disabled={checked !== null}
                onKeyDown={e => { if (e.key === "Enter") checked === null ? check() : next(); }}
                placeholder="Ответ числом" inputMode="decimal"
                className={"flex-1 rounded-lg border p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-700 " + (checked === true ? "border-emerald-500 bg-emerald-50" : checked === false ? "border-red-500 bg-red-50" : "border-stone-300")} />
              {q.unit && <span className="font-mono text-sm text-stone-500">{q.unit}</span>}
            </div>
          )}
          {checked !== null && (
            <div className={"mt-4 rounded-lg p-3 " + (checked ? "bg-emerald-50" : "bg-red-50")}>
              <p className={"text-sm font-semibold flex items-center gap-1.5 " + (checked ? "text-emerald-800" : "text-red-800")}>
                {checked ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {checked ? "Верно" : "Неверно. Правильный ответ: " + rightText()}
              </p>
              <p className="text-sm mt-1.5 leading-relaxed text-stone-800">{nb(q.e)}</p>
              {!tip && <Btn kind="ghost" className="mt-2 !py-1.5 !text-xs" onClick={explain} disabled={busy}>{busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} Разобрать подробнее</Btn>}
              {tip && <AiBox text={tip} />}
            </div>
          )}
          <Btn className="mt-4 w-full !py-3" onClick={checked === null ? check : next}>
            {checked === null ? "Проверить" : qi + 1 < lesson.qs.length ? "Дальше" : "Завершить урок"}
          </Btn>
        </Card>
        {qi > 0 && checked === null && <Btn kind="link" className="mt-3" onClick={() => setPhase("theory")}><BookOpen className="w-4 h-4" /> Перечитать теорию</Btn>}
      </div>
    </div>
  );
}

/* ============================================================ */
function CasesTab({ caseProg, genCases, setGenCases, open, needKey }) {
  const [lvl, setLvl] = useState(0);
  const [genTopic, setGenTopic] = useState("Гудвил и NCI с дооценками");
  const [genLvl, setGenLvl] = useState(2);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const list = CASES.filter(c => !lvl || c.level === lvl);
  const TOPICS = ["Гудвил и NCI с дооценками", "Внутригрупповые операции и URP", "Консолидированный ОПиУ с покупкой в середине года",
    "Ассоциированная компания и URP", "Поэтапное приобретение", "Продажа дочки с потерей контроля", "Иностранная дочка (IAS 21)",
    "Консолидированный ОДДС", "Трансформация НСБУ в МСФО", "Внутригрупповая сверка и элиминации", "Полный консолидированный баланс с двумя дочками"];

  const generate = async () => {
    if (!getKey()) { needKey(); return; }
    setBusy(true); setErr("");
    try {
      const txt = await callClaude({ system: TUTOR_SYSTEM, maxTokens: 4000, messages: [{ role: "user", content: GEN_PROMPT(genTopic, genLvl) }] });
      const c = extractJson(txt);
      if (!c.steps || !c.steps.length) throw new Error("в кейсе нет шагов");
      c.steps = c.steps.filter(s => isFinite(Number(s.a))).map(s => ({ ...s, a: Number(s.a) }));
      const gc = { ...c, id: "g" + Date.now(), level: Number(c.level) || genLvl, topics: c.topics || [genTopic], story: c.story || [], tables: c.tables || [], ai: true };
      const all = [gc, ...genCases].slice(0, 30);
      setGenCases(all); save(GK, all); open(gc);
    } catch (e) { setErr("Не получилось: " + e.message); }
    setBusy(false);
  };
  const del = id => { const all = genCases.filter(c => c.id !== id); setGenCases(all); save(GK, all); };

  const Row = ({ c, onDel }) => {
    const p = caseProg[c.id];
    return (
      <div className={"flex items-stretch rounded-xl border bg-white " + (p && p.done ? "border-emerald-200" : "border-stone-200")}>
        <button onClick={() => open(c)} className="flex-1 text-left p-4 hover:bg-stone-50 rounded-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={"text-[11px] font-semibold rounded-full px-2 py-0.5 " + (c.level === 1 ? "bg-sky-50 text-sky-800" : c.level === 2 ? "bg-teal-50 text-teal-800" : "bg-violet-50 text-violet-800")}>{LEVELS[c.level] || "—"}</span>
            {c.ai && <span className="text-[11px] font-semibold rounded-full px-2 py-0.5 bg-amber-50 text-amber-800">ИИ</span>}
            <span className="text-xs text-stone-400">{c.steps.length} шагов</span>
            {p && p.done && <span className="text-xs font-mono text-emerald-700 ml-auto">{p.best}%</span>}
          </div>
          <p className="font-medium mt-1.5 text-[15px]">{c.title}</p>
          <p className="text-xs text-stone-500 mt-1">{(c.topics || []).join(" · ")}</p>
        </button>
        {onDel && <button onClick={() => onDel(c.id)} className="px-3 text-stone-400 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>}
      </div>
    );
  };

  return (
    <div className="mt-5">
      <p className="text-sm text-stone-600 leading-relaxed">Каждый кейс — ситуация из жизни узбекского холдинга с исходными данными. Решаете по шагам: вводите число, получаете проверку, подсказку и полное решение.</p>
      <div className="mt-3 flex gap-1.5 flex-wrap">
        {[0, 1, 2, 3].map(l => (
          <button key={l} onClick={() => setLvl(l)} className={"rounded-full px-3 py-1 text-xs font-medium border " + (lvl === l ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-300 text-stone-700")}>{l ? LEVELS[l] : "Все"}</button>
        ))}
      </div>
      <div className="mt-3 space-y-2">{list.map(c => <Row key={c.id} c={c} />)}</div>

      <Card className="mt-6 p-4 border-amber-200">
        <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold flex items-center gap-1"><Wand2 className="w-3.5 h-3.5" /> Новый кейс от ИИ</p>
        <p className="text-sm text-stone-600 mt-1 leading-relaxed">Бесконечная практика: ИИ составит новый кейс по выбранной теме. Ответы считает ИИ — если не сходится, перепроверьте и спросите наставника.</p>
        <div className="mt-3 grid sm:grid-cols-[1fr_auto_auto] gap-2">
          <select value={genTopic} onChange={e => setGenTopic(e.target.value)} className="rounded-lg border border-stone-300 p-2 text-sm bg-white">
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={genLvl} onChange={e => setGenLvl(Number(e.target.value))} className="rounded-lg border border-stone-300 p-2 text-sm bg-white">
            {[1, 2, 3].map(l => <option key={l} value={l}>{LEVELS[l]}</option>)}
          </select>
          <Btn onClick={generate} disabled={busy}>{busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} {busy ? "Составляю…" : "Создать"}</Btn>
        </div>
        {err && <p className="text-sm text-red-700 mt-2">{err}</p>}
        {genCases.length > 0 && <div className="mt-4 space-y-2">{genCases.map(c => <Row key={c.id} c={c} onDel={del} />)}</div>}
      </Card>
    </div>
  );
}

/* ============================================================ */
function CaseView({ c, onBack, onFinish }) {
  const [si, setSi] = useState(0);
  const [vals, setVals] = useState({});
  const [res, setRes] = useState({});
  const [shown, setShown] = useState({});
  const [hint, setHint] = useState({});
  const [tips, setTips] = useState({});
  const [busy, setBusy] = useState(-1);
  const [finished, setFinished] = useState(false);
  const endRef = useRef(null);
  const orders = useMemo(() => c.steps.map(s => s.t === "mcq" ? shuffle(s.opts.length) : []), [c.id]);

  useEffect(() => { if (si > 0 && endRef.current) endRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); }, [si]);

  const ans = s => s.t === "mcq" ? s.opts[s.a] : fmt(s.a) + (s.unit ? " " + s.unit : "");
  const check = i => {
    const s = c.steps[i], v = vals[i];
    if (v === undefined || String(v).trim() === "") return;
    const ok = s.t === "mcq" ? Number(v) === s.a : Math.abs(parseNum(v) - s.a) <= caseTol(s);
    setRes(r => ({ ...r, [i]: ok }));
  };
  const next = i => {
    if (i + 1 < c.steps.length) setSi(i + 1);
    else {
      const correct = c.steps.filter((_, k) => res[k] === true && !shown[k]).length;
      onFinish(c, correct, c.steps.length); setFinished(true);
    }
  };
  const explain = async i => {
    const s = c.steps[i]; setBusy(i);
    try {
      const ctx = c.story.join("\n") + "\n" + (c.tables || []).map(t => t.title + "\n" + [t.cols.join(" | ")].concat(t.rows.map(r => r.join(" | "))).join("\n")).join("\n\n");
      const given = s.t === "mcq" ? s.opts[Number(vals[i])] : vals[i];
      setTips(t => ({ ...t, [i]: "…" }));
      const txt = await callClaude({ system: TUTOR_SYSTEM, maxTokens: 900, messages: [{ role: "user", content:
        "Кейс «" + c.title + "».\n" + ctx + "\n\nШаг: " + s.q + "\nПравильный ответ: " + ans(s) + "\nРешение из курса: " + s.sol + "\nОтвет ученицы: " + (given || "—") +
        "\n\nОбъясни в 4–7 предложениях, какая ошибка, скорее всего, дала её ответ, и как решать такой шаг правильно. Если правильный ответ из курса вызывает у тебя сомнения, честно скажи об этом." }] });
      setTips(t => ({ ...t, [i]: txt }));
    } catch (e) { setTips(t => ({ ...t, [i]: "Не удалось получить разбор: " + e.message })); }
    setBusy(-1);
  };

  const correct = c.steps.filter((_, k) => res[k] === true && !shown[k]).length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="sticky top-0 bg-stone-100/95 backdrop-blur border-b border-stone-200 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-stone-500 truncate">{c.title}</p>
            <div className="mt-1 h-1.5 rounded-full bg-stone-200"><div className="h-1.5 rounded-full bg-teal-700 transition-all" style={{ width: ((finished ? c.steps.length : si) / c.steps.length * 100) + "%" }} /></div>
          </div>
          <span className="font-mono text-xs text-stone-500">{Math.min(si + 1, c.steps.length)}/{c.steps.length}</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold rounded-full px-2 py-0.5 bg-teal-50 text-teal-800">{LEVELS[c.level] || "Кейс"}</span>
          {c.ai && <span className="text-[11px] font-semibold rounded-full px-2 py-0.5 bg-amber-50 text-amber-800">Составлен ИИ — перепроверяйте ответы</span>}
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl mt-2">{c.title}</h1>
        <Card className="p-5 mt-4">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Условие</p>
          <div className="mt-2 space-y-2">{c.story.map((p, i) => <p key={i} className="text-[15px] leading-relaxed">{nb(p)}</p>)}</div>
          {(c.tables || []).map((t, i) => <DataTable key={i} t={t} />)}
        </Card>

        <div className="mt-4 space-y-3">
          {c.steps.slice(0, si + 1).map((s, i) => {
            const r = res[i], done = r !== undefined || shown[i];
            return (
              <Card key={i} className={"p-4 " + (i === si && !finished ? "ring-2 ring-teal-700/20" : "")}>
                <p className="text-xs font-semibold text-stone-500">Шаг {i + 1}</p>
                <p className="text-[15px] leading-relaxed mt-1">{nb(s.q)}</p>
                {s.t === "mcq" ? (
                  <div className="mt-3 space-y-1.5">
                    {orders[i].map(k => { const o = s.opts[k];
                      const sel = String(vals[i]) === String(k), right = done && k === s.a, bad = r === false && sel && k !== s.a;
                      return <button key={k} disabled={done} onClick={() => setVals(v => ({ ...v, [i]: String(k) }))}
                        className={"w-full text-left rounded-lg border px-3 py-2 text-sm " + (right ? "border-emerald-500 bg-emerald-50" : bad ? "border-red-500 bg-red-50" : sel ? "border-teal-700 bg-teal-50" : "border-stone-300 hover:border-stone-400")}>{nb(o)}</button>;
                    })}
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-2">
                    <input value={vals[i] || ""} disabled={done} onChange={e => setVals(v => ({ ...v, [i]: e.target.value }))}
                      onKeyDown={e => { if (e.key === "Enter") done ? next(i) : check(i); }} inputMode="decimal" placeholder="Ответ"
                      className={"flex-1 rounded-lg border p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-700 " + (r === true ? "border-emerald-500 bg-emerald-50" : r === false ? "border-red-500 bg-red-50" : "border-stone-300")} />
                    {s.unit && <span className="font-mono text-sm text-stone-500">{s.unit}</span>}
                  </div>
                )}
                {!done && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Btn onClick={() => check(i)}>Проверить</Btn>
                    {s.hint && !hint[i] && <Btn kind="ghost" onClick={() => setHint(h => ({ ...h, [i]: true }))}><Lightbulb className="w-4 h-4" /> Подсказка</Btn>}
                    <Btn kind="ghost" onClick={() => setShown(x => ({ ...x, [i]: true }))}><Eye className="w-4 h-4" /> Показать решение</Btn>
                  </div>
                )}
                {hint[i] && !done && <p className="mt-2 text-sm bg-amber-50 border border-amber-200 rounded-lg p-2.5">{nb(s.hint)}</p>}
                {done && (
                  <div className={"mt-3 rounded-lg p-3 " + (r === true && !shown[i] ? "bg-emerald-50" : shown[i] && r === undefined ? "bg-stone-50" : "bg-red-50")}>
                    <p className={"text-sm font-semibold flex items-center gap-1.5 " + (r === true && !shown[i] ? "text-emerald-800" : shown[i] && r === undefined ? "text-stone-700" : "text-red-800")}>
                      {r === true && !shown[i] ? <CheckCircle2 className="w-4 h-4" /> : shown[i] && r === undefined ? <Eye className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {r === true && !shown[i] ? "Верно" : "Ответ: " + ans(s)}
                    </p>
                    <p className="text-sm mt-1.5 leading-relaxed font-mono whitespace-pre-wrap text-stone-800">{nb(s.sol)}</p>
                    {r === false && !tips[i] && <Btn kind="ghost" className="mt-2 !py-1.5 !text-xs" onClick={() => explain(i)} disabled={busy === i}>{busy === i ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} Где моя ошибка?</Btn>}
                    {tips[i] && tips[i] !== "…" && <AiBox text={tips[i]} />}
                    {i === si && !finished && <Btn className="mt-3" onClick={() => next(i)}>{i + 1 < c.steps.length ? "Следующий шаг" : "Завершить кейс"} <ArrowRight className="w-4 h-4" /></Btn>}
                  </div>
                )}
                {i === si && <div ref={endRef} />}
              </Card>
            );
          })}
        </div>

        {finished && (
          <Card className="p-5 mt-4 border-teal-200">
            <div className="flex items-center gap-3">
              <Trophy className={"w-8 h-8 " + (correct / c.steps.length >= 0.8 ? "text-amber-500" : "text-stone-300")} />
              <div>
                <p className="font-serif text-xl">Кейс решён</p>
                <p className="text-sm text-stone-600">Самостоятельно верно: <span className="font-mono font-semibold">{correct}/{c.steps.length}</span></p>
              </div>
            </div>
            {c.summary && <DataTable t={c.summary} />}
            <div className="mt-4 flex gap-2">
              <Btn kind="ghost" onClick={() => { setSi(0); setVals({}); setRes({}); setShown({}); setHint({}); setTips({}); setFinished(false); }}>Решить заново</Btn>
              <Btn onClick={onBack}>К списку кейсов</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ============================================================ */
function FormulasTab({ openFx }) {
  const [sub, setSub] = useState(() => load("cons:fxsub", "practice"));
  const pick = v => { setSub(v); save("cons:fxsub", v); };
  return (
    <div className="mt-5">
      <div className="flex gap-1 bg-white border border-stone-200 rounded-xl p-1">
        {[["practice", "Практика на задачах (" + FX_TASKS.length + ")"], ["ref", "Справочник функций"]].map(([k, l]) => (
          <button key={k} onClick={() => pick(k)} className={"flex-1 rounded-lg py-2 text-sm font-medium " + (sub === k ? "bg-teal-800 text-white" : "text-stone-600 hover:text-stone-900")}>{l}</button>
        ))}
      </div>
      <div className="mt-4">{sub === "practice" ? <FxList open={openFx} /> : <FuncsTab />}</div>
    </div>
  );
}

function FuncsTab() {
  const [kind, setKind] = useState("excel");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const rows = kind === "excel" ? EXCEL_FUNCS : DAX_FUNCS;
  const catIdx = kind === "excel" ? 2 : 1;
  const cats = [...new Set(rows.map(r => r[catIdx]))];
  const list = rows.filter(r => (!cat || r[catIdx] === cat) && (!q.trim() || r.join(" ").toLowerCase().includes(q.trim().toLowerCase())));
  return (
    <div>
      <div className="flex gap-1.5">
        {[["excel", "Excel (" + EXCEL_FUNCS.length + ")"], ["dax", "Power BI · DAX (" + DAX_FUNCS.length + ")"]].map(([k, l]) => (
          <button key={k} onClick={() => { setKind(k); setCat(""); }} className={"rounded-full px-3 py-1.5 text-sm font-medium border " + (kind === k ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-300")}>{l}</button>
        ))}
      </div>
      {kind === "excel" && <p className="text-xs text-stone-500 mt-2">Русское и английское имя функции. В русской версии Excel разделитель аргументов — «;», в английской — «,».</p>}
      <div className="relative mt-3">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск: функция, задача, пример"
          className="w-full rounded-lg border border-stone-300 pl-9 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" />
      </div>
      <div className="mt-2 flex gap-1.5 flex-wrap">
        <button onClick={() => setCat("")} className={"rounded-full px-2.5 py-0.5 text-xs border " + (!cat ? "bg-teal-800 text-white border-teal-800" : "bg-white border-stone-300")}>Все</button>
        {cats.map(c => <button key={c} onClick={() => setCat(c)} className={"rounded-full px-2.5 py-0.5 text-xs border " + (cat === c ? "bg-teal-800 text-white border-teal-800" : "bg-white border-stone-300")}>{c}</button>)}
      </div>
      <div className="mt-3 space-y-2">
        {list.map(r => kind === "excel" ? (
          <Card key={r[0]} className="p-3.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono font-semibold text-teal-900">{r[1]}</span>
              <span className="font-mono text-sm text-stone-500">{r[0]}</span>
              <span className="text-[11px] rounded-full px-2 py-0.5 bg-stone-100 text-stone-600 ml-auto">{r[2]}</span>
            </div>
            <p className="text-sm text-stone-700 mt-1">{r[4]}</p>
            <p className="font-mono text-xs text-stone-500 mt-1">{r[1]}{r[3]}</p>
            <p className="font-mono text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1 mt-1.5 overflow-x-auto whitespace-nowrap">{r[5]}</p>
          </Card>
        ) : (
          <Card key={r[0]} className="p-3.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-mono font-semibold text-teal-900">{r[0]}</span>
              <span className="text-[11px] rounded-full px-2 py-0.5 bg-stone-100 text-stone-600 ml-auto">{r[1]}</span>
            </div>
            <p className="text-sm text-stone-700 mt-1">{r[3]}</p>
            <p className="font-mono text-xs text-stone-500 mt-1">{r[2]}</p>
            <p className="font-mono text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1 mt-1.5 overflow-x-auto whitespace-nowrap">{r[4]}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
function GlossaryTab() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? GLOSSARY.filter(g => g.join(" ").toLowerCase().includes(s)) : GLOSSARY;
  }, [q]);
  return (
    <div className="mt-5">
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск по-русски или по-английски"
          className="w-full rounded-lg border border-stone-300 pl-9 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" />
      </div>
      <p className="text-xs text-stone-500 mt-2">{list.length} терминов</p>
      <div className="mt-2 space-y-2">
        {list.map(([ru, en, d]) => (
          <Card key={ru} className="p-3.5">
            <p className="font-medium">{ru} <span className="text-stone-400 font-normal">·</span> <span className="text-teal-800 font-normal italic">{en}</span></p>
            <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">{d}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
function TutorTab({ seed, clearSeed, needKey }) {
  const [msgs, setMsgs] = useState(() => load(CHK, []));
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { if (seed) { setText(seed); clearSeed(); } }, [seed]);
  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" }); }, [msgs.length, busy]);

  const send = async (t) => {
    const content = (t || text).trim();
    if (!content) return;
    if (!getKey()) { needKey(); return; }
    const next = msgs.concat([{ role: "user", content }]);
    setMsgs(next); setText(""); setBusy(true);
    try {
      const reply = await callClaude({ system: TUTOR_SYSTEM, maxTokens: 1500, messages: next.slice(-20) });
      const all = next.concat([{ role: "assistant", content: reply }]);
      setMsgs(all); save(CHK, all);
    } catch (e) {
      const all = next.concat([{ role: "assistant", content: "Ошибка: " + e.message }]);
      setMsgs(all);
    }
    setBusy(false);
  };
  const clear = () => { setMsgs([]); save(CHK, []); };

  const starters = [
    "Чем на практике отличается консолидация в холдинге от задач SBR?",
    "Объясни на примере, как исключить внутригрупповые проценты по займу в долларах между дочками с разной функциональной валютой.",
    "Маркетплейс: агент или принципал по IFRS 15? Какие признаки проверять?",
    "Составь мне чек-лист первой недели консолидатора в новом холдинге.",
    "Как построить матрицу внутригрупповой сверки в Excel?",
    "Объясни с нуля, чем мера отличается от вычисляемого столбца в Power BI, на примере выручки группы.",
    "Помоги собрать в Power BI P&L группы с колонками «Сумма компаний», «Элиминации», «Группа»."
  ];

  return (
    <div className="mt-5">
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <GraduationCap className="w-6 h-6 text-teal-800 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Наставник: консолидация, Excel, Power BI</p>
            <p className="text-sm text-stone-600 leading-relaxed mt-0.5">Задавайте любые вопросы: по стандартам, по задаче из кейса, по рабочей ситуации. Наставник знает узбекский контекст (НСБУ, сум, холдинговые структуры), но цифры законодательства лучше перепроверять.</p>
          </div>
          {msgs.length > 0 && <button onClick={clear} className="p-1.5 text-stone-400 hover:text-red-700" title="Очистить"><Trash2 className="w-4 h-4" /></button>}
        </div>
      </Card>

      {msgs.length === 0 && (
        <div className="mt-3 space-y-1.5">
          {starters.map(s => <button key={s} onClick={() => send(s)} className="w-full text-left text-sm rounded-lg border border-stone-200 bg-white px-3 py-2 hover:border-teal-600">{s}</button>)}
        </div>
      )}

      <div className="mt-3 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div className={"rounded-xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap max-w-[92%] " + (m.role === "user" ? "bg-teal-800 text-white" : "bg-white border border-stone-200")}>{m.content}</div>
          </div>
        ))}
        {busy && <div className="flex items-center gap-2 text-sm text-stone-500"><Loader2 className="w-4 h-4 animate-spin" /> Наставник думает…</div>}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex gap-2 sticky bottom-3">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={2}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Ваш вопрос…" className="flex-1 rounded-xl border border-stone-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white shadow-sm resize-none" />
        <Btn onClick={() => send()} disabled={busy || !text.trim()} className="!px-4"><Send className="w-4 h-4" /></Btn>
      </div>
    </div>
  );
}
