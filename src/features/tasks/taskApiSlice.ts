import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../auth/apiSlice";
import { type Task } from "@/lib/types";
import { type RootState } from "../../app/store";

const tasksAdapter = createEntityAdapter<Task>({});

const initialState = tasksAdapter.getInitialState();

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasksByBoard: builder.query({
      query: (boardId) => ({
        url: `/boards/${boardId}/tasks`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTasks = responseData.map((task: Task) => {
          task.id = task._id;
          return task;
        });
        return tasksAdapter.setAll(initialState, loadedTasks);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Task" as const, id: "LIST" },
            ...result.ids.map((id) => ({ type: "Task" as const, id })),
          ];
        } else return [{ type: "Task" as const, id: "LIST" }];
      },
    }),
    createTask: builder.mutation({
      query: ({ boardId, ...taskData }) => ({
        url: `/boards/${boardId}/tasks`,
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: (initialTask) => ({
        url: `/tasks/${initialTask.id}`,
        method: "PATCH",
        body: {
          ...initialTask,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Task", id: arg.id },
        { type: "Task", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksByBoardQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApiSlice;

// returns the query result object
export const selectTasksResult =
  tasksApiSlice.endpoints.getTasksByBoard.select(undefined);

// creates memoized selector
const selectTasksData = createSelector(
  selectTasksResult,
  (tasksResult) => tasksResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTasks,
  selectById: selectTasksById,
  selectIds: selectTaskIds,
  // Pass in a selector that returns the notes slice of state
} = tasksAdapter.getSelectors(
  (state: RootState) => selectTasksData(state) ?? initialState,
);
