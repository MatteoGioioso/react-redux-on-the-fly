import { baseArrayReducer } from "./baseArrayReducer";
import { createActions } from "./createActions";
import { baseObjectReducer } from "./baseObjectReducer";

/**
 * _searchProperty
 * it search through props object or to params object
 * @param {object} props
 * @param {string} name
 * @returns {*}
 */
export function searchProperty(props, name) {
  return props[name] || (props.match && props.match.params[name]);
}

/**
 * _getNamesFromIdentifierName
 * This method convert identifierName in array
 * @param {string | string[]} identifierName
 * @return {array}
 */
export const getArrayFromIdentifierNames = identifierName =>
  Array.isArray(identifierName) ? identifierName : [identifierName];

/**
 * mapIdentifierNamesToProp
 * @param {string[]} identifierNames
 * @param {object} props
 * @return {string[]}
 */
export function mapIdentifierNamesToProp(identifierNames, props) {
  return identifierNames.map(name => searchProperty(props, name));
}

/**
 * getReducerName
 * @param {object} props
 * @param {string[] | string} identifierName
 * @param {string} namespace
 * @return {string}
 */
export function getReducerName(props, identifierName, namespace) {
  if (identifierName) {
    const identifiersArray = getArrayFromIdentifierNames(identifierName);
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
 * @param {string} name
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
