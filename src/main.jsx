import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/Style.css";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux-config/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
