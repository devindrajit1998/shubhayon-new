import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useAppModals } from '@/context/AppModalContext';

export default function CtaBanner() {
  const { openQuoteModal } = useAppModals();

  return (
    <section
      id="dream-celebration-cta"
      className="relative py-10 lg:py-14 overflow-hidden bg-[#fffaef] border-t border-[#faeed4]"
    >
      {/* Background Floral Asset */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/Layer 40.png"
          alt="Dream Celebration Pattern"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Script Cursive Intro: "Let's plan your" */}
        <p
          id="cta-script-title"
          className="font-script text-3xl sm:text-4xl lg:text-[50px] text-[#c91103] drop-shadow-sm mb-1"
        >
          Let&apos;s plan your
        </p>

        {/* Main Title: "Dream Celebration ❤️" */}
        <h2
          id="cta-main-title"
          className="font-serif-display text-3xl sm:text-4xl lg:text-[50px]  text-[#787576] tracking-tight mb-4 flex items-center justify-center gap-2.5 flex-wrap"
        >
          <span>Dream Celebration</span>
          <span className="relative w-6 h-6 sm:w-8 sm:h-8 inline-block translate-y-[-2px]">
            <Image
              src="/images/heart.svg"
              alt="Heart"
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </span>
        </h2>

        {/* Subtitle Description */}
        <p
          id="cta-description"
          className="text-sm sm:text-base lg:text-[19px] text-[#080808] font-normal max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          From ideas to execution, we are with you at every step to make it perfect.
        </p>

        {/* Action Button: Enquire Now > */}
        <div>
          <button
            id="cta-enquire-now-btn"
            onClick={() => openQuoteModal()}
            className="group inline-flex items-center gap-3.5 bg-[#c91103] hover:bg-[#a80b24] text-white  text-sm sm:text-base pl-6 pr-2.5 py-2.5 sm:py-3 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform "
          >
            <span>Enquire Now</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors">
              <ChevronRight className="w-4 h-4 text-white group-hover:text-[#c8102e]" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
