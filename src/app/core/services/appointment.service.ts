import { Injectable }             from '@angular/core';
import { HttpClient }             from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';
import { ApiResponse }            from '../../interfaces/api.interface';
import { Appointment,
         BookAppointmentRequest, } from '../../interfaces/appointment.interface';


@Injectable({ providedIn: 'root' })
export class AppointmentService {


  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  bookAppointment(payload: BookAppointmentRequest): Observable<ApiResponse<Appointment>> {
    return this.http.post<ApiResponse<Appointment>>(
      `${this.api}/appointments`, payload
    );
  }


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
 
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');

        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      })
      .catch(err => console.error('[AppointmentService] Slip generation failed:', err));
  }
}
