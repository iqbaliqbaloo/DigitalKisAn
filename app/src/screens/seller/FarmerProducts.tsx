import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  image: string;
}

export default function FarmerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state for Add/Edit
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setProducts([
        { id: "1", name: "Rice", category: "Grain", price: 500, quantity: 50, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=200&q=80" },
        { id: "2", name: "Tomato", category: "Vegetable", price: 50, quantity: 5, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=200&q=80" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName(""); setPrice(""); setQuantity(""); setCategory(""); setDescription(""); setImage("");
    setModalVisible(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name); setPrice(String(product.price)); setQuantity(String(product.quantity));
    setCategory(product.category); setDescription(product.description || ""); setImage(product.image);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Product", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setProducts(products.filter(p => p.id !== id)) },
    ]);
  };

  const handleSubmit = () => {
    if (!name || !price || !quantity || !category) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Math.random().toString(),
      name, price: Number(price), quantity: Number(quantity),
      category, description, image: image || "https://via.placeholder.com/150",
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts([newProduct, ...products]);
    }

    setModalVisible(false);
  };

  const renderRightActions = (product: Product) => (
    <View style={{ flexDirection: "row", width: 120 }}>
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#1976D2" }]} onPress={() => openEditModal(product)}>
        <MaterialIcons name="edit" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#D32F2F" }]} onPress={() => handleDelete(product.id)}>
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: Product }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>₹ {item.price}</Text>
          <Text style={[styles.quantity, { color: item.quantity < 10 ? "#D32F2F" : "#4CAF50" }]}>Stock: {item.quantity}</Text>
        </View>
      </View>
    </Swipeable>
  );

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" color="#4CAF50" /></View>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList data={products} keyExtractor={item => item.id} renderItem={renderItem} contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false} />

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={openAddModal}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Add/Edit Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalBackground}>
            <ScrollView contentContainerStyle={styles.modalContainer}>
              <Text style={styles.modalTitle}>{editingProduct ? "Edit Product" : "Add Product"}</Text>

              <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
              <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
              <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{editingProduct ? "Update Product" : "Add Product"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: "#777", marginTop: 10 }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 12, marginBottom: 16, padding: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 12 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  category: { fontSize: 14, color: "#555", marginTop: 2 },
  price: { fontSize: 14, color: "#000", marginTop: 4, fontWeight: "600" },
  quantity: { fontSize: 14, marginTop: 4, fontWeight: "600" },
  actionButton: { justifyContent: "center", alignItems: "center", width: 60, marginVertical: 8, borderRadius: 12 },
  fab: { position: "absolute", bottom: 24, right: 24, backgroundColor: "#4CAF50", width: 60, height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContainer: { backgroundColor: "#fff", margin: 16, borderRadius: 12, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginVertical: 6 },
  button: { backgroundColor: "#4CAF50", padding: 14, borderRadius: 8, marginTop: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
