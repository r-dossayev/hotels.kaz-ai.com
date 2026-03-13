'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Calendar } from './Calendar';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DatePickerProps {
  mode?: 'single' | 'range';
  value?: Date | { from?: Date; to?: Date };
  onChange?: (date: Date) => void;
  onRangeChange?: (range: { from?: Date; to?: Date }) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  triggerClassName?: string;
}

export function DatePicker({
  mode = 'single',
  value,
  onChange,
  onRangeChange,
  placeholder,
  label,
  className = '',
  triggerClassName = '',
}: DatePickerProps) {
  const locale = useLocale();
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside(() => setIsOpen(false));

  const defaultPlaceholder = placeholder || (mode === 'single' ? t('selectDate') : t('selectDates'));

  const formatValue = () => {
    if (mode === 'single' && value instanceof Date) {
      return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(value);
    }
    if (mode === 'range' && typeof value === 'object' && value !== null && 'from' in value) {
      const { from, to } = value as { from?: Date; to?: Date };
      if (from && to) {
        return `${new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(from)} — ${new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).format(to)}`;
      }
      if (from) {
        return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(from);
      }
    }
    return '';
  };

  const handleRangeChange = (range: { from?: Date; to?: Date }) => {
    onRangeChange?.(range);
    if (range.from && range.to) {
      setIsOpen(false);
    }
  };

  const handleSingleChange = (date: Date) => {
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-neutral-700 mb-1.5 block">
          {label}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 bg-white border rounded-xl cursor-pointer transition-all
          ${isOpen ? 'border-primary-500 ring-2 ring-primary-500/10' : 'border-neutral-300 hover:border-neutral-400'}
          ${triggerClassName}
        `}
      >
        <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={`flex-1 truncate ${formatValue() ? '' : 'text-neutral-400'}`}>
          {formatValue() || defaultPlaceholder}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-left">
          <Calendar
            mode={mode}
            selectedDate={mode === 'single' ? (value as Date) : undefined}
            selectedRange={mode === 'range' ? (value as { from?: Date; to?: Date }) : undefined}
            onChange={handleSingleChange}
            onRangeChange={handleRangeChange}
          />
        </div>
      )}
    </div>
  );
}
