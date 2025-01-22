// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkn0dinUU5266a6Axp9zVUySJgAvN01ao",
    authDomain: "social-3b1aa.firebaseapp.com",
    projectId: "social-3b1aa",
    storageBucket: "social-3b1aa.firebasestorage.app",
    messagingSenderId: "266783918010",
    appId: "1:266783918010:web:5361fefaf1ef54fba8ff83",
    measurementId: "G-Y03L1LEM7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };

