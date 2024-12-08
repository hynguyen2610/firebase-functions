const functions = require("firebase-functions/v1");
const admin = require('firebase-admin');

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