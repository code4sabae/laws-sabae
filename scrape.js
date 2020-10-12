import { fetchByCurl } from "./fetchByCurl.js";

const url = "https://www1.g-reiki.net/city.sabae/reiki_taikei/r_taikei_01.html";
const html = await fetchByCurl(url);
await Deno.writeTextFile("html/index.html", html);
