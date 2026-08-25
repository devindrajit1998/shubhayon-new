import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { Sparkles, Camera, Award, ChevronRight, Maximize2 } from 'lucide-react';

export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  eventsCount: string;
  category: string;
  avatar?: string;
  bio?: string;
  photos: {
    title: string;
    image: string;
  }[];
}

export default function GalleryPage() {
  const { openLightbox, openQuoteModal } = useAppModals();
  const { categories, artists, banners, isLoading, error } = useAdminData();

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const activeCategory = selectedCategory || (categories.length > 0 ? categories[0] : '');

  const displayedArtists = artists.filter(
    (artist) => !activeCategory || artist.category === activeCategory
  );

  const bannerBg = banners?.galleryHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';
  const bannerTitle = banners?.galleryHeroTitle || banners?.innerHeroTitle || 'Moments that last forever';
  const snapLeft = banners?.gallerySnapshotLeft || banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.gallerySnapshotMid || banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.gallerySnapshotRight || banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

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
              src={bannerBg}
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
                      alt="Groom & Bride"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center / Top Snapshot: Straight with elevated shadow */}
                <div
                  className="relative z-20 w-24 sm:w-30 md:w-40 lg:w-48 xl:w-52 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_12px_30px_rgba(0,0,0,0.65)] hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
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

                {/* Right Snapshot: Tilted +14deg */}
                <div
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
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

        {/* 2. Breadcrumb Bar */}
        <section id="gallery-breadcrumb" className="relative z-10 bg-[#fff5ea] py-3.5 border-b border-[#eedfcb]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-[13px] text-[#554343]">
              <Link href="/" className="hover:text-[#9e1b21] transition-colors font-medium">
                Home
              </Link>
              <span className="text-[#a89595]">&gt;</span>
              <span className="text-[#881b21] font-semibold">Gallery</span>
            </div>
          </div>
        </section>

        {/* Gallery Content Section */}
        <section className="py-12 sm:py-16 lg:py-20 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <p className="text-[#c91103] font-light text-sm sm:text-[25px] tracking-normal leading-tight mb-0 sm:mb-0.5">
              Captured Moments
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight leading-tight">
              Explore Our Portfolio
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
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="w-24 h-9 bg-gray-200 rounded-md animate-pulse" />
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2].map((n) => (
                  <div key={n} className="h-36 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          )}

          {/* 2. Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          {/* 3. Empty State */}
          {!isLoading && !error && (categories.length === 0 || artists.length === 0) && (
            <div className="bg-[#fffdfa] border border-dashed border-[#d8b590] rounded-2xl p-12 text-center max-w-lg mx-auto">
              <Camera className="w-10 h-10 text-[#d99824] mx-auto mb-3" />
              <h3 className="font-serif-display text-lg font-bold text-gray-800 mb-1">
                Gallery Coming Soon
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Our team is currently publishing the latest wedding photography &amp; makeover portfolios.
              </p>
              <button
                onClick={() => openQuoteModal('General Portfolio Inquiry')}
                className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
              >
                Inquire With Our Team
              </button>
            </div>
          )}

          {/* 4. Real Firebase Categories & Artists */}
          {!isLoading && !error && categories.length > 0 && artists.length > 0 && (
            <div className="space-y-8">
              {/* Category Filter Tabs Bar - Full Width */}
              <div className="w-full">
                <div className="w-full flex items-center justify-between gap-1 sm:gap-2 p-1.5 sm:p-2 bg-[#f5ecdd] rounded-xl border border-[#e8d5bf] shadow-xs overflow-x-auto no-scrollbar">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex-1 min-w-[120px] py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold text-center whitespace-nowrap transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#c8102e] text-white shadow-xs'
                            : 'text-[#5a4242] hover:bg-[#ebd9c2] hover:text-[#74161f]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Artists / Portfolio Cards List */}
              <div className="space-y-6 sm:space-y-8">
                {displayedArtists.length === 0 ? (
                  <div className="text-center py-12 bg-[#fffdfa] rounded-lg border border-[#edd7bf] text-gray-500 text-xs">
                    No specialist portfolios found under &quot;{activeCategory}&quot;.
                  </div>
                ) : (
                  displayedArtists.map((artist) => (
                    <div
                      key={artist.id}
                      id={`artist-row-${artist.id}`}
                      className="bg-[#fff2d8] rounded-lg border border-[#edd7bf] p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 sm:gap-5">
                        {/* Left Column: Artist DP & View Button */}
                        <div className="w-full lg:w-44 flex flex-col items-center justify-center text-center pb-3 lg:pb-0 lg:border-r border-[#ecdcc8] lg:pr-4 flex-shrink-0">
                          <Link href={`/gallery/artist/${artist.id}`} className="group block mb-1.5">
                            <div className="relative w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-full overflow-hidden border-2 border-[#d99824]/40 bg-white shadow-xs group-hover:scale-105 group-hover:border-[#c8102e] transition-all">
                              <Image
                                src={artist.avatar || '/images/artist-dp.png'}
                                alt={artist.name}
                                fill
                                className={artist.avatar ? 'object-cover object-top' : 'object-contain'}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </Link>

                          <span className="font-serif-display text-sm sm:text-[15px] font-bold text-[#74161f] leading-tight mb-0.5">
                            {artist.role}
                          </span>
                          <span className="text-[11px] sm:text-xs text-[#523e3e] font-medium mb-2.5">
                            {artist.name}
                          </span>

                          <Link
                            href={`/gallery/artist/${artist.id}`}
                            className="inline-block bg-[#b81414] hover:bg-[#991111] text-white text-[11px] font-semibold px-4 py-1.5 rounded-sm shadow-xs hover:shadow transition-all text-center cursor-pointer"
                          >
                            View Artist
                          </Link>
                        </div>

                        {/* Middle Column: Photo Thumbnails Grid */}
                        <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2.5 items-center">
                          {artist.photos.map((photo, pIdx) => {
                            const artistPhotosList = artist.photos.map((p) => ({
                              title: p.title || artist.name,
                              image: p.image,
                              category: artist.category.toUpperCase(),
                            }));

                            return (
                              <div
                                key={pIdx}
                                onClick={() => openLightbox(pIdx, artistPhotosList)}
                                className="group relative aspect-[3/4] bg-[#241715] rounded-md overflow-hidden border border-[#eedfcb] shadow-xs hover:shadow-md transition-all duration-200 transform hover:scale-[1.03] cursor-pointer flex flex-col justify-end"
                              >
                                <Image
                                  src={photo.image}
                                  alt={photo.title || artist.name}
                                  fill
                                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                  referrerPolicy="no-referrer"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Maximize2 className="w-4 h-4 text-amber-300 drop-shadow" />
                                </div>

                                <div className="relative z-10 p-1.5 bg-black/60 backdrop-blur-xs text-white">
                                  <p className="text-[9px] sm:text-[10px] truncate leading-tight font-medium text-center">
                                    {photo.title || `Work Sample #${pIdx + 1}`}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
