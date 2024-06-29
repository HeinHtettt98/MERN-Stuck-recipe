import { ReceiveApi } from "./ReceiveApi";

const receipeEndpoint = ReceiveApi.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query({
      query: (page = 1) =>  `receipe/?page=${page}`,
      providesTags: ["Recipe"],
    }),
    show: builder.query({
      query: (id) => `receipe/${id}`,
      providesTags: ["Recipe"],
    }),
    create: builder.mutation({
      query: (arg) => ({
        url: "receipe",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["Recipe"],
    }),
    search: builder.mutation({
      query: (arg) => ({
        url: `receipe/search/?title=${arg}`,
        method: "POST"
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteReceipe: builder.mutation({
      query: (arg) => ({
        method: "DELETE",
        url: `receipe/${arg}`,
      }),
      invalidatesTags: ["Recipe"],
    }),
    update: builder.mutation({
      query: (arg) => ({
        method: "PUT",
        url: `receipe/${arg.id}`,
        body: arg.data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    uplode: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: `receipe/${arg.id}/uplode`,
        body: arg.data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    reaction: builder.mutation({
      query: (arg) => ({
        url: `receipe/${arg}/reaction`,
        method: "POST",
      }),
      invalidatesTags: ["Recipe"],
    }),
    comment: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: `receipe/${arg.id}/comment`,
        body: arg.data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    getComment: builder.query({
      query: (id) => `receipe/${id}/get-comment`,
      providesTags: ["Recipe"],
    }),
    unSave: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: `receipe/${arg}/unsave`,
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetQuery,
  useCreateMutation,
  useDeleteReceipeMutation,
  useUpdateMutation,
  useUplodeMutation,
  useShowQuery,
  useReactionMutation,
  useGetCommentQuery,
  useCommentMutation,
  useUnSaveMutation,
  useSearchMutation
} = receipeEndpoint;
