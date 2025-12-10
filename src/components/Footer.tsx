import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Urban Gardening</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting urban dwellers with nature through quality products and expert guidance. 
              Making cities greener, one balcony at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-green-400">Home</a></li>
              <li><a href="#/shop" className="hover:text-green-400">Shop Plants</a></li>
              <li><a href="#/gardeners" className="hover:text-green-400">Book Gardener</a></li>
              <li><a href="#/ai-diagnosis" className="hover:text-green-400">Plant Doctor</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-green-400" /> 123 Green Street, Bangalore, India</li>
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2 text-green-400" /> +91 98765 43210</li>
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2 text-green-400" /> support@urbangardening.in</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400 transition"><Facebook /></a>
              <a href="#" className="hover:text-green-400 transition"><Twitter /></a>
              <a href="#" className="hover:text-green-400 transition"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Urban Gardening India. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
