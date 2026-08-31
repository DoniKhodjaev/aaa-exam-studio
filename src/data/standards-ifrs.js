/* Стандарты IFRS и Conceptual Framework. */
export const STANDARDS_IFRS = [
  {
    num: "IFRS 2", title: "Share-based Payment",
    scope: "Accounting for share options and other share-based transactions with employees and suppliers.",
    rule: [
      "Equity-settled transactions with employees are measured at the fair value of the equity instruments at the grant date; that fair value is never remeasured afterwards.",
      "The expense is the number of options expected to vest multiplied by the grant-date fair value, spread over the vesting period, with a corresponding increase in equity.",
      "The estimate of the number expected to vest is revised at each reporting date for non-market vesting conditions, such as employees leaving or a profit target; market conditions, such as a share price target, are built into the grant-date fair value and are not revisited.",
      "Cash-settled transactions, such as share appreciation rights, create a liability remeasured to fair value at each reporting date, with changes in profit or loss.",
      "Extensive disclosure is required, including the effect on profit or loss and financial position and the way fair value was determined."
    ],
    audit: [
      "Grant-date fair value usually comes from an option pricing model with judgemental inputs (volatility, expected life), so it is an ISA 540 estimate and may involve a management expert.",
      "Risk that no expense is recognised at all because no cash moves, or that the number expected to vest is understated to reduce the charge.",
      "Risk that a share-based payment to a supplier is recorded at the cash amount rather than fair value of goods or services received."
    ],
    quiz: [
      { q: "Under IFRS 2 the fair value of equity-settled employee share options is measured:",
        options: ["At each reporting date", "At the grant date and not remeasured", "At the vesting date", "At exercise"], correct: 1,
        why: "Equity-settled awards are fixed at grant-date fair value; only the number expected to vest is revised." },
      { q: "An award vests if the share price reaches $10. The target is missed but employees remain. Under IFRS 2:",
        options: ["The cumulative expense is reversed", "The expense stands, because a market condition is reflected in the grant-date fair value", "No expense was ever recognised", "The award becomes cash-settled"], correct: 1,
        why: "Market conditions are priced into grant-date fair value; failure to meet them does not reverse the charge if service conditions are met." },
      { q: "Share appreciation rights settled in cash create:",
        options: ["An equity balance fixed at grant date", "A liability remeasured to fair value at each reporting date", "No accounting entry until payment", "A prepayment"], correct: 1,
        why: "Cash-settled awards are liabilities and are remeasured, with changes in profit or loss." }
    ]
  },
  {
    num: "IFRS 3", title: "Business Combinations",
    scope: "Acquisition accounting, goodwill and contingent consideration.",
    rule: [
      "The acquisition method applies: identify the acquirer, determine the acquisition date, recognise identifiable assets acquired and liabilities assumed at acquisition-date fair value, and recognise goodwill.",
      "Goodwill equals consideration transferred plus non-controlling interest plus the fair value of any previously held interest, less the fair value of identifiable net assets acquired.",
      "Non-controlling interest is measured either at fair value, giving full goodwill, or at the proportionate share of identifiable net assets; the choice is made transaction by transaction.",
      "Contingent consideration is measured at acquisition-date fair value and included in goodwill; if classified as a liability, later changes from post-acquisition events go to profit or loss, not to goodwill. Deferred consideration is recorded at present value.",
      "Acquisition-related costs, such as legal and due diligence fees, are expensed as incurred and are never part of goodwill.",
      "Provisional amounts may be adjusted during the measurement period, which ends when the acquirer obtains the information it sought and cannot exceed twelve months from the acquisition date.",
      "Intangibles such as brands, customer relationships and licences must be recognised separately from goodwill if identifiable, even if the acquiree never recognised them."
    ],
    audit: [
      "Fair values of acquired assets are judgemental and often produced by a management expert; assess competence and objectivity, and challenge whether separable intangibles were identified rather than dumped into goodwill.",
      "Risk that acquisition costs are capitalised into goodwill, that contingent consideration is omitted, or that the acquisition date used differs from the date control passed.",
      "Provisional goodwill on a recent acquisition is a significant risk: procedures include agreeing consideration to the bank statement and the share purchase agreement, and recalculating goodwill."
    ],
    quiz: [
      { q: "Legal and due diligence fees of $1.5m are incurred on an acquisition. Under IFRS 3 they are:",
        options: ["Included in the cost of the investment and goodwill", "Expensed to profit or loss as incurred", "Recognised as an intangible asset", "Deducted from equity"], correct: 1,
        why: "Acquisition-related costs are not part of the consideration transferred and must be expensed." },
      { q: "Contingent consideration classified as a liability increases in fair value after the acquisition because a profit target was met. The change is:",
        options: ["Added to goodwill", "Recognised in profit or loss", "Recognised in OCI", "Ignored until settlement"], correct: 1,
        why: "Post-acquisition remeasurement of a financial liability goes to profit or loss; goodwill is not restated." },
      { q: "The measurement period for provisional amounts under IFRS 3 cannot exceed:",
        options: ["Six months", "Twelve months from the acquisition date", "The end of the reporting period", "Two years"], correct: 1,
        why: "Adjustments to provisional amounts must be completed within twelve months of the acquisition date." }
    ]
  },
  {
    num: "IFRS 5", title: "Non-current Assets Held for Sale and Discontinued Operations",
    scope: "Classification, measurement and presentation of assets and operations being disposed of.",
    rule: [
      "An asset or disposal group is classified as held for sale when its carrying amount will be recovered principally through a sale rather than continuing use: management is committed to a plan, the asset is available for immediate sale in its present condition, an active programme to locate a buyer has begun, the sale is highly probable within twelve months, and the asset is marketed at a price reasonable in relation to fair value.",
      "Immediately before classification the asset is measured under the applicable standard; thereafter at the lower of carrying amount and fair value less costs to sell.",
      "Depreciation and amortisation cease from the date of classification.",
      "Assets held for sale are presented separately as current assets, and related liabilities separately as current liabilities, without offsetting.",
      "A discontinued operation is a component that has been disposed of or classified as held for sale and represents a separate major line of business or geographical area, is part of a single coordinated plan to dispose of one, or is a subsidiary acquired exclusively with a view to resale; its results are presented as a single amount, with comparatives restated."
    ],
    audit: [
      "Risk that classification criteria are not actually met, allowing depreciation to be stopped early and profit to be flattered.",
      "Risk that a component is presented as discontinued when it does not qualify, moving losses out of continuing operations and improving the underlying result users focus on.",
      "Fair value less costs to sell requires evidence: offers received, agents' valuations, subsequent sale price."
    ],
    quiz: [
      { q: "A disposal group is classified as held for sale. From that date:",
        options: ["Depreciation continues as normal", "Depreciation ceases", "Depreciation is doubled", "The assets are derecognised"], correct: 1,
        why: "The carrying amount will be recovered through sale rather than use, so depreciation stops." },
      { q: "A disposal group has a carrying amount of $78m and fair value less costs to sell of $90m. It is measured at:",
        options: ["$90m", "$78m", "$84m", "The higher of the two"], correct: 1,
        why: "Measurement is at the lower of carrying amount and fair value less costs to sell, so no gain is recognised." },
      { q: "Which qualifies as a discontinued operation?",
        options: ["Closure of one of forty similar retail outlets", "Disposal of an entire geographical segment of the business", "Sale of an office building", "A restructuring of head office"], correct: 1,
        why: "It must be a separate major line of business or geographical area of operations." }
    ]
  },
  {
    num: "IFRS 8", title: "Operating Segments",
    scope: "Segment reporting for listed entities.",
    rule: [
      "An operating segment engages in business activities from which it may earn revenues and incur expenses, whose results are regularly reviewed by the chief operating decision maker to allocate resources and assess performance, and for which discrete financial information is available.",
      "A segment is reportable if its revenue, its reported profit or loss in absolute amount, or its assets are 10% or more of the respective combined totals.",
      "Reportable segments must together represent at least 75% of external revenue; if not, additional segments are added until that threshold is met.",
      "Disclosure follows the management approach: amounts are reported as they are presented to the chief operating decision maker, with a reconciliation to the IFRS financial statements.",
      "It applies to entities whose debt or equity is publicly traded."
    ],
    audit: [
      "Risk that segments are aggregated inappropriately to hide a loss-making business or to conceal a decline in a key market.",
      "Compare the segments reported with internal management information and board packs — the two must be consistent, since the standard uses the management approach.",
      "Segment disclosure is a common source of a qualified opinion on disclosure grounds for listed clients."
    ],
    quiz: [
      { q: "The quantitative threshold for a reportable segment under IFRS 8 is:",
        options: ["5% of revenue only", "10% of revenue, profit or assets", "15% of assets", "20% of profit"], correct: 1,
        why: "Any one of the three 10% tests makes a segment reportable." },
      { q: "Under the management approach, segment information should agree to:",
        options: ["The tax computation", "The information regularly reviewed by the chief operating decision maker", "The statutory statements only", "Industry averages"], correct: 1,
        why: "IFRS 8 reports through the eyes of management, with a reconciliation to IFRS figures." }
    ]
  },
  {
    num: "IFRS 9", title: "Financial Instruments",
    scope: "Classification, measurement, impairment and hedge accounting for financial instruments.",
    rule: [
      "Financial assets are classified by the business model and the contractual cash flow characteristics: amortised cost, fair value through other comprehensive income, or fair value through profit or loss.",
      "Amortised cost applies where the asset is held to collect contractual cash flows that are solely payments of principal and interest.",
      "Derivatives are always measured at fair value through profit or loss unless designated in an effective hedge relationship.",
      "Impairment uses the expected credit loss model: a loss allowance is recognised from initial recognition, at twelve-month expected losses, moving to lifetime expected losses when credit risk increases significantly. Trade receivables use the simplified lifetime approach.",
      "A receivable due in more than a year is recognised at fair value, meaning the amount discounted to present value, not the cash settlement amount.",
      "Hedge accounting requires formal designation and documentation and an economic relationship between the hedged item and the hedging instrument."
    ],
    audit: [
      "Expected credit losses are a significant estimate involving forward-looking information; challenge the ageing, the loss rates and any post year-end cash received.",
      "Risk that derivatives are not recognised at all because they cost nothing to enter into — off-balance-sheet exposure is a classic exam point.",
      "Risk that a long-dated receivable is held at face value, overstating both the receivable and the profit on disposal."
    ],
    quiz: [
      { q: "A receivable of $5m is due in one year from the sale of a machine, and market rates are 6%. Under IFRS 9 the initial measurement is:",
        options: ["$5m, the cash settlement amount", "The discounted present value of $5m", "$5m less a 6% provision", "Nil until received"], correct: 1,
        why: "The receivable is recognised at fair value, which discounts the amount due; recording the full amount overstates the receivable and the profit." },
      { q: "For trade receivables, the expected credit loss model requires:",
        options: ["No allowance until default occurs", "Lifetime expected credit losses from initial recognition, under the simplified approach", "An allowance only for balances over 90 days", "Twelve-month losses in all cases"], correct: 1,
        why: "The simplified approach avoids tracking changes in credit risk and applies lifetime ECLs from the start." },
      { q: "A forward contract entered into at nil cost at the year end is:",
        options: ["Not recognised because there was no cash flow", "Recognised at fair value with gains and losses in profit or loss", "Recognised at cost", "Disclosed only"], correct: 1,
        why: "Derivatives are recognised on the statement of financial position at fair value, whatever their initial cost." }
    ]
  },
  {
    num: "IFRS 10", title: "Consolidated Financial Statements",
    scope: "The definition of control and the requirement to consolidate.",
    rule: [
      "An investor controls an investee when it has power over the investee, exposure or rights to variable returns, and the ability to use its power to affect those returns. All three elements must be present.",
      "Control can exist without a majority of the shares, through contractual arrangements, potential voting rights or de facto control where other holdings are widely dispersed.",
      "A subsidiary is consolidated from the date control is obtained to the date it is lost, with intra-group balances, transactions and unrealised profits eliminated in full.",
      "Uniform accounting policies must be applied throughout the group; where a subsidiary uses different policies, its financial information is adjusted on consolidation.",
      "Non-controlling interests are presented within equity, separately from the equity of the owners of the parent."
    ],
    audit: [
      "Risk that a subsidiary is excluded from consolidation, or that an entity controlled through contractual arrangements is not identified.",
      "Where a component reports under local rules, adjustment to group policies and to the group's currency is a significant risk; combine with ISA 600 evaluation of the component auditor's competence and independence, and consider what work the group team must perform itself on significant components.",
      "Risk that the acquisition date used for consolidation is the completion date rather than the date control actually passed."
    ],
    quiz: [
      { q: "Which combination establishes control under IFRS 10?",
        options: ["Ownership of more than 50% of shares alone", "Power, exposure to variable returns, and the ability to use power to affect those returns", "Board representation alone", "A holding of 20% or more"], correct: 1,
        why: "All three elements of the control model must be present; a majority holding is neither always necessary nor always sufficient." },
      { q: "A foreign subsidiary reports under local GAAP. On consolidation the group must:",
        options: ["Consolidate the local figures unchanged", "Adjust the subsidiary's figures to group accounting policies and translate them", "Equity account instead", "Exclude the subsidiary"], correct: 1,
        why: "Uniform accounting policies are required throughout the group." }
    ]
  },
  {
    num: "IFRS 11", title: "Joint Arrangements",
    scope: "Distinguishing joint operations from joint ventures.",
    rule: [
      "A joint arrangement exists where two or more parties have joint control, meaning unanimous consent is required for decisions about the relevant activities.",
      "A joint operation gives the parties rights to the assets and obligations for the liabilities of the arrangement; each party recognises its own assets, liabilities, revenue and expenses.",
      "A joint venture gives the parties rights to the net assets of the arrangement; it is accounted for using the equity method under IAS 28.",
      "Classification depends on the structure, the legal form, contractual terms and other facts and circumstances, not on the label the parties give it.",
      "Proportionate consolidation of joint ventures is not permitted."
    ],
    audit: [
      "Risk of misclassification, which changes whether assets and liabilities appear line by line or as a single equity-accounted balance — a material presentation difference that also affects gearing.",
      "Inspect the joint arrangement contract for evidence of unanimous consent and for rights to assets versus rights to net assets."
    ],
    quiz: [
      { q: "The parties to an arrangement have rights to the net assets of the vehicle. Under IFRS 11 it is:",
        options: ["A joint operation, accounted for line by line", "A joint venture, accounted for using the equity method", "A subsidiary, consolidated", "An investment at fair value"], correct: 1,
        why: "Rights to net assets define a joint venture; the equity method applies." },
      { q: "Which method is prohibited for joint ventures under IFRS 11?",
        options: ["The equity method", "Proportionate consolidation", "Fair value in separate statements", "Cost in separate statements"], correct: 1,
        why: "Proportionate consolidation was removed when IFRS 11 replaced IAS 31." }
    ]
  },
  {
    num: "IFRS 13", title: "Fair Value Measurement",
    scope: "A single definition of fair value and the hierarchy of inputs.",
    rule: [
      "Fair value is the price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date — an exit price, not an entry price.",
      "Measurement assumes the transaction takes place in the principal market, or in its absence the most advantageous market.",
      "For non-financial assets, fair value reflects highest and best use by market participants, which may differ from the entity's current use.",
      "Inputs are ranked: Level 1 is quoted prices in active markets for identical assets, Level 2 is other observable inputs, Level 3 is unobservable inputs. The entity maximises observable inputs and minimises unobservable ones.",
      "Extensive disclosure is required about the level used, valuation techniques and the sensitivity of Level 3 measurements."
    ],
    audit: [
      "Level 3 measurements have the highest estimation uncertainty and are frequently a key audit matter for a listed client.",
      "Evaluate the valuation technique, the observability of inputs, and the competence and objectivity of any valuer under ISA 500 and ISA 540."
    ],
    quiz: [
      { q: "Fair value under IFRS 13 is:",
        options: ["The price paid to acquire the asset", "An exit price in an orderly transaction between market participants", "Replacement cost", "Value in use"], correct: 1,
        why: "IFRS 13 defines fair value as an exit price from the perspective of market participants." },
      { q: "Which input sits at Level 1 of the hierarchy?",
        options: ["A discounted cash flow using internal forecasts", "Quoted prices in an active market for an identical asset", "A broker's indicative quote", "Management's estimate of future margins"], correct: 1,
        why: "Level 1 is unadjusted quoted prices in active markets for identical items — the most reliable evidence." }
    ]
  },
  {
    num: "IFRS 15", title: "Revenue from Contracts with Customers",
    scope: "When and how much revenue to recognise.",
    rule: [
      "The five-step model: identify the contract, identify the performance obligations, determine the transaction price, allocate the price to the performance obligations, and recognise revenue when or as each obligation is satisfied.",
      "Where a contract contains multiple performance obligations, the transaction price is allocated by reference to relative standalone selling prices.",
      "Revenue is recognised when control of the good or service transfers to the customer, either over time or at a point in time; control can pass even where delivery is delayed, provided the customer has accepted the goods, the seller has no remaining obligations and the goods are identified separately.",
      "Loyalty points or discount vouchers granting a material right are a separate performance obligation; part of the transaction price is deferred until the points are redeemed or expire.",
      "A service-type warranty sold or bundled beyond the standard assurance warranty is a separate performance obligation, recognised over the warranty period; an assurance warranty is provided for under IAS 37.",
      "Variable consideration is included only to the extent it is highly probable that a significant reversal will not occur.",
      "An entity acting as agent recognises only its net commission, not the gross amount billed.",
      "Goods held on consignment are not the customer's inventory until control passes and the right of return lapses."
    ],
    audit: [
      "ISA 240 presumes revenue recognition is a fraud risk; the presumption must be rebutted with reasons if not treated as significant.",
      "Bonus schemes and covenants tied to revenue growth create direct incentives for early or gross recognition.",
      "Common exam errors: recognising bundled warranty or loyalty points in full at the point of sale, recognising gross as principal when acting as agent, and cut-off manipulation around the year end."
    ],
    quiz: [
      { q: "Equipment is sold with a bundled two-year extended warranty. Under IFRS 15:",
        options: ["All revenue is recognised at the point of sale", "The price is allocated between the equipment and the warranty on relative standalone selling prices, with the warranty recognised over two years", "The warranty is provided for under IAS 37", "Revenue is deferred in full for two years"], correct: 1,
        why: "A service-type warranty is a separate performance obligation satisfied over the warranty period." },
      { q: "Customers earn loyalty points redeemable against future purchases. These points are:",
        options: ["A marketing cost recognised when redeemed", "A separate performance obligation, so part of the transaction price is deferred", "A contingent liability", "Ignored until expiry"], correct: 1,
        why: "Points conferring a material right are a separate obligation and require deferral of an allocated portion of the price." },
      { q: "An entity arranges sales for a manufacturer and keeps a 10% commission, never taking control of the goods. It should recognise:",
        options: ["The gross amount billed to customers", "Only the net commission", "The gross amount less cost of sales", "Nothing until cash is received"], correct: 1,
        why: "An agent recognises only the fee or commission for arranging the transaction." }
    ]
  },
  {
    num: "IFRS 16", title: "Leases",
    scope: "Lessee accounting, exemptions and sale and leaseback.",
    rule: [
      "A lessee recognises a right-of-use asset and a lease liability for almost all leases; there is no operating and finance lease distinction for lessees.",
      "The lease liability is the present value of the lease payments not paid at the commencement date, discounted at the rate implicit in the lease if readily determinable, otherwise the incremental borrowing rate.",
      "The right-of-use asset is the initial liability plus payments made at or before commencement, less lease incentives, plus initial direct costs and any restoration obligation; it is depreciated over the shorter of the lease term and the asset's useful life, or over the useful life where ownership transfers.",
      "Recognition exemptions exist for short-term leases of twelve months or less with no purchase option and for leases of low-value assets; payments are then expensed on a straight-line or other systematic basis.",
      "In a sale and leaseback, the first question is whether the transfer qualifies as a sale under IFRS 15. If it does not, the asset stays on the seller's books and the proceeds are recognised as a financial liability.",
      "If it is a sale, the seller-lessee derecognises the asset and recognises a right-of-use asset at the proportion of the previous carrying amount that relates to the right retained; only the gain relating to the rights transferred to the buyer is recognised.",
      "Where the sale price exceeds fair value, the excess is accounted for as additional financing provided by the buyer-lessor, not as profit."
    ],
    audit: [
      "Sale and leaseback at above fair value is a recurring exam scenario: recognising the whole gain overstates profit and understates liabilities.",
      "Risk that leases are kept off balance sheet by misusing the short-term or low-value exemptions, particularly where covenants depend on gearing.",
      "The discount rate and lease term, including whether extension options are reasonably certain to be exercised, are judgemental."
    ],
    quiz: [
      { q: "A building with a carrying amount of $11m and fair value $15m is sold for $18m and leased back. Under IFRS 16 the $3m excess over fair value is:",
        options: ["Recognised as profit immediately", "Treated as additional financing provided by the buyer-lessor", "Deferred and released over the lease term as revenue", "Credited to equity"], correct: 1,
        why: "Proceeds above fair value are not a sale of rights; they are a loan and give rise to a financial liability." },
      { q: "The transfer in a sale and leaseback does not meet the IFRS 15 criteria for a sale. The seller-lessee:",
        options: ["Derecognises the asset and recognises the full gain", "Keeps the asset on its statement of financial position and recognises the proceeds as a financial liability", "Recognises a right-of-use asset only", "Discloses the transaction only"], correct: 1,
        why: "Without a sale there is nothing to derecognise; the arrangement is in substance secured borrowing." },
      { q: "Which lease may be kept off the statement of financial position?",
        options: ["A five-year property lease", "A nine-month lease of equipment with no purchase option", "A ten-year vehicle lease", "A lease with an extension option reasonably certain to be exercised"], correct: 1,
        why: "The short-term exemption covers leases of twelve months or less with no purchase option." }
    ]
  },
  {
    num: "Conceptual Framework", title: "Conceptual Framework for Financial Reporting",
    scope: "The underlying concepts: objective, qualitative characteristics, elements and recognition.",
    rule: [
      "The objective of general purpose financial reporting is to provide financial information useful to existing and potential investors, lenders and other creditors in making decisions about providing resources.",
      "The fundamental qualitative characteristics are relevance, including materiality, and faithful representation, meaning complete, neutral and free from error.",
      "The enhancing characteristics are comparability, verifiability, timeliness and understandability.",
      "Substance over form is part of faithful representation: transactions are reported according to their economic substance, not merely their legal form.",
      "An asset is a present economic resource controlled by the entity as a result of past events; a liability is a present obligation to transfer an economic resource as a result of past events.",
      "Contributions from shareholders acting in their capacity as owners, including gifts of assets, are recognised in equity as capital contributions rather than as income."
    ],
    audit: [
      "Where no specific standard exists, the Framework is the fallback for judging whether an accounting treatment gives a true and fair view.",
      "Substance over form underpins exam scenarios such as sale and repurchase, consignment inventory and off-balance-sheet financing.",
      "Neutrality is the concept breached when management applies bias to smooth results or meet a covenant."
    ],
    quiz: [
      { q: "A shareholder gifts a property to the company for no consideration. Under the Conceptual Framework it is:",
        options: ["Recognised as income in profit or loss", "Recognised in equity as a capital contribution", "Disclosed only", "Recognised as deferred income"], correct: 1,
        why: "A transaction with an owner acting in their capacity as owner is not income." },
      { q: "Goods are sold with an obligation to repurchase them at a fixed price in a year. The substance is:",
        options: ["A sale, so revenue is recognised", "A financing arrangement: the asset stays and a liability is recognised", "A lease", "A contingent liability"], correct: 1,
        why: "Substance over form: risks and rewards have not passed, so it is in substance secured borrowing." }
    ]
  }
];
