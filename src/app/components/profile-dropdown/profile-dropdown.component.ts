import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-dropdown.component.html'
})
export class ProfileDropdownComponent {
 
  isOpen = signal<boolean>(false);


  userName = computed(() => {
    const user = this.authService.currentUser();
    return user ? user.name : 'User';
  });


  userInitials = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return '??';
    
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  onLogout(): void {
    this.authService.logout().subscribe();
  }
}
