import React, { useState, useEffect, useCallback, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
import {
  Clock, FileText, ChevronLeft, Plus, History, Award, Loader2, Trash2,
  CheckCircle2, XCircle, AlertTriangle, PenLine, Timer, ArrowRight, BookOpen,
  Sparkles, RefreshCw, ListChecks, KeyRound, Library, Download, Upload, FileUp, Highlighter, Pause, Play
} from "lucide-react";

/* ============================================================
   AAA EXAM STUDIO — тренажёр ACCA Advanced Audit & Assurance
   5 полных пробных экзаменов: Section A (50) + 2 x Section B (25)
   ============================================================ */

const EXAMS = [
  /* ------------------------------------------------ MOCK 1 */
  {
    id: "m1",
    title: "Mock Exam 1",
    focus: ["Planning & risk", "Matters & evidence", "Ethics & ISQM"],
    questions: [
      {
        id: "m1q1", section: "A", marks: 50, skillsMarks: 10, timeMinutes: 98,
        title: "Marlot Group — Planning, risk & ethics",
        exhibits: [
          { title: "Email from the engagement partner", content:
"To: Audit manager\nFrom: Rachel Osei, engagement partner\nSubject: Marlot Group — audit planning, year ending 30 June 20X5\n\nHello,\n\nYou have been assigned as audit manager on the Marlot Group. This is our second year as group auditor. Using the attached information, prepare briefing notes for my review which respond to the requirements set out below. The audit is planned to commence in three weeks.\n\nThank you,\nRachel" },
          { title: "Background information", content:
"The Marlot Group designs and manufactures sportswear, sold through its own retail stores and, since January 20X5, through a newly developed e-commerce platform. The Group is listed on a stock exchange.\n\nCosts of $8.2 million incurred in developing the platform have been capitalised as an intangible asset. The platform was launched in January 20X5 and the directors have publicly stated that it will 'transform revenue growth over the next three years'.\n\nOn 1 March 20X5 the Group acquired 80% of the equity of Vexa Co, a sportswear manufacturer located in a foreign country, for cash consideration of $28 million. Provisional goodwill of $12.4 million has been recognised. Vexa Co prepares its financial statements under local accounting rules and is audited by a small local firm, Onder & Co.\n\nCustomers purchasing premium equipment receive loyalty points redeemable against future purchases, and a two-year extended warranty is bundled into the selling price. Revenue from such contracts is a growing share of total sales.\n\nThe Group has a $30 million bank loan which carries a covenant requiring interest cover (operating profit / finance costs) of at least 3.0. In May 20X5 the board publicly announced a detailed plan to restructure two factories, with closures expected to complete by November 20X5. Executive directors receive an annual bonus based on revenue growth. Significant inventory is held at third-party warehouses under logistics agreements." },
          { title: "Extracts from projected financial information", content:
"Projected year to 30 June 20X5 (prior year actual in brackets), $ million:\n\nRevenue: 268.0 (224.0) — growth 19.6%\nOperating profit: 24.3 (26.0)\nFinance costs: 7.8 (3.4) — interest cover 3.1 (7.6)\nProfit before tax: 16.5 (22.6)\nIntangible assets: 21.4 (0.8)\nInventory: 58.0 (41.0)\nTrade receivables: 47.0 (33.0)\nCash and equivalents: 3.0 (14.0)\n\nThe finance director has commented that 'the covenant test will be comfortably met this year'." },
          { title: "Notes from meeting with the finance director", content:
"1. The finance director has asked whether our firm's advisory team could perform the fair value measurement of Vexa Co's identifiable assets acquired, 'to save time on the consolidation'.\n2. 30% of last year's audit fee remains unpaid. The finance director has promised settlement 'once the covenant test is confirmed by the audit'.\n3. The chief executive has offered the audit team hospitality at an international sports final, including flights and accommodation.\n4. The Group's financial controller resigned in April. The finance director has suggested that our firm second a member of staff to cover the role for six months." }
        ],
        requirements: [
          { id: "a", marks: 20, text: "Evaluate the significant risks of material misstatement to be considered in planning the audit of the Marlot Group for the year ending 30 June 20X5." },
          { id: "b", marks: 12, text: "Design the principal audit procedures to be performed on: (i) the goodwill arising on the acquisition of Vexa Co (6 marks); and (ii) the capitalised development costs of the e-commerce platform (6 marks)." },
          { id: "c", marks: 8, text: "Discuss the ethical and professional issues raised in Exhibit 4, and recommend the actions which the audit firm should take." }
        ]
      },
      {
        id: "m1q2", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Helix Co — Matters & audit evidence",
        exhibits: [
          { title: "Audit completion — outstanding matters", content:
"You are the manager responsible for the audit of Helix Co, a listed food-processing company, for the year ended 31 March 20X5. The draft financial statements show revenue of $310 million, profit before tax of $20.4 million and total assets of $186 million. The audit is nearing completion and the following matters are outstanding.\n\n(i) Legal claim — In January 20X5 a customer commenced legal action against Helix Co seeking damages of $4.5 million, alleging illness caused by a contaminated product. Helix Co's external lawyers have advised that it is possible, but not probable, that the claim will succeed. Management has made no provision and no disclosure in the financial statements, arguing that disclosure would be 'commercially damaging'.\n\n(ii) Brand — The 'Verdano' brand, purchased three years ago, is carried at $10 million. In February 20X5 a rival's product recall caused adverse publicity for the whole product category, and sales of Verdano products have fallen by 30% since that date. Management has not performed an impairment review, stating that the decline is 'clearly temporary'.\n\n(iii) Sale and leaseback — In March 20X5 Helix Co sold its main distribution centre to a financial institution for $18 million. The carrying amount of the property was $11 million and its fair value $15 million. Helix Co immediately leased the property back for a 15-year term. Management has derecognised the property and recognised the full profit of $7 million within operating profit." }
        ],
        requirements: [
          { id: "a", marks: 7, text: "In respect of the legal claim: comment on the matters you should consider (including materiality and the appropriate accounting treatment), and describe the audit evidence you would expect to find in your review of the audit working papers." },
          { id: "b", marks: 6, text: "In respect of the Verdano brand: comment on the matters you should consider, and describe the audit evidence you would expect to find in your review of the audit working papers." },
          { id: "c", marks: 7, text: "In respect of the sale and leaseback: comment on the matters you should consider, and describe the audit evidence you would expect to find in your review of the audit working papers." }
        ]
      },
      {
        id: "m1q3", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Rowan & Co — Ethics & quality management",
        exhibits: [
          { title: "Ethical matters brought to your attention", content:
"You are an audit manager in Rowan & Co, responsible for reviewing ethical matters across the firm's portfolio. The following situations have been brought to your attention.\n\n1. Fenwick Co is a listed audit client. Rowan & Co has audited Fenwick Co for nine years and the same engagement partner has acted for the last eight years. Total fees from Fenwick Co and its subsidiaries represented 16% of the firm's total fee income last year and are expected to reach 17% this year.\n\n2. The firm's tax department has proposed to Fenwick Co a fee for tax planning services calculated as 15% of any tax saved.\n\n3. Grale Co is a private audit client. The audit senior on the engagement has accepted a job as Grale Co's financial controller, starting one month after the audit report is due to be signed. He continues to lead the audit fieldwork.\n\n4. Grale Co's chief executive has invited the whole engagement team to a weekend at his lakeside lodge 'to celebrate a smooth audit'.\n\n5. Rowan & Co's new website states that the firm is 'the region's leading auditor, guaranteed to reduce your audit costs by 20%'." }
        ],
        requirements: [
          { id: "a", marks: 16, text: "Evaluate the ethical and professional threats arising in situations 1 to 5, and recommend the actions which Rowan & Co should take in response." },
          { id: "b", marks: 4, text: "Discuss the quality management implications of the situations described, including whether an engagement quality review is required for the engagements referred to." }
        ]
      }
    ]
  },

  /* ------------------------------------------------ MOCK 2 */
  {
    id: "m2",
    title: "Mock Exam 2",
    focus: ["Planning & risk", "Completion & reporting", "Due diligence"],
    questions: [
      {
        id: "m2q1", section: "A", marks: 50, skillsMarks: 10, timeMinutes: 98,
        title: "Calvora Group — Pharmaceutical planning",
        exhibits: [
          { title: "Email from the engagement partner", content:
"To: Audit manager\nFrom: Daniel Rees, engagement partner\nSubject: Calvora Group — audit planning, year ending 30 September 20X5\n\nHello,\n\nPlease prepare briefing notes for the Calvora Group audit planning meeting responding to the requirements below. Calvora has been an audit client for four years. Interim testing begins next month.\n\nThank you,\nDaniel" },
          { title: "Background information", content:
"The Calvora Group is a listed pharmaceutical group which develops and manufactures generic medicines and one patented drug, Letrizan, which generates 32% of Group revenue. The patent protecting Letrizan expires in January 20X6, after which generic competition is expected.\n\nDevelopment costs of $14.6 million have been capitalised in respect of a new respiratory drug, CV-40, which is in phase III clinical trials. Regulatory approval has not yet been obtained; management states approval is 'highly likely by mid 20X6'.\n\nIn May 20X5 the Group signed a five-year agreement with an overseas distributor. An upfront licence fee of $9 million was received and recognised in full in revenue on signing. Under the agreement the Group must also supply product and provide ongoing technical support over the five years.\n\nA government grant of $5 million was received towards the construction of a new laboratory and credited in full to profit in the year. A condition of the grant is that the Group maintains at least 150 jobs at the site for three years.\n\nA competitor has commenced legal action alleging patent infringement, claiming damages of $8 million. The court hearing is scheduled for after the date the auditor's report is expected to be signed.\n\nInventory is subject to strict expiry dates. The provisioning methodology has not been changed this year despite a slowdown in sales of two product lines. The year-end inventory counts take place simultaneously at three sites; the audit team can attend only two." },
          { title: "Extracts from projected financial information", content:
"Projected year to 30 September 20X5 (prior year actual in brackets), $ million:\n\nRevenue: 186.0 (174.0)\nProfit before tax: 21.4 (24.0)\nCapitalised development costs: 14.6 (6.2)\nInventory: 44.0 (31.0)\nProvisions: 2.1 (2.0)\nCash and equivalents: 6.0 (18.0)\nTotal assets: 208.0 (181.0)" },
          { title: "Notes from meeting with the finance director", content:
"1. The finance director has requested a 15% reduction in the audit fee, commenting that otherwise the audit 'will be put out to tender'.\n2. The Group is planning a bond issue. The firm's corporate finance team has been asked to advise on the issue, including preparing a profit forecast to be included in the offering document.\n3. The audit senior assigned to the engagement has disclosed that his brother works in Calvora's research and development department as a laboratory scientist.\n4. The finance director has asked members of the audit team to attend the Group's investor roadshow presentations 'to give investors comfort'." }
        ],
        requirements: [
          { id: "a", marks: 20, text: "Evaluate the significant risks of material misstatement to be considered in planning the audit of the Calvora Group for the year ending 30 September 20X5." },
          { id: "b", marks: 12, text: "Design the principal audit procedures to be performed on: (i) the capitalised development costs relating to CV-40 (6 marks); and (ii) the government grant (6 marks)." },
          { id: "c", marks: 8, text: "Discuss the ethical and professional issues raised in Exhibit 4, and recommend the actions which the audit firm should take." }
        ]
      },
      {
        id: "m2q2", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Ostrava Co — Completion & auditor's report",
        exhibits: [
          { title: "Schedule of matters at completion", content:
"You are completing the audit of Ostrava Co for the year ended 31 December 20X4. The draft financial statements show profit before tax of $9.2 million and total assets of $74 million. The following matters have been noted.\n\n1. A legal services invoice of $0.9 million relating to services received in December 20X4 was recorded in January 20X5. No accrual has been made at the year end.\n\n2. Inventory of the discontinued 'K-line' product range is held at cost of $1.6 million. Since the year end these products have been selling at approximately 60% of cost. No write-down has been recorded.\n\n3. During the year Ostrava Co sold goods totalling $2.1 million to Delano Co, a company owned by Ostrava Co's chief executive, at a significant discount to normal prices. Management refuses to disclose the relationship in the financial statements, stating that the amounts are 'not material'.\n\n4. Going concern — a $20 million loan is repayable in September 20X5. Refinancing negotiations with the bank are described by management as 'advanced but not concluded'. The draft financial statements are prepared on a going concern basis, and the only related disclosure states that 'the directors are confident that financing will be renewed'." }
        ],
        requirements: [
          { id: "a", marks: 12, text: "For matters 1 to 3, comment on the materiality and the correct accounting treatment of each matter, and recommend the actions the auditor should take." },
          { id: "b", marks: 8, text: "Assuming management makes no adjustments or additional disclosures, discuss the implications of matters 1 to 4 for the auditor's report." }
        ]
      },
      {
        id: "m2q3", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Kestrel Co — Due diligence engagement",
        exhibits: [
          { title: "Engagement request", content:
"Kestrel Co, a technology company which is not an audit client of your firm, is planning to acquire 100% of Tarn Co, a private software developer, for consideration of $30 million. Kestrel Co's directors have approached your firm to perform a due diligence review of Tarn Co before the acquisition is finalised.\n\nInformation obtained so far about Tarn Co:\n\n- Tarn Co was founded eight years ago and is still managed by its two founders, who are also the main software architects and are expected to leave within a year of the acquisition.\n- Approximately 70% of revenue is generated from three large customers under annual contracts which are renewed each January.\n- Tarn Co's core software platform was developed internally and is not recognised as an asset in its accounts.\n- Tarn Co qualifies for audit exemption and has never been audited. The only financial information available is unaudited management accounts.\n- The proposed deal structure includes an earn-out under which 40% of the consideration is contingent on Tarn Co's profits over the two years following completion." }
        ],
        requirements: [
          { id: "a", marks: 5, text: "Explain the benefits to Kestrel Co of commissioning a due diligence review of Tarn Co, rather than relying on the information provided by Tarn Co's management." },
          { id: "b", marks: 8, text: "Identify and explain the specific areas on which the due diligence review should focus, given the information provided." },
          { id: "c", marks: 7, text: "Recommend the additional information which should be requested and reviewed as part of the due diligence engagement." }
        ]
      }
    ]
  },

  /* ------------------------------------------------ MOCK 3 */
  {
    id: "m3",
    title: "Mock Exam 3",
    focus: ["Planning & risk", "Group audits", "Forensic audit"],
    questions: [
      {
        id: "m3q1", section: "A", marks: 50, skillsMarks: 10, timeMinutes: 98,
        title: "Brontes Group — Construction contracts",
        exhibits: [
          { title: "Email from the engagement partner", content:
"To: Audit manager\nFrom: Amara Diallo, engagement partner\nSubject: Brontes Group — audit planning, year ending 31 December 20X5\n\nHello,\n\nPlease prepare briefing notes for my review responding to the requirements below. Brontes has been an audit client for six years and this year's audit presents several new challenges.\n\nThank you,\nAmara" },
          { title: "Background information", content:
"The Brontes Group is an engineering and construction group. Revenue on long-term contracts is recognised over time, with progress measured using costs incurred as a proportion of total estimated costs.\n\nThe Group's largest contract, Harbour Link (contract price $60 million), has suffered significant cost escalation due to steel price increases. The Group has submitted a variation claim of $7.5 million to the customer. The claim has not yet been agreed, but the full amount has been included in contract revenue for the year. Retentions of 5% are withheld by customers on all contracts until final completion certificates are issued.\n\nThe provision for rectification of defects on completed contracts has been reduced from 3% to 1.5% of completed contract revenue, which management attributes to 'improved build quality'.\n\nThe Group holds a 40% interest in Delta JV, a joint venture accounted for using the equity method. Delta JV is audited by another firm, Marek & Partners, whose audited figures were received four months late last year. Delta JV operates in a jurisdiction where the audit regulator recently issued a critical inspection report on several local firms.\n\nThe Group's overdraft is close to its agreed limit, operating cash flow for the year is negative, and the pipeline of new tenders is weaker than in prior years. Performance guarantees and surety bonds have been given to customers on major contracts. A new ERP system for contract costing was implemented in July 20X5, including migration of all live contract data." },
          { title: "Extracts from projected financial information", content:
"Projected year to 31 December 20X5 (prior year actual in brackets), $ million:\n\nRevenue: 240.0 (215.0)\nProfit before tax: 8.9 (12.6)\nContract assets: 51.0 (32.0)\nRetentions receivable: 12.0 (9.0)\nProvision for defects: 3.6 (6.4)\nBank overdraft: 14.0 (6.0)\nShare of profit of Delta JV: 3.2 (2.1)\nTotal assets: 289.0 (261.0)" }
        ],
        requirements: [
          { id: "a", marks: 20, text: "Evaluate the significant risks of material misstatement to be considered in planning the audit of the Brontes Group for the year ending 31 December 20X5." },
          { id: "b", marks: 12, text: "In respect of the Harbour Link contract: (i) explain the additional information you require to plan the audit of the contract (6 marks); and (ii) design the principal audit procedures to be performed on the variation claim included in revenue (6 marks)." },
          { id: "c", marks: 8, text: "Discuss the matters the group audit team should consider in respect of the audit of Delta JV, including the extent to which reliance can be placed on the work of Marek & Partners." }
        ]
      },
      {
        id: "m3q2", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Vireo Group — Component auditors & consolidation",
        exhibits: [
          { title: "Group audit — matters arising", content:
"You are the manager on the audit of the Vireo Group, whose draft consolidated financial statements show profit before tax of $15 million and total assets of $190 million. The audit is at the completion stage and the following matters require your attention.\n\n1. Vireo Distribution SA, a significant component representing 28% of group assets, is audited by a local firm, Riva & Co, acting as component auditor. Riva & Co has reported an unresolved misstatement: inventory which appears obsolete, with a potential overstatement of $1.2 million, which component management refuses to adjust.\n\n2. The audit regulator in Riva & Co's jurisdiction issued a critical inspection report on the firm last year. Group audit instructions were sent to Riva & Co six weeks later than planned, and Riva & Co has not returned the required written confirmation of its independence and compliance with ethical requirements.\n\n3. During review of the consolidation, the group audit team identified that unrealised profit of $0.9 million on inventory sold by the parent to Vireo Distribution SA, and still held at the year end, has not been eliminated.\n\n4. Goodwill of $11 million relating to another component was tested for impairment by management using cash flow forecasts assuming revenue growth of 15% per annum; historical growth has averaged 4% per annum. No impairment was recognised." }
        ],
        requirements: [
          { id: "a", marks: 12, text: "Evaluate the matters described in notes 1 to 3, and recommend the actions to be taken by the group audit team, including in respect of the direction, supervision and review of the work of Riva & Co." },
          { id: "b", marks: 8, text: "In respect of the goodwill impairment test in note 4, comment on the matters you should consider and describe the audit evidence you would expect to find in your review of the working papers." }
        ]
      },
      {
        id: "m3q3", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Sable Co — Forensic investigation",
        exhibits: [
          { title: "Suspected payroll fraud", content:
"Sable Co is an audit client of your firm with a financial year ended 30 June 20X5; the auditor's report is due to be signed in six weeks.\n\nSable Co's directors have contacted your firm's forensic accounting department. An internal review has identified a suspected payroll fraud: the payroll supervisor may have created fictitious 'ghost' employees over a period of up to three years, with salary payments diverted to bank accounts under her control. The directors' initial estimate of the loss is between $0.6 million and $1 million. Draft profit before tax for the year is $7.8 million.\n\nThe payroll supervisor had system rights both to add new employees to the payroll and to approve the monthly payment run. She has been suspended pending investigation.\n\nThe directors have asked the firm to: quantify the total loss for an insurance claim; and provide evidence which could be used in criminal proceedings against the supervisor. The insurer requires that the forensic report be addressed to the insurer as well as to Sable Co." }
        ],
        requirements: [
          { id: "a", marks: 8, text: "Explain the matters, including ethical and professional matters, which the firm should consider before accepting the forensic investigation engagement." },
          { id: "b", marks: 8, text: "Recommend the procedures to be performed in order to quantify the loss suffered by Sable Co as a result of the suspected fraud." },
          { id: "c", marks: 4, text: "Discuss the implications of the suspected fraud for the audit of the financial statements for the year ended 30 June 20X5." }
        ]
      }
    ]
  },

  /* ------------------------------------------------ MOCK 4 */
  {
    id: "m4",
    title: "Mock Exam 4",
    focus: ["Initial engagement", "PFI", "Auditor's report critique"],
    questions: [
      {
        id: "m4q1", section: "A", marks: 50, skillsMarks: 10, timeMinutes: 98,
        title: "Quenda Group — First-year retail audit",
        exhibits: [
          { title: "Email from the engagement partner", content:
"To: Audit manager\nFrom: Tomas Berg, engagement partner\nSubject: Quenda Group — audit planning, year ended 30 June 20X5\n\nHello,\n\nWe have recently been appointed as auditor of the Quenda Group, replacing the previous firm. This is our first year, so your briefing notes should reflect the additional considerations of an initial engagement. Please respond to the requirements below.\n\nThank you,\nTomas" },
          { title: "Background information", content:
"The Quenda Group operates a chain of 150 supermarkets, of which 130 premises are leased and 20 are operated by franchisees. Upfront franchise fees are recognised in revenue in full when a franchise agreement is signed, although the Group provides ongoing brand support and supply-chain services over the franchise term.\n\nThe Group receives significant rebates and promotional allowances from suppliers. Amounts recognised are based on management's estimates of purchase volumes for each supplier arrangement, many of which span the year end.\n\nDuring the year 12 underperforming stores were closed, and a further 8 stores are described by management as 'under review'. No impairment of right-of-use assets or store equipment has been recognised. Executive directors receive an annual bonus based on EBITDA.\n\nInventory quantities are based on the perpetual inventory system, supported by cycle counts throughout the year; no full year-end count is performed. In August 20X5 (after the year end) a ransomware attack disrupted the Group's distribution systems for five days.\n\nThe previous auditor issued an unmodified opinion on the prior year financial statements. However, they have indicated that access to their working papers will be limited to a review of a summary file." },
          { title: "Extracts from draft financial information", content:
"Year ended 30 June 20X5 (prior year in brackets), $ million:\n\nRevenue: 890.0 (812.0)\nProfit before tax: 24.0 (29.0)\nSupplier rebates receivable: 18.0 (11.0)\nRight-of-use assets: 210.0 (198.0)\nImpairment recognised: nil (nil)\nInventory: 96.0 (88.0)\nTotal assets: 462.0 (438.0)" },
          { title: "Notes from meeting with the audit committee", content:
"1. Until two months before our appointment, our firm provided internal audit services to the Quenda Group, including work on inventory controls.\n2. The engagement partner originally proposed for the audit has disclosed that his spouse holds shares in Quenda Group.\n3. Our audit fee was quoted approximately 30% below the fee charged by the previous auditor.\n4. Management has requested that the audit be completed within six weeks of the year end to meet a bank reporting deadline." }
        ],
        requirements: [
          { id: "a", marks: 20, text: "Evaluate the significant risks of material misstatement to be considered in planning the audit of the Quenda Group, including the specific considerations arising because this is an initial audit engagement." },
          { id: "b", marks: 12, text: "Design the principal audit procedures to be performed on: (i) supplier rebates receivable (6 marks); and (ii) the impairment assessment of store assets and right-of-use assets (6 marks)." },
          { id: "c", marks: 8, text: "Discuss the ethical and professional issues raised in Exhibit 4, and recommend the actions which the audit firm should take." }
        ]
      },
      {
        id: "m4q2", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Nimbus Co — Prospective financial information",
        exhibits: [
          { title: "Engagement request", content:
"Nimbus Co, an unlisted logistics company and an existing audit client of your firm, has asked the firm to examine and report on a cash flow forecast covering the two years ending 30 June 20X7. The forecast is required by Nimbus Co's bank to support an application for a $12 million loan to fund warehouse automation.\n\nThe key assumptions underlying the forecast are:\n\n- revenue growth of 22% per annum, driven by a contract with a national retailer which is currently 'in final negotiation';\n- staff cost savings of $3.1 million per annum arising from redundancies in the packing division, effective from month 3;\n- capital expenditure of $12 million in months 1 to 4, funded by the new bank loan;\n- disposal proceeds of $2.4 million from the sale of the old vehicle fleet in month 6; and\n- no tax payments in year 1 due to tax losses brought forward." }
        ],
        requirements: [
          { id: "a", marks: 8, text: "Explain the matters which the firm should consider before accepting the engagement to examine and report on Nimbus Co's cash flow forecast." },
          { id: "b", marks: 12, text: "Recommend the examination procedures to be performed on the cash flow forecast, including procedures on the key assumptions." }
        ]
      },
      {
        id: "m4q3", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Drava Co — Critique of a draft auditor's report",
        exhibits: [
          { title: "Draft auditor's report prepared by the audit senior", content:
"Drava Co is an unlisted audit client with a year ended 31 March 20X5. Draft profit before tax is $6 million and total assets are $58 million. You are reviewing the following extract of the draft auditor's report prepared by the audit senior.\n\n--- Extract from draft report ---\n\nBasis for opinion\nWe were appointed after the year end and were unable to attend the counting of physical inventory, carried at $4 million. There were no alternative procedures available to us to confirm the existence and condition of inventory. Because the possible effects are considered pervasive to the financial statements, our opinion is qualified.\n\nOpinion\nIn our opinion, except for the possible effects of the matter described above, the financial statements give a true and fair view of the financial position of Drava Co.\n\nEmphasis of Matter\nWe draw users' attention to the inventory balance, which may be materially misstated.\n\nKey audit matters\nWe have determined that inventory is a key audit matter, as described above.\n\n--- End of extract ---\n\nOther information from the audit file: note 14 of the financial statements adequately discloses a material uncertainty related to going concern, arising from the renewal of the company's principal loan facility, which is still under negotiation. The draft report contains no reference to going concern. The senior has also dated the draft report two days before the date on which written representations are due to be received from management." }
        ],
        requirements: [
          { id: "a", marks: 20, text: "Critically appraise the extract of the draft auditor's report of Drava Co, identifying and explaining the errors and omissions, and recommending the corrections required. You should also conclude on the appropriate form of audit opinion." }
        ]
      }
    ]
  },

  /* ------------------------------------------------ MOCK 5 */
  {
    id: "m5",
    title: "Mock Exam 5",
    focus: ["Groups & disposals", "Sustainability assurance", "Laws & regulations"],
    questions: [
      {
        id: "m5q1", section: "A", marks: 50, skillsMarks: 10, timeMinutes: 98,
        title: "Selkava Group — Disposal, pensions & components",
        exhibits: [
          { title: "Email from the engagement partner", content:
"To: Audit manager\nFrom: Ines Duarte, engagement partner\nSubject: Selkava Group — audit planning, year ending 30 June 20X5\n\nHello,\n\nPlease prepare briefing notes responding to the requirements set out below. Selkava has been an audit client for seven years; this year involves a planned divestment and several judgemental areas.\n\nThank you,\nInes" },
          { title: "Background information", content:
"The Selkava Group is a listed industrial group with three divisions. In May 20X5 the board approved a detailed plan to sell the Ferro division and appointed advisers; negotiations with two potential buyers are active and completion is expected by December 20X5. Management intends to classify Ferro as held for sale and present it as a discontinued operation. Ferro's net assets have a carrying amount of $84 million; indicative offers received are in the range of $70 to $78 million.\n\nThe Group operates a defined benefit pension scheme. The actuary's draft report shows a deficit of $22 million (prior year: $35 million). The reduction is largely driven by an increase of 1.2 percentage points in the discount rate assumption, which is higher than movements in corporate bond yields during the year.\n\nShare options were granted to executives two years ago, vesting on achievement of a cumulative EPS target. No expense has been recognised this year because management considers the target 'unlikely to be met'.\n\nSelkava Asia, a significant overseas component, is audited by a component auditor located in a jurisdiction whose audit regulator has published concerns about local inspection findings. At the planning date, intragroup balances between the parent and Selkava Asia do not reconcile, with an unexplained difference of $3.1 million.\n\nThe Group's head office property was revalued upwards by $9 million during the year based on a valuation performed by an employee of the Group who is a qualified valuer." },
          { title: "Extracts from projected financial information", content:
"Projected year to 30 June 20X5 (prior year actual in brackets), $ million:\n\nRevenue: 402.0 (398.0)\nProfit before tax: 31.0 (28.0)\nPension deficit: 22.0 (35.0)\nFerro division net assets: 84.0\nRevaluation gain on head office: 9.0\nTotal assets: 510.0 (486.0)" },
          { title: "Notes from meeting with the finance director", content:
"1. The Group is in dispute with the tax authority and has asked the firm to represent Selkava at the tribunal hearing and to publicly support management's filing position.\n2. The chair of Selkava's audit committee joined the Group four months ago; until 18 months ago she was a partner in our firm, although she was never involved in the Selkava audit.\n3. Management has asked whether the firm can provide payroll processing services for the Ferro division during the sale process, 'to keep things simple for the buyer'.\n4. The component auditor of Selkava Asia has requested that its fee be negotiated directly with, and paid by, group management." }
        ],
        requirements: [
          { id: "a", marks: 20, text: "Evaluate the significant risks of material misstatement to be considered in planning the audit of the Selkava Group for the year ending 30 June 20X5." },
          { id: "b", marks: 12, text: "Design the principal audit procedures to be performed on: (i) the defined benefit pension deficit, including the discount rate assumption (6 marks); and (ii) the classification and measurement of the Ferro division as held for sale (6 marks)." },
          { id: "c", marks: 8, text: "Discuss the ethical and professional issues raised in Exhibit 4, and recommend the actions which the audit firm should take." }
        ]
      },
      {
        id: "m5q2", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Lumen Co — Assurance on sustainability KPIs",
        exhibits: [
          { title: "Engagement request", content:
"Lumen Co, a listed energy retailer and an existing audit client, publishes an integrated annual report which includes a number of sustainability key performance indicators (KPIs). The board has asked your firm to provide limited assurance, under ISAE 3000, on the following four KPIs for the year ending 31 December 20X5:\n\n1. CO2-equivalent emissions per MWh of energy supplied;\n2. Percentage of energy sourced from renewable generation, based on certificates provided by suppliers;\n3. Customer satisfaction score, compiled from surveys performed by an independent market research company; and\n4. Gender pay gap percentage.\n\nThe underlying data is drawn from several different operational systems which are outside the financial reporting system. Part of the executive directors' annual bonus is linked to achieving a reduction in the emissions KPI. This would be the first time the firm has provided assurance on Lumen Co's sustainability information." }
        ],
        requirements: [
          { id: "a", marks: 8, text: "Explain the matters the firm should consider before accepting the engagement, including the particular difficulties of providing assurance on the KPIs described." },
          { id: "b", marks: 12, text: "Recommend the procedures to be performed on: (i) the emissions KPI; and (ii) the renewable sourcing KPI." }
        ]
      },
      {
        id: "m5q3", section: "B", marks: 25, skillsMarks: 5, timeMinutes: 49,
        title: "Peral Co — Laws, regulations & money laundering",
        exhibits: [
          { title: "Matters identified during the audit", content:
"You are the manager on the audit of Peral Co, a private company which imports and distributes electrical goods. During the audit for the year ended 30 June 20X5, the team has identified the following matters.\n\n1. Cash takings from a chain of factory outlet stores are banked several times per week in amounts consistently just below the threshold at which the bank is required to make regulatory reports.\n\n2. Payments described as 'consultancy commissions' equal to 5% of the value of new overseas contracts have been made to an entity registered in an offshore jurisdiction. The audit team has been unable to obtain any evidence of services provided, and one email on file refers to the payments as necessary 'to keep the relationship with the procurement officials warm'.\n\n3. When the audit senior raised questions about the consultancy payments, the finance director asked him to 'leave it out of the audit file' and suggested that pressing the matter could 'put the audit relationship at risk'.\n\n4. Separately, Peral Co has asked the firm to hold $2 million of client money for a short period to facilitate a property transaction due to complete shortly after the year end." }
        ],
        requirements: [
          { id: "a", marks: 12, text: "In respect of matters 1 to 3, discuss the auditor's responsibilities in relation to laws and regulations and money laundering, and recommend the actions which the firm and the audit team should take." },
          { id: "b", marks: 8, text: "Discuss the professional and ethical issues raised by the finance director's request in matter 3 and the client money request in matter 4, and recommend the firm's response." }
        ]
      }
    ]
  }
];

/* ---------------- helpers ---------------- */

const K = { attempts: "aaa3:attempts", custom: "aaa3:custom", settings: "aaa3:settings", gaps: "aaa3:gaps" };
const draftKey = (skey) => "aaa3:draft:" + skey;

async function sGet(key, fallback) {
  try {
    const r = localStorage.getItem(key);
    return r ? JSON.parse(r) : fallback;
  } catch (e) { return fallback; }
}
async function sSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error("storage.set", e); }
}
async function sDel(key) {
  try { localStorage.removeItem(key); } catch (e) { /* ok */ }
}

