import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { Sparkles, ArrowRight, Briefcase } from 'lucide-react';

export default function ServicesPage() {
  const { openQuoteModal, openLightbox } = useAppModals();
  const { services, banners, isLoading, error } = useAdminData();

  const bannerBg = banners?.servicesHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';
  const bannerTitle = banners?.servicesHeroTitle || 'Our Services';
  const snapLeft = banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Our Services | Shuvayan Wedding</title>
        <meta
          name="description"
          content="Explore complete Bengali wedding services: Vedic Vivah pandits, tray decor, bridal mehendi, makeover, wedding photography, royal floral decor, and traditional catering."
        />
      </Head>

      <Header activePage="services" />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="services-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={bannerBg}
              alt="Services Wedding Background"
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

          {/* Main Container */}
          <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row items-center justify-between">
            {/* Heading */}
            <div className="pt-20 sm:pt-12 lg:pt-14 text-center sm:text-left w-full sm:w-auto sm:max-w-md md:max-w-xl">
              <h1 className="font-serif-display font-normal text-[26px] sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[65px] text-white leading-[1.15] sm:leading-[1.12] tracking-tight drop-shadow-sm">
                {bannerTitle}
              </h1>
            </div>

            {/* Polaroid Snapshots */}
            <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 lg:right-8 xl:right-12 top-[168px] sm:top-[115px] lg:top-[120px] z-30">
              <div className="relative flex items-center justify-center w-56 sm:w-64 md:w-80 lg:w-[380px] xl:w-[420px]">
                {/* Left Snapshot */}
                <div
                  onClick={() => openLightbox(1, polaroidPhotos)}
                  className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform -rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapLeft}
                      alt="Groom & Bride"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center / Top Snapshot */}
                <div
                  onClick={() => openLightbox(0, polaroidPhotos)}
                  className="relative z-20 w-24 sm:w-30 md:w-40 lg:w-48 xl:w-52 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_12px_30px_rgba(0,0,0,0.65)] hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapMid}
                      alt="Spotlight Couple"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Snapshot */}
                <div
                  onClick={() => openLightbox(2, polaroidPhotos)}
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapRight}
                      alt="Wedding Celebration"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BREADCRUMB BAR */}
        <section id="services-breadcrumb" className="relative z-10 bg-[#fff5ea] py-3.5 border-b border-[#eedfcb]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-[13px] text-[#554343]">
              <Link href="/" className="hover:text-[#9e1b21] transition-colors font-medium">
                Home
              </Link>
              <span className="text-[#a89595]">&gt;</span>
              <span className="text-[#881b21] font-semibold">Services</span>
            </div>
          </div>
        </section>

        {/* SERVICES CONTENT SECTION */}
        <section className="py-14 sm:py-20 lg:py-24 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Loading State */}
          {isLoading && (
            <div className="space-y-12">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d7c3] animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  <div className="lg:col-span-5 h-64 bg-gray-200 rounded-2xl" />
                  <div className="lg:col-span-7 space-y-4">
                    <div className="h-7 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-10 bg-gray-200 rounded w-40 mt-4" />
                  </div>
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

          {/* 4. Real Firebase Services List */}
          {!isLoading && !error && services.length > 0 && (
            <div className="space-y-12 sm:space-y-16">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={service.id}
                    id={`service-detail-${service.id}`}
                    className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#e8d7c3] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    {/* Image Column */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 shadow-md">
                        {service.image ? (
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Briefcase className="w-12 h-12 text-[#d99824]" />
                          </div>
                        )}
                        {service.category && (
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-white/20">
                            {service.category}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Column */}
                    <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#d99824]">
                        {service.category || 'Wedding Service'}
                      </span>
                      <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#74161f]">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => openQuoteModal(service.title)}
                          className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Book {service.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom CTA Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
