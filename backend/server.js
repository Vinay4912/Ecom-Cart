import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import dotenv from "dotenv"

dotenv.config()
const app = express();

const PORT = process.env.PORT || 5000
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

app.listen(PORT, () => console.log("🚀 Server running on port 5000"));
