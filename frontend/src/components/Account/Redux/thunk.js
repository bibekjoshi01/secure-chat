import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const { roomCode, password } = credentials;
    try {
      const body = JSON.stringify({
        roomCode,
        password,
      });
      const { data } = await API.login(body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
