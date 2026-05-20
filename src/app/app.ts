import { Component, computed } from '@angular/core';
import { RouterOutlet }       from '@angular/router';
import { AuthService }        from './core/services/auth.service';
import { ThemeService }       from './core/services/theme.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private authService: AuthService,
    private themeService: ThemeService 
  ) {

    const token = localStorage.getItem('token')

    if (token) {

      this.authService.getMe().subscribe({
        next: (res) => {
  
          this.authService.currentUser.set(res.data);
        },
        error: (err) => {
  
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.authService.currentUser.set(null);
        }
      });
    }
  }


  isLoggedIn = computed(() => !!this.authService.currentUser());

  ngOnInit(): void {
    //  console.log('App Component initialized');
  }


}
