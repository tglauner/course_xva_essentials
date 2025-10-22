import { Award } from 'lucide-react'

export const module5Metadata = {
  id: 5,
  title: "Margin Valuation Adjustment (MVA)",
  description: "Initial margin funding costs and regulatory impact",
  subsections: [
    "Definition and Rationale: The Cost of Initial Margin",
    "Mathematical Formulation: Projecting Future IM Costs",
    "Initial Margin Models: Standardized vs. Internal",
    "MVA Hedging and Management: A Complex Endeavor",
    "Regulatory Impact: Driving Behavioral Change"
  ],
  icon: Award,
  keyTerms: ['MVA', 'ISDA SIMM', 'EE']
}

export const module5Content = {
  title: "Module 5: Margin Valuation Adjustment (MVA)",
  subsections: {
    0: {
      title: "5.1 Definition and Rationale: The Cost of Initial Margin",
      content: `
        <p>MVA captures the funding cost of posting initial margin required for non-centrally cleared derivatives.</p>
      `
    },
    1: {
      title: "5.2 Mathematical Formulation: Projecting Future IM Costs",
      content: `
        <p>MVA is the present value of expected future funding costs of initial margin.</p>
        <div class="formula-box">
          <h5>MVA Formula</h5>
          <p><strong>MVA = Σ (EIM_i × Funding_Spread × dt × DF_i)</strong></p>
        </div>
      `
    },
    2: {
      title: "5.3 Initial Margin Models: Standardized vs. Internal",
      content: `
        <p>Regulators endorse the ISDA SIMM for standardization, while some institutions employ approved internal models to estimate initial margin.</p>
      `
    },
    3: {
      title: "5.4 MVA Hedging and Management",
      content: `
        <p>Hedging MVA involves margin-efficient trade structures and dedicated funding strategies to cover segregated collateral.</p>
      `
    },
    4: {
      title: "5.5 Regulatory Impact: Driving Behavioral Change",
      content: `
        <p>Initial margin rules under the BCBS-IOSCO framework have increased collateral demand, spurring product innovation and influencing trade profitability.</p>
      `
    }
  }
}
