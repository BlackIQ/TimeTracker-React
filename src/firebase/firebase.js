import {initializeApp} from "firebase/app";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInAnonymously,
    signInWithPopup,
    getAuth,
    signOut,
} from 'firebase/auth'

import {
    getFirestore,
    onSnapshot,
    collection,
    deleteDoc,
    updateDoc,
    getDocs,
    orderBy,
    addDoc,
    where,
    query,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDdpxQkEbrTM5tGKZ7GuaMT6qziUt0J-Og",
    authDomain: "reactjs-time-tracker.firebaseapp.com",
    projectId: "reactjs-time-tracker",
    storageBucket: "reactjs-time-tracker.appspot.com",
    messagingSenderId: "1083271030583",
    appId: "1:1083271030583:web:fc585478f7292469145cb2",
    measurementId: "G-XB7L1RMH2Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const usersReference = collection(db, 'users');
const tracksReference = collection(db, 'users');

// Google Authentication
const googleAuth = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Anonymous Authentication
const anonAuth = async () => {
    try {
        await signInAnonymously(auth);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Email and Password Authentication
const emailPasswordAuth = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Register a new user
const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Logout
const logout = () => {
    try {
        signOut(auth);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const reset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Email sent. Check you inbox.')
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

export {
    emailPasswordAuth,
    googleAuth,
    register,
    anonAuth,
    logout,
    reset,
    auth,
}
