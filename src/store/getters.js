export const getByID = state => (coll, id, obj) => {
  return state.list[coll][state.key[coll][id]] || obj;
};
