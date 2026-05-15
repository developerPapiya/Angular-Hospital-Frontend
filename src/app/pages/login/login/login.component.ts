// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../../core/services/auth.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   isLoading = false;
//   errorMessage = '';

//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}


//   ngOnInit(): void {
//     this.initializeForm();
//     console.log(this.loginForm.invalid)
//   }
  

//   /**
//    * Initialize the login form with validators
//    */
//   private initializeForm(): void {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });

//   }

//   /**
//    * Handle login form submission
//    */
//   onSubmit(): void {
//     // Validate form
//     console.log(this.loginForm.invalid)
//     if (this.loginForm.invalid) {
//       this.errorMessage = 'Please fill all fields correctly';
//       return;
//     }

//     this.isLoading = !this.isLoading;
//     this.errorMessage = '';

//     // Get form values
//     const credentials = this.loginForm.value;

//     // Call auth service login method
//     this.authService.login(credentials).subscribe({
//       next: (response) => {
//         // Login successful
//         console.log('Login successful:', response);
//         this.isLoading = false;

//         // Redirect to dashboard or home
//         this.router.navigate(['/dashboard']);
//       },
//       error: (error) => {
//         // Handle error
//         this.isLoading = false;
        
//         if (error.status === 401) {
//           this.errorMessage = 'Invalid email or password';
//         } else if (error.status === 403) {
//           this.errorMessage = 'Account is inactive. Contact administrator';
//         } else if (error.status === 400) {
//           this.errorMessage = 'Validation failed';
//         } else {
//           this.errorMessage = 'An error occurred. Please try again.';
//         }

//         console.error('Login error:', error);
//       }
//     });
//   }

//   /**
//    * Get form control for template
//    */
//   get email() {
//     return this.loginForm.get('email');
//   }

//   get password() {
//     return this.loginForm.get('password');
//   }
// }

