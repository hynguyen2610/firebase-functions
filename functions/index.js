const { onRequest } = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const functions = require("firebase-functions/v1");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Define your Cloud Function using v2 syntax
exports.randomNumber = onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
});

exports.toTheDojo = onRequest((request, response) => {
    response.redirect('https://thenetninja.co.uk');
});

exports.newUserSignUp = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({ email: user.email });
});

exports.userDeleted = functions.auth.user().onDelete(user => {
    console.log('user deleted: ', user.email, user.uid);
    const userDelete = admin.firestore().collection('users').doc(user.uid);
    return userDelete.delete();
});

exports.addRequest = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can call this function');
    }

    if (data.text.length > 30) {
        throw new functions.https.HttpsError('invalid-argument', 'Request must be less than 30 characters');
    }

    return admin.firestore().collection('requests').add({
        text: data.text,
        upvotes: 0
    });

});

exports.upvoteRequest = functions.https.onCall(async (data, context) => {
    const requestRef = admin.firestore().collection('requests').doc(data.id);
    const request = await requestRef.get();
    const upvotes = request.data().upvotes;
    await requestRef.update({ upvotes: upvotes + 1 });
});

exports.hello = functions.https.onCall((data, context) => {
    return 'Hello from Firebase!';
});