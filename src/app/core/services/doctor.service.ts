import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';
import { ApiResponse }            from '../../interfaces/api.interface';
import { Doctor }                 from '../../interfaces/doctor.interface';

/**
 * Doctor Service
 * 
 * Responsibilities:
 * - Fetch list of available doctors for appointment booking
 */
@Injectable({ providedIn: 'root' })
export class DoctorService {

  /** Base API URL from environment configuration */
  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch doctors who are currently available for appointments
   * @returns Observable of the API response containing an array of available doctors
   */
  getAvailableDoctors(): Observable<ApiResponse<Doctor[]>> {
    const params = new HttpParams().set('available', 'true');
    return this.http.get<ApiResponse<Doctor[]>>(
      `${this.api}/doctors`, { params }
    );
  }
}
