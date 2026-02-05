import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { UserProfile, UpdateProfileData } from "@/types/user.types";

export const userService = {
  /**
   * Obtiene el perfil del usuario
   */
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>(API_ENDPOINTS.USERS.ME);
    return response.data;
  },

  /**
   * Actualiza el perfil del usuario
   */
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>(
      API_ENDPOINTS.USERS.UPDATE_ME,
      data,
    );
    return response.data;
  },
};
