/**
 * One-shot asset pipeline: raw-assets/originals → public/
 * Property galleries, site imagery, brand marks. Videos are cut separately with ffmpeg.
 */
import sharp from "sharp";
import { mkdir, readdir } from "fs/promises";
import path from "path";

const RAW = "raw-assets/originals";
const files = await readdir(RAW);
const find = (prefix) => {
  const re = new RegExp(`^${prefix}\\.[a-f0-9]{8}\\.webp$`);
  const hit = files.find((f) => re.test(f));
  if (!hit) throw new Error(`missing ${prefix}`);
  return path.join(RAW, hit);
};

async function out(src, dest, width, q = 78, bottomCrop = 0) {
  await mkdir(path.dirname(dest), { recursive: true });
  let img = sharp(src).rotate();
  const meta = await img.metadata();
  if (bottomCrop > 0) {
    // MLS/broker watermarks live in the bottom strip — cut it clean off
    img = img.extract({
      left: 0,
      top: 0,
      width: meta.width,
      height: Math.round(meta.height * (1 - bottomCrop)),
    });
  }
  await img
    .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(dest);
}

/** galleries whose source photos carry baked listing watermarks */
const bottomCrops = {
  "greymon-317": 0.075,
  "linda-flora-2179": 0.1,
  "marlay-1501": 0.1,
};

/* ── property galleries ─────────────────────────────────────── */
const galleries = {
  "greymon-309": Array.from({ length: 11 }, (_, i) => `Bg-Residences-309-Greymon-${i + 1}`),
  "greymon-317": ["Bg-Residences-317-Greymon", ...Array.from({ length: 8 }, (_, i) => `Bg-Residences-317-Greymon-${i + 2}`)],
  "greymon-335": Array.from({ length: 8 }, (_, i) => `Bg-Residences-335-Greymon-${i + 1}`),
  "greymon-227": Array.from({ length: 10 }, (_, i) => `Bg-Residences-227-Greymon-${i + 1}`),
  "washington-3609": Array.from({ length: 10 }, (_, i) => `Bg-Residences-3609-Washington-${i + 1}`),
  "linda-flora-2179": Array.from({ length: 16 }, (_, i) => `Bg-Residences-2179-Linda-${i + 1}`),
  // Marley-1 is a 658px square — too soft to ship anywhere. Lead with the aerial.
  "marlay-1501": ["Bg-Residences-2179-Marley-2", "Bg-Residences-2179-Marley-4", "Bg-Residences-2179-Marley-3"],
  "kanuga-707": ["Bg-Residences-Kanuga-1", "Bg-Residences-Kanuga-2"],
};

for (const [slug, list] of Object.entries(galleries)) {
  for (let i = 0; i < list.length; i++) {
    const nn = String(i + 1).padStart(2, "0");
    // first image doubles as the page hero — keep it bigger
    await out(
      find(list[i]),
      `public/properties/${slug}/${nn}.webp`,
      i === 0 ? 2000 : 1600,
      78,
      bottomCrops[slug] ?? 0
    );
  }
  console.log(slug, list.length);
}

/* ── site imagery (clean assets only — watermarked comps excluded) ── */
const site = [
  ["Bg-El-Cid-Home", "el-cid", 2000],
  ["bg-home-flamingo-prospect", "flamingo-aerial", 2000],
  ["Bg-Home-Blue-Sky-Hotel", "blue-sky", 2000],
  ["Bg-Residences-Latest-Main", "wpb-skyline", 2000],
  ["Bg-Residences-Main", "miami-marina", 2000],
  ["Bg-About-Main", "beach-path", 2000],
  ["Bg-Home-Dev-02", "render-pergola", 1600],
  ["Bg-Home-Dev-03", "render-shutters", 1600],
  ["Main-Section-Thumbnail", "deco-house", 1600],
  ["Gus-renny-avatar", "gus-portrait", 1200],
];
for (const [prefix, name, w] of site) {
  await out(find(prefix), `public/site/${name}.webp`, w);
  console.log("site/" + name);
}

/* ── Gus on-site photo: crop the person out of the text-baked banner ── */
{
  const src = find("Bg-Home-Historic-Fabric"); // 4504x2948, marketing text baked on the left
  await mkdir("public/site", { recursive: true });
  await sharp(src)
    .extract({ left: 1650, top: 0, width: 2854, height: 2948 })
    .resize({ width: 1800 })
    .webp({ quality: 80 })
    .toFile("public/site/gus-site.webp");
  console.log("site/gus-site (cropped clean of baked text)");
}

/* ── brand ──────────────────────────────────────────────────── */
{
  await mkdir("public/brand", { recursive: true });
  // horizontal lockup (header): real asset, untouched
  await sharp(find("gdr-logo-mobile")).png().toFile("public/brand/gdr-lockup.png");
  // stacked logo (footer / og)
  await sharp(find("gdr-logo")).png().toFile("public/brand/gdr-stacked.png");
  // mark only: crop the R from the stacked logo (top ~62% is the mark)
  await sharp(find("gdr-logo"))
    .extract({ left: 148, top: 0, width: 300, height: 272 })
    .png()
    .toFile("public/brand/gdr-mark.png");
  console.log("brand done");
}
console.log("ALL DONE");
