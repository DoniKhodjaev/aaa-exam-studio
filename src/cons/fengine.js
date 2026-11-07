/* Движок проверки формул: HyperFormula + перевод русских формул в английские. */
import { HyperFormula } from "hyperformula";

const RU_EN = {
  "ПРОСМОТРX": "XLOOKUP", "ПРОСМОТРХ": "XLOOKUP", "ПОИСКПОЗ": "MATCH", "ИНДЕКС": "INDEX", "ВПР": "VLOOKUP", "ГПР": "HLOOKUP",
  "СУММЕСЛИМН": "SUMIFS", "СУММЕСЛИ": "SUMIF", "СЧЁТЕСЛИМН": "COUNTIFS", "СЧЕТЕСЛИМН": "COUNTIFS", "СЧЁТЕСЛИ": "COUNTIF", "СЧЕТЕСЛИ": "COUNTIF",
  "СУММПРОИЗВ": "SUMPRODUCT", "МАКСЕСЛИ": "MAXIFS", "МИНЕСЛИ": "MINIFS", "СУММ": "SUM", "МАКС": "MAX", "МИН": "MIN", "СРЗНАЧ": "AVERAGE",
  "СЧЁТЗ": "COUNTA", "СЧЕТЗ": "COUNTA", "СЧЁТ": "COUNT", "СЧЕТ": "COUNT", "ЧСТРОК": "ROWS",
  "ЕСЛИ": "IF", "ЕСЛИМН": "IFS", "УСЛОВИЯ": "IFS", "ПЕРЕКЛЮЧ": "SWITCH", "ЕСЛИОШИБКА": "IFERROR", "ЕСНД": "IFNA", "И": "AND", "ИЛИ": "OR", "НЕ": "NOT",
  "ЕЧИСЛО": "ISNUMBER", "ЕПУСТО": "ISBLANK", "ВЫБОР": "CHOOSE",
  "ФИЛЬТР": "FILTER", "УНИК": "UNIQUE", "СОРТ": "SORT", "ПОСЛЕДОВ": "SEQUENCE",
  "КОНМЕСЯЦА": "EOMONTH", "ДАТАМЕС": "EDATE", "ДАТА": "DATE", "ГОД": "YEAR", "МЕСЯЦ": "MONTH", "ДЕНЬ": "DAY", "ДОЛЯГОДА": "YEARFRAC",
  "ЧИСТРАБДНИ": "NETWORKDAYS", "РАБДЕНЬ": "WORKDAY",
  "ЧПС": "NPV", "ЧИСТНЗ": "XNPV", "ВСД": "IRR", "ПЛТ": "PMT", "ПС": "PV", "БС": "FV", "ПРПЛТ": "IPMT", "ОСПЛТ": "PPMT", "СТАВКА": "RATE",
  "ОКРУГЛ": "ROUND", "ОКРУГЛВВЕРХ": "ROUNDUP", "ОКРУГЛВНИЗ": "ROUNDDOWN", "ABS": "ABS", "СТЕПЕНЬ": "POWER",
  "ОБЪЕДИНИТЬ": "TEXTJOIN", "СЦЕП": "CONCATENATE", "СЦЕПИТЬ": "CONCATENATE", "ТЕКСТ": "TEXT", "ЗНАЧЕН": "VALUE", "ЗНАЧ": "VALUE",
  "СЖПРОБЕЛЫ": "TRIM", "ПОДСТАВИТЬ": "SUBSTITUTE", "ЛЕВСИМВ": "LEFT", "ПРАВСИМВ": "RIGHT", "ПСТР": "MID", "ДЛСТР": "LEN", "ПОИСК": "SEARCH", "НАЙТИ": "FIND"
};
const EN_RU = {
  XLOOKUP: "ПРОСМОТРX", MATCH: "ПОИСКПОЗ", INDEX: "ИНДЕКС", VLOOKUP: "ВПР", SUMIFS: "СУММЕСЛИМН", SUMIF: "СУММЕСЛИ", COUNTIFS: "СЧЁТЕСЛИМН", COUNTIF: "СЧЁТЕСЛИ",
  SUMPRODUCT: "СУММПРОИЗВ", MAXIFS: "МАКСЕСЛИ", MINIFS: "МИНЕСЛИ", SUM: "СУММ", MAX: "МАКС", MIN: "МИН", AVERAGE: "СРЗНАЧ", COUNTA: "СЧЁТЗ", COUNT: "СЧЁТ", ROWS: "ЧСТРОК",
  IF: "ЕСЛИ", IFS: "ЕСЛИМН", SWITCH: "ПЕРЕКЛЮЧ", IFERROR: "ЕСЛИОШИБКА", IFNA: "ЕСНД", AND: "И", OR: "ИЛИ", NOT: "НЕ", CHOOSE: "ВЫБОР",
  FILTER: "ФИЛЬТР", UNIQUE: "УНИК", SORT: "СОРТ", EOMONTH: "КОНМЕСЯЦА", EDATE: "ДАТАМЕС", DATE: "ДАТА", YEAR: "ГОД", MONTH: "МЕСЯЦ", DAY: "ДЕНЬ", YEARFRAC: "ДОЛЯГОДА",
  NETWORKDAYS: "ЧИСТРАБДНИ", WORKDAY: "РАБДЕНЬ", NPV: "ЧПС", IRR: "ВСД", PMT: "ПЛТ", PV: "ПС", FV: "БС", IPMT: "ПРПЛТ", PPMT: "ОСПЛТ",
  ROUND: "ОКРУГЛ", ABS: "ABS", TEXTJOIN: "ОБЪЕДИНИТЬ", TEXT: "ТЕКСТ", VALUE: "ЗНАЧЕН", TRIM: "СЖПРОБЕЛЫ", SUBSTITUTE: "ПОДСТАВИТЬ", LEFT: "ЛЕВСИМВ", RIGHT: "ПРАВСИМВ", LEN: "ДЛСТР",
  TRUE: "ИСТИНА", FALSE: "ЛОЖЬ"
};

