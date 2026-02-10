import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/authStore";
import { Typography, Spacing } from "@/constants/theme";
import { HomeHeader } from "@/components/home/HomeHeader";
import { BannerCard } from "@/components/home/BannerCard";
import { RegisterPetCard } from "@/components/home/RegisterPetCard";
import { ServiceCard } from "@/components/home/ServiceCard";
import { OfferCard } from "@/components/home/OfferCard";
import { AddressDrawer } from "@/components/home/AddressDrawer";
import { Text } from "@/components/common/Text";
import { useAddressStore } from "@/store/addressStore";

export default function UserHomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const user = useAuthStore((state) => state.user);

  // Address store
  const { addresses, isLoading, fetchAddresses, setDefaultAddress } =
    useAddressStore();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock de direcciones - Esto vendrá de tu API
  // Cargar direcciones al montar el componente
  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      await fetchAddresses();
    } catch (error) {
      console.log("Error loading addresses:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAddresses();
    setRefreshing(false);
  };

  // Obtener dirección por defecto
  const defaultAddress = addresses.find((addr) => addr.is_default);

  const handleSelectAddress = async (id: string) => {
    try {
      await setDefaultAddress(id);
    } catch (error) {
      console.log("Error setting default address:", error);
    }
  };

  const handleAddNewAddress = () => {
    router.push("/(screens)/add-address");
  };

  const handleRegisterPet = () => {
    console.log("Register pet");
  };

  const handleServicePress = () => {
    console.log("Service pressed");
  };

  const handleOfferPress = () => {
    console.log("Offer pressed");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: Typography.fontSize.md,
      color: colors.primary,
      marginBottom: Spacing.sm,
    },
    sectionMargin: {
      marginBottom: Spacing.xl,
      paddingHorizontal: Spacing.md,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header fijo */}
      <HomeHeader
        userName={user?.first_name || "Usuario"}
        address={
          defaultAddress?.address_line
            ? `${defaultAddress.address_line} ${defaultAddress.building_number}`
            : "Agrega una dirección"
        }
        onAddressPress={() => setDrawerVisible(true)}
      />

      {/* Contenido scrolleable */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Banner principal */}
        <BannerCard
          title="Grooming sin estrés"
          subtitle="Elige el PAKU Spa ideal para tu mascota."
        />

        {/* Registrar mascota */}
        <View style={styles.sectionMargin}>
          <RegisterPetCard onPress={handleRegisterPet} />
        </View>

        {/* Servicios */}
        <View style={styles.sectionMargin}>
          <Text variant="bold" style={styles.sectionTitle}>
            Nuestros servicios
          </Text>
          <ServiceCard
            title="PAKU Spa"
            subtitle="Grooming inteligente."
            onPress={handleServicePress}
          />
        </View>

        {/* Ofertas */}
        <View style={styles.sectionMargin}>
          <OfferCard
            discount="20% OFF"
            description="en tu primer PAKU Spa"
            onPress={handleOfferPress}
          />
        </View>
      </ScrollView>

      {/* Drawer de direcciones */}
      <AddressDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        addresses={addresses.map((addr) => ({
          id: addr.id,
          address: `${addr.address_line} ${addr.building_number}${
            addr.apartment_number ? `, ${addr.apartment_number}` : ""
          }`,
          isDefault: addr.is_default,
        }))}
        onSelectAddress={handleSelectAddress}
        onAddNew={handleAddNewAddress}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
