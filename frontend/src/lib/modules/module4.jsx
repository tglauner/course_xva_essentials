import { Users } from 'lucide-react'

export const module4Metadata = {
  id: 4,
  title: "Funding Valuation Adjustment (FVA)",
  description: "Funding costs and benefits in derivative valuation",
  subsections: [
    "Definition and Rationale: The Cost of Funding",
    "Mathematical Formulation: Pricing the Funding Spread",
    "Relationship with Collateral and OIS Discounting",
    "The FVA Debate: Is it a Real Cost?",
    "FVA Hedging and Management"
  ],
  icon: Users,
  keyTerms: ['FVA', 'OIS', 'EE', 'ENE']
}

export const module4Content = {
  title: "Module 4: Funding Valuation Adjustment (FVA)",
  subsections: {
    0: {
      title: "4.1 Definition and Rationale: The Cost of Funding",
      content: `
        <p>FVA accounts for the cost or benefit of funding uncollateralized derivative positions when a bank borrows above the risk-free rate.</p>
      `
    },
    1: {
      title: "4.2 Mathematical Formulation: Pricing the Funding Spread",
      content: `
        <p>FVA discounts expected funding costs or benefits at the bank's funding rate.</p>
        <div class="formula-box">
          <h5>FVA Formula</h5>
          <p><strong>FVA = Σ (Funding_Cost_Benefit_i × DF_i)</strong></p>
        </div>
      `
    },
    2: {
      title: "4.3 Relationship with Collateral and OIS Discounting",
      content: `
        <p>Collateralization reduces uncollateralized exposure and therefore lowers FVA; OIS discounting reflects the funding cost of collateral for fully collateralized trades.</p>
      `
    },
    3: {
      title: "4.4 The FVA Debate: Is it a Real Cost?",
      content: `
        <p>Practitioners debate whether FVA represents an economic cost or double-counts credit risk. Most major banks now incorporate FVA in pricing.</p>
      `
    },
    4: {
      title: "4.5 FVA Hedging and Management",
      content: `
        <p>Managing FVA requires coordination with funding desks and careful use of term funding or repos to mitigate funding spread volatility.</p>
      `
    }
  }
}
