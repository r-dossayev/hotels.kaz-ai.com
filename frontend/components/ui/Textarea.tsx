'use client';

import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={`
            w-full px-4 py-2.5 text-base
            bg-white border rounded-xl resize-y
            transition-all duration-200
            placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
            ${
              error
                ? 'border-error-500 focus:ring-error-500/30 focus:border-error-500'
                : 'border-neutral-300 focus:ring-primary-500/30 focus:border-primary-500 hover:border-neutral-400'
            }
            ${className}
          `}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
