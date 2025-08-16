import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should initialize with the provided initial value', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    );
    const [value] = result.current;

    expect(value).toBe('initial-value');
  });

  it('should retrieve existing value from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('"existing-value"');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'default-value')
    );
    const [value] = result.current;

    expect(value).toBe('existing-value');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
    
    // Reset the mock to prevent affecting other tests
    localStorageMock.getItem.mockRestore();
  });

  it('should set value in localStorage when updated', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    );
    const [, setValue] = result.current;

    act(() => {
      setValue('new-value');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      '"new-value"'
    );
  });

  it('should handle function updates like useState', () => {
    // Clear any existing values to ensure clean state
    localStorageMock.clear();
    
    const { result } = renderHook(() => useLocalStorage('test-key', 0));
    const [, setValue] = result.current;

    act(() => {
      setValue(prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('should remove value from localStorage when removeValue is called', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    );
    const [, , removeValue] = result.current;

    act(() => {
      removeValue();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
    expect(result.current[0]).toBe('initial-value');
  });

  it('should handle JSON parsing errors gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'fallback-value')
    );
    const [value] = result.current;

    expect(value).toBe('fallback-value');
    
    // Reset the mock to prevent affecting other tests
    localStorageMock.getItem.mockRestore();
  });

  it('should handle localStorage errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const { result } = renderHook(() =>
      useLocalStorage('test-key', 'initial-value')
    );
    const [, setValue] = result.current;

    act(() => {
      setValue('new-value');
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should work with complex objects', () => {
    const complexObject = {
      name: 'test',
      items: [1, 2, 3],
      nested: { value: true },
    };

    const { result } = renderHook(() =>
      useLocalStorage('test-key', complexObject)
    );
    const [value, setValue] = result.current;

    expect(value).toEqual(complexObject);

    const updatedObject = { ...complexObject, newProperty: 'added' };

    act(() => {
      setValue(updatedObject);
    });

    expect(result.current[0]).toEqual(updatedObject);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify(updatedObject)
    );
  });

  it('should work with arrays', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', [1, 2, 3]));
    const [value, setValue] = result.current;

    expect(value).toEqual([1, 2, 3]);

    act(() => {
      setValue([4, 5, 6]);
    });

    expect(result.current[0]).toEqual([4, 5, 6]);
  });

  it('should work with numbers', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 42));
    const [value, setValue] = result.current;

    expect(value).toBe(42);

    act(() => {
      setValue(100);
    });

    expect(result.current[0]).toBe(100);
  });

  it('should work with booleans', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', false));
    const [value, setValue] = result.current;

    expect(value).toBe(false);

    act(() => {
      setValue(true);
    });

    expect(result.current[0]).toBe(true);
  });
});
