import {initializeApp} from "firebase/app";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    FacebookAuthProvider,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInAnonymously,
    signInWithPopup,
    getAuth,
    signOut,
} from 'firebase/auth'

import {
    getFirestore,
    collection,
    addDoc,
    query,
    getDocs,
    where,
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
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const usersReference = collection(db, 'users');
const taskReference = collection(db, 'tasks');

// - - - - - Authentication - - - - -

// Google Authentication
const googleAuth = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        const user = response.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            const userData = {
                'uid': user.uid,
                'name': user.displayName ? user.displayName : null,
            }
            await addDoc(usersReference, userData);
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Facebook Authentication
const facebookAuth = async () => {
    try {
        const response = await signInWithPopup(auth, facebookProvider);
        const user = response.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            const userData = {
                'uid': user.uid,
                'name': user.displayName ? user.displayName : null,
            }
            await addDoc(usersReference, userData);
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Facebook Authentication
const githubAuth = async () => {
    try {
        const response = await signInWithPopup(auth, githubProvider);
        const user = response.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            const userData = {
                'uid': user.uid,
                'name': user.displayName ? user.displayName : null,
            }
            await addDoc(usersReference, userData);
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Anonymous Authentication
const anonAuth = async () => {
    try {
        const response = await signInAnonymously(auth);
        const user = response.user;
        const userData = {
            'uid': user.uid,
            'name': null,
        }
        await addDoc(usersReference, userData);
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
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        const userData = {
            'uid': user.uid,
            'name': null,
        }
        await addDoc(usersReference, userData);
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
    usersReference,
    taskReference,
    addNewTask,
    facebookAuth,
    googleAuth,
    githubAuth,
    register,
    anonAuth,
    logout,
    reset,
    auth,
    db,
}
