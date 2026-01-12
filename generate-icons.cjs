// Simple script to generate placeholder PWA icons
// Run with: node generate-icons.js

const fs = require('fs');
const path = require('path');

// Create SVG icons
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">SSH</text>
</svg>
`;

const iconsDir = path.join(__dirname, 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG files (these can be used as placeholders)
fs.writeFileSync(path.join(iconsDir, 'icon-192.svg'), createSVG(192));
fs.writeFileSync(path.join(iconsDir, 'icon-512.svg'), createSVG(512));

console.log('SVG icons generated in public/icons/');
console.log('Note: For production, convert these to PNG using:');
console.log('  - Online tool like cloudconvert.com');
console.log('  - Or install imagemagick and run:');
console.log('    convert public/icons/icon-192.svg public/icons/icon-192.png');
console.log('    convert public/icons/icon-512.svg public/icons/icon-512.png');
