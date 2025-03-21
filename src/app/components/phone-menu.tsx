'use client'
import { useState, useEffect, useRef } from 'react';
import { FiPhone, FiSearch, FiX } from 'react-icons/fi';
import messages from './messages.json';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export function PhoneMenu() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
    const [isListening, setIsListening] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isExpanded) {
            setCurrentMessageIndex(-1);
            setIsListening(false);
        }
    }, [isExpanded]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessageIndex]);

    const startListening = () => {
        setIsListening(true);
        setCurrentMessageIndex(-1);
        let index = -1;

        intervalRef.current = window.setInterval(() => {
            index++;
            if (index >= messages.messages.length) {
                stopListening();
                return;
            }
            setCurrentMessageIndex(index);
        }, 2000);
    };

    const stopListening = () => {
        setIsListening(false);
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            setSelectedText(''); // Clear selection state
            return;
        }

        const range = selection.getRangeAt(0);
        if (!range.toString().trim()) {
            setSelectedText(''); // Explicitly clear when empty selection
            return;
        }

        setSelectedText(selection.toString());
    };

    return (
        <div className="absolute top-15 left-0">
            <div className="group relative">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="m-4 p-3 bg-[#DE3919]/80 rounded-full shadow-lg hover:bg-[#BF2A1A] hover:bg-opacity-100 transition-colors"
                    aria-label="Phone menu"
                >
                    <FiPhone className="w-6 h-6 text-white" />
                    <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Open Conversation Manager
                    </span>
                </button>
            </div>

            <div className={`absolute top-0 left-0 h-[80vh] w-64 bg-white shadow-xl transition-transform duration-300 ${isExpanded ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#002C5F]">Client Conversation</h2>
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        aria-label="Close menu"
                    >
                        <FiX className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div
                    className="h-[calc(80vh-140px)] overflow-y-auto p-4 space-y-4"
                    onMouseUp={handleTextSelection}
                >
                    {messages.messages.slice(0, currentMessageIndex + 1).map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg relative ${msg.sender === 'Wealthmanager'
                                ? 'bg-[#DE3919]/10 mr-6'
                                : 'bg-[#002C5F]/10 ml-6'
                                }`}
                        >
                            <div className="text-xs font-semibold text-[#DE3919]">
                                {msg.sender}
                            </div>
                            <div className="text-sm text-[#002C5F] select-text">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200 flex flex-row">
                    <button
                        className={`w-full py-2 text-white rounded-lg hover:cursor-pointer transition-colors ${isListening
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-[#DE3919] hover:bg-[#BF2A1A]'
                            }`}
                        onClick={isListening ? stopListening : startListening}
                    >
                        {isListening ? 'Stop Listening' : 'Start Listening'}
                    </button>
                    <button
                        className='w-12 mx-1 py-2 bg-[#DE3919] text-white rounded-lg items-center flex justify-center 
                            transition-colors 
                            hover:bg-[#BF2A1A] 
                            disabled:bg-[#DE3919]/50 
                            disabled:hover:bg-[#DE3919]/50 
                            disabled:cursor-not-allowed'
                        disabled={!selectedText}
                    >
                        <Link href={`/dashboard?query=${encodeURIComponent(selectedText)}`}>
                            <FaSearch size={24} />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}