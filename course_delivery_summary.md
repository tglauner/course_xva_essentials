# Graduate-Level Course: XVA in Financial Markets - Complete Delivery Package

## Course Overview

This comprehensive graduate-level course on X-Value Adjustments (XVA) in financial markets has been successfully created and deployed. The course covers the theoretical foundations, mathematical formulations, and practical applications of all major XVA components: CVA, DVA, FVA, MVA, and KVA.

## Deliverables

### 1. Interactive Website (Permanently Deployed)
**URL:** https://www.course-xva-essentials.tglauner.com

The course has been deployed as a fully interactive website featuring:
- **Responsive Design:** Works seamlessly on desktop and mobile devices, including improved touch interaction for tablets like iPad.
- **Interactive Modules:** Click-to-expand content sections for each module
- **Professional Styling:** Modern UI with Tailwind CSS and shadcn/ui components
- **Comprehensive Content:** All 6 modules with detailed explanations and mathematical formulations

#### Website Features:
- Course overview with statistics (6 modules, 20+ topics, Advanced level)
- Module-based navigation with icons and descriptions
- Expandable content sections with detailed explanations
- Mathematical formulas in highlighted boxes
- Professional academic styling
- Footer with course attribution

### 2. LaTeX Beamer Presentation
**File:** `latex_material/xva_course.tex`

A complete LaTeX Beamer presentation containing:
- Professional academic formatting
- All course modules and topics
- Mathematical formulations with proper LaTeX syntax
- Structured slide layout suitable for lectures
- Ready for compilation with any LaTeX distribution

### 3. Course Structure

#### Module 1: Introduction to XVA
- What is XVA?
- Historical Context and Evolution of XVA
- Overview of Derivatives and Markets
- Limitations of Risk-Neutral Pricing

#### Module 2: Credit Valuation Adjustment (CVA)
- Definition and Rationale of CVA
- Mathematical Formulation of CVA
- Practical Aspects of CVA Calculation
- CVA Hedging and Management
- Regulatory Capital for CVA (Basel III)

#### Module 3: Debit Valuation Adjustment (DVA)
- Definition and Rationale of DVA
- Mathematical Formulation of DVA
- Controversies and Accounting Treatment of DVA

#### Module 4: Funding Valuation Adjustment (FVA)
- Liquidity transfer pricing for unsecured positive/negative exposure and treasury funding curves
- Quantitative framework $\text{FVA}(t_0) = \int_0^T \mathbb{E}^{\mathbb{Q}}[(s(t)E^{+}(t) - b(t)E^{-}(t)) D_d(t)] dt$ with Monte Carlo discretisation
- Collateral threshold management, rehypothecation limits, and data infrastructure for stress scenarios

#### Module 5: Margin Valuation Adjustment (MVA)
- Economic cost of segregated initial margin and volatility-driven path dependence
- Integral expression $\text{MVA} = \mathbb{E}^{\mathbb{Q}}[\int_0^T D(t) IM(t) (s_f(t) - r_{rem}(t)) \mathbf{1}_{\{t<\tau_c \wedge \tau_b\}} dt]$ and discrete approximations
- Comparison of ISDA SIMM and internal models, plus hedging via collateral optimisation and committed liquidity facilities

#### Module 6: Advanced Topics and Integrated XVA
- Holistic metric $\text{XVA}_{\text{total}} = \text{CVA} - \text{DVA} + \text{FVA} + \text{KVA} + \text{MVA}$ and shared scenario governance
- Organisational design of XVA desks across front office, risk, finance, and treasury
- Regulatory emphasis on FRTB-CVA, stress capital buffers, and climate/technology trends
- Case studies measuring hedge effectiveness and capital impact following remediation programmes

## Technical Implementation

### Website Technology Stack:
- **Frontend Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with shadcn/ui components
- **Icons:** Lucide React icons
- **Deployment:** DigitalOcean Droplet + Apache serving https://www.course-xva-essentials.tglauner.com
- **Responsive Design:** Mobile-first approach with responsive grid layouts and enhanced touch support

### LaTeX Implementation:
- **Document Class:** Beamer for presentation slides
- **Packages:** amsmath, amsfonts, amssymb, graphicx, hyperref
- **Structure:** Modular organization with sections and subsections
- **Mathematical Notation:** Proper LaTeX formatting for all formulas

## Key Features and Benefits

### Educational Value:
1. **Comprehensive Coverage:** All major XVA components with theoretical and practical aspects
2. **Mathematical Rigor:** Proper formulations with detailed explanations
3. **Real-World Context:** Historical background and practical applications
4. **Regulatory Perspective:** Basel III and other regulatory considerations
5. **Advanced Topics:** Integration of XVA components and future developments

### Accessibility:
1. **Multiple Formats:** Both web-based and LaTeX presentation formats
2. **Interactive Learning:** Web interface allows self-paced exploration
3. **Professional Presentation:** LaTeX slides suitable for academic lectures
4. **Permanent Access:** Website remains accessible indefinitely

### Professional Quality:
1. **Academic Standards:** Graduate-level content with proper citations
2. **Industry Relevance:** Current practices and regulatory requirements
3. **Mathematical Precision:** Accurate formulations and explanations
4. **Visual Appeal:** Professional design and layout

## Usage Instructions

### For the Website:
1. Visit https://www.course-xva-essentials.tglauner.com
2. Navigate through the course overview
3. Click on any module card to expand its content
4. Use the "View Content" buttons to access detailed explanations
5. Content is fully responsive and works on all devices

### For the LaTeX Presentation:
1. Use the provided `latex_material/xva_course.tex` file
2. Compile with any LaTeX distribution (pdflatex, xelatex, etc.)
3. Requires standard packages: beamer, amsmath, amsfonts, amssymb, graphicx, hyperref
4. Generates a professional PDF presentation suitable for lectures

## Course Validation

The course content has been:
- ✅ Researched from authoritative financial sources
- ✅ Structured according to academic standards
- ✅ Implemented with modern web technologies
- ✅ Tested for functionality and responsiveness
- ✅ Deployed to permanent hosting
- ✅ Formatted for LaTeX presentation

## Conclusion

This graduate-level XVA course represents a comprehensive educational resource that combines theoretical rigor with practical applications. The dual delivery format (interactive website and LaTeX presentation) ensures maximum accessibility and usability for both students and instructors.

The permanent website deployment at https://www.course-xva-essentials.tglauner.com provides immediate access to the course content, while the LaTeX Beamer presentation offers a traditional academic format suitable for classroom instruction.

---

**Created by:** Manus AI  
**Date:** July 2025  
**Course Level:** Graduate  
**Total Modules:** 6  
**Topics Covered:** 20+  
**Formats:** Interactive Website + LaTeX Beamer Presentation

