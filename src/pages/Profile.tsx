import React, { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, Calendar, Settings, LogOut, Clock, MapPin, CheckCircle, ShoppingBag, Shovel, Phone, Hash } from 'lucide-react';

const Profile = () => {
  const { user, orders, appointments, logout, updateUser } = useGlobal();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'appointments'>('orders');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
        setFormData({
            name: user.name,
            phone: user.phone || '',
            address: user.address || '',
            pincode: user.pincode || ''
        });
    }
  }, [user, navigate]);

  const handleUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser(formData);
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Sidebar */}
          <div className="md:w-1/4 bg-green-900 p-8 text-white flex flex-col">
            <div className="flex flex-col items-center mb-10">
              <div className="w-28 h-28 rounded-full border-4 border-green-400 p-1 mb-4">
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover rounded-full bg-white" />
              </div>
              <h2 className="text-xl font-bold text-center tracking-wide">{user.name}</h2>
              <p className="text-green-300 text-sm">{user.email}</p>
            </div>
            
            <nav className="space-y-3 flex-1">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'orders' ? 'bg-green-600 shadow-lg translate-x-2' : 'hover:bg-green-800/50 text-green-100'}`}
              >
                <Package className="h-5 w-5 mr-3" /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'appointments' ? 'bg-green-600 shadow-lg translate-x-2' : 'hover:bg-green-800/50 text-green-100'}`}
              >
                <Calendar className="h-5 w-5 mr-3" /> Gardener Bookings
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === 'details' ? 'bg-green-600 shadow-lg translate-x-2' : 'hover:bg-green-800/50 text-green-100'}`}
              >
                <Settings className="h-5 w-5 mr-3" /> Profile Settings
              </button>
            </nav>

            <button 
                onClick={logout}
                className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-red-600/90 bg-red-600/10 text-red-100 hover:text-white transition mt-8"
              >
                <LogOut className="h-5 w-5 mr-3" /> Sign Out
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 md:p-12 bg-white overflow-y-auto">
            
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                     <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="h-10 w-10 text-green-600" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-800">No orders yet</h3>
                     <p className="text-gray-500 mt-2 mb-8">Start your gardening journey with our premium products.</p>
                     <Link to="/shop" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1 inline-flex items-center">
                        Browse Shop <ShoppingBag className="ml-2 h-5 w-5" />
                     </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-white relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                        <div className="flex flex-wrap justify-between items-center mb-6 border-b border-gray-50 pb-4">
                          <div>
                            <span className="block font-bold text-gray-900 text-lg">{order.id}</span>
                            <span className="text-gray-400 text-sm flex items-center mt-1"><Calendar className="h-3 w-3 mr-1"/> {order.date}</span>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              <span className="font-medium flex items-center">
                                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold mr-3 shadow-sm text-green-700">{item.quantity}</span>
                                {item.name}
                              </span>
                              <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-end items-center">
                          <span className="text-gray-500 text-sm mr-3">Total Amount:</span>
                          <span className="text-2xl font-bold text-gray-900">₹{order.total}</span>
                        </div>
                      </div>
                    ))}
                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <Link to="/shop" className="text-green-600 font-bold hover:text-green-700 hover:underline inline-flex items-center">
                            Continue Shopping <ShoppingBag className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">Gardener Appointments</h2>
                {appointments.length === 0 ? (
                   <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                     <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shovel className="h-10 w-10 text-green-600" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-800">No scheduled visits</h3>
                     <p className="text-gray-500 mt-2 mb-8">Need help with your garden? Book an expert today.</p>
                     <Link to="/gardeners" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1 inline-flex items-center">
                        Find a Gardener <Shovel className="ml-2 h-5 w-5" />
                     </Link>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                                        <User className="h-6 w-6 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900">{apt.gardenerName}</h3>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">Booking ID: {apt.id}</p>
                                    </div>
                                </div>
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center shadow-sm">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {apt.status}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center group hover:border-green-200 transition-colors">
                                    <Calendar className="h-5 w-5 mr-3 text-green-600" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Scheduled Date</p>
                                        <p className="font-bold text-gray-800">{apt.date}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center group hover:border-green-200 transition-colors">
                                    <Clock className="h-5 w-5 mr-3 text-green-600" />
                                     <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time Slot</p>
                                        <p className="font-bold text-gray-800">{apt.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-4">
                                <p className="text-xs text-blue-400 font-bold uppercase mb-2">Service Description</p>
                                <p className="text-sm text-gray-700 leading-relaxed">"{apt.description}"</p>
                            </div>
                            
                             <div className="flex items-center justify-end text-sm text-gray-500 border-t border-gray-100 pt-4 mt-2">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" /> Location Pincode: <span className="font-semibold text-gray-700 ml-1">{apt.pincode}</span>
                            </div>
                        </div>
                      </div>
                    ))}
                     <div className="mt-8 text-center">
                        <Link to="/gardeners" className="text-green-600 font-bold hover:text-green-700 hover:underline inline-flex items-center">
                            Book Another Service <Shovel className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
                <div className="animate-fade-in">
                     <h2 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h2>
                     <p className="text-gray-500 mb-8">Update your personal information and address.</p>

                     <form onSubmit={handleUpdate} className="max-w-2xl space-y-6">
                        
                        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 flex items-start mb-6">
                            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                            <p className="text-sm text-blue-800">
                                You can edit your details directly below. Click "Save Changes" to update your profile.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 shadow-sm"
                                    placeholder="Your Full Name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 shadow-sm"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Hash className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 shadow-sm"
                                        placeholder="e.g., 560001"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Address</label>
                            <div className="relative">
                                <div className="absolute top-3 left-4 pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea 
                                    rows={4}
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 shadow-sm"
                                    placeholder="Enter your full address"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button 
                                type="submit" 
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all transform hover:-translate-y-0.5 flex items-center"
                            >
                                Save Changes <CheckCircle className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                     </form>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;