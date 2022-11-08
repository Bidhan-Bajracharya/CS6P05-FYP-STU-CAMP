import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expanded: false,
};

const stARsSlice = createSlice({
  name: "stARs",
  initialState,
  reducers: {
    toggleExpand: (state) => {
      state.expanded = !state.expanded;
    },
  },
});

export const { toggleExpand } = stARsSlice.actions;

export default stARsSlice.reducer;
