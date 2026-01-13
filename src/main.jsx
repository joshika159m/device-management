import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { initWebSocket } from "./services/wsClient";
import { startDeviceSimulator } from "./dev/deviceSimulator";

import App from "./App.jsx";
import "./index.css";

initWebSocket(store);
if (import.meta.env.DEV) {
  startDeviceSimulator(store);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
