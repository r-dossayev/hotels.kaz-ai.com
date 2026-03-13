'use client';

import React from 'react';
import type { Size } from '@/types';

interface SpinnerProps {
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-12 h-12 border-4',
};

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`
        rounded-full
        border-primary-200 border-t-primary-600
        animate-spin
        ${sizeClasses[size]}
        ${className}
      `}
    />
  );
}
