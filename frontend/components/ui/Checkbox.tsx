'use client';

import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-3 cursor-pointer group select-none ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          className="peer sr-only"
          {...props}
        />
        <div
          className="
            w-5 h-5 border-2 rounded-md
            border-neutral-300
            transition-all duration-200
            peer-checked:bg-primary-600 peer-checked:border-primary-600
            peer-focus:ring-2 peer-focus:ring-primary-500/30 peer-focus:ring-offset-1
            group-hover:border-neutral-400
            peer-disabled:bg-neutral-100
          "
        />
        <svg
          className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-150 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
        {label}
      </span>
    </label>
  );
}
