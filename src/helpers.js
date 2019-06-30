import { asyncCombineReducers } from "./asyncCombineReducers";

const MAX_ASYNC_REDUCERS_STACK = 30;

/**
 * searchProperty
 * it search through props object or to params object
 * @param props
 * @param {string} name
 * @returns {*}
 */
function searchProperty(props, name) {
  return props[name] || props.match.params[name];
}

/**
 * getNamesFromIdentifierName
 * This method convert identifierName in array
 * @param {string | array<string>} identifierName
 * @return {array}
 */
function getNamesFromIdentifierName(identifierName) {
  if (Array.isArray(identifierName)) {
    return identifierName;
  }

  return [identifierName];
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
