# My Website

This project is a simple website that demonstrates the structure and functionality of a web application. It includes HTML, CSS, and JavaScript files to create a fully functional webpage.

## Project Structure

```
my-website
├── index.html           # Main HTML document (site root)
├── src
│   ├── css
│   │   └── styles.css   # Styles for the website
│   └── js
│       └── main.js      # JavaScript for interactivity
│   └── assets           # Site and gallery images
├── api
│   └── youtube-videos.js # Fetches the latest YouTube videos
├── README.md            # Project documentation
└── package.json         # npm configuration file
```

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run `npm start` and open `http://localhost:3000` in your browser. Node.js 18 or newer is required.

## Usage

- The root `index.html` file contains the structure of the webpage.
- The `styles.css` file defines the visual presentation of the HTML elements.
- The `main.js` file adds interactivity to the website.

## GitHub Pages deployment

This project deploys to GitHub Pages as a static site; GitHub Pages does not run `server.js` or the `/api` endpoints. The site entry point is the repository-root `index.html`. The workflow in `.github/workflows/deploy-pages.yml` builds the static site on pushes to `main` or `master` and refreshes YouTube video data every six hours. Gallery data is generated from the files in `src/assets/gallery` during each build, so adding an image and pushing it updates the carousel. To enable deployment, set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## YouTube videos

The Latest videos section reads the three newest videos from YouTube's public channel feed. GitHub Actions generates a JSON snapshot during deployment and refreshes it every six hours. Locally, `npm start` serves the site and its dynamic API routes.

## Gallery photos

Gallery images are stored in `src/assets/gallery`. Add or remove `.avif`, `.gif`, `.jpg`, `.jpeg`, `.png`, or `.webp` files there. The GitHub Pages build automatically scans this folder and publishes the matching carousel data. Resize large photos to about 1920 pixels on the longest side and compress them before uploading for smaller repositories and faster page loads. The carousel advances automatically and includes previous, next, and pause controls.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project. 

## License

This project is licensed under the MIT License.