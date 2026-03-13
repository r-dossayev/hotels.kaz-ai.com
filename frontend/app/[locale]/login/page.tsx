import { LoginPage } from '@/components/auth';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LoginRoute() {
  return <LoginPage />;
}
