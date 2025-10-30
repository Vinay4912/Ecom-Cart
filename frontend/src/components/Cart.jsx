import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart({ onCheckout }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/cart").then((res) => setCart(res.data));
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    const res = await axios.get("http://localhost:5000/api/cart");
    setCart(res.data);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">🛍️ Cart</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.productId.name} (x{item.qty})</span>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="font-bold mt-2">Total: ₹{cart.total}</h3>
          <button
            onClick={onCheckout}
            className="bg-green-500 text-white px-3 py-1 mt-3 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
