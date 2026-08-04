// Generates PWA icons from an inline SVG tree mark (ITF green #167E3C).
//
// The mark is a broad-crowned British broadleaf, oak proportions: a crown wider
// than it is tall, swept up underneath, on a short flared trunk. It is built
// from overlapping circles rather than a hand-drawn outline so the silhouette
// stays smooth at every size, and the two green circles bite the underside of
// the crown so the trunk reads as a trunk and not a stem. The mark has to
// survive 16px in a browser tab, so it carries no interior detail.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const GREEN = '#167E3C';
const PAPER = '#FBFAF7';

const circles = (list, fill) =>
	`<g fill="${fill}">${list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;

const trunk = (top, bot, half, flare) => `
	<path d="M${256 - half} ${top}
		C${256 - half} ${bot - 90} ${256 - half - flare * 0.2} ${bot - 52} ${256 - half - flare} ${bot}
		L${256 + half + flare} ${bot}
		C${256 + half + flare * 0.2} ${bot - 52} ${256 + half} ${bot - 90} ${256 + half} ${top} Z"
		fill="${PAPER}"/>`;

/** `k` scales the mark about the tile centre, `dy` nudges it to sit optically centred. */
const tree = (dy, k) => `
	<g transform="translate(256 ${256 + dy}) scale(${k}) translate(-256 -256)">
		${circles(
			[
				[256, 206, 108],
				[140, 240, 82],
				[372, 236, 86],
				[198, 138, 64],
				[316, 142, 62],
				[256, 152, 66]
			],
			PAPER
		)}
		${circles(
			[
				[146, 352, 84],
				[362, 348, 86]
			],
			GREEN
		)}
		${trunk(258, 424, 25, 26)}
	</g>`;

const icon = (dy, k, r) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<rect width="512" height="512" rx="${r}" fill="${GREEN}"/>
	${tree(dy, k)}
</svg>`;

mkdirSync('static/icons', { recursive: true });

const rounded = Buffer.from(icon(-18, 0.94, 96));
await sharp(rounded).resize(192, 192).png().toFile('static/icons/icon-192.png');
await sharp(rounded).resize(512, 512).png().toFile('static/icons/icon-512.png');
// maskable: square canvas, the same mark pulled inside the 80% safe circle
// the launcher may crop to
await sharp(Buffer.from(icon(-6, 0.86, 0)))
	.resize(512, 512)
	.png()
	.toFile('static/icons/maskable-512.png');
// apple-touch: square as well. iOS applies its own mask, and corners we round
// out ourselves are transparent underneath it, which composites against black.
await sharp(Buffer.from(icon(-18, 0.94, 0)))
	.resize(180, 180)
	.png()
	.toFile('static/icons/apple-touch-icon.png');

console.log('icons written to static/icons/');
