import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import {
  LoginCredentials,
  RegisterData,
  LoginResponse,
  RegisterResponse,
  User,
} from "@/types/auth.types";

export const authService = {
  /**
   * Inicia sesión con email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return response.data;
  },

  /**
   * Registra un nuevo usuario
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    return response.data;
  },

  /**
   * Refresca el token de acceso
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refresh_token: refreshToken },
    );
    return response.data;
  },

  /**
   * Obtiene información del usuario autenticado
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.ME);
    return response.data;
  },
};
