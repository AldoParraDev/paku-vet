import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "./Icon";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Typography } from "@/constants/theme";
import { UserSex } from "@/types/auth.types";

interface GenderSelectorProps {
  value: UserSex | null;
  onChange: (value: UserSex) => void;
  error?: string;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: Spacing.md,
    },
    label: {
      fontSize: Typography.fontSize.md,
      color: colors.primary,
      marginBottom: Spacing.xs,
      fontWeight: Typography.fontWeight.semibold,
    },
    optionsContainer: {
      flexDirection: "row",
      gap: Spacing.md,
    },
    option: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: Spacing.sm,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      gap: Spacing.sm,
    },
    selectedOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    unselectedOption: {
      borderColor: colors.border,
      backgroundColor: "transparent",
    },
    optionText: {
      fontSize: Typography.fontSize.md,
      fontWeight: Typography.fontWeight.medium,
    },
    selectedText: {
      color: colors.surface,
    },
    unselectedText: {
      color: colors.textSecondary,
    },
    errorText: {
      fontSize: Typography.fontSize.xs,
      color: colors.error,
      marginTop: Spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Género</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            value === "male" ? styles.selectedOption : styles.unselectedOption,
          ]}
          onPress={() => onChange("male")}
          activeOpacity={0.7}
        >
          <Icon
            name="male"
            size={20}
            color={value === "male" ? colors.surface : colors.textSecondary}
          />
          <Text
            style={[
              styles.optionText,
              value === "male" ? styles.selectedText : styles.unselectedText,
            ]}
          >
            Masculino
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            value === "female"
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
          onPress={() => onChange("female")}
          activeOpacity={0.7}
        >
          <Icon
            name="female"
            size={20}
            color={value === "female" ? colors.surface : colors.textSecondary}
          />
          <Text
            style={[
              styles.optionText,
              value === "female" ? styles.selectedText : styles.unselectedText,
            ]}
          >
            Femenino
          </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
