import { CASES_1 } from "./cases1.js";
import { CASES_2 } from "./cases2.js";
import { CASES_3 } from "./cases3.js";
const ORDER = ["c01", "c02", "c03", "c04", "c24", "c05", "c06", "c21", "c07", "c19", "c08", "c22", "c09", "c10", "c11", "c20",
  "c12", "c23", "c13", "c14", "c15", "c17", "c18", "c16"];
const all = [...CASES_1, ...CASES_2, ...CASES_3];
export const CASES = ORDER.map(id => all.find(c => c.id === id)).concat(all.filter(c => !ORDER.includes(c.id)));
