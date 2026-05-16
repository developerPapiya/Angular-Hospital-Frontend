import { HttpInterceptorFn } from '@angular/common/http';

/**
 * HTTP interceptor that automatically attaches the JWT Bearer token
 * to every outgoing HTTP request. The token is read from localStorage.
 *
 * Registered in app.config.ts via provideHttpClient(withInterceptors([...])).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Clone the request and set the Authorization header
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  // No token found — pass request through without modification
  return next(req);
};
