import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/api";

const ProductList = ({ refreshCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    load();
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id);
    refreshCart();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        Featured Products
      </h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-gray-900 to-black text-white p-5 rounded-2xl shadow-lg hover:shadow-gray-700/40 transition-transform transform hover:scale-105 border border-gray-700"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-400 mb-3 text-sm">{product.description}</p>
            <p className="text-xl font-bold mb-4">${product.price}</p>
  
            <button
              onClick={() => handleAdd(product._id)}
              className="w-full bg-gradient-to-r from-gray-200 to-gray-400 text-black font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-gray-400/30 hover:scale-105 transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ProductList;

