import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/url.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import { c as ensure_array_like, a as attr, s as stringify, e as escape_html, d as attr_class } from "../../chunks/root.js";
import "../../chunks/exports.js";
import "../../chunks/state.svelte.js";
import { p as page } from "../../chunks/index2.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/species.js";
import { g as grove } from "../../chunks/grove.svelte.js";
function icon($$renderer, name) {
  if (name === "sun") {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"></path></svg>`);
  } else if (name === "pin") {
    $$renderer.push("<!--[1-->");
    $$renderer.push(`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>`);
  } else if (name === "leaf") {
    $$renderer.push("<!--[2-->");
    $$renderer.push(`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 21c0-9 3-15 12-17-1 9-4 14-12 17z"></path><path d="M6 21c2-5 5-9 9-12"></path></svg>`);
  } else if (name === "camera") {
    $$renderer.push("<!--[3-->");
    $$renderer.push(`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"></path><circle cx="12" cy="13" r="3.4"></circle></svg>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 5c-2-1.5-5-2-8-1.5v14C7 17 10 17.5 12 19c2-1.5 5-2 8-1.5v-14C17 3 14 3.5 12 5z"></path><path d="M12 5v14"></path></svg>`);
  }
  $$renderer.push(`<!--]-->`);
}
function Nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const items = [
      { href: "/", label: "Today", icon: "sun" },
      { href: "/near", label: "Near You", icon: "pin" }
    ];
    const items2 = [
      { href: "/grove", label: "My Grove", icon: "leaf" },
      { href: "/learn", label: "Learn", icon: "book" }
    ];
    const railItems = [
      ...items,
      { href: "/identify", label: "Identify", icon: "camera" },
      ...items2
    ];
    const isActive = (href) => href === "/" ? page.url.pathname === `${base}/` || page.url.pathname === base : page.url.pathname.startsWith(base + href);
    $$renderer2.push(`<nav class="tabbar svelte-1h32yp1" aria-label="Main"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a class="nav-btn svelte-1h32yp1"${attr("href", `${stringify(base)}${stringify(item.href)}`)}${attr("aria-current", isActive(item.href) ? "page" : void 0)} data-sveltekit-replacestate="">`);
      icon($$renderer2, item.icon);
      $$renderer2.push(`<!---->${escape_html(item.label)}</a>`);
    }
    $$renderer2.push(`<!--]--> <div class="fabwrap svelte-1h32yp1"><a class="fab svelte-1h32yp1"${attr("href", `${stringify(base)}/identify`)} aria-label="Identify a tree"${attr("aria-current", isActive("/identify") ? "page" : void 0)} data-sveltekit-replacestate=""><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true" class="svelte-1h32yp1"><path d="M4 8h3l2-3h6l2 3h3v11H4z"></path><circle cx="12" cy="13" r="3.4"></circle></svg></a></div> <!--[-->`);
    const each_array_1 = ensure_array_like(items2);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<a class="nav-btn svelte-1h32yp1"${attr("href", `${stringify(base)}${stringify(item.href)}`)}${attr("aria-current", isActive(item.href) ? "page" : void 0)} data-sveltekit-replacestate="">`);
      icon($$renderer2, item.icon);
      $$renderer2.push(`<!---->${escape_html(item.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="rail svelte-1h32yp1"><p class="railmark svelte-1h32yp1"><span class="mark svelte-1h32yp1" aria-hidden="true"></span>Meet a Tree</p> <nav aria-label="Sections" class="svelte-1h32yp1"><!--[-->`);
    const each_array_2 = ensure_array_like(railItems);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array_2[$$index_2];
      $$renderer2.push(`<a class="rail-btn svelte-1h32yp1"${attr("href", `${stringify(base)}${stringify(item.href)}`)}${attr("aria-current", isActive(item.href) ? "page" : void 0)} data-sveltekit-replacestate="">`);
      icon($$renderer2, item.icon);
      $$renderer2.push(`<!----><span>${escape_html(item.label)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></nav> <p class="railfoot svelte-1h32yp1">Free forever, in support of the <strong class="svelte-1h32yp1">International Tree Foundation</strong> — registered
		charity no. 1106269</p></div>`);
  });
}
function TopBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="topbar svelte-yic9pk"><a class="brand svelte-yic9pk"${attr("href", `${stringify(base)}/`)}><span class="mark svelte-yic9pk" aria-hidden="true"></span> <span class="name svelte-yic9pk">Meet a Tree</span></a> <button class="sharebtn svelte-yic9pk" aria-label="Share Meet a Tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true" class="svelte-yic9pk"><circle cx="18" cy="5" r="2.6"></circle><circle cx="6" cy="12" r="2.6"></circle><circle cx="18" cy="19" r="2.6"></circle><path d="M8.3 10.7l7.4-4.3M8.3 13.3l7.4 4.3"></path></svg> <span>Share</span></button></div>`);
  });
}
function Toast($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div${attr_class("toast svelte-1cpok13", void 0, { "on": grove.toastMsg !== null })} role="status" aria-live="polite">${escape_html(grove.toastMsg ?? "")}</div>`);
  });
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open, onclose, labelledby, children } = $$props;
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="modal svelte-ta60gp" role="dialog" aria-modal="true"${attr("aria-labelledby", labelledby)}><button class="scrim svelte-ta60gp" aria-label="Close dialog"></button> <div class="mbox svelte-ta60gp">`);
      children($$renderer2);
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Overlays($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let copied = false;
    function closeMilestone() {
      grove.pendingMilestone = null;
    }
    function closeShare() {
      if (grove.sharePreview) URL.revokeObjectURL(grove.sharePreview.url);
      grove.sharePreview = null;
      copied = false;
    }
    Modal($$renderer2, {
      open: grove.pendingMilestone !== null,
      onclose: closeMilestone,
      labelledby: "milestone-title",
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 id="milestone-title">You’ve met ${escape_html(grove.pendingMilestone)} trees 🌳</h2> <p>That’s ${escape_html(grove.pendingMilestone)} species you can now greet by name. Mark the milestone by planting
		a real one?</p> <p class="itf">Your gift goes to the <strong>International Tree Foundation</strong> — community tree-planting
		since 1922. Registered charity no. 1106269.</p> <div class="actions"><a class="btn" href="https://internationaltreefoundation.org/donate/" target="_blank" rel="noopener">Plant a real tree ↗</a> <button class="btn ghost">Maybe later</button></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Modal($$renderer2, {
      open: grove.sharePreview !== null,
      onclose: closeShare,
      labelledby: "share-title",
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 id="share-title">Share this</h2> `);
        if (grove.sharePreview) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<img class="shareprev svelte-1mg1u8v" alt="Preview of your share card"${attr("src", grove.sharePreview.url)}/> <p class="msg svelte-1mg1u8v">${escape_html(grove.sharePreview.text)}</p> <p class="linkrow svelte-1mg1u8v"><a${attr("href", grove.sharePreview.link)} class="svelte-1mg1u8v">${escape_html(grove.sharePreview.link.replace(/^https?:\/\//, ""))}</a></p> <div class="actions"><button class="btn">${escape_html(copied ? "✓ Copied" : "Copy message & link")}</button> <a class="btn ghost"${attr("href", grove.sharePreview.url)}${attr("download", grove.sharePreview.filename)}>Save image</a> <button class="btn ghost">Done</button></div> <p class="hint svelte-1mg1u8v">On a phone this opens your normal share sheet. Here, copy the message or save the picture and
			post it wherever you like.</p>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!---->`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    $$renderer2.push(`<div class="frame">`);
    TopBar($$renderer2);
    $$renderer2.push(`<!----> `);
    children($$renderer2);
    $$renderer2.push(`<!----> `);
    Nav($$renderer2);
    $$renderer2.push(`<!----></div> `);
    Toast($$renderer2);
    $$renderer2.push(`<!----> `);
    Overlays($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _layout as default
};
