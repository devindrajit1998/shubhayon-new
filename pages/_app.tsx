import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import { useState } from 'react';
import { AppModalContext, useAppModals } from '@/context/AppModalContext';
import { AdminDataProvider } from '@/context/AdminDataContext';
import QuoteModal from '@/components/QuoteModal';
import PackageDetailModal, { PackageData } from '@/components/PackageDetailModal';
import GalleryLightbox from '@/components/GalleryLightbox';

export { useAppModals };

export default function App({ Component, pageProps }: AppProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openQuoteModal = (initialService?: string) => {
    setSelectedService(initialService);
    setIsQuoteOpen(true);
  };

  const openPackageModal = (pkg: PackageData) => {
    setSelectedPackage(pkg);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <AdminDataProvider>
      <AppModalContext.Provider value={{ openQuoteModal, openPackageModal, openLightbox }}>
        <Head>
          <title>Shuvayan | Premium Wedding & Event Management</title>
          <meta
            name="description"
            content="Shuvayan brings your dream celebration to life with creativity, elegance & flawless execution. Authentic Bengali Wedding & Event Specialists."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/heart.svg" />
        </Head>

        <Component {...pageProps} />

        {/* Global Interactive Modals */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          initialService={selectedService}
        />

        <PackageDetailModal
          packageData={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onSelectPackage={(pkg) => {
            setSelectedPackage(null);
            openQuoteModal(pkg.title);
          }}
        />

        <GalleryLightbox
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      </AppModalContext.Provider>
    </AdminDataProvider>
  );
}
