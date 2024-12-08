const functions = require("firebase-functions/v1");
const admin = require('firebase-admin');

// Trigger for document creation in any collection
exports.logActivities = functions.firestore
    .document('{collectionId}/{documentId}')
    .onCreate((snap, context) => {
        const collection = context.params.collectionId;
        const documentId = context.params.documentId;

        // Prevent triggering the function if the document is created in the 'activities' collection
        if (collection === 'activities') {
            console.log('Skipping activity log creation to avoid recursion.');
            return null;  // Exit early if it's an 'activities' document
        }

        const newDocumentData = snap.data();
        const activities = admin.firestore().collection('activities');
        const logMessage = `A new document with ID ${documentId} was created in the ${collection} collection.`;

        // Log the event in the activities collection
        return activities.add({
            text: logMessage,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            newDocumentData: newDocumentData // Optionally, add document data
        });
    });