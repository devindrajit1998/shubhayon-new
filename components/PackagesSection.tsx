import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { PackageData } from '@/components/PackageDetailModal';
import { Package, Sparkles } from 'lucide-react';

export default function PackagesSection() {
  const { openPackageModal } = useAppModals();
  const { packages, isLoading, error } = useAdminData();

  // Alternating top border colors: Basic (Red), Mid (Gold), Standard (Red), Premium (Gold)
  const topBorderColors: Record<string, string> = {
    basic: 'border-t-[#b81414]',
    mid: 'border-t-[#e5a83b]',
    standard: 'border-t-[#b81414]',
    premium: 'border-t-[#e5a83b]',
  };

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 bg-[#fffdfa]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p
            id="packages-subheading"
            className="text-[#c8102e] font-semibold text-sm sm:text-base tracking-normal mb-1.5"
          >
            Affordable &amp; Luxury
          </p>
          <h2
            id="packages-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#5a5858] tracking-tight"
          >
            Best Packages
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
        </div>

        {/* 1. Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-[#fcfaf7] rounded-lg border border-[#e8d7c3] p-6 animate-pulse space-y-4"
              >
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto" />
                <div className="space-y-2 pt-4">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !error && packages.length === 0 && (
          <div className="bg-white border border-dashed border-[#e8d7c3] rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Package className="w-10 h-10 text-[#d99824] mx-auto mb-3" />
            <h3 className="font-serif-display text-lg font-bold text-gray-800 mb-1">
              Custom Wedding Packages
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              All our wedding packages are tailored to your unique event scope and guest count.
            </p>
            <Link
              href="/packages"
              className="inline-block bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
            >
              Explore Packages
            </Link>
          </div>
        )}

        {/* 4. Real Firebase Packages Grid */}
        {!isLoading && !error && packages.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {packages.map((pkg) => {
                const borderClass = topBorderColors[pkg.id] || 'border-t-[#b81414]';

                return (
                  <div
                    key={pkg.id}
                    id={`package-card-${pkg.id}`}
                    className={`relative bg-[#fcfaf7] rounded-lg shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between border border-[#e8d7c3] border-t-4 ${borderClass} p-6 sm:p-7 text-center`}
                  >
                    {/* Badge */}
                    {pkg.badge && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#b81414] text-white text-[10px] sm:text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                        {pkg.badge}
                      </span>
                    )}

                    {/* Card Content Top */}
                    <div>
                      {/* Package Title */}
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#74161f] tracking-tight mb-2">
                        {pkg.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-[#523e3e] leading-relaxed mb-6 border-b border-[#ebdcc8] pb-4">
                        {pkg.tagline}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-3 text-xs text-[#3a2e2e] text-left mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b81414] mt-1.5 mr-2.5 flex-shrink-0" />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button Bottom */}
                    <div className="pt-2">
                      <button
                        onClick={() => openPackageModal(pkg)}
                        className="w-full bg-[#b81414] hover:bg-[#991111] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-md shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        View More Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore All Packages Link */}
            <div className="text-center mt-12">
              <Link
                href="/packages"
                id="explore-all-packages-btn"
                className="inline-flex items-center justify-center bg-[#b81414] hover:bg-[#991111] text-white font-semibold text-xs sm:text-sm px-7 py-2.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                Explore All Packages
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
