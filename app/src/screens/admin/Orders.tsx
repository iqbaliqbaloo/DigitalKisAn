import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Orders() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <Text>View all orders and statuses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});
