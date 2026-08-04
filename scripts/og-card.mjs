// A 1200x630 link-preview card: a real species photograph, the wordmark, and
// ITF's logo, so a shared link unfurls as something worth tapping.
import sharp from 'sharp';

const W = 1200, H = 630;
const photo = await sharp('static/images/species/oak-tree.webp')
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .modulate({ brightness: 0.82 })
  .toBuffer();

const logo = await sharp('static/images/itf-logo.png').resize({ height: 62 }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#0d1a0f" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="#0d1a0f" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0d1a0f" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#167E3C"/>
  <text x="72" y="330" font-family="Georgia, serif" font-size="76" fill="#FBFAF7">Meet a Tree</text>
  <text x="72" y="392" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#DDE6D6">
    A free field guide to the trees of Britain and Ireland
  </text>
  <text x="72" y="438" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#A9BFA4">
    How to spot them · their folklore · their science
  </text>
</svg>`;

await sharp(photo)
  .composite([
    { input: Buffer.from(svg), top: 0, left: 0 },
    { input: await sharp({ create: { width: (logoMeta.width ?? 150) + 28, height: 90, channels: 4, background: '#FBFAF7' } }).png().toBuffer(), top: H - 130, left: 72 },
    { input: logo, top: H - 116, left: 86 }
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('static/images/og-card.jpg');

const m = await sharp('static/images/og-card.jpg').metadata();
console.log('og-card.jpg', m.width + 'x' + m.height);
