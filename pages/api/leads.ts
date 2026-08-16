import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, eventDate, eventType, service, guestCount, budget, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required' });
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email: email || '',
      eventDate: eventDate || '',
      eventType: eventType || 'Wedding',
      service: service || 'General Inquiry',
      guestCount: guestCount || '',
      budget: budget || '',
      message: message || '',
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, 'content', 'site_data');
      const docSnap = await getDoc(docRef);
      let currentLeads = [];
      if (docSnap.exists()) {
        currentLeads = docSnap.data().leads || [];
      }
      const updatedLeads = [newLead, ...currentLeads];
      await setDoc(docRef, { leads: updatedLeads }, { merge: true });
    }

    return res.status(201).json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error('Leads submit error:', error);
    return res.status(500).json({ error: error.message || 'Lead submission failed' });
  }
}
