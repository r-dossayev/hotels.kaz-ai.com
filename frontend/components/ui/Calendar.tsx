'use client';

import React, { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';

interface CalendarProps {
  mode?: 'single' | 'range';
  selectedDate?: Date;
  selectedRange?: { from?: Date; to?: Date };
  onChange?: (date: Date) => void;
  onRangeChange?: (range: { from?: Date; to?: Date }) => void;
  className?: string;
}

export function Calendar({
  mode = 'single',
  selectedDate,
  selectedRange,
  onChange,
  onRangeChange,
  className = '',
}: CalendarProps) {
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    
    // Fill empty days at the start of the week
    const firstDayOfWeek = date.getDay(); // 0 is Sunday
    // Adjust for Monday start: (day + 6) % 7
    const adjustedFirstDay = (firstDayOfWeek + 6) % 7;
    
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  }, [currentMonth]);

  const monthName = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(currentMonth);
  const weekDays = useMemo(() => {
    const baseDate = new Date(2024, 0, 1); // A Monday
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
    });
  }, [locale]);

  const isSelected = (date: Date) => {
    if (mode === 'single' && selectedDate) {
      return date.toDateString() === selectedDate.toDateString();
    }
    if (mode === 'range' && selectedRange) {
      return (
        (selectedRange.from?.toDateString() === date.toDateString()) ||
        (selectedRange.to?.toDateString() === date.toDateString())
      );
    }
    return false;
  };

  const isInRange = (date: Date) => {
    if (mode === 'range' && selectedRange?.from && selectedRange?.to) {
      return date > selectedRange.from && date < selectedRange.to;
    }
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (mode === 'single') {
      onChange?.(date);
    } else if (mode === 'range') {
      if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
        onRangeChange?.({ from: date, to: undefined });
      } else if (date < selectedRange.from) {
        onRangeChange?.({ from: date, to: selectedRange.from });
      } else {
        onRangeChange?.({ from: selectedRange.from, to: date });
      }
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className={`w-72 p-4 bg-white rounded-2xl shadow-xl border border-neutral-100 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
          <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-bold text-neutral-900 capitalize">{monthName}</span>
        <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
          <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <span key={day} className="text-[10px] font-bold text-neutral-400 uppercase text-center py-2">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="p-2" />;
          
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const isFrom = mode === 'range' && selectedRange?.from?.toDateString() === date.toDateString();
          const isTo = mode === 'range' && selectedRange?.to?.toDateString() === date.toDateString();

          return (
            <div 
              key={date.toISOString()}
              className={`relative p-0.5 ${inRange ? 'bg-primary-50' : ''} ${isFrom && selectedRange?.to ? 'rounded-l-lg bg-primary-50' : ''} ${isTo ? 'rounded-r-lg bg-primary-50' : ''}`}
            >
              <button
                onClick={() => handleDateClick(date)}
                className={`
                  w-full h-9 text-sm font-medium rounded-lg transition-all relative z-10
                  ${selected ? 'bg-primary-500 text-white shadow-md' : 'text-neutral-700 hover:bg-primary-100'}
                  ${inRange ? 'text-primary-700' : ''}
                `}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
