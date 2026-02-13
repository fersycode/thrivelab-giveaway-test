"use client";

import { useForm } from "@/lib/FormContext";
import { Checkbox } from "@/components/ui/Checkbox";

const OPTIONS = [
  { value: "trust", label: "I don't know who I can trust" },
  { value: "cost", label: "The cost of treatment" },
  { value: "learning", label: "I'm still learning more about it" },
];

export function Step3() {
  const { formData, updateFormData } = useForm();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const current = formData.whyNotYet;
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);

    updateFormData({ whyNotYet: updated });
  };

  return (
    <div>
      <label className="block text-lg font-medium text-gray-900 mb-4">
        Why haven't you already received a stem cell treatment?
      </label>
      <div className="space-y-3">
        {OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={formData.whyNotYet.includes(option.value)}
            onChange={(checked) => handleCheckboxChange(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
}

export function isStep3Valid(formData: any): boolean {
  return formData.whyNotYet.length > 0;
}
