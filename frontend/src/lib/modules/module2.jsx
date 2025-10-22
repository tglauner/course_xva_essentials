import { Calculator } from 'lucide-react'
import { BlockMath, InlineMath } from '@/lib/math/MathComponents.jsx'

const SectionOne = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        CVA quantifies the market value of counterparty credit risk embedded in derivative portfolios, translating expected
        losses from potential default into an upfront adjustment that aligns prices with economic reality. By charging desks for
        the capitalized cost of counterparty exposure, CVA embeds prudent incentives into trade decisions and fosters more
        resilient market structures. Its importance emerged sharply after the global financial crisis, when unpriced bilateral
        risk produced destabilizing losses. Understanding CVA’s purpose, determinants, and strategic implications is foundational
        for any practitioner navigating today’s risk-sensitive derivatives landscape. The section frames these motivations before
        examining formulas and implementation intricacies and practical governance considerations.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">Core CVA Representation</p>
        <BlockMath
          math="\\mathrm{CVA} = (1 - R) \\int_0^T \\mathbb{E}^Q\\left[D(0, t) (V_t)^+\\right]\\, dPD(t)"
        />
        <BlockMath math="\\mathrm{CVA} \\approx \\sum_i EE(t_i) \\times \\Delta PD(t_i) \\times LGD \\times DF(t_i)" />
      </div>
    </div>
    <div className="discussion space-y-4">
      <p>
        The concept of Credit Valuation Adjustment crystallizes the recognition that derivative receivables are only as good as
        the entities promising to honor them. Before the crisis period of 2007–2009, banks typically embedded an undifferentiated
        assumption of counterparty solvency into pricing, relying on collateral annexes and credit lines as informal safeguards.
        When market-wide funding stress and clustered defaults erupted, portfolios that appeared balanced under risk-neutral
        valuation suddenly revealed large uncollateralized replacement costs. CVA emerged as the disciplined method for
        translating the expected loss of those costs into present value terms, bringing explicit accountability to trading desks
        that originate counterparty exposure.
      </p>
      <p>
        At its core, CVA is structured as the discounted expectation of losses that would materialize if a counterparty failed at
        various future horizons. The adjustment therefore depends on three intertwined ingredients: the size and profile of
        positive exposure, the probability distribution governing default timing, and the proportion of exposure lost after
        accounting for collateral or recovery. Interpreting CVA as the price of purchasing continuous default insurance on the
        counterparty provides helpful intuition. Just as a credit default swap premium widens when investors fear default, the CVA
        charge levied on a new trade rises whenever the market prices deteriorating solvency or the trade’s exposure grows more
        pronounced over time.
      </p>
      <p>
        What distinguishes CVA from a generic credit spread is its dependence on the actual derivatives book. Exposure profiles
        are often highly path dependent, shaped by optionality, stochastic interest rates, and complex netting sets that connect
        many trades to the same legal entity. A single swap may become significantly in the money only under certain rate paths,
        while an exotic option might create asymmetric exposure that spikes during stress. Consequently, the analytics behind CVA
        require sophisticated modeling infrastructures capable of simulating joint evolutions of market factors and collateral
        mechanics. These simulations produce metrics like expected exposure (EE), potential future exposure (PFE), and expected
        positive exposure (EPE), each capturing different quantiles or averages of future mark-to-market distributions.
      </p>
      <p>
        CVA’s rationale extends beyond pure loss anticipation into organizational design and incentives. By allocating a
        quantified charge to the originating desk, risk managers ensure that marginal trades internalize the cost of counterparty
        credit. This promotes prudent selection of counterparties, encourages negotiation of tighter collateral terms, and steers
        portfolios toward diversification rather than concentrated bilateral bets. Moreover, attributing CVA at trade inception
        prevents the delayed recognition of credit deterioration, smoothing profit-and-loss trajectories and aligning them with
        observed changes in counterparty spreads. Without this discipline, profitable-looking trades could flood the pipeline only
        to reverse violently when defaults occur, impairing capital and eroding market confidence.
      </p>
      <p>
        The governance landscape around CVA solidified rapidly after high-profile losses entered public financial statements.
        Banks established specialized CVA desks that mediate between sales units hungry for client flow and centralized risk
        policies that guard the balance sheet. These desks calibrate pricing add-ons, monitor aggregate exposure, and coordinate
        hedging strategies. They also act as stewards of data quality, verifying the integrity of trade records, legal agreement
        mappings, and market inputs such as yield curves or credit default swap quotes. The operational discipline they enforce—
        daily exposure refreshes, dispute resolution over collateral calls, and close alignment with treasury funding—is an
        inseparable component of CVA’s purpose.
      </p>
      <p>
        Another motivation for CVA lies in regulatory expectations and stakeholder transparency. Accounting standards like IFRS 13
        and ASC 820 require derivatives to be carried at fair value, explicitly including adjustments for nonperformance risk.
        Supervisors scrutinize whether institutions adequately capture bilateral counterparty effects and avoid cherry-picking
        optimistic assumptions. Investors likewise demand clarity on how credit-sensitive positions will behave under stress. By
        embedding CVA into the valuation framework, institutions can present a coherent narrative about credit risk management,
        demonstrating that pricing, hedging, and capital allocation all stem from consistent models.
      </p>
      <p>
        CVA’s determinants can be influenced proactively. Negotiating robust collateral agreements reduces the loss-given-default
        component by ensuring that counterparties post high-quality assets that can be liquidated swiftly. Clearing trades through
        central counterparties eliminates bilateral exposure altogether, albeit at the cost of margin requirements that generate
        other XVA components. Shortening tenors, incorporating break clauses, and structuring trades with reset features limit the
        time window over which exposure can accumulate. Each of these techniques exemplifies how CVA is not merely an accounting
        adjustment but a strategic lever that shapes product design and client engagement.
      </p>
      <p>
        Lastly, CVA’s introduction has reshaped how banks view portfolio interdependencies. Because multiple business units may
        trade with the same counterparty under a shared netting set, the incremental CVA of a new deal depends on the existing
        book. Trades that provide natural offsets can lower aggregate exposure and thereby reduce the total charge. This holistic
        perspective incentivizes desks to coordinate rather than operate in silos, promoting cross-portfolio optimization. It also
        fosters the development of enterprise-level dashboards that track exposure concentrations, credit spread sensitivities,
        and scenario impacts in near real time. Ultimately, CVA crystallizes a philosophy: credit risk must be priced, managed,
        and communicated with the same rigor that institutions devote to market risk.
      </p>
    </div>
  </div>
)

