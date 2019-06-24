export const baseObjectReducer = (section, reducer) => (state = {}, action) => {
  switch (action.type) {
    case `RECEIVE_${section}`:
      return action.payload;
    case `RESET_${section}`:
      return {};
    default:
      return reducer ? reducer(state, action) : state;
  }
};
