import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/api";

const Cart = ({ cartUpdated, openCheckout }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    const data = await getCart();
    setCart(data.items || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    loadCart();
  }, [cartUpdated]);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  return (
    <div className="p-6 mt-8 rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 to-black text-white border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        🛍️ Your Cart
      </h2>
  
      {cart.length === 0 ? (
        <p className="text-gray-400 text-center py-6 italic">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-gray-800/60 backdrop-blur-md p-3 rounded-xl hover:bg-gray-800/90 transition-all duration-300"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.productId?.name}</span>
                  <span className="text-gray-400 text-sm">x {item.qty}</span>
                </div>
  
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-200">
                    ${item.productId?.price * item.qty}
                  </span>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-400 hover:text-red-300 transition-transform transform hover:scale-110"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
  
          <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </p>
            <button
              onClick={openCheckout}
              className="bg-gradient-to-r from-gray-200 to-gray-500 text-black font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-gray-500/30 hover:scale-105 transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Cart;
