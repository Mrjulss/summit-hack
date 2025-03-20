"use client"
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { ApiClient } from "../services/ApiClient";

interface User {
    id: number;
    name: string;
}

interface UserSelectionProps {
    onUserSelected: (user: User | null) => void;
  }
  
  // Update component definition
  export function UserSelection({ onUserSelected }: UserSelectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // New state for selected user
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

    return (
        <div className="relative mx-4" ref={dropdownRef}>
            <div className="flex items-center flex-col gap-1">
                <span
                    className="text-[#002C5F] text-3xl cursor-pointer hover:text-[#DE3919] transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FaUser />
                </span>
                {selectedUser && (
                    <span className="text-[#002C5F] text-sm font-medium">
                        {selectedUser.name}
                    </span>
                )}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200">
                    <ul className="mt-2 max-h-60 overflow-y-auto">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className="px-4 py-2 text-sm text-[#002C5F] hover:bg-[#DE3919]/10 cursor-pointer transition-colors"
                                onClick={() => {
                                    setSelectedUser(user); // Store selected user
                                    setIsOpen(false);
                                }}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                    {/* ... */}
                </div>
            )}
        </div>
    );
}