import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Profile Dropdown Component
 * 
 * Responsibilities:
 * - Display user's initials in a circular avatar
 * - Show user's first name
 * - Display dropdown menu on hover
 * - Handle Logout functionality via AuthService
 */
@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-dropdown.component.html'
})
export class ProfileDropdownComponent {
  /** Signal to toggle dropdown visibility on hover */
  isOpen = signal<boolean>(false);

  /** Computed signal for User's full name */
  userName = computed(() => {
    const user = this.authService.currentUser();
    return user ? user.name : 'User';
  });

  /** Computed signal for User's initials (First letters of first and last name) */
  userInitials = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return '??';
    
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Triggers logout via AuthService
   * Redirects to login page happens automatically in AuthService
   */
  onLogout(): void {
    this.authService.logout().subscribe();
  }
}
