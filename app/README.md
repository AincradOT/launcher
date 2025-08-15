# Launcher App

A modern desktop application built with **Electron**, **Vite**, and **React**.

## 🚀 Features

- ⚡ **Fast Development** - Hot Module Replacement with Vite
- ⚛️ **Modern React** - Built with React 18 and TypeScript
- 🖥️ **Cross-Platform** - Runs on Windows, macOS, and Linux
- 🔧 **Developer Experience** - ESLint, TypeScript, and modern tooling
- 📦 **Easy Packaging** - Built-in electron-builder configuration

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Desktop Framework**: Electron
- **Styling**: CSS3 with modern features
- **Package Manager**: npm/yarn/pnpm

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd app
npm install
```

### 2. Development Mode

```bash
# Start both Vite dev server and Electron
npm run electron:dev

# Or run them separately:
npm run dev          # Start Vite dev server
npm run electron     # Start Electron (in another terminal)
```

### 3. Build for Production

```bash
# Build the application
npm run electron:build

# Preview the built app
npm run electron:preview
```

## 📁 Project Structure

```
app/
├── electron/           # Electron main process files
│   ├── main.ts        # Main process entry point
│   └── preload.ts     # Preload script for security
├── src/               # React application source
│   ├── App.tsx        # Main App component
│   ├── App.css        # App-specific styles
│   ├── main.tsx       # React entry point
│   └── index.css      # Global styles
├── dist/              # Built React app (generated)
├── dist-electron/     # Built Electron files (generated)
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── index.html         # HTML entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build React app for production
- `npm run electron` - Start Electron app (waits for dev server)
- `npm run electron:dev` - Start both dev server and Electron
- `npm run electron:build` - Build and package the app
- `npm run electron:preview` - Preview the built app
- `npm run lint` - Run ESLint

## 🌟 Development Features

### Hot Module Replacement
The app supports HMR for both React components and Electron processes during development.

### TypeScript Support
Full TypeScript support with strict type checking and modern ES features.

### Electron Security
- Context isolation enabled
- Node integration disabled
- Secure preload scripts

### Modern CSS
- CSS Grid and Flexbox
- CSS Variables
- Responsive design
- Modern animations and transitions

## 📦 Building and Distribution

The app is configured with `electron-builder` for easy packaging:

- **Windows**: NSIS installer
- **macOS**: DMG package
- **Linux**: AppImage

Build outputs are placed in the `release/` directory.

## 🔒 Security Considerations

- Context isolation is enabled by default
- Node.js integration is disabled in renderer process
- All IPC communication goes through preload scripts
- External links open in default browser

## 🐛 Troubleshooting

### Common Issues

1. **Port 5173 already in use**: Kill the process using that port or change it in the config
2. **Electron won't start**: Make sure the Vite dev server is running first
3. **Build errors**: Clear `node_modules` and reinstall dependencies

### Debug Mode

For debugging, you can run:
```bash
npm run electron:dev
```

Then press F12 in the Electron window to open DevTools.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Electron](https://electronjs.org/) - Cross-platform desktop apps
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
