const fs = require('node:fs/promises');
const path = require('node:path');
const { getGalleryImages } = require('../lib/gallery-images');
const { fetchLatestVideos } = require('../lib/youtube-feed');

const projectDirectory = path.resolve(__dirname, '..');
const sourceDirectory = path.join(projectDirectory, 'src');
const outputDirectory = path.join(projectDirectory, 'dist');

async function buildPagesSite() {
  const [galleryImages, videos] = await Promise.all([
    getGalleryImages(),
    fetchLatestVideos()
  ]);

  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.cp(sourceDirectory, outputDirectory, { recursive: true });

  const dataDirectory = path.join(outputDirectory, 'data');
  await fs.mkdir(dataDirectory, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(dataDirectory, 'gallery-images.json'), JSON.stringify(galleryImages, null, 2)),
    fs.writeFile(path.join(dataDirectory, 'youtube-videos.json'), JSON.stringify(videos, null, 2))
  ]);
}

buildPagesSite().catch(error => {
  console.error('Unable to build the GitHub Pages site.', error);
  process.exitCode = 1;
});
