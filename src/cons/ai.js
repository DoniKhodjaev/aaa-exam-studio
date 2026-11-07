/* Хранилище и вызовы Anthropic API. Ключ общий с AAA (тот же сайт — тот же localStorage). */
export const AK = "aaa3:apikey", AM = "aaa3:model";
export const DEFAULT_MODEL = "claude-sonnet-4-5";
export const getKey = () => { try { return (localStorage.getItem(AK) || "").trim(); } catch { return ""; } };
export const getModel = () => { try { return (localStorage.getItem(AM) || "").trim() || DEFAULT_MODEL; } catch { return DEFAULT_MODEL; } };
export const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
export const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export const TUTOR_SYSTEM =
  "Ты — опытный наставник по консолидированной финансовой отчётности по МСФО (IFRS 10, IFRS 3, IAS 28, IFRS 11, IAS 21, IAS 7, IAS 12, IAS 36) " +
  "и практике консолидации в холдингах Узбекистана, включая трансформацию отчётности по НСБУ в МСФО. Твоя ученица — сертифицированный специалист ACCA, " +
  "которая сдала все экзамены и выходит на работу консолидатором в крупный узбекский холдинг электронной коммерции и финансовых сервисов. " +
  "Отвечай по-русски, ясно и по делу, с числовыми примерами в млн сум, когда это помогает. Ссылайся на конкретные стандарты и пункты логики. " +
  "Английские термины давай в скобках при первом упоминании. Пиши простым текстом без markdown-разметки (без **, #, таблиц); списки — короткими строками с дефисом. " +
  "Ты также опытный преподаватель Excel (формулы, сводные таблицы, Power Query, финансовое моделирование, графики) и Power BI (Power Query, модель данных, DAX, визуализация). " +
  "По Excel ученица — уверенный пользователь, по Power BI — новичок: объясняй Power BI с нуля и пошагово. Формулы Excel давай в двух вариантах — русская версия (разделитель ;) и английская. " +
  "Формулы, код DAX и M можно приводить отдельными строками. " +
  "Если вопрос касается узбекского законодательства или конкретных цифр, которые могли измениться, честно скажи, что это нужно перепроверить по актуальным источникам.";

export async function callClaude({ messages, system, maxTokens = 1200 }) {
  const key = getKey();
  if (!key) throw new Error("Не задан API-ключ. Откройте «Настройки» и вставьте ключ.");
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json", "x-api-key": key,
      "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({ model: getModel(), max_tokens: maxTokens, system, messages })
  });
  let d;
  try { d = await r.json(); } catch { throw new Error("Сервер вернул некорректный ответ (" + r.status + ")"); }
  if (d.error) throw new Error(d.error.message || "Ошибка API");
  return (d.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
}

export function parseNum(v) {
  let s = String(v).replace(/[\s  ]/g, "").replace(/[−–—]/g, "-");
  if (s.includes(",") && s.includes(".")) s = s.replace(/,/g, "");
  else s = s.replace(",", ".");
  s = s.replace(/[^0-9.\-]/g, "");
  const n = parseFloat(s);
  return isFinite(n) ? n : NaN;
}

export const fmt = (x, d) => {
  if (!isFinite(x)) return String(x);
  const dd = d !== undefined ? d : (Math.abs(x - Math.round(x)) < 1e-9 ? 0 : Math.abs(x * 10 - Math.round(x * 10)) < 1e-9 ? 1 : 2);
  const v = Math.round(x * 10 ** dd) / 10 ** dd;
  let [i, fr] = Math.abs(v).toFixed(dd).split(".");
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return (v < 0 ? "−" : "") + i + (fr ? "," + fr : "");
};

export function extractJson(text) {
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a < 0 || b < a) throw new Error("ИИ не вернул JSON");
  return JSON.parse(text.slice(a, b + 1));
}

export const GEN_PROMPT = (topic, level) =>
  "Составь новый оригинальный практический кейс по консолидированной отчётности по МСФО для тренажёра. Тема: " + topic + ". Уровень сложности: " + level + " из 3.\n" +
  "Контекст: группа компаний в Узбекистане (вымышленные названия, узбекские города), суммы в млн сум, реалистичные масштабы.\n" +
  "Требования:\n" +
  "- 5–8 шагов, каждый шаг — один числовой ответ, который однозначно вычисляется из данных кейса.\n" +
  "- Сначала сам аккуратно посчитай все ответы, затем перепроверь арифметику. Ответы округляй до 1 знака после запятой, если нужно.\n" +
  "- В решении (sol) покажи формулу с подставленными числами и итог.\n" +
  "- Таблицы — только если нужны (например, балансы компаний).\n" +
  "Верни ТОЛЬКО JSON без пояснений в формате:\n" +
  "{\"title\":\"...\",\"level\":" + level + ",\"topics\":[\"...\"],\"story\":[\"абзац\",\"абзац\"],\"tables\":[{\"title\":\"...\",\"cols\":[\"...\"],\"rows\":[[\"...\"]]}],\"steps\":[{\"q\":\"вопрос\",\"a\":123.4,\"unit\":\"млн\",\"hint\":\"подсказка\",\"sol\":\"решение\"}]}";
