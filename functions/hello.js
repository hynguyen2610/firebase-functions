const functions = require("firebase-functions/v1");

exports.hello = functions.https.onCall((data, context) => {
    return 'Hello from Firebase!';
});