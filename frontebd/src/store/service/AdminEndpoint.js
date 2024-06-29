import { ReceiveApi } from "./ReceiveApi";

const adminEndpoint = ReceiveApi.injectEndpoints({
  endpoints: (builder) => ({
    indexUser: builder.query({
      query: () => "admin",
      providesTags: ["Admin"],
    }),
    destoryUser: builder.mutation({
      query: (arg) => ({
        method: "DELETE",
        url: `admin/${arg}/destory`,
      }),
      invalidatesTags: ["Admin"]
    }),
  }),
});

export const { useIndexUserQuery, useDestoryUserMutation } = adminEndpoint;
