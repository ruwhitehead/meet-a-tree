// Fetches 4 habit + 4 leaf candidates for the given species ids and builds
// contact sheets for a by-eye curation pass.
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
const OUT = process.argv[2];
const IDS = process.argv.slice(3);
const UA = 'MeetATree/0.1 (https://github.com/ruwhitehead/meet-a-tree)';
const BAD = /herbarium|map|distribution|range|illustration|drawing|plate|cyclopedia|engraving|damage|miner|disease|dieback|pest|logo|sign|stamp|coin|cross-section|timber|furniture|bonsai|variegat|acronicta|moth|larva|caterpillar|insect|beetle|gall|fungus|seedling|microscop|scale|ruler|bud\b/i;
const LATIN = {
  'sessile-oak':'Quercus petraea','holm-oak':'Quercus ilex','downy-birch':'Betula pubescens',
  whitebeam:'Sorbus aria','wild-service':'Sorbus torminalis',hornbeam:'Carpinus betulus',
  larch:'Larix decidua',spruce:'Picea abies','douglas-fir':'Pseudotsuga menziesii',juniper:'Juniperus communis',
  blackthorn:'Prunus spinosa','wild-cherry':'Prunus avium','bird-cherry':'Prunus padus','crab-apple':'Malus sylvestris',
  'sweet-chestnut':'Castanea sativa','norway-maple':'Acer platanoides','field-maple':'Acer campestre',
  'london-plane':'Platanus x hispanica',lime:'Tilia cordata',hazel:'Corylus avellana',alder:'Alnus glutinosa',
  'wych-elm':'Ulmus glabra','goat-willow':'Salix caprea','white-willow':'Salix alba',aspen:'Populus tremula',
  'black-poplar':'Populus nigra',walnut:'Juglans regia',box:'Buxus sempervirens'
};
async function search(term, latin, kind) {
  const g = latin.split(' ')[0].toLowerCase(), e = latin.split(' ')[1].toLowerCase();
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
    `&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=40&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=900`;
  const d = await (await fetch(url, { headers: { 'User-Agent': UA } })).json();
  const out = [];
  for (const p of Object.values(d?.query?.pages ?? {}).sort((a,b)=>a.index-b.index)) {
    const ii = p.imageinfo?.[0]; if (!ii || !/image\/(jpeg|png)/.test(ii.mime)) continue;
    const t = (p.title||'').toLowerCase();
    if (BAD.test(t)) continue;
    const named = (t.includes(g) && t.includes(e)) || (kind==='tree' && /geograph/.test(t));
    if (!named) continue;
    out.push({ file: p.title, thumb: ii.thumburl ?? ii.url,
      artist: (ii.extmetadata?.Artist?.value ?? 'Unknown').replace(/<[^>]+>/g,'').trim().slice(0,60),
      license: ii.extmetadata?.LicenseShortName?.value ?? 'see source', page: ii.descriptionurl });
    if (out.length >= 6) break;
  }
  return out;
}
mkdirSync(OUT, { recursive: true });
const index = {};
for (const id of IDS) {
  const latin = LATIN[id]; if (!latin) { console.log('skip unknown', id); continue; }
  const common = id.replace(/-/g, ' ');
  for (const [kind, terms] of [
    ['tree', [`${latin} tree habit`, `geograph ${common} tree`, `${latin} tree`]],
    ['leaf', [`${latin} leaves`, `${latin} leaf`, `${latin} foliage`]]
  ]) {
    const seen = new Set(); const hits = [];
    for (const term of terms) {
      for (const h of await search(term, latin, kind)) if (!seen.has(h.file)) { seen.add(h.file); hits.push(h); }
      if (hits.length >= 4) break;
    }
    index[`${id}-${kind}`] = hits.slice(0,4);
    for (let i = 0; i < Math.min(4, hits.length); i++) {
      await new Promise(r=>setTimeout(r,280));
      try {
        const res = await fetch(hits[i].thumb, { headers: { 'User-Agent': UA, Accept: 'image/*' } });
        await sharp(Buffer.from(await res.arrayBuffer())).resize(240,180,{fit:'cover',position:'attention'}).png().toFile(`${OUT}/${id}-${kind}-${i}.png`);
      } catch {}
    }
    console.log(id, kind, hits.length);
  }
}
writeFileSync(`${OUT}/index.json`, JSON.stringify(index, null, 1));
// sheets of 4 species (8 rows) each
for (let s = 0; s * 4 < IDS.length; s++) {
  const group = IDS.slice(s*4, s*4+4); const comps = []; let row = 0;
  for (const id of group) for (const kind of ['tree','leaf']) {
    for (let i=0;i<4;i++) { try { comps.push({ input: await sharp(`${OUT}/${id}-${kind}-${i}.png`).toBuffer(), left: i*240, top: row*180 }); } catch {} }
    row++;
  }
  if (!comps.length) continue;
  await sharp({create:{width:960,height:180*row,channels:3,background:'#ffffff'}}).composite(comps).png().toFile(`${OUT}/sheet-${s}.png`);
  console.log('SHEET', s, group.join(' '));
}
