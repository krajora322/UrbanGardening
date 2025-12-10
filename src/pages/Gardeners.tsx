import React, { useState } from 'react';
import { MOCK_GARDENERS } from '../constants';
import { useGlobal } from '../context/GlobalContext';
import { MapPin, Star, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gardeners = () => {
  const [pincodeFilter, setPincodeFilter] = useState('');
  const { isAuthenticated } = useGlobal();
  const navigate = useNavigate();

  const filteredGardeners = pincodeFilter
    ? MOCK_GARDENERS.filter(g => g.pincode.includes(pincodeFilter))
    : MOCK_GARDENERS;

  const handleBook = (gardener: any) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate(`/book/${gardener.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find a Gardener Near You</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Enter your postal code to find professional gardeners in your area. Book them for maintenance, landscaping, or consultation.
            </p>
            
            <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter Pincode (e.g. 10001)"
                    className="pl-11 pr-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full shadow-sm text-gray-900 bg-white"
                    value={pincodeFilter}
                    onChange={(e) => setPincodeFilter(e.target.value)}
                />
            </div>
        </div>
        
        {filteredGardeners.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">No gardeners found.</h2>
                <p className="text-gray-500 mt-2">Try a different pincode.</p>
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {filteredGardeners.map((gardener) => (
                <div key={gardener.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col relative border border-gray-100">
                    {/* Green Top Banner */}
                    <div className="h-28 bg-[#22c55e]"></div>
                    
                    <div className="px-6 pb-6 pt-0 flex-1 flex flex-col relative">
                        {/* Avatar overlapped */}
                        <div className="absolute -top-12 left-6">
                            <img 
                                src={gardener.image} 
                                alt={gardener.name} 
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                            />
                        </div>

                        <div className="mt-14 mb-2 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{gardener.name}</h3>
                                <p className="text-gray-500 text-sm font-medium">{gardener.expertise[0]}</p>
                            </div>
                            <div className="bg-[#fef08a] text-yellow-800 px-2 py-1 rounded-md text-sm font-bold flex items-center">
                                <Star className="h-3 w-3 fill-current mr-1" /> {gardener.rating}
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                             <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Serving {gardener.pincode}</span>
                             </div>
                             <div className="flex items-center text-sm text-gray-500">
                                <Check className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Available: {gardener.availability}</span>
                             </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-900">
                                ₹{gardener.ratePerHour}<span className="text-sm font-normal text-gray-500">/hr</span>
                            </div>
                            <button 
                                onClick={() => handleBook(gardener)}
                                className="bg-[#1a1a1a] hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Gardeners;