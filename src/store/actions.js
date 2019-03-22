import firebase from "./../core/firebase";
import db from "./../core/db";
import "./../core/auth";

export const init = ({ commit, dispatch, state }) => {
  if (!state.is.initAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setIs", { key: "login", val: true });
        dispatch("setupDB");
      } else {
        if (state.dbSnapshot !== null) state.dbSnapshot();
        commit("setDbSnapshot", null);

        commit("setIs", { key: "login", val: false });
        commit("setIs", { key: "setupDB", val: false });
      }
    });
    commit("setIs", { key: "initAuth", val: true });
  }
};

let prepareRegData = doc => {
  let data = doc.data();
  data.id = doc.id;
  data.created_at =
    data.created_at.seconds * 1000 + data.created_at.nanoseconds / 1000000;
  data.update_at =
    data.update_at.seconds * 1000 + data.update_at.nanoseconds / 1000000;
  return data;
};

export const setupDB = ({ commit, state }) => {
  if (!state.is.setupDB) {
    let unsubscribe = db.collection("reg").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          commit("addData", prepareRegData(change.doc));
        }
        if (change.type === "modified") {
          commit("editData", prepareRegData(change.doc));
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });

    commit("setDbSnapshot", unsubscribe);
    commit("setIs", { key: "setupDB", val: true });
  }
};
