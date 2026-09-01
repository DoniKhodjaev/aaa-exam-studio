/* ISA: доказательства, завершение аудита, отчётность и прочие задания. */
export const ISA_EVIDENCE = [
  {
    num: "ISA 500", family: "ISA", title: "Audit Evidence",
    scope: "Sufficiency and appropriateness of evidence and the reliability hierarchy.",
    rule: [
      "The auditor designs and performs procedures to obtain sufficient appropriate audit evidence: sufficiency is the quantity, appropriateness is the quality, meaning relevance and reliability.",
      "Reliability increases where evidence is obtained from independent external sources, generated under effective internal control, obtained directly by the auditor, in documentary form, and from originals rather than copies.",
      "Information produced by the entity and used as audit evidence must itself be tested for accuracy and completeness — a system-generated report is not evidence until it has been verified.",
      "Where information from a management expert is used, the auditor evaluates the expert's competence, capabilities and objectivity, obtains an understanding of the work, and assesses its appropriateness as evidence.",
      "Procedures available are inspection, observation, external confirmation, recalculation, reperformance, analytical procedures and enquiry; enquiry alone is never sufficient."
    ],
    audit: [
      "'Describe the audit evidence you should expect to find' is a standing AAA requirement, usually worth half the marks of a Section B part.",
      "Answers must be specific: name the document, the source and what it proves — not 'obtain evidence about the valuation'."
    ],
    risks: [
      { act: "The team relies on a schedule produced by the client's system without testing its accuracy and completeness.", effect: "The evidence base is unverified; if the report is wrong, every conclusion built on it is wrong." },
      { act: "Enquiry of management is the only procedure performed over a judgemental balance.", effect: "Enquiry alone does not provide sufficient appropriate evidence and must be corroborated." },
      { act: "A valuation from the client's own valuer is accepted with no assessment of competence or objectivity.", effect: "A management expert's work needs evaluation before it can support the audit conclusion." },
      { act: "Photocopies of contracts are filed without inspecting originals where authenticity matters.", effect: "Copies are less reliable and can be altered; originals should be inspected where the risk warrants." }
    ],
    quiz: [
      { q: "Which evidence is most reliable?", options: ["Oral explanation from the finance director", "A confirmation received directly by the auditor from the entity's bank", "A photocopy of an invoice supplied by the client", "A spreadsheet prepared by the client"], correct: 1, why: "Externally sourced evidence obtained directly by the auditor sits at the top of the reliability hierarchy." },
      { q: "A system-generated aged receivables report is used to select a sample. The auditor must first:", options: ["Nothing, system reports are reliable", "Test the accuracy and completeness of the report", "Ask management to confirm it", "Recalculate the whole ledger"], correct: 1, why: "Information produced by the entity must be tested before it is relied on as evidence." }
    ]
  },
  {
    num: "ISA 501", family: "ISA", title: "Audit Evidence — Specific Considerations for Selected Items",
    scope: "Inventory, litigation and claims, and segment information.",
    rule: [
      "Where inventory is material, the auditor attends the physical count unless impracticable, to evaluate management's instructions, observe the count, inspect the inventory and perform test counts.",
      "If attendance is impracticable, alternative procedures are performed; if that is not possible either, the opinion is modified for a scope limitation.",
      "Where inventory is held by a third party, the auditor obtains confirmation directly from the custodian of quantities and condition, or performs inspection or other appropriate procedures.",
      "For litigation and claims, the auditor enquires of management, reviews minutes and legal expense accounts, and, where a risk of material misstatement exists, seeks direct communication with the entity's external legal counsel.",
      "If management refuses permission to contact the lawyers and alternative procedures do not suffice, the opinion is modified.",
      "Where segment information is material, the auditor obtains an understanding of the methods used and tests their application, and performs analytical procedures."
    ],
    audit: [
      "The go-to standard whenever the scenario mentions inventory stored at a third-party warehouse, a count the auditor could not attend, or an ongoing legal claim.",
      "Note the escalation: no attendance and no alternatives means a modified opinion, which is often the answer the requirement is driving at."
    ],
    risks: [
      { act: "Inventory at a third-party warehouse is accepted on the strength of the client's own records.", effect: "Existence is unverified; direct confirmation from the custodian or attendance is required." },
      { act: "The team does not attend a count at a location deemed low value in aggregate but material in total.", effect: "Materiality is assessed on the total inventory balance, not location by location." },
      { act: "Management refuses to allow contact with the lawyers and the team simply obtains a written representation instead.", effect: "A representation does not replace external evidence; unresolved, this is a scope limitation." },
      { act: "No test counts are performed; the team only observes.", effect: "Observation without test counts in both directions leaves both existence and completeness untested." }
    ],
    quiz: [
      { q: "Inventory is material and held at a third-party warehouse. The primary procedure is:", options: ["Review the client's inventory listing", "Obtain confirmation directly from the third party as to quantities and condition", "Obtain a written representation", "Recalculate the valuation"], correct: 1, why: "Direct confirmation from the custodian, or attendance, addresses the existence assertion." },
      { q: "Management refuses to permit the auditor to contact the entity's lawyers about a material claim. The likely consequence is:", options: ["Rely on management's representation", "A scope limitation leading to a modified opinion", "Withdraw immediately without a report", "No effect if the claim is disclosed"], correct: 1, why: "Where alternative procedures cannot substitute, the inability to obtain evidence modifies the opinion." }
    ]
  },
  {
    num: "ISA 505", family: "ISA", title: "External Confirmations",
    scope: "Obtaining evidence directly from third parties.",
    rule: [
      "The auditor maintains control over the confirmation process: determining the information to be confirmed, selecting the party, designing the request including the return address, and sending and following up the requests.",
      "Positive confirmations ask the respondent to reply in all cases; negative confirmations ask for a reply only if the respondent disagrees and provide less persuasive evidence.",
      "Negative confirmations may be used only where the risk is low, the population is large and homogeneous, exception rates are expected to be very low and the respondents are likely to consider the request.",
      "If management refuses to allow a confirmation, the auditor enquires into the reasons, considers the implications for risk assessment including fraud risk, and performs alternative procedures; an unreasonable refusal is communicated to those charged with governance and may be a scope limitation.",
      "Non-responses require alternative procedures, such as testing subsequent cash receipts, matching invoices and dispatch documents."
    ],
    audit: [
      "Examined for receivables and bank balances, and as an ethics-adjacent scenario where management blocks a confirmation to a related party.",
      "The heart of the standard is control: any confirmation routed through the client is compromised evidence."
    ],
    risks: [
      { act: "Confirmation requests are given to the client to post, and replies come back via the client.", effect: "Control over the process is lost; the evidence is no longer independent and could be fabricated." },
      { act: "Negative confirmations are used for a high-risk receivables population.", effect: "Negative confirmations provide weak evidence and are only appropriate for low-risk, homogeneous populations." },
      { act: "Non-responses are simply written off as satisfactory.", effect: "Alternative procedures are required; a non-response is not evidence of anything." },
      { act: "Management's refusal to circularise a large related party balance is accepted without enquiry.", effect: "The refusal itself is a fraud risk indicator and must be reported to those charged with governance if unreasonable." }
    ],
    quiz: [
      { q: "Management refuses to allow a confirmation of a material receivable. The auditor should first:", options: ["Accept the refusal", "Enquire into the reasons and consider the implications for the risk assessment, including fraud risk", "Modify the opinion immediately", "Confirm the balance with a different customer"], correct: 1, why: "The reasons matter: an unreasonable refusal is itself a risk indicator, and alternative procedures follow." },
      { q: "Negative confirmations are appropriate when:", options: ["Risk is high and balances are large", "Risk is low, the population is large and homogeneous, and exception rates are expected to be very low", "Management prefers them", "The client is listed"], correct: 1, why: "They provide weaker evidence, so their use is restricted to low-risk populations." }
    ]
  },
  {
    num: "ISA 510", family: "ISA", title: "Initial Audit Engagements — Opening Balances",
    scope: "Auditing the first year of an engagement.",
    rule: [
      "The auditor obtains sufficient appropriate evidence that opening balances do not contain misstatements that materially affect the current period, and that accounting policies have been consistently applied.",
      "Procedures include reading the predecessor auditor's report and, with permission, reviewing their working papers, and performing current period procedures that also provide evidence about opening balances.",
      "If the opening balances contain a material misstatement that is not properly accounted for, or policies were changed without proper accounting, the opinion is qualified or adverse.",
      "If sufficient appropriate evidence about opening balances cannot be obtained, the opinion is qualified or a disclaimer is issued in respect of the results of operations and cash flows, while the opinion on the financial position may be unmodified.",
      "If the prior period report was modified and the matter remains unresolved, the current opinion is also modified."
    ],
    audit: [
      "Examined in tendering and new-client scenarios: the extra risk of a first-year audit is a standard planning point.",
      "The distinction that earns marks: a scope limitation over opening balances affects the profit and cash flow statements, not necessarily the statement of financial position."
    ],
    risks: [
      { act: "Opening balances are accepted because the prior auditor was a reputable firm.", effect: "Reputation is not evidence; procedures over opening balances are still required." },
      { act: "Access to predecessor working papers is refused and no alternative procedures are performed.", effect: "The evidence gap remains and the opinion may need to be modified." },
      { act: "Consistency of accounting policies with the prior period is not checked.", effect: "A policy change without proper accounting under IAS 8 goes undetected." }
    ],
    quiz: [
      { q: "In a first-year audit, sufficient evidence about opening inventory cannot be obtained. The likely opinion is:", options: ["Unmodified", "Qualified or disclaimer in respect of results of operations and cash flows", "Adverse on the whole statements", "Unmodified with emphasis of matter"], correct: 1, why: "Opening inventory affects profit; the position at the year end may still be verifiable." },
      { q: "Which procedure specifically addresses opening balances?", options: ["Attending the current year inventory count only", "Reviewing the predecessor auditor's working papers with permission", "Obtaining a bank confirmation", "Testing current year controls"], correct: 1, why: "Reading the prior report and reviewing the predecessor's papers are the standard procedures." }
    ]
  },
  {
    num: "ISA 520", family: "ISA", title: "Analytical Procedures",
    scope: "Analytical procedures at planning, as substantive tests, and at completion.",
    rule: [
      "Analytical procedures are used as risk assessment procedures at planning, optionally as substantive procedures, and are required near the end of the audit to form an overall conclusion.",
      "For substantive analytical procedures the auditor must evaluate the reliability of the data used, develop an expectation precise enough to identify a material misstatement, and determine the amount of difference that is acceptable without investigation.",
      "Fluctuations or relationships inconsistent with other information are investigated by enquiry of management, corroboration of the responses, and other procedures as necessary.",
      "The final analytical review considers whether the financial statements as a whole are consistent with the auditor's understanding of the entity.",
      "For a significant risk addressed substantively, analytical procedures alone are not sufficient."
    ],
    audit: [
      "Section A almost always gives draft figures and asks for risks: the ratio analysis is the route into them.",
      "Compute and interpret — receivable days, inventory days, margins, interest cover — and say what misstatement the movement could indicate."
    ],
    risks: [
      { act: "The expectation is developed from the client's own budget without assessing its reliability.", effect: "The comparison proves only that the result matches the budget, which management may have set to be met." },
      { act: "A large unexplained variance is accepted on the basis of a verbal explanation.", effect: "Responses must be corroborated with other evidence, otherwise scepticism has failed." },
      { act: "Analytical procedures alone are used for a significant risk.", effect: "Tests of detail are required for significant risks addressed substantively." },
      { act: "No final analytical review is performed at completion.", effect: "A required procedure is missing; this is the last chance to spot an inconsistency across the statements." }
    ],
    quiz: [
      { q: "Analytical procedures are mandatory:", options: ["Only at planning", "At planning as risk assessment procedures and near the end of the audit to form an overall conclusion", "Only as substantive procedures", "Only for listed entities"], correct: 1, why: "They are required at those two stages; substantive use is optional." },
      { q: "Receivable days have risen from 54 to 64 while revenue rose 20%. The most likely risk is:", options: ["Understated revenue", "Overstated receivables through recoverability problems or premature revenue recognition", "Understated inventory", "Overstated payables"], correct: 1, why: "Slower collection alongside rapid revenue growth points to recoverability or cut-off problems." }
    ]
  },
  {
    num: "ISA 530", family: "ISA", title: "Audit Sampling",
    scope: "Designing samples and evaluating results.",
    rule: [
      "When designing a sample, the auditor considers the purpose of the procedure and the characteristics of the population, and selects items in a way that gives every sampling unit a chance of selection.",
      "Sample size is affected by the assessed risk, the tolerable misstatement or rate of deviation, and the extent of other procedures; higher risk means a larger sample.",
      "Methods include random selection, systematic selection, monetary unit sampling, haphazard selection and block selection, though block selection is rarely appropriate.",
      "Deviations and misstatements found are investigated, including their nature and cause, and considered for their effect on the audit.",
      "Results are projected across the population, and the auditor evaluates whether the use of sampling has provided a reasonable basis for conclusions."
    ],
    audit: [
      "Examined mainly through review of working papers: a conclusion drawn from a sample that was too small, badly selected, or where an error found was written off as a one-off.",
      "The examinable trap is treating a misstatement as isolated: this requires a high degree of certainty and further work."
    ],
    risks: [
      { act: "An error found in the sample is dismissed as a one-off with no further work.", effect: "Anomalies require a high degree of certainty; otherwise the error must be projected across the population." },
      { act: "The sample is selected only from large items and the rest of the population is ignored.", effect: "Small balances in aggregate may be material and receive no coverage at all." },
      { act: "Sample size is kept the same as last year despite an increase in assessed risk.", effect: "Sample size must respond to risk; unchanged testing under higher risk is under-auditing." },
      { act: "Sample results are not projected across the population.", effect: "The extrapolated misstatement, which may exceed materiality, is never evaluated." }
    ],
    quiz: [
      { q: "A misstatement found in a sample may be treated as an anomaly only if:", options: ["It is small", "There is a high degree of certainty that it is not representative of the population", "Management explains it", "It occurred last year too"], correct: 1, why: "Anomaly treatment requires strong evidence that the error is not representative." },
      { q: "As assessed risk increases, sample size should:", options: ["Decrease", "Increase", "Stay the same", "Be set by the client"], correct: 1, why: "Higher risk requires more persuasive evidence and therefore larger samples." }
    ]
  },
  {
    num: "ISA 540", family: "ISA", title: "Auditing Accounting Estimates and Related Disclosures",
    scope: "Estimates, estimation uncertainty and management bias.",
    rule: [
      "The auditor's objective is to obtain sufficient appropriate evidence about whether estimates and related disclosures are reasonable in the context of the reporting framework.",
      "Risk assessment considers three inherent risk factors: estimation uncertainty, complexity, and subjectivity, together with susceptibility to management bias.",
      "There are three testing approaches, which may be used alone or in combination: obtain evidence from events occurring up to the date of the auditor's report; test how management made the estimate, including the method, assumptions and data; or develop the auditor's own point estimate or range.",
      "The auditor performs a retrospective review of prior period estimates to assess the effectiveness of management's process and to detect possible bias.",
      "The auditor evaluates whether disclosures about estimation uncertainty are adequate, and stands back to consider whether the evidence obtained is sufficient, including evidence that may contradict management's estimate.",
      "Indicators of possible management bias are evaluated in aggregate — individually each estimate may be within an acceptable range while all of them lean the same way."
    ],
    audit: [
      "Estimates dominate AAA scenarios: impairment, provisions, fair values, expected credit losses, defined benefit obligations, useful lives.",
      "Strong answers name the approach chosen and why, then set out procedures on the method, assumptions and data separately."
    ],
    risks: [
      { act: "Management's discounted cash flow is recalculated arithmetically and accepted.", effect: "Testing the arithmetic is not testing the assumptions; the growth rate and discount rate are where the misstatement lives." },
      { act: "No retrospective review of prior year estimates is performed.", effect: "A required procedure and the most effective way of detecting a pattern of bias." },
      { act: "Each estimate is judged in isolation.", effect: "Individually acceptable estimates that all lean the same way indicate bias in aggregate — the stand-back requirement addresses this." },
      { act: "Disclosure of estimation uncertainty is not assessed.", effect: "Even a reasonable estimate can produce a materially misleading picture if the uncertainty around it is not disclosed." }
    ],
    quiz: [
      { q: "Which are the inherent risk factors specific to accounting estimates?", options: ["Size, timing and location", "Estimation uncertainty, complexity and subjectivity", "Materiality, sampling and coverage", "Fraud, error and omission"], correct: 1, why: "These three factors, plus susceptibility to management bias, drive the risk assessment for estimates." },
      { q: "Which is a required procedure under ISA 540?", options: ["Developing the auditor's own estimate in every case", "A retrospective review of prior period estimates", "External confirmation of the estimate", "Obtaining a valuation from a third party"], correct: 1, why: "The retrospective review assesses management's process and helps detect bias." }
    ]
  },
  {
    num: "ISA 550", family: "ISA", title: "Related Parties",
    scope: "Identifying and auditing related party relationships and transactions.",
    rule: [
      "The auditor obtains an understanding of the entity's related party relationships and transactions sufficient to identify risks of material misstatement, including through discussion among the engagement team.",
      "The auditor enquires of management about the identity of related parties, changes from the prior period, the nature of relationships and the controls over identifying, accounting for and disclosing them.",
      "Throughout the audit the auditor remains alert for related party information in bank confirmations, minutes, contracts and significant unusual transactions.",
      "Significant transactions outside the normal course of business with related parties are treated as giving rise to significant risks; the auditor inspects the underlying contracts and evaluates the business rationale.",
      "Where management asserts that a transaction was on arm's length terms, the auditor obtains evidence to support that assertion; it cannot simply be accepted.",
      "Identified related parties not previously disclosed by management are communicated to the team and to those charged with governance."
    ],
    audit: [
      "Almost always combined with IAS 24: the accounting requirement plus the practical difficulty of detecting undisclosed parties.",
      "The examinable line is completeness: the auditor depends on management, which is precisely why scepticism is required."
    ],
    risks: [
      { act: "The team relies solely on management's list of related parties.", effect: "Completeness is the whole risk; corroboration through minutes, bank confirmations, contracts and public filings is needed." },
      { act: "An arm's length assertion is accepted without supporting evidence.", effect: "The assertion is a claim about market terms and must be substantiated." },
      { act: "A large one-off transaction with a company owned by a director is treated as a normal purchase.", effect: "Significant transactions outside the normal course of business with related parties are significant risks." },
      { act: "A newly identified related party is not communicated to those charged with governance.", effect: "Required communication; it also indicates a control deficiency in the entity's identification process." }
    ],
    quiz: [
      { q: "Why is completeness the key risk for related party transactions?", options: ["Because they are always large", "Because the auditor depends on management to identify related parties and undisclosed ones are hard to detect", "Because they are complex to calculate", "Because they are always fraudulent"], correct: 1, why: "The information originates with management, which may have an incentive to conceal such transactions." },
      { q: "Management states a related party sale was at arm's length. The auditor should:", options: ["Accept the statement", "Obtain evidence supporting the assertion", "Modify the opinion", "Disclose the doubt in the report"], correct: 1, why: "The assertion must be supported by evidence such as comparable third-party pricing." }
    ]
  },
  {
    num: "ISA 560", family: "ISA", title: "Subsequent Events",
    scope: "The auditor's responsibility for events after the reporting date.",
    rule: [
      "Up to the date of the auditor's report, the auditor performs procedures to obtain sufficient appropriate evidence that all subsequent events requiring adjustment or disclosure have been identified: enquiry of management, reading minutes and latest interim statements, and reviewing post year-end transactions.",
      "After the date of the report but before the financial statements are issued, the auditor has no obligation to perform procedures, but if a fact becomes known that would have caused amendment of the report, the auditor discusses it with management and, where the statements are amended, extends procedures and issues a new report.",
      "After the financial statements have been issued, if such a fact becomes known, the auditor discusses it with management, and if the statements are revised, reviews the steps taken to inform users and issues a new or amended report, ordinarily including an emphasis of matter or other matter paragraph.",
      "If management refuses to amend where amendment is necessary, the auditor takes action to prevent reliance on the report, including notifying those charged with governance and taking legal advice.",
      "The link to IAS 10 is direct: adjusting events change the numbers, non-adjusting events of significance require disclosure."
    ],
    audit: [
      "Completion-stage requirement, usually with a list of post year-end events to classify and respond to.",
      "The three time periods and the different responsibilities in each are the marks."
    ],
    risks: [
      { act: "No subsequent events procedures are performed between the end of fieldwork and the date of the report.", effect: "The responsibility runs up to the date of the report, not the end of fieldwork." },
      { act: "A significant post year-end event is identified and only a written representation obtained.", effect: "Representations supplement but never replace other evidence." },
      { act: "Management refuses to amend the statements for an adjusting event discovered after the report date.", effect: "The auditor must act to prevent reliance on the report, including legal advice and communication with governance." }
    ],
    quiz: [
      { q: "Between the date of the auditor's report and the date the financial statements are issued, the auditor:", options: ["Must perform ongoing procedures", "Has no obligation to perform procedures, but must act on facts that become known", "Must reissue the report", "Ceases all responsibility"], correct: 1, why: "There is no active duty to search, but known facts require discussion, and possibly amendment and a new report." },
      { q: "A major customer becomes insolvent two weeks after the year end. Under ISA 560 and IAS 10 this is:", options: ["Non-adjusting, disclose only", "Adjusting: the receivable must be written down", "Ignored", "A matter for next year's audit"], correct: 1, why: "It confirms a condition existing at the reporting date, so the statements are adjusted." }
    ]
  },
  {
    num: "ISA 570", family: "ISA", title: "Going Concern",
    scope: "Assessing the going concern basis and reporting the conclusion.",
    rule: [
      "Management assesses the entity's ability to continue as a going concern; the auditor obtains sufficient appropriate evidence about the appropriateness of the basis used and concludes whether a material uncertainty exists.",
      "The assessment period covers at least twelve months from the date of the financial statements; if management's assessment covers a shorter period, the auditor requests it be extended.",
      "Indicators include net liabilities, borrowings near maturity without realistic renewal prospects, adverse key ratios, covenant breaches, loss of a major market or supplier, and legal proceedings that could bankrupt the entity.",
      "The auditor evaluates management's cash flow forecast, testing the reliability of the underlying data and the assumptions, and considers whether facts have come to light since the forecast was prepared.",
      "Where the going concern basis is appropriate but a material uncertainty exists and disclosure is adequate, the opinion is unmodified and the report contains a separate section headed Material Uncertainty Related to Going Concern.",
      "Where disclosure of that uncertainty is inadequate, the opinion is qualified or adverse; where the going concern basis is used but is inappropriate, the opinion is adverse."
    ],
    audit: [
      "One of the highest-scoring reporting topics: candidates must decide between an unmodified opinion with a material uncertainty section, a qualified opinion, and an adverse opinion.",
      "Watch for the trigger words in the scenario: refinancing not yet agreed, covenant breach, funding withdrawn, dependence on a single customer."
    ],
    risks: [
      { act: "Management's assessment covers only nine months and the auditor accepts it.", effect: "The period must cover at least twelve months from the date of the financial statements; an extension must be requested." },
      { act: "The cash flow forecast is checked for arithmetic accuracy only.", effect: "The assumptions — sales growth, collection periods, availability of facilities — are where the uncertainty lies." },
      { act: "A material uncertainty is identified and an emphasis of matter paragraph is used.", effect: "Wrong reporting mechanism: a separate Material Uncertainty Related to Going Concern section is required." },
      { act: "The disclosure of the uncertainty is vague and the auditor issues an unmodified opinion anyway.", effect: "Inadequate disclosure requires a qualified or adverse opinion." }
    ],
    quiz: [
      { q: "A material uncertainty exists and is adequately disclosed. The auditor issues:", options: ["A qualified opinion", "An unmodified opinion with a separate Material Uncertainty Related to Going Concern section", "An adverse opinion", "A disclaimer"], correct: 1, why: "Adequate disclosure means the statements are not misstated; the uncertainty is highlighted in its own section." },
      { q: "The financial statements are prepared on a going concern basis but the entity will certainly cease trading. The opinion is:", options: ["Unmodified with an emphasis of matter", "Qualified", "Adverse", "Disclaimer"], correct: 2, why: "The wrong basis of preparation makes the statements as a whole misleading, so the opinion is adverse." },
      { q: "Management's going concern assessment must cover a period of at least:", options: ["Six months from the year end", "Twelve months from the date of the financial statements", "Two years", "Until the next audit"], correct: 1, why: "Twelve months from the date of the financial statements is the minimum period." }
    ]
  },
  {
    num: "ISA 580", family: "ISA", title: "Written Representations",
    scope: "Representations from management and their limits as evidence.",
    rule: [
      "The auditor requests written representations that management has fulfilled its responsibility for the preparation of the financial statements, for internal control, and for providing the auditor with all relevant information and access.",
      "Other representations are requested where required by other ISAs or where necessary to support other evidence about material matters involving judgement.",
      "Representations are dated as near as practicable to, but not after, the date of the auditor's report, and cover all periods referred to in the report.",
      "Written representations are audit evidence but they are not sufficient appropriate evidence on their own about any of the matters they address.",
      "If management refuses to provide a required representation, or if representations are inconsistent with other evidence, the auditor considers the effect on reliance on other representations and on the opinion; refusal of the required representations leads to a disclaimer of opinion."
    ],
    audit: [
      "Regularly examined as a wrong answer to correct: the team plans to rely on a representation where hard evidence was available.",
      "The rule to state: representations complement, they never substitute."
    ],
    risks: [
      { act: "A representation is used as the only evidence for the valuation of a material provision.", effect: "Not sufficient appropriate evidence on its own; corroboration is required." },
      { act: "Representations are obtained a month after the report is signed.", effect: "They must be dated as near as practicable to, but not after, the date of the report." },
      { act: "Management refuses to confirm it has provided all relevant information and the team proceeds regardless.", effect: "Refusal of a required representation calls into question all other representations and leads to a disclaimer." }
    ],
    quiz: [
      { q: "Written representations are:", options: ["Sufficient appropriate evidence on their own", "Audit evidence, but never sufficient on their own for the matters they cover", "Not evidence at all", "A substitute for confirmations"], correct: 1, why: "They complement other evidence and cannot stand alone." },
      { q: "Management refuses to provide the representation that it has supplied all relevant information. The auditor should:", options: ["Proceed and note it in the file", "Consider a disclaimer of opinion", "Issue an emphasis of matter", "Obtain it from those charged with governance instead"], correct: 1, why: "Refusal of a required representation is a fundamental limitation on scope." }
    ]
  },
  {
    num: "ISA 600", family: "ISA", title: "Special Considerations — Audits of Group Financial Statements",
    scope: "Group audits, component auditors and the group engagement partner's responsibility.",
    rule: [
      "The group engagement partner is responsible for the direction, supervision and review of the group audit and for the auditor's report, and this responsibility cannot be shared with a component auditor; the report does not refer to a component auditor unless required by law.",
      "The group auditor takes a risk-based approach to scoping: identifying components and determining the nature and extent of work to be performed on them by reference to the risks of material misstatement in the group financial statements.",
      "Where component auditors are involved, the group auditor evaluates their competence and capabilities, their understanding of and compliance with relevant ethical requirements including independence, and whether the group team will be able to be involved in their work.",
      "The group auditor communicates its requirements to component auditors, including component materiality, identified risks and the work required, and evaluates the sufficiency and appropriateness of the evidence obtained, reviewing relevant parts of their documentation.",
      "Consolidation procedures are audited: elimination of intra-group balances and unrealised profit, uniform accounting policies, translation of foreign components, and fair value adjustments on acquisition.",
      "If the group auditor cannot obtain sufficient appropriate evidence over a component — for example where access is restricted — this is a scope limitation and the opinion is modified."
    ],
    audit: [
      "Any scenario with an overseas subsidiary audited by a small local firm is an ISA 600 question, usually combined with IAS 21 translation and IFRS 10 uniform policies.",
      "The marks lie in what the group team must do: evaluate the component auditor, set component materiality, communicate requirements, review their work and audit the consolidation itself."
    ],
    risks: [
      { act: "The group team relies on a component auditor's opinion without evaluating competence or independence.", effect: "The group partner's sole responsibility for the group opinion means the component auditor's work must be evaluated, not assumed." },
      { act: "No component materiality is set and the component auditor uses its own statutory materiality.", effect: "The component may be audited to a threshold far above what the group audit requires, leaving misstatements undetected." },
      { act: "Consolidation adjustments and intra-group eliminations are not audited.", effect: "The group figures can be materially misstated even where every component was audited correctly." },
      { act: "Access to a component's records is restricted and the team proceeds anyway.", effect: "A scope limitation over a material component leads to a qualified opinion or disclaimer." }
    ],
    quiz: [
      { q: "Responsibility for the group audit opinion:", options: ["Is shared with component auditors", "Rests solely with the group engagement partner", "Rests with the parent's directors", "Is divided by component size"], correct: 1, why: "The group engagement partner is solely responsible and the report does not refer to component auditors unless law requires it." },
      { q: "Which is required when a component auditor performs work on a material component?", options: ["Nothing beyond receiving their opinion", "Evaluating their competence, capabilities and compliance with ethical requirements, and communicating group requirements", "Re-performing all their work", "Appointing them as joint auditors"], correct: 1, why: "Evaluation of the component auditor and two-way communication are core requirements." },
      { q: "Access to a material subsidiary's accounting records is refused by local management. The consequence is:", options: ["Rely on the local auditor's report", "A scope limitation that may lead to a qualified opinion or disclaimer", "Exclude the subsidiary from consolidation", "Issue an emphasis of matter"], correct: 1, why: "Inability to obtain sufficient appropriate evidence over a material component modifies the opinion." }
    ]
  },
  {
    num: "ISA 610", family: "ISA", title: "Using the Work of Internal Auditors",
    scope: "Reliance on internal audit and the use of direct assistance.",
    rule: [
      "The external auditor determines whether the work of the internal audit function can be used by evaluating its objectivity, in particular its organisational status and reporting lines, its level of competence, and whether it applies a systematic and disciplined approach including quality control.",
      "The external auditor decides the areas and extent of use, and must not use internal audit work in areas involving significant judgement, high assessed risk of material misstatement, or where internal audit's objectivity would be threatened.",
      "Where internal audit work is used, the external auditor performs procedures on that work, including reperformance of some of it, to confirm it is adequate.",
      "Direct assistance, where internal auditors perform procedures under the direction of the external auditor, requires evaluation of threats to objectivity and competence, and is prohibited in some jurisdictions; it may not be used for significant judgements or high risk areas.",
      "Using internal audit never reduces the external auditor's sole responsibility for the opinion."
    ],
    audit: [
      "Typical scenario: the client offers internal audit's work to reduce the fee, and candidates must explain the conditions and limits.",
      "The mark-earning point is that reliance never transfers responsibility, and that the highest-risk areas must be audited by the external team."
    ],
    risks: [
      { act: "Internal audit reports to the finance director and its work is relied on regardless.", effect: "Organisational status compromises objectivity; reliance is inappropriate." },
      { act: "Internal audit work is used for the impairment estimate.", effect: "Areas of significant judgement are excluded from reliance." },
      { act: "No reperformance of any internal audit work is carried out.", effect: "The external auditor must evaluate the adequacy of the work used, including reperforming some of it." },
      { act: "Direct assistance is used for testing the areas of highest assessed risk.", effect: "Prohibited: direct assistance may not extend to significant judgements or high risk areas." }
    ],
    quiz: [
      { q: "Internal audit reports directly to the finance director. This mainly affects:", options: ["Competence", "Objectivity through organisational status", "The systematic and disciplined approach", "Materiality"], correct: 1, why: "Reporting lines determine objectivity; reporting to the audit committee is the stronger arrangement." },
      { q: "The work of internal audit may not be used for:", options: ["Inventory counts at low-risk sites", "Areas involving significant judgement or high assessed risk", "Testing routine controls", "Verifying non-current asset additions"], correct: 1, why: "The external auditor must perform the judgemental and high-risk work itself." }
    ]
  },
  {
    num: "ISA 620", family: "ISA", title: "Using the Work of an Auditor's Expert",
    scope: "Engaging a specialist to obtain audit evidence.",
    rule: [
      "The auditor determines whether specialised expertise outside accounting and auditing is needed, for example in valuation, actuarial calculation, engineering or legal interpretation.",
      "The competence, capabilities and objectivity of the auditor's expert are evaluated, including any interests or relationships with the client that create threats.",
      "The auditor obtains a sufficient understanding of the expert's field to evaluate the adequacy of the work for audit purposes.",
      "The nature, scope and objectives of the expert's work are agreed in writing, together with the respective roles, the nature of the report and confidentiality requirements.",
      "The auditor evaluates the relevance and reasonableness of the expert's findings, including the source data, assumptions and methods used; if the work is inadequate, further procedures are performed.",
      "The auditor's report does not refer to the expert unless required by law, and any such reference does not reduce the auditor's responsibility for the opinion."
    ],
    audit: [
      "Distinguish clearly from ISA 500: a management expert works for the client, an auditor's expert works for the auditor, and both must be evaluated but for different purposes.",
      "Common in scenarios involving property valuations, pension liabilities, mineral reserves and complex financial instruments."
    ],
    risks: [
      { act: "The expert's report is filed as evidence with no assessment of the assumptions used.", effect: "The auditor must evaluate relevance and reasonableness, including source data and methods, not just accept the conclusion." },
      { act: "An expert with a long-standing consultancy relationship with the client is engaged.", effect: "Objectivity is threatened and must be evaluated before the work is used." },
      { act: "The scope of the expert's work is agreed verbally.", effect: "Written agreement on scope, objectives and roles is required, and vague scope produces evidence that does not answer the audit question." },
      { act: "The auditor's report names the expert to share responsibility for a difficult valuation.", effect: "Reference does not reduce the auditor's responsibility and is only made where law requires it." }
    ],
    quiz: [
      { q: "The difference between a management expert and an auditor's expert is:", options: ["Their qualifications", "Who engages them: management engages the former to prepare information, the auditor engages the latter to obtain evidence", "Their fee", "Whether they are named in the report"], correct: 1, why: "ISA 500 covers management experts; ISA 620 covers experts engaged by the auditor." },
      { q: "Reference to an auditor's expert in the auditor's report:", options: ["Reduces the auditor's responsibility", "Does not reduce the auditor's responsibility and is made only if required by law", "Is always required", "Replaces the basis for opinion paragraph"], correct: 1, why: "The auditor remains solely responsible for the opinion." }
    ]
  },
  {
    num: "ISA 700", family: "ISA", title: "Forming an Opinion and Reporting on Financial Statements",
    scope: "The structure and content of the unmodified auditor's report.",
    rule: [
      "The auditor forms an opinion on whether the financial statements are prepared, in all material respects, in accordance with the applicable financial reporting framework, having concluded on the sufficiency of evidence and the effect of uncorrected misstatements.",
      "The auditor also evaluates qualitative aspects: the appropriateness of policies, the reasonableness of estimates, the relevance and comparability of information, and whether the statements as a whole achieve fair presentation.",
      "The report begins with the Opinion section, followed by the Basis for Opinion, which states that the audit was conducted in accordance with ISAs and that the auditor is independent.",
      "Further elements are the going concern section where applicable, key audit matters for listed entities, other information, responsibilities of management and those charged with governance, the auditor's responsibilities, the name of the engagement partner for listed entities, signature, address and date.",
      "The report is dated no earlier than the date on which sufficient appropriate evidence has been obtained, including evidence that the financial statements have been approved by those with recognised authority."
    ],
    audit: [
      "Reporting is a guaranteed AAA topic: the requirement usually gives a completion scenario and asks for the effect on the report, with specific wording.",
      "Order matters: opinion first, then basis for opinion — a report that buries the opinion is wrong."
    ],
    risks: [
      { act: "The report is dated before the directors approve the financial statements.", effect: "The report must not predate the evidence that the statements were approved by those with recognised authority." },
      { act: "The opinion section is placed after the responsibilities sections.", effect: "The required order puts the opinion first, so users see the conclusion immediately." },
      { act: "The engagement partner is not named on a listed entity report.", effect: "Required disclosure for listed entities is missing." }
    ],
    quiz: [
      { q: "The first section of the auditor's report is:", options: ["Basis for Opinion", "Opinion", "Key Audit Matters", "Responsibilities of Management"], correct: 1, why: "The opinion comes first, followed immediately by the basis for that opinion." },
      { q: "The auditor's report must be dated:", options: ["At the year end", "No earlier than the date sufficient appropriate evidence has been obtained, including approval of the statements", "When the fee is paid", "Within 30 days of the year end"], correct: 1, why: "Dating fixes the point to which the auditor's responsibility for subsequent events runs." }
    ]
  },
  {
    num: "ISA 701", family: "ISA", title: "Communicating Key Audit Matters",
    scope: "Key audit matters in the auditor's report.",
    rule: [
      "Key audit matters are those matters that, in the auditor's professional judgement, were of most significance in the audit of the current period financial statements; they are selected from matters communicated to those charged with governance.",
      "Selection focuses on areas of higher assessed risk, significant judgements including estimates with high estimation uncertainty, and the effect of significant events or transactions during the period.",
      "Each key audit matter describes why the matter was of most significance and how it was addressed in the audit, with a reference to the related disclosure in the financial statements.",
      "Communicating key audit matters is required for audits of listed entities and where law, regulation or the auditor's own decision requires it; it does not modify the opinion.",
      "A matter giving rise to a modified opinion, or a material uncertainty related to going concern, is not presented as a key audit matter but is dealt with in its own section, with a reference from the key audit matters section."
    ],
    audit: [
      "Standard requirement: identify which matters in the scenario should be key audit matters and explain why.",
      "The point that separates good answers: key audit matters are not a way of softening or hedging an opinion, and they never substitute for a modification."
    ],
    risks: [
      { act: "A matter that should have led to a qualified opinion is instead described as a key audit matter.", effect: "Key audit matters never replace a modification; the opinion remains wrong." },
      { act: "A key audit matter describes the risk but not how the audit addressed it.", effect: "Both elements are required, plus a reference to the related disclosure." },
      { act: "The material uncertainty over going concern is presented within key audit matters.", effect: "It requires its own separate section under ISA 570, with a cross-reference." }
    ],
    quiz: [
      { q: "Key audit matters are required for:", options: ["All audits", "Audits of listed entities, and where law or the auditor decides", "Only first-year audits", "Only where the opinion is modified"], correct: 1, why: "The requirement is scoped to listed entities and to other cases required by law or chosen by the auditor." },
      { q: "A matter that gives rise to a qualified opinion should be:", options: ["Reported as a key audit matter", "Reported in the Basis for Qualified Opinion section, not as a key audit matter", "Omitted from the report", "Disclosed only to governance"], correct: 1, why: "Modification matters have their own section; key audit matters do not modify the opinion." }
    ]
  },
  {
    num: "ISA 705", family: "ISA", title: "Modifications to the Opinion",
    scope: "Qualified, adverse and disclaimer of opinion.",
    rule: [
      "The opinion is modified where the auditor concludes that the financial statements as a whole are not free from material misstatement, or where sufficient appropriate evidence cannot be obtained.",
      "Material but not pervasive misstatement gives a qualified opinion, expressed as 'except for'; material and pervasive misstatement gives an adverse opinion.",
      "Material but not pervasive inability to obtain evidence gives a qualified opinion; material and pervasive inability gives a disclaimer of opinion.",
      "Pervasive means the effects are not confined to specific elements, or if confined, represent or could represent a substantial proportion of the statements, or relate to disclosures fundamental to users' understanding.",
      "The heading changes to reflect the modification, the reasons are set out in a Basis for Qualified, Adverse or Disclaimer of Opinion section, including the quantified financial effect where practicable, and the modification is communicated to those charged with governance."
    ],
    audit: [
      "The core reporting decision in AAA: two axes — misstatement or lack of evidence, and material or pervasive — give the four outcomes.",
      "Full marks require the type of modification, the reason, the effect on the report wording, and quantification against materiality."
    ],
    risks: [
      { act: "An emphasis of matter paragraph is used to flag a material misstatement.", effect: "An emphasis of matter cannot substitute for a modification; the statements remain materially misstated." },
      { act: "A pervasive misstatement produces a qualified rather than an adverse opinion.", effect: "Understates the seriousness; where the effect is pervasive the statements as a whole are misleading." },
      { act: "The basis paragraph states the disagreement but gives no quantification.", effect: "The financial effect must be quantified where practicable so users can see the size of the issue." },
      { act: "The auditor issues a disclaimer but also includes key audit matters.", effect: "Key audit matters are not communicated when a disclaimer is issued." }
    ],
    quiz: [
      { q: "The auditor cannot obtain evidence over a single material balance that is not fundamental to the statements. The opinion is:", options: ["Adverse", "Qualified 'except for'", "Disclaimer", "Unmodified with emphasis of matter"], correct: 1, why: "Material but not pervasive inability to obtain evidence gives a qualified opinion." },
      { q: "Management refuses to consolidate a material subsidiary. The likely opinion is:", options: ["Qualified", "Adverse, because the effect is pervasive to the group statements", "Disclaimer", "Unmodified"], correct: 1, why: "Omitting a subsidiary affects the group statements as a whole, so the effect is pervasive." },
      { q: "'Pervasive' means the effect:", options: ["Exceeds materiality", "Is not confined to specific elements, or represents a substantial proportion, or is fundamental to users' understanding", "Relates to more than one year", "Involves fraud"], correct: 1, why: "The three limbs of the definition in ISA 705." }
    ]
  },
  {
    num: "ISA 706", family: "ISA", title: "Emphasis of Matter and Other Matter Paragraphs",
    scope: "Drawing attention to matters without modifying the opinion.",
    rule: [
      "An emphasis of matter paragraph refers to a matter appropriately presented or disclosed in the financial statements that, in the auditor's judgement, is of such importance that it is fundamental to users' understanding.",
      "It is used only where the matter is not a key audit matter and does not require a modification; it must state that the opinion is not modified in respect of the matter and refer to the relevant disclosure.",
      "An other matter paragraph refers to a matter not presented in the financial statements that is relevant to users' understanding of the audit, the auditor's responsibilities or the report — for example, prior period statements audited by another firm.",
      "Neither paragraph is a substitute for a modified opinion, for disclosures required by the framework, or for reporting a going concern material uncertainty.",
      "Both are placed in a separate section with an appropriate heading."
    ],
    audit: [
      "The classic wrong answer that examiners test: using an emphasis of matter to deal with a disagreement or an inadequate disclosure.",
      "Typical correct use: an uncertain outcome of exceptional litigation that is properly disclosed, or a major catastrophe after the year end that is properly disclosed."
    ],
    risks: [
      { act: "An emphasis of matter is added because the disclosure of a contingent liability is inadequate.", effect: "Inadequate disclosure is a misstatement requiring a qualified opinion, not an emphasis of matter." },
      { act: "An emphasis of matter is used for a going concern material uncertainty.", effect: "ISA 570 requires a separate Material Uncertainty Related to Going Concern section instead." },
      { act: "The paragraph omits the statement that the opinion is not modified.", effect: "Users may read the paragraph as a qualification; the disclaimer sentence is mandatory." }
    ],
    quiz: [
      { q: "An emphasis of matter paragraph may be used where:", options: ["A disclosure is missing", "A matter is properly disclosed and is fundamental to users' understanding", "The auditor disagrees with a treatment", "Evidence could not be obtained"], correct: 1, why: "It draws attention to a properly presented matter and never substitutes for a modification." },
      { q: "Which statement must an emphasis of matter paragraph include?", options: ["A quantification of the effect", "That the auditor's opinion is not modified in respect of the matter", "A recommendation to management", "A reference to key audit matters"], correct: 1, why: "The paragraph must make clear that the opinion itself is unmodified." }
    ]
  },
  {
    num: "ISA 710", family: "ISA", title: "Comparative Information",
    scope: "Corresponding figures and comparative financial statements.",
    rule: [
      "The auditor determines that the comparative information agrees with the amounts presented in the prior period and that accounting policies are consistent, or that changes have been properly accounted for and disclosed.",
      "Under the corresponding figures approach the auditor's opinion refers to the current period only; under comparative financial statements the opinion refers to each period presented.",
      "If a previously issued opinion on the prior period was modified and the matter is unresolved, the current opinion is also modified in respect of the corresponding figures.",
      "If the auditor identifies a material misstatement in prior period statements on which an unmodified opinion was issued, the matter is addressed with management and, if uncorrected, the opinion is modified.",
      "Where the prior period was audited by another firm, and the corresponding figures approach is used, an other matter paragraph may state that fact, the type of opinion and the date."
    ],
    audit: [
      "Comes up in first-year audit and restatement scenarios, usually combined with IAS 8.",
      "The examinable trap is that a prior period problem can modify the current year opinion."
    ],
    risks: [
      { act: "A material misstatement in the prior period is left uncorrected and no reference is made in the current report.", effect: "The corresponding figures are misstated, so the current opinion is modified." },
      { act: "Comparatives are restated for a policy change with no disclosure of the change.", effect: "IAS 8 disclosure missing; the comparability of the statements is undermined." },
      { act: "No reference is made to the fact that the prior period was audited by another firm.", effect: "An other matter paragraph would ordinarily state this, so users understand the scope of the current report." }
    ],
    quiz: [
      { q: "Under the corresponding figures approach, the auditor's opinion refers to:", options: ["Both periods equally", "The current period only", "The prior period only", "Neither period"], correct: 1, why: "The prior figures are presented as context; the opinion covers the current period." },
      { q: "The prior period opinion was qualified and the matter remains unresolved. The current opinion should be:", options: ["Unmodified", "Modified in respect of the corresponding figures", "An emphasis of matter", "A disclaimer"], correct: 1, why: "An unresolved prior period issue continues to affect the comparatives and therefore the current report." }
    ]
  },
  {
    num: "ISA 720", family: "ISA", title: "The Auditor's Responsibilities Relating to Other Information",
    scope: "The annual report outside the audited financial statements.",
    rule: [
      "Other information is financial and non-financial information included in the annual report other than the financial statements and the auditor's report, such as the chairman's statement, the strategic report and sustainability disclosures.",
      "The auditor reads the other information and considers whether there is a material inconsistency with the financial statements or with the auditor's knowledge obtained during the audit, remaining alert for other apparent material misstatements.",
      "Where a material inconsistency is identified, the auditor discusses it with management and requests correction; if the financial statements are wrong, the opinion may be modified, and if the other information is wrong and management refuses to correct it, the auditor describes the uncorrected material misstatement in the Other Information section of the report.",
      "The auditor's report includes an Other Information section stating management's responsibility, the auditor's responsibility, and that the auditor does not express an opinion or any form of assurance on it.",
      "If the matter is serious and uncorrected, the auditor considers reporting to those charged with governance and taking further action, including legal advice or withdrawal."
    ],
    audit: [
      "Very commonly examined because the inconsistency is easy to plant in a scenario: a chairman's statement claiming record growth while the audited figures show a decline.",
      "The mark is in the response: the auditor does not audit the other information but must act on inconsistencies."
    ],
    risks: [
      { act: "The team does not read the chairman's statement because it is not part of the audited statements.", effect: "Reading the other information is a requirement; inconsistencies must be identified and addressed." },
      { act: "A material inconsistency is identified but no action is taken beyond noting it.", effect: "The matter must be discussed with management, corrected, and if not, described in the report." },
      { act: "The Other Information section is omitted from the report.", effect: "A required element of the report is missing, including the statement that no assurance is expressed." }
    ],
    quiz: [
      { q: "The chairman's statement claims profit growth of 15% while audited profit fell. Management refuses to amend it. The auditor should:", options: ["Modify the opinion", "Describe the uncorrected material misstatement of the other information in the Other Information section", "Ignore it, as it is unaudited", "Resign"], correct: 1, why: "The financial statements are correct; the other information is not, so it is described in the Other Information section." },
      { q: "The auditor's responsibility for other information is to:", options: ["Audit it", "Read it and consider material inconsistencies with the financial statements and audit knowledge", "Provide limited assurance on it", "Prepare it"], correct: 1, why: "No opinion or assurance is expressed; the duty is to read and respond to inconsistencies." }
    ]
  },
  {
    num: "ISAE 3000", family: "ISA", title: "Assurance Engagements Other than Audits or Reviews",
    scope: "The framework for non-audit assurance engagements.",
    rule: [
      "An assurance engagement has five elements: a three party relationship of practitioner, responsible party and intended users; an appropriate subject matter; suitable criteria; sufficient appropriate evidence; and a written assurance report.",
      "Reasonable assurance engagements reduce risk to an acceptably low level and give a positive form of conclusion; limited assurance engagements reduce risk to a level that is acceptable in the circumstances and give a negative form of conclusion.",
      "Criteria must be suitable — relevant, complete, reliable, neutral and understandable — and available to intended users.",
      "The practitioner must be independent and comply with quality management requirements.",
      "Common applications examined in AAA include reporting on key performance indicators, sustainability and greenhouse gas information, internal control reports, prospective financial information under ISAE 3400, and service organisation reports under ISAE 3402."
    ],
    audit: [
      "Examined where a client asks the firm to report on something other than financial statements: the requirement is usually to explain the matters to consider before accepting and the level of assurance to be given.",
      "The five elements are the structure of a good answer, with suitability of criteria the point candidates most often miss."
    ],
    risks: [
      { act: "The firm accepts an engagement to report on KPIs with no defined measurement criteria.", effect: "Without suitable criteria there is nothing against which to evaluate the subject matter and the report is meaningless." },
      { act: "A limited assurance report is worded in the positive form.", effect: "The conclusion overstates the work performed and the assurance given." },
      { act: "Prospective financial information is reported on as if it were historical.", effect: "Forecasts are inherently uncertain; the report must state that actual results are likely to differ and give only limited assurance on the assumptions." }
    ],
    quiz: [
      { q: "A limited assurance engagement results in:", options: ["A positive form of conclusion", "A negative form of conclusion", "No conclusion", "An opinion identical to an audit"], correct: 1, why: "Limited assurance is expressed negatively: nothing has come to our attention." },
      { q: "Which is one of the five elements of an assurance engagement?", options: ["A fee agreement", "Suitable criteria", "A management letter", "An audit committee"], correct: 1, why: "Three party relationship, subject matter, suitable criteria, sufficient appropriate evidence and a written report." }
    ]
  },
  {
    num: "ISRE 2400", family: "ISA", title: "Engagements to Review Historical Financial Statements",
    scope: "Review engagements and how they differ from an audit.",
    rule: [
      "A review is a limited assurance engagement: procedures are primarily enquiry and analytical procedures, without tests of controls or extensive substantive testing.",
      "The conclusion is expressed negatively: nothing has come to the practitioner's attention that causes the practitioner to believe the financial statements are not prepared, in all material respects, in accordance with the framework.",
      "If matters come to attention suggesting a material misstatement, additional procedures are performed.",
      "The conclusion is modified where the financial statements are materially misstated or where the practitioner cannot obtain sufficient evidence for a limited assurance conclusion.",
      "ISRE 2410 covers reviews of interim financial information performed by the entity's own auditor, which is common for listed entities."
    ],
    audit: [
      "Examined where a client suggests replacing the audit with a review, or where the firm is asked to review interim figures for a listed client.",
      "The comparison table — level of assurance, procedures, form of conclusion, report wording — is what the requirement wants."
    ],
    risks: [
      { act: "A review report is issued in the positive form used for audits.", effect: "Users are misled into believing a reasonable assurance engagement was performed." },
      { act: "A matter suggesting material misstatement is identified and no further procedures are performed.", effect: "The standard requires additional procedures once such a matter comes to attention." },
      { act: "The firm agrees to convert an audit into a review to avoid a modified opinion.", effect: "Prohibited under ISA 210: there is no reasonable justification for the change." }
    ],
    quiz: [
      { q: "A review engagement provides:", options: ["Reasonable assurance", "Limited assurance with a negative conclusion", "Absolute assurance", "No assurance"], correct: 1, why: "Limited assurance, expressed in the negative form." },
      { q: "Procedures in a review consist primarily of:", options: ["Tests of controls and substantive testing", "Enquiry and analytical procedures", "External confirmations", "Attendance at inventory counts"], correct: 1, why: "The reduced scope is what distinguishes a review from an audit." }
    ]
  },
  {
    num: "ISRS 4400", family: "ISA", title: "Agreed-Upon Procedures Engagements",
    scope: "Performing procedures agreed with the client and reporting factual findings.",
    rule: [
      "The practitioner performs procedures agreed with the engaging party and reports factual findings without expressing any assurance or conclusion.",
      "The procedures and the terms are agreed in writing, including the purpose, the intended users and the fact that no assurance is expressed.",
      "The report describes the procedures performed and the findings in sufficient detail for users to draw their own conclusions.",
      "Distribution of the report is normally restricted to the parties who agreed the procedures, because others may misinterpret findings taken out of context.",
      "The practitioner must be independent where required, and must not perform an engagement designed to give the appearance of assurance where none is given."
    ],
    audit: [
      "Examined as one of the alternatives the firm can offer a client, usually alongside a review and an assurance engagement.",
      "The examinable line: an agreed-upon procedures report contains findings, not a conclusion, and users must interpret it themselves."
    ],
    risks: [
      { act: "The report includes a conclusion such as 'the balances are fairly stated'.", effect: "No assurance may be expressed; the wording turns a factual findings report into an implied opinion." },
      { act: "The report is distributed publicly.", effect: "Users who did not agree the procedures may misinterpret the findings; distribution is normally restricted." },
      { act: "Procedures are agreed only verbally.", effect: "Scope disputes follow and the engagement has no defensible boundary." }
    ],
    quiz: [
      { q: "An agreed-upon procedures engagement provides:", options: ["Reasonable assurance", "Limited assurance", "No assurance, only factual findings", "An audit opinion"], correct: 2, why: "The practitioner reports findings; users draw their own conclusions." },
      { q: "Distribution of an agreed-upon procedures report is normally:", options: ["Public", "Restricted to the parties that agreed the procedures", "To the regulator", "To shareholders"], correct: 1, why: "Findings taken out of context can mislead parties who did not agree the scope." }
    ]
  },
  {
    num: "IESBA Code", family: "ISA", title: "Code of Ethics for Professional Accountants",
    scope: "Fundamental principles, threats and safeguards, and independence for audit clients.",
    rule: [
      "The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour.",
      "Threats to compliance are self-interest, self-review, advocacy, familiarity and intimidation; the conceptual framework requires identifying threats, evaluating their significance and addressing them by eliminating the circumstances, applying safeguards, or declining or ending the engagement.",
      "For audits of public interest entities the rules are stricter: fee dependency above 15% of total fees for two consecutive years requires disclosure to those charged with governance and a pre- or post-issuance review, and continued dependence eventually requires resignation.",
      "Partner rotation for a public interest entity requires the engagement partner to rotate after seven years, with a cooling-off period of five years.",
      "Certain non-audit services are prohibited for audit clients that are public interest entities, including bookkeeping, valuation services with a material and subjective effect on the financial statements, internal audit relating to internal control over financial reporting, and management roles; contingent fee arrangements for non-assurance services are also prohibited.",
      "Gifts and hospitality may only be accepted where trivial and inconsequential; loans, close business relationships and employment with the client all create threats requiring evaluation."
    ],
    audit: [
      "Ethics appears in every AAA paper, most often as a set of four or five separate situations worth three or four marks each.",
      "The structure that earns full marks: identify the threat by name, name the principle at risk, assess significance, propose a specific safeguard, then state the escalation if the safeguard is not accepted."
    ],
    risks: [
      { act: "The audit firm values a subsidiary acquired by a listed audit client and then audits that valuation.", effect: "Self-review and management threats with no adequate safeguards for a public interest entity; the service must be declined." },
      { act: "Fees from one listed client run at 17% of total firm fees for a second year with no action.", effect: "Above the 15% threshold, disclosure to those charged with governance and a pre- or post-issuance review are required." },
      { act: "The engagement partner has served the same listed client for eight years.", effect: "Breaches the seven-year rotation limit; a familiarity threat that safeguards short of rotation cannot address." },
      { act: "An audit senior accepts a job with the client while still working on the audit.", effect: "Self-interest and familiarity threats; the individual must be removed from the team immediately and their prior work reviewed." },
      { act: "The team accepts a weekend at the client's lodge with travel paid.", effect: "Hospitality beyond trivial and inconsequential creates a familiarity and self-interest threat and must be declined." },
      { act: "The firm advertises a guaranteed reduction in audit costs.", effect: "Breaches professional behaviour: advertising must not be misleading or make exaggerated claims, and fee pressure threatens quality." }
    ],
    quiz: [
      { q: "Fees from a listed audit client have exceeded 15% of total firm fees for two consecutive years. The firm must:", options: ["Resign immediately", "Disclose to those charged with governance and arrange a pre- or post-issuance review", "Reduce the fee", "Do nothing while below 20%"], correct: 1, why: "Disclosure and an independent review are the required responses; continued dependence eventually forces resignation." },
      { q: "The engagement partner rotation limit for a public interest entity is:", options: ["Five years with two years cooling off", "Seven years with five years cooling off", "Ten years", "No limit if reviewed"], correct: 1, why: "Seven years on, five years off, for the engagement partner on a public interest entity." },
      { q: "An audit manager is offered a role as financial controller at the audit client during the audit. The firm should:", options: ["Allow them to finish the audit first", "Remove them from the engagement immediately and review the work they performed", "Do nothing until they accept", "Resign from the audit"], correct: 1, why: "Self-interest and familiarity threats arise as soon as employment is in prospect; removal and review of their work are required." }
    ]
  }
];
