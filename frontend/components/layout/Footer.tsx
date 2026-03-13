'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';

export function Footer() {
  const t = useTranslations('footer');

  const sections = [
    {
      title: t('company'),
      links: [
        { label: t('about'), href: '/' as const },
        { label: t('careers'), href: '/' as const },
        { label: t('blog'), href: '/' as const },
        { label: t('press'), href: '/' as const },
      ],
    },
    {
      title: t('support'),
      links: [
        { label: t('helpCenter'), href: '/' as const },
        { label: t('faq'), href: '/' as const },
        { label: t('contactUs'), href: '/' as const },
      ],
    },
    {
      title: t('legal'),
      links: [
        { label: t('terms'), href: '/' as const },
        { label: t('privacy'), href: '/' as const },
        { label: t('cookies'), href: '/' as const },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
    )},
    { name: 'Instagram', href: '#', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    )},
    { name: 'Twitter', href: '#', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    )},
    { name: 'LinkedIn', href: '#', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    )},
  ];

  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container>
           <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-5 space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center shadow-md">
                   <svg className="w-6 h-6 text-white" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 28L20 12L28 28H12Z" fill="white" fillOpacity="0.3" />
                      <path d="M16 28L20 20L24 28H16Z" fill="white" />
                   </svg>
                </div>
                <span className="text-2xl font-bold text-neutral-900 tracking-tight">
                  Nomad
                </span>
              </Link>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-sm font-medium">
                {t('description')}
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-primary-600 hover:border-primary-100 hover:shadow-sm transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link sections */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title} className="flex flex-col">
                  <h4 className="text-[13px] font-bold text-neutral-900 mb-5">
                    {section.title}
                  </h4>
                  <ul className="space-y-3.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[14px] font-medium text-neutral-500 hover:text-primary-600 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[13px] font-medium text-neutral-500 tabular-nums">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors">English (USD)</Link>
              <div className="w-px h-4 bg-neutral-200" />
              <Link href="/" className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors">Privacy</Link>
              <Link href="/" className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors">Terms</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
