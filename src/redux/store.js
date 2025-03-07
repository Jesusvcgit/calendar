import { configureStore } from "@reduxjs/toolkit";
import horarioReducer from "./horarioSlice";

export const store = configureStore({
  reducer: {
    horarios: horarioReducer,
  },
});