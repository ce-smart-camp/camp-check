import firebase from "./firebase";
import "firebase/auth";

// Signs-in Friendly Chat.
function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    hd: "kmitl.ac.th"
  });
  firebase.auth().signInWithPopup(provider);
}

function signOut() {
  firebase.auth().signOut();
}

export { signIn, signOut };
