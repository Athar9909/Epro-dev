import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import userService from "../apisModel/userService";

const handleApiError = (error, defaultMessage) => {
  const message =
    error?.response?.data?.message || error?.message || defaultMessage;
  toast.error(message);
  return { error: true, message };
};

// Async thunk to fetch main user data
export const GetMainUserData = createAsyncThunk(
  "userInfo/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUser();

      if (!response) {
        throw new Error("No response received");
      }

      if (response.error) {
        toast.error(response.message);
        return rejectWithValue(response);
      }

      console.log(response);

      return response?.results?.user || response?.user || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to fetch user data. Please try again.")
      );
    }
  }
);

const initialState = {
  userData: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setUser: (state, action) => {
      const { userData, token } = action.payload || {};
      state.userData = userData || null;
      state.token = token || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMainUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(GetMainUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; // Use payload instead of the whole action
        state.message =
          action.payload?.message || "User data fetched successfully";
      })
      .addCase(GetMainUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch user data";
        state.userData = null;
      });
  },
});

export const { logout, clearError, clearMessage, setUser } = userSlice.actions;

export default userSlice.reducer;
