import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Users() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <Text>Manage all users: buyers and farmers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});
