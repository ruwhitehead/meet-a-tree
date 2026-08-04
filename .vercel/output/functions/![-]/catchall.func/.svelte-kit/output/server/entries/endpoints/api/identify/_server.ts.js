import { json, error } from "@sveltejs/kit";
import { b as private_env } from "../../../../chunks/shared-server.js";
const prerender = false;
const KNOWN = {
  "quercus robur": "oak",
  "quercus petraea": "sessile-oak",
  "quercus ilex": "holm-oak",
  "betula pendula": "birch",
  "betula pubescens": "downy-birch",
  "sorbus aucuparia": "rowan",
  "sorbus aria": "whitebeam",
  "sorbus torminalis": "wild-service",
  "fagus sylvatica": "beech",
  "carpinus betulus": "hornbeam",
  "fraxinus excelsior": "ash",
  "ilex aquifolium": "holly",
  "taxus baccata": "yew",
  "pinus sylvestris": "pine",
  "larix decidua": "larch",
  "picea abies": "spruce",
  "pseudotsuga menziesii": "douglas-fir",
  "juniperus communis": "juniper",
  "crataegus monogyna": "hawthorn",
  "prunus spinosa": "blackthorn",
  "prunus avium": "wild-cherry",
  "prunus padus": "bird-cherry",
  "malus sylvestris": "crab-apple",
  "aesculus hippocastanum": "chestnut",
  "castanea sativa": "sweet-chestnut",
  "acer pseudoplatanus": "sycamore",
  "acer platanoides": "norway-maple",
  "acer campestre": "field-maple",
  "platanus x hispanica": "london-plane",
  "platanus hispanica": "london-plane",
  "tilia cordata": "lime",
  "sambucus nigra": "elder",
  "corylus avellana": "hazel",
  "alnus glutinosa": "alder",
  "ulmus glabra": "wych-elm",
  "salix caprea": "goat-willow",
  "salix alba": "white-willow",
  "populus tremula": "aspen",
  "populus nigra": "black-poplar",
  "juglans regia": "walnut",
  "buxus sempervirens": "box"
};
const MAX_BYTES = 6 * 1024 * 1024;
const POST = async ({ request, fetch }) => {
  const key = private_env.PLANTNET_API_KEY;
  if (!key) return json({ ok: false, reason: "not-configured" }, { status: 503 });
  const form = await request.formData();
  const image = form.get("image");
  const organ = String(form.get("organ") ?? "leaf");
  if (!(image instanceof File)) error(400, "No image supplied");
  if (image.size > MAX_BYTES) error(413, "Image too large");
  if (!/^image\//.test(image.type)) error(415, "Not an image");
  const upstream = new FormData();
  upstream.append("images", image, "leaf.jpg");
  upstream.append("organs", ["leaf", "bark", "flower", "fruit", "auto"].includes(organ) ? organ : "leaf");
  const url = `https://my-api.plantnet.org/v2/identify/k-world-flora?api-key=${encodeURIComponent(key)}&include-related-images=false&no-reject=false&nb-results=5&lang=en`;
  let res;
  try {
    res = await fetch(url, { method: "POST", body: upstream });
  } catch {
    return json({ ok: false, reason: "upstream-unreachable" }, { status: 502 });
  }
  if (res.status === 404) return json({ ok: true, matches: [] });
  if (res.status === 429) return json({ ok: false, reason: "quota" }, { status: 429 });
  if (!res.ok) return json({ ok: false, reason: "upstream-error" }, { status: 502 });
  const data = await res.json();
  const matches = (data.results ?? []).slice(0, 5).map((r) => {
    const latin = (r.species?.scientificNameWithoutAuthor ?? "").trim();
    return {
      latin,
      common: r.species?.commonNames?.[0] ?? "",
      score: Math.round((r.score ?? 0) * 100),
      id: KNOWN[latin.toLowerCase()] ?? null
    };
  });
  return json({ ok: true, matches });
};
export {
  POST,
  prerender
};
