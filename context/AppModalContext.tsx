import { createContext, useContext } from 'react';
import type { PackageData } from '@/components/PackageDetailModal';

export interface AppContextType {
  openQuoteModal: (initialService?: string) => void;
  openPackageModal: (pkg: PackageData) => void;
  openLightbox: (index: number) => void;
}

export const AppModalContext = createContext<AppContextType>({
  openQuoteModal: () => {},
  openPackageModal: () => {},
  openLightbox: () => {},
});

export const useAppModals = () => useContext(AppModalContext);
