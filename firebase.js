var firebaseConfig = {
    apiKey: "AIzaSyBx6GNgnpPEIxen7l9vWa4yWGElL095VEY",
    authDomain: "clone-2-e8e0d.firebaseapp.com",
    projectId: "clone-2-e8e0d",
    storageBucket: "clone-2-e8e0d.appspot.com",
    messagingSenderId: "315979780876",
    appId: "1:315979780876:web:c9a568505f2fc77c6a6f29",
    measurementId: "G-B6KPX0SK8E"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();