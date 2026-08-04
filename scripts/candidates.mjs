// Fetches N candidate images per species/kind into a scratch dir and builds
// contact sheets so a human (or Claude) can pick the best, then pin them.
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const UA = 'MeetATree/0.1 (https://github.com/ruwhitehead/meet-a-tree)';
const OUT = process.argv[2] || 'C:/temp/cand';
const BAD =
	/herbarium|map|distribution|range|illustration|drawing|plate|cyclopedia|engraving|damage|miner|disease|dieback|pest|logo|sign|stamp|coin|cross-section|timber|furniture|bonsai|asplenifolia|fastigiata|purpurea|weeping|variegat|aurea|briot|nisbet|gold|seedling|sapling|bud|winter/i;

const SPECIES = [
	['oak', 'Quercus robur'],
	['birch', 'Betula pendula'],
	['rowan', 'Sorbus aucuparia'],
	['beech', 'Fagus sylvatica'],
	['ash', 'Fraxinus excelsior'],
	['holly', 'Ilex aquifolium'],
	['yew', 'Taxus baccata'],
	['pine', 'Pinus sylvestris'],
	['hawthorn', 'Crataegus monogyna'],
	['chestnut', 'Aesculus hippocastanum'],
	['sycamore', 'Acer pseudoplatanus'],
	['elder', 'Sambucus nigra']
];

async function search(term, latin, want) {
	const genus = latin.split(' ')[0].toLowerCase();
	const epithet = latin.split(' ')[1].toLowerCase();
	const url =
		'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
		`&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=40` +
		'&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=900';
	const res = await fetch(url, { headers: { 'User-Agent': UA } });
	const data = await res.json();
	const out = [];
	for (const p of Object.values(data?.query?.pages ?? {}).sort((a, b) => a.index - b.index)) {
		const ii = p.imageinfo?.[0];
		if (!ii || !/image\/(jpeg|png)/.test(ii.mime)) continue;
		const t = (p.title || '').toLowerCase();
		if (BAD.test(t)) continue;
		if (!(t.includes(genus) && t.includes(epithet))) continue;
		out.push({
			thumb: ii.thumburl ?? ii.url,
			page: ii.descriptionurl,
			artist: (ii.extmetadata?.Artist?.value ?? 'Unknown').replace(/<[^>]+>/g, '').trim().slice(0, 60),
			license: ii.extmetadata?.LicenseShortName?.value ?? 'see source',
			file: p.title
		});
		if (out.length >= want) break;
	}
	return out;
}

mkdirSync(OUT, { recursive: true });
const index = {};
for (const [id, latin] of SPECIES) {
	for (const kind of ['tree', 'leaf']) {
		const terms =
			kind === 'tree'
				? [`${latin} tree habit`, `${latin} tree`, `${latin} trunk crown`]
				: [`${latin} leaves`, `${latin} leaf`, `${latin} foliage`];
		const seen = new Set();
		const hits = [];
		for (const term of terms) {
			for (const h of await search(term, latin, 6)) {
				if (seen.has(h.file)) continue;
				seen.add(h.file);
				hits.push(h);
			}
			if (hits.length >= 4) break;
		}
		index[`${id}-${kind}`] = hits.slice(0, 4);
		for (let i = 0; i < Math.min(4, hits.length); i++) {
			try {
				const r = await fetch(hits[i].thumb, { headers: { 'User-Agent': UA } });
				const buf = Buffer.from(await r.arrayBuffer());
				await sharp(buf)
					.resize(260, 195, { fit: 'cover', position: 'attention' })
					.png()
					.toFile(`${OUT}/${id}-${kind}-${i}.png`);
			} catch (e) {
				console.warn(`  skip ${id}-${kind}-${i}: ${e.message.slice(0, 40)}`);
			}
		}
		console.log(`${id}-${kind}: ${hits.length} candidates`);
	}
}
writeFileSync(`${OUT}/index.json`, JSON.stringify(index, null, '\t'));

// contact sheets: 3 species per sheet, rows = tree candidates then leaf candidates
for (let s = 0; s < 4; s++) {
	const group = SPECIES.slice(s * 3, s * 3 + 3);
	const comps = [];
	let row = 0;
	for (const [id] of group) {
		for (const kind of ['tree', 'leaf']) {
			for (let i = 0; i < 4; i++) {
				try {
					const b = await sharp(`${OUT}/${id}-${kind}-${i}.png`).toBuffer();
					comps.push({ input: b, left: i * 260, top: row * 195 });
				} catch {}
			}
			row++;
		}
	}
	await sharp({ create: { width: 260 * 4, height: 195 * row, channels: 3, background: '#ffffff' } })
		.composite(comps)
		.png()
		.toFile(`${OUT}/sheet-${s}.png`);
	console.log(`sheet-${s}.png: ${group.map((g) => g[0]).join(', ')} (tree row then leaf row each)`);
}
