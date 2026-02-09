import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoaded = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoaded = true;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
