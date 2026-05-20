
export type UserRole   = 'admin' | 'staff' | 'nurse';

export type UserStatus = 'active' | 'inactive';


export interface UserProfile {
  _id:        string;
  name:       string;
  email:      string;
  phone:      string;
  role:       UserRole;
  status:     UserStatus;
  last_login: string;
  createdAt:  string;
  updatedAt:  string;
}


export interface LoginRequest {
  email:    string;
  password: string;
}


export interface LoginResponseData {
  token: string;
  user:  UserProfile;
}
