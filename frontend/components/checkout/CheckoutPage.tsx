'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  MapPin, Calendar, Users, ShieldCheck, ArrowRight,
  QrCode, CreditCard, Smartphone, Check, Clock,
  Coffee, X as XIcon
} from 'lucide-react';

type PaymentMethod = 'kaspi' | 'card' | 'apple';

export function CheckoutPage() {
  const t = useTranslations('checkout');
  const navT = useTranslations('nav');
  const locale = useLocale();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('kaspi');
  const [timeLeft, setTimeLeft] = useState(599); // 9:59

  // Mock data (in real app this would come from context/params)
  const hotelName = 'The Ritz-Carlton, Almaty';
  const hotelAddress = '123 Al-Farabi Ave, Almaty, Kazakhstan';
  const roomName = 'Deluxe Room, King Bed';
  const nights = 3;
  const adults = 2;
  const originalPrice = 360000;
  const discountPercent = 10;
  const discount = originalPrice * discountPercent / 100;
  const taxPercent = 12;
  const taxes = (originalPrice - discount) * taxPercent / 100;
  const cityTax = 1500;
  const total = originalPrice - discount + taxes + cityTax;

  useEffect(() => {
    if (selectedPayment !== 'kaspi') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedPayment]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const breadcrumbs = [
    { label: navT('home'), href: '/' },
    { label: navT('hotels'), href: '/hotels' },
    { label: t('pageTitle') },
  ];

  const paymentMethods = [
    { id: 'kaspi' as const, label: t('kaspiQR'), icon: QrCode, color: 'text-red-500' },
    { id: 'card' as const, label: t('card'), icon: CreditCard, color: 'text-blue-500' },
    { id: 'apple' as const, label: t('applePay'), icon: Smartphone, color: 'text-neutral-900' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <PageHeader
        title={t('pageTitle')}
        breadcrumbs={breadcrumbs}
      />

      <section className="py-10">
        <Container>
          {/* Secure Checkout Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{t('pageTitle')}</h2>
                <p className="text-sm text-neutral-500">
                  {t('completeBooking')} <span className="font-bold text-neutral-700">{hotelName}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* Card 1: Guest Details */}
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-2xl flex items-center justify-center">
                      <span className="text-lg font-black text-primary-600">1</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">{t('guestDetails')}</h3>
                  </div>
                  <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors px-4 py-2 bg-primary-50 rounded-xl border border-primary-100/50">
                    {t('edit')}
                  </button>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input label={t('firstName')} placeholder={t('firstNamePlaceholder')} />
                    <Input label={t('lastName')} placeholder={t('lastNamePlaceholder')} />
                    <Input label={t('email')} type="email" placeholder={t('emailPlaceholder')} />
                    <Input label={t('phone')} placeholder={t('phonePlaceholder')} />
                  </div>
                </div>
              </div>

              {/* Card 2: Payment Method */}
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 px-8 py-6 border-b border-neutral-100">
                  <div className="w-10 h-10 bg-primary-50 rounded-2xl flex items-center justify-center">
                    <span className="text-lg font-black text-primary-600">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">{t('paymentMethod')}</h3>
                </div>
                <div className="p-8 space-y-8">
                  {/* Payment Options */}
                  <div className="grid grid-cols-3 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedPayment === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 group ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50/50 shadow-lg shadow-primary-500/10'
                              : 'border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-md'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-primary-100' : 'bg-neutral-50 group-hover:bg-neutral-100'
                          }`}>
                            <Icon className={`w-7 h-7 ${isSelected ? 'text-primary-600' : method.color}`} />
                          </div>
                          <span className={`text-sm font-bold ${isSelected ? 'text-primary-700' : 'text-neutral-700'}`}>
                            {method.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Kaspi QR Expanded */}
                  {selectedPayment === 'kaspi' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-8">
                        <div className="flex flex-col items-center text-center space-y-6">
                          <p className="text-base font-bold text-neutral-700">{t('scanToPay')}</p>

                          {/* QR Code Placeholder */}
                          <div className="relative">
                            <div className="w-52 h-52 bg-white rounded-2xl border-2 border-neutral-200 flex items-center justify-center shadow-inner">
                              <div className="grid grid-cols-5 gap-1.5">
                                {Array.from({ length: 25 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-7 h-7 rounded-sm ${
                                      [0,1,2,4,5,6,8,10,12,14,16,18,20,22,24].includes(i)
                                        ? 'bg-neutral-900'
                                        : 'bg-white'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {/* Kaspi logo overlay */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                              Kaspi.kz
                            </div>
                          </div>

                          {/* Timer */}
                          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-bold text-amber-700">
                              {t('expiresIn')} {formatTime(timeLeft)}
                            </span>
                          </div>

                          <p className="text-sm text-neutral-500 leading-relaxed max-w-md">
                            {t('qrInstruction')}
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-neutral-200" />
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('otherPartners')}</span>
                        <div className="flex-1 h-px bg-neutral-200" />
                      </div>

                      {/* Partner Logos */}
                      <div className="flex items-center justify-center gap-8">
                        {['Freedom', 'VISA', 'MC', 'Google Pay'].map((partner) => (
                          <div
                            key={partner}
                            className="px-5 py-3 bg-white rounded-xl border border-neutral-100 shadow-sm"
                          >
                            <span className="text-sm font-bold text-neutral-400">{partner}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:w-[400px] shrink-0">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                  {/* Hotel Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/images/hotels/hotel-1.jpg"
                      alt={hotelName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <h4 className="text-lg font-black !text-white mb-1">{hotelName}</h4>
                      <div className="flex items-center gap-1.5 text-white/80">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">{hotelAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Check-in / Check-out */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{t('checkIn')}</span>
                        </div>
                        <span className="text-sm font-bold text-neutral-900">15 Mar, 2026</span>
                      </div>
                      <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{t('checkOut')}</span>
                        </div>
                        <span className="text-sm font-bold text-neutral-900">18 Mar, 2026</span>
                      </div>
                    </div>

                    {/* Room Info */}
                    <div>
                      <h5 className="text-base font-bold text-neutral-900 mb-1">{roomName}</h5>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{adults} Adults, {nights} Nights</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success-50 text-success-700 text-xs font-bold rounded-full border border-success-100">
                        <Check className="w-3.5 h-3.5" />
                        {t('freeCancellation')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100">
                        <Coffee className="w-3.5 h-3.5" />
                        {t('breakfastIncluded')}
                      </span>
                    </div>

                    <div className="h-px bg-neutral-100 w-full" />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-500 font-medium">{t('originalPrice', { nights })}</span>
                        <span className="text-sm font-bold text-neutral-900">₸ {formatPrice(originalPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-success-600 font-medium">{t('discount', { percent: discountPercent })}</span>
                        <span className="text-sm font-bold text-success-600">- ₸ {formatPrice(discount)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-500 font-medium">{t('taxesAndFees', { percent: taxPercent })}</span>
                        <span className="text-sm font-bold text-neutral-900">₸ {formatPrice(taxes)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-500 font-medium">{t('cityTax')}</span>
                        <span className="text-sm font-bold text-neutral-900">₸ {formatPrice(cityTax)}</span>
                      </div>
                    </div>

                    <div className="h-px bg-neutral-100 w-full" />

                    {/* Total */}
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-base font-black text-neutral-900 uppercase tracking-tight">{t('totalAmount')}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-neutral-900 tracking-tight">₸ {formatPrice(total)}</span>
                        <span className="block text-[11px] text-neutral-400 font-medium mt-0.5">{t('includedAllTaxes')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="mt-10 max-w-3xl space-y-4">
            <Button
              fullWidth
              size="lg"
              className="h-16 rounded-2xl shadow-xl shadow-primary-500/25 group overflow-hidden bg-primary-600 hover:bg-primary-700"
            >
              <span className="relative z-10 font-black text-lg uppercase tracking-wider">{t('payNow')}</span>
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Button>

            <div className="flex items-center justify-center gap-2.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {t('securePayment')}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
