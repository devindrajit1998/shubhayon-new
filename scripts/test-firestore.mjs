import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
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

console.log('--- Testing Firebase / Firestore Connection ---');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('API Key Present:', Boolean(firebaseConfig.apiKey));

async function testConnection() {
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    console.log('\n[1/3] Attempting to READ document `content/site_data`...');
    const docRef = doc(db, 'content', 'site_data');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('✔ SUCCESS: `content/site_data` document found!');
      const data = docSnap.data();
      console.log('Document fields:', Object.keys(data));
      console.log('Services count:', Array.isArray(data.services) ? data.services.length : 0);
      console.log('Packages count:', Array.isArray(data.packages) ? data.packages.length : 0);
      console.log('Categories count:', Array.isArray(data.categories) ? data.categories.length : 0);
      console.log('Artists count:', Array.isArray(data.artists) ? data.artists.length : 0);
      console.log('Testimonials count:', Array.isArray(data.testimonials) ? data.testimonials.length : 0);
      console.log('Leads count:', Array.isArray(data.leads) ? data.leads.length : 0);
    } else {
      console.log('ℹ NOTICE: Connection established, but `content/site_data` does not exist yet.');
    }

    console.log('\n[2/3] Attempting to WRITE a ping check to test security rules...');
    await setDoc(docRef, { _lastConnectionTest: new Date().toISOString() }, { merge: true });
    console.log('✔ SUCCESS: Successfully wrote to Firestore with merge!');

    console.log('\n[3/3] Re-verifying read after write...');
    const verifySnap = await getDoc(docRef);
    console.log('✔ SUCCESS: Verified updated document. Last ping:', verifySnap.data()?._lastConnectionTest);

    console.log('\n======================================================');
    console.log('🎉 RESULT: Firestore is 100% PROPERLY CONNECTED and working!');
    console.log('======================================================');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED:');
    console.error('Error Code:', error?.code);
    console.error('Error Message:', error?.message);
    process.exit(1);
  }
}

testConnection();
