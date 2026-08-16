import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';
import { Sparkles, Calendar } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function ServicesSection() {
  const { openQuoteModal } = useAppModals();
  const { services, isLoading, error } = useAdminData();

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p
            id="services-subheading"
            className="text-[#c8102e] font-semibold text-sm sm:text-base tracking-normal mb-1.5"
          >
            What we do
          </p>
          <h2
            id="services-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#5a5858] tracking-tight"
          >
            Our Premium Services
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-[#fffdfa] rounded-2xl overflow-hidden border border-[#edd7bf] p-4 animate-pulse space-y-3"
              >
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
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
        {!isLoading && !error && services.length === 0 && (
          <div className="bg-[#fffdfa] border border-dashed border-[#d8b590] rounded-2xl p-12 text-center max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-[#d99824] mx-auto mb-3" />
            <h3 className="font-serif-display text-lg font-bold text-gray-800 mb-1">
              Services Coming Soon
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              We are curating bespoke wedding service offerings. Get in touch for custom inquiries.
            </p>
            <button
              onClick={() => openQuoteModal('General Wedding Planning Inquiry')}
              className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
            >
              Get Custom Quote
            </button>
          </div>
        )}

        {/* 4. Real Firebase Services Grid */}
        {!isLoading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => openQuoteModal(service.title)}
                  className="group bg-[#fffdfa] rounded-2xl overflow-hidden border border-[#d8b590] shadow-sm hover:shadow-xl hover:border-[#c59c70] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col"
                >
                  {/* Card Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#241715]">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Sparkles className="w-8 h-8 text-[#d99824]" />
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-start text-center bg-[#fffdfa]">
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#7a1d24] group-hover:text-[#a01822] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#4b5563] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore All Services Link */}
            <div className="text-center mt-10">
              <Link
                href="/services"
                id="explore-all-services-btn"
                className="inline-flex items-center justify-center bg-[#b81414] hover:bg-[#991111] text-white font-semibold text-xs sm:text-sm px-7 py-2.5 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
              >
                Explore All Services
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
