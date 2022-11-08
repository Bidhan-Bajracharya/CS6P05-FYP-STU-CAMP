import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navIsActive: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    closeNav: (state) => {
      state.navIsActive = false;
    },
    toggleNav: (state) => {
      state.navIsActive = !state.navIsActive;
    },
  },
});

export const { closeNav, toggleNav } = navbarSlice.actions;

export default navbarSlice.reducer;
