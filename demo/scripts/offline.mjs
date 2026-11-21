import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = "dist";
let html = await readFile(join(output, "index.html"), "utf8");
const scriptTag = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/);
const styleTag = html.match(
  /<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
);
if (!scriptTag || !styleTag)
  throw new Error("Expected one bundled script and stylesheet");

const js = await readFile(join(output, scriptTag[1]), "utf8");
const css = await readFile(join(output, styleTag[1]), "utf8");
html = html.replace(
  scriptTag[0],
  () =>
    '<script type="module">' +
    js.replaceAll("</script", "<\\/script") +
    "</script>",
);
html = html.replace(styleTag[0], () => "<style>" + css + "</style>");
await writeFile(join(output, "ClosetIQ.html"), html);
