import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";

import App from "./App";

import { DataProvider } from "./context/useDataContext";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  rootElement
);
