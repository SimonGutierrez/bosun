import "react-native-gesture-handler";

import { registerRootComponent } from "expo";
import * as React from "react";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default registerRootComponent(app);
