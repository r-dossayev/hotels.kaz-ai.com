'use client';

import React, { useState, useCallback } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { SelectOption } from '@/types';

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  hideChevron?: boolean;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
  disabled = false,
  id,
  className = '',
  hideChevron = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside(() => setIsOpen(false));
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = useCallback(
    (optValue: string) => {
      onChange?.(optValue);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div className={`flex flex-col ${label ? 'gap-1.5' : ''} ${className}`} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={selectId}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 text-base text-left
            bg-white transition-all duration-200
            flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
            ${className.includes('border-none') ? 'border-none' : 'border rounded-xl'}
            ${
              error
                ? 'border-error-500 focus:ring-error-500/30'
                : className.includes('border-none') 
                  ? 'focus:ring-transparent' 
                  : 'border-neutral-300 focus:ring-primary-500/30 focus:border-primary-500 hover:border-neutral-400'
            }
          `}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={selectedOption ? '!text-neutral-900' : '!text-neutral-400'}>
            {selectedOption?.label || placeholder}
          </span>
          {!hideChevron && (
            <svg
              className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => handleSelect(opt.value)}
                className={`
                  px-4 py-2.5 cursor-pointer transition-colors duration-150 text-sm
                  ${
                    opt.value === value
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }
                `}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  );
}
