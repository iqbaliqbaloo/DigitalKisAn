import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Reports() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <Text>View analytics and sales reports</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600" },
});
