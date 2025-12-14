import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/BuyerUser/Home";
import LoginBuyer from "../screens/Auth/LoginBuyer";
export type BuyerStackParamList = {
  Home: undefined;
  LoginBuyer: undefined;
};

const Stack = createNativeStackNavigator<BuyerStackParamList>();

export default function BuyerStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LoginBuyer" component={LoginBuyer} />
    </Stack.Navigator>
  );
}
