import '@testing-library/jest-dom/vitest';

// Proper Window typing for ipcRenderer:
declare global {
  interface Window {
    ipcRenderer: {
      invoke: ReturnType<typeof vi.fn>;
      on: ReturnType<typeof vi.fn>;
      off: ReturnType<typeof vi.fn>;
      removeListener: ReturnType<typeof vi.fn>;
      send: ReturnType<typeof vi.fn>;
    };
  }
}

// Mock Electron IPC renderer for tests
Object.defineProperty(window, 'ipcRenderer', {
  value: {
    invoke: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    removeListener: vi.fn(),
    send: vi.fn(),
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
