import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userType: "",
  uni_id: "",
  profile_pic: "",
  department: "",
  section: "",
  year: 0,
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      return {...payload}
    },
    signOutUser: () => initialState,
  },
});

export const { loginUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
