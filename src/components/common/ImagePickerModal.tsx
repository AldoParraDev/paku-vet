import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Icon } from "./Icon";
import { useTheme } from "@/hooks/useTheme";
import { BorderRadius, Spacing, Typography, Shadows } from "@/constants/theme";

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onPickImage: () => void;
}
export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onPickImage,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: Spacing.lg,
    },
    container: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      width: "100%",
      // maxWidth: 340,
      alignItems: "center",
      ...Shadows.lg,
    },
    title: {
      fontSize: Typography.fontSize.lg,
      fontWeight: Typography.fontWeight.bold,
      color: colors.primary,
      textAlign: "center",
      marginBottom: Spacing.xl,
    },
    optionsContainer: {
      gap: Spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    containerOptions: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.sm,
    },
    option: {
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing.lg,
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.full,
      width: 60,
      height: 60,
    },
    optionText: {
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.semibold,
      color: colors.primary,
      textAlign: "center",
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={styles.container}>
            <Text style={styles.title}>Subir foto de perfil</Text>

            <View style={styles.optionsContainer}>
              <View style={styles.containerOptions}>
                <TouchableOpacity style={styles.option} onPress={onPickImage}>
                  <Icon name="image" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.optionText}>
                  Subir desde{"\n"}el dispositivo
                </Text>
              </View>

              <View style={styles.containerOptions}>
                <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
                  <Icon name="camera" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.optionText}>Tomar una{"\n"}foto</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
