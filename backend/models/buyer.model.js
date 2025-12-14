// buyer.model.js without personal info
const buyerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // links to User schema

  // Cart
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],

  orders: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      totalPrice: Number,
      status: { type: String, default: "pending" },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});
