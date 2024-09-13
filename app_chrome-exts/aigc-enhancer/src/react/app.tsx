import { Trigger } from "./trigger";
import React from "react";
import ReactDOM from "react-dom";

export const mountReactApp = (container: HTMLElement) => {
  ReactDOM.render(
    <React.StrictMode>
      <Trigger />
    </React.StrictMode>,
    container,
  );
};
