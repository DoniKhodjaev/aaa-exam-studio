import React, { useState, useEffect, useRef } from "react";
import { FX_TASKS, FX_CATS, FX_CAT_ORDER } from "./fxtasks.js";
import { callClaude, getKey, TUTOR_SYSTEM, load, save } from "./ai.js";
import { ChevronLeft, CheckCircle2, XCircle, Loader2, Sparkles, Lightbulb, Eye, ArrowRight, AlertTriangle, RotateCcw } from "lucide-react";

export const FXK = "cons:fx";
const LEVELS = { 1: "Базовый", 2: "Средний", 3: "Продвинутый" };

const colName = c => String.fromCharCode(65 + c);
const parse = a => { const m = /^([A-Z])(\d+)$/.exec(a); return { col: m[1].charCodeAt(0) - 65, row: Number(m[2]) - 1 }; };
const cellsOf = range => {
  if (!range) return [];
  if (!range.includes(":")) return [range];
  const [a, b] = range.split(":").map(parse), out = [];
  for (let r = a.row; r <= b.row; r++) for (let c = a.col; c <= b.col; c++) out.push(colName(c) + (r + 1));
  return out;
};
const show = (v, fmtKind) => {
  if (v === null || v === undefined || v === "") return "";
  if (typeof v === "object" && v.value) return v.value;
  if (typeof v === "boolean") return v ? "ИСТИНА" : "ЛОЖЬ";
  if (typeof v === "number") {
    if (fmtKind === "date" && v > 30000) { const d = new Date(Date.UTC(1899, 11, 30) + Math.round(v) * 864e5); return d.toISOString().slice(0, 10).split("-").reverse().join("."); }
    if (fmtKind === "pct" && Math.abs(v) <= 1) return (Math.round(v * 10000) / 100).toString().replace(".", ",").replace("-", "−") + "%";
    if (Math.abs(v) < 1 && v !== 0 && fmtKind !== "pct") return String(Math.round(v * 10000) / 10000).replace(".", ",");
    const r = Math.round(v * 100) / 100;
    let [i, fr] = Math.abs(r).toFixed(Math.abs(r - Math.round(r)) < 1e-9 ? 0 : 2).split(".");
    i = i.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (r < 0 ? "−" : "") + i + (fr ? "," + fr : "");
  }
  return String(v).replace(/^'/, "");
};

function Grid({ t, results }) {
  const rows = t.data.length, cols = Math.max(...t.data.map(r => r.length));
  const fill = new Set(cellsOf(t.fill || t.target));
  const res = {};
  (results || []).forEach(r => { res[r.addr] = r; });
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-300 bg-white">
      <table className="text-[13px] border-collapse">
        <thead>
          <tr>
            <th className="bg-stone-100 border border-stone-200 w-8" />
            {Array.from({ length: cols }, (_, c) => <th key={c} className="bg-stone-100 border border-stone-200 px-2 py-1 font-medium text-stone-500 min-w-[72px]">{colName(c)}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, r) => (
            <tr key={r}>
              <td className="bg-stone-100 border border-stone-200 text-center text-stone-500 px-1">{r + 1}</td>
              {Array.from({ length: cols }, (_, c) => {
                const a = colName(c) + (r + 1), raw = t.data[r][c], isT = a === t.target, inFill = fill.has(a), rr = res[a];
                const isNum = typeof raw === "number";
                const formula = typeof raw === "string" && raw.startsWith("=");
                let content = rr ? show(rr.got, t.fmt) : formula ? raw : show(raw, typeof raw === "number" && raw > 30000 && t.fmt === "date" ? "date" : (t.fmt === "pct" && isNum && Math.abs(raw) <= 1 ? "pct" : undefined));
                if (!rr && inFill && (raw === null || raw === undefined)) content = isT ? "?" : "";
                const cls = rr ? (rr.ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-800")
                  : isT ? "bg-teal-50" : inFill ? "bg-teal-50/40" : r === 0 ? "bg-stone-50 font-semibold" : "";
                return (
                  <td key={c} className={"border border-stone-200 px-2 py-1 whitespace-nowrap " + cls + " " + (isT ? "outline outline-2 outline-teal-700 -outline-offset-2 font-semibold" : "") + " " + ((isNum || rr) ? "text-right font-mono" : "") + " " + (formula ? "text-stone-400 italic font-mono" : "")}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FxList({ open }) {
  const [prog] = useState(() => load(FXK, {}));
  const done = FX_TASKS.filter(t => prog[t.id] && prog[t.id].done).length;
  return (
    <div>
      <p className="text-sm text-stone-600 leading-relaxed">
        Задачи из работы консолидатора: вы пишете настоящую формулу Excel, тренажёр вычисляет её на листе и сравнивает с правильным результатом.
        Если задание «протянуть», формула копируется на весь диапазон — так проверяются знаки $.
        Можно писать по-русски (СУММЕСЛИМН, разделитель «;») или по-английски (SUMIFS, «,»).
      </p>
      <p className="font-mono text-xs text-stone-500 mt-2">Решено: {done}/{FX_TASKS.length}</p>
      <div className="mt-3 grid lg:grid-cols-2 gap-4 items-start">
        {FX_CAT_ORDER.map(ci => { const cat = FX_CATS[ci];
          const list = FX_TASKS.filter(t => t.cat === ci);
          return (
            <div key={cat} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-lg">{cat}</h3>
                <span className="font-mono text-xs text-stone-500">{list.filter(t => prog[t.id] && prog[t.id].done).length}/{list.length}</span>
              </div>
              <div className="mt-2 space-y-1.5">
                {list.map(t => {
                  const p = prog[t.id];
                  return (
                    <button key={t.id} onClick={() => open(t)}
                      className={"w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left border " + (p && p.done ? "border-emerald-200 bg-emerald-50 hover:border-emerald-400" : "border-stone-200 hover:border-stone-400")}>
                      {p && p.done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <span className="w-4 h-4 rounded-full border-2 border-stone-300 shrink-0" />}
                      <span className="text-sm flex-1 min-w-0">{t.title}</span>
                      <span className="text-[11px] text-stone-400">{LEVELS[t.level]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FxTaskView({ task, onBack, onNext }) {
  const [E, setE] = useState(null);
  const [val, setVal] = useState("=");
  const [res, setRes] = useState(null);
  const [hint, setHint] = useState(false);
  const [sol, setSol] = useState(false);
  const [tip, setTip] = useState("");
  const [busy, setBusy] = useState(false);
  const inp = useRef(null);

  useEffect(() => { import("./fengine.js").then(setE); }, []);
  useEffect(() => { setVal("="); setRes(null); setHint(false); setSol(false); setTip(""); window.scrollTo(0, 0); }, [task.id]);

  const run = () => {
    if (!E || val.trim().length < 2) return;
    let r;
    try { r = E.check(task, val); } catch (e) { r = { error: "Не удалось вычислить формулу: " + e.message }; }
    setRes(r); setTip("");
    if (r.ok) { const p = load(FXK, {}); p[task.id] = { done: true, at: Date.now() }; save(FXK, p); }
  };
  const ask = async () => {
    setBusy(true);
    try {
      const sheet = task.data.map((row, i) => (i + 1) + ": " + row.map(v => v === null ? "" : String(v).replace(/^'/, "")).join(" | ")).join("\n");
      const rows = res && res.rows ? res.rows.map(r => r.addr + ": получилось " + show(r.got, task.fmt) + ", нужно " + show(r.exp, task.fmt)).join("; ") : "";
      setTip(await callClaude({ system: TUTOR_SYSTEM, maxTokens: 800, messages: [{ role: "user", content:
        "Задание по Excel: " + task.title + "\n" + task.story.join(" ") + "\nЛист (строки, столбцы A, B, C…):\n" + sheet +
        "\nЯчейка для формулы: " + task.target + (task.fill ? ", протянуть на " + task.fill : "") +
        "\nФормула ученицы: " + val + "\nРезультат проверки: " + (res && res.error ? res.error : rows) +
        (res && res.missing && res.missing.length ? "\nНе использованы обязательные функции: " + res.missing.join(", ") : "") +
        "\nЭталон: " + task.ref + "\n\nОбъясни в 4–6 предложениях, что не так в её формуле и как исправить. Формулы пиши в русском варианте Excel (разделитель ;)." }] }));
    } catch (e) { setTip("Не удалось получить разбор: " + e.message); }
    setBusy(false);
  };

  const needTxt = (task.need || []).map(g => g.split("|").map(n => E ? (E.toRU("=" + n + "()").slice(1, -2) + " / " + n) : n).join(" или ")).join("; ");

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="sticky top-0 bg-stone-100/95 backdrop-blur border-b border-stone-200 z-10">
        <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600"><ChevronLeft className="w-5 h-5" /></button>
          <p className="text-xs text-stone-500 truncate flex-1">Практика формул · {FX_CATS[task.cat]}</p>
          <span className="text-[11px] text-stone-400">{LEVELS[task.level]}</span>
        </div>
      </div>
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 py-5 pb-24">
        <h1 className="font-serif text-2xl sm:text-3xl">{task.title}</h1>
        <div className="mt-3 space-y-2">{task.story.map((p, i) => <p key={i} className="text-[15px] leading-relaxed">{p}</p>)}</div>
        {needTxt && <p className="text-xs text-stone-500 mt-2">Обязательно использовать: <span className="font-mono">{needTxt}</span></p>}

        <div className="mt-4"><Grid t={task} results={res && res.rows} /></div>

        <div className="mt-4 flex items-stretch rounded-lg border border-stone-300 bg-white focus-within:ring-2 focus-within:ring-teal-700 overflow-hidden">
          <span className="px-3 flex items-center bg-stone-50 border-r border-stone-200 font-mono text-sm text-stone-500 italic">{task.target}</span>
          <span className="px-2 flex items-center font-serif italic text-stone-400">fx</span>
          <input ref={inp} value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === "Enter") run(); }}
            spellCheck={false} autoCapitalize="off" autoCorrect="off"
            className="flex-1 min-w-0 py-3 pr-3 font-mono text-sm focus:outline-none" placeholder="=СУММЕСЛИМН(…)" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={run} disabled={!E} className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-teal-800 text-white hover:bg-teal-900 disabled:opacity-50">
            {!E ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Проверить
          </button>
          {!hint && <button onClick={() => setHint(true)} className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-stone-300 bg-white hover:bg-stone-50"><Lightbulb className="w-4 h-4" /> Подсказка</button>}
          {!sol && <button onClick={() => setSol(true)} className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-stone-300 bg-white hover:bg-stone-50"><Eye className="w-4 h-4" /> Решение</button>}
        </div>
        {hint && <p className="mt-3 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3 leading-relaxed">{task.hint}</p>}

        {res && (
          <div className={"mt-4 rounded-lg p-3.5 " + (res.ok ? "bg-emerald-50" : "bg-red-50")}>
            {res.error ? (
              <p className="text-sm text-red-800 flex items-start gap-1.5"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {res.error}</p>
            ) : (
              <>
                <p className={"text-sm font-semibold flex items-center gap-1.5 " + (res.ok ? "text-emerald-800" : "text-red-800")}>
                  {res.ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {res.ok ? "Верно — формула даёт правильный результат" + (task.fill ? " во всех ячейках диапазона" : "") : "Пока не то"}
                </p>
                {!res.hasRef && <p className="text-sm mt-1.5 text-red-800">Формула должна ссылаться на ячейки, а не содержать готовое число.</p>}
                {res.missing && res.missing.length > 0 && <p className="text-sm mt-1.5 text-red-800">В этом задании нужно использовать: {res.missing.map(g => g.replace(/\|/g, " или ")).join(", ")}.</p>}
                {res.rows && res.rows.some(r => !r.ok) && (
                  <div className="mt-2 overflow-x-auto">
                    <table className="text-sm">
                      <thead><tr className="text-stone-500"><th className="text-left pr-4 font-medium">Ячейка</th><th className="text-right pr-4 font-medium">У вас</th><th className="text-right font-medium">Нужно</th></tr></thead>
                      <tbody>
                        {res.rows.map(r => (
                          <tr key={r.addr} className={r.ok ? "text-stone-500" : "text-red-800"}>
                            <td className="pr-4 font-mono">{r.addr}</td>
                            <td className="pr-4 text-right font-mono">{show(r.got, task.fmt) || "пусто"}</td>
                            <td className="text-right font-mono">{show(r.exp, task.fmt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {task.fill && <p className="text-xs text-stone-500 mt-1.5">Если первая ячейка верна, а остальные нет — проверьте знаки $ в ссылках.</p>}
                  </div>
                )}
                {res.ok && <p className="text-sm mt-1.5 text-stone-800 leading-relaxed">{task.explain}</p>}
              </>
            )}
            {!res.ok && getKey() && !tip && (
              <button onClick={ask} disabled={busy} className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs hover:bg-stone-50 disabled:opacity-60">
                {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} Разобрать мою формулу
              </button>
            )}
            {tip && <p className="mt-2 text-sm leading-relaxed bg-white rounded-lg p-3 border border-stone-200 whitespace-pre-wrap">{tip}</p>}
          </div>
        )}

        {sol && E && (
          <div className="mt-4 bg-white border border-stone-200 rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Решение</p>
            <p className="text-xs text-stone-500 mt-2">Русский Excel</p>
            <p className="font-mono text-sm bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 mt-1 overflow-x-auto whitespace-nowrap">{E.toRU(task.ref)}</p>
            <p className="text-xs text-stone-500 mt-2">Английский Excel</p>
            <p className="font-mono text-sm bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 mt-1 overflow-x-auto whitespace-nowrap">{task.ref.replace(/TRUE\(\)/g, "TRUE").replace(/FALSE\(\)/g, "FALSE")}</p>
            <p className="text-sm text-stone-700 mt-3 leading-relaxed">{task.explain}</p>
            {task.fill && <p className="text-xs text-stone-500 mt-2">Формула вводится в {task.target} и протягивается на {task.fill}.</p>}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {res && !res.ok && <button onClick={() => { setRes(null); setTip(""); inp.current && inp.current.focus(); }} className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-stone-300 bg-white hover:bg-stone-50"><RotateCcw className="w-4 h-4" /> Сбросить проверку</button>}
          <button onClick={onNext} className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium border border-stone-300 bg-white hover:bg-stone-50 ml-auto">Следующее задание <ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}

export { FX_TASKS };
