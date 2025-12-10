import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, isAuthenticated } = useGlobal();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50; // Flat rate
  const total = subtotal + shipping;

  const handleCheckout = () => {
      if(isAuthenticated) {
          navigate('/checkout');
      } else {
          navigate('/auth');
      }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <Link to="/shop" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="sm:ml-6 flex-1 mt-4 sm:mt-0">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 flex items-center text-sm"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow-lg transition flex justify-center items-center"
              >
                Checkout Now <CreditCard className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
