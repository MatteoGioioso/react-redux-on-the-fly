export class BaseObjectReducerMethods {
  receiveOne = (state, payload) => payload;
}

export const baseObjectReducer = (
  section,
  initialState = {},
  Overrides = BaseObjectReducerMethods,
  reducer
) => (state = {}, action) => {
  const methods = new Overrides();

  if (action.type === `RECEIVE_${section}`) {
    return methods.receiveOne(state, action.payload);
  } else {
    return reducer ? reducer(state, action) : state;
  }
};
