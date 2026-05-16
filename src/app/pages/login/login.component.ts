import { Component, OnInit, signal, computed } from '@angular/core';
import { FormGroup, FormControl,
         Validators, ReactiveFormsModule }        from '@angular/forms';
import { Router }                                 from '@angular/router';
import { AuthService }                            from '../../core/services/auth.service';
import { ThemeService }                           from '../../core/services/theme.service';
import { LoginRequest }                           from '../../interfaces/auth.interface';

/**
 * Login page component.
 *
 * Responsibilities:
 * - Display email + password reactive form
 * - Call AuthService.login() on submit
 * - On success: redirect to /register-patient
 * - On error: show contextual error messages (401, 403, 400)
 * - Uses ThemeService for dark/light mode toggle
 *
 * Route: /login | Access: Public
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  /** Reactive form with email and password controls */
  loginForm = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  /** Signal: disables submit button and shows loading spinner */
  isSubmitting = signal<boolean>(false);

  /** Signal: displays API or validation error messages */
  errorMsg = signal<string>('');

  /** Signal: toggles password field visibility */
  showPassword = signal<boolean>(false);

  /** Expose theme state to template */
  isDarkMode = computed(() => this.themeService.isDarkMode());

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router:      Router
  ) {}

  /**
   * On component init:
   * - If user is already logged in (token exists), redirect to register-patient
   */
  ngOnInit(): void {
    console.log('LoginComponent initialized');
    // If already logged in, skip login page
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/register-patient']);
      return;
    }
  }

  // ── Form control getters for template access ──

  /** Getter for the email form control */
  get email() { return this.loginForm.get('email')!; }

  /** Getter for the password form control */
  get password() { return this.loginForm.get('password')!; }

  /**
   * Toggle password field between text and password type.
   */
  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  /**
   * Toggle between dark and light mode via ThemeService.
   */
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Handle form submission.
   * Validates the form, calls AuthService.login(), and handles success/error.
   *
   * Error handling by HTTP status:
   * - 401 → Invalid email or password
   * - 403 → Account is inactive
   * - 400 → Please fill all fields correctly
   * - Other → Generic error or server message
   */
  onSubmit(): void {
    // Clear any previous error message
    this.errorMsg.set('');

    // Mark all fields as touched to trigger validation display
    this.loginForm.markAllAsTouched();

    // Don't submit if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Set loading state
    this.isSubmitting.set(true);

    // Build the login request payload
    const payload: LoginRequest = {
      email:    this.email.value!,
      password: this.password.value!
    };

    // Call AuthService.login() — follows the doc's API error handling pattern
    this.authService.login(payload).subscribe({
      next: () => {
        // Success — redirect to register-patient page
        this.isSubmitting.set(false);
        this.router.navigate(['/register-patient']);
      },
      error: (err) => {
        this.isSubmitting.set(false);

        // Handle specific HTTP error statuses
        const status = err.status;
        if (status === 401) {
          this.errorMsg.set('Invalid email or password');
        } else if (status === 403) {
          this.errorMsg.set('Account is inactive. Contact administrator');
        } else if (status === 400) {
          this.errorMsg.set('Please fill all fields correctly');
        } else {
          // Use server message if available, otherwise generic message
          this.errorMsg.set(
            err.error?.message ?? 'Something went wrong. Please try again.'
          );
        }
      }
    });
  }
}
