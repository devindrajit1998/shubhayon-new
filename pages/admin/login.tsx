import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Heart,
  Users,
  Award,
  Calendar,
} from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAdminData();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent | React.MouseEvent) => {
    if ('preventDefault' in e) e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const success = await login();
    setIsLoading(false);
    if (success) {
      router.replace('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col lg:flex-row text-gray-800 selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Admin Login | Shuvayan Management Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* LEFT COLUMN: Luxury Visual Brand Hero (Hidden on mobile, 45% on desktop) */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-[#1c0e0d] text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Image with Dark Royal Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Index-banner.jpg"
            alt="Bengali Wedding Heritage"
            fill
            className="object-cover object-center opacity-35 scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#150a09] via-[#1a0c0b]/85 to-[#24100e]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80" />
        </div>

        {/* Top Header on Left Hero */}
        <div className="relative z-10">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <div className="relative w-48 h-12">
              <Image
                src="/images/logo.png"
                alt="Shuvayan"
                fill
                className="object-contain object-left brightness-125"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Middle Value Proposition */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d99824]/20 border border-[#d99824]/40 text-[#f7c569] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Management Portal</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-serif-display font-normal text-white leading-tight">
            Curating Unforgettable Bengali Celebrations &amp; Heritage Rituals
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed font-light">
            Real-time management suite to oversee wedding inquiries, customize services, update
            portfolio artist strips, and orchestrate seamless celebrations across Kolkata.
          </p>

          {/* Feature Highlights Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-[#c8102e]/30 border border-[#c8102e]/50 flex items-center justify-center text-[#ff8090]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Live Leads CRM</p>
                <p className="text-[10px] text-gray-400">Instant Quotes Tracking</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-[#d99824]/30 border border-[#d99824]/50 flex items-center justify-center text-[#f7c569]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Catalog &amp; Gallery</p>
                <p className="text-[10px] text-gray-400">Services &amp; Packages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer on Left Hero */}
        <div className="relative z-10 text-xs text-gray-400 flex items-center justify-between border-t border-white/10 pt-4">
          <span>&copy; 2026 Shuvayan Wedding Management</span>
          <span className="flex items-center gap-1 text-[#f7c569]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted</span>
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean, High-Contrast, Premium Login Card */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 xl:p-20 relative">
        {/* Mobile Logo Header */}
        <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-[#ebdcc9]">
          <Link href="/">
            <div className="relative w-40 h-10">
              <Image
                src="/images/logo.png"
                alt="Shuvayan"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider bg-[#d99824]/20 text-[#855106] px-2.5 py-0.5 rounded-full border border-[#d99824]/40">
            Admin
          </span>
        </div>

        {/* Centered Login Card Form */}
        <div className="max-w-md w-full mx-auto my-auto space-y-8">
          {/* Card Title & Subtitle */}
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff2d8] border border-[#ecd7bc] text-[#8c4604] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c8102e]" />
              <span>Administrative Portal</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Please enter your authorized credentials to access the Shuvayan dashboard.
            </p>
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <span className="font-bold text-red-600 mt-0.5">!</span>
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Main Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-sm text-gray-800 bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Website Link */}
        <div className="text-center pt-8 border-t border-[#ebdcc9]/60 max-w-md w-full mx-auto">
          <Link
            href="/"
            className="text-xs font-semibold text-gray-600 hover:text-[#c8102e] transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Return to Shuvayan Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
