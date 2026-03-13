'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import {
  Pencil, LayoutDashboard, CalendarCheck, Heart, CreditCard, Settings, LogOut,
  Plane, Star, MessageSquare, MapPin, ArrowRight, Download, FileText, Check,
  ChevronRight, X
} from 'lucide-react';

const sidebarItems = [
  { key: 'dashboard', icon: LayoutDashboard },
  { key: 'bookings', icon: CalendarCheck },
  { key: 'savedHotels', icon: Heart },
  { key: 'paymentMethods', icon: CreditCard },
  { key: 'settings', icon: Settings },
] as const;

export function ProfilePage() {
  const t = useTranslations('profile');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [primaryCard, setPrimaryCard] = useState(0);

  const userName = 'Rysbek Anvarov';
  const userEmail = 'rysbek@example.com';

  const bookings = [
    {
      id: 1,
      hotelName: 'The Ritz-Carlton, Almaty',
      address: '123 Al-Farabi Ave, Almaty',
      type: 'hotel',
      status: 'confirmed' as const,
      totalPrice: 364380,
      checkIn: '24.12.2026',
      checkOut: '28.12.2026',
      guests: '2 Adults',
      roomType: 'Deluxe King',
      image: '/images/hotels/hotel-1.jpg',
    },
    {
      id: 2,
      hotelName: 'Rixos President Astana',
      address: '7 Kunayev St, Astana',
      type: 'hotel',
      status: 'pending' as const,
      totalPrice: 245000,
      checkIn: '15.01.2027',
      checkOut: '18.01.2027',
      guests: '2 Adults',
      roomType: 'Superior Twin',
      image: '/images/hotels/hotel-2.jpg',
    },
  ];

  const paymentCards = [
    { id: 0, brand: 'Kaspi Gold', last4: '4242', expires: '12/25', icon: '💳' },
    { id: 1, brand: 'Visa Platinum', last4: '8831', expires: '09/27', icon: '💳' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <section className="py-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:w-[280px] shrink-0 space-y-4">
              {/* Profile Card */}
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary-500/20">
                    {userName.charAt(0)}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5 text-neutral-500" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-0.5">{userName}</h3>
                <p className="text-sm text-neutral-500 mb-3">{userEmail}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-200">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {t('goldMember')}
                </span>
              </div>

              {/* Navigation Card */}
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                <div className="py-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 font-bold border-r-2 border-primary-500'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                        }`}
                      >
                        <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-primary-500' : 'text-neutral-400'}`} />
                        {t(`sidebar.${item.key}`)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sign Out */}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white rounded-2xl border border-neutral-100 shadow-sm text-sm font-bold text-red-500 hover:bg-red-50 hover:border-red-100 transition-all">
                <LogOut className="w-4 h-4" />
                {t('sidebar.signOut')}
              </button>
            </div>

            {/* Right Content */}
            <div className="flex-1 min-w-0 space-y-8">
              {/* Welcome */}
              <div>
                <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
                  {t('welcomeBack', { name: userName.split(' ')[0] })} {t('welcomeEmoji')}
                </h1>
                <p className="text-sm text-neutral-500 mt-1">{t('welcomeSubtitle')}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Plane, label: t('stats.totalBookings'), value: '12', color: 'bg-primary-50 text-primary-600' },
                  { icon: Star, label: t('stats.loyaltyPoints'), value: '4,850', color: 'bg-amber-50 text-amber-600' },
                  { icon: MessageSquare, label: t('stats.pendingReviews'), value: '3', color: 'bg-emerald-50 text-emerald-600' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</span>
                        <p className="text-2xl font-black text-neutral-900 -mt-0.5">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upcoming Bookings */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-neutral-900">{t('upcomingBookings')}</h2>
                  <button className="flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                    {t('viewAllHistory')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-5">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                      {/* Booking Header */}
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-36 sm:h-auto relative shrink-0">
                          <Image src={booking.image} alt={booking.hotelName} fill className="object-cover" />
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-neutral-700 rounded-lg border border-white/50">
                            {booking.type === 'hotel' ? 'Hotel' : 'Apartment'}
                          </span>
                        </div>
                        <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-base font-bold text-neutral-900">{booking.hotelName}</h4>
                              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full ${
                                booking.status === 'confirmed'
                                  ? 'bg-success-50 text-success-700 border border-success-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {booking.status === 'confirmed' ? t('confirmed') : t('pendingPayment')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                              <MapPin className="w-3.5 h-3.5" />
                              {booking.address}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{t('totalPrice')}</span>
                            <p className="text-lg font-black text-neutral-900">₸ {booking.totalPrice.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-neutral-100" />

                      {/* Booking Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5">
                        {[
                          { label: t('checkIn'), value: booking.checkIn },
                          { label: t('checkOut'), value: booking.checkOut },
                          { label: t('guests'), value: booking.guests },
                          { label: t('roomType'), value: booking.roomType },
                        ].map((detail) => (
                          <div key={detail.label}>
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{detail.label}</span>
                            <p className="text-sm font-bold text-neutral-900 mt-0.5">{detail.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Booking Actions */}
                      <div className="px-5 pb-5 flex flex-wrap gap-2">
                        {booking.status === 'confirmed' ? (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-xl border border-primary-100 hover:bg-primary-100 transition-colors">
                              <Settings className="w-3.5 h-3.5" />
                              {t('manageBooking')}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-100 hover:bg-neutral-100 transition-colors">
                              <Download className="w-3.5 h-3.5" />
                              {t('downloadVoucher')}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-50 text-neutral-600 text-xs font-bold rounded-xl border border-neutral-100 hover:bg-neutral-100 transition-colors">
                              <FileText className="w-3.5 h-3.5" />
                              {t('invoice')}
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-xs font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
                              <CreditCard className="w-3.5 h-3.5" />
                              {t('completePayment')}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                              <X className="w-3.5 h-3.5" />
                              {t('cancelBooking')}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Linked Accounts + Payment Methods */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Linked Accounts */}
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">{t('linkedAccounts')}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{t('linkedAccountsDesc')}</p>
                    </div>
                    <button className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
                      {t('manage')}
                    </button>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {/* Google */}
                    <div className="flex items-center gap-4 px-6 py-4">
                      <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-neutral-900">Google</p>
                        <p className="text-xs text-neutral-400 truncate">{t('connectedAs', { email: 'otkirbek@gmail.com' })}</p>
                      </div>
                      <div className="w-6 h-6 bg-success-50 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-success-600" />
                      </div>
                    </div>

                    {/* Apple */}
                    <div className="flex items-center gap-4 px-6 py-4">
                      <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-neutral-900">Apple</p>
                        <p className="text-xs text-neutral-400">{t('notConnected')}</p>
                      </div>
                      <button className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors px-3 py-1.5 bg-primary-50 rounded-lg border border-primary-100">
                        {t('connect')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">{t('paymentMethodsTitle')}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{t('paymentMethodsDesc')}</p>
                    </div>
                    <button className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
                      {t('addNew')}
                    </button>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {paymentCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => setPrimaryCard(card.id)}
                        className={`w-full flex items-center gap-4 px-6 py-4 transition-colors text-left ${
                          primaryCard === card.id ? 'bg-primary-50/30' : 'hover:bg-neutral-50'
                        }`}
                      >
                        <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                          {card.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-neutral-900">{card.brand} •••• {card.last4}</p>
                          <p className="text-xs text-neutral-400">{t('expires', { date: card.expires })}</p>
                        </div>
                        {primaryCard === card.id && (
                          <span className="px-2.5 py-1 bg-primary-100 text-primary-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-primary-200 shrink-0">
                            {t('primary')}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
