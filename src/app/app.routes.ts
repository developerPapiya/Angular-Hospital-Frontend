import { Routes }    from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

/**
 * Application route definitions.
 *
 * - /login is public (no guard)
 * - All other routes are protected by authGuard
 * - Components are lazy-loaded for optimal bundle splitting
 * - Default route redirects to /register-patient
 * - Wildcard 404 also redirects to /register-patient
 */
export const routes: Routes = [

  // Public route — login page (no auth required)

  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path:          'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent),
    title: 'Login — Hospital'
  },

];
