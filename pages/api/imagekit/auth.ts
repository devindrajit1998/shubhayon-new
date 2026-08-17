import type { NextApiRequest, NextApiResponse } from 'next';
import { getImageKitServerInstance, isImageKitConfigured } from '@/lib/imagekit';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isImageKitConfigured()) {
    return res.status(503).json({
      configured: false,
      error: 'ImageKit is not configured. Set NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT environment variables.',
    });
  }

  try {
    const imagekit = getImageKitServerInstance();
    if (!imagekit) {
      return res.status(500).json({ error: 'Could not initialize ImageKit' });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();
    return res.status(200).json({
      configured: true,
      ...authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'ImageKit auth error' });
  }
}
