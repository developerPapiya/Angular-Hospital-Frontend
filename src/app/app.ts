import { Component, computed } from '@angular/core';
import { RouterOutlet }       from '@angular/router';
import { AuthService }        from './core/services/auth.service';
import { ThemeService }       from './core/services/theme.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

/**
 * Root application component.
 *
 * Responsibilities:
 * - Renders the router outlet for page navigation
 * - Conditionally renders the navbar (only when user is logged in)
 * - Initializes global services like ThemeService
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private authService: AuthService,
    private themeService: ThemeService // Injected to trigger initialization
  ) {
    // Synchronously restore user session from localStorage
    // This must happen immediately so route guards have access to currentUser
    const token = localStorage.getItem('token')

    if (token) {
      // Session restored. Optionally refresh user profile from API in the background
      this.authService.getMe().subscribe({
        next: (res) => {
          // Update with fresh data from server
          this.authService.currentUser.set(res.data);
        },
        error: (err) => {
          // If token is invalid or expired, clear stored data
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.authService.currentUser.set(null);
        }
      });
    }
  }

    /**
   * Computed signal derived from AuthService.currentUser.
   * Returns true when a user is logged in (currentUser is not null).
   */
  isLoggedIn = computed(() => !!this.authService.currentUser());

  ngOnInit(): void {
     console.log('App Component initialized')
  }


}
