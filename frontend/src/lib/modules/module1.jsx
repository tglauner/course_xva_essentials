import { BookOpen } from 'lucide-react'

export const module1Metadata = {
  id: 1,
  title: "Introduction to XVA",
  description: "Foundational concepts and evolution of X-Value Adjustments",
  subsections: [
    "What is XVA? The Foundational Concept",
    "Historical Context and Evolution: A Post-Crisis Paradigm Shift",
    "Overview of Derivative Instruments and Markets",
    "Limitations of Risk-Neutral Pricing",
    "The Interplay of XVA Components"
  ],
  icon: BookOpen,
  keyTerms: ['CVA', 'DVA', 'FVA', 'MVA', 'KVA', 'OIS', 'Basel III']
}

export const module1Content = {
  title: "Module 1: Introduction to XVA",
  subsections: {
    0: {
      title: "1.1 What is XVA? The Foundational Concept",
      content: `
        <p>XVA, or "X-Value Adjustment," is a collective term encompassing various financial adjustments applied to the fair value of derivative transactions. These adjustments move beyond the simplistic assumption of a risk-free world, incorporating real-world complexities such as counterparty credit risk, funding costs, and regulatory capital.</p>

        <h4>1.1.1 Core Components of XVA</h4>
        <p>Understanding XVA begins with its primary components, each addressing a specific real-world friction in financial markets:</p>
        <ul>
          <li><strong><span class="term-link" data-term="CVA">CVA (Credit Valuation Adjustment)</span>:</strong> This is the most widely recognized XVA. It quantifies the expected loss due to the counterparty's potential default on its obligations.</li>
          <li><strong><span class="term-link" data-term="DVA">DVA (Debit Valuation Adjustment)</span>:</strong> The mirror image of CVA, DVA represents the expected gain to a financial institution due to its own potential default.</li>
          <li><strong><span class="term-link" data-term="FVA">FVA (Funding Valuation Adjustment)</span>:</strong> This adjustment accounts for the funding costs or benefits associated with uncollateralized derivative positions.</li>
          <li><strong><span class="term-link" data-term="MVA">MVA (Margin Valuation Adjustment)</span>:</strong> With the advent of mandatory initial margin requirements, MVA captures the funding cost of this initial margin.</li>
          <li><strong><span class="term-link" data-term="KVA">KVA (Capital Valuation Adjustment)</span>:</strong> This component reflects the cost of holding regulatory capital against derivative exposures.</li>
        </ul>

        <h4>1.1.2 Why XVA Matters: Bridging Theory and Reality</h4>
        <p>Before the 2008 global financial crisis, derivative pricing models largely operated under idealized assumptions. The crisis starkly revealed the inadequacy of these assumptions, as institutions suffered massive losses from counterparty defaults and experienced significant funding stresses.</p>

        <div class="insight-box">
          <h5>Key Insight</h5>
          <p>XVA emerged as a critical framework to bridge the gap between theoretical risk-neutral pricing and the complex realities of financial markets.</p>
        </div>
      `
    },
    1: {
      title: "1.2 Historical Context and Evolution: A Post-Crisis Paradigm Shift",
      content: `
        <p>The journey of XVA from an academic concept to a cornerstone of derivative pricing is intrinsically linked to the financial crises of the 21st century.</p>

        <h4>1.2.1 Pre-Crisis Assumptions and Their Flaws</h4>
        <p>Prior to 2008, the prevailing derivative pricing paradigm, largely based on the Black-Scholes-Merton model, assumed a world free of counterparty default risk. Credit risk was managed through credit lines and collateral agreements, but rarely explicitly incorporated into the derivative's price.</p>

        <h4>1.2.2 The Genesis of CVA: Learning from Lehman</h4>
        <p>The collapse of Lehman Brothers in 2008 served as a brutal awakening. Banks holding derivative contracts with Lehman faced substantial losses when the firm defaulted, highlighting the immense, unpriced risk of counterparty credit.</p>

        <div class="case-study-box">
          <h5>Case Study: Lehman Brothers Impact</h5>
          <p>The Lehman Brothers default resulted in approximately $6 billion in <span class="term-link" data-term="CVA">CVA</span> losses across the financial industry, catalyzing the widespread adoption of credit valuation adjustments.</p>
        </div>

        <h4>1.2.3 The DVA Debate: Accounting vs. Economics</h4>
        <p>As <span class="term-link" data-term="CVA">CVA</span> gained traction, its logical counterpart, <span class="term-link" data-term="DVA">DVA</span>, emerged. While controversial, DVA remains a required accounting adjustment under IFRS 13 and US GAAP.</p>
      `
    },
    2: {
      title: "1.3 Overview of Derivative Instruments and Markets: The XVA Landscape",
      content: `
        <p>To fully appreciate XVA, a solid understanding of the underlying derivative instruments and the markets in which they trade is essential. XVA primarily impacts over-the-counter (OTC) derivatives, where bilateral counterparty risk is prevalent.</p>

        <h4>1.3.1 Defining Derivatives: Building Blocks of XVA</h4>
        <p>Derivatives are financial contracts whose value is derived from an underlying asset, index, or rate. Common types include:</p>
        <ul>
          <li><strong>Forwards:</strong> Customized agreements to buy or sell an asset at a specified price on a future date</li>
          <li><strong>Futures:</strong> Standardized forward contracts traded on exchanges</li>
          <li><strong>Options:</strong> Contracts giving the holder the right, but not the obligation, to buy or sell an underlying asset</li>
          <li><strong>Swaps:</strong> Agreements to exchange cash flows based on different underlying assets or rates</li>
        </ul>

        <h4>1.3.2 OTC vs. Exchange-Traded: Where XVA Lives</h4>
        <div class="comparison-box">
          <div class="comparison-item">
            <h5>Over-the-Counter (OTC) Derivatives</h5>
            <p>Customized contracts with bilateral counterparty credit risk - the primary domain of XVA</p>
          </div>
          <div class="comparison-item">
            <h5>Exchange-Traded Derivatives</h5>
            <p>Standardized contracts with central clearing - minimal XVA considerations</p>
          </div>
        </div>
      `
    },
    3: {
      title: "1.4 Limitations of Risk-Neutral Pricing: The Imperfect World",
      content: `
        <p>Risk-neutral pricing is a powerful theoretical framework, forming the bedrock of modern derivative valuation. However, its foundational assumptions often diverge from the realities of financial markets, necessitating adjustments like XVA.</p>

        <h4>1.4.1 The Idealized Assumptions</h4>
        <p>Risk-neutral pricing relies on several simplifying assumptions:</p>
        <ul>
          <li><strong>No Default Risk:</strong> All market participants are assumed to be perfectly creditworthy</li>
          <li><strong>Perfect Funding:</strong> Institutions can borrow and lend unlimited amounts at the risk-free rate</li>
          <li><strong>No Transaction Costs or Taxes:</strong> The idealized market operates without any frictions</li>
          <li><strong>Perfect Liquidity:</strong> All assets can be bought or sold instantly without impacting market prices</li>
        </ul>

        <h4>1.4.2 When Assumptions Break Down: The Need for XVA</h4>
        <p>In the real world, these assumptions rarely hold true. The 2008 financial crisis underscored these discrepancies, revealing that ignoring these real-world factors could lead to significant underpricing of risk and substantial losses.</p>

        <div class="formula-box">
          <h5>XVA Bridge Formula</h5>
          <p><strong>Fair Value = Risk-Neutral Price + XVA Adjustments</strong></p>
          <p>Where XVA = CVA + DVA + FVA + MVA + KVA</p>
        </div>
      `
    },
    4: {
      title: "1.5 The Interplay of XVA Components: A Holistic View",
      content: `
        <p>While each XVA component addresses a distinct aspect of derivative valuation, they are not isolated. They interact in complex ways, and a truly comprehensive XVA framework must consider these interdependencies.</p>

        <h4>1.5.1 CVA and DVA: The Bilateral Credit Equation</h4>
        <p><span class="term-link" data-term="CVA">CVA</span> and <span class="term-link" data-term="DVA">DVA</span> are intrinsically linked as two sides of the same coin: bilateral credit risk. Netting agreements impact both by reducing the net exposure.</p>

        <h4>1.5.2 FVA and Collateral: Funding Dynamics</h4>
        <p><span class="term-link" data-term="FVA">FVA</span> is heavily influenced by collateral agreements. Cash collateral significantly reduces uncollateralized exposure, thereby lowering the FVA.</p>

        <h4>1.5.3 Towards an Integrated XVA Framework</h4>
        <p>Modern financial institutions are moving towards integrated XVA frameworks using sophisticated Monte Carlo simulations that simultaneously model market risk, credit risk, funding costs, and margin requirements.</p>

        <div class="integration-diagram">
          <h5>XVA Integration Flow</h5>
          <p>Market Data → Monte Carlo Simulation → Exposure Profiles → XVA Components → Total Adjustment</p>
        </div>
      `
    }
  }
}
