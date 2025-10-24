import { Code } from 'lucide-react'

function JupyterRoadmap() {
  return (
    <div className="space-y-4">
      <p>
        We are actively designing an embedded Jupyter experience that will let you explore
        XVA concepts with live Python-powered notebooks directly inside the course. This
        roadmap outlines the upcoming milestones that will transform Module 8 into a
        hands-on sandbox once the infrastructure is ready.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Kernel management:</strong> provision secure, short-lived kernels tailored to
          derivative pricing workflows.
        </li>
        <li>
          <strong>Curated notebooks:</strong> ship pre-built scenarios that quantify CVA, DVA, and
          FVA adjustments with reproducible code cells.
        </li>
        <li>
          <strong>Data connectivity:</strong> connect to example market data sets so you can run
          shock analyses without leaving the browser.
        </li>
      </ul>
      <p>
        Stay tuned for updates as we bring the Interactive Jupyter XVA Sandbox online. In the
        meantime, continue mastering the theoretical modules and prepare to apply them in a
        dynamic computational setting.
      </p>
    </div>
  )
}

export const module8Metadata = {
  id: 8,
  title: "Roadmap: Interactive Jupyter XVA Sandbox",
  description: "Preview the upcoming embedded Jupyter environment for XVA analytics.",
  subsections: ["Roadmap Overview"],
  icon: Code,
  keyTerms: []
}

export const module8Content = {
  title: "Module 8: Roadmap – Interactive Jupyter XVA Sandbox",
  subsections: {
    0: {
      title: "8.1 Roadmap Overview",
      component: <JupyterRoadmap />
    }
  }
}
