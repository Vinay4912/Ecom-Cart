import express from "express";
import CartItem from "../models/CartItem.js";
import Receipt from "../models/Receipt.js"; // 👈 new import

const router = express.Router();

// POST /api/checkout
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const cartItems = await CartItem.find().populate("productId");
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cartItems.map((item) => ({
      name: item.productId.name,
      qty: item.qty,
      price: item.productId.price,
    }));

    const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
    const timestamp = new Date();

    // Save the receipt in MongoDB
    const savedReceipt = await Receipt.create({
      name,
      email,
      items,
      total,
      timestamp,
    });

    // Clear cart
    await CartItem.deleteMany({});

    res.json({
      message: "Checkout successful",
      receipt: savedReceipt,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Checkout failed" });
  }
});

export default router;
