import type { NextApiRequest, NextApiResponse } from 'next';
import { getImageKitServerInstance, isImageKitConfigured } from '@/lib/imagekit';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, fileName, folder } = req.body || {};

    if (!file) {
      return res.status(400).json({ error: 'Missing image file data' });
    }

    const safeName = (fileName || `upload_${Date.now()}.jpg`).replace(/[^a-zA-Z0-9._-]/g, '_');

    if (!isImageKitConfigured()) {
      return res.status(503).json({
        error: 'ImageKit is not configured. Please set NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT in your environment variables.',
      });
    }

    const imagekit = getImageKitServerInstance();
    if (!imagekit) {
      return res.status(503).json({ error: 'Could not initialize ImageKit server instance.' });
    }

    // Sanitize folder path: ensure it starts with / and contains only valid characters
    let safeFolder = '/shuvayan_assets';
    if (folder && typeof folder === 'string') {
      const cleaned = folder
        .trim()
        .replace(/\\/g, '/')
        .replace(/\/+/g, '/')
        .replace(/[^a-zA-Z0-9_\-\/]/g, '_');
      safeFolder = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    }

    try {
      const result = await imagekit.upload({
        file: file,
        fileName: safeName,
        folder: safeFolder,
        useUniqueFileName: true,
      });

      return res.status(200).json({
        url: result.url,
        fileId: result.fileId,
        name: result.name,
        thumbnailUrl: result.thumbnailUrl,
      });
    } catch (sdkErr: any) {
      console.error('ImageKit SDK upload failed:', sdkErr.message);
      return res.status(500).json({
        error: `ImageKit upload failed: ${sdkErr.message || 'Unknown error'}. Please check your ImageKit credentials and retry.`,
      });
    }
  } catch (error: any) {
    console.error('ImageKit upload handler error:', error);
    return res.status(500).json({ error: error.message || 'ImageKit upload failed' });
  }
}
