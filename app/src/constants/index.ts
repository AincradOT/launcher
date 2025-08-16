// App Configuration
export const APP_CONFIG = {
  NAME: 'Aincrad Launcher',
  VERSION: '1.0.0',
  DESCRIPTION: 'A modern game launcher built with Electron and React',
  AUTHOR: 'AincradOT',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'app-theme',
  USER_PREFERENCES: 'user-preferences',
} as const;

// Theme Configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Supported Languages (currently only English)
export const LANGUAGES = {
  EN: 'en',
} as const;
