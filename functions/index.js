const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("../socialapp-12ef9-firebase-adminsdk-pl9i4-056d1d9c8e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialapp-12ef9.firebaseio.com",
});

const firebaseConfig = {
  apiKey: "AIzaSyDYw1sg3GnzXPlxGQ49sKSiKKgDl0X7Sd4",
  authDomain: "socialapp-12ef9.firebaseapp.com",
  databaseURL: "https://socialapp-12ef9.firebaseio.com",
  projectId: "socialapp-12ef9",
  storageBucket: "socialapp-12ef9.appspot.com",
  messagingSenderId: "567886034981",
  appId: "1:567886034981:web:c1eeeced63bee03e7c67cc",
  measurementId: "G-MMJR7HCBRS",
};

const express = require("express");
const app = express();

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: new Date().toISOString(),
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});


const isEmpty = (string) => {
    if (string.trim() === '') return true
    else return false;
}

const isEmail = (email) =>  {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

// Signup route

app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  // validate data
  let errors = {};

  if (isEmpty(newUser.email)) {
      errors.email = 'must not be empty'
  } else if (!isEmail(newUser.email)){
      errors.email = 'Must be a valid email address'
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty'

  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must match'

  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";


  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } 
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      
    })
    .then((data) => {
        userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        }
        return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      }
      return res.status(500).json({ error: err.code });
    });
});



app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    let errors = {};

    if(isEmpty(user.email)) errors.email = 'Must not be empty';
    if(isEmpty(user.password)) errors.password = 'Must not be empty';

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token })
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password'){
                return res.status(403).json({ general: 'Wrong credentials. Please try again'})
            }
            return res.status(500).json({ error: err.code })
        })
})
exports.api = functions.https.onRequest(app);
