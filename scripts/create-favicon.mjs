import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const sizes = [16, 32, 48, 64, 128, 192, 256, 512];
const outputDir = 'public';

// Create favicon.ico (multi-size)
async function createFaviconICO() {
  const buffers = await Promise.all(
    sizes.map(async (size) => {
      const buffer = await sharp('public/favicon.svg')
        .resize(size, size)
        .png()
        .toBuffer();
      return buffer;
    })
  );

  // Write combined ICO file (first size as fallback)
  const fs = await import('fs');
  fs.writeFileSync(join(outputDir, 'favicon.ico'), buffers[0]);
  console.log('Created favicon.ico (16x16)');
}

// Create individual PNGs
async function createPNGs() {
  for (const size of sizes) {
    await sharp('public/favicon.svg')
      .resize(size, size)
      .png()
      .toFile(join(outputDir, `icon-${size}x${size}.png`));
    console.log(`Created icon-${size}x${size}.png`);
  }
}

// Create apple touch icon
async function createAppleTouchIcon() {
  await sharp('public/favicon.svg')
    .resize(180, 180)
    .png()
    .toFile(join(outputDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png (180x180)');
}

await createFaviconICO();
await createPNGs();
await createAppleTouchIcon();
console.log('\nAll favicons created!');
