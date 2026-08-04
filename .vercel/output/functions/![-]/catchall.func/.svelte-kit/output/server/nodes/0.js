import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CeWVG-z0.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Jz2MBA52.js","_app/immutable/chunks/INyZuRz_.js","_app/immutable/chunks/CfxMU5Mu.js","_app/immutable/chunks/ZKzvRItA.js","_app/immutable/chunks/Dqqn20Xn.js","_app/immutable/chunks/BESiE17H.js","_app/immutable/chunks/DP4ddD29.js","_app/immutable/chunks/DjXVVGqg.js","_app/immutable/chunks/Bq1etRc2.js","_app/immutable/chunks/DizwkLT-.js","_app/immutable/chunks/D2DEjgf3.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/C2EkSsbw.js"];
export const stylesheets = ["_app/immutable/assets/0.ZE1yO2QE.css"];
export const fonts = [];
