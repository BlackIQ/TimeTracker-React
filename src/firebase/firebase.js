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
    collection,
    addDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBce14H5xV1mOxPd-4G_FT9qb_E1KpAA4Q",
    authDomain: "time-tracker-f3ebc.firebaseapp.com",
    projectId: "time-tracker-f3ebc",
    storageBucket: "time-tracker-f3ebc.appspot.com",
    messagingSenderId: "6247733141",
    appId: "1:6247733141:web:534a3d89c997059a74489c",
    measurementId: "G-1KYTTWNH2B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const usersReference = collection(db, 'users');
const taskReference = collection(db, 'tasks');

// - - - - - Authentication - - - - -

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

// - - - - - Firestore - - - - -

// Add new task
const addNewTask =  async (data) => {
    await addDoc(taskReference, data);
}

export {
    emailPasswordAuth,
    taskReference,
    addNewTask,
    googleAuth,
    register,
    anonAuth,
    logout,
    reset,
    auth,
    db,
}
