import { ShieldCheck } from 'lucide-react'
import { BlockMath, InlineMath } from '../math/MathComponents.jsx'

export const module6Metadata = {
  id: 6,
  title: 'Capital Valuation Adjustment (KVA)',
  description: 'Pricing the cost of regulatory capital across the derivatives portfolio',
  subsections: [
    'Capital Drivers and Economic Intuition',
    'Regulatory Capital Stack and Measurement',
    'Quantifying KVA Across Time',
    'Governance, Optimisation, and Interactions'
  ],
  icon: ShieldCheck,
  keyTerms: ['KVA', 'Cost of Capital', 'Risk-Weighted Assets', 'SA-CVA']
}

export const module6Content = {
  title: 'Module 6: Capital Valuation Adjustment (KVA)',
  subsections: {
    0: {
      title: '6.1 Capital Drivers and Economic Intuition',
      component: (
        <div className="space-y-6">
          <div className="summary-box">
            <p>
              Capital Valuation Adjustment embeds the return-on-equity targets that
              shareholders demand when a bank warehouses derivative exposures. Unlike
              CVA, DVA, FVA, or MVA—which monetise expected losses, funding frictions,
              or collateral segregation—KVA prices the opportunity cost of the equity
              capital trapped by regulatory regimes. The adjustment grows when
              portfolios concentrate in illiquid products, when stress scenarios push
              risk-weighted assets higher, or when management raises hurdle rates to
              reflect strategic ambitions. Understanding these drivers ensures that
              pricing desks present deals with a risk-adjusted profitability lens
              rather than relying solely on margin or funding metrics.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Regulators expect banks to withstand severe but plausible shocks, which
              translates into buffers that sit on top of minimum capital. Those buffers
              apply even when losses never materialise, so the economic cost appears as
              a continuous drag. By including KVA in the XVA stack, institutions send a
              signal to trading desks that balance-sheet capacity is scarce and must be
              deployed on the most attractive client relationships. Ignoring KVA can
              lead to over-trading in capital-intensive structures whose apparent
              spreads fail to cover the true economic burden.
            </p>
            <p>
              A disciplined KVA framework therefore becomes a capital stewardship tool.
              Management can compare businesses on a like-for-like basis, identify
              pockets where capital charges exceed revenue, and reallocate scarce
              balance sheet capacity to portfolios with superior risk-adjusted returns.
            </p>
          </div>
        </div>
      )
    },
    1: {
      title: '6.2 Regulatory Capital Stack and Measurement',
      component: (
        <div className="space-y-6">
          <div className="summary-box">
            <p>
              KVA depends on the total capital stack assigned to counterparty credit
              and trading activities. Pillar&nbsp;1 rules enforce minimum requirements
              for default risk, CVA risk, and market risk; Pillar&nbsp;2 overlays capture
              model weaknesses or governance concerns; macro-prudential buffers—such as
              the countercyclical capital buffer—add a systemic cushion. The resulting
              capital is often expressed through risk-weighted assets (RWA) or leverage
              exposures that must be funded at the corporate hurdle rate.
            </p>
          </div>
          <div className="formula-box space-y-4">
            <h5>Example Capital Components</h5>
            <BlockMath math={String.raw`K^{\mathrm{CVA}}_{\mathrm{SA}} = \sum_{i} w_i\,S_i`} />
            <BlockMath
              math={String.raw`K^{\mathrm{IMA}}_{\mathrm{CVA}} = \sqrt{\mathrm{VaR}_{10\text{d}}^{2} + \mathrm{SVaR}_{10\text{d}}^{2}} \times \mathrm{MC}`}
            />
            <BlockMath math={String.raw`\mathrm{Capital}_{\mathrm{total}} = (K^{\mathrm{CCR}} + K^{\mathrm{CVA}} + K^{\mathrm{MR}}) \times \mathrm{Buffers}`} />
          </div>
          <div className="space-y-4">
            <p>
              Whether a bank applies the Standardised Approach (SA) or Internal Models
              Approach (IMA), each component converts exposures and sensitivities into
              capital. Default risk charges scale with exposure-at-default metrics, CVA
              capital aggregates spread sensitivities, and market risk capital handles
              residual trading book volatility. Governance committees reconcile these
              measures with finance and regulatory reporting to create a single capital
              profile that feeds KVA projections.
            </p>
          </div>
        </div>
      )
    },
    2: {
      title: '6.3 Quantifying KVA Across Time',
      component: (
        <div className="space-y-6">
          <div className="summary-box">
            <p>
              The numerical engine behind KVA projects capital balances under risk
              scenarios and discounts the excess return demanded by shareholders. The
              discrete approximation mirrors the structure used for other adjustments,
              swapping expected exposure for capital requirements:
            </p>
          </div>
          <div className="formula-box space-y-4">
            <h5>Discrete KVA Approximation</h5>
            <BlockMath
              math={String.raw`\mathrm{KVA} = \sum_{k} \mathrm{Capital}(t_k)\,\bigl(c - r(t_k)\bigr)\,D(0,t_k)\,\Delta t`}
            />
            <p>
              where <InlineMath math="c" /> is the cost of capital, <InlineMath math="r(t_k)" /> the risk-free
              rate consistent with valuation, and <InlineMath math="D(0,t_k)" /> the discount factor from time
              zero to <InlineMath math="t_k" />.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Modellers interpolate capital between quarterly reporting dates while
              preserving jumps triggered by portfolio rebalancing, methodology changes,
              or supervisory feedback. Scenario design mirrors the credit and market
              shocks used in CVA or FRTB capital so that sensitivities remain
              consistent across the stack. Sensitivity analysis highlights how shifts
              in hurdle rates, capital buffers, or exposure profiles propagate into the
              overall XVA ledger.
            </p>
          </div>
        </div>
      )
    },
    3: {
      title: '6.4 Governance, Optimisation, and Interactions',
      component: (
        <div className="space-y-6">
          <div className="summary-box">
            <p>
              Because capital cannot be hedged directly, institutions manage KVA through
              structural levers: trade compression, collateral optimisation, product
              design, and geographic booking strategy. Governance routines align the
              KVA charge embedded in pricing with the actual capital reported to
              regulators and senior management.
            </p>
          </div>
          <div className="formula-box space-y-4">
            <h5>Capital Efficiency Metrics</h5>
            <BlockMath math={String.raw`\mathrm{RACE} = \frac{\mathrm{Revenue} - \mathrm{KVA}}{\mathrm{Allocated\ Capital}}`} />
            <BlockMath math={String.raw`\mathrm{KVA\ Sensitivity} = \frac{\partial \mathrm{KVA}}{\partial c}`}
            />
          </div>
          <div className="space-y-4">
            <p>
              Integrated dashboards track profitability after KVA, FVA, and CVA so that
              desks can trade off balance-sheet usage against funding or collateral
              consumption. When collateral terms tighten, CVA may fall but initial
              margin and therefore MVA rise, feeding through to KVA via higher
              risk-weighted assets. Steering committees review these interactions,
              ensure scenario alignment, and approve remediation when capital metrics
              drift from targets. Transparent attribution keeps executives focused on
              client value while safeguarding solvency constraints.
            </p>
          </div>
        </div>
      )
    }
  }
}
