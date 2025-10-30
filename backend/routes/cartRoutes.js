import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET cart items
// router.get("/", async (req, res) => {
//   const items = await CartItem.find().populate("productId");
//   const total = items.reduce((acc, item) => acc + item.productId.price * item.qty, 0);
//   res.json({ items, total });
// });

router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find().populate("productId");

    // Safely calculate total (skip broken references)
    const total = items.reduce((acc, item) => {
      if (!item.productId || !item.productId.price) return acc;
      return acc + item.productId.price * item.qty;
    }, 0);

    res.json({ items, total });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// ADD item to cart
router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  const existing = await CartItem.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
  } else {
    await CartItem.create({ productId, qty });
  }
  res.json({ message: "Item added" });
});

// DELETE item
router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

// TEMP: Clear entire cart (for debugging only)
router.delete("/clear/all", async (req, res) => {
  await CartItem.deleteMany({});
  res.json({ message: "Cart cleared" });
});


export default router;
