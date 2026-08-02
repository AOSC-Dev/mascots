import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const desktop = resolve(dirname(fileURLToPath(import.meta.url)), "..", "desktop");
const binDir = join(desktop, "bin");

const hasBinary =
  existsSync(binDir) && readdirSync(binDir).some((f) => f.startsWith("neutralino-"));

if (!hasBinary) {
  console.log("Missing Neutralino binaries, running neu update...");
  execSync("neu update", { cwd: desktop, stdio: "inherit" });
}
