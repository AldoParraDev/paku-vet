export type UserRole = "admin" | "groomer" | "user";
export type UserSex = "male" | "female" | "other";

export interface Address {
  district_id: string;
  address_line: string;
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  phone: string;
  first_name: string;
  last_name: string;
  sex: UserSex;
  birth_date: string;
  dni: string;
  address: Address;
  profile_photo_url: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  sex: UserSex;
  birth_date: string;
  role?: UserRole;
  dni?: string;
  address?: Address;
  profile_photo_url?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface RegisterResponse extends User {}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
