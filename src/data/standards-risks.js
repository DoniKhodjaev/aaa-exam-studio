/* Типичные нарушения по каждому стандарту: что делает компания и как это искажает отчётность.
   act — действие руководства, effect — эффект на отчётность и почему это делают. */
export const STANDARD_RISKS = {
  "IAS 1": [
    { act: "Material uncertainty over going concern is discussed with the auditor but left out of the notes.", effect: "Disclosure misstatement even though the basis of preparation is correct; directors fear the disclosure will trigger the very funding withdrawal it describes." },
    { act: "A large one-off cost is buried inside another line rather than presented separately.", effect: "Underlying performance looks smoother; users cannot see the item that explains the movement." },
    { act: "A gain on disposal is offset against operating expenses.", effect: "Both figures understated; offsetting is prohibited and it hides the fact that profit came from a disposal, not from trading." },
    { act: "Comparatives are re-presented without explanation after a change in classification.", effect: "Trend analysis is distorted and the reason for the reclassification is not disclosed." }
  ],
  "IAS 2": [
    { act: "Obsolete or slow-moving lines are held at cost with no write-down to net realisable value.", effect: "Inventory and profit overstated; typical where inventory days have jumped or a product line has been discontinued." },
    { act: "Fixed production overheads are absorbed on actual low production rather than normal capacity.", effect: "Cost per unit inflated, so idle-time cost sits in inventory instead of profit or loss." },
    { act: "NRV is assessed on the total inventory balance rather than item by item.", effect: "Losses on failing lines are hidden by profitable ones, so the write-down is understated." },
    { act: "Goods in transit or held at third-party warehouses are counted twice or not at all.", effect: "Existence and completeness errors; a favourite exam point where inventory is stored under logistics agreements." },
    { act: "Storage, selling or administrative overheads are included in cost.", effect: "Inventory overstated and current-period expenses deferred into next year." }
  ],
  "IAS 7": [
    { act: "An operating outflow, such as payments to suppliers, is presented within investing activities.", effect: "Operating cash flow — the number analysts watch — is flattered while total cash movement is unchanged." },
    { act: "An overdraft used as part of cash management is shown as financing rather than within cash and equivalents.", effect: "Cash position and net debt presented misleadingly." },
    { act: "Non-cash transactions, such as an asset acquired under a lease, are pushed through the statement.", effect: "Both investing and financing flows overstated for transactions where no cash moved." }
  ],
  "IAS 8": [
    { act: "A change of accounting policy is presented as a change in estimate.", effect: "Comparatives are not restated, so the trend is broken invisibly and the effect on prior periods never appears." },
    { act: "A prior period error is put through the current year profit or loss.", effect: "Current year distorted, prior year left wrong; often done to avoid the visibility of a restatement." },
    { act: "Useful lives are extended with no supporting evidence.", effect: "Depreciation charge falls and profit rises immediately; classic where a covenant or bonus target is close." },
    { act: "A provision estimate is revised sharply in one direction shortly before the year end.", effect: "Earnings management: over-provide in a good year, release in a bad one." }
  ],
  "IAS 10": [
    { act: "A customer's insolvency after the year end is treated as non-adjusting.", effect: "Receivable stays at full value; in fact it confirms a condition existing at the reporting date and must be written down." },
    { act: "A major post year-end event, such as a fire or an acquisition, is not disclosed.", effect: "Users cannot evaluate the entity's future position; non-adjusting events of that size require disclosure of nature and financial effect." },
    { act: "A dividend declared after the year end is recognised as a liability.", effect: "Liabilities overstated and equity understated; no obligation existed at the reporting date." },
    { act: "Inventory sold below cost shortly after the year end is not written down.", effect: "NRV evidence from after the year end is adjusting evidence about conditions at the reporting date." }
  ],
  "IAS 12": [
    { act: "No deferred tax liability is recognised on a revaluation because there is no intention to sell.", effect: "Liabilities understated; intention is irrelevant, the temporary difference exists." },
    { act: "A deferred tax asset is recognised for losses on the strength of optimistic forecasts.", effect: "Assets and profit overstated; recognition requires probable future taxable profits, and a history of losses demands convincing evidence." },
    { act: "Deferred tax is discounted to present value.", effect: "Liability understated; discounting is prohibited by IAS 12." },
    { act: "Deferred tax on fair value uplifts recognised in an acquisition is omitted.", effect: "Net assets acquired overstated, so goodwill is understated." }
  ],
  "IAS 16": [
    { act: "Routine repairs and maintenance are capitalised as improvements.", effect: "Assets and profit overstated, expenses understated; usually spotted through an unusual jump in additions." },
    { act: "Only the favourable properties in a class are revalued.", effect: "Selective revaluation inflates net assets; the model must be applied to the entire class." },
    { act: "Revaluations are several years old and not kept up to date.", effect: "Carrying amounts no longer approximate fair value, particularly after a market decline." },
    { act: "An impairment loss is netted against an expected insurance claim.", effect: "Both the loss and the compensation disappear from view; they are separate economic events." },
    { act: "Assets scrapped or disposed of remain on the fixed asset register.", effect: "Assets and depreciation both misstated; existence risk that the physical verification is designed to catch." }
  ],
  "IAS 19": [
    { act: "Accumulating holiday entitlement carried forward is not accrued.", effect: "Liabilities and expenses understated; management often treats holiday as a cost of the period it is taken." },
    { act: "Actuarial assumptions — discount rate, salary growth, mortality — are set at the favourable end of the plausible range.", effect: "Defined benefit obligation understated; small changes in the discount rate move the liability materially." },
    { act: "Remeasurement gains and losses are put through profit or loss.", effect: "Earnings volatility misplaced; remeasurements belong in OCI and are never recycled." },
    { act: "The actuary's report is used without assessing the actuary's competence or objectivity.", effect: "Insufficient appropriate evidence over a highly judgemental balance." }
  ],
  "IAS 20": [
    { act: "The full grant is credited to profit or loss on receipt, before the related expenditure occurs.", effect: "Profit overstated and future periods understated; recognition must follow the costs the grant compensates." },
    { act: "The grant is credited directly to equity.", effect: "Profit understated and equity overstated; the income approach is mandatory." },
    { act: "Conditions have been breached but no repayment liability is recognised.", effect: "Liabilities understated; repayment is a change in estimate with a liability under IAS 37." },
    { act: "A grant is recognised when the application is submitted rather than when reasonable assurance exists.", effect: "Income recognised too early on an uncertain entitlement." }
  ],
  "IAS 21": [
    { act: "Foreign currency payables and receivables are left at the historical rate.", effect: "Monetary items must be retranslated at the closing rate; assets, liabilities and profit all misstated." },
    { act: "Exchange differences on monetary items are taken to reserves instead of profit or loss.", effect: "Earnings smoothed; only translation of a foreign operation goes to OCI." },
    { act: "The functional currency is chosen for convenience rather than by reference to the primary economic environment.", effect: "The whole translation of the entity becomes wrong, including which differences hit profit." },
    { act: "A foreign subsidiary's profit or loss is translated at the closing rate.", effect: "Income and expenses should use the transaction or average rate; results distorted where the currency moved during the year." }
  ],
  "IAS 23": [
    { act: "Capitalisation continues after the asset is substantially ready for use.", effect: "Asset and profit overstated; finance costs that belong in profit or loss sit in the balance sheet." },
    { act: "Capitalisation is not suspended during a lengthy interruption to construction.", effect: "Borrowing costs incurred while nothing is happening are wrongly added to cost." },
    { act: "Borrowing costs are capitalised on assets that are not qualifying assets.", effect: "Inventory produced routinely or assets bought ready for use do not qualify." },
    { act: "General borrowings are capitalised without applying a weighted capitalisation rate.", effect: "Amount capitalised overstated relative to the actual expenditure on the asset." }
  ],
  "IAS 24": [
    { act: "Transactions with entities controlled by directors or their close family are simply not disclosed.", effect: "Completeness is the core risk: the auditor depends on management to identify related parties, so undisclosed transactions are hard to detect." },
    { act: "A transaction is treated as immaterial by size and left out.", effect: "Related party transactions are material by nature; the size test does not apply to the disclosure decision." },
    { act: "The statement that terms were equivalent to arm's length is made without support.", effect: "The claim may only be made if it can be substantiated; unsupported it is a misleading disclosure." },
    { act: "Key management personnel compensation is aggregated with other staff costs.", effect: "Required disclosure by category is missing — a sensitive area for listed clients." },
    { act: "Loans to directors are recorded as ordinary receivables with no terms disclosed.", effect: "Outstanding balances, terms, guarantees and expected credit losses must be disclosed." }
  ],
  "IAS 28": [
    { act: "A 20%+ holding is treated as a plain investment at fair value.", effect: "Share of the associate's losses avoided; presumption of significant influence must be rebutted with evidence, not assumption." },
    { act: "De facto significant influence over a smaller holding — board seat, policy participation — is ignored.", effect: "Equity method wrongly not applied." },
    { act: "The associate's different accounting policies are not aligned before equity accounting.", effect: "Share of profit measured on the wrong basis." },
    { act: "The investment is not tested for impairment despite the associate's losses.", effect: "Carrying amount overstated; the investment is tested as a single asset under IAS 36." }
  ],
  "IAS 33": [
    { act: "Comparative EPS is not restated after a bonus issue or the bonus element of a rights issue.", effect: "The trend in EPS looks better than it is; the bonus element must be treated as always having existed." },
    { act: "Dilutive convertibles or options are excluded from diluted EPS.", effect: "Diluted EPS overstated — a headline number in a listed client's announcement." },
    { act: "The weighted average share count ignores the timing of a mid-year issue.", effect: "EPS overstated or understated depending on the direction of the issue." }
  ],
  "IAS 36": [
    { act: "No impairment review is performed despite an obvious indicator, on the argument that the decline is temporary.", effect: "Assets overstated and expenses understated; the review is mandatory once an indicator exists, and management's opinion is not a substitute for the test." },
    { act: "Cash flow forecasts in the value in use calculation include a planned restructuring or future enhancements.", effect: "Recoverable amount inflated; only the asset in its current condition may be modelled." },
    { act: "The discount rate used is the entity's post-tax WACC rather than a pre-tax market rate.", effect: "Value in use overstated, so the impairment is understated or avoided." },
    { act: "Goodwill is allocated to CGUs at too high a level, such as the whole group.", effect: "Losses in one failing unit are masked by profitable ones and no impairment is recognised." },
    { act: "An impairment of goodwill is reversed when trading recovers.", effect: "Prohibited outright: goodwill impairments are never reversed." },
    { act: "Annual testing of indefinite-life intangibles is skipped in a year with no obvious indicator.", effect: "The annual test is mandatory regardless of indicators." }
  ],
  "IAS 37": [
    { act: "A general provision for future losses or restructuring is set up in a strong year and released later.", effect: "Classic profit smoothing; there is no present obligation, so no provision may be recognised." },
    { act: "A restructuring provision is recognised on the strength of a board decision alone.", effect: "Liabilities and expenses overstated: without announcement or implementation there is no constructive obligation." },
    { act: "Retraining, relocation of continuing staff, marketing or new systems are included in a restructuring provision.", effect: "Provision overstated; only direct expenditures necessarily entailed by the restructuring qualify." },
    { act: "A restructuring plan announced before the year end is not provided for.", effect: "The mirror image: liabilities and expenses understated where the covenant or profit target is under pressure." },
    { act: "A legal claim that is possible but not probable is neither provided for nor disclosed, because disclosure is 'commercially damaging'.", effect: "Contingent liability disclosure is required; omission is a material misstatement by nature and questions management integrity." },
    { act: "A contingent asset is recognised while the outcome is only probable.", effect: "Assets and profit overstated; recognition requires virtual certainty." },
    { act: "A long-term decommissioning provision is not discounted.", effect: "Liability overstated and the unwinding of the discount never charged as finance cost." }
  ],
  "IAS 38": [
    { act: "Research costs, staff time and general overheads are swept into a capitalised development project.", effect: "Assets and profit overstated; research must always be expensed and only qualifying costs after the criteria are met can be capitalised." },
    { act: "Costs incurred before the recognition criteria were met are capitalised retrospectively.", effect: "Prohibited: expenditure already expensed cannot be reinstated as an asset." },
    { act: "Amortisation does not begin when the asset becomes available for use.", effect: "Profit overstated in the launch year; a favourite in scenarios where a platform went live mid-year." },
    { act: "A useful life is assessed as indefinite with no supporting analysis.", effect: "Avoids the annual amortisation charge; only appropriate where there is no foreseeable limit to net cash inflows, and an annual impairment test is then required." },
    { act: "An internally generated brand or customer list is recognised at valuation.", effect: "Never permitted; cannot be distinguished from the cost of developing the business as a whole." },
    { act: "Capitalisation is justified by directors' public statements about future revenue rather than by evidence.", effect: "Probable future economic benefits must be demonstrated by forecasts and market evidence, not by optimism, especially where bonuses depend on the project." }
  ],
  "IAS 40": [
    { act: "Owner-occupied property is classified as investment property.", effect: "Fair value gains flow straight into profit or loss, inflating earnings, and depreciation stops." },
    { act: "The fair value model is applied to some properties and the cost model to others.", effect: "Inconsistent policy; the model must apply to all investment property." },
    { act: "Fair value is based on an outdated valuation or on the directors' own estimate.", effect: "Carrying amount and profit misstated with no reliable supporting evidence." },
    { act: "A transfer into investment property is made without a change in use.", effect: "Transfers require an event evidencing the change; without it the reclassification is a device to book a fair value gain." }
  ],
  "IAS 41": [
    { act: "Biological assets are held at cost because fair value is 'hard to determine'.", effect: "Measurement basis wrong; fair value less costs to sell is required, with changes in profit or loss." },
    { act: "Bearer plants are measured at fair value under IAS 41.", effect: "Bearer plants belong in IAS 16 at cost less depreciation; only the produce growing on them is within IAS 41." },
    { act: "Quantities of livestock or crops are estimated rather than counted.", effect: "Existence and quantity risk; valuation errors then multiply across the whole herd or field." }
  ],
  "IFRS 2": [
    { act: "No expense is recognised for employee share options because no cash was paid.", effect: "Expenses and equity both understated; the service received is consumed whether or not cash moves." },
    { act: "The number of options expected to vest is understated.", effect: "Charge spread over the vesting period is too low; revision of non-market conditions at each reporting date is mandatory." },
    { act: "Grant-date fair value is remeasured at each reporting date for an equity-settled award.", effect: "Equity-settled awards are fixed at grant date; remeasurement introduces volatility that should not exist." },
    { act: "A cash-settled award is treated as equity-settled.", effect: "Liability omitted and later remeasurement never recognised." },
    { act: "The option pricing model uses volatility or expected life chosen to minimise the charge.", effect: "Highly judgemental inputs create the same bias risk as any ISA 540 estimate." }
  ],
  "IFRS 3": [
    { act: "Acquisition-related costs — legal, due diligence, advisory — are included in the cost of the investment.", effect: "Goodwill and expenses both wrong; such costs must be expensed as incurred." },
    { act: "Separable intangibles such as brands, customer relationships and licences are left inside goodwill.", effect: "Goodwill overstated and amortisation of the intangibles avoided, because goodwill is not amortised." },
    { act: "Contingent consideration is omitted or measured at management's best guess with no model.", effect: "Consideration and goodwill understated; it must be at acquisition-date fair value." },
    { act: "Post-acquisition changes in contingent consideration are adjusted against goodwill.", effect: "Only measurement period adjustments touch goodwill; changes from later events go to profit or loss." },
    { act: "Provisional fair values remain unfinalised beyond twelve months.", effect: "The measurement period has expired; later changes are errors or estimate changes, not goodwill adjustments." },
    { act: "The fair value exercise is performed by the auditor's own advisory team at the client's request.", effect: "Self-review and management threat; for a listed client there are no adequate safeguards and the work must be declined." }
  ],
  "IFRS 5": [
    { act: "An asset is classified as held for sale although no active marketing has begun and the sale is not highly probable.", effect: "Depreciation stops early and profit is flattered." },
    { act: "Depreciation continues after a valid classification.", effect: "The opposite error: expenses overstated, though it is far rarer in exam scenarios." },
    { act: "A loss-making division is presented as a discontinued operation when it is not a separate major line of business.", effect: "Losses are moved out of continuing operations, so the result users focus on improves." },
    { act: "Held for sale assets are measured at fair value less costs to sell when that is higher than carrying amount.", effect: "A gain is recognised that the standard does not permit; measurement is at the lower of the two." },
    { act: "Assets held for sale are netted against related liabilities.", effect: "Both understated; they must be presented separately." }
  ],
  "IFRS 8": [
    { act: "Segments are aggregated so that a loss-making business disappears into a profitable one.", effect: "Users cannot see the failing segment; aggregation is permitted only where economic characteristics are similar." },
    { act: "The segments reported differ from those in the board pack.", effect: "Breaches the management approach: reporting must follow what the chief operating decision maker actually reviews." },
    { act: "A segment above the 10% threshold is left out.", effect: "Reportable segments must also cover at least 75% of external revenue." },
    { act: "No reconciliation is given between segment totals and the IFRS financial statements.", effect: "Required disclosure missing; the figures cannot be tied back." }
  ],
  "IFRS 9": [
    { act: "Trade receivables are provided for only when a customer actually defaults.", effect: "Expected credit loss model requires an allowance from initial recognition; receivables overstated, particularly where receivable days have lengthened." },
    { act: "Forward-looking information is ignored and historic loss rates are used unchanged.", effect: "ECL understated when conditions in the customer's sector are deteriorating." },
    { act: "Derivatives entered into at nil cost are not recognised at all.", effect: "Off-balance-sheet exposure; derivatives are recognised at fair value with gains and losses in profit or loss." },
    { act: "A long-dated receivable is recorded at its cash settlement amount.", effect: "Receivable and the profit on disposal both overstated; it should be discounted to present value." },
    { act: "Hedge accounting is applied without formal designation and documentation at inception.", effect: "The hedge fails the criteria, so gains and losses should have gone straight to profit or loss." }
  ],
  "IFRS 10": [
    { act: "An entity controlled through contractual arrangements rather than shareholding is excluded from consolidation.", effect: "Assets, liabilities and often debt kept off the group statements; control does not require a majority holding." },
    { act: "A subsidiary is excluded because its activities are 'dissimilar' or it is immaterial individually.", effect: "No such exemption exists; the group is misstated." },
    { act: "A component reporting under local GAAP is consolidated without adjustment to group policies.", effect: "Uniform accounting policies are required; the consolidated figures do not give a true and fair view." },
    { act: "Consolidation runs from the completion date rather than the date control passed.", effect: "Post-acquisition results and goodwill both misstated." },
    { act: "Intra-group balances, sales and unrealised profit in inventory are not fully eliminated.", effect: "Group revenue and assets overstated — attractive where a bonus depends on revenue growth." }
  ],
  "IFRS 11": [
    { act: "A joint venture is proportionately consolidated.", effect: "Prohibited under IFRS 11; revenue and assets grossed up compared with the equity method." },
    { act: "An arrangement is classified by its label rather than by the parties' rights and obligations.", effect: "Joint operation and joint venture accounting differ fundamentally; classification drives whether assets appear line by line." },
    { act: "Joint control is claimed where one party can in fact direct the relevant activities alone.", effect: "The entity should be consolidated as a subsidiary; keeping it off balance sheet flatters gearing." }
  ],
  "IFRS 13": [
    { act: "Fair value is measured as an entry price or replacement cost.", effect: "IFRS 13 requires an exit price in the principal market from a market participant's perspective." },
    { act: "Level 3 unobservable inputs are used when observable market prices exist.", effect: "The hierarchy requires observable inputs to be maximised; using internal models invites bias." },
    { act: "A valuation prepared by a management expert is adopted without assessing competence and objectivity.", effect: "Insufficient appropriate audit evidence over the highest-uncertainty balances." },
    { act: "Level 3 sensitivity disclosures are omitted.", effect: "Users cannot see how much the reported number depends on unobservable assumptions." }
  ],
  "IFRS 15": [
    { act: "A bundled extended warranty or service element is recognised in full at the point of sale.", effect: "Revenue and profit overstated; a service-type warranty is a separate performance obligation recognised over its period." },
    { act: "Loyalty points are treated as a marketing cost when redeemed rather than as a separate performance obligation.", effect: "Revenue overstated at the point of sale; part of the transaction price should be deferred." },
    { act: "Revenue is recognised gross when the entity acts as an agent.", effect: "Revenue massively overstated with no effect on profit — attractive where growth targets or bonuses are revenue-based." },
    { act: "Sales are pushed through just before the year end with goods still on the loading bay.", effect: "Cut-off manipulation; control has not transferred and revenue belongs in the next period." },
    { act: "Consignment stock at a distributor is recognised as a sale.", effect: "Control has not passed and a right of return exists; revenue and receivables overstated." },
    { act: "Variable consideration such as a volume bonus is recognised in full.", effect: "Constraint ignored: include only the amount for which a significant reversal is highly improbable." },
    { act: "A contract with several deliverables is not split into performance obligations.", effect: "The allocation by relative standalone selling price never happens, so timing of revenue is wrong across the whole contract." }
  ],
  "IFRS 16": [
    { act: "In a sale and leaseback above fair value, the full gain is recognised immediately in operating profit.", effect: "Profit overstated and liabilities understated; the excess over fair value is additional financing and only the gain on rights transferred may be recognised." },
    { act: "A sale and leaseback that fails the IFRS 15 sale test is accounted for as a sale.", effect: "The asset is wrongly derecognised and secured borrowing disappears from the statement of financial position." },
    { act: "Leases are split into a series of short contracts to use the twelve-month exemption.", effect: "Right-of-use assets and lease liabilities kept off balance sheet, improving gearing where a covenant is tight." },
    { act: "Extension options reasonably certain to be exercised are excluded from the lease term.", effect: "Liability and right-of-use asset understated; the judgement over 'reasonably certain' is where bias sits." },
    { act: "The incremental borrowing rate used is unrealistically high.", effect: "Present value of the lease liability reduced, so gearing looks better." }
  ],
  "Conceptual Framework": [
    { act: "A sale and repurchase agreement is recorded as a sale.", effect: "Substance over form: risks and rewards never passed, so it is in substance secured borrowing; revenue and profit overstated." },
    { act: "Assets gifted by a shareholder are recognised as income.", effect: "Transactions with owners acting as owners are equity contributions, not income; profit overstated." },
    { act: "Estimates are consistently set at the favourable end of the range.", effect: "Neutrality — part of faithful representation — is breached even where each individual estimate is defensible." },
    { act: "Immaterial items are given the same prominence as material ones, or material ones are aggregated away.", effect: "Relevance and understandability both suffer; materiality is an entity-specific aspect of relevance." }
  ]
};
