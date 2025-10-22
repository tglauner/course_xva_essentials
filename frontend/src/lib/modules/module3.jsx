import { TrendingUp } from 'lucide-react'
import { BlockMath, InlineMath } from '@/lib/math/MathComponents.jsx'

const SectionOne = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        Debit Valuation Adjustment (DVA) quantifies the positive valuation impact arising from a bank's own default risk embedded
        in derivative liabilities. It mirrors CVA by focusing on the institution's probability of failing to perform when exposures
        are negative to the bank, capturing the expected gain counterparties attribute to potential non-payment. Modern accounting
        frameworks such as IFRS 13 and ASC 820 require incorporating own-credit risk into fair value measures, making DVA integral
        to pricing, reporting, and risk dialogue. The summary emphasises drivers, including funding strategy, collateral practices,
        close-out conventions, and the broader balance-sheet interplay linking capital, liquidity, and performance management
        disciplines today.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">Liability Fair Value Decomposition</p>
        <BlockMath math="V_{\text{liability}} = V_{\text{risk-free}} + \mathrm{DVA}" />
        <BlockMath
          math="\mathrm{DVA} = \mathbb{E}^Q\left[D(0, \tau_{\text{bank}}) (1 - R_{\text{bank}}) (-V_{\tau_{\text{bank}}})^+ \mathbf{1}_{\{\tau_{\text{bank}} \le T\}}\right]"
        />
      </div>
    </div>
    <div className="in-depth space-y-4">
      <p>
        DVA emerged as the balance-sheet mirror of CVA when practitioners formalised counterparty credit adjustments following the
        2007–2009 crisis. Conceptually, it arises because a derivative liability is worth less than its risk-free equivalent if the
        issuer might default before settling the obligation. Investors will pay a lower price for the liability, so the bank
        records an apparent gain relative to the risk-free mark. This effect is strongest for uncollateralised portfolios with
        material negative mark-to-market values and for institutions whose unsecured funding spread materially exceeds the
        overnight indexed swap curve.
      </p>
      <p>
        The rationale for recognising DVA is anchored in exit-price measurement. IFRS 13 and ASC 820 define fair value as the price
        received to sell an asset or paid to transfer a liability in an orderly transaction. Transferring a liability embeds the
        market’s perception of the bank’s credit quality. When the bank’s credit spread widens, investors demand a discount to
        assume its obligations, lowering the fair value of the liability. The differential between the risk-free and credit-adjusted
        valuation is captured through DVA, ensuring reported fair values align with observable market pricing conventions,
        including own-credit risk premia implied by the bank’s bonds and credit default swaps.
      </p>
      <p>
        DVA therefore integrates information from capital markets into derivative valuations. It links the trading book to the
        treasury desk because funding strategies that improve the bank’s unsecured funding curve directly reduce own-credit spreads,
        thereby shrinking DVA. Conversely, stress in funding markets transmits swiftly to valuation because wider spreads increase
        the expected loss given the bank’s default. The effect is amplified when collateral agreements permit thresholds or minimum
        transfer amounts, leaving larger unsecured exposures that would be written down in a default scenario.
      </p>
      <p>
        The size of DVA also depends on close-out conventions. Under ISDA documentation, a bank’s default typically triggers
        replacement close-out, with the surviving party calculating the loss using mid-market quotes and deducting any collateral
        held. In such scenarios, any residual negative exposure represents the potential gain for the bank’s shareholders. However,
        if close-out netting sets the value to zero through an auction or reference market quotation that already includes the bank’s
        credit spread, the incremental DVA might be narrower. Understanding contract language and credit support annex (CSA)
        provisions is therefore crucial to modelling the adjustment accurately.
      </p>
      <p>
        Risk appetite and governance frameworks extend the rationale. Because DVA is a source of profit that materialises precisely
        when the bank’s solvency is questioned, boards must ensure stakeholders understand that the gain does not translate into
        distributable cash. Regulatory capital metrics, liquidity coverage ratios, and resolution planning seldom credit DVA fully,
        meaning management cannot rely on the accounting benefit to absorb losses. Consequently, most institutions treat DVA as a
        valuation measure necessary for market consistency, while maintaining a conservative stance when forecasting earnings or
        managing dividends.
      </p>
      <p>
        Finally, DVA plays a role in product strategy. Client clearing services, long-dated structured notes, and bespoke swaps can
        create persistent negative mark-to-market positions. Incorporating DVA incentivises structurers to negotiate tighter collateral
        terms, include downgrade triggers, or embed break clauses. Each design choice reduces unsecured exposure and hence moderates
        the own-credit adjustment. Without recognising DVA, banks might underprice such features, accept inefficient collateral
        arrangements, or ignore the asymmetric risk that negative exposures pose to shareholders under distressed exit scenarios.
      </p>
      <p>
        Forward-looking analytics also integrate DVA into stress-testing and resolution planning. Resolution simulations project how
        contractual close-out, collateral auctions, and bail-in mechanisms would unfold under severe economic shocks. Embedding DVA
        within those scenarios clarifies the extent to which derivative liabilities might shrink upon entry into resolution,
        supporting assessments of minimum requirement for own funds and eligible liabilities (MREL) and total loss-absorbing capacity
        (TLAC) buffers.
      </p>
      <p>
        In summary, DVA exists because fair value principles demand that valuations reflect all market-observable inputs, including
        the bank’s credit standing. It connects trading outcomes with funding conditions, contractual mechanics, and strategic
        decision-making. Treating the adjustment consistently ensures transparency for investors and provides an analytical bridge
        between derivative valuation teams, treasury functions, and senior management charged with safeguarding the institution’s
        resilience.
      </p>
    </div>
  </div>
)

