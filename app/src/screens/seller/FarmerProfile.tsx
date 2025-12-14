// src/screens/seller/FarmerProfile.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function FarmerProfile() {
  // Profile data (dummy data for now)
  const profile = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    shopName: "Green Farm",
    address: "123, Village Road, City, State",
    gst: "27ABCDE1234F1Z5",
    pan: "ABCDE1234F",
    bank: "HDFC Bank, A/C: 1234567890",
    profileImage: "https://via.placeholder.com/100",
  };

  // Profile sections
  const sections = [
    {
      title: "Account Info",
      icon: () => <AntDesign name="user" size={24} color="#4CAF50" />,
      data: [
        { label: "Name", value: profile.name },
        { label: "Email", value: profile.email },
        { label: "Phone", value: profile.phone },
      ],
    },
    {
      title: "Business Info",
      icon: () => <MaterialIcons name="store" size={24} color="#FF9800" />,
      data: [
        { label: "Shop Name", value: profile.shopName },
        { label: "Address", value: profile.address },
        { label: "GST", value: profile.gst },
        { label: "PAN", value: profile.pan },
      ],
    },
    {
  title: "Bank / Payment Info",
  icon: () => <MaterialCommunityIcons name="credit-card-outline" size={24} color="#2196F3" />,
  data: [
    { label: "Bank Details", value: profile.bank },
  ],
},
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: profile.profileImage }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      {/* Profile Sections */}
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {section.icon()}
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          {section.data.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout pressed")}>
        <AntDesign name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  itemLabel: {
    color: "#777",
    fontSize: 14,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F44336",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 24,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
});
