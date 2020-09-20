import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh_r4OFgfWPYcrVVgqOC1bCUE2l6LXRKA",
  authDomain: "chat-app-aff19.firebaseapp.com",
  databaseURL: "https://chat-app-aff19.firebaseio.com",
  projectId: "chat-app-aff19",
  storageBucket: "chat-app-aff19.appspot.com",
  messagingSenderId: "336215724785",
  appId: "1:336215724785:web:0f912203322f28d55ccf50",
  measurementId: "G-ERBT9W567B",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
