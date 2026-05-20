import { PaginationMeta } from './api.interface';


export type Gender = 'Male' | 'Female' | 'Other';


export interface RegisteredBy {
  _id:  string;
  name: string;
}


export interface Patient {
  _id:           string;
  patient_id:    string;           
  name:          string;
  phone:         string;
  gender:        Gender;
  age:           number;
  address:       string;
  registered_by: string | RegisteredBy;  
  registered_at: string;
  createdAt:     string;
  updatedAt:     string;
}


export interface RegisterPatientRequest {
  name:    string;
  phone:   string;
  gender:  Gender;
  age:     number;
  address: string;
}


export interface PatientSearchParams {
  phone?: string;
  name?:  string;
  page?:  number;
  limit?: number;
}


export interface PatientListResponse {
  patients:   Patient[];
  pagination: PaginationMeta;
}
