import express from "express";
import Receipt from "../models/Receipt.js";

const router = express.Router();

// GET /api/receipts - fetch all receipts
router.get("/", async (req, res) => {
  const receipts = await Receipt.find().sort({ timestamp: -1 });
  res.json(receipts);
});

export default router;
