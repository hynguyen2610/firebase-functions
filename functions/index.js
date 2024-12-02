// Import function triggers from their respective submodules
const {onRequest, onCall} = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const { response } = require("express");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Define your Cloud Function using v2 syntax
exports.randomNumber = onRequest((request, response) => {
    console.log('Random number called');
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
});

exports.toTheDojo = onRequest((request, response) => {
    console.log("Redirect to dojo called");
    response.redirect('https://thenetninja.co.uk');
});

exports.sayHello = onCall((data, context) => {
    return `Hello`;
});