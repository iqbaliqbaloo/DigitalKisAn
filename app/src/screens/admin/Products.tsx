import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Products() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Text>Manage all products from all sellers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});
