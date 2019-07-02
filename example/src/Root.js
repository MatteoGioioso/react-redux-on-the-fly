/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import {
  ReactReduxOnTheFly,
  ReactReduxOnTheFlyProvider,
  baseArrayReducer,
} from "react-redux-on-the-fly";

const staticReducers = {
  myStaticReducer: baseArrayReducer("STATIC_REDUCER")
}
const reactReduxOnTheFly = new ReactReduxOnTheFly(staticReducers);
const reducers = reactReduxOnTheFly.asyncCombineReducers();

export default props => {
  const store = createStore(reducers, applyMiddleware(logger));
  store.asyncReducers = {};
  return (
    <Provider store={store}>
      <ReactReduxOnTheFlyProvider
        store={store}
        reactReduxOnTheFly={reactReduxOnTheFly}
      >
        {props.children}
      </ReactReduxOnTheFlyProvider>
    </Provider>
  );
};
