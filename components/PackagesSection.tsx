import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppModals } from '@/context/AppModalContext';
import { PackageData } from '@/components/PackageDetailModal';

export const packagesList: PackageData[] = [
  {
    id: 'basic',
    title: 'Basic Package',
    tagline: 'Perfect for: Budget-friendly intimate weddings includes:',
    features: [
      'Bridal mehendi',
      'Bridal makeover',
      'Traditional photography',
      'Standard Bengali catering...',
    ],
    fullFeatures: [
      'Bridal mehendi by skilled artist (Front & Back hands)',
      'Bridal makeover with HD makeup & hair styling',
      'Traditional photography coverage for wedding day',
      'Standard Bengali catering with 12 authentic dishes',
      'Basic venue stage floral backdrop',
      'Shubho Bibaho entrance welcome board',
    ],
    priceRange: '₹85,000 - ₹1,50,000',
    idealFor: 'Intimate gatherings (50 - 150 guests)',
    badge: 'Popular for Intimate Events',
  },
  {
    id: 'mid',
    title: 'Mid Package',
    tagline: 'Perfect for: Small to medium family weddings',
    features: [
      'Trey Decoration',
      'Bridal Mehendi',
      'Bridal makeover',
      'Digital invitation card...',
    ],
    fullFeatures: [
      'Trey / Tatta decoration (10 designer trays with custom wrapping)',
      'Bridal Mehendi + 2 close family members',
      'Bridal makeover with Airbrush / HD styling & jewelry setting',
      'Custom animated digital invitation card & WhatsApp save-the-date',
      'Candid & traditional photography with cinematic highlights teaser',
      'Theme stage decoration with floral arc & warm fairy lights',
      'Curated 5-course Bengali wedding banquet buffet',
    ],
    priceRange: '₹1,75,000 - ₹3,20,000',
    idealFor: 'Medium family weddings (150 - 300 guests)',
    badge: 'Best Value',
  },
  {
    id: 'standard',
    title: 'Standard Package',
    tagline: 'Perfect for: Elegant weddings with premium experience',
    features: [
      'Wedding planning assistance',
      'Premium bridal makeover',
      'Bride + 4 member mehendi',
      'Theme decoration...',
    ],
    fullFeatures: [
      'End-to-end wedding planning assistance & day-of coordination',
      'Premium bridal makeover by celebrity stylist with pre-bridal trial',
      'Bridal mehendi + 4 bridesmaid/family member mehendi sessions',
      'Opulent theme decoration (Mandap, Stage, Entrance Arch & Photobooth)',
      'Multi-camera cinematic film, drone shoot & high-res wedding album',
      'Luxury catering menu with live chaat, fish/mutton counters & desserts',
      'Decorated bridal car service for groom & bride commute',
    ],
    priceRange: '₹3,50,000 - ₹6,00,000',
    idealFor: 'Grand celebrations (300 - 600 guests)',
    badge: 'Most Chosen',
  },
  {
    id: 'premium',
    title: 'Premium Package',
    tagline: 'Perfect for: Luxury, stress-free dream weddings',
    features: [
      'Priest / Baidik (Lady)',
      'Grand bride & groom entry',
      'LED screen',
      'Premium buffet...',
    ],
    fullFeatures: [
      'Experienced Senior Vedic Priest / Baidik (Lady or Gentleman options)',
      'Grand bride & groom entry concept with cold pyros, smoke & doli/chhatra',
      'High-definition LED display screens with live multicam broadcast',
      'Royal Bengali & Continental luxury buffet with live gourmet stations',
      'Complete VIP hospitality team, guest assistance & luggage management',
      'Complete wedding film, teaser, teaser reels, and 2 luxury leather albums',
      'Full venue ambient architectural lighting & floral installation',
    ],
    priceRange: '₹6,50,000 - ₹12,00,000+',
    idealFor: 'Luxury royal weddings (500+ guests)',
    badge: 'Royal Experience',
  },
];

export default function PackagesSection() {
  const { openPackageModal } = useAppModals();

  // Alternating top border colors: Basic (Red), Mid (Gold), Standard (Red), Premium (Gold)
  const topBorderColors: Record<string, string> = {
    basic: 'border-t-[#b81414]',
    mid: 'border-t-[#e5a83b]',
    standard: 'border-t-[#b81414]',
    premium: 'border-t-[#e5a83b]',
  };

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-[#faf7f2]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p
            id="packages-subheading"
            className="text-[#b81414] font-semibold text-sm sm:text-base tracking-normal mb-1.5"
          >
            We Offer
          </p>
          <h2
            id="packages-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#5c5959] tracking-tight"
          >
            Best Packages
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

        {/* 4 Columns Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {packagesList.map((pkg) => {
            const topBorderClass = topBorderColors[pkg.id] || 'border-t-[#b81414]';
            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`bg-white rounded-lg border-x border-b border-[#e5a83b] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-[5px] ${topBorderClass}`}
              >
                <div>
                  {/* Title */}
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#74161f] mb-2">
                    {pkg.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed mb-6 min-h-[44px]">
                    {pkg.tagline}
                  </p>

                  {/* Bullet List with floral star bullet */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333333]">
                        <span className="relative w-3.5 h-3.5 flex-shrink-0 mt-0.5 inline-block">
                          <Image
                            src="/images/bullet.svg"
                            alt="Bullet"
                            fill
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button: Check details (Centered) */}
                <div className="pt-2 flex justify-center">
                  <Link
                    id={`btn-check-details-${pkg.id}`}
                    href={`/packages/${pkg.id}`}
                    className="bg-[#b81414] hover:bg-[#991111] text-white font-medium text-xs sm:text-sm py-2 px-6 rounded-md shadow-sm hover:shadow-md transition-all duration-200 text-center inline-block"
                  >
                    Check details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
