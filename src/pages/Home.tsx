import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shovel, Activity, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[85vh] min-h-[600px] flex items-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="bg-green-500/90 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-6 inline-block backdrop-blur-sm">
                #1 Urban Gardening Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Grow Your Own <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Urban Oasis</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light leading-relaxed max-w-2xl">
              Transform your balcony or backyard. Shop premium plants, book expert gardeners, and diagnose plant health instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/shop" className="bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 flex items-center justify-center">
                Shop Now <ShoppingBag className="ml-3 h-6 w-6" />
              </Link>
              <Link to="/gardeners" className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-green-800 px-10 py-4 rounded-full font-bold text-xl transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center">
                Hire a Gardener
              </Link>
            </div>
            
            <div className="mt-12 flex items-center space-x-6 text-sm font-medium text-gray-300">
                <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current h-5 w-5 mr-1" />
                    <span>4.9/5 Rating</span>
                </div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div>10k+ Happy Gardeners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    We provide comprehensive solutions to make your urban gardening journey effortless and rewarding.
                </p>
            </div>
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group bg-white p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-green-100 transition-colors">
                <ShoppingBag className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Products</h3>
              <p className="text-gray-600 mb-8 text-lg">Premium plants, organic fertilizers, and durable tools delivered directly to your doorstep with care.</p>
              <Link to="/shop" className="inline-flex items-center text-green-600 font-bold text-lg hover:text-green-700 hover:underline">
                Browse Shop <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-green-100 transition-colors">
                <Shovel className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Gardeners</h3>
              <p className="text-gray-600 mb-8 text-lg">Book professional gardeners near you for maintenance, landscaping, or personalized advice.</p>
              <Link to="/gardeners" className="inline-flex items-center text-green-600 font-bold text-lg hover:text-green-700 hover:underline">
                Find Experts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-10 rounded-3xl text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-green-100 transition-colors">
                <Activity className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Plant Doctor</h3>
              <p className="text-gray-600 mb-8 text-lg">Upload a photo of your plant and get instant health diagnosis and expert treatment plans.</p>
              <Link to="/ai-diagnosis" className="inline-flex items-center text-green-600 font-bold text-lg hover:text-green-700 hover:underline">
                Try Diagnosis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;