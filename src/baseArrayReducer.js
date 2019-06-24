export const baseArrayReducer = (section, initialState = [], reducer) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    case `RECEIVE_${section}S`:
      return receiveMany(state, action.payload);
    case `RECEIVE_${section}`:
      return receiveOne(state, action.payload);
    case `DESTROY_${section}`:
      return destroyOne(state, action.payload);
    case `RESET_${section}S`:
      return [];
    default:
      return reducer ? reducer(state, action) : state;
  }
};

const receiveMany = (state, payload) => {
  return [...state, ...payload];
};

const receiveOne = (state, payload) => {
  return [...state, payload];
};

const destroyOne = (state, payload) => {
  return state.filter(item => item.id !== payload);
};
