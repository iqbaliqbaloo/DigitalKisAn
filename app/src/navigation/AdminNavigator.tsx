import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHome from "../screens/admin/AdminHome";
import Users from "../screens/admin/Users";
import Products from "../screens/admin/Products";
import Orders from "../screens/admin/Orders";
import Reports from "../screens/admin/Reports";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF6B00",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "AdminHome":
              iconName = "home";
              break;
            case "Users":
              iconName = "people";
              break;
            case "Products":
              iconName = "cube";
              break;
            case "Orders":
              iconName = "receipt";
              break;
            case "Reports":
              iconName = "stats-chart";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="AdminHome" component={AdminHome} options={{ title: "Home" }} />
      <Tab.Screen name="Users" component={Users} options={{ title: "Users" }} />
      <Tab.Screen name="Products" component={Products} options={{ title: "Products" }} />
      <Tab.Screen name="Orders" component={Orders} options={{ title: "Orders" }} />
      <Tab.Screen name="Reports" component={Reports} options={{ title: "Reports" }} />
    </Tab.Navigator>
  );
}
