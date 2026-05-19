import { Injectable }             from '@angular/core';
import { HttpClient }             from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';
import { ApiResponse }            from '../../interfaces/api.interface';
import { Appointment,
         BookAppointmentRequest, } from '../../interfaces/appointment.interface';

/**
 * Appointment Service
 * 
 * Responsibilities:
 * - Book a new appointment for a patient
 * - Retrieve list of appointments (optional filtering by date)
 * - Handle PDF slip generation and display
 */
@Injectable({ providedIn: 'root' })
export class AppointmentService {

  /** Base API URL from environment configuration */
  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Submit a new appointment booking request
   * @param payload - BookAppointmentRequest details
   * @returns Observable of the API response containing the new Appointment record
   */
  bookAppointment(payload: BookAppointmentRequest): Observable<ApiResponse<Appointment>> {
    return this.http.post<ApiResponse<Appointment>>(
      `${this.api}/appointments`, payload
    );
  }


  /**
   * Generate and open the appointment slip in a new browser tab.
   * Uses the native fetch API because the endpoint streams a binary PDF blob,
   * which requires 'Authorization' headers and 'blob' response type.
   * 
   * @param appointmentId - MongoDB _id of the appointment
   */
  openSlipInNewTab(appointmentId: string): void {
    const token = localStorage.getItem('token');
    const url   = `${this.api}/appointments/${appointmentId}/slip`;

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch slip');
        return res.blob();
      })
      .then(blob => {
        // Create a temporary URL for the blob and open it in a new tab
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        // Clean up memory after a short delay
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      })
      .catch(err => console.error('[AppointmentService] Slip generation failed:', err));
  }
}
