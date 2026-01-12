# SSH Helper

A mobile-first Progressive Web App (PWA) that helps you work with SSH commands on the go. Built with React, TypeScript, and Vite.

## Features

- **Quick Commands**: Common SSH operations ready to copy with a tap
- **Command Builder**: Generate custom SSH commands with your specific parameters
- **Host Management**: Save frequently-used servers with CRUD operations and import/export
- **Troubleshooting**: Common SSH errors with copyable fix commands
- **PWA Support**: Install on mobile devices and use offline
- **Zero Backend**: All data stored locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This app is a static site that can be deployed to any static hosting service.

### Deploy to Netlify

1. Build your project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Cloudflare Pages

1. Build your project: `npm run build`
2. In Cloudflare Dashboard, go to Pages → Create a project
3. Connect your Git repository or upload the `dist` folder
4. Set build command: `npm run build`
5. Set build output directory: `dist`

### Deploy to GitHub Pages

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

The deployment workflow:
1. Builds the application with `npm run build`
2. Deploys the `dist` folder to GitHub Pages
3. Makes the site available at `https://martinbibb-cmd.github.io/ssh-helper/`

To trigger a deployment, simply push changes to the `main` branch.

### Deploy to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy:

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Installing as PWA

### iOS (iPhone/iPad)

1. Open the app in **Safari**
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**

### Android

1. Open the app in **Chrome**
2. Tap the **menu** (three dots)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **"Add"** or **"Install"**

### Desktop (Chrome, Edge, etc.)

1. Look for the **install icon** in the address bar
2. Click it and follow the prompts

## Project Structure

```
ssh-helper/
├── public/
│   ├── icons/              # PWA icons (192x192 and 512x512)
│   ├── manifest.webmanifest # PWA manifest
│   └── sw.js               # Service worker
├── src/
│   ├── components/         # Reusable React components
│   │   ├── CommandCard.tsx
│   │   ├── HostSelector.tsx
│   │   ├── InstallPrompt.tsx
│   │   ├── Layout.tsx
│   │   └── Toast.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Hosts.tsx
│   │   ├── Builder.tsx
│   │   ├── Help.tsx
│   │   └── About.tsx
│   ├── utils/              # Utility functions
│   │   ├── clipboard.ts
│   │   ├── commands.ts
│   │   └── storage.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **LocalStorage API**: Data persistence
- **Service Workers**: Offline support
- **Web App Manifest**: PWA installability

## Features in Detail

### Home Page

Quick access to the most common SSH commands:
- Connect to SSH
- Copy public key
- Install key on server
- Run remote command
- SCP upload/download

Each command includes:
- One-tap copy button
- Expected output explanation
- Tips and common issues

### Hosts Management

Save your frequently-used servers:
- Add/Edit/Delete hosts
- Store: name, username, host, port, notes
- Export hosts as JSON (backup)
- Import hosts from JSON
- Default example hosts included

### Command Builder

Generate custom SSH commands:
- Select saved host or enter custom details
- Automatically builds commands for:
  - Basic SSH connection
  - SSH with custom port
  - SSH with identity file
  - SSH with remote command
  - ssh-copy-id
  - SCP upload/download
  - rsync upload/download
- All parameters customizable

### Troubleshooting

Common SSH errors with solutions:
- Permission denied (publickey)
- Host key verification failed
- Connection timed out
- No route to host
- Could not resolve hostname
- Connection refused

Each error includes:
- Plain English explanation
- Multiple fix commands (copyable)
- General debugging tips

### About Page

- SSH overview
- App features
- Security best practices
- Privacy information
- Installation instructions

## Data Storage

All data is stored locally in your browser using `localStorage`:
- **Host information** never leaves your device
- **No backend** or external servers
- **Export/Import** available for backup and transfer

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+

For best PWA experience, use Chrome (Android) or Safari (iOS).

## Development Notes

### Icon Generation

The project includes SVG icon templates in `public/icons/`. For production:

1. Convert SVG to PNG using an online tool or ImageMagick:
```bash
convert public/icons/icon-192.svg public/icons/icon-192.png
convert public/icons/icon-512.svg public/icons/icon-512.png
```

2. Or use any image editor to create proper branded icons.

### Service Worker

The service worker caches:
- App shell (HTML, CSS, JS)
- Static assets
- Icons and manifest

Cache strategy:
- Network-first for navigation
- Cache-first for assets
- Offline fallback to index.html

## Security Notes

This app is a **helper tool** only. It:
- Does NOT execute commands
- Does NOT store passwords or private keys
- Does NOT connect to servers
- Only helps you **copy** commands to paste in your terminal

Always:
- Understand commands before running them
- Keep your SSH keys secure
- Use strong authentication
- Verify host fingerprints

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ for easier SSH management on mobile devices.
