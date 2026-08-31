/* Стандарты IAS — краткая суть на языке экзамена + аудиторский угол + тест. */
export const STANDARDS_IAS = [
  {
    num: "IAS 1", title: "Presentation of Financial Statements",
    scope: "The overall structure, content and presentation rules for a complete set of financial statements.",
    rule: [
      "Financial statements must present fairly and comply with all applicable IFRSs; a statement of compliance may only be made if every requirement is met.",
      "Management assesses going concern over at least twelve months from the reporting date; material uncertainties must be disclosed.",
      "Accrual basis, consistency of presentation, and comparative information for the preceding period are required.",
      "Material classes of items are presented separately; offsetting of assets and liabilities, or income and expenses, is prohibited unless a standard requires it.",
      "A complete set comprises the statement of financial position, profit or loss and other comprehensive income, changes in equity, cash flows, and notes including accounting policies."
    ],
    audit: [
      "Risk that a material uncertainty over going concern is not disclosed, which is a disclosure misstatement even when the going concern basis is appropriate.",
      "Risk that immaterial items are aggregated to hide a sensitive balance, or that income and expenses are offset to smooth results."
    ],
    quiz: [
      { q: "Management identifies a material uncertainty over going concern but concludes the going concern basis remains appropriate. Under IAS 1 the entity must:",
        options: ["Prepare the statements on a break-up basis", "Disclose the material uncertainty in the notes", "Do nothing, because the basis is unchanged", "Restate the prior year"], correct: 1,
        why: "The basis stays going concern, but IAS 1 requires disclosure of the material uncertainty so users understand the risk." },
      { q: "Which of these does IAS 1 prohibit?", options: ["Comparative information", "Offsetting assets against liabilities unless another standard requires it", "Separate presentation of material items", "Statement of changes in equity"], correct: 1,
        why: "Offsetting reduces users' ability to understand transactions and is prohibited unless specifically required or permitted." }
    ]
  },
  {
    num: "IAS 2", title: "Inventories",
    scope: "Measurement of inventory and the cost formulas permitted.",
    rule: [
      "Inventory is measured at the lower of cost and net realisable value, item by item rather than in total.",
      "Cost includes purchase price, conversion costs and other costs incurred in bringing inventory to its present location and condition; it includes a systematic allocation of fixed production overheads based on normal capacity.",
      "Selling costs, abnormal waste, storage of finished goods and administrative overheads are excluded from cost.",
      "Cost formulas permitted are FIFO and weighted average; LIFO is prohibited.",
      "Net realisable value is estimated selling price less costs to complete and costs necessary to make the sale."
    ],
    audit: [
      "Risk of overstatement where slow-moving or obsolete lines are carried above NRV; look for ageing analysis and post year-end selling prices.",
      "Existence risk where inventory is held by third parties: ISA 501 requires confirmation from the custodian or attendance at the count.",
      "Cut-off risk around the year end, and risk that overheads are absorbed at above normal capacity to inflate cost."
    ],
    quiz: [
      { q: "Inventory cost is $80,000, expected selling price $85,000, costs to complete $9,000 and selling costs $2,000. Carrying amount under IAS 2?",
        options: ["$80,000", "$85,000", "$74,000", "$76,000"], correct: 2,
        why: "NRV = 85,000 − 9,000 − 2,000 = 74,000, which is below cost, so inventory is written down to 74,000." },
      { q: "Which cost formula does IAS 2 prohibit?", options: ["FIFO", "Weighted average", "LIFO", "Specific identification"], correct: 2,
        why: "LIFO is not permitted under IFRS because it rarely reflects the actual flow of inventory." }
    ]
  },
  {
    num: "IAS 7", title: "Statement of Cash Flows",
    scope: "Classification and presentation of cash flows.",
    rule: [
      "Cash flows are classified as operating, investing or financing; the classification chosen must be applied consistently.",
      "Interest and dividends paid and received may be classified in more than one way but the policy must be consistent and disclosed.",
      "Non-cash transactions, such as acquiring an asset under a lease or issuing shares for a business combination, are excluded from the statement and disclosed separately.",
      "Cash equivalents are short-term, highly liquid investments readily convertible to known amounts of cash and subject to insignificant risk of changes in value."
    ],
    audit: [
      "Risk of misclassification to flatter operating cash flow, for example presenting an operating outflow as investing.",
      "Risk that an overdraft repayable on demand forming part of cash management is presented as financing rather than within cash and cash equivalents."
    ],
    quiz: [
      { q: "Cash paid to acquire a subsidiary, net of cash acquired, is classified as:",
        options: ["Operating", "Investing", "Financing", "Non-cash and disclosed only"], correct: 1,
        why: "Acquisitions and disposals of subsidiaries and other business units are investing activities." },
      { q: "Which is the strongest indicator that an item is a cash equivalent?", options: ["It matures within 12 months", "It is short-term, highly liquid and subject to insignificant risk of value change", "It is held in a foreign currency", "It earns interest"], correct: 1,
        why: "Cash equivalents are held to meet short-term commitments, not for investment; the risk of value change must be insignificant." }
    ]
  },
  {
    num: "IAS 8", title: "Accounting Policies, Changes in Accounting Estimates and Errors",
    scope: "How to distinguish policies, estimates and errors, and how each is accounted for.",
    rule: [
      "A change in accounting policy is applied retrospectively: comparatives are restated and opening equity adjusted, unless impracticable.",
      "A change in an accounting estimate is applied prospectively, in the current period and future periods affected.",
      "A prior period error is corrected retrospectively by restating comparatives.",
      "A policy may only be changed if required by a standard or if the change results in more relevant and reliable information; a change in estimate must be supported by new information or developments.",
      "Residual values, useful lives and depreciation methods are reviewed at least at each financial year end; a change is a change in estimate."
    ],
    audit: [
      "Risk that management presents a change of policy as a change of estimate, avoiding restatement of comparatives and hiding a trend.",
      "Risk that an error is corrected through current year profit rather than by restating the prior period.",
      "Estimates are judgemental and are a common vehicle for management bias, so ISA 540 procedures apply."
    ],
    quiz: [
      { q: "An entity extends the useful life of a machine from 5 to 8 years. This is:",
        options: ["A change of policy, restate comparatives", "A change of estimate, applied prospectively", "A prior period error", "Not accounted for until disposal"], correct: 1,
        why: "Useful life is an estimate; the change affects the current and future periods only." },
      { q: "A material error in last year's revenue is discovered. Under IAS 8 it is:",
        options: ["Adjusted through this year's profit", "Corrected retrospectively by restating the comparatives", "Disclosed only", "Ignored if immaterial to this year"], correct: 1,
        why: "Material prior period errors are corrected by restating comparative amounts and opening balances." }
    ]
  },
  {
    num: "IAS 10", title: "Events after the Reporting Period",
    scope: "Treatment of events between the reporting date and the date the statements are authorised for issue.",
    rule: [
      "Adjusting events provide evidence of conditions that existed at the reporting date; the financial statements are adjusted.",
      "Non-adjusting events arise from conditions after the reporting date; the statements are not adjusted but material items are disclosed, giving the nature of the event and an estimate of the financial effect.",
      "Dividends declared after the reporting date are not recognised as a liability at the reporting date.",
      "If management determines after the reporting date that the entity is not a going concern, the financial statements must not be prepared on a going concern basis; this is always adjusting."
    ],
    audit: [
      "ISA 560 requires procedures up to the date of the auditor's report and a response to facts discovered after it.",
      "Common exam events: settlement of a court case (adjusting), insolvency of a customer (adjusting for receivable), inventory sold below cost after the year end (adjusting for NRV), a fire or a major acquisition after the year end (non-adjusting, disclose)."
    ],
    quiz: [
      { q: "A customer owing $1.2m at the year end goes into liquidation three weeks after the reporting date. This is:",
        options: ["Non-adjusting, disclose only", "Adjusting: the receivable is written down", "Ignored", "A contingent asset"], correct: 1,
        why: "The liquidation confirms the recoverability condition that existed at the reporting date, so it is adjusting." },
      { q: "A dividend is declared two weeks after the reporting date. Under IAS 10 it is:",
        options: ["Recognised as a liability at the reporting date", "Not recognised as a liability but disclosed", "Recognised in equity at the reporting date", "Treated as an adjusting event"], correct: 1,
        why: "No present obligation existed at the reporting date, so it is disclosed rather than recognised." }
    ]
  },
  {
    num: "IAS 12", title: "Income Taxes",
    scope: "Current and deferred tax, including temporary differences.",
    rule: [
      "Deferred tax is recognised on taxable temporary differences between the carrying amount of an asset or liability and its tax base.",
      "A deferred tax asset is recognised only to the extent that future taxable profits will probably be available against which the difference can be used.",
      "Deferred tax is measured at the rates expected to apply when the asset is realised or the liability settled, based on rates enacted or substantively enacted by the reporting date.",
      "Deferred tax is never discounted.",
      "A revaluation of a non-current asset creates a taxable temporary difference and therefore a deferred tax liability, regardless of whether the entity intends to sell the asset; the tax follows the item, so it goes to other comprehensive income where the revaluation did."
    ],
    audit: [
      "Recoverability of deferred tax assets, especially where the entity is loss-making, is a judgemental area supported only by forecasts.",
      "Risk that deferred tax on revaluations, fair value uplifts on acquisition or unremitted overseas earnings is omitted.",
      "Effective tax rate reconciliation is a strong analytical procedure for spotting unrecorded tax."
    ],
    quiz: [
      { q: "A property is revalued upwards by $6m. The entity has no intention of selling it. Under IAS 12:",
        options: ["No deferred tax arises because there is no intention to sell", "A deferred tax liability arises and is recognised in OCI", "A deferred tax asset arises", "Deferred tax is discounted to present value"], correct: 1,
        why: "Intention is irrelevant; the temporary difference exists and the tax follows the revaluation into OCI." },
      { q: "A loss-making entity recognises a deferred tax asset for unused tax losses. The key requirement is:",
        options: ["The losses can be carried forward indefinitely", "Future taxable profits are probable against which the losses can be used", "The tax authority has approved the claim", "The asset is discounted"], correct: 1,
        why: "Recognition depends on probable future taxable profits; convincing evidence is needed when there is a history of losses." }
    ]
  },
  {
    num: "IAS 16", title: "Property, Plant and Equipment",
    scope: "Recognition, measurement, depreciation and derecognition of tangible non-current assets.",
    rule: [
      "Cost includes purchase price, directly attributable costs of bringing the asset to working condition, and the initial estimate of dismantling and site restoration costs.",
      "After recognition an entity chooses the cost model or the revaluation model, applied to an entire class of assets; revaluations must be kept sufficiently up to date.",
      "Revaluation gains go to other comprehensive income and a revaluation surplus; losses go to profit or loss except to the extent they reverse a previous surplus on the same asset.",
      "Significant components with different useful lives are depreciated separately; the depreciable amount is cost less residual value, allocated over the useful life in the pattern in which benefits are consumed.",
      "Residual value, useful life and depreciation method are reviewed at least annually (a change is a change in estimate under IAS 8).",
      "Impairment and any related insurance compensation are separate economic events and are accounted for separately; they must not be netted off."
    ],
    audit: [
      "Risk that repairs are capitalised to boost profit, or that assets remain on the register after disposal or scrapping.",
      "Revaluations depend on a valuer: assess competence, capability and objectivity under ISA 500, and whether all assets in the class were revalued.",
      "Depreciation risk where useful lives are extended without justification, which reduces the annual charge."
    ],
    quiz: [
      { q: "An entity revalues one building in a class of properties and leaves the rest at cost. Under IAS 16 this is:",
        options: ["Permitted, revaluation is asset by asset", "Not permitted, the whole class must be revalued", "Permitted if disclosed", "Permitted only for listed entities"], correct: 1,
        why: "The revaluation model must be applied to an entire class to prevent selective revaluation of favourable assets." },
      { q: "A factory is destroyed by fire and an insurance claim is expected. Under IAS 16 the entity should:",
        options: ["Net the claim against the impairment loss", "Recognise the impairment and account for the compensation separately when receivable", "Delay recognition until the claim is settled", "Recognise a contingent asset immediately"], correct: 1,
        why: "The standard specifically states the two are separate economic events and must not be netted." }
    ]
  },
  {
    num: "IAS 19", title: "Employee Benefits",
    scope: "Short-term benefits, post-employment plans and other long-term benefits.",
    rule: [
      "Short-term benefits are recognised as an expense and liability as the employee renders service.",
      "Accumulating paid absences, such as holiday that can be carried forward, are recognised as a liability as entitlement builds; non-accumulating absences are recognised when taken.",
      "Defined contribution plans: the expense is the contribution payable for the period.",
      "Defined benefit plans: recognise the net defined benefit liability, being the present value of the obligation less the fair value of plan assets.",
      "Service cost and net interest go to profit or loss; remeasurements, including actuarial gains and losses and the return on plan assets other than net interest, go to other comprehensive income and are never recycled."
    ],
    audit: [
      "Defined benefit obligations rest on actuarial assumptions — discount rate, mortality, salary growth — a high-estimation-uncertainty area under ISA 540.",
      "The actuary is a management expert: assess competence, capability, objectivity and the appropriateness of the assumptions used.",
      "Risk that accumulating holiday pay accruals are omitted or measured on the wrong basis."
    ],
    quiz: [
      { q: "Actuarial losses on a defined benefit obligation are recognised:",
        options: ["In profit or loss", "In other comprehensive income, without recycling", "Directly in retained earnings", "Not recognised until the plan is settled"], correct: 1,
        why: "Remeasurements are presented in OCI and are not reclassified to profit or loss in later periods." },
      { q: "Employees may carry forward untaken holiday into the next year. Under IAS 19 the entity:",
        options: ["Recognises nothing until the holiday is taken", "Recognises a liability for the accumulating entitlement at the reporting date", "Discloses a contingent liability", "Recognises the cost as an equity movement"], correct: 1,
        why: "Accumulating paid absences create an obligation as the entitlement accrues." }
    ]
  },
  {
    num: "IAS 20", title: "Accounting for Government Grants and Disclosure of Government Assistance",
    scope: "Recognition and presentation of government grants.",
    rule: [
      "A grant is recognised only when there is reasonable assurance that the entity will comply with the attached conditions and that the grant will be received.",
      "Grants are recognised in profit or loss on a systematic basis over the periods in which the entity recognises the related expenses the grant is intended to compensate — the income approach; a grant is never credited directly to equity.",
      "Grants related to assets are presented either as deferred income released over the asset's life, or netted against the carrying amount of the asset, reducing the depreciation charge.",
      "A grant receivable as compensation for expenses already incurred, or for immediate financial support with no future related costs, is recognised in profit or loss in the period it becomes receivable.",
      "If conditions are breached and the grant becomes repayable, it is treated as a change in estimate; a liability is recognised under IAS 37."
    ],
    audit: [
      "Risk of early recognition where conditions have not yet been met, particularly where the grant depends on employment or output targets.",
      "Risk that a repayable grant is not recognised as a liability when conditions have been breached; inspect the grant agreement for conditions and clawback clauses."
    ],
    quiz: [
      { q: "A grant of $2m is received towards a machine with a ten-year life. Which treatment is permitted by IAS 20?",
        options: ["Credit the whole $2m to profit or loss immediately", "Credit $2m directly to equity", "Recognise as deferred income released over ten years, or deduct from the carrying amount of the machine", "Offset against retained earnings"], correct: 2,
        why: "Both the deferred income and the netting presentations are permitted; immediate income or an equity credit are not." },
      { q: "A condition of a grant is broken and the grant becomes repayable. Under IAS 20 this is:",
        options: ["A prior period error", "A change in accounting estimate, with a liability recognised", "A change of accounting policy", "A non-adjusting event"], correct: 1,
        why: "Repayment is accounted for prospectively as a change in estimate, with the liability recognised under IAS 37." }
    ]
  },
  {
    num: "IAS 21", title: "The Effects of Changes in Foreign Exchange Rates",
    scope: "Translating foreign currency transactions and foreign operations.",
    rule: [
      "Transactions are initially recorded using the spot rate at the transaction date.",
      "At the reporting date, monetary items are retranslated at the closing rate and the exchange differences go to profit or loss.",
      "Non-monetary items measured at historical cost stay at the rate on the transaction date; non-monetary items measured at fair value use the rate at the date fair value was determined.",
      "For a foreign operation on consolidation: assets and liabilities are translated at the closing rate, income and expenses at the rate on the transaction date or an average rate, and the resulting differences go to other comprehensive income in a translation reserve.",
      "The translation reserve is recycled to profit or loss when the foreign operation is disposed of."
    ],
    audit: [
      "Risk that a foreign subsidiary's results are translated at the wrong rate, or that the functional currency has been determined incorrectly.",
      "Risk that exchange differences are taken to reserves rather than to profit or loss, smoothing reported earnings.",
      "In group audits this interacts with ISA 600 and the reliability of component information."
    ],
    quiz: [
      { q: "A foreign subsidiary's statement of financial position is translated for consolidation at:",
        options: ["The average rate for the year", "The historical rate at acquisition", "The closing rate at the reporting date", "The rate expected next year"], correct: 2,
        why: "Assets and liabilities use the closing rate; income and expenses use the actual or average rate." },
      { q: "A payable in a foreign currency is outstanding at the year end. Under IAS 21 it is:",
        options: ["Left at the historical rate", "Retranslated at the closing rate with the difference in profit or loss", "Retranslated with the difference in OCI", "Derecognised"], correct: 1,
        why: "A payable is a monetary item, so it is retranslated and the exchange difference is recognised in profit or loss." }
    ]
  },
  {
    num: "IAS 23", title: "Borrowing Costs",
    scope: "Capitalisation of borrowing costs on qualifying assets.",
    rule: [
      "Borrowing costs directly attributable to the acquisition, construction or production of a qualifying asset form part of the cost of that asset; all other borrowing costs are expensed.",
      "A qualifying asset is one that necessarily takes a substantial period of time to get ready for its intended use or sale.",
      "Capitalisation begins when expenditure is being incurred, borrowing costs are being incurred and activities to prepare the asset are in progress.",
      "Capitalisation is suspended during extended periods in which active development is interrupted, and ceases when substantially all activities to prepare the asset are complete.",
      "Where funds are borrowed generally, a capitalisation rate is applied to the expenditure on the asset."
    ],
    audit: [
      "Risk that borrowing costs continue to be capitalised after the asset is ready for use, or during a suspension of construction.",
      "Risk that costs on assets that are not qualifying assets, such as inventory produced routinely in large quantities, are capitalised."
    ],
    quiz: [
      { q: "Construction is halted for six months by a legal dispute. Under IAS 23 the entity should:",
        options: ["Continue capitalising borrowing costs", "Suspend capitalisation during the interruption", "Reverse all borrowing costs capitalised to date", "Capitalise at double the rate afterwards"], correct: 1,
        why: "Capitalisation is suspended during extended periods when active development is interrupted." },
      { q: "Which is a qualifying asset?", options: ["Inventory routinely manufactured in three days", "A power station under construction over four years", "A machine bought ready for use", "A financial asset at fair value"], correct: 1,
        why: "A qualifying asset necessarily takes a substantial period of time to be made ready for use or sale." }
    ]
  },
  {
    num: "IAS 24", title: "Related Party Disclosures",
    scope: "Identification of related parties and the disclosures required.",
    rule: [
      "A related party is a person or entity related to the reporting entity: a person with control, joint control or significant influence, or who is a member of key management personnel, and their close family members.",
      "Entities are related where one controls, jointly controls or significantly influences the other, where they are members of the same group, or where one is an associate or joint venture of the other.",
      "Disclose the nature of the relationship, the amount of the transactions, outstanding balances including terms, conditions and guarantees, and any allowance for expected credit losses on those balances.",
      "Relationships between a parent and its subsidiaries are disclosed irrespective of whether any transactions took place.",
      "Key management personnel compensation is disclosed in total and by category.",
      "A statement that transactions were on arm's length terms may only be made if it can be substantiated."
    ],
    audit: [
      "ISA 550: related party transactions are inherently hard to detect because completeness depends on management disclosure.",
      "Risk of undisclosed transactions with entities controlled by directors or their close family; procedures include reviewing board minutes, register of interests, bank confirmations and unusual transactions outside normal terms.",
      "Related party transactions are always material by nature, so materiality by size does not apply to the disclosure decision."
    ],
    quiz: [
      { q: "A parent had no transactions with a subsidiary during the year. Under IAS 24 the relationship:",
        options: ["Need not be disclosed", "Must be disclosed irrespective of transactions", "Is disclosed only if material", "Is disclosed only in the subsidiary's own statements"], correct: 1,
        why: "Parent-subsidiary relationships are disclosed whether or not transactions occurred." },
      { q: "Why are related party transactions treated as material by nature?",
        options: ["They are always large", "Users need them to assess whether the entity was influenced by relationships rather than commercial terms", "They are taxed differently", "They always breach the law"], correct: 1,
        why: "Materiality here rests on the nature of the relationship, not the size of the amount." }
    ]
  },
  {
    num: "IAS 28", title: "Investments in Associates and Joint Ventures",
    scope: "Equity accounting for significant influence and joint ventures.",
    rule: [
      "Significant influence is presumed where the investor holds 20% or more of the voting power, unless clearly demonstrated otherwise; it can also arise from board representation, participation in policy decisions or material transactions.",
      "Associates and joint ventures are accounted for using the equity method: the investment starts at cost and is increased or decreased by the investor's share of post-acquisition profit or loss, with dividends received reducing the carrying amount.",
      "The investor's share of the investee's other comprehensive income is recognised in the investor's OCI.",
      "Uniform accounting policies must be applied, and losses are recognised only to the extent of the interest, unless the investor has obligations to fund further losses.",
      "The investment is tested for impairment as a single asset under IAS 36 when indicators exist."
    ],
    audit: [
      "Risk that a 20%+ holding is treated as a simple investment, avoiding recognition of losses, or that de facto significant influence over a smaller stake is ignored.",
      "The auditor may have limited access to the associate's records, creating a risk of insufficient appropriate evidence over the share of profit."
    ],
    quiz: [
      { q: "An investor holds 22% of the voting shares and has a seat on the board. The investment is accounted for:",
        options: ["At fair value through profit or loss", "By consolidation", "Using the equity method", "At cost less impairment"], correct: 2,
        why: "Significant influence is presumed at 20% or more and confirmed by board representation; the equity method applies." },
      { q: "A dividend received from an associate under the equity method:",
        options: ["Is recognised as income", "Reduces the carrying amount of the investment", "Increases the carrying amount", "Is recognised in OCI"], correct: 1,
        why: "Income is already recognised through the share of profit; the dividend is a return of that carrying amount." }
    ]
  },
  {
    num: "IAS 33", title: "Earnings per Share",
    scope: "Calculation and presentation of basic and diluted EPS.",
    rule: [
      "Applies to entities whose ordinary shares are publicly traded or which are in the process of issuing shares publicly.",
      "Basic EPS is profit attributable to ordinary equity holders of the parent divided by the weighted average number of ordinary shares outstanding.",
      "A bonus issue or the bonus element of a rights issue is treated as if it had always existed, so comparatives are restated.",
      "Diluted EPS adjusts profit and the share count for all dilutive potential ordinary shares, such as convertibles and options.",
      "Basic and diluted EPS are presented with equal prominence on the face of the statement of profit or loss, including for discontinued operations."
    ],
    audit: [
      "Risk that the weighted average is miscalculated where shares were issued mid-year, or that comparatives are not restated after a bonus or rights issue.",
      "Risk that dilutive instruments are omitted, overstating diluted EPS — a sensitive figure for a listed client with market expectations."
    ],
    quiz: [
      { q: "A bonus issue occurs during the year. Under IAS 33 the prior year EPS is:",
        options: ["Left unchanged", "Restated as if the bonus shares had always been in issue", "Recalculated using the year-end share count only", "Disclosed only in the notes"], correct: 1,
        why: "A bonus issue provides no additional resources, so it is treated as though it had always existed and comparatives are restated." },
      { q: "Which entity must present EPS under IAS 33?", options: ["Every entity preparing IFRS statements", "Entities whose ordinary shares are publicly traded or being issued publicly", "Only entities with convertible debt", "Only groups"], correct: 1,
        why: "The scope is listed entities and those in the process of issuing shares to the public." }
    ]
  },
  {
    num: "IAS 36", title: "Impairment of Assets",
    scope: "Testing assets for impairment and allocating impairment losses.",
    rule: [
      "An asset is impaired when its carrying amount exceeds its recoverable amount, which is the higher of fair value less costs of disposal and value in use.",
      "Assets are tested when an indicator of impairment exists; goodwill, indefinite-life intangibles and intangibles not yet available for use are tested annually regardless of indicators.",
      "Value in use is the present value of future cash flows from the asset in its current condition, excluding future restructurings and enhancements not yet committed, discounted at a pre-tax rate reflecting current market assessments.",
      "Within a cash-generating unit, the impairment loss is allocated first to goodwill and then pro rata to other assets, but no asset is reduced below the highest of its fair value less costs of disposal, its value in use and zero.",
      "Impairment losses on assets other than goodwill may be reversed if the estimates change, capped at the carrying amount that would have existed had no impairment been recognised; an impairment of goodwill is never reversed."
    ],
    audit: [
      "The single most common exam risk: management refuses to perform a test despite a clear indicator, such as a fall in demand, adverse publicity, loss of a key customer or a market capitalisation below net assets.",
      "Cash flow forecasts and the discount rate are highly judgemental and open to bias; evaluate the assumptions against past accuracy and external data under ISA 540.",
      "Check the level at which goodwill is allocated to CGUs, as too high a level can mask an impairment."
    ],
    quiz: [
      { q: "Recoverable amount is:",
        options: ["Fair value less costs of disposal", "Value in use", "The higher of fair value less costs of disposal and value in use", "The lower of carrying amount and fair value"], correct: 2,
        why: "A rational entity would choose the better of selling or continuing to use the asset." },
      { q: "A CGU with goodwill of $5m and other assets of $40m is impaired by $8m. The allocation is:",
        options: ["$8m pro rata across all assets", "$5m to goodwill, then $3m pro rata to other assets", "$8m to goodwill", "$8m to the oldest assets first"], correct: 1,
        why: "Goodwill absorbs the loss first, then the remainder is allocated pro rata, subject to the individual floors." },
      { q: "Sales fell 30% after adverse publicity but management says the decline is temporary and performs no test. This is:",
        options: ["Acceptable if management documents its view", "An indicator of impairment, so a test is required by IAS 36", "Only relevant if the asset is goodwill", "A disclosure matter only"], correct: 1,
        why: "A significant decline in market or economic conditions is an external indicator; the test is mandatory, not optional." }
    ]
  },
  {
    num: "IAS 37", title: "Provisions, Contingent Liabilities and Contingent Assets",
    scope: "When to recognise a provision, disclose a contingency, or do nothing.",
    rule: [
      "A provision is recognised only if there is a present obligation, legal or constructive, arising from a past event, an outflow of economic benefits is probable, meaning more likely than not, and the amount can be estimated reliably.",
      "A contingent liability, where the outflow is possible but not probable or the amount cannot be measured reliably, is disclosed and not recognised; where the outflow is remote, nothing is disclosed.",
      "A contingent asset is disclosed when an inflow is probable and recognised only when it is virtually certain, at which point it is no longer contingent.",
      "A restructuring provision requires a detailed formal plan identifying the business, locations, employees affected, expenditures and timing, and a valid expectation raised in those affected by starting to implement the plan or announcing its main features. A board decision alone is not enough.",
      "A restructuring provision includes only direct expenditures necessarily entailed by the restructuring; retraining or relocating continuing staff, marketing and investment in new systems are excluded, as are future operating losses.",
      "Provisions are measured at the best estimate of the expenditure required to settle the obligation, discounted where the time value of money is material, and reviewed at each reporting date.",
      "Decommissioning costs are provided at present value with the corresponding amount added to the cost of the related asset."
    ],
    audit: [
      "Provisions are judgemental and are the classic vehicle for profit smoothing: over-provide in a good year, release in a bad one.",
      "For restructuring, inspect board minutes, the formal plan, and evidence of announcement before the year end; test that excluded costs have not been included.",
      "For legal claims, obtain external confirmation from the entity's lawyers, review correspondence and obtain written representations."
    ],
    quiz: [
      { q: "Lawyers advise that a claim is possible but not probable. Under IAS 37 the entity should:",
        options: ["Recognise a provision", "Disclose a contingent liability", "Do nothing", "Recognise a contingent asset"], correct: 1,
        why: "Possible but not probable is the definition of a contingent liability: disclose, do not recognise." },
      { q: "The board decided in April to close a factory but announced nothing before the June year end. At the year end:",
        options: ["A provision is required", "No provision: there is no constructive obligation without announcement or implementation", "A contingent asset is disclosed", "The assets are derecognised"], correct: 1,
        why: "A board decision alone does not raise a valid expectation in those affected, so no present obligation exists." },
      { q: "Which cost may be included in a restructuring provision?",
        options: ["Retraining of continuing staff", "Future operating losses of the unit", "Redundancy payments to staff whose roles are eliminated", "Marketing of the restructured business"], correct: 2,
        why: "Only direct expenditures necessarily entailed by the restructuring qualify; the others are costs of the ongoing business." },
      { q: "An inflow from a claim is virtually certain. Under IAS 37 the entity:",
        options: ["Discloses a contingent asset", "Recognises the asset, since it is no longer contingent", "Ignores it under prudence", "Recognises it only when cash is received"], correct: 1,
        why: "Virtually certain inflows are recognised; probable inflows are disclosed; possible inflows are ignored." }
    ]
  },
  {
    num: "IAS 38", title: "Intangible Assets",
    scope: "Recognition and measurement of intangibles, including development costs.",
    rule: [
      "An intangible asset is recognised only if it is identifiable, controlled by the entity, and future economic benefits are probable, and its cost can be measured reliably.",
      "Research costs must be expensed as incurred; development costs are capitalised only when all criteria are met: technical feasibility, intention to complete, ability to use or sell, probable future economic benefits, availability of adequate resources, and reliable measurement of the expenditure.",
      "Costs incurred before the criteria are met cannot be capitalised retrospectively.",
      "Internally generated goodwill, brands, mastheads, customer lists and similar items are never recognised.",
      "An intangible with a finite life is amortised systematically over that life, beginning when the asset is available for use; an indefinite life intangible is not amortised but is tested for impairment annually under IAS 36.",
      "An assessment of an indefinite useful life is appropriate only where there is no foreseeable limit to the period over which the asset will generate net cash inflows, and must be reviewed each period."
    ],
    audit: [
      "Risk that costs failing the criteria, including research and internal administration, are capitalised to avoid an expense — often where directors have made public promises about a new platform or product.",
      "Risk that amortisation is not charged from the date the asset became available for use.",
      "Assessing the useful life as indefinite is highly judgemental and avoids the annual amortisation charge; challenge the basis and check the annual impairment test was performed."
    ],
    quiz: [
      { q: "Development expenditure may be capitalised only when:",
        options: ["The directors intend to develop the asset", "All six recognition criteria are met, including technical feasibility and probable future economic benefits", "The project has started", "Cash has been spent"], correct: 1,
        why: "Every criterion must be met, and only costs incurred after that point qualify." },
      { q: "An internally generated brand created by a successful marketing campaign is:",
        options: ["Recognised at fair value", "Recognised at cost", "Never recognised as an intangible asset", "Recognised only if the entity is listed"], correct: 2,
        why: "Internally generated brands cannot be distinguished from the cost of developing the business as a whole." },
      { q: "An e-commerce platform was launched in January and the year end is 30 June. Amortisation should:",
        options: ["Start when the platform becomes profitable", "Start in January, when the asset became available for use", "Start in the following financial year", "Not be charged as the life is indefinite"], correct: 1,
        why: "Amortisation begins when the asset is available for use, not when revenue arrives." }
    ]
  },
  {
    num: "IAS 40", title: "Investment Property",
    scope: "Property held to earn rentals or for capital appreciation.",
    rule: [
      "Investment property is land or a building held to earn rentals or for capital appreciation, rather than for use in production or administration, or for sale in the ordinary course of business.",
      "Initially measured at cost including transaction costs.",
      "After recognition the entity chooses the cost model or the fair value model and applies it consistently to all of its investment property.",
      "Under the fair value model the property is not depreciated and all changes in fair value are recognised in profit or loss, not in other comprehensive income.",
      "Transfers into or out of investment property are made only when there is a change in use evidenced by an event, such as commencement of owner occupation or of an operating lease to a third party."
    ],
    audit: [
      "Fair value is judgemental and depends on a valuer: assess competence, capability and objectivity, and the assumptions on yields and comparable transactions.",
      "Risk of misclassification between IAS 16 and IAS 40, which changes both the measurement model and where gains are presented — fair value gains in profit or loss directly inflate reported earnings."
    ],
    quiz: [
      { q: "Under the fair value model of IAS 40, a $3m increase in value is recognised:",
        options: ["In other comprehensive income", "In profit or loss", "Directly in a revaluation surplus", "Not recognised until sale"], correct: 1,
        why: "Unlike IAS 16 revaluations, IAS 40 fair value changes go through profit or loss." },
      { q: "An entity uses the fair value model for one investment property and the cost model for another. This is:",
        options: ["Permitted", "Not permitted: the chosen model applies to all investment property", "Permitted if disclosed", "Permitted for leased property only"], correct: 1,
        why: "The policy must be applied consistently to all of the entity's investment property." }
    ]
  },
  {
    num: "IAS 41", title: "Agriculture",
    scope: "Biological assets and agricultural produce.",
    rule: [
      "Biological assets are measured at fair value less costs to sell at initial recognition and at each reporting date, with changes recognised in profit or loss.",
      "Agricultural produce harvested from a biological asset is measured at fair value less costs to sell at the point of harvest; that amount becomes cost for IAS 2 thereafter.",
      "Bearer plants, such as fruit trees, are accounted for under IAS 16 as property, plant and equipment; the produce growing on them remains within IAS 41.",
      "A gain or loss can arise on initial recognition, for example when a calf is born."
    ],
    audit: [
      "Fair value of living assets is highly judgemental where there is no active market; valuation may rely on a management expert.",
      "Existence and quantity of livestock or crops are difficult to verify; consider physical counts, tagging records and the work of an auditor's expert."
    ],
    quiz: [
      { q: "A dairy herd is measured under IAS 41 at:",
        options: ["Cost less depreciation", "Fair value less costs to sell, with changes in profit or loss", "Lower of cost and NRV", "Historical cost"], correct: 1,
        why: "Biological assets use fair value less costs to sell with gains and losses in profit or loss." },
      { q: "Apple trees in an orchard are accounted for under:",
        options: ["IAS 41 as biological assets", "IAS 16 as bearer plants", "IAS 2 as inventory", "IAS 40 as investment property"], correct: 1,
        why: "Bearer plants were brought within IAS 16; the fruit growing on them remains under IAS 41." }
    ]
  }
];
