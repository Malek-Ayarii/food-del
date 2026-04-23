# 🥗 Tomato - Full Stack Food Delivery Application

Tomato is a comprehensive food delivery platform featuring a customer storefront, an administrative dashboard, and a robust back-end API. Users can browse a variety of dishes, manage their cart, and complete secure payments via Stripe.

## 🚀 Live Demo
*(Optional: Add your hosted link here)*

---

## 🛠️ Tech Stack

### Frontend & Admin
- **React 19**
- **Vite** (Build tool)
- **Context API** (State management)
- **Vanilla CSS** (Custom styling)
- **React Router v7** (Navigation)

### Backend
- **Node.js**
- **Express.js** (Web framework)
- **MongoDB Atlas** (Database)
- **Mongoose** (ODM)
- **JWT** (Security & Authentication)
- **Multer** (Image uploads)
- **Stripe** (Payment integration)

---

## ✨ Features

### Customer Features
- **Dynamic Menu**: Filter items by category.
- **Shopping Cart**: Real-time cart updates synced with the database.
- **Secure Authentication**: User registration and login with JWT.
- **Secure Checkout**: Integrated Stripe payment gateway.
- **Order Tracking**: View order status (Processing → Out for Delivery → Delivered).

### Admin Features
- **Inventory Management**: Add, list, and remove food items.
- **Order Management**: Monitor and update order fulfillment status.
- **Image Upload**: Upload product images directly to the server.

---

## ⚙️ Project Structure

```text
food-del/
├── backend/       # Node.js + Express API
├── frontend/      # React Client App
└── admin/         # React Admin Dashboard
```

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Malek-Ayarii/food-del.git
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add:
```env
MONGODB_URI='your_mongodb_connection_string'
JWT_SECRET='your_jwt_secret'
STRIPE_SECRET_KEY='your_stripe_secret_key'
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Admin Panel Setup
```bash
cd ../admin
npm install
npm run dev
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

**Developed with ❤️ by [Malek Ayarii](https://github.com/Malek-Ayarii)**
