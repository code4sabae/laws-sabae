import cheerio from "https://dev.jspm.io/cheerio@0.22.0";
import { fetchByCurl } from "./fetchByCurl.js";

const html = await Deno.readTextFile("html/index.html");

const baseurl = "https://www1.g-reiki.net/city.sabae/reiki_taikei/";

const dom = cheerio.load(html);
dom("#navigation a").each(async (idx, ele) => {
  const a = dom(ele);
  const path = a.attr("href");
  console.log(a.text(), path);
  const url = baseurl + path;
  const html = await fetchByCurl(url);
  await Deno.writeTextFile("html/list/" + path, html);
});
