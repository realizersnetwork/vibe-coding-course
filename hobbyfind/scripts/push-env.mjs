import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
];

for (const k of keys) {
  if (!env[k]) {
    console.log("missing", k);
    continue;
  }
  const r = spawnSync(
    "npx.cmd",
    ["vercel", "env", "add", k, "production", "--value", env[k], "--force", "--yes", "--scope", "realizers", "--sensitive"],
    { encoding: "utf8", shell: true }
  );
  const out = `${r.stdout || ""}${r.stderr || ""}${r.error ? r.error.message : ""}`.split(env[k]).join("***");
  console.log(k, r.status, out.slice(0, 500));
}
