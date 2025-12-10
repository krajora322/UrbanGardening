import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider, useGlobal } from './context/GlobalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Gardeners from './pages/Gardeners';
import PlantAI from './pages/PlantAI';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Booking from './pages/Booking';

const ToastNotification = () => {
  const { notifications } = useGlobal();

  if (!notifications) return null;

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-all transform duration-300 ${
      notifications.type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {notifications.message}
    </div>
  );
};

const AppContent = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/gardeners" element={<Gardeners />} />
            <Route path="/ai-diagnosis" element={<PlantAI />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/book/:gardenerId" element={<Booking />} />
          </Routes>
        </div>
        <Footer />
        <ToastNotification />
      </div>
    </Router>
  );
};

function App() {
  return (
    // Explicitly passing children to resolve TypeScript error
    <GlobalProvider children={<AppContent />} />
  );
}

export default App;