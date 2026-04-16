import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-8 text-center px-4">
      <AlertCircle size={48} className="text-red-500 mb-6" />
      <h2 className="text-2xl font-bold mb-3">Camera Access Required</h2>
      <p className="text-white/70 max-w-md mb-8 leading-relaxed">
        {error?.message || "Please allow camera access to use ASCIICam. The video processing happens entirely locally in your browser."}
      </p>
      <button 
        onClick={onRetry}
        className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        <RefreshCw size={18} />
        Retry Camera Access
      </button>
    </div>
  );
};