/* --- API-ключ и модель (хранятся только в браузере) --- */

/* --- Каталог реальных экзаменов ACCA: только метаданные.
   Тексты заданий защищены авторским правом ACCA и в репозиторий не входят.
   Пользователь вставляет их сам; они хранятся только в его браузере. --- */
const PAST_PAPERS = [
  { id: "sd25", label: "Sep/Dec 2025", qs: [
    { slug: "sd25-q1", name: "Mistral Co", section: "A" },
    { slug: "sd25-q2", name: "Earps Co", section: "B" },
    { slug: "sd25-q3", name: "Phoenix Co", section: "B" } ] },
  { id: "mj25", label: "Mar/Jun 2025", qs: [
    { slug: "mj25-q1", name: "Speed Style Co", section: "A" },
    { slug: "mj25-q2", name: "Garda Group", section: "B" },
    { slug: "mj25-q3", name: "Wolves Co", section: "B" } ] },
  { id: "sd24", label: "Sep/Dec 2024", qs: [
    { slug: "sd24-q1", name: "Hart Group", section: "A" },
    { slug: "sd24-q2", name: "Bodeen Co", section: "B" },
    { slug: "sd24-q3", name: "Oak Co", section: "B" } ] },
  { id: "mj24", label: "Mar/Jun 2024", qs: [
    { slug: "mj24-q1", name: "Magenta Group", section: "A" },
    { slug: "mj24-q2", name: "Pickle & Co", section: "B" },
    { slug: "mj24-q3", name: "Cuckoo Group", section: "B" } ] },
  { id: "sd23", label: "Sep/Dec 2023", qs: [
    { slug: "sd23-q1", name: "Hammer Co", section: "A" },
    { slug: "sd23-q2", name: "Cottrell Co", section: "B" },
    { slug: "sd23-q3", name: "Aster Co", section: "B" } ] },
  { id: "mj23", label: "Mar/Jun 2023", qs: [
    { slug: "mj23-q1", name: "Encore Co", section: "A" },
    { slug: "mj23-q2", name: "Crawley Co", section: "B" },
    { slug: "mj23-q3", name: "Slaindar Co", section: "B" } ] },
  { id: "d22", label: "Dec 2022", qs: [
    { slug: "d22-q1", name: "Mercurio Co", section: "A" },
    { slug: "d22-q2", name: "Marlos Co", section: "B" },
    { slug: "d22-q3", name: "Kobold Co", section: "B" } ] },
  { id: "s22", label: "Sep 2022", qs: [
    { slug: "s22-q1", name: "Winberry Co", section: "A" },
    { slug: "s22-q2", name: "Geller Co", section: "B" },
    { slug: "s22-q3", name: "Forsythia Co", section: "B" } ] },
  { id: "spec", label: "Specimen (w.e.f. Sep 2022)", qs: [
    { slug: "spec-q1", name: "Specimen Q1", section: "A" },
    { slug: "spec-q2", name: "Specimen Q2", section: "B" },
    { slug: "spec-q3", name: "Specimen Q3", section: "B" } ] }
];
const paperDefaults = (sec) => sec === "A"
  ? { marks: 50, skillsMarks: 10, time: 98, reqs: [20, 12, 8] }
  : { marks: 25, skillsMarks: 5, time: 49, reqs: [12, 8] };

