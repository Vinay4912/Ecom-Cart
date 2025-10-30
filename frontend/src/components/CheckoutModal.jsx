import React, { useState } from "react";
import { checkout } from "../api/api";

const CheckoutModal = ({ close, refreshCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);

  const handleCheckout = async () => {
    try {
      const data = await checkout(name, email);
      setReceipt(data.receipt);
      refreshCart();
    } catch (err) {
      alert("Checkout failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        {!receipt ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Complete Checkout
            </h2>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-5 p-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-gray-500"
            />

            <div className="flex justify-between">
              <button
                onClick={close} // ✅ Fixed here
                className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-gray-200 to-gray-500 text-black hover:scale-105 transition-all"
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
              ✅ Payment Successful
            </h2>
            <div className="bg-gray-800 rounded-lg p-4 space-y-2 border border-gray-700">
              <p><span className="text-gray-400">Name:</span> {receipt.name}</p>
              <p><span className="text-gray-400">Email:</span> {receipt.email}</p>
              <p><span className="text-gray-400">Total:</span> ${receipt.total}</p>
              <p>
                <span className="text-gray-400">Date:</span>{" "}
                {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={close}
              className="w-full mt-5 py-2 rounded-xl bg-gradient-to-r from-gray-200 to-gray-500 text-black font-semibold hover:scale-105 transition-all"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
