// app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import miscSlice from "../slices/miscSlice";
import userSlice from "../slices/userSlices";

const rootReducer = combineReducers({
  auth: authSlice,
  misc: miscSlice,
  user: userSlice,
});

export const resettableRootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default rootReducer;
