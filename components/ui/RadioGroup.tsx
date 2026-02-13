import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  name,
}: RadioGroupProps) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-medium text-gray-900 mb-4 font-bold">
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5 text-green-600 focus:ring-green-500"
            />
            <span className="ml-3 text-gray-900">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
