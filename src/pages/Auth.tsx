import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';
import { Facebook, Mail, User as UserIcon, X } from 'lucide-react';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialProvider, setSocialProvider] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    pincode: '',
    phone: ''
  });
  
  const { login, isAuthenticated } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userProfile = {
      id: 'user-' + Date.now(),
      name: activeTab === 'signin' ? 'Demo User' : formData.name,
      email: formData.email,
      address: formData.address,
      pincode: formData.pincode,
      phone: formData.phone,
      profileImage: 'https://picsum.photos/150/150'
    };
    login(userProfile);
  };

  const openSocialModal = (provider: string) => {
    setSocialProvider(provider);
    setShowSocialModal(true);
  };

  const handleSocialSelect = (email: string) => {
    const userProfile = {
      id: 'social-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      profileImage: 'https://picsum.photos/150/150'
    };
    login(userProfile);
    setShowSocialModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
            <button 
                onClick={() => setActiveTab('signin')}
                className={`w-1/2 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'signin' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Sign In
            </button>
            <button 
                onClick={() => setActiveTab('signup')}
                className={`w-1/2 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'signup' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Sign Up
            </button>
        </div>

        <div className="p-8">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                    {activeTab === 'signin' ? 'Welcome Back!' : 'Join Our Community'}
                </h2>
                <p className="text-gray-500 text-sm">
                    {activeTab === 'signin' ? 'Access your account and manage your garden.' : 'Create an account to book gardeners and shop.'}
                </p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
                <button 
                    onClick={() => openSocialModal('Google')}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-3" alt="Google" />
                    Sign {activeTab === 'signin' ? 'in' : 'up'} with Google
                </button>
                <button 
                    onClick={() => openSocialModal('Facebook')}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1877F2] hover:bg-[#166fe5] transition-colors"
                >
                    <Facebook className="h-5 w-5 mr-3" />
                    Sign {activeTab === 'signin' ? 'in' : 'up'} with Facebook
                </button>
            </div>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-400">or continue with email</span>
                </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {activeTab === 'signup' && (
                    <>
                        <div>
                            <input
                                name="name"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <input
                                name="pincode"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                name="address"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                                placeholder="Full Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                
                <div>
                    <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                </div>

                <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
            </form>
        </div>
      </div>

      {/* Social Login Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Choose an Account</h3>
                    <button onClick={() => setShowSocialModal(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-2">
                    <p className="px-4 py-2 text-sm text-gray-500">to continue to Urban Gardening with {socialProvider}</p>
                    <div className="mt-2">
                        <button 
                            onClick={() => handleSocialSelect('user@gmail.com')}
                            className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                        >
                            <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">
                                U
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">user@gmail.com</p>
                                <p className="text-xs text-gray-500">User Name</p>
                            </div>
                        </button>
                        <button 
                            onClick={() => handleSocialSelect('alice.wonder@gmail.com')}
                            className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                        >
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                                A
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">alice.wonder@gmail.com</p>
                                <p className="text-xs text-gray-500">Alice Wonderland</p>
                            </div>
                        </button>
                         <button 
                            onClick={() => handleSocialSelect('gardener.joe@yahoo.com')}
                            className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                        >
                            <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold mr-3">
                                J
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">gardener.joe@yahoo.com</p>
                                <p className="text-xs text-gray-500">Joe Gardener</p>
                            </div>
                        </button>
                    </div>
                     <div className="border-t border-gray-100 mt-2 p-4">
                        <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                            <UserIcon className="h-5 w-5 mr-3 text-gray-400" /> Use another account
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Auth;