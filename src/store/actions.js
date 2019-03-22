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
        ["reg", "qus", "check"].forEach(key => {
          if (state.snapshot[key] !== null) state.snapshot[key]();
          commit("setSnapshot", { key: key, val: null });
          commit("resetData", key);
        });

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
  ["created_at", "update_at", "completed_at"].forEach(key => {
    if (typeof data[key] !== "undefined")
      data[key] = data[key].seconds * 1000 + data[key].nanoseconds / 1000000;
  });
  return data;
};

export const setupDB = ({ commit, state }) => {
  if (!state.is.setupDB) {
    ["reg", "qus", "check"].forEach(key => {
      let unsubscribe = db.collection(key).onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            commit("addData", { key: key, val: prepareRegData(change.doc) });
          }
          if (change.type === "modified") {
            commit("editData", { key: key, val: prepareRegData(change.doc) });
          }
          if (change.type === "removed") {
            console.log("Removed " + key + ": ", change.doc.data());
          }
        });
      });
      commit("setSnapshot", { key: key, val: unsubscribe });
    });

    commit("setIs", { key: "setupDB", val: true });
  }
};
