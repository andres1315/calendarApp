import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status:'checking', // 'checking' | 'authenticated' | 'not-authenticated
    token: "",
    user: {},
    errorMessage: ""
  },
  reducers: {
    onLogin: (state, {payload}) => {
      console.log(payload)
      state.status = 'authenticated'
      state.token = payload.token;
      state.user = payload.user;
      state.errorMessage = ''
    },
    onLogout: (state,{payload}) => {
      state.status = 'not-authenticated'
      state.token = '';
      state.user = {};
      state.errorMessage = payload.errorMessage;
    },
    clearError: (state) => {
      state.errorMessage = ''
    }
  },
  
})


export const authReducer = authSlice.reducer;
export const { onLogin,onLogout,clearError } = authSlice.actions;