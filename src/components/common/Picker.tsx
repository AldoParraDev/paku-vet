import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { Icon } from "./Icon";
import { useTheme } from "@/hooks/useTheme";
import { Typography, Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface PickerOption {
  id: string;
  name: string;
}

interface PickerProps {
  label: string;
  value: string;
  options: PickerOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const Picker: React.FC<PickerProps> = ({
  label,
  value,
  options,
  placeholder = "Seleccionar...",
  onSelect,
  error,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.id === value);

  const styles = StyleSheet.create({
    container: {
      marginBottom: Spacing.md,
    },
    label: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.medium,
      color: colors.primary,
      marginBottom: Spacing.xs,
    },
    pickerButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: error ? colors.error : colors.border,
      borderRadius: BorderRadius.md,
      backgroundColor: disabled ? colors.border + "40" : colors.surface,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
    },
    pickerText: {
      flex: 1,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: selectedOption ? colors.text : colors.placeholder,
    },
    errorText: {
      fontSize: Typography.fontSize.xs,
      fontFamily: Typography.fontFamily.regular,
      color: colors.error,
      marginTop: Spacing.xs,
    },
    // Modal styles
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: Spacing.lg,
    },
    modalContainer: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      width: 300,
      maxHeight: "100%",
      ...Shadows.lg,
    },
    modalHeader: {
      padding: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.bold,
      color: colors.primary,
      textAlign: "center",
    },
    optionsList: {
      maxHeight: 400,
    },
    optionItem: {
      padding: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    selectedOption: {
      backgroundColor: colors.primary + "10",
    },
    optionText: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
    },
    selectedOptionText: {
      fontFamily: Typography.fontFamily.semibold,
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={styles.pickerText}>
          {selectedOption ? selectedOption.name : placeholder}
        </Text>
        <Icon
          name="arrow-down"
          size={20}
          color={disabled ? colors.textSecondary : colors.primary}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal de opciones */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label}</Text>
              </View>

              <FlatList
                data={options}
                keyExtractor={(item) => item.id}
                style={styles.optionsList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      item.id === value && styles.selectedOption,
                    ]}
                    onPress={() => {
                      onSelect(item.id);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.id === value && styles.selectedOptionText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
