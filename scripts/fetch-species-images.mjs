// Fetches one habit (whole tree) photo and one leaf close-up per species from
// Wikimedia Commons, resizes to webp, and writes licence credits for display.
// Run: node scripts/fetch-species-images.mjs
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const UA = 'MeetATree/0.1 (https://github.com/ruwhitehead/meet-a-tree; tree companion PWA)';

// Habit photos come from the Wikipedia taxobox lead image (curated). Leaf
// close-ups come from a Commons search unless pinned to an exact File: title.
const SPECIES = [
	{ id: 'oak', latin: 'Quercus robur' },
	{ id: 'birch', latin: 'Betula pendula' },
	{ id: 'rowan', latin: 'Sorbus aucuparia' },
	{ id: 'beech', latin: 'Fagus sylvatica' },
	{ id: 'ash', latin: 'Fraxinus excelsior' },
	{ id: 'holly', latin: 'Ilex aquifolium' },
	{ id: 'yew', latin: 'Taxus baccata' },
	{ id: 'pine', latin: 'Pinus sylvestris' },
	{ id: 'hawthorn', latin: 'Crataegus monogyna' },
	{ id: 'chestnut', latin: 'Aesculus hippocastanum' },
	{ id: 'sycamore', latin: 'Acer pseudoplatanus' },
	{ id: 'elder', latin: 'Sambucus nigra' }
].map((s) => ({
	...s,
	leaf: [`${s.latin} leaves`, `${s.latin} leaf`, `${s.latin} foliage`, `${s.latin} needles`],
	tree: [`${s.latin} tree`, `${s.latin} habit`, `${s.latin}`]
}));

async function wikipediaLead(latin) {
	for (const lang of ['en', 'de']) {
		const url =
			`https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1` +
			`&titles=${encodeURIComponent(latin)}&prop=pageimages&piprop=name`;
		const res = await fetch(url, { headers: { 'User-Agent': UA } });
		const data = await res.json();
		const page = Object.values(data?.query?.pages ?? {})[0];
		const name = page?.pageimage;
		if (!name || /\.svg$/i.test(name) || BAD.test(name.toLowerCase())) continue;
		const info = await commonsFile(`File:${name}`);
		if (info) return info;
	}
	return null;
}

async function commonsFile(title) {
	const url =
		'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
		`&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1000`;
	const res = await fetch(url, { headers: { 'User-Agent': UA } });
	const data = await res.json();
	const p = Object.values(data?.query?.pages ?? {})[0];
	const ii = p?.imageinfo?.[0];
	if (!ii || !/image\/(jpeg|png)/.test(ii.mime)) return null;
	return {
		thumb: ii.thumburl ?? ii.url,
		page: ii.descriptionurl,
		artist: (ii.extmetadata?.Artist?.value ?? 'Unknown').replace(/<[^>]+>/g, '').trim().slice(0, 60),
		license: ii.extmetadata?.LicenseShortName?.value ?? 'see source',
		file: p.title
	};
}

// Curated by eye from candidate contact sheets (scripts/candidates.mjs).
const TREE_PINS = {
 "oak": "File:Efremov - 2026 - Quercus robur in City Grove.jpg",
 "birch": "File:Efremov - 2025 - Betula pendula at Kurgan.jpg",
 "rowan": "File:Sorbus aucuparia on Red Square - Efremov, Russia.jpg",
 "beech": "File:Fagus sylvatica JPG2a.jpg",
 "ash": "File:Fraxinus excelsior - leaves.jpg",
 "holly": "File:Ilex aquifolium in the Odessa city garden.jpg",
 "yew": "File:Taxus baccata (If commun) - 20150731 08h56 (10473).jpg",
 "pine": "File:Vliegden (Pinus sylvestris) spiegelt zich in een heide ven. Locatie, natuurgebied Delleboersterheide – Catspoele 01.jpg",
 "hawthorn": "File:Crataegus monogyna - geograph.org.uk - 472881.jpg",
 "chestnut": "File:Aesculus hippocastanum Seckau 20151024.JPG",
 "sycamore": "File:2018-06-07 Sycamore Gap Tree (Acer pseudoplatanus), next to Hadrian’s Wall UK.jpg",
 "elder": "File:Sambucus nigra.Inflorescence.jpg"
};
const LEAF_PINS = {
 "oak": "File:Quercus robur 179727189.jpg",
 "birch": "File:Betula pendula leaves TK 2021-05-15 1.jpg",
 "rowan": "File:Sorbus aucuparia kz14.jpg",
 "beech": "File:Fagus sylvatica leaves bottom.jpg",
 "ash": "File:Fraxinus excelsior Leaves 12October2009 RioFresnedas ValledeAlcudia.jpg",
 "holly": "File:Ilex aquifolium 145607515.jpg",
 "yew": "File:Taxus baccata in botanical garden of UKW Bydgoszcz (6).jpg",
 "pine": "File:Pinus sylvestris - UK 1.jpg",
 "hawthorn": "File:(ms) Crataegus monogyna 2.jpg",
 "chestnut": "File:Horse Chestnut (Aesculus hippocastanum) leaf, Halligarth - geograph.org.uk - 1884676.jpg",
 "sycamore": "File:Sycamore (Acer pseudoplatanus) leaves, Halligarth - geograph.org.uk - 1884638.jpg",
 "elder": "File:Sambucus nigra leaves in Muttental.jpg"
};

