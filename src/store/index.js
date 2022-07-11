import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "remote-redux-devtools";

import auth from "./auth";
import splash from "./splash";
import logger from "./util/logger";
export * from "./splash";
export * from "./auth";

const middleware = [thunkMiddleware, logger];

const reducer = combineReducers({
  splash,
  auth,
});

export default createStore(reducer, applyMiddleware(...middleware));
