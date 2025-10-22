import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { modules, moduleContent, glossary } from '@/lib/courseData.jsx'
import { MathJaxContext } from 'better-react-mathjax'
import './App.css'

const mathJaxConfig = {
  tex: {
    packages: {
      '[+]': ['ams', 'textmacros']
    },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ]
  },
  loader: { load: ['[tex]/ams', '[tex]/textmacros'] }
}

function ModulePage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const numericModuleId = Number(moduleId)

  const moduleData = moduleContent[numericModuleId]
  const moduleMetadata = modules.find((module) => module.id === numericModuleId)

  const { isLoaded, isSignedIn } = useUser()
  const isReadOnly = !isLoaded || !isSignedIn

  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [activeSubsection, setActiveSubsection] = useState(() => {
    if (!moduleData) {
      return null
    }

    const firstKey = Object.keys(moduleData.subsections)[0]
    return firstKey !== undefined ? parseInt(firstKey) : null
  })

  useEffect(() => {
    if (moduleData) {
      const keys = Object.keys(moduleData.subsections)
      const firstKey = keys.length > 0 ? parseInt(keys[0]) : null
      setActiveSubsection(firstKey ?? null)
    } else {
      setActiveSubsection(null)
    }
  }, [moduleData])

  const handleTermClick = useCallback((term) => {
    if (isReadOnly) {
      return
    }

    setSelectedTerm(term)
    setGlossaryOpen(true)
  }, [isReadOnly])

  useEffect(() => {
    if (isReadOnly) {
      setGlossaryOpen(false)
      setSelectedTerm(null)
    }
  }, [isReadOnly])

  useEffect(() => {
    const handleTermLinkClick = (event) => {
      if (event.target.classList?.contains('term-link')) {
        event.preventDefault()
        const term = event.target.getAttribute('data-term')
        if (term) {
          handleTermClick(term)
        }
      }
    }

    document.addEventListener('click', handleTermLinkClick)
    return () => {
      document.removeEventListener('click', handleTermLinkClick)
    }
  }, [handleTermClick])

  const handleCloseLecture = useCallback(() => {
    if (window.opener) {
      window.close()
    } else {
      navigate('/')
    }
  }, [navigate])

  const renderContent = () => {
    if (!isLoaded) {
      return (
        <Card className="bg-white/80">
          <CardContent className="py-8">
            <p className="text-center text-gray-600">Loading your lecture...</p>
          </CardContent>
        </Card>
      )
    }

    if (isReadOnly) {
      return (
        <Card className="bg-white/80">
          <CardContent className="py-8 space-y-4 text-center">
            <p className="text-gray-700">Sign in with Clerk to view this lecture.</p>
            <div className="flex justify-center space-x-3">
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (!moduleData) {
      return (
        <Card className="bg-white/80">
          <CardContent className="py-8 space-y-4 text-center">
            <p className="text-gray-700">The requested module could not be found.</p>
            <Button variant="outline" onClick={() => navigate('/')}>Return to Course Overview</Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <MathJaxContext config={mathJaxConfig} version={3}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{moduleData.title}</CardTitle>
            {moduleMetadata?.description && (
              <CardDescription>{moduleMetadata.description}</CardDescription>
            )}
            <Separator className="mt-4" />
          </CardHeader>
          <CardContent>
            {moduleMetadata?.keyTerms?.length ? (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Key Terms</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {moduleMetadata.keyTerms.map((term, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-blue-50"
                      onClick={() => handleTermClick(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Module Sections</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(moduleData.subsections).map(([index, subsection]) => {
                  const numericIndex = parseInt(index)
                  return (
                    <Button
                      key={index}
                      variant={activeSubsection === numericIndex ? 'default' : 'outline'}
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => setActiveSubsection(numericIndex)}
                    >
                      <div>
                        <div className="font-medium text-sm">{subsection.title}</div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            {activeSubsection !== null && moduleData.subsections[activeSubsection] && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {moduleData.subsections[activeSubsection].title}
                </h3>
                {moduleData.subsections[activeSubsection].component ? (
                  moduleData.subsections[activeSubsection].component
                ) : (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: moduleData.subsections[activeSubsection].content
                    }}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" className="touch-manipulation" onClick={handleCloseLecture}>
            Close Lecture Tab
          </Button>
        </div>
      </MathJaxContext>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500">Lecture</p>
            <h1 className="text-3xl font-bold text-gray-900">
              {moduleMetadata?.title || 'XVA Lecture'}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            {isReadOnly ? (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGlossaryOpen((previous) => !previous)}
                >
                  Glossary
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </header>

      {isSignedIn && glossaryOpen && (
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
                  onClick={() => setSelectedTerm((previous) => (previous === key ? null : key))}
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {renderContent()}
      </main>
    </div>
  )
}

export default ModulePage