const AK = "aaa3:apikey";const AM = "aaa3:model";
const DEFAULT_MODEL = "claude-sonnet-4-5";
const MODEL_OPTIONS = [
  { id: "claude-sonnet-4-5", label: "Sonnet 4.5 — баланс цены и качества" },
  { id: "claude-haiku-4-5-20251001", label: "Haiku 4.5 — дешевле и быстрее" },
  { id: "claude-opus-4-5", label: "Opus 4.5 — максимум качества, дороже" }
];
function getApiKey() { return (localStorage.getItem(AK) || "").trim(); }
function apiModel() { return (localStorage.getItem(AM) || "").trim() || DEFAULT_MODEL; }
function apiHeaders() {
  const key = getApiKey();
  if (!key) throw new Error("Не задан API-ключ Anthropic. Открой «Настройки» и вставь ключ.");
  return {
    "content-type": "application/json",
    "x-api-key": key,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true"
  };
}

function wordsOf(t) { return (t || "").trim() ? t.trim().split(/\s+/).length : 0; }

function fmtClock(ms) {
  const neg = ms < 0; const s = Math.floor(Math.abs(ms) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const mm = String(m).padStart(2, "0"), ss = String(sec).padStart(2, "0");
  return (neg ? "−" : "") + (h > 0 ? h + ":" + mm + ":" + ss : m + ":" + ss);
}
function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }) + ", " +
         d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}
