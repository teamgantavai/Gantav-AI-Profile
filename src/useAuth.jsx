// useAuth.jsx — Firebase auth context + hook
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthChange, getUserProfile, createUserProfile } from './firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthChange(async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                // Load or create Firestore profile
                let firestoreProfile = await getUserProfile(firebaseUser.uid);
                if (!firestoreProfile) {
                    // New user — create a blank profile skeleton
                    const defaultName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Learner';
                    const defaultProfile = {
                        name: defaultName,
                        username: '',
                        bio: '',
                        destination: '',
                        location: '',
                        level: 'Beginner',
                        streak: 0,
                        points: 0,
                        progress: 0,
                        avatarSeed: defaultName,
                        avatarStyle: 'avataaars',
                        avatar: firebaseUser.photoURL || null,
                        socials: { github: '', linkedin: '', x: '', discord: '', instagram: '' },
                        activity: [],
                        certificates: [],
                        profileComplete: false,
                    };
                    await createUserProfile(firebaseUser.uid, defaultProfile);
                    firestoreProfile = defaultProfile;
                }
                setProfile(firestoreProfile);
            } else {
                setProfile(null);
            }
            setIsLoaded(true);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, profile, setProfile, isLoaded, isSignedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useUser must be used inside <AuthProvider>');
    return ctx;
}