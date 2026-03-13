'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

import { DatePicker } from '@/components/ui/DatePicker';

export function Hero() {
  const t = useTranslations('home.hero');
  const [propertyType, setPropertyType] = useState('');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const propertyOptions = [
    { value: 'all', label: t('properties.all') },
    { value: 'hotel', label: t('properties.hotel') },
    { value: 'apartment', label: t('properties.apartment') },
    { value: 'villa', label: t('properties.villa') },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero.jpg"
          alt="Kazakhstan Nature"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neutral-900/60 transition-opacity" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-50 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-[slideUp_0.4s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{t('badge')}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold !text-white mb-8 leading-[1.1] tracking-tight animate-[slideUp_0.6s_ease-out]">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl !text-white/80 mb-14 max-w-3xl mx-auto leading-relaxed font-medium animate-[slideUp_0.8s_ease-out]">
            {t('subtitle')}
          </p>

          {/* Search Panel - Cohesive Flex Design */}
          <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-2 md:p-3 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] animate-[slideUp_1s_ease-out]">
            <div className="bg-white rounded-[2.5rem] p-2 md:p-2 flex flex-col md:flex-row items-stretch md:items-center">
              
              {/* Destination Section */}
              <div className="flex-1 px-8 py-3 group cursor-pointer border-b md:border-b-0">
                <label className="h-4 flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-0.5 group-hover:text-primary-500 transition-colors whitespace-nowrap">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {t('destination')}
                </label>
                <div className="h-7 flex items-center">
                  <Input 
                    placeholder="Almaty, Astana..." 
                    className="!text-base !font-semibold !text-neutral-900 placeholder:!text-neutral-300 border-none focus:!ring-0 !h-full w-full bg-transparent"
                  />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-neutral-100 h-10 shrink-0" />

              {/* Dates Section */}
              <div className="flex-1 px-8 py-3 group border-b md:border-b-0">
                <label className="h-4 flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-0.5 group-hover:text-primary-500 transition-colors whitespace-nowrap">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {t('checkInCheckOut')}
                </label>
                <div className="h-7 flex items-center">
                  <DatePicker
                    mode="range"
                    value={dateRange}
                    onRangeChange={setDateRange}
                    placeholder={t('selectDates')}
                    className="w-full"
                    triggerClassName="!border-none !ring-0 !p-0 !bg-transparent !text-base !font-semibold !text-neutral-900 placeholder:!text-neutral-300 !h-full"
                  />
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-neutral-100 h-10 shrink-0" />

              {/* Property Type Section */}
              <div className="flex-1 px-8 py-3 group">
                <label className="h-4 flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-0.5 group-hover:text-primary-500 transition-colors whitespace-nowrap">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {t('propertyType')}
                </label>
                <div className="h-7 flex items-center">
                  <Select
                    value={propertyType}
                    onChange={setPropertyType}
                    options={propertyOptions}
                    placeholder={t('properties.all')}
                    className="!text-base !text-left !font-semibold !p-0 border-none w-full bg-transparent"
                  />
                </div>
              </div>

              {/* Search Button Section */}
              <div className="md:w-40 p-1 shrink-0 mr-4">
                <Button size="md" className="w-full h-12 rounded-[1.75rem] shadow-lg shadow-primary-500/25 transform transition-all font-bold text-md bg-primary-600 hover:bg-primary-700">
                  {t('search')}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center gap-12 font-medium">
            <div className="flex flex-col items-center gap-2 animate-[slideUp_1.2s_ease-out]">
              <span className="text-3xl text-white font-extrabold tracking-tight">1,200+</span>
              <span className="text-[11px] text-white/50 uppercase tracking-widest">{t('stats.hotels')}</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col items-center gap-2 animate-[slideUp_1.3s_ease-out]">
              <span className="text-3xl text-white font-extrabold tracking-tight">24/7</span>
              <span className="text-[11px] text-white/50 uppercase tracking-widest">{t('stats.support')}</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col items-center gap-2 animate-[slideUp_1.4s_ease-out]">
              <span className="text-3xl text-white font-extrabold tracking-tight">Secure</span>
              <span className="text-[11px] text-white/50 uppercase tracking-widest">{t('stats.payments')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
