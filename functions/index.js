// Import function triggers from their respective submodules
const { onRequest } = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const functions = require("firebase-functions/v1");

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

exports.newUserSignUp = functions.auth.user().onCreate(user => {
    console.log('user signed up: ', user.email, user.uid);
});

exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log('user deleted: ', user.email, user.uid);
});