'use client'

'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaMicrophone, FaMicrophoneAlt } from 'react-icons/fa';

const Alert: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-[66%] left-1/2 transform -translate-x-1/2 bg-red-800 text-white px-4 py-2 rounded shadow-md z-50">
      {message}
    </div>
  );
};

export default function Searchbar() {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleAudioClick = () => {
    setIsListening((prev) => !prev);
    // Add logic to start/stop listening here
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setAlertMessage('Please enter a search term.');
      return;
    }
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative flex flex-col items-center">
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
      <div className="flex items-center">
        <div className="flex items-center bg-[#002C5F] p-2 px-3 rounded-full w-96">
          <span className="text-white mr-2 cursor-pointer" onClick={handleSearchClick}>
            <Link href={`/dashboard?query=${encodeURIComponent(searchQuery)}`}>
                <FaSearch size={24} />
            </Link>
          </span>
          <div className="flex items-center bg-white rounded-full px-4 py-3 w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-gray-800 w-full"
            />
          </div>
        </div>
        <span
          className="ml-4 text-[#002C5F] text-3xl cursor-pointer"
          onClick={handleAudioClick}
        >
          {isListening ? <FaMicrophoneAlt size={28} /> : <FaMicrophone size={28} />}
        </span>
      </div>
    </div>
  );
}
