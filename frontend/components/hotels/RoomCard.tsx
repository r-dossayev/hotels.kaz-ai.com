'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Room } from '@/types/hotel';
import { Ruler, Bed, Users, Image as ImageIcon } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const t = useTranslations('hotels');
  const locale = useLocale();

  const name = locale === 'ru' ? room.nameRu : locale === 'kk' ? room.nameKk : room.name;
  const bedType = locale === 'ru' ? room.bedTypeRu : locale === 'kk' ? room.bedTypeKk : room.bedType;
  const views = locale === 'ru' ? room.viewsRu : locale === 'kk' ? room.viewsKk : room.views;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const statusKeys: Record<string, 'freeCancellation' | 'greatValue' | 'lastRoom'> = {
    'free-cancellation': 'freeCancellation',
    'great-value': 'greatValue',
    'last-room': 'lastRoom'
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Photo Left */}
        <div className="md:w-1/3 relative h-56 md:h-auto overflow-hidden shrink-0">
          <Image
            src={room.image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Info Middle */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h4 className="text-xl font-bold text-neutral-900 mb-2">{name}</h4>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-neutral-400" />
                  <span>{t('details.room.size', { size: room.size })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-neutral-400" />
                  <span>{bedType}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span>{t('details.room.capacity', { count: room.capacity })}</span>
                </div>
              </div>
            </div>
            
            {/* Status Badges */}
            {room.status && (
              <span className={`px-4 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${
                room.status === 'free-cancellation' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                room.status === 'great-value' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                'bg-amber-50 text-amber-700 border border-amber-100'
              }`}>
                {room.status && statusKeys[room.status] ? t(`details.room.statuses.${statusKeys[room.status]}`) : room.status}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-neutral-600 flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-100/50">
              <ImageIcon className="w-4 h-4 text-neutral-400" />
              {views}
            </span>
            {room.amenities.slice(0, 4).map((amenity) => (
              <span key={amenity} className="text-sm font-medium text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-100/50 capitalize text-nowrap">
                {t(`amenityNames.${amenity}`)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="h-px bg-neutral-100 w-full" />

      {/* Price & Select Bottom */}
      <div className="p-5 md:p-6 bg-neutral-50/30 flex items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                  ₸{formatPrice(room.price)}
                </span>
                <span className="text-sm text-neutral-500 font-medium">
                  {t('details.room.priceForNight')}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium">
                {t('details.room.includedTaxes')}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 min-w-[140px]">
          <Button variant="primary" size="lg" className="w-full rounded-xl shadow-md shadow-primary-500/10">
            {t('details.room.select')}
          </Button>
        </div>
      </div>
    </div>
  );
}
