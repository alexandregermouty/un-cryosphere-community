// Writes .env.production.local for a CI build (GitHub Actions).
// Starts from the committed .env.example (public Firebase web configuration of
// cryohub-eb898) and overrides each value with a non-empty environment variable
// of the same name, e.g. a GitHub repository variable passed by the workflow.
// Emulators are always switched off for production builds.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const keys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
  "VITE_GOOGLE_ADMIN_CLIENT_ID",
];

const values = {};
if (existsSync(".env.example")) {
  for (const line of readFileSync(".env.example", "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m) values[m[1]] = m[2];
  }
}
for (const key of keys) {
  const v = (process.env[key] || "").trim();
  if (v) values[key] = v;
}
values.VITE_USE_EMULATORS = "false";

const missing = keys.slice(0, 4).filter((k) => !values[k]);
if (missing.length) {
  console.error(`Missing Firebase configuration: ${missing.join(", ")}`);
  process.exit(1);
}

writeFileSync(
  ".env.production.local",
  Object.entries(values).map(([k, v]) => `${k}=${v}`).join("\n") + "\n",
);
console.log(`Firebase project: ${values.VITE_FIREBASE_PROJECT_ID}`);
