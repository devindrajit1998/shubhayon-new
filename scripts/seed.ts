/**
 * Shuvayan Firebase Firestore Migration & Seed Utility
 * 
 * Usage:
 *   npx ts-node scripts/seed.ts
 * 
 * NOTE: This is an isolated, developer-only migration script.
 * It is never executed in the production client bundle.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAArZMUXQcVS_XfaQM7OXAbqjz5q0dJERw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "shuvayan-3daaa.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "shuvayan-3daaa",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "shuvayan-3daaa.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "551026490836",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:551026490836:web:fd67c295186f0959d76a41",
};

const initialServices = [
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
    description: 'Elegant and creative trey decor for the ritual.',
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

const initialPackages = [
  {
    id: 'basic',
    title: 'Basic Package',
    tagline: 'Perfect for: Budget-friendly intimate weddings includes:',
    features: [
      'Bridal mehendi',
      'Bridal makeover',
      'Traditional photography',
      'Standard Bengali catering...',
    ],
    fullFeatures: [
      'Bridal mehendi by skilled artist (Front & Back hands)',
      'Bridal makeover with HD makeup & hair styling',
      'Traditional photography coverage for wedding day',
      'Standard Bengali catering with 12 authentic dishes',
      'Basic venue stage floral backdrop',
      'Shubho Bibaho entrance welcome board',
    ],
    priceRange: '₹85,000 - ₹1,50,000',
    idealFor: 'Intimate gatherings (50 - 150 guests)',
    badge: 'Popular for Intimate Events',
  },
  {
    id: 'mid',
    title: 'Mid Package',
    tagline: 'Perfect for: Small to medium family weddings',
    features: [
      'Trey Decoration',
      'Bridal Mehendi',
      'Bridal makeover',
      'Digital invitation card...',
    ],
    fullFeatures: [
      'Trey / Tatta decoration (10 designer trays with custom wrapping)',
      'Bridal Mehendi + 2 close family members',
      'Bridal makeover with Airbrush / HD styling & jewelry setting',
      'Custom animated digital invitation card & WhatsApp save-the-date',
      'Candid & traditional photography with cinematic highlights teaser',
      'Theme stage decoration with floral arc & warm fairy lights',
      'Curated 5-course Bengali wedding banquet buffet',
    ],
    priceRange: '₹1,75,000 - ₹3,20,000',
    idealFor: 'Medium family weddings (150 - 300 guests)',
    badge: 'Best Value',
  },
  {
    id: 'standard',
    title: 'Standard Package',
    tagline: 'Perfect for: Elegant weddings with premium experience',
    features: [
      'Wedding planning assistance',
      'Premium bridal makeover',
      'Bride + 4 member mehendi',
      'Theme decoration...',
    ],
    fullFeatures: [
      'End-to-end wedding planning assistance & day-of coordination',
      'Premium bridal makeover by celebrity stylist with pre-bridal trial',
      'Bridal mehendi + 4 bridesmaid/family member mehendi sessions',
      'Opulent theme decoration (Mandap, Stage, Entrance Arch & Photobooth)',
      'Multi-camera cinematic film, drone shoot & high-res wedding album',
      'Luxury catering menu with live chaat, fish/mutton counters & desserts',
      'Decorated bridal car service for groom & bride commute',
    ],
    priceRange: '₹3,50,000 - ₹6,00,000',
    idealFor: 'Grand celebrations (300 - 600 guests)',
    badge: 'Most Chosen',
  },
  {
    id: 'premium',
    title: 'Premium Package',
    tagline: 'Perfect for: Luxury, stress-free dream weddings',
    features: [
      'Priest / Baidik (Lady)',
      'Grand bride & groom entry',
      'LED screen',
      'Premium buffet...',
    ],
    fullFeatures: [
      'Experienced Senior Vedic Priest / Baidik (Lady or Gentleman options)',
      'Grand bride & groom entry concept with cold pyros, smoke & doli/chhatra',
      'High-definition LED display screens with live multicam broadcast',
      'Royal Bengali & Continental luxury buffet with live gourmet stations',
      'Complete VIP hospitality team, guest assistance & luggage management',
      'Complete wedding film, teaser, teaser reels, and 2 luxury leather albums',
      'Full venue ambient architectural lighting & floral installation',
    ],
    priceRange: '₹6,50,000 - ₹12,00,000+',
    idealFor: 'Luxury royal weddings (500+ guests)',
    badge: 'Royal Experience',
  },
];

const initialCategories = [
  'Trey Decoration',
  'Bridal Mehendi',
  'Bridal Makeover',
  'Photography',
  'Venue Decoration',
];

const initialArtists = [
  {
    id: 'artist-1',
    name: 'Tania Chakraborty',
    role: 'Makeover Artist',
    eventsCount: '150+ Events',
    category: 'Bridal Makeover',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    bio: 'Specializing in timeless Bengali bridal makeovers, signature HD airbrush artistry, delicate Chandan calligraphy, and royal mukut draping with over 8 years of celebrated wedding experience.',
    photos: [
      {
        title: 'Glamorous Bengali Reception HD Bridal Look',
        image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/sample-1.png',
      },
      {
        title: 'Traditional Lal Banarasi & Tikli Makeup',
        image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/sample-2.png',
      },
      {
        title: 'Royal Bridal Mirror Reflection & Mukut',
        image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/sample-3.png',
      },
      {
        title: 'Shubho Drishti Bridal Radiance',
        image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/sample-4.png',
      },
      {
        title: 'Intricate Gold Jewelry & Airbrush Finish',
        image: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/sample-5.png',
      },
    ],
  },
];

const initialBanners = {
  homeHeroTitle: 'Every moment Unforgettable',
  homeHeroSubtitle: 'We make',
  homeHeroTagline: 'Shuvayan brings your dream celebration to life with creativity, elegance & flawless execution.',
  homeHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Index-banner.jpg',
  aboutHeroTitle: 'About Us',
  aboutHeroSubtitle: '',
  aboutHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  servicesHeroTitle: 'Our Services',
  servicesHeroSubtitle: '',
  servicesHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  packagesHeroTitle: 'Best Packages',
  packagesHeroSubtitle: '',
  packagesHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  galleryHeroTitle: 'Moments that last forever',
  galleryHeroSubtitle: '',
  galleryHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  policyHeroTitle: 'Policy & Terms',
  policyHeroSubtitle: '',
  policyHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  innerHeroTitle: 'Moments that last forever',
  innerHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  snapshotLeft: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg',
  snapshotMid: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png',
  snapshotRight: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg',
};

const initialSettings = {
  siteTitle: 'Shuvayan Wedding & Event Management',
  logoUrl: '',
  primaryPhone: '+91 7439442349',
  secondaryPhone: '+91 7003478950',
  whatsappNumber: '+917439442349',
  contactEmail: 'enquiry.shuvayan@gmail.com',
  address: '12/A, Southern Avenue, Lake Market, Kolkata - 700029, West Bengal',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
};

const initialTestimonials = [
  {
    id: 't-1',
    name: 'Priyanka & Debashis',
    event: 'Vedic Wedding & Royal Mandap, Kolkata',
    date: 'January 2026',
    rating: 5,
    quote:
      'Shuvayan made our dream wedding flawless! From the Sanskrit Vedic mantras to the grand mandap decor and live Bhetki Paturi banquet, every single guest was mesmerized.',
  },
  {
    id: 't-2',
    name: 'Ananya & Souvik',
    event: 'Bespoke Tatta Trays & Bridal Makeover',
    date: 'December 2025',
    rating: 5,
    quote:
      'The artisanal Tatta tray decoration was the highlight of our Gaye Holud. The bride makeover was so elegant and stayed flawless throughout the night!',
  },
];

async function seedFirestore() {
  console.log('🚀 Connecting to Firebase Firestore...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const docRef = doc(db, 'content', 'site_data');
  console.log('📦 Writing seed dataset to content/site_data...');

  await setDoc(docRef, {
    services: initialServices,
    packages: initialPackages,
    categories: initialCategories,
    artists: initialArtists,
    banners: initialBanners,
    settings: initialSettings,
    testimonials: initialTestimonials,
    leads: [],
  });

  console.log('✅ Seed data successfully written to Firebase Firestore!');
}

seedFirestore().catch((err) => {
  console.error('❌ Failed to seed Firebase:', err);
});
