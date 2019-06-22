import { ReactReduxContext } from "react-redux";
import React from "react";

/**
 * withAsyncReducer
 * HOC to inject a reducer into the store dynamically
 * @param namespace
 * @param identifierName id or any other unique identifier
 * @param anonymousReducer a reducer without name, the name will be generated on component injection
 */
import {
  asyncReducerManager,
  getReducerName,
  injectAsyncReducer
} from "./helpers";

export const withAsyncReducer = (
  namespace,
  identifierName,
  anonymousReducer
) => WrappedComponent => {
  return props => {
    const reducerName = getReducerName(props, identifierName, namespace);

    const reducer = anonymousReducer(reducerName);

    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          injectAsyncReducer(store, reducerName, reducer);
          asyncReducerManager(store, props);

          return <WrappedComponent {...props} reducerName={reducerName} />;
        }}
      </ReactReduxContext.Consumer>
    );
  };
};

/**
 * withAsyncReducer
 * HOC to inject a reducer into the store dynamically
 * @param {Array} namespaces
 * @param {Array} identifierNames id or any other unique identifier
 * @param {Array} reducers a reducer without name, the name will be generated on component injection
 */
export const withMultipleAsyncReducers = (
  namespaces,
  identifierNames,
  reducers
) => WrappedComponent => {
  return props => {
    const reducersNames = namespaces.map((namespace, index) =>
      getReducerName(props, identifierNames[index], namespace)
    );

    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          reducersNames.forEach((reducerName, index) =>
            injectAsyncReducer(store, reducerName, reducers[index](reducerName))
          );

          asyncReducerManager(store, props);

          const mapArrayToObject = () =>
            Object.assign(
              {},
              ...namespaces.map((namespace, index) => ({
                [namespace]: reducersNames[index]
              }))
            );

          return (
            <WrappedComponent {...props} reducerNames={mapArrayToObject()} />
          );
        }}
      </ReactReduxContext.Consumer>
    );
  };
};
