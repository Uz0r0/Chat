import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login/", data);
      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid user name or password");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register/", data);
      toast.success("Account created!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return rejectWithValue(error.response?.data);
    }
  }
); 

export const checkAuth = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) return rejectWithValue("No refresh token");
      const res = await axiosInstance.post("/auth/refresh/", { refresh });
      localStorage.setItem("token", res.data.access);
      if (res.data.refresh) {
        localStorage.setItem("refreshToken", res.data.refresh);
      }
      return res.data;
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        localStorage.clear();
      }
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true, 
  },
  reducers: {
    logout: (state) => {
      state.authUser = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
        localStorage.setItem("token", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(register.rejected, (state) => {
        state.isSigningUp = false;
      })

      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
        localStorage.setItem("token", action.payload.access); 
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

