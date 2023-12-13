import React from "react";
import { createRoot } from "react-dom/client";
import App from "../App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

it("renders without crashing", () => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
