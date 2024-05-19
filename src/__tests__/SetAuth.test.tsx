import { beforeEach, describe, expect, test } from 'vitest';

import type { LoginFormValues } from '../components/login/LoginForm';
import setAuth from '../utils/sendLoginData.ts';

// Mocking localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('setAuth function', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.localStorage.clear();
  });

  test('no fetch call is made when adminToken is missing', async () => {
    const values: LoginFormValues = { email: 'user@example.com', password: 'password123' };
    try {
      await setAuth(values);
    } catch (error) {
      expect(fetch).not.toHaveBeenCalled();
    }
  });

  test('console.debug is called with the correct error message when adminToken is missing', async () => {
    console.debug = vi.fn();
    const values: LoginFormValues = { email: 'user@example.com', password: 'password123' };
    try {
      await setAuth(values);
    } catch (error) {
      expect(console.debug).toHaveBeenCalledWith('Auth error: ', error);
    }
  });
});
