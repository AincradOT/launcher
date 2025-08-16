import type { AppState, User, AppSettings, AppConfig } from '@/types';

export type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SETTINGS'; payload: AppSettings }
  | { type: 'SET_CONFIG'; payload: AppConfig }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'RESET_STATE' };

export type AppContextType = {
  state: AppState;
  actions: {
    setUser: (user: User | null) => void;
    setSettings: (settings: AppSettings) => void;
    setConfig: (config: AppConfig) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setTheme: (theme: string) => void;
    resetState: () => void;
  };
  dispatch: React.Dispatch<AppAction>;
};
