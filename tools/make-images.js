/* Generates the placeholder share image (og-image.png) and apple-touch-icon.png
   in the site's palette, with no dependencies. Run: node tools/make-images.js
   Replace og-image.png with a real screenshot or design whenever you like. */
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

function png(w, h, px) {
  const crcT = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
  const crc = b => { let c = -1; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (w * 3 + 1)] = 0; for (let x = 0; x < w; x++) { const c = px(x, y); const o = y * (w * 3 + 1) + 1 + x * 3; raw[o] = c[0]; raw[o + 1] = c[1]; raw[o + 2] = c[2]; } }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}

/* same ridge shape the site uses for its hills */
const ridge = (x, h, seed, base, amp, k) => h * (base - amp * (.5 * Math.sin(x / (340 * k) + seed) + .3 * Math.sin(x / (140 * k) + seed * 1.7) + .2 * Math.sin(x / (61 * k) + seed * 2.3)));

function scene(W, H, sc) {
  const top = hex("#f59f5b"), bot = hex("#fbd78f"), sun = hex("#ffe2a0");
  const layers = [[.3, .55, .2, .7, hex("#c99a8a")], [1.4, .66, .18, .55, hex("#3f8a6d")], [2.6, .8, .12, .45, hex("#1d5645")]];
  const sx = W * .68, sy = H * .4, sr = H * .11;
  return (x, y) => {
    let c = mix(top, bot, y / H);
    const d = Math.hypot(x - sx, y - sy);
    if (d < sr) c = sun; else if (d < sr * 2.4) c = mix(c, sun, .35 * (1 - (d - sr) / (sr * 1.4)));
    for (const [seed, base, amp, k, col] of layers) if (y > ridge(x / sc, H, seed, base, amp, k)) c = col;
    /* the footpath winding up from the bottom */
    const py = (H - y) / H, pxC = W * (.42 + .08 * Math.sin(py * 5)), pw = W * .06 * Math.max(0, 1 - py / .36);
    if (py < .34 && Math.abs(x - pxC) < pw) c = hex("#e8dab5");
    return c.map(Math.round);
  };
}

const root = path.join(__dirname, "..");
fs.writeFileSync(path.join(root, "og-image.png"), png(1200, 630, scene(1200, 630, 1)));
fs.writeFileSync(path.join(root, "apple-touch-icon.png"), png(180, 180, scene(180, 180, .2)));
console.log("wrote og-image.png and apple-touch-icon.png");
