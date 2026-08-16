import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSection from '@/components/StatsSection';
import CtaBanner from '@/components/CtaBanner';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { HeartHandshake, Sparkles, Award, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';

export default function AboutPage() {
  const { openQuoteModal, openLightbox } = useAppModals();
  const { banners } = useAdminData();

  const values = [
    {
      icon: HeartHandshake,
      title: 'Authentic Vedic Roots',
      description:
        'We honor sacred rituals with scholarly priests (lady and gentleman Baidik scholars) ensuring that every mantra, Saat Paake Bandha, and Sindoor Daan carries deep spiritual authenticity.',
    },
    {
      icon: Sparkles,
      title: 'Artisanal Craftsmanship',
      description:
        'From masterfully sculpted Tatta trays and designer mukuts to bespoke royal floral mandaps, our in-house artisans bring age-old Bengali artistic heritage to life.',
    },
    {
      icon: Award,
      title: 'Culinary Grandeur',
      description:
        'Our heritage banquets celebrate authentic Bengali delicacies—from freshly sourced Bhetki Paturi and Kosha Mangsho to gourmet live counters and artisanal desserts.',
    },
    {
      icon: ShieldCheck,
      title: 'Flawless Peace of Mind',
      description:
        'Dedicated wedding planners, personal bridal attendants, and hospitality managers coordinate every micro-detail so families can truly immerse in the joy of celebration.',
    },
  ];

  const snapLeft = banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';
  const bannerBg = banners?.aboutHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>About Us | Shuvayan Wedding & Event Management</title>
        <meta
          name="description"
          content="Learn about Shuvayan - Kolkata's premier Bengali wedding planning company specializing in authentic rituals, royal decor, Vedic priests, and gourmet catering."
        />
      </Head>

      {/* Main Header */}
      <Header activePage="about" />

      <main className="flex-1">
        {/* 1. Hero Banner: Compact 340-350px height matching other inner pages */}
        <section
          id="about-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image with dark warm wedding backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={bannerBg}
              alt="About Us Wedding Background"
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
                {banners?.aboutHeroTitle || 'About Us'}
              </h1>
            </div>

            {/* Polaroid Snapshots: Beautifully centered hanging over the breadcrumb on mobile, right-aligned on sm+ */}
            <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 lg:right-8 xl:right-12 top-[168px] sm:top-[115px] lg:top-[120px] z-30">
              <div className="relative flex items-center justify-center w-56 sm:w-64 md:w-80 lg:w-[380px] xl:w-[420px]">
                {/* Left Snapshot: Tilted -14deg */}
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

                {/* Center Snapshot: Upright in Front */}
                <div
                  onClick={() => openLightbox(0, polaroidPhotos)}
                  className="relative z-20 w-24 sm:w-30 md:w-38 lg:w-46 xl:w-50 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_18px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapMid}
                      alt="Bengali Bride Topor"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Snapshot: Tilted +14deg */}
                <div
                  onClick={() => openLightbox(2, polaroidPhotos)}
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src={snapRight}
                      alt="Bride Smiling"
                      fill
                      className="object-cover object-top"
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
            <span className="text-gray-600 font-medium">About Us</span>
          </div>
        </div>

        {/* 3. Our Story Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-[#b81414] font-semibold text-xs sm:text-sm tracking-wide uppercase mb-1.5">
                    Our Story &amp; Philosophy
                  </p>
                  <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1f2937] tracking-tight">
                    Where Heritage Meets Contemporary Elegance
                  </h2>

                  {/* Red line with Heart Divider */}
                  <div className="flex items-center gap-3 my-3">
                    <span className="w-14 sm:w-16 h-[1.5px] bg-[#b81414]" />
                    <span className="relative w-3.5 h-3.5 inline-block">
                      <Image
                        src="/images/heart.svg"
                        alt="Heart"
                        fill
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span className="w-14 sm:w-16 h-[1.5px] bg-[#b81414]" />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed">
                  Founded with a deep reverence for Bengal’s rich cultural tapestry, <strong>Shuvayan</strong> was born to make dream wedding celebrations seamless, sacred, and aesthetically extraordinary.
                </p>

                <p className="text-sm sm:text-base text-[#4b5563] leading-relaxed">
                  From traditional Vedic mantras chanted with clarity by seasoned priests to handcrafted fish tatta trays and lavish banquets of Bhetki Paturi, we ensure every ceremony is orchestrated with authentic perfection.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal()}
                    className="bg-[#b81414] hover:bg-[#991111] text-white font-semibold text-sm px-7 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
                  >
                    Plan Your Celebration
                  </button>
                </div>
              </div>

              {/* Story Visual Feature */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#eedfcb] shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
                    alt="Shuvayan Wedding Team"
                    fill
                    className="object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-widest font-semibold text-[#f59e0b] mb-1">
                      Our Promise
                    </p>
                    <p className="font-serif-display text-lg sm:text-xl font-bold">
                      Every ritual respected, every moment cherished forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Pillars Grid */}
        <section className="py-16 sm:py-20 bg-[#faf7f2] border-y border-[#ecdcc8]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[#b81414] font-semibold text-xs sm:text-sm tracking-normal mb-1">
                Why Choose Us
              </p>
              <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#1f2937] tracking-tight">
                Our Core Pillars
              </h3>
              <div className="flex items-center justify-center gap-3 my-3">
                <span className="w-14 sm:w-16 h-[1.5px] bg-[#b81414]" />
                <span className="relative w-3.5 h-3.5 inline-block">
                  <Image
                    src="/images/heart.svg"
                    alt="Heart"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </span>
                <span className="w-14 sm:w-16 h-[1.5px] bg-[#b81414]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#ecdcc8] p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#fde8e8] text-[#b81414] flex items-center justify-center mb-4 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif-display text-lg font-bold text-[#74161f] mb-2">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Stats Strip */}
        <StatsSection />

        {/* 6. Dream Celebration CTA */}
        <CtaBanner />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
