'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export function DiscoverKazakhstan() {
  const t = useTranslations('home.destinations');

  const cities = [
    {
      id: 'astana',
      name: t('astana'),
      desc: t('astanaDesc'),
      image: '/images/home/astana.png',
      badge: t('topRated'),
      fallback: 'https://images.unsplash.com/photo-1578335359781-bc01f074d6c5?q=80&w=1000'
    },
    {
      id: 'almaty',
      name: t('almaty'),
      desc: t('almatyDesc'),
      image: '/images/home/almaty.png',
      badge: t('popular'),
      fallback: 'https://images.unsplash.com/photo-1603513271714-35bb6ff3c125?q=80&w=1000'
    },
    {
      id: 'aktau',
      name: t('aktau'),
      desc: t('aktauDesc'),
      image: '/images/home/aktau.png',
      badge: t('popular'),
      fallback: 'https://images.unsplash.com/photo-1549471166-51543719714b?q=80&w=1000'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-neutral-500 font-medium">
              {t('subtitle')}
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex text-primary-600 font-bold hover:bg-primary-50 rounded-full px-6">
            {t('viewAll')} <span className="ml-2">→</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div key={city.id} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
              {/* Image with next/image */}
              <div className="absolute inset-0">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-black/20 to-transparent" />
              </div>

              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                    {city.badge}
                  </span>
                </div>
                
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold !text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-2">
                    {city.name}
                  </h3>
                  <p className="text-white/70 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {city.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex md:hidden justify-center text-center">
          <Button variant="ghost" className="text-primary-600 font-bold hover:bg-primary-50 rounded-full px-6">
            {t('viewAll')} <span className="ml-2">→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
