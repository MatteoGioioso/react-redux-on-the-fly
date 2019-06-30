import { connect } from "react-redux";
import React from "react";
import {
  asyncReducerManager,
  getReducerName,
  injectAsyncReducer
} from "./helpers";
import { ReactReduxOnTheFlyContext } from "./ReactReduxOnTheFlyContext";

/**
 * withAsyncReducer
 * HOC to inject a reducer into the store dynamically
 * @param {string} namespace
 * @param {string | string[]} identifierName id or any other unique identifier
 * @param anonymousReducer a reducer without name, the name will be generated on component injection
 */
export const withAsyncReducer = (
  namespace,
  identifierName,
  anonymousReducer
) => WrappedComponent => {
  return props => {
    const reducerName = getReducerName(props, identifierName, namespace);

    const reducer = anonymousReducer(reducerName);

    return (
      <ReactReduxOnTheFlyContext.Consumer>
        {({ store }) => {
          injectAsyncReducer(store, reducerName, reducer);
          asyncReducerManager(store, props);

          return <WrappedComponent {...props} reducerName={reducerName} />;
        }}
      </ReactReduxOnTheFlyContext.Consumer>
    );
  };
};
