import React from "react";
import ReactDOM from "react-dom/client";

export const mountReactApp = (
  container: HTMLElement,
  ReactElement: () => JSX.Element,
) => {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <ReactElement />
    </React.StrictMode>,
  );
};
