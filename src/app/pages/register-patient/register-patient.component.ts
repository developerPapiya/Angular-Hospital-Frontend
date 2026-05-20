import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterPatientRequest } from '../../interfaces/patient.interface';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-register-patient',
  imports:[ReactiveFormsModule, RouterLink],
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent {

  patientForm = new FormGroup({
    name: new FormControl('',[
      Validators.required,Validators.minLength(2),Validators.maxLength(100)
    ]),
    phone: new FormControl('',[
      Validators.required,Validators.pattern('^[6-9]\\d{9}$')
    ]),
    gender: new FormControl('',[Validators.required]),
    age: new FormControl<null | number>(null,[
      Validators.required,
    Validators.min(0),
  Validators.max(120)]),

  address: new FormControl('',[
    Validators.required,
    Validators.maxLength(255),
  ]),
 });

  isSubmitting =signal<boolean>(false);

errorMsg = signal<string>('');

isDuplicatePhone = signal<boolean>(false);

isSuccess = signal<string>('');


   constructor(
    private patientService: PatientService,
    private router: Router,
    private toastService: ToastService
  ) {}

  get name()    { return this.patientForm.get('name')!; }
  get phone()   { return this.patientForm.get('phone')!; }
  get gender()  { return this.patientForm.get('gender')!; }
  get age()     { return this.patientForm.get('age')!; }
  get address() { return this.patientForm.get('address')!; }

    onSubmit(): void {
    this.errorMsg.set('');
    this.isDuplicatePhone.set(false);
    this.patientForm.markAllAsTouched();

    if (this.patientForm.invalid) return;

    this.isSubmitting.set(true);

    const payload: RegisterPatientRequest= {
      name:    this.name.value!,
      phone:   this.phone.value!,
      gender:  this.gender.value as any,
      age:     this.age.value!,
      address: this.address.value || ''
    };
        this.patientService.registerPatient(payload).subscribe({
      next: (res) => {
        this.toastService.success('Patient Registered', 'Patient registered successfully.');
        this.isSubmitting.set(false);
         this.router.navigate(['/book-appointment'], {
          queryParams: {
            patientId:   res.data._id,
            patientName: res.data.name,
            patientPid:  res.data.patient_id
          }
        });
        // Navigate to Book Appointment with newly created patient details
        // This allows the booking page to pre-fill the patient info

        if(res.success){
          this.isSuccess.set(`${res.message}`)
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        if (err.status === 409) {
          this.isDuplicatePhone.set(true);
          this.errorMsg.set('A patient with this phone number is already registered.');
        } else {
          this.errorMsg.set(err.error?.message ?? 'Failed to register patient. Please try again.');
        }
        this.toastService.error('Registration Failed', this.errorMsg());
      }
    });
  }
}