const SectionTwo = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        Quantifying CVA rigorously requires translating intuitive notions of expected loss into time-discounted integrals that
        respect the joint dynamics of market risk and credit risk. This subsection provides a roadmap for decomposing the
        adjustment into conditional expectations of exposure, default probability, and loss severity while highlighting the key
        modelling assumptions embedded in each term. By articulating discrete summations, continuous-time integrals, and
        simulation-based estimators, we establish a coherent mathematical language that underpins both regulatory reporting and
        internal valuation controls. Readers gain the toolkit needed to interrogate models, challenge inputs, and appreciate the
        sensitivities that drive CVA analytics in practice today and governance.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">Discrete and Continuous CVA Formulas</p>
        <BlockMath math="\\mathrm{CVA}_{\\text{disc}} = \\sum_i EE(t_i) \\times \\Delta PD(t_i) \\times LGD \\times DF(t_i)" />
        <BlockMath math="\\mathrm{CVA}_{\\text{cont}} = (1 - R) \\int_0^T EPE(t) \\lambda(t) S(t) D(0, t)\\, dt" />
      </div>
    </div>
    <div className="discussion space-y-4">
      <p>
        The mathematical representation of Credit Valuation Adjustment formalizes the intuitive idea of expected loss into a
        discounted expectation over future states of the world. In its most transparent form, CVA is the risk-neutral expectation
        of discounted exposure at default multiplied by loss severity, conditional on the counterparty defaulting before the
        transaction matures. To build the formula, we define <InlineMath math="V(t)" /> as the positive mark-to-market of the
        netting set at time <InlineMath math="t" />, <InlineMath math="P(\\tau \\in [t, t + dt])" /> as the default probability
        over the infinitesimal interval, and <InlineMath math="R" /> as the recovery rate. The present value of expected loss
        integrates the product of these elements across the life of the portfolio.
      </p>
      <p>
        Practitioners often begin with a discrete-time approximation to align with daily exposure simulations and default
        probability term structures available from credit curves. In this setup, future time buckets <InlineMath math="t_i" /> are
        selected to capture key exposure dynamics, and the CVA is calculated as the sum of discounted expected exposure multiplied
        by marginal default probabilities and loss-given-default. Formally, <InlineMath math="\\mathrm{CVA} = \\sum_i EE(t_i)
        \\times \\Delta PD(t_i) \\times LGD \\times DF(t_i)" />, where <InlineMath math="EE(t_i)" /> represents the expected
        exposure conditional on survival up to bucket <InlineMath math="t_i" />. This framework makes it straightforward to
        incorporate collateral terms, break clauses, and netting arrangements by modifying the exposure paths in each bucket.
      </p>
      <p>
        Continuous-time formulations provide additional insight. By modelling default as a stochastic intensity process with
        hazard rate <InlineMath math="\\lambda(t)" />, practitioners compute CVA as the integral of expected positive exposure
        multiplied by hazard rate, survival probability, and discount factor. This perspective emphasizes the sensitivity of CVA
        to the term structure of default intensity and highlights the importance of calibrating <InlineMath math="\\lambda(t)" />
        to market-implied credit spreads. When the hazard rate co-moves with market factors that drive exposure—so-called wrong-way
        risk—the integral must incorporate correlation effects to avoid understating expected losses.
      </p>
      <p>
        Monte Carlo simulation underpins both discrete and continuous approaches for portfolios containing path-dependent or
        nonlinear payoffs. Simulation engines generate thousands of scenarios for underlying market factors, propagate collateral
        flows, and compute exposure profiles across time buckets. Along each path, exposure is discounted with appropriate yield
        curves, then averaged to form expected exposure or expected positive exposure. These simulations enable analysts to
        compute sensitivities by bumping market inputs, informing hedging strategies and capital allocation.
      </p>
      <p>
        Loss-given-default (LGD) modelling introduces another dimension. While senior unsecured recoveries typically range
        between 35% and 45%, practitioners adjust LGD to reflect collateralization, legal agreements, and structural
        subordination. Stress scenarios may layer additional LGD shocks to capture resolution uncertainty. Because LGD enters
        multiplicatively with exposure and default probability, even modest changes can materially influence CVA, underscoring the
        need for robust governance over recovery assumptions.
      </p>
      <p>
        Discounting conventions align CVA with the broader XVA framework. Overnight indexed swap (OIS) curves provide the
        standard for collateralized exposures, while institutions may adopt blended curves when trades are partially secured.
        Consistency with funding valuation adjustment is crucial to avoid double counting benefits or costs. Many banks operate
        curve governance committees that monitor discounting choices and ensure alignment between front-office pricing, risk
        reporting, and financial statements.
      </p>
      <p>
        Model risk remains a persistent challenge. Exposure simulations depend on calibrated models for interest rates, FX rates,
        commodity prices, and equity levels. Calibration errors, numerical approximations, or insufficient scenario granularity can
        bias exposure forecasts. Validation frameworks therefore emphasize benchmarking against historical experience, challenger
        models, and sensitivity analysis to ensure the CVA number remains credible under diverse market conditions.
      </p>
    </div>
  </div>
)

