import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  log: logReducer,
  tech: techReducer,
  auth: authReducer,
  alert: alertReducer,
});
