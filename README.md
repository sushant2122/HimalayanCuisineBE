# 🥘 Himalayan Cuisine Backend

The **Himalayan Cuisine Backend** is a RESTful API built to power a restaurant management system. It handles core restaurant operations such as menu management, order processing, user authentication, promotions, and transactions. The system is structured into modular components for scalability and maintainability.

---

## 🚀 Features

- 🔐 Authentication & Role Management
- 🍽️ Category, Dish & Ingredient Management
- 🧾 Order & Order Item Processing
- 💳 Transaction Handling
- 🎟️ Promo Code System
- 🖼️ Banner Management
- 👤 User Management

---

## 📦 Modules

### 🔑 Auth
Handles user login, registration, and authentication logic.

### 👥 User
Manages user profiles and account information.

### 🛡️ Role
Defines user roles and access control permissions.

### 🖼️ Banner
Manages promotional banners displayed in the frontend.

### 📂 Category
Handles food categories and classification of dishes.

### 🍛 Dish
Manages restaurant menu items including food details and pricing.

### 🧂 Ingredient
Stores and manages ingredients used in dishes.

### 🔗 Dish Ingredient
Maps relationships between dishes and their ingredients.

### 🛒 Order
Handles customer orders and order lifecycle management.

### 📦 Order Item
Manages individual items inside an order.

### 💰 Transaction
Processes and records payment transactions.

### 🎫 Promocode
Manages discount codes and promotional offers.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Database: (e.g., MySQL / PostgreSQL / MongoDB – update if needed)
- REST API Architecture

---


## ⚙️ Installation

```bash
# Clone repository
git clone <repo-url>

```bash
# setup env (us the env sample.)
vi .env 

```bash
# Install dependencies
npm install

```bash
# Run project
npm start