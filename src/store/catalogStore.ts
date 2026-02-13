import { create } from "zustand";
import { Breed, BreedCatalog } from "@/types/catalog.types";
import { catalogService } from "@/api/services/catalog.service";

interface CatalogState {
  dogBreeds: Breed[];
  catBreeds: Breed[];
  isLoading: boolean;
  error: string | null;

  fetchBreeds: (species: "dog" | "cat") => Promise<void>;
  clearError: () => void;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  dogBreeds: [],
  catBreeds: [],
  isLoading: false,
  error: null,

  fetchBreeds: async (species: "dog" | "cat") => {
    try {
      // Verificar si ya tenemos las razas en caché
      const existingBreeds =
        species === "dog" ? get().dogBreeds : get().catBreeds;
      if (existingBreeds.length > 0) {
        return; // Ya tenemos las razas, no volver a cargar
      }

      set({ isLoading: true, error: null });
      const response = await catalogService.getBreeds(species);

      // La respuesta es un array con un objeto que contiene las razas
      if (response && response.length > 0) {
        const breeds = response[0].breeds;

        if (species === "dog") {
          set({ dogBreeds: breeds, isLoading: false });
        } else {
          set({ catBreeds: breeds, isLoading: false });
        }
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "Error al cargar razas";
      console.error("Error fetching breeds:", error);
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
