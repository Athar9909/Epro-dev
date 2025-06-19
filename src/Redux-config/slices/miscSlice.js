import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "",
  registerType: "",
  registerData: {
    userVerifyType: "email",
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setRegisterType: (state, action) => {
      state.registerType = action.payload;
    },
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    clearMisc: (state) => {
      state.userType = "";
      state.registerType = "";
      state.registerData = {};
    },
  },
});

export const {
  setUserType,
  clearMisc,
  setRegisterType,
  setRegisterData,
  registerData,
} = miscSlice.actions;
export default miscSlice.reducer;