const SectionThree = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        CVA implementation is a multidisciplinary effort that blends analytics, data management, systems engineering, and
        governance. This subsection surveys the infrastructure required to produce reliable numbers—from trade capture and
        collateral systems feeding exposure engines, to data quality controls, workflow orchestration, and reporting. It also
        highlights the organizational structures that keep models, technology, and policies aligned, ensuring CVA remains credible
        under scrutiny from traders, finance teams, auditors, and regulators across dynamic market conditions and stress tests.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">CVA Operating Model Heuristics</p>
        <BlockMath math="\\text{CVA Readiness} \\propto \\text{Data Quality} \\times \\text{Model Governance} \\times \\text{Systems Resilience}" />
      </div>
    </div>
    <div className="discussion space-y-4">
      <p>
        Transforming CVA from a theoretical construct into a daily risk metric demands a robust operating model. Trade capture
        systems must feed accurate position data into exposure engines, including legal agreement mappings, collateral terms, and
        product-specific attributes. Data lineage documentation is essential so stakeholders understand how inputs flow from front
        office platforms to risk analytics and accounting systems. Institutions invest heavily in reconciliation controls to
        ensure that the trade population used for CVA aligns with financial reporting and regulatory submissions.
      </p>
      <p>
        Exposure engines sit at the heart of the infrastructure. They simulate market factors, apply valuation models, and
        aggregate exposures by counterparty, netting set, and maturity. Performance and scalability are critical because banks run
        thousands of scenarios across large portfolios, often overnight. Modern platforms leverage grid computing, cloud
        elasticity, and optimized data storage formats to deliver timely results. Results feeds drive not only CVA but also related
        metrics such as potential future exposure and collateral forecasts.
      </p>
      <p>
        Model governance frameworks wrap around these analytics. Policies define model development standards, independent
        validation requirements, and periodic reviews. Validation teams challenge modelling assumptions, numerical techniques, and
        calibration procedures, often replicating results with challenger models. Findings trigger remediation plans monitored by
        governance committees, ensuring continuous improvement and regulatory compliance.
      </p>
      <p>
        Data quality remains a perennial focus. Institutions maintain golden sources for market data, including yield curves,
        credit spreads, and volatility surfaces. Hierarchies specify preferred vendors and fallback proxies when primary quotes are
        unavailable. Control teams monitor data timeliness, completeness, and exception resolution. Poor data quality cascades
        into model errors, so automated checks and stewardship roles are integral to the CVA process.
      </p>
      <p>
        Workflow orchestration underpins timely delivery. Batch schedulers, event-driven architectures, and monitoring dashboards
        coordinate scenario generation, valuation, aggregation, and reporting. Operational resilience plans include failover
        procedures, disaster recovery capabilities, and capacity buffers to handle market stress when demand for analytics spikes.
      </p>
      <p>
        Reporting closes the loop between analytics and decision-making. Front-office dashboards display incremental CVA charges,
        sensitivities, and hedging recommendations. Finance teams rely on CVA outputs for fair value disclosures and earnings
        attribution. Risk committees review trend reports, scenario analyses, and breaches of risk appetite. Clear visualization
        and explanatory narratives help stakeholders interpret the numbers and take action.
      </p>
    </div>
  </div>
)

