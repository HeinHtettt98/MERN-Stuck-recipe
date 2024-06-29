import { createSlice } from "@reduxjs/toolkit";

const state = {
  _id: "",
  photo: "",
  name: "",
  count: 0,
  role: ""
};

const userSlice = createSlice({
  name: "user",
  initialState: state,
  reducers: {
    getInform: (state, action) => {
      state.count = action.payload.createdCount;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state._id = action.payload._id;
      state.role = action.payload.role
    },
    profileAdd: (state, action) => {
      state.photo = action.payload;
    },
   countAdd: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { getInform, profileAdd, countAdd} = userSlice.actions;
export default userSlice.reducer;
