import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, drawFn) {
  // RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const color = drawFn(x, y, width, height);
      rgba[idx] = color[0];
      rgba[idx + 1] = color[1];
      rgba[idx + 2] = color[2];
      rgba[idx + 3] = color[3];
    }
  }

  // Scanlines with filter byte 0 (None)
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    scanlines[y * (width * 4 + 1)] = 0; // Filter None
    rgba.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });

  // CRC32 implementation
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const typeAndData = buf.subarray(4, 8 + len);
    buf.writeUInt32BE(crc32(typeAndData), 8 + len);
    return buf;
  }

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // Deflate
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Non-interlaced

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// Draw Money Kim Lab "MK" Monogram with luxury Navy #101B2A and Gold #C5A46D
function drawIcon(x, y, w, h) {
  const nx = x / w;
  const ny = y / h;

  // Outer corner radius
  const r = 0.16;
  const inCorner =
    (nx < r && ny < r && Math.hypot(nx - r, ny - r) > r) ||
    (nx > 1 - r && ny < r && Math.hypot(nx - (1 - r), ny - r) > r) ||
    (nx < r && ny > 1 - r && Math.hypot(nx - r, ny - (1 - r)) > r) ||
    (nx > 1 - r && ny > 1 - r && Math.hypot(nx - (1 - r), ny - (1 - r)) > r);

  if (inCorner) {
    return [0, 0, 0, 0]; // Transparent outside rounded corner
  }

  // Inner Gold hairline border
  const borderWidth = Math.max(1 / w, 0.04);
  const isBorder =
    (nx >= 0.06 && nx <= 0.06 + borderWidth && ny >= 0.06 && ny <= 0.94) ||
    (nx >= 0.94 - borderWidth && nx <= 0.94 && ny >= 0.06 && ny <= 0.94) ||
    (ny >= 0.06 && ny <= 0.06 + borderWidth && nx >= 0.06 && nx <= 0.94) ||
    (ny >= 0.94 - borderWidth && ny <= 0.94 && nx >= 0.06 && nx <= 0.94);

  if (isBorder) {
    return [197, 164, 109, 200]; // Gold border #C5A46D
  }

  // Letter M drawing (left half ~ 0.20 to 0.48)
  const isM_left = (nx >= 0.22 && nx <= 0.28 && ny >= 0.25 && ny <= 0.72);
  const isM_right = (nx >= 0.44 && nx <= 0.50 && ny >= 0.25 && ny <= 0.72);
  // M diagonals
  const isM_diag1 = (nx >= 0.24 && nx <= 0.38 && Math.abs((ny - 0.28) - 1.8 * (nx - 0.24)) < 0.06 && ny <= 0.55);
  const isM_diag2 = (nx >= 0.34 && nx <= 0.48 && Math.abs((ny - 0.55) + 1.8 * (nx - 0.36)) < 0.06 && ny <= 0.55);

  // Letter K drawing (right half ~ 0.56 to 0.82)
  const isK_stem = (nx >= 0.56 && nx <= 0.62 && ny >= 0.25 && ny <= 0.72);
  const isK_upper = (nx >= 0.58 && nx <= 0.80 && Math.abs((ny - 0.48) + 1.1 * (nx - 0.58)) < 0.055 && ny >= 0.25);
  const isK_lower = (nx >= 0.58 && nx <= 0.82 && Math.abs((ny - 0.46) - 1.1 * (nx - 0.58)) < 0.055 && ny <= 0.72);

  // Center gold dot accent
  const isDot = Math.hypot(nx - 0.51, ny - 0.80) < 0.035;

  if (isM_left || isM_right || isM_diag1 || isM_diag2 || isK_stem || isK_upper || isK_lower) {
    return [247, 245, 240, 255]; // Ivory white text #F7F5F0
  }

  if (isDot) {
    return [197, 164, 109, 255]; // Gold dot
  }

  // Base Deep Navy #101B2A
  return [16, 27, 42, 255];
}

// Generate PNG sizes
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 }
];

const publicDir = path.resolve('public');
const pngBuffers = {};

for (const { name, size } of sizes) {
  const buf = createPng(size, size, drawIcon);
  fs.writeFileSync(path.join(publicDir, name), buf);
  pngBuffers[size] = buf;
  console.log(`Generated ${name} (${size}x${size})`);
}

// Build standard multi-resolution favicon.ico containing 16x16, 32x32, 48x48
const icoSizes = [16, 32, 48];
const count = icoSizes.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // Reserved
header.writeUInt16LE(1, 2); // ICO type 1
header.writeUInt16LE(count, 4); // 3 images

let offset = 6 + count * 16;
const entries = [];
const imageBuffers = [];

for (const size of icoSizes) {
  const png = pngBuffers[size];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // Width
  entry.writeUInt8(size === 256 ? 0 : size, 1); // Height
  entry.writeUInt8(0, 2); // Color palette
  entry.writeUInt8(0, 3); // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(png.length, 8); // Image size in bytes
  entry.writeUInt32LE(offset, 12); // Offset
  entries.push(entry);
  imageBuffers.push(png);
  offset += png.length;
}

const icoBuffer = Buffer.concat([header, ...entries, ...imageBuffers]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log('Generated favicon.ico successfully!');
