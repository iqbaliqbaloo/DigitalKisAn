import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdminHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text>Overview: Users, Products, Orders, Reports</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
});
