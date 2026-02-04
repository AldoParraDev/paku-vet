import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Icon, IconName } from "./Icon";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Shadows } from "@/constants/theme";

interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  size?: number;
  iconSize?: number;
  color?: string;
  backgroundColor?: string;
  variant?: "solid" | "outline" | "ghost";
  disabled?: boolean;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 40,
  iconSize = 20,
  color,
  backgroundColor,
  variant = "solid",
  disabled = false,
  style,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: size,
      height: size,
      borderRadius: BorderRadius.md,
      alignItems: "center",
      justifyContent: "center",
    };

    const variantStyles: Record<typeof variant, ViewStyle> = {
      solid: {
        backgroundColor: backgroundColor || colors.primary,
        ...Shadows.sm,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: color || colors.primary,
      },
      ghost: {
        backgroundColor: "transparent",
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...(disabled && { opacity: 0.5 }),
    };
  };

  const getIconColor = () => {
    if (color) return color;
    if (variant === "solid") return "#FFFFFF";
    return colors.primary;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={iconSize} color={getIconColor()} />
    </TouchableOpacity>
  );
};