/* Разбить формулу на куски «вне строк» и «строки в кавычках». */
function pieces(f) {
  const out = []; let cur = "", inStr = false;
  for (let i = 0; i < f.length; i++) {
    const ch = f[i];
    if (ch === "\"") {
      if (inStr && f[i + 1] === "\"") { cur += "\"\""; i++; continue; }
      if (!inStr) { out.push({ s: false, t: cur }); cur = "\""; inStr = true; }
      else { cur += "\""; out.push({ s: true, t: cur }); cur = ""; inStr = false; }
      continue;
    }
    cur += ch;
  }
  out.push({ s: inStr, t: cur });
  return out;
}

export function toEN(formula) {
  let f = String(formula || "").trim().replace(/[\u00a0\u202f]/g, " ").replace(/[−–]/g, "-");
  if (!f.startsWith("=")) f = "=" + f;
  const ps = pieces(f);
  const outside = ps.filter(p => !p.s).map(p => p.t).join(" ");
  let ru = outside.includes(";") || /[А-ЯЁа-яё][А-ЯЁа-яё0-9XХ.]*\s*\(/.test(outside);
  const commas = (outside.match(/,/g) || []).length, decs = (outside.match(/(?<![A-Za-z$.]\d*)\d,\d/g) || []).length;
  if (!ru && commas > 0 && commas === decs) ru = true;
  const unknown = [];
  const en = ps.map(p => {
    if (p.s) return p.t;
    let t = p.t;
    if (ru) t = t.replace(/(?<![A-Za-z$.]\d*)(\d),(\d)/g, "$1.$2");
    t = t.replace(/([A-Za-zА-ЯЁа-яё_][A-Za-zА-ЯЁа-яё0-9_.XХ]*)\s*\(/g, (m, name) => {
      const up = name.toUpperCase();
      if (/[А-ЯЁ]/.test(up)) { const e = RU_EN[up]; if (!e) { unknown.push(name); return m; } return e + "("; }
      return up + "(";
    });
    t = t.replace(/(^|[^A-Za-zА-ЯЁа-яё0-9_])(ИСТИНА|ЛОЖЬ|TRUE|FALSE)(?!\s*\()(?![A-Za-z0-9_])/gi, (m, pre, w) => pre + (/^(ИСТИНА|TRUE)$/i.test(w) ? "TRUE()" : "FALSE()"));
    if (ru) t = t.replace(/;/g, ",");
    return t;
  }).join("");
  return { en, ru, unknown };
}

export function toRU(en) {
  return pieces(en).map(p => {
    if (p.s) return p.t;
    let t = p.t.replace(/TRUE\(\)/g, "ИСТИНА").replace(/FALSE\(\)/g, "ЛОЖЬ");
    t = t.replace(/([A-Z][A-Z0-9.]*)\s*\(/g, (m, n) => (EN_RU[n] || n) + "(");
    t = t.replace(/,/g, "; ").replace(/; +/g, "; ");
    t = t.replace(/(\d)\.(\d)/g, "$1,$2");
    return t;
  }).join("");
}

export const funcsIn = en => {
  const s = new Set();
  pieces(en).forEach(p => { if (!p.s) (p.t.match(/[A-Z][A-Z0-9.]*(?=\s*\()/g) || []).forEach(n => s.add(n)); });
  return [...s];
};

/* --- адреса --- */
export const colName = c => { let s = ""; c++; while (c) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); } return s; };
export function parseAddr(a) {
  const m = /^([A-Z]+)(\d+)$/.exec(a.replace(/\$/g, "").toUpperCase());
  let c = 0; for (const ch of m[1]) c = c * 26 + (ch.charCodeAt(0) - 64);
  return { col: c - 1, row: Number(m[2]) - 1 };
}
export function cellsOf(range) {
  if (!range.includes(":")) return [range];
  const [a, b] = range.split(":").map(parseAddr), out = [];
  for (let r = a.row; r <= b.row; r++) for (let c = a.col; c <= b.col; c++) out.push(colName(c) + (r + 1));
  return out;
}

const CFG = { licenseKey: "gpl-v3", useArrayArithmetic: true, dateFormats: ["DD.MM.YYYY", "DD/MM/YYYY"], smartRounding: true };

function run(data, target, fill, enFormula) {
  const hf = HyperFormula.buildFromArray(data.map(r => r.map(v => (v === null || v === undefined) ? null : v)), CFG);
  const t = parseAddr(target), out = {};
  hf.setCellContents({ sheet: 0, ...t }, [[enFormula]]);
  const cells = fill ? cellsOf(fill) : [target];
  if (fill) {
    hf.copy({ start: { sheet: 0, ...t }, end: { sheet: 0, ...t } });
    cells.filter(a => a !== target).forEach(a => hf.paste({ sheet: 0, ...parseAddr(a) }));
  }
  cells.forEach(a => {
    const p = parseAddr(a);
    out[a] = { v: hf.getCellValue({ sheet: 0, ...p }), f: hf.getCellFormula({ sheet: 0, ...p }) };
  });
  hf.destroy();
  return out;
}

const isErr = v => v && typeof v === "object" && v.type;
const same = (a, b, tol) => {
  if (isErr(a) || isErr(b)) return false;
  if (typeof b === "number") return typeof a === "number" && Math.abs(a - b) <= (tol !== undefined ? tol : Math.max(0.005, Math.abs(b) * 1e-6));
  if (typeof b === "string") return typeof a === "string" && a.trim().toLowerCase() === b.trim().toLowerCase();
  return a === b;
};

export function expected(task) {
  return run(task.data, task.target, task.fill, task.ref);
}

export function check(task, userFormula) {
  const { en, unknown } = toEN(userFormula);
  if (unknown.length) return { error: "Неизвестная функция: " + unknown.join(", ") + ". Проверьте написание или используйте английское имя." };
  const exp = expected(task);
  let got;
  try { got = run(task.data, task.target, task.fill, en); }
  catch (e) { return { error: "Формула не разобрана: " + e.message }; }
  const used = funcsIn(en);
  const missing = (task.need || []).filter(group => !group.split("|").some(n => used.includes(n)));
  const hasRef = /\$?[A-Z]{1,2}\$?\d+/.test(pieces(en).filter(p => !p.s).map(p => p.t).join(""));
  const rows = Object.keys(exp).map(a => ({ addr: a, got: got[a].v, exp: exp[a].v, formula: got[a].f, ok: same(got[a].v, exp[a].v, task.tol) }));
  const ok = rows.every(r => r.ok) && !missing.length && hasRef;
  return { ok, rows, missing, hasRef, en };
}

export function display(v, fmtKind) {
  if (v === null || v === undefined || v === "") return "";
  if (isErr(v)) return v.value;
  if (typeof v === "boolean") return v ? "ИСТИНА" : "ЛОЖЬ";
  if (typeof v === "number") {
    if (fmtKind === "date") { const d = new Date(Date.UTC(1899, 11, 30) + Math.round(v) * 864e5); return d.toISOString().slice(0, 10).split("-").reverse().join("."); }
    if (fmtKind === "pct") return (Math.round(v * 10000) / 100).toString().replace(".", ",") + "%";
    const r = Math.round(v * 100) / 100;
    let [i, fr] = Math.abs(r).toFixed(Math.abs(r - Math.round(r)) < 1e-9 ? 0 : 2).split(".");
    i = i.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (r < 0 ? "−" : "") + i + (fr ? "," + fr : "");
  }
  return String(v).replace(/^'/, "");
}
