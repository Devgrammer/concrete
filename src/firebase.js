// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChVL9Gc7tE6bYAYflKWS7CUvWWxkMaFXI",
    authDomain: "concrete-1205f.firebaseapp.com",
    projectId: "concrete-1205f",
    storageBucket: "concrete-1205f.appspot.com",
    messagingSenderId: "150881644522",
    appId: "1:150881644522:web:6f9a04860a315f1aa70c93",
    measurementId: "G-GP0RH9ZMEW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

