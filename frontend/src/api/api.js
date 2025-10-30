const API_URL = "http://localhost:5000/api";

// Fetch all products
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Get cart
export const getCart = async () => {
  const res = await fetch(`${API_URL}/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

// Add item to cart
export const addToCart = async (productId) => {
  const res = await fetch(`${API_URL}/cart/${productId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty: 1 }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

// Remove item
export const removeFromCart = async (id) => {
  const res = await fetch(`${API_URL}/cart/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
};

// Checkout
export const checkout = async (name, email) => {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) throw new Error("Checkout failed");
  return res.json();
};

