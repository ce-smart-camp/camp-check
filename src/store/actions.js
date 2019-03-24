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
  if (data.hasOwnProperty("logic")) {
    data.do = {};

    let cou = 0;
    ["q1", "q2", "q3"].forEach(key => {
      if (data.hasOwnProperty(key))
        for (let key2 in data[key]) cou += data[key][key2] == null ? 0 : 1;
    });
    data.do.q1 = cou;

    cou = 0;
    ["logic", "elect", "pro", "iot"].forEach(key => {
      if (data.hasOwnProperty(key))
        for (let key2 in data[key]) cou += data[key][key2] == null ? 0 : 1;
    });
    data.do.q2 = cou;
  }
  return data;
};

export const setupDB = ({ commit, state }) => {
  if (!state.is.setupDB) {
    ["check"].forEach(key => {
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

    ["qus"].forEach(key => {
      let unsubscribe = db
        .collection(key)
        .where(
          "completed_at",
          ">",
          firebase.firestore.Timestamp.fromDate(new Date("2019-03-01T00:00:00"))
        )
        .onSnapshot(function(snapshot) {
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
