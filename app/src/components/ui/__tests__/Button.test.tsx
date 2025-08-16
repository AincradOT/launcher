import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeDefined();
      expect(button.classList.contains('bg-primary')).toBe(true);
      expect(button.classList.contains('h-10')).toBe(true);
    });

    it('should render with custom className', () => {
      render(<Button className="custom-class">Custom Button</Button>);

      const button = screen.getByRole('button', { name: 'Custom Button' });
      expect(button.classList.contains('custom-class')).toBe(true);
    });

    it('should render with different variants', () => {
      const { rerender } = render(
        <Button variant="destructive">Destructive</Button>
      );
      expect(
        screen.getByRole('button').classList.contains('bg-destructive')
      ).toBe(true);

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button').classList.contains('border')).toBe(
        true
      );

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(
        screen.getByRole('button').classList.contains('bg-secondary')
      ).toBe(true);

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(
        screen.getByRole('button').classList.contains('hover:bg-accent')
      ).toBe(true);

      rerender(<Button variant="link">Link</Button>);
      expect(
        screen.getByRole('button').classList.contains('underline-offset-4')
      ).toBe(true);
    });

    it('should render with different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button').classList.contains('h-9')).toBe(true);

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button').classList.contains('h-11')).toBe(true);

      rerender(<Button size="icon">Icon</Button>);
      expect(screen.getByRole('button').classList.contains('w-10')).toBe(true);
    });

    it('should render loading state', () => {
      render(<Button isLoading>Loading</Button>);

      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      expect(button.querySelector('svg')).toBeTruthy();
      expect(
        button.querySelector('svg')?.classList.contains('animate-spin')
      ).toBe(true);
    });

    it('should render disabled state', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      expect(button.classList.contains('disabled:opacity-50')).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} isLoading>
          Loading
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
