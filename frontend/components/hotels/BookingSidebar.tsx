"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Info, ArrowRight, ShieldCheck, ChevronDown, Plus, Minus, Users } from 'lucide-react';

interface BookingSidebarProps {
  pricePerNight: number;
}

export function BookingSidebar({ pricePerNight }: BookingSidebarProps) {
  const t = useTranslations('hotels');
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const nights = 2; // For demo purpose
  const subtotal = pricePerNight * nights;
  const taxes = 8500;
  const discount = 4250;
  const total = subtotal + taxes - discount;

  return (
    <aside className="w-full space-y-6">
      {/* Map Card */}
      <div className="relative group rounded-[32px] overflow-hidden aspect-[16/10] border border-neutral-200/60 shadow-sm w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: "url('/images/hotels/map.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button variant="outline" size="md" className="bg-white/95 backdrop-blur-md text-primary-600 border-neutral-200/50 hover:bg-white hover:text-primary-700 shadow-2xl scale-100 group-hover:scale-110 transition-all font-bold px-6">
            <MapPin className="w-5 h-5 mr-2" />
            {t('details.viewOnMap')}
          </Button>
        </div>
      </div>

      {/* Booking Summary Card */}
      <div className="bg-white rounded-[32px] border border-neutral-100 shadow-2xl shadow-neutral-200/40 p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
        
        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{t('details.booking.summary')}</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
              {t('details.booking.checkIn')}
            </label>
            <Input type="date" className="h-12 text-sm font-bold border-neutral-100 bg-neutral-50/50" defaultValue="2026-03-10" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
              {t('details.booking.checkOut')}
            </label>
            <Input type="date" className="h-12 text-sm font-bold border-neutral-100 bg-neutral-50/50" defaultValue="2026-03-12" />
          </div>
        </div>

        <div className="space-y-2 relative" ref={dropdownRef}>
          <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
            {t('details.booking.guests')}
          </label>
          <div 
            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
            className={`h-12 px-5 flex items-center justify-between bg-neutral-50/50 rounded-2xl border transition-all cursor-pointer hover:bg-neutral-100/80 ${isGuestsOpen ? 'border-primary-500 ring-4 ring-primary-500/10' : 'border-neutral-100'}`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-bold text-neutral-800">
                {adults} {t('details.booking.adults')}{children > 0 && `, ${children} ${t('details.booking.children')}`}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${isGuestsOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Guests Dropdown */}
          {isGuestsOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-100 shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{t('details.booking.adults')}</p>
                    <p className="text-[11px] text-neutral-400 font-medium">Age 13+</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-30"
                      disabled={adults <= 1}
                    >
                      <Minus className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{adults}</span>
                    <button 
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50"
                    >
                      <Plus className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{t('details.booking.children')}</p>
                    <p className="text-[11px] text-neutral-400 font-medium">Age 0-12</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-30"
                      disabled={children <= 0}
                    >
                      <Minus className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{children}</span>
                    <button 
                      onClick={() => setChildren(children + 1)}
                      className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50"
                    >
                      <Plus className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-neutral-100 w-full" />

        {/* Price Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-neutral-500 font-bold">
              Deluxe King Room (x1)
            </span>
            <span className="text-sm font-black text-neutral-900">
              ₸ {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-neutral-500 font-bold">{t('details.booking.taxes')}</span>
              <Info className="w-4 h-4 text-neutral-300 cursor-help" />
            </div>
            <span className="text-sm font-black text-neutral-900">
              ₸ {formatPrice(taxes)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-success-50/50 p-3 rounded-xl border border-success-100/50">
            <span className="text-sm text-success-700 font-bold">{t('details.booking.discount')}</span>
            <span className="text-sm font-black text-success-700">
              -₸ {formatPrice(discount)}
            </span>
          </div>
        </div>

        <div className="h-px bg-neutral-100 w-full" />

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-base font-black text-neutral-900 uppercase tracking-tighter">{t('details.booking.total')}</span>
            <span className="block text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
              {t('details.booking.forNights', { count: nights })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-neutral-900 tracking-tight">
              ₸ {formatPrice(total)}
            </span>
          </div>
        </div>

        <div className="space-y-5 pt-2">
          <Link href="/checkout">
            <Button fullWidth size="lg" className="h-14 rounded-2xl shadow-xl shadow-primary-500/25 group overflow-hidden bg-primary-600 hover:bg-primary-700 cursor-pointer">
              <span className="relative z-10 font-black text-base uppercase tracking-wider">{t('card.bookNow')}</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-2.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-50 py-3 rounded-2xl border border-neutral-100/50">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            {t('details.booking.secureBooking')}
          </div>
        </div>
      </div>
    </aside>
  );
}