const BAD =
	/herbarium|map|distribution|range|illustration|drawing|plate|cyclopedia|engraving|botanical art|damage|miner|disease|dieback|pest|logo|sign|stamp|coin|cross-section|log |timber|furniture|bonsai|cultivar|asplenifolia|fastigiata|purpurea|weeping/;

/** Search Commons, requiring the Latin binomial in the file title so the hit is
 *  definitely the right species. Tries each query in turn. */
async function commonsSearch(terms, latin) {
	const genus = latin.split(' ')[0].toLowerCase();
	const epithet = latin.split(' ')[1]?.toLowerCase() ?? '';
	for (const term of [].concat(terms)) {
		const url =
			'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
			`&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=20` +
			'&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1000';
		const res = await fetch(url, { headers: { 'User-Agent': UA } });
		const data = await res.json();
		const pages = Object.values(data?.query?.pages ?? {}).sort((a, b) => a.index - b.index);
		for (const p of pages) {
			const ii = p.imageinfo?.[0];
			if (!ii || !/image\/(jpeg|png)/.test(ii.mime)) continue;
			const title = (p.title || '').toLowerCase();
			if (BAD.test(title)) continue;
			// must name the species, so we never ship a stock "green leaves" shot
			if (!(title.includes(genus) && title.includes(epithet))) continue;
			return {
				thumb: ii.thumburl ?? ii.url,
				page: ii.descriptionurl,
				artist: (ii.extmetadata?.Artist?.value ?? 'Unknown').replace(/<[^>]+>/g, '').trim().slice(0, 60),
				license: ii.extmetadata?.LicenseShortName?.value ?? 'see source',
				file: p.title
			};
		}
	}
	return null;
}

async function grab(hit, terms, latin, out, thumbOut) {
	if (!hit) hit = await commonsSearch(terms, latin);
	if (!hit) throw new Error(`no result for: ${latin}`);
	const res = await fetch(hit.thumb, { headers: { 'User-Agent': UA } });
	const buf = Buffer.from(await res.arrayBuffer());
	await sharp(buf).resize(900, 675, { fit: 'cover', position: 'attention' }).webp({ quality: 72 }).toFile(out);
	if (thumbOut)
		await sharp(buf).resize(240, 240, { fit: 'cover', position: 'attention' }).webp({ quality: 70 }).toFile(thumbOut);
	return hit;
}

mkdirSync('static/images/species', { recursive: true });
const credits = {};
for (const sp of SPECIES) {
	try {
		const treeHit = TREE_PINS[sp.id] ? await commonsFile(TREE_PINS[sp.id]) : await wikipediaLead(sp.latin);
		const leafHit = LEAF_PINS[sp.id] ? await commonsFile(LEAF_PINS[sp.id]) : null;
		const t = await grab(
			treeHit,
			sp.tree,
			sp.latin,
			`static/images/species/${sp.id}-tree.webp`,
			`static/images/species/${sp.id}-thumb.webp`
		);
		const l = await grab(leafHit, sp.leaf, sp.latin, `static/images/species/${sp.id}-leaf.webp`);
		credits[sp.id] = {
			tree: { artist: t.artist, license: t.license, page: t.page, file: t.file },
			leaf: { artist: l.artist, license: l.license, page: l.page, file: l.file }
		};
		console.log(`ok ${sp.id}: tree=${t.file} | leaf=${l.file}`);
	} catch (e) {
		console.error(`FAIL ${sp.id}: ${e.message}`);
	}
}
writeFileSync('src/lib/content/credits.json', JSON.stringify(credits, null, '\t'));
console.log('credits written');
