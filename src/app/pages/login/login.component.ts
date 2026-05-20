import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { LoginRequest } from '../../interfaces/auth.interface';
import { ToastService } from '../../core/services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  isSubmitting = signal<boolean>(false);

  
  errorMsg = signal<string>('');

 
  showPassword = signal<boolean>(false);


  isDarkMode = computed(() => this.themeService.isDarkMode());

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private toastService: ToastService,
  ) {
  
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {

        if (user.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (['nurse', 'staff'].includes(user.role)) {
          this.router.navigate(['/register-patient']);
        }
      }
    });
  }


  ngOnInit(): void {
      // console.log('LoginComponent initialized');
  }

 
  get email() {
    return this.loginForm.get('email')!;
  }


  get password() {
    return this.loginForm.get('password')!;
  }


  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }


  onSubmit(): void {
   
    this.errorMsg.set('');


    this.loginForm.markAllAsTouched();


    if (this.loginForm.invalid) {
      return;
    }


    this.isSubmitting.set(true);

   
    const payload: LoginRequest = {
      email: this.email.value!,
      password: this.password.value!,
    };


    this.authService.login(payload).subscribe({
      next: () => {
        this.toastService.success('Login Successful', 'Welcome back!');

        this.isSubmitting.set(false);
        if (this.authService.getRole() === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (['nurse', 'staff'].includes(this.authService.getRole())) {
          this.router.navigate(['/register-patient']);
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);


        const status = err.status;
        if (status === 401) {
          this.errorMsg.set('Invalid email or password');
        } else if (status === 403) {
          this.errorMsg.set('Account is inactive. Contact administrator');
        } else if (status === 400) {
          this.errorMsg.set('Please fill all fields correctly');
        } else {
          // Use server message if available, otherwise generic message
          this.errorMsg.set(err.error?.message ?? 'Something went wrong. Please try again.');
        }

        this.toastService.error('Login Failed', this.errorMsg());
      },
    });
  }
}
