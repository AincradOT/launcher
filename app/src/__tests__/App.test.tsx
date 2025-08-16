import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { AppProvider } from '../contexts/AppContext';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
    expect(screen.getByText('Welcome to Aincrad Launcher')).toBeTruthy();
  });

  it('displays the count button', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    );
    expect(screen.getByText(/Count is/)).toBeTruthy();
  });
});
