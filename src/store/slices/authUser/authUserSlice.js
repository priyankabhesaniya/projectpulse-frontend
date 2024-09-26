import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  auth: false,
  success: false,
  message: null,
  access_token: null,
  token_type: null,
  user: null,
  profile: null,
  user_permissions:null
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    addAuthData: (state, action) => {
      state.loading = false;
      state.auth = true;
      state.success = true;
      state.message = action.payload.message;
      state.access_token = action.payload.access_token;
      state.token_type = action.payload.access_token;
      state.user = action.payload.user;
      state.profile = action.payload.profile;
      state.user_permissions = action.payload.user_permissions
    },
    resetAuthData: (state, action) => {
      state.loading = false;
      state.auth = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.token_type = null;
      state.user = null;
      state.profile = null;
      state.user_permissions = null
    },
  },
});

export const { addAuthData, resetAuthData } = authUserSlice.actions;

export default authUserSlice.reducer;
