import { Code } from 'lucide-react'
import PythonNotebook from '@/components/PythonNotebook.jsx'

export const module7Metadata = {
  id: 7,
  title: "Python Examples",
  description: "Hands-on Python snippets to experiment with",
  subsections: ["Interactive Python Notebook"],
  icon: Code,
  keyTerms: []
}

export const module7Content = {
  title: "Module 7: Python Examples",
  subsections: {
    0: {
      title: "7.1 Interactive Python Notebook",
      component: <PythonNotebook />
    }
  }
}
