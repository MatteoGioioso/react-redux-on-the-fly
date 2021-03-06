/**
 * BaseArrayReducerMethods
 * To overrides these methods just create a class that extends to this class
 */
export class BaseArrayReducerMethods {
  static _update(index, value, array) {
    return [...array.slice(0, index), value, ...array.slice(index + 1)];
  }

  /**
   * receiveMany
   * @param {*[] | *} state
   * @param {*[] | *} payload
   * @return {*[] | *}
   */
  receiveMany = (state, payload) => [...state, ...payload];

  receiveManyOnTop = (state, payload) => [...payload, ...state];

  /**
   * substituteOne
   * @param {*[] | *} state
   * @param {object | *} payload
   * @returns {*[]}
   */
  substituteOne = (state, payload) => {
    const indexOfPayload = state.findIndex(item => item.id === payload.id);
    if (indexOfPayload > -1) {
      return BaseArrayReducerMethods._update(indexOfPayload, payload, state);
    }
    return state;
  };

  destroyOne = (state, payload) => state.filter(item => item.id !== payload);

  /**
   * destroyMany
   * @param {*[] | *} state
   * @param {string[]} payload
   * @returns {*[] | *}
   */
  destroyMany = (state, payload) =>
    state.filter(item => !payload.some(id => id === item.id));

  resetAll = (state, payload) => [];
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
    case `RECEIVE_${section}S_ON_TOP`:
      return methods.receiveManyOnTop(state, action.payload);
    case `SUBSTITUTE_${section}`:
      return methods.substituteOne(state, action.payload);
    case `DESTROY_${section}`:
      return methods.destroyOne(state, action.payload);
    case `DESTROY_${section}S`:
      return methods.destroyMany(state, action.payload);
    case `RESET_${section}S`:
      return methods.resetAll(state, action.payload);
    default:
      return reducer ? reducer(state, action) : state;
  }
};
