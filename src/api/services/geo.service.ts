import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { District } from "@/types/geo.types";

export const geoService = {
  /**
   * Obtiene todos los distritos
   */
  async getDistricts(): Promise<District[]> {
    const response = await apiClient.get<District[]>(
      API_ENDPOINTS.GEO.DISTRICTS,
    );
    return response.data;
  },
};
