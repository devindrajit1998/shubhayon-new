import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { CheckCircle2, Sparkles, Users, IndianRupee, ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default function PackageDetailsPage() {
  const router = useRouter();
  const { openQuoteModal, openLightbox } = useAppModals();
  const { packages, banners, isLoading } = useAdminData();

  const snapLeft = banners?.packagesSnapshotLeft || banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.packagesSnapshotMid || banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.packagesSnapshotRight || banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  const currentId = router.query.id as string;
  const pkg = packages?.find((p) => p.id === currentId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfaf7]">
        <div className="w-10 h-10 border-3 border-[#c8102e] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-gray-500">Loading package details...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfaf7] px-4 text-center">
        <h1 className="text-2xl font-bold mb-2 text-[#74161f]">Package Not Found</h1>
        <p className="text-xs text-gray-500 mb-6">
          The wedding package you are looking for is currently unavailable or has been updated.
        </p>
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Packages</span>
        </Link>
      </div>
    );
  }

  // Other packages for recommendation
  const otherPackages = packages.filter((p) => p.id !== pkg.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>{`${pkg.title} | Shuvayan Bengali Wedding & Event Management`}</title>
        <meta
          name="description"
          content={`Explore details, full features, pricing & catering included in the ${pkg.title} for Bengali Weddings by Shuvayan.`}
        />
      </Head>

      {/* Main Header */}
      <Header activePage="packages" />

      <main className="flex-1">
        {/* Banner Section */}
        <section
          id="package-detail-hero"
          className="relative z-10 bg-[#1e0d0c] text-white overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-[#3d1f1f]"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={banners?.packagesHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png'}
              alt={pkg.title}
              fill
              priority
              className="object-cover object-center opacity-30 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e0d0c] via-[#1e0d0c]/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/packages"
              className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white transition-colors mb-6 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Packages</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                {pkg.badge && (
                  <span className="inline-block bg-[#c8102e] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    {pkg.badge}
                  </span>
                )}
                <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {pkg.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Meta Highlights */}
                <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-amber-100">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-white/10">
                    <IndianRupee className="w-4 h-4 text-amber-300" />
                    <span>{pkg.priceRange}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-white/10">
                    <Users className="w-4 h-4 text-amber-300" />
                    <span>{pkg.idealFor}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>100% Customized Execution</span>
                  </div>
                </div>
              </div>

              {/* 3-Polaroid Cluster */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative w-64 sm:w-72 h-44 sm:h-48">
                  {polaroidPhotos.map((photo, pIdx) => {
                    const rotations = ['-rotate-8', 'rotate-0', 'rotate-8'];
                    const translates = ['-translate-x-6', 'translate-x-0', 'translate-x-6'];
                    const zIndexes = ['z-10', 'z-20', 'z-30'];
                    return (
                      <div
                        key={pIdx}
                        className={`absolute top-0 w-28 sm:w-32 bg-white p-1.5 pb-5 rounded-md shadow-2xl border border-gray-200 transform hover:scale-110 hover:z-40 transition-all duration-300 ${rotations[pIdx]} ${translates[pIdx]} ${zIndexes[pIdx]}`}
                      >
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-900 rounded-xs">
                          <Image
                            src={photo.image}
                            alt={photo.title}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-14 sm:py-20 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Full Features Breakdown */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8d7c3] shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#74161f]">
                    What&apos;s Included in {pkg.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Every service component is managed by experienced in-house specialists.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(pkg.fullFeatures || pkg.features || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-[#fcfaf7] p-3.5 rounded-xl border border-[#ebdcc8]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#c8102e] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-800 leading-snug font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Packages Strip */}
              {otherPackages.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-serif-display text-xl font-bold text-gray-900">
                    Compare Other Wedding Packages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {otherPackages.map((other) => (
                      <Link
                        key={other.id}
                        href={`/packages/${other.id}`}
                        className="bg-[#fcfaf7] hover:bg-white rounded-xl p-4 border border-[#ebdcc8] hover:border-[#c8102e] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="font-serif-display text-base font-bold text-[#74161f] group-hover:text-[#c8102e] transition-colors">
                            {other.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {other.tagline}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f0e2d3] text-xs font-semibold text-[#c8102e]">
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Quote Inquiry Widget */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-[#241312] text-white rounded-2xl p-6 sm:p-7 border border-[#4a2824] shadow-xl space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/20 px-3 py-1 rounded-full border border-[#d99824]/40 mb-2 inline-block">
                    Inquire for this Package
                  </span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                    Book {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Get an itemized custom quote tailored to your exact dates &amp; venue location.
                  </p>
                </div>

                <div className="p-4 bg-white/10 rounded-xl space-y-2 border border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Package Tier:</span>
                    <span className="font-bold text-white">{pkg.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Estimated Range:</span>
                    <span className="font-bold text-amber-300">{pkg.priceRange}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">Guest Scope:</span>
                    <span className="font-bold text-white">{pkg.idealFor}</span>
                  </div>
                </div>

                <button
                  onClick={() => openQuoteModal(pkg.title)}
                  className="w-full bg-[#c8102e] hover:bg-[#a80b24] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request Custom Quotation</span>
                </button>

                <p className="text-[11px] text-center text-gray-400">
                  No commitment required. Our wedding coordinator will call within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
