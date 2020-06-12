const admin = require("firebase-admin");
const serviceAccount = require('./socialapp-12ef9-firebase-adminsdk-pl9i4-056d1d9c8e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialapp-12ef9.firebaseio.com",
  storageBucket: "socialapp-12ef9.appspot.com",
});

const db = admin.firestore();

module.exports = { admin, db };