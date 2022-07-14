import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAVHErXZM1BtLGxHg7GbWNVLuri8bxm0fw",
    authDomain: "triptips-a28c7.firebaseapp.com",
    projectId: "triptips-a28c7",
    storageBucket: "triptips-a28c7.appspot.com",
    messagingSenderId: "271223796677",
    appId: "1:271223796677:web:9fbf3564a2b6302c0dd1ac",
    measurementId: "G-JE7KB3Y2MS"
    };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  export default firebase ;