import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { ShieldCheck, Clock, FileText, CheckCircle2, Phone, Mail, Lock } from 'lucide-react';

export default function PolicyPage() {
  const { openLightbox } = useAppModals();
  const { banners, settings } = useAdminData();

  const snapLeft = banners?.policySnapshotLeft || banners?.snapshotLeft || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg';
  const snapMid = banners?.policySnapshotMid || banners?.snapshotMid || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png';
  const snapRight = banners?.policySnapshotRight || banners?.snapshotRight || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg';
  const bannerBg = banners?.policyHeroBgImage || banners?.innerHeroBgImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png';

  const polaroidPhotos = [
    { title: 'Spotlight Couple', image: snapMid, category: 'FEATURED SNAPSHOT' },
    { title: 'Groom & Bride', image: snapLeft, category: 'FEATURED SNAPSHOT' },
    { title: 'Wedding Celebration', image: snapRight, category: 'FEATURED SNAPSHOT' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Policy &amp; Service Terms | Shuvayan</title>
        <meta
          name="description"
          content="Transparent service terms, booking policies, food hygiene guarantees, and privacy protection protocols for Shuvayan event management."
        />
      </Head>

      {/* 1. Header */}
      <Header activePage="policy" />

      <main className="flex-1">
        {/* 2. Hero Banner: Compact 340-350px height with absolute positioned Polaroid collage */}
        <section
          id="policy-hero"
          className="relative z-20 h-[320px] sm:h-[340px] lg:h-[350px] overflow-visible bg-[#1a0f0e]"
        >
          {/* Background image with dark warm wedding backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={bannerBg}
              alt="Policy Background"
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
                {banners?.policyHeroTitle || 'Policy & Terms'}
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
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center Snapshot: Upright in Front */}
                <div
                  className="relative z-20 w-24 sm:w-30 md:w-38 lg:w-46 xl:w-50 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_18px_35px_rgba(0,0,0,0.7)] transform hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
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
                  className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-10 w-20 sm:w-26 md:w-34 lg:w-40 xl:w-44 aspect-[3/4] bg-white p-[3px] sm:p-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transform rotate-14 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-300 ring-1 ring-black/10 rounded-xs"
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
            <span className="text-gray-600 font-medium">Policy</span>
          </div>
        </div>

        {/* 3. Main Policy Content */}
        <section className="py-10 sm:py-14 lg:py-16 bg-[#faf7f2]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <p className="text-[#c91103] font-light text-sm sm:text-[25px] tracking-normal leading-tight mb-0 sm:mb-0.5">
                Transparency &amp; Trust
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight leading-tight">
                Our Service Standards
              </h2>
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

            {/* Policy Accordion / Cards or Dynamic Rich HTML Content */}
            {settings?.policyHtmlContent && settings.policyHtmlContent.trim() ? (
              <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#ecdcc8] shadow-sm space-y-6">
                <div
                  className="prose prose-red max-w-none text-xs sm:text-sm text-[#4b5563] leading-relaxed space-y-4 font-sans"
                  dangerouslySetInnerHTML={{ __html: settings.policyHtmlContent }}
                />

                {/* Contact Desk */}
                <div className="pt-2 bg-[#faf7f2] p-5 rounded-xl border border-[#ecdcc8]">
                  <h4 className="font-serif-display text-base font-bold text-[#74161f] mb-1.5">
                    Have Questions Regarding Terms?
                  </h4>
                  <p className="text-xs text-[#666666] mb-3">
                    Our wedding coordinators are happy to assist you 7 days a week from 10:00 AM to 8:00 PM IST.
                  </p>
                  <div className="text-xs font-semibold text-[#c8102e] flex flex-wrap gap-5">
                    <a href={`tel:${settings?.primaryPhone?.replace(/\s+/g, '') || '7439442349'}`} className="hover:underline flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct: {settings?.primaryPhone || '+91 7439442349'}</span>
                    </a>
                    <a href={`mailto:${settings?.contactEmail || 'enquiry.shuvayan@gmail.com'}`} className="hover:underline flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{settings?.contactEmail || 'enquiry.shuvayan@gmail.com'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 bg-white p-6 sm:p-10 rounded-2xl border border-[#ecdcc8] shadow-sm">
                {/* 1. Date Reservation & Booking */}
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-[#c8102e]">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#74161f]">
                      1. Date Reservation &amp; Payment Schedule
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed pl-8">
                    To lock auspicious Bengali wedding dates (Lagna dates) for our Priests, photographers, stylists, and floral decor teams, a transparent milestone-based structure is observed:
                  </p>
                  <ul className="text-xs sm:text-sm text-[#4b5563] space-y-2 pl-8 list-disc list-inside">
                    <li><strong>25% Advance Token:</strong> Required upon date locking and formal contract signing.</li>
                    <li><strong>50% Intermediate Payment:</strong> Upon finalized theme decor approval, menu tasting, and artist scheduling (30 days prior).</li>
                    <li><strong>25% Final Settlement:</strong> Upon successful completion of reception day events.</li>
                  </ul>
                </div>

                {/* 2. Rescheduling Flexibility */}
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-[#c8102e]">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#74161f]">
                      2. Rescheduling &amp; Date Changes
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed pl-8">
                    We understand unforeseen family circumstances can arise. You may reschedule your celebration up to 45 days prior to the original date with zero postponement penalty, subject to slot availability.
                  </p>
                </div>

                {/* 3. Hygiene Standards */}
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-[#c8102e]">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#74161f]">
                      3. Food Quality &amp; Hygiene Standards
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed pl-8">
                    All catering operations adhere to rigorous FSSAI hygiene standards. We exclusively source fresh, live fish (Chingri, Katla, Bhetki) and grade-A certified ghee and spices from vetted traditional suppliers.
                  </p>
                </div>

                {/* 4. Privacy Guarantee */}
                <div className="space-y-3 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-[#c8102e]">
                    <Lock className="w-5 h-5 flex-shrink-0" />
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#74161f]">
                      4. Privacy &amp; Media Protection
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed pl-8">
                    All client photographs, raw film footage, and family guest lists are stored under strict confidentiality and never shared with third-party advertising networks.
                  </p>
                </div>

                {/* 5. Contact Desk */}
                <div className="pt-2 bg-[#faf7f2] p-5 rounded-xl border border-[#ecdcc8]">
                  <h4 className="font-serif-display text-base font-bold text-[#74161f] mb-1.5">
                    Have Questions Regarding Terms?
                  </h4>
                  <p className="text-xs text-[#666666] mb-3">
                    Our wedding coordinators are happy to assist you 7 days a week from 10:00 AM to 8:00 PM IST.
                  </p>
                  <div className="text-xs font-semibold text-[#c8102e] flex flex-wrap gap-5">
                    <a href={`tel:${settings?.primaryPhone?.replace(/\s+/g, '') || '7439442349'}`} className="hover:underline flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct: {settings?.primaryPhone || '+91 7439442349'}</span>
                    </a>
                    <a href={`mailto:${settings?.contactEmail || 'enquiry.shuvayan@gmail.com'}`} className="hover:underline flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{settings?.contactEmail || 'enquiry.shuvayan@gmail.com'}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
