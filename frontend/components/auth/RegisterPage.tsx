'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, MapPin, Lock, Globe } from 'lucide-react';

export function RegisterPage() {
  const t = useTranslations('auth');
  const locale = useLocale();

  const languages = [
    { code: 'kk', label: 'Қазақша' },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-50 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-neutral-900/5 border border-neutral-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-success-50 border-b border-success-100 px-8 py-4 flex items-center justify-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-success-600" />
            <span className="text-xs font-black text-success-700 uppercase tracking-widest">{t('verifiedBy')}</span>
          </div>

          {/* Card Body */}
          <div className="px-8 py-10 space-y-8">
            {/* Welcome Text */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{t('registerTitle')}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{t('registerSubtitle')}</p>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-neutral-200 rounded-2xl hover:bg-neutral-50 hover:border-neutral-300 transition-all group shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-bold text-neutral-700 group-hover:text-neutral-900 transition-colors">{t('continueGoogle')}</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-neutral-900 border-2 border-neutral-900 rounded-2xl hover:bg-neutral-800 transition-all group shadow-sm">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-sm font-bold text-white">{t('continueApple')}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest whitespace-nowrap">{t('orRegisterWithEmail')}</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* Register Form */}
            <div className="space-y-4">
              <Input label={t('fullName')} placeholder={t('fullNamePlaceholder')} />
              <Input label={t('emailAddress')} type="email" placeholder={t('emailPlaceholder')} />
              <Input label={t('password')} type="password" placeholder={t('passwordPlaceholder')} />
              <Button fullWidth size="lg" className="h-12 rounded-2xl font-bold">
                {t('createAccount')}
              </Button>
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-neutral-400 leading-relaxed">
              {t('termsText')}{' '}
              <a href="#" className="text-primary-600 font-semibold hover:underline">{t('termsLink')}</a>{' '}
              {t('and')}{' '}
              <a href="#" className="text-primary-600 font-semibold hover:underline">{t('privacyLink')}</a>
            </p>

            {/* Login Link */}
            <div className="text-center pt-2">
              <span className="text-sm text-neutral-500">{t('alreadyHaveAccount')}{' '}</span>
              <Link href="/login" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                {t('signIn')}
              </Link>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-neutral-50 border-t border-neutral-100 px-8 py-4 flex items-center justify-center">
            <div className="flex items-center gap-2 text-neutral-400">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{t('secureConnection')}</span>
            </div>
          </div>
        </div>

        {/* Location Below Card */}
        <div className="flex items-center justify-center gap-2 mt-6 text-neutral-400">
          <span className="text-sm font-medium">{t('location')}</span>
          <MapPin className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
