'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Hotel } from '@/types/hotel';
import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, Wind, Utensils } from 'lucide-react';
import { RoomCard } from './RoomCard';

type TabType = 'overview' | 'amenities' | 'rooms' | 'reviews';

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  pool: Wind,
  parking: Car,
  gym: Dumbbell,
  spa: Star,
  restaurant: Utensils,
  bar: Coffee,
  ac: Wind,
  breakfast: Coffee,
  kitchen: Utensils,
};

interface HotelTabsProps {
  hotel: Hotel;
}

export function HotelTabs({ hotel }: HotelTabsProps) {
  const t = useTranslations('hotels');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const description = locale === 'ru' ? hotel.descriptionRu : locale === 'kk' ? hotel.descriptionKk : hotel.description;
  const address = locale === 'ru' ? hotel.addressRu : locale === 'kk' ? hotel.addressKk : hotel.address;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: t('details.tabs.overview') },
    { id: 'amenities', label: t('details.tabs.amenities') },
    { id: 'rooms', label: t('details.tabs.rooms') },
    { id: 'reviews', label: t('details.tabs.reviews') },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all relative ${
              activeTab === tab.id
                ? 'text-primary-600'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-12">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* About Section */}
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900">{t('details.about')}</h3>
                    <button className="flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors bg-primary-50 px-4 py-2 rounded-xl text-sm border border-primary-100/50">
                      <MapPin className="w-4 h-4" />
                      {t('details.showOnMap')}
                    </button>
                  </div>
                  
                  <div className="flex items-start gap-2 text-neutral-500 mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-100/50">
                    <MapPin className="w-5 h-5 shrink-0 text-primary-500 mt-0.5" />
                    <span className="text-sm font-medium leading-relaxed">{address}</span>
                  </div>

                  <p className="text-neutral-600 leading-relaxed max-w-4xl text-lg">
                    {description}
                  </p>
                </div>
              </div>

              {/* Rating Block */}
              <div className="lg:w-1/3 shrink-0">
                <div className="p-8 rounded-3xl border border-neutral-200/60 flex flex-col items-center text-center bg-transparent backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/5 rounded-full -ml-16 -mb-16 blur-3xl" />
                  
                  <div className="w-20 h-20 bg-primary-600 text-white rounded-[24px] flex items-center justify-center text-3xl font-black mb-4 shadow-xl shadow-primary-500/30">
                    9.2
                  </div>
                  <span className="text-2xl font-black text-neutral-900 mb-1">Superb</span>
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
                    {t('card.reviews', { count: '1, 245' })}
                  </span>
                  
                  <div className="mt-8 w-full space-y-3">
                    {['Cleanliness', 'Location', 'Service'].map((item) => (
                      <div key={item} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[11px] font-black text-neutral-400 uppercase tracking-tighter">
                          <span>{item}</span>
                          <span>9.5</span>
                        </div>
                        <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: '95%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Amenities */}
            <div className="pt-4">
              <h4 className="text-xl font-bold text-neutral-900 mb-6">{t('details.popularAmenities')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {hotel.amenities.slice(0, 8).map((amenity) => {
                  const Icon = amenityIcons[amenity] || Star;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-4 px-6 py-4 bg-white border border-neutral-100 rounded-2xl shadow-sm hover:border-primary-200 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <span className="text-sm font-bold text-neutral-700">
                        {t(`amenityNames.${amenity}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Select Your Room Section */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">{t('details.selectRoom')}</h3>
              <div className="space-y-4">
                {hotel.rooms.length > 0 ? (
                  hotel.rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))
                ) : (
                  <div className="p-8 text-center bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200">
                    <p className="text-neutral-500">No rooms available for this property currently.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly or show simple placeholders for now */}
        {activeTab === 'amenities' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity] || Star;
              return (
                <div key={amenity} className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-neutral-100 items-center text-center">
                  <Icon className="w-8 h-8 text-primary-500" />
                  <span className="font-semibold text-neutral-900">{t(`amenityNames.${amenity}`)}</span>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-4 animate-in fade-in duration-500">
             {hotel.rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="p-12 text-center bg-white rounded-2xl border border-neutral-100 animate-in fade-in duration-500">
            <p className="text-neutral-500">Review section is coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
