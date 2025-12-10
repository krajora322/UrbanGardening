import React, { useState, useRef } from 'react';
import { Upload, Loader, AlertTriangle, CheckCircle, Camera } from 'lucide-react';
import { analyzePlantHealth } from '../services/geminiService';

const PlantAI = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(''); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    // Remove "data:image/jpeg;base64," prefix for the API
    const base64Data = image.split(',')[1];
    const analysis = await analyzePlantHealth(base64Data);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="bg-green-100 text-green-800 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">New Feature</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">Smart Plant Doctor</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
                Take a photo of your plant and our smart analysis engine will instantly identify species, diagnose diseases, and recommend treatments.
            </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-10 md:p-16">
                <div 
                    className={`border-4 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer ${
                        image ? 'border-green-300 bg-green-50/50' : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {image ? (
                        <div className="relative group">
                            <img src={image} alt="Preview" className="max-h-96 mx-auto rounded-2xl shadow-lg" />
                            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-bold text-lg flex items-center"><Camera className="mr-2"/> Change Photo</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-10">
                            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                                <Upload className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload or Drop Photo</h3>
                            <p className="text-gray-500 mb-8">Supports JPG, PNG (Max 5MB)</p>
                            <span className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">Select File</span>
                        </div>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {image && !result && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className={`flex items-center px-10 py-4 rounded-full text-white font-bold text-xl transition-all transform hover:-translate-y-1 ${
                                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-500/40'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin h-6 w-6 mr-3" /> Analyzing...
                                </>
                            ) : (
                                <>
                                    <ActivityIcon /> Analyze Health
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {result && (
                <div className="bg-green-50 p-10 md:p-16 border-t border-green-100">
                    <div className="flex items-center mb-8">
                        <div className="bg-green-500 rounded-full p-2 mr-4">
                             <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Diagnosis Report</h2>
                    </div>
                    <div className="prose prose-lg prose-green max-w-none bg-white p-8 rounded-2xl shadow-sm border border-green-100 text-gray-700">
                         <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">{result}</pre>
                    </div>
                     <div className="mt-8 text-center">
                         <button 
                            onClick={() => {setImage(null); setResult('');}}
                            className="text-green-700 font-bold hover:text-green-800 hover:underline"
                        >
                            Analyze Another Plant
                         </button>
                     </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default PlantAI;