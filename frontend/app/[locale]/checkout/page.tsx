import { CheckoutPage } from '@/components/checkout';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
