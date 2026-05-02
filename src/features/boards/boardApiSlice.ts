import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../auth/apiSlice";
import { type Board } from "@/lib/types";
import { type RootState } from "../../app/store";

const boardsAdapter = createEntityAdapter<Board>({});

const initialState = boardsAdapter.getInitialState();

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => ({
        url: `/boards`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedBoards = responseData.map((board: Board) => {
          board.id = board._id;
          return board;
        });
        return boardsAdapter.setAll(initialState, loadedBoards);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Board" as const, id: "LIST" },
            ...result.ids.map((id) => ({ type: "Board" as const, id })),
          ];
        } else return [{ type: "Board" as const, id: "LIST" }];
      },
    }),
    getBoard: builder.query({
      query: (id) => `/boards/${id}`,
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),
    createBoard: builder.mutation({
      query: (initialBoard) => ({
        url: "/boards",
        method: "POST",
        body: {
          ...initialBoard,
        },
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    updateBoard: builder.mutation({
      query: (initialBoard) => ({
        url: `/boards/${initialBoard.id}`,
        method: "PATCH",
        body: {
          ...initialBoard,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Board", id: arg.id }],
    }),
    deleteBoard: builder.mutation({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Board", id: arg.id },
        { type: "Board", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useGetAllBoardsQuery,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetBoardQuery,
} = boardsApiSlice;

// returns the query result object
export const selectBoardsResult =
  boardsApiSlice.endpoints.getAllBoards.select(undefined);

// creates memoized selector
const selectBoardsData = createSelector(
  selectBoardsResult,
  (boardsResult) => boardsResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllBoards,
  selectById: selectBoardsById,
  selectIds: selectBoardIds,
  // Pass in a selector that returns the notes slice of state
} = boardsAdapter.getSelectors(
  (state: RootState) => selectBoardsData(state) ?? initialState,
);
