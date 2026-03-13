'use client';

import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
}

export function Radio({
  name,
  options,
  value,
  onChange,
  label,
  disabled = false,
  direction = 'vertical',
}: RadioProps) {
  return (
    <fieldset className="flex flex-col gap-2" disabled={disabled}>
      {label && (
        <legend className="text-sm font-medium text-neutral-700 mb-1">{label}</legend>
      )}
      <div
        className={`flex gap-3 ${
          direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        }`}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`inline-flex items-center gap-3 cursor-pointer group select-none ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange?.(opt.value)}
                className="peer sr-only"
                disabled={disabled}
              />
              <div
                className="
                  w-5 h-5 rounded-full border-2
                  border-neutral-300
                  transition-all duration-200
                  peer-checked:border-primary-600
                  peer-focus:ring-2 peer-focus:ring-primary-500/30 peer-focus:ring-offset-1
                  group-hover:border-neutral-400
                "
              />
              <div
                className="
                  absolute w-2.5 h-2.5 rounded-full
                  bg-primary-600
                  opacity-0 scale-0
                  peer-checked:opacity-100 peer-checked:scale-100
                  transition-all duration-200
                "
              />
            </div>
            <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
