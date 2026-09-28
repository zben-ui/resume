import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const framesDir = path.join(root, "public", "frames");
const prefix = "frame_";
const extension = "webp";
const pad = 4;

if (!fs.existsSync(framesDir)) {
  console.error("找不到 public/frames。请先放入序列帧。");
  process.exit(1);
}

const files = fs
  .readdirSync(framesDir)
  .filter((name) => new RegExp(`^${prefix}\\d+\\.${extension}$`, "i").test(name))
  .sort((a, b) => a.localeCompare(b, "en"));

if (!files.length) {
  console.error("public/frames 里没有 WebP 序列帧。");
  process.exit(1);
}

const manifest = {
  directory: "/frames",
  prefix,
  pad,
  extension,
  count: files.length,
  first: files[0],
  last: files[files.length - 1],
};

const json = JSON.stringify(manifest, null, 2);
fs.writeFileSync(path.join(root, "public", "frames-manifest.json"), json);
console.log(`frames-manifest.json · ${files.length} frames · ${files[0]} → ${files[files.length - 1]}`);
