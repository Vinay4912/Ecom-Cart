import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let item = await CartItem.findOne({ productId });

    if (item) {
      item.qty = Number(item.qty || 0) + 1;
      await item.save();
    } else {
      item = await CartItem.create({ productId, qty: 1 });
    }

    res.json({ message: "Added to cart", item });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find().populate("productId");

    const total = items.reduce((acc, item) => {
      if (!item.productId || !item.productId.price) return acc;
      return acc + item.productId.price * item.qty;
    }, 0);

    res.json({ items, total });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item removed", item });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Failed to remove item" });
  }
});

export default router;
