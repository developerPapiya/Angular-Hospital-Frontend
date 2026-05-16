/**
 * Authentication-related interfaces.
 * Covers login request/response and user profile data.
 */

/** Allowed user roles in the hospital system */
export type UserRole   = 'admin' | 'staff' | 'nurse';

/** Account activation status */
export type UserStatus = 'active' | 'inactive';

/**
 * Full user profile as returned by GET /auth/me
 * and embedded in the login response.
 */
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

/** Payload for POST /auth/login */
export interface LoginRequest {
  email:    string;
  password: string;
}

/** Data field returned from POST /auth/login on success */
export interface LoginResponseData {
  token: string;
  user:  UserProfile;
}
