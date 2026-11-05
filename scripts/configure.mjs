import { existsSync, readFileSync, writeFileSync } from "node:fs";
if (existsSync(".env.local")) {
  console.log(
    "Existing .env.local preserved. Check cryohub-eb898 and VITE_USE_EMULATORS=false.",
  );
} else {
  writeFileSync(".env.local", readFileSync(".env.example", "utf8"), {
    flag: "wx",
    mode: 0o600,
  });
  console.log("Created .env.local for cryohub-eb898. Run npm run build next.");
}
