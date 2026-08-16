import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
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
  // 1. Homepage
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  homeHeroTagline: string;
  homeHeroBgImage: string;

  // 2. About Us Page
  aboutHeroTitle?: string;
  aboutHeroSubtitle?: string;
  aboutHeroBgImage?: string;

  // 3. Services Page
  servicesHeroTitle?: string;
  servicesHeroSubtitle?: string;
  servicesHeroBgImage?: string;

  // 4. Packages Page
  packagesHeroTitle?: string;
  packagesHeroSubtitle?: string;
  packagesHeroBgImage?: string;

  // 5. Gallery Page
  galleryHeroTitle?: string;
  galleryHeroSubtitle?: string;
  galleryHeroBgImage?: string;

  // 6. Policy & Terms Page
  policyHeroTitle?: string;
  policyHeroSubtitle?: string;
  policyHeroBgImage?: string;

  // Generic Inner Fallback
  innerHeroTitle: string;
  innerHeroBgImage: string;

  // 3-Polaroid Snapshot Cluster
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
  logoUrl?: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  contactEmail: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export const emptyBanners: BannerSettings = {
  homeHeroTitle: '',
  homeHeroSubtitle: '',
  homeHeroTagline: '',
  homeHeroBgImage: '',
  aboutHeroTitle: '',
  aboutHeroSubtitle: '',
  aboutHeroBgImage: '',
  servicesHeroTitle: '',
  servicesHeroSubtitle: '',
  servicesHeroBgImage: '',
  packagesHeroTitle: '',
  packagesHeroSubtitle: '',
  packagesHeroBgImage: '',
  galleryHeroTitle: '',
  galleryHeroSubtitle: '',
  galleryHeroBgImage: '',
  policyHeroTitle: '',
  policyHeroSubtitle: '',
  policyHeroBgImage: '',
  innerHeroTitle: '',
  innerHeroBgImage: '',
  snapshotLeft: '',
  snapshotMid: '',
  snapshotRight: '',
};

export const emptySettings: SiteSettings = {
  siteTitle: '',
  logoUrl: '',
  primaryPhone: '',
  secondaryPhone: '',
  whatsappNumber: '',
  contactEmail: '',
  address: '',
  facebookUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
};

