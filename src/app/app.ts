import { Component, computed } from '@angular/core';
import { RouterOutlet }       from '@angular/router';
import { AuthService }        from './core/services/auth.service';
import { ThemeService }       from './core/services/theme.service';
import { NavbarComponent } from './components/navbar/navbar.component';

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
  imports: [RouterOutlet, NavbarComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private authService: AuthService,
    private themeService: ThemeService // Injected to trigger initialization
  ) {}

  ngOnInit(): void {
  console.log('App component initialized');
  }

  /**
   * Computed signal derived from AuthService.currentUser.
   * Returns true when a user is logged in (currentUser is not null).
   */
  isLoggedIn = computed(() => !!this.authService.currentUser());
}
