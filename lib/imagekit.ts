import ImageKit from 'imagekit';

export const imageKitConfig = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
};

export const isImageKitConfigured = (): boolean => {
  return Boolean(
    imageKitConfig.publicKey &&
    imageKitConfig.privateKey &&
    imageKitConfig.urlEndpoint
  );
};

export const getImageKitServerInstance = (): ImageKit | null => {
  if (!isImageKitConfigured()) return null;

  return new ImageKit({
    publicKey: imageKitConfig.publicKey,
    privateKey: imageKitConfig.privateKey,
    urlEndpoint: imageKitConfig.urlEndpoint,
  });
};
