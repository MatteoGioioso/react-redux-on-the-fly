/**
 * Helpers
 */

import { asyncCombineReducers } from "./asyncCombineReducers";

const MAX_ASYNC_REDUCERS_STACK = 30;

function searchProperty(props, name) {
  return props[name] || props.match.params[name];
}

function getNamesFromIdentifierName(identifierName) {
  return identifierName.split(".");
}

function mapIdentifierNamesToProp(identifierNames, props) {
  return identifierNames.map(name => searchProperty(props, name));
}

export function getReducerName(props, identifierName, namespace) {
  if (identifierName) {
    const identifiersArray = getNamesFromIdentifierName(identifierName);
    const mappedProps = mapIdentifierNamesToProp(identifiersArray, props);

    return `${namespace}/${mappedProps.join("/")}`;
  }

  return namespace;
}

export function asyncReducerManager(store) {
  const asyncReducersStack = Object.keys(store.asyncReducers);

  if (asyncReducersStack.length > MAX_ASYNC_REDUCERS_STACK) {
    ejectAsyncReducer(store, asyncReducersStack[0]);
  }
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(asyncCombineReducers(store.asyncReducers));
}

function ejectAsyncReducer(store, name) {
  delete store.asyncReducers[name];
  store.replaceReducer(asyncCombineReducers(store.asyncReducers));
}

// This function check the reducer name from the action and instantiate a reducer
export function createNamedWrapperReducer(reducerFunction) {
  return reducerName => (state, action) => {
    const { name } = action;
    const isInitializationCall = state === undefined;
    if (name !== reducerName && !isInitializationCall) return state;

    return reducerFunction(state, action);
  };
}
