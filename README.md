# 🛒 Vibe Commerce — Mock E-Commerce App

A sleek, modern, and fully responsive **mock e-commerce platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project demonstrates end-to-end e-commerce functionality — from product listing to cart management and checkout — wrapped in a stunning dark gradient UI.

---

## 🌐 Live Repository
🔗 **GitHub Repo:** [Vinay4912/Ecom-Cart](https://github.com/Vinay4912/Ecom-Cart)

---

## 🚀 Features

- 🧾 **Product Listing** – Displays all available products fetched from MongoDB.
- 🛍️ **Cart Management** – Add or remove items dynamically with live total calculation.
- 💳 **Checkout Flow** – Enter name and email, confirm checkout, and view receipt.
- 🎨 **Beautiful UI** – Dark mode glassmorphism with gradient effects.
- ⚙️ **Modular Codebase** – Clean separation of frontend and backend using REST APIs.
- 🗄️ **Database Integration** – Persistent product and cart data via MongoDB.

---

## ⚙️ Tech Stack

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Mongoose) |
| **HTTP Client** | Axios |
| **UI Design** | Tailwind gradients, glassmorphism |

---

## 🧠 How It Works

1. **Frontend (React)** handles product display, cart logic, and checkout modal.  
2. **Backend (Express)** exposes REST APIs to manage products, cart, and receipts.  
3. **MongoDB** stores all products, cart items, and checkout receipts.  
4. **Checkout Modal** collects user info, generates receipt, and clears cart.

---

## 🛠️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Vinay4912/Ecom-Cart.git
cd Ecom-Cart
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a .env file inside the backend folder:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Seed the Database (Optional)
To insert default products into the database:
```bash
GET http://localhost:5000/api/products/seed
```
You can visit that link in the browser or hit it from Postman once.

### 4. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

### 5. Run the App
Now open your browser and visit:
```bash
http://localhost:5173
```
You’ll see the Vibe Commerce Mock E-Com interface with products, cart, and checkout modal.
