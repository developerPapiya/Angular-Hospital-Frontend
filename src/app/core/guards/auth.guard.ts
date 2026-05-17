import { CanActivateFn } from '@angular/router';
import { inject }        from '@angular/core';
import { Router }        from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Route guard that protects authenticated routes.
 * Checks for a JWT token in localStorage.
 *
 * - If token exists → allows navigation (returns true)
 * - If no token → redirects to /login and blocks navigation (returns false)
 *
 * Note: inject() is permitted inside functional guards (CanActivateFn).
 * This is the Angular 17+ standard for functional route guards.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token  = localStorage.getItem('token');

  
  if (token) {
    return true;
  }

  // No token found — redirect to login page
  router.navigate(['/login']);
  return false;
};
