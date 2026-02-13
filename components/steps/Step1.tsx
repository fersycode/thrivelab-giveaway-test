"use client";

import { useForm } from "@/lib/FormContext";
import { Input } from "@/components/ui/Input";
import { formatPhoneNumber, isValidEmail } from "@/lib/utils";

export function Step1() {
  const { formData, updateFormData } = useForm();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateFormData({ phone: formatted });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => updateFormData({ firstName: e.target.value })}
          required
        />

        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => updateFormData({ lastName: e.target.value })}
          required
        />
      </div>

      <Input
        label="Instagram Handle"
        value={formData.instagramHandle}
        onChange={(e) => updateFormData({ instagramHandle: e.target.value })}
        placeholder="@username"
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder="(555) 555-5555"
        required
      />
    </div>
  );
}

export function isStep1Valid(formData: any): boolean {
  return (
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    isValidEmail(formData.email) &&
    formData.phone.replace(/\D/g, "").length === 10
  );
}