const SectionTwo = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        The quantitative expression of DVA mirrors CVA by replacing counterparty parameters with the bank’s own default
        characteristics. Expected negative exposures, calibrated default probabilities, loss-given-default assumptions, and
        appropriate discounting jointly determine the size of the adjustment. Implementations span discrete scenario aggregation,
        continuous-time intensity models, and simulation-based frameworks that capture netting sets and collateral flows. Accurate
        modelling requires alignment between trading data, credit curves, and close-out mechanics, while ensuring replication with
        own bonds or credit default swaps remains theoretically coherent. Sensitivity analysis and stress testing translate these
        building blocks into risk numbers consumed by desks, finance, and governance committees across oversight forums.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">Core DVA Expressions</p>
        <BlockMath
          math="\mathrm{DVA} = (1 - R_{\text{bank}}) \int_0^T \mathbb{E}^Q\left[D(0, t) (V_t)^-\right]\, dPD_{\text{bank}}(t)"
        />
        <BlockMath
          math="\mathrm{DVA} \approx \sum_{i=1}^n ENE_i \cdot \Delta PD_{\text{bank}}(t_i) \cdot LGD_{\text{bank}} \cdot DF(t_i)"
        />
        <BlockMath math="ENE_i = \mathbb{E}[\max(-V(t_i), 0) \mid \mathcal{F}_0]" />
      </div>
    </div>
    <div className="in-depth space-y-4">
      <p>
        The mathematical framework underpinning DVA relies on the same expectation operator that defines CVA, but flips the sign of
        exposure and substitutes the bank’s hazard rate for the counterparty’s. Start with a derivative portfolio value process
        <InlineMath math="V(t)" />. When the bank owes money, <InlineMath math="V(t)" /> becomes negative, and the counterparty faces
        exposure to the bank’s default. DVA quantifies the present value of the reduction in liability that would occur if the bank
        were to default before the contractual maturity, after accounting for collateral and close-out rules.
      </p>
      <p>
        In a continuous-time formulation, the bank’s default time <InlineMath math="\tau_{\text{bank}}" /> is modelled as a stopping
        time with intensity <InlineMath math="\lambda_{\text{bank}}(t)" />. The expectation <InlineMath math="\mathbb{E}[1_{\{\tau_{\text{bank}} \in dt\}}] = \lambda_{\text{bank}}(t) dt" />
        converts to the marginal default probability density. The discounted expected gain from default is integrated across the
        maturity horizon, producing the integral expression for DVA. This representation highlights the levers available to risk
        managers: reducing negative exposure paths lowers the integrand, tightening funding spreads reduces the intensity, and
        collateralising liabilities diminishes the loss-given-default term.
      </p>
      <p>
        Discrete-time implementations dominate practice because exposure profiles typically arise from Monte Carlo simulations or
        scenario grids aligned with regulatory capital models. Portfolio simulation engines generate pathwise values for each future
        date, incorporating netting agreements, collateral thresholds, and optional close-out timing. Expected negative exposure at
        each time bucket is calculated as the average of <InlineMath math="\max(-V(t_i), 0)" /> across scenarios. Conditional on these
        metrics, default probability weights derive from credit curves. Institutions often bootstrap hazard rates from traded senior
        unsecured bond spreads or credit default swap premiums using reduced-form models.
      </p>
      <p>
        Loss-given-default assumptions introduce further nuance. Accounting DVA commonly uses senior unsecured recovery assumptions
        consistent with resolution frameworks, typically between 35% and 45%, implying LGD between 55% and 65%. Some desks layer
        scenario-dependent LGDs to capture structural subordination, collateral segregation, or deposit preference. When the bank
        issues structured notes secured by specific collateral pools, negative exposures may be partially recoverable, reducing LGD
        and hence DVA. Documentation review is therefore essential to avoid overstating the adjustment by applying generic LGD inputs
        indiscriminately.
      </p>
      <p>
        Discounting links DVA to the chosen valuation measure. Under collateralised valuation practices, risk-free discount factors
        derived from overnight indexed swaps are applied. For uncollateralised liabilities, many institutions still adopt OIS
        discounting to remain consistent with CVA, while treating funding valuation adjustment separately. This ensures aggregation
        across valuation adjustments does not double-count funding effects. Nevertheless, some treasury-aligned desks opt to discount
        using the bank’s unsecured funding curve, effectively embedding a portion of funding benefit directly into DVA. Governance
        policies must clarify the chosen convention to maintain comparability across desks and reporting periods.
      </p>
      <p>
        Because DVA represents a stochastic expectation, sensitivity analysis is indispensable. Key Greeks include sensitivity to hazard
        rate shifts (DVA credit delta), to changes in recovery assumptions (LGD sensitivity), and to exposure shocks (DVA exposure delta).
        Scenario analysis explores wrong-way risk, where the bank’s default intensity correlates with negative exposure drivers—such as a
        domestic recession simultaneously impairing the bank’s credit and causing client derivatives to move out-of-the-money.
        Quantifying such correlations requires joint simulation or copula-based techniques, otherwise the model may understate DVA in
        stressed environments.
      </p>
      <p>
        Validation teams scrutinise DVA models through benchmarking and backtesting. Benchmarking compares the computed adjustment with
        simplified analytical formulas or peer metrics derived from observable bond spreads versus derivative liabilities.
        Backtesting, while challenging because own default events are rare, can examine how historical exposure paths and credit spreads
        would have influenced DVA, providing insights into model stability. Independent price verification often supplements this by
        ensuring that the underlying inputs—such as credit curves and collateral parameters—are sourced from independently validated
        systems.
      </p>
      <p>
        Finally, systems integration underpins accurate DVA calculation. Real-time exposure metrics must feed risk dashboards so trading
        desks understand the adjustment’s drivers. Data lineage from deal capture to valuation engine must be documented, satisfying
        regulatory expectations around model risk management. Through this rigorous mathematical machinery, DVA moves from a conceptual
        mirror image of CVA to a quantifiable, auditable component of derivative pricing and balance-sheet reporting.
      </p>
    </div>
  </div>
)

