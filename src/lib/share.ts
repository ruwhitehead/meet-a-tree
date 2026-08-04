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

async function drawCard(head: string, sub: string, eyebrow: string): Promise<HTMLCanvasElement> {
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

	// leaf, top right
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
	ctx.fillText('Grove', 80, 950);
	ctx.fillStyle = '#5E684F';
	ctx.font = '400 27px "Inter Tight", Arial';
	ctx.fillText('in support of the International Tree Foundation', 80, 992);
	ctx.fillText('registered charity no. 1106269', 80, 1028);

	ctx.fillStyle = '#E9F2EA';
	roundRect(ctx, 756, 940, 244, 64, 16);
	ctx.fill();
	ctx.strokeStyle = '#CBE0D2';
	ctx.lineWidth = 2;
	roundRect(ctx, 756, 940, 244, 64, 16);
	ctx.stroke();
	ctx.fillStyle = '#0E5C2B';
	ctx.font = '700 28px "Inter Tight", Arial';
	ctx.fillText('grove app', 796, 982);
	return c;
}

function present(canvas: HTMLCanvasElement, title: string) {
	canvas.toBlob(async (blob) => {
		if (!blob) return;
		const file = new File([blob], 'grove-card.png', { type: 'image/png' });
		if (navigator.share && navigator.canShare?.({ files: [file] })) {
			try {
				await navigator.share({ files: [file], title });
				return;
			} catch {
				/* user cancelled or unsupported — fall through to preview */
			}
		}
		grove.sharePreview = { url: URL.createObjectURL(blob), filename: 'grove-card.png' };
	}, 'image/png');
}

export async function shareSpecies(sp: Species) {
	const n = grove.speciesCount;
	const article = /^[AEIOU]/.test(sp.name) ? 'an' : 'a';
	const c = await drawCard(
		`I just met ${article} ${sp.name.toLowerCase()}.`,
		sp.latin + (n ? ` · one of ${n} species in my Grove` : ''),
		'A find worth sharing'
	);
	present(c, `${sp.name} — shared from Grove`);
}

export async function shareGrove() {
	const n = grove.speciesCount;
	const c = await drawCard(
		`My Grove holds ${n} ${n === 1 ? 'species' : 'species'}.`,
		`Together they absorb ~${grove.co2} kg of CO₂ a year — how many trees can you name?`,
		'My Grove so far'
	);
	present(c, 'My Grove — shared from Grove');
}
