// Generates PWA icons from an inline SVG leaf mark (ITF green #167E3C).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const leaf = (pad, r) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<rect width="512" height="512" rx="${r}" fill="#167E3C"/>
	<g transform="rotate(-8 256 256)">
		<path d="M ${146 + pad} ${146 + pad}
			C ${340 - pad} ${146 + pad} ${366 - pad} ${172 + pad} ${366 - pad} ${366 - pad}
			C ${172 + pad} ${366 - pad} ${146 + pad} ${340 - pad} ${146 + pad} ${146 + pad} Z"
			fill="#FBFAF7"/>
		<line x1="${186 + pad}" y1="${186 + pad}" x2="${326 - pad}" y2="${326 - pad}"
			stroke="#167E3C" stroke-width="18" stroke-linecap="round"/>
	</g>
</svg>`;

mkdirSync('static/icons', { recursive: true });

await sharp(Buffer.from(leaf(0, 96))).resize(192, 192).png().toFile('static/icons/icon-192.png');
await sharp(Buffer.from(leaf(0, 96))).resize(512, 512).png().toFile('static/icons/icon-512.png');
// maskable: extra safe-zone padding, square canvas
await sharp(Buffer.from(leaf(40, 0))).resize(512, 512).png().toFile('static/icons/maskable-512.png');
await sharp(Buffer.from(leaf(0, 90))).resize(180, 180).png().toFile('static/icons/apple-touch-icon.png');

console.log('icons written to static/icons/');
