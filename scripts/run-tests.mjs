import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

if (process.platform !== "win32") {
  process.env.TMPDIR = "/tmp";
  process.env.TEMP = "/tmp";
  process.env.TMP = "/tmp";
}

const vitestPath = new URL("../node_modules/vitest/vitest.mjs", import.meta.url);
const result = spawnSync(process.execPath, [fileURLToPath(vitestPath), "run"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
