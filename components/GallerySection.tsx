import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio?: string;
}

export default function GallerySection() {
  const { openLightbox } = useAppModals();
  const { artists, isLoading, error } = useAdminData();
  const swiperRef = useRef<SwiperType | null>(null);

  // Extract all photos from active artists in Firebase — no fallback
  const dynamicPhotos: GalleryPhoto[] = artists.flatMap((artist) =>
    artist.photos.map((photo, idx) => ({
      id: `${artist.id}-${idx}`,
      title: photo.title || artist.name,
      category: artist.category.toUpperCase(),
      image: photo.image,
    }))
  );

  return (
    <section id="gallery" className="py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <p
            id="gallery-subheading"
            className="text-[#c91103] font-semibold text-sm sm:text-[25px] tracking-normal"
          >
            Our Work
          </p>
          <h2
            id="gallery-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight"
          >
            Moments we create
          </h2>

          {/* Red line with Heart Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="w-14 sm:w-16 h-[1.5px] bg-[#c8102e]" />
            <span className="relative w-3.5 h-3.5 inline-block">
              <Image
                src="/images/heart.svg"
                alt="Heart"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </span>
            <span className="w-14 sm:w-16 h-[1.5px] bg-[#c8102e]" />
          </div>
        </div>

        {/* 1. Loading State — skeleton cards */}
        {isLoading && (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="flex-shrink-0 w-52 aspect-[3/4.2] rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        {/* 3. Empty State — no artist photos in Firebase yet */}
        {!isLoading && !error && dynamicPhotos.length === 0 && (
          <div className="bg-[#fdf8f3] border border-dashed border-[#dfc8a8] rounded-3xl py-16 px-8 text-center max-w-lg mx-auto">
            <Camera className="w-10 h-10 text-[#d99824] mx-auto mb-3" />
            <h3 className="font-serif-display text-lg font-bold text-gray-800 mb-1">
              Gallery Coming Soon
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Portfolio photos will appear here once added from the Admin Portal.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
            >
              View Gallery Page
            </Link>
          </div>
        )}

        {/* 4. Real Firebase Photos Slider */}
        {!isLoading && !error && dynamicPhotos.length > 0 && (
          <>
            <div className="relative px-2 sm:px-4">
              {/* Navigation Prev Button */}
              <button
                id="gallery-prev-btn"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-gray-200 text-gray-700 hover:text-[#c8102e] hover:border-[#c8102e] shadow-lg flex items-center justify-center transition-all duration-200 -translate-x-2 sm:-translate-x-3"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Navigation Next Button */}
              <button
                id="gallery-next-btn"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-gray-200 text-gray-700 hover:text-[#c8102e] hover:border-[#c8102e] shadow-lg flex items-center justify-center transition-all duration-200 translate-x-2 sm:translate-x-3"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Swiper Component */}
              <Swiper
                modules={[Navigation, Autoplay]}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={dynamicPhotos.length > 3}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                spaceBetween={18}
                slidesPerView={1.3}
                breakpoints={{
                  480: { slidesPerView: 2.2, spaceBetween: 16 },
                  768: { slidesPerView: 3.2, spaceBetween: 18 },
                  1024: { slidesPerView: 4.2, spaceBetween: 20 },
                  1280: { slidesPerView: 5, spaceBetween: 20 },
                }}
                className="w-full"
              >
                {dynamicPhotos.map((photo, index) => (
                  <SwiperSlide key={photo.id}>
                    <div
                      id={`gallery-item-${photo.id}`}
                      onClick={() => openLightbox(index, dynamicPhotos)}
                      className="group relative w-full aspect-[3/4.2] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-[#1c1414]"
                    >
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient and Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                      {/* View Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>

                      {/* Bottom Title on card */}
                      <div className="absolute bottom-0 left-0 right-0 p-3.5 text-white">
                        <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#f59e0b] mb-0.5">
                          {photo.category}
                        </p>
                        <p className="text-xs sm:text-sm font-medium line-clamp-1 text-white/95">
                          {photo.title}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* View full Gallery button */}
            <div className="text-center mt-10">
              <Link
                href="/gallery"
                id="view-full-gallery-btn"
                className="inline-flex items-center justify-center bg-[#c8102e] hover:bg-[#a80b24] text-white font-semibold text-sm sm:text-base px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View full Gallery
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
