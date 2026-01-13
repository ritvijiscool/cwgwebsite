# CWG RECORDS - CaWaBanga Records

A minimal, high-fashion, editorial landing page for CWG RECORDS.

## 🚀 Quick Start

### Local Development

1. **Navigate to the project directory:**
   ```bash
   cd /Users/ritvijk/Desktop/Engineering/Web/CWG
   ```

2. **Open with a local server:**

   **Option A - Python (Python 3):**
   ```bash
   python3 -m http.server 8000
   ```

   **Option B - Python (Python 2):**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   **Option C - Node.js (if you have npx):**
   ```bash
   npx serve
   ```

   **Option D - VS Code:**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open in browser:**
   - Go to `http://localhost:8000` (or the port shown in your terminal)

## 📸 Adding Artist Images

When you have artist images ready:

1. Create an `images` folder in the project directory
2. Add your artist images (e.g., `ritvisky.jpg`, `saygi322.jpg`)
3. Open `main.js` and uncomment these lines at the bottom:
   ```javascript
   setArtistImage('ritvisky', 'images/ritvisky.jpg');
   setArtistImage('saygi322', 'images/saygi322.jpg');
   ```
4. Update the paths to match your image filenames

## 🔗 Updating Artist Links

To add actual artist profile links:

1. Open `main.js`
2. Find the `artistLinks` object (around line 82)
3. Replace the `#` placeholders with actual URLs:
   ```javascript
   const artistLinks = {
       ritvisky: 'https://instagram.com/ritvisky',
       saygi322: 'https://soundcloud.com/saygi322'
   };
   ```

## 🔗 Updating Social Links

To add actual social media links:

1. Open `index.html`
2. Find the socials section (around line 70)
3. Update the `href` attributes in each social panel:
   ```html
   <a href="https://instagram.com/cwgrecords" target="_blank" class="social-panel instagram-panel">
   ```

## 📁 Project Structure

```
CWG/
├── index.html      # Main HTML structure
├── style.css       # Editorial styling
├── main.js         # Interactive functionality
└── README.md       # This file
```

## ✨ Features

- **Hero Section**: Massive typographic "CaWaBanga" with minimal design
- **Navigation**: Dropdown menu with smooth transitions
- **Artists Section**: Full-screen carousel with keyboard navigation (← →)
- **Socials Section**: Grid layout with platform-specific hover effects
- **Responsive**: Mobile-friendly design

## 🎨 Design Philosophy

- Pure white background
- Times New Roman typography
- Editorial, restrained aesthetic
- Smooth transitions, no gimmicky effects
- Culture-first, not tech-startup
