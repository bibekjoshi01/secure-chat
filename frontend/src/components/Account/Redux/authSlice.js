import { createSlice } from "@reduxjs/toolkit";
import setCookie from "@/utils/Cookies/setCookie";
import deleteCookie from "@/utils/Cookies/deleteCookie";
import { login, register } from "./thunk";

const initialState = {
  isAuthenticated: false,
  loading: false,
  userId: null,
  loadingLogin: false,
  loadingRegister: false,
  createSuccessModal: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    OpenRoomCreateSuccess: (state, action) => {
      state.createSuccessModal = action.payload;
    },
    CloseRoomCreateSuccess: (state) => {
      state.createSuccessModal = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loadingRegister = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loadingRegister = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.loadingRegister = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action?.payload?.tokens?.access) {
        setCookie("accessToken", action?.payload?.tokens?.access, {
          secure: true,
          "max-age": 360000,
          sameSite: "Lax",
        });
      }
      if (action?.payload?.tokens?.refresh) {
        setCookie("accessToken", action?.payload?.tokens?.access, {
          secure: true,
          "max-age": 360000,
          sameSite: "Lax",
        });
      }
      state.loading = false;
      state.roomId = action?.payload?.roomId;
      state.loadingLogin = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("isAuthenticated");
    });
  },
});

export const { OpenRoomCreateSuccess, CloseRoomCreateSuccess } = authSlice.actions;
export default authSlice.reducer;
