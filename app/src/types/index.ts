// App Types
export interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
}

// App Settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
}

// App State
export interface AppState {
  user: User | null;
  settings: AppSettings | null;
  config: AppConfig | null;
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark' | 'system';
}
