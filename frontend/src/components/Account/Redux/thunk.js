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

export const register = createAsyncThunk(
  "auth/register",
  async (roomData, { rejectWithValue }) => {
    const { name, password, maxMembers } = roomData;
    try {
      const body = JSON.stringify({
        name,
        password,
        maxMembers,
      });
      const { data } = await API.register(body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
