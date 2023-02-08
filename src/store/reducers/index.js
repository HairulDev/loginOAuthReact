import { combineReducers } from "redux";
import auth from "./auth";
import landingPageReducer from "./landingPage";

export default combineReducers({
  auth,
  landingPageReducer,
});
