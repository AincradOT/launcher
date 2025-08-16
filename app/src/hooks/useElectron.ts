import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for Electron functionality
 * Provides access to Electron IPC methods and app information
 */
export function useElectron() {
  const [appVersion, setAppVersion] = useState<string>('');
  const [appName, setAppName] = useState<string>('');

  // Get app information on mount
  useEffect(() => {
    const getAppInfo = async () => {
      try {
        if (window.ipcRenderer) {
          const version = await window.ipcRenderer.invoke('app:get-version') as string;
          const name = await window.ipcRenderer.invoke('app:get-name') as string;
          setAppVersion(version);
          setAppName(name);
        }
      } catch (error) {
        console.error('Error getting app info:', error);
      }
    };

    getAppInfo();
  }, []);

  // Show error dialog
  const showErrorDialog = useCallback(
    async (title: string, content: string) => {
      try {
        if (window.ipcRenderer) {
          await window.ipcRenderer.invoke(
            'app:show-error-dialog',
            title,
            content
          );
        }
      } catch (error) {
        console.error('Error showing error dialog:', error);
      }
    },
    []
  );

  // Show message box
  const showMessageBox = useCallback(
    async (options: Electron.MessageBoxOptions) => {
      try {
        if (window.ipcRenderer) {
          return await window.ipcRenderer.invoke(
            'app:show-message-box',
            options
          );
        }
        return undefined;
      } catch (error) {
        console.error('Error showing message box:', error);
        return undefined;
      }
    },
    []
  );

  // Listen for main process messages
  useEffect(() => {
    if (!window.ipcRenderer) {
      return;
    }

    const handleMainProcessMessage = (
      _event: Electron.IpcRendererEvent,
      message: string
    ) => {
      console.log('Main process message:', message);
    };

    const handleAppError = (
      _event: Electron.IpcRendererEvent,
      error: unknown
    ) => {
      console.error('App error:', error);
    };

    // Check if the methods exist before using them
    if (window.ipcRenderer.on) {
      window.ipcRenderer.on('main-process-message', handleMainProcessMessage);
      window.ipcRenderer.on('app:error', handleAppError);
    }

    return () => {
      // Check if the methods exist before using them
      if (window.ipcRenderer.removeListener) {
        window.ipcRenderer.removeListener(
          'main-process-message',
          handleMainProcessMessage
        );
        window.ipcRenderer.removeListener('app:error', handleAppError);
      } else if (window.ipcRenderer.off) {
        // Fallback to 'off' method if 'removeListener' doesn't exist
        window.ipcRenderer.off(
          'main-process-message',
          handleMainProcessMessage
        );
        window.ipcRenderer.off('app:error', handleAppError);
      }
    };
  }, []);

  return {
    appVersion,
    appName,
    showErrorDialog,
    showMessageBox,
    isElectron: !!window.ipcRenderer,
  };
}
