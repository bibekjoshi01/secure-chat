import { combineReducers } from "@reduxjs/toolkit";
// import authReducer from "@/components/Authentication/Redux/authSlice";
import alertReducer from "@/components/Alert/Redux/alertSlice";

export const rootReducer = combineReducers({
  // auth: authReducer,
  alert: alertReducer,
});
