import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { Doctor } from '../../interfaces/doctor.interface';
import { PatientListResponse } from '../../interfaces/patient.interface';
import { AppointmentListResponse } from '../../interfaces/appointment.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allDoctors = signal<Doctor[] >([]);
  allPatients = signal<PatientListResponse | null>(null);
  allAppointments = signal<AppointmentListResponse | null>(null);
  errorMsg = signal<string>('');

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
    console.log('DashboardComponent initialized');
  }

  private loadDashboardData(): void {
    this.dashboardService.getAllPatients().subscribe({
      next: (response) => {
        console.log('Patients res:', response);
        console.log('Patients res.data:', response.data);
        this.allPatients.set(response.data);
      },
      error: () => {
        this.errorMsg.set('Failed to load data.');
      },
    });
    this.dashboardService.getAllDoctors().subscribe({
      next: (response) => {
        console.log('Fetched doctors:', response.data);
        this.allDoctors.set(response.data);
      },
      error: () => {
        this.errorMsg.set('Failed to load data.');
      },
    });
    this.dashboardService.getAllAppointments().subscribe({
      next: (response) => {
        console.log('Fetched appointments:', response.data);
        this.allAppointments.set(response.data);
      },
      error: () => {
        this.errorMsg.set('Failed to load data.');
      },
    });
  }
}
