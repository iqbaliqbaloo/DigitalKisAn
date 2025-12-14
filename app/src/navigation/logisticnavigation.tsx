import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LogisticHome from "../screens/logistic/LogisticHome";
import Orders from "../screens/logistic/Orders";
import DeliveryHistory from "../screens/logistic/DeliveryHistory";
import Profile from "../screens/logistic/Profile";

const Tab = createBottomTabNavigator();

export default function LogisticNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2A7CF7",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";

          if (route.name === "LogisticHome") iconName = "home";
          else if (route.name === "Orders") iconName = "list";
          else if (route.name === "Delivery") iconName = "bicycle";
          else if (route.name === "Profile") iconName = "person";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="LogisticHome" component={LogisticHome} options={{ title: "Home" }} />
      <Tab.Screen name="Orders" component={Orders} options={{ title: "Orders" }} />
      <Tab.Screen name="Delivery" component={DeliveryHistory} options={{ title: "Delivery" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}
