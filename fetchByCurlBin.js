const fetchByCurlBin = async (url) => {
  const p = Deno.run({ cmd: ["curl", url], stdout: "piped" });
  return await p.output();
}

export { fetchByCurlBin };
