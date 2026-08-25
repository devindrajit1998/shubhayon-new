import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { ServiceItem } from '@/components/ServicesSection';
import { Sparkles, ArrowRight, Briefcase, Maximize2 } from 'lucide-react';

function ServiceCardRow({
  service,
  index,
  openQuoteModal,
  openLightbox,
}: {
  service: ServiceItem;
  index: number;
  openQuoteModal: (title: string) => void;
  openLightbox: (index: number, photos: any[]) => void;
}) {
  const isEven = index % 2 === 0;

  // Collect distinct photos for the slider: main image + up to 4 thumbnails
  const thumbnailsList = service.thumbnails && service.thumbnails.length > 0
    ? service.thumbnails
    : [service.image, service.image, service.image, service.image].filter(Boolean);

  // All distinct photos for this service
  const allServicePhotos = Array.from(new Set([service.image, ...thumbnailsList].filter(Boolean)));
  
  // Active photo state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeImage = allServicePhotos[activeIndex] || service.image;

  // Auto change slide every 3.5s (pauses on hover)
  useEffect(() => {
    if (allServicePhotos.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allServicePhotos.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [allServicePhotos.length, isPaused]);

  let actionTarget = service.title.toLowerCase();
  if (actionTarget.includes('priest') || actionTarget.includes('vedic')) actionTarget = 'priest';
  else if (actionTarget.includes('trey') || actionTarget.includes('tray')) actionTarget = 'trey artist';
  else if (actionTarget.includes('mehendi') || actionTarget.includes('mehndi')) actionTarget = 'mehendi artist';
  else if (actionTarget.includes('makeover') || actionTarget.includes('bridal')) actionTarget = 'makeover artist';

  const lightboxPhotos = allServicePhotos.map((img, i) => ({
    id: `${service.id}-${i}`,
    title: `${service.title} - Photo ${i + 1}`,
    category: (service.category || 'Service').toUpperCase(),
    image: img,
  }));

  return (
    <div
      id={`service-detail-${service.id}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group/card"
    >
      {/* Text + Thumbnails Column */}
      <div className={`lg:col-span-6 flex flex-col justify-between h-full space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[44px] leading-tight text-[#c8102e] mb-3">
            {service.title}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed mb-5 max-w-xl whitespace-pre-line">
            {service.longDescription || service.description}
          </p>

          <div>
            <button
              onClick={() => openQuoteModal(service.title)}
              className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-[4px] shadow-xs transition-colors cursor-pointer"
            >
              {service.buttonText || `Book us for ${actionTarget}`}
            </button>
          </div>
        </div>

        {/* Small Interactive Image Thumbnails Row (Thumb Slider) */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5 pt-4">
          {[0, 1, 2, 3].map((i) => {
            const thumbSrc = thumbnailsList[i] || service.image;
            const isCurrentActive = allServicePhotos[activeIndex] === thumbSrc || (activeIndex === 0 && i === 0);

            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const targetIdx = allServicePhotos.indexOf(thumbSrc);
                  setActiveIndex(targetIdx >= 0 ? targetIdx : i);
                }}
                onMouseEnter={() => {
                  const targetIdx = allServicePhotos.indexOf(thumbSrc);
                  setActiveIndex(targetIdx >= 0 ? targetIdx : i);
                }}
                className={`relative aspect-square bg-[#f5f5f5] overflow-hidden rounded-xs border border-[#c8102e] transition-all duration-200 cursor-pointer ${
                  isCurrentActive
                    ? 'opacity-100 shadow-sm'
                    : 'opacity-85 hover:opacity-100'
                }`}
                title={`View photo ${i + 1}`}
              >
                {thumbSrc ? (
                  <Image
                    src={thumbSrc}
                    alt={`${service.title} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Briefcase className="w-5 h-5 text-gray-300 absolute inset-0 m-auto" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Framed Image Column with Active View */}
      <div className={`lg:col-span-6 w-full ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div
          onClick={() => openLightbox(activeIndex, lightboxPhotos)}
          className="relative w-full aspect-[4/3] bg-[#eaeaea] p-2.5 sm:p-3.5 shadow-xs cursor-pointer group"
          title="Click to view in fullscreen lightbox"
        >
          <div className="relative w-full h-full bg-white overflow-hidden">
            {activeImage ? (
              <Image
                key={activeImage}
                src={activeImage}
                alt={service.title}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-103 animate-fadeIn"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                <Briefcase className="w-12 h-12 text-[#d99824]" />
              </div>
            )}

            {/* Hover Fullscreen Indicator */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-4 h-4 text-gray-800" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { openQuoteModal, openLightbox } = useAppModals();
  const { services, banners, isLoading, error } = useAdminData();

  const bannerBg = banners?.servicesHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';
  const bannerTitle = banners?.servicesHeroTitle || 'Our Services';
  const snapLeft = banners?.servicesSnapshotLeft || banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.servicesSnapshotMid || banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.servicesSnapshotRight || banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Our Wedding Services | Shuvayan Event Management</title>
        <meta
          name="description"
          content="Explore our bespoke wedding services: traditional rituals, priest, bridal makeover, mehendi, tray decoration, and luxury mandap setups in Kolkata."
        />
      </Head>

      <Header activePage="services" />

      <main className="flex-1">
        {/* 1. Hero Banner: Compact 340-350px height matching other inner pages */}
        <section
          id="services-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e] select-none"
        >
          {/* Background image with dark warm wedding backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={bannerBg}
              alt="Services Hero Banner"
              fill
              priority
              className="object-cover object-center brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Left dark vignette for headline legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#120606]/95 via-[#190908]/75 to-transparent" />
            {/* Top dark gradient for header overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/30" />
          </div>

          {/* Main Container - max-w-[1340px] aligned with Header */}
          <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row items-center justify-between">
            {/* Heading: Centered on mobile with balanced typography, left-aligned on sm+ */}
            <div className="pt-20 sm:pt-12 lg:pt-14 text-center sm:text-left w-full sm:w-auto sm:max-w-md md:max-w-xl">
              <h1 className="font-serif-display font-normal text-[26px] sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[65px] text-white leading-[1.15] sm:leading-[1.12] tracking-tight drop-shadow-sm">
                {bannerTitle}
              </h1>
            </div>

            {/* Polaroid Snapshots: Beautifully centered hanging over the breadcrumb on mobile, right-aligned on sm+ */}
            <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 lg:right-8 xl:right-12 top-[168px] sm:top-[115px] lg:top-[120px] z-30">
              <div className="relative flex items-center justify-center w-56 sm:w-64 md:w-80 lg:w-[380px] xl:w-[420px]">
                {/* Left Snapshot: Tilted -14deg */}
                <div
                  className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform -rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapLeft}
                      alt="Left featured moment"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center Snapshot: Straight with elevated shadow */}
                <div
                  className="relative z-20 w-24 sm:w-30 md:w-38 lg:w-46 xl:w-50 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_18px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapMid}
                      alt="Center featured moment"
                      fill
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Snapshot: Tilted +14deg */}
                <div
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapRight}
                      alt="Right featured moment"
                      fill
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <section id="services-breadcrumb" className="relative z-10 bg-[#fff5ea] py-3.5 border-b border-[#eedfcb]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-[13px] text-[#554343]">
              <Link href="/" className="hover:text-[#9e1b21] transition-colors font-medium">
                Home
              </Link>
              <span className="text-[#a89595]">&gt;</span>
              <span className="text-[#881b21] font-semibold">Our Services</span>
            </div>
          </div>
        </section>

        {/* Services List Content */}
        <section className="py-10 sm:py-14 lg:py-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header Matching Homepage */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <p
              id="services-subheading"
              className="text-[#c91103] font-light text-sm sm:text-[25px] tracking-normal leading-tight mb-0 sm:mb-0.5"
            >
              What we do
            </p>
            <h2
              id="services-heading"
              className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight leading-tight"
            >
              Our Premium Services
            </h2>

            {/* Red line with Heart Divider */}
            <div className="flex items-center justify-center gap-3 mt-2 sm:mt-2.5 mb-0">
              <span className="w-14 sm:w-16 h-[1px] bg-[#c8102e]" />
              <span className="relative w-3.5 h-3.5 inline-block">
                <Image
                  src="/images/heart.svg"
                  alt="Heart"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="w-14 sm:w-16 h-[1px] bg-[#c8102e]" />
            </div>
          </div>
          {/* 1. Loading State */}
          {isLoading && (
            <div className="space-y-12">
              {[1, 2].map((n) => (
                <div key={n} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-pulse">
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                    <div className="h-10 bg-gray-200 rounded w-36" />
                    <div className="grid grid-cols-4 gap-2 pt-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* 2. Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          {/* 3. Empty State */}
          {!isLoading && !error && services.length === 0 && (
            <div className="bg-white border border-dashed border-[#d8b590] rounded-3xl p-16 text-center max-w-lg mx-auto">
              <Briefcase className="w-12 h-12 text-[#d99824] mx-auto mb-3" />
              <h3 className="font-serif-display text-xl font-bold text-gray-800 mb-1">
                No Services Configured
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Our team is currently updating the service catalog. For custom planning, contact us below.
              </p>
              <button
                onClick={() => openQuoteModal('Custom Wedding Planning')}
                className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
              >
                Inquire With Wedding Specialist
              </button>
            </div>
          )}

          {/* 4. Real Firebase Services List with Interactive Thumbnail Gallery */}
          {!isLoading && !error && services.length > 0 && (
            <div className="space-y-12 sm:space-y-16">
              {services.map((service, index) => (
                <ServiceCardRow
                  key={service.id}
                  service={service}
                  index={index}
                  openQuoteModal={openQuoteModal}
                  openLightbox={openLightbox}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
