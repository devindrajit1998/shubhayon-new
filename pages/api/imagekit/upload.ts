import type { NextApiRequest, NextApiResponse } from 'next';
import { getImageKitServerInstance, isImageKitConfigured } from '@/lib/imagekit';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, fileName, folder } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({ error: 'Missing file data or fileName' });
    }

    if (!isImageKitConfigured()) {
      // In local mode without keys, return the data url
      return res.status(200).json({ url: file });
    }

    const imagekit = getImageKitServerInstance();
    if (!imagekit) {
      return res.status(500).json({ error: 'Could not initialize ImageKit server' });
    }

    const result = await imagekit.upload({
      file: file, // accepts base64 data string or URL
      fileName: fileName,
      folder: folder || '/shuvayan_assets',
      useUniqueFileName: true,
    });

    return res.status(200).json({
      url: result.url,
      fileId: result.fileId,
      name: result.name,
      thumbnailUrl: result.thumbnailUrl,
    });
  } catch (error: any) {
    console.error('ImageKit server upload error:', error);
    return res.status(500).json({ error: error.message || 'ImageKit upload failed' });
  }
}
