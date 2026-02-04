import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AuthBackgroundProps {
  children: React.ReactNode;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  const { isDark } = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require("@assets/images/login/login-bg.png")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
      }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={
          isDark
            ? [
                "rgba(15, 15, 15, 0)", // Transparente arriba
                "rgba(15, 15, 15, 0.95)", // Medio transparente
                "rgba(15, 15, 15, 1)", // Medio transparente
                "rgba(15, 15, 15, 1)", // Casi opaco abajo
              ]
            : [
                "rgba(29, 42, 216, 0)", // Transparente arriba
                "rgba(29, 42, 216, 0.95)", // Medio transparente
                "rgba(29, 42, 216, 1)", // Medio transparente
                "rgba(29, 42, 216, 1)", // Casi opaco abajo
              ]
        }
        locations={[0, 0.4, 0.8, 1]}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
