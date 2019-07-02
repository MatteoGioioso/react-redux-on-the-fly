/* eslint-disable react/prop-types */
import { connect } from "react-redux";
import React from "react";
import { getReducerName } from "./helpers";
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
        {({ store, reactReduxOnTheFly }) => {
          reactReduxOnTheFly.injectAsyncReducer(store, reducerName, reducer);
          reactReduxOnTheFly.asyncReducerManager(store, props);

          return <WrappedComponent {...props} reducerName={reducerName} />;
        }}
      </ReactReduxOnTheFlyContext.Consumer>
    );
  };
};

/**
 * withAsyncReducerConnect
 * Higher level HOC similar to withAsyncReducer, but already connected to the store
 * @param {string} namespace
 * @param {string | string[]} identifierName id or any other unique identifier/s
 * @param anonymousReducer a reducer without name, the name will be generated on component injection
 * @param actions
 */
export const withAsyncReducerConnect = (
  namespace,
  identifierName,
  anonymousReducer,
  actions
) => WrappedComponent => {
  return props => {
    const reducerName = getReducerName(props, identifierName, namespace);

    const reducer = anonymousReducer(reducerName);

    return (
      <ReactReduxOnTheFlyContext.Consumer>
        {({ store, reactReduxOnTheFly }) => {
          reactReduxOnTheFly.injectAsyncReducer(store, reducerName, reducer);
          reactReduxOnTheFly.asyncReducerManager(store, props);

          const mapStateToProps = state => ({
            customers: state[reducerName]
          });

          const ConnectedWrappedComponent = connect(
            mapStateToProps,
            { ...actions }
          )(WrappedComponent);

          return (
            <ConnectedWrappedComponent {...props} reducerName={reducerName} />
          );
        }}
      </ReactReduxOnTheFlyContext.Consumer>
    );
  };
};
