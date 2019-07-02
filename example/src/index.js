import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import AppLowLevel from "./AppLowLevel";
import Root from "./Root";
import AppHighLevel from "./AppHighLevel";
import logger from "redux-logger";

import {
  createRoot,
  createDuck
} from "react-redux-on-the-fly";

const myStaticDuck = createDuck("myStaticDuck", "STATIC_DUCK", "object");
const staticReducers = {
  myStaticReducer: myStaticDuck.reducer
};
const HighLevelRoot = createRoot({}, [logger], {});

console.log(HighLevelRoot);

ReactDOM.render(
  <div>
    <Root>
      <AppLowLevel id="123" />
    </Root>
    {/* <HighLevelRoot>
      <AppHighLevel id="123" />
    </HighLevelRoot> */}
  </div>,
  document.getElementById("root")
);
