import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8 bit depth
  ihdr.writeUInt8(2, 9); // Color type 2 (Truecolor RGB)
  ihdr.writeUInt8(0, 10); // Compression method
  ihdr.writeUInt8(0, 11); // Filter method
  ihdr.writeUInt8(0, 12); // Interlace method

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  // Pre-calculate CRC32 table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw scanlines: width * 3 bytes RGB + 1 byte filter (0) per line
  const scanlineLength = 1 + width * 3;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const maxR = width * 0.45;

  for (let y = 0; y < height; y++) {
    const lineOffset = y * scanlineLength;
    rawData[lineOffset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = lineOffset + 1 + x * 3;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Draw warm gold emblem in center on dark obsidian background
      if (dist < maxR * 0.7) {
        // Gold core
        const grad = dist / (maxR * 0.7);
        rawData[pxOffset] = Math.round(234 * (1 - grad * 0.3));     // R
        rawData[pxOffset + 1] = Math.round(179 * (1 - grad * 0.3)); // G
        rawData[pxOffset + 2] = Math.round(8 * (1 + grad * 0.5));   // B
      } else if (dist < maxR * 0.8) {
        // Gold rim
        rawData[pxOffset] = 202;
        rawData[pxOffset + 1] = 138;
        rawData[pxOffset + 2] = 4;
      } else {
        // Background dark slate
        rawData[pxOffset] = 24;
        rawData[pxOffset + 1] = 24;
        rawData[pxOffset + 2] = 27;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

if (!fs.existsSync('/app/applet/public')) {
  fs.mkdirSync('/app/applet/public', { recursive: true });
}

fs.writeFileSync('/app/applet/public/pwa-192x192.png', createPNG(192, 192, 234, 179, 8));
fs.writeFileSync('/app/applet/public/pwa-512x512.png', createPNG(512, 512, 234, 179, 8));
fs.writeFileSync('/app/applet/public/pwa-maskable-512x512.png', createPNG(512, 512, 234, 179, 8));
fs.writeFileSync('/app/applet/public/apple-touch-icon.png', createPNG(180, 180, 234, 179, 8));
console.log('PNG Icons successfully generated!');
