import React, { useState, useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { CHEATS } from "./cheats.js";
import { Search, Eye, EyeOff, Printer, AlertTriangle } from "lucide-react";

const nb = x => String(x).replace(/(\d) (?=\d{3}(?!\d))/g, "$1\u00a0");

function TeX({ src }) {
  const html = useMemo(() => {
    try { const tex = src.includes("\\\\") ? "\\begin{aligned}" + src + "\\end{aligned}" : src; return katex.renderToString(tex, { displayMode: true, throwOnError: false, strict: "ignore" }); }
    catch { return src; }
  }, [src]);
  return <div className="overflow-x-auto overflow-y-hidden py-1 text-stone-900" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Cheats() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");
  const [quiz, setQuiz] = useState(false);
  const [open, setOpen] = useState({});
  const s = q.trim().toLowerCase();
  const groups = CHEATS.filter(g => !group || g.id === group)
    .map(g => ({ ...g, cards: g.cards.filter(c => !s || [c.title, c.ex, c.warn || "", ...c.vars.flat()].join(" ").toLowerCase().includes(s)) }))
    .filter(g => g.cards.length);
  const total = CHEATS.reduce((n, g) => n + g.cards.length, 0);

  return (
    <div>
      <div className="no-print">
        <p className="text-sm text-stone-600 leading-relaxed">
          {total} формул консолидации на одной странице: формула, что означает каждое обозначение, пример с числами и ловушка.
          Режим «Проверить себя» прячет формулы — вспомните и нажмите на карточку. Страницу можно распечатать.
        </p>
        <div className="mt-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск: гудвил, URP, NCI…"
              className="w-full rounded-lg border border-stone-300 pl-9 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-white" />
          </div>
          <button onClick={() => { setQuiz(!quiz); setOpen({}); }} title="Проверить себя"
            className={"rounded-lg border px-3 inline-flex items-center gap-1.5 text-sm " + (quiz ? "bg-teal-800 text-white border-teal-800" : "bg-white border-stone-300")}>
            {quiz ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}<span className="hidden sm:inline">Проверить себя</span>
          </button>
          <button onClick={() => window.print()} title="Печать" className="rounded-lg border border-stone-300 bg-white px-3 inline-flex items-center"><Printer className="w-4 h-4" /></button>
        </div>
        <div className="mt-2 flex gap-1.5 flex-wrap">
          <button onClick={() => setGroup("")} className={"rounded-full px-2.5 py-0.5 text-xs border " + (!group ? "bg-teal-800 text-white border-teal-800" : "bg-white border-stone-300")}>Все</button>
          {CHEATS.map(g => <button key={g.id} onClick={() => setGroup(g.id)} className={"rounded-full px-2.5 py-0.5 text-xs border " + (group === g.id ? "bg-teal-800 text-white border-teal-800" : "bg-white border-stone-300")}>{g.title}</button>)}
        </div>
      </div>

      <div className="hidden print:block mb-4">
        <h1 className="font-serif text-2xl">Шпаргалка: формулы консолидации по МСФО</h1>
      </div>

      <div className="mt-4 space-y-6">
        {groups.map(g => (
          <section key={g.id} className="break-inside-avoid-page">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl">{g.title}</h3>
              <span className="text-[11px] font-mono text-stone-500">{g.std}</span>
            </div>
            <div className="mt-2 space-y-3">
              {g.cards.map(c => {
                const hidden = quiz && !open[c.id];
                return (
                  <div key={c.id} onClick={() => quiz && setOpen(o => ({ ...o, [c.id]: !o[c.id] }))}
                    className={"bg-white border border-stone-200 rounded-xl p-4 break-inside-avoid " + (quiz ? "cursor-pointer hover:border-teal-600" : "")}>
                    <p className="font-medium">{c.title}</p>
                    {hidden ? (
                      <div className="mt-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 py-5 text-center text-sm text-stone-500">Вспомните формулу и нажмите, чтобы проверить</div>
                    ) : (
                      <>
                        <div className="mt-1">{c.f.map((f, i) => <TeX key={i} src={f} />)}</div>
                        {c.vars.length > 0 && (
                          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                            {c.vars.map(([k, v]) => <React.Fragment key={k}><dt className="font-mono text-teal-900 whitespace-nowrap">{k}</dt><dd className="text-stone-700">{v}</dd></React.Fragment>)}
                          </dl>
                        )}
                        <p className="mt-2 text-sm font-mono bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 leading-relaxed"><span className="font-sans text-stone-500">Пример: </span>{nb(c.ex)}</p>
                        {c.warn && <p className="mt-2 text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed flex gap-1.5"><AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" /><span>{c.warn}</span></p>}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        {!groups.length && <p className="text-sm text-stone-500">Ничего не найдено.</p>}
      </div>
    </div>
  );
}
