// models/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    // CATEGORY
    category: { type: String, required: true }, // Vegetables, Fruits, Grains, etc.

    // PRICING & STOCK
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: "kg" }, // kg, ton, etc.

    // IMAGES (ONLY VERIFIED SHOWN TO BUYER)
    images: [
      {
        url: { type: String, required: true },
        verified: { type: Boolean, default: false },
      },
    ],

    // FARMER INFO
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    farmerName: { type: String, required: true },
    farmerLocation: { type: String, default: "" },

    // RATING (AGGREGATED)
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    // DISCOUNT
    discount: {
      percentage: { type: Number, default: 0 },
      validTill: { type: Date },
    },

    // AI QUALITY CHECK
    aiVerification: {
      grade: { type: String, default: "C" }, // A, B, C
      qualityScore: { type: Number, default: 0 },
      isVerified: { type: Boolean, default: false }, // only verified crops show
    },

    // VISIBILITY
    isActive: { type: Boolean, default: true },

    // ---------------- PRODUCT DETAIL INFO ----------------
    specifications: {
      weight: { type: String },         // e.g., "500g per pack"
      organic: { type: Boolean, default: false },
      shelfLife: { type: String },      // e.g., "7 days"
      storage: { type: String },        // e.g., "Keep in cool dry place"
    },

    reviews: [
      {
        buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
        rating: { type: Number, required: true },
        comment: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    tags: [{ type: String }], // optional keywords for search
  },
  { timestamps: true } // createdAt, updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;
