import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.interface';
import { Doctor } from '../../interfaces/doctor.interface';
import { PatientListResponse } from '../../interfaces/patient.interface';
import { AppointmentListResponse } from '../../interfaces/appointment.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

private api = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<ApiResponse<Doctor[]>> {
    return this.http.get<ApiResponse<Doctor[]>>(`${this.api}/doctors`);
  }

  getAllPatients(): Observable<ApiResponse<PatientListResponse>> {
    return this.http.get<ApiResponse<PatientListResponse>>(`${this.api}/patients`);
  }

  getAllAppointments(): Observable<ApiResponse<AppointmentListResponse>> {
    return this.http.get<ApiResponse<AppointmentListResponse>>(`${this.api}/appointments`);
  }
}
