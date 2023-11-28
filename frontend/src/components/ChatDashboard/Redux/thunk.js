import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

export const roomProfile = createAsyncThunk(
  "room/profile",
  async (roomId, { rejectWithValue }) => {
    try {
      const { data } = await API.roomInfo(roomId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

