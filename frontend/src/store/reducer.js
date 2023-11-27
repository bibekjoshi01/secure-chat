import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/components/Account/Redux/authSlice";
import alertReducer from "@/components/Alert/Redux/alertSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});
