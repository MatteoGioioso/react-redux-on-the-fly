/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReactReduxOnTheFly from "./ReactReduxOnTheFly";
import { ReactReduxOnTheFlyProvider } from "./ReactReduxOnTheFlyContext";

/**
 * createRoot
 * @param {object} staticReducers
 * @param {array} middleware
 * @param {*} initialState
 */
const createRoot = (staticReducers, middleware, initialState) => {
  const reactReduxOnTheFly = new ReactReduxOnTheFly(staticReducers);
  const reducers = reactReduxOnTheFly.asyncCombineReducers();

  return props => {
    const store = createStore(
      reducers,
      initialState,
      applyMiddleware(...middleware)
    );
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
};

export default createRoot;
