import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginBuyerNavigationProp } from "../../types/navigation";

type Props = {
  navigation: LoginBuyerNavigationProp;
};

export default function LoginBuyer({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!phone || !password) {
      Alert.alert("Error", "Please enter phone number and password");
      return;
    }
    if (phone.length !== 11 || !/^\d+$/.test(phone)) {
      Alert.alert("Error", "Phone number must be 11 digits");
      return;
    }

    // TODO: Integrate backend login
    Alert.alert("Success", `Logged in with phone: ${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Buyer Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          maxLength={11}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerLinkContainer}>
          <Text style={{ color: "#555" }}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("BuyerRegister")}
          >
            <Text style={{ color: "#4CAF50", fontWeight: "600" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
    color: "#333",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FAFAFA",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  loginBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  loginBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  registerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
