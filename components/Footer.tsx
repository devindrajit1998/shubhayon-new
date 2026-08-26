import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';

export default function Footer() {
  const { openQuoteModal } = useAppModals();
  const { settings, services } = useAdminData();

  const phone = settings?.primaryPhone || '7439442349';
  const email = settings?.contactEmail || 'enquiry.shuvayan@gmail.com';
  const address = settings?.address || 'Kolkata, West Bengal, India';
  const fbLink = settings?.facebookUrl || 'https://facebook.com';
  const instaLink = settings?.instagramUrl || 'https://instagram.com';

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Menu', href: '/menu' },
  ];

  const defaultServiceLinks = [
    { label: 'Digital Invitation Card', service: 'Digital Invitation Card' },
    { label: 'Priests', service: 'Priests' },
    { label: 'Trey Decoration', service: 'Trey Decoration' },
    { label: 'Mahendi Artists', service: 'Mehendi' },
    { label: 'Bridal Makeover', service: 'Bridal Makeover' },
    { label: 'Photography & Videography', service: 'Photography & Videography' },
    { label: 'Venue Decoration', service: 'Decorations' },
    { label: 'Food & Beverages', service: 'Food & Beverages' },
    { label: 'Car & Bus', service: 'Car Service' },
  ];

  const serviceLinks = services && services.length > 0
    ? services.slice(0, 9).map((s) => ({ label: s.title, service: s.title }))
    : defaultServiceLinks;

  return (
    <footer id="main-footer" className="bg-[#150200] text-white pt-14 pb-10 border-t border-[#221818]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Tagline (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block relative w-48 sm:w-52 h-12 sm:h-14">
              <Image
                src={settings?.logoUrl || '/images/logo.png'}
                alt="Shuvayan - Wedding & Event Management"
                fill
                className="object-contain object-left"
                referrerPolicy="no-referrer"
              />
            </Link>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              We turn your dream into reality with creativity, eligance &amp; flawless execution.
            </p>

          </div>

          {/* Column 2: Quick Links (2.5 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif-display text-2xl sm:text-[27px] font-normal text-white mb-5 tracking-tight leading-tight">
              <span className="border-b-[1.5px] border-[#c8102e] pb-1">Quic</span>k Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#f59e0b] transition-colors"
                  >
                    <span className="relative w-2 h-2 flex-shrink-0 inline-block">
                      <Image
                        src="/images/bullet.svg"
                        alt="bullet"
                        fill
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span className="transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (3.5 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="font-serif-display text-2xl sm:text-[27px] font-normal text-white mb-5 tracking-tight leading-tight">
              <span className="border-b-[1.5px] border-[#c8102e] pb-1">Our</span> Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-[#f59e0b] transition-colors text-left"
                  >
                    <span className="relative w-2 h-2 flex-shrink-0 inline-block">
                      <Image
                        src="/images/bullet.svg"
                        alt="bullet"
                        fill
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span className="transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (2.5 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif-display text-2xl sm:text-[27px] font-normal text-white mb-5 tracking-tight leading-tight">
              <span className="border-b-[1.5px] border-[#c8102e] pb-1">Cont</span>act Us
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  id="footer-phone-link"
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c8102e]" />
                  <span>{phone}</span>
                </a>
              </div>

              <div>
                <a
                  href={`mailto:${email}`}
                  id="footer-email-link"
                  className="hover:text-[#f59e0b] transition-colors flex items-center gap-2 break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c8102e] flex-shrink-0" />
                  <span>{email}</span>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="flex items-center space-x-3.5">
                <a
                  href={fbLink}
                  target="_blank"
                  rel="noreferrer"
                  id="footer-fb-icon"
                  className="group inline-block transition-transform duration-200 hover:scale-110 p-0.5"
                  aria-label="Facebook"
                >
                  <span
                    className="block w-6 h-6 bg-white group-hover:bg-[#c8102e] transition-colors duration-200"
                    style={{
                      maskImage: "url('/images/Social-FB.png')",
                      WebkitMaskImage: "url('/images/Social-FB.png')",
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                </a>

                <a
                  href={instaLink}
                  target="_blank"
                  rel="noreferrer"
                  id="footer-insta-icon"
                  className="group inline-block transition-transform duration-200 hover:scale-110 p-0.5"
                  aria-label="Instagram"
                >
                  <span
                    className="block w-6 h-6 bg-white group-hover:bg-[#c8102e] transition-colors duration-200"
                    style={{
                      maskImage: "url('/images/Social-INSTA.png')",
                      WebkitMaskImage: "url('/images/Social-INSTA.png')",
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <p>Copyright reserved &copy; shuvayan</p>
          <div className="flex gap-4 items-center">
            <Link href="/policy" className="hover:text-gray-400">Terms &amp; Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
