import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
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
  homeSnapshotLeft?: string;
  homeSnapshotMid?: string;
  homeSnapshotRight?: string;

  // 2. About Us Page
  aboutHeroTitle?: string;
  aboutHeroSubtitle?: string;
  aboutHeroBgImage?: string;
  aboutSnapshotLeft?: string;
  aboutSnapshotMid?: string;
  aboutSnapshotRight?: string;

  // 3. Services Page
  servicesHeroTitle?: string;
  servicesHeroSubtitle?: string;
  servicesHeroBgImage?: string;
  servicesSnapshotLeft?: string;
  servicesSnapshotMid?: string;
  servicesSnapshotRight?: string;

  // 4. Packages Page
  packagesHeroTitle?: string;
  packagesHeroSubtitle?: string;
  packagesHeroBgImage?: string;
  packagesSnapshotLeft?: string;
  packagesSnapshotMid?: string;
  packagesSnapshotRight?: string;

  // 5. Gallery Page
  galleryHeroTitle?: string;
  galleryHeroSubtitle?: string;
  galleryHeroBgImage?: string;
  gallerySnapshotLeft?: string;
  gallerySnapshotMid?: string;
  gallerySnapshotRight?: string;

  // 6. Catering Menu Page
  menuHeroTitle?: string;
  menuHeroSubtitle?: string;
  menuHeroBgImage?: string;
  menuSnapshotLeft?: string;
  menuSnapshotMid?: string;
  menuSnapshotRight?: string;

  // 7. Policy & Terms Page
  policyHeroTitle?: string;
  policyHeroSubtitle?: string;
  policyHeroBgImage?: string;
  policySnapshotLeft?: string;
  policySnapshotMid?: string;
  policySnapshotRight?: string;

  // Generic Inner Fallback
  innerHeroTitle: string;
  innerHeroBgImage: string;

  // Global Default 3-Polaroid Snapshot Cluster
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
  homeSnapshotLeft: '',
  homeSnapshotMid: '',
  homeSnapshotRight: '',

  aboutHeroTitle: '',
  aboutHeroSubtitle: '',
  aboutHeroBgImage: '',
  aboutSnapshotLeft: '',
  aboutSnapshotMid: '',
  aboutSnapshotRight: '',

  servicesHeroTitle: '',
  servicesHeroSubtitle: '',
  servicesHeroBgImage: '',
  servicesSnapshotLeft: '',
  servicesSnapshotMid: '',
  servicesSnapshotRight: '',

  packagesHeroTitle: '',
  packagesHeroSubtitle: '',
  packagesHeroBgImage: '',
  packagesSnapshotLeft: '',
  packagesSnapshotMid: '',
  packagesSnapshotRight: '',

  galleryHeroTitle: '',
  galleryHeroSubtitle: '',
  galleryHeroBgImage: '',
  gallerySnapshotLeft: '',
  gallerySnapshotMid: '',
  gallerySnapshotRight: '',

  menuHeroTitle: '',
  menuHeroSubtitle: '',
  menuHeroBgImage: '',
  menuSnapshotLeft: '',
  menuSnapshotMid: '',
  menuSnapshotRight: '',

  policyHeroTitle: '',
  policyHeroSubtitle: '',
  policyHeroBgImage: '',
  policySnapshotLeft: '',
  policySnapshotMid: '',
  policySnapshotRight: '',

  innerHeroTitle: '',
  innerHeroBgImage: '',
  snapshotLeft: '',
  snapshotMid: '',
  snapshotRight: '',
};

