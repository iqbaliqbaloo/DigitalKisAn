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
import { BuyerRegisterNavigationProp } from "../../types/navigation";

type Props = {
  navigation: BuyerRegisterNavigationProp;
};

export default function BuyerRegister({ navigation }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !verificationCode ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (phone.length !== 11 || !/^\d+$/.test(phone)) {
      Alert.alert("Error", "Phone number must be 11 digits");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // TODO: Integrate backend register
    Alert.alert("Success", `Welcome ${firstName}!`);
    navigation.replace("LoginBuyer");
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
        <Text style={styles.title}>Buyer Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
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
          placeholder="Verification Code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={{ color: "#555" }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginBuyer")}>
            <Text style={{ color: "#4CAF50", fontWeight: "600" }}>Login</Text>
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
  registerBtn: {
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
  registerBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
