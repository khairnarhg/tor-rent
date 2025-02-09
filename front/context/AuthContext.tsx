import React, { createContext, useState, useEffect } from 'react';
import { User } from '@/types/User'; // Define your User type

interface AuthContextType {
    user: User | null;
    role: 'tenant' | 'landlord' | null;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<'tenant' | 'landlord' | null>(null);

    // Placeholder - Replace with your actual authentication logic
    const login = () => {
       const newUser: User = { id: '1', name: 'Test User' }; // Replace with real user info
       setUser(newUser);
       setRole('tenant') // or landlord
    };

    const logout = () => {
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};