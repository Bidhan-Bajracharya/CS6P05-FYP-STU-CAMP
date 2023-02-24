import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  name: "",
  userType: "",
  uni_id: "",
  profile_pic: "",
  department: "",
  section: "",
  year: 0,
  email: "",
  createdAt: "",
  notification: {
    adminEmail: true,
    commentEmail: true,
    mentionEmail: true,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      return { ...payload };
    },
    setProfilePic: (state, { payload }) => {
      state.profile_pic = payload;
    },
    adminEmailToggle: (state, { payload }) => {
      state.notification = { ...state.notification, adminEmail: payload };
    },
    commentEmailToggle: (state, { payload }) => {
      state.notification = { ...state.notification, commentEmail: payload };
    },
    mentionEmailToggle: (state, { payload }) => {
      state.notification = { ...state.notification, mentionEmail: payload };
    },
    // signOutUser: () => initialState,
  },
});

export const {
  loginUser,
  setProfilePic,
  adminEmailToggle,
  commentEmailToggle,
  mentionEmailToggle,
} = userSlice.actions;
export default userSlice.reducer;
