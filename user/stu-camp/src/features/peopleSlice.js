import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  starsExpanded: false,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    toggleStarExpansion: (state) => {
      state.starsExpanded = !state.starsExpanded;
    },
  },
});

export const { toggleStarExpansion } = peopleSlice.actions;

export default peopleSlice.reducer;
