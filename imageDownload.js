import cheerio from "https://dev.jspm.io/cheerio@0.22.0";
import { fetchByCurlBin } from "./fetchByCurlBin.js";
import { sleep } from "https://code4sabae.github.io/js/sleep.js";

const baseurl2 = "https://www1.g-reiki.net/city.sabae/reiki_honbun/";

Deno.mkdirSync("html/reiki-honbun/word", { recursive: true });

const list = Deno.readDirSync("html/reiki-honbun");
for (const l of list) {
  if (l.isDirectory) {
    continue;
  }
  console.log(l.name);
  const html = Deno.readTextFileSync("html/reiki-honbun/" + l.name);
  const dom = cheerio.load(html);
  const body = [];
  dom("img").each((idx, ele) => {
    const img = dom(ele);
    const path = img.attr("src");
    if (!path.startsWith("word/")) {
      Deno.exit(1);
    }
    console.log(img.text(), path);
    body.push(path);
  });
  
  for (const c of body) {
    const url = baseurl2 + c;
    console.log(url);
    const bin = await fetchByCurlBin(url);
    console.log(bin.length);
    const path = "html/reiki-honbun/word" + c.substring(c.lastIndexOf("/"));
    console.log(path);
    Deno.writeFileSync(path, bin);
    await sleep(100);
  }
}
