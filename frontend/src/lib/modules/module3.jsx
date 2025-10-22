import { TrendingUp } from 'lucide-react'

export const module3Metadata = {
  id: 3,
  title: "Debit Valuation Adjustment (DVA)",
  description: "Own credit risk adjustments and accounting controversies",
  subsections: [
    "Definition and Rationale: The Bank's Own Credit Risk",
    "Mathematical Formulation: Mirroring CVA",
    "Controversies and Accounting Treatment of DVA"
  ],
  icon: TrendingUp,
  keyTerms: ['DVA', 'ENE', 'LGD', 'Right-Way Risk']
}

export const module3Content = {
  title: "Module 3: Debit Valuation Adjustment (DVA)",
  subsections: {
    0: {
      title: "3.1 Definition and Rationale: The Bank's Own Credit Risk",
      content: `
        <p>Debit Valuation Adjustment (DVA) is the mirror image of CVA. While CVA accounts for the risk of a counterparty defaulting on its obligations to the bank, DVA reflects the risk of the bank itself defaulting on its obligations to the counterparty.</p>

        <h4>3.1.1 Why DVA Is Included</h4>
        <p>Under fair value accounting principles such as IFRS 13, financial liabilities are valued at the price required to transfer the liability to a third party. If a bank's own creditworthiness deteriorates, the cost of transferring its liabilities decreases. This reduction is recognized as a gain, making DVA a positive adjustment to the derivative's value.</p>
      `
    },
    1: {
      title: "3.2 Mathematical Formulation: Mirroring CVA",
      content: `
        <p>The mathematical formulation of DVA mirrors that of CVA but uses the bank's own probability of default and expected negative exposure.</p>

        <div class="formula-box">
          <h5>DVA Formula</h5>
          <p><strong>DVA = LGD_bank × ENE</strong></p>
        </div>

        <p>Where:</p>
        <ul>
          <li><strong>LGD_bank:</strong> Loss Given Default of the bank.</li>
          <li><strong>ENE:</strong> Expected Negative Exposure, the weighted average of negative exposures over the life of the transaction, weighted by the bank's default probabilities.</li>
        </ul>

        <h4>3.2.1 Discrete DVA Formula</h4>
        <p><strong>DVA = Σ (ENE_i × PD_bank_i × LGD_bank × DF_i)</strong></p>
        <ul>
          <li><strong>ENE_i:</strong> Expected Negative Exposure at time t_i</li>
          <li><strong>PD_bank_i:</strong> Probability of default of the bank in the interval (t_{i-1}, t_i]</li>
          <li><strong>LGD_bank:</strong> Loss Given Default of the bank</li>
          <li><strong>DF_i:</strong> Discount factor to time t_i</li>
        </ul>
      `
    },
    2: {
      title: "3.3 Controversies and Accounting Treatment of DVA",
      content: `
        <p>DVA has generated significant debate because it implies that a bank benefits financially from a deterioration in its own credit quality.</p>
        <ul>
          <li><strong>Accounting Standards:</strong> Despite the controversy, DVA is generally required under fair value accounting standards such as IFRS 13 and US GAAP, which mandate that the fair value of a liability reflect the institution's own credit risk.</li>
          <li><strong>Pro-cyclicality:</strong> During periods of financial stress, a bank's credit spread widens, increasing DVA and potentially creating gains when the bank is already under pressure, which can present a misleading picture of financial health.</li>
          <li><strong>Hedging DVA:</strong> Hedging DVA is challenging. Buying protection on the bank's own debt to hedge DVA can signal negative information to the market about the bank's creditworthiness.</li>
        </ul>
      `
    }
  }
}
