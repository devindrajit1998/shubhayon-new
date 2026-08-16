import ImageKit from 'imagekit';

const imageKitConfig = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "public_s5KRlNc2+EJsGqw/EEaBctV//P4=",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "private_bFBEz2HCbIhdzWJ2CYiAtz5Jkwc=",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/thhqkqsnb",
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
