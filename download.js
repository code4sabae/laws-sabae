import cheerio from "https://dev.jspm.io/cheerio@0.22.0";
import { fetchByCurl } from "./fetchByCurl.js";
import { sleep } from "https://code4sabae.github.io/js/sleep.js";

const baseurl = "https://www1.g-reiki.net/city.sabae/reiki_taikei/";

const list = await Deno.readDir("html/list");
for await (const l of list) {
  console.log(l.name);
  const html = await Deno.readTextFile("html/list/" + l.name);
  const dom = cheerio.load(html);
  const body = [];
  dom("table a").each((idx, ele) => {
    const a = dom(ele);
    const path = a.attr("href");
    console.log(a.text(), path);
    body.push(path);
  });
  for (const c of body) {
    const url = baseurl + c;
    console.log(url);
    const html = await fetchByCurl(url);
    console.log(html);
    const path = "html/reiki-honbun" + c.substring(c.lastIndexOf("/"));
    console.log(path);
    await Deno.writeTextFile(path, html);
    await sleep(100);
  }
}
