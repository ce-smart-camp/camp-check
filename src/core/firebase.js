import firebase from "firebase/app";
import "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCr7d4wJvhXLhcL5ts5V8lFOHGDDyXy__M",
  authDomain: "cesc-12.firebaseapp.com",
  databaseURL: "https://cesc-12.firebaseio.com",
  projectId: "cesc-12",
  storageBucket: "cesc-12.appspot.com",
  messagingSenderId: "234372643119"
};

export const app = firebase.initializeApp(config);

if (typeof window !== "undefined") {
  window.firebase = app;
}

export default firebase;
