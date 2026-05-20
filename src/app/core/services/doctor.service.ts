import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';
import { ApiResponse }            from '../../interfaces/api.interface';
import { Doctor }                 from '../../interfaces/doctor.interface';


@Injectable({ providedIn: 'root' })
export class DoctorService {


  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  getAvailableDoctors(): Observable<ApiResponse<Doctor[]>> {
    const params = new HttpParams().set('available', 'true');
    return this.http.get<ApiResponse<Doctor[]>>(
      `${this.api}/doctors`, { params }
    );
  }
}
