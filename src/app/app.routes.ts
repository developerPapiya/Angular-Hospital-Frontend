import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';

/**
 * Application route definitions.
 *
 * - /login is protected by noAuthGuard (redirects logged-in users to dashboard)
 * - All other routes are protected by authGuard (redirects unauthenticated users to login)
 * - Components are lazy-loaded for optimal bundle splitting
 * - Default route redirects to /register-patient
 * - Wildcard 404 also redirects to /register-patient
 */
export const routes: Routes = [
  // Public route — login page (only accessible to unauthenticated users)

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    title: 'Login — Hospital',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard — Hospital',
  },
  {
    path: 'register-patient',
    loadComponent: ()=>import('./pages/register-patient/register-patient.component')
    .then(m => m.RegisterPatientComponent),
    canActivate: [authGuard],
    title: 'Book Appointment'
  },
];
