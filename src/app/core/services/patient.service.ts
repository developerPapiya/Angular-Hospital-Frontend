import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';
import { ApiResponse }            from '../../interfaces/api.interface';
import { Patient,
         RegisterPatientRequest,
         PatientSearchParams,
         PatientListResponse }    from '../../interfaces/patient.interface';


@Injectable({ providedIn: 'root' })
export class PatientService {


  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  registerPatient(payload:RegisterPatientRequest):Observable<ApiResponse<Patient>>{
  return this.http.post<ApiResponse<Patient>>(
    `${this.api}/patients`, payload
  );
}

  searchPatients(params: PatientSearchParams): Observable<ApiResponse<PatientListResponse>> {
    let httpParams = new HttpParams();
    
    
    if (params.name)  httpParams = httpParams.set('name',  params.name);
    if (params.phone) httpParams = httpParams.set('phone', params.phone);
    if (params.page)  httpParams = httpParams.set('page',  params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    
    return this.http.get<ApiResponse<PatientListResponse>>(
      `${this.api}/patients`, { params: httpParams }
    );
  }


  getPatientById(id: string): Observable<ApiResponse<Patient>> {
    return this.http.get<ApiResponse<Patient>>(`${this.api}/patients/${id}`);
  }
}
