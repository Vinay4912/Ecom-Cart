import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  // productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  // qty: Number,

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // 👈 must match your Product model name
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default mongoose.model("CartItem", cartItemSchema);
