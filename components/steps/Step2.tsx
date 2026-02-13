"use client";

import { useForm } from "@/lib/FormContext";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Input } from "@/components/ui/Input";

export function Step2() {
  const { formData, updateFormData } = useForm();

  const painOptions = [
    { value: "knee", label: "Knee" },
    { value: "shoulder", label: "Shoulder" },
    { value: "back", label: "Back" },
    { value: "other", label: "Other" },
  ];

  return (
    <div>
      <RadioGroup
        label="What area of your body are you experiencing pain or discomfort in?"
        options={painOptions}
        value={formData.painArea}
        onChange={(value) =>
          updateFormData({
            painArea: value as any,
            painAreaOther: value !== "other" ? "" : formData.painAreaOther,
          })
        }
        name="painArea"
      />

      {formData.painArea === "other" && (
        <Input
          label="Please specify"
          value={formData.painAreaOther}
          onChange={(e) => updateFormData({ painAreaOther: e.target.value })}
          required
          placeholder="Describe your pain area"
        />
      )}
    </div>
  );
}

export function isStep2Valid(formData: any): boolean {
  if (!formData.painArea) return false;
  if (formData.painArea === "other" && !formData.painAreaOther.trim())
    return false;
  return true;
}
