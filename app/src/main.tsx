import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from '@/contexts/AppContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on(
  'main-process-message',
  (_event: Electron.IpcRendererEvent, message: string) => {
    console.log(message);
  }
);