const SectionFour = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        Hedging CVA transforms risk measurement into active risk management. This subsection examines the toolkit available to
        mitigate spread volatility, from single-name CDS to indices, bonds, and structured overlays. It discusses hedge selection,
        calibration, performance monitoring, and governance controls that ensure hedging remains purposeful, cost-effective, and
        aligned with balance-sheet objectives—even when markets are stressed or liquidity thins.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">CVA Hedge Analytics</p>
        <BlockMath math="\\text{Hedge Ratio} = \\frac{\\Delta_{\\text{CVA Spread}}}{\\text{CDS PV01}}" />
        <BlockMath math="\\text{Residual Basis} = \\text{Spread}_{\\text{portfolio}} - \\beta \\times \\text{Spread}_{\\text{hedge}}" />
      </div>
    </div>
    <div className="discussion space-y-4">
      <p>
        CVA hedging strategies seek to neutralize sensitivity to counterparty credit spreads while balancing cost, liquidity, and
        operational feasibility. Single-name credit default swaps (CDS) provide direct protection but may suffer from limited
        liquidity, wide bid-ask spreads, or regulatory capital implications. Index CDS and bond positions offer diversification but
        introduce basis risk when their composition diverges from the exposure profile.
      </p>
      <p>
        Hedge calibration begins with sensitivity analysis. Risk teams compute CVA deltas to credit spread movements by
        counterparty and maturity. These sensitivities inform hedge ratios, translating spread shocks into protection notional. For
        example, the hedge ratio formula <InlineMath math="\\text{Hedge Ratio} = \\frac{\\Delta_{\\text{CVA Spread}}}{\\text{CDS PV01}}" />
        quantifies how much CDS notional offsets a unit change in CVA. Calibration also accounts for correlation among
        counterparties, ensuring portfolio-level hedges capture diversification effects.
      </p>
      <p>
        Execution choices depend on market liquidity and strategy horizon. Some desks prefer rolling index positions to maintain
        liquidity, while others negotiate bespoke CDS trades for concentrated exposures. Bond hedges, including total return swaps
        or asset swaps, can align funding considerations with credit protection. Structured solutions, such as tranche CDS or
        options on credit indices, provide non-linear payoffs that better match path-dependent exposures but may entail complex
        pricing and limited secondary markets.
      </p>
      <p>
        Monitoring hedge performance requires comprehensive attribution analysis. Risk teams decompose CVA P&amp;L into components
        driven by spread movements, exposure changes, and hedge carry. Basis risk emerges when hedges fail to track the targeted
        exposures, prompting recalibration or alternative instruments. Stress testing assesses how hedges behave under severe
        spread widening, liquidity squeezes, or counterparty downgrades.
      </p>
      <p>
        Governance underpins hedging effectiveness. Policies define allowable instruments, counterparty limits for hedging trades,
        and the degree of proprietary positioning permitted. Hedge performance is assessed through attribution analysis that
        decomposes CVA P&amp;L into market-driven and hedge-driven components. Variances prompt reviews of execution quality,
        modelling assumptions, or data integrity. Senior management receives regular reports summarizing risk metrics, hedge
        inventory, and projected capital impacts under regulatory stress scenarios.
      </p>
      <p>
        Coordination across organizational units is essential. Trading desks rely on CVA teams to quote adjustment charges when
        pricing new derivatives. Treasury manages funding implications of collateral and hedging activity. Collateral management
        ensures that credit protection trades themselves are supported by appropriate margining arrangements, preventing the
        hedges from introducing new credit exposures. Legal teams negotiate documentation for CDS and other hedge instruments,
        aligning triggers and settlement mechanics with internal risk preferences. This cross-functional collaboration keeps
        hedging strategies operationally feasible and aligned with broader balance-sheet objectives.
      </p>
      <p>
        Hedging strategies must also respect accounting and regulatory constraints. Under IFRS 13 and ASC 820, CVA is part of
        fair value, so hedge accounting eligibility can be complex. Some institutions designate CDS hedges within fair value
        hedging relationships to reduce P&amp;L volatility, while others accept mark-to-market swings on hedges as the cost of
        economic protection. Regulatory frameworks such as the Fundamental Review of the Trading Book (FRTB) impose capital
        charges on market risk positions, including CVA hedges, prompting careful analysis of the cost-benefit trade-off between
        capital relief from CVA reduction and capital consumption from the hedges themselves.
      </p>
      <p>
        Stress events provide critical lessons. During the eurozone sovereign crisis, many banks discovered that index hedges
        failed to track widening spreads on specific southern European counterparties, exposing the limitations of proxy hedging.
        Similarly, the onset of the COVID-19 pandemic saw abrupt spread spikes accompanied by liquidity dry-ups, forcing CVA desks
        to prioritize liquidity preservation over perfect hedge ratios. Post-crisis retrospectives feed into refined contingency
        plans that outline prioritized actions, communication protocols, and escalation paths when hedges become ineffective or
        markets seize.
      </p>
      <p>
        Ultimately, effective CVA hedging balances precision, cost, and agility. Desks maintain playbooks that rank hedge
        instruments by liquidity, explain trigger thresholds, and designate fallback strategies when primary markets are
        inaccessible. They cultivate relationships with dealers and electronic trading platforms to secure competitive pricing.
        Continuous feedback loops between hedging outcomes and pricing adjustments ensure that lessons learned inform future trade
        origination, fostering a virtuous cycle where CVA is proactively managed rather than reactively endured.
      </p>
    </div>
  </div>
)

