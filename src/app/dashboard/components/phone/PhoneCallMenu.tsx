'use client'

import { FiX } from "react-icons/fi";

interface PhoneCallMenuProps {
  isExpanded: boolean;
  onClose: () => void;
}

export const PhoneCallMenu = ({ isExpanded, onClose }: PhoneCallMenuProps) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 transform ${
      isExpanded ? 'translate-x-0' : '-translate-x-full'
    } z-40`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-[#002C5F]">Phone Call</h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <FiX className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Enter phone number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DE3919]"
          />
          <button className="w-full py-2 bg-[#DE3919] text-white rounded-lg hover:bg-[#BF2A1A] transition-colors">
            Dial
          </button>
        </div>
      </div>
    </div>
  );
};