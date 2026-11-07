import { CASES_1 } from "./cases1.js";
import { CASES_2 } from "./cases2.js";
import { CASES_3 } from "./cases3.js";
import { CASES_4 } from "./cases4.js";
import { CASES_5 } from "./cases5.js";
/* Порядок — по темам курса: от простого к сложному, итоговый кейс в конце. */
const ORDER = ["c01", "c25", "c26", "c02", "c03", "c28", "c04", "c27", "c24", "c44", "c05", "c06", "c21", "c07", "c29", "c19", "c43",
  "c08", "c30", "c31", "c22", "c09", "c10", "c11", "c32", "c33", "c20", "c40", "c41", "c17",
  "c12", "c34", "c23", "c13", "c35", "c42", "c36", "c14", "c37", "c38", "c39", "c15", "c18", "c16"];
const all = [...CASES_1, ...CASES_2, ...CASES_3, ...CASES_4, ...CASES_5];
export const CASES = ORDER.map(id => all.find(c => c.id === id)).concat(all.filter(c => !ORDER.includes(c.id)));
