const fs = require('node:fs/promises');
const path = require('node:path');

const galleryDirectory = path.resolve(__dirname, '../src/assets/gallery');
const supportedImageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp']);

async function getGalleryImages() {
  const files = await fs.readdir(galleryDirectory, { withFileTypes: true });

  return files
    .filter(file => file.isFile() && supportedImageExtensions.has(path.extname(file.name).toLowerCase()))
    .map(file => ({
      src: `./src/assets/gallery/${encodeURIComponent(file.name)}`,
      alt: `Gian Achen gallery photo: ${path.parse(file.name).name.replace(/[_-]+/g, ' ')}`
    }))
    .sort((a, b) => a.src.localeCompare(b.src, undefined, { numeric: true, sensitivity: 'base' }));
}

module.exports = { getGalleryImages };
