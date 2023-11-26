import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  error: false,
  info: false,
  success: false,
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    successAlert: (state, { payload }) => {
      state.open = true;
      state.success = true;
      state.message = payload;
    },
    errorAlert: (state, { payload }) => {
      state.open = true;
      state.error = true;
      state.message = payload;
    },
    infoAlert: (state, { payload }) => {
      state.open = true;
      state.info = true;
      state.message = payload;
    },

    closeAlert: (state) => {
      state.open = false;
      state.success = false;
      state.error = false;
      state.info = false;
      state.message = "";
    },
  },
});

export const {
  successAlert,
  errorAlert,
  infoAlert,
  closeAlert,
} = alertSlice.actions;

export default alertSlice.reducer;
