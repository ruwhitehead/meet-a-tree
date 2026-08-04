import { base } from '$app/paths';
import type { Species } from './content/types';
import { EVENTS, type MyTree } from './trees.svelte';
import { grove } from './grove.svelte';
import { SPECIES } from './content/species';

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
		`A free pocket field guide to ${SPECIES.length} British and Irish trees — folklore, science and how to spot them.`,
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

/** A tree's own year: the dates it did things, on one card. This is the artefact
 *  that only exists because someone followed one tree for months. */
export async function shareTreeYear(tree: MyTree, sp: Species) {
	const link = absolute('/');
	const byYear = new Map<string, string[]>();
	for (const o of [...tree.observations].sort((a, b) => a.date.localeCompare(b.date))) {
		const label = EVENTS.find((e) => e.id === o.event)?.label ?? o.event;
		const when = new Date(o.date + 'T12:00:00').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short'
		});
		const y = o.date.slice(0, 4);
		if (!byYear.has(y)) byYear.set(y, []);
		byYear.get(y)!.push(`${when} — ${label}`);
	}
	const lines = [...byYear.entries()].flatMap(([y, rows]) => [`${y}`, ...rows.slice(0, 6)]);
	const c = await drawList(tree.name, `${sp.name} · ${sp.latin}`, lines.slice(0, 12), link);
	present(
		c,
		`${tree.name} · Meet a Tree`,
		`I've been following one ${sp.name.toLowerCase()} through the year — here's what it did.`,
		link
	);
}

/** Card variant that lists dated events rather than one headline. */
async function drawList(head: string, sub: string, lines: string[], link: string) {
	await Promise.all([
		document.fonts.load('64px "Libre Caslon Text"'),
		document.fonts.load('700 30px "Inter Tight"'),
		document.fonts.load('400 30px "Inter Tight"')
	]).catch(() => {});
	const c = document.createElement('canvas');
	c.width = 1080;
	c.height = 1080;
	const ctx = c.getContext('2d')!;
	ctx.fillStyle = '#FBFAF7';
	ctx.fillRect(0, 0, 1080, 1080);

	const g = ctx.createLinearGradient(820, 0, 1080, 260);
	g.addColorStop(0, '#4FA372');
	g.addColorStop(1, '#167E3C');
	ctx.save();
	ctx.translate(950, 130);
	ctx.rotate(-0.26);
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.moveTo(-110, -110);
	ctx.quadraticCurveTo(110, -110, 110, 110);
	ctx.quadraticCurveTo(-110, 110, -110, -110);
	ctx.closePath();
	ctx.fill();
	ctx.restore();

	ctx.fillStyle = '#0E5C2B';
	ctx.font = '700 28px "Inter Tight", Arial';
	ctx.fillText('A YEAR WITH ONE TREE', 80, 150);

	ctx.fillStyle = '#1E1E1E';
	ctx.font = '64px "Libre Caslon Text", Georgia, serif';
	wrapText(ctx, head, 80, 240, 700, 76);

	ctx.fillStyle = '#5E684F';
	ctx.font = 'italic 30px "Libre Caslon Text", Georgia, serif';
	ctx.fillText(sub, 80, 320);

	let y = 400;
	for (const line of lines) {
		const isYear = /^\d{4}$/.test(line);
		ctx.font = isYear ? '700 30px "Inter Tight", Arial' : '400 30px "Inter Tight", Arial';
		ctx.fillStyle = isYear ? '#0E5C2B' : '#1E1E1E';
		if (isYear) y += 14;
		ctx.fillText(line, isYear ? 80 : 104, y);
		y += 46;
		if (y > 880) break;
	}

	ctx.fillStyle = '#1E1E1E';
	ctx.font = '700 30px "Inter Tight", Arial';
	ctx.fillText('Meet a Tree', 80, 972);
	ctx.fillStyle = '#5E684F';
	ctx.font = '400 24px "Inter Tight", Arial';
	ctx.fillText('in support of the International Tree Foundation · ' + link.replace(/^https?:\/\//, ''), 80, 1006);
	return c;
}

/** A finished seasonal board. Shareable mid-game too — a part-filled board is
 *  an invitation, which is the whole point of the missions. */
export async function shareMission(title: string, found: number, target: number) {
	const link = absolute('/missions/');
	const done = found >= target;
	const c = await drawCard(
		done ? `${title}: finished.` : `${title}: ${found} of ${target}.`,
		done
			? `${found} species found this season. Your turn — how many can you name?`
			: `${target - found} to go before the season closes. Care to join in?`,
		'Seasonal hunt',
		link
	);
	present(
		c,
		`${title} · Meet a Tree`,
		done
			? `I finished ${title} — ${found} species this season. Free field guide to British trees:`
			: `I'm ${found} of ${target} through ${title}. Free field guide to British trees:`,
		link
	);
}
