import { useState, useCallback, useEffect } from 'react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { modules, glossary } from '@/lib/courseData.js'
import './App.css'

function CourseOverview() {
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState(null)

  const { isLoaded, isSignedIn } = useUser()
  const isReadOnly = !isLoaded || !isSignedIn

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

  const openModuleTab = useCallback((moduleId) => {
    if (isReadOnly) {
      return
    }

    const basePath = import.meta.env.BASE_URL ?? '/'
    const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
    const lectureUrl = `${window.location.origin}${normalizedBasePath}/module/${moduleId}`

    const newWindow = window.open(lectureUrl, '_blank', 'noopener,noreferrer')
    if (newWindow) {
      newWindow.focus()
    }
  }, [isReadOnly])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Graduate Course: XVA in Financial Markets</h1>
              <p className="text-lg text-gray-600 mt-2">Advanced study of X-Value Adjustments in derivative pricing</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">Graduate Level</Badge>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSignedIn && (
          <Card className="mb-6 border-blue-200 bg-white/80">
            <CardContent className="py-4">
              <p className="text-sm text-gray-700">
                Sign in with Clerk to unlock interactive modules, glossary exploration, and the embedded Python notebook.
              </p>
            </CardContent>
          </Card>
        )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Card
                key={module.id}
                className={`transition-all duration-200 ${
                  isReadOnly ? 'opacity-70' : 'hover:shadow-lg'
                }`}
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
                          className={`text-xs ${
                            isReadOnly ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-blue-50'
                          }`}
                          onClick={() => {
                            if (isReadOnly) {
                              return
                            }

                            handleTermClick(term)
                          }}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant={isReadOnly ? 'outline' : 'default'}
                    className="w-full touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                    disabled={isReadOnly}
                    onClick={() => openModuleTab(module.id)}
                  >
                    {isReadOnly ? 'Sign in to Explore' : 'Explore Module'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

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

export default CourseOverview
