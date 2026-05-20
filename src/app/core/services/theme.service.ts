import { Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ThemeService {
 
  isDarkMode = signal<boolean>(true);

  constructor() {
    this.initTheme();
  }


  private initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    
    
    if (savedTheme === 'light') {
      this.setLightMode();
    } else {
      this.setDarkMode();
    }
  }

  
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
