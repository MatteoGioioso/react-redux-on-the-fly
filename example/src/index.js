import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import Root from "./Root";

ReactDOM.render(
  <Root>
    <App id="123" />
  </Root>,
  document.getElementById("root")
);
