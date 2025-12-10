import React, { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Hash } from 'lucide-react';

const Checkout = () => {
  const { cart, placeOrder, user, updateUser } = useGlobal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Local state for form fields
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
    // Initialize form with user data
    if (user) {
      setFormData({
        name: user.name || '',
        address: user.address || '',
        pincode: user.pincode || ''
      });
    }
  }, [cart, navigate, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Update user profile with latest shipping info
    updateUser(formData);

    // Simulate payment processing
    setTimeout(() => {
      placeOrder();
      setLoading(false);
      navigate('/profile');
    }, 2000);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + 50;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-green-600 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <CreditCard className="mr-3 h-6 w-6" /> Secure Checkout
          </h2>
          <span className="text-green-100 text-sm font-medium">Encrypted connection</span>
        </div>
        
        <form onSubmit={handlePayment} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            {/* Shipping Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Shipping Details</h3>
              
              <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        onChange={handleInputChange}
                        required
                        className="block w-full pl-10 bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                      />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address} 
                        onChange={handleInputChange}
                        required
                        className="block w-full pl-10 bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                      />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-4 w-4 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="pincode"
                        value={formData.pincode} 
                        onChange={handleInputChange}
                        required
                        className="block w-full pl-10 bg-white border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" 
                      />
                    </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Payment Method</h3>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" required className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry</label>
                    <input type="text" placeholder="MM/YY" required className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
                    <input type="text" placeholder="123" required className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col items-center">
            <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Total Amount to Pay</p>
                <p className="text-3xl font-extrabold text-green-700">₹{total}</p>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 flex justify-center transform hover:-translate-y-0.5 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing Payment...' : 'Pay Now'}
            </button>
            <p className="mt-4 text-xs text-gray-400">
                By clicking "Pay Now", you agree to our Terms of Service.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;