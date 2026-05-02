import { apiSlice } from "../auth/apiSlice";

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: `/analytics`,
      }),
      providesTags: [
        { type: "Task", id: "LIST" },
        { type: "Board", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApiSlice;
