// import React, { useState } from "react";
// import ProductList from "./components/ProductList";
// import Cart from "./components/Cart";
// import CheckoutModal from "./components/CheckoutModal";

// export default function App() {
//   const [cartUpdated, setCartUpdated] = useState(false);
//   const [showCheckout, setShowCheckout] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">🛒 Mock E-Com Cart</h1>
//       <ProductList onAdd={() => setCartUpdated(!cartUpdated)} />
//       <Cart
//         key={cartUpdated}
//         onCheckout={() => setShowCheckout(true)}
//       />
//       {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
//     </div>
//   );
// }


import React, { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'


export default function App() {
  const [cartKey, setCartKey] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)


  // bump cartKey to force Cart refetch when items change
  const refreshCart = () => setCartKey((k) => k + 1)


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Vibe Commerce — Mock Cart</h1>
          <button
            onClick={() => setShowCheckout(true)}
            className="hidden md:inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </header>


        <ProductList onAdd={refreshCart} />
        <Cart key={cartKey} onCheckout={() => setShowCheckout(true)} onChanged={refreshCart} />


        {showCheckout && (
          <CheckoutModal onClose={() => setShowCheckout(false)} onSuccess={() => { setShowCheckout(false); refreshCart(); }} />
        )}
      </div>
    </div>
  )
}