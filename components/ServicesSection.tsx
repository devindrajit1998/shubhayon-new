import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const servicesList: ServiceItem[] = [
  {
    id: 'priest',
    title: 'Priest / Vedic Priests',
    description: 'Experienced Bengali Vedic Priests.',
    image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-01.jpg',
    category: 'Rituals & Ceremony',
  },
  {
    id: 'trey-decor',
    title: 'Trey Decor',
    description: 'Elegent and creative trey decor for the ritual.',
    image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-02.jpg',
    category: 'Tatta & Trays',
  },
  {
    id: 'mehendi',
    title: 'Mehendi',
    description: 'Intricate mehendi designs that add charm to your celebration.',
    image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-03.jpg',
    category: 'Bridal Art',
  },
  {
    id: 'bridal-makeover',
    title: 'Bridal Makeover',
    description: 'Bridal looks that bring out your natural beauty & confidence.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    category: 'Beauty & Styling',
  },
  {
    id: 'photography',
    title: 'Photography & Videography',
    description: 'Candid moments, cinematic films & memories to cherish forever.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    category: 'Media & Cinema',
  },
  {
    id: 'decorations',
    title: 'Decorations',
    description: 'Stunning decor setup that reflect your personality.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    category: 'Venue & Mandap',
  },
  {
    id: 'catering',
    title: 'Food & Beverages',
    description: 'Delicious food & refreshing beverages to delight your guests.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    category: 'Bengali Catering',
  },
  {
    id: 'car-service',
    title: 'Car Service',
    description: 'Comfortable car service for your occasion.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    category: 'Luxury Transport',
  },
];

export default function ServicesSection() {
  const { openQuoteModal } = useAppModals();
  const { services } = useAdminData();
  const displayServices = services && services.length > 0 ? services : servicesList;

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

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => openQuoteModal(service.title)}
              className="group bg-[#fffdfa] rounded-2xl overflow-hidden border border-[#d8b590] shadow-sm hover:shadow-xl hover:border-[#c59c70] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              {/* Card Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#241715]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
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
      </div>
    </section>
  );
}
