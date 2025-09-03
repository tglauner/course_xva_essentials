import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { BookOpen, Calculator, TrendingUp, Users, Award, Download, ExternalLink, ArrowRight, ChevronDown, ChevronUp, LogOut, Code } from 'lucide-react'
import PaywallGate from './PaywallGate.jsx'
import PythonNotebook from '@/components/PythonNotebook.jsx'
import './App.css'

function App() {
  const [hasAccess, setHasAccess] = useState(false)
  const [activeModule, setActiveModule] = useState(null)
  const [activeSubsection, setActiveSubsection] = useState(null)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const contentRef = useRef(null)

  // Check access on component mount
  useEffect(() => {
    const savedAccess = localStorage.getItem('xva_course_access')
    if (savedAccess === 'granted') {
      setHasAccess(true)
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('xva_course_access')
    localStorage.removeItem('xva_course_email')
    localStorage.removeItem('xva_course_code')
    setHasAccess(false)
    setActiveModule(null)
    setActiveSubsection(null)
    setGlossaryOpen(false)
    setSelectedTerm(null)
  }

  // Module and subsection handlers
  const handleModuleClick = (moduleId) => {
    setActiveModule(activeModule === moduleId ? null : moduleId)
    setActiveSubsection(null)
  }

  const handleSubsectionClick = (subsectionIndex) => {
    setActiveSubsection(activeSubsection === subsectionIndex ? null : subsectionIndex)

    // Scroll to content after a brief delay to allow for DOM updates
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Term selection handler
  const handleTermClick = useCallback((term) => {
    setSelectedTerm(term)
    setGlossaryOpen(true)
  }, [])

  // Add click listeners for term links
  useEffect(() => {
    const handleTermLinkClick = (e) => {
      if (e.target.classList.contains('term-link')) {
        e.preventDefault()
        const term = e.target.getAttribute('data-term')
        handleTermClick(term)
      }
    }

    document.addEventListener('click', handleTermLinkClick)
    return () => document.removeEventListener('click', handleTermLinkClick)
  }, [handleTermClick])

  // If no access, show paywall
  if (!hasAccess) {
    return <PaywallGate onAccessGranted={() => setHasAccess(true)} />
  }

  // Glossary of terms with definitions
  const glossary = {
    'CVA': {
      term: 'Credit Valuation Adjustment',
      definition: 'The market value of the credit risk of a counterparty in a derivative transaction. It represents the expected loss due to the counterparty defaulting.',
      formula: 'CVA = LGD × EPE'
    },
    'DVA': {
      term: 'Debit Valuation Adjustment',
      definition: 'The expected gain to a financial institution due to its own potential default. It represents the benefit arising from the bank\'s own credit risk.',
      formula: 'DVA = LGD_bank × ENE'
    },
    'FVA': {
      term: 'Funding Valuation Adjustment',
      definition: 'The cost or benefit associated with funding the uncollateralized portion of a derivative transaction.',
      formula: 'FVA = FVA_long + FVA_short'
    },
    'MVA': {
      term: 'Margin Valuation Adjustment',
      definition: 'The cost of funding the initial margin (IM) required for centrally cleared or bilateral derivative transactions.',
      formula: 'MVA = Σ (EIM × Funding_Spread × dt × DF)'
    },
    'KVA': {
      term: 'Capital Valuation Adjustment',
      definition: 'The cost of holding regulatory capital against derivative exposures.',
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
    }
  }

  const modules = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
      id: 6,
      title: "Advanced Topics and Integration",
      description: "Comprehensive XVA framework and future developments",
      subsections: [
        "Interdependencies of XVA Components: The Holistic View",
        "XVA Desks and Organizational Structure",
        "Regulatory Landscape and Future of XVA",
        "Case Studies and Real-World Examples",
        "Future Trends and Challenges in XVA"
      ],
      icon: Download,
      keyTerms: ['KVA', 'Basel III', 'Wrong-Way Risk', 'ISDA SIMM']
    },
    {
      id: 7,
      title: "Python Examples",
      description: "Hands-on Python snippets to experiment with",
      subsections: ["Interactive Python Notebook"],
      icon: Code,
      keyTerms: [],
    }
  ]

  const moduleContent = {
    1: {
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
    },
    2: {
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
            <p>CVA desks hedge changes in counterparty credit spreads to stabilize P&L.</p>
            <ul>
              <li><strong>Credit Derivatives:</strong> instruments such as CDS offset CVA exposure.</li>
              <li><strong>Hedging Difficulties:</strong> basis risk, liquidity constraints, jump-to-default events, and accounting mismatches complicate strategies.</li>
            </ul>
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
    },
    3: {
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
    },
    4: {
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
    },
    5: {
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
    },
    6: {
      title: "Module 6: Advanced Topics and Integration",
      subsections: {
        0: {
          title: "6.1 Interdependencies of XVA Components: The Holistic View",
          content: `
            <p>XVA components interact; netting, collateral, and funding strategies influence multiple adjustments simultaneously.</p>
          `
        },
        1: {
          title: "6.2 XVA Desks and Organizational Structure",
          content: `
            <p>Dedicated XVA desks coordinate pricing, hedging, and risk management across trading, risk, and finance functions.</p>
          `
        },
        2: {
          title: "6.3 Regulatory Landscape and Future of XVA",
          content: `
            <p>Basel developments and technological advances such as blockchain and AI continue to reshape XVA requirements.</p>
          `
        },
        3: {
          title: "6.4 Case Studies and Real-World Examples",
          content: `
            <p>Historical events—like Lehman Brothers' default and the rise of central clearing—illustrate the practical impact of XVA.</p>
          `
        },
        4: {
          title: "6.5 Future Trends and Challenges in XVA",
          content: `
            <p>Emerging issues include model automation, expansion of clearing mandates, and potential ESG-driven funding and capital adjustments.</p>
          `
        }
      }
    },
    7: {
      title: "Module 7: Python Examples",
      subsections: {
        0: {
          title: "7.1 Interactive Python Notebook",
          component: <PythonNotebook />
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Graduate Course: XVA in Financial Markets</h1>
              <p className="text-lg text-gray-600 mt-2">Advanced study of X-Value Adjustments in derivative pricing</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">Graduate Level</Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setGlossaryOpen(!glossaryOpen)}
              >
                Glossary
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Glossary Sidebar */}
      {glossaryOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">XVA Glossary</h3>
              <Button variant="ghost" size="sm" onClick={() => setGlossaryOpen(false)}>
                ×
              </Button>
            </div>
            <div className="space-y-4">
              {Object.entries(glossary).map(([key, value]) => (
                <div 
                  key={key} 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTerm === key ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTerm(selectedTerm === key ? null : key)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{key}</h4>
                    {selectedTerm === key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {selectedTerm === key && (
                    <div className="mt-2 space-y-2">
                      <p className="text-xs text-gray-600">{value.term}</p>
                      <p className="text-sm">{value.definition}</p>
                      {value.formula && (
                        <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                          {value.formula}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Overview */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Course Overview</CardTitle>
              <CardDescription>
                This graduate-level course provides a comprehensive understanding of X-Value Adjustments (XVA) in financial markets, 
                covering theoretical foundations, mathematical formulations, and practical applications with interactive elements and deep academic content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">6</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">30+</div>
                  <div className="text-sm text-gray-600">Sub-sections</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Key Terms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">Advanced</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Card 
                key={module.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg touch-manipulation ${
                  activeModule === module.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => handleModuleClick(module.id)}
                style={{ touchAction: 'manipulation' }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {module.subsections.map((subsection, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        {subsection}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-xs font-medium text-gray-500 mb-2">Key Terms:</h5>
                    <div className="flex flex-wrap gap-1">
                      {module.keyTerms.map((term, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTermClick(term)
                          }}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant={activeModule === module.id ? "default" : "outline"} 
                    className="w-full touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {activeModule === module.id ? "Hide Content" : "Explore Module"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Module Content */}
        {activeModule && moduleContent[activeModule] && (
          <Card className="mb-12" ref={contentRef}>
            <CardHeader>
              <CardTitle className="text-2xl">{moduleContent[activeModule].title}</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent>
              {/* Subsection Navigation */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Module Sections:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(moduleContent[activeModule].subsections).map(([index, subsection]) => (
                    <Button
                      key={index}
                      variant={activeSubsection === parseInt(index) ? "default" : "outline"}
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => handleSubsectionClick(parseInt(index))}
                    >
                      <div>
                        <div className="font-medium text-sm">{subsection.title}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Subsection Content */}
              {activeSubsection !== null && moduleContent[activeModule].subsections[activeSubsection] && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {moduleContent[activeModule].subsections[activeSubsection].title}
                  </h3>
                  {moduleContent[activeModule].subsections[activeSubsection].component ? (
                    moduleContent[activeModule].subsections[activeSubsection].component
                  ) : (
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: moduleContent[activeModule].subsections[activeSubsection].content
                      }}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t">
          <p className="text-gray-600">
            Graduate Course: XVA in Financial Markets | Enhanced Interactive Version with Access Control
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Comprehensive coverage with interactive elements, internal links, and deep academic content
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

