import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String, // vegetables, fruits
      required: true,
      unique: true,
      lowercase: true,
    },

    iconUrl: {
      type: String, // used in Home.tsx
      default: "",
    },

    color: {
      type: String, // #C8E6C9 etc
      default: "#E8F5E9",
    },

    order: {
      type: Number, // for sorting on UI
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
