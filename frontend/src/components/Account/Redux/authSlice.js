import setCookie from "@/utils/Cookies/setCookie";
import deleteCookie from "@/utils/Cookies/deleteCookie";
import { login } from "./thunk";

const initialState = {
  isAuthenticated: false,
  loading: false,
  userId: null,
  loadingLogin: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
