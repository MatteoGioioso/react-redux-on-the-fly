export class SingleEntityReducerMethods {
  receiveOne = (state, payload) => payload;
}

export const singleEntityReducer = (
  section,
  initialState = {},
  Overrides = SingleEntityReducerMethods,
  reducer
) => (state = initialState, action) => {
  const methods = new Overrides();

  if (action.type === `RECEIVE_${section}`) {
    return methods.receiveOne(state, action.payload);
  } else {
    return reducer ? reducer(state, action) : state;
  }
};
