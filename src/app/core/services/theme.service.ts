import { Injectable, signal } from '@angular/core';

/**
 * Theme Service
 * 
 * Responsibilities:
 * - Manage global Dark/Light mode state
 * - Persist theme preference to localStorage
 * - Apply 'dark' class to the root document element
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Reactive signal for the current theme state */
  isDarkMode = signal<boolean>(true);

  constructor() {
    this.initTheme();
  }

  /**
   * Initialize theme from localStorage or system preference.
   * Default to 'dark' for this project's premium aesthetic.
   */
  private initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    
    // If no saved theme, default to dark
    if (savedTheme === 'light') {
      this.setLightMode();
    } else {
      this.setDarkMode();
    }
  }

  /**
   * Toggle between dark and light mode
   */
  toggleTheme(): void {
    if (this.isDarkMode()) {
      this.setLightMode();
    } else {
      this.setDarkMode();
    }
  }

  private setDarkMode(): void {
    this.isDarkMode.set(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  private setLightMode(): void {
    this.isDarkMode.set(false);
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
