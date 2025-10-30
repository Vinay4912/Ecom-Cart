import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