const SectionThree = () => (
  <div className="space-y-6">
    <div className="summary-box">
      <p>
        DVA remains controversial because recognising profits when a bank’s credit quality deteriorates challenges intuitions about
        prudent risk management. This subsection explores the debate across accounting, regulatory, investor, and governance
        perspectives, unpacking prudential filters, disclosure expectations, and the optics of hedging one’s own default risk. It
        concludes by framing communication strategies that preserve transparency while acknowledging DVA’s conceptual complexities and
        practical limitations in modern financial institutions.
      </p>
    </div>
    <div className="formula-box space-y-4">
      <div>
        <p className="text-blue-900 font-semibold">Regulatory and Accounting Filters</p>
        <BlockMath math="V_{\text{IFRS 13}} = V_{\text{market}}" />
        <BlockMath math="\text{CET1}_{\text{prudential}} = \text{Reported Equity} - \mathrm{DVA}_{\text{prudential filter}}" />
        <BlockMath math="\text{Hedge Effectiveness} = \frac{\Delta \mathrm{DVA} - \Delta \text{Hedge}}{\Delta \mathrm{DVA}}" />
      </div>
    </div>
    <div className="in-depth space-y-4">
      <p>
        Accounting standards resolve the debate by prioritising exit price. IFRS 13 and ASC 820 compel entities to measure liabilities
        using assumptions that market participants would apply, explicitly including non-performance risk. Auditors require robust
        valuation processes demonstrating how credit spreads are sourced, how exposures are computed, and how these inputs converge into
        the reported adjustment. Finance teams must therefore maintain a documented methodology, subject to model risk governance, to
        satisfy both accounting and regulatory scrutiny.
      </p>
      <p>
        Regulators take a more sceptical stance. Basel III capital rules originally filtered CVA gains and losses through other
        comprehensive income to dampen volatility. For DVA, authorities concluded that recognising own-credit gains in regulatory capital
        could mask deterioration in solvency. Consequently, many jurisdictions apply prudential filters removing DVA gains from Common
        Equity Tier 1 (CET1) capital. This disconnect between accounting equity and regulatory capital complicates internal performance
        measurement: traders may observe profit and loss benefits, yet treasury cannot rely on those gains to meet capital ratios.
        Reconciling these figures demands close coordination between finance, risk, and regulatory reporting teams.
      </p>
      <p>
        Pro-cyclicality remains a central concern. During systemic stress, both counterparty and own-credit spreads widen. For banks with
        large uncollateralised client portfolios, DVA gains can be substantial just as liquidity dries up and funding costs escalate.
        Stakeholders worry that reporting profits in such circumstances could undermine confidence or mislead investors about underlying
        health. Many institutions therefore adjust management reporting to exclude DVA from core earnings, presenting it as a separate
        valuation component alongside CVA and funding adjustments. Transparent disclosure helps analysts differentiate accounting artefacts
        from cash-generating performance.
      </p>
      <p>
        Hedging DVA poses practical and ethical dilemmas. Theoretical hedges involve buying protection on the bank’s own credit via CDS or
        structured instruments referencing self-issued debt. Executing such trades can be problematic: markets may interpret the hedge as a
        signal that management fears default, potentially exacerbating spread widening. Moreover, accounting standards may preclude
        recognising hedge effectiveness if trades are deemed self-dealing. Some banks explore proxy hedges using indices or peer CDS, yet
        basis risk remains high, and regulators may question whether such strategies genuinely mitigate own-credit exposure.
      </p>
      <p>
        Governance over DVA relies on rigorous model validation and independent price verification. Because the adjustment draws on multiple
        data sources—exposure simulations, credit curves, collateral terms—model risk teams test sensitivities, review fallback procedures,
        and ensure continuity during market stress. Senior oversight committees review DVA movements, comparing them with changes in bond
        spreads, funding costs, and liquidity metrics. This oversight is particularly important when DVA materially affects reported profit
        and loss, as boards must articulate why earnings moved in response to credit spread dynamics rather than business volumes.
      </p>
      <p>
        Controversies also extend to disclosure practices. Investors increasingly demand granularity on valuation adjustments, including
        DVA, CVA, FVA, and MVA components. Some regulators, such as the European Banking Authority, encourage banks to provide qualitative
        explanations and quantitative breakdowns within Pillar 3 reports. Clear communication helps stakeholders understand how DVA
        interacts with other adjustments, mitigating the risk that headline figures are misinterpreted. Leading institutions produce
        sensitivity analyses showing the impact of credit spread shocks, thereby contextualising potential volatility.
      </p>
      <p>
        From a strategic perspective, DVA underscores the importance of creditworthiness as a competitive differentiator. Banks with
        stronger balance sheets and narrower spreads report smaller DVA swings, enjoying more stable earnings profiles. This reinforces
        incentives for prudent funding strategies, diversified investor bases, and robust liquidity buffers. Conversely, institutions with
        volatile spreads face larger DVA fluctuations, which can complicate pricing negotiations with clients and degrade confidence in
        financial results.
      </p>
      <p>
        Ultimately, the controversy is unlikely to disappear because DVA sits at the intersection of accounting theory, market practice,
        and prudential supervision. Effective management involves acknowledging the adjustment’s conceptual validity, mitigating its
        pro-cyclical optics through disciplined communication, and aligning internal metrics with regulatory expectations. By embedding DVA
        within a transparent governance framework, banks can balance the competing demands of faithful representation, investor
        understanding, and supervisory prudence.
      </p>
    </div>
  </div>
)

export const module3Metadata = {
  id: 3,
  title: 'Debit Valuation Adjustment (DVA)',
  description: "Own credit risk adjustments and accounting controversies",
  subsections: [
    "Definition and Rationale: The Bank's Own Credit Risk",
    'Mathematical Formulation: Mirroring CVA',
    'Controversies and Accounting Treatment of DVA'
  ],
  icon: TrendingUp,
  keyTerms: ['DVA', 'ENE', 'LGD', 'Right-Way Risk']
}

export const module3Content = {
  title: 'Module 3: Debit Valuation Adjustment (DVA)',
  subsections: {
    0: {
      title: "3.1 Definition and Rationale: The Bank's Own Credit Risk",
      component: <SectionOne />
    },
    1: {
      title: '3.2 Mathematical Formulation: Mirroring CVA',
      component: <SectionTwo />
    },
    2: {
      title: '3.3 Controversies and Accounting Treatment of DVA',
      component: <SectionThree />
    }
  }
}
