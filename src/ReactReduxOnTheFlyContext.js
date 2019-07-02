/* eslint-disable react/prop-types */
import React from "react";

export const ReactReduxOnTheFlyContext = React.createContext({});

export function ReactReduxOnTheFlyProvider({
  children,
  store,
  reactReduxOnTheFly
}) {
  return (
    <ReactReduxOnTheFlyContext.Provider value={{ store, reactReduxOnTheFly }}>
      {children}
    </ReactReduxOnTheFlyContext.Provider>
  );
}
