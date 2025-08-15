import '@testing-library/jest-dom';

// Mock electron for tests
global.electron = {
  ipcRenderer: {
    send: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn(),
  },
};
