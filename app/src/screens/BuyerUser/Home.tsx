// src/screens/BuyerUser/Home.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;

/* ---------------- MOCK AUTH ---------------- */
const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  return { user, isGuest: !user, setUser };
};

/* ---------------- MOCK DATA ---------------- */
const BANNERS = [
  { id: 1, title: "Fresh Vegetables Daily", image: "https://via.placeholder.com/400x180" },
  { id: 2, title: "Seasonal Fruits Collection", image: "https://via.placeholder.com/400x180" },
];

const CATEGORIES = [
  { id: 1, name: "Vegetables", color: "#C8E6C9" },
  { id: 2, name: "Fruits", color: "#FFF9C4" },
  { id: 3, name: "Grains", color: "#FFE0B2" },
  { id: 4, name: "Seeds", color: "#D1C4E9" },
  { id: 5, name: "Tools", color: "#B2DFDB" },
];

const PRODUCTS = [
  { id: 1, name: "Tomato", price: 120, farmer: "Ali Farm", rating: 4.5, discount: 10 },
  { id: 2, name: "Onion", price: 80, farmer: "Ahmed Farm", rating: 4.2, discount: 5 },
  { id: 3, name: "Potato", price: 60, farmer: "Khan Farm", rating: 4.8, discount: 15 },
  { id: 4, name: "Carrot", price: 90, farmer: "Ali Farm", rating: 4.3, discount: 8 },
];

const FARMERS = [
  { id: 1, name: "Ali Farm", location: "Punjab", avatar: "https://via.placeholder.com/60" },
  { id: 2, name: "Ahmed Farm", location: "Sindh", avatar: "https://via.placeholder.com/60" },
];

const INFO_CONTENT = [
  { id: 1, title: "Farming Tip", description: "Store crops in cool, dry place." },
  { id: 2, title: "Market Update", description: "Tomato price increased by 5%." },
];

/* ---------------- HOME SCREEN ---------------- */
export default function HomeScreen() {
  const { user, isGuest } = useAuth();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200); // simulate API
  }, []);

  // Navigate to LoginBuyer if guest
  const requireLogin = () => {
    if (isGuest) {
      navigation.navigate("LoginBuyer");
      return true;
    }
    return false;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>DigitalKisan 🌱</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={requireLogin}>
            <Text style={styles.profileText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={requireLogin}>
            <Text style={styles.profileText}>{isGuest ? "Login" : "Profile"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search crops, farmers…" style={styles.searchInput} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BANNERS */}
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
          style={{ marginBottom: 15 }}
        >
          {BANNERS.map((b, index) => {
            const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];
            const scale = scrollX.interpolate({ inputRange, outputRange: [0.9, 1, 0.9], extrapolate: "clamp" });
            return (
              <Animated.View key={b.id} style={[styles.banner, { transform: [{ scale }] }]}>
                <Image source={{ uri: b.image }} style={styles.bannerImg} />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerText}>{b.title}</Text>
                </View>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>

        {/* CATEGORIES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
          {CATEGORIES.map((cat) => (
            <View key={cat.id} style={[styles.categoryCard, { backgroundColor: cat.color }]}>
              <Text style={{ fontWeight: "600", color: "#333" }}>{cat.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* FEATURED PRODUCTS */}
        <Section title="Featured Products">
          <FlatList
            horizontal
            data={PRODUCTS}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => <AnimatedProductCard product={item} delay={index * 100} onAdd={requireLogin} />}
          />
        </Section>

        {/* SHOP BY FARMER */}
        <Section title="Shop by Farmer">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FARMERS.map((f) => (
              <View key={f.id} style={styles.farmerCard}>
                <Image source={{ uri: f.avatar }} style={styles.farmerAvatar} />
                <Text style={{ fontWeight: "600", marginTop: 5 }}>{f.name}</Text>
                <Text style={{ color: "#555" }}>{f.location}</Text>
                <TouchableOpacity style={styles.viewProductsBtn} onPress={requireLogin}>
                  <Text style={{ color: "#fff" }}>View Products</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </Section>

        {/* INFO / TIPS */}
        <Section title="Tips & Updates">
          {INFO_CONTENT.map((info) => (
            <View key={info.id} style={styles.infoCard}>
              <Text style={{ fontWeight: "600" }}>{info.title}</Text>
              <Text style={{ color: "#555" }}>{info.description}</Text>
            </View>
          ))}
        </Section>
      </ScrollView>

      {/* FLOATING CART BUTTON */}
      <TouchableOpacity style={styles.fab} onPress={requireLogin}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>🛒</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------- SECTION ---------------- */
const Section = ({ title, children }: any) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={{ fontSize: 18, fontWeight: "700", marginLeft: 10, marginBottom: 5, color: "#333" }}>{title}</Text>
    {children}
  </View>
);

/* ---------------- PRODUCT CARD ---------------- */
const AnimatedProductCard = ({ product, delay, onAdd }: any) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, []);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <Animated.View style={[styles.productCard, { transform: [{ scale }], opacity }]}>
      <Image source={{ uri: "https://via.placeholder.com/140" }} style={styles.productImg} />
      <View style={[styles.badge, { backgroundColor: "#FFB300" }]}>
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>{product.discount}% OFF</Text>
      </View>
      <Text style={{ fontWeight: "600", marginTop: 5 }}>{product.name}</Text>
      <Text style={{ color: "#4CAF50", fontWeight: "600" }}>Rs {product.price}/kg</Text>
      <Text style={{ fontSize: 12, color: "#555" }}>⭐ {product.rating}</Text>
      <Text style={{ color: "#555", fontSize: 12 }}>{product.farmer}</Text>
      <TouchableOpacity style={[styles.addBtn, { backgroundColor: "#4CAF50" }]} onPress={onAdd}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Add</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#4CAF50" },
  logo: { fontSize: 22, fontWeight: "700", color: "#fff" },
  profileText: { color: "#fff", fontWeight: "600" },
  searchContainer: { margin: 10, backgroundColor: "#fff", borderRadius: 10, padding: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 2 },
  searchInput: { fontSize: 16 },
  banner: { width: SCREEN_WIDTH - 20, marginHorizontal: 10, borderRadius: 15, overflow: "hidden" },
  bannerImg: { width: "100%", height: 180, borderRadius: 15 },
  bannerOverlay: { position: "absolute", bottom: 15, left: 15 },
  bannerText: { color: "#fff", fontSize: 20, fontWeight: "700", textShadowColor: "#000", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  categoryCard: { padding: 15, marginHorizontal: 10, borderRadius: 12, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  productCard: { width: 160, padding: 10, marginHorizontal: 10, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, backgroundColor: "#FAFAFA" },
  productImg: { width: 140, height: 140, borderRadius: 12 },
  badge: { position: "absolute", top: 10, left: 10, paddingVertical: 2, paddingHorizontal: 5, borderRadius: 8 },
  addBtn: { position: "absolute", bottom: 10, right: 10, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 },
  farmerCard: { width: 120, backgroundColor: "#fff", marginHorizontal: 10, padding: 10, borderRadius: 15, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 },
  farmerAvatar: { width: 60, height: 60, borderRadius: 30 },
  viewProductsBtn: { marginTop: 10, backgroundColor: "#4CAF50", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 },
  infoCard: { marginHorizontal: 10, marginVertical: 5, padding: 15, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, elevation: 2, backgroundColor: "#E8F5E9" },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#4CAF50", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", elevation: 6 },
});
