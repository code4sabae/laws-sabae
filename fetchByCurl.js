const fetchByCurl = async (url) => {
  const p = Deno.run({ cmd: ["curl", url], stdout: "piped" });
  const html = new TextDecoder().decode(await p.output(), "utf-8");
  return html;
}

export { fetchByCurl };
