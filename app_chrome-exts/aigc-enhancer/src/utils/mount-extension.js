import { mountReactApp } from "../react/app";

export const mountExtension = (parentElement) => {
  // mount shadow root
  const extensionRoot = document.createElement("div");
  extensionRoot.id = "my-extension-root";
  parentElement.insertAdjacentElement("afterbegin", extensionRoot);
  const shadowRoot = extensionRoot.attachShadow({ mode: "open" });

  // attach style into shadow root
  const style = document.createElement("style");
  style.textContent = `@import url(${chrome.runtime.getURL("dist/main.css")})`;
  shadowRoot.appendChild(style);

  // attach react into shadow root
  const reactContainer = document.createElement("div");
  mountReactApp(reactContainer);
  shadowRoot.appendChild(reactContainer);
};
