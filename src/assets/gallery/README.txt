Gallery photos
==============

Add or remove .avif, .gif, .jpg, .jpeg, .png, or .webp image files in this
folder. The gallery discovers them automatically when the site loads; you
don't need to edit the slide markup in index.html.

For easier GitHub uploads and faster page loads, resize large photos to about
1920 pixels on the longest side and compress them before adding them here.
The gallery fits each whole photo inside its 16:9 frame.

Run the site with `npm start` so the /api/gallery-images endpoint can scan
this folder. Static-only hosts cannot list files automatically; use a host
that runs the gallery API and includes these images. Descriptive filenames
are used to generate image alt text.
