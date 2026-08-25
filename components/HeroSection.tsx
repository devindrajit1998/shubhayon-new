import React from 'react';
import Image from 'next/image';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';

export default function HeroSection() {
  const { openQuoteModal } = useAppModals();
  const { banners } = useAdminData();

  const heroBg = banners?.homeHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Index-banner.jpg';
  const heroSubtitle = banners?.homeHeroSubtitle || 'We make';
  const heroTitle = banners?.homeHeroTitle || 'Every moment Unforgettable';
  const heroTagline = banners?.homeHeroTagline || 'Shuvayan brings your dream celebration to life with creativity, elegance & flawless execution.';

  return (
    <section
      id="hero-section"
      className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center overflow-hidden bg-[#1c0f0d]"
    >
      {/* Background Wedding Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Traditional Bengali Bride and Groom Celebration"
          fill
          priority
          className="object-cover object-right lg:object-center"
          referrerPolicy="no-referrer"
        />

        {/* Subtle shadow overlay on left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent sm:w-3/4" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" /> */}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:py-36 lg:py-44 w-full">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Script Subtitle */}
          <div className="mb-1 sm:mb-2">
            <span
              id="hero-script-intro"
              className="font-script text-4xl sm:text-5xl lg:text-[68px] text-[#e0a240] drop-shadow tracking-wide block italic font-normal"
            >
              {heroSubtitle}
            </span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-main-heading"
            className="font-serif-display text-4xl sm:text-6xl lg:text-[76px] text-white tracking-tight leading-[1.12] mb-4 sm:mb-5 drop-shadow-md font-medium"
          >
            <span className="block">
              {heroTitle.match(/unforg/i)
                ? (heroTitle.replace(/unforg[a-z]*/i, '').trim() || 'Every moment')
                : (heroTitle || 'Every moment')}
            </span>
            <span className="block mt-1">
              Un<span className="text-[#c8102e]">f</span>org<span className="text-[#c8102e]">e</span>tabl<span className="text-[#c8102e]">e</span>
              <span className="inline-block ml-2 sm:ml-3 transform rotate-12 -translate-y-0.5 sm:-translate-y-1">
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 fill-[#c8102e] text-[#c8102e]" />
              </span>
            </span>
          </h1>

          {/* Subheading / Description */}
          <p
            id="hero-description"
            className="text-[17px] sm:text-lg lg:text-[22px] text-white/95 font-light leading-[1.35] mb-8 drop-shadow max-w-xl"
          >
            {heroTagline}
          </p>

          {/* Action CTA: Get Quote Button */}
          <div className="flex items-center">
            <button
              id="hero-get-quote-btn"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-3 bg-[#fdf0d5] hover:bg-[#fae6be] text-[#c8102e] font-semibold text-base sm:text-lg px-6 sm:px-7 py-2.5 sm:py-3 rounded-md shadow-md transition-colors duration-200"
            >
              <span>Get Quote</span>
              <span className="w-6 h-6 rounded-full border border-[#c8102e] flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-[#c8102e] stroke-[2.5]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
