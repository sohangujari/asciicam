# ASCIICam

ASCIICam is a real-time, browser-based camera application that converts your webcam feed into authentic ASCII art entirely on the client side. No video is ever sent to a server.

The application captures live camera data via `getUserMedia`, mathematically maps pixel luminance to standard ASCII character ramps (`@#S%?*+;:,. `), and renders out the frames flawlessly to your screen. It features a modern, premium glassmorphic UI overlay on top of the immersive fullscreen terminal output.

![ASCIICam Display](asciicam-demo.png) *(Preview of the immersive application interface)*

## Features

- **Live ASCII Conversion**: Renders the webcam at 24 FPS into a high-performance text matrix.
- **Color Modes**:
  - `Terminal`: Classic green (`#00ff41`) on a deep black background.
  - `Classic`: High contrast bright white on black.
  - `Color`: Advanced per-character RGB sampling right from the local camera feed.
- **Dynamic Density Slider**: Adjust camera frame grid mapping from blocky 40 columns to a highly detailed 200 character wide column density, with automatic 16:9 vertical scale correction.
- **Mirror Output**: Toggle character flipping and mirroring. 
- **Download Media**: Save your current ASCII frame as raw `.txt` log format, or export the currently rendered grid directly as an image (`.png`).
- **Premium Glassmorphic UI**: Floating control map using intense CSS backdrop filters and responsive UI scaling.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (Glassmorphic layouts, absolute layering)
- **Icons**: Lucide React
- **Architecture**: 100% Client-Side. Pure Canvas API `drawImage()` & `getImageData()` mathematical manipulation without external processing libraries.

## Installation & Running Locally

Ensure you have Node.js installed, then execute the following:

```bash
# Clone the repository and navigate inside
cd asciicam

# Install dependencies 
npm install

# Start the Vite development server
npm run dev
```

Open `http://localhost:5173/` in your browser. Be sure to accept the camera permission prompt to let the engine capture frames.

## Usage Details

Because standard browsers impose auto-play restrictions on `getUserMedia` hidden feeds, ASCIICam renders an invisible, microscopic `<video>` tag that tracks and forces stream decoding. Calculations rely entirely on calculating standard width/height and mapping pixel coordinates, yielding robust full-screen responsiveness. 

*Note: The "Color Mode" is computationally intensive as it paints individualized `<span style="color: RGB">` DOM nodes every calculated frame cycle.*
