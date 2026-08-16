import type { NextApiRequest, NextApiResponse } from 'next';
import { getImageKitServerInstance, isImageKitConfigured } from '@/lib/imagekit';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isImageKitConfigured()) {
    return res.status(200).json({
      configured: false,
      message: 'ImageKit is not fully configured in environment variables yet.',
      // Fallback dummy token for UI preview
      token: `demo-token-${Date.now()}`,
      expire: Math.floor(Date.now() / 1000) + 1800,
      signature: 'demo-signature',
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
