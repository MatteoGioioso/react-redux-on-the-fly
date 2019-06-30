/* eslint-disable react/prop-types */
import React from "react";

export const ReactReduxOnTheFlyContext = React.createContext({});

export function ReactReduxOnTheFlyProvider({ children, store }) {
  return (
    <ReactReduxOnTheFlyContext.Provider value={{ store }}>
      {children}
    </ReactReduxOnTheFlyContext.Provider>
  );
}
