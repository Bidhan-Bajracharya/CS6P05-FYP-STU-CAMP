import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/navbarSlice";
import sliderReducer from "./features/sliderSlice";
import stARsReducer from "./features/stARsSlice";
import homeReducer from "./features/homeSlice";
import peopleReducer from "./features/peopleSlice";
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice"

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    slider: sliderReducer,
    stARs: stARsReducer,
    home: homeReducer,
    people: peopleReducer,
    theme: themeReducer,
    user: userReducer
  },
});
