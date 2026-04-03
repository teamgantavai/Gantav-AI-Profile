// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    confirmPasswordReset,
    verifyPasswordResetCode,
    sendEmailVerification,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// ── Auth helpers ──────────────────────────────────────────────────────────────
export const signInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(result.user, { displayName });
    // Send verification email immediately after signup
    await sendEmailVerification(result.user);
    return result;
};

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logOut = () => signOut(auth);
export const onAuthChange = (cb) => onAuthStateChanged(auth, cb);

// ── Password Reset (OTP flow via Firebase) ────────────────────────────────────
// Firebase sends a reset link to email — we use it as "OTP" flow
export const sendPasswordReset = (email) => sendPasswordResetEmail(auth, email);
export const verifyResetCode = (code) => verifyPasswordResetCode(auth, code);
export const confirmReset = (code, newPassword) => confirmPasswordReset(auth, code, newPassword);

// ── Email Verification ────────────────────────────────────────────────────────
export const resendVerificationEmail = () => {
    if (auth.currentUser) return sendEmailVerification(auth.currentUser);
    return Promise.reject(new Error('No user signed in'));
};

// ── Firestore user profile helpers ───────────────────────────────────────────
export const getUserProfile = async (uid) => {
    try {
        const snap = await getDoc(doc(db, 'users', uid));
        return snap.exists() ? snap.data() : null;
    } catch (err) {
        console.error('getUserProfile error:', err);
        return null;
    }
};

export const createUserProfile = async (uid, data) => {
    await setDoc(doc(db, 'users', uid), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

export const updateUserProfile = async (uid, data) => {
    try {
        await updateDoc(doc(db, 'users', uid), {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch {
        await setDoc(doc(db, 'users', uid), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }
};

// ── Storage helpers ───────────────────────────────────────────────────────────
export const uploadProfilePhoto = async (uid, base64DataUrl) => {
    try {
        const storageRef = ref(storage, `avatars/${uid}/profile.jpg`);
        await uploadString(storageRef, base64DataUrl, 'data_url');
        return await getDownloadURL(storageRef);
    } catch (err) {
        console.error('uploadProfilePhoto error:', err);
        return null;
    }
};

export const deleteProfilePhoto = async (uid) => {
    try {
        await deleteObject(ref(storage, `avatars/${uid}/profile.jpg`));
    } catch { /* ignore */ }
};

export default app;