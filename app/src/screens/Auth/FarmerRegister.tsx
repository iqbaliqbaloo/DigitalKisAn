// // screens/RegistrationScreen.tsx
// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import RegistrationInput from "../../component/ui/RegistrationInput";
// import RoleButton from "../../component/ui/Button";
// import  useRegistrationForm  from "../../hooks/useRegistrationForm";
// function FarmerRegister({ }) {
//   const { form, updateField, submitRegistration } = useRegistrationForm();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Create Account</Text>

//       <RegistrationInput
//         label="First Name"
//         value={form.firstName}
//         onChangeText={(val) => updateField("firstName", val)}
//       />

//       <RegistrationInput
//         label="Last Name"
//         value={form.lastName}
//         onChangeText={(val) => updateField("lastName", val)}
//       />

//       <RegistrationInput
//         label="Phone Number"
//         value={form.phoneNumber}
//         onChangeText={(val) => updateField("phoneNumber", val)}
//       />

//       <RegistrationInput
//         label="Verify Number"
//         value={form.verifyNumber}
//         onChangeText={(val) => updateField("verifyNumber", val)}
//       />

//       <RegistrationInput
//         label="Password"
//         value={form.password}
//         secure
//         onChangeText={(val) => updateField("password", val)}
//       />

//       <RegistrationInput
//         label="Confirm Password"
//         value={form.confirmPassword}
//         secure
//         onChangeText={(val) => updateField("confirmPassword", val)}
//       />

//       <RoleButton title="Register" color="#28a745" onPress={submitRegistration} />

//       {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.loginText}>Already have an account? Login</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// }
// export default FarmerRegister;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, marginTop: 30 },
//   heading: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
//   loginText: {
//     textAlign: "center",
//     marginTop: 15,
//     color: "#1a73e8",
//     fontSize: 16,
//   },
// });
