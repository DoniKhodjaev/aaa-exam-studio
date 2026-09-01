/* ISA: общие принципы, качество, планирование и оценка рисков. */
export const ISA_PLANNING = [
  {
    num: "ISA 200", family: "ISA", title: "Overall Objectives of the Independent Auditor",
    scope: "The framework for every audit: reasonable assurance, professional scepticism and the auditor's overall objectives.",
    rule: [
      "The objective is to obtain reasonable assurance that the financial statements as a whole are free from material misstatement, whether caused by fraud or error, and to report on them.",
      "Reasonable assurance is high but not absolute: inherent limitations arise from the use of sampling and judgement, the nature of accounting estimates, and the possibility of collusion, forgery and management override.",
      "The auditor must plan and perform the audit with professional scepticism, an attitude that includes a questioning mind and a critical assessment of evidence.",
      "Professional judgement is applied throughout, and the auditor must comply with all ISAs relevant to the engagement and with relevant ethical requirements.",
      "An audit does not relieve management of its responsibility for the financial statements and for internal control; this is set out in the engagement letter and the auditor's report."
    ],
    audit: [
      "Examined as the reason an unqualified opinion is not a guarantee: candidates are often asked to respond to a client who believes the auditor 'certifies' the accounts or is responsible for detecting all fraud — this is the expectation gap.",
      "Scepticism is a professional skills mark in almost every AAA question: it means challenging a specific management assertion in the scenario, not adding a general caution."
    ],
    risks: [
      { act: "The team accepts management's explanation of an unusual movement without corroboration.", effect: "Scepticism failure: an explanation is not audit evidence until it is supported by independent documentation." },
      { act: "The audit is planned on the assumption that management is honest.", effect: "ISA 200 requires neither assuming dishonesty nor assuming honesty; past experience does not reduce the need for scepticism." },
      { act: "The firm tells the client the audit will detect all fraud.", effect: "Widens the expectation gap and creates liability exposure; reasonable assurance is not absolute assurance." }
    ],
    quiz: [
      { q: "Why can an audit provide only reasonable rather than absolute assurance?", options: ["Because auditors are not qualified to check everything", "Because of inherent limitations such as sampling, judgement, estimates and the possibility of collusion", "Because clients restrict fees", "Because ISAs are voluntary"], correct: 1, why: "The inherent limitations of an audit make absolute assurance unattainable at any reasonable cost." },
      { q: "Professional scepticism requires the auditor to:", options: ["Assume management is dishonest", "Maintain a questioning mind and critically assess audit evidence", "Verify every transaction", "Refuse all management explanations"], correct: 1, why: "Neither assuming honesty nor dishonesty; the requirement is a questioning mind and critical assessment." }
    ]
  },
  {
    num: "ISA 210", family: "ISA", title: "Agreeing the Terms of Audit Engagements",
    scope: "Preconditions for an audit and the content of the engagement letter.",
    rule: [
      "Before accepting, the auditor must establish that the preconditions are present: an acceptable financial reporting framework, and management's agreement to its responsibilities for the financial statements, internal control and providing access to information and people.",
      "The agreed terms are recorded in an engagement letter, which sets out the objective and scope, the respective responsibilities, the reporting framework, the expected form of reports, and the fact that the audit has inherent limitations.",
      "If management imposes a limitation on scope before acceptance that would lead to a disclaimer of opinion, the engagement must not be accepted unless law requires it.",
      "On recurring engagements the terms are reassessed; a new letter is issued where there has been a change in senior management, ownership, the nature of the business or the reporting framework.",
      "A request to change to a lower level of assurance must not be accepted unless there is reasonable justification."
    ],
    audit: [
      "Frequently examined alongside acceptance procedures: what to consider before taking on a new client, and what the engagement letter must cover.",
      "A request from a client to change an audit into a review shortly before a difficult opinion is a classic scenario — the motive is the point."
    ],
    risks: [
      { act: "The firm accepts an engagement where management refuses access to a subsidiary's records.", effect: "A pre-existing scope limitation leading to a disclaimer; the engagement should not have been accepted." },
      { act: "No new engagement letter is issued after the client is acquired and the reporting framework changes.", effect: "Responsibilities and scope no longer agreed in writing; a common practice-management failure in the exam." },
      { act: "The client asks to downgrade the audit to a review after the auditor raises a contentious issue.", effect: "There is no reasonable justification; agreeing would let management avoid a modified opinion." }
    ],
    quiz: [
      { q: "Which is a precondition for an audit under ISA 210?", options: ["The client pays the fee in advance", "Management acknowledges its responsibility for the financial statements, internal control and access to information", "The client has an internal audit function", "The audit committee approves the fee"], correct: 1, why: "Preconditions cover the framework used and management's acknowledgement of its responsibilities." },
      { q: "A client asks to change the engagement from an audit to a review because the auditor may modify the opinion. The firm should:", options: ["Agree, since the client pays", "Refuse, because there is no reasonable justification for the change", "Agree if the fee is reduced", "Agree and issue both reports"], correct: 1, why: "A change to avoid a modified opinion is not a reasonable justification." }
    ]
  },
  {
    num: "ISA 220", family: "ISA", title: "Quality Management for an Audit of Financial Statements",
    scope: "Quality at engagement level: the partner's responsibility, direction, supervision and review.",
    rule: [
      "The engagement partner takes overall responsibility for managing and achieving quality on the engagement and must be sufficiently and appropriately involved throughout.",
      "The partner determines that sufficient and appropriate resources — people, technology and intellectual resources — are assigned in time.",
      "The engagement team must have the competence and capabilities needed, and must comply with relevant ethical requirements, including independence.",
      "Direction, supervision and review are planned in response to the nature and circumstances of the engagement and the capabilities of team members; more experienced staff review the work of less experienced staff.",
      "Before the report is dated, the partner must be satisfied that sufficient appropriate evidence has been obtained to support the opinion, and that any engagement quality review required has been completed.",
      "Consultation on difficult or contentious matters is required, and the conclusions must be documented and implemented."
    ],
    audit: [
      "Examined as the firm-side counterpart of the technical issues: after finding a weakness in the audit work, candidates are asked what it says about the firm's quality management.",
      "Often combined with ISQM 1 and ISQM 2 in the same requirement, so distinguish engagement level (ISA 220) from firm level (ISQM 1)."
    ],
    risks: [
      { act: "The engagement partner signs the report having had almost no involvement during fieldwork.", effect: "Breaches the requirement for sufficient and appropriate involvement throughout; the partner cannot judge whether evidence supports the opinion." },
      { act: "Junior staff audit the most judgemental balances with no review by an experienced team member.", effect: "Direction and supervision failure; the risk that a material misstatement in an estimate goes undetected." },
      { act: "A contentious accounting treatment is resolved by the team without consultation.", effect: "The firm's technical resources are bypassed and the conclusion is undocumented." },
      { act: "The report is dated before the engagement quality review is complete.", effect: "Prohibited: the review must be completed before the report is dated." }
    ],
    quiz: [
      { q: "Under ISA 220 the engagement partner must:", options: ["Perform all the fieldwork personally", "Take overall responsibility for quality and be sufficiently and appropriately involved throughout", "Review only the financial statements", "Delegate quality to the EQ reviewer"], correct: 1, why: "Responsibility for quality sits with the partner and requires real involvement, not just a signature." },
      { q: "When must an engagement quality review be completed?", options: ["Within 60 days of the report", "Before the auditor's report is dated", "At the next monitoring cycle", "Only if the client requests it"], correct: 1, why: "The review must be completed before the report is dated, otherwise the opinion is issued without it." }
    ]
  },
  {
    num: "ISQM 1", family: "ISA", title: "Quality Management for Firms",
    scope: "The firm-wide system of quality management and its eight components.",
    rule: [
      "The firm must design, implement and operate a system of quality management using a risk-based approach: establish quality objectives, identify and assess quality risks, and design responses.",
      "The eight components are the firm's risk assessment process, governance and leadership, relevant ethical requirements, acceptance and continuance of client relationships, engagement performance, resources, information and communication, and the monitoring and remediation process.",
      "Responsibility for the system is assigned to the chief executive or equivalent, with day-to-day operational responsibility assigned to named individuals.",
      "Monitoring includes inspection of completed engagements; deficiencies must be evaluated for root cause and remediated, not simply logged.",
      "The individual assigned ultimate responsibility must evaluate the system at least annually and conclude whether it provides reasonable assurance that the objectives are being achieved."
    ],
    audit: [
      "The natural home for the requirement 'comment on the quality management implications' after a scenario of audit failures.",
      "Strong answers name the component that failed — acceptance and continuance, resources, ethical requirements, monitoring — rather than saying quality control is weak."
    ],
    risks: [
      { act: "The firm records the same deficiency in inspections year after year with no root cause analysis.", effect: "The monitoring and remediation component has failed: identifying deficiencies without remedying them does not discharge the requirement." },
      { act: "A client with known integrity problems is retained because the fee is large.", effect: "Acceptance and continuance failure driven by a self-interest threat at firm level." },
      { act: "Staff are assigned to specialist engagements without training or access to specialists.", effect: "Resources component failure; the engagement team lacks the competence the work requires." },
      { act: "No one is formally assigned operational responsibility for the system.", effect: "Governance and leadership failure; accountability for quality becomes diffuse." }
    ],
    quiz: [
      { q: "ISQM 1 requires the firm's system of quality management to be evaluated:", options: ["Every three years", "At least annually, by the individual with ultimate responsibility", "Only after a regulatory inspection", "At the discretion of each partner"], correct: 1, why: "An annual evaluation and a documented conclusion on the system are required." },
      { q: "Repeated identification of the same deficiency without correction is a failure of which component?", options: ["Resources", "Monitoring and remediation", "Governance and leadership", "Information and communication"], correct: 1, why: "Remediation, including root cause analysis, is part of the monitoring component." }
    ]
  },
  {
    num: "ISQM 2", family: "ISA", title: "Engagement Quality Reviews",
    scope: "When an engagement quality review is required and who may perform it.",
    rule: [
      "An engagement quality review is required for audits of listed entities, for engagements where law or regulation requires one, and for any engagement the firm determines to be higher risk under its own policies.",
      "The reviewer must be objective and sufficiently competent, with the authority and capacity to perform the review, and must not be a member of the engagement team.",
      "A cooling-off period of at least two years applies before a former engagement partner may act as the engagement quality reviewer for that client.",
      "The reviewer evaluates the significant judgements made and the conclusions reached, including the team's evaluation of independence, consultations on difficult matters, and the appropriateness of the auditor's report.",
      "The review must be completed before the auditor's report is dated, and the reviewer's work must be documented."
    ],
    audit: [
      "Usually appears as: 'explain whether an engagement quality review is required and who should perform it' after a scenario involving a listed client or a self-interest threat.",
      "Note the distinction: a review is mandatory for listed clients whatever the risk, and may be a safeguard for other clients where significant threats exist."
    ],
    risks: [
      { act: "The outgoing engagement partner becomes the engagement quality reviewer immediately after rotation.", effect: "Breaches the two-year cooling-off period and creates a self-review threat over their own prior judgements." },
      { act: "No engagement quality review is performed on a listed audit because the firm judged the engagement to be low risk.", effect: "For listed entities the review is mandatory regardless of the firm's risk assessment." },
      { act: "The reviewer signs off having read only the financial statements.", effect: "The review must evaluate significant judgements, consultations and the appropriateness of the report." }
    ],
    quiz: [
      { q: "An engagement quality review is mandatory for:", options: ["All audits", "Audits of listed entities", "Audits with fees over a threshold", "First-year audits only"], correct: 1, why: "Listed entity audits always require a review; other engagements require one where law or firm policy demands it." },
      { q: "The minimum cooling-off period before a former engagement partner may act as EQ reviewer is:", options: ["No period is required", "Two years", "Five years", "Seven years"], correct: 1, why: "At least two years must pass, to remove the self-review threat over their own earlier judgements." }
    ]
  },
  {
    num: "ISA 230", family: "ISA", title: "Audit Documentation",
    scope: "What must be documented and the standard the documentation must meet.",
    rule: [
      "Documentation must be sufficient to enable an experienced auditor with no previous connection to the engagement to understand the nature, timing and extent of procedures performed, the results and evidence obtained, and the significant matters and conclusions reached.",
      "Record who performed the work and the date, and who reviewed it and the date.",
      "Significant matters, professional judgements and discussions with management and those charged with governance must be documented, including how inconsistencies with the final conclusion were resolved.",
      "The final audit file is assembled on a timely basis, ordinarily within 60 days of the auditor's report, and retained for a minimum period, ordinarily at least five years from the report date.",
      "After assembly, documentation must not be deleted; additions must record who made them, when and why."
    ],
    audit: [
      "Examined in review-of-working-papers questions: candidates are given a file extract and asked what is missing or what further evidence is needed.",
      "The recurring point: an unsupported conclusion in the file is a documentation failure regardless of whether the conclusion happens to be right."
    ],
    risks: [
      { act: "A working paper states 'discussed with management, satisfactory' and nothing else.", effect: "Fails the experienced auditor test: no procedure, no evidence, no reasoning is recorded." },
      { act: "Evidence contradicting the final conclusion is removed from the file.", effect: "Serious breach: inconsistencies must be documented together with how they were resolved." },
      { act: "Work is not signed off as reviewed.", effect: "There is no record that supervision and review actually occurred, which also undermines ISA 220." },
      { act: "Papers are added months later with no note of the change.", effect: "Post-assembly additions must record the who, when and why." }
    ],
    quiz: [
      { q: "The 'experienced auditor' test in ISA 230 means documentation must:", options: ["Be understandable to the client", "Enable an experienced auditor with no prior connection to understand the work, results and conclusions", "Be reviewed by the regulator", "Include all client documents"], correct: 1, why: "The benchmark is an experienced auditor unconnected with the engagement." },
      { q: "The final audit file should ordinarily be assembled within:", options: ["7 days of the report", "60 days of the auditor's report", "6 months", "The next audit cycle"], correct: 1, why: "Timely assembly is ordinarily within 60 days of the auditor's report date." }
    ]
  },
  {
    num: "ISA 240", family: "ISA", title: "The Auditor's Responsibilities Relating to Fraud",
    scope: "Fraud risk, the two presumed risks, and required responses.",
    rule: [
      "The primary responsibility for preventing and detecting fraud rests with those charged with governance and management; the auditor is responsible for obtaining reasonable assurance that the statements as a whole are free from material misstatement caused by fraud or error.",
      "There is a rebuttable presumption that revenue recognition carries a fraud risk; if the presumption is rebutted the reasons must be documented.",
      "There is a non-rebuttable presumption of a risk of management override of controls in every audit.",
      "Required responses to management override: test journal entries, especially those made at or near the period end and unusual entries; review accounting estimates for bias by looking at prior year estimates retrospectively; and evaluate the business rationale for significant unusual transactions.",
      "The team must discuss where the financial statements are susceptible to fraud, and the auditor must maintain scepticism even where past experience of management has been positive.",
      "Identified or suspected fraud is communicated to the appropriate level of management, and to those charged with governance where it involves management or causes a material misstatement; the auditor also considers reporting to a regulator where law permits or requires it."
    ],
    audit: [
      "One of the most examined ISAs: expect to identify fraud risk factors in the scenario using incentive, opportunity and rationalisation, then set out specific responses.",
      "Bonus schemes tied to revenue or profit, tight covenants, dominant management and a share price under pressure are the standard incentive indicators."
    ],
    risks: [
      { act: "The team rebuts the revenue fraud presumption without documenting why.", effect: "Rebuttal is permitted but must be justified and recorded; otherwise the significant risk was simply ignored." },
      { act: "No journal entry testing is performed because the control environment is considered strong.", effect: "Management override procedures are mandatory in every audit regardless of the control assessment." },
      { act: "Estimates are accepted without a retrospective review of prior year outcomes.", effect: "The required test for management bias is missing, exactly where bias is easiest to hide." },
      { act: "A suspected fraud involving a director is reported only to the finance director.", effect: "Where management is implicated, communication must go to those charged with governance." }
    ],
    quiz: [
      { q: "Which presumption under ISA 240 cannot be rebutted?", options: ["Revenue recognition fraud risk", "Risk of management override of controls", "Risk of inventory fraud", "Risk of payroll fraud"], correct: 1, why: "Management override is a presumed risk in every audit and can never be rebutted." },
      { q: "Which procedure is a required response to the management override risk?", options: ["Attending the inventory count", "Testing journal entries and reviewing estimates for bias", "Confirming bank balances", "Circularising receivables"], correct: 1, why: "Journal testing, retrospective review of estimates and evaluating unusual transactions are the mandated responses." },
      { q: "A director's bonus depends on revenue growth and a covenant is close to breach. In fraud terms these are:", options: ["Rationalisation", "Incentive or pressure", "Opportunity", "Immaterial"], correct: 1, why: "They are incentives; opportunity would come from weak controls or a dominant individual." }
    ]
  },
  {
    num: "ISA 250", family: "ISA", title: "Consideration of Laws and Regulations",
    scope: "The auditor's responsibility for non-compliance with laws and regulations.",
    rule: [
      "For laws generally recognised to have a direct effect on material amounts and disclosures — tax and pensions legislation, for example — the auditor obtains sufficient appropriate evidence about compliance.",
      "For other laws that may have a material indirect effect, such as environmental, licensing or health and safety regulation, the auditor performs specified procedures: enquiry of management and inspection of correspondence with regulators.",
      "Identified or suspected non-compliance is discussed with management and, unless prohibited, communicated to those charged with governance; the auditor considers the effect on the financial statements and on the audit opinion.",
      "The auditor considers whether there is a duty to report non-compliance to an appropriate authority outside the entity, having regard to law and the public interest, and takes legal advice where necessary.",
      "Where non-compliance is material and not properly accounted for or disclosed, the opinion is modified; where the auditor cannot obtain sufficient evidence, this may be a scope limitation."
    ],
    audit: [
      "Examined together with money laundering and with ethical conflicts: the client wants the matter kept quiet, the auditor must weigh confidentiality against the public interest.",
      "Distinguish clearly between the two categories of law — the level of the auditor's responsibility differs."
    ],
    risks: [
      { act: "The team treats an environmental breach as outside the scope of the audit.", effect: "Indirect-effect laws still require enquiry and inspection of regulator correspondence, and the resulting fines and provisions may be material." },
      { act: "Non-compliance is discussed with the finance director who asks that it go no further.", effect: "Communication to those charged with governance is required, and the auditor must consider external reporting duties." },
      { act: "Potential fines are not assessed for provision or disclosure.", effect: "IAS 37 consequences ignored, so the financial statements may be materially misstated." }
    ],
    quiz: [
      { q: "For laws with an indirect effect on the financial statements, ISA 250 requires the auditor to:", options: ["Test compliance in detail", "Enquire of management and inspect correspondence with regulators", "Do nothing", "Report to the regulator immediately"], correct: 1, why: "The auditor's responsibility for indirect-effect laws is limited to specified procedures." },
      { q: "Non-compliance is suspected and management is implicated. The auditor should:", options: ["Resign immediately without communication", "Communicate with those charged with governance and consider reporting to an appropriate authority", "Report only in the auditor's report", "Take no action if immaterial to profit"], correct: 1, why: "Where management is involved, the matter goes to those charged with governance, with external reporting considered." }
    ]
  },
  {
    num: "ISA 260", family: "ISA", title: "Communication with Those Charged with Governance",
    scope: "What the auditor must communicate to the audit committee or board and when.",
    rule: [
      "Communicate the auditor's responsibilities, the planned scope and timing of the audit, and significant findings from the audit.",
      "Significant findings include the auditor's views on qualitative aspects of accounting practices, including policies, estimates and disclosures, significant difficulties encountered, and significant matters discussed with management.",
      "For listed entities, communicate a statement that the team has complied with ethical requirements on independence, together with the safeguards applied to any threats and the total fees analysed between audit and non-audit services.",
      "Communicate uncorrected misstatements and request their correction, and the auditor's views on significant deficiencies in internal control identified.",
      "Communication should be two-way and timely, and significant matters are communicated in writing where oral communication would not be adequate."
    ],
    audit: [
      "Recurring requirement: 'explain the matters to be communicated to those charged with governance' at the completion stage.",
      "Also the escalation route in ethical scenarios where the finance director is the source of the problem."
    ],
    risks: [
      { act: "Independence matters for a listed client are discussed only with the finance director.", effect: "For listed entities the independence statement and fee analysis go to those charged with governance." },
      { act: "Uncorrected misstatements are not communicated because management considers them immaterial.", effect: "The auditor must communicate them and request correction; the evaluation is the auditor's, not management's." },
      { act: "Significant findings are raised for the first time after the report is signed.", effect: "Communication must be timely enough for governance to act." }
    ],
    quiz: [
      { q: "For a listed client, which must be communicated to those charged with governance?", options: ["The fee for each audit team member", "A statement of compliance with independence requirements and an analysis of audit and non-audit fees", "The audit programme in full", "All immaterial errors"], correct: 1, why: "Listed entity communication includes the independence statement, threats, safeguards and fee analysis." },
      { q: "Uncorrected misstatements should be:", options: ["Ignored if management disagrees", "Communicated to those charged with governance with a request that they be corrected", "Disclosed in the auditor's report", "Recorded only in the file"], correct: 1, why: "ISA 450 and ISA 260 require communication and a request for correction." }
    ]
  },
  {
    num: "ISA 265", family: "ISA", title: "Communicating Deficiencies in Internal Control",
    scope: "Reporting control weaknesses to management and to those charged with governance.",
    rule: [
      "A deficiency exists where a control is designed, implemented or operated so that it cannot prevent or detect and correct misstatements on a timely basis, or where a necessary control is missing.",
      "A significant deficiency is one that, in the auditor's professional judgement, is of sufficient importance to merit the attention of those charged with governance.",
      "Significant deficiencies are communicated in writing to those charged with governance on a timely basis; other deficiencies of sufficient importance are communicated to management.",
      "The written communication describes the deficiency, explains its potential effects, and states that the audit was not designed to identify all deficiencies and that no opinion on internal control is expressed.",
      "Recommendations are not required by the standard but are normally given in a management letter."
    ],
    audit: [
      "Examined as a report to management: describe the deficiency, the implication and the recommendation, in three columns.",
      "The implication column is where the marks are: name the misstatement or loss the weakness allows."
    ],
    risks: [
      { act: "A deficiency reported in the prior year is repeated with no follow-up.", effect: "Suggests management is not acting and raises the assessed risk of misstatement in the current audit." },
      { act: "Recommendations are given without describing the potential effect of the deficiency.", effect: "Governance cannot prioritise; the standard requires the potential effects to be explained." },
      { act: "The letter implies an opinion on the effectiveness of internal control.", effect: "The communication must state that no such opinion is expressed and that not all deficiencies were identified." }
    ],
    quiz: [
      { q: "A significant deficiency in internal control must be communicated:", options: ["Orally to management only", "In writing to those charged with governance on a timely basis", "In the auditor's report", "To the regulator"], correct: 1, why: "Written, timely communication to those charged with governance is required for significant deficiencies." },
      { q: "The written communication must state that:", options: ["Internal control is effective", "The audit was not designed to identify all deficiencies and no opinion on internal control is given", "All deficiencies have been corrected", "Management is responsible for the audit"], correct: 1, why: "The scope caveat is a required element of the communication." }
    ]
  },
  {
    num: "ISA 300", family: "ISA", title: "Planning an Audit",
    scope: "The overall audit strategy and the detailed audit plan.",
    rule: [
      "The auditor establishes an overall audit strategy setting the scope, timing and direction of the audit, and then develops an audit plan describing the nature, timing and extent of planned procedures.",
      "Planning includes preliminary engagement activities: continuance of the client relationship, evaluation of compliance with ethical requirements including independence, and confirming the terms of the engagement.",
      "The engagement partner and other key team members are involved in planning, including the discussion among the team about susceptibility to fraud.",
      "The strategy and plan are updated and changed during the audit as necessary; the reasons for significant changes are documented.",
      "Adequate planning helps devote appropriate attention to important areas, identify and resolve problems on a timely basis, and coordinate work with component auditors and experts."
    ],
    audit: [
      "Section A of AAA is usually a planning question: identify risks of material misstatement from the scenario and design responses.",
      "Materiality, analytical review of the draft figures and the identification of significant risks all sit inside the planning requirement."
    ],
    risks: [
      { act: "Planning is treated as a form-filling exercise that repeats last year's strategy.", effect: "New risks — an acquisition, a new revenue stream, a covenant under pressure — go unidentified." },
      { act: "The engagement partner is not involved in the planning meeting.", effect: "Breaches both ISA 300 and ISA 220; the most experienced judgement is absent when risks are set." },
      { act: "The plan is not updated after a significant event during the year.", effect: "Procedures remain aimed at the wrong risks; changes and reasons must be documented." }
    ],
    quiz: [
      { q: "Which is a preliminary engagement activity under ISA 300?", options: ["Attending the inventory count", "Evaluating compliance with ethical requirements including independence", "Obtaining written representations", "Drafting the auditor's report"], correct: 1, why: "Continuance, ethics and independence, and the terms of engagement are dealt with before planning proper." },
      { q: "The audit plan differs from the overall strategy because it:", options: ["Is prepared by the client", "Describes the nature, timing and extent of the specific procedures to be performed", "Sets the fee", "Is optional for small audits"], correct: 1, why: "The strategy sets scope, timing and direction; the plan sets the detailed procedures." }
    ]
  },
  {
    num: "ISA 315", family: "ISA", title: "Identifying and Assessing the Risks of Material Misstatement",
    scope: "Understanding the entity and its control environment to identify risks.",
    rule: [
      "The auditor obtains an understanding of the entity and its environment, the applicable financial reporting framework, and the entity's system of internal control, in order to identify risks of material misstatement.",
      "Risks are assessed at the financial statement level and at the assertion level for classes of transactions, account balances and disclosures.",
      "Inherent risk is assessed by considering inherent risk factors — complexity, subjectivity, change, uncertainty and susceptibility to management bias or fraud — and where a risk lies on the spectrum of inherent risk.",
      "A significant risk is one assessed close to the upper end of the spectrum of inherent risk, or a risk that is to be treated as significant under another ISA; significant risks require specific responses and controls relating to them must be evaluated.",
      "The five components of the system of internal control are the control environment, the entity's risk assessment process, the process to monitor the system, the information system and communication, and control activities.",
      "The auditor must understand the IT environment and the general IT controls that address risks arising from the use of IT.",
      "Risk assessment procedures alone never provide sufficient appropriate evidence for an opinion."
    ],
    audit: [
      "The backbone of every Section A requirement asking for risks of material misstatement: identify the risk, explain why it is a risk with reference to the assertion, and quantify it against materiality.",
      "The strongest answers link the inherent risk factor — subjectivity in an estimate, complexity of a transaction, management bias from a bonus scheme — to the specific balance."
    ],
    risks: [
      { act: "The team lists business risks rather than risks of material misstatement.", effect: "No link to a balance, an assertion or a possible misstatement, so the answer earns few marks and the audit is aimed at nothing." },
      { act: "Prior year risk assessment is rolled forward unchanged.", effect: "Changes in the entity, especially acquisitions, new systems and new products, create new risks that go unaddressed." },
      { act: "The IT environment is not considered because the audit is fully substantive.", effect: "Understanding the IT environment and general IT controls is required regardless of the audit approach." },
      { act: "A risk is called significant but no specific response is designed.", effect: "Significant risks demand tailored procedures and evaluation of the related controls." }
    ],
    quiz: [
      { q: "A significant risk under ISA 315 is one that:", options: ["Involves a large balance", "Is assessed close to the upper end of the spectrum of inherent risk", "Relates to cash", "Requires a specialist"], correct: 1, why: "Significance is defined by position on the inherent risk spectrum, not simply by size." },
      { q: "Which is an inherent risk factor?", options: ["The size of the audit fee", "Subjectivity of an accounting estimate", "The number of staff on the team", "The client's year end date"], correct: 1, why: "Complexity, subjectivity, change, uncertainty and susceptibility to bias or fraud are the inherent risk factors." },
      { q: "Risk assessment procedures on their own:", options: ["Provide sufficient appropriate evidence for the opinion", "Never provide sufficient appropriate evidence for the opinion", "Replace substantive testing", "Are optional for recurring clients"], correct: 1, why: "They inform the plan; evidence for the opinion comes from further audit procedures." }
    ]
  },
  {
    num: "ISA 320", family: "ISA", title: "Materiality in Planning and Performing an Audit",
    scope: "Setting materiality, performance materiality and the clearly trivial threshold.",
    rule: [
      "Misstatements are material if, individually or in aggregate, they could reasonably be expected to influence the economic decisions of users taken on the basis of the financial statements.",
      "Materiality for the financial statements as a whole is set using a benchmark and a percentage: common benchmarks are profit before tax at 5 to 10 per cent, revenue at half to one per cent, and total assets at one to two per cent.",
      "The benchmark should reflect what users focus on: revenue or total assets for a loss-making or volatile entity, profit before tax for a stable profitable one.",
      "A lower specific materiality may be set for particular classes of transactions, balances or disclosures where misstatements of smaller amounts could influence users, such as directors' remuneration or related party transactions.",
      "Performance materiality is set below overall materiality to reduce to an appropriately low level the probability that uncorrected and undetected misstatements exceed materiality; it is lowered where risk is higher.",
      "Materiality is revised during the audit if the auditor becomes aware of information that would have led to a different figure initially."
    ],
    audit: [
      "Almost always required at planning: compute a range, justify the benchmark chosen with reference to the users in the scenario, and state the figure adopted.",
      "The best answers connect materiality to something specific: a covenant that breaks below the materiality figure means performance materiality for profit items should be lower."
    ],
    risks: [
      { act: "Materiality is set on profit before tax in a year when the entity is barely breaking even.", effect: "The figure becomes tiny or meaningless; a different benchmark such as revenue or assets should be used and justified." },
      { act: "Performance materiality is set equal to overall materiality.", effect: "No allowance for undetected and aggregated misstatements, so the audit is under-scoped." },
      { act: "Materiality is not revised after a major change in the draft results.", effect: "The scope of testing is calibrated to a figure that no longer reflects the entity." },
      { act: "Related party transactions are assessed against the general materiality figure.", effect: "They are material by nature; a specific lower materiality or no threshold at all should apply." }
    ],
    quiz: [
      { q: "Performance materiality is set:", options: ["Above overall materiality", "Below overall materiality to allow for undetected and aggregated misstatements", "Equal to overall materiality", "By management"], correct: 1, why: "It reduces the probability that the aggregate of uncorrected and undetected misstatements exceeds materiality." },
      { q: "An entity is loss-making this year after several profitable years. The most appropriate benchmark is likely to be:", options: ["Profit before tax", "Revenue or total assets, with the choice justified", "Directors' remuneration", "Share capital"], correct: 1, why: "A near-zero profit produces a meaningless figure; a more stable benchmark is chosen and the reasoning documented." },
      { q: "A covenant is breached by a misstatement smaller than overall materiality. The appropriate response is:", options: ["Ignore it, it is below materiality", "Consider a lower specific materiality or performance materiality for the affected items", "Raise overall materiality", "Report to the lender"], correct: 1, why: "Where smaller misstatements could influence users, a lower specific materiality is set." }
    ]
  },
  {
    num: "ISA 330", family: "ISA", title: "The Auditor's Responses to Assessed Risks",
    scope: "Designing overall responses and further audit procedures.",
    rule: [
      "Overall responses to risks at the financial statement level include assigning more experienced staff, using experts, increasing supervision, and introducing unpredictability into the procedures performed.",
      "Further audit procedures at the assertion level comprise tests of controls and substantive procedures; their nature, timing and extent respond to the assessed risk.",
      "Tests of controls are required where the auditor intends to rely on controls, or where substantive procedures alone cannot provide sufficient appropriate evidence, as in highly automated processing.",
      "Irrespective of the assessed risk, substantive procedures must be performed for each material class of transactions, balance and disclosure.",
      "For a significant risk, substantive procedures must be responsive to that risk, and if the approach is substantive only, tests of detail are required rather than analytical procedures alone.",
      "Where evidence is obtained at an interim date, the auditor covers the remaining period."
    ],
    audit: [
      "Paired with ISA 315 in the classic two-column requirement: risk on the left, response on the right.",
      "A response must be a procedure the team can actually perform — 'review the estimate' scores nothing, 'obtain the discounted cash flow, recalculate it and compare the growth rate with the last three years of actual sales' scores."
    ],
    risks: [
      { act: "The team relies on controls without testing them.", effect: "Reliance requires tests of controls; otherwise the reduced substantive testing leaves a gap in evidence." },
      { act: "Only analytical procedures are used to address a significant risk.", effect: "For significant risks tested substantively, tests of detail are required." },
      { act: "No substantive procedures are performed on a material balance because controls are strong.", effect: "Substantive procedures on material items are mandatory regardless of the control assessment." },
      { act: "Interim testing is not followed by procedures covering the remaining period.", effect: "The period between the interim date and the year end is left unaudited." }
    ],
    quiz: [
      { q: "When must tests of controls be performed?", options: ["On every audit", "When the auditor intends to rely on controls or when substantive procedures alone are insufficient", "Only for listed clients", "Only at the interim stage"], correct: 1, why: "Reliance or an inability to obtain sufficient evidence substantively both require controls testing." },
      { q: "For a material balance where the control environment is assessed as strong, substantive procedures are:", options: ["Not required", "Still required", "Replaced by enquiry", "Performed only if the client agrees"], correct: 1, why: "ISA 330 requires substantive procedures for each material class of transactions, balance and disclosure irrespective of assessed risk." }
    ]
  },
  {
    num: "ISA 402", family: "ISA", title: "Considerations Relating to Entities Using a Service Organisation",
    scope: "Auditing an entity that outsources part of its processing.",
    rule: [
      "The auditor obtains an understanding of how the entity uses the service organisation, including the nature and materiality of the transactions processed and the effect on the entity's internal control.",
      "Where sufficient understanding cannot be obtained from the entity, the auditor obtains it from a type 1 or type 2 report from the service auditor, contacts the service organisation, visits it, or uses another auditor to perform procedures.",
      "A type 1 report covers the description and design of controls at a point in time; a type 2 report also covers their operating effectiveness over a period and can support reliance.",
      "When using a service auditor's report, the user auditor evaluates the service auditor's competence and independence and the adequacy of the standards under which the report was issued.",
      "Complementary user entity controls identified in the report must be tested at the entity itself."
    ],
    audit: [
      "Appears wherever the scenario mentions outsourced payroll, an offsite data centre, an investment custodian or a cloud accounting provider.",
      "The examinable point is that outsourcing does not outsource the auditor's responsibility for evidence."
    ],
    risks: [
      { act: "The team accepts a type 1 report as evidence that controls operated effectively all year.", effect: "A type 1 report addresses design at a point in time only; reliance on operating effectiveness needs a type 2 report." },
      { act: "Complementary user entity controls listed in the service auditor's report are never tested.", effect: "The control framework only works if the user entity performs its part; leaving it untested breaks the chain of reliance." },
      { act: "No consideration is given to the service auditor's competence or independence.", effect: "Evidence is relied on without assessing its reliability." }
    ],
    quiz: [
      { q: "To rely on the operating effectiveness of controls at a service organisation the auditor needs:", options: ["A type 1 report", "A type 2 report covering the relevant period", "A letter from management", "Nothing, reliance is automatic"], correct: 1, why: "Only a type 2 report covers operating effectiveness over a period." },
      { q: "Complementary user entity controls must be:", options: ["Ignored", "Tested at the user entity by its auditor", "Tested by the service auditor", "Disclosed in the auditor's report"], correct: 1, why: "These are controls the user entity itself must operate for the service organisation's controls to be effective." }
    ]
  },
  {
    num: "ISA 450", family: "ISA", title: "Evaluation of Misstatements Identified during the Audit",
    scope: "Accumulating, communicating and evaluating misstatements.",
    rule: [
      "All misstatements identified during the audit are accumulated, other than those that are clearly trivial.",
      "Misstatements are communicated to the appropriate level of management on a timely basis with a request that they be corrected; if management refuses, the auditor considers the reasons and the effect on the opinion.",
      "Uncorrected misstatements, including the effect of prior period uncorrected misstatements, are evaluated individually and in aggregate against materiality.",
      "The auditor considers qualitative aspects: whether a misstatement turns a loss into a profit, affects compliance with a covenant, relates to related parties or directors' remuneration, or masks a change in earnings.",
      "Uncorrected misstatements are communicated to those charged with governance, and a written representation is requested that management believes their effect is immaterial."
    ],
    audit: [
      "The completion-stage requirement: given a schedule of unadjusted errors, decide the effect on the opinion.",
      "Marks come from aggregating correctly, testing against materiality, and then considering qualitative factors before concluding."
    ],
    risks: [
      { act: "Individually immaterial errors are dismissed without aggregation.", effect: "In total they may exceed materiality; ISA 450 requires evaluation in aggregate, including the effect of prior period uncorrected items." },
      { act: "A misstatement that turns a loss into a profit is treated as immaterial because of its size.", effect: "Qualitative factors make it material irrespective of the amount." },
      { act: "Management refuses to adjust and the auditor accepts the refusal without further consideration.", effect: "The reasons must be understood and the effect on the opinion evaluated; unadjusted material errors lead to a qualified opinion." },
      { act: "No written representation on uncorrected misstatements is obtained.", effect: "A required representation is missing from the file at completion." }
    ],
    quiz: [
      { q: "Uncorrected misstatements must be evaluated:", options: ["Individually only", "Individually and in aggregate, including the effect of prior period items", "Only if management agrees", "Only against performance materiality"], correct: 1, why: "Aggregation, including brought-forward uncorrected items, is required." },
      { q: "An error of $40,000 against materiality of $500,000 turns a small loss into a small profit. It is:", options: ["Immaterial by size, so ignore", "Material by nature and should be corrected", "Reported only to management", "Corrected next year"], correct: 1, why: "Qualitative factors, including reversing a loss into a profit, can make a small misstatement material." }
    ]
  }
];
