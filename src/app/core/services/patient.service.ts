import { Injectable }             from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';
import { ApiResponse }            from '../../interfaces/api.interface';
import { Patient,
         RegisterPatientRequest,
         PatientSearchParams,
         PatientListResponse }    from '../../interfaces/patient.interface';

/**
 * Patient Service
 * 
 * Responsibilities:
 * - Register a new patient in the system
 * - Search for existing patients by name or phone
 * - Retrieve patient details by MongoDB ID
 * 
 * All calls are authenticated via the AuthInterceptor.
 */
@Injectable({ providedIn: 'root' })
export class PatientService {

  /** Base API URL from environment configuration */
  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  /**
   * Search for patients with optional filters
   * @param params - PatientSearchParams including name, phone, page, limit
   * @returns Observable of the API response containing a paginated list of Patients
   */
  searchPatients(params: PatientSearchParams): Observable<ApiResponse<PatientListResponse>> {
    let httpParams = new HttpParams();
    
    // Add query parameters if they exist
    if (params.name)  httpParams = httpParams.set('name',  params.name);
    if (params.phone) httpParams = httpParams.set('phone', params.phone);
    if (params.page)  httpParams = httpParams.set('page',  params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    
    return this.http.get<ApiResponse<PatientListResponse>>(
      `${this.api}/patients`, { params: httpParams }
    );
  }

  /**
   * Get a single patient by their ID
   * @param id - MongoDB _id of the patient
   * @returns Observable of the API response containing the Patient detail
   */
  getPatientById(id: string): Observable<ApiResponse<Patient>> {
    return this.http.get<ApiResponse<Patient>>(`${this.api}/patients/${id}`);
  }
}
