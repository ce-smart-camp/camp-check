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

let prepareRegData = (doc, Key, state, commit) => {
  let data = doc.data();
  data.id = doc.id;
  ["created_at", "update_at", "completed_at"].forEach(key => {
    if (data.hasOwnProperty(key))
      data[key] = data[key].seconds * 1000 + data[key].nanoseconds / 1000000;
  });
  if (Key == "reg") {
    data.score = { q1: 0, q2: 0, info: 0, sum: 0, all: 0 };
    data.mark = { q1: 0, q2: 0, info: 0, sum: 0, all: 0 };
  } else if (Key == "qus") {
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
    data.score = { q1: 0, q2: 0, info: 0, sum: 0, all: 0 };
    data.mark = { q1: 0, q2: 0, info: 0, sum: 0, all: 0 };

    // มีคะแนนอยู่ แล้ว น้องส่งคำตอบ ----- ไม่น่าเกิดขึ้น
    // if (state.key.check.hasOwnProperty(data.id)) {
    //   let checkData = state.list.check[state.key.check[data.id]];
    //   data.score = checkData.sum;
    // }
  } else if (Key == "check") {
    var sum = { q1: 0, q2: 0, info: 0 };
    Object.keys(data).forEach(key => {
      if (key !== "id" && key !== "mark" && key !== "comment") {
        sum[key.split("-")[0]] += Number(data[key]);
      }
    });
    data.sum = sum;

    data.mark = data.mark || {};
    var sumMark = { q1: 0, q2: 0, info: 0 };
    Object.keys(data.mark).forEach(key => {
      sumMark[key.split("-")[0]] += data.mark[key] ? 1 : 0;
    });
    data.mark.sum = sumMark;

    // มีข้อมูลอยู่ แล้วเพิ่ม คะแนน
    commit("setScore", data);

    data.comment = data.comment || {};
  }
  return data;
};

export const setupDB = ({ commit, state }) => {
  if (!state.is.setupDB) {
    ["reg", "qus", "check"].forEach(key => {
      let unsubscribe = db.collection(key);
      if (key !== "check") {
        unsubscribe = unsubscribe
          .where(
            "completed_at",
            ">",
            firebase.firestore.Timestamp.fromDate(
              new Date("2019-03-01T00:00:00")
            )
          )
          .orderBy("completed_at");
      }
      unsubscribe = unsubscribe.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            let val = prepareRegData(change.doc, key, state, commit);
            commit("addData", { key: key, val: val });
          }
          if (change.type === "modified") {
            let val = prepareRegData(change.doc, key, state, commit);
            commit("editData", { key: key, val: val });
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
