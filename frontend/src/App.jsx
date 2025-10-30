import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";

const App = () => {
  const [cartUpdated, setCartUpdated] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-200 to-gray-500 text-black p-5 text-center shadow-xl border-b border-gray-600">
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
          🛒 Vibe Commerce <span className="text-gray-700">Mock E-Com</span>
        </h1>
      </header>

      {/* Main Content - centered vertically */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Products Section */}
            <div className="md:col-span-2 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700 shadow-md p-6 hover:shadow-gray-700/30 transition-all">
              <ProductList refreshCart={() => setCartUpdated(!cartUpdated)} />
            </div>

            {/* Cart Section */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700 shadow-md p-6 hover:shadow-gray-700/30 transition-all">
              <Cart
                cartUpdated={cartUpdated}
                openCheckout={() => setCheckoutOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <CheckoutModal
          close={() => setCheckoutOpen(false)}
          refreshCart={() => setCartUpdated(!cartUpdated)}
        />
      )}

      {/* Footer - stays at bottom */}
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} Vibe Commerce
      </footer>
    </div>
  );
};

export default App;
