import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, servicesList as defaultServices } from '@/components/ServicesSection';
import { PackageData } from '@/components/PackageDetailModal';
import { packagesList as defaultPackages } from '@/components/PackagesSection';
import { ArtistProfile, artistList as defaultArtists, galleryCategories as defaultCategories } from '@/pages/gallery';

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  service: string;
  guestCount?: string;
  budget?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Confirmed' | 'Closed';
  createdAt: string;
}

export interface BannerSettings {
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroTagline: string;
  homeHeroBgImage: string;
  innerHeroTitle: string;
  innerHeroBgImage: string;
  snapshotLeft: string;
  snapshotMid: string;
  snapshotRight: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  event: string;
  date: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface SiteSettings {
  siteTitle: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

interface AdminDataContextType {
  // Auth
  isAuthenticated: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Leads
  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  deleteLead: (id: string) => void;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Packages
  packages: PackageData[];
  addPackage: (pkg: Omit<PackageData, 'id'>) => void;
  updatePackage: (id: string, updated: Partial<PackageData>) => void;
  deletePackage: (id: string) => void;

  // Gallery & Artists
  categories: string[];
  artists: ArtistProfile[];
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  addArtist: (artist: Omit<ArtistProfile, 'id'>) => void;
  updateArtist: (id: string, updated: Partial<ArtistProfile>) => void;
  deleteArtist: (id: string) => void;
  addPhotoToArtist: (artistId: string, photo: { title: string; image: string }) => void;
  removePhotoFromArtist: (artistId: string, photoIndex: number) => void;

  // Banners
  banners: BannerSettings;
  updateBanners: (updated: Partial<BannerSettings>) => void;

  // Testimonials
  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (updated: Partial<SiteSettings>) => void;

  // Reset to defaults
  resetAllToDefault: () => void;
}

const defaultLeads: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Sayan Mukherjee',
    phone: '+91 98301 23456',
    email: 'sayan.m@gmail.com',
    eventDate: '2026-11-20',
    eventType: 'Bengali Wedding',
    service: 'Bridal Makeover & Photography',
    guestCount: '350',
    budget: '₹4,50,000',
    message: 'Looking for authentic Vedic priest and full cinematic video coverage in Kolkata.',
    status: 'New',
    createdAt: '2026-08-15 14:30',
  },
  {
    id: 'lead-2',
    name: 'Priyanka Banerjee',
    phone: '+91 94330 87654',
    email: 'priyanka.b@outlook.com',
    eventDate: '2026-12-05',
    eventType: 'Reception & Tatta Decor',
    service: 'Trey Decor & Mehendi',
    guestCount: '200',
    budget: '₹2,20,000',
    message: 'Need 15 custom decorated tatta trays with traditional Bengali sweet hampers.',
    status: 'Contacted',
    createdAt: '2026-08-14 11:15',
  },
  {
    id: 'lead-3',
    name: 'Debanjan Roy',
    phone: '+91 87770 12389',
    email: 'debanjan.roy@gmail.com',
    eventDate: '2026-10-18',
    eventType: 'Royal Bengali Wedding',
    service: 'Premium Package',
    guestCount: '500',
    budget: '₹8,50,000',
    message: 'Interested in the full Premium Package with floral mandap and drone cinematography.',
    status: 'Confirmed',
    createdAt: '2026-08-12 18:40',
  },
  {
    id: 'lead-4',
    name: 'Ananya Sen',
    phone: '+91 90071 45678',
    email: 'ananya.sen@yahoo.com',
    eventDate: '2026-09-28',
    eventType: 'Aiburobhat & Gaye Holud',
    service: 'Mehendi & Floral Decor',
    guestCount: '80',
    budget: '₹1,50,000',
    message: 'Intimate pre-wedding ceremony styling required.',
    status: 'In Progress',
    createdAt: '2026-08-10 09:20',
  },
];

const defaultBanners: BannerSettings = {
  homeHeroTitle: 'Every moment Unforgettable',
  homeHeroSubtitle: 'We make',
  homeHeroTagline: 'Shuvayan brings your dream celebration to life with creativity, elegance & flawless execution.',
  homeHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Index-banner.jpg',
  innerHeroTitle: 'Moments that last forever',
  innerHeroBgImage: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/galler-banner.png',
  snapshotLeft: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-left.jpg',
  snapshotMid: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-mid.png',
  snapshotRight: 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/banner-right.jpg',
};

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Sourav & Tanushree',
    event: 'Wedding at Rajbari Bawali',
    date: 'February 2026',
    rating: 5,
    quote: 'Shuvayan made our wedding completely magical! Every ritual, tatta tray, and the floral mandap exceeded our expectations. Our guests are still raving about the hospitality.',
  },
  {
    id: 't-2',
    name: 'Anirban & Sreemoyee',
    event: 'Reception at ITC Royal Bengal',
    date: 'January 2026',
    rating: 5,
    quote: 'The makeover team was phenomenal. Tania made the bride look like a queen! From photography to time management, everything was executed flawlessly.',
  },
  {
    id: 't-3',
    name: 'Subhashish & Payel',
    event: 'Traditional Bengali Wedding',
    date: 'December 2025',
    rating: 5,
    quote: 'Highly professional and deeply respectful of authentic Bengali traditions. The priest, the shehnai, the food arrangement—everything was 10/10.',
  },
];

