import ImageKit from 'imagekit';

export const isImageKitConfigured = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  );
};

export const getImageKitServerInstance = (): ImageKit | null => {
  if (!isImageKitConfigured()) return null;

  return new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
  });
};
