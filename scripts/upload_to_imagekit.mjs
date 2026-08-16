import ImageKit from 'imagekit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagekit = new ImageKit({
  publicKey: 'public_s5KRlNc2+EJsGqw/EEaBctV//P4=',
  privateKey: 'private_bFBEz2HCbIhdzWJ2CYiAtz5Jkwc=',
  urlEndpoint: 'https://ik.imagekit.io/thhqkqsnb',
});

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(imagesDir);

console.log(`Found ${files.length} files in public/images. Starting upload to ImageKit...`);

const mapping = {};

async function uploadAll() {
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const fileBuffer = fs.readFileSync(filePath);
    try {
      console.log(`Uploading: ${file}...`);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: file,
        folder: '/shuvayan_assets',
        useUniqueFileName: false,
      });
      mapping[file] = response.url;
      console.log(`✓ Uploaded ${file} -> ${response.url}`);
    } catch (err) {
      console.error(`✗ Error uploading ${file}:`, err.message || err);
    }
  }

  const mappingPath = path.join(__dirname, '..', 'lib', 'imagekitMapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`\nAll uploads completed! Mapping saved to lib/imagekitMapping.json`);
}

uploadAll();
