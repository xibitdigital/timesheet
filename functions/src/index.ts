import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

firebase.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {

    firebase.firestore().collection('items').onSnapshot((data) => {
        response.send(data.docs[0].id);
    })
});
