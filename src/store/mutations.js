export const addData = (state, data) => {
  state.list[data.key].push(data.val);
  state.key[data.key][data.val.id] = state.list[data.key].length - 1;
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
