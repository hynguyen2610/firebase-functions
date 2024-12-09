const functions = require("firebase-functions/v1");
const admin = require('firebase-admin');

exports.userRegister = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({ email: user.email });
});