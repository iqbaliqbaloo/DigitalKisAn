
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AddProduct({ navigation }: any) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // Single-select category
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { label: "Crop", value: "Crop" },
    { label: "Rice", value: "Rice" },
    { label: "Vegetable", value: "Vegetable" },
    { label: "Fruit", value: "Fruit" },
    { label: "Spices", value: "Spices" },
    { label: "Herbs", value: "Herbs" },
  ]);

  // Pick multiple images
  const pickImages = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "Allow access to photos to continue.");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        const selected = result.assets.map((asset: any) => asset.uri);
        setImages([...images, ...selected]);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };

  const handleSubmit = () => {
    if (!productName || !category || !price || !quantity) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    const productData = {
      productName,
      category,
      price,
      quantity,
      description,
      images,
    };
    console.log("Product Submitted:", productData);
    Alert.alert("Success", "Product added successfully!");
    setProductName("");
    setCategory(null);
    setPrice("");
    setQuantity("");
    setDescription("");
    setImages([]);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.heading}>Add New Product</Text>

      {/* Product Name */}
      <Text style={styles.label}>Product Name *</Text>
      <TextInput
        value={productName}
        onChangeText={setProductName}
        placeholder="Enter product name"
        style={styles.input}
      />

      {/* Single-select Category */}
      <Text style={styles.label}>Category *</Text>
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categories}
        setOpen={setOpenCategory}
        setValue={setCategory}
        setItems={setCategories}
        placeholder="Select category"
        style={styles.dropdown}
        dropDownContainerStyle={{ backgroundColor: "#fff", borderRadius: 10 }}
      />

      {/* Price & Quantity */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        <View style={{ width: "48%" }}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <View style={{ width: "48%" }}>
          <Text style={styles.label}>Quantity *</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            placeholder="0"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter product description"
        style={[styles.input, { height: 100 }]}
        multiline
      />

      {/* Images */}
      <Text style={styles.label}>Images</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => setImages(images.filter((_, i) => i !== index))}
            >
              <MaterialIcons name="cancel" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addImage} onPress={pickImages}>
          <MaterialIcons name="add" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  label: { fontSize: 16, marginBottom: 6, color: "#555" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
  },
  imageWrapper: {
    marginRight: 12,
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { width: 100, height: 100, borderRadius: 12 },
  removeIcon: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    padding: 2,
  },
  addImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    marginVertical: 24,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
