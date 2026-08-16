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
      return res.status(200).json({ url: file, mode: 'local' });
    }

    const imagekit = getImageKitServerInstance();
    if (!imagekit) {
      return res.status(200).json({ url: file, mode: 'fallback' });
    }

    try {
      const result = await imagekit.upload({
        file: file,
        fileName: safeName,
        folder: folder || '/shuvayan_assets',
        useUniqueFileName: true,
      });

      return res.status(200).json({
        url: result.url,
        fileId: result.fileId,
        name: result.name,
        thumbnailUrl: result.thumbnailUrl,
      });
    } catch (sdkErr: any) {
      console.warn('ImageKit direct upload warning, using local data fallback:', sdkErr.message);
      // Return safe data fallback so admin is never blocked
      return res.status(200).json({ url: file, fallback: true });
    }
  } catch (error: any) {
    console.error('ImageKit upload handler error:', error);
    // If request body has file, return it rather than returning 500
    if (req.body?.file) {
      return res.status(200).json({ url: req.body.file, fallback: true });
    }
    return res.status(500).json({ error: error.message || 'ImageKit upload failed' });
  }
}
