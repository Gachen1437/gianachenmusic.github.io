const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { getGalleryImages } = require('./lib/gallery-images');
const { fetchLatestVideos } = require('./lib/youtube-feed');

const publicDirectory = path.resolve(__dirname, 'src');
const port = Number(process.env.PORT) || 3000;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end('Method not allowed.');
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (requestUrl.pathname === '/api/youtube-videos') {
    try {
      const videos = await fetchLatestVideos();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(req.method === 'HEAD' ? undefined : JSON.stringify(videos));
    } catch (error) {
      console.error('YouTube feed request failed.', error);
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(req.method === 'HEAD'
        ? undefined
        : JSON.stringify({ error: 'Unable to fetch YouTube videos.' }));
    }
  }

  if (requestUrl.pathname === '/api/gallery-images') {
    try {
      const images = await getGalleryImages();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(req.method === 'HEAD' ? undefined : JSON.stringify(images));
    } catch (error) {
      console.error('Unable to read gallery images.', error);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(req.method === 'HEAD'
        ? undefined
        : JSON.stringify({ error: 'Unable to load gallery images.' }));
    }
  }

  let requestPath;
  try {
    requestPath = decodeURIComponent(requestUrl.pathname);
  } catch {
    res.writeHead(400);
    return res.end('Invalid URL.');
  }

  if (requestPath === '/') requestPath = '/index.html';
  const filePath = path.resolve(publicDirectory, `.${requestPath}`);
  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    res.writeHead(403);
    return res.end('Forbidden.');
  }

  try {
    const content = await fs.readFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
    });
    return res.end(req.method === 'HEAD' ? undefined : content);
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'EISDIR') {
      console.error('Unable to serve website file.', error);
      res.writeHead(500);
      return res.end('Unable to serve website file.');
    }
    res.writeHead(404);
    return res.end('Not found.');
  }
});

server.listen(port, () => {
  console.log(`Website running at http://localhost:${port}`);
});
