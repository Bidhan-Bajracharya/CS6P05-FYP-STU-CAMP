import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import navbarReducer from "./features/navbarSlice";
import sliderReducer from "./features/sliderSlice";
import stARsReducer from "./features/stARsSlice";
import homeReducer from "./features/homeSlice";
import peopleReducer from "./features/peopleSlice";
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice";

const persistConfig = {
  key: "root",
  storage, // local storage
  whitelist: ['theme', 'user']
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,

  navbar: navbarReducer,
  slider: sliderReducer,
  stARs: stARsReducer,
  home: homeReducer,
  people: peopleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)
