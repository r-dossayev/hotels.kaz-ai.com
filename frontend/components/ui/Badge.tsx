'use client';

import React from 'react';
import type { BadgeStatus } from '@/types';

interface BadgeProps {
  variant: BadgeStatus;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeStatus, string> = {
  success:   'bg-success-100 text-success-700 ring-success-500/20',
  pending:   'bg-warning-100 text-warning-700 ring-warning-500/20',
  cancelled: 'bg-error-100 text-error-700 ring-error-500/20',
  info:      'bg-info-100 text-info-700 ring-info-500/20',
  warning:   'bg-warning-50 text-warning-600 ring-warning-500/20',
};

const dotColors: Record<BadgeStatus, string> = {
  success:   'bg-success-500',
  pending:   'bg-warning-500',
  cancelled: 'bg-error-500',
  info:      'bg-info-500',
  warning:   'bg-warning-500',
};

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full
        text-xs font-semibold
        ring-1 ring-inset
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      {children}
    </span>
  );
}
