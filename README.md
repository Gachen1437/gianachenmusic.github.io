# My Website

This project is a simple website that demonstrates the structure and functionality of a web application. It includes HTML, CSS, and JavaScript files to create a fully functional webpage.

## Project Structure

```
my-website
├── src
│   ├── index.html       # Main HTML document
│   ├── css
│   │   └── styles.css   # Styles for the website
│   └── js
│       └── main.js      # JavaScript for interactivity
│   └── assets
│       └── gallery      # Images used by the rotating photo gallery
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

- The `index.html` file contains the structure of the webpage.
- The `styles.css` file defines the visual presentation of the HTML elements.
- The `main.js` file adds interactivity to the website.

## YouTube videos

The Latest videos section requests the channel's public YouTube RSS feed through `/api/youtube-videos` when the page loads and every five minutes afterward. The feed returns the newest three video links and thumbnails without requiring an API key. Locally, `npm start` runs `server.js`, which serves both the website and API. For deployment, use a platform that runs serverless functions from the `api` directory, such as Vercel.

## Gallery photos

Gallery images are stored in `src/assets/gallery`. Add or remove `.avif`, `.gif`, `.jpg`, `.jpeg`, `.png`, or `.webp` files there; the gallery scans the folder automatically through `/api/gallery-images` when the page loads. Resize large photos to about 1920 pixels on the longest side and compress them before uploading for smaller repositories and faster page loads. Run `npm start` locally for the endpoint to work. Static hosting without serverless API support (including GitHub Pages) can only show the photos listed in the HTML; it cannot automatically scan a folder. On a serverless host, deploy the `/api/gallery-images` function and ensure the gallery assets are included. The carousel advances automatically and includes previous, next, and pause controls.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project. 

## License

This project is licensed under the MIT License.