import firebase from "./firebase";
import "firebase/firestore";

firebase
  .firestore()
  .enablePersistence({ experimentalTabSynchronization: true })
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
    console.error(err);
  });

var db = firebase.firestore();
export default db;
