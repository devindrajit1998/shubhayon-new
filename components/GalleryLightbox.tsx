import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import type { LightboxPhoto } from '@/context/AppModalContext';

interface GalleryLightboxProps {
  activeIndex: number | null;
  photos?: LightboxPhoto[];
  onClose: () => void;
}

export default function GalleryLightbox({ activeIndex, photos, onClose }: GalleryLightboxProps) {
  const [indexOffset, setIndexOffset] = useState(0);
  const { artists } = useAdminData();

  // Reset offset whenever a new photo is opened
  useEffect(() => {
    setIndexOffset(0);
  }, [activeIndex]);

  // Keyboard navigation (Escape to close, Arrow keys to navigate)
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndexOffset((prev) => prev - 1);
      if (e.key === 'ArrowRight') setIndexOffset((prev) => prev + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onClose]);

  if (activeIndex === null) return null;

  // Derive photo list: prefer passed photos prop, then fall back to Firebase artist photos
  const fallbackDynamicPhotos: LightboxPhoto[] = artists.flatMap((artist) =>
    artist.photos.map((photo, idx) => ({
      id: `${artist.id}-${idx}`,
      title: photo.title || artist.name,
      category: artist.category.toUpperCase(),
      image: photo.image,
    }))
  );

  const activePhotoList = photos && photos.length > 0
    ? photos
    : fallbackDynamicPhotos;

  const total = activePhotoList.length;
  if (total === 0) return null;

  const currentIndex = ((activeIndex + indexOffset) % total + total) % total;
  const currentPhoto = activePhotoList[currentIndex] || activePhotoList[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndexOffset((prev) => prev - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndexOffset((prev) => prev + 1);
  };

  return (
    <div
      id="gallery-lightbox-overlay"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50 cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      {total > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-colors z-50 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Next Button */}
      {total > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-colors z-50 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
      >
        <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-black/40">
          <Image
            src={currentPhoto.image}
            alt={currentPhoto.title || 'Gallery image'}
            fill
            className="object-contain"
            referrerPolicy="no-referrer"
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center text-white">
          {currentPhoto.category && (
            <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-semibold block mb-1">
              {currentPhoto.category}
            </span>
          )}
          <h4 className="font-serif-display text-lg sm:text-xl font-bold">
            {currentPhoto.title}
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            {currentIndex + 1} of {total}
          </p>
        </div>
      </div>
    </div>
  );
}
