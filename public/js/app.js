// Import the necessary modules from Firebase
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBt7g2P8Hse9yz6PG3DJIZBl42j-gc-0IU",
    authDomain: "tuto-requests.firebaseapp.com",
    projectId: "tuto-requests",
    storageBucket: "tuto-requests.firebasestorage.app",
    messagingSenderId: "125833378093",
    appId: "1:125833378093:web:78d50f89474ea2e335fba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app); // Initialize Firebase Functions

// DOM Elements
const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const helloButton = document.querySelector('#btn-hello');

// open request modal
requestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});

// Close request modal
requestModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-request')) {
        requestModal.classList.remove('open');
    }
});

// Call Firebase Function
helloButton.addEventListener('click', () => {
    const sayHello = httpsCallable(functions, 'sayHello');
    sayHello().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.error('Error calling function:', error);
    });
});
