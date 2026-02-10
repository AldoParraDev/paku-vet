import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";
import { useTheme } from "@/hooks/useTheme";
import { Typography, Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useAddressStore } from "@/store/addressStore";
import { CreateAddressData } from "@/types/address.types";

interface SelectedLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export default function ConfirmAddressLocationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, isDark } = useTheme();
  const mapRef = useRef<MapView>(null);
  const { createAddress } = useAddressStore();

  const [location, setLocation] = useState<SelectedLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [saving, setSaving] = useState(false);

  const defaultLocation = {
    latitude: -12.0464,
    longitude: -77.0428,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    searchInitialLocation();
  }, []);

  const searchInitialLocation = async () => {
    try {
      const searchQuery = params.search_query as string;

      if (searchQuery) {
        // Buscar la dirección usando Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery,
          )}&limit=1&addressdetails=1&accept-language=es`,
          {
            headers: {
              "User-Agent": "PakuVet/1.0",
            },
          },
        );

        const data = await response.json();

        if (data && data.length > 0) {
          const result = data[0];
          const latitude = parseFloat(result.lat);
          const longitude = parseFloat(result.lon);

          setLocation({
            latitude,
            longitude,
            address: result.display_name,
          });

          mapRef.current?.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000,
          );
        } else {
          // Si no encuentra, usar ubicación por defecto
          useDefaultLocation();
        }
      } else {
        useDefaultLocation();
      }
    } catch (error) {
      console.log("Error searching location:", error);
      useDefaultLocation();
    } finally {
      setLoading(false);
    }
  };

  const useDefaultLocation = () => {
    setLocation({
      latitude: defaultLocation.latitude,
      longitude: defaultLocation.longitude,
      address: "Lima, Perú",
    });
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    try {
      setLoadingAddress(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=es`,
        {
          headers: {
            "User-Agent": "PakuVet/1.0",
          },
        },
      );

      const data = await response.json();
      return data?.display_name || "Dirección no disponible";
    } catch (error) {
      return "Dirección no disponible";
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const address = await getAddressFromCoordinates(latitude, longitude);

    setLocation({ latitude, longitude, address });
  };

  const handleMarkerDragEnd = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const address = await getAddressFromCoordinates(latitude, longitude);

    setLocation({ latitude, longitude, address });
  };

  const handleSaveAddress = async () => {
    if (!location) {
      Alert.alert("Error", "Por favor selecciona una ubicación en el mapa");
      return;
    }

    try {
      setSaving(true);

      const addressData: CreateAddressData = {
        district_id: params.district_id as string,
        address_line: params.address_line as string,
        building_number: params.building_number as string,
        apartment_number: (params.apartment_number as string) || undefined,
        lat: location.latitude,
        lng: location.longitude,
        is_default: false,
      };

      await createAddress(addressData);

      Alert.alert("Éxito", "Dirección agregada correctamente", [
        {
          text: "OK",
          onPress: () => {
            // Volver al home
            router.replace("/(tabs)/(user)");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la dirección");
    } finally {
      setSaving(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      backgroundColor: colors.primary,
    },
    backButton: {
      padding: Spacing.sm,
    },
    headerTitle: {
      flex: 1,
      fontSize: Typography.fontSize.lg,
      fontFamily: Typography.fontFamily.bold,
      color: "#FFFFFF",
      textAlign: "center",
      marginRight: 40,
    },
    mapContainer: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: Spacing.md,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: colors.textSecondary,
    },
    infoHint: {
      position: "absolute",
      top: 10,
      left: Spacing.md,
      right: Spacing.md,
      backgroundColor: colors.surface,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      ...Shadows.md,
    },
    infoHintText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.primary,
      textAlign: "left",
    },
    addressCard: {
      position: "absolute",
      bottom: 120,
      left: Spacing.md,
      right: Spacing.md,
      backgroundColor: colors.surface,
      padding: Spacing.md,
      borderRadius: BorderRadius.lg,
      ...Shadows.lg,
    },
    addressText: {
      fontSize: Typography.fontSize.sm,
      fontFamily: Typography.fontFamily.regular,
      color: colors.text,
      lineHeight: 20,
    },
    addressLoading: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    fixedButton: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: Spacing.lg,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agregar dirección</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando mapa...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agregar dirección</Text>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || defaultLocation.latitude,
            longitude: location?.longitude || defaultLocation.longitude,
            latitudeDelta: defaultLocation.latitudeDelta,
            longitudeDelta: defaultLocation.longitudeDelta,
          }}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton={false}
          mapType="none"
        >
          {isDark ? (
            <UrlTile
              urlTemplate="https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />
          ) : (
            <UrlTile
              urlTemplate="https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />
          )}

          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
              onDragEnd={handleMarkerDragEnd}
              title="Tu dirección"
            />
          )}
        </MapView>

        {/* Hint */}
        <View style={styles.infoHint}>
          <Text style={styles.infoHintText}>
            Confirma tu dirección exacta arrastrando el marcador en el mapa.
          </Text>
        </View>

        {/* Tarjeta de dirección */}
        {location && (
          <View style={styles.addressCard}>
            {loadingAddress ? (
              <View style={styles.addressLoading}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.addressText}>Obteniendo dirección...</Text>
              </View>
            ) : (
              <Text style={styles.addressText}>{location.address}</Text>
            )}
          </View>
        )}
      </View>

      {/* Botón Guardar */}
      <View style={styles.fixedButton}>
        <Button
          title="Guardar"
          onPress={handleSaveAddress}
          fullWidth
          disabled={!location}
          loading={saving}
        />
      </View>
    </SafeAreaView>
  );
}
