'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

export function WhyChooseNomad() {
  const t = useTranslations('home.whyChoose');

  const features = [
    {
      id: 'expertise',
      title: t('expertiseTitle'),
      desc: t('expertiseDesc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      id: 'payments',
      title: t('paymentsTitle'),
      desc: t('paymentsDesc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'support',
      title: t('supportTitle'),
      desc: t('supportDesc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'listings',
      title: t('listingsTitle'),
      desc: t('listingsDesc'),
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-32 bg-neutral-50 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 text-[11px] font-bold uppercase tracking-widest rounded-full mb-8">
              {t('badge')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-8 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-neutral-500 font-medium leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.id} className="p-8 bg-white rounded-[2.5rem] border border-neutral-200/60 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
