const functions = require("firebase-functions/v1");
const admin = require('firebase-admin');

exports.userDeleted = functions.auth.user().onDelete(user => {
    const userDelete = admin.firestore().collection('users').doc(user.uid);
    return userDelete.delete();
});