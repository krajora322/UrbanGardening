import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_GARDENERS } from '../constants';
import { useGlobal } from '../context/GlobalContext';
import { Calendar, Clock, FileText, ArrowLeft, MapPin, Star, ShieldCheck } from 'lucide-react';

const Booking = () => {
  const { gardenerId } = useParams();
  const navigate = useNavigate();
  const { bookAppointment, isAuthenticated } = useGlobal();
  
  const gardener = MOCK_GARDENERS.find(g => g.id === gardenerId);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/auth');
    }
    if (!gardener) {
        navigate('/gardeners');
    }
  }, [isAuthenticated, gardener, navigate]);

  if (!gardener) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.date && formData.time && formData.description) {
        bookAppointment(gardener, formData.date, formData.time, formData.description);
        navigate('/profile');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/gardeners" className="inline-flex items-center text-gray-600 hover:text-green-600 font-medium mb-8 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Gardeners
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Gardener Summary Card */}
            <div className="lg:w-1/3">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-24">
                    <div className="flex flex-col items-center text-center">
                         <div className="relative mb-6">
                            <img 
                                src={gardener.image} 
                                alt={gardener.name} 
                                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                            />
                            <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md">
                                <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
                                    <Star className="h-3 w-3 fill-current mr-1" /> {gardener.rating}
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{gardener.name}</h2>
                        <div className="flex items-center text-gray-500 mb-6 text-sm">
                            <MapPin className="h-4 w-4 mr-1" /> {gardener.pincode}
                        </div>
                        
                        <div className="w-full border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Hourly Rate</span>
                                <span className="text-xl font-bold text-gray-900">₹{gardener.ratePerHour}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Experience</span>
                                <span className="font-medium text-gray-900">{gardener.experience} Years</span>
                            </div>
                        </div>
                        
                         <div className="bg-green-50 rounded-xl p-4 mt-6 w-full text-left">
                            <div className="flex items-center mb-2 text-green-800 font-bold text-sm uppercase tracking-wide">
                                <ShieldCheck className="h-4 w-4 mr-2" /> Verified Pro
                            </div>
                            <p className="text-xs text-green-700 leading-relaxed">
                                {gardener.name} is a background-checked professional with expertise in {gardener.expertise.join(', ')}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Form */}
            <div className="lg:w-2/3">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-green-600 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white flex items-center">
                            <Calendar className="h-6 w-6 mr-3" /> Schedule Appointment
                        </h1>
                        <p className="text-green-100 mt-2">Choose a convenient time for the gardener to visit.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="date" 
                                        required
                                        min={today}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-gray-900"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Select Time</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="time" 
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-gray-900"
                                        value={formData.time}
                                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Describe the Work</label>
                            <p className="text-xs text-gray-500 mb-3">Please describe what needs to be done (e.g., "Lawn mowing and trimming hedges in front yard")</p>
                            <div className="relative">
                                 <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea 
                                    required
                                    rows={4}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition-colors bg-white text-gray-900"
                                    placeholder="Enter details about your garden needs..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                                <div>
                                    <p className="text-sm font-bold text-gray-600">Estimation</p>
                                    <p className="text-xs text-gray-500">Based on standard hourly rate</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">₹{gardener.ratePerHour} / hr</p>
                                    <p className="text-xs text-green-600">Pay after service</p>
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-0.5 flex justify-center items-center"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;