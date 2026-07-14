import { execFileSync } from "node:child_process";

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
const forbidden = [
  /\b(?:Rosie|Klaus|Bird|Asahi|Rook)\b/i,
  /\/Users\//,
  /\/root\/new-house/,
  /(?:api[_-]?key|token|cookie|password)\s*[:=]\s*["']?[^\s"']+/i,
  /orange-rhouse\.com/i,
  /\b(?:\d{1,3}\.){3}\d{1,3}\b/,
];
const allowed = new Set(["缘起性空，性空缘起，一切皆是因果。"]);
const failures = [];
for (const file of tracked) {
  if (file === "scripts/scan-private.mjs" || file === "LICENSE") continue;
  const text = execFileSync("git", ["show", `:${file}`], { encoding: "utf8" });
  const sanitized = [...allowed].reduce((value, phrase) => value.replaceAll(phrase, ""), text);
  for (const pattern of forbidden) if (pattern.test(sanitized)) failures.push(`${file}: ${pattern}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Private-data scan: PASS (${tracked.length} tracked files)`);
