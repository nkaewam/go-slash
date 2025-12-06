# go/

<div align="center">
  <img src="assets/icon.png" alt="go/ logo" width="128" height="128">
</div>

<div align="center">
  <strong>Personal link management reverse proxy browser extension</strong>
</div>

---

## About

**go/** is a browser extension that provides a personal link management system inspired by Google's "ÜberProxy". It allows you to create short, memorable links that redirect to your configured destinations.

### How it works

The extension intercepts requests to URLs matching the pattern `go/*` and redirects them to a configured base URL. For example:

- `http://go/docs` → `https://your-redirect-host.com/docs`
- `http://go/project` → `https://your-redirect-host.com/project`
- `http://go/anything` → `https://your-redirect-host.com/anything`

This enables you to:

- Create short, memorable links for frequently accessed resources
- Manage your personal link collection
- Access your links from any browser tab without bookmarks

## Features

- 🚀 **Fast redirects** - Uses Chrome's declarativeNetRequest API for instant URL redirection
- 🔒 **Privacy-focused** - All redirects happen locally in your browser
- ⚙️ **Configurable** - Set your own redirect host via environment variables
- 🎨 **Clean UI** - Minimalist popup interface

## Setup

### Prerequisites

- Node.js (v18 or higher)
- Bun or npm/pnpm for package management

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd go-link
   ```

2. Install dependencies:

   ```bash
   bun i
   ```

3. Configure your redirect host by creating a `.env` file in the project root:

   ```env
   PLASMO_PUBLIC_REDIRECT_HOST=https://your-redirect-host.com
   ```

   Replace `https://your-redirect-host.com` with your actual redirect destination URL.

### Development

1. Start the development server:

   ```bash
   bun dev
   ```

2. Load the extension in your browser:

   - Open Chrome/Edge and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-dev` directory

3. The extension will automatically reload when you make changes to the code.

### Building for Production

To create a production build:

```bash
bun build
```

The production bundle will be created in the `build/` directory, ready to be packaged and published to browser extension stores.

## Usage

Once installed and configured:

1. Navigate to any URL starting with `go/` in your browser
2. The extension will automatically redirect you to the corresponding path on your configured redirect host
3. For example, visiting `http://go/docs` will redirect to `https://your-redirect-host.com/docs`

## Technical Details

- **Framework**: [Plasmo](https://docs.plasmo.com/) - A browser extension framework
- **API**: Chrome Declarative Net Request API (Manifest V3)
- **Redirect Method**: Session rules (cleared on extension reload)
- **Pattern Matching**: Regex-based URL matching for `go/*` paths

## Project Structure

```
go-link/
├── assets/
│   └── icon.png          # Extension icon
├── background.ts         # Background script for redirect rules
├── popup.tsx            # Extension popup UI
├── popup.module.css     # Popup styles
├── package.json         # Project dependencies
└── README.md           # This file
```

## Author

Created by **nkaewam@** as a pet project inspired by Google's ÜberProxy link management system.

## License

This project is open source and available for personal use.
