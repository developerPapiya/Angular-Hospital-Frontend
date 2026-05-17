import { PaginationMeta } from './api.interface';

/**
 * Patient-related interfaces.
 * Covers patient registration, search, and list responses.
 */

/** Allowed gender values for patient registration */
export type Gender = 'Male' | 'Female' | 'Other';

/** Populated staff reference who registered the patient */
export interface RegisteredBy {
  _id:  string;
  name: string;
}

/**
 * Full patient record as returned by the API.
 * `registered_by` is a string in list views but a populated object in detail views.
 */
export interface Patient {
  _id:           string;
  patient_id:    string;           // e.g. "PAT-2026-0006"
  name:          string;
  phone:         string;
  gender:        Gender;
  age:           number;
  address:       string;
  registered_by: string | RegisteredBy;  // string in list, populated object in detail
  registered_at: string;
  createdAt:     string;
  updatedAt:     string;
}

/** Payload for POST /patients — register a new patient */
export interface RegisterPatientRequest {
  name:    string;
  phone:   string;
  gender:  Gender;
  age:     number;
  address: string;
}

/** Query parameters for GET /patients — patient search */
export interface PatientSearchParams {
  phone?: string;
  name?:  string;
  page?:  number;
  limit?: number;
}

/** Paginated response from GET /patients */
export interface PatientListResponse {
  patients:   Patient[];
  pagination: PaginationMeta;
}
