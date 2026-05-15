// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   CanActivateChild,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.checkAuth(state.url, route);
//   }

//   canActivateChild(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.checkAuth(state.url, route);
//   }

//   private checkAuth(url: string, route: ActivatedRouteSnapshot): boolean | UrlTree {
//     // Check if user is authenticated
//     if (this.authService.isAuthenticated()) {
//       // Check role-based access if required
//       const requiredRole = route.data['role'];
      
//       if (requiredRole) {
//         const userRole = this.authService.getUserRole();
        
//         // If user has required role, allow access
//         if (userRole === requiredRole || requiredRole.includes(userRole)) {
//           return true;
//         }
        
//         // No permission
//         this.router.navigate(['/unauthorized']);
//         return false;
//       }

//       // No role requirement, allow access
//       return true;
//     }

//     // Not authenticated, save URL and redirect to login
//     this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
//     return false;
//   }
// }