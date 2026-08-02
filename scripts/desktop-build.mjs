import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dist = resolve("docs/.vitepress/dist");
const resources = resolve("desktop/resources");

mkdirSync(resources, { recursive: true });

for (const entry of readdirSync(resources)) {
  if (entry !== "js") {
    rmSync(join(resources, entry), { recursive: true, force: true });
  }
}

cpSync(dist, resources, { recursive: true });
cpSync(resolve("logo.png"), join(resources, "logo.png"));

const jsDir = join(resources, "js");
const clientLib = join(jsDir, "neutralino.js");
if (!existsSync(clientLib)) {
  mkdirSync(jsDir, { recursive: true });
  cpSync(resolve("desktop/vendor/neutralino.js"), clientLib);
}

const clientTag = '<script src="/js/neutralino.js"></script>\n<script>window.Neutralino?.init()</script>';

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith(".html")) {
      let html = readFileSync(full, "utf8");
      if (!html.includes(clientTag)) {
        html = html.replace("</head>", `${clientTag}\n</head>`);
        writeFileSync(full, html);
      }
    }
  }
}

walk(resources);
