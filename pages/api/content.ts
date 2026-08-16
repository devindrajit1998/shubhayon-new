import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

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
          services: Array.isArray(data.services) ? data.services : [],
          packages: Array.isArray(data.packages) ? data.packages : [],
          categories: Array.isArray(data.categories) ? data.categories : [],
          artists: Array.isArray(data.artists) ? data.artists : [],
          banners: data.banners || null,
          testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
          settings: data.settings || null,
        });
      }
    }

    // Default Empty State (Firebase not populated yet or offline)
    return res.status(200).json({
      source: 'empty',
      services: [],
      packages: [],
      categories: [],
      artists: [],
      banners: null,
      testimonials: [],
      settings: null,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Content fetch error' });
  }
}
