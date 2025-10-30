import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, email } = req.body;
//   const items = await CartItem.find().populate("productId");
//   const total = items.reduce((acc, item) => acc + item.productId.price * item.qty, 0);
//   const timestamp = new Date().toISOString();

//   await CartItem.deleteMany({});

//   res.json({
//     receipt: {
//       name,
//       email,
//       total,
//       timestamp,
//     },
//   });
// });

// POST /api/checkout
router.post("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce((acc, item) => {
      if (!item.productId) return acc;
      return acc + item.productId.price * item.qty;
    }, 0);

    // Create mock receipt
    const receipt = {
      items: cartItems.map((item) => ({
        name: item.productId.name,
        qty: item.qty,
        price: item.productId.price,
      })),
      total,
      timestamp: new Date(),
    };

    // Clear the cart after checkout
    await CartItem.deleteMany({});

    res.json({
      message: "Checkout successful",
      receipt,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Checkout failed" });
  }
});


export default router;
