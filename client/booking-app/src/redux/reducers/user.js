import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    user: null,
    loading: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default UserSlice;

export const { setLogin, setUser, setLoading } = UserSlice.actions;
