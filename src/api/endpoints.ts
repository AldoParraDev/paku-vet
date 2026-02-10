export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
  },

  // Usuarios
  USERS: {
    ME: "/users/me",
    UPDATE_ME: "/users/me",
  },

  // Direcciones
  ADDRESSES: {
    LIST: "/addresses",
    CREATE: "/addresses",
    DETAIL: (id: string) => `/addresses/${id}`,
    UPDATE: (id: string) => `/addresses/${id}`,
    DELETE: (id: string) => `/addresses/${id}`,
  },

  // Geografía
  GEO: {
    DISTRICTS: "/geo/districts",
  },

  // Administrador
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    GROOMERS: "/admin/groomers",
    CLIENTS: "/admin/clients",
  },

  // Groomer
  GROOMER: {
    APPOINTMENTS: "/groomer/appointments",
    SCHEDULE: "/groomer/schedule",
  },

  // Cliente
  CLIENT: {
    PETS: "/client/pets",
    APPOINTMENTS: "/client/appointments",
  },
} as const;
