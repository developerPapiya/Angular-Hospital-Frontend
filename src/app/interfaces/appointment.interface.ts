import { PaginationMeta } from './api.interface';

/**
 * Appointment-related interfaces.
 * Covers booking, listing, and populated reference types.
 */

/** Possible appointment statuses */
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

/** Populated patient reference within an appointment record */
export interface AppointmentPatient {
  _id:        string;
  patient_id: string;
  name:       string;
  phone:      string;
  gender:     string;
  age:        number;
}

/** Populated doctor reference within an appointment record */
export interface AppointmentDoctor {
  _id:            string;
  name:           string;
  specialization: string;
  department:     string;
}

/** Populated staff reference who booked the appointment */
export interface AppointmentBookedBy {
  _id:  string;
  name: string;
}

/**
 * Full appointment record as returned by the API.
 * All reference fields are populated objects.
 */
export interface Appointment {
  _id:            string;
  appointment_no: string;         // e.g. "APT-20260510-0003"
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

/** Payload for POST /appointments — book a new appointment */
export interface BookAppointmentRequest {
  patient_id:   string;           // MongoDB _id of patient
  doctor_id:    string;           // MongoDB _id of doctor
  disease:      string;
  symptoms:     string;
  scheduled_at: string;           // ISO 8601 date string
}

/** Paginated response from GET /appointments */
export interface AppointmentListResponse {
  appointments: Appointment[];
  pagination:   PaginationMeta;
}
