// app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import miscSlice from "../slices/miscSlice";
import userSlice from "../slices/userSlices";
import listingsSlice from "../slices/listingsSlice.js";
const rootReducer = combineReducers({
  auth: authSlice,
  misc: miscSlice,
  user: userSlice,
  listings: listingsSlice,
});

export const resettableRootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default rootReducer;
