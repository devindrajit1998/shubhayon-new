import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PackagesSection from '@/components/PackagesSection';
import StatsSection from '@/components/StatsSection';
import GallerySection from '@/components/GallerySection';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf7] selection:bg-[#c8102e] selection:text-white">
      <Head>
        <title>Shuvayan | Bengali Wedding &amp; Event Management</title>
        <meta
          name="description"
          content="Shuvayan brings your dream celebration to life with creativity, elegance &amp; flawless execution. Authentic Bengali wedding planning, catering, decor &amp; rituals."
        />
      </Head>

      {/* Main Navigation Header */}
      <Header activePage="home" />

      <main className="flex-1">
        {/* 1. Hero Banner */}
        <HeroSection />

        {/* 2. What we do - Our Premium Services */}
        <ServicesSection />

        {/* 3. We Offer - Best Packages */}
        <PackagesSection />

        {/* 4. Stats Counter Strip */}
        <StatsSection />

        {/* 5. Our Work - Moments we create */}
        <GallerySection />

        {/* 6. Dream Celebration CTA Banner */}
        <CtaBanner />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
