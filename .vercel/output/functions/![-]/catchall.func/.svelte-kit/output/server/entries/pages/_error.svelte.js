import { h as head, e as escape_html, a as attr, s as stringify } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { p as page } from "../../chunks/index2.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1j96wlh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Lost among the trees · Meet a Tree</title>`);
      });
    });
    $$renderer2.push(`<main class="view" style="justify-content:center; text-align:center"><h1 style="font-family:var(--display); font-weight:400; font-size:28px; margin:0">Lost among the trees</h1> <p class="sub">${escape_html(page.status === 404 ? "That page isn’t in the guide." : "Something went wrong.")}</p> <a class="btn" style="align-self:center"${attr("href", `${stringify(base)}/`)}>Back to Today</a></main>`);
  });
}
export {
  _error as default
};
