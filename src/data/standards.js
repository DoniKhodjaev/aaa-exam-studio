import { STANDARDS_IAS } from "./standards-ias.js";
import { STANDARDS_IFRS } from "./standards-ifrs.js";
import { STANDARD_RISKS } from "./standards-risks.js";
import { ISA_PLANNING } from "./isa-planning.js";
import { ISA_EVIDENCE } from "./isa-evidence.js";

const REPORTING = [...STANDARDS_IAS, ...STANDARDS_IFRS].map((s) => ({
  ...s,
  family: "IFRS",
  risks: STANDARD_RISKS[s.num] || []
}));

const AUDITING = [...ISA_PLANNING, ...ISA_EVIDENCE];

export const STANDARDS = [...REPORTING, ...AUDITING];
