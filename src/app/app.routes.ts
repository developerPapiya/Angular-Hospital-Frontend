import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [


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
    path: 'book-appointment',
    loadComponent: () =>
      import('./pages/book-appointment/book-appointment.component').then( (m) => m.BookAppointmentComponent),
    canActivate: [authGuard],
    title: 'Book Appointment — Hospital',
  },
   {
    path: 'register-patient',
    loadComponent: ()=>import('./pages/register-patient/register-patient.component')
    .then(m => m.RegisterPatientComponent),
    canActivate: [authGuard],
    title: 'Register Patient — Hospital'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page Not Found — Hospital',
  },
];
