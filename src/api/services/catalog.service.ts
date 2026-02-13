import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { BreedCatalog } from "@/types/catalog.types";

export const catalogService = {
  /**
   * Obtiene las razas según la especie
   */
  async getBreeds(species: "dog" | "cat"): Promise<BreedCatalog[]> {
    const response = await apiClient.get<BreedCatalog[]>(
      API_ENDPOINTS.CATALOG.BREEDS,
      {
        params: { species },
      },
    );
    return response.data;
  },
};
