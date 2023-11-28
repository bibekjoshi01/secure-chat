import { createSlice } from "@reduxjs/toolkit";
import { roomProfile } from "./thunk";

const initialState = {
  loading: false,
  roomInfo: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(roomProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(roomProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.roomInfo = payload;
    });
    builder.addCase(roomProfile.rejected, (state) => {
      state.roomInfo = false;
    });
  },
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;
