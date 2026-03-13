'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import type { Hotel } from '@/types/hotel';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const t = useTranslations('hotels');
  const locale = useLocale();

  const hotelName = locale === 'ru' ? hotel.nameRu : locale === 'kk' ? hotel.nameKk : hotel.name;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const amenityIcons: Record<string, string> = {
    wifi: '📶', pool: '🏊', parking: '🅿️', gym: '💪',
    spa: '🧖', restaurant: '🍽️', bar: '🍸', ac: '❄️',
    breakfast: '🥐', kitchen: '🍳',
  };

  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <Link href={`/hotels/${hotel.id}`} className="relative h-52 overflow-hidden block">
        <Image
          src={hotel.image}
          alt={hotelName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-start gap-3">
          <div className="flex flex-wrap gap-2">
            {hotel.featured && (
              <span className="px-2.5 py-1 bg-primary-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                {t('card.featured')}
              </span>
            )}
            {hotel.freeCancellation && (
              <span className="px-2.5 py-1 bg-success-500/90 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full shadow-sm">
                {t('card.freeCancellation')}
              </span>
            )}
          </div>

          <span className="shrink-0 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-neutral-800 text-[10px] font-bold rounded-full uppercase tracking-wide shadow-sm border border-neutral-100">
            {t(`types.${hotel.type}`)}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-100">
            <span className="text-lg font-bold text-neutral-900 tracking-tight">{formatPrice(hotel.pricePerNight)}₸</span>
            <span className="text-[10px] text-neutral-500 ml-1 font-medium">{t('card.perNight')}</span>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < hotel.rating ? 'text-amber-400' : 'text-neutral-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-neutral-400 ml-1.5">({hotel.reviewCount})</span>
          </div>

          {/* Hotel Name */}
          <Link href={`/hotels/${hotel.id}`}>
            <h5 className="text-base font-bold text-neutral-900 mb-1.5 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {hotelName}
            </h5>
          </Link>

          {/* City */}
          <p className="text-sm text-neutral-500 mb-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t(`cities.${hotel.city}`)}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities.slice(0, 5).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-0.5 bg-neutral-50 text-neutral-600 text-[11px] font-medium rounded-md border border-neutral-100"
                title={t(`amenityNames.${amenity}`)}
              >
                {amenityIcons[amenity]} {t(`amenityNames.${amenity}`)}
              </span>
            ))}
            {hotel.amenities.length > 5 && (
              <span className="px-2 py-0.5 bg-neutral-50 text-neutral-400 text-[11px] font-medium rounded-md border border-neutral-100">
                +{hotel.amenities.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Book Button */}
        <div className="mt-auto">
          <Link href={`/hotels/${hotel.id}`} className="block">
            <Button className="w-full rounded-xl font-semibold text-sm h-10">
              {t('card.bookNow')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
