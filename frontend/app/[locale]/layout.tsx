import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import "../globals.css";

export const metadata: Metadata = {
  title: "StayKZ — Hotel Booking in Kazakhstan",
  description:
    "Discover and book the best hotels across Kazakhstan with transparent pricing and local payment methods like Kaspi, Freedom Bank, Google Pay, and Apple Pay.",
  keywords: [
    "hotel booking",
    "Kazakhstan",
    "Kaspi",
    "Freedom Bank",
    "hotels",
    "StayKZ",
  ],
};

type Params = Promise<{ locale: string }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ru' | 'kk')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
