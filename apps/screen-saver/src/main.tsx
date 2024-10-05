import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.tsx";
import SystemDashboard from "./components/system-dashboard.tsx";
import "@assets/styles/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*<App />*/}
    <SystemDashboard />
  </React.StrictMode>,
);
