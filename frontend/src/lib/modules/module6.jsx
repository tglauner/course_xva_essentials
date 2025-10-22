import { Download } from 'lucide-react'

export const module6Metadata = {
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
}

export const module6Content = {
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
}
