import React from 'react';
import Image from 'next/image';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';
import { useAppModals } from '@/context/AppModalContext';

export default function HeroSection() {
  const { openQuoteModal } = useAppModals();

  return (
    <section
      id="hero-section"
      className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center overflow-hidden bg-[#1c0f0d]"
    >
      {/* Background Wedding Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Index-banner.jpg"
          alt="Traditional Bengali Bride and Groom Celebration"
          fill
          priority
          className="object-cover object-right lg:object-center"
          referrerPolicy="no-referrer"
        />

        {/* Subtle shadow overlay on left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent sm:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:py-36 lg:py-44 w-full">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Script Subtitle: "We make" */}
          <div className="mb-1 sm:mb-2">
            <span
              id="hero-script-intro"
              className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#dca142] drop-shadow tracking-wide block"
            >
              We make
            </span>
          </div>

          {/* Main Title: "Every moment Unforgettable ❤️" */}
          <h1
            id="hero-main-heading"
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.14] mb-4 sm:mb-5 drop-shadow-md"
          >
            Every moment
            <span className="block mt-1">
              Un<span className="text-[#c8102e]">f</span>orge<span className="text-[#c8102e]">t</span>able
              <span className="inline-block ml-2 align-middle -translate-y-1">
                <span className="relative inline-block w-4 h-4 sm:w-5 sm:h-5">
                  <Image
                    src="/images/heart.svg"
                    alt="Heart"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </span>
            </span>
          </h1>

          {/* Subheading / Description */}
          <p
            id="hero-description"
            className="text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed mb-8 max-w-lg drop-shadow"
          >
            Shuvayan brings your dream celebration to life with creativity, elegance &amp; flawless execution.
          </p>

          {/* Action CTA: Get Quote Button (Creamy rounded-md button with dark red text) */}
          <div className="flex items-center">
            <button
              id="hero-get-quote-btn"
              onClick={() => openQuoteModal()}
              className="group inline-flex items-center gap-3 bg-[#fffaf2] hover:bg-white text-[#991b1b] font-semibold text-sm sm:text-base px-5 py-2.5 rounded-md shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Get Quote</span>
              <span className="w-5 h-5 rounded-full border border-[#991b1b] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#991b1b] stroke-[2.5]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
