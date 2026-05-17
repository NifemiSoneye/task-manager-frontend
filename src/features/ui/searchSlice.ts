// features/ui/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

const searchSlice = createSlice({
  name: "search",
  initialState: { search: "" },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search.search;
export default searchSlice.reducer;
