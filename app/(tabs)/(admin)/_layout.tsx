import { Tabs } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@/components/common";

export default function AdminLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groomers"
        options={{
          title: "Groomers",
          tabBarIcon: ({ color, size }) => (
            <Icon name="services" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <Icon name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
