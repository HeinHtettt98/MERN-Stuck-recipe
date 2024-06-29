import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReceiveApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: 'include'
  }),
  tagTypes: ["Recipe","User","Admin"],
  endpoints: (builder) => ({}),
});
