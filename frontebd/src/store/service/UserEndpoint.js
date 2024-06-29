import { ReceiveApi } from "./ReceiveApi";

const userEndpoint = ReceiveApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (arg) => ({
        url: "user/register",
        method: "POST",
        body: arg,
      }),
    }),
    signIn: builder.mutation({
      query: (arg) => ({
        url: "user/login",
        method: "POST",
        body: arg,
      }),
    }),
    auth: builder.query({
      query: () => "user/me",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
    }),
    uplodeProfile: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: "user/uplodeProfile",
        body: arg.data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    createdCount: builder.query({
      query: () => "user/created-item",
      providesTags: ["Recipe"],
    }),
    savedPost: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: "user/save-post",
        body: arg,
      }),
      invalidatesTags: ["Recipe"],
    }),
    getSaved: builder.query({
      query: (id) => `user/${id}/saved-posts`,
      providesTags: ["Recipe"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useUplodeProfileMutation,
  useCreatedCountQuery,
  useSignInMutation,
  useLogoutMutation,
  useAuthQuery,
  useSavedPostMutation,
  useGetSavedQuery,
} = userEndpoint;
