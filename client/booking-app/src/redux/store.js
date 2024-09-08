import { configureStore } from "@reduxjs/toolkit";
import HotelSlice from "./reducers/booking";
import UserSlice from "./reducers/user";

const store = configureStore({
  reducer: {
    [HotelSlice.name]: HotelSlice.reducer,
    [UserSlice.name]: UserSlice.reducer,
  },
});

export default store;
