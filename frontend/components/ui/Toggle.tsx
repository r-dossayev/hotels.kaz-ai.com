'use client';

import React from 'react';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
}: ToggleProps) {
  const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label
      htmlFor={toggleId}
      className={`inline-flex items-center gap-3 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className="
            w-11 h-6 rounded-full
            bg-neutral-300
            transition-colors duration-200
            peer-checked:bg-primary-600
            peer-focus:ring-2 peer-focus:ring-primary-500/30 peer-focus:ring-offset-2
          "
        />
        <div
          className="
            absolute top-0.5 left-0.5
            w-5 h-5 rounded-full bg-white shadow-sm
            transition-transform duration-200
            peer-checked:translate-x-5
          "
        />
      </div>
      {label && (
        <span className="text-sm text-neutral-700">{label}</span>
      )}
    </label>
  );
}
