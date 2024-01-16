import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./ui/uiSlice";
import { calendarReducer } from "./calendar/calendarSlice";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer:{
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch