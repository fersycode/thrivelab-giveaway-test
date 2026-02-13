'use client'

import { useState } from 'react'
import { useForm } from '@/lib/FormContext'
import { Button } from '@/components/ui/Button'
import { Step1, isStep1Valid } from '@/components/steps/Step1'
import { Step2, isStep2Valid } from '@/components/steps/Step2'
import { Step3, isStep3Valid } from '@/components/steps/Step3'
import { Step4, isStep4Valid } from '@/components/steps/Step4'
import { Step5 } from '@/components/steps/Step5'

const TOTAL_STEPS = 4

export default function GiveawayPage() {
  const { formData, currentStep, setCurrentStep, resetForm } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid(formData)
      case 2:
        return isStep2Valid(formData)
      case 3:
        return isStep3Valid(formData)
      case 4:
        return isStep4Valid(formData)
      default:
        return false
    }
  }

  const handleContinue = async () => {
    if (currentStep === TOTAL_STEPS) {
      setIsSubmitting(true)
      setError('')

      try {
        const response = await fetch('/api/giveaway', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const data = await response.json()
          if (response.status === 409) {
            setError('You have already entered this giveaway')
          } else if (response.status === 400) {
            setError('Please check your information and try again')
          } else {
            setError('Something went wrong. Please try again.')
          }
          setIsSubmitting(false)
          return
        }

        // Success - move to step 5
        setIsSubmitting(false)
        setCurrentStep(5)
        
      } catch (err) {
        console.error('Submit error:', err)
        setError('Network error. Please check your connection.')
        setIsSubmitting(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
      setError('')
    }
  }

  const handleBack = () => {
    if (currentStep > 1 && currentStep <= TOTAL_STEPS) {
      setCurrentStep(currentStep - 1)
      setError('')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      case 4:
        return <Step4 />
      case 5:
        return <Step5 />
      default:
        return <Step1 />
    }
  }

  // Confirmation page layout
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Step5 />
        </div>
      </div>
    )
  }

  // Regular form layout
  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Brand */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-serif text-gray-900 mb-6">thrivelab</h3>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
           <p className="text-#000000-800 text-1xl font-bold">Exclusive Giveaway</p>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Win a $10,000 in-home<br />stem cell treatment
          </h1>
          <p className="text-gray-600 text-sm">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Form content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
          {renderStep()}

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-4">
            {currentStep > 1 && (
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={!canContinue() || isSubmitting}
              className={currentStep === 1 ? 'w-full' : 'flex-1'}
            >
              {isSubmitting ? 'Submitting...' : currentStep === TOTAL_STEPS ? 'Submit' : 'Continue →'}
            </Button>
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center mt-6">
            This is an in-home treatment. If you are not located in one of our service areas, travell will be required.
          </p>
        </div>
      </div>
    </div>
  )
}