import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { useAppModals } from '@/context/AppModalContext';
import { useAdminData } from '@/context/AdminDataContext';

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const { openQuoteModal } = useAppModals();
  const { settings } = useAdminData();
  const phone = settings?.primaryPhone || '7439442349';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'About Us', href: '/about', id: 'about' },
    { label: 'Services', href: '/services', id: 'services' },
    { label: 'Packages', href: '/packages', id: 'packages' },
    { label: 'Gallery', href: '/gallery', id: 'gallery' },
    { label: 'Menu', href: '/menu', id: 'menu' },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-[#140706]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-[#3d1f1f]/50'
          : 'bg-gradient-to-r from-[#120606]/95 via-[#190908]/75 to-black/30 bg-gradient-to-b from-black/80 to-transparent py-3 sm:py-4'
          }`}
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" id="brand-logo-link" className="flex items-center space-x-2 group">
              <div className="relative w-36 sm:w-48 md:w-56 h-10 sm:h-12 lg:h-14 transition-transform duration-300">
                <Image
                  src={settings?.logoUrl || '/images/logo.png'}
                  alt="Shuvayan - Wedding & Event Management"
                  fill
                  priority
                  className="object-contain object-left"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    id={`nav-link-${item.id}`}
                    className={`text-sm xl:text-[15px] font-medium transition-colors duration-200 ${isActive
                      ? 'text-[#d99824] font-semibold'
                      : 'text-white/95 hover:text-[#d99824]'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop CTA Button */}
              <button
                id="header-quote-btn"
                onClick={() => openQuoteModal()}
                className="hidden sm:inline-flex group items-center justify-center gap-3 bg-[#c8102e] hover:bg-[#a80b24] text-white text-sm sm:text-[15px] font-medium px-5 py-2.5 rounded-md shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Get Quote</span>
                <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                </span>
              </button>

              {/* Mobile Quick Quote Button (< sm) */}
              <button
                id="mobile-quote-quick-btn"
                onClick={() => openQuoteModal()}
                className="sm:hidden bg-[#c8102e] text-white text-xs font-semibold px-3.5 py-1.5 rounded-md"
              >
                Quote
              </button>

              {/* Hamburger Button (visible on < lg screens) */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Off-Canvas Mobile Drawer & Backdrop */}
      <div
        id="mobile-drawer-container"
        className={`fixed inset-0 z-50 transition-all duration-300 lg:hidden ${mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
      >
        {/* Backdrop overlay */}
        <div
          id="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Off-Canvas Panel */}
        <div
          id="mobile-drawer-panel"
          className={`absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#160e0e] border-l border-[#3a2020] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-out z-10 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Top Row: Logo & Close Button */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="relative w-36 h-10">
                <Image
                  src={settings?.logoUrl || '/images/logo.png'}
                  alt="Shuvayan"
                  fill
                  className="object-contain object-left"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button
                id="mobile-drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1.5 pt-6">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-2.5 px-3.5 rounded-lg transition-colors flex items-center justify-between ${isActive
                      ? 'text-[#e5a83b] bg-white/5 font-semibold'
                      : 'text-white/85 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 text-[#e5a83b]" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions: Quote CTA & Direct Call */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              id="mobile-drawer-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#b81414] hover:bg-[#a00f0f] text-white font-semibold py-3 rounded-md text-sm shadow-md transition-colors"
            >
              <span>Get Free Quote</span>
              <span className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center">
                <ChevronRight className="w-2.5 h-2.5 text-white stroke-[2.5]" />
              </span>
            </button>

            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white/90 font-medium py-2.5 rounded-md text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#e5a83b]" />
              <span>Call Direct: {phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
