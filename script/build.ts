import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile } from "fs/promises";
import path from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

function getEnvVar(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

async function processHtmlTemplate() {
  console.log("processing HTML template...");

  const htmlPath = path.join(process.cwd(), "client", "index.html");
  let html = await readFile(htmlPath, "utf-8");

  // Replace template variables with environment values
  const replacements = {
    "%VITE_APP_TITLE%": getEnvVar("VITE_APP_TITLE", "MedAlpha Connect"),
    "%VITE_APP_DESCRIPTION%": getEnvVar("VITE_APP_DESCRIPTION", "Your healthcare companion"),
    "%VITE_APP_OG_IMAGE%": getEnvVar("VITE_APP_OG_IMAGE", "/og-image.png"),
    "%VITE_FAVICON_PATH%": getEnvVar("VITE_FAVICON_PATH", "/favicon.png"),
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    html = html.replaceAll(placeholder, value);
  }

  await writeFile(htmlPath, html, "utf-8");
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await processHtmlTemplate();
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
