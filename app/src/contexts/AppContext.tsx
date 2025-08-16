import { createContext, useReducer, ReactNode } from 'react';
import type { AppState, User, AppSettings, AppConfig } from '@/types';
import type { AppAction, AppContextType } from './types';

// Initial state
const initialState: AppState = {
  user: null,
  settings: { theme: 'system' },
  config: {
    name: 'Electron App',
    version: '1.0.0',
    description: 'A modern Electron application',
    author: 'Developer',
  },
  isLoading: false,
  error: null,
  theme: 'system',
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_CONFIG':
      return { ...state, config: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload as 'light' | 'dark' | 'system' };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user: User | null) =>
      dispatch({ type: 'SET_USER', payload: user }),
    setSettings: (settings: AppSettings) =>
      dispatch({ type: 'SET_SETTINGS', payload: settings }),
    setConfig: (config: AppConfig) =>
      dispatch({ type: 'SET_CONFIG', payload: config }),
    setLoading: (loading: boolean) =>
      dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) =>
      dispatch({ type: 'SET_ERROR', payload: error }),
    setTheme: (theme: string) =>
      dispatch({ type: 'SET_THEME', payload: theme }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  };

  const value: AppContextType = {
    state,
    actions,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Export context for testing
export { AppContext };
