import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadNotifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
    },
  },
});

export const { setNotifications, setUnreadNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
