import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

const Navbar = () => {
  const { cart, isAuthenticated } = useGlobal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Book Gardener', path: '/gardeners' },
    { name: 'Plant Doctor', path: '/ai-diagnosis' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-gray-800 shadow-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-green-100 p-2 rounded-xl group-hover:bg-green-200 transition-colors">
                <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-green-800">
              Urban<span className="text-green-600">Gardening</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg font-medium transition-all duration-200 relative py-2 ${
                  isActive(link.path) 
                    ? 'text-green-700 font-semibold' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/cart" className="relative group p-2 rounded-full hover:bg-green-50 transition">
              <ShoppingCart className="h-7 w-7 text-gray-700 group-hover:text-green-600" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transform translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center space-x-2 group">
                <div className="bg-green-100 p-2.5 rounded-full group-hover:bg-green-200 transition border-2 border-transparent group-hover:border-green-300">
                    <User className="h-6 w-6 text-green-700" />
                </div>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none p-2"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 z-40">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-lg font-medium ${
                    isActive(link.path) ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/cart"
                className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
            >
                <span>Cart</span>
                {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
             {isAuthenticated ? (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-50">
                My Profile
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-xl text-lg font-bold bg-green-600 text-white text-center mt-4 shadow-lg">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;