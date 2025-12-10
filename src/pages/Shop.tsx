import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { useGlobal } from '../context/GlobalContext';
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
  const { addToCart, cart } = useGlobal();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Tools', 'Care', 'Pots', 'Seeds', 'Soil'];
  
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Garden Shop</h1>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === cat 
                        ? 'bg-[#22c55e] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="h-48 overflow-hidden bg-gray-100 relative group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs font-bold text-[#22c55e] uppercase mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-900 mb-1 text-base">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#e9fcf0] text-[#15803d] hover:bg-[#dcfce7] px-4 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart Footer */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-4 z-50 animate-fade-in-up">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total</p>
              <h2 className="text-3xl font-bold text-gray-900">₹{cartTotal}</h2>
            </div>
            <button 
              onClick={() => navigate('/cart')}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-10 rounded-lg text-lg shadow-lg hover:shadow-green-500/40 transition-all transform hover:-translate-y-1"
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;