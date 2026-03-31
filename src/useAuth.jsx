// useAuth.jsx — Firebase auth context + hook
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthChange } from './firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthChange((firebaseUser) => {
            setUser(firebaseUser);
            setIsLoaded(true);
        });
        return unsubscribe; // cleanup listener on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoaded, isSignedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

/** Drop-in replacement for Clerk's useUser() */
export function useUser() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useUser must be used inside <AuthProvider>');
    return ctx;
}