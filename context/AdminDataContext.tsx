import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PackageData } from '@/components/PackageDetailModal';
import { ServiceItem } from '@/components/ServicesSection';
import { ArtistProfile } from '@/pages/gallery';

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
  error: string | null;

  // Leads
  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: LeadItem['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, updated: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Packages
  packages: PackageData[];
  addPackage: (pkg: Omit<PackageData, 'id'>) => Promise<void>;
  updatePackage: (id: string, updated: Partial<PackageData>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;

  // Gallery & Artists
  categories: string[];
  artists: ArtistProfile[];
  addCategory: (category: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
  addArtist: (artist: Omit<ArtistProfile, 'id'>) => Promise<void>;
  updateArtist: (id: string, updated: Partial<ArtistProfile>) => Promise<void>;
  deleteArtist: (id: string) => Promise<void>;
  addPhotoToArtist: (artistId: string, photo: { title: string; image: string }) => Promise<void>;
  removePhotoFromArtist: (artistId: string, photoIndex: number) => Promise<void>;

  // Banners
  banners: BannerSettings;
  updateBanners: (updated: Partial<BannerSettings>) => Promise<void>;

  // Testimonials
  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Settings
  settings: SiteSettings;
  updateSettings: (updated: Partial<SiteSettings>) => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pure dynamic Firestore state (strictly initialized empty)
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [artists, setArtists] = useState<ArtistProfile[]>([]);
  const [banners, setBanners] = useState<BannerSettings>(emptyBanners);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);

  // Write mutation directly to Firebase Firestore
  const syncToCloud = async (partialData: Record<string, any>) => {
    if (!db) {
      console.warn('Firebase Firestore is not initialized.');
      return;
    }
    try {
      const docRef = doc(db, 'content', 'site_data');
      await setDoc(docRef, partialData, { merge: true });
    } catch (err: any) {
      console.error('Failed to sync to Firebase Firestore:', err);
      setError(err?.message || 'Failed to save changes to Firestore');
      throw err;
    }
  };

  // Subscribe to real-time Firestore cloud database on mount
  useEffect(() => {
    // Check admin session token
    try {
      const authSession = localStorage.getItem('shuvayan_admin_session');
      if (authSession) {
        const user = JSON.parse(authSession);
        setIsAuthenticated(true);
        setAdminUser(user);
      }
    } catch (e) {
      console.warn('Error reading admin session from localStorage', e);
    }

    if (!db) {
      setIsLoading(false);
      setError('Firebase Firestore is not available.');
      return;
    }

    try {
      const docRef = doc(db, 'content', 'site_data');
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          setIsLoading(false);
          setError(null);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setServices(Array.isArray(data.services) ? data.services : []);
            setPackages(Array.isArray(data.packages) ? data.packages : []);
            setCategories(Array.isArray(data.categories) ? data.categories : []);
            setArtists(Array.isArray(data.artists) ? data.artists : []);
            setBanners(data.banners && typeof data.banners === 'object' ? data.banners : emptyBanners);
            setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
            setSettings(data.settings && typeof data.settings === 'object' ? data.settings : emptySettings);
            setLeads(Array.isArray(data.leads) ? data.leads : []);
          } else {
            // Firestore doc does not exist yet; maintain clean empty state
            setServices([]);
            setPackages([]);
            setCategories([]);
            setArtists([]);
            setBanners(emptyBanners);
            setTestimonials([]);
            setSettings(emptySettings);
            setLeads([]);
          }
        },
        (err) => {
          setIsLoading(false);
          setError(err.message || 'Failed to connect to Firebase database');
          console.error('Firestore subscription error:', err);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Firestore connection initialization error');
      console.error('Firestore connection initialization failed:', err);
    }
  }, []);

  // Auth methods
  const login = (email: string, password: string): boolean => {
    if (email === 'admin@shuvayan.com' && password === 'admin@2026') {
      const user = { name: 'Admin Manager', email, role: 'Super Administrator' };
      setIsAuthenticated(true);
      setAdminUser(user);
      try {
        localStorage.setItem('shuvayan_admin_session', JSON.stringify(user));
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    try {
      localStorage.removeItem('shuvayan_admin_session');
    } catch (e) {}
  };

  // Leads CRUD
  const addLead = async (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadItem = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    await syncToCloud({ leads: updated });
  };

  const updateLeadStatus = async (id: string, status: LeadItem['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    await syncToCloud({ leads: updated });
  };

  const deleteLead = async (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    await syncToCloud({ leads: updated });
  };

  // Services CRUD
  const addService = async (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `service-${Date.now()}`,
    };
    const updated = [...services, newService];
    setServices(updated);
    await syncToCloud({ services: updated });
  };

  const updateService = async (id: string, updatedService: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updatedService } : s));
    setServices(updated);
    await syncToCloud({ services: updated });
  };

  const deleteService = async (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    await syncToCloud({ services: updated });
  };

  // Packages CRUD
  const addPackage = async (pkg: Omit<PackageData, 'id'>) => {
    const newPkg: PackageData = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    const updated = [...packages, newPkg];
    setPackages(updated);
    await syncToCloud({ packages: updated });
  };

  const updatePackage = async (id: string, updatedPackage: Partial<PackageData>) => {
    const updated = packages.map((p) => (p.id === id ? { ...p, ...updatedPackage } : p));
    setPackages(updated);
    await syncToCloud({ packages: updated });
  };

  const deletePackage = async (id: string) => {
    const updated = packages.filter((p) => p.id !== id);
    setPackages(updated);
    await syncToCloud({ packages: updated });
  };

  // Gallery Categories
  const addCategory = async (category: string) => {
    const trimmed = category.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const updated = [...categories, trimmed];
    setCategories(updated);
    await syncToCloud({ categories: updated });
  };

  const deleteCategory = async (category: string) => {
    const updated = categories.filter((c) => c !== category);
    setCategories(updated);
    await syncToCloud({ categories: updated });
  };

  // Artists CRUD
  const addArtist = async (artist: Omit<ArtistProfile, 'id'>) => {
    const newArtist: ArtistProfile = {
      ...artist,
      id: `artist-${Date.now()}`,
    };
    const updated = [...artists, newArtist];
    setArtists(updated);
    await syncToCloud({ artists: updated });
  };

  const updateArtist = async (id: string, updatedArtist: Partial<ArtistProfile>) => {
    const updated = artists.map((a) => (a.id === id ? { ...a, ...updatedArtist } : a));
    setArtists(updated);
    await syncToCloud({ artists: updated });
  };

  const deleteArtist = async (id: string) => {
    const updated = artists.filter((a) => a.id !== id);
    setArtists(updated);
    await syncToCloud({ artists: updated });
  };

  const addPhotoToArtist = async (artistId: string, photo: { title: string; image: string }) => {
    const updated = artists.map((a) =>
      a.id === artistId ? { ...a, photos: [...a.photos, photo] } : a
    );
    setArtists(updated);
    await syncToCloud({ artists: updated });
  };

  const removePhotoFromArtist = async (artistId: string, photoIndex: number) => {
    const updated = artists.map((a) =>
      a.id === artistId
        ? { ...a, photos: a.photos.filter((_, idx) => idx !== photoIndex) }
        : a
    );
    setArtists(updated);
    await syncToCloud({ artists: updated });
  };

  // Banners
  const updateBanners = async (updatedBanner: Partial<BannerSettings>) => {
    const updated = { ...banners, ...updatedBanner };
    setBanners(updated);
    await syncToCloud({ banners: updated });
  };

  // Testimonials
  const addTestimonial = async (item: Omit<TestimonialItem, 'id'>) => {
    const newTestimonial: TestimonialItem = {
      ...item,
      id: `testimonial-${Date.now()}`,
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    await syncToCloud({ testimonials: updated });
  };

  const deleteTestimonial = async (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    await syncToCloud({ testimonials: updated });
  };

  // Site Settings
  const updateSettings = async (updatedSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...updatedSettings };
    setSettings(updated);
    await syncToCloud({ settings: updated });
  };

  return (
    <AdminDataContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        login,
        logout,
        isLoading,
        error,
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
