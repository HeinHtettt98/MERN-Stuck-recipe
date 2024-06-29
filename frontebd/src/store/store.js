import { configureStore } from "@reduxjs/toolkit";
import { ReceiveApi } from "./service/ReceiveApi";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    [ReceiveApi.reducerPath]: ReceiveApi.reducer,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReceiveApi.middleware)
});
