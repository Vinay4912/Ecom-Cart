import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList({ onAdd }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (id) => {
    await axios.post("http://localhost:5000/api/cart", { productId: id, qty: 1 });
    onAdd();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {products.map((p) => (
        <div key={p._id} className="border p-3 bg-white rounded shadow">
          <h3 className="font-semibold">{p.name}</h3>
          <p>₹{p.price}</p>
          <button
            onClick={() => addToCart(p._id)}
            className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
