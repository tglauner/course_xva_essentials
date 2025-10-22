# Graduate-Level Course: XVA in Financial Markets

## Course Overview

This graduate-level course provides a comprehensive exploration of XVA (X-Value Adjustments) in financial markets, focusing on Credit Valuation Adjustment (CVA), Debit Valuation Adjustment (DVA), Funding Valuation Adjustment (FVA), and Margin Valuation Adjustment (MVA). The course will delve into the theoretical foundations, mathematical formulations, practical applications, and regulatory implications of these crucial adjustments in derivative pricing and risk management. Students will gain a deep understanding of how XVA impacts financial institutions, derivative trading, and capital allocation.

## Learning Objectives

Upon successful completion of this course, students will be able to:

*   Understand the fundamental concepts and rationale behind XVA.
*   Differentiate between CVA, DVA, FVA, and MVA, and their respective roles in derivative valuation.
*   Comprehend the mathematical models and methodologies used for calculating each XVA component.
*   Analyze the practical challenges and complexities involved in XVA implementation and management.
*   Evaluate the impact of regulatory frameworks (e.g., Basel III) on XVA and capital requirements.
*   Discuss current trends and controversies in the XVA landscape.

## Course Modules

### Module 1: Introduction to XVA and Derivative Pricing Fundamentals

*   **Topic 1.1:** Review of Derivatives and Markets
    *   Forwards, Futures, Options, Swaps
    *   OTC vs. Exchange-Traded Derivatives
*   **Topic 1.2:** Risk-Neutral Pricing and its Limitations
    *   Black-Scholes-Merton Model assumptions
    *   Introduction to counterparty credit risk and funding costs
*   **Topic 1.3:** The Emergence of XVA
    *   Post-2008 financial crisis landscape
    *   Why XVA became necessary

### Module 2: Credit Valuation Adjustment (CVA)

*   **Topic 2.1:** Definition and Rationale of CVA
    *   Counterparty credit risk explained
    *   Impact on derivative valuation
*   **Topic 2.2:** Mathematical Formulation of CVA
    *   Expected Exposure (EE) and Expected Positive Exposure (EPE)
    *   Probability of Default (PD) and Loss Given Default (LGD)
    *   Integral form of CVA formula
*   **Topic 2.3:** Practical Aspects of CVA Calculation
    *   Monte Carlo simulation for exposure modeling
    *   Credit spreads and PD estimation
    *   Netting and collateral agreements
*   **Topic 2.4:** CVA Hedging and Management
    *   CVA desks and their functions
    *   Basis risk and wrong-way risk
*   **Topic 2.5:** Regulatory Capital for CVA (Basel III implications)

### Module 3: Debit Valuation Adjustment (DVA)

*   **Topic 3.1:** Definition and Rationale of DVA
    *   Own credit risk explained
    *   Relationship between CVA and DVA
*   **Topic 3.2:** Mathematical Formulation of DVA
    *   Impact of own credit quality on derivative liabilities
*   **Topic 3.3:** Practical Considerations for DVA
    *   Controversies and accounting treatment
    *   Hedging DVA

### Module 4: Funding Valuation Adjustment (FVA)

*   **Topic 4.1:** Definition and Rationale of FVA
    *   Liquidity transfer pricing for unsecured positive and negative exposure
    *   Interaction between treasury funding curves and collateral terms
*   **Topic 4.2:** Mathematical Formulation of FVA
    *   Continuous-time expression $\text{FVA}(t_0) = \int_0^T \mathbb{E}^{\mathbb{Q}}[(s(t)E^{+}(t) - b(t)E^{-}(t)) D_d(t)] dt$
    *   Discrete Monte Carlo implementation with scenario-averaged exposures and wrong-way risk considerations
*   **Topic 4.3:** Collateral, Discounting, and Infrastructure
    *   Thresholds, minimum transfer amounts, and rehypothecation rights
    *   Data lineage linking exposure cubes, treasury curves, and stress scenarios
*   **Topic 4.4:** Hedging and Governance
    *   Transfer-pricing policy, funding strategy selection, and management of debate around economic interpretation

### Module 5: Margin Valuation Adjustment (MVA)

*   **Topic 5.1:** Definition and Rationale of MVA
    *   Opportunity cost of segregated initial margin under regulatory mandates
    *   Path dependence created by volatility, concentration, and eligibility schedules
*   **Topic 5.2:** Mathematical Formulation of MVA
    *   Integral representation incorporating default times $\tau_c \wedge \tau_b$
    *   Discrete approximation $\sum IM(t_k)(s_f(t_k)-r_{rem}(t_k)) D(t_k) \Delta t$
*   **Topic 5.3:** Initial Margin Modelling Frameworks
    *   Comparison of ISDA SIMM with internal VaR/ES approaches and hybrid governance
*   **Topic 5.4:** Hedging, Funding Strategy, and Regulatory Impact
    *   Collateral optimisation, committed liquidity facilities, and supervisory expectations for stress testing

### Module 6: Advanced Topics and Integrated XVA

*   **Topic 6.1:** Interdependencies of XVA Components
    *   Aggregate metric $\text{XVA}_{\text{total}} = \text{CVA} - \text{DVA} + \text{FVA} + \text{KVA} + \text{MVA}$
    *   Scenario coordination across credit, funding, capital, and margin analytics
*   **Topic 6.2:** XVA Desks and Organisational Structure
    *   Operating models spanning front office, risk, finance, and treasury with shared data infrastructure
*   **Topic 6.3:** Regulatory Landscape and Future of XVA
    *   FRTB-CVA standardised capital (e.g., $\text{SA-CVA} = \sqrt{\sum_i K_i^2 + 2 \sum_{i<j} \rho_{ij} K_i K_j}$)
    *   Emerging expectations around stress capital buffers, climate scenarios, and advanced technology adoption
*   **Topic 6.4:** Case Studies and Real-World Examples
    *   Measuring hedge effectiveness and capital impact ratios in post-remediation reviews

## Assessment

*   **Homework Assignments:** Regular problem sets focusing on mathematical derivations and practical calculations.
*   **Midterm Exam:** Covers Modules 1-3.
*   **Final Project:** A comprehensive project involving the implementation of an XVA model (e.g., CVA or FVA) for a hypothetical portfolio, including sensitivity analysis and reporting.
*   **Class Participation:** Active engagement in discussions and problem-solving sessions.

## Recommended Readings

*   Relevant academic papers and industry reports.
*   Books on derivative pricing, counterparty credit risk, and XVA.
*   Regulatory documents from Basel Committee on Banking Supervision (BCBS).


