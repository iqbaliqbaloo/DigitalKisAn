// src/HomePage.tsx
import React from "react";
// import logisticnavigation from "./src/navigation/logisticnavigation";
// import AddProduct from "./src/screens/farmer/seller/AddProduct";
import BuyerTabNavigator from "./src/navigation/BuyerTabNavigator";
import FarmerTabNavigator from "./src/navigation/FarmerTabNavigator";
import BuyerRegister from "./src/screens/Auth/BuyerRegister";
import LoginBuyer from "./src/screens/Auth/LoginBuyer";
export default function HomePage() {
  return (
    <BuyerTabNavigator/>
  );
}
