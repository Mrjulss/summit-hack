"use client"
import { useState, useEffect, useRef } from "react";
import { FaUser, FaCheck } from "react-icons/fa";
import { ApiClient } from "../services/ApiClient";

interface User {
    id: number;
    name: string;
}

interface UserSelectionProps {
    onUserSelected: (user: User | null) => void;
    dropdownPosition?: 'top' | 'bottom'; // New parameter with default
}
  
export function UserSelection({ onUserSelected, dropdownPosition = 'bottom' }: UserSelectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const client = new ApiClient("http://localhost:8000");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onUserSelected(selectedUser);
    }, [selectedUser, onUserSelected]);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await client.get<User[]>(`/usernames`);
            setUsers(response);
        } catch (err) {
            setError("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen, searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleUserClick = (user: User) => {
        // If the same user is clicked, deselect them
        if (selectedUser && selectedUser.id === user.id) {
            setSelectedUser(null);
        } else {
            setSelectedUser(user);
        }
        setIsOpen(false);
    };

    // Position classes for the dropdown based on the dropdownPosition prop
    const dropdownPositionClasses = dropdownPosition === 'top' 
        ? "bottom-16 right-0" 
        : "top-16 right-0";

    return (
        <div className="relative w-24" ref={dropdownRef}>
            <div className="flex flex-col items-center justify-center h-16 px-1">
                <span
                    className="text-[#002C5F] text-3xl cursor-pointer hover:text-[#DE3919] transition-colors mb-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FaUser />
                </span>
                {selectedUser && (
                    <div 
                        className="text-[#002C5F] text-xs font-medium text-center w-full line-clamp-2 hyphens-auto" 
                        title={selectedUser.name}
                    >
                        {selectedUser.name}
                    </div>
                )}
            </div>

            {isOpen && (
                <div className={`absolute ${dropdownPositionClasses} w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-10`}>
                    <ul className="mt-2 max-h-60 overflow-y-auto">
                        {users.map((user) => {
                            const isSelected = selectedUser && selectedUser.id === user.id;
                            return (
                                <li
                                    key={user.id}
                                    className={`px-4 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                                        isSelected 
                                        ? "bg-[#DE3919]/10 text-[#DE3919] font-medium" 
                                        : "text-[#002C5F] hover:bg-[#002C5F]/10"
                                    }`}
                                    onClick={() => handleUserClick(user)}
                                    title={isSelected ? "Click to deselect" : ""}
                                >
                                    <span>{user.name}</span>
                                    {isSelected && <FaCheck className="text-[#DE3919]" />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}