import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FarmerHome from "../screens/seller/FarmerHome";
import FarmerProducts from "../screens/seller/FarmerProducts";
import AddProduct from "../screens/seller/AddProduct";
import FarmerProfile from "../screens/seller/FarmerProfile";

const Tab = createBottomTabNavigator();

export default function FarmerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarAactiveTintColor: "#2A7CF7",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";

          switch (route.name) {
            case "FarmerHome":
              iconName = "home";
              break;
            case "FarmerProducts":
              iconName = "list";
              break;
            case "AddProduct":
              iconName = "add-circle";
              break;
            case "FarmerProfile":
              iconName = "person";
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="FarmerHome" component={FarmerHome} options={{ title: "Home" }} />
      <Tab.Screen name="FarmerProducts" component={FarmerProducts} options={{ title: "Products" }} />
      <Tab.Screen name="AddProduct" component={AddProduct} options={{ title: "Add" }} />
      <Tab.Screen name="FarmerProfile" component={FarmerProfile} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}
