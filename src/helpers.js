import { baseArrayReducer } from "./baseArrayReducer";
import { createActions } from "./createActions";
import { baseObjectReducer } from "./baseObjectReducer";

/**
 * _searchProperty
 * it search through props object or to params object
 * @param props
 * @param {string} name
 * @returns {*}
 */
export function searchProperty(props, name) {
  return props[name] || (props.match && props.match.params[name]);
}

/**
 * _getNamesFromIdentifierName
 * This method convert identifierName in array
 * @param {string | array<string>} identifierName
 * @return {array}
 */
export function getNamesFromIdentifierName(identifierName) {
  if (Array.isArray(identifierName)) {
    return identifierName;
  }

  return [identifierName];
}

export function mapIdentifierNamesToProp(identifierNames, props) {
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

// This function check the reducer name from the action and instantiate a reducer
export function createNamedWrapperReducer(reducerFunction) {
  return reducerName => (state, action) => {
    const { name } = action;
    const isInitializationCall = state === undefined;
    if (name !== reducerName && !isInitializationCall) return state;

    return reducerFunction(state, action);
  };
}

/**
 * createAnonymousDuck
 * @param {string} section
 * @param {string} type
 */
export function createDuck(name, section, type) {
  const reducerType = {
    array: baseArrayReducer,
    object: baseObjectReducer
  };
  const reducer = reducerType[type](section);

  return {
    reducer: createNamedWrapperReducer(reducer)(name),
    ...createActions(section)
  };
}
