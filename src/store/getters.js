export const applicantCount = state => state.applicant.length;

export const getByID = state => (coll, id, obj) => {
  return state.list[coll][state.key[coll][id]] || obj;
};
