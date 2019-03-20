import db from "./../core/db";

export const loadData = ({ commit, state }) => {
  if (state.isLogin) {
    db.collection("reg")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data();
          data.id = doc.id;

          commit("addData", data);
        });
      });
  }
};
