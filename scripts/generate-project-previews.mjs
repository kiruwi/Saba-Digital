import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const sources = {
  'ufanisi-resort': 'src/images/ufanisi.webp',
  'makvo-llc': 'src/assets/projects/web-dev/app1.webp',
  'mutai-enterprises': 'public/images/m2.webp',
  'eve-on-safari': 'public/images/eosmockup.webp',
  'gsc-hauling': 'public/assets/projects/3d-graphics/gsc-images/gsc-water.webp',
  'osim-lai-branding': 'public/assets/projects/3d-graphics/osim-lai-images/logo-page2x-100.webp',
  'synnefa-rebrand': 'public/assets/projects/3d-graphics/synnefa-images/banner.jpg',
  'ad-design': 'src/images/addesign/bright-squad-cleaners.webp',
};
const directory = 'public/images/optimized/projects';
await mkdir(directory, { recursive: true });
let sourceBytes = 0;
let heroBytes = 0;
let files = 0;
for (const [id, source] of Object.entries(sources)) {
  sourceBytes += (await stat(source)).size;
  const metadata = await sharp(source).metadata();
  const maximumWidth = Math.min(1920, metadata.width, Math.floor(metadata.height * 4 / 3));
  const widths = [...new Set([...[320, 640, 960, 1280, 1920].filter(width => width <= maximumWidth), maximumWidth])];
  for (const width of widths) {
    const destination = path.join(directory, `${id}-${width}.webp`);
    // Cover matches the existing 4:3 tiles; originals are read-only inputs.
    await sharp(source).rotate().resize({ width, height: Math.round(width * 3 / 4), fit: 'cover', position: 'centre', withoutEnlargement: true })
      .webp({ quality: 92, effort: 6, smartSubsample: true }).toFile(destination);
    files += 1;
    if (width === 320) heroBytes += (await stat(destination)).size;
  }
}
console.log(JSON.stringify({ files, sourceBytes, hero320Bytes: heroBytes }));
if (process.argv[2]) {
  const tiles = Object.keys(sources).map((id, index) => ({
    input: path.join(directory, `${id}-320.webp`),
    left: (index % 4) * 340 + 10,
    top: Math.floor(index / 4) * 260 + 10,
  }));
  await sharp({ create: { width: 1360, height: 520, channels: 3, background: '#f5f6f3' } })
    .composite(tiles).png().toFile(process.argv[2]);
}
