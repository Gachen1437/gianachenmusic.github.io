const { getGalleryImages } = require('../lib/gallery-images');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const images = await getGalleryImages();
    return res.status(200).json(images);
  } catch (error) {
    console.error('Unable to read gallery images.', error);
    return res.status(500).json({ error: 'Unable to load gallery images.' });
  }
};
