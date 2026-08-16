import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { Maximize2 } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  buttonLabel: string;
  description: string;
  mainImage: string;
  subImages: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'vedic-vivah',
    title: 'Vedic Vivah',
    buttonLabel: 'Book our Pandit / Baidik',
    description:
      'Experience spiritually enriched and authentic Bengali Vedic wedding ceremonies conducted by scholarly priests (Lady & Gentleman Vedic priests available). Complete Vedic mantras, Shubho Drishti, Saat Paake Bandha, Sindoor Daan, and sacred homa rituals guided with profound grace and timeless tradition.',
    mainImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'trey-decoration',
    title: 'Trey Decoration',
    buttonLabel: 'Book our Trey decor',
    description:
      'Artisanal Tatta and designer tray decoration tailored for authentic Bengali wedding gifts. Includes bespoke fish decorations, handcrafted bridal dolls, luxury saree wrapping, embroidered towels, cosmetics and confectionery trays curated with exquisite finesse and heritage artistry.',
    mainImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'bridal-mehendi',
    title: 'Bridal Mehendi',
    buttonLabel: 'Book our Bridal mehendi',
    description:
      'Celebrate your auspicious ceremonies with master henna artists specializing in organic, dark-staining bridal mehendi. From intricate Radha-Krishna motifs and traditional Bengali folk designs to modern Arabic and floral patterns for the bride, bridesmaids, and family.',
    mainImage: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'bridal-makeover',
    title: 'Bridal Makeover',
    buttonLabel: 'Book our Bridal Artist',
    description:
      'Turn your bridal dream into breathtaking reality with celebrity makeup artists. Complete HD and Airbrush bridal styling, flawless skin finish, traditional Chandan forehead artistry, authentic jewelry setting, and professional saree pleating crafted to keep you glowing all night.',
    mainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'photography-videography',
    title: 'Photography & Videography',
    buttonLabel: 'Book our Photography',
    description:
      'Preserve precious moments forever with cinematic photography and 4K wedding films. Our team of visual storytellers captures heartfelt candids, pre-wedding teasers, multicam ritual coverage, aerial drone footage, and delivers handcrafted luxury flush-mount leather albums.',
    mainImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'venue-decoration',
    title: 'Venue decoration',
    buttonLabel: 'Book our venue decor',
    description:
      'Transform your wedding venue into a fairytale royal realm. Bespoke mandap installations, floral entrance arches, fairy light canopies, antique brass lamps, grand reception backdrops, and thematic dining ambience crafted with pristine floral arrangements and ambient lighting.',
    mainImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'food-beverages',
    title: 'Food & Beverages',
    buttonLabel: 'Book our Catering team',
    description:
      'Delight your guests with culinary excellence. Authentic Bengali royal wedding feasts featuring Bhetki Paturi, Chingri Malaikari, Kosha Mangsho, live chaat counters, artisanal mocktail bars, and authentic Nolen Gurer gourmet sweets served with royal hospitality.',
    mainImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop',
    ],
  },
  {
    id: 'transportation',
    title: 'Transportation',
    buttonLabel: 'Connect for transportation',
    description:
      'Seamless travel arrangements for the bride, groom, and wedding guests. Luxurious vintage and modern decorated bridal cars, executive luxury sedans, AC passenger coaches, and on-ground logistics managers to guarantee punctual and stress-free guest transit.',
    mainImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop',
    subImages: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500&auto=format&fit=crop',
    ],
  },
];

export default function ServicesPage() {
  const { openQuoteModal, openLightbox } = useAppModals();
  const { services, banners } = useAdminData();

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

  // Merge dynamic services with rich service details
  const displayServices = servicesData.map((item) => {
    const dynamicMatch = services?.find(
      (s) => s.title.toLowerCase().trim() === item.title.toLowerCase().trim() || s.id === item.id
    );
    if (dynamicMatch) {
      return {
        ...item,
        title: dynamicMatch.title,
        description: dynamicMatch.description || item.description,
        mainImage: dynamicMatch.image || item.mainImage,
      };
    }
    return item;
  });

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
        {/* HERO SECTION - Height 320px matching design */}
        <section
          id="services-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image container */}
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

          {/* Main Container - max-w-[1340px] aligned with Header */}
          <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row items-center justify-between">
            {/* Heading: Centered on mobile with balanced typography, left-aligned on sm+ */}
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
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center Snapshot */}
                <div
                  onClick={() => openLightbox(0, polaroidPhotos)}
                  className="relative z-20 w-24 sm:w-30 md:w-38 lg:w-46 xl:w-50 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_18px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapMid}
                      alt="Bengali Bride in Palki"
                      fill
                      className="object-cover object-center"
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
                      alt="Wedding Couple"
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

        {/* 2. Breadcrumbs Area matching max-w-[1340px] alignment */}
        <div className="bg-[#fbf9f6] border-b border-[#ebdcc9] pt-8 pb-3 sm:py-3 relative z-10">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-center sm:text-left">
            <Link href="/" className="text-[#b81414] hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-400 mx-2">&gt;</span>
            <span className="text-gray-600 font-medium">Services</span>
          </div>
        </div>

        {/* 3. Alternating Services List Section */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
            {displayServices.map((service, index) => {
              const isEven = index % 2 === 1; // Even indexed items flip image to left

              return (
                <div
                  key={service.id}
                  id={`service-${service.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Content Column (Text + Button + 4 Sub-thumbnails) */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                  >
                    <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#8b1e28] mb-3 sm:mb-4 tracking-tight">
                      {service.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-xl">
                      {service.description}
                    </p>

                    {/* Action Button */}
                    <div className="mb-6">
                      <button
                        id={`btn-service-${service.id}`}
                        onClick={() => openQuoteModal(service.title)}
                        className="bg-[#b81414] hover:bg-[#991111] text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center gap-2"
                      >
                        <span>{service.buttonLabel}</span>
                      </button>
                    </div>

                    {/* 4 Mini Sub-gallery thumbnails */}
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-md">
                      {service.subImages.map((subImg, sIdx) => {
                        const serviceGalleryPhotos = [
                          { title: service.title, image: service.mainImage, category: 'SERVICE SPOTLIGHT' },
                          ...service.subImages.map((img, i) => ({
                            title: `${service.title} - Showcase ${i + 1}`,
                            image: img,
                            category: 'SERVICE GALLERY',
                          })),
                        ];

                        return (
                          <div
                            key={sIdx}
                            onClick={() => openLightbox(sIdx + 1, serviceGalleryPhotos)}
                            className="group relative aspect-[3/4] rounded-md overflow-hidden bg-gray-100 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer border border-[#eedfcb]"
                          >
                            <Image
                              src={subImg}
                              alt={`${service.title} thumbnail ${sIdx + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Image Feature Column */}
                  <div
                    className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                  >
                    <div
                      onClick={() => {
                        const serviceGalleryPhotos = [
                          { title: service.title, image: service.mainImage, category: 'SERVICE SPOTLIGHT' },
                          ...service.subImages.map((img, i) => ({
                            title: `${service.title} - Showcase ${i + 1}`,
                            image: img,
                            category: 'SERVICE GALLERY',
                          })),
                        ];
                        openLightbox(0, serviceGalleryPhotos);
                      }}
                      className="group relative aspect-[16/10] sm:aspect-[16/10.5] rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-[#eedfcb]"
                    >
                      <Image
                        src={service.mainImage}
                        alt={service.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
