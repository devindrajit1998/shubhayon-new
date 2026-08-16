import React from 'react';
import Image from 'next/image';
import { X, Check, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export interface PackageData {
  id: string;
  title: string;
  tagline?: string;
  features: string[];
  fullFeatures?: string[];
  priceRange: string;
  idealFor?: string;
  idealGuests?: string;
  badge?: string;
  description?: string;
}

interface PackageDetailModalProps {
  packageData: PackageData | null;
  onClose: () => void;
  onSelectPackage: (pkg: PackageData) => void;
}

export default function PackageDetailModal({
  packageData,
  onClose,
  onSelectPackage,
}: PackageDetailModalProps) {
  if (!packageData) return null;

  return (
    <div
      id="package-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div
        id="package-detail-modal-container"
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#e5d8c3] my-8"
      >
        {/* Header */}
        <div className="bg-[#1c1111] p-6 text-white relative border-b border-[#3b2323]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>

          {packageData.badge && (
            <span className="inline-block bg-[#c8102e] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              {packageData.badge}
            </span>
          )}

          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
            {packageData.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {packageData.tagline}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Key highlights banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#fbf8f3] rounded-xl border border-[#ede2d2]">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <Sparkles className="w-4 h-4 text-[#d48817] flex-shrink-0" />
              <span>
                <strong>Capacity:</strong> {packageData.idealFor}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>
                <strong>Est. Investment:</strong> {packageData.priceRange}
              </span>
            </div>
          </div>

          {/* Full Inclusions List */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-[#1f2937] mb-3">
              Included In This Package:
            </h4>
            <ul className="space-y-3">
              {(packageData.fullFeatures || packageData.features || []).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#374151]">
                  <span className="relative w-4 h-4 flex-shrink-0 mt-0.5 inline-block">
                    <Image
                      src="/images/bullet.svg"
                      alt="Bullet"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customization Guarantee */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-900 leading-relaxed">
            <p>
              ✨ <strong>100% Customizable:</strong> Every Bengali wedding has unique family traditions and dietary requirements. We personalize all inclusions, colors, themes, and catering menus to your taste.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onSelectPackage(packageData)}
              className="flex-1 bg-[#c8102e] hover:bg-[#a80b24] text-white font-semibold py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Book &amp; Customise This Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
