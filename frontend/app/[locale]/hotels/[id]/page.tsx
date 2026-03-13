import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { hotels } from '@/data/hotels';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { HotelGallery } from '@/components/hotels/HotelGallery';
import { HotelTabs } from '@/components/hotels/HotelTabs';
import { BookingSidebar } from '@/components/hotels/BookingSidebar';

interface HotelPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { id, locale } = await params;
  const hotel = hotels.find((h) => h.id === id);
  const navT = await getTranslations('nav');
  const t = await getTranslations('hotels');

  if (!hotel) {
    notFound();
  }

  // Determine localized name
  const hotelName = locale === 'ru' ? hotel.nameRu : locale === 'kk' ? hotel.nameKk : hotel.name;

  return (
    <main className="min-h-screen bg-neutral-50/50">
      <PageHeader
        title={hotelName}
        subtitle={`${t(`cities.${hotel.city}`)}, Kazakhstan`}
        breadcrumbs={[
          { label: navT('home'), href: '/' },
          { label: navT('hotels'), href: '/hotels' },
          { label: hotelName },
        ]}
      />

      <HotelGallery images={hotel.gallery} />

      <section className="py-12">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content Column */}
            <div className="flex-1 min-w-0">
              <HotelTabs hotel={hotel} />
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:w-[380px] shrink-0">
              <div className="sticky top-28">
                <BookingSidebar pricePerNight={hotel.pricePerNight} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return hotels.map((hotel) => ({
    id: hotel.id,
  }));
}
