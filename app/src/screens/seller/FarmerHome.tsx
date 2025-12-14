// src/screens/seller/FarmerHome.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function FarmerHome() {
  // Stats cards
  const stats = [
    {
      title: "Today Revenue",
      value: "₹ 1200",
      icon: () => <MaterialIcons name="attach-money" size={28} color="#4CAF50" />,
    },
    {
      title: "Orders",
      value: "25",
      icon: () => <AntDesign name="shopping-cart" size={28} color="#FF9800" />,
    },
    {
      title: "Pending",
      value: "5",
      icon: () => <FontAwesome5 name="clock" size={28} color="#F44336" />,
    },
    {
      title: "Stock Low",
      value: "3",
      icon: () => <MaterialIcons name="error-outline" size={28} color="#9C27B0" />,
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Add Product",
      icon: () => <AntDesign name="plus-circle" size={28} color="#fff" />,
      onPress: () => {
        console.log("Navigate to AddProduct screen");
      },
    },
    {
      title: "Manage Orders",
      icon: () => <AntDesign name="bars" size={28} color="#fff" />,
      onPress: () => {
        console.log("Navigate to Orders screen");
      },
    },
    {
      title: "View Messages",
      icon: () => <AntDesign name="message" size={28} color="#fff" />,
      onPress: () => {
        console.log("Navigate to Messages screen");
      },
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.heading}>Dashboard</Text>

      {/* Stats Cards */}
      <View style={styles.cardsContainer}>
        {stats.map((item, index) => (
          <View key={index} style={styles.card}>
            {item.icon()}
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.subHeading}>Quick Actions</Text>
      <View style={styles.quickContainer}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickButton}
            onPress={action.onPress}
          >
            {action.icon()}
            <Text style={styles.quickText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 16,
    color: "#333",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: (width - 48) / 2, // 16*2 padding + 16 gap
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  cardTitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
  },
  quickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },
  quickText: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 8,
  },
});
