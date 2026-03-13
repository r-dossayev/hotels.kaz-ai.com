'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {

  return (
    <div className="bg-white border-b border-neutral-100">
      <Container>
        <div className="py-8 md:py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-neutral-900">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-neutral-200">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-neutral-500">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
