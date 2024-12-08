const functions = require("firebase-functions/v1");
const admin = require('firebase-admin');

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