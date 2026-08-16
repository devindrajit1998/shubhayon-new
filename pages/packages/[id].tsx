import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { packagesList } from '@/components/PackagesSection';
import { CheckCircle2, Sparkles, Users, IndianRupee, ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = packagesList.map((pkg) => ({
    params: { id: pkg.id },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pkg = packagesList.find((p) => p.id === params?.id) || null;
  return {
    props: {
      pkg,
    },
  };
};

interface PackageDetailsPageProps {
  pkg: (typeof packagesList)[0] | null;
}

export default function PackageDetailsPage({ pkg: initialPkg }: PackageDetailsPageProps) {
  const router = useRouter();
  const { openQuoteModal, openLightbox } = useAppModals();
  const { packages, banners } = useAdminData();

  const snapLeft = banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  // Prefer live Firebase package if available
  const currentId = (router.query.id as string) || initialPkg?.id;
  const livePkg = packages?.find((p) => p.id === currentId);
  const pkg = livePkg || initialPkg;

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfaf7]">
        <h1 className="text-2xl font-bold mb-4 text-[#74161f]">Package Not Found</h1>
        <Link href="/" className="text-[#b81414] underline">
          Return to Home
        </Link>
      </div>
    );
  }

  // Other packages for recommendation
  const otherPackages = (packages && packages.length > 0 ? packages : packagesList).filter(
    (p) => p.id !== pkg.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>{pkg.title} | Shuvayan Bengali Wedding & Event Management</title>
        <meta
          name="description"
          content={`Detailed inclusions and pricing for ${pkg.title} - ${pkg.tagline || ''}. Authentic Bengali wedding planning by Shuvayan.`}
        />
      </Head>

      {/* Main Header */}
      <Header activePage="packages" />

      <main className="flex-1">
        {/* 1. Hero Banner: Compact 340-350px height with absolute positioned Polaroid collage */}
        <section
          id="package-details-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image with dark warm wedding backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png'}
              alt="Wedding Background"
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
                {pkg.title}
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
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <Link href="/" className="text-[#b81414] hover:underline font-medium">
              Home
            </Link>
            <span className="text-gray-400">&gt;</span>
            <Link href="/packages" className="text-[#b81414] hover:underline font-medium">
              Packages
            </Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-600 font-medium">{pkg.title}</span>
          </div>
        </div>

        {/* 3. Package Main Details Content */}
        <section className="py-12 sm:py-16 bg-[#faf7f2]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
              {/* Left Column: Key Details & Inclusions (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Overview Card */}
                <div className="bg-white rounded-2xl border border-[#ecdcc8] p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div>
                      {pkg.badge && (
                        <span className="inline-block bg-[#fdf2e9] text-[#c87a14] border border-[#fbd38d] text-xs font-bold px-3 py-1 rounded-full mb-2">
                          {pkg.badge}
                        </span>
                      )}
                      <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#74161f]">
                        {pkg.title} Overview
                      </h2>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">Estimated Investment</p>
                      <p className="font-serif-display text-xl sm:text-2xl font-extrabold text-[#b81414]">
                        {pkg.priceRange || 'Custom Quote'}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-[#faf7f2] p-4 rounded-xl border border-[#ecdcc8]">
                      <div className="w-10 h-10 rounded-full bg-[#fde8e8] text-[#b81414] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Ideal Gathering</p>
                        <p className="text-sm font-bold text-gray-800">{pkg.idealFor || 'All Gatherings'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#faf7f2] p-4 rounded-xl border border-[#ecdcc8]">
                      <div className="w-10 h-10 rounded-full bg-[#fffbeb] text-[#d97706] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Execution Guarantee</p>
                        <p className="text-sm font-bold text-gray-800">100% Dedicated Team</p>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Inclusions */}
                  <h3 className="font-serif-display text-xl font-bold text-[#74161f] mb-4">
                    What&apos;s Included in {pkg.title}
                  </h3>

                  <ul className="space-y-3.5 mb-8">
                    {(pkg.fullFeatures || pkg.features).map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-3 text-sm text-[#333333] bg-[#fffdfa] p-3 rounded-lg border border-[#f0e6da]"
                      >
                        <span className="relative w-4 h-4 flex-shrink-0 mt-0.5 inline-block">
                          <Image
                            src="/images/bullet.svg"
                            alt="Bullet"
                            fill
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </span>
                        <span className="leading-relaxed font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Booking CTA Button */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                      Need custom modifications or dietary requirements? We tailor packages to your family.
                    </p>
                    <button
                      onClick={() => openQuoteModal(pkg.title)}
                      className="w-full sm:w-auto bg-[#b81414] hover:bg-[#991111] text-white font-semibold text-sm px-7 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
                    >
                      Book This Package
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Booking Card & Contact Help (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl border border-[#e5a83b] p-6 shadow-md sticky top-28">
                  <div className="text-center pb-6 border-b border-gray-100">
                    <p className="text-xs uppercase tracking-wider text-[#b81414] font-bold mb-1">
                      Ready to Celebrate?
                    </p>
                    <h3 className="font-serif-display text-xl font-bold text-gray-900 mb-2">
                      Get Instant Quote
                    </h3>
                    <p className="text-xs text-gray-500">
                      Lock your wedding date with our priority booking desk.
                    </p>
                  </div>

                  <div className="py-6 space-y-4 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Package:</span>
                      <span className="font-bold text-[#74161f]">{pkg.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Price Estimate:</span>
                      <span className="font-bold text-[#b81414]">{pkg.priceRange}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Availability:</span>
                      <span className="text-green-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Open for 2026-2027
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openQuoteModal(pkg.title)}
                    className="w-full bg-[#b81414] hover:bg-[#991111] text-white font-bold text-sm py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-center"
                  >
                    Request Custom Quote
                  </button>

                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">Prefer speaking with an advisor?</p>
                    <a
                      href="tel:7439442349"
                      className="text-sm font-bold text-[#74161f] hover:text-[#b81414] transition-colors"
                    >
                      Call: +91 7439442349
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Packages Carousel Section */}
            <div className="mt-16 sm:mt-20">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#5c5959] text-center mb-8">
                Explore Other Packages
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherPackages.map((other) => (
                  <div
                    key={other.id}
                    className="bg-white rounded-xl border border-[#ecdcc8] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-serif-display text-xl font-bold text-[#74161f] mb-1">
                        {other.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-4">{other.tagline}</p>
                      <p className="font-serif-display text-sm font-bold text-[#b81414] mb-4">
                        {other.priceRange}
                      </p>
                    </div>

                    <Link
                      href={`/packages/${other.id}`}
                      className="text-center text-xs font-semibold text-[#b81414] hover:underline flex items-center justify-center gap-1 pt-3 border-t border-gray-100"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bottom CTA */}
        <CtaBanner />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
