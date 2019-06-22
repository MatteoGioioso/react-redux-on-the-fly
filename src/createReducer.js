import { combineReducers } from "redux";

export function createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers
  });
}
