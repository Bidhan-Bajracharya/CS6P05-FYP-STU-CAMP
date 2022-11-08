import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIndex: 0,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    goToNext: (state, action) => {
      // action.payload contains array
      const isLastSlide = state.currentIndex === action.payload.length - 1;
      const newIndex = isLastSlide ? 0 : state.currentIndex + 1;

      state.currentIndex = newIndex;
    },
    goToPrevious: (state, action) => {
      const isFirstSlide = state.currentIndex === 0;
      const newIndex = isFirstSlide
        ? action.payload.length - 1
        : state.currentIndex - 1;

      state.currentIndex = newIndex;
    },
    goToSlide: (state, action) => {
      // this action.payload contains the index of specific slide
      state.currentIndex = action.payload;
    },
  },
});

export const { goToNext, goToPrevious, goToSlide } = sliderSlice.actions;

export default sliderSlice.reducer;
