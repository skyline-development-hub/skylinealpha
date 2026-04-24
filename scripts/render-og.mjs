#!/usr/bin/env node
/**
 * Skyline DevHub — OG image renderer
 *
 * Renders five 2400×1260 PNGs, one per SDF scene:
 *   public/og/origin.png   (uSc=0)
 *   public/og/torus.png    (uSc=1)
 *   public/og/lattice.png  (uSc=2)
 *   public/og/prism.png    (uSc=3)
 *   public/og/helix.png    (uSc=4)
 *
 * CURRENT STATUS: placeholder output.
 *
 *   This script writes valid solid-near-black PNGs at the correct
 *   2400×1260 size so the generateMetadata references resolve and
 *   social crawlers don't 404. Each scene gets a slightly different
 *   tone so the outputs are distinguishable during review.
 *
 *   The real version should port the fragment shader from
 *   components/SkylineEngine.tsx, render each scene to a headless
 *   WebGL canvas, and encode that. That requires puppeteer (~200 MB)
 *   plus a verbatim copy of the shader and its uniform wiring. Follow-up
 *   work tracked at: [open an issue before shipping real OGs].
 *
 * Run with:  npm run og:render
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "og");
mkdirSync(OUT, { recursive: true });

const W = 2400;
const H = 1260;

// Each scene gets a subtly different gray so the placeholders are
// distinguishable during review. Base tone #0a0a0a, +idx.
const SCENES = [
  { name: "origin",  idx: 0 },
  { name: "torus",   idx: 1 },
  { name: "lattice", idx: 2 },
  { name: "prism",   idx: 3 },
  { name: "helix",   idx: 4 },
];

// ─── minimal PNG encoder (IHDR + IDAT + IEND) ─────────────────────
// Only handles solid-color 8-bit RGB. Enough for placeholder output.

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcIn = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(crcIn), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function solidRgbPng(width, height, r, g, b) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8]  = 8;   // bit depth
  ihdr[9]  = 2;   // color type: truecolor RGB
  ihdr[10] = 0;   // compression
  ihdr[11] = 0;   // filter
  ihdr[12] = 0;   // interlace

  const rowLen = 1 + width * 3;
  const row = Buffer.alloc(rowLen);
  row[0] = 0; // filter: None
  for (let x = 0; x < width; x++) {
    row[1 + x * 3]     = r;
    row[1 + x * 3 + 1] = g;
    row[1 + x * 3 + 2] = b;
  }
  const raw = Buffer.alloc(rowLen * height);
  for (let y = 0; y < height; y++) row.copy(raw, y * rowLen);
  const idat = deflateSync(raw);

  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const s of SCENES) {
  const tone = 0x0a + s.idx; // #0a, #0b, #0c, #0d, #0e
  const png = solidRgbPng(W, H, tone, tone, tone);
  writeFileSync(join(OUT, `${s.name}.png`), png);
  console.log(`✓ ${s.name}.png  (${W}×${H}, placeholder tone #${tone.toString(16).padStart(2, "0").repeat(3)})`);
}

console.log("\nNote: these are placeholders. Real shader-rendered OGs are a follow-up PR.");
