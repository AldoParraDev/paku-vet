export interface Address {
  id: string;
  district_id: string;
  address_line: string;
  lat: number;
  lng: number;
  reference?: string;
  building_number?: string;
  apartment_number?: string;
  label?: string;
  type?: string;
  is_default: boolean;
  created_at: string;
}

export interface CreateAddressData {
  district_id: string;
  address_line: string;
  lat: number;
  lng: number;
  reference?: string;
  building_number?: string;
  apartment_number?: string;
  label?: string;
  type?: string;
  is_default?: boolean;
}

export interface UpdateAddressData extends Partial<CreateAddressData> {
  is_default?: boolean;
}
