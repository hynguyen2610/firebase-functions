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

exports.upvote = functions.https.onCall(async (data, context) => {
    const requestRef = admin.firestore().collection('requests').doc(data.id);
    const request = await requestRef.get();

    // only logged in user can vote
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can vote');
    }

    // make sure this user has not already upvoted this ticket
    const userRef = admin.firestore().collection('users').doc(context.auth.uid);
    const user = await userRef.get();

    const upvoters = user.data().upvotes || [];
    if (upvoters.includes(data.id)) {
        throw new functions.https.HttpsError('already-exists', 'You have already upvoted this request');
    }

    // update request upvotes
    const newUpvotes = await requestRef.update({ upvotes: request.data().upvotes + 1 });

    // update the user upvotes
    await userRef.update({ upvotes: admin.firestore.FieldValue.arrayUnion(data.id) });

    return newUpvotes;

});

exports.hello = functions.https.onCall((data, context) => {
    return 'Hello from Firebase!';
});