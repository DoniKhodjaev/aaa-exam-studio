import { STANDARDS_IAS } from "./standards-ias.js";
import { STANDARDS_IFRS } from "./standards-ifrs.js";
import { STANDARD_RISKS } from "./standards-risks.js";

export const STANDARDS = [...STANDARDS_IAS, ...STANDARDS_IFRS].map((s) => ({
  ...s,
  risks: STANDARD_RISKS[s.num] || []
}));