const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Shuvayan | Bengali Wedding & Event Management',
  primaryPhone: '+91 98300 00000',
  secondaryPhone: '+91 98311 11111',
  whatsappNumber: '+91 98300 00000',
  contactEmail: 'contact@shuvayan.com',
  address: 'Salt Lake Sector V, Kolkata, West Bengal 700091',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
};

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Content states
  const [leads, setLeads] = useState<LeadItem[]>(defaultLeads);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [packages, setPackages] = useState<PackageData[]>(defaultPackages);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [artists, setArtists] = useState<ArtistProfile[]>(defaultArtists);
  const [banners, setBanners] = useState<BannerSettings>(defaultBanners);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const authSession = localStorage.getItem('shuvayan_admin_session');
      if (authSession) {
        const user = JSON.parse(authSession);
        setIsAuthenticated(true);
        setAdminUser(user);
      }

      const storedLeads = localStorage.getItem('shuvayan_leads');
      if (storedLeads) setLeads(JSON.parse(storedLeads));

      const storedServices = localStorage.getItem('shuvayan_services');
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedPackages = localStorage.getItem('shuvayan_packages');
      if (storedPackages) setPackages(JSON.parse(storedPackages));

      const storedCategories = localStorage.getItem('shuvayan_categories');
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedArtists = localStorage.getItem('shuvayan_artists');
      if (storedArtists) setArtists(JSON.parse(storedArtists));

      const storedBanners = localStorage.getItem('shuvayan_banners');
      if (storedBanners) setBanners(JSON.parse(storedBanners));

      const storedTestimonials = localStorage.getItem('shuvayan_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedSettings = localStorage.getItem('shuvayan_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));
    } catch (e) {
      console.warn('Error loading admin state from localStorage', e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_leads', JSON.stringify(leads));
    } catch (e) {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_services', JSON.stringify(services));
    } catch (e) {}
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_packages', JSON.stringify(packages));
    } catch (e) {}
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_categories', JSON.stringify(categories));
    } catch (e) {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_artists', JSON.stringify(artists));
    } catch (e) {}
  }, [artists]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_banners', JSON.stringify(banners));
    } catch (e) {}
  }, [banners]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_testimonials', JSON.stringify(testimonials));
    } catch (e) {}
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem('shuvayan_settings', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Auth methods
  const login = (email: string, pass: string): boolean => {
    if (
      (email.trim().toLowerCase() === 'admin@shuvayan.com' || email.trim().toLowerCase() === 'admin') &&
      (pass === 'shuvayan2026' || pass === 'admin123' || pass === 'admin')
    ) {
      const user = { name: 'Admin Manager', email: 'admin@shuvayan.com', role: 'Super Administrator' };
      setIsAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem('shuvayan_admin_session', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('shuvayan_admin_session');
  };

  // Leads
  const addLead = (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadItem = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadItem['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Services
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `service-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Packages
  const addPackage = (pkg: Omit<PackageData, 'id'>) => {
    const newPkg: PackageData = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    setPackages((prev) => [...prev, newPkg]);
  };

  const updatePackage = (id: string, updated: Partial<PackageData>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  // Categories & Artists
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  const deleteCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category));
  };

  const addArtist = (artist: Omit<ArtistProfile, 'id'>) => {
    const newArtist: ArtistProfile = {
      ...artist,
      id: `artist-${Date.now()}`,
    };
    setArtists((prev) => [newArtist, ...prev]);
  };

  const updateArtist = (id: string, updated: Partial<ArtistProfile>) => {
    setArtists((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteArtist = (id: string) => {
    setArtists((prev) => prev.filter((a) => a.id !== id));
  };

  const addPhotoToArtist = (artistId: string, photo: { title: string; image: string }) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === artistId ? { ...a, photos: [...a.photos, photo] } : a))
    );
  };

  const removePhotoFromArtist = (artistId: string, photoIndex: number) => {
    setArtists((prev) =>
      prev.map((a) =>
        a.id === artistId
          ? { ...a, photos: a.photos.filter((_, idx) => idx !== photoIndex) }
          : a
      )
    );
  };

  // Banners
  const updateBanners = (updated: Partial<BannerSettings>) => {
    setBanners((prev) => ({ ...prev, ...updated }));
  };

  // Testimonials
  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `testimonial-${Date.now()}`,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Settings
  const updateSettings = (updated: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  // Reset
  const resetAllToDefault = () => {
    setLeads(defaultLeads);
    setServices(defaultServices);
    setPackages(defaultPackages);
    setCategories(defaultCategories);
    setArtists(defaultArtists);
    setBanners(defaultBanners);
    setTestimonials(defaultTestimonials);
    setSettings(defaultSiteSettings);
    localStorage.clear();
  };

  return (
    <AdminDataContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        services,
        addService,
        updateService,
        deleteService,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        categories,
        artists,
        addCategory,
        deleteCategory,
        addArtist,
        updateArtist,
        deleteArtist,
        addPhotoToArtist,
        removePhotoFromArtist,
        banners,
        updateBanners,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        settings,
        updateSettings,
        resetAllToDefault,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
