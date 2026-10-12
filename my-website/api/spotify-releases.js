export default async function handler(req, res) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const artistId = '3r60tSvYtUuwXrYS24bvCq';

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' })
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const albumsRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?limit=3&include_groups=album,single`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const albumsData = await albumsRes.json();

  const releases = albumsData.items.map(item => ({
    title: item.name,
    type: item.album_group || item.type,
    image: item.images?.[0]?.url || ''
  }));

  res.status(200).json(releases);
}