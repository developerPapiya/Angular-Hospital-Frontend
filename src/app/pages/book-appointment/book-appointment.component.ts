import { Component, OnInit, signal, effect } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PatientService } from '../../core/services/patient.service';
import { DoctorService } from '../../core/services/doctor.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { Patient } from '../../interfaces/patient.interface';
import { Doctor } from '../../interfaces/doctor.interface';
import { BookAppointmentRequest } from '../../interfaces/appointment.interface';
import { ToastService } from '../../core/services/toast.service';


@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {


  bookingForm = new FormGroup({
    patient_id:   new FormControl('', [Validators.required]),
    doctor_id:    new FormControl('', [Validators.required]),
    disease:      new FormControl('', [Validators.required, Validators.maxLength(200)]),
    symptoms:     new FormControl('', [Validators.required, Validators.maxLength(500)]),
    scheduled_at: new FormControl('', [Validators.required]),
    scheduled_time: new FormControl('', [Validators.required])
  });


  selectedPatient   = signal<Patient | null>(null);
  searchResults     = signal<Patient[] | null>(null);
  availableDoctors  = signal<Doctor[] | null>(null);
  isSearching       = signal<boolean>(false);
  isSubmitting      = signal<boolean>(false);
  errorMsg          = signal<string>('');
  successMsg        = signal<string>('');
  

  minDate = new Date().toISOString().split('T')[0];

 
  private searchSubject = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private toastService: ToastService
  ) {
   
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => this.performSearch(term));
  }

  ngOnInit(): void {
    this.checkQueryParams();
    this.loadDoctors();
  }

 
  get patientId()   { return this.bookingForm.get('patient_id')!; }
  get doctorId()    { return this.bookingForm.get('doctor_id')!; }
  get disease()     { return this.bookingForm.get('disease')!; }
  get symptoms()    { return this.bookingForm.get('symptoms')!; }
  get scheduledAt() { return this.bookingForm.get('scheduled_at')!; }
  get scheduledTime() { return this.bookingForm.get('scheduled_time')!; }

  
  private checkQueryParams(): void {
    const pId = this.route.snapshot.queryParamMap.get('patientId');
    if (pId) {
      this.patientService.getPatientById(pId).subscribe({
        next: (res) => this.selectPatient(res.data),
        error: () => this.toastService.error('Failed to load pre-filled patient.', 'Failed to load patient details.')
      });
    }
  }


  private loadDoctors(): void {
    this.doctorService.getAvailableDoctors().subscribe({
      next: (res) => this.availableDoctors.set(res.data),
      error: () => this.toastService.error('Failed to load doctors.', 'Failed to load available doctors.')
    });
  }


  onSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    if (term.length >= 3) {
      this.isSearching.set(true);
      this.searchSubject.next(term);
    } else {
      this.searchResults.set([]);
      this.isSearching.set(false);
    }
  }

 
  private performSearch(term: string): void {

    const isPhone = /^[0-9]+$/.test(term);
    const searchParams = isPhone ? { phone: term } : { name: term };

    this.patientService.searchPatients(searchParams).subscribe({
      next: (res) => {
        this.searchResults.set(res.data.patients);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.toastService.error('Patient search failed.', 'Failed to search for patients.');
      }
    });
  }


  selectPatient(patient: Patient): void {
    this.selectedPatient.set(patient);
    this.patientId.setValue(patient._id);
    this.searchResults.set([]);
    this.errorMsg.set('');
  }


  clearSelection(): void {
    this.selectedPatient.set(null);
    this.patientId.setValue('');
    this.searchResults.set([]);
  }


  onSubmit(): void {
    this.errorMsg.set('');
    this.successMsg.set('');
    this.bookingForm.markAllAsTouched();

    if (this.bookingForm.invalid) return;

    this.isSubmitting.set(true);

 
    const dateTimeString = `${this.scheduledAt.value!}T${this.scheduledTime.value!}:00`;
    const scheduledDateTime = new Date(dateTimeString).toISOString();

    const payload: BookAppointmentRequest = {
      patient_id:   this.patientId.value!,
      doctor_id:    this.doctorId.value!,
      disease:      this.disease.value!,
      symptoms:     this.symptoms.value!,
      scheduled_at: scheduledDateTime
    };

    this.appointmentService.bookAppointment(payload).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastService.success('Appointment Booked', 'Appointment booked successfully.');
        this.isSubmitting.set(false);
        
        // Open PDF slip
        this.appointmentService.openSlipInNewTab(res.data._id);
        
      
        this.bookingForm.reset();
        this.selectedPatient.set(null);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMsg.set(err.error?.message ?? 'Failed to book appointment.');
        this.toastService.error('Booking Failed', this.errorMsg());
      }
    });
  }
}
