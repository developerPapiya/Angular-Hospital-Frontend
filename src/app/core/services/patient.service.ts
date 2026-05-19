import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Patient, RegisterPatientRequest } from '../../interfaces/patient.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private api = environment.apiBaseUrl;

constructor(private http:HttpClient) { }

registerPatient(payload:RegisterPatientRequest):Observable<ApiResponse<Patient>>{
  return this.http.post<ApiResponse<Patient>>(
    `${this.api}/patients`, payload
  );
}

}
