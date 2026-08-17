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
import {
  ArrowLeft,
  Sparkles,
  Award,
  Maximize2,
  ChevronRight,
  Phone,
  Camera,
} from 'lucide-react';
import type { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default function ArtistDetailPage() {
  const router = useRouter();
  const { openQuoteModal, openLightbox } = useAppModals();
  const { artists, banners, settings, isLoading } = useAdminData();

  const currentId = router.query.id as string;
  const artist = artists?.find((a) => a.id === currentId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfaf7]">
        <div className="w-10 h-10 border-3 border-[#c8102e] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-gray-500">Loading artist portfolio...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffdfa] px-4 text-center">
        <h1 className="text-2xl font-bold mb-3 text-[#74161f]">Artist Profile Not Found</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          The specialist artist profile you are looking for is currently unavailable or has been updated.
        </p>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Gallery</span>
        </Link>
      </div>
    );
  }

  const artistPhotosList = artist.photos.map((p) => ({
    title: p.title || `${artist.name} Work Showcase`,
    image: p.image,
    category: artist.category.toUpperCase(),
  }));

  const otherArtists = artists
    .filter((a) => a.id !== artist.id && a.category === artist.category)
    .slice(0, 3);

  const bannerBg =
    banners?.galleryHeroBgImage ||
    banners?.innerHeroBgImage ||
    'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';

  const defaultBio =
    artist.bio ||
    `Specializing in authentic Bengali ${artist.category.toLowerCase()} services, creating timeless elegance, ritual precision, and unforgettable wedding aesthetics.`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf7] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>{`${artist.name} • ${artist.role} | Shuvayan Gallery`}</title>
        <meta
          name="description"
          content={`Explore the work gallery, portfolio, and wedding experience of ${artist.name} - ${artist.role} (${artist.category}) at Shuvayan.`}
        />
      </Head>

      {/* Main Header */}
      <Header activePage="gallery" />

      <main className="flex-1">
        {/* 1. Header Banner & Breadcrumbs */}
        <section className="relative z-10 bg-[#160b0a] text-white overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-[#301c1a]">
          <div className="absolute inset-0 z-0">
            <Image
              src={bannerBg}
              alt="Artist Background"
              fill
              priority
              className="object-cover object-center opacity-35 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#160b0a] via-[#160b0a]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link & Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 mb-6 flex-wrap">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors font-medium mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Artists &amp; Gallery</span>
              </Link>
              <span className="text-gray-500">&gt;</span>
              <span className="text-gray-400">{artist.category}</span>
              <span className="text-gray-500">&gt;</span>
              <span className="text-white font-semibold">{artist.name}</span>
            </div>

            {/* Artist Profile Spotlight Card */}
            <div className="bg-[#241312]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#482824] shadow-2xl space-y-4 text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#d99824]/20 text-[#f5be58] px-3 py-1 rounded-full border border-[#d99824]/40">
                  {artist.category}
                </span>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{artist.eventsCount}</span>
                </span>
              </div>

              {/* Artist Name & Role */}
              <div>
                <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {artist.name}
                </h1>
                <p className="text-base sm:text-lg text-amber-200 font-medium mt-1">
                  {artist.role}
                </p>
              </div>

              {/* Bio Description */}
              <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
                {defaultBio}
              </p>

              {/* Inquire Call-To-Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href={`tel:${settings?.primaryPhone?.replace(/\s+/g, '') || '7439442349'}`}
                  className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Inquire Availability</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Full Work Gallery Showcase Grid - Minimalist & Modern */}
        <section className="py-12 sm:py-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 border-b border-[#ebdcc9] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#c8102e]">
                  Portfolio Gallery
                </span>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {artist.photos.length} {artist.photos.length === 1 ? 'Work' : 'Works'}
                </span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-gray-900">
                Captured Moments &amp; Highlights
              </h2>
            </div>
            <p className="text-xs text-gray-400 font-light">
              Click any photo to view in high-resolution lightbox
            </p>
          </div>

          {artist.photos.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-8 max-w-md mx-auto">
              <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-gray-700">No Portfolio Works Uploaded Yet</h3>
              <p className="text-xs text-gray-500 mt-1">
                Photos added from the Admin Portal will appear here dynamically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {artist.photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx, artistPhotosList)}
                  className="group cursor-pointer relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-[#eedfcb] shadow-2xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Image
                    src={photo.image}
                    alt={photo.title || artist.name}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-gray-900 flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-4 h-4 text-gray-800" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Artists in Same Category */}
          {otherArtists.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#ebdcc8]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-gray-900">
                    More Specialists in {artist.category}
                  </h3>
                  <p className="text-xs text-gray-500">Explore other master artisans in our creative team</p>
                </div>
                <Link
                  href="/gallery"
                  className="text-xs font-bold text-[#c8102e] hover:underline flex items-center gap-1"
                >
                  <span>View All Categories</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherArtists.map((other) => (
                  <Link
                    key={other.id}
                    href={`/gallery/artist/${other.id}`}
                    className="bg-white rounded-2xl p-5 border border-[#eedfcb] shadow-xs hover:shadow-lg transition-all flex items-center gap-4 group"
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d99824] bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Image
                        src={other.avatar || '/images/artist-dp.png'}
                        alt={other.name}
                        fill
                        className={other.avatar ? 'object-cover object-top' : 'object-contain'}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-display text-base font-bold text-gray-900 group-hover:text-[#c8102e] transition-colors truncate">
                        {other.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">{other.role}</p>
                      <span className="text-[10px] font-semibold text-[#8c4604] block mt-0.5">
                        {other.photos.length} Works Uploaded
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3. Bottom CTA */}
        <CtaBanner />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
