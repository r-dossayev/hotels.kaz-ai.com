'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container, PageHeader } from '@/components/layout';
import { Select } from '@/components/ui/Select';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { HotelCard } from './HotelCard';
import { FilterSidebar } from './FilterSidebar';
import { hotels as allHotels } from '@/data/hotels';
import type { HotelFilters, SortOption, Hotel } from '@/types/hotel';

const ITEMS_PER_PAGE = 9;

const DEFAULT_FILTERS: HotelFilters = {
  search: '',
  types: [],
  priceMin: 0,
  priceMax: 0,
  stars: [],
  amenities: [],
  freeCancellation: false,
  instantBooking: false,
  city: '',
};

export function HotelsPage() {
  const t = useTranslations('hotels');
  const navT = useTranslations('nav');
  const locale = useLocale();
  const [filters, setFilters] = useState<HotelFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const breadcrumbs = [
    { label: navT('home'), href: '/' },
    { label: navT('hotels') },
  ];

  const getHotelName = useCallback((hotel: Hotel) => {
    return locale === 'ru' ? hotel.nameRu : locale === 'kk' ? hotel.nameKk : hotel.name;
  }, [locale]);

  // Filter hotels
  const filteredHotels = useMemo(() => {
    return allHotels.filter((hotel) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const name = getHotelName(hotel).toLowerCase();
        if (!name.includes(q) && !hotel.name.toLowerCase().includes(q)) return false;
      }

      // Property type
      if (filters.types.length > 0 && !filters.types.includes(hotel.type)) return false;

      // Price range
      if (filters.priceMin > 0 && hotel.pricePerNight < filters.priceMin) return false;
      if (filters.priceMax > 0 && hotel.pricePerNight > filters.priceMax) return false;

      // Stars
      if (filters.stars.length > 0 && !filters.stars.includes(hotel.rating)) return false;

      // Amenities
      if (filters.amenities.length > 0 && !filters.amenities.every((a) => hotel.amenities.includes(a))) return false;

      // Free cancellation
      if (filters.freeCancellation && !hotel.freeCancellation) return false;

      // Instant booking
      if (filters.instantBooking && !hotel.instantBooking) return false;

      // City
      if (filters.city && hotel.city !== filters.city) return false;

      return true;
    });
  }, [filters, getHotelName]);

  // Sort hotels
  const sortedHotels = useMemo(() => {
    const sorted = [...filteredHotels];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'name-asc':
        sorted.sort((a, b) => getHotelName(a).localeCompare(getHotelName(b), locale));
        break;
      case 'recommended':
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
        break;
    }
    return sorted;
  }, [filteredHotels, sort, getHotelName, locale]);

  // Pagination
  const totalPages = Math.ceil(sortedHotels.length / ITEMS_PER_PAGE);
  const paginatedHotels = sortedHotels.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = useCallback((newFilters: HotelFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  const sortOptions = [
    { value: 'recommended', label: t('sort.recommended') },
    { value: 'price-asc', label: t('sort.priceAsc') },
    { value: 'price-desc', label: t('sort.priceDesc') },
    { value: 'rating-desc', label: t('sort.ratingDesc') },
    { value: 'name-asc', label: t('sort.nameAsc') },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <PageHeader
        title={t('pageTitle')}
        subtitle={t('pageSubtitle', { count: allHotels.length })}
        breadcrumbs={breadcrumbs}
      />

      <Container>
        <div className="flex gap-8 py-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            totalCount={allHotels.length}
            filteredCount={filteredHotels.length}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl border border-neutral-100 px-5 py-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-sm font-medium text-neutral-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {t('showFilters')}
                </button>
                <span className="text-sm text-neutral-500 hidden sm:block">{t('resultsCount', { count: filteredHotels.length })}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-medium hidden sm:block">{t('sort.label')}:</span>
                <Select
                  value={sort}
                  onChange={(val) => { setSort(val as SortOption); setCurrentPage(1); }}
                  options={sortOptions}
                  className="text-sm min-w-[180px]"
                />
              </div>
            </div>

            {/* Hotel Grid */}
            {paginatedHotels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-neutral-100">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{t('noResults')}</h3>
                <p className="text-sm text-neutral-500 mb-6 text-center">{t('noResultsDesc')}</p>
                <Button variant="outline" onClick={handleReset} className="rounded-xl">{t('resetFilters')}</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
