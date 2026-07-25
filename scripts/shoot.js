/* Headless screenshot rig for the polish loop. Run with:
   node scripts/shoot.js  (needs the prod server on :3930) */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "raw-assets", "shots");
const BASE = "http://localhost:3930";

const PAGES = [
  "residences",
  "residences/greymon-335",
  "residences/greymon-317",
  "residences/linda-flora-2179",
  "residences/washington-3609",
  "practice",
  "contact",
];

async function main() {
  if ((process.argv[2] || "all") === "all") fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "C:/Users/Lucky/.cache/puppeteer/chrome/win64-150.0.7871.24/chrome-win64/chrome.exe",
    args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"],
  });

  async function shoot(viewport, tag) {
    const page = await browser.newPage();
    await page.setViewport(viewport);

    // home — let the reveal finish, then walk the sections
    await page.goto(BASE + "/", { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 3200));
    const marks = await page.evaluate(() => ({
      total: document.body.scrollHeight,
      vh: window.innerHeight,
    }));
    // uniform walk — pinned sections get sampled mid-flight too
    const stops = [];
    for (let y = 0; y <= marks.total - marks.vh; y += Math.round(marks.vh * 0.85)) stops.push(y);
    const seen = new Set();
    let idx = 0;
    for (const y of stops) {
      if (y == null) continue;
      const yy = Math.max(0, Math.min(y, marks.total - marks.vh));
      const key = Math.round(yy / 120);
      if (seen.has(key)) continue;
      seen.add(key);
      await page.evaluate((t) => window.scrollTo({ top: t, behavior: "instant" }), yy);
      await new Promise((r) => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(OUT, `${tag}-home-${String(idx).padStart(2, "0")}.png`) });
      idx++;
    }

    for (const p of PAGES) {
      const slug = p.replace(/\//g, "_");
      await page.goto(`${BASE}/${p}`, { waitUntil: "networkidle2", timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1400));
      await page.screenshot({ path: path.join(OUT, `${tag}-${slug}-top.png`) });
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.45, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 1100));
      await page.screenshot({ path: path.join(OUT, `${tag}-${slug}-mid.png`) });
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
      await new Promise((r) => setTimeout(r, 1100));
      await page.screenshot({ path: path.join(OUT, `${tag}-${slug}-end.png`) });
    }
    await page.close();
  }

  const which = process.argv[2] || "all";
  if (which === "all" || which === "d") await shoot({ width: 1440, height: 900 }, "d");
  if (which === "all" || which === "m")
    await shoot({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, "m");
  if (which === "w") await shoot({ width: 1920, height: 1080 }, "w");
  if (which === "t") await shoot({ width: 768, height: 1024, hasTouch: true }, "t");

  await browser.close();
  console.log("shots:", fs.readdirSync(OUT).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
