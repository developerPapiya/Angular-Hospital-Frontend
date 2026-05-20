import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { Doctor } from '../../interfaces/doctor.interface';
import { PatientListResponse } from '../../interfaces/patient.interface';
import { AppointmentListResponse } from '../../interfaces/appointment.interface';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allDoctors = signal<Doctor[] | null>(null);
  allPatients = signal<PatientListResponse | null>(null);
  allAppointments = signal<AppointmentListResponse | null>(null);

  constructor(private dashboardService: DashboardService, private toastService: ToastService) {}

  ngOnInit() {
    this.loadDashboardData();
    // console.log('DashboardComponent initialized');
  }

  private loadDashboardData(): void {
    this.dashboardService.getAllPatients().subscribe({
      next: (response) => {
        // console.log('Patients res:', response);
        // console.log('Patients res.data:', response.data);
        this.allPatients.set(response.data);
      },
      error: () => {
        this.toastService.error('Failed to load patient data.', 'error');
      },
    });
    this.dashboardService.getAllDoctors().subscribe({
      next: (response) => {
        // console.log('Fetched doctors:', response.data);
        this.allDoctors.set(response.data);
      },
      error: () => {
        this.toastService.error('Failed to load doctor data.', 'error');
      },
    });
    this.dashboardService.getAllAppointments().subscribe({
      next: (response) => {
        // console.log('Fetched appointments:', response.data);
        this.allAppointments.set(response.data);
      },
      error: () => {
        this.toastService.error('Failed to load appointment data.', 'error');
      },
    });
  }
}
