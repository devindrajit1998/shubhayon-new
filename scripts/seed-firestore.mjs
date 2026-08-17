import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx > -1) {
      const key = trimmed.substring(0, idx).trim();
      let val = trimmed.substring(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      envVars[key] = val;
    }
  }
}

const firebaseConfig = {
  apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const sampleData = {
  // 1. Site Settings
  settings: {
    siteTitle: 'Shuvayan Event & Wedding Management',
    logoUrl: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/logo.png',
    primaryPhone: '+91 98300 12345',
    secondaryPhone: '+91 98300 67890',
    whatsappNumber: '+91 98300 12345',
    contactEmail: 'contact@shuvayan.com',
    address: 'Salt Lake Sector V, Kolkata, West Bengal 700091',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
  },

  // 2. Banner Settings
  banners: {
    homeHeroTitle: 'Crafting Royal Weddings & Unforgettable Moments',
    homeHeroSubtitle: 'Premium wedding curation, bespoke event decor, and world-class artist management in Kolkata and beyond.',
    homeHeroTagline: 'Exquisite Bengali & Destination Weddings',
    homeHeroBgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80',
    aboutHeroTitle: 'Our Journey of Creating Royal Elegance',
    aboutHeroSubtitle: 'With over a decade of excellence, we bring your dream celebration to vibrant life.',
    aboutHeroBgImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80',
    servicesHeroTitle: 'Bespoke Event & Wedding Services',
    servicesHeroSubtitle: 'Tailor-made planning, royal gourmet catering, and breathtaking thematic decor.',
    servicesHeroBgImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=2000&q=80',
    packagesHeroTitle: 'Curated Wedding & Event Packages',
    packagesHeroSubtitle: 'Transparent, luxurious, and customizable packages designed to match every scale of celebration.',
    packagesHeroBgImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2000&q=80',
    galleryHeroTitle: 'Moments That Last Forever',
    galleryHeroSubtitle: 'Explore our visual portfolio of memorable smiles, majestic setups, and timeless rituals.',
    galleryHeroBgImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=2000&q=80',
    policyHeroTitle: 'Our Terms & Booking Policies',
    policyHeroSubtitle: 'Clear agreements ensuring smooth collaboration and peace of mind.',
    policyHeroBgImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=80',
    innerHeroTitle: 'Shuvayan Celebrations',
    innerHeroBgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80',
    snapshotLeft: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    snapshotMid: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
    snapshotRight: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
  },

  // 3. Services
  services: [
    {
      id: 'srv-1',
      title: 'Royal Bengali Wedding Planning',
      description: 'End-to-end traditional Bengali wedding curation from Gaye Holud to Boubhat with authentic cultural touches and seamless execution.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      category: 'Weddings',
    },
    {
      id: 'srv-2',
      title: 'Luxury Theme & Mandap Decor',
      description: 'Stunning floral architecture, fairy-light canopies, palace facades, and modern contemporary stage setups.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      category: 'Decor',
    },
    {
      id: 'srv-3',
      title: 'Cinematic Photography & Film',
      description: 'Candid pre-wedding shoots, drone aerial cinematography, live streaming, and heirloom photo albums.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      category: 'Photography',
    },
    {
      id: 'srv-4',
      title: 'Heritage Gourmet Catering',
      description: 'Exquisite multi-cuisine menus featuring traditional Bengali zamindari thalis, live counters, and international gourmet stations.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      category: 'Catering',
    },
    {
      id: 'srv-5',
      title: 'Destination Wedding Management',
      description: 'Turnkey destination celebrations across Rajasthan, Goa, Puri, and North Bengal with complete guest hospitality.',
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
      category: 'Destination',
    },
    {
      id: 'srv-6',
      title: 'Live Entertainment & Artists',
      description: 'Classical instrumentalists, Bollywood DJs, folk troupes, shehnai masters, and celebrity live performances.',
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
      category: 'Entertainment',
    },
  ],

  // 4. Packages
  packages: [
    {
      id: 'pkg-royal',
      title: 'The Rajwada Heritage',
      tagline: 'Complete royal wedding luxury for grand celebrations',
      priceRange: '₹8,50,000 - ₹15,00,000',
      idealFor: 'Grand Weddings & Reception Galas',
      idealGuests: '500 - 1200 Guests',
      badge: 'Most Popular',
      description: 'Our signature full-scale wedding package offering bespoke mandap architecture, cinematic 4K video crew, celebrity live music, and guest logistics.',
      features: [
        'Complete 3-Day Wedding Coordination',
        'Custom Royal Palace Theme Mandap & Floral Decor',
        'Candid + Traditional Photography & 4K Drone Film',
        'Live Shehnai, Dhak & Evening Live Fusion Band',
        'Dedicated Event Manager & Guest Concierge',
      ],
      fullFeatures: [
        'Complete 3-Day Wedding Coordination (Gaye Holud, Biye, Boubhat)',
        'Custom Royal Palace Theme Mandap & Floral Decor',
        'Candid + Traditional Photography & 4K Drone Film',
        'Live Shehnai, Dhak & Evening Live Fusion Band',
        'Dedicated Event Manager & Guest Concierge',
        'VIP Bridal Vanity Lounge & Green Rooms',
        'Automated Digital Invitation Web Suite',
        'Full Light & Sound Engineering Setup',
      ],
    },
    {
      id: 'pkg-classic',
      title: 'The Classic Shuvayan',
      tagline: 'Timeless elegance tailored for traditional family weddings',
      priceRange: '₹4,50,000 - ₹7,50,000',
      idealFor: 'Traditional & Intimate Weddings',
      idealGuests: '250 - 500 Guests',
      badge: 'Best Value',
      description: 'Balanced luxury crafted for families seeking elegant decor, professional event flow, and top-tier photography without excess.',
      features: [
        '2-Day Event Management (Wedding + Reception)',
        'Traditional Floral Mandap & Ambient Lighting',
        'Full HD Photography & Cinematic Teaser Video',
        'Traditional Shehnai & Entrance Dhaki Team',
        'Vendor Coordination & Timeline Management',
      ],
      fullFeatures: [
        '2-Day Event Management (Wedding + Reception)',
        'Traditional Floral Mandap & Ambient Lighting',
        'Full HD Photography & Cinematic Teaser Video',
        'Traditional Shehnai & Entrance Dhaki Team',
        'Vendor Coordination & Timeline Management',
        'Bridal Entry Umbrella / Doli Setup',
        'Custom Photobooth Backdrop',
      ],
    },
    {
      id: 'pkg-intimate',
      title: 'Boutique & Intimate',
      tagline: 'Minimalist, chic, and soulful micro-wedding curation',
      priceRange: '₹2,50,000 - ₹4,00,000',
      idealFor: 'Anniversaries, Engagements & Micro Weddings',
      idealGuests: '50 - 200 Guests',
      badge: 'Chic & Cozy',
      description: 'A focused experience emphasizing aesthetic floral styling, candid portrait photography, and intimate acoustic melodies.',
      features: [
        '1-Day Complete Event Execution',
        'Boho-Chic / Minimalist Floral Stage Setup',
        'Senior Candid Photographer & Album',
        'Acoustic Background Music & Sound',
        'Personalized Welcome Board & Table Centerpieces',
      ],
      fullFeatures: [
        '1-Day Complete Event Execution',
        'Boho-Chic / Minimalist Floral Stage Setup',
        'Senior Candid Photographer & Album',
        'Acoustic Background Music & Sound',
        'Personalized Welcome Board & Table Centerpieces',
        'Full Day Host & On-Site Coordinator',
      ],
    },
  ],

  // 5. Categories
  categories: ['Weddings', 'Decor & Mandap', 'Portraits', 'Pre-Wedding', 'Candid Moments'],

  // 6. Artists & Gallery Profiles
  artists: [
    {
      id: 'art-1',
      name: 'Subhashish Mukherjee',
      role: 'Master Floral & Stage Architect',
      eventsCount: '350+ Weddings Styled',
      category: 'Decor & Mandap',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Leading stage and mandap designer with 14 years of experience bringing grandeur and heritage craftsmanship to Bengali celebrations.',
      photos: [
        {
          title: 'Royal Rajbari Floral Mandap',
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Starlit Reception Stage',
          image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Pastel Garden Gaye Holud Setup',
          image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    {
      id: 'art-2',
      name: 'Ananya Sen',
      role: 'Lead Candid Wedding Cinematographer',
      eventsCount: '280+ Couples Captured',
      category: 'Weddings',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Award-winning visual storyteller specializing in emotion-rich candid frames and cinematic wedding films.',
      photos: [
        {
          title: 'Sindoor Daan Emotional Frame',
          image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Shubho Drishti Ritual',
          image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Bridal Grand Entry',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
    {
      id: 'art-3',
      name: 'Debjit Roy',
      role: 'Pre-Wedding & Portrait Specialist',
      eventsCount: '190+ Stories',
      category: 'Pre-Wedding',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Creating dreamy, magazine-quality pre-wedding concepts across iconic heritage locations in Bengal and destination resorts.',
      photos: [
        {
          title: 'Ghat Sunset Silhouette',
          image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Vintage Palace Portraiture',
          image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    },
  ],

  // 7. Testimonials
  testimonials: [
    {
      id: 'tst-1',
      name: 'Rohan & Sreeparna Banerjee',
      event: 'Royal Wedding at ITC Sonar',
      date: 'January 2026',
      rating: 5,
      quote: 'Shuvayan Event turned our dream wedding into sheer poetry. The mandap decor took everyone’s breath away, and the flow was effortless!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'tst-2',
      name: 'Debabrata & Madhumita Roy',
      event: 'Destination Wedding in Vedic Village',
      date: 'December 2025',
      rating: 5,
      quote: 'From hospitality for 400+ guests to the magical Gaye Holud setup, their team worked tirelessly. Highly recommended for premium weddings!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'tst-3',
      name: 'Dr. Arindam & Payel Ghosh',
      event: 'Grand Reception & Biye',
      date: 'November 2025',
      rating: 5,
      quote: 'Flawless catering coordination and breathtaking photography. Every guest praised the royal hospitality and attention to detail.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ],

  // 8. Sample Leads
  leads: [
    {
      id: 'lead-101',
      name: 'Priyanka Das',
      phone: '+91 98311 22334',
      email: 'priyanka.das@example.com',
      eventDate: '2026-11-20',
      eventType: 'Wedding',
      service: 'Royal Bengali Wedding Planning',
      guestCount: '450',
      budget: '₹10 Lakhs',
      message: 'Looking for full wedding planning including decor, catering, and candid photo/video team.',
      status: 'New',
      createdAt: '2026-08-15 14:30',
    },
    {
      id: 'lead-102',
      name: 'Amitava Chatterjee',
      phone: '+91 98300 44556',
      email: 'amitava.c@example.com',
      eventDate: '2026-12-10',
      eventType: 'Reception',
      service: 'Luxury Theme & Mandap Decor',
      guestCount: '700',
      budget: '₹6 Lakhs',
      message: 'Need a royal palace theme decor setup at Salt Lake stadium banquet.',
      status: 'Contacted',
      createdAt: '2026-08-16 11:15',
    },
  ],
};

async function seedData() {
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    console.log('Seeding initial sample data to Firestore `content/site_data`...');
    const docRef = doc(db, 'content', 'site_data');
    await setDoc(docRef, sampleData, { merge: true });

    console.log('✔ Successfully populated database with rich sample data!');
    console.log('- 6 Premium Services');
    console.log('- 3 Wedding Packages');
    console.log('- 5 Gallery Categories');
    console.log('- 3 Artist Profiles with Galleries');
    console.log('- 3 Client Testimonials');
    console.log('- 2 Sample Leads');
    console.log('- Complete Hero Banners & Site Settings');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    process.exit(1);
  }
}

seedData();
