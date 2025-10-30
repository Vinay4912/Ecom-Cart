// import React, { useState } from "react";
// import axios from "axios";

// export default function CheckoutModal({ onClose }) {
//   const [form, setForm] = useState({ name: "", email: "" });
//   const [receipt, setReceipt] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:5000/api/checkout", form);
//     setReceipt(res.data.receipt);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded w-96">
//         {!receipt ? (
//           <form onSubmit={handleSubmit}>
//             <h2 className="text-xl font-semibold mb-4">Checkout</h2>
//             <input
//               className="border w-full p-2 mb-2"
//               placeholder="Name"
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             <input
//               className="border w-full p-2 mb-2"
//               placeholder="Email"
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//             <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
//           </form>
//         ) : (
//           <>
//             <h2 className="text-lg font-semibold mb-3">✅ Order Confirmed!</h2>
//             <p>Name: {receipt.name}</p>
//             <p>Email: {receipt.email}</p>
//             <p>Total: ₹{receipt.total}</p>
//             <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
//             <button
//               onClick={onClose}
//               className="mt-3 bg-gray-600 text-white px-3 py-1 rounded"
//             >
//               Close
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react'
import API from '../api/api'


export default function CheckoutModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [receipt, setReceipt] = useState(null)


  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await API.post('/checkout', form)
      setReceipt(res.data.receipt)
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Checkout failed', err)
      alert(err.response?.data?.message || 'Checkout failed')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded p-5">
        {!receipt ? (
          <form onSubmit={submit}>
            <h3 className="text-lg font-semibold mb-3">Checkout</h3>
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <input required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={onClose} className="px-3 py-1">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">{loading ? 'Processing...' : 'Pay (Mock)'}</button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">Order Confirmed</h3>
            <p className="mt-2">Total: ₹{receipt.total}</p>
            <p className="text-sm text-gray-600">Time: {new Date(receipt.timestamp).toLocaleString()}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={onClose} className="bg-gray-600 text-white px-3 py-1 rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}