import { ApplicationConfig,
         provideBrowserGlobalErrorListeners,
         provideZoneChangeDetection }  from '@angular/core';
import { provideRouter }              from '@angular/router';
import { provideHttpClient,
         withInterceptors }           from '@angular/common/http';
import { routes }                     from './app.routes';
import { authInterceptor }            from './core/interceptors/auth.interceptor';

/**
 * Root application configuration.
 *
 * Registers:
 * - Router with lazy-loaded routes
 * - HttpClient with auth interceptor (Bearer token injection)
 * - Zone.js change detection with event coalescing
 * - Global error listeners for production error reporting
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
