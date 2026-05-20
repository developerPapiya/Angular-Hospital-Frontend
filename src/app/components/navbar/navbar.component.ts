import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileDropdownComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    ngOnInit(): void {
  // console.log('Navbar component initialized');
  }



  isMobileMenuOpen = signal<boolean>(false);


  canRegisterOrBook = computed(() => 
    ['admin', 'staff', 'nurse'].includes(this.authService.getRole())
  );

  canSeeDashboard = computed(() =>
    this.authService.getRole() === 'admin'
  );


  isDarkMode = computed(() => this.themeService.isDarkMode());

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}


  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }


  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
