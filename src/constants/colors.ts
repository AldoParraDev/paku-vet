export const Colors = {
  light: {
    primary: "#1D2AD8",
    secondary: "#40FFA7",
    background: "#EFF3FF",
    surface: "#FFFFFF",
    text: "#111111",
    textSecondary: "#1C1C1C",
    border: "#1D2AD8", // Bordes azules como en el diseño
    error: "#FF1637",
    success: "#40FFA7",
    warning: "#FEE300",
    info: "#98CEFF",

    // Específicos de la app
    card: "#FFFFFF",
    shadow: "rgba(29, 42, 216, 0.1)",
    overlay: "rgba(0, 0, 0, 0.5)",
    disabled: "#BDBDBD",
    placeholder: "#FFFFFF80",

    // Colores para Login
    loginBackground: "#1D2AD8", // Fondo azul del login
    loginButton: "#FFFFFF",
    loginButtonText: "#1D2AD8",
    loginInput: "transparent",
    loginInputBorder: "#FFFFFF",
    loginInputText: "#FFFFFF",
  },
  dark: {
    primary: "#1D2AD8",
    secondary: "#40FFA7",
    background: "#0F0F0F",
    surface: "#1C1C1C",
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    border: "#FFFFFF",
    error: "#FF1637",
    success: "#40FFA7",
    warning: "#FEE300",
    info: "#98CEFF",

    // Específicos de la app
    card: "#1C1C1C",
    shadow: "rgba(0, 0, 0, 0.3)",
    overlay: "rgba(0, 0, 0, 0.7)",
    disabled: "#424242",
    placeholder: "#FFFFFF80",

    // Colores para Login
    loginBackground: "#0F0F0F",
    loginButton: "#1D2AD8",
    loginButtonText: "#FFFFFF",
    loginInput: "transparent",
    loginInputBorder: "#FFFFFF",
    loginInputText: "#FFFFFF",
  },
};

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;
