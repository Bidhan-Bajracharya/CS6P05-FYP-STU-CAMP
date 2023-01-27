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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      return {...payload}
    },
    setProfilePic: (state, {payload}) => {
      state.profile_pic = payload
    },
    // signOutUser: () => initialState,
  },
});

export const { loginUser, setProfilePic } = userSlice.actions;
export default userSlice.reducer;
