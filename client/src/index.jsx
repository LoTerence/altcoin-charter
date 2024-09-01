import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./_store";
import { Provider } from "react-redux";
import { initDarkMode } from "./lib/darkmode";

initDarkMode();

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