export interface MenuItem {
  id: string;
  title: string;
  tagline?: string;
  category: 'Royal Wedding Feast' | 'Classic Bengali' | 'Grand Reception' | 'Signature Buffet' | 'Traditional Special';
  pricePerPlate: string; // e.g. "₹850" or "850"
  badge?: string;
  minimumGuests?: string;
  starters?: string[];
  mainCourse?: string[];
  riceAndBreads?: string[];
  desserts?: string[];
  beverages?: string[];
  items?: string[]; // Fallback list of items
  image?: string;
}

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
  login: () => Promise<boolean>;
  devLogin: () => void;
  logout: () => Promise<void>;
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

  // Menu Packages
  menus: MenuItem[];
  addMenu: (menu: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenu: (id: string, updated: Partial<MenuItem>) => Promise<void>;
  deleteMenu: (id: string) => Promise<void>;

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
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => Promise<void>;
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
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [artists, setArtists] = useState<ArtistProfile[]>([]);
  const [banners, setBanners] = useState<BannerSettings>(emptyBanners);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(emptySettings);

  // Recursive deep cleaning helper to remove `undefined` properties (Firestore throws if any key/sub-key is undefined)
  const sanitizeForFirestore = (obj: any): any => {
    if (obj === null || obj === undefined) return null;
    if (Array.isArray(obj)) {
      return obj.map((item) => sanitizeForFirestore(item));
    }
    if (typeof obj === 'object' && obj.constructor === Object) {
      const clean: Record<string, any> = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          clean[key] = sanitizeForFirestore(value);
        }
      }
      return clean;
    }
    return obj;
  };

  // Write mutation directly to Firebase Firestore
  const syncToCloud = async (partialData: Record<string, any>) => {
    if (!db) {
      console.warn('Firebase Firestore is not initialized.');
      return;
    }
    try {
      const docRef = doc(db, 'content', 'site_data');
      const cleanPayload = sanitizeForFirestore(partialData);
      await setDoc(docRef, cleanPayload, { merge: true });
    } catch (err: any) {
      console.error('Failed to sync to Firebase Firestore:', err);
      setError(err?.message || 'Failed to save changes to Firestore');
      throw err;
    }
  };

  // Development mode bypass check
  const isDevMode = process.env.NODE_ENV === 'development';
  const isDevBypassEnabled = isDevMode && process.env.NEXT_PUBLIC_DEV_ADMIN === 'true';

  // Subscribe to real-time Firestore cloud database and auth state on mount
  useEffect(() => {
    let unsubscribeAuth: (() => void) | undefined;
    
    // In dev mode with bypass enabled, grant immediate admin privileges
    if (isDevBypassEnabled) {
      setIsAuthenticated(true);
      setAdminUser({
        name: 'Development Administrator',
        email: 'dev@localhost',
        role: 'Super Administrator',
      });
    } else if (auth) {
      // Check live auth session using Firebase
      unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user && user.email === 'enquiry.shuvayan@gmail.com') {
          setIsAuthenticated(true);
          setAdminUser({ name: user.displayName || 'Admin Manager', email: user.email, role: 'Super Administrator' });
        } else {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      });
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
            setMenus(Array.isArray(data.menus) ? data.menus : []);
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
            setMenus([]);
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

      return () => {
        unsubscribe();
        if (unsubscribeAuth) unsubscribeAuth();
      };
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Firestore connection initialization error');
      console.error('Firestore connection initialization failed:', err);
    }
  }, [isDevBypassEnabled]);

  // Auth methods
  const devLogin = () => {
    setIsAuthenticated(true);
    setAdminUser({
      name: 'Development Administrator',
      email: 'dev@localhost',
      role: 'Super Administrator',
    });
  };

  const login = async (): Promise<boolean> => {
    if (isDevBypassEnabled) {
      devLogin();
      return true;
    }
    if (!auth) {
      setError('Auth is not initialized.');
      return false;
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'enquiry.shuvayan@gmail.com') {
        return true;
      } else {
        await signOut(auth);
        setError('Unauthorized email address.');
        return false;
      }
    } catch (e: any) {
      console.error('Login error:', e);
      setError(e.message || 'Failed to login with Google.');
      return false;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    if (auth) {
      await signOut(auth);
    }
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

  // Menu Packages CRUD
  const addMenu = async (menu: Omit<MenuItem, 'id'>) => {
    const newMenu: MenuItem = {
      ...menu,
      id: `menu-${Date.now()}`,
    };
    const updated = [...menus, newMenu];
    setMenus(updated);
    await syncToCloud({ menus: updated });
  };

  const updateMenu = async (id: string, updatedMenu: Partial<MenuItem>) => {
    const updated = menus.map((m) => (m.id === id ? { ...m, ...updatedMenu } : m));
    setMenus(updated);
    await syncToCloud({ menus: updated });
  };

  const deleteMenu = async (id: string) => {
    const updated = menus.filter((m) => m.id !== id);
    setMenus(updated);
    await syncToCloud({ menus: updated });
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

  const updateTestimonial = async (id: string, updatedTestimonial: Partial<TestimonialItem>) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, ...updatedTestimonial } : t));
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
        devLogin,
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
        menus,
        addMenu,
        updateMenu,
        deleteMenu,
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
        updateTestimonial,
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
