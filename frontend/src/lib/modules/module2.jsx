import { Calculator } from 'lucide-react'

export const module2Metadata = {
  id: 2,
  title: "Credit Valuation Adjustment (CVA)",
  description: "Comprehensive analysis of counterparty credit risk adjustments",
  subsections: [
    "Definition and Rationale: Quantifying Counterparty Risk",
    "Mathematical Formulation: Deconstructing the Expected Loss",
    "Practical Aspects: Challenges and Methodologies",
    "CVA Hedging and Management: Mitigating Volatility",
    "Regulatory Capital for CVA: A Prudential Framework"
  ],
  icon: Calculator,
  keyTerms: ['CVA', 'LGD', 'EPE', 'PD', 'EE', 'Wrong-Way Risk', 'CDS', 'Basel III']
}

export const module2Content = {
  title: "Module 2: Credit Valuation Adjustment (CVA)",
  subsections: {
    0: {
      title: "2.1 Definition and Rationale: Quantifying Counterparty Risk",
      content: `
        <p><span class="term-link" data-term="CVA">Credit Valuation Adjustment (CVA)</span> is arguably the most critical and widely discussed component of XVA. It represents the market value of the credit risk of a counterparty in a derivative transaction.</p>

        <h4>2.1.1 The Imperative of CVA: Beyond Risk-Neutrality</h4>
        <p>Traditional risk-neutral pricing models assume that all market participants are perfectly creditworthy. The 2008 financial crisis brutally exposed the fallacy of this assumption when institutions suffered immense losses from counterparty defaults.</p>

        <div class="formula-box">
          <h5>CVA Formula</h5>
          <p><strong>CVA = <span class="term-link" data-term="LGD">LGD</span> × <span class="term-link" data-term="EPE">EPE</span></strong></p>
          <p>Where LGD is Loss Given Default and EPE is Expected Positive Exposure</p>
        </div>

        <h4>2.1.2 CVA as a Credit Default Swap (CDS) Analogy</h4>
        <p>Conceptually, CVA can be thought of as the premium a bank would pay to purchase a <span class="term-link" data-term="CDS">credit default swap (CDS)</span> on its counterparty.</p>

        <h4>2.1.3 Key Drivers of CVA</h4>
        <ul>
          <li><strong>Counterparty Credit Quality:</strong> Higher <span class="term-link" data-term="PD">probability of default</span> leads to higher CVA</li>
          <li><strong>Exposure:</strong> The potential future exposure of the derivative transaction</li>
          <li><strong>Recovery Rate:</strong> Lower recovery rates imply higher <span class="term-link" data-term="LGD">LGD</span></li>
          <li><strong>Maturity:</strong> Longer-dated derivatives generally have higher CVA</li>
          <li><strong>Collateral and Netting:</strong> These risk mitigants significantly reduce CVA</li>
        </ul>
      `
    },
    1: {
      title: "2.2 Mathematical Formulation: Deconstructing the Expected Loss",
      content: `
        <p>CVA is calculated by combining expected exposure profiles with the counterparty's default likelihood and loss given default.</p>
        <div class="formula-box">
          <h5>Discrete CVA Formula</h5>
          <p><strong>CVA = Σ (EE_i × PD_i × LGD × DF_i)</strong></p>
        </div>
        <p>Key components include exposure at default, probabilities of default from credit spreads, and recovery assumptions captured by LGD.</p>
      `
    },
    2: {
      title: "2.3 Practical Aspects: Challenges and Methodologies",
      content: `
        <p>Implementing CVA in practice involves several hurdles:</p>
        <ul>
          <li><strong>Monte Carlo Simulation:</strong> projects future exposures for complex portfolios.</li>
          <li><strong>Credit Spreads:</strong> market liquidity and calibration affect derived default probabilities.</li>
          <li><strong>Netting & Collateral:</strong> legal agreements that reduce exposure and CVA.</li>
          <li><strong>Wrong-Way Risk:</strong> adverse correlation between exposure and counterparty credit quality.</li>
        </ul>
      `
    },
    3: {
      title: "2.4 CVA Hedging and Management: Mitigating Volatility",
      content: `
        <p>CVA is the expected loss from counterparty default embedded in derivative pricing. Its value moves with exposures and credit spreads, generating profit-and-loss volatility that banks must actively manage.</p>

        <h4>2.4.1 The Mandate of CVA Desks</h4>
        <p>Large institutions operate dedicated CVA desks that quote CVA charges on new trades so business lines internalize counterparty credit costs. The desk tracks exposures and CVA Greeks, rebalancing hedges to stabilize daily P&L and supporting stress testing, capital forecasting, and regulatory communication.</p>

        <h4>2.4.2 Common Hedging Instruments</h4>
        <p>The core hedging toolkit consists of credit derivatives. Single-name CDS offset losses from specific counterparty defaults, while index CDS such as CDX or iTraxx act as liquid proxies when single-name markets are thin. Options on CDS, credit-linked notes, bond shorts, and supplementary rate or FX derivatives address non-linear exposure or maturity mismatches.</p>

        <h4>2.4.3 Challenges in CVA Hedging</h4>
        <p>Perfect hedges are rare. Basis risk arises when the CDS reference entity differs from the legal counterparty. Liquidity for bespoke names can vanish, forcing reliance on proxies that only partly track exposure. Dynamic rebalancing is needed as spreads jump, yet defaults can still leave residual losses. Model uncertainty, hedge accounting mismatches, and the funding cost of protection add further complexity.</p>

        <h4>2.4.4 Governance and Communication</h4>
        <p>Effective CVA programs rely on governance frameworks that define limits, escalate breaches, and document hedging rationale. Regular reporting translates technical metrics for senior management, auditors, and regulators. Coordination with collateral management, treasury, and finance ensures consistent pricing and funding treatment, while transparent communication of CVA costs guides collateral negotiations and counterparty selection.</p>
      `
    },
    4: {
      title: "2.5 Regulatory Capital for CVA: A Prudential Framework",
      content: `
        <p>Under Basel III, regulators formally recognized that counterparty credit risk in derivatives is not fully captured by default risk alone. Instead, fluctuations in the <em>market value</em> of counterparty risk—known as Credit Valuation Adjustment (CVA)—can drive significant volatility in a bank’s profit and loss. To ensure that institutions remain resilient against these risks, Basel III introduced a dedicated <em>capital charge for CVA risk</em>. This charge serves as a prudential buffer, requiring banks to hold additional capital against unexpected losses arising not from outright default alone, but from credit spread movements that affect the valuation of derivative exposures.</p>
        <p>The CVA capital framework covers two principal dimensions of risk. First, it addresses <em>spread volatility</em>, reflecting the sensitivity of derivative valuations to movements in counterparty credit spreads. Even without a default event, widening spreads can reduce the value of derivative receivables, creating losses. Second, it incorporates <em>jump-to-default</em> risk, which captures the possibility of sudden counterparty failure. Together, these components ensure that the capital charge is forward-looking, providing coverage against both gradual and abrupt credit shocks.</p>
        <p>From an implementation perspective, Basel III provides banks with two broad approaches:</p>
        <ol>
          <li><strong>Standardized Approach (SA-CVA):</strong> The standardized method applies prescribed formulas and regulatory risk weights to determine capital requirements. It is designed for smaller or less complex banks that may lack the resources to build sophisticated internal models. While simpler to apply, it is less sensitive to the nuances of a bank’s actual counterparty exposures and hedging strategies.</li>
          <li><strong>Advanced Approach (IMA-CVA):</strong> The advanced method allows banks, subject to supervisory approval, to employ internal models to capture their own exposure dynamics, hedging strategies, and portfolio diversification. This approach is more risk-sensitive and better aligned with economic reality but comes with higher model validation, governance, and data requirements. Only banks with strong quantitative infrastructure and robust risk management practices are permitted to adopt it.</li>
        </ol>
        <p>The prudential rationale behind these requirements is clear: CVA losses during the 2008 financial crisis were a major source of stress for global banks, with billions of dollars written down due to counterparty spread widening. Regulators concluded that capital frameworks that focused only on default events were insufficient. By assigning explicit capital to CVA risk, Basel III ensures that institutions internalize the cost of counterparty risk management, discouraging excessive build-up of unhedged derivative exposures.</p>
        <p>Beyond compliance, these rules have reshaped market practice. Many banks have established dedicated <em>CVA desks</em> responsible for pricing, managing, and hedging CVA risk. The cost of capital linked to CVA now directly influences product pricing, client negotiations, and even strategic decisions about which counterparties to face. Furthermore, the choice between standardized and advanced approaches has competitive implications: banks using internal models may optimize capital more efficiently but must also bear the cost of maintaining sophisticated infrastructure.</p>
        <p>In sum, the Basel III framework for regulatory capital on CVA represents a critical step in aligning regulatory standards with market reality. It extends beyond traditional default risk, capturing the market-driven valuation swings that can undermine solvency. By doing so, it not only strengthens the resilience of individual banks but also enhances the stability of the global financial system.</p>
      `
    }
  }
}
