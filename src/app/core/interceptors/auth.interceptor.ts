// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
//     // Get token from AuthService
//     const token = this.authService.getToken();

//     // Clone request and add Authorization header if token exists
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     // Send request and handle errors
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // If 401 (Unauthorized), token expired or invalid
//         if (error.status === 401) {
//           // Clear auth data
//           this.authService.logout();
//           // Redirect to login
//           this.router.navigate(['/login']);
//         }

//         // If 403 (Forbidden), no permission
//         if (error.status === 403) {
//           this.router.navigate(['/unauthorized']);
//         }

//         return throwError(() => error);
//       })
//     );
//   }
// }