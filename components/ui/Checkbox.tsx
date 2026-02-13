import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  value: string;
}

export function Checkbox({ label, checked, onChange, value }: CheckboxProps) {
  return (
    <label className="flex items-center font-bold p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
      />
      <span className="ml-3 text-gray-900">{label}</span>
    </label>
  );
}
