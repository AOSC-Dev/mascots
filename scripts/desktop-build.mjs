import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const desktop = resolve("desktop");
const dist = resolve("docs/.vitepress/dist");
const resources = join(desktop, "resources");

mkdirSync(resources, { recursive: true });
for (const entry of readdirSync(resources)) {
  if (entry !== "js") rmSync(join(resources, entry), { recursive: true, force: true });
}

cpSync(dist, resources, { recursive: true });
cpSync(resolve("logo.png"), join(resources, "logo.png"));

const jsDir = join(resources, "js");
const clientLib = join(jsDir, "neutralino.js");
if (!existsSync(clientLib)) {
  mkdirSync(jsDir, { recursive: true });
  cpSync(resolve("desktop/vendor/neutralino.js"), clientLib);
}

const tag = '<script src="/js/neutralino.js"></script>\n<script>window.Neutralino?.init()</script>';
const inject = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      inject(full);
    } else if (full.endsWith(".html")) {
      let html = readFileSync(full, "utf8");
      if (!html.includes(tag)) writeFileSync(full, html.replace("</head>", `${tag}\n</head>`));
    }
  }
};
inject(resources);

const binDir = join(desktop, "bin");
if (!existsSync(binDir) || !readdirSync(binDir).some((f) => f.startsWith("neutralino-"))) {
  console.log("Missing Neutralino binaries, running neu update...");
  execSync("neu update", { cwd: desktop, stdio: "inherit" });
}
