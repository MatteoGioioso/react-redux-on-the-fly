/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import {
  asyncCombineReducers,
  ReactReduxOnTheFlyProvider
} from "react-redux-on-the-fly";

const reducers = (state, action) => {
  return asyncCombineReducers()(state, action);
};

export default props => {
  const store = createStore(reducers, applyMiddleware(logger));
  store.asyncReducers = {};
  return (
    <Provider store={store}>
      <ReactReduxOnTheFlyProvider store={store}>
        {props.children}
      </ReactReduxOnTheFlyProvider>
    </Provider>
  );
};
