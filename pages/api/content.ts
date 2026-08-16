import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { servicesList } from '@/components/ServicesSection';
import { packagesList } from '@/components/PackagesSection';
import { artistList, galleryCategories } from '@/pages/gallery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, 'content', 'site_data');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return res.status(200).json({
          source: 'firebase',
          services: data.services || servicesList,
          packages: data.packages || packagesList,
          categories: data.categories || galleryCategories,
          artists: data.artists || artistList,
          banners: data.banners || null,
          testimonials: data.testimonials || null,
          settings: data.settings || null,
        });
      }
    }

    // Default Fallback
    return res.status(200).json({
      source: 'default',
      services: servicesList,
      packages: packagesList,
      categories: galleryCategories,
      artists: artistList,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Content fetch error' });
  }
}
