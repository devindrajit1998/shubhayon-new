import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData, MenuItem } from '@/context/AdminDataContext';
import {
  UtensilsCrossed,
  Sparkles,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
  Flame,
  Coffee,
  HeartHandshake,
  ArrowRight,
  Filter,
} from 'lucide-react';

const CATEGORIES = [
  'All Menus',
  'Royal Wedding Feast',
  'Classic Bengali',
  'Grand Reception',
  'Signature Buffet',
  'Traditional Special',
];

export default function MenuPage() {
  const { openQuoteModal, openLightbox } = useAppModals();
  const { menus, banners, isLoading, error } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState('All Menus');
  const [selectedDetailMenu, setSelectedDetailMenu] = useState<MenuItem | null>(null);

  const snapLeft = banners?.menuSnapshotLeft || banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.menuSnapshotMid || banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.menuSnapshotRight || banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';
  const bannerBg = banners?.menuHeroBgImage || banners?.innerHeroBgImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=80';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  const filteredMenus = menus.filter((m) => {
    if (selectedCategory === 'All Menus') return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Royal Bengali Wedding Catering &amp; Plate Menu | Shuvayan</title>
        <meta
          name="description"
          content="Explore royal Bengali wedding catering menus, plate-wise pricing, live food stations, authentic heritage Bengali recipes, and grand feast curation by Shuvayan."
        />
      </Head>

      {/* Header */}
      <Header activePage="menu" />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="menu-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={bannerBg}
              alt="Royal Bengali Catering Background"
              fill
              priority
              className="object-cover object-center brightness-90"
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
                Plate Menus &amp; Feasts
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
        <section id="menu-breadcrumb" className="relative z-10 bg-[#fff5ea] py-3.5 border-b border-[#eedfcb]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-[13px] text-[#554343]">
              <Link href="/" className="hover:text-[#9e1b21] transition-colors font-medium">
                Home
              </Link>
              <span className="text-[#a89595]">&gt;</span>
              <span className="text-[#881b21] font-semibold">Catering Menu</span>
            </div>
          </div>
        </section>

        {/* MAIN MENU CONTENT SECTION */}
        <section className="py-10 lg:py-14 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <p className="text-[#c91103] font-semibold text-sm sm:text-[25px] tracking-normal mb-1">
              Authentic Bengali Heritage
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight">
              Curated Wedding Menus
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

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto pt-1">
              Every dish is prepared using time-honored Bengali recipes, pure ghee, and fresh catches from local markets. Select from our signature packages or customize each item according to your guest preferences.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${isActive
                      ? 'bg-[#c8102e] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-[#faf4ec] border border-[#e5d8c3]'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2].map((n) => (
                <div key={n} className="bg-white rounded-3xl p-8 border border-[#e8d7c3] animate-pulse space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded w-1/4" />
                  <div className="h-40 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredMenus.length === 0 && (
            <div className="bg-white border border-dashed border-[#d8b590] rounded-3xl p-16 text-center max-w-lg mx-auto">
              <UtensilsCrossed className="w-12 h-12 text-[#c8102e] mx-auto mb-3" />
              <h3 className="font-serif-display text-xl font-bold text-gray-800 mb-1">
                Custom Menu Consultation
              </h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                We are currently crafting bespoke seasonal culinary packages. Contact our master chefs to create a custom per-plate catering menu for your celebration.
              </p>
              <button
                onClick={() => openQuoteModal('Catering & Plate Menu Consultation')}
                className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
              >
                Inquire With Master Chef
              </button>
            </div>
          )}

          {/* Menu Cards Grid - Minimalist Luxury Layout */}
          {!isLoading && !error && filteredMenus.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {filteredMenus.map((menu) => {
                const startersList = menu.starters || [];
                const mainCourseList = menu.mainCourse || [];
                const riceBreadsList = menu.riceAndBreads || [];
                const dessertsList = menu.desserts || [];
                const beveragesList = menu.beverages || [];

                const totalItemsCount =
                  startersList.length +
                  mainCourseList.length +
                  riceBreadsList.length +
                  dessertsList.length +
                  beveragesList.length;

                const formattedPrice = menu.pricePerPlate.startsWith('₹')
                  ? menu.pricePerPlate
                  : `₹${menu.pricePerPlate}`;

                return (
                  <div
                    key={menu.id}
                    className="bg-white rounded-2xl border border-[#ebdcc9] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      {/* Top Meta Bar */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#965516] bg-[#fbf3e6] px-2.5 py-0.5 rounded-full border border-[#edd7be]">
                            {menu.category}
                          </span>
                          {menu.badge && (
                            <span className="text-[10px] font-bold bg-[#c8102e] text-white px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>{menu.badge}</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#c8102e] transition-colors leading-snug">
                          {menu.title}
                        </h3>

                        {menu.tagline && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {menu.tagline}
                          </p>
                        )}
                      </div>

                      {/* Pricing & Capacity Snapshot */}
                      <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#f0e8dc] flex items-baseline justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Per Plate</p>
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif-display text-2xl font-bold text-[#c8102e]">
                              {formattedPrice}
                            </span>
                            <span className="text-[11px] text-gray-500 font-normal">/ guest</span>
                          </div>
                        </div>

                        <div className="text-right space-y-0.5">
                          <p className="text-[11px] font-semibold text-gray-700">
                            Min {menu.minimumGuests || '100'} Guests
                          </p>
                          <p className="text-[10px] text-[#c8102e] font-bold">
                            {totalItemsCount} Signature Items
                          </p>
                        </div>
                      </div>

                      {/* Minimalist Highlights Breakdown */}
                      <div className="space-y-2.5 pt-1 text-xs border-t border-gray-100">
                        {startersList.length > 0 && (
                          <div className="flex items-start gap-2 text-gray-700">
                            <span className="font-bold text-amber-700 flex-shrink-0">🍢 Starters:</span>
                            <span className="text-gray-600 truncate">
                              {startersList.slice(0, 3).join(', ')}
                              {startersList.length > 3 && ` +${startersList.length - 3} more`}
                            </span>
                          </div>
                        )}

                        {mainCourseList.length > 0 && (
                          <div className="flex items-start gap-2 text-gray-700">
                            <span className="font-bold text-[#c8102e] flex-shrink-0">🍛 Main:</span>
                            <span className="text-gray-600 truncate">
                              {mainCourseList.slice(0, 2).join(', ')}
                              {mainCourseList.length > 2 && ` +${mainCourseList.length - 2} more`}
                            </span>
                          </div>
                        )}

                        {dessertsList.length > 0 && (
                          <div className="flex items-start gap-2 text-gray-700">
                            <span className="font-bold text-emerald-700 flex-shrink-0">🍨 Mishti:</span>
                            <span className="text-gray-600 truncate">
                              {dessertsList.slice(0, 2).join(', ')}
                              {dessertsList.length > 2 && ` +${dessertsList.length - 2} more`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Minimalist Card Footer */}
                    <div className="px-5 py-3.5 bg-[#faf7f2] border-t border-[#ebdcc9] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDetailMenu(menu)}
                        className="text-xs font-semibold text-gray-700 hover:text-[#c8102e] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Menu ({totalItemsCount})</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openQuoteModal(`${menu.title} (${formattedPrice}/plate)`)}
                        className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <span>Book Plate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dedicated Full Menu Detail Modal */}
          {selectedDetailMenu && (() => {
            const formattedPrice = selectedDetailMenu.pricePerPlate.startsWith('₹')
              ? selectedDetailMenu.pricePerPlate
              : `₹${selectedDetailMenu.pricePerPlate}`;

            return (
              <div
                className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
                onClick={() => setSelectedDetailMenu(null)}
              >
                <div
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-[#ebdcc9] shadow-2xl overflow-hidden my-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-[#1c0d0c] to-[#2d1615] p-5 sm:p-6 text-white flex items-center justify-between flex-shrink-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                          {selectedDetailMenu.category}
                        </span>
                        {selectedDetailMenu.badge && (
                          <span className="text-[10px] font-bold bg-[#c8102e] text-white px-2.5 py-0.5 rounded-full">
                            {selectedDetailMenu.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif-display text-2xl font-bold text-white">
                        {selectedDetailMenu.title}
                      </h3>
                      {selectedDetailMenu.tagline && (
                        <p className="text-xs text-gray-300 mt-0.5 font-light">{selectedDetailMenu.tagline}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDetailMenu(null)}
                      className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-[#fffdfa]">
                    {/* Price & Guests Bar */}
                    <div className="p-4 rounded-xl bg-[#faf6f0] border border-[#ebdcc9] flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Per Plate Investment</p>
                        <p className="font-serif-display text-2xl font-bold text-[#c8102e]">{formattedPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-800">Min {selectedDetailMenu.minimumGuests || '100'} Guests</p>
                        <p className="text-[11px] text-gray-500">Tasting sessions included</p>
                      </div>
                    </div>

                    {/* Course Breakdown */}
                    <div className="space-y-4">
                      {selectedDetailMenu.starters && selectedDetailMenu.starters.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5" />
                            <span>Welcome Drinks &amp; Starters ({selectedDetailMenu.starters.length})</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedDetailMenu.starters.map((dish, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-lg border border-[#ebdcc9]">
                                <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                                <span>{dish}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDetailMenu.mainCourse && selectedDetailMenu.mainCourse.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#c8102e] mb-2 flex items-center gap-1.5">
                            <UtensilsCrossed className="w-3.5 h-3.5" />
                            <span>Main Course Curries &amp; Specialities ({selectedDetailMenu.mainCourse.length})</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedDetailMenu.mainCourse.map((dish, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-lg border border-[#ebdcc9]">
                                <Check className="w-3.5 h-3.5 text-[#c8102e] flex-shrink-0" />
                                <span className="font-medium">{dish}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDetailMenu.riceAndBreads && selectedDetailMenu.riceAndBreads.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#92400e] mb-2 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" />
                            <span>Rice, Pulao &amp; Artisanal Breads ({selectedDetailMenu.riceAndBreads.length})</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedDetailMenu.riceAndBreads.map((dish, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-lg border border-[#ebdcc9]">
                                <Check className="w-3.5 h-3.5 text-[#92400e] flex-shrink-0" />
                                <span>{dish}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDetailMenu.desserts && selectedDetailMenu.desserts.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Authentic Mishti &amp; Desserts ({selectedDetailMenu.desserts.length})</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedDetailMenu.desserts.map((dish, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-lg border border-[#ebdcc9]">
                                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                <span>{dish}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDetailMenu.beverages && selectedDetailMenu.beverages.length > 0 && (
                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600">
                          <strong className="text-gray-800">Beverages &amp; Paan Counters: </strong>
                          {selectedDetailMenu.beverages.join(' • ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 bg-[#faf7f2] border-t border-[#ebdcc9] flex items-center justify-between gap-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedDetailMenu(null)}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const menuToBook = selectedDetailMenu;
                        setSelectedDetailMenu(null);
                        openQuoteModal(`${menuToBook.title} (${formattedPrice}/plate)`);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Book This Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Quality & Hygiene Badges */}
        <section className="bg-[#fff7ed] py-10 border-y border-[#fed7aa]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#c8102e] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">100% Authentic Heritage</h4>
                  <p className="text-xs text-gray-600">Traditional Bawarchi &amp; Royal Bengali Chefs</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">FSSAI Certified Kitchens</h4>
                  <p className="text-xs text-gray-600">Zero compromise on food hygiene &amp; safety</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#d97706] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Live Counters Included</h4>
                  <p className="text-xs text-gray-600">Fresh hot fish fry, jalebi &amp; tandoor stalls</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Tasting &amp; Customization</h4>
                  <p className="text-xs text-gray-600">Tailor items to family &amp; guest preferences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
