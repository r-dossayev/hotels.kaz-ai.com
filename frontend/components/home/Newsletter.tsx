'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Newsletter() {
  const t = useTranslations('home.newsletter');

  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden bg-neutral-900 rounded-[3rem] p-8 md:p-16 lg:p-20">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold !text-white mb-6 leading-tight">
                {t('title')}
              </h2>
              <p className="text-lg !text-white/60 font-medium">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="w-full h-16 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl focus:bg-white/10 transition-all text-base border-2"
                />
              </div>
              <Button size="lg" className="h-16 px-10 rounded-2xl font-bold shadow-xl shadow-primary-500/20">
                {t('subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
