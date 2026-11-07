import u01 from "./u01.js";
import u02 from "./u02.js";
import u03 from "./u03.js";
import u04 from "./u04.js";
import u05 from "./u05.js";
import u06 from "./u06.js";
import u07 from "./u07.js";
import u08 from "./u08.js";
import u09 from "./u09.js";
import u10 from "./u10.js";
import u11 from "./u11.js";
import excel1 from "./excel1.js";
import excel2 from "./excel2.js";
import pbi from "./pbi.js";

export const UNITS = [u01, u02, u03, u04, u05, u06, u07, u08, u09, u10, u11];
export const TRACKS = [
  { id: "cons", title: "Консолидация", short: "Консолидация", subtitle: "МСФО и практика холдинга", units: UNITS },
  { id: "excel", title: "Excel для финансиста", short: "Excel", subtitle: "Для уверенного пользователя: формулы, сводные, Power Query, финмодели, графики", units: [...excel1, ...excel2] },
  { id: "pbi", title: "Power BI с нуля", short: "Power BI", subtitle: "Power Query, модель данных, DAX, визуалы и финансовые отчёты", units: pbi }
];
