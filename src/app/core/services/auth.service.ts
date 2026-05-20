import { Injectable, signal }        from '@angular/core';
import { HttpClient }                 from '@angular/common/http';
import { Observable, tap }            from 'rxjs';
import { Router }                     from '@angular/router';
import { environment }                from '../../../environments/environment';
import { ApiResponse }                from '../../interfaces/api.interface';
import { LoginRequest,
         LoginResponseData,
         UserProfile }                from '../../interfaces/auth.interface';


@Injectable({ providedIn: 'root' })
export class AuthService {


  private api = environment.apiBaseUrl;


  currentUser = signal<UserProfile | null>(null);

  constructor(
    private http:   HttpClient,
    public  router: Router
  ) {

  }



  login(payload: LoginRequest): Observable<ApiResponse<LoginResponseData>> {
    return this.http.post<ApiResponse<LoginResponseData>>(
      `${this.api}/auth/login`, payload
    ).pipe(
      tap(res => {

        localStorage.setItem('token', res.data.token);
   
        localStorage.setItem('user', JSON.stringify(res.data.user));
   
        this.currentUser.set(res.data.user);
      })
    );
  }


  logout(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.api}/auth/logout`, {}
    ).pipe(
      tap(() => {
  
        localStorage.removeItem('token');
        localStorage.removeItem('user');
   
        this.currentUser.set(null);
  
        this.router.navigate(['/login']);
      })
    );
  }


  getMe(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.api}/auth/me`);
  }

 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

 
  getRole(): string {
    return this.currentUser()?.role ?? '';
  }
}
