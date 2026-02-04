import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Typography } from "@/constants/theme";
import { Icon, IconName } from "./Icon";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  containerStyle?: ViewStyle;
  type?: "text" | "password" | "email" | "phone";
  variant?: "default" | "auth";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  type = "text",
  variant = "default",
  ...textInputProps
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getKeyboardType = () => {
    switch (type) {
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      default:
        return "default";
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: Spacing.md,
    },
    label: {
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.medium,
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: variant === "auth" ? 2 : 1,
      borderColor:
        variant === "auth"
          ? colors.loginInputBorder
          : error
            ? colors.error
            : isFocused
              ? colors.primary
              : colors.border,
      borderRadius: variant === "auth" ? BorderRadius.xl : BorderRadius.md,
      backgroundColor: variant === "auth" ? colors.loginInput : colors.surface,
      paddingHorizontal: Spacing.md,
    },
    input: {
      flex: 1,
      fontSize: Typography.fontSize.md,
      color: variant === "auth" ? colors.loginInputText : colors.text,
    },
    iconContainer: {
      marginHorizontal: Spacing.xs,
    },
    errorText: {
      fontSize: Typography.fontSize.xs,
      color: colors.error,
      marginTop: Spacing.xs,
    },
    passwordToggle: {
      padding: Spacing.xs,
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && variant === "default" && (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            <Icon name={leftIcon} size={20} color={colors.textSecondary} />
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholderTextColor={
            variant === "auth" ? colors.placeholder : colors.placeholder
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={type === "password" && !isPasswordVisible}
          keyboardType={getKeyboardType()}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          {...textInputProps}
        />

        {type === "password" && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name={isPasswordVisible ? "eye-open" : "eye-closed"}
              size={20}
              color={variant === "auth" ? "#FFFFFF" : colors.textSecondary}
            />
          </TouchableOpacity>
        )}

        {rightIcon && type !== "password" && (
          <View style={styles.iconContainer}>
            <Icon name={rightIcon} size={20} color={colors.textSecondary} />
          </View>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
