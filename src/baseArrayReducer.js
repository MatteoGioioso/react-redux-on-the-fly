/**
 * BaseArrayReducerMethods
 */
export class BaseArrayReducerMethods {
  _update(index, value, array) {
    return [...array.slice(0, index), value, ...array.slice(index + 1)];
  }

  receiveMany(state, payload) {
    return [...state, ...payload];
  }

  receiveOne(state, payload) {
    return [...state, payload];
  }

  substituteOne(state, payload) {
    const indexOfPayload = state.findIndex(item => item.id === payload.id);
    return this.update(indexOfPayload, payload, state);
  }

  destroyOne(state, payload) {
    return state.filter(item => item.id !== payload);
  }

  resetAll(state, payload) {
    return [];
  }
}

export const baseArrayReducer = (
  section,
  initialState = [],
  Overrides = BaseArrayReducerMethods,
  reducer
) => (state = initialState, action) => {
  const methods = new Overrides();

  switch (action.type) {
    case `RECEIVE_${section}S`:
      return methods.receiveMany(state, action.payload);
    case `RECEIVE_${section}`:
      return methods.receiveOne(state, action.payload);
    case `SUBSTITUTE_${section}`:
      return methods.substituteOne(state, action.payload);
    case `DESTROY_${section}`:
      return methods.destroyOne(state, action.payload);
    case `RESET_${section}S`:
      return methods.resetAll(state, action.payload);
    default:
      return reducer ? reducer(state, action) : state;
  }
};
