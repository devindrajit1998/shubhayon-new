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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        router.replace('/admin');
      } else {
        setErrorMessage(
          'Invalid credentials. Please use admin@shuvayan.com / shuvayan2026 or click the quick demo button.'
        );
      }
    }, 450);
  };

  const fillDemoCredentials = () => {
    setEmail('admin@shuvayan.com');
    setPassword('shuvayan2026');
    setErrorMessage('');
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

          {/* Quick Demo Credentials Pill */}
          <div className="p-3.5 rounded-2xl bg-[#fff6e6] border border-[#f5d9a8] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f6c367] text-[#3d2a14] flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#3d2a14]">Fast Demo Access</p>
                <p className="text-[11px] text-[#785324]">admin@shuvayan.com</p>
              </div>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs font-bold text-white bg-[#c8102e] hover:bg-[#a80b24] px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex-shrink-0 cursor-pointer"
            >
              Auto Fill
            </button>
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <span className="font-bold text-red-600 mt-0.5">!</span>
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="admin@shuvayan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-[#d8c5b0] rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-[#c8102e] font-semibold">Protected</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-11 py-3 bg-white border border-[#d8c5b0] rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#d8c5b0] text-[#c8102e] focus:ring-[#c8102e] w-4 h-4 cursor-pointer"
                />
                <span className="ml-2 text-gray-700 font-medium">Keep me signed in</span>
              </label>

              <span className="text-gray-500 font-medium">Default: shuvayan2026</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#c8102e] via-[#b50e28] to-[#990a20] hover:from-[#b50e28] hover:to-[#7d0718] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
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
