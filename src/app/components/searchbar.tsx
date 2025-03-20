'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaMicrophone, FaMicrophoneAlt } from 'react-icons/fa';
import { speechService } from '../services/speech-service';

const Alert: React.FC<{ message: string; type: 'error' | 'info'; onClose: () => void }> = ({ 
  message, 
  type, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-[66%] left-1/2 transform -translate-x-1/2 text-[#DE3919] px-4 py-2 rounded shadow-md z-50`}>
      {message}
    </div>
  );
};

export default function Searchbar() {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'error' | 'info'>('error');
  const [isProcessing, setIsProcessing] = useState(false);

  // Check for API key on component mount
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      setAlertMessage('OpenAI API key missing. Voice search will not work.');
      setAlertType('error');
    }
  }, []);

  const handleAudioClick = async () => {
    // Don't allow recording if API key is missing
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      setAlertMessage('OpenAI API key is missing. Check your environment variables.');
      setAlertType('error');
      return;
    }

    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      setAlertMessage('Listening...');
      setAlertType('info');
      await speechService.startRecording();
    } catch (error) {
      setAlertMessage('Failed to access microphone');
      setAlertType('error');
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      setIsProcessing(true);
      setAlertMessage('Processing audio...');
      setAlertType('info');
      
      const audioBlob = await speechService.stopRecording();
      const transcription = await speechService.transcribeAudio(audioBlob);
      
      setSearchQuery(transcription);
      setAlertMessage('Audio transcribed successfully');
      setAlertType('info');
    } catch (error: any) {
      console.error('Transcription error:', error);
      setAlertMessage(error.message || 'Failed to transcribe audio');
      setAlertType('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setAlertMessage('Please enter a search term.');
      setAlertType('error');
      return;
    }
    console.log('Searching for:', searchQuery);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press "/" to focus on search
      if (e.key === '/' && !isListening) {
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening]);

  return (
    <div className="relative flex flex-col items-center">
      {alertMessage && (
        <Alert 
          message={alertMessage} 
          type={alertType}
          onClose={() => setAlertMessage('')} 
        />
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
              placeholder="Search or press '/' to focus"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-gray-800 w-full"
            />
          </div>
        </div>
        <span
          className={`ml-4 text-[#002C5F] text-3xl cursor-pointer ${!process.env.NEXT_PUBLIC_OPENAI_API_KEY || isProcessing ? 'opacity-50' : ''}`}
          onClick={handleAudioClick}
          title={!process.env.NEXT_PUBLIC_OPENAI_API_KEY ? "API key missing" : isListening ? "Stop listening" : "Start voice search"}
          style={{ cursor: !process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 'not-allowed' : 'pointer' }}
        >
          {isListening ? <FaMicrophoneAlt size={28} /> : <FaMicrophone size={28} />}
        </span>
      </div>
    </div>
  );
}