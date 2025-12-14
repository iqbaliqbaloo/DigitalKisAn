import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BuyerStackNavigator from "./BuyerLoginStackNavigator";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <BuyerStackNavigator />
    </NavigationContainer>
  );
}
