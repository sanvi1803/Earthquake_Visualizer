import { configureStore } from "@reduxjs/toolkit";
import earthquakeReducer from "./slices/earthquakeSlice";

export const store = configureStore({
  reducer: {
    earthquake: earthquakeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;