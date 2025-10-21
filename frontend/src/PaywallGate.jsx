import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Lock, Mail, CreditCard, CheckCircle, BookOpen, Star, Users, Award } from 'lucide-react'

const PaywallGate = ({ onAccessGranted }) => {
  const [email, setEmail] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [showAccessCode, setShowAccessCode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  // Check if user already has access
  useEffect(() => {
    const savedAccess = localStorage.getItem('xva_course_access')
    const savedEmail = localStorage.getItem('xva_course_email')
    
    if (savedAccess === 'granted' && savedEmail) {
      onAccessGranted()
    }
  }, [onAccessGranted])

  // Simulate payment processing (in real implementation, this would integrate with Stripe/PayPal)
  const handlePayment = async () => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address')
      return
    }

    setIsProcessing(true)
    setMessage('Processing payment...')

    // Simulate payment processing delay
    setTimeout(() => {
      // Generate access code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      
      // Store access information
      localStorage.setItem('xva_course_access', 'granted')
      localStorage.setItem('xva_course_email', email)
      localStorage.setItem('xva_course_code', code)
      
      setMessage(`Payment successful! Your access code is: ${code}`)
      setIsProcessing(false)
      
      // Grant access after a brief delay
      setTimeout(() => {
        onAccessGranted()
      }, 2000)
    }, 3000)
  }

  // Handle access code verification
  const handleAccessCode = () => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter your email address')
      return
    }

    if (!accessCode) {
      setMessage('Please enter your access code')
      return
    }

    // In a real implementation, this would verify against a database
    // For demo purposes, we'll check localStorage or accept any 6-character code
    const savedEmail = localStorage.getItem('xva_course_email')
    const savedCode = localStorage.getItem('xva_course_code')

    if (email === savedEmail && accessCode === savedCode) {
      localStorage.setItem('xva_course_access', 'granted')
      setMessage('Access granted! Welcome back.')
      setTimeout(() => {
        onAccessGranted()
      }, 1000)
    } else if (accessCode.length === 6) {
      // Demo: Accept any 6-character code for testing
      localStorage.setItem('xva_course_access', 'granted')
      localStorage.setItem('xva_course_email', email)
      localStorage.setItem('xva_course_code', accessCode)
      setMessage('Access granted! Welcome to the course.')
      setTimeout(() => {
        onAccessGranted()
      }, 1000)
    } else {
      setMessage('Invalid email or access code. Please check your details.')
    }
  }

  const handleEmailSubmit = () => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address')
      return
    }

    // Check if email already has access
    const savedEmail = localStorage.getItem('xva_course_email')
    if (email === savedEmail) {
      setShowAccessCode(true)
      setMessage('Welcome back! Please enter your access code.')
    } else {
      setShowPayment(true)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Course Preview */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">XVA Essentials in Financial Markets</h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">Advanced study of X-Value Adjustments in derivative pricing</p>
          
          {/* Course Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Comprehensive Modules</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">30+</div>
              <div className="text-sm text-gray-600">Detailed Sub-sections</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Interactive Terms</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">Graduate</div>
              <div className="text-sm text-gray-600">Level Content</div>
            </div>
          </div>

          {/* Course Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Interactive Learning</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Clickable terms, expandable content, and comprehensive glossary with 50+ definitions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Real-World Cases</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">15+ case studies including Lehman Brothers, regulatory changes, and market impacts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Academic Rigor</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Graduate-level mathematical formulations, sophisticated analysis, and scholarly presentation</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Access Gate */}
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Course Access</CardTitle>
            <CardDescription>
              {!showPayment && !showAccessCode 
                ? "Enter your email to get started" 
                : showAccessCode 
                ? "Enter your access code to continue"
                : "Complete your purchase to access the full course"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            {/* Access Code Input (shown for returning users) */}
            {showAccessCode && (
              <div className="space-y-2">
                <Label htmlFor="accessCode">Access Code</Label>
                <Input
                  id="accessCode"
                  type="text"
                  placeholder="Enter your 6-character code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>
            )}

            {/* Payment Section */}
            {showPayment && (
              <div className="space-y-4">
                <Separator />
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$10</div>
                  <p className="text-sm text-gray-600 mb-4">One-time payment for lifetime access</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">What's Included:</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complete access to all 6 modules</li>
                      <li>• Interactive glossary and term definitions</li>
                      <li>• Case studies and real-world examples</li>
                      <li>• Mathematical formulations and analysis</li>
                      <li>• Lifetime access with your email and code</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('successful') || message.includes('granted') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : message.includes('Processing') 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {!showPayment && !showAccessCode && (
                <Button 
                  onClick={handleEmailSubmit} 
                  className="w-full"
                  disabled={isProcessing}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue
                </Button>
              )}

              {showAccessCode && (
                <Button 
                  onClick={handleAccessCode} 
                  className="w-full"
                  disabled={isProcessing}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Access Course
                </Button>
              )}

              {showPayment && (
                <Button 
                  onClick={handlePayment} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isProcessing}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Pay $10 & Access Course'}
                </Button>
              )}

              {(showPayment || showAccessCode) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowPayment(false)
                    setShowAccessCode(false)
                    setMessage('')
                    setEmail('')
                    setAccessCode('')
                  }} 
                  className="w-full"
                  disabled={isProcessing}
                >
                  Back
                </Button>
              )}
            </div>

            {/* Demo Note */}
            <div className="text-xs text-gray-500 text-center mt-4 p-2 bg-gray-50 rounded">
              <strong>Demo Mode:</strong> For testing, any 6-character code will grant access. 
              In production, this would integrate with Stripe/PayPal for real payments.
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Secure payment processing • Lifetime access • No recurring fees</p>
        </div>
      </div>
    </div>
  )
}

export default PaywallGate

