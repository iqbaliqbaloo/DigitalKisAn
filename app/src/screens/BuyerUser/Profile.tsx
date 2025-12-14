import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [user, setUser] = useState({name:'John Doe', email:'john@example.com'});

  const logout = () => alert("Logged out");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Info</Text>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <TouchableOpacity style={styles.btn}><Text style={{color:'#fff'}}>Edit Profile</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orders</Text>
        <TouchableOpacity style={styles.btn}><Text style={{color:'#fff'}}>View Orders</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Addresses</Text>
        <TouchableOpacity style={styles.btn}><Text style={{color:'#fff'}}>Manage Addresses</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <TouchableOpacity style={styles.btn}><Text style={{color:'#fff'}}>Manage Payment</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <TouchableOpacity style={styles.btn}><Text style={{color:'#fff'}}>My Reviews</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.btn,{backgroundColor:'#FF5252', marginVertical:20}]} onPress={logout}><Text style={{color:'#fff'}}>Logout</Text></TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#E0F2F1', padding:10},
  title:{fontSize:20, fontWeight:'700', marginBottom:10, color:'#333'},
  section:{backgroundColor:'#FAFAFA', padding:15, borderRadius:12, marginVertical:5, shadowColor:'#000', shadowOpacity:0.08, shadowOffset:{width:0,height:2}, shadowRadius:6, elevation:3},
  sectionTitle:{fontWeight:'700', fontSize:16, marginBottom:5},
  btn:{backgroundColor:'#4CAF50', padding:10, borderRadius:10, marginTop:5, alignItems:'center'}
});
