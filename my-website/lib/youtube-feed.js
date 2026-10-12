const YOUTUBE_CHANNEL_ID = 'UCsLMNYgps_r_fx826IV2_pQ';
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

function decodeXmlEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code) => {
      if (code[0] === '#') {
        const number = code[1].toLowerCase() === 'x'
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
        if (number >= 0 && number <= 0x10ffff && (number < 0xd800 || number > 0xdfff)) {
          return String.fromCodePoint(number);
        }
        return entity;
      }

      const entities = {
        amp: '&',
        lt: '<',
        gt: '>',
        quot: '"',
        apos: "'"
      };
      return entities[code.toLowerCase()];
    });
}

function readTag(xml, tagName) {
  const escapedName = tagName.replace(':', '\\:');
  const match = xml.match(new RegExp(`<${escapedName}[^>]*>([\\s\\S]*?)</${escapedName}>`));
  return match ? decodeXmlEntities(match[1].trim()) : '';
}

async function fetchLatestVideos() {
  const response = await fetch(YOUTUBE_FEED_URL, {
    headers: { Accept: 'application/atom+xml' }
  });

  if (!response.ok) {
    throw new Error(`YouTube feed request failed with status ${response.status}.`);
  }

  const feed = await response.text();
  const entries = [...feed.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/g)];
  if (entries.length === 0 && !feed.includes('<feed')) {
    throw new Error('YouTube returned an unexpected feed response.');
  }

  return entries
    .map(([entry]) => {
      const videoId = readTag(entry, 'yt:videoId');
      const title = readTag(entry, 'title');
      const published = readTag(entry, 'published');
      if (!/^[\w-]{11}$/.test(videoId) || !title) return null;

      return {
        title,
        permalink: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        published
      };
    })
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
    .slice(0, 3);
}

module.exports = { fetchLatestVideos };
