import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import navbarReducer from "./features/navbarSlice";
import sliderReducer from "./features/sliderSlice";
import homeReducer from "./features/homeSlice";
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice";
import notificationReducer from './features/notificationSlice'
import postReducer from './features/postSlice'

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
  home: homeReducer,
  notification: notificationReducer,
  post: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)
