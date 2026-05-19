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

/**
 * Book Appointment Page Component
 * 
 * Responsibilities:
 * - Handle patient selection (via search or pre-filled from Register page)
 * - Load available doctors
 * - Implement booking form with validation (no past dates)
 * - Trigger PDF slip generation on success
 * 
 * Mode A: Arrive with query params -> Patient pre-filled
 * Mode B: Direct arrival -> Search patient manually
 */
@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {

  /** Booking form group */
  bookingForm = new FormGroup({
    patient_id:   new FormControl('', [Validators.required]),
    doctor_id:    new FormControl('', [Validators.required]),
    disease:      new FormControl('', [Validators.required, Validators.maxLength(200)]),
    symptoms:     new FormControl('', [Validators.required, Validators.maxLength(500)]),
    scheduled_at: new FormControl('', [Validators.required])
  });

  // ── Signals for state management ──
  selectedPatient   = signal<Patient | null>(null);
  searchResults     = signal<Patient[] | null>(null);
  availableDoctors  = signal<Doctor[] | null>(null);
  isSearching       = signal<boolean>(false);
  isSubmitting      = signal<boolean>(false);
  errorMsg          = signal<string>('');
  successMsg        = signal<string>('');
  
  /** Minimum date for the date picker (today) */
  minDate = new Date().toISOString().split('T')[0];

  /** Subject for debounced patient searching */
  private searchSubject = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {
    // Setup debounced search effect
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => this.performSearch(term));
  }

  ngOnInit(): void {
    this.checkQueryParams();
    this.loadDoctors();
  }

  // ── Form Control Getters ──
  get patientId()   { return this.bookingForm.get('patient_id')!; }
  get doctorId()    { return this.bookingForm.get('doctor_id')!; }
  get disease()     { return this.bookingForm.get('disease')!; }
  get symptoms()    { return this.bookingForm.get('symptoms')!; }
  get scheduledAt() { return this.bookingForm.get('scheduled_at')!; }

  /**
   * Check for patient details in query parameters (from Register page redirect)
   */
  private checkQueryParams(): void {
    const pId = this.route.snapshot.queryParamMap.get('patientId');
    if (pId) {
      this.patientService.getPatientById(pId).subscribe({
        next: (res) => this.selectPatient(res.data),
        error: () => this.errorMsg.set('Failed to load pre-filled patient.')
      });
    }
  }

  /**
   * Load available doctors for the dropdown
   */
  private loadDoctors(): void {
    this.doctorService.getAvailableDoctors().subscribe({
      next: (res) => this.availableDoctors.set(res.data),
      error: () => this.errorMsg.set('Failed to load doctors.')
    });
  }

  /**
   * Handle search input typing
   */
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

  /**
   * Execute API search for patients
   */
  private performSearch(term: string): void {
    // Try searching by phone if numeric, otherwise by name
    const isPhone = /^[0-9]+$/.test(term);
    const searchParams = isPhone ? { phone: term } : { name: term };

    this.patientService.searchPatients(searchParams).subscribe({
      next: (res) => {
        this.searchResults.set(res.data.patients);
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.errorMsg.set('Patient search failed.');
      }
    });
  }

  /**
   * Select a patient from search results or pre-fill
   */
  selectPatient(patient: Patient): void {
    this.selectedPatient.set(patient);
    this.patientId.setValue(patient._id);
    this.searchResults.set([]);
    this.errorMsg.set('');
  }

  /**
   * Deselect patient and reset search
   */
  clearSelection(): void {
    this.selectedPatient.set(null);
    this.patientId.setValue('');
    this.searchResults.set([]);
  }

  /**
   * Submit booking form
   */
  onSubmit(): void {
    this.errorMsg.set('');
    this.successMsg.set('');
    this.bookingForm.markAllAsTouched();

    if (this.bookingForm.invalid) return;

    this.isSubmitting.set(true);

    const payload: BookAppointmentRequest = {
      patient_id:   this.patientId.value!,
      doctor_id:    this.doctorId.value!,
      disease:      this.disease.value!,
      symptoms:     this.symptoms.value!,
      scheduled_at: new Date(this.scheduledAt.value!).toISOString()
    };

    this.appointmentService.bookAppointment(payload).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.successMsg.set('Appointment booked! Slip opened in new tab.');
        
        // Open PDF slip
        this.appointmentService.openSlipInNewTab(res.data._id);
        
        // Reset form but keep doctors loaded
        this.bookingForm.reset();
        this.selectedPatient.set(null);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMsg.set(err.error?.message ?? 'Failed to book appointment.');
      }
    });
  }
}
