import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { useAppModals } from '@/context/AppModalContext';
import { Sparkles, Camera, Award, ChevronRight, Maximize2 } from 'lucide-react';

export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  eventsCount: string;
  category: string;
  photos: {
    title: string;
    image: string;
  }[];
}

export const galleryCategories = [
  'Trey Decoration',
  'Bridal Mehendi',
  'Bridal Makeover',
  'Photography',
  'Venue Decoration',
];

export const artistList: ArtistProfile[] = [
  // Bridal Makeover Artists
  {
    id: 'artist-1',
    name: 'Tania Chakraborty',
    role: 'Makeover Artist',
    eventsCount: '150+ Events',
    category: 'Bridal Makeover',
    photos: [
      {
        title: 'Glamorous Bengali Reception HD Bridal Look',
        image: '/images/sample-1.png',
      },
      {
        title: 'Traditional Lal Banarasi & Tikli Makeup',
        image: '/images/sample-2.png',
      },
      {
        title: 'Royal Bridal Mirror Reflection & Mukut',
        image: '/images/sample-3.png',
      },
      {
        title: 'Shubho Drishti Bridal Radiance',
        image: '/images/sample-4.png',
      },
      {
        title: 'Intricate Gold Jewelry & Airbrush Finish',
        image: '/images/sample-5.png',
      },
    ],
  },
  {
    id: 'artist-2',
    name: 'Joy Biswas',
    role: 'Makeover Artist',
    eventsCount: '90+ Events',
    category: 'Bridal Makeover',
    photos: [
      {
        title: 'Classic Bengali Eye Makeup & Chandan Art',
        image: '/images/sample-1.png',
      },
      {
        title: 'Vibrant Sangeet Pastel Makeover',
        image: '/images/sample-2.png',
      },
      {
        title: 'Mukut & Alta Styling for Sindoor Daan',
        image: '/images/sample-3.png',
      },
      {
        title: 'Lustrous Silk Saree Drape & Hair Styling',
        image: '/images/sample-4.png',
      },
      {
        title: 'Gaye Holud Fresh Dewy Glow',
        image: '/images/sample-5.png',
      },
    ],
  },
  {
    id: 'artist-3',
    name: 'Purnima Lahiri',
    role: 'Makeover Artist',
    eventsCount: '90+ Events',
    category: 'Bridal Makeover',
    photos: [
      {
        title: 'Subtle Day Wedding Smokey Eye Styling',
        image: '/images/sample-1.png',
      },
      {
        title: 'Crimson Velvet Bridal Attire & Hairstyle',
        image: '/images/sample-2.png',
      },
      {
        title: 'Contemporary Bengali Fusion Bridal Look',
        image: '/images/sample-3.png',
      },
      {
        title: 'Traditional Shakha Pola & Jewelry Adornment',
        image: '/images/sample-4.png',
      },
      {
        title: 'Grand Reception Evening Glamour',
        image: '/images/sample-5.png',
      },
    ],
  },

  // Trey & Tatta Decoration
  {
    id: 'artist-4',
    name: 'Shuvayan Artisanal Studio',
    role: 'Tatta Designer',
    eventsCount: '120+ Events',
    category: 'Trey Decoration',
    photos: [
      {
        title: 'Handcrafted Fish & Saree Tatta Trays',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Designer Sweets & Dry Fruits Presentation',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Velvet & Brocade Gift Packaging',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Traditional Wedding Dolls & Mukut Display',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Groom Shubh Bibaho Tatta Platter',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },

  // Bridal Mehendi
  {
    id: 'artist-5',
    name: 'Sunita Henna Arts',
    role: 'Mehendi Master',
    eventsCount: '200+ Events',
    category: 'Bridal Mehendi',
    photos: [
      {
        title: 'Detailed Radha-Krishna & Barat Mehendi Motif',
        image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Full Bridal Arms & Feet Henna Patterns',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Floral Mandala & Symmetrical Henna Palms',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Arabic & Bengali Fusion Henna Art',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Dark Organic Stain Organic Mehendi Design',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },

  // Photography
  {
    id: 'artist-6',
    name: 'Shuvayan Cinematic Vision',
    role: 'Lead Photographer',
    eventsCount: '300+ Events',
    category: 'Photography',
    photos: [
      {
        title: 'Royal Couple Cinematic Portrait',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Emotional Saat Paake Bandha Candid Ritual',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Joyful Sindoor Daan Tearful Moments',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Drone Shot of Grand Outdoor Lawn Mandap',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Pre-Wedding Sunset Lake Romance',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },

  // Venue Decoration
  {
    id: 'artist-7',
    name: 'Shuvayan Decor & Architecture',
    role: 'Stage & Mandap Designer',
    eventsCount: '180+ Events',
    category: 'Venue Decoration',
    photos: [
      {
        title: 'Grand Rajbari Palace Theme Mandap',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Hanging Jasmine & Marigold Floral Chandelier',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Illuminated Fairy Light Royal Entrance Gate',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Photobooth with Vintage Bengali Rickshaw',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      },
      {
        title: 'Opulent Reception Stage with Warm Bokeh Lamps',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },
];

export default function GalleryPage() {
  const { openLightbox, openQuoteModal } = useAppModals();
  const [selectedCategory, setSelectedCategory] = useState('Bridal Makeover');

  const displayedArtists = artistList.filter(
    (artist) => artist.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Explore Our Work - Gallery | Shuvayan</title>
        <meta
          name="description"
          content="Explore our extensive Bengali wedding portfolio including Bridal Makeover artists, Trey Decoration, Mehendi, Photography, and Mandap Venue Decor."
        />
      </Head>

      {/* Main Header */}
      <Header activePage="gallery" />

      <main className="flex-1">
        {/* 1. Hero Banner: Compact 340-350px height with absolute positioned Polaroid collage */}
        <section
          id="gallery-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image with dark warm wedding backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/galler-banner.png"
              alt="Gallery Wedding Background"
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
                Moments that <br className="hidden sm:inline" />
                <span className="sm:inline">last forever</span>
              </h1>
            </div>

            {/* Polaroid Snapshots: Beautifully centered hanging over the breadcrumb on mobile, right-aligned on sm+ */}
            <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 lg:right-8 xl:right-12 top-[168px] sm:top-[115px] lg:top-[120px] z-30">
              <div className="relative flex items-center justify-center w-56 sm:w-64 md:w-80 lg:w-[380px] xl:w-[420px]">
                {/* Left Snapshot: Tilted -14deg */}
                <div
                  onClick={() => openLightbox(1)}
                  className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform -rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src="/images/banner-left.jpg"
                      alt="Groom & Bride"
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center Snapshot: Upright in Front */}
                <div
                  onClick={() => openLightbox(0)}
                  className="relative z-20 w-24 sm:w-30 md:w-38 lg:w-46 xl:w-50 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_18px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src="/images/banner-mid.png"
                      alt="Bengali Bride in Palki"
                      fill
                      className="object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Snapshot: Tilted +14deg */}
                <div
                  onClick={() => openLightbox(2)}
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 cursor-pointer ring-1 ring-black/10 rounded-xs"
                >
                  <div className="relative w-full h-full overflow-hidden bg-gray-900">
                    <Image
                      src="/images/banner-right.jpg"
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
            <span className="text-gray-600 font-medium">Gallery</span>
          </div>
        </div>

        {/* 3. Main Gallery / Explore Our Work Section */}
        <section className="py-12 sm:py-16 bg-[#faf7f2]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <p
                id="gallery-subheading"
                className="text-[#b81414] font-semibold text-xs sm:text-sm tracking-normal mb-1"
              >
                Browse moments
              </p>
              <h2
                id="gallery-heading"
                className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1f2937] tracking-tight"
              >
                Explore Our Work
              </h2>

              {/* Red line with Heart Divider */}
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

            {/* Category Filter Pill Bar (Wrapped, No horizontal scroll on mobile) */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
              <div className="bg-[#f6c367] rounded-xl p-1.5 sm:p-2 shadow-sm">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  {galleryCategories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-white text-[#2a1d1d] font-bold shadow-xs'
                            : 'text-[#3d2a14] hover:text-black font-medium hover:bg-white/30'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Artists / Portfolio Cards List */}
            <div className="space-y-6 sm:space-y-8">
              {displayedArtists.map((artist) => (
                <div
                  key={artist.id}
                  id={`artist-row-${artist.id}`}
                  className="bg-[#fff2d8] rounded-lg border border-[#edd7bf] p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 sm:gap-5">
                    {/* Left Column: Artist DP & View Button */}
                    <div className="w-full lg:w-44 flex flex-col items-center justify-center text-center pb-3 lg:pb-0 lg:border-r border-[#ecdcc8] lg:pr-4 flex-shrink-0">
                      {/* Exact Artist DP PNG */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-1">
                        <Image
                          src="/images/artist-dp.png"
                          alt={artist.name}
                          fill
                          className="object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <span className="font-serif-display text-sm sm:text-[15px] font-bold text-[#74161f] leading-tight mb-0.5">
                        {artist.role}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#523e3e] font-medium mb-2.5">
                        {artist.name}
                      </span>

                      <button
                        onClick={() => openQuoteModal(`${artist.role} - ${artist.name}`)}
                        className="bg-[#b81414] hover:bg-[#991111] text-white text-[11px] font-semibold px-4 py-1.5 rounded-sm shadow-xs hover:shadow transition-all"
                      >
                        View Artist
                      </button>
                    </div>

                    {/* Middle Column: 5 Photo Thumbnails */}
                    <div className="w-full flex-1 grid grid-cols-5 gap-1.5 sm:gap-2.5 items-center">
                      {artist.photos.map((photo, pIdx) => {
                        const isLastPhoto = pIdx === 4;
                        return (
                          <div
                            key={pIdx}
                            onClick={() => openLightbox(pIdx % 7)}
                            className="group relative aspect-[3/4] rounded-xs overflow-hidden bg-gray-100 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            <Image
                              src={photo.image}
                              alt={photo.title}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />

                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

                            {/* +20 Photos Badge on 5th Thumbnail */}
                            {isLastPhoto && (
                              <div className="absolute bottom-1 right-1 bg-black/85 text-white text-[8px] sm:text-[10px] font-medium px-1 sm:px-1.5 py-0.5 rounded-xs leading-none">
                                +20 Photos
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column: Makeup Brush PNG + Events Counter */}
                    <div className="w-full lg:w-28 flex flex-row lg:flex-col items-center justify-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#ecdcc8] lg:pl-3 flex-shrink-0">
                      <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                        <Image
                          src="/images/makeup-brush.png"
                          alt="Makeup Brush"
                          fill
                          className="object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-left lg:text-center">
                        <span className="font-serif-display text-sm sm:text-base font-bold text-[#8a1414] block leading-tight">
                          {artist.eventsCount.split(' ')[0]}
                        </span>
                        <span className="text-[11px] sm:text-xs text-[#8a1414] font-medium block leading-tight">
                          Events
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Gallery Bottom Quote & Enquiry Banner */}
        <section
          id="gallery-bottom-cta"
          className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#faf5eb] border-t border-[#f0e2cf]"
        >
          {/* Floral Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/Layer 40.png"
              alt="Floral Background"
              fill
              priority
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Cursive Quote in Red */}
            <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#a81414] leading-[1.3] drop-shadow-xs">
              From ideas to execution,
              <br />
              we are with you at every step to make it perfect.
            </p>

            {/* Enquire Now Button */}
            <div className="mt-7">
              <button
                id="gallery-enquire-now-btn"
                onClick={() => openQuoteModal()}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#b81414] hover:bg-[#9e1111] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Enquire Now</span>
                <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ChevronRight className="w-3 h-3 text-white stroke-[2.5]" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
