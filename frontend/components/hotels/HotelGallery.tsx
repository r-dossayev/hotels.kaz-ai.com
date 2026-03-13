'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';

interface HotelGalleryProps {
  images: string[];
}

export function HotelGallery({ images }: HotelGalleryProps) {
  // We need at least 5 images for the full grid layout
  // Fallback to placeholders if missing
  const displayImages = [...images, ...Array(5).fill('/images/placeholder.jpg')].slice(0, 5);

  return (
    <section className="py-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[550px]">
          {/* Main Large Image (50% width usually means 2 columns in a 4-col grid) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
            <Image
              src={displayImages[0]}
              alt="Hotel view"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>

          {/* Right Section: 4 Images */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 h-full">
            {/* Top 2 Images (Higher) */}
            <div className="relative group overflow-hidden rounded-2xl h-[60%] md:h-auto">
              <Image
                src={displayImages[1]}
                alt="Hotel view"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl h-[60%] md:h-auto">
              <Image
                src={displayImages[2]}
                alt="Hotel view"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Bottom 2 Images (Lower) */}
            <div className="relative group overflow-hidden rounded-2xl h-[40%] md:h-auto">
              <Image
                src={displayImages[3]}
                alt="Hotel view"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl h-[40%] md:h-auto">
              <Image
                src={displayImages[4]}
                alt="Hotel view"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              
              {/* Overlay for more images if count > 5 */}
              {images.length > 5 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors duration-300">
                  <span className="text-white font-semibold text-lg">+{images.length - 5} photos</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
