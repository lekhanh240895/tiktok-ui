// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'tiktok-lekhanh.firebaseapp.com',
    projectId: 'tiktok-lekhanh',
    storageBucket: 'tiktok-lekhanh.appspot.com',
    messagingSenderId: '1050278169025',
    appId: '1:1050278169025:web:9f838de61d9126dbb44740',
    measurementId: 'G-N2QJETYCSE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
