import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, description, imageUri } = req.body;
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      description,
      imageUri,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};
