import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Seed products (only run once if DB empty)
router.get("/seed", async (req, res) => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "T-shirt", price: 499 },
      { name: "Jeans", price: 999 },
      { name: "Sneakers", price: 1999 },
      { name: "Watch", price: 1499 },
      { name: "Bag", price: 799 },
    ]);
  }
  res.send("Products seeded");
});

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;
