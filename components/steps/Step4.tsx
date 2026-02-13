'use client'

import { useForm } from '@/lib/FormContext'
import { RadioGroup } from '@/components/ui/RadioGroup'

const OPTIONS = [
  { value: 'explore', label: "Yes, I'd like to explore treatment options" },
  { value: 'financing', label: 'Possibly, depending on financing' },
  { value: 'giveaway-only', label: "I'm only interested if I win the giveaway" },
]

export function Step4() {
  const { formData, updateFormData } = useForm()

  return (
    <div>
      <RadioGroup
        label="If you don't win the giveaway, would you still be interested in learning more or receiving treatment?"
        options={OPTIONS}
        value={formData.interestLevel}
        onChange={(value) => updateFormData({ interestLevel: value })}
        name="interestLevel"
      />
    </div>
  )
}

export function isStep4Valid(formData: any): boolean {
  return formData.interestLevel !== ''
}