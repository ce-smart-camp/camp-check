export const addData = (state, data) => {
  state.applicant.push(data);
  state.applicantKey[data.id] = state.applicant.length - 1;
};

export const editData = (state, data) => {
  state.applicant[state.applicantKey[data.id]] = data;
};

export const resetData = state => {
  state.applicant = [];
};

export const setIs = (state, data) => {
  state.is[data.key] = data.val;
};

export const setDbSnapshot = (state, data) => {
  state.dbSnapshot = data;
};
