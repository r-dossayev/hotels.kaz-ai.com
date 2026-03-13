'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { Container } from './Container';
import { useScroll } from '@/hooks/useScroll';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Button } from '@/components/ui/Button';

const localeLabels: Record<string, string> = {
  en: 'English',
  ru: 'Русский',
  kk: 'Қазақша',
};

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <svg
          className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="12" fill="#171717" />
          <path
            d="M12 28L20 12L28 28H12Z"
            fill="white"
            fillOpacity="0.2"
          />
          <path
            d="M16 28L20 20L24 28H16Z"
            fill="white"
          />
        </svg>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm text-[8px] font-bold text-primary-600">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-xl font-bold text-neutral-900 tracking-tight">
          Nomad
        </span>
        <span className="text-[10px] font-bold text-neutral-400 font-mono tracking-tighter">
          PREMIUM HOTELS
        </span>
      </div>
    </Link>
  );
}

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isScrolled = useScroll(10);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  
  const langRef = useClickOutside(() => setLangOpen(false));

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'en' | 'ru' | 'kk' });
    setLangOpen(false);
  };

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/hotels' as const, label: t('hotels') },
    { href: '/about' as const, label: t('about') },
  ];

  return (
    <>
      {/* Utility Bar - Service Message Theme */}
      <div className="bg-neutral-50 text-neutral-500 text-[11px] py-1.5 hidden md:block border-b border-neutral-200/50 font-medium tracking-wide">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer group">
                <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('phone')}
              </span>
              <span className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer group">
                <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('support')}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-primary-600 font-bold">Special Offer: -15% for new users</span>
              <div className="w-px h-3 bg-neutral-200" />
              <span className="hover:text-neutral-900 transition-colors cursor-pointer">Partner Login</span>
            </div>
          </div>
        </Container>
      </div>

      <header
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 py-3 shadow-sm' 
            : 'bg-white border-transparent py-5'
          }
        `}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-semibold transition-all rounded-lg
                    ${pathname === link.href 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="uppercase">{locale}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2.5 z-50 animate-[slideUp_0.3s_ease-out]">
                    <div className="px-5 py-2 mb-1 border-b border-neutral-50">
                       <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none block">{t('language')}</span>
                    </div>
                    {Object.entries(localeLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`
                          w-full text-left px-5 py-2.5 text-[14px] transition-all flex items-center justify-between group
                          ${
                            code === locale
                              ? 'bg-primary-50 text-primary-700 font-bold'
                              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 font-medium'
                          }
                        `}
                      >
                        {label}
                        {code === locale ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-sm" />
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-neutral-200 group-hover:bg-neutral-300 transition-colors" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pl-4 border-l border-neutral-200">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-bold cursor-pointer">
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="font-bold cursor-pointer">
                    {t('signup')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors border border-transparent active:border-neutral-200"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden py-6 mt-4 border-t border-neutral-100 space-y-4 animate-[slideUp_0.3s_ease-out]">
              <div className="grid grid-cols-1 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex lg:hidden px-4 py-3 text-sm font-bold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-4 border-t border-neutral-100 space-y-4">
                 <div className="px-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{t('language')}</span>
                 </div>
                 <div className="grid grid-cols-3 gap-2 px-2">
                    {Object.entries(localeLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => { switchLocale(code); setMobileOpen(false); }}
                        className={`
                          px-2 py-3 text-[12px] font-bold rounded-xl transition-all border
                          ${code === locale 
                            ? 'bg-primary-50 text-primary-700 border-primary-100' 
                            : 'bg-white text-neutral-600 border-neutral-200'}
                        `}
                      >
                        {code.toUpperCase()}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-3 px-2 pt-4">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" fullWidth>
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button fullWidth>
                    {t('signup')}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </header>
    </>
  );
}
