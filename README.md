
# 🌱 Urban Gardening India

A full-stack React application that helps urban gardeners shop for plants and tools, book professional gardeners, and get AI-powered plant health insights — all in one platform.

---

## 1. Basics

### Project Title
**Urban Gardening India**

### Short Description
A modern web platform for urban gardening that combines e-commerce, service booking, and intelligent plant diagnosis to simplify plant care for beginners and homeowners.

### Technologies Used
- **Frontend:** React, TypeScript, React Router DOM, Tailwind CSS  
- **State Management:** React Context API, Custom Hooks  
- **AI Integration:** AI-based image analysis for plant health diagnosis  
- **Build Tools:** Vite / Create React App, TypeScript Compiler  

---

## 2. Demo & Links

- **Live App:** https://urban-gardening-five.vercel.app/

**Screenshots**
- Home Page  
- Product Shop  
- Gardener Booking  
- AI Plant Diagnosis  
- User Profile  

---

## 3. Features

### 🏠 Home
- Displays a hero section with clear calls to action  
- Highlights core services: Shop, Book Gardener, AI Plant Diagnosis  
- Fully responsive layout for mobile, tablet, and desktop  

**Why this matters:**  
As a visitor, I can quickly understand what the platform offers and navigate to the service I need.

---

### 🛒 E-Commerce Shop

#### Product Catalog
- Displays products across multiple categories such as Plants, Tools, Pots, Seeds, and Soil  
- Allows filtering by category using pill-style buttons  
- Shows product cards with image, price, rating, and description  

**User Benefit:**  
As a shopper, I can filter products by category so that I quickly find relevant items.

#### Shopping Cart
- Updates cart items and total amount in real time  
- Shows a sticky checkout bar while scrolling  
- Allows removing individual products  

**Edge Cases**
- Empty cart shows a friendly empty state with a redirect to the shop  
- Cart data persists during the session using Context API  

#### Checkout
- Provides a multi-step checkout flow  
- Validates required fields before submission  
- Simulates payment processing with loading feedback  

**User Benefit:**  
As a customer, I can place orders smoothly without re-entering details every time.

---

### 👨‍🌾 Gardener Booking

#### Search & Discovery
- Allows searching gardeners by pincode  
- Displays profiles with experience, ratings, and hourly pricing  
- Shows a clear “no results” state when no matches are found  

**User Benefit:**  
As a homeowner, I can find gardeners who operate in my area only.

#### Booking Flow
- Enables date and time slot selection  
- Allows users to describe service requirements in advance  
- Displays transparent pricing with pay-after-service note  

**Edge Cases**
- Unauthenticated users are redirected to login  
- Invalid gardener selection redirects to listing page  

---

### 🤖 AI Plant Diagnosis

#### Image Upload
- Supports drag-and-drop and click-to-upload  
- Shows instant image preview before analysis  
- Accepts JPG and PNG files up to 5MB  

**User Benefit:**  
As a plant owner, I can upload a plant image and get instant guidance without visiting a nursery.

#### Diagnosis Output
- Identifies plant type  
- Detects visible health issues or diseases  
- Provides step-by-step treatment recommendations  

**Edge Cases**
- Missing configuration shows a user-friendly error  
- Network failures display retry messages  

---

### 🔐 Authentication & User Management

#### Authentication
- Supports email/password login and signup  
- Provides social login options  
- Redirects users to profile after successful login  

**User Benefit:**  
As a new user, I can create an account quickly with minimal friction.

#### User Dashboard
- Orders tab shows past purchases with status  
- Appointments tab lists gardener bookings  
- Profile tab allows editing personal information  

**Edge Cases**
- Unauthenticated users are redirected to login  
- Empty states include clear calls to action  

---

### 🔔 Global Features
- Sticky navigation bar with real-time cart badge  
- Toast notifications for user actions  
- Mobile-first, responsive design across all screens  

---

## 4. Quick Start / Installation

### Prerequisites
- Node.js 16 or higher  
- npm 

### Clone & Install
```bash
git clone https://github.com/krajora322/UrbanGardening
cd urban-gardening-india
npm install

---

## **Environment Setup**
Create a .env file in the project root.
**.env.example**
REACT_APP_AI_API_KEY=

## **Run Commands**
npm start
The app runs at: http://http://localhost:3000/

---

## **5. API Reference**
### **Plant Diagnosis (AI Integration)**
**Method**: POST
**Description**: Analyzes uploaded plant images to identify plant type, diagnose health issues, and suggest treatments.

---

## **6. 📁 Project Structure**

urban-gardening-india/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── types.ts
│   ├── App.tsx
│   └── index.tsx
├── .env
├── .env.example
├── package.json
└── README.md