const SectionFive = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        Basel III treats CVA risk as a distinct source of potential loss, requiring banks to hold capital against credit spread
        volatility in addition to default risk. This subsection surveys the evolution of regulatory thinking, contrasts the
        standardized and internal model approaches, and explains how supervisory expectations shape data, governance, and hedging
        practices. By tracing the link between historical loss experience, prudential policy design, and modern reporting
        frameworks, we equip readers to interpret capital metrics, anticipate supervisory queries, and integrate regulatory
        constraints into pricing, risk appetite, and strategic balance-sheet planning across jurisdictions today with emphasis on
        transparency and proportionality principles consistently.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">CVA Capital Formulas</p>
        <BlockMath math="K_{\\text{SA-CVA}} = \\sqrt{\\sum_i K_i^2 + 2 \\sum_{i \\neq j} \\rho_{ij} K_i K_j}" />
        <BlockMath math="K_{\\text{IMA-CVA}} = \\max(\\text{VaR}_{10d}, \\text{Stressed VaR}_{10d}) \\times \\text{Multiplier}" />
      </div>
    </div>
    <div className="discussion space-y-4">
      <p>
        The regulatory capital charge for CVA emerged from lessons learned during the global financial crisis, when banks absorbed
        billions in losses from credit spread widening even without actual counterparty defaults. Supervisors realized that
        fair-value accounting already reflected these losses, yet capital frameworks focused narrowly on default events. Basel III
        therefore introduced a dedicated CVA capital requirement to align prudential resources with the economic reality that
        spread shocks can erode earnings and capital as swiftly as realized defaults.
      </p>
      <p>
        Within the Basel counterparty credit risk framework, CVA capital complements default capital by capturing two drivers:
        continuous spread volatility and jump-to-default risk. Banks may adopt either the Standardized Approach to CVA (SA-CVA) or
        the Internal Models Approach (IMA-CVA), subject to supervisory approval. The selection affects not only required capital
        but also modelling sophistication, data governance, and the scale of validation obligations.
      </p>
      <p>
        SA-CVA offers a rule-based formula for institutions with simpler portfolios or limited modelling infrastructure.
        Counterparties are grouped into regulatory buckets by rating, sector, and region, and supervisory risk weights are applied
        to exposure-at-default and maturity factors. Prescribed sensitivities to counterparty spreads and eligible hedges feed into
        correlation matrices that approximate diversification. The conservatism built into these parameters protects against model
        error but can overstate capital for banks with strong collateralization or targeted hedging programmes.
      </p>
      <p>
        IMA-CVA is available to banks that can demonstrate robust internal models. These institutions simulate exposure profiles,
        calibrate credit spread processes, and revalue hedges within a risk-neutral framework to compute CVA value-at-risk (VaR)
        and stressed VaR. Supervisors require evidence of sound backtesting, independent model validation, and comprehensive
        documentation of assumptions, numerical methods, and data lineage. Approval unlocks greater risk sensitivity—capital can
        decline when portfolios are diversified or well hedged—but it also invites intensive supervisory monitoring and periodic
        benchmarking exercises.
      </p>
      <p>
        Recent FRTB-CVA reforms sharpen both approaches. They align CVA capital more closely with trading book principles by
        mandating granular risk-factor mapping, sensitivity-based metrics, and consistent treatment of market data. Certain hedges,
        such as securitization tranches or illiquid bespoke instruments, receive limited recognition to prevent overstated
        diversification. Institutions must demonstrate that the risk factors driving regulatory capital are identical to those
        embedded in pricing systems and managerial reporting, closing historical gaps between front-office and regulatory views.
      </p>
      <p>
        Governance expectations are explicit. Banks must maintain policies that describe model development, change management,
        validation standards, and escalation procedures. Independent validation teams annually challenge exposure models,
        hazard-rate calibrations, recovery assumptions, and numerical solvers, often replicating calculations with challenger
        models. Internal audit tests the surrounding control framework—user access, job scheduling, and data reconciliations—while
        board-level committees review key metrics, approve methodology changes, and monitor remediation plans. Weak governance can
        trigger capital overlays or restrictions on model usage.
      </p>
      <p>
        Data quality remains a cornerstone of supervisory assessments. Institutions need timely, defensible credit spread inputs,
        with documented hierarchies that prioritize liquid CDS quotes and specify proxies when direct observations are unavailable.
        Exposure simulations must incorporate up-to-date collateral terms, margin frequencies, and legal netting arrangements.
        Regulators increasingly expect end-to-end data lineage, enabling them to trace each capital number back to its market data
        sources and contractual parameters. Deficiencies often result in findings that require remediation plans and interim
        capital add-ons.
      </p>
      <p>
        Capital treatment shapes hedging behaviour. SA-CVA recognizes a limited set of hedges—primarily single-name and index CDS
        —and applies standardized offsets. Banks therefore weigh the cost of eligible hedges against the relief they provide,
        sometimes restructuring trades to maximize recognition. IMA-CVA permits richer hedge modelling but insists that hedges be
        captured in the same risk engines used for capital metrics, including basis risk between hedges and exposures. Supervisors
        review hedge effectiveness reports, stress-test performance, and governance over unwind decisions to ensure hedging is
        purposeful rather than opportunistic.
      </p>
      <p>
        Pricing and strategic planning incorporate CVA capital explicitly. Deal desks calculate marginal capital consumption when
        quoting new trades, particularly for long-dated, uncollateralized, or concentrated exposures. Some institutions embed
        capital charges into transfer-pricing frameworks so that business units internalize the cost of scarce resources. Portfolio
        steering committees compare revenues with economic profit after capital costs, guiding decisions on counterparty
        selection, tenor limits, and collateral negotiations.
      </p>
      <p>
        Stress testing connects day-to-day capital metrics with broader resilience assessments. Regulators require banks to
        evaluate CVA under macroeconomic scenarios featuring spread widening, rating downgrades, and collateral disputes. These
        exercises often reveal dependencies between market liquidity, hedge execution, and data timeliness. Results feed into
        Internal Capital Adequacy Assessment Process (ICAAP) narratives, recovery playbooks, and, in some jurisdictions, binding
        stress-capital buffers.
      </p>
      <p>
        Implementation varies by region. The European Union has incorporated FRTB-CVA timelines into the Capital Requirements
        Regulation, introducing phased reporting and disclosure milestones. U.S. regulators have proposed parallel reforms that
        echo Basel standards but apply thresholds for model eligibility based on trading activity. Several Asia-Pacific
        jurisdictions provide longer transition periods or simplified templates for smaller banks. Global institutions must
        therefore manage multiple rule books, reconciling differences in scope, reporting frequency, and supervisory expectations
        while maintaining a coherent enterprise framework.
      </p>
      <p>
        External transparency rounds out the prudential agenda. Pillar 3 disclosures oblige banks to describe CVA capital
        methodologies, hedging recognition, and key sensitivities. Investors and rating agencies parse these reports to gauge
        derivative risk governance and the sustainability of earnings. Clear narratives explaining year-on-year capital movements,
        regulatory feedback, and planned enhancements can bolster market confidence and reduce uncertainty premia demanded by
        stakeholders.
      </p>
      <p>
        Regulatory dialogue remains dynamic. Current consultations explore how to treat centrally cleared trades, incorporate
        sustainability-linked risk factors, and align prudential metrics more closely with accounting fair value adjustments. Banks
        that invest in flexible modelling architectures, disciplined governance, and proactive engagement with supervisors are best
        positioned to adapt. In turn, CVA capital serves not merely as a constraint but as a catalyst for resilient counterparty
        credit risk management embedded across pricing, hedging, and strategic decision-making.
      </p>
    </div>
  </div>
)

export const module2Metadata = {
  id: 2,
  title: 'Credit Valuation Adjustment (CVA)',
  description: 'Counterparty credit risk pricing and hedging fundamentals',
  subsections: [
    'Purpose and Strategic Role of CVA',
    'Mathematical Foundations of CVA',
    'Infrastructure and Operating Model for CVA',
    'Hedging CVA: Instruments and Governance',
    'Regulatory Capital Treatment of CVA'
  ],
  icon: Calculator,
  keyTerms: ['CVA', 'Exposure Simulation', 'CVA Desk', 'Wrong-Way Risk']
}

export const module2Content = {
  title: 'Module 2: Credit Valuation Adjustment (CVA)',
  subsections: {
    0: {
      title: '2.1 Purpose and Strategic Role of CVA',
      component: <SectionOne />
    },
    1: {
      title: '2.2 Mathematical Foundations of CVA',
      component: <SectionTwo />
    },
    2: {
      title: '2.3 Infrastructure and Operating Model for CVA',
      component: <SectionThree />
    },
    3: {
      title: '2.4 Hedging CVA: Instruments and Governance',
      component: <SectionFour />
    },
    4: {
      title: '2.5 Regulatory Capital Treatment of CVA',
      component: <SectionFive />
    }
  }
}
