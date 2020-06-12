const admin = require("firebase-admin");
const serviceAccount = require('./config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialapp-12ef9.firebaseio.com",
  storageBucket: "socialapp-12ef9.appspot.com",
});

const db = admin.firestore();

module.exports = { admin, db };