import { PaginationMeta } from './api.interface';


export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';


export interface AppointmentPatient {
  _id:        string;
  patient_id: string;
  name:       string;
  phone:      string;
  gender:     string;
  age:        number;
}


export interface AppointmentDoctor {
  _id:            string;
  name:           string;
  specialization: string;
  department:     string;
}


export interface AppointmentBookedBy {
  _id:  string;
  name: string;
}


export interface Appointment {
  _id:            string;
  appointment_no: string;         
  token_no:       number;
  patient_id:     AppointmentPatient;
  doctor_id:      AppointmentDoctor;
  booked_by:      AppointmentBookedBy;
  disease:        string;
  symptoms:       string;
  status:         AppointmentStatus;
  scheduled_at:   string;
  createdAt:      string;
  updatedAt:      string;
}


export interface BookAppointmentRequest {
  patient_id:   string;          
  doctor_id:    string;           
  disease:      string;
  symptoms:     string;
  scheduled_at: string;          
}


export interface AppointmentListResponse {
  appointments: Appointment[];
  pagination:   PaginationMeta;
}
