'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Toggle } from '@/components/ui/Toggle';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { HotelFilters, PropertyType, Amenity } from '@/types/hotel';

interface FilterSidebarProps {
  filters: HotelFilters;
  onFilterChange: (filters: HotelFilters) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const PROPERTY_TYPES: PropertyType[] = ['hotel', 'apartment', 'villa', 'hostel', 'resort'];
const AMENITIES: Amenity[] = ['wifi', 'pool', 'parking', 'gym', 'spa', 'restaurant', 'bar', 'ac', 'breakfast', 'kitchen'];
const CITIES = ['almaty', 'astana', 'shymkent', 'aktau'];

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  filteredCount,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const t = useTranslations('hotels');

  const updateFilter = <K extends keyof HotelFilters>(key: K, value: HotelFilters[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <T extends string | number>(arr: T[], item: T): T[] => {
    return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  };

  const cityOptions = [
    { value: '', label: t('filters.allCities') },
    ...CITIES.map((c) => ({ value: c, label: t(`cities.${c}`) })),
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 lg:top-24 left-0 z-50 lg:z-auto
          w-80 lg:w-72 h-full lg:h-auto max-h-screen lg:max-h-[calc(100vh-6rem)]
          bg-white lg:bg-transparent
          overflow-y-auto overscroll-contain
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          p-6 lg:pl-0 lg:pr-6 lg:py-2
          custom-scrollbar
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-lg font-bold text-neutral-900">{t('showFilters')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <h3 className="!text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('filters.search')}</h3>
            <Input
              placeholder={t('filters.searchPlaceholder')}
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="text-sm"
            />
          </div>

          <hr className="border-neutral-100" />

          {/* City */}
          <div>
            <h3 className="!text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('filters.city')}</h3>
            <Select
              value={filters.city}
              onChange={(val) => updateFilter('city', val)}
              options={cityOptions}
              placeholder={t('filters.allCities')}
            />
          </div>

          <hr className="border-neutral-100" />

          {/* Property Type */}
          <div>
            <h3 className="!text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('filters.propertyType')}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {PROPERTY_TYPES.map((type) => (
                <Checkbox
                  key={type}
                  label={t(`types.${type}`)}
                  checked={filters.types.includes(type)}
                  onChange={() => updateFilter('types', toggleArrayFilter(filters.types, type))}
                />
              ))}
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Price Range */}
          <div>
            <h3 className="!text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('filters.priceRange')}</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder={t('filters.priceMin')}
                value={filters.priceMin || ''}
                onChange={(e) => updateFilter('priceMin', Number(e.target.value) || 0)}
                className="text-sm"
              />
              <span className="text-neutral-300">—</span>
              <Input
                type="number"
                placeholder={t('filters.priceMax')}
                value={filters.priceMax || ''}
                onChange={(e) => updateFilter('priceMax', Number(e.target.value) || 0)}
                className="text-sm"
              />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Star Rating */}
          <div>
            <h3 className="!text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('filters.starRating')}</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => updateFilter('stars', toggleArrayFilter(filters.stars, star))}
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                    ${filters.stars.includes(star)
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                      : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border border-neutral-200'
                    }
                  `}
                >
                  {star}★
                </button>
              ))}
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Amenities */}
          <div>
            <h3 className="!text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('filters.amenities')}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {AMENITIES.map((amenity) => (
                <Checkbox
                  key={amenity}
                  label={t(`amenityNames.${amenity}`)}
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => updateFilter('amenities', toggleArrayFilter(filters.amenities, amenity))}
                />
              ))}
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Toggles */}
          <div className="space-y-4">
            <Toggle
              label={t('filters.freeCancellation')}
              checked={filters.freeCancellation}
              onChange={(val) => updateFilter('freeCancellation', val)}
            />
            <Toggle
              label={t('filters.instantBooking')}
              checked={filters.instantBooking}
              onChange={(val) => updateFilter('instantBooking', val)}
            />
          </div>

          <hr className="border-neutral-100" />

          {/* Reset + Count */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-neutral-500 text-center">{t('resultsCount', { count: filteredCount })}</p>
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={onReset}
            >
              {t('resetFilters')}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