function clampNum(x, max) {
  const n = Number(x);
  if (!isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}
function recMinutes(q) { return Math.round(q.marks * 1.95); }

/* ---------------- Anthropic API ---------------- */

async function callJson(prompt) {
  let lastErr = null;
  for (let i = 0; i < 2; i++) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({
          model: apiModel(),
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "API error");
      const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const a = clean.indexOf("{"), b = clean.lastIndexOf("}");
      if (a === -1 || b === -1) throw new Error("Не удалось разобрать ответ ИИ");
      return JSON.parse(clean.slice(a, b + 1));
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

async function callText(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify({
      model: apiModel(),
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || "API error");
  return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
}

const GEN_TOPICS = [
  "Audit risk & planning", "Matters & audit evidence", "Completion & auditor's report",
  "Ethics & professional issues", "Group audits", "Quality management (ISQM)",
  "Due diligence", "Forensic audit", "PFI / forecasts", "Going concern",
  "Laws, regulations & money laundering", "Sustainability assurance"
];

function modelAnswerPrompt(q, req) {
  return "You are an ACCA AAA (Advanced Audit and Assurance) expert tutor. Write a model answer that would score full marks for the requirement below, based strictly on the scenario.\n\n" +
"=== SCENARIO ===\n" + exhibitsText(q) + "\n\n" +
"=== REQUIREMENT (" + req.marks + " technical marks) ===\n(" + req.id + ") " + req.text + "\n\n" +
"Format: exam-style answer in English, short applied points (roughly one point per mark, about " + req.marks + " points), each explained in one sentence and applied to the scenario. Include a brief materiality calculation where relevant. Maximum 450 words. Output plain text only — no JSON, no markdown headers.";
}

function genQuestionPrompt(topic) {
  return "You are an ACCA AAA (Advanced Audit and Assurance, INT) exam question writer. Create ONE original Section B style question (25 marks: 20 technical + 5 professional skills) on the topic: " + topic + ".\n\n" +
"Rules:\n" +
"- Invent a realistic company scenario of 180-240 words, including monetary figures usable for materiality (e.g. profit before tax, total assets) and 3-4 specific issues or assumptions.\n" +
"- Write 2-3 requirements in authentic ACCA AAA wording; technical marks must total exactly 20.\n" +
"- The question must be entirely original — do not reproduce any past ACCA exam question.\n\n" +
"Respond with ONLY valid JSON, no markdown fences:\n" +
"{\"title\": \"Company name — short topic label\", \"scenario\": \"...\", \"requirements\": [{\"text\": \"...\", \"marks\": 12}, {\"text\": \"...\", \"marks\": 8}]}";
}

function exhibitsText(q) {
  return q.exhibits.map((e, i) => "EXHIBIT " + (i + 1) + " — " + e.title + "\n" + e.content).join("\n\n");
}

function reqPrompt(q, req, answer, lang) {
  const fb = lang === "ru" ? "Russian" : "English";
  return "You are a strict but fair ACCA Advanced Audit and Assurance (AAA-INT) examiner marking ONE requirement of a candidate's answer.\n\n" +
"=== EXAM SCENARIO ===\n" + exhibitsText(q) + "\n\n" +
"=== REQUIREMENT (" + req.marks + " technical marks) ===\n(" + req.id + ") " + req.text + "\n\n" +
"=== CANDIDATE'S ANSWER ===\n\"\"\"\n" + (answer || "").slice(0, 14000) + "\n\"\"\"\n\n" +
"MARKING APPROACH (ACCA style):\n" +
"- Generally 1 mark per relevant point that is explained AND applied to the scenario; 0.5 for identification only.\n" +
"- Generic textbook points with no application to the scenario earn at most 0.5.\n" +
"- No marks for repetition or irrelevant content. Half marks are allowed.\n" +
"- Cap the total at " + req.marks + ". Be realistic, like a real ACCA marker.\n\n" +
"Respond with ONLY a valid JSON object, no markdown, no code fences, and keep every bullet under 20 words:\n" +
"{\n" +
"\"score\": <number>,\n" +
"\"maxScore\": " + req.marks + ",\n" +
"\"pointsEarned\": [\"up to 7 short bullets: what the candidate scored for, in English\"],\n" +
"\"missedPoints\": [\"up to 7 of the most important creditworthy model-answer points the candidate failed to make, as concise model-answer bullets in English\"],\n" +
"\"commentary\": \"2-3 sentences of examiner commentary in " + fb + "\",\n" +
"\"tips\": [\"2-3 specific tips to score higher on this type of requirement, in " + fb + "\"]\n" +
"}";
}

function skillsPrompt(q, answersText, lang) {
  const fb = lang === "ru" ? "Russian" : "English";
  return "You are an ACCA AAA examiner awarding PROFESSIONAL SKILLS marks (max " + q.skillsMarks + ") for a candidate's full answer to this question.\n\n" +
"QUESTION: " + q.title + " (" + q.marks + " marks). Requirements:\n" +
q.requirements.map(r => "(" + r.id + ") " + r.text).join("\n") + "\n\n" +
"CANDIDATE'S FULL ANSWER:\n\"\"\"\n" + answersText.slice(0, 12000) + "\n\"\"\"\n\n" +
"Assess the four ACCA professional skills: communication (structure, clarity, appropriate format), analysis and evaluation, professional scepticism and judgement, commercial acumen. Award a realistic total out of " + q.skillsMarks + " (half marks allowed).\n\n" +
"Respond with ONLY valid JSON, no markdown:\n" +
"{\n" +
"\"score\": <number>,\n" +
"\"maxScore\": " + q.skillsMarks + ",\n" +
"\"breakdown\": [{\"skill\": \"Communication\", \"comment\": \"1 short sentence in " + fb + "\"}, {\"skill\": \"Analysis & evaluation\", \"comment\": \"...\"}, {\"skill\": \"Scepticism & judgement\", \"comment\": \"...\"}, {\"skill\": \"Commercial acumen\", \"comment\": \"...\"}],\n" +
"\"tips\": [\"2-3 tips in " + fb + " on how to earn more professional marks\"]\n" +
"}";
}

async function gradeSession(questions, answers, lang, onProgress) {
  const byQ = {};
  const total = questions.reduce((s, q) => s + q.requirements.length + 1, 0);
  let done = 0;
  for (let qi = 0; qi < questions.length; qi++) {
    const q = questions[qi];
    const qAns = answers[q.id] || {};
    const res = { reqs: {}, skills: null };
    for (const r of q.requirements) {
      onProgress({ done, total, label: "Q" + (qi + 1) + " · требование (" + r.id + ") — " + r.marks + " баллов" });
      const ans = (qAns[r.id] || "").trim();
      if (!ans) {
        res.reqs[r.id] = { score: 0, maxScore: r.marks, pointsEarned: [], missedPoints: [],
          commentary: lang === "ru" ? "Ответ не предоставлен." : "No answer provided.", tips: [] };
      } else {
        const out = await callJson(reqPrompt(q, r, ans, lang));
        out.score = clampNum(out.score, r.marks);
        out.maxScore = r.marks;
        res.reqs[r.id] = out;
      }
      done++;
    }
    onProgress({ done, total, label: "Q" + (qi + 1) + " · professional skills" });
    const allText = q.requirements.map(r => "(" + r.id + ")\n" + (qAns[r.id] || "(no answer)")).join("\n\n");
    const hasAny = q.requirements.some(r => (qAns[r.id] || "").trim());
    if (hasAny) {
      const sk = await callJson(skillsPrompt(q, allText, lang));
      sk.score = clampNum(sk.score, q.skillsMarks);
      sk.maxScore = q.skillsMarks;
      res.skills = sk;
    } else {
      res.skills = { score: 0, maxScore: q.skillsMarks, breakdown: [], tips: [] };
    }
    done++;
    byQ[q.id] = res;
  }
  onProgress({ done: total, total, label: "Готово" });
  return byQ;
}

function computeTotals(questions, byQ) {
  const perQ = {};
  let total = 0, max = 0;
  questions.forEach(q => {
    let tech = 0;
    q.requirements.forEach(r => { tech += clampNum(byQ[q.id]?.reqs?.[r.id]?.score, r.marks); });
    const skills = clampNum(byQ[q.id]?.skills?.score, q.skillsMarks);
    const qTotal = Math.round((tech + skills) * 2) / 2;
    perQ[q.id] = { tech, skills, total: qTotal, max: q.marks, pct: Math.round((qTotal / q.marks) * 100) };
    total += qTotal; max += q.marks;
  });
  total = Math.round(total * 2) / 2;
  return { perQ, total, max, pct: max > 0 ? Math.round((total / max) * 100) : 0 };
}

/* ---------------- small UI pieces ---------------- */

/* ---------------- выделяемый текст (маркер как в CBE) ---------------- */

function offsetIn(root, node, off) {
  let acc = 0;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (n === node) return acc + off;
    acc += n.nodeValue.length;
  }
  return null;
}

function mergeRanges(list) {
  const a = list.slice().sort((x, y) => x.s - y.s);
  const out = [];
  for (const r of a) {
    const last = out[out.length - 1];
    if (last && r.s <= last.e) last.e = Math.max(last.e, r.e);
    else out.push({ s: r.s, e: r.e });
  }
  return out;
}

function Markable({ text, ranges, hlMode, onChange, className }) {
  const ref = useRef(null);
  const rs = ranges || [];

  const apply = () => {
    if (!hlMode) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    const r = sel.getRangeAt(0);
    const root = ref.current;
    if (!root || !root.contains(r.startContainer) || !root.contains(r.endContainer)) return;
    const s0 = offsetIn(root, r.startContainer, r.startOffset);
    const e0 = offsetIn(root, r.endContainer, r.endOffset);
    if (s0 == null || e0 == null || e0 <= s0) return;
    onChange(mergeRanges(rs.concat([{ s: s0, e: e0 }])));
    sel.removeAllRanges();
  };

  const removeAt = (i, ev) => {
    if (!hlMode) return;
    ev.stopPropagation();
    onChange(rs.filter((_, j) => j !== i));
  };

  let body;
  if (!rs.length) body = text;
  else {
    const parts = [];
    let pos = 0;
    rs.forEach((r, i) => {
      if (r.s > pos) parts.push(<span key={"p" + i}>{text.slice(pos, r.s)}</span>);
      parts.push(
        <mark key={"m" + i} onClick={(ev) => removeAt(i, ev)}
          className={"bg-yellow-200 rounded-sm " + (hlMode ? "cursor-pointer" : "")}>
          {text.slice(r.s, r.e)}
        </mark>
      );
      pos = Math.max(pos, r.e);
    });
    if (pos < text.length) parts.push(<span key="last">{text.slice(pos)}</span>);
    body = parts;
  }

  return (
    <div ref={ref} onMouseUp={apply} onTouchEnd={apply}
      className={className + (hlMode ? " selection:bg-yellow-300" : "")}>
      {body}
    </div>
  );
}

function SectionTag({ section }) {
  return (
    <span className={"inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold tracking-wide " +
      (section === "A" ? "bg-red-800 text-white" : "bg-stone-800 text-white")}>
      Section {section}
    </span>
  );
}

function Score({ value, max, big }) {
  return (
    <span className={"font-mono font-semibold " + (big ? "text-4xl" : "")}>
      {value}<span className="text-stone-400">/{max}</span>
    </span>
  );
}

function Bar({ value, max }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-1.5 w-full rounded-full bg-stone-200">
      <div className={"h-1.5 rounded-full " + (pct >= 50 ? "bg-emerald-600" : "bg-red-700")} style={{ width: pct + "%" }} />
    </div>
  );
}

/* ---------------- root component ---------------- */

export default function App() {
  const [view, setView] = useState("home"); // home | exam | grading | result | history | add
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState([]);
  const [customQs, setCustomQs] = useState([]);
  const [lang, setLang] = useState("ru");

  const [session, setSession] = useState(null); // {kind, key, title, questions, startedAt, endAt, marksTotal}
  const [answers, setAnswers] = useState({});   // {qid: {rid: text}}
  const [now, setNow] = useState(Date.now());
  const [qIdx, setQIdx] = useState(0);
  const [mobTab, setMobTab] = useState("task");
  const [pendingDraft, setPendingDraft] = useState(null);

  const [progress, setProgress] = useState({ done: 0, total: 1, label: "" });
  const [gradeError, setGradeError] = useState(null);
  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [gapsDone, setGapsDone] = useState({});
  const [improve, setImprove] = useState(null); // {qid, rid, text, busy}
  const [maBusy, setMaBusy] = useState(null);   // "qid:rid" пока грузится образцовый ответ
  const [hasKey, setHasKey] = useState(false);
  const [hlMode, setHlMode] = useState(false);
  const [hl, setHl] = useState({});
  const [addPreset, setAddPreset] = useState(null);

  const builtinQuestions = EXAMS.flatMap(e => e.questions);
  const allQuestions = [...builtinQuestions, ...customQs];
  const findQuestion = (qid) => allQuestions.find(q => q.id === qid) || null;

  /* --- initial load --- */
  useEffect(() => {
    (async () => {
      const [a, c, s, g] = await Promise.all([
        sGet(K.attempts, []), sGet(K.custom, []), sGet(K.settings, { lang: "ru" }), sGet(K.gaps, {})
      ]);
      setAttempts(Array.isArray(a) ? a : []);
      setCustomQs(Array.isArray(c) ? c : []);
      setLang(s && s.lang === "en" ? "en" : "ru");
      setGapsDone(g && typeof g === "object" ? g : {});
      setHasKey(!!getApiKey());
      setLoading(false);
    })();
  }, []);

  const saveLang = async (l) => { setLang(l); await sSet(K.settings, { lang: l }); };

  /* --- timer tick --- */
  useEffect(() => {
    if (view !== "exam" || !session || session.paused) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [view, session]);

  /* --- выделения текущего вопроса --- */
  useEffect(() => {
    if (view !== "exam" || !session) return;
    const q = session.questions[qIdx];
    if (!q) return;
    (async () => setHl(await sGet("aaa3:hl:" + q.id, {})))();
  }, [view, session, qIdx]);

  const saveHl = (key, ranges) => {
    const q = session && session.questions[qIdx];
    if (!q) return;
    const next = { ...hl, [key]: ranges };
    setHl(next);
    sSet("aaa3:hl:" + q.id, next);
  };
  const clearHl = () => {
    const q = session && session.questions[qIdx];
    if (!q) return;
    setHl({});
    sSet("aaa3:hl:" + q.id, {});
  };

  /* --- draft autosave --- */
  useEffect(() => {
    if (view !== "exam" || !session) return;
    const h = setTimeout(() => {
      sSet(draftKey(session.key), {
        kind: session.kind, title: session.title, answers,
        startedAt: session.startedAt, endAt: session.endAt,
        paused: !!session.paused, remainingMs: session.remainingMs,
        durationMs: session.durationMs
      });
    }, 1200);
    return () => clearTimeout(h);
  }, [answers, view, session]);

  /* --- session builders --- */
  const descForExam = (exam) => ({
    kind: "exam", key: exam.id, title: exam.title,
    questions: exam.questions, minutes: 195
  });
  const descForQuestion = (q) => ({
    kind: "single", key: "q:" + q.id, title: q.title,
    questions: [q], minutes: q.timeMinutes || recMinutes(q)
  });

  const openSession = async (desc) => {
    const draft = await sGet(draftKey(desc.key), null);
    const hasText = draft && draft.answers &&
      Object.values(draft.answers).some(qa => qa && Object.values(qa).some(v => v && v.trim()));
    if (hasText) setPendingDraft({ desc, draft });
    else startFresh(desc);
  };
  const startFresh = (desc) => {
    const st = Date.now();
    setSession({
      kind: desc.kind, key: desc.key, title: desc.title, questions: desc.questions,
      startedAt: st, endAt: st + desc.minutes * 60000,
      durationMs: desc.minutes * 60000, paused: false, remainingMs: null,
      marksTotal: desc.questions.reduce((s, q) => s + q.marks, 0)
    });
    setAnswers({});
    setQIdx(0);
    setMobTab("task");
    setView("exam");
  };
  const resumeDraft = () => {
    const { desc, draft } = pendingDraft;
    const dur = draft.durationMs || desc.minutes * 60000;
    const wasPaused = !!draft.paused;
    setSession({
      kind: desc.kind, key: desc.key, title: desc.title, questions: desc.questions,
      startedAt: draft.startedAt || Date.now(),
      endAt: wasPaused ? Date.now() + (draft.remainingMs || dur) : (draft.endAt || Date.now() + dur),
      durationMs: dur,
      paused: wasPaused,
      remainingMs: wasPaused ? (draft.remainingMs != null ? draft.remainingMs : dur) : null,
      marksTotal: desc.questions.reduce((s, q) => s + q.marks, 0)
    });
    setAnswers(draft.answers || {});
    setQIdx(0);
    setMobTab("answer");
    setPendingDraft(null);
    setView("exam");
  };
  const discardDraft = async () => {
    const { desc } = pendingDraft;
    await sDel(draftKey(desc.key));
    setPendingDraft(null);
    startFresh(desc);
  };

  const setAns = (qid, rid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: { ...(prev[qid] || {}), [rid]: val } }));
  };

  const pauseExam = () => {
    if (!session || session.paused) return;
    setSession(prev => ({ ...prev, paused: true, remainingMs: prev.endAt - Date.now() }));
  };
  const resumeExam = () => {
    if (!session || !session.paused) return;
    setSession(prev => ({ ...prev, paused: false, endAt: Date.now() + (prev.remainingMs || 0), remainingMs: null }));
  };
  const leaveExam = () => {
    if (window.confirm("Выйти? Таймер встанет на паузу, ответы сохранятся — можно продолжить с того же места.")) {
      if (session && !session.paused) {
        const rem = session.endAt - Date.now();
        sSet(draftKey(session.key), {
          kind: session.kind, title: session.title, answers,
          startedAt: session.startedAt, endAt: session.endAt,
          paused: true, remainingMs: rem, durationMs: session.durationMs
        });
      }
      setView("home"); setSession(null);
    }
  };

  /* --- grading --- */
  const runGrading = useCallback(async (sess, ans) => {
    setGradeError(null);
    setView("grading");
    try {
      const byQ = await gradeSession(sess.questions, ans, lang, setProgress);
      const totals = computeTotals(sess.questions, byQ);
      const attempt = {
        id: "a" + Date.now(),
        date: Date.now(),
        kind: sess.kind,
        key: sess.key,
        title: sess.title,
        questions: sess.questions.map(q => ({
          id: q.id, section: q.section, title: q.title, marks: q.marks,
          skillsMarks: q.skillsMarks, requirements: q.requirements, exhibits: q.exhibits
        })),
        answers: ans,
        results: byQ,
        totals,
        timeUsedSec: Math.round(((sess.durationMs || 0) - (sess.paused ? (sess.remainingMs || 0) : (sess.endAt - Date.now()))) / 1000),
        overtime: (sess.paused ? (sess.remainingMs || 0) : (sess.endAt - Date.now())) < 0
      };
      const list = [attempt, ...attempts];
      setAttempts(list);
      await sSet(K.attempts, list);
      await sDel(draftKey(sess.key));
      setCurrentAttempt(attempt);
      setView("result");
    } catch (e) {
      setGradeError(String((e && e.message) || e));
    }
  }, [lang, attempts]);

  const submitExam = () => {
    if (!session) return;
    if (!hasKey) { window.alert("Сначала вставь API-ключ Anthropic в «Настройках»."); setView("settings"); return; }
    const empty = [];
    session.questions.forEach((q, i) => q.requirements.forEach(r => {
      if (!((answers[q.id] || {})[r.id] || "").trim()) empty.push("Q" + (i + 1) + "(" + r.id + ")");
    }));
    const calls = session.questions.reduce((s, q) => s + q.requirements.length + 1, 0);
    const msg = (empty.length ? "Без ответа: " + empty.join(", ") + ". " : "") +
      "Завершить и отправить на проверку? Проверка займёт несколько минут (" + calls + " шагов).";
    if (window.confirm(msg)) runGrading(session, answers);
  };

  const retryAttempt = (a) => {
    if (a.kind === "exam") {
      const exam = EXAMS.find(e => e.id === a.key);
      if (exam) return openSession(descForExam(exam));
    } else {
      const q = findQuestion(a.questions[0]?.id);
      if (q) return openSession(descForQuestion(q));
    }
    setView("home");
  };

  const deleteAttempt = async (id) => {
    if (!window.confirm("Удалить эту попытку?")) return;
    const list = attempts.filter(a => a.id !== id);
    setAttempts(list);
    await sSet(K.attempts, list);
  };
  const deleteCustom = async (id) => {
    if (!window.confirm("Удалить этот вопрос?")) return;
    const list = customQs.filter(q => q.id !== id);
    setCustomQs(list);
    await sSet(K.custom, list);
  };

  /* --- работа с готовой попыткой --- */
  const updateAttempt = async (upd) => {
    const list = attempts.map(x => x.id === upd.id ? upd : x);
    setAttempts(list);
    setCurrentAttempt(upd);
    await sSet(K.attempts, list);
  };
  const getFullQ = (a, qid) => {
    const snap = (a.questions || []).find(x => x.id === qid);
    if (snap && snap.exhibits) return snap;
    return findQuestion(qid) || snap;
  };

  const loadModelAnswer = async (a, qid, rid) => {
    const q = getFullQ(a, qid);
    if (!q || !q.exhibits) { window.alert("Исходный сценарий не найден (вопрос был удалён)."); return; }
    const req = q.requirements.find(r => r.id === rid);
    const busyKey = qid + ":" + rid;
    setMaBusy(busyKey);
    try {
      const text = await callText(modelAnswerPrompt(q, req));
      const upd = JSON.parse(JSON.stringify(a));
      upd.results[qid].reqs[rid].modelAnswer = text;
      await updateAttempt(upd);
    } catch (e) {
      window.alert("Не удалось получить образцовый ответ: " + ((e && e.message) || e));
    }
    setMaBusy(null);
  };

  const submitImprove = async () => {
    if (!improve || !currentAttempt) return;
    const a = currentAttempt;
    const q = getFullQ(a, improve.qid);
    if (!q || !q.exhibits) { window.alert("Исходный сценарий не найден (вопрос был удалён)."); return; }
    const req = q.requirements.find(r => r.id === improve.rid);
    setImprove(prev => ({ ...prev, busy: true }));
    try {
      const out = await callJson(reqPrompt(q, req, improve.text, lang));
      out.score = clampNum(out.score, req.marks);
      out.maxScore = req.marks;
      const upd = JSON.parse(JSON.stringify(a));
      const old = upd.results[improve.qid].reqs[improve.rid] || {};
      out.prevScore = old.improved ? old.prevScore : (old.score || 0);
      out.improved = true;
      out.modelAnswer = old.modelAnswer;
      upd.results[improve.qid].reqs[improve.rid] = out;
      upd.answers[improve.qid] = { ...(upd.answers[improve.qid] || {}), [improve.rid]: improve.text };
      upd.totals = computeTotals(upd.questions, upd.results);
      await updateAttempt(upd);
      setImprove(null);
    } catch (e) {
      window.alert("Перепроверка не удалась: " + ((e && e.message) || e));
      setImprove(prev => ({ ...prev, busy: false }));
    }
  };

  const toggleGap = async (gid) => {
    const next = { ...gapsDone, [gid]: !gapsDone[gid] };
    setGapsDone(next);
    await sSet(K.gaps, next);
  };

  /* --- stats --- */
  const bestPct = attempts.length ? Math.max(...attempts.map(a => a.totals?.pct || 0)) : null;
  const avgPct = attempts.length ? Math.round(attempts.reduce((s, a) => s + (a.totals?.pct || 0), 0) / attempts.length) : null;
  const bestForKey = (key) => {
    const rel = attempts.filter(a => a.key === key);
    return rel.length ? Math.max(...rel.map(a => a.totals?.pct || 0)) : null;
  };

  /* ================= VIEWS ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-red-800" />
      </div>
    );
  }

  /* ---------- HOME ---------- */
  if (view === "home") {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-3xl mx-auto px-4 py-8 pb-16">
          <p className="text-xs uppercase tracking-widest text-red-800 font-semibold">ACCA · Advanced Audit &amp; Assurance</p>
          <h1 className="font-serif text-4xl mt-1">AAA Exam Studio</h1>
          <p className="text-stone-600 mt-2 text-sm leading-relaxed">
            5 полных пробных экзаменов в формате AAA: Section A (50 баллов) и два вопроса Section B (по 25).
            Пишешь на время, ИИ-экзаменатор оценивает по методике ACCA и показывает, чего не хватило до максимума.
          </p>

          {!hasKey && (
            <button onClick={() => setView("settings")}
              className="mt-4 w-full text-left bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5 hover:border-amber-400">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-sm text-stone-800">Вставь API-ключ Anthropic в настройках — без него проверка работать не будет.</span>
              <ArrowRight className="w-4 h-4 text-amber-600 ml-auto shrink-0" />
            </button>
          )}

          {attempts.length > 0 && (
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="bg-white border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-500">Попыток</p>
                <p className="font-mono text-xl font-semibold">{attempts.length}</p>
              </div>
              <div className="bg-white border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-500">Лучший</p>
                <p className={"font-mono text-xl font-semibold " + (bestPct >= 50 ? "text-emerald-700" : "text-red-800")}>{bestPct}%</p>
              </div>
              <div className="bg-white border border-stone-200 rounded-lg p-3">
                <p className="text-xs text-stone-500">Средний</p>
                <p className="font-mono text-xl font-semibold">{avgPct}%</p>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button onClick={() => setView("history")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm hover:bg-stone-50">
              <History className="w-4 h-4" /> История
            </button>
            <button onClick={() => setView("gaps")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm hover:bg-stone-50">
              <ListChecks className="w-4 h-4" /> Пробелы
            </button>
            <button onClick={() => setView("papers")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm hover:bg-stone-50">
              <Library className="w-4 h-4" /> Past papers
            </button>
            <button onClick={() => setView("settings")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm hover:bg-stone-50">
              <KeyRound className="w-4 h-4" /> Настройки
            </button>
            <button onClick={() => setView("add")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm hover:bg-stone-50">
              <Plus className="w-4 h-4" /> Свой вопрос
            </button>
            <div className="ml-auto flex items-center gap-1 text-xs text-stone-500">
              <span>Комментарии:</span>
              <button onClick={() => saveLang("ru")}
                className={"rounded px-2 py-1 " + (lang === "ru" ? "bg-stone-900 text-white" : "bg-white border border-stone-300")}>RU</button>
              <button onClick={() => saveLang("en")}
                className={"rounded px-2 py-1 " + (lang === "en" ? "bg-stone-900 text-white" : "bg-white border border-stone-300")}>EN</button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {EXAMS.map((exam, ei) => {
              const best = bestForKey(exam.id);
              return (
                <div key={exam.id} className="bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-400 transition-colors">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold bg-stone-900 text-white rounded px-1.5 py-0.5">{"MOCK " + (ei + 1)}</span>
                    <span className="font-mono text-xs text-stone-500">100 marks · 3 ч 15 мин</span>
                    {best !== null && (
                      <span className={"ml-auto font-mono text-xs font-semibold rounded px-1.5 py-0.5 " +
                        (best >= 50 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-800")}>
                        лучший: {best}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl mt-2">{exam.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {exam.focus.map(a => (
                      <span key={a} className="text-xs text-stone-500 bg-stone-100 rounded px-1.5 py-0.5">{a}</span>
                    ))}
                  </div>

                  <div className="mt-3 divide-y divide-stone-100 border border-stone-100 rounded-lg overflow-hidden">
                    {exam.questions.map((q, qi) => {
                      const qBest = bestForKey("q:" + q.id);
                      return (
                        <button key={q.id} onClick={() => openSession(descForQuestion(q))}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-stone-50">
                          <span className="font-mono text-xs text-stone-400 w-6">Q{qi + 1}</span>
                          <SectionTag section={q.section} />
                          <span className="text-sm flex-1 min-w-0 truncate">{q.title}</span>
                          {qBest !== null && (
                            <span className={"font-mono text-xs " + (qBest >= 50 ? "text-emerald-700" : "text-red-800")}>{qBest}%</span>
                          )}
                          <span className="font-mono text-xs text-stone-400">{q.marks}</span>
                          <PenLine className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-xs text-stone-400">Нажми на вопрос, чтобы тренировать его отдельно.</p>

                  <button onClick={() => openSession(descForExam(exam))}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-800 text-white px-3.5 py-2 text-sm font-medium hover:bg-red-900">
                    <FileText className="w-4 h-4" /> Экзамен целиком <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            {customQs.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-xl p-4">
                <h3 className="font-serif text-xl">Мои вопросы</h3>
                <div className="mt-3 divide-y divide-stone-100 border border-stone-100 rounded-lg overflow-hidden">
                  {customQs.map(q => {
                    const qBest = bestForKey("q:" + q.id);
                    return (
                      <div key={q.id} className="flex items-center gap-2 px-3 py-2">
                        <SectionTag section={q.section} />
                        <button onClick={() => openSession(descForQuestion(q))} className="text-sm flex-1 min-w-0 truncate text-left hover:text-red-800">
                          {q.title}
                        </button>
                        {qBest !== null && (
                          <span className={"font-mono text-xs " + (qBest >= 50 ? "text-emerald-700" : "text-red-800")}>{qBest}%</span>
                        )}
                        <span className="font-mono text-xs text-stone-400">{q.marks}</span>
                        <button onClick={() => deleteCustom(q.id)} className="p-1 text-stone-400 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <p className="mt-8 text-xs text-stone-400 leading-relaxed">
            Все 15 заданий — оригинальные, составлены по формату и силлабусу AAA (INT). Реальные past papers
            с сайта ACCA можно добавлять через «Свой вопрос». Оценка ИИ — ориентир для тренировки,
            а не официальная оценка ACCA. Норматив времени: 1,95 мин на балл.
          </p>
        </div>

        {pendingDraft && (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-5 max-w-sm w-full">
              <h3 className="font-serif text-lg">Найден черновик</h3>
              <p className="text-sm text-stone-600 mt-1">
                По «{pendingDraft.desc.title}» есть незавершённая попытка. Продолжить её?
              </p>
              <div className="mt-4 flex gap-2">
                <button onClick={resumeDraft} className="flex-1 rounded-lg bg-red-800 text-white px-3 py-2 text-sm font-medium hover:bg-red-900">Продолжить</button>
                <button onClick={discardDraft} className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50">Начать заново</button>
              </div>
              <button onClick={() => setPendingDraft(null)} className="mt-2 w-full text-xs text-stone-400 hover:text-stone-600">Отмена</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------- EXAM ---------- */
  if (view === "exam" && session) {
    const q = session.questions[qIdx];
    const remaining = session.paused ? (session.remainingMs || 0) : session.endAt - now;
    const durMs = session.durationMs || (session.endAt - session.startedAt);
    const frac = durMs > 0 ? remaining / durMs : 0;
    const expired = remaining <= 0;
    const timerCls = expired ? "bg-red-800 text-white" :
      frac <= 0.1 ? "bg-red-100 text-red-800" :
      frac <= 0.25 ? "bg-amber-100 text-amber-800" : "bg-stone-200 text-stone-800";
    const totalWords = session.questions.reduce((s, qq) =>
      s + qq.requirements.reduce((s2, r) => s2 + wordsOf((answers[qq.id] || {})[r.id]), 0), 0);
    const qAnswered = (qq) => qq.requirements.some(r => ((answers[qq.id] || {})[r.id] || "").trim());

    const hlCount = Object.values(hl).reduce((n, v) => n + (v ? v.length : 0), 0);
    const scenario = (
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap bg-white border border-stone-200 rounded-xl px-3 py-2">
          <button onClick={() => setHlMode(v => !v)}
            className={"inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium " +
              (hlMode ? "bg-yellow-300 text-stone-900" : "border border-stone-300 bg-white hover:bg-stone-50")}>
            <Highlighter className="w-4 h-4" /> Маркер {hlMode ? "вкл" : "выкл"}
          </button>
          {hlCount > 0 && (
            <button onClick={clearHl} className="text-xs text-stone-500 hover:text-red-800">
              Снять все ({hlCount})
            </button>
          )}
          <span className="text-xs text-stone-400 ml-auto">
            {hlMode ? "Выделите текст мышью; нажмите на выделенное, чтобы снять" : "Включите, чтобы отмечать важное"}
          </span>
        </div>
        {q.exhibits.map((e, i) => (
          <div key={i} className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5">
            <p className="text-xs uppercase tracking-widest text-red-800 font-semibold">Exhibit {i + 1}</p>
            <h4 className="font-serif text-lg mt-0.5">{e.title}</h4>
            <Markable text={e.content} ranges={hl["e" + i]} hlMode={hlMode}
              onChange={(r) => saveHl("e" + i, r)}
              className="mt-2 font-serif text-sm leading-relaxed text-stone-800 whitespace-pre-wrap" />
          </div>
        ))}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Requirements</p>
          <div className="mt-2 space-y-2">
            {q.requirements.map(r => (
              <div key={r.id} className="font-serif text-sm leading-relaxed">
                <span className="font-semibold">({r.id})</span>{" "}
                <Markable text={r.text} ranges={hl["r" + r.id]} hlMode={hlMode}
                  onChange={(v) => saveHl("r" + r.id, v)} className="inline" />{" "}
                <span className="font-mono text-xs text-stone-500">({r.marks} marks)</span>
              </div>
            ))}
            <p className="font-serif text-sm text-stone-600">
              Professional marks will be awarded for the demonstration of skill. <span className="font-mono text-xs text-stone-500">({q.skillsMarks} marks)</span>
            </p>
          </div>
        </div>
      </div>
    );

    const answerCol = (
      <div className="space-y-4">
        {q.requirements.map(r => (
          <div key={r.id} className="bg-white border border-stone-200 rounded-xl p-4">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold">({r.id}) <span className="font-mono text-xs text-stone-500 font-normal">{r.marks} marks · ~{Math.round(r.marks * 1.95)} мин</span></p>
              <p className="font-mono text-xs text-stone-400">{wordsOf((answers[q.id] || {})[r.id])} слов</p>
            </div>
            <textarea
              value={(answers[q.id] || {})[r.id] || ""}
              onChange={(ev) => setAns(q.id, r.id, ev.target.value)}
              placeholder={"Ваш ответ на требование (" + r.id + ") — на английском, как на экзамене"}
              spellCheck={false}
              className="mt-2 w-full min-h-48 rounded-lg border border-stone-300 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 resize-y"
            />
          </div>
        ))}
        {session.questions.length > 1 && qIdx < session.questions.length - 1 ? (
          <button onClick={() => { setQIdx(qIdx + 1); setMobTab("task"); window.scrollTo(0, 0); }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 text-white px-4 py-3 font-medium hover:bg-stone-800">
            К вопросу Q{qIdx + 2} <ArrowRight className="w-5 h-5" />
          </button>
        ) : null}
        <button onClick={submitExam}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-800 text-white px-4 py-3 font-medium hover:bg-red-900">
          <CheckCircle2 className="w-5 h-5" /> Завершить и отправить на проверку
        </button>
      </div>
    );

    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="sticky top-0 z-20 bg-stone-100 border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3">
            <button onClick={leaveExam} className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{session.title}</p>
              <p className="text-xs text-stone-500 font-mono">{session.marksTotal} marks · {totalWords} слов</p>
            </div>
            <div className={"inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-sm font-semibold " + timerCls}>
              <Timer className="w-4 h-4" /> {fmtClock(remaining)}
            </div>
            <button onClick={() => session.paused ? resumeExam() : pauseExam()}
              title={session.paused ? "Продолжить" : "Пауза"}
              className={"inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium " +
                (session.paused ? "bg-emerald-600 text-white hover:bg-emerald-700" : "border border-stone-300 bg-white hover:bg-stone-50")}>
              {session.paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span className="hidden sm:inline">{session.paused ? "Продолжить" : "Пауза"}</span>
            </button>
          </div>
          {expired && (
            <div className="bg-red-800 text-white text-xs text-center py-1.5 px-4">
              Время вышло — на реальном экзамене ответ был бы закрыт. Завершите попытку (переработка будет отмечена).
            </div>
          )}
          {session.questions.length > 1 && (
            <div className="max-w-6xl mx-auto px-4 pb-2 flex gap-1">
              {session.questions.map((qq, i) => (
                <button key={qq.id} onClick={() => { setQIdx(i); setMobTab("task"); }}
                  className={"flex-1 rounded-lg py-1.5 text-xs font-mono font-semibold flex items-center justify-center gap-1 " +
                    (i === qIdx ? "bg-red-800 text-white" : "bg-white border border-stone-300 text-stone-700")}>
                  Q{i + 1} · {qq.marks}
                  {qAnswered(qq) && <span className={"w-1.5 h-1.5 rounded-full " + (i === qIdx ? "bg-white" : "bg-emerald-600")} />}
                </button>
              ))}
            </div>
          )}
          <div className="lg:hidden max-w-6xl mx-auto px-4 pb-2 flex gap-1">
            <button onClick={() => setMobTab("task")}
              className={"flex-1 rounded-lg py-1.5 text-sm font-medium " + (mobTab === "task" ? "bg-stone-900 text-white" : "bg-white border border-stone-300")}>
              Задание
            </button>
            <button onClick={() => setMobTab("answer")}
              className={"flex-1 rounded-lg py-1.5 text-sm font-medium " + (mobTab === "answer" ? "bg-stone-900 text-white" : "bg-white border border-stone-300")}>
              Мой ответ
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-3">
          <p className="text-xs text-stone-500">
            <span className="font-semibold text-stone-700">{session.questions.length > 1 ? "Q" + (qIdx + 1) + " · " : ""}{q.title}</span>
            {" · Section " + q.section + " · " + q.marks + " marks · рекоменд. ~" + recMinutes(q) + " мин"}
          </p>
        </div>

        {session.paused ? (
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-white border border-stone-200 rounded-xl p-8 text-center max-w-md mx-auto">
              <Pause className="w-8 h-8 mx-auto text-stone-400" />
              <h3 className="font-serif text-2xl mt-3">Пауза</h3>
              <p className="text-sm text-stone-600 mt-1">
                Осталось <span className="font-mono font-semibold">{fmtClock(remaining)}</span>. Ответы сохранены.
              </p>
              <p className="text-xs text-stone-400 mt-2">
                Текст задания скрыт, чтобы пауза не превращалась в лишнее время на чтение.
              </p>
              <button onClick={resumeExam}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-3 font-medium hover:bg-emerald-700">
                <Play className="w-5 h-5" /> Продолжить
              </button>
              <button onClick={leaveExam} className="mt-2 w-full text-xs text-stone-400 hover:text-stone-700">
                Выйти и вернуться позже
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-3 pb-16 grid lg:grid-cols-2 gap-4">
            <div className={(mobTab === "task" ? "block" : "hidden") + " lg:block"}>{scenario}</div>
            <div className={(mobTab === "answer" ? "block" : "hidden") + " lg:block"}>{answerCol}</div>
          </div>
        )}
      </div>
    );
  }

  /* ---------- GRADING ---------- */
  if (view === "grading") {
    const pct = Math.round((progress.done / progress.total) * 100);
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white border border-stone-200 rounded-xl p-6 max-w-sm w-full text-center">
          {!gradeError ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-red-800 mx-auto" />
              <h3 className="font-serif text-xl mt-3">Проверка экзаменатором</h3>
              <p className="text-sm text-stone-600 mt-1">{progress.label}</p>
              <div className="mt-4 h-2 rounded-full bg-stone-200">
                <div className="h-2 rounded-full bg-red-800 transition-all" style={{ width: pct + "%" }} />
              </div>
              <p className="font-mono text-xs text-stone-400 mt-2">{progress.done} / {progress.total} шагов · не закрывайте вкладку</p>
            </>
          ) : (
            <>
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-serif text-xl mt-3">Проверка прервалась</h3>
              <p className="text-sm text-stone-600 mt-1 break-words">{gradeError}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => session && runGrading(session, answers)}
                  className="flex-1 rounded-lg bg-red-800 text-white px-3 py-2 text-sm font-medium hover:bg-red-900">Повторить</button>
                <button onClick={() => setView(session ? "exam" : "home")}
                  className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50">К ответам</button>
              </div>
              <p className="text-xs text-stone-400 mt-3">Ответы не потеряны — они сохранены в черновике.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------- RESULT / REVIEW ---------- */
  if (view === "result" && currentAttempt) {
    const a = currentAttempt;
    const t = a.totals;
    const passed = t.pct >= 50;
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
          <button onClick={() => { setView("home"); setSession(null); }}
            className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
            <ChevronLeft className="w-4 h-4" /> На главную
          </button>

          <div className="mt-3 bg-white border border-stone-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs text-stone-500">{fmtDate(a.date)}{a.kind === "exam" ? " · полный экзамен" : ""}</p>
                <h2 className="font-serif text-2xl mt-1">{a.title}</h2>
              </div>
              <div className="text-right">
                <Score value={t.total} max={t.max} big />
                <p className={"mt-1 inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold " +
                  (passed ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-800")}>
                  <Award className="w-3.5 h-3.5" /> {t.pct}% — {passed ? "проходной уровень" : "ниже 50%"}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {a.questions.map((q, qi) => {
                const pq = t.perQ[q.id] || { total: 0 };
                return (
                  <div key={q.id} className="flex items-center gap-3">
                    <span className="font-mono text-xs w-8 text-stone-500">Q{qi + 1}</span>
                    <div className="flex-1"><Bar value={pq.total || 0} max={q.marks} /></div>
                    <span className="font-mono text-xs w-16 text-right">{pq.total || 0}/{q.marks}</span>
                  </div>
                );
              })}
            </div>
            {a.timeUsedSec != null && (
              <p className="mt-3 text-xs text-stone-500 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {fmtClock(a.timeUsedSec * 1000)}{a.overtime ? " · с переработкой времени" : ""}
              </p>
            )}
          </div>

          {a.questions.map((q, qi) => {
            const qr = a.results[q.id] || { reqs: {}, skills: null };
            const pq = t.perQ[q.id] || {};
            return (
              <div key={q.id} className="mt-6">
                <div className="flex items-baseline justify-between gap-2 px-1">
                  <h3 className="font-serif text-xl">
                    {a.questions.length > 1 ? "Q" + (qi + 1) + " — " : ""}{q.title}
                  </h3>
                  <Score value={pq.total || 0} max={q.marks} />
                </div>

                {q.requirements.map(r => {
                  const res = qr.reqs[r.id] || {};
                  return (
                    <div key={r.id} className="mt-3 bg-white border border-stone-200 rounded-xl p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-semibold">Требование ({r.id}){res.improved && (
                          <span className="ml-2 text-xs font-normal text-emerald-700">улучшено · было {res.prevScore}</span>
                        )}</h4>
                        <Score value={res.score || 0} max={r.marks} />
                      </div>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">{r.text}</p>

                      {res.commentary && (
                        <p className="mt-3 text-sm leading-relaxed border-l-2 border-red-800 pl-3 text-stone-800">{res.commentary}</p>
                      )}

                      {res.pointsEarned && res.pointsEarned.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">Зачтено</p>
                          <ul className="mt-1 space-y-1">
                            {res.pointsEarned.map((p, i) => (
                              <li key={i} className="flex gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {res.missedPoints && res.missedPoints.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs uppercase tracking-widest text-red-800 font-semibold">Чего не хватило до максимума</p>
                          <ul className="mt-1 space-y-1">
                            {res.missedPoints.map((p, i) => (
                              <li key={i} className="flex gap-2 text-sm"><XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" /><span>{p}</span></li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {res.tips && res.tips.length > 0 && (
                        <div className="mt-3 bg-stone-50 rounded-lg p-3">
                          <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Как набрать больше</p>
                          <ul className="mt-1 list-disc pl-4 space-y-1 text-sm text-stone-700">
                            {res.tips.map((p, i) => <li key={i}>{p}</li>)}
                          </ul>
                        </div>
                      )}

                      {a.answers && ((a.answers[q.id] || {})[r.id] || "").trim() && (
                        <details className="mt-3">
                          <summary className="text-xs text-stone-500 cursor-pointer hover:text-stone-800">Показать мой ответ</summary>
                          <p className="mt-2 text-sm whitespace-pre-wrap bg-stone-50 rounded-lg p-3 leading-relaxed">{(a.answers[q.id] || {})[r.id]}</p>
                        </details>
                      )}

                      {res.modelAnswer && (
                        <details className="mt-3" open>
                          <summary className="text-xs uppercase tracking-widest text-stone-500 font-semibold cursor-pointer">Образцовый ответ</summary>
                          <p className="mt-2 text-sm whitespace-pre-wrap bg-emerald-50 border border-emerald-100 rounded-lg p-3 leading-relaxed">{res.modelAnswer}</p>
                        </details>
                      )}

                      {improve && improve.qid === q.id && improve.rid === r.id ? (
                        <div className="mt-3">
                          <p className="text-xs uppercase tracking-widest text-red-800 font-semibold">Доработка ответа</p>
                          <textarea value={improve.text}
                            onChange={ev => setImprove(prev => ({ ...prev, text: ev.target.value }))}
                            spellCheck={false}
                            className="mt-1 w-full min-h-40 rounded-lg border border-stone-300 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-800 resize-y" />
                          <div className="mt-2 flex gap-2">
                            <button onClick={submitImprove} disabled={improve.busy}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-800 text-white px-3 py-2 text-sm font-medium hover:bg-red-900 disabled:opacity-60">
                              {improve.busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Перепроверить
                            </button>
                            <button onClick={() => setImprove(null)} disabled={improve.busy}
                              className="rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50">Отмена</button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {!res.modelAnswer && (
                            <button onClick={() => loadModelAnswer(a, q.id, r.id)} disabled={maBusy === q.id + ":" + r.id}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs hover:bg-stone-50 disabled:opacity-60">
                              {maBusy === q.id + ":" + r.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                              Образцовый ответ
                            </button>
                          )}
                          <button onClick={() => setImprove({ qid: q.id, rid: r.id, text: ((a.answers[q.id] || {})[r.id] || ""), busy: false })}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs hover:bg-stone-50">
                            <RefreshCw className="w-3.5 h-3.5" /> Доработать и перепроверить
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {qr.skills && (
                  <div className="mt-3 bg-white border border-stone-200 rounded-xl p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-semibold">Professional skills</h4>
                      <Score value={qr.skills.score || 0} max={q.skillsMarks} />
                    </div>
                    <div className="mt-3 space-y-2">
                      {(qr.skills.breakdown || []).map((b, i) => (
                        <p key={i} className="text-sm"><span className="font-semibold">{b.skill}:</span> {b.comment}</p>
                      ))}
                    </div>
                    {qr.skills.tips && qr.skills.tips.length > 0 && (
                      <ul className="mt-3 list-disc pl-4 space-y-1 text-sm text-stone-700 bg-stone-50 rounded-lg p-3 pl-7">
                        {qr.skills.tips.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-6 flex gap-2">
            <button onClick={() => retryAttempt(a)}
              className="flex-1 rounded-xl bg-red-800 text-white px-4 py-2.5 text-sm font-medium hover:bg-red-900">
              Пройти ещё раз
            </button>
            <button onClick={() => { setView("home"); setSession(null); }}
              className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm hover:bg-stone-50">
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- HISTORY ---------- */
  if (view === "history") {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
          <button onClick={() => setView("home")} className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
            <ChevronLeft className="w-4 h-4" /> Назад
          </button>
          <h2 className="font-serif text-3xl mt-2">История попыток</h2>
          {attempts.length === 0 ? (
            <div className="mt-6 bg-white border border-stone-200 rounded-xl p-8 text-center text-stone-500">
              <BookOpen className="w-8 h-8 mx-auto text-stone-300" />
              <p className="mt-2 text-sm">Пока нет ни одной проверенной попытки. Выберите экзамен на главной и начните.</p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {attempts.map(a => (
                <div key={a.id} className="bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {fmtDate(a.date)}{a.kind === "exam" ? " · экзамен" : " · вопрос"}{a.overtime ? " · переработка" : ""}
                    </p>
                  </div>
                  <span className={"font-mono text-sm font-semibold " + ((a.totals?.pct || 0) >= 50 ? "text-emerald-700" : "text-red-800")}>
                    {a.totals?.total}/{a.totals?.max}
                  </span>
                  <button onClick={() => { setCurrentAttempt(a); setView("result"); }}
                    className="rounded-lg border border-stone-300 px-2.5 py-1.5 text-xs hover:bg-stone-50">Открыть</button>
                  <button onClick={() => deleteAttempt(a.id)} className="p-1.5 rounded-lg text-stone-400 hover:text-red-800 hover:bg-stone-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ---------- PAST PAPERS ---------- */
  if (view === "papers") {
    const bySlug = {};
    customQs.forEach(q => { if (q.paperSlug) bySlug[q.paperSlug] = q; });
    const filled = Object.keys(bySlug).length;
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
          <button onClick={() => setView("home")} className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
            <ChevronLeft className="w-4 h-4" /> Назад
          </button>
          <h2 className="font-serif text-3xl mt-2">Past papers ACCA</h2>
          <p className="text-sm text-stone-600 mt-1 leading-relaxed">
            Каталог реальных сессий. Тексты заданий принадлежат ACCA и в приложение не входят — открой вопрос
            на ACCA Practice Platform, скопируй сценарий и требования и вставь сюда. Вставленное хранится
            только в этом браузере; перенести на другое устройство можно через экспорт в настройках.
          </p>
          <p className="mt-2 font-mono text-xs text-stone-500">Заполнено: {filled} из 27</p>

          <div className="mt-5 space-y-3">
            {PAST_PAPERS.map(paper => (
              <div key={paper.id} className="bg-white border border-stone-200 rounded-xl p-4">
                <h3 className="font-serif text-lg">{paper.label}</h3>
                <div className="mt-2 divide-y divide-stone-100 border border-stone-100 rounded-lg overflow-hidden">
                  {paper.qs.map(pq => {
                    const d = paperDefaults(pq.section);
                    const q = bySlug[pq.slug];
                    const best = q ? bestForKey("q:" + q.id) : null;
                    return (
                      <div key={pq.slug} className="flex items-center gap-2 px-3 py-2">
                        <SectionTag section={pq.section} />
                        <span className="text-sm flex-1 min-w-0 truncate">{pq.name}</span>
                        <span className="font-mono text-xs text-stone-400">{d.marks}</span>
                        {q ? (
                          <>
                            {best !== null && (
                              <span className={"font-mono text-xs " + (best >= 50 ? "text-emerald-700" : "text-red-800")}>{best}%</span>
                            )}
                            <button onClick={() => openSession(descForQuestion(q))}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-800 text-white px-2.5 py-1.5 text-xs font-medium hover:bg-red-900">
                              <PenLine className="w-3.5 h-3.5" /> Начать
                            </button>
                            <button onClick={() => deleteCustom(q.id)} className="p-1 text-stone-400 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button onClick={() => { setAddPreset({ paperSlug: pq.slug, title: paper.label + " — " + pq.name, section: pq.section, ...d }); setView("add"); }}
                            className="inline-flex items-center gap-1 rounded-lg border border-stone-300 px-2.5 py-1.5 text-xs hover:bg-stone-50">
                            <Plus className="w-3.5 h-3.5" /> Вставить текст
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- SETTINGS ---------- */
  if (view === "settings") {
    return <SettingsView
      onBack={() => setView("home")}
      onChanged={() => setHasKey(!!getApiKey())}
    />;
  }

  /* ---------- GAPS ---------- */
  if (view === "gaps") {
    const items = [];
    attempts.forEach(at => {
      (at.questions || []).forEach(qq => {
        (qq.requirements || []).forEach(r => {
          const res = (((at.results || {})[qq.id] || {}).reqs || {})[r.id];
          ((res && res.missedPoints) || []).forEach((p, i) => items.push({
            gid: at.id + ":" + qq.id + ":" + r.id + ":" + i,
            text: p, src: qq.title + " · (" + r.id + ")"
          }));
        });
      });
    });
    const open = items.filter(it => !gapsDone[it.gid]);
    const closed = items.filter(it => gapsDone[it.gid]);
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
          <button onClick={() => setView("home")} className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
            <ChevronLeft className="w-4 h-4" /> Назад
          </button>
          <h2 className="font-serif text-3xl mt-2">Мои пробелы</h2>
          <p className="text-sm text-stone-600 mt-1">
            Все пункты «чего не хватило до максимума» из проверенных попыток — рабочий список для повторения. Отмечай то, что закрыла.
          </p>
          {items.length === 0 ? (
            <div className="mt-6 bg-white border border-stone-200 rounded-xl p-8 text-center text-stone-500">
              <ListChecks className="w-8 h-8 mx-auto text-stone-300" />
              <p className="mt-2 text-sm">Список появится после первой проверенной попытки.</p>
            </div>
          ) : (
            <>
              <p className="mt-4 font-mono text-xs text-stone-500">Открыто: {open.length} · закрыто: {closed.length}</p>
              <div className="mt-2 space-y-2">
                {open.map(it => (
                  <button key={it.gid} onClick={() => toggleGap(it.gid)}
                    className="w-full text-left bg-white border border-stone-200 rounded-xl p-3 flex gap-2.5 hover:border-stone-400">
                    <span className="w-4 h-4 mt-0.5 rounded border border-stone-300 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm leading-snug">{it.text}</span>
                      <span className="block text-xs text-stone-400 mt-0.5">{it.src}</span>
                    </span>
                  </button>
                ))}
              </div>
              {closed.length > 0 && (
                <details className="mt-4">
                  <summary className="text-sm text-stone-500 cursor-pointer">Закрытые ({closed.length})</summary>
                  <div className="mt-2 space-y-2">
                    {closed.map(it => (
                      <button key={it.gid} onClick={() => toggleGap(it.gid)}
                        className="w-full text-left bg-white border border-stone-200 rounded-xl p-3 flex gap-2.5 opacity-60 hover:opacity-100">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-sm leading-snug line-through">{it.text}</span>
                          <span className="block text-xs text-stone-400 mt-0.5">{it.src}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </details>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------- ADD CUSTOM QUESTION ---------- */
  if (view === "add") {
    return <AddQuestion
      preset={addPreset}
      onBack={() => { const p = addPreset; setAddPreset(null); setView(p ? "papers" : "home"); }}
      onSave={async (q) => {
        const list = [...customQs, q];
        setCustomQs(list);
        await sSet(K.custom, list);
        const p = addPreset; setAddPreset(null);
        setView(p ? "papers" : "home");
      }}
    />;
  }

  return null;
}

/* ---------------- add-question view ---------------- */

function AddQuestion({ onBack, onSave, preset }) {
  const [title, setTitle] = useState(preset ? preset.title : "");
  const [section, setSection] = useState(preset ? preset.section : "B");
  const [scenario, setScenario] = useState("");
  const [reqs, setReqs] = useState(preset ? preset.reqs.map(m => ({ text: "", marks: m })) : [{ text: "", marks: 10 }, { text: "", marks: 10 }]);
  const [skillsMarks, setSkillsMarks] = useState(preset ? preset.skillsMarks : 5);
  const [timeMin, setTimeMin] = useState(preset ? String(preset.time) : "");
  const [err, setErr] = useState("");
  const [genTopic, setGenTopic] = useState(GEN_TOPICS[0]);
  const [genBusy, setGenBusy] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [pdfFrom, setPdfFrom] = useState("");
  const [pdfTo, setPdfTo] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfMsg, setPdfMsg] = useState("");
  const [pdfPreview, setPdfPreview] = useState("");

  const openPdf = async (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (!f) return;
    setPdfBusy(true); setPdfMsg("");
    try {
      const buf = await f.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: buf }).promise;
      setPdfDoc(doc); setPdfName(f.name);
      setPdfFrom("1"); setPdfTo(String(Math.min(4, doc.numPages)));
      setPdfMsg("Файл открыт локально: страниц " + doc.numPages + ". Укажите диапазон со сценарием.");
    } catch (e) {
      setPdfMsg("Не удалось прочитать PDF: " + ((e && e.message) || e));
    }
    setPdfBusy(false);
  };

  const grabPages = async (target) => {
    if (!pdfDoc) return;
    const a = Math.max(1, Number(pdfFrom) || 1);
    const b = Math.min(pdfDoc.numPages, Number(pdfTo) || a);
    if (b < a) { setPdfMsg("Конечная страница меньше начальной."); return; }
    if (b - a > 24) { setPdfMsg("Слишком большой диапазон — не более 25 страниц за раз."); return; }
    setPdfBusy(true); setPdfMsg("");
    try {
      let out = "";
      for (let n = a; n <= b; n++) {
        const page = await pdfDoc.getPage(n);
        const tc = await page.getTextContent();
        let line = "";
        for (const it of tc.items) {
          line += (it.str || "");
          if (it.hasEOL) { out += line.trim() + "\n"; line = ""; }
        }
        if (line.trim()) out += line.trim() + "\n";
        out += "\n";
      }
      const text = out.replace(/\n{3,}/g, "\n\n").trim();
      if (target === "scenario") {
        setScenario(prev => (prev ? prev + "\n\n" : "") + text);
        setPdfMsg("Вставлено в сценарий, страниц: " + (b - a + 1) + ". Уберите колонтитулы и лишнее.");
      } else if (target === "preview") {
        setPdfPreview(text);
        setPdfMsg("Текст страниц показан ниже — скопируйте нужный кусок вручную.");
      } else {
        const idx = Number(target);
        setReqs(prev => prev.map((r, i) => i === idx ? { ...r, text: (r.text ? r.text + "\n" : "") + text } : r));
        setPdfMsg("Вставлено в требование (" + "abcdefgh"[idx] + "). Оставьте только формулировку требования.");
      }
    } catch (e) {
      setPdfMsg("Ошибка извлечения: " + ((e && e.message) || e));
    }
    setPdfBusy(false);
  };

  const letters = "abcdefgh";
  const techTotal = reqs.reduce((s, r) => s + (Number(r.marks) || 0), 0);
  const total = techTotal + (Number(skillsMarks) || 0);
  const autoTime = Math.round(total * 1.95);

  const generate = async () => {
    setGenBusy(true); setErr("");
    try {
      const out = await callJson(genQuestionPrompt(genTopic));
      setTitle(String(out.title || ("AI: " + genTopic)));
      setSection("B");
      setSkillsMarks(5);
      setScenario(String(out.scenario || ""));
      const rs = (out.requirements || []).slice(0, 4)
        .map(r => ({ text: String(r.text || ""), marks: Number(r.marks) || 5 }))
        .filter(r => r.text);
      if (rs.length) setReqs(rs);
      setTimeMin("");
    } catch (e) {
      setErr("Генерация не удалась: " + ((e && e.message) || e));
    }
    setGenBusy(false);
  };

  const save = () => {
    const valid = reqs.filter(r => r.text.trim() && Number(r.marks) > 0);
    if (!title.trim() || !scenario.trim() || valid.length === 0) {
      setErr("Заполните название, сценарий и хотя бы одно требование с баллами.");
      return;
    }
    onSave({
      id: "c" + Date.now(),
      custom: true,
      paperSlug: preset ? preset.paperSlug : undefined,
      section,
      marks: total,
      skillsMarks: Number(skillsMarks) || 0,
      timeMinutes: Number(timeMin) > 0 ? Number(timeMin) : autoTime,
      title: title.trim(),
      exhibits: [{ title: "Scenario", content: scenario.trim() }],
      requirements: valid.map((r, i) => ({ id: letters[i], marks: Number(r.marks), text: r.text.trim() }))
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
          <ChevronLeft className="w-4 h-4" /> Назад
        </button>
        <h2 className="font-serif text-3xl mt-2">{preset ? preset.title : "Свой вопрос"}</h2>
        <p className="text-sm text-stone-600 mt-1">
          {preset
            ? "Откройте этот вопрос на ACCA Practice Platform, скопируйте сценарий целиком в поле ниже, затем впишите требования и баллы. Название, секция, баллы и время уже подставлены — при необходимости поправьте."
            : "Сюда удобно переносить реальные past papers из ACCA Practice Platform: вставьте сценарий и требования — платформа примет ответ на время и проверит."}
        </p>

        <div className="mt-5 space-y-4">
          <div className={"bg-white border border-stone-200 rounded-xl p-4 " + (preset ? "hidden" : "")}>
            <p className="text-xs uppercase tracking-widest text-red-800 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Сгенерировать ИИ
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Новый оригинальный вопрос Section B (25 баллов) по выбранной теме — форма ниже заполнится автоматически, останется проверить и сохранить.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {GEN_TOPICS.map(tp => (
                <button key={tp} onClick={() => setGenTopic(tp)}
                  className={"rounded-lg px-2.5 py-1.5 text-xs " + (genTopic === tp ? "bg-stone-900 text-white" : "bg-white border border-stone-300 text-stone-700")}>
                  {tp}
                </button>
              ))}
            </div>
            <button onClick={generate} disabled={genBusy}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-900 text-white px-3.5 py-2 text-sm font-medium hover:bg-stone-800 disabled:opacity-60">
              {genBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Сгенерировать вопрос
            </button>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-600">Название</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Напр.: Sept 2024 Q2 — Group audit"
                className="mt-1 w-full rounded-lg border border-stone-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-800" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <div>
                <label className="text-xs font-semibold text-stone-600">Секция</label>
                <div className="mt-1 flex gap-1">
                  {["A", "B"].map(s => (
                    <button key={s} onClick={() => { setSection(s); setSkillsMarks(s === "A" ? 10 : 5); }}
                      className={"rounded-lg px-3 py-2 text-sm " + (section === s ? "bg-stone-900 text-white" : "bg-white border border-stone-300")}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600">Prof. skills marks</label>
                <input type="number" value={skillsMarks} onChange={e => setSkillsMarks(e.target.value)}
                  className="mt-1 w-24 rounded-lg border border-stone-300 p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800" />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600">Время, мин</label>
                <input type="number" value={timeMin} onChange={e => setTimeMin(e.target.value)} placeholder={"авто: " + autoTime}
                  className="mt-1 w-28 rounded-lg border border-stone-300 p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-1.5">
              <FileUp className="w-3.5 h-3.5" /> Вставить из PDF
            </p>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Файл открывается прямо в браузере и никуда не отправляется. Порядок: сначала страницы со сценарием
              и exhibits — кнопкой «В сценарий»; затем страницу с «Required:» — кнопкой нужного требования,
              и оставьте в поле только саму формулировку. Используйте только материалы, которыми владеете.
            </p>
            <label className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50 cursor-pointer">
              <FileUp className="w-4 h-4" /> Выбрать PDF
              <input type="file" accept="application/pdf,.pdf" onChange={openPdf} className="hidden" />
            </label>
            {pdfDoc && (
              <div className="mt-3">
                <p className="font-mono text-xs text-stone-500 truncate">{pdfName} · {pdfDoc.numPages} стр.</p>
                <div className="mt-2 flex flex-wrap items-end gap-2">
                  <div>
                    <label className="text-xs text-stone-600">с</label>
                    <input type="number" value={pdfFrom} onChange={e => setPdfFrom(e.target.value)}
                      className="mt-1 w-20 rounded-lg border border-stone-300 p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600">по</label>
                    <input type="number" value={pdfTo} onChange={e => setPdfTo(e.target.value)}
                      className="mt-1 w-20 rounded-lg border border-stone-300 p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800" />
                  </div>
                  <button onClick={() => grabPages("scenario")} disabled={pdfBusy}
                    className="rounded-lg bg-stone-900 text-white px-3 py-2 text-sm hover:bg-stone-800 disabled:opacity-60">
                    {pdfBusy ? "Читаю..." : "В сценарий"}
                  </button>
                  <button onClick={() => grabPages("preview")} disabled={pdfBusy}
                    className="rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50 disabled:opacity-60">
                    Показать текстом
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-stone-500">В требование:</span>
                  {reqs.map((r, i) => (
                    <button key={i} onClick={() => grabPages(String(i))} disabled={pdfBusy}
                      className="rounded-lg border border-stone-300 px-2.5 py-1.5 text-xs font-mono hover:bg-stone-50 disabled:opacity-60">
                      ({"abcdefgh"[i]})
                    </button>
                  ))}
                </div>
              </div>
            )}
            {pdfMsg && <p className="text-xs text-stone-600 mt-2">{pdfMsg}</p>}
            {pdfPreview && (
              <div className="mt-2">
                <textarea readOnly value={pdfPreview}
                  className="w-full h-40 rounded-lg border border-stone-300 bg-stone-50 p-2 text-xs font-mono" />
                <button onClick={() => setPdfPreview("")} className="mt-1 text-xs text-stone-400 hover:text-stone-700">Скрыть</button>
              </div>
            )}
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <label className="text-xs font-semibold text-stone-600">Сценарий / exhibits (на английском)</label>
            <textarea value={scenario} onChange={e => setScenario(e.target.value)} spellCheck={false}
              placeholder="Вставьте текст задания целиком..."
              className="mt-1 w-full min-h-48 rounded-lg border border-stone-300 p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-800 resize-y" />
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-stone-600">Требования и баллы (technical marks)</p>
            {reqs.map((r, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="font-mono text-sm mt-2.5 text-stone-500">({letters[i]})</span>
                <textarea value={r.text} onChange={e => setReqs(prev => prev.map((x, j) => j === i ? { ...x, text: e.target.value } : x))}
                  placeholder="Текст требования..." spellCheck={false}
                  className="flex-1 rounded-lg border border-stone-300 p-2.5 text-sm min-h-16 focus:outline-none focus:ring-2 focus:ring-red-800 resize-y" />
                <input type="number" value={r.marks} onChange={e => setReqs(prev => prev.map((x, j) => j === i ? { ...x, marks: e.target.value } : x))}
                  className="w-16 rounded-lg border border-stone-300 p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800" />
                {reqs.length > 1 && (
                  <button onClick={() => setReqs(prev => prev.filter((_, j) => j !== i))}
                    className="p-2 text-stone-400 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
            ))}
            {reqs.length < 8 && (
              <button onClick={() => setReqs(prev => [...prev, { text: "", marks: 5 }])}
                className="inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900">
                <Plus className="w-4 h-4" /> Добавить требование
              </button>
            )}
            <p className="font-mono text-xs text-stone-500">Итого: {techTotal} technical + {Number(skillsMarks) || 0} skills = {total} marks · ~{autoTime} мин</p>
          </div>

          {err && <p className="text-sm text-red-800 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> {err}</p>}

          <button onClick={save}
            className="w-full rounded-xl bg-red-800 text-white px-4 py-3 font-medium hover:bg-red-900">
            Сохранить вопрос
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- settings view ---------------- */

function SettingsView({ onBack, onChanged }) {
  const [ioMsg, setIoMsg] = useState("");
  const doExport = () => {
    try {
      const dump = {
        v: 1, exported: new Date().toISOString(),
        custom: JSON.parse(localStorage.getItem("aaa3:custom") || "[]"),
        attempts: JSON.parse(localStorage.getItem("aaa3:attempts") || "[]"),
        gaps: JSON.parse(localStorage.getItem("aaa3:gaps") || "{}")
      };
      const blob = new Blob([JSON.stringify(dump)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "aaa-exam-studio-backup.json";
      a.click();
      URL.revokeObjectURL(a.href);
      setIoMsg("Файл выгружен. Ключ API в него не входит.");
    } catch (e) { setIoMsg("Не удалось выгрузить: " + ((e && e.message) || e)); }
  };
  const doImport = (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(String(r.result));
        const cur = JSON.parse(localStorage.getItem("aaa3:custom") || "[]");
        const seen = new Set(cur.map(q => q.id));
        const merged = cur.concat((d.custom || []).filter(q => !seen.has(q.id)));
        localStorage.setItem("aaa3:custom", JSON.stringify(merged));
        const curA = JSON.parse(localStorage.getItem("aaa3:attempts") || "[]");
        const seenA = new Set(curA.map(x => x.id));
        const mergedA = curA.concat((d.attempts || []).filter(x => !seenA.has(x.id)));
        localStorage.setItem("aaa3:attempts", JSON.stringify(mergedA));
        localStorage.setItem("aaa3:gaps", JSON.stringify(Object.assign(JSON.parse(localStorage.getItem("aaa3:gaps") || "{}"), d.gaps || {})));
        setIoMsg("Загружено: вопросов " + (d.custom || []).length + ", попыток " + (d.attempts || []).length + ". Обнови страницу.");
      } catch (e) { setIoMsg("Файл не распознан: " + ((e && e.message) || e)); }
    };
    r.readAsText(f);
  };
  const [key, setKey] = useState(getApiKey());
  const [model, setModel] = useState(apiModel());
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem(AK, key.trim());
    localStorage.setItem(AM, (model || "").trim() || DEFAULT_MODEL);
    setSaved(true);
    onChanged();
    setTimeout(() => setSaved(false), 2500);
  };
  const clearKey = () => {
    if (!window.confirm("Удалить сохранённый ключ из этого браузера?")) return;
    localStorage.removeItem(AK);
    setKey("");
    onChanged();
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900">
          <ChevronLeft className="w-4 h-4" /> Назад
        </button>
        <h2 className="font-serif text-3xl mt-2">Настройки</h2>

        <div className="mt-5 space-y-4">
          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-red-800 font-semibold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" /> API-ключ Anthropic
            </p>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Ключ создаётся в console.anthropic.com → API keys. Он хранится только в этом браузере
              (localStorage) и никуда не отправляется, кроме api.anthropic.com. Совет: сделайте отдельный
              ключ для этого сайта и поставьте на него месячный лимит расходов (Spend limit).
            </p>
            <input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="sk-ant-..."
              spellCheck={false}
              autoComplete="off"
              className="mt-2 w-full rounded-lg border border-stone-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            {getApiKey() && (
              <button onClick={clearKey} className="mt-2 text-xs text-stone-400 hover:text-red-800">
                Удалить ключ из браузера
              </button>
            )}
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Модель проверки</p>
            <input
              value={model}
              onChange={e => setModel(e.target.value)}
              spellCheck={false}
              className="mt-2 w-full rounded-lg border border-stone-300 p-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {MODEL_OPTIONS.map(m => (
                <button key={m.id} onClick={() => setModel(m.id)}
                  className={"rounded-lg px-2.5 py-1.5 text-xs text-left " + (model === m.id ? "bg-stone-900 text-white" : "bg-white border border-stone-300 text-stone-700")}>
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-2">
              Если модель устарела и API вернёт ошибку — впишите актуальное имя модели вручную (список в документации Anthropic).
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Перенос на другое устройство</p>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Вставленные past papers, история попыток и список пробелов хранятся в этом браузере.
              Выгрузите файл на одном устройстве и загрузите на другом. Ключ API в файл не попадает.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={doExport}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50">
                <Download className="w-4 h-4" /> Выгрузить файл
              </button>
              <label className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50 cursor-pointer">
                <Upload className="w-4 h-4" /> Загрузить файл
                <input type="file" accept="application/json,.json" onChange={doImport} className="hidden" />
              </label>
            </div>
            {ioMsg && <p className="text-xs text-stone-600 mt-2">{ioMsg}</p>}
          </div>

          <button onClick={save}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-800 text-white px-4 py-3 font-medium hover:bg-red-900">
            {saved ? <CheckCircle2 className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />}
            {saved ? "Сохранено" : "Сохранить"}
          </button>

          <p className="text-xs text-stone-400 leading-relaxed">
            Ответы, история попыток и черновики тоже хранятся локально в браузере этого устройства.
            Ориентир стоимости: проверка одного полного экзамена — порядка 10 запросов к модели.
          </p>
        </div>
      </div>
    </div>
  );
}
