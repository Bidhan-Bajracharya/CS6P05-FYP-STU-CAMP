import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shareIsShown: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    showInputBox: (state) => {
      state.shareIsShown = true;
    },
    hideInputBox: (state) => {
      state.shareIsShown = false;
    },
  },
});

export const { showInputBox, hideInputBox } = homeSlice.actions;

export default homeSlice.reducer;