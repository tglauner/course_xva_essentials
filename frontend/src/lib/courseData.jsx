import { module1Metadata, module1Content } from './modules/module1.jsx'
import { module2Metadata, module2Content } from './modules/module2.jsx'
import { module3Metadata, module3Content } from './modules/module3.jsx'
import { module4Metadata, module4Content } from './modules/module4.jsx'
import { module5Metadata, module5Content } from './modules/module5.jsx'
import { module6Metadata, module6Content } from './modules/module6.jsx'
import { module7Metadata, module7Content } from './modules/module7.jsx'
import { module8Metadata, module8Content } from './modules/module8.jsx'

export const glossary = {
    'CVA': {
      term: 'Credit Valuation Adjustment',
      definition: 'The expected loss on positive exposures when a counterparty defaults, combining exposure profiles, default probabilities, and loss-given-default.',
      formula: 'CVA = (1 - R) ∫_0^T E^Q[D(0, t) (V_t)^+] dPD(t)'
    },
    'DVA': {
      term: 'Debit Valuation Adjustment',
      definition: 'The valuation uplift that reflects the bank\'s own default risk and the potential benefit on liabilities if the bank fails.',
      formula: 'DVA = (1 - R_bank) ∫_0^T E^Q[D(0, t) (V_t)^-] dPD_bank(t)'
    },
    'FVA': {
      term: 'Funding Valuation Adjustment',
      definition: 'The cost of funding hedge cashflows at spreads above the risk-free or OIS curve, especially for uncollateralized exposures.',
      formula: 'FVA = FVA_long + FVA_short'
    },
    'MVA': {
      term: 'Margin Valuation Adjustment',
      definition: 'The funding drag created by segregated initial margin that cannot be rehypothecated for cleared or bilateral derivatives.',
      formula: 'MVA = Σ (EIM × Funding_Spread × dt × DF)'
    },
    'KVA': {
      term: 'Capital Valuation Adjustment',
      definition: 'The cost of holding regulatory capital over the life of the trade, typically priced at the institution\'s hurdle rate.',
      formula: 'KVA = Capital_Required × Cost_of_Capital'
    },
    'LGD': {
      term: 'Loss Given Default',
      definition: 'The percentage of the exposure that is lost if a default occurs. Typically expressed as (1 - Recovery Rate).',
      formula: 'LGD = 1 - Recovery Rate'
    },
    'EPE': {
      term: 'Expected Positive Exposure',
      definition: 'The weighted average of the expected exposure over the life of the transaction, considering only positive values.',
      formula: 'EPE = Σ (EE_i × PD_i × DF_i)'
    },
    'ENE': {
      term: 'Expected Negative Exposure',
      definition: 'The weighted average of the expected negative exposure over the life of the transaction.',
      formula: 'ENE = Σ (ENE_i × PD_i × DF_i)'
    },
    'PD': {
      term: 'Probability of Default',
      definition: 'The likelihood that a counterparty will default over a specific period.',
      formula: 'Derived from credit spreads or historical data'
    },
    'EE': {
      term: 'Expected Exposure',
      definition: 'The expected value of the exposure at a future point in time, considering only positive mark-to-market values.',
      formula: 'Calculated via Monte Carlo simulation'
    },
    'OIS': {
      term: 'Overnight Index Swap',
      definition: 'An interest rate swap where the floating leg is tied to an overnight rate index. Used as the standard discount rate for collateralized derivatives.',
      formula: 'Standard market rate for collateral funding'
    },
    'ISDA SIMM': {
      term: 'ISDA Standard Initial Margin Model',
      definition: 'A standardized methodology for calculating initial margin for non-centrally cleared derivatives.',
      formula: 'Risk-based calculation using sensitivities'
    },
    'Wrong-Way Risk': {
      term: 'Wrong-Way Risk',
      definition: 'When the exposure to a counterparty is adversely correlated with the counterparty\'s credit quality.',
      formula: 'Requires joint modeling of market and credit risk'
    },
    'Right-Way Risk': {
      term: 'Right-Way Risk',
      definition: 'When exposure decreases as the counterparty\'s credit quality deteriorates.',
      formula: 'Beneficial correlation between exposure and credit'
    },
    'Basel III': {
      term: 'Basel III',
      definition: 'International regulatory framework for banks that includes specific capital charges for CVA risk.',
      formula: 'Regulatory capital requirements'
    },
    'CDS': {
      term: 'Credit Default Swap',
      definition: 'A financial derivative that allows an investor to swap or offset their credit risk with that of another investor.',
      formula: 'Premium = PD × LGD × Notional'
    },
    'Hurdle Rate': {
      term: 'Hurdle Rate',
      definition: 'The minimum return on equity that a bank targets when deploying capital, used to price KVA and evaluate risk-adjusted profitability.',
      formula: 'Required Capital Cost = Capital_Required × Hurdle_Rate'
    },
    'CCP': {
      term: 'Central Counterparty (CCP)',
      definition: 'A clearing house that interposes itself between buyers and sellers, novating trades, collecting margin, and mutualising default losses via a funded default waterfall.',
      formula: 'Resources = IM + VM + Default Fund + CCP Equity'
    }
  }

export const modules = [
  module1Metadata,
  module2Metadata,
  module3Metadata,
  module4Metadata,
  module5Metadata,
  module6Metadata,
  module7Metadata,
  module8Metadata
]

export const moduleContent = {
  1: module1Content,
  2: module2Content,
  3: module3Content,
  4: module4Content,
  5: module5Content,
  6: module6Content,
  7: module7Content,
  8: module8Content
}
