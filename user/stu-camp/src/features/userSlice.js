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
    // signOutUser: () => initialState,
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
