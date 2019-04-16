export const changeData = (state, data) => {
  const index = state.key[data.key][data.val.id];

  if (typeof index === "undefined") {
    data.val.idNum = state.list[data.key].length;
    state.key[data.key][data.val.id] = state.list[data.key].length;
    state.list[data.key].push(data.val);
  } else {
    Object.assign(state.list[data.key][index], data.val);
  }
};

export const resetData = (state, data) => {
  state.list[data] = [];
  state.key[data] = {};
};

export const setIs = (state, data) => {
  state.is[data.key] = data.val;
};

export const setUnsubscribe = (state, data) => {
  state.unsubscribe[data.key] = data.val;
};

export const setPagination = (state, data) => {
  state.pagination = data;
};

export const setSearch = (state, data) => {
  state.search = data;
};

export const setScore = (state, data) => {
  const score = data.sum;
  score.sum = score.q1 + score.q2;
  score.all = score.sum + score.info;

  const mark = data.mark.sum;
  mark.sum = mark.q1 + mark.q2;
  mark.all = mark.sum + mark.info;

  if (state.key.qus.hasOwnProperty(data.id)) {
    Object.assign(state.list.qus[state.key.qus[data.id]], { score, mark });
  }
  if (state.key.reg.hasOwnProperty(data.id)) {
    Object.assign(state.list.reg[state.key.reg[data.id]], { score, mark });
  }
};

export const addWait = (state, data) => {
  if (state.wait.indexOf(data) === -1) state.wait.push(data);
};

export const removeWait = (state, data) => {
  var index = state.wait.indexOf(data);
  if (index !== -1) state.wait.splice(index, 1);
};
