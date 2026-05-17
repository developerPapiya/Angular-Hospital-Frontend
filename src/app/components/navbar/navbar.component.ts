import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';

/**
 * Navbar Component
 * 
 * Responsibilities:
 * - Render hospital branding and navigation links
 * - Implement role-based link visibility
 * - Include ProfileDropdownComponent
 * - Provide global Theme Toggle
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileDropdownComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    ngOnInit(): void {
  console.log('Navbar component initialized');
  }


  /** Mobile menu state */
  isMobileMenuOpen = signal<boolean>(false);

  /** Computed signal for role-based navigation visibility */
  canRegisterOrBook = computed(() => 
    ['admin', 'staff', 'nurse'].includes(this.authService.getRole())
  );

  canSeeDashboard = computed(() =>
    this.authService.getRole() === 'admin'
  );

  /** Expose theme state to template */
  isDarkMode = computed(() => this.themeService.isDarkMode());

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  /** Toggle mobile menu */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  /** Toggle global theme */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
