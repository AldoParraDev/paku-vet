import { UserRole, UserSex, Address } from "./auth.types";

export interface UserProfile {
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

export interface UpdateProfileData {
  phone?: string;
  first_name?: string;
  last_name?: string;
  sex?: UserSex;
  birth_date?: string;
  dni?: string;
  address?: Address;
  profile_photo_url?: string;
}
