import { base } from '$app/paths';
import type { Species } from './content/types';
import { grove } from './grove.svelte';

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

function wrapText(
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	maxW: number,
	lh: number
): number {
	const words = text.split(' ');
	let line = '';
	for (const w of words) {
		const test = line ? `${line} ${w}` : w;
		if (ctx.measureText(test).width > maxW && line) {
			ctx.fillText(line, x, y);
			line = w;
			y += lh;
		} else line = test;
	}
	ctx.fillText(line, x, y);
	return y;
}

/** Absolute https URL for a path — what people can actually tap in a message. */
function absolute(path: string): string {
	return new URL(`${base}${path}`, location.origin).href;
}

async function drawCard(head: string, sub: string, eyebrow: string, link: string) {
	await Promise.all([
		document.fonts.load('84px "Libre Caslon Text"'),
		document.fonts.load('italic 40px "Libre Caslon Text"'),
		document.fonts.load('700 34px "Inter Tight"')
	]).catch(() => {});
	const c = document.createElement('canvas');
	c.width = 1080;
	c.height = 1080;
	const ctx = c.getContext('2d')!;
	ctx.fillStyle = '#FBFAF7';
	ctx.fillRect(0, 0, 1080, 1080);

	const g = ctx.createLinearGradient(780, 0, 1080, 300);
	g.addColorStop(0, '#4FA372');
	g.addColorStop(1, '#167E3C');
	ctx.save();
	ctx.translate(930, 150);
	ctx.rotate(-0.26);
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.moveTo(-150, -150);
	ctx.quadraticCurveTo(150, -150, 150, 150);
	ctx.quadraticCurveTo(-150, 150, -150, -150);
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = 'rgba(255,255,255,.5)';
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.moveTo(-110, -110);
	ctx.lineTo(110, 110);
	ctx.stroke();
	ctx.restore();

	ctx.fillStyle = '#0E5C2B';
	ctx.font = '700 30px "Inter Tight", Arial';
	ctx.fillText(eyebrow.toUpperCase(), 80, 200);

	ctx.fillStyle = '#1E1E1E';
	ctx.font = '84px "Libre Caslon Text", Georgia, serif';
	const yEnd = wrapText(ctx, head, 80, 320, 700, 100);

	ctx.fillStyle = '#5E684F';
	ctx.font = 'italic 40px "Libre Caslon Text", Georgia, serif';
	wrapText(ctx, sub, 80, yEnd + 90, 820, 54);

	ctx.fillStyle = '#1E1E1E';
	ctx.font = '700 34px "Inter Tight", Arial';
	ctx.fillText('Meet a Tree', 80, 944);
	ctx.fillStyle = '#5E684F';
	ctx.font = '400 26px "Inter Tight", Arial';
	ctx.fillText('in support of the International Tree Foundation', 80, 984);
	ctx.fillText('registered charity no. 1106269', 80, 1018);

	// the real link, printed on the card so it survives being screenshotted
	const label = link.replace(/^https?:\/\//, '');
	ctx.font = '700 24px "Inter Tight", Arial';
	const w = Math.min(420, ctx.measureText(label).width + 36);
	ctx.fillStyle = '#E9F2EA';
	roundRect(ctx, 1000 - w, 932, w, 60, 16);
	ctx.fill();
	ctx.strokeStyle = '#CBE0D2';
	ctx.lineWidth = 2;
	roundRect(ctx, 1000 - w, 932, w, 60, 16);
	ctx.stroke();
	ctx.fillStyle = '#0E5C2B';
	ctx.fillText(label, 1000 - w + 18, 970);
	return c;
}

/** Native share sheet where possible; otherwise a modal with a real link,
 *  a copy button and an image download. Never surfaces a blob: URL as "the
 *  link" — a blob URL only exists inside this page and cannot be opened by
 *  anyone else. */
function present(canvas: HTMLCanvasElement, title: string, text: string, url: string) {
	canvas.toBlob(async (blob) => {
		if (!blob) return;
		const file = new File([blob], 'meet-a-tree.png', { type: 'image/png' });
		if (navigator.share) {
			try {
				if (navigator.canShare?.({ files: [file] })) {
					await navigator.share({ files: [file], title, text, url });
				} else {
					await navigator.share({ title, text, url });
				}
				return;
			} catch (err) {
				if ((err as DOMException)?.name === 'AbortError') return; // user cancelled
			}
		}
		grove.sharePreview = {
			url: URL.createObjectURL(blob),
			filename: 'meet-a-tree.png',
			link: url,
			text
		};
	}, 'image/png');
}

export async function shareSpecies(sp: Species) {
	const n = grove.speciesCount;
	const article = /^[AEIOU]/.test(sp.name) ? 'an' : 'a';
	const link = absolute(`/species/${sp.id}/`);
	const c = await drawCard(
		`I just met ${article} ${sp.name.toLowerCase()}.`,
		sp.latin + (n ? ` · one of ${n} species in my grove` : ''),
		'A find worth sharing',
		link
	);
	present(
		c,
		`${sp.name} · Meet a Tree`,
		`I just met ${article} ${sp.name.toLowerCase()} (${sp.latin}). ${sp.tell}`,
		link
	);
}

/** Generic "tell someone about this app" share, used by the top-bar button. */
export async function shareApp() {
	const n = grove.speciesCount;
	const link = absolute('/');
	const c = await drawCard(
		'Can you name the trees on your street?',
		'A free pocket field guide to 40 British and Irish trees — folklore, science and how to spot them.',
		'Meet a Tree',
		link
	);
	present(
		c,
		'Meet a Tree',
		n
			? `I can name ${n} ${n === 1 ? 'tree' : 'trees'} now, thanks to this free field guide to British trees.`
			: 'A free pocket field guide to British and Irish trees — how to spot them, their folklore and their science.',
		link
	);
}

export async function shareGrove() {
	const n = grove.speciesCount;
	const link = absolute('/');
	const c = await drawCard(
		`My grove holds ${n} ${n === 1 ? 'species' : 'species'}.`,
		`Together they absorb ~${grove.co2} kg of CO₂ a year — how many trees can you name?`,
		'My grove so far',
		link
	);
	present(
		c,
		'My grove · Meet a Tree',
		`I can name ${n} ${n === 1 ? 'tree' : 'trees'} now. How many can you? Meet a Tree is a free field guide to British trees.`,
		link
	);
}
