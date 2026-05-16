import { Injectable, signal }        from '@angular/core';
import { HttpClient }                 from '@angular/common/http';
import { Observable, tap }            from 'rxjs';
import { Router }                     from '@angular/router';
import { environment }                from '../../../environments/environment';
import { ApiResponse }                from '../../interfaces/api.interface';
import { LoginRequest,
         LoginResponseData,
         UserProfile }                from '../../interfaces/auth.interface';

/**
 * AuthService — handles all authentication-related API calls and state.
 *
 * Responsibilities:
 * - Login (POST /auth/login) with JWT token storage
 * - Logout (POST /auth/logout) with cleanup and redirect
 * - Fetch current user profile (GET /auth/me)
 * - Maintain a reactive `currentUser` signal for global access
 * - Restore user session from localStorage on app boot
 *
 * Usage: Inject via constructor in components and other services.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  /** Base API URL from environment configuration */
  private api = environment.apiBaseUrl;

  /**
   * Global signal — holds the currently logged-in user profile.
   * Null when no user is authenticated.
   * Components can read this reactively to update UI based on auth state.
   */
  currentUser = signal<UserProfile | null>(null);

  constructor(
    private http:   HttpClient,
    public  router: Router
  ) {
    // Restore user from localStorage on app boot
    // This ensures the user session persists across page refreshes
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        this.currentUser.set(JSON.parse(stored));
      } catch {
        // If stored data is corrupted, clean up
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }

  /**
   * Authenticate user with email and password.
   * On success: stores JWT token and user profile in localStorage,
   * updates the currentUser signal.
   *
   * @param payload - LoginRequest with email and password
   * @returns Observable of the API response containing token and user data
   */
  login(payload: LoginRequest): Observable<ApiResponse<LoginResponseData>> {
    return this.http.post<ApiResponse<LoginResponseData>>(
      `${this.api}/auth/login`, payload
    ).pipe(
      tap(res => {
        // Store token for auth interceptor
        localStorage.setItem('token', res.data.token);
        // Store user profile for session persistence
        localStorage.setItem('user', JSON.stringify(res.data.user));
        // Update reactive signal so all subscribed components react
        this.currentUser.set(res.data.user);
      })
    );
  }

  /**
   * Logout the current user.
   * Calls the backend logout endpoint, then clears all local auth data
   * and redirects to the login page.
   *
   * @returns Observable of the API response
   */
  logout(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.api}/auth/logout`, {}
    ).pipe(
      tap(() => {
        // Clear all stored auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Reset the current user signal
        this.currentUser.set(null);
        // Navigate to login page
        this.router.navigate(['/login']);
      })
    );
  }

  /**
   * Fetch the authenticated user's profile from the server.
   * Uses the Bearer token (injected by auth interceptor) for authentication.
   *
   * @returns Observable of the API response containing the user profile
   */
  getMe(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.api}/auth/me`);
  }

  /**
   * Check if a user is currently logged in.
   * Based on the presence of a JWT token in localStorage.
   *
   * @returns true if a token exists in localStorage
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get the current user's role.
   * Returns empty string if no user is logged in.
   *
   * @returns The user's role ('admin', 'staff', 'nurse') or empty string
   */
  getRole(): string {
    return this.currentUser()?.role ?? '';
  }
}