interface AdminDataContextType {
  // Auth
  isAuthenticated: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;

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

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const normalizeImageUrl = (url?: string): string => {
  if (!url) return '';
  if (url.startsWith('/images/')) {
    const filename = url.replace('/images/', '');
    return `https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/${filename}`;
  }
  return url;
};

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Pure dynamic Firebase state (starts empty)
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [artists, setArtists] = useState<ArtistProfile[]>([]);
  const [banners, setBanners] = useState<BannerSettings>(emptyBanners);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);

  // Helper to sync changes to Firebase Firestore Cloud Database
  const syncToCloud = async (partialData: Record<string, any>) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'content', 'site_data');
      await setDoc(docRef, partialData, { merge: true });
    } catch (err) {
      console.warn('Firebase cloud sync note:', err);
    }
  };

  // Load from localStorage & subscribe to Firestore on mount
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
      if (storedServices) {
        const parsed = JSON.parse(storedServices);
        setServices(parsed.map((s: ServiceItem) => ({ ...s, image: normalizeImageUrl(s.image) })));
      }

      const storedPackages = localStorage.getItem('shuvayan_packages');
      if (storedPackages) setPackages(JSON.parse(storedPackages));

      const storedCategories = localStorage.getItem('shuvayan_categories');
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedArtists = localStorage.getItem('shuvayan_artists');
      if (storedArtists) {
        const parsed = JSON.parse(storedArtists);
        setArtists(
          parsed.map((a: ArtistProfile) => ({
            ...a,
            photos: a.photos.map((p) => ({ ...p, image: normalizeImageUrl(p.image) })),
          }))
        );
      }

      const storedBanners = localStorage.getItem('shuvayan_banners');
      if (storedBanners) setBanners(JSON.parse(storedBanners));

      const storedTestimonials = localStorage.getItem('shuvayan_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedSettings = localStorage.getItem('shuvayan_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));
    } catch (e) {
      console.warn('Error loading admin state from localStorage', e);
    }

    // Safety timeout to ensure spinner never hangs indefinitely
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Subscribe to real-time Firestore cloud database
    if (db) {
      try {
        const docRef = doc(db, 'content', 'site_data');
        const unsubscribe = onSnapshot(
          docRef,
          (docSnap) => {
            clearTimeout(safetyTimer);
            setIsLoading(false);
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data.services) {
                setServices(
                  data.services.map((s: ServiceItem) => ({ ...s, image: normalizeImageUrl(s.image) }))
                );
              }
              if (data.packages) setPackages(data.packages);
              if (data.categories) setCategories(data.categories);
              if (data.artists) {
                setArtists(
                  data.artists.map((a: ArtistProfile) => ({
                    ...a,
                    photos: a.photos.map((p: any) => ({ ...p, image: normalizeImageUrl(p.image) })),
                  }))
                );
              }
              if (data.banners) setBanners(data.banners);
              if (data.testimonials) setTestimonials(data.testimonials || []);
              if (data.settings) setSettings(data.settings);
              if (data.leads) setLeads(data.leads);
            }
          },
          (err) => {
            clearTimeout(safetyTimer);
            setIsLoading(false);
            console.warn('Firestore subscription note / offline fallback:', err);
          }
        );

        return () => {
          clearTimeout(safetyTimer);
          unsubscribe();
        };
      } catch (err) {
        clearTimeout(safetyTimer);
        setIsLoading(false);
        console.warn('Firestore subscription failed:', err);
      }
    } else {
      clearTimeout(safetyTimer);
      setIsLoading(false);
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
    const updated = [newLead, ...leads];
    setLeads(updated);
    syncToCloud({ leads: updated });
  };

  const updateLeadStatus = (id: string, status: LeadItem['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    syncToCloud({ leads: updated });
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    syncToCloud({ leads: updated });
  };

  // Services
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `service-${Date.now()}`,
    };
    const updated = [...services, newService];
    setServices(updated);
    syncToCloud({ services: updated });
  };

  const updateService = (id: string, updatedService: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updatedService } : s));
    setServices(updated);
    syncToCloud({ services: updated });
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    syncToCloud({ services: updated });
  };

  // Packages
  const addPackage = (pkg: Omit<PackageData, 'id'>) => {
    const newPkg: PackageData = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    const updated = [...packages, newPkg];
    setPackages(updated);
    syncToCloud({ packages: updated });
  };

  const updatePackage = (id: string, updatedPkg: Partial<PackageData>) => {
    const updated = packages.map((p) => (p.id === id ? { ...p, ...updatedPkg } : p));
    setPackages(updated);
    syncToCloud({ packages: updated });
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter((p) => p.id !== id);
    setPackages(updated);
    syncToCloud({ packages: updated });
  };

  // Categories & Artists
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      const updated = [...categories, category];
      setCategories(updated);
      syncToCloud({ categories: updated });
    }
  };

  const deleteCategory = (category: string) => {
    const updated = categories.filter((c) => c !== category);
    setCategories(updated);
    syncToCloud({ categories: updated });
  };

  const addArtist = (artist: Omit<ArtistProfile, 'id'>) => {
    const newArtist: ArtistProfile = {
      ...artist,
      id: `artist-${Date.now()}`,
    };
    const updated = [newArtist, ...artists];
    setArtists(updated);
    syncToCloud({ artists: updated });
  };

  const updateArtist = (id: string, updatedArtist: Partial<ArtistProfile>) => {
    const updated = artists.map((a) => (a.id === id ? { ...a, ...updatedArtist } : a));
    setArtists(updated);
    syncToCloud({ artists: updated });
  };

  const deleteArtist = (id: string) => {
    const updated = artists.filter((a) => a.id !== id);
    setArtists(updated);
    syncToCloud({ artists: updated });
  };

  const addPhotoToArtist = (artistId: string, photo: { title: string; image: string }) => {
    const updated = artists.map((a) =>
      a.id === artistId ? { ...a, photos: [...a.photos, photo] } : a
    );
    setArtists(updated);
    syncToCloud({ artists: updated });
  };

  const removePhotoFromArtist = (artistId: string, photoIndex: number) => {
    const updated = artists.map((a) =>
      a.id === artistId
        ? { ...a, photos: a.photos.filter((_, idx) => idx !== photoIndex) }
        : a
    );
    setArtists(updated);
    syncToCloud({ artists: updated });
  };

  // Banners
  const updateBanners = (updatedBanner: Partial<BannerSettings>) => {
    const updated = { ...banners, ...updatedBanner };
    setBanners(updated);
    syncToCloud({ banners: updated });
  };

  // Testimonials
  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `testimonial-${Date.now()}`,
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    syncToCloud({ testimonials: updated });
  };

  const updateTestimonial = (id: string, updatedTestimonial: Partial<TestimonialItem>) => {
    const updated = testimonials.map((t) =>
      t.id === id ? { ...t, ...updatedTestimonial } : t
    );
    setTestimonials(updated);
    syncToCloud({ testimonials: updated });
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    syncToCloud({ testimonials: updated });
  };

  // Site Settings
  const updateSettings = (updatedSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...updatedSettings };
    setSettings(updated);
    syncToCloud({ settings: updated });
  };

  const resetAllToDefault = () => {
    setServices([]);
    setPackages([]);
    setCategories([]);
    setArtists([]);
    setBanners(emptyBanners);
    setTestimonials([]);
    setSettings(emptySettings);
    setLeads([]);

    localStorage.removeItem('shuvayan_services');
    localStorage.removeItem('shuvayan_packages');
    localStorage.removeItem('shuvayan_categories');
    localStorage.removeItem('shuvayan_artists');
    localStorage.removeItem('shuvayan_banners');
    localStorage.removeItem('shuvayan_testimonials');
    localStorage.removeItem('shuvayan_settings');
    localStorage.removeItem('shuvayan_leads');

    syncToCloud({
      services: [],
      packages: [],
      categories: [],
      artists: [],
      banners: emptyBanners,
      testimonials: [],
      settings: emptySettings,
      leads: [],
    });
  };

  return (
    <AdminDataContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        isLoading,
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
