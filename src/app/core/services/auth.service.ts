// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap, map } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { LoginRequest, LoginResponse, User, AuthState } from '../../interfaces/auth.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = `${environment.apiBaseUrl}/api/v1/auth`;
  
//   // BehaviorSubject stores current auth state
//   private authState = new BehaviorSubject<AuthState>({
//     token: this.getToken(),
//     user: this.getUser(),
//     isAuthenticated: !!this.getToken()
//   });

//   public auth$ = this.authState.asObservable();

//   constructor(private http: HttpClient) {}

//   /**
//    * Login Method
//    * - Sends email & password to backend
//    * - Stores token & user data on success
//    * - Updates auth state
//    */
//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
//       tap(response => {
//         // Save token to localStorage
//         localStorage.setItem('auth_token', response.data.token);
//         // Save user data to localStorage
//         localStorage.setItem('user_data', JSON.stringify(response.data.user));
        
//         // Update auth state
//         this.authState.next({
//           token: response.data.token,
//           user: response.data.user,
//           isAuthenticated: true
//         });
//       })
//     );
//   }

//   /**
//    * Logout Method
//    * - Clears stored data
//    * - Updates auth state
//    */
//   logout(): void {
//     localStorage.removeItem('auth_token');
//     localStorage.removeItem('user_data');
    
//     this.authState.next({
//       token: null,
//       user: null,
//       isAuthenticated: false
//     });
//   }

//   /**
//    * Get Token from localStorage
//    */
//   getToken(): string | null {
//     return localStorage.getItem('auth_token');
//   }

//   /**
//    * Get User from localStorage
//    */
//   getUser(): User | null {
//     const userData = localStorage.getItem('user_data');
//     return userData ? JSON.parse(userData) : null;
//   }

//   /**
//    * Check if user is authenticated
//    */
//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   /**
//    * Get Current User Observable
//    */
//   getCurrentUser(): Observable<User | null> {
//     return this.auth$.pipe(
//       map((state: AuthState) => state.user)
//     );
//   }

//   /**
//    * Get User Role
//    */
//   getUserRole(): string | null {
//     const user = this.getUser();
//     return user ? user.role : null;
//   }
// }