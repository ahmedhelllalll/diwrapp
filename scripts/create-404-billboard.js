const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgText = `
<svg width="716" height="563" xmlns="http://www.w3.org/2000/svg">
  <style>
    .error-label { font-family: 'Segoe UI', Arial, sans-serif; font-size: 26px; font-weight: 600; fill: #101828; letter-spacing: -0.5px; }
    .error-code { font-family: 'Segoe UI', Arial, sans-serif; font-size: 96px; font-weight: 800; fill: #000000; letter-spacing: -2px; }
  </style>
  <text x="312" y="198" text-anchor="middle" class="error-label">Error #</text>
  <text x="312" y="292" text-anchor="middle" class="error-code">404</text>
</svg>
`;

async function main() {
  const outputDir = path.join('public', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'not-found-billboard.webp');

  await sharp('public/assets/billboard-mockup.png')
    .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
