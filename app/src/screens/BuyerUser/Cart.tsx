import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

/* ---------------- MOCK AUTH ---------------- */
const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  return { user, isGuest: !user, setUser };
};

/* ---------------- MOCK CART DATA ---------------- */
const MOCK_CART = [
  { id: 1, name: "Tomato", price: 120, qty: 1, image: "https://via.placeholder.com/140" },
  { id: 2, name: "Onion", price: 80, qty: 2, image: "https://via.placeholder.com/140" },
  { id: 3, name: "Carrot", price: 90, qty: 1, image: "https://via.placeholder.com/140" },
];

/* ---------------- SCREEN ---------------- */
export default function CartScreen() {
  const { isGuest } = useAuth();
  const [cart, setCart] = useState(MOCK_CART);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setLoading(false), 800); // simulate API
  }, []);

  const requireLogin = () => {
    if (isGuest) {
      setShowLoginModal(true);
      return true;
    }
    return false;
  };

  const increaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQty = (id: number) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: Math.max(item.qty - 1, 1) } : item))
    );
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = 0; // can implement later
  const total = subtotal - discount;

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 10, paddingBottom: 120 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        renderItem={({ item, index }) => (
          <AnimatedCartItem
            item={item}
            delay={index * 100}
            onIncrease={() => increaseQty(item.id)}
            onDecrease={() => decreaseQty(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "#555", fontSize: 16 }}>Your cart is empty</Text>
          </View>
        }
      />

      {/* PRICE SUMMARY */}
      {cart.length > 0 && (
        <View style={styles.summaryCard}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Subtotal: Rs {subtotal}</Text>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Discount: Rs {discount}</Text>
          <Text style={{ fontWeight: "700", fontSize: 18, marginTop: 5 }}>Total: Rs {total}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={requireLogin}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LOGIN MODAL */}
      <LoginRequiredModal visible={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </SafeAreaView>
  );
}

/* ---------------- CART ITEM ---------------- */
const AnimatedCartItem = ({ item, delay, onIncrease, onDecrease, onRemove }: any) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 400,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <Animated.View style={[styles.cartItem, { transform: [{ scale }], opacity }]}>
      <Image source={{ uri: item.image }} style={styles.cartImg} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "600" }}>{item.name}</Text>
        <Text style={{ color: "#4CAF50", fontWeight: "600" }}>Rs {item.price}/kg</Text>
        <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10 }}>{item.qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={{ padding: 5 }}>
        <Text style={{ color: "#FF5252", fontWeight: "700" }}>Remove</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

/* ---------------- LOGIN MODAL ---------------- */
const LoginRequiredModal = ({ visible, onClose }: any) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modal}>
      <View style={styles.modalBox}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>Login Required</Text>
        <Text style={{ color: "#555" }}>Login to checkout your cart</Text>
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
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 6,
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cartImg: { width: 80, height: 80, borderRadius: 12 },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "#4CAF50", justifyContent: "center", alignItems: "center" },
  summaryCard: { position: "absolute", bottom: 0, width: "100%", backgroundColor: "#fff", padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: -2 }, shadowRadius: 6, elevation: 6 },
  checkoutBtn: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 15, alignItems: "center", marginTop: 10 },
  modal: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalBox: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  loginBtn: { backgroundColor: "#4CAF50", padding: 12, marginTop: 15, borderRadius: 12, alignItems: "center" },
});
