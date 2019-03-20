export const addData = (state, data) => {
  state.applicant.push(data);
};

export const resetData = state => {
  state.applicant = [];
};
