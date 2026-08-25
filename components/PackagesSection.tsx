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

  // Alternating top border colors: Basic (Red), Mid (Yellow), Standard (Red), Premium (Yellow)
  const topBorderColors: Record<string, string> = {
    basic: 'border-t-[#c8102e]',
    mid: 'border-t-[#e39306]',
    standard: 'border-t-[#c8102e]',
    premium: 'border-t-[#e39306]',
  };

  return (
    <section id="packages" className="py-10 lg:py-14 bg-[#fbf5ea]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
          <p
            id="packages-subheading"
            className="text-[#c91103] font-light text-sm sm:text-[25px] tracking-normal leading-tight mb-0 sm:mb-0.5"
          >
            We Offer
          </p>
          <h2
            id="packages-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight leading-tight"
          >
            Best Packages
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-[#fcfaf7] rounded-xl border border-[#e8d7c3] p-6 animate-pulse space-y-4"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {packages.map((pkg, index) => {
                // Alternate colors: Red (#c8102e), Yellow (#e39306)
                const isEven = index % 2 === 0;
                const themeBorderClass = isEven
                  ? 'border-[#c8102e] border-t-[#c8102e]'
                  : 'border-[#e39306] border-t-[#e39306]';

                return (
                  <div
                    key={pkg.id}
                    id={`package-card-${pkg.id}`}
                    className={`relative bg-white flex flex-col justify-between rounded-xl overflow-hidden border border-t-[6px] ${themeBorderClass} p-5 sm:p-6 text-left shadow-sm hover:shadow-md transition-shadow`}
                  >
                    {/* Badge (Optional) */}
                    {pkg.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8102e] text-white text-[10px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        {pkg.badge}
                      </span>
                    )}

                    {/* Card Content Top */}
                    <div>
                      {/* Package Title */}
                      <h3 className="font-serif-display text-[22px] font-medium text-[#74161f] tracking-tight mb-1.5">
                        {pkg.title}
                      </h3>

                      {/* Sub-header / Tagline */}
                      <p className="text-[18px] font-light text-gray-600 leading-snug mb-5">
                        Perfect for: {pkg.tagline}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-2.5 text-[14px] text-gray-700 mb-6">
                        {(pkg.inclusionCategories && pkg.inclusionCategories.length > 0
                          ? pkg.inclusionCategories.flatMap((c) => c.topics.map((t) => t.title)).slice(0, 5)
                          : pkg.features.slice(0, 5)
                        ).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            {/* Stylized asterisk/diamond icon for bullet */}
                            <svg className="w-2.5 h-2.5 text-[#c8102e]/70 mt-1.5 mr-2.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
                            </svg>
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button Bottom */}
                    <div className="pt-2 text-center">
                      <Link
                        href={`/packages#package-full-card-${pkg.id}`}
                        className="inline-flex items-center justify-center bg-[#c8102e] hover:bg-[#a80b24] text-white font-light text-[18px] py-2 px-7 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                      >
                        Check details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
