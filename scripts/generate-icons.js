import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgIcon = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#171717"/>
  <circle cx="256" cy="256" r="150" fill="#72D9FF"/>
  <circle cx="256" cy="256" r="100" fill="#171717"/>
  <circle cx="256" cy="256" r="50" fill="#72D9FF"/>
</svg>
`;

async function generateIcons() {
  const publicDir = join(__dirname, '..', 'public');
  
  // 192x192 아이콘 생성
  await sharp(Buffer.from(svgIcon))
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'pwa-192x192.png'));
  
  // 512x512 아이콘 생성
  await sharp(Buffer.from(svgIcon))
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'pwa-512x512.png'));
  
  // favicon 생성
  await sharp(Buffer.from(svgIcon))
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon.ico'));
  
  // apple-touch-icon 생성
  await sharp(Buffer.from(svgIcon))
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  
  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);

