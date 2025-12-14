import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BuyerTabParamList } from "../types/types";
import HomeScreen from "../screens/BuyerUser/Home";
import CategoriesScreen from "../screens/BuyerUser/Categories";
import CartScreen from "../screens/BuyerUser/Cart";
import ProfileScreen from "../screens/BuyerUser/Profile";
const Tab = createBottomTabNavigator<BuyerTabParamList>();
export default function BuyerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2A7CF7",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home";
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Categories") iconName = "grid";
          else if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
