import "react-native-gesture-handler";

import * as React from "react";
import { Provider } from "react-redux";

import App from "./src/App";
import store from "./src/store";

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default app;
