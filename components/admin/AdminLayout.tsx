import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  Image as ImageIcon,
  Sliders,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeNav:
    | 'dashboard'
    | 'leads'
    | 'services'
    | 'packages'
    | 'gallery'
    | 'banners'
    | 'testimonials'
    | 'settings';
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  activeNav,
}: AdminLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, adminUser, logout, leads, settings } = useAdminData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Auth Guard
  useEffect(() => {
    if (hasMounted && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [hasMounted, isAuthenticated, router]);

  if (!hasMounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#140b0a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-full border-2 border-[#d99824] border-t-transparent animate-spin" />
          <p className="font-serif-display text-lg text-[#d99824]">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  const unreadLeadsCount = leads.filter((l) => l.status === 'New').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'leads',
      label: 'Leads & Quotes',
      href: '/admin/leads',
      icon: Users,
      badge: unreadLeadsCount > 0 ? `${unreadLeadsCount} New` : null,
    },
    {
      id: 'services',
      label: 'Services Manager',
      href: '/admin/services',
      icon: Briefcase,
      badge: null,
    },
    {
      id: 'packages',
      label: 'Packages Manager',
      href: '/admin/packages',
      icon: Package,
      badge: null,
    },
    {
      id: 'gallery',
      label: 'Gallery & Artists',
      href: '/admin/gallery',
      icon: ImageIcon,
      badge: null,
    },
    {
      id: 'banners',
      label: 'Banners & Media',
      href: '/admin/banners',
      icon: Sliders,
      badge: null,
    },
    {
      id: 'testimonials',
      label: 'Client Reviews',
      href: '/admin/testimonials',
      icon: MessageSquareQuote,
      badge: null,
    },
    {
      id: 'settings',
      label: 'Site Settings',
      href: '/admin/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-800 flex">
      <Head>
        <title>{title} | Shuvayan Admin Portal</title>
      </Head>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#180d0c] text-white border-r border-[#301c1a] flex-shrink-0 z-30 sticky top-0 h-screen">
        {/* Brand Logo & Tag */}
        <div className="p-6 border-b border-[#301c1a] flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="relative w-36 h-10">
              <Image
                src={settings?.logoUrl || '/images/logo.png'}
                alt="Shuvayan Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-[#d99824]/20 text-[#f5be58] px-2 py-0.5 rounded-full border border-[#d99824]/40">
            Admin
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Main Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#c8102e] text-white shadow-md font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-[#c8102e]'
                        : 'bg-[#c8102e] text-white animate-pulse'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile & quick action footer */}
        <div className="p-4 border-t border-[#301c1a] bg-[#120807] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#d99824] to-[#c8102e] text-white flex items-center justify-center font-bold text-sm shadow">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{adminUser?.name}</p>
              <p className="text-[10px] text-gray-400 truncate">{adminUser?.role}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-gray-200 text-xs py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d99824]" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center justify-center p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#e8ded1] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-lg sm:text-xl font-bold font-serif-display text-gray-900 leading-tight">
                {title}
              </h1>
              {subtitle && <p className="text-xs text-gray-500 hidden sm:block">{subtitle}</p>}
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live website link button */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-[#e0cbaf] bg-[#faf7f2] hover:bg-[#f3ede1] text-[#784d16] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Main Website</span>
            </Link>

            {/* Notification Badge */}
            <Link
              href="/admin/leads"
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Quotes / Enquiries"
            >
              <Bell className="w-5 h-5" />
              {unreadLeadsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c8102e] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadLeadsCount}
                </span>
              )}
            </Link>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#180d0c] text-[#d99824] flex items-center justify-center text-xs font-bold ring-2 ring-[#d99824]/30">
                {adminUser?.name?.charAt(0) || 'A'}
              </div>
              <button
                onClick={logout}
                className="text-xs text-gray-600 hover:text-red-700 font-medium hidden md:inline"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">{children}</main>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative w-72 bg-[#180d0c] text-white flex flex-col h-full z-10 shadow-2xl">
            <div className="p-5 border-b border-[#301c1a] flex items-center justify-between">
              <div className="relative w-36 h-9">
                <Image
                  src={settings?.logoUrl || '/images/logo.png'}
                  alt="Shuvayan Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-[#c8102e] text-white font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#c8102e]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#301c1a] bg-[#120807] space-y-3">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-white/10 text-white text-xs py-2 rounded-lg"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#d99824]" />
                <span>Visit Main Site</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-900/60 hover:bg-red-800 text-white text-xs py-2 rounded-lg font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
