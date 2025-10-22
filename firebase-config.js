// Firebase Configuration
// Your Firebase project credentials

const firebaseConfig = {
    apiKey: "AIzaSyBwTI70rk91mP3WdaR2K-es6wiqJPhut38",
    authDomain: "gutech-cs.firebaseapp.com",
    databaseURL: "https://gutech-cs-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gutech-cs",
    storageBucket: "gutech-cs.firebasestorage.app",
    messagingSenderId: "508710858125",
    appId: "1:508710858125:web:61928d8230e8c42955a1c4",
    measurementId: "G-PH5BY7R1D2"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
    // Show user-friendly message
    if (error.code === 'app/invalid-api-key') {
        console.warn("⚠️ Firebase not configured. Please add your Firebase credentials in firebase-config.js");
    }
}

// Export Firebase services
const auth = firebase.auth();
const database = firebase.database();

