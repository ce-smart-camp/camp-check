export const addData = (state, data) => {
  data.val.idNum = state.list[data.key].length;
  state.key[data.key][data.val.id] = state.list[data.key].length;
  state.list[data.key].push(data.val);
};

export const editData = (state, data) => {
  state.list[data.key][state.key[data.key][data.val.id]] = data.val;
};

export const resetData = (state, data) => {
  state.list[data] = [];
  state.key[data] = {};
};

export const setIs = (state, data) => {
  state.is[data.key] = data.val;
};

export const setSnapshot = (state, data) => {
  state.snapshot[data.key] = data.val;
};

export const setPagination = (state, data) => {
  state.pagination = data;
};

export const setScore = (state, data) => {
  const score = data.sum;
  score.sum = score.q1 + score.q2;
  const mark = data.mark.sum;
  mark.sum = mark.q1 + mark.q2;
  if (state.key.qus.hasOwnProperty(data.id)) {
    Object.assign(state.list.qus[state.key.qus[data.id]], { score, mark });
  }
  if (state.key.reg.hasOwnProperty(data.id)) {
    Object.assign(state.list.reg[state.key.reg[data.id]], { score, mark });
  }
};
