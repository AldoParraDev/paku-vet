import { create } from "zustand";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  setLocation: (latitude: number, longitude: number, address: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  latitude: null,
  longitude: null,
  address: null,
  setLocation: (latitude, longitude, address) =>
    set({ latitude, longitude, address }),
  clearLocation: () => set({ latitude: null, longitude: null, address: null }),
}));
