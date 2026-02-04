import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface LogoProps {
  variant?: "color" | "mono" | "isotipo" | "imagotipo";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({
  variant = "color",
  size = "md",
}) => {
  const { isDark } = useTheme();

  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120,
  };

  const getLogoSource = () => {
    switch (variant) {
      case "color":
        return require("@assets/images/logo/logo-color.png");
      case "mono":
        return isDark
          ? require("@assets/images/logo/logo-mono-dark.png")
          : require("@assets/images/logo/logo-mono-light.png");
      case "isotipo":
        return require("@assets/images/logo/isotipo.png");
      case "imagotipo":
        return require("@assets/images/logo/imagotipo.png");
      default:
        return require("@assets/images/logo/logo-color.png");
    }
  };

  const styles = StyleSheet.create({
    logo: {
      width: sizeMap[size],
      height: sizeMap[size],
      resizeMode: "contain",
    },
  });

  return (
    <View>
      <Image source={getLogoSource()} style={styles.logo} />
    </View>
  );
};
