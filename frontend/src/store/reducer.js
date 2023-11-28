import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/components/Account/Redux/authSlice";
import alertReducer from "@/components/Alert/Redux/alertSlice";
import roomReducer from "@/components/ChatDashboard/Redux/roomSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  room: roomReducer,
});
