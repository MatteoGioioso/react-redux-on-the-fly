import { combineReducers } from "redux";

export function asyncCombineReducers(asyncReducers) {
  return combineReducers({
    ...asyncReducers
  });
}
