const { fetchLatestVideos } = require('../lib/youtube-feed');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const videos = await fetchLatestVideos();
    return res.status(200).json(videos);
  } catch (error) {
    console.error('YouTube feed request failed.', error);
    return res.status(502).json({ error: 'Unable to fetch YouTube videos.' });
  }
};
