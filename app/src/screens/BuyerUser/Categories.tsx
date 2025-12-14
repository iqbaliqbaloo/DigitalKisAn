import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

/* ---------------- MOCK AUTH ---------------- */
const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  return { user, isGuest: !user, setUser };
};

/* ---------------- MOCK DATA ---------------- */
const CATEGORIES = [
  { id: 1, name: "Vegetables", color: "#C8E6C9" },
  { id: 2, name: "Fruits", color: "#FFF9C4" },
  { id: 3, name: "Grains", color: "#FFE0B2" },
  { id: 4, name: "Seeds", color: "#D1C4E9" },
  { id: 5, name: "Tools", color: "#B2DFDB" },
];

const PRODUCTS = [
  { id: 1, name: "Tomato", price: 120, rating: 4.5, discount: 10, categoryId: 1 },
  { id: 2, name: "Onion", price: 80, rating: 4.2, discount: 5, categoryId: 1 },
  { id: 3, name: "Apple", price: 150, rating: 4.8, discount: 12, categoryId: 2 },
  { id: 4, name: "Wheat", price: 60, rating: 4.3, discount: 8, categoryId: 3 },
  { id: 5, name: "Carrot", price: 90, rating: 4.1, discount: 5, categoryId: 1 },
];

/* ---------------- SCREEN ---------------- */
export default function CategoriesScreen() {
  const { isGuest } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const animValues = useRef(PRODUCTS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    setTimeout(() => setLoading(false), 800); // simulate API
    animateProducts();
  }, [selectedCategory]);

  const requireLogin = () => {
    if (isGuest) {
      setShowLoginModal(true);
      return true;
    }
    return false;
  };

  const animateProducts = () => {
    animValues.forEach((anim, index) => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  };

  const filteredProducts = PRODUCTS.filter(p => p.categoryId === selectedCategory.id);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* CATEGORY LIST */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryCard,
              { backgroundColor: cat.color },
              selectedCategory.id === cat.id && { borderWidth: 2, borderColor: "#4CAF50" },
            ]}
          >
            <Text style={{ fontWeight: "600", color: "#333" }}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* SORT OPTIONS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10, paddingHorizontal: 10 }}>
        <SortButton title="Price ↑" />
        <SortButton title="Price ↓" />
        <SortButton title="Rating" />
        <SortButton title="Discount" />
      </ScrollView>

      {/* PRODUCTS LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => {
          const scale = animValues[index].interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
          const opacity = animValues[index].interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
          return (
            <Animated.View style={[styles.productCard, { transform: [{ scale }], opacity }]}>
              <Image source={{ uri: "https://via.placeholder.com/140" }} style={styles.productImg} />
              <View style={[styles.badge, { backgroundColor: "#FFB300" }]}>
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>{item.discount}% OFF</Text>
              </View>
              <Text style={{ fontWeight: "600", marginTop: 5 }}>{item.name}</Text>
              <Text style={{ color: "#4CAF50", fontWeight: "600" }}>Rs {item.price}/kg</Text>
              <Text style={{ fontSize: 12, color: "#555" }}>⭐ {item.rating}</Text>
              <TouchableOpacity style={[styles.addBtn, { backgroundColor: "#4CAF50" }]} onPress={requireLogin}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Add</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />

      {/* LOGIN MODAL */}
      <LoginRequiredModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </SafeAreaView>
  );
}

/* ---------------- SORT BUTTON ---------------- */
const SortButton = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.sortBtn}>
    <Text style={{ color: "#4CAF50", fontWeight: "600" }}>{title}</Text>
  </TouchableOpacity>
);

/* ---------------- LOGIN MODAL ---------------- */
const LoginRequiredModal = ({ visible, onClose }: any) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modal}>
      <View style={styles.modalBox}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>Login Required</Text>
        <Text style={{ color: "#555" }}>Login to add items to cart & buy</Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ marginTop: 10, color: "#4CAF50" }}>Continue Browsing</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  categoryCard: { padding: 15, marginHorizontal: 10, borderRadius: 12, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  sortBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: "#4CAF50", marginRight: 10 },
  productCard: { width: 160, padding: 10, margin: 8, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3, backgroundColor: "#FAFAFA" },
  productImg: { width: 140, height: 140, borderRadius: 12 },
  badge: { position: "absolute", top: 10, left: 10, paddingVertical: 2, paddingHorizontal: 5, borderRadius: 8 },
  addBtn: { position: "absolute", bottom: 10, right: 10, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 },
  modal: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalBox: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  loginBtn: { backgroundColor: "#4CAF50", padding: 12, marginTop: 15, borderRadius: 12, alignItems: "center" },
});
