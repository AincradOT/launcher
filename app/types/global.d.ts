// Global type definitions for the Aincrad Launcher

declare global {
  // Environment variables
  interface Window {
    // Electron IPC renderer
    ipcRenderer: import('electron').IpcRenderer;
    
    // App-specific globals
    __APP_VERSION__: string;
    __APP_NAME__: string;
    __BUILD_DATE__: string;
  }

  // Node.js process extensions
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      VITE_DEV_SERVER_URL?: string;
      VITE_PUBLIC: string;
      APP_ROOT: string;
      
      // App-specific environment variables
      VITE_APP_NAME?: string;
      VITE_APP_VERSION?: string;
      VITE_API_URL?: string;
    }
  }
}

// Make this a module
export {};
