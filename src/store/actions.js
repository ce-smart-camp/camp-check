import "./../core/auth";

import crypto from "crypto";
import db from "./../core/db";
import firebase from "./../core/firebase";

export const init = ({ dispatch, state, commit }, collection) => {
  if (state.unsubscribe.login === null) {
    var unsubscribe = firebase.auth().onAuthStateChanged(user => {
      commit("setIs", { key: "login", val: !!user });
      if (user) {
        state.wait.forEach(coll => {
          dispatch("init", coll);
          commit("removeWait", coll);
        });

        // Get role data
        let docID = crypto
          .createHash("md5")
          .update(user.email)
          .digest("hex");

        let unsubRole = db
          .collection("role")
          .doc(docID)
          .onSnapshot(function(doc) {
            commit("changeRole", doc.data());
          });
        commit("setUnsubscribe", { key: "ownRole", val: unsubRole });
      } else {
        Object.keys(state.unsubscribe).forEach(key => {
          if (key === "login") return;

          if (state.unsubscribe[key] !== null) state.unsubscribe[key]();
          commit("setUnsubscribe", { key: key, val: null });
          commit("resetData", key);
        });
      }
    });

    commit("setUnsubscribe", { key: "login", val: unsubscribe });
  }
  if (collection) {
    if (state.is.login) {
      if (!state.unsubscribe[collection]) {
        dispatch("setupDB", collection);
      }
    } else {
      commit("addWait", collection);
    }
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

    // มีคะแนนอยู่ แล้ว น้องส่งคำตอบ
    if (state.key.check.hasOwnProperty(data.id)) {
      let checkData = state.list.check[state.key.check[data.id]];
      const score = checkData.sum;
      score.sum = score.q1 + score.q2;
      score.all = score.sum + score.info;

      const mark = checkData.mark.sum;
      mark.sum = mark.q1 + mark.q2;
      mark.all = mark.sum + mark.info;

      Object.assign(data, { score, mark });
    }
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

    // มีคะแนนอยู่ แล้ว น้องส่งคำตอบ
    if (state.key.check.hasOwnProperty(data.id)) {
      let checkData = state.list.check[state.key.check[data.id]];
      const score = checkData.sum;
      score.sum = score.q1 + score.q2;
      score.all = score.sum + score.info;

      const mark = checkData.mark.sum;
      mark.sum = mark.q1 + mark.q2;
      mark.all = mark.sum + mark.info;

      Object.assign(data, { score, mark });
    }
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

    data.comment = data.comment || {};

    // มีข้อมูลอยู่ แล้วเพิ่ม คะแนน
    commit("setScore", data);
  }
  return data;
};

export const setupDB = ({ commit, state }, collection) => {
  let unsubscribe = db.collection(collection);
  if (collection === "reg" || collection === "qus") {
    unsubscribe = unsubscribe
      .where(
        "completed_at",
        ">",
        firebase.firestore.Timestamp.fromDate(new Date("2019-03-01T00:00:00"))
      )
      .orderBy("completed_at");
  }
  unsubscribe = unsubscribe.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === "added" || change.type === "modified") {
        let val = prepareRegData(change.doc, collection, state, commit);
        commit("changeData", { key: collection, val: val });
      }
      if (change.type === "removed") {
        // console.log("Removed " + key + ": ", change.doc.data());
      }
    });
  });
  commit("setUnsubscribe", { key: collection, val: unsubscribe });
};

export const checkStoreCheck = ({ commit, getters }, id) => {
  var check = getters.getByID("check", id);
  if (typeof check === "undefined") {
    commit("changeData", {
      key: "check",
      val: { mark: {}, comment: {}, id: id }
    });
  }
};
